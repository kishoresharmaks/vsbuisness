import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import VisitorLogModel from "@/models/VisitorLog";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LOGS_FILE = path.join(DATA_DIR, "visitor-logs.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function parseUserAgent(ua: string) {
  let device = "Desktop";
  let browser = "Chrome";

  if (/mobile|android|iphone|ipad|tablet/i.test(ua)) {
    device = /ipad|tablet/i.test(ua) ? "Tablet" : "Mobile";
  }

  if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";

  return { device, browser };
}

function cleanReferrer(ref: string) {
  if (!ref || ref === "direct") return "Direct";
  if (ref.includes("google")) return "Google Search / Ads";
  if (ref.includes("facebook") || ref.includes("fb")) return "Meta / Facebook Ads";
  if (ref.includes("instagram")) return "Instagram Ads";
  if (ref.includes("linkedin")) return "LinkedIn";
  if (ref.includes("whatsapp")) return "WhatsApp";
  if (ref.includes("twitter") || ref.includes("t.co") || ref.includes("x.com")) return "X (Twitter)";
  return "External Website";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path: reqPath = "/", referrer: reqRef = "", userAgent: reqUa = "" } = body;

    // Get IP Address
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfIp = req.headers.get("cf-connecting-ip");
    const rawIp = cfIp || (forwardedFor ? forwardedFor.split(",")[0] : realIp) || "127.0.0.1";
    const ip = rawIp.trim();

    // Check Cloudflare / Vercel Geo headers first
    let country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";
    let countryCode = country.toUpperCase();
    let region = req.headers.get("x-vercel-ip-country-region") || "Unknown";
    let city = req.headers.get("x-vercel-ip-city") || "Unknown";

    // If country is missing or local IP, perform GeoIP lookup fallback
    if (!country || country === "UN" || country === "XX") {
      if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
        country = "India";
        countryCode = "IN";
        region = "Tamil Nadu";
        city = "Chennai";
      } else {
        try {
          const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`, {
            signal: AbortSignal.timeout(1500),
          });
          const geoData = await geoRes.json();
          if (geoData && geoData.status === "success") {
            country = geoData.country || "United States";
            countryCode = geoData.countryCode || "US";
            region = geoData.regionName || "California";
            city = geoData.city || "San Francisco";
          }
        } catch {
          country = "United States";
          countryCode = "US";
          region = "California";
          city = "San Francisco";
        }
      }
    }

    const { device, browser } = parseUserAgent(reqUa || req.headers.get("user-agent") || "");
    const referrer = cleanReferrer(reqRef);

    const logEntry = {
      timestamp: new Date(),
      ip,
      country,
      countryCode,
      region,
      city,
      path: reqPath,
      referrer,
      device,
      browser,
      userAgent: reqUa || req.headers.get("user-agent") || "",
    };

    // Save to File System Fallback
    let isFsDuplicate = false;
    try {
      ensureDataDir();
      let logs: any[] = [];
      if (fs.existsSync(LOGS_FILE)) {
        const fileData = fs.readFileSync(LOGS_FILE, "utf-8");
        logs = JSON.parse(fileData);
      }

      // Check for rapid duplicate entries (same IP + path + device/browser within 2.5s)
      const nowMs = Date.now();
      isFsDuplicate = logs.some((existing: any) => {
        const existingMs = new Date(existing.timestamp).getTime();
        const sameIp = existing.ip === ip;
        const samePath = existing.path === reqPath;
        const sameDevice = existing.device === device;
        const sameBrowser = existing.browser === browser;
        return sameIp && samePath && sameDevice && sameBrowser && Math.abs(nowMs - existingMs) < 2500;
      });

      if (!isFsDuplicate) {
        logs.unshift(logEntry);
        // Keep max 2000 logs in JSON file
        if (logs.length > 2000) logs = logs.slice(0, 2000);
        fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2), "utf-8");
      }
    } catch (fsErr) {
      console.error("FS Log Error:", fsErr);
    }

    // Save to MongoDB with deduplication check
    try {
      if (!isFsDuplicate) {
        const conn = await connectToDatabase();
        if (conn) {
          const recentThreshold = new Date(Date.now() - 2500);
          const existingDoc = await VisitorLogModel.findOne({
            ip,
            path: reqPath,
            device,
            browser,
            timestamp: { $gte: recentThreshold },
          });

          if (!existingDoc) {
            await VisitorLogModel.create(logEntry);
          }
        }
      }
    } catch (dbErr) {
      console.error("DB Log Error:", dbErr);
    }

    return NextResponse.json({ success: true, deduplicated: isFsDuplicate });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
