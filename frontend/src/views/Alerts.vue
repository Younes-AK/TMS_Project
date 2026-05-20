<script setup lang="ts">
import { computed, ref } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import {
  Bell,
  AlertOctagon,
  BellOff,
  Timer,
  Download,
  Sparkles,
  Search,
  ChevronRight,
  CheckCircle2,
  Eye,
  XCircle,
  ArrowUpRight,
  Radar,
  ShieldAlert,
  ClipboardCheck,
  Activity,
} from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import {
  alertsCenterKpis,
  alertSeverityDistribution,
  alertTypesBreakdown,
  alertHourlyTrend,
  activeAlertsRows,
  escalationWorkflow,
  alertHistoryRows,
  type AlertSeverity,
  type AlertStatus,
} from "@/lib/mock-data";

const severityChip: Record<AlertSeverity, string> = {
  critical: "bg-danger/15 text-danger border-danger/30",
  high:     "bg-danger/12 text-danger/90 border-danger/25",
  medium:   "bg-brand/15 text-brand-light border-brand/30",
  low:      "bg-surface-hover text-text-secondary border-border-subtle",
};

const severityDot: Record<AlertSeverity, string> = {
  critical: "bg-danger shadow-[0_0_0_4px_rgba(239,68,68,0.18)]",
  high:     "bg-danger/80",
  medium:   "bg-brand shadow-[0_0_0_4px_rgba(245,166,35,0.18)]",
  low:      "bg-text-muted/70",
};

const statusChip: Record<AlertStatus, string> = {
  new:           "bg-info/15 text-info border-info/25",
  acknowledged:  "bg-brand/15 text-brand-light border-brand/30",
  investigating: "bg-danger/12 text-danger/90 border-danger/25",
  resolved:      "bg-success/15 text-success border-success/25",
};

const statusLabel: Record<AlertStatus, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  investigating: "Investigating",
  resolved: "Resolved",
};

const historyStatusChip: Record<"resolved" | "closed" | "escalated", string> = {
  resolved:  "bg-success/15 text-success border-success/25",
  closed:    "bg-surface-hover text-text-secondary border-border-subtle",
  escalated: "bg-danger/15 text-danger border-danger/30",
};

const formatAge = (min: number) =>
  min < 60 ? `${min}m ago` : `${Math.floor(min / 60)}h ${min % 60}m ago`;

const responseTone = (min: number) =>
  min <= 3 ? "text-success" : min <= 8 ? "text-brand-light" : "text-danger";

const stageIcon = (stage: string) => {
  switch (stage) {
    case "Detected":      return Radar;
    case "Notified":      return Bell;
    case "Acknowledged":  return ClipboardCheck;
    case "Investigating": return ShieldAlert;
    case "Resolved":      return CheckCircle2;
    default:              return Activity;
  }
};

const severityDonutOption = computed(() => ({
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "item",
    formatter: (p: { name: string; value: number; percent: number }) =>
      `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="font-weight:600">${p.value}</span> <span style="color:${BRAND.textMuted};font-size:11px">· ${p.percent.toFixed(1)}%</span>`,
  },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
  },
  series: [{
    type: "pie",
    radius: ["58%", "80%"],
    center: ["50%", "44%"],
    label: { show: false },
    data: alertSeverityDistribution.map(d => ({
      name: d.name,
      value: d.value,
      itemStyle: { color: d.color },
    })),
    emphasis: {
      itemStyle: { shadowBlur: 16, shadowColor: "rgba(0,0,0,0.45)" },
    },
    animationType: "scale",
    animationDuration: 900,
  }],
}));

