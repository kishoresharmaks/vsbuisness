import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import VisitorLogModel from "@/models/VisitorLog";
import InquiryModel from "@/models/Inquiry";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LOGS_FILE = path.join(DATA_DIR, "visitor-logs.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

export async function GET(req: NextRequest) {
  try {
    let logs: any[] = [];
    let inquiriesCount = 0;

    // 1. Try to read from MongoDB
    try {
      const conn = await connectToDatabase();
      if (conn) {
        logs = await VisitorLogModel.find().sort({ timestamp: -1 }).lean();
        inquiriesCount = await InquiryModel.countDocuments();
      }
    } catch (dbErr) {
      console.error("DB Fetch Analytics Error:", dbErr);
    }

    // 2. Fallback to File System if MongoDB is empty or failed
    if (logs.length === 0 && fs.existsSync(LOGS_FILE)) {
      try {
        const fileContent = fs.readFileSync(LOGS_FILE, "utf-8");
        logs = JSON.parse(fileContent);
      } catch (fsErr) {
        console.error("FS Read Logs Error:", fsErr);
      }
    }

    if (inquiriesCount === 0 && fs.existsSync(INQUIRIES_FILE)) {
      try {
        const inqContent = fs.readFileSync(INQUIRIES_FILE, "utf-8");
        const parsedInq = JSON.parse(inqContent);
        inquiriesCount = parsedInq.length;
      } catch {}
    }

    // Compute Metrics
    const totalPageviews = logs.length;
    const uniqueIpSet = new Set(logs.map((l) => l.ip));
    const uniqueVisitors = uniqueIpSet.size || (logs.length > 0 ? logs.length : 0);
    const totalVisitors = logs.length;

    const conversionRate = uniqueVisitors > 0
      ? ((inquiriesCount / uniqueVisitors) * 100).toFixed(1)
      : "0.0";

    // Country Breakdown
    const countryMap: Record<string, { count: number; code: string }> = {};
    logs.forEach((log) => {
      const c = log.country || "Unknown";
      const code = log.countryCode || "UN";
      if (!countryMap[c]) {
        countryMap[c] = { count: 0, code };
      }
      countryMap[c].count += 1;
    });

    const countryStats = Object.keys(countryMap)
      .map((c) => ({
        country: c,
        countryCode: countryMap[c].code,
        count: countryMap[c].count,
        percentage: totalVisitors > 0 ? ((countryMap[c].count / totalVisitors) * 100).toFixed(1) : "0",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Region / City Breakdown
    const regionMap: Record<string, number> = {};
    logs.forEach((log) => {
      if (log.region && log.region !== "Unknown") {
        const key = `${log.region}, ${log.country || ""}`;
        regionMap[key] = (regionMap[key] || 0) + 1;
      }
    });

    const regionStats = Object.keys(regionMap)
      .map((r) => ({ region: r, count: regionMap[r] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Device Breakdown
    const deviceMap: Record<string, number> = { Mobile: 0, Desktop: 0, Tablet: 0 };
    logs.forEach((log) => {
      const d = log.device || "Desktop";
      deviceMap[d] = (deviceMap[d] || 0) + 1;
    });

    const deviceStats = Object.keys(deviceMap).map((d) => ({
      device: d,
      count: deviceMap[d],
      percentage: totalVisitors > 0 ? ((deviceMap[d] / totalVisitors) * 100).toFixed(1) : "0",
    }));

    // Referrer Breakdown
    const referrerMap: Record<string, number> = {};
    logs.forEach((log) => {
      const ref = log.referrer || "Direct";
      referrerMap[ref] = (referrerMap[ref] || 0) + 1;
    });

    const referrerStats = Object.keys(referrerMap)
      .map((ref) => ({ referrer: ref, count: referrerMap[ref] }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        uniqueVisitors,
        totalPageviews,
        inquiriesCount,
        conversionRate: `${conversionRate}%`,
        countryStats,
        regionStats,
        deviceStats,
        referrerStats,
        recentLogs: logs.slice(0, 50),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
