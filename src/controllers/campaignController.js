import Campaign from "../models/Campaign.js";
import Project from "../models/Project.js";
import Template from "../models/Template.js";

// CREATE CAMPAIGN
export const createCampaign = async (req, res) => {
  const { projectId } = req.params;
  const { name, templateId } = req.body;

  if (!name || !templateId) {
    return res
      .status(400)
      .json({ message: "Name and template required" });
  }

  // verify project ownership
  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // verify template belongs to project
  const template = await Template.findOne({
    _id: templateId,
    project: projectId,
  });

  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }

  const campaign = await Campaign.create({
    name,
    project: projectId,
    template: templateId,
    createdBy: req.user._id,
  });

  res.status(201).json(campaign);
};

// GET PROJECT CAMPAIGNS
export const getCampaigns = async (req, res) => {
  const { projectId } = req.params;

  const campaigns = await Campaign.find({
    project: projectId,
  })
    .populate("template", "name")
    .sort({ createdAt: -1 });

  res.json(campaigns);
};
