import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTemplates,
  createTemplate,
} from "../../services/templateService";

export default function Templates() {
  const { projectId } = useParams();
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Utility",
    language: "en",
    content: "",
  });

  useEffect(() => {
    if (!projectId) return;

    const loadTemplates = async () => {
      try {
        const data = await getTemplates(projectId);
        setTemplates(data);
      } catch (err) {
        console.error("Failed to load templates", err);
      }
    };

    loadTemplates();
  }, [projectId]);

  const handleCreate = async () => {
    try {
      await createTemplate(projectId, form);
      setShowModal(false);
      setForm({
        name: "",
        category: "Utility",
        language: "en",
        content: "",
      });

      // reload templates after create
      const data = await getTemplates(projectId);
      setTemplates(data);
    } catch (err) {
      console.error("Failed to create template", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Templates</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Template
        </button>
      </div>

      <div className="space-y-4">
        {templates.map((t) => (
          <div key={t._id} className="border rounded-lg p-4">
            <h2 className="font-medium">{t.name}</h2>
            <p className="text-sm text-gray-500">
              {t.category} • {t.language}
            </p>
            <p className="mt-2 text-sm">{t.content}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="font-semibold mb-4">New Template</h2>

            <input
              placeholder="Template name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-2"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Utility</option>
              <option>Marketing</option>
              <option>Authentication</option>
            </select>

            <textarea
              placeholder="Message content"
              className="border p-2 w-full mb-4"
              rows={4}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <button
              onClick={handleCreate}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
