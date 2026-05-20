export type VehicleMarker = {
  id: string;
  lat: number;
  lng: number;
  status: "driving" | "idle" | "stopped" | "alert";
  plate: string;
  driver: string;
  speed: number;
};

export type Alert = {
  id: string;
  type: "Harsh Braking" | "Speeding" | "Geofence Exit" | "Crash Detected" | "Idle";
  detail: string;
  time: string;
  severity: "critical" | "high" | "medium" | "low";
};

export type DriverRank = {
  rank: number;
  name: string;
  initials: string;
  avatarColor: string;
  score: number;
  status: "top" | "watch" | "risk";
};

// ─── Fleet Overview ────────────────────────────────────────────────────────

export const fleetKpis = {
  safetyScore: 87,
  activeVehicles: 342,
  activeDrivers: 289,
  fuelEfficiency: 8.2,
  co2Tons: 45.2,
  fleetAvailability: 94.2,
  totalDistanceKm: 184_320,
};

export const fleetMarkers: VehicleMarker[] = [
  { id: "v01", lat: 40.7589, lng: -73.9851, status: "driving", plate: "FL-2241", driver: "Jason Menson", speed: 42 },
  { id: "v02", lat: 40.7505, lng: -73.9934, status: "driving", plate: "FL-1108", driver: "John Velletta", speed: 38 },
  { id: "v03", lat: 40.7282, lng: -73.9942, status: "idle",    plate: "FL-3389", driver: "Dotlia Tenior", speed: 0 },
  { id: "v04", lat: 40.7614, lng: -73.9776, status: "driving", plate: "FL-7720", driver: "Janne Yürien", speed: 51 },
  { id: "v05", lat: 40.7831, lng: -73.9712, status: "driving", plate: "FL-4412", driver: "Kam Babot", speed: 29 },
  { id: "v06", lat: 40.7411, lng: -74.0050, status: "stopped", plate: "FL-9920", driver: "Eric Mehrtens", speed: 0 },
  { id: "v07", lat: 40.7196, lng: -74.0035, status: "driving", plate: "FL-2003", driver: "Sara Lin", speed: 47 },
  { id: "v08", lat: 40.7689, lng: -73.9854, status: "driving", plate: "FL-6651", driver: "Mateo Rivera", speed: 35 },
  { id: "v09", lat: 40.7050, lng: -74.0089, status: "alert",   plate: "FL-1187", driver: "Aiko Tanaka", speed: 71 },
  { id: "v10", lat: 40.7935, lng: -73.9628, status: "driving", plate: "FL-5520", driver: "Liam O'Connor", speed: 33 },
  { id: "v11", lat: 40.7430, lng: -73.9712, status: "driving", plate: "FL-8819", driver: "Priya Shah", speed: 44 },
  { id: "v12", lat: 40.7150, lng: -74.0145, status: "idle",    plate: "FL-2245", driver: "Noah Becker", speed: 0 },
  { id: "v13", lat: 40.7790, lng: -73.9580, status: "driving", plate: "FL-3308", driver: "Marta Costa", speed: 39 },
  { id: "v14", lat: 40.7250, lng: -73.9810, status: "driving", plate: "FL-6604", driver: "Yusuf Demir", speed: 41 },
  { id: "v15", lat: 40.7480, lng: -73.9712, status: "driving", plate: "FL-1142", driver: "Zoe Park", speed: 36 },
  { id: "v16", lat: 40.7620, lng: -73.9620, status: "driving", plate: "FL-4001", driver: "Hugo Brandt", speed: 32 },
  { id: "v17", lat: 40.7340, lng: -73.9920, status: "alert",   plate: "FL-7711", driver: "Ines Lopez", speed: 62 },
  { id: "v18", lat: 40.7060, lng: -73.9925, status: "driving", plate: "FL-2920", driver: "Tomás Vidal", speed: 28 },
  { id: "v19", lat: 40.7560, lng: -73.9410, status: "driving", plate: "FL-3344", driver: "Hannah Schmidt", speed: 45 },
  { id: "v20", lat: 40.7895, lng: -73.9540, status: "idle",    plate: "FL-1098", driver: "Diego Rojas", speed: 0 },
  { id: "v21", lat: 40.7320, lng: -73.9560, status: "driving", plate: "FL-5577", driver: "Mei Chen", speed: 37 },
  { id: "v22", lat: 40.7480, lng: -74.0020, status: "driving", plate: "FL-8821", driver: "Ola Nordström", speed: 31 },
  { id: "v23", lat: 40.7110, lng: -74.0150, status: "driving", plate: "FL-3399", driver: "Kemal Yilmaz", speed: 40 },
  { id: "v24", lat: 40.7800, lng: -73.9750, status: "driving", plate: "FL-2230", driver: "Anaïs Petit", speed: 43 },
];

export const safetyTrend = [
  { month: "Jan", score: 60 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 86 },
  { month: "May", score: 84 },
  { month: "Jun", score: 94 },
];

export const riskDistribution = [
  { name: "Low",      value: 142, color: "#22C55E" },
  { name: "Medium",   value: 78,  color: "#FACC15" },
  { name: "Elevated", value: 49,  color: "#F5A623" },
  { name: "High",     value: 20,  color: "#EF4444" },
];

export const recentAlerts: Alert[] = [
  { id: "a1", type: "Harsh Braking", detail: "Speed dropped 32 km/h in 1.4s", time: "13:55", severity: "high" },
  { id: "a2", type: "Harsh Braking", detail: "Geofence: Warehouse East",      time: "10:19", severity: "high" },
  { id: "a3", type: "Speeding",       detail: "112 km/h in 80 zone — I-95",   time: "10:53", severity: "medium" },
  { id: "a4", type: "Harsh Braking",  detail: "Repeated within 200 m",        time: "22:33", severity: "critical" },
  { id: "a5", type: "Geofence Exit",  detail: "Vehicle FL-7720 left HQ zone", time: "08:12", severity: "low" },
];

