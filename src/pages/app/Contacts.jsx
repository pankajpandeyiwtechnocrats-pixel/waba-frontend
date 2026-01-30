import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getContacts,
  createContact,
  exportContacts,
  bulkDeleteContacts,
  bulkCreateContacts,
} from "../../services/contactService";

import CSVImportPreview from "../../components/CSVImportPreview";

export default function Contacts() {
  const { projectId } = useParams();

  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  /* ---------------- LOAD CONTACTS ---------------- */

  const loadContacts = async () => {
    const data = await getContacts(projectId);
    setContacts(data);
  };

  useEffect(() => {
    if (projectId) loadContacts();
  }, [projectId]);

  /* ---------------- CREATE CONTACT ---------------- */

  const handleCreate = async () => {
    await createContact(projectId, form);
    setShowModal(false);
    setForm({ name: "", phone: "", email: "" });
    loadContacts();
  };

  /* ---------------- BULK SELECT ---------------- */

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === contacts.length) {
      setSelected([]);
    } else {
      setSelected(contacts.map((c) => c._id));
    }
  };

  /* ---------------- BULK DELETE ---------------- */

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Delete ${selected.length} contacts?`
      )
    )
      return;

    await bulkDeleteContacts(projectId, selected);
    setSelected([]);
    loadContacts();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Contacts</h1>

        <div className="flex gap-2">
          {/* IMPORT CSV */}
          <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
            Import CSV
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setCsvFile(file);
              }}
            />
          </label>

          {/* EXPORT CSV */}
          <button
            onClick={() => exportContacts(projectId)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Export CSV
          </button>

          {/* ADD CONTACT */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Contact
          </button>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selected.length > 0 && (
        <div className="mb-4 bg-yellow-50 border p-3 rounded flex justify-between items-center">
          <span className="text-sm">
            {selected.length} selected
          </span>

          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* CONTACTS TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">
              <input
                type="checkbox"
                checked={
                  contacts.length > 0 &&
                  selected.length === contacts.length
                }
                onChange={selectAll}
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr
              key={c._id}
              className={`border-t ${
                selected.includes(c._id)
                  ? "bg-green-50"
                  : ""
              }`}
            >
              <td className="p-2 bg-white">
                <input
                  type="checkbox"
                  checked={selected.includes(c._id)}
                  onChange={() => toggleSelect(c._id)}
                />
              </td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD CONTACT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="font-semibold mb-4">
              Add Contact
            </h2>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="border p-2 w-full mb-2"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="border p-2 w-full mb-4"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <button
              onClick={handleCreate}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* CSV PREVIEW MODAL */}
      {csvFile && (
        <CSVImportPreview
          file={csvFile}
          onCancel={() => setCsvFile(null)}
          onConfirm={async (rows) => {
            await bulkCreateContacts(projectId, rows);
            setCsvFile(null);
            loadContacts();
          }}
        />
      )}
    </div>
  );
}