const hourlyTrendOption = computed(() => {
  const hours = alertHourlyTrend.map(d => `${d.hour}h`);
  const stack = (key: "critical" | "high" | "medium" | "low", color: string, areaTop: string, areaBottom: string) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    type: "line" as const,
    stack: "alerts",
    smooth: 0.35,
    symbol: "none",
    data: alertHourlyTrend.map(d => d[key]),
    lineStyle: { color, width: 1.5 },
    itemStyle: { color },
    areaStyle: {
      color: {
        type: "linear" as const, x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: areaTop },
          { offset: 1, color: areaBottom },
        ],
      },
    },
    animationDuration: 1100,
  });

  return {
    grid: { left: 36, right: 18, top: 32, bottom: 28 },
    tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
    legend: {
      top: 0, right: 8,
      textStyle: { color: BRAND.textMuted, fontSize: 11 },
      itemWidth: 10, itemHeight: 8, itemGap: 14,
    },
    xAxis: {
      type: "category",
      data: hours,
      boundaryGap: false,
      ...AXIS_STYLE,
      axisLabel: { ...AXIS_STYLE.axisLabel, interval: 1 },
    },
    yAxis: { type: "value", ...AXIS_STYLE },
    series: [
      stack("low",      "#6B6B7B", "rgba(107,107,123,0.36)", "rgba(107,107,123,0.02)"),
      stack("medium",   BRAND.orange, "rgba(245,166,35,0.40)",  "rgba(245,166,35,0.02)"),
      stack("high",     "#F87171", "rgba(248,113,113,0.40)", "rgba(248,113,113,0.02)"),
      stack("critical", BRAND.danger, "rgba(239,68,68,0.45)",  "rgba(239,68,68,0.02)"),
    ],
  };
});