export const driverRanking: DriverRank[] = [
  { rank: 1, name: "Jason Menson",   initials: "JM", avatarColor: "#F5A623", score: 95, status: "top" },
  { rank: 2, name: "John Velletta",  initials: "JV", avatarColor: "#3B82F6", score: 92, status: "top" },
  { rank: 3, name: "Dotlia Tenior",  initials: "DT", avatarColor: "#22C55E", score: 86, status: "watch" },
  { rank: 4, name: "Janne Yürien",   initials: "JY", avatarColor: "#A855F7", score: 81, status: "watch" },
  { rank: 5, name: "Kam Babot",      initials: "KB", avatarColor: "#EF4444", score: 74, status: "watch" },
];

// ─── Live Operations ───────────────────────────────────────────────────────

export const liveStatusCounters = {
  driving: 187,
  idle: 89,
  stopped: 42,
  offline: 24,
  totalActive: 342,
  realtimeAlerts: 4,
};

export type LiveEvent = {
  id: string;
  time: string;
  vehicleId: string;
  driverName: string;
  type: "Speeding Alert" | "Harsh Brake" | "Geofence Exit" | "Idle Alert" | "Crash Detected";
  severity: "critical" | "high" | "medium" | "low";
};

export const liveEvents: LiveEvent[] = [
  { id: "le1", time: "12:45:01 PM", vehicleId: "V-101", driverName: "John V.",     type: "Speeding Alert",  severity: "high" },
  { id: "le2", time: "12:44:12 PM", vehicleId: "V-045", driverName: "Jason M.",    type: "Harsh Brake",     severity: "high" },
  { id: "le3", time: "12:43:55 PM", vehicleId: "V-089", driverName: "Dotlia T.",   type: "Geofence Exit",   severity: "medium" },
  { id: "le4", time: "12:43:55 PM", vehicleId: "V-089", driverName: "Dotlia T.",   type: "Geofence Exit",   severity: "medium" },
  { id: "le5", time: "12:44:12 PM", vehicleId: "V-045", driverName: "Jason M.",    type: "Harsh Brake",     severity: "high" },
  { id: "le6", time: "12:43:12 PM", vehicleId: "V-089", driverName: "Janne Y.",    type: "Geofence Exit",   severity: "medium" },
  { id: "le7", time: "12:43:55 PM", vehicleId: "V-089", driverName: "Kam B.",      type: "Geofence Exit",   severity: "low" },
  { id: "le8", time: "12:43:55 PM", vehicleId: "V-089", driverName: "Eric M.",     type: "Geofence Exit",   severity: "low" },
];

export type VehicleStatusRow = {
  vehicleId: string;
  driver: string;
  initials: string;
  avatarColor: string;
  status: "Driving" | "Stopped" | "Idle" | "Offline";
  speed: number;
  location: string;
};

export const vehicleStatusTable: VehicleStatusRow[] = [
  { vehicleId: "V-101", driver: "Jason Menson",   initials: "JM", avatarColor: "#F5A623", status: "Driving", speed: 55, location: "Manhattan, I-95" },
  { vehicleId: "V-045", driver: "John Velletta",  initials: "JV", avatarColor: "#3B82F6", status: "Stopped", speed: 55, location: "Manhattan, I-95" },
  { vehicleId: "V-089", driver: "Dotlia Tenior",  initials: "DT", avatarColor: "#22C55E", status: "Stopped", speed: 55, location: "Manhattan, I-95" },
  { vehicleId: "V-089", driver: "Janne Yürien",   initials: "JY", avatarColor: "#A855F7", status: "Idle",    speed: 40, location: "Manhattan, I-95" },
  { vehicleId: "V-097", driver: "Kam Babot",       initials: "KB", avatarColor: "#EF4444", status: "Driving", speed: 55, location: "Manhattan, I-95" },
];

// ─── Driver Behavior Analytics ─────────────────────────────────────────────

export const behaviorScores = {
  behavioral: 82,
  safety: 87,
  eco: 74,
  maintainability: 79,
  discipline: 91,
};

export type DriverBehaviorRow = {
  rank: number;
  name: string;
  initials: string;
  avatarColor: string;
  safetyScore: number;
  harshPer100km: number;
  speedingPct: number;
  riskBadge: "Expert" | "Gold" | "Risk";
};

export const driverBehaviorTable: DriverBehaviorRow[] = [
  { rank: 1,  name: "J. Nelson",   initials: "JN", avatarColor: "#F5A623", safetyScore: 150, harshPer100km: 2.4,  speedingPct: 94, riskBadge: "Expert" },
  { rank: 2,  name: "S. Petrovic", initials: "SP", avatarColor: "#3B82F6", safetyScore: 87,  harshPer100km: 15,   speedingPct: 93, riskBadge: "Gold" },
  { rank: 3,  name: "K. Baboit",   initials: "KB", avatarColor: "#EF4444", safetyScore: 93,  harshPer100km: 13,   speedingPct: 25, riskBadge: "Risk" },
  { rank: 4,  name: "D. Kenor",    initials: "DK", avatarColor: "#22C55E", safetyScore: 93,  harshPer100km: 13,   speedingPct: 93, riskBadge: "Gold" },
  { rank: 5,  name: "A. Yürien",   initials: "AY", avatarColor: "#A855F7", safetyScore: 87,  harshPer100km: 23,   speedingPct: 98, riskBadge: "Gold" },
  { rank: 6,  name: "B. Dotia",    initials: "BD", avatarColor: "#F59E0B", safetyScore: 67,  harshPer100km: 18,   speedingPct: 30, riskBadge: "Gold" },
  { rank: 7,  name: "J. Nelson",   initials: "JN", avatarColor: "#EC4899", safetyScore: 65,  harshPer100km: 20,   speedingPct: 74, riskBadge: "Risk" },
  { rank: 8,  name: "S. Velletta", initials: "SV", avatarColor: "#10B981", safetyScore: 96,  harshPer100km: 14,   speedingPct: 26, riskBadge: "Risk" },
  { rank: 9,  name: "A. Riant",    initials: "AR", avatarColor: "#6366F1", safetyScore: 95,  harshPer100km: 14,   speedingPct: 25, riskBadge: "Risk" },
  { rank: 10, name: "M. Costa",    initials: "MC", avatarColor: "#8B5CF6", safetyScore: 88,  harshPer100km: 11,   speedingPct: 91, riskBadge: "Gold" },
];

