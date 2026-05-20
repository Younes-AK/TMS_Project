<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import {
  Truck,
  MapPin,
  Calendar,
  Award,
  Route,
  Gauge,
  Timer,
  AlertTriangle,
  Leaf,
  Wrench,
  ShieldCheck,
  Sparkles,
  Download,
  MessageSquare,
  CheckCircle2,
  Activity,
  Flag,
  GraduationCap,
} from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import KPIGauge from "@/components/widgets/KPIGauge.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import {
  driverProfiles,
  driverScoreEvolution,
  driverViolations,
  driverRecommendations,
  driverRadar,
  driverRiskEvolution,
  driverBehavioralTimeline,
  driverStats,
  type DriverRiskClass,
  type DriverViolation,
  type BehavioralTimelineEvent,
} from "@/lib/mock-data";

const route = useRoute();
const driverId = computed(() => (route.params.id as string) || "driver-1");
const driver = computed(() => driverProfiles[driverId.value] ?? driverProfiles["driver-1"]);

const riskBadge: Record<DriverRiskClass, { label: string; cls: string }> = {
  expert: { label: "Expert",  cls: "bg-success/15 text-success border-success/30" },
  gold:   { label: "Gold",    cls: "bg-brand/15 text-brand-light border-brand/30" },
  watch:  { label: "On Watch", cls: "bg-warning/15 text-warning border-warning/30" },
  risk:   { label: "At Risk", cls: "bg-danger/15 text-danger border-danger/30" },
};

const severityChip: Record<DriverViolation["severity"], string> = {
  critical: "bg-danger/15 text-danger border-danger/30",
  high:     "bg-danger/12 text-danger/90 border-danger/25",
  medium:   "bg-brand/15 text-brand-light border-brand/30",
  low:      "bg-surface-hover text-text-secondary border-border-subtle",
};

const statusChip: Record<DriverViolation["status"], string> = {
  resolved: "bg-success/15 text-success border-success/25",
  coached:  "bg-info/15 text-info border-info/25",
  open:     "bg-danger/15 text-danger border-danger/30",
};

const categoryIcon: Record<string, typeof Leaf> = {
  safety: ShieldCheck,
  eco: Leaf,
  discipline: Award,
  maintenance: Wrench,
};

const categoryAccent: Record<string, string> = {
  safety: "text-success border-success/30 bg-success/10",
  eco: "text-success border-success/30 bg-success/10",
  discipline: "text-brand-light border-brand/30 bg-brand/10",
  maintenance: "text-info border-info/30 bg-info/10",
};

const timelineIcon = (type: BehavioralTimelineEvent["type"]) => {
  switch (type) {
    case "milestone": return Flag;
    case "incident":  return AlertTriangle;
    case "training":  return GraduationCap;
    case "coaching":  return MessageSquare;
    default:          return Activity;
  }
};

const timelineDot: Record<BehavioralTimelineEvent["type"], string> = {
  milestone: "bg-success",
  incident:  "bg-danger",
  training:  "bg-info",
  coaching:  "bg-brand",
};

const subGauges = computed(() => [
  { label: "Safety",          value: driver.value.scores.safety },
  { label: "Eco",             value: driver.value.scores.eco },
  { label: "Maintainability", value: driver.value.scores.maintainability },
  { label: "Discipline",      value: driver.value.scores.discipline },
]);

const evolutionOption = computed(() => ({
  grid: { left: 36, right: 18, top: 36, bottom: 28 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
  legend: {
    top: 0,
    right: 8,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 14,
    itemHeight: 3,
    itemGap: 16,
  },
  xAxis: {
    type: "category",
    data: driverScoreEvolution.map((d) => d.month),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", min: 60, max: 100, ...AXIS_STYLE },
  series: [
    {
      name: "Behavioral",
      type: "line",
      smooth: 0.35,
      symbol: "circle",
      symbolSize: 7,
      data: driverScoreEvolution.map((d) => d.behavioral),
      itemStyle: { color: BRAND.orange, borderColor: BRAND.bg, borderWidth: 2 },
      lineStyle: { color: BRAND.orange, width: 2.5 },
      areaStyle: {
        color: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 166, 35, 0.32)" },
            { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
          ],
        },
      },
      animationDuration: 1100,
    },
    {
      name: "Safety", type: "line", smooth: 0.35, symbol: "none",
      data: driverScoreEvolution.map((d) => d.safety),
      lineStyle: { color: BRAND.success, width: 1.5, type: "dashed" as const },
      itemStyle: { color: BRAND.success },
    },
    {
      name: "Eco", type: "line", smooth: 0.35, symbol: "none",
      data: driverScoreEvolution.map((d) => d.eco),
      lineStyle: { color: BRAND.info, width: 1.5, type: "dashed" as const },
      itemStyle: { color: BRAND.info },
    },
    {
      name: "Discipline", type: "line", smooth: 0.35, symbol: "none",
      data: driverScoreEvolution.map((d) => d.discipline),
      lineStyle: { color: BRAND.orangeLight, width: 1.5, type: "dashed" as const },
      itemStyle: { color: BRAND.orangeLight },
    },
  ],
}));

