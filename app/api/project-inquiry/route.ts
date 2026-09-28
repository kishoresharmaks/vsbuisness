import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import InquiryModel from "@/models/Inquiry";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "inquiries.json");

function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), "utf-8");
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
    console.error("Error writing inquiries.json backup:", err);
  }
}

// GET all inquiries (Supports MongoDB & JSON File Backup)
export async function GET() {
  try {
    const db = await connectToDatabase();

    if (db) {
      const dbInquiries = await InquiryModel.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({
        success: true,
        count: dbInquiries.length,
        storageMode: "mongodb",
        data: dbInquiries,
      });
    }

    // Fallback to local JSON file
    const fileInquiries = getFromFile();
    fileInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      count: fileInquiries.length,
      storageMode: "json_file",
      data: fileInquiries,
    });
  } catch (error) {
    console.error("GET Inquiry API Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching inquiries" },
      { status: 500 }
    );
  }
}

// POST new project inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      projectType,
      servicesNeeded,
      budgetRange,
      timeline,
      description,
      name,
      email,
      company,
      phone,
      selectedFeatures,
      customFeatureText,
      couponCode,
    } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, or description." },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `VS-${year}-${randomDigits}`;
    const createdAt = new Date().toISOString();

    const newInquiryPayload = {
      ticketId,
      createdAt,
      status: "New" as const,
      adminNotes: "",
      couponCode: couponCode ? couponCode.trim().toUpperCase() : "",
      client: {
        name: name.trim(),
        email: email.trim(),
        company: company ? company.trim() : "N/A",
        phone: phone ? phone.trim() : "N/A",
      },
      project: {
        type: projectType,
        scope: servicesNeeded,
        budget: budgetRange || "Not specified",
        timeline: timeline || "Standard (2-4 Weeks)",
        features: selectedFeatures || [],
        customFeatureText: customFeatureText ? customFeatureText.trim() : "",
        description: description.trim(),
      },
    };

    let storageMode = "json_file";

    // Attempt MongoDB insertion
    const db = await connectToDatabase();
    if (db) {
      try {
        await InquiryModel.create(newInquiryPayload);
        storageMode = "mongodb";
      } catch (dbErr) {
        console.error("MongoDB Save Error (Falling back to JSON file):", dbErr);
      }
    }

    // Always keep JSON file synced as redundant backup
    const fileInquiries = getFromFile();
    fileInquiries.push(newInquiryPayload);
    saveToFile(fileInquiries);

    return NextResponse.json({
      success: true,
      ticketId,
      storageMode,
      message: "Project inquiry received and recorded successfully.",
      data: newInquiryPayload,
    });
  } catch (error) {
    console.error("POST Inquiry API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error saving inquiry." },
      { status: 500 }
    );
  }
}