export const harshEventsBreakdown = [
  { driver: "Acceleration", accel: 21, braking: 18, cornering: 12 },
  { driver: "Braking",      accel: 14, braking: 22, cornering: 8 },
  { driver: "Cornering",    accel: 9,  braking: 11, cornering: 16 },
];

export const speedingAnalysis = [
  { month: "Jan", value: 58 },
  { month: "Feb", value: 62 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 85 },
  { month: "May", value: 82 },
  { month: "Jun", value: 90 },
];

export type DSMViolationRow = {
  rank: number;
  name: string;
  fatigue: number;
  phoneUse: number;
  seatbelt: number;
};

export const dsmViolations: DSMViolationRow[] = [
  { rank: 1, name: "J. Nelson",      fatigue: 8, phoneUse: 6, seatbelt: 3 },
  { rank: 2, name: "S. Petrovic",    fatigue: 8, phoneUse: 7, seatbelt: 5 },
  { rank: 3, name: "John Velletta",  fatigue: 6, phoneUse: 2, seatbelt: 4 },
  { rank: 4, name: "John Tentor",    fatigue: 5, phoneUse: 8, seatbelt: 3 },
  { rank: 5, name: "Dotia Tenior",   fatigue: 7, phoneUse: 4, seatbelt: 5 },
  { rank: 6, name: "Janne Yürien",   fatigue: 4, phoneUse: 5, seatbelt: 3 },
  { rank: 7, name: "Janne Yürien",   fatigue: 3, phoneUse: 6, seatbelt: 4 },
  { rank: 8, name: "Kam Babot",      fatigue: 5, phoneUse: 5, seatbelt: 9 },
];

// ─── Safety & HSE ──────────────────────────────────────────────────────────

export const safetyKpis = {
  seatbeltCompliance: 96.3,
  crashIncidents: 2,
  daysWithoutAccident: 47,
  nearMisses: 12,
  adasWarningRate: 1.8,
  safetyCompliance: 94,
};

export const incidentTimeline = [
  { month: "Jan", label: "Crash, Truck 114", description: "Rear-end collision at intersection" },
  { month: "Mar", label: "Crash, Truck 99",  description: "Side swipe during lane merge" },
  { month: "May", label: "Crash, Truck 116", description: "Low-speed parking lot collision" },
  { month: "Jul", label: "Crash, Truck 55",  description: "T-bone at uncontrolled intersection" },
  { month: "Sep", label: "Crash, Truck",     description: "Rollover on highway exit ramp" },
];

export const adasBreakdown = [
  { name: "Collision Warning",    value: 74 },
  { name: "Lane Departure",       value: 58 },
  { name: "Pedestrian Detection", value: 51 },
  { name: "Tailgating",           value: 38 },
];

export const dsmSafetyViolations = [
  { name: "Fatigue",              value: 38, color: "#EF4444" },
  { name: "Phone Use",            value: 32, color: "#F5A623" },
  { name: "General Distraction",  value: 30, color: "#FACC15" },
];

export const accidentTrend = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 73 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 96 },
  { month: "May", value: 29 },
  { month: "Jun", value: 76 },
  { month: "Jul", value: 36 },
  { month: "Aug", value: 85 },
  { month: "Sep", value: 33 },
  { month: "Oct", value: 16 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 16 },
];

export const safetyHeatmapMarkers = [
  { lat: 40.7580, lng: -73.9855, intensity: 0.9 },
  { lat: 40.7490, lng: -73.9680, intensity: 0.7 },
  { lat: 40.7350, lng: -73.9910, intensity: 0.85 },
  { lat: 40.7200, lng: -74.0050, intensity: 0.6 },
  { lat: 40.7650, lng: -73.9550, intensity: 0.75 },
  { lat: 40.7100, lng: -73.9780, intensity: 0.95 },
  { lat: 40.7420, lng: -73.9830, intensity: 0.5 },
  { lat: 40.7700, lng: -73.9700, intensity: 0.65 },
];

// ─── Fuel & ESG ────────────────────────────────────────────────────────────

export const fuelKpis = {
  fuelEfficiency: 8.2,
  totalFuelConsumed: 12_450,
  idleFuelWaste: 14.2,
  ecoScore: 74,
  co2Emissions: 45.2,
  carbonReduction: -8.3,
};

export const fuelConsumptionTrend = [
  { month: "Jan", value: 5.2 },
  { month: "Feb", value: 6.8 },
  { month: "Mar", value: 7.1 },
  { month: "Apr", value: 6.4 },
  { month: "May", value: 5.9 },
  { month: "Jun", value: 6.2 },
  { month: "Jul", value: 7.4 },
  { month: "Aug", value: 6.8 },
  { month: "Sep", value: 5.5 },
  { month: "Oct", value: 6.1 },
  { month: "Nov", value: 7.2 },
  { month: "Dec", value: 6.6 },
];

export const fuelWasteBreakdown = [
  { name: "Driving",  value: 52, color: "#F5A623" },
  { name: "Idle",     value: 24, color: "#E8950E" },
  { name: "PTO",      value: 14, color: "#EF4444" },
  { name: "Braking",  value: 10, color: "#FFB84D" },
];

export const co2EmissionsTrend = [
  { month: "Jan", actual: 320,  target: 900 },
  { month: "Feb", actual: 340,  target: 900 },
  { month: "Mar", actual: 380,  target: 900 },
  { month: "Apr", actual: 410,  target: 900 },
  { month: "May", actual: 450,  target: 900 },
  { month: "Jun", actual: 520,  target: 900 },
  { month: "Jul", actual: 580,  target: 900 },
  { month: "Aug", actual: 640,  target: 900 },
  { month: "Sep", actual: 710,  target: 900 },
  { month: "Oct", actual: 790,  target: 900 },
  { month: "Nov", actual: 860,  target: 900 },
  { month: "Dec", actual: 940,  target: 900 },
];

