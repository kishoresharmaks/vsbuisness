import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import InquiryModel from "@/models/Inquiry";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "inquiries.json");

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
    console.error("Error writing inquiries.json backup:", err);
  }
}

// PATCH update status or notes for an inquiry ticket
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: ticketId } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const db = await connectToDatabase();
    let updatedInquiry = null;

    if (db) {
      const updatePayload: any = {};
      if (status) updatePayload.status = status;
      if (adminNotes !== undefined) updatePayload.adminNotes = adminNotes;

      updatedInquiry = await InquiryModel.findOneAndUpdate(
        { ticketId },
        { $set: updatePayload },
        { returnDocument: "after" }
      ).lean();
    }

    // Sync file backup
    const fileInquiries = getFromFile();
    const targetIdx = fileInquiries.findIndex((item) => item.ticketId === ticketId);

    if (targetIdx !== -1) {
      if (status) fileInquiries[targetIdx].status = status;
      if (adminNotes !== undefined) fileInquiries[targetIdx].adminNotes = adminNotes;
      saveToFile(fileInquiries);
      if (!updatedInquiry) updatedInquiry = fileInquiries[targetIdx];
    }

    if (!updatedInquiry) {
      return NextResponse.json(
        { success: false, message: `Inquiry ticket ${ticketId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully.",
      data: updatedInquiry,
    });
  } catch (error) {
    console.error("PATCH Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update inquiry." },
      { status: 500 }
    );
  }
}

// DELETE an inquiry ticket
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: ticketId } = await params;

    const db = await connectToDatabase();
    if (db) {
      await InquiryModel.findOneAndDelete({ ticketId });
    }

    // Remove from file backup
    const fileInquiries = getFromFile();
    const filtered = fileInquiries.filter((item) => item.ticketId !== ticketId);
    saveToFile(filtered);

    return NextResponse.json({
      success: true,
      message: `Inquiry ticket ${ticketId} deleted successfully.`,
    });
  } catch (error) {
    console.error("DELETE Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