const alertTypesOption = computed(() => ({
  grid: { left: 120, right: 36, top: 12, bottom: 12 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value} alerts</span>`;
    },
  },
  xAxis: { type: "value", ...AXIS_STYLE },
  yAxis: {
    type: "category",
    data: alertTypesBreakdown.map(d => d.name).reverse(),
    ...AXIS_STYLE,
    axisLabel: { ...AXIS_STYLE.axisLabel, color: BRAND.textSecondary },
  },
  series: [{
    type: "bar",
    barWidth: 16,
    data: alertTypesBreakdown.map(d => d.value).reverse(),
    itemStyle: {
      color: {
        type: "linear", x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [
          { offset: 0, color: BRAND.orangeDark },
          { offset: 1, color: BRAND.orangeLight },
        ],
      },
      borderRadius: [0, 4, 4, 0],
    },
    label: {
      show: true,
      position: "right",
      formatter: (p: { value: number }) => `${p.value}`,
      color: BRAND.textSecondary,
      fontSize: 11,
    },
    animationDuration: 900,
    animationEasing: "cubicOut" as const,
  }],
}));

const historyQuery = ref("");
const filteredHistory = computed(() => {
  const q = historyQuery.value.trim().toLowerCase();
  if (!q) return alertHistoryRows;
  return alertHistoryRows.filter(r =>
    [r.type, r.vehicle, r.driver, r.severity, r.status, r.date]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
});

const maxStageCount = Math.max(...escalationWorkflow.map(s => s.count));
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Alerts Center"
      subtitle="Active alerts, severity distribution, escalation workflow and historical archive."
      eyebrow="Alerts operations"
    >
      <template #actions>
        <button
          class="hidden sm:flex items-center gap-1.5 rounded-lg border border-border-subtle hover:border-border-glow text-text-secondary hover:text-brand-light px-3 py-2 text-sm transition-colors focus-brand"
        >
          <Download class="h-3.5 w-3.5" />
          Export
        </button>
        <button
          class="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-bg-deep font-semibold px-3 py-2 text-sm hover:opacity-95 transition-opacity focus-brand"
        >
          <Sparkles class="h-3.5 w-3.5" />
          AI Insights
        </button>
      </template>
    </PageHeader>

    <FilterBar />

    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Total Alerts"
        :value="alertsCenterKpis.totalAlerts"
        :delta="6.2"
        deltaSuffix="vs last 24h"
        accent="highlight"
      >
        <template #icon><Bell class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Critical Alerts"
        :value="alertsCenterKpis.criticalAlerts"
        :delta="-3"
        deltaSuffix="vs last 24h"
        accent="danger"
      >
        <template #icon><AlertOctagon class="h-4 w-4 text-danger" /></template>
      </KPICard>

      <KPICard
        label="Unacknowledged"
        :value="alertsCenterKpis.unacknowledged"
        :delta="-12"
        deltaSuffix="vs last 24h"
        accent="danger"
      >
        <template #icon><BellOff class="h-4 w-4 text-danger" /></template>
      </KPICard>

      <KPICard
        label="Avg Response Time"
        :value="alertsCenterKpis.avgResponseTimeMin"
        unit="min"
        :delta="-1.1"
        deltaSuffix="MoM"
        accent="success"
      >
        <template #icon><Timer class="h-4 w-4 text-success" /></template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Severity Distribution"
        subtitle="Last 24h · 287 alerts"
        class="lg:col-span-4"
      >
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="severityDonutOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard
        title="Alert Timeline"
        subtitle="Hour-by-hour stacked by severity · last 24h"
        class="lg:col-span-8"
      >
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="hourlyTrendOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Alerts by Type"
        subtitle="Top categories · last 24h"
        class="lg:col-span-6"
      >
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="alertTypesOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard
        title="Escalation Workflow"
        subtitle="Detection → resolution funnel"
        class="lg:col-span-6"
      >
        <ul class="flex flex-col gap-3 h-[320px] justify-between py-1">
          <li
            v-for="(stage, idx) in escalationWorkflow"
            :key="stage.stage"
            class="relative"
          >
            <div class="flex items-center gap-3">
              <span
                class="grid place-items-center h-9 w-9 rounded-lg border shrink-0"
                :style="{
                  background: `${stage.color}22`,
                  color: stage.color,
                  borderColor: `${stage.color}55`,
                }"
              >
                <component :is="stageIcon(stage.stage)" class="h-4 w-4" />
              </span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-sm font-semibold text-text-primary">{{ stage.stage }}</span>
                  <span class="text-text-primary font-bold tabular-nums text-sm">
                    {{ stage.count }}
                  </span>
                </div>
                <div class="mt-1.5 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all"
                    :style="{
                      width: `${(stage.count / maxStageCount) * 100}%`,
                      background: stage.color,
                    }"
                  />
                </div>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-caption text-text-muted">{{ stage.sublabel }}</span>
                  <ChevronRight
                    v-if="idx < escalationWorkflow.length - 1"
                    class="h-3 w-3 text-text-muted"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </ChartCard>
    </section>

    <ChartCard
      title="Active Alerts"
      :subtitle="`${activeAlertsRows.length} alerts requiring attention`"
    >
      <div class="overflow-x-auto -mx-1">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left border-b border-border-subtle">
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Severity</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Type</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Vehicle</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Location</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Age</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Status</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in activeAlertsRows"
              :key="row.id"
              class="border-b border-border-subtle/40 hover:bg-surface-hover/40 transition-colors"
            >
              <td class="px-3 py-2.5">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider',
                    severityChip[row.severity],
                  ]"
                >
                  <span :class="['h-1.5 w-1.5 rounded-full', severityDot[row.severity]]" />
                  {{ row.severity }}
                </span>
              </td>
              <td class="px-3 py-2.5 text-text-primary font-medium">{{ row.type }}</td>
              <td class="px-3 py-2.5">
                <div class="flex flex-col">
                  <span class="text-text-primary">{{ row.vehicle }}</span>
                  <span class="text-text-muted text-[11px] tabular-nums">{{ row.plate }}</span>
                </div>
              </td>
              <td class="px-3 py-2.5 text-text-secondary">{{ row.driver }}</td>
              <td class="px-3 py-2.5 text-text-muted">{{ row.location }}</td>
              <td class="px-3 py-2.5 text-right text-text-secondary tabular-nums">
                <span class="inline-flex items-center gap-1">
                  <Timer class="h-3 w-3 text-text-muted" />
                  {{ row.time }}
                  <span class="text-text-muted text-[11px]">· {{ formatAge(row.ageMin) }}</span>
                </span>
              </td>
              <td class="px-3 py-2.5 text-center">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border',
                    statusChip[row.status],
                  ]"
                >
                  {{ statusLabel[row.status] }}
                </span>
              </td>
              <td class="px-3 py-2.5">
                <div class="flex items-center justify-end gap-1">
                  <button
                    class="p-1.5 rounded-md text-text-muted hover:text-brand-light hover:bg-surface-hover transition-colors focus-brand"
                    aria-label="Acknowledge"
                    title="Acknowledge"
                  >
                    <CheckCircle2 class="h-3.5 w-3.5" />
                  </button>
                  <button
                    class="p-1.5 rounded-md text-text-muted hover:text-brand-light hover:bg-surface-hover transition-colors focus-brand"
                    aria-label="View details"
                    title="View details"
                  >
                    <Eye class="h-3.5 w-3.5" />
                  </button>
                  <button
                    class="p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors focus-brand"
                    aria-label="Escalate"
                    title="Escalate"
                  >
                    <ArrowUpRight class="h-3.5 w-3.5" />
                  </button>
                  <button
                    class="p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-surface-hover transition-colors focus-brand"
                    aria-label="Dismiss"
                    title="Dismiss"
                  >
                    <XCircle class="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ChartCard>

    <ChartCard
      title="Alert History"
      :subtitle="`${filteredHistory.length} of ${alertHistoryRows.length} historical alerts`"
    >
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <label
          class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border-subtle hover:border-border-glow transition-colors focus-within:border-border-glow flex-1 min-w-[220px] max-w-md"
        >
          <Search class="h-4 w-4 text-brand-light shrink-0" />
          <input
            v-model="historyQuery"
            type="text"
            placeholder="Search by type, vehicle, driver, severity…"
            class="bg-transparent text-sm text-text-primary outline-none w-full placeholder:text-text-muted"
          />
        </label>
      </div>

      <div class="overflow-x-auto -mx-1">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left border-b border-border-subtle">
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Date / time</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Severity</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Type</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Vehicle</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Response</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Resolved in</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in filteredHistory"
              :key="row.id"
              class="border-b border-border-subtle/40 hover:bg-surface-hover/40 transition-colors"
            >
              <td class="px-3 py-2.5">
                <div class="flex flex-col">
                  <span class="text-text-primary tabular-nums">{{ row.date }}</span>
                  <span class="text-text-muted text-[11px] tabular-nums">{{ row.time }}</span>
                </div>
              </td>
              <td class="px-3 py-2.5">
                <span
                  :class="[
                    'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider',
                    severityChip[row.severity],
                  ]"
                >
                  {{ row.severity }}
                </span>
              </td>
              <td class="px-3 py-2.5 text-text-primary">{{ row.type }}</td>
              <td class="px-3 py-2.5 text-text-secondary">{{ row.vehicle }}</td>
              <td class="px-3 py-2.5 text-text-secondary">{{ row.driver }}</td>
              <td :class="['px-3 py-2.5 tabular-nums text-right font-medium', responseTone(row.responseMin)]">
                {{ row.responseMin }} min
              </td>
              <td class="px-3 py-2.5 tabular-nums text-right text-text-secondary">
                {{ row.resolvedMin }} min
              </td>
              <td class="px-3 py-2.5 text-center">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border capitalize',
                    historyStatusChip[row.status],
                  ]"
                >
                  {{ row.status }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredHistory.length === 0">
              <td colspan="8" class="px-3 py-8 text-center text-text-muted text-caption">
                No alerts match “{{ historyQuery }}”.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ChartCard>
  </div>
</template>
