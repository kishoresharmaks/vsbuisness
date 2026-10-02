import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js Windows SRV lookup ECONNREFUSED error only on Windows machines.
// On Linux/VPS, let systemd-resolved and /etc/resolv.conf resolve DNS naturally.
if (typeof process !== "undefined" && process.platform === "win32") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
  } catch {
    // Ignore if dns.setServers is restricted in certain runtime environments
  }
}

/**
 * Global cached Mongoose connection to prevent multiple connections in serverless hot reloads.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastError: string | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null, lastError: null };
}

export function getMongoDiagnostic() {
  const uri = process.env.MONGODB_URI;
  return {
    hasUri: Boolean(uri),
    uriPrefix: uri ? uri.split("@")[0].replace(/:[^:]*$/, ":****") : null,
    isConnected: cached.conn?.connection?.readyState === 1,
    lastError: cached.lastError,
  };
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    cached.lastError = "MONGODB_URI environment variable is not defined in process.env";
    return null;
  }

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected Successfully to VS Business Database");
        cached.lastError = null;
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        const msg = err?.message || String(err);
        cached.lastError = msg;
        console.error("MongoDB Connection Error:", msg);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    cached.lastError = null;
  } catch (e: any) {
    cached.promise = null;
    cached.lastError = e?.message || String(e);
    return null;
  }

  return cached.conn;
}