export type SustainabilityDriverRow = {
  rank: number;
  name: string;
  initials: string;
  avatarColor: string;
  score: number;
  status: number;
  greenScore: number;
};

export const sustainabilityDrivers: SustainabilityDriverRow[] = [
  { rank: 1, name: "Jason Menson",  initials: "JM", avatarColor: "#F5A623", score: 150, status: 100, greenScore: 79 },
  { rank: 2, name: "John Velletta", initials: "JV", avatarColor: "#3B82F6", score: 100, status: 93,  greenScore: 66 },
];

export const carbonBudget = {
  used: 67,
  budgetCap: 100,
};

// ─── Security & Anti-Fraud ─────────────────────────────────────────────────

export const securityKpis = {
  gpsTampering: 3,
  unauthorizedStops: 11,
  towingAlerts: 1,
  gsmJamming: 1,
  gsmJammingLive: 0,
  unauthorizedUsage: 4,
};

export type SecurityEvent = {
  id: string;
  time: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  detail: string;
};

export const securityEvents: SecurityEvent[] = [
  { id: "se1", time: "10:58 AM", title: "Fuel Theft Detected",       severity: "critical", detail: "Speeding speeding at 2.4 hmh" },
  { id: "se2", time: "15:39 AM", title: "Fuel Theft Detected",       severity: "critical", detail: "Speeding speeding at 2.4 hmh" },
  { id: "se3", time: "10:19 AM", title: "Unauthorized Ignition",     severity: "high",     detail: "Speeding speeding kWh" },
  { id: "se4", time: "10:19 AM", title: "Unauthorized Ignition",     severity: "high",     detail: "Speeding at 2.4 hmh" },
  { id: "se5", time: "10:33 AM", title: "Unauthorized Ignition",     severity: "high",     detail: "Speeding at 2.4 hmh" },
  { id: "se6", time: "10:33 AM", title: "Unauthorized Ignition",     severity: "high",     detail: "Speeding at 2.4 hmh" },
  { id: "se7", time: "10:33 AM", title: "Unauthorized Ignition",     severity: "high",     detail: "Speeding at 2.4 hmh" },
];

export type GeofenceViolationRow = {
  vehicle: string;
  driver: string;
  location: string;
  time: string;
};

export const geofenceViolations: GeofenceViolationRow[] = [
  { vehicle: "A1", driver: "Jasot",   location: "New Yo...", time: "6:53 PM" },
  { vehicle: "A2", driver: "John",    location: "New Yo...", time: "9:30 AM" },
  { vehicle: "A3", driver: "Veliota", location: "New Yo...", time: "6:53 PM" },
  { vehicle: "A4", driver: "Janne",   location: "New Yo...", time: "6:20 PM" },
  { vehicle: "A5", driver: "Dotia E", location: "New Yo...", time: "6:33 PM" },
];

export const fraudAnomalyScores = {
  vehicles: ["Vehicle", "Vehicle", "Vehicle", "Vehicle"],
  categories: ["Fuel Siphoning", "Card Skimming", "Mileage Tampering", "Idle Usage"],
  // 0 = low, 1 = medium, 2 = high
  data: [
    [1, 2, 2, 0],
    [0, 1, 2, 1],
    [2, 0, 1, 2],
    [1, 1, 0, 1],
  ] as number[][],
};

export const unauthorizedDoorOpenings = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 55 },
  { month: "May", value: 68 },
];

export const routeDeviationMarkers = [
  { lat: 40.7580, lng: -73.9855, type: "planned" as const },
  { lat: 40.7490, lng: -73.9680, type: "actual" as const },
  { lat: 40.7200, lng: -74.0050, type: "deviation" as const },
];

// ─── Maintenance Intelligence ──────────────────────────────────────────────

export const maintenanceKpis = {
  vehiclesNeedingService: 12,
  activeDtcs: 38,
  engineIdlePct: 17.3,
  preservationScore: 84,
  maintenanceWarnings: 9,
};

export type VehicleHealthRow = {
  vehicle: string;
  plate: string;
  healthScore: number;            // 0–100
  dtcs: number;
  serviceDueKm: number;           // negative = overdue
  coolantTemp: number;            // °C
  brakeWearPct: number;           // 0–100
  status: "ok" | "warning" | "critical";
};

export const vehicleHealthRows: VehicleHealthRow[] = [
  { vehicle: "V-01", plate: "TR-2401", healthScore: 92, dtcs: 0, serviceDueKm:  5800, coolantTemp: 86, brakeWearPct: 24, status: "ok" },
  { vehicle: "V-02", plate: "TR-2402", healthScore: 81, dtcs: 1, serviceDueKm:  3120, coolantTemp: 88, brakeWearPct: 38, status: "ok" },
  { vehicle: "V-03", plate: "VAN-104", healthScore: 41, dtcs: 7, serviceDueKm:  -240, coolantTemp:104, brakeWearPct: 88, status: "critical" },
  { vehicle: "V-04", plate: "TR-7720", healthScore: 64, dtcs: 3, serviceDueKm:   420, coolantTemp: 97, brakeWearPct: 71, status: "warning" },
  { vehicle: "V-05", plate: "VAN-220", healthScore: 88, dtcs: 0, serviceDueKm:  7200, coolantTemp: 85, brakeWearPct: 19, status: "ok" },
  { vehicle: "V-06", plate: "TR-9920", healthScore: 56, dtcs: 4, serviceDueKm:   880, coolantTemp: 95, brakeWearPct: 66, status: "warning" },
  { vehicle: "V-07", plate: "TR-2003", healthScore: 73, dtcs: 2, serviceDueKm:  2050, coolantTemp: 91, brakeWearPct: 48, status: "warning" },
  { vehicle: "V-08", plate: "TR-6651", healthScore: 84, dtcs: 0, serviceDueKm:  4600, coolantTemp: 87, brakeWearPct: 32, status: "ok" },
  { vehicle: "V-09", plate: "VAN-187", healthScore: 38, dtcs: 9, serviceDueKm: -1100, coolantTemp:108, brakeWearPct: 92, status: "critical" },
  { vehicle: "V-10", plate: "TR-5520", healthScore: 79, dtcs: 1, serviceDueKm:  1800, coolantTemp: 90, brakeWearPct: 42, status: "ok" },
  { vehicle: "V-11", plate: "TR-8819", healthScore: 67, dtcs: 2, serviceDueKm:   980, coolantTemp: 93, brakeWearPct: 58, status: "warning" },
  { vehicle: "V-12", plate: "VAN-245", healthScore: 91, dtcs: 0, serviceDueKm:  6300, coolantTemp: 84, brakeWearPct: 22, status: "ok" },
];