const radarOption = computed(() => ({
  tooltip: { ...TOOLTIP_STYLE },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 12,
    itemHeight: 8,
    itemGap: 16,
  },
  radar: {
    indicator: driverRadar.indicators,
    center: ["50%", "48%"],
    radius: "62%",
    splitNumber: 4,
    axisName: { color: BRAND.textSecondary, fontSize: 11 },
    splitLine: { lineStyle: { color: "rgba(245, 166, 35, 0.12)" } },
    splitArea: {
      areaStyle: {
        color: ["rgba(245, 166, 35, 0.03)", "rgba(245, 166, 35, 0.06)"],
      },
    },
    axisLine: { lineStyle: { color: "rgba(245, 166, 35, 0.18)" } },
  },
  series: [
    {
      type: "radar",
      data: [
        {
          name: "Driver",
          value: driverRadar.driver,
          areaStyle: { color: "rgba(245, 166, 35, 0.32)" },
          lineStyle: { color: BRAND.orange, width: 2 },
          itemStyle: { color: BRAND.orange },
        },
        {
          name: "Fleet avg",
          value: driverRadar.fleetAvg,
          areaStyle: { color: "rgba(160, 160, 176, 0.18)" },
          lineStyle: { color: BRAND.textSecondary, width: 1.5, type: "dashed" as const },
          itemStyle: { color: BRAND.textSecondary },
        },
      ],
      animationDuration: 900,
    },
  ],
}));

const riskOption = computed(() => ({
  grid: { left: 36, right: 18, top: 24, bottom: 28 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.danger};font-weight:600;font-size:14px">Risk ${p.value}</span>`;
    },
  },
  xAxis: {
    type: "category",
    data: driverRiskEvolution.map((d) => d.month),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", min: 0, max: 50, ...AXIS_STYLE },
  series: [
    {
      type: "line",
      smooth: 0.35,
      symbol: "circle",
      symbolSize: 6,
      data: driverRiskEvolution.map((d) => d.risk),
      itemStyle: { color: BRAND.danger, borderColor: BRAND.bg, borderWidth: 2 },
      lineStyle: { color: BRAND.danger, width: 2 },
      areaStyle: {
        color: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(239, 68, 68, 0.32)" },
            { offset: 1, color: "rgba(239, 68, 68, 0.02)" },
          ],
        },
      },
      animationDuration: 1100,
    },
  ],
}));

const memberSince = computed(() =>
  new Date(driver.value.hiredOn).toLocaleDateString("en-US", { year: "numeric", month: "short" })
);

const formatKm = (n: number) => `${(n / 1000).toFixed(1)}k km`;

