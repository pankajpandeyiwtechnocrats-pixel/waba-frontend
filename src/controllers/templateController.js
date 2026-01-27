import Template from "../models/Template.js";
import Project from "../models/Project.js";

// CREATE TEMPLATE
export const createTemplate = async (req, res) => {
  const { projectId } = req.params;
  const { name, category, language, content } = req.body;

  if (!name || !content) {
    return res
      .status(400)
      .json({ message: "Name and content are required" });
  }

  // verify project ownership
  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const template = await Template.create({
    name,
    category,
    language,
    content,
    project: projectId,
    createdBy: req.user._id,
  });

  res.status(201).json(template);
};

// GET ALL TEMPLATES FOR PROJECT
export const getTemplates = async (req, res) => {
  const { projectId } = req.params;

  const templates = await Template.find({
    project: projectId,
  }).sort({ createdAt: -1 });

  res.json(templates);
};