export const overRevPerVehicle = [
  { vehicle: "V-03", events: 34 },
  { vehicle: "V-09", events: 28 },
  { vehicle: "V-04", events: 22 },
  { vehicle: "V-06", events: 19 },
  { vehicle: "V-07", events: 16 },
  { vehicle: "V-11", events: 14 },
  { vehicle: "V-02", events: 11 },
  { vehicle: "V-10", events:  9 },
  { vehicle: "V-08", events:  6 },
  { vehicle: "V-01", events:  4 },
];

export const brakeWearByDriver = [
  { driver: "J. Carter",  wearPct: 88 },
  { driver: "M. Reyes",   wearPct: 76 },
  { driver: "A. Singh",   wearPct: 71 },
  { driver: "K. Babot",   wearPct: 64 },
  { driver: "S. Petrovic",wearPct: 58 },
  { driver: "L. Costa",   wearPct: 47 },
  { driver: "P. Shah",    wearPct: 39 },
  { driver: "N. Becker",  wearPct: 31 },
  { driver: "T. Vidal",   wearPct: 24 },
  { driver: "Z. Park",    wearPct: 18 },
];

export const coolantTempTrend = [
  { day: "May 4",  temp: 86 },
  { day: "May 5",  temp: 87 },
  { day: "May 6",  temp: 89 },
  { day: "May 7",  temp: 92 },
  { day: "May 8",  temp: 88 },
  { day: "May 9",  temp: 91 },
  { day: "May 10", temp: 95 },
  { day: "May 11", temp: 97 },
  { day: "May 12", temp: 94 },
  { day: "May 13", temp: 99 },
  { day: "May 14", temp: 102 },
  { day: "May 15", temp: 98 },
  { day: "May 16", temp: 96 },
  { day: "May 17", temp: 93 },
];

export const tirePressureScore = 91;

export type MaintenanceTask = {
  id: string;
  date: string;                     // ISO-ish for sort, plus a label
  label: string;                    // "May 22"
  vehicle: string;
  task: string;
  severity: "overdue" | "due" | "upcoming";
  monthIdx: 0 | 1 | 2;              // 0 = current, 1 = +1, 2 = +2
};

export const maintenanceCalendar: MaintenanceTask[] = [
  { id: "m1",  date: "2026-05-12", label: "May 12", vehicle: "V-03",  task: "Oil change · overdue",     severity: "overdue", monthIdx: 0 },
  { id: "m2",  date: "2026-05-16", label: "May 16", vehicle: "V-09",  task: "Brake pads · overdue",     severity: "overdue", monthIdx: 0 },
  { id: "m3",  date: "2026-05-19", label: "May 19", vehicle: "V-04",  task: "Air filter",               severity: "due",     monthIdx: 0 },
  { id: "m4",  date: "2026-05-22", label: "May 22", vehicle: "V-12",  task: "Tire rotation",            severity: "due",     monthIdx: 0 },
  { id: "m5",  date: "2026-05-28", label: "May 28", vehicle: "V-07",  task: "Coolant flush",            severity: "due",     monthIdx: 0 },
  { id: "m6",  date: "2026-06-04", label: "Jun 04", vehicle: "V-11",  task: "Transmission fluid",       severity: "upcoming", monthIdx: 1 },
  { id: "m7",  date: "2026-06-09", label: "Jun 09", vehicle: "V-06",  task: "Brake inspection",         severity: "upcoming", monthIdx: 1 },
  { id: "m8",  date: "2026-06-15", label: "Jun 15", vehicle: "V-01",  task: "Oil change",               severity: "upcoming", monthIdx: 1 },
  { id: "m9",  date: "2026-06-22", label: "Jun 22", vehicle: "V-08",  task: "AdBlue refill",            severity: "upcoming", monthIdx: 1 },
  { id: "m10", date: "2026-06-28", label: "Jun 28", vehicle: "V-10",  task: "Tire rotation",            severity: "upcoming", monthIdx: 1 },
  { id: "m11", date: "2026-07-05", label: "Jul 05", vehicle: "V-02",  task: "Battery check",            severity: "upcoming", monthIdx: 2 },
  { id: "m12", date: "2026-07-12", label: "Jul 12", vehicle: "V-05",  task: "Brake pads",               severity: "upcoming", monthIdx: 2 },
  { id: "m13", date: "2026-07-19", label: "Jul 19", vehicle: "V-09",  task: "Major service",            severity: "upcoming", monthIdx: 2 },
  { id: "m14", date: "2026-07-26", label: "Jul 26", vehicle: "V-03",  task: "Suspension check",         severity: "upcoming", monthIdx: 2 },
];

export const idleImpactTrend = Array.from({ length: 30 }, (_, i) => {
  // Slightly noisy weekly pattern: idle hours 2–7, fuel waste 5–22 L
  const base = Math.sin(i * 0.42) * 1.6 + 4.2;
  const noise = (i * 17) % 5 - 2;
  const idleHours = Math.max(1.6, base + noise * 0.4);
  const fuelL = +(idleHours * 2.8 + ((i * 11) % 4)).toFixed(1);
  return {
    day: `D-${30 - i}`,
    idleHours: +idleHours.toFixed(1),
    fuelL,
  };
});

// ─── Alerts Center ─────────────────────────────────────────────────────────

export const alertsCenterKpis = {
  totalAlerts: 287,
  criticalAlerts: 18,
  unacknowledged: 24,
  avgResponseTimeMin: 6.4,
};

