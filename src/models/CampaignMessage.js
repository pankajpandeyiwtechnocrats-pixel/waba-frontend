import mongoose from "mongoose";

const campaignMessageSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    contact: {
      type: String, // phone number for now
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read", "failed"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "CampaignMessage",
  campaignMessageSchema
);
