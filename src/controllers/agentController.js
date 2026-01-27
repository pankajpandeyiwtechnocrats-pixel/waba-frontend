import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* CREATE AGENT */
export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role || "agent",
    });

    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET AGENTS */
export const getAgents = async (req, res) => {
  const agents = await User.find({ role: "agent" }).select("-password");
  res.json(agents);
};

/* GET AGENT BY ID */
export const getAgentById = async (req, res) => {
  const agent = await User.findById(req.params.id).select("-password");
  res.json(agent);
};

/* UPDATE AGENT */
export const updateAgent = async (req, res) => {
  const agent = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");
  res.json(agent);
};

/* DELETE AGENT */
export const deleteAgent = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Agent deleted" });
};