export const alertSeverityDistribution = [
  { name: "Critical", value: 18,  color: "#EF4444" },
  { name: "High",     value: 62,  color: "#F87171" },
  { name: "Medium",   value: 124, color: "#F5A623" },
  { name: "Low",      value: 83,  color: "#6B6B7B" },
];

export const alertTypesBreakdown = [
  { name: "Speeding",          value: 78 },
  { name: "Harsh Braking",     value: 56 },
  { name: "Geofence Exit",     value: 41 },
  { name: "ADAS Warning",      value: 33 },
  { name: "Fatigue / DSM",     value: 28 },
  { name: "Idle Excess",       value: 22 },
  { name: "Tampering",         value: 14 },
  { name: "Crash Detected",    value: 9  },
  { name: "Fuel Theft",        value: 6  },
];

// 24-hour distribution (hour 0 = 00:00, hour 23 = 23:00)
export const alertHourlyTrend = [
  { hour: "00", critical: 1, high: 2,  medium: 4,  low: 3 },
  { hour: "01", critical: 0, high: 1,  medium: 3,  low: 2 },
  { hour: "02", critical: 0, high: 1,  medium: 2,  low: 2 },
  { hour: "03", critical: 1, high: 2,  medium: 3,  low: 1 },
  { hour: "04", critical: 0, high: 1,  medium: 2,  low: 2 },
  { hour: "05", critical: 0, high: 2,  medium: 4,  low: 3 },
  { hour: "06", critical: 1, high: 3,  medium: 6,  low: 4 },
  { hour: "07", critical: 2, high: 5,  medium: 9,  low: 6 },
  { hour: "08", critical: 2, high: 6,  medium: 11, low: 7 },
  { hour: "09", critical: 1, high: 4,  medium: 8,  low: 5 },
  { hour: "10", critical: 1, high: 3,  medium: 7,  low: 4 },
  { hour: "11", critical: 2, high: 4,  medium: 8,  low: 5 },
  { hour: "12", critical: 1, high: 3,  medium: 6,  low: 4 },
  { hour: "13", critical: 1, high: 4,  medium: 7,  low: 5 },
  { hour: "14", critical: 2, high: 5,  medium: 9,  low: 6 },
  { hour: "15", critical: 2, high: 6,  medium: 10, low: 6 },
  { hour: "16", critical: 1, high: 4,  medium: 8,  low: 5 },
  { hour: "17", critical: 1, high: 3,  medium: 6,  low: 4 },
  { hour: "18", critical: 0, high: 2,  medium: 5,  low: 3 },
  { hour: "19", critical: 0, high: 2,  medium: 4,  low: 3 },
  { hour: "20", critical: 0, high: 1,  medium: 3,  low: 2 },
  { hour: "21", critical: 0, high: 1,  medium: 3,  low: 2 },
  { hour: "22", critical: 0, high: 1,  medium: 2,  low: 2 },
  { hour: "23", critical: 0, high: 1,  medium: 2,  low: 1 },
];

export type AlertSeverity = "critical" | "high" | "medium" | "low";
export type AlertStatus   = "new" | "acknowledged" | "investigating" | "resolved";

export type ActiveAlertRow = {
  id: string;
  severity: AlertSeverity;
  type: string;
  vehicle: string;
  plate: string;
  driver: string;
  location: string;
  time: string;          // HH:MM
  ageMin: number;        // minutes since detected
  status: AlertStatus;
};

export const activeAlertsRows: ActiveAlertRow[] = [
  { id: "ac01", severity: "critical", type: "Crash Detected",   vehicle: "V-09",  plate: "FL-1187", driver: "Aiko Tanaka",    location: "I-95, Mile 142",      time: "13:55", ageMin: 4,   status: "new" },
  { id: "ac02", severity: "critical", type: "GSM Jamming",      vehicle: "V-17",  plate: "FL-7711", driver: "Ines Lopez",     location: "Warehouse East",      time: "13:48", ageMin: 11,  status: "investigating" },
  { id: "ac03", severity: "high",     type: "Speeding",         vehicle: "V-04",  plate: "FL-7720", driver: "Janne Yürien",   location: "Route 35, Edison",    time: "13:42", ageMin: 17,  status: "acknowledged" },
  { id: "ac04", severity: "high",     type: "Harsh Braking",    vehicle: "V-01",  plate: "FL-2241", driver: "Jason Menson",   location: "Lincoln Tunnel",      time: "13:36", ageMin: 23,  status: "new" },
  { id: "ac05", severity: "high",     type: "Fatigue Alert",    vehicle: "V-05",  plate: "FL-4412", driver: "Kam Babot",      location: "I-78 W, Mile 31",     time: "13:28", ageMin: 31,  status: "acknowledged" },
  { id: "ac06", severity: "medium",   type: "Geofence Exit",    vehicle: "V-11",  plate: "FL-8819", driver: "Priya Shah",     location: "HQ Yard",             time: "13:20", ageMin: 39,  status: "investigating" },
  { id: "ac07", severity: "medium",   type: "Phone Usage",      vehicle: "V-08",  plate: "FL-6651", driver: "Mateo Rivera",   location: "Brooklyn Bridge",     time: "13:14", ageMin: 45,  status: "new" },
  { id: "ac08", severity: "medium",   type: "Idle Excess",      vehicle: "V-03",  plate: "FL-3389", driver: "Dotlia Tenior",  location: "Depot 3",             time: "13:02", ageMin: 57,  status: "acknowledged" },
  { id: "ac09", severity: "low",      type: "Seatbelt Alert",   vehicle: "V-14",  plate: "FL-6604", driver: "Yusuf Demir",    location: "Queens Blvd",         time: "12:54", ageMin: 65,  status: "resolved" },
  { id: "ac10", severity: "low",      type: "Over-Rev Event",   vehicle: "V-21",  plate: "FL-5577", driver: "Mei Chen",       location: "Route 1 N",           time: "12:40", ageMin: 79,  status: "resolved" },
];

