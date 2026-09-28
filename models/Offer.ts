import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOffer extends Document {
  title: string;
  message: string;
  discountTag?: string;
  badgeText?: string;
  ctaText: string;
  ctaLink: string;
  theme: "blue" | "emerald" | "amber" | "dark" | "purple";
  position: "top-bar" | "floating-toast" | "modal";
  isActive: boolean;
  expiresAt?: Date | null;
  createdAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    discountTag: { type: String, default: "" },
    badgeText: { type: String, default: "LIMITED OFFER" },
    ctaText: { type: String, default: "Claim Offer →" },
    ctaLink: { type: String, default: "/start-project" },
    theme: {
      type: String,
      enum: ["blue", "emerald", "amber", "dark", "purple"],
      default: "blue",
    },
    position: {
      type: String,
      enum: ["top-bar", "floating-toast", "modal"],
      default: "floating-toast",
    },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: "VS OFFERS" }
);

const OfferModel: Model<IOffer> =
  mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);

export default OfferModel;
