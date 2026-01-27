import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import campaignAnalyticsRoutes from "./routes/campaignAnalyticsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";






dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);


/* ---------- SOCKET.IO ---------- */
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`📥 Joined chat room ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});



// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/campaign-analytics", campaignAnalyticsRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/agents", agentRoutes);


// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

