import { RefreshCcw } from "lucide-react";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout() {
  const { projectId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop

  const project = {
    name: `Project ${projectId}`,
    plan: "Basic",
    wabaStatus: "Pending",
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Topbar
          projectName={project.name}
          plan={project.plan}
          wabaStatus={project.wabaStatus}
          onMenuClick={() => setSidebarOpen(true)}
          onToggleCollapse={() =>
            setSidebarCollapsed((prev) => !prev)
          }
          collapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