export const escalationWorkflow = [
  { stage: "Detected",      count: 287, sublabel: "Last 24h",      color: "#3B82F6" },
  { stage: "Notified",      count: 287, sublabel: "Dispatch + SMS", color: "#F5A623" },
  { stage: "Acknowledged",  count: 263, sublabel: "92% rate",       color: "#F5A623" },
  { stage: "Investigating", count: 84,  sublabel: "Field action",   color: "#F87171" },
  { stage: "Resolved",      count: 248, sublabel: "86% closed",     color: "#22C55E" },
];

export type AlertHistoryRow = {
  id: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:MM
  severity: AlertSeverity;
  type: string;
  vehicle: string;
  driver: string;
  responseMin: number;   // time to acknowledge
  resolvedMin: number;   // time to resolve
  status: "resolved" | "closed" | "escalated";
};

export const alertHistoryRows: AlertHistoryRow[] = [
  { id: "h001", date: "2026-05-18", time: "21:14", severity: "critical", type: "Crash Detected",   vehicle: "V-02", driver: "John Velletta",   responseMin: 1,  resolvedMin: 42,  status: "escalated" },
  { id: "h002", date: "2026-05-18", time: "18:02", severity: "high",     type: "Speeding",         vehicle: "V-07", driver: "Sara Lin",        responseMin: 3,  resolvedMin: 12,  status: "resolved" },
  { id: "h003", date: "2026-05-18", time: "14:27", severity: "high",     type: "Harsh Braking",    vehicle: "V-12", driver: "Noah Becker",     responseMin: 5,  resolvedMin: 18,  status: "resolved" },
  { id: "h004", date: "2026-05-17", time: "23:48", severity: "critical", type: "Tampering",        vehicle: "V-15", driver: "Zoe Park",        responseMin: 2,  resolvedMin: 96,  status: "escalated" },
  { id: "h005", date: "2026-05-17", time: "20:11", severity: "medium",   type: "Geofence Exit",    vehicle: "V-19", driver: "Hannah Schmidt",  responseMin: 7,  resolvedMin: 22,  status: "closed" },
  { id: "h006", date: "2026-05-17", time: "16:55", severity: "medium",   type: "Phone Usage",      vehicle: "V-23", driver: "Kemal Yilmaz",    responseMin: 6,  resolvedMin: 14,  status: "closed" },
  { id: "h007", date: "2026-05-17", time: "11:33", severity: "high",     type: "Fatigue Alert",    vehicle: "V-05", driver: "Kam Babot",       responseMin: 4,  resolvedMin: 28,  status: "resolved" },
  { id: "h008", date: "2026-05-16", time: "22:09", severity: "low",      type: "Seatbelt Alert",   vehicle: "V-14", driver: "Yusuf Demir",     responseMin: 9,  resolvedMin: 11,  status: "closed" },
  { id: "h009", date: "2026-05-16", time: "15:46", severity: "high",     type: "Speeding",         vehicle: "V-04", driver: "Janne Yürien",    responseMin: 4,  resolvedMin: 16,  status: "resolved" },
  { id: "h010", date: "2026-05-16", time: "09:21", severity: "medium",   type: "Idle Excess",      vehicle: "V-20", driver: "Diego Rojas",     responseMin: 12, resolvedMin: 19,  status: "closed" },
  { id: "h011", date: "2026-05-15", time: "19:38", severity: "critical", type: "GSM Jamming",      vehicle: "V-17", driver: "Ines Lopez",      responseMin: 1,  resolvedMin: 71,  status: "escalated" },
  { id: "h012", date: "2026-05-15", time: "13:02", severity: "medium",   type: "ADAS Warning",     vehicle: "V-08", driver: "Mateo Rivera",    responseMin: 8,  resolvedMin: 15,  status: "closed" },
];

// ─── Driver Profile ────────────────────────────────────────────────────────

export type DriverRiskClass = "expert" | "gold" | "watch" | "risk";

export type DriverProfile = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  riskClass: DriverRiskClass;
  vehicle: string;
  plate: string;
  hiredOn: string;
  region: string;
  licenseClass: string;
  yearsExperience: number;
  totalDistanceKm: number;
  totalTripsThisMonth: number;
  behavioralScore: number;
  scores: {
    safety: number;
    eco: number;
    maintainability: number;
    discipline: number;
  };
};

export const driverProfiles: Record<string, DriverProfile> = {
  "driver-1": {
    id: "driver-1",
    name: "Jason Menson",
    initials: "JM",
    avatarColor: "linear-gradient(135deg, #F5A623 0%, #E8950E 100%)",
    riskClass: "expert",
    vehicle: "V-02 · Volvo FH16",
    plate: "FL-2241",
    hiredOn: "2021-03-14",
    region: "EU · Long-haul",
    licenseClass: "CE — Heavy combination",
    yearsExperience: 9,
    totalDistanceKm: 184_320,
    totalTripsThisMonth: 42,
    behavioralScore: 92,
    scores: { safety: 94, eco: 88, maintainability: 91, discipline: 95 },
  },
};

export const driverScoreEvolution = [
  { month: "Jun", behavioral: 78, safety: 80, eco: 72, discipline: 82 },
  { month: "Jul", behavioral: 81, safety: 82, eco: 75, discipline: 84 },
  { month: "Aug", behavioral: 83, safety: 84, eco: 78, discipline: 85 },
  { month: "Sep", behavioral: 84, safety: 85, eco: 80, discipline: 86 },
  { month: "Oct", behavioral: 86, safety: 87, eco: 82, discipline: 88 },
  { month: "Nov", behavioral: 87, safety: 88, eco: 83, discipline: 89 },
  { month: "Dec", behavioral: 85, safety: 86, eco: 82, discipline: 87 },
  { month: "Jan", behavioral: 88, safety: 90, eco: 84, discipline: 90 },
  { month: "Feb", behavioral: 89, safety: 91, eco: 85, discipline: 91 },
  { month: "Mar", behavioral: 90, safety: 92, eco: 86, discipline: 93 },
  { month: "Apr", behavioral: 91, safety: 93, eco: 87, discipline: 94 },
  { month: "May", behavioral: 92, safety: 94, eco: 88, discipline: 95 },
];

