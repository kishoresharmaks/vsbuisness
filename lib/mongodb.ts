import mongoose from "mongoose";
import dns from "dns";

// Fix Node.js Windows SRV lookup ECONNREFUSED error by configuring reliable DNS resolvers (Google & Cloudflare)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // Ignore if dns.setServers is restricted in certain runtime environments
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global cached Mongoose connection to prevent multiple connections in serverless hot reloads.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected Successfully to VS Business Database");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", e);
    return null;
  }

  return cached.conn;
}
