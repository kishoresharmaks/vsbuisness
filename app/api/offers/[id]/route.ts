import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import OfferModel from "@/models/Offer";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "offers.json");

function getFromFile(): any[] {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const content = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}

function saveToFile(data: any[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing offers.json backup:", err);
  }
}

// PATCH toggle active state or edit offer
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isActive, title, message, theme, position, ctaText, ctaLink, discountTag, badgeText, expiresAt } = body;

    const db = await connectToDatabase();
    let updatedOffer = null;

    if (db) {
      if (isActive === true) {
        // Deactivate all others
        await OfferModel.updateMany({ _id: { $ne: id } }, { $set: { isActive: false } });
      }

      const updatePayload: any = {};
      if (isActive !== undefined) updatePayload.isActive = isActive;
      if (title) updatePayload.title = title;
      if (message) updatePayload.message = message;
      if (theme) updatePayload.theme = theme;
      if (position) updatePayload.position = position;
      if (ctaText) updatePayload.ctaText = ctaText;
      if (ctaLink) updatePayload.ctaLink = ctaLink;
      if (discountTag !== undefined) updatePayload.discountTag = discountTag;
      if (badgeText !== undefined) updatePayload.badgeText = badgeText;
      if (expiresAt !== undefined) updatePayload.expiresAt = expiresAt ? new Date(expiresAt) : null;

      updatedOffer = await OfferModel.findByIdAndUpdate(
        id,
        { $set: updatePayload },
        { returnDocument: "after" }
      ).lean();
    }

    // Update JSON file backup
    const fileOffers = getFromFile();
    if (isActive === true) {
      fileOffers.forEach((o) => (o.id !== id ? (o.isActive = false) : null));
    }
    const idx = fileOffers.findIndex((o) => o._id === id || o.id === id);
    if (idx !== -1) {
      if (isActive !== undefined) fileOffers[idx].isActive = isActive;
      if (title) fileOffers[idx].title = title;
      if (message) fileOffers[idx].message = message;
      if (theme) fileOffers[idx].theme = theme;
      if (position) fileOffers[idx].position = position;
      if (ctaText) fileOffers[idx].ctaText = ctaText;
      if (ctaLink) fileOffers[idx].ctaLink = ctaLink;
      if (discountTag !== undefined) fileOffers[idx].discountTag = discountTag;
      if (badgeText !== undefined) fileOffers[idx].badgeText = badgeText;
      if (expiresAt !== undefined) fileOffers[idx].expiresAt = expiresAt;
      saveToFile(fileOffers);
      if (!updatedOffer) updatedOffer = fileOffers[idx];
    }

    return NextResponse.json({
      success: true,
      message: "Offer updated successfully.",
      data: updatedOffer,
    });
  } catch (error) {
    console.error("PATCH Offer Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update offer." },
      { status: 500 }
    );
  }
}

// DELETE an offer config
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const db = await connectToDatabase();
    if (db) {
      await OfferModel.findByIdAndDelete(id);
    }

    const fileOffers = getFromFile();
    const filtered = fileOffers.filter((o) => o._id !== id && o.id !== id);
    saveToFile(filtered);

    return NextResponse.json({
      success: true,
      message: "Offer deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE Offer Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete offer." },
      { status: 500 }
    );
  }
}
