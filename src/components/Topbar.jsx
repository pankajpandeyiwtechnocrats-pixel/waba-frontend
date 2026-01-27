import {
  Menu,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Topbar({
  projectName,
  plan = "Basic",
  wabaStatus = "Pending",
  onMenuClick,  
}) {
  const isLive = wabaStatus === "Live";

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        
        {/* Project Name */}
        <div className="min-w-0 max-w-[180px] sm:max-w-[260px]">
          <p className="text-xs text-gray-500">Project</p>
          <p
            className="font-semibold text-gray-800 truncate whitespace-nowrap"
            title={projectName}
          >
            {projectName}
          </p>
        </div>

        {/* Current Plan (hide on very small screens) */}
        <div className="hidden sm:flex text-sm">
          <span className="text-gray-500">Plan:&nbsp;</span>
          <span className="font-medium">{plan}</span>
        </div>

        {/* WhatsApp API Status */}
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isLive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {wabaStatus}
        </span>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Explore Plans (desktop & tablet) */}
        <button className="hidden sm:inline-flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Explore Plans
        </button>

        {/* Refresh */}
        <button
          title="Refresh"
          onClick={() => window.location.reload()}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <RefreshCcw size={18} />
        </button>
      </div>
    </header>
  );
}
