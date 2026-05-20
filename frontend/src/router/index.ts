import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const DashboardLayout = () => import("@/layouts/AppShell.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        name: "fleet-overview",
        component: () => import("@/views/FleetOverview.vue"),
        meta: { title: "Fleet Overview", subtitle: "Executive fleet intelligence snapshot" },
      },
      {
        path: "operations",
        name: "live-operations",
        component: () => import("@/views/LiveOperations.vue"),
        meta: { title: "Live Operations", subtitle: "Real-time fleet map and event feed" },
      },
      {
        path: "driver-behavior",
        name: "driver-behavior",
        component: () => import("@/views/DriverBehavior.vue"),
        meta: { title: "Driver Behavior", subtitle: "Behavioral, eco, safety and discipline scoring" },
      },
      {
        path: "safety",
        name: "safety",
        component: () => import("@/views/Safety.vue"),
        meta: { title: "Safety & HSE", subtitle: "Incidents, ADAS, DSM, fatigue compliance" },
      },
      {
        path: "maintenance",
        name: "maintenance",
        component: () => import("@/views/Maintenance.vue"),
        meta: { title: "Maintenance Intelligence", subtitle: "Vehicle health, DTCs, predictive service" },
      },
      {
        path: "fuel-esg",
        name: "fuel-esg",
        component: () => import("@/views/FuelEsg.vue"),
        meta: { title: "Fuel / ESG", subtitle: "Consumption, CO₂, sustainability ranking" },
      },
      {
        path: "security",
        name: "security",
        component: () => import("@/views/Security.vue"),
        meta: { title: "Security & Anti-Fraud", subtitle: "Tampering, jamming, route deviation" },
      },
      {
        path: "drivers/:id",
        name: "driver-profile",
        component: () => import("@/views/DriverProfile.vue"),
        meta: { title: "Driver Profile", subtitle: "Scores, history, AI coaching" },
      },
      {
        path: "alerts",
        name: "alerts",
        component: () => import("@/views/Alerts.vue"),
        meta: { title: "Alerts Center", subtitle: "Active and historical alert management" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
