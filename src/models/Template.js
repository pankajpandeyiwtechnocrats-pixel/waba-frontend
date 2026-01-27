import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Marketing", "Utility", "Authentication"],
      default: "Utility",
    },
    language: {
      type: String,
      default: "en",
    },
    content: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
