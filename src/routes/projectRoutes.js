import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);

router.get("/:projectId", auth, async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

export default router;
