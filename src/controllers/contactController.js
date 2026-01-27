import Contact from "../models/Contact.js";
import Project from "../models/Project.js";
import csvParser from "csv-parser";
import fs from "fs";

// CREATE SINGLE CONTACT
export const createContact = async (req, res) => {
  const { projectId } = req.params;
  const { name, phone, email } = req.body;

  if (!name || !phone) {
    return res
      .status(400)
      .json({ message: "Name and phone required" });
  }

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const contact = await Contact.create({
    name,
    phone,
    email,
    project: projectId,
  });

  res.status(201).json(contact);
};

// GET CONTACTS
export const getContacts = async (req, res) => {
  const { projectId } = req.params;

  const contacts = await Contact.find({
    project: projectId,
  }).sort({ createdAt: -1 });

  res.json(contacts);
};

// IMPORT CONTACTS (CSV)
export const importContacts = async (req, res) => {
  const { projectId } = req.params;
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => {
      if (data.name && data.phone) {
        results.push({
          name: data.name,
          phone: data.phone,
          email: data.email,
          project: projectId,
        });
      }
    })
    .on("end", async () => {
      await Contact.insertMany(results);
      fs.unlinkSync(req.file.path);
      res.json({ message: "Contacts imported", count: results.length });
    });
};

// EXPORT CONTACTS (CSV)
export const exportContacts = async (req, res) => {
  const { projectId } = req.params;

  const contacts = await Contact.find({ project: projectId });

  let csv = "name,phone,email\n";
  contacts.forEach((c) => {
    csv += `${c.name},${c.phone},${c.email || ""}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("contacts.csv");
  res.send(csv);
};



// BULK DELETE CONTACTS
export const bulkDeleteContacts = async (req, res) => {
  const { projectId } = req.params;
  const { contactIds } = req.body;

  if (!Array.isArray(contactIds) || contactIds.length === 0) {
    return res
      .status(400)
      .json({ message: "No contacts selected" });
  }

  await Contact.deleteMany({
    _id: { $in: contactIds },
    project: projectId,
  });

  res.json({ message: "Contacts deleted successfully" });
};


// BULK CREATE CONTACTS (FROM CSV PREVIEW)
export const bulkCreateContacts = async (req, res) => {
  const { projectId } = req.params;
  const { contacts } = req.body;

  if (!Array.isArray(contacts) || contacts.length === 0) {
    return res
      .status(400)
      .json({ message: "No valid contacts" });
  }

  const formatted = contacts.map((c) => ({
    name: c.name,
    phone: c.phone,
    email: c.email,
    project: projectId,
  }));

  await Contact.insertMany(formatted);

  res.json({
    message: "Contacts imported successfully",
    count: formatted.length,
  });
};
