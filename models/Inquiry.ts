import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  ticketId: string;
  createdAt: Date;
  status: "New" | "In Contact" | "Quoted" | "Converted" | "Archived";
  adminNotes?: string;
  couponCode?: string;
  client: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  project: {
    type: string;
    scope: string;
    budget: string;
    timeline: string;
    features: string[];
    customFeatureText?: string;
    description: string;
  };
}

const InquirySchema: Schema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["New", "In Contact", "Quoted", "Converted", "Archived"],
      default: "New",
    },
    adminNotes: { type: String, default: "" },
    couponCode: { type: String, default: "" },
    client: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      company: { type: String, default: "N/A" },
      phone: { type: String, default: "N/A" },
    },
    project: {
      type: { type: String, required: true },
      scope: { type: String, required: true },
      budget: { type: String, required: true },
      timeline: { type: String, required: true },
      features: { type: [String], default: [] },
      customFeatureText: { type: String, default: "" },
      description: { type: String, required: true },
    },
  },
  { timestamps: true, collection: "VS BUISNESS" }
);

if (mongoose.models.Inquiry && !mongoose.models.Inquiry.schema.paths.couponCode) {
  delete (mongoose.models as any).Inquiry;
}

const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default InquiryModel;