const deltaTone = (n: number, positiveIsGood = true) => {
  const good = positiveIsGood ? n >= 0 : n <= 0;
  return good ? "text-success" : "text-danger";
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      :title="`Driver · ${driver.name}`"
      :subtitle="`${driver.vehicle} · ${driver.region}`"
      eyebrow="Individual driver"
    >
      <template #actions>
        <button class="hidden sm:flex items-center gap-1.5 rounded-lg border border-border-subtle hover:border-border-glow text-text-secondary hover:text-brand-light px-3 py-2 text-sm transition-colors focus-brand">
          <Download class="h-3.5 w-3.5" />
          Export
        </button>
        <button class="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-bg-deep font-semibold px-3 py-2 text-sm hover:opacity-95 transition-opacity focus-brand">
          <Sparkles class="h-3.5 w-3.5" />
          AI Coaching
        </button>
      </template>
    </PageHeader>

    <section
      class="glass rounded-2xl p-6 relative overflow-hidden"
      v-motion
      :initial="{ opacity: 0, y: 12 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 420 } }"
    >
      <div
        class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-center relative">
        <div class="flex items-center gap-5">
          <div
            class="h-20 w-20 rounded-2xl grid place-items-center text-bg-deep font-bold text-2xl shrink-0 shadow-[var(--shadow-glow-md)]"
            :style="{ background: driver.avatarColor }"
          >
            {{ driver.initials }}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider',
                  riskBadge[driver.riskClass].cls,
                ]"
              >
                <ShieldCheck class="h-3 w-3" />
                {{ riskBadge[driver.riskClass].label }}
              </span>
              <span class="text-text-muted text-caption">·</span>
              <span class="text-text-muted text-caption">ID {{ driver.id }}</span>
            </div>
            <h2 class="text-text-primary font-bold text-2xl tracking-tight">
              {{ driver.name }}
            </h2>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-text-muted mt-2">
              <span class="inline-flex items-center gap-1.5">
                <Truck class="h-3.5 w-3.5" />
                {{ driver.plate }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <MapPin class="h-3.5 w-3.5" />
                {{ driver.region }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Calendar class="h-3.5 w-3.5" />
                Since {{ memberSince }}
              </span>
              <span class="inline-flex items-center gap-1.5">
                <Award class="h-3.5 w-3.5" />
                {{ driver.licenseClass }}
              </span>
            </div>
          </div>
        </div>

        <div class="hidden lg:block" />

        <div class="flex items-center gap-6">
          <div class="text-right hidden sm:block">
            <div class="text-text-muted text-caption uppercase tracking-widest">
              Behavioral Score
            </div>
            <div class="text-text-primary font-bold text-3xl tabular-nums mt-1">
              {{ driver.behavioralScore }}<span class="text-text-muted text-lg">/100</span>
            </div>
          </div>
          <div class="h-[160px] w-[160px] shrink-0">
            <KPIGauge
              label="Behavioral"
              :value="driver.behavioralScore"
              :max="100"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <article
        v-for="g in subGauges"
        :key="g.label"
        class="glass rounded-2xl px-4 py-4 flex flex-col min-h-[200px] relative overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
      >
        <div
          class="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <KPIGauge :label="g.label" :value="g.value" :max="100" />
      </article>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Score Evolution"
        subtitle="12-month trend · behavioral + sub-scores"
        class="lg:col-span-8"
      >
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="evolutionOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard
        title="Fleet Comparison"
        subtitle="Driver vs. fleet average"
        class="lg:col-span-4"
      >
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="radarOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Violation History"
        :subtitle="`${driverViolations.length} events · last 90 days`"
        class="lg:col-span-7"
      >
        <div class="overflow-x-auto -mx-1">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-border-subtle">
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Date</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Type</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Location</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Severity</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="v in driverViolations"
                :key="v.id"
                class="border-b border-border-subtle/40 hover:bg-surface-hover/40 transition-colors"
              >
                <td class="px-3 py-2.5">
                  <div class="flex flex-col">
                    <span class="text-text-primary tabular-nums">{{ v.date }}</span>
                    <span class="text-text-muted text-[11px] tabular-nums">{{ v.time }}</span>
                  </div>
                </td>
                <td class="px-3 py-2.5 text-text-primary font-medium">{{ v.type }}</td>
                <td class="px-3 py-2.5 text-text-secondary">{{ v.location }}</td>
                <td class="px-3 py-2.5">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider',
                      severityChip[v.severity],
                    ]"
                  >
                    {{ v.severity }}
                  </span>
                </td>
                <td class="px-3 py-2.5 text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border capitalize',
                      statusChip[v.status],
                    ]"
                  >
                    {{ v.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard
        title="AI Coaching Recommendations"
        subtitle="Personalized to driving signature"
        class="lg:col-span-5"
      >
        <ul class="space-y-3">
          <li
            v-for="r in driverRecommendations"
            :key="r.id"
            class="rounded-xl border border-border-subtle bg-surface/40 p-3 hover:border-border-glow transition-colors"
          >
            <div class="flex items-start gap-3">
              <span
                :class="[
                  'grid place-items-center h-9 w-9 rounded-lg border shrink-0',
                  categoryAccent[r.category],
                ]"
              >
                <component :is="categoryIcon[r.category]" class="h-4 w-4" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-text-primary font-semibold text-[13px] leading-snug">
                  {{ r.title }}
                </p>
                <p class="text-text-muted text-caption mt-1 leading-relaxed">
                  {{ r.detail }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <Sparkles class="h-3 w-3 text-brand-light" />
                  <span class="text-brand-light text-caption font-semibold">
                    {{ r.impact }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Risk Evolution"
        subtitle="Aggregate risk index · last 12 months"
        class="lg:col-span-7"
      >
        <div class="h-[280px]">
          <VChart class="h-full w-full" :option="riskOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard
        title="Behavioral Timeline"
        subtitle="Milestones, incidents and coaching"
        class="lg:col-span-5"
      >
        <ol class="relative space-y-4 pl-6">
          <span
            class="absolute left-[10px] top-1 bottom-1 w-px bg-border-subtle"
            aria-hidden="true"
          />
          <li
            v-for="event in driverBehavioralTimeline"
            :key="event.id"
            class="relative"
          >
            <span
              :class="[
                'absolute -left-6 top-0.5 grid place-items-center h-5 w-5 rounded-full ring-2 ring-bg-deep',
                timelineDot[event.type],
              ]"
            >
              <component :is="timelineIcon(event.type)" class="h-2.5 w-2.5 text-bg-deep" />
            </span>
            <div class="flex items-baseline justify-between gap-2">
              <p class="text-text-primary text-sm font-medium">{{ event.label }}</p>
              <span class="text-text-muted text-[11px] tabular-nums shrink-0">{{ event.date }}</span>
            </div>
            <p class="text-text-muted text-caption mt-0.5">{{ event.detail }}</p>
          </li>
        </ol>
      </ChartCard>
    </section>

    <ChartCard title="Stats Summary" subtitle="Key activity metrics · this month">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <Route class="h-3.5 w-3.5 text-brand-light" />
            Distance
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ formatKm(driverStats.distanceKm) }}
          </div>
          <div :class="['text-caption font-semibold mt-1 tabular-nums', deltaTone(driverStats.distanceDeltaPct)]">
            {{ driverStats.distanceDeltaPct >= 0 ? "+" : "" }}{{ driverStats.distanceDeltaPct }}%
          </div>
        </div>

        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <Activity class="h-3.5 w-3.5 text-brand-light" />
            Trips
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ driverStats.tripsMonth }}
          </div>
          <div :class="['text-caption font-semibold mt-1 tabular-nums', deltaTone(driverStats.tripsDeltaPct)]">
            {{ driverStats.tripsDeltaPct >= 0 ? "+" : "" }}{{ driverStats.tripsDeltaPct }}%
          </div>
        </div>

        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <Leaf class="h-3.5 w-3.5 text-success" />
            Avg fuel
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ driverStats.avgFuelL100km }}<span class="text-text-muted text-sm"> L/100km</span>
          </div>
          <div :class="['text-caption font-semibold mt-1 tabular-nums', deltaTone(driverStats.fuelDeltaPct, false)]">
            {{ driverStats.fuelDeltaPct >= 0 ? "+" : "" }}{{ driverStats.fuelDeltaPct }}%
          </div>
        </div>

        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <Timer class="h-3.5 w-3.5 text-warning" />
            Idle hours
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ driverStats.idleHoursMonth }}<span class="text-text-muted text-sm"> h</span>
          </div>
          <div :class="['text-caption font-semibold mt-1 tabular-nums', deltaTone(driverStats.idleDeltaPct, false)]">
            {{ driverStats.idleDeltaPct >= 0 ? "+" : "" }}{{ driverStats.idleDeltaPct }}%
          </div>
        </div>

        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <AlertTriangle class="h-3.5 w-3.5 text-danger" />
            Harsh / 100km
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ driverStats.harshPer100km }}
          </div>
          <div :class="['text-caption font-semibold mt-1 tabular-nums', deltaTone(driverStats.harshDeltaPct, false)]">
            {{ driverStats.harshDeltaPct >= 0 ? "+" : "" }}{{ driverStats.harshDeltaPct }}%
          </div>
        </div>

        <div class="rounded-xl border border-border-subtle bg-surface/40 p-4">
          <div class="flex items-center gap-2 text-text-muted text-caption">
            <CheckCircle2 class="h-3.5 w-3.5 text-success" />
            Days no incident
          </div>
          <div class="text-text-primary font-bold text-2xl tabular-nums mt-2">
            {{ driverStats.daysWithoutIncident }}
          </div>
          <div class="text-caption text-text-muted mt-1 tabular-nums">
            <Gauge class="inline h-3 w-3 mr-0.5 text-brand-light" />
            Top {{ driverStats.topSpeedKmh }} km/h
          </div>
        </div>
      </div>
    </ChartCard>
  </div>
</template>
