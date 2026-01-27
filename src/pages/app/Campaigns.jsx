import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCampaigns,
  createCampaign,
} from "../../services/campaignService";
import { getTemplates } from "../../services/templateService";
import CampaignAnalytics from "../../components/CampaignAnalytics";


export default function Campaigns() {
  const { projectId } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    templateId: "",
  });

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      const [c, t] = await Promise.all([
        getCampaigns(projectId),
        getTemplates(projectId),
      ]);
      setCampaigns(c);
      setTemplates(t);
    };

    loadData();
  }, [projectId]);

  const handleCreate = async () => {
    await createCampaign(projectId, form);
    setShowModal(false);
    setForm({ name: "", templateId: "" });

    const updated = await getCampaigns(projectId);
    setCampaigns(updated);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Campaign
        </button>
      </div>

        
      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c._id} className="border rounded-lg p-4">
            <h2 className="font-medium">{c.name}</h2>
            <p className="text-sm text-gray-500">
              Template: {c.template?.name}
            </p>
            <span className="text-xs text-gray-600">
              Status: {c.status}
            </span>
            <CampaignAnalytics campaignId={c._id} />            
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="font-semibold mb-4">New Campaign</h2>

            <input
              placeholder="Campaign name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={form.templateId}
              onChange={(e) =>
                setForm({
                  ...form,
                  templateId: e.target.value,
                })
              }
            >
              <option value="">Select Template</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

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
