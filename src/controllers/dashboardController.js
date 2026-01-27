import Project from "../models/Project.js";

export const getDashboardStats = async (req, res) => {
  const { projectId } = req.params;

  // verify project belongs to user
  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  // TEMPORARY DUMMY DATA (will replace later)
  const stats = {
    projectName: project.name,
    totalContacts: 0,
    totalConversations: 0,
    liveChats: 0,
    campaigns: 0,
  };

  res.json(stats);
};