export type DriverViolation = {
  id: string;
  date: string;
  time: string;
  type:
    | "Harsh Braking"
    | "Harsh Acceleration"
    | "Speeding"
    | "Cornering"
    | "Phone Usage"
    | "Fatigue Alert"
    | "Seatbelt"
    | "Idle Excess";
  vehicle: string;
  location: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "resolved" | "open" | "coached";
};

export const driverViolations: DriverViolation[] = [
  { id: "dv01", date: "2026-05-19", time: "14:22", type: "Speeding",          vehicle: "V-02", location: "A6 · Lyon → Mâcon",     severity: "medium",   status: "resolved" },
  { id: "dv02", date: "2026-05-17", time: "09:08", type: "Harsh Braking",     vehicle: "V-02", location: "Périph. Lyon",          severity: "low",      status: "coached" },
  { id: "dv03", date: "2026-05-14", time: "22:41", type: "Fatigue Alert",     vehicle: "V-02", location: "A89 · Clermont",        severity: "high",     status: "resolved" },
  { id: "dv04", date: "2026-05-11", time: "16:03", type: "Cornering",         vehicle: "V-02", location: "Roundabout · Dijon",    severity: "low",      status: "resolved" },
  { id: "dv05", date: "2026-05-07", time: "07:55", type: "Idle Excess",       vehicle: "V-02", location: "Depot · Villeurbanne",  severity: "low",      status: "resolved" },
  { id: "dv06", date: "2026-05-03", time: "13:17", type: "Phone Usage",       vehicle: "V-02", location: "A7 · Valence",          severity: "medium",   status: "coached" },
  { id: "dv07", date: "2026-04-28", time: "19:24", type: "Harsh Acceleration", vehicle: "V-02", location: "N6 · Mâcon",            severity: "medium",   status: "resolved" },
  { id: "dv08", date: "2026-04-22", time: "11:39", type: "Seatbelt",          vehicle: "V-02", location: "Depot exit · Lyon",     severity: "low",      status: "resolved" },
];

export type DriverRecommendation = {
  id: string;
  category: "safety" | "eco" | "discipline" | "maintenance";
  title: string;
  detail: string;
  impact: string;
};

export const driverRecommendations: DriverRecommendation[] = [
  {
    id: "r1",
    category: "eco",
    title: "Reduce cruise above 95 km/h on highway segments",
    detail: "12% of distance logged above the 90 km/h eco band. Holding 88–92 km/h saves ~3.2 L/100km on long-haul segments.",
    impact: "−4.1% fuel cost · +2 pts Eco",
  },
  {
    id: "r2",
    category: "safety",
    title: "Increase following distance during night driving",
    detail: "Three fatigue-window harsh brakes after 22:00 last 30 days. Suggest 2.5s gap minimum on A7/A89.",
    impact: "−2 harsh events · +1 pt Safety",
  },
  {
    id: "r3",
    category: "discipline",
    title: "Acknowledge fatigue prompt within 60s",
    detail: "Average response to fatigue alert: 2m 14s. Target is <60s. Pull over reflex needs reinforcement.",
    impact: "+3 pts Discipline",
  },
  {
    id: "r4",
    category: "maintenance",
    title: "Smoother gear shifts on hill starts",
    detail: "Over-rev signature on Mâcon depot ramp. Pre-select 2nd before incline grip.",
    impact: "−15% clutch wear",
  },
];

export const driverRadar = {
  indicators: [
    { name: "Safety",         max: 100 },
    { name: "Eco",            max: 100 },
    { name: "Maintainability", max: 100 },
    { name: "Discipline",     max: 100 },
    { name: "Punctuality",    max: 100 },
    { name: "Smoothness",     max: 100 },
  ],
  driver: [94, 88, 91, 95, 92, 90],
  fleetAvg: [78, 74, 80, 76, 82, 75],
};

export const driverRiskEvolution = [
  { month: "Jun", risk: 32 },
  { month: "Jul", risk: 28 },
  { month: "Aug", risk: 26 },
  { month: "Sep", risk: 24 },
  { month: "Oct", risk: 22 },
  { month: "Nov", risk: 20 },
  { month: "Dec", risk: 23 },
  { month: "Jan", risk: 18 },
  { month: "Feb", risk: 16 },
  { month: "Mar", risk: 14 },
  { month: "Apr", risk: 12 },
  { month: "May", risk: 10 },
];

export type BehavioralTimelineEvent = {
  id: string;
  date: string;
  label: string;
  detail: string;
  type: "milestone" | "incident" | "training" | "coaching";
};

export const driverBehavioralTimeline: BehavioralTimelineEvent[] = [
  { id: "t1", date: "2026-05-19", label: "Speeding flagged",        detail: "Lyon → Mâcon segment · medium",        type: "incident" },
  { id: "t2", date: "2026-05-05", label: "Coaching session",        detail: "Eco-driving refresher · 30 min",       type: "coaching" },
  { id: "t3", date: "2026-04-12", label: "Eco-band streak: 14 days", detail: "Held 88–92 km/h on highway runs",      type: "milestone" },
  { id: "t4", date: "2026-03-22", label: "ADAS training renewed",   detail: "Collision warning module · passed",    type: "training" },
  { id: "t5", date: "2026-02-08", label: "100k km no-accident",     detail: "Milestone reached on V-02",            type: "milestone" },
  { id: "t6", date: "2026-01-15", label: "Phone usage flagged",     detail: "A7 Valence · coached same day",        type: "incident" },
];

export const driverStats = {
  distanceKm: 184_320,
  distanceDeltaPct: 4.2,
  tripsMonth: 42,
  tripsDeltaPct: 6.1,
  avgTripKm: 412,
  avgFuelL100km: 24.6,
  fuelDeltaPct: -3.1,
  idleHoursMonth: 11.4,
  idleDeltaPct: -8.5,
  harshPer100km: 0.6,
  harshDeltaPct: -22.0,
  daysWithoutIncident: 87,
  topSpeedKmh: 96,
  ecoBandPct: 88,
};
