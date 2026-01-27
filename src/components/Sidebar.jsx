import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../utils/logout";
import { useState } from "react";
import {
  LayoutDashboard,
  MessageCircle,
  History,
  Users,
  Megaphone,
  Facebook,
  ShoppingCart,
  GitBranch,
  FileText,
  UserCog,
  BarChart3,
  Plug,
  Settings,
  FolderKanban,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isSettingsActive = location.pathname.includes("settings");

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-white border-r flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <span className="font-bold text-green-600 text-xl">
            WABA
          </span>
          <button className="md:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Core menus */}
          <NavLink to="dashboard" className={navClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="chat" className={navClass}>
            <MessageCircle size={18} /> Live Chat
          </NavLink>

          <NavLink to="chat-history" className={navClass}>
            <History size={18} />Chat History
          </NavLink>

          <NavLink to="contacts" className={navClass}>
            <Users size={18} /> Contacts
          </NavLink>

          <NavLink to="campaigns" className={navClass}>
            <Megaphone size={18} /> Campaigns
          </NavLink>

          <NavLink to="fb-ads" className={navClass}>
            <Facebook size={18} /> FB Ads Manager
          </NavLink>

          <NavLink to="ecomm" className={navClass}>
            <ShoppingCart size={18} /> EComm+
          </NavLink>

          <NavLink to="automation" className={navClass}>
            <GitBranch size={18} /> Automation Flows
          </NavLink>

          <NavLink to="templates" className={navClass}>
            <FileText size={18} /> Templates
          </NavLink>

          <NavLink to="agents" className={navClass}>
            <UserCog size={18} /> Agents
          </NavLink>

          <NavLink to="analytics" className={navClass}>
            <BarChart3 size={18} /> Analytics
          </NavLink>

          <NavLink to="integrations" className={navClass}>
            <Plug size={18} /> Integrations
          </NavLink>

          {/* SETTINGS ACCORDION */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
              isSettingsActive
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-3">
              <Settings size={18} />
              Manage / Settings
            </span>
            {settingsOpen ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {/* SETTINGS SUBMENU */}
          {settingsOpen && (
            <div className="ml-9 mt-1 space-y-1">
              {[
                "template-message",
                "optin-management",
                "live-chat-setting",
                "campaign-setting",
                "user-attributes",
                "canned-messages",
                "agents-setting",
                "tags",
                "analytics",
                "api-keys",
                "billing-usage",
                "notification-preferences",
              ].map((item) => (
                <NavLink
                  key={item}
                  to={`settings/${item}`}
                  className={({ isActive }) =>
                    `block text-sm px-3 py-1.5 rounded-md transition ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-500 hover:bg-gray-100"
                    }`
                  }
                >
                  {formatLabel(item)}
                </NavLink>
              ))}
            </div>
          )}

          <NavLink to="/projects" className={navClass}>
            <FolderKanban size={18} /> All Projects
          </NavLink>
          
        </nav>

        {/* Bottom */}
        <div className="border-t px-3 py-3 space-y-1">
          <NavLink to="profile" className={navClass}>
            <User size={18} /> Profile
          </NavLink>

          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ----------------- helpers ----------------- */

function navClass({ isActive }) {
  return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive
      ? "bg-green-100 text-green-700"
      : "text-gray-600 hover:bg-gray-100"
  }`;
}

function formatLabel(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
