import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    status: {
      type: String,
      enum: ["requesting", "intervened", "closed", "blocked"],
      default: "requesting",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    intervenedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["contact", "agent", "system"],
          required: true,
        },
        text: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
