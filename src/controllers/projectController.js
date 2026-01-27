import Project from "../models/Project.js";

// 🟢 CREATE PROJECT
export const createProject = async (req, res) => {
  const { name, mobileNumber } = req.body;

  if (!name || !mobileNumber) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  const project = await Project.create({
    name,
    mobileNumber,
    owner: req.user._id,
  });

  res.status(201).json(project);
};

// 🔵 GET USER PROJECTS
export const getProjects = async (req, res) => {
  const projects = await Project.find({
    owner: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(projects);
};
