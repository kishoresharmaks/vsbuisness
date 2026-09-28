import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import OfferModel from "@/models/Offer";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "offers.json");

function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    const initialOffer = [
      {
        id: "offer-default-1",
        title: "Special Season Offer",
        message: "Get 15% off on custom Next.js Web Development & E-Commerce platforms!",
        discountTag: "SAVE15",
        badgeText: "LIMITED PERIOD OFFER",
        ctaText: "Claim 15% Discount →",
        ctaLink: "/start-project",
        theme: "blue",
        position: "floating-toast",
        isActive: true,
        expiresAt: "2026-12-31T23:59:59.000Z",
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(dataFilePath, JSON.stringify(initialOffer, null, 2), "utf-8");
  }
}

function getFromFile(): any[] {
  try {
    ensureDataFile();
    const content = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}

function saveToFile(data: any[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing offers.json backup:", err);
  }
}

// GET active offer & offer list
export async function GET() {
  try {
    const db = await connectToDatabase();

    if (db) {
      const allOffers = await OfferModel.find().sort({ createdAt: -1 }).lean();
      const activeOffer = allOffers.find((o: any) => o.isActive === true) || allOffers[0] || null;

      return NextResponse.json({
        success: true,
        storageMode: "mongodb",
        activeOffer,
        allOffers,
      });
    }

    // Fallback to local file storage
    const fileOffers = getFromFile();
    const activeOffer = fileOffers.find((o) => o.isActive === true) || fileOffers[0] || null;

    return NextResponse.json({
      success: true,
      storageMode: "json_file",
      activeOffer,
      allOffers: fileOffers,
    });
  } catch (error) {
    console.error("GET Offers Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch offers." },
      { status: 500 }
    );
  }
}

// POST create/update active offer from Admin Panel
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      message,
      discountTag,
      badgeText,
      ctaText,
      ctaLink,
      theme,
      position,
      isActive,
      expiresAt,
    } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: title or message." },
        { status: 400 }
      );
    }

    const offerPayload = {
      title: title.trim(),
      message: message.trim(),
      discountTag: discountTag ? discountTag.trim() : "",
      badgeText: badgeText ? badgeText.trim() : "LIMITED OFFER",
      ctaText: ctaText ? ctaText.trim() : "Claim Offer →",
      ctaLink: ctaLink ? ctaLink.trim() : "/start-project",
      theme: theme || "blue",
      position: position || "floating-toast",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      createdAt: new Date(),
    };

    let savedOffer = null;
    let storageMode = "json_file";

    const db = await connectToDatabase();
    if (db) {
      try {
        if (offerPayload.isActive) {
          // Deactivate prior offers if new offer is activated
          await OfferModel.updateMany({}, { $set: { isActive: false } });
        }
        savedOffer = await OfferModel.create(offerPayload);
        storageMode = "mongodb";
      } catch (dbErr) {
        console.error("MongoDB Offer Save Error:", dbErr);
      }
    }

    // Always update JSON backup file
    const fileOffers = getFromFile();
    if (offerPayload.isActive) {
      fileOffers.forEach((o) => (o.isActive = false));
    }
    const newFileOffer = { id: `offer-${Date.now()}`, ...offerPayload };
    fileOffers.unshift(newFileOffer);
    saveToFile(fileOffers);

    if (!savedOffer) savedOffer = newFileOffer;

    return NextResponse.json({
      success: true,
      storageMode,
      message: "Offer configuration saved successfully.",
      data: savedOffer,
    });
  } catch (error) {
    console.error("POST Offer Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save offer." },
      { status: 500 }
    );
  }
}
