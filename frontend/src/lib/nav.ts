import type { Component } from "vue";
import {
  LayoutDashboard,
  Radio,
  Users,
  ShieldCheck,
  Wrench,
  Fuel,
  Lock,
  UserCircle,
  Bell,
} from "lucide-vue-next";

export type NavItem = {
  to: string;
  label: string;
  icon: Component;
  badge?: number;
  exact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard",                  label: "Fleet Overview",   icon: LayoutDashboard, exact: true },
  { to: "/dashboard/operations",       label: "Live Operations",  icon: Radio },
  { to: "/dashboard/driver-behavior",  label: "Driver Behavior",  icon: Users },
  { to: "/dashboard/safety",           label: "Safety & HSE",     icon: ShieldCheck },
  { to: "/dashboard/maintenance",      label: "Maintenance",      icon: Wrench },
  { to: "/dashboard/fuel-esg",         label: "Fuel / ESG",       icon: Fuel },
  { to: "/dashboard/security",         label: "Security",         icon: Lock },
  { to: "/dashboard/drivers/driver-1", label: "Driver Profiles",  icon: UserCircle },
  { to: "/dashboard/alerts",           label: "Alerts Center",    icon: Bell, badge: 12 },
];
