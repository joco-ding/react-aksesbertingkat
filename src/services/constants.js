import { AdminPanelSettings, AdminPanelSettingsOutlined, Dashboard, DashboardOutlined, Settings, SettingsOutlined } from "@mui/icons-material";

export const Pages = {
  Login: { path: '/login' },
  Dashboard: { path: '/', icon: { active: <Dashboard />, inactive: <DashboardOutlined /> }, key: 'dashboard', label: 'Dashboard' },
  Operator: { path: '/operator', icon: { active: <Settings />, inactive: <SettingsOutlined /> }, key: 'operator', label: 'Operator' },
  Admin: { path: '/admin', icon: { active: <AdminPanelSettings />, inactive: <AdminPanelSettingsOutlined /> }, key: 'admin', label: 'Admin' },
}

export const baseURL = 'http://127.0.0.1:8071'

export const path = {
  login: '/user/login'
}