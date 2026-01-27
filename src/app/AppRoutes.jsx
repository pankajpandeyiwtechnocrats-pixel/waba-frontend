import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProjectList from "../pages/projects/ProjectList";
import Dashboard from "../pages/app/Dashboard";
import AppLayout from "../layouts/AppLayout";
import LiveChat from "../pages/app/LiveChat";
import History from "../pages/app/History";
import Contacts from "../pages/app/Contacts";
import Campaigns from "../pages/app/Campaigns";
import FbAdsManager from "../pages/app/FbAdsManager";
import AutomationFlows from "../pages/app/AutomationFlows";
import Integrations from "../pages/app/Integrations";
import ECommPlus from "../pages/app/ECommPlus";
import Profile from "../pages/app/Profile";
import Templates from "../pages/app/Templates";
import Agents from "../pages/app/Agents";
import Analytics from "../pages/app/Analytics";
import OptinManagement from "../pages/app/settings/OptinManagement";
import TemplateMessageSetting from "../pages/app/settings/TemplateMessageSetting";
import LiveChatSetting from "../pages/app/settings/LiveChatSetting";
import CampaignSetting from "../pages/app/settings/CampaignSetting";
import UserAttributes from "../pages/app/settings/UserAttributes";
import CannedMessages from "../pages/app/settings/CannedMessages";
import AgentSettings from "../pages/app/settings/AgentSettings";
import TagsSetting from "../pages/app/settings/TagsSetting";
import AnalyticsSetting from "../pages/app/settings/AnalyticsSetting";
import ApiKeys from "../pages/app/settings/ApiKeys";
import BillingUsage from "../pages/app/settings/BillingUsage";
import NotificationPreferences from "../pages/app/settings/NotificationPreferences";
import ChatHistory from "../pages/app/ChatHistory";








export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="chat" element={<LiveChat />} />
      <Route path="chat-history" element={<ChatHistory />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="campaigns" element={<Campaigns />} />
      <Route path="fb-ads" element={<FbAdsManager />} />
      <Route path="automation" element={<AutomationFlows />} />
      <Route path="integrations" element={<Integrations />} />
      <Route path="ecomm" element={<ECommPlus />} />
      <Route path="profile" element={<Profile />} />
      <Route path="templates" element={<Templates />} />
      <Route path="agents" element={<Agents />} />
      <Route path="analytics" element={<Analytics />} />
      <Route
        path="settings/optin-management"
        element={<OptinManagement />}
        />
      <Route
        path="settings/template-message"
        element={<TemplateMessageSetting />}
        />
      <Route
        path="settings/live-chat-setting"
        element={<LiveChatSetting />}
        />
      <Route
        path="settings/campaign-setting"
        element={<CampaignSetting />}
        />
      <Route
        path="settings/user-attributes"
        element={<UserAttributes />}
        />
      <Route
        path="settings/canned-messages"
        element={<CannedMessages />}
        />
      <Route
        path="settings/agents-setting"
        element={<AgentSettings />}
        />
      <Route
        path="settings/tags"
        element={<TagsSetting />}
        />
      <Route
        path="settings/analytics"
        element={<AnalyticsSetting />}
        />
      <Route
        path="settings/api-keys"
        element={<ApiKeys />}
        />
        <Route
        path="settings/billing-usage"
        element={<BillingUsage />}
        />
        <Route
        path="settings/notification-preferences"
        element={<NotificationPreferences />}
        />





      {/* App inside project */}
      <Route path="/app/:projectId" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat" element={<LiveChat />} />
        <Route path="chat-history" element={<ChatHistory />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="fb-ads" element={<FbAdsManager />} />
        <Route path="automation" element={<AutomationFlows />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="ecomm" element={<ECommPlus />} />
        <Route path="profile" element={<Profile />} />
        <Route path="templates" element={<Templates />} />
        <Route path="agents" element={<Agents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route
        path="settings/optin-management"
        element={<OptinManagement />}
        />
        <Route
        path="settings/template-message"
        element={<TemplateMessageSetting />}
        />
        <Route
        path="settings/live-chat-setting"
        element={<LiveChatSetting />}
        />
        <Route
        path="settings/campaign-setting"
        element={<CampaignSetting />}
        />
        <Route
        path="settings/user-attributes"
        element={<UserAttributes />}
        />
        <Route
        path="settings/canned-messages"
        element={<CannedMessages />}
        />
        <Route
        path="settings/agents-setting"
        element={<AgentSettings />}
        />
        <Route
        path="settings/tags"
        element={<TagsSetting />}
        />
        <Route
        path="settings/analytics"
        element={<AnalyticsSetting />}
        />
        <Route
        path="settings/api-keys"
        element={<ApiKeys />}
        />
        <Route
        path="settings/billing-usage"
        element={<BillingUsage />}
        />
        <Route
        path="settings/notification-preferences"
        element={<NotificationPreferences />}
        />

      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
