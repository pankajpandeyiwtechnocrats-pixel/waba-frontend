import express from "express";
import multer from "multer";
import auth from "../middleware/authMiddleware.js";
import { bulkCreateContacts } from "../controllers/contactController.js";
import {
  createContact,
  getContacts,
  importContacts,
  exportContacts,
  bulkDeleteContacts,
} from "../controllers/contactController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/:projectId", auth, createContact);
router.get("/:projectId", auth, getContacts);

router.post(
  "/import/:projectId",
  auth,
  upload.single("file"),
  importContacts
);

router.get(
  "/export/:projectId",
  auth,
  exportContacts
);

router.post(
  "/bulk-delete/:projectId",
  auth,
  bulkDeleteContacts
);

router.post(
  "/bulk-create/:projectId",
  auth,
  bulkCreateContacts
);



export default router;
