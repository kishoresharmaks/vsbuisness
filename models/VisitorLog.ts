import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisitorLog extends Document {
  timestamp: Date;
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  path: string;
  referrer: string;
  device: string;
  browser: string;
  userAgent: string;
}

const VisitorLogSchema: Schema = new Schema(
  {
    timestamp: { type: Date, default: Date.now, index: true },
    ip: { type: String, default: "127.0.0.1" },
    country: { type: String, default: "Unknown" },
    countryCode: { type: String, default: "UN" },
    region: { type: String, default: "Unknown" },
    city: { type: String, default: "Unknown" },
    path: { type: String, default: "/" },
    referrer: { type: String, default: "Direct" },
    device: { type: String, default: "Desktop" },
    browser: { type: String, default: "Chrome" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true, collection: "VISITOR_LOGS" }
);

const VisitorLogModel: Model<IVisitorLog> =
  mongoose.models.VisitorLog || mongoose.model<IVisitorLog>("VisitorLog", VisitorLogSchema);

export default VisitorLogModel;
