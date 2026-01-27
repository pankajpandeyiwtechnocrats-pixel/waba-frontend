import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDashboardStats } from "../../services/dashboardService";

export default function Dashboard() {
  const { projectId } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats(projectId).then(setStats);
  }, [projectId]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">
            Active Project
          </p>
          <p className="font-mono mt-2">
            {stats.projectName}
          </p>
        </div>
      </div>
    </div>
  );
}
