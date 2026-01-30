import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProject,
  getProjects,
} from "../../services/projectService";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    loadProjects();
  }, []);

  // Close modal helper
  const closeModal = () => {
    setShowModal(false);
    setName("");
    setMobileNumber("");
  };

  // ESC key support
  useEffect(() => {
    if (!showModal) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  const handleCreate = async () => {
    const project = await createProject({
      name,
      mobileNumber,
    });

    localStorage.setItem(
      "currentProject",
      JSON.stringify(project)
    );

    navigate(`/app/${project._id}/dashboard`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">
          Projects
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            onClick={() =>
              navigate(`/app/${p._id}/dashboard`)
            }
            className="border bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-medium">{p.name}</h2>
            <p className="text-sm text-gray-500">
              {p.mobileNumber}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={closeModal} // click outside closes
        >
          <div
            className="bg-white p-6 rounded-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="font-semibold mb-4">
              Create Project
            </h2>

            <input
              placeholder="Project name"
              className="w-full border p-2 mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="WhatsApp number"
              className="w-full border p-2 mb-4"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value)
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
