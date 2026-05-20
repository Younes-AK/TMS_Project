<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import {
  Wrench,
  AlertOctagon,
  Timer,
  ShieldCheck,
  BellRing,
  Download,
  Sparkles,
} from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import KPIGauge from "@/components/widgets/KPIGauge.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import {
  maintenanceKpis,
  vehicleHealthRows,
  overRevPerVehicle,
  brakeWearByDriver,
  coolantTempTrend,
  tirePressureScore,
  maintenanceCalendar,
  idleImpactTrend,
} from "@/lib/mock-data";

const COOLANT_THRESHOLD = 100;

const statusBadge: Record<"ok" | "warning" | "critical", string> = {
  ok:       "bg-success/15 text-success border-success/30",
  warning:  "bg-brand/15 text-brand-light border-brand/30",
  critical: "bg-danger/15 text-danger border-danger/30",
};

const statusLabel: Record<"ok" | "warning" | "critical", string> = {
  ok:       "OK",
  warning:  "Warning",
  critical: "Critical",
};

const severityDot: Record<"overdue" | "due" | "upcoming", string> = {
  overdue:  "bg-danger shadow-[0_0_0_4px_rgba(239,68,68,0.15)]",
  due:      "bg-brand shadow-[0_0_0_4px_rgba(245,166,35,0.18)]",
  upcoming: "bg-text-muted/70",
};

const severityChip: Record<"overdue" | "due" | "upcoming", string> = {
  overdue:  "bg-danger/15 text-danger border-danger/30",
  due:      "bg-brand/15 text-brand-light border-brand/30",
  upcoming: "bg-surface-hover text-text-secondary border-border-subtle",
};

const formatServiceDue = (km: number) =>
  km < 0 ? `Overdue ${Math.abs(km).toLocaleString()} km` : `${km.toLocaleString()} km`;

const healthBarColor = (score: number) =>
  score >= 80 ? "bg-success" : score >= 60 ? "bg-brand" : "bg-danger";

const tempColor = (t: number) =>
  t >= COOLANT_THRESHOLD ? "text-danger" : t >= 95 ? "text-brand-light" : "text-text-secondary";

const brakeColor = (w: number) =>
  w >= 80 ? "text-danger" : w >= 60 ? "text-brand-light" : "text-text-secondary";

const calendarMonths = computed(() => {
  const monthLabels = ["May · current", "June", "July"];
  return monthLabels.map((label, idx) => ({
    label,
    tasks: maintenanceCalendar.filter((m) => m.monthIdx === idx),
  }));
});

const overRevOption = computed(() => ({
  grid: { left: 36, right: 18, top: 18, bottom: 30 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value} events</span>`;
    },
  },
  xAxis: {
    type: "category",
    data: overRevPerVehicle.map((d) => d.vehicle),
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", ...AXIS_STYLE },
  series: [
    {
      type: "bar",
      barWidth: 18,
      data: overRevPerVehicle.map((d) => d.events),
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: BRAND.orangeLight },
            { offset: 1, color: BRAND.orangeDark },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
      animationDuration: 900,
      animationEasing: "cubicOut" as const,
    },
  ],
}));

const brakeWearOption = computed(() => ({
  grid: { left: 96, right: 26, top: 12, bottom: 12 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value}%</span>`;
    },
  },
  xAxis: { type: "value", max: 100, ...AXIS_STYLE },
  yAxis: {
    type: "category",
    data: brakeWearByDriver.map((d) => d.driver).reverse(),
    ...AXIS_STYLE,
    axisLabel: { ...AXIS_STYLE.axisLabel, color: BRAND.textSecondary },
  },
  series: [
    {
      type: "bar",
      data: brakeWearByDriver
        .map((d) => ({
          value: d.wearPct,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops:
                d.wearPct >= 80
                  ? [
                      { offset: 0, color: BRAND.danger },
                      { offset: 1, color: "#FCA5A5" },
                    ]
                  : [
                      { offset: 0, color: BRAND.orangeDark },
                      { offset: 1, color: BRAND.orangeLight },
                    ],
            },
            borderRadius: [0, 4, 4, 0],
          },
        }))
        .reverse(),
      barWidth: 16,
      label: {
        show: true,
        position: "right",
        formatter: (p: { value: number }) => `${p.value}%`,
        color: BRAND.textSecondary,
        fontSize: 11,
      },
      animationDuration: 900,
      animationEasing: "cubicOut" as const,
    },
  ],
}));

const coolantOption = computed(() => ({
  grid: { left: 40, right: 24, top: 26, bottom: 32 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      const flag =
        p.value >= COOLANT_THRESHOLD
          ? `<span style="color:${BRAND.danger};font-weight:600"> · over threshold</span>`
          : "";
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value}°C</span>${flag}`;
    },
  },
  xAxis: {
    type: "category",
    data: coolantTempTrend.map((d) => d.day),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", min: 80, max: 110, ...AXIS_STYLE },
  series: [
    {
      type: "line",
      smooth: 0.35,
      symbol: "circle",
      symbolSize: 7,
      data: coolantTempTrend.map((d) => d.temp),
      itemStyle: { color: BRAND.orange, borderColor: BRAND.bg, borderWidth: 2 },
      lineStyle: {
        color: BRAND.orange,
        width: 2.5,
        shadowBlur: 12,
        shadowColor: "rgba(245, 166, 35, 0.4)",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 166, 35, 0.4)" },
            { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
          ],
        },
      },
      markLine: {
        silent: true,
        symbol: "none",
        lineStyle: { color: BRAND.danger, type: "dashed" as const, width: 1.5 },
        label: {
          show: true,
          formatter: `${COOLANT_THRESHOLD}°C threshold`,
          color: BRAND.danger,
          fontSize: 11,
          position: "end",
        },
        data: [{ yAxis: COOLANT_THRESHOLD }],
      },
      animationDuration: 1100,
      animationEasing: "cubicOut" as const,
    },
  ],
}));

const idleImpactOption = computed(() => ({
  grid: { left: 48, right: 56, top: 32, bottom: 32 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
  legend: {
    top: 0,
    right: 8,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 12,
    itemHeight: 8,
    itemGap: 16,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: idleImpactTrend.map((d) => d.day),
    ...AXIS_STYLE,
    axisLabel: { ...AXIS_STYLE.axisLabel, interval: 3 },
  },
  yAxis: [
    {
      type: "value",
      name: "Fuel (L)",
      nameTextStyle: { color: BRAND.textMuted, fontSize: 10, padding: [0, 0, 0, 24] },
      ...AXIS_STYLE,
    },
    {
      type: "value",
      name: "Idle (h)",
      nameTextStyle: { color: BRAND.textMuted, fontSize: 10, padding: [0, 24, 0, 0] },
      ...AXIS_STYLE,
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: "Fuel wasted (L)",
      type: "line",
      smooth: 0.35,
      symbol: "none",
      data: idleImpactTrend.map((d) => d.fuelL),
      itemStyle: { color: BRAND.orange },
      lineStyle: { color: BRAND.orange, width: 2 },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 166, 35, 0.36)" },
            { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
          ],
        },
      },
      yAxisIndex: 0,
      animationDuration: 1100,
    },
    {
      name: "Idle hours",
      type: "line",
      smooth: 0.35,
      symbol: "none",
      data: idleImpactTrend.map((d) => d.idleHours),
      itemStyle: { color: BRAND.orangeLight },
      lineStyle: { color: BRAND.orangeLight, width: 2, type: "dashed" as const },
      yAxisIndex: 1,
      animationDuration: 1100,
    },
  ],
}));
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Maintenance Intelligence"
      subtitle="Vehicle health, DTC anomalies, predictive service calendar, brake wear and idle waste."
      eyebrow="Maintenance operations"
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

    <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <KPICard
        label="Vehicles Needing Service"
        :value="maintenanceKpis.vehiclesNeedingService"
        :delta="2"
        deltaSuffix="this week"
        accent="highlight"
      >
        <template #icon><Wrench class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Active DTCs"
        :value="maintenanceKpis.activeDtcs"
        :delta="-4"
        deltaSuffix="vs last week"
        accent="danger"
      >
        <template #icon><AlertOctagon class="h-4 w-4 text-danger" /></template>
      </KPICard>

      <KPICard
        label="Engine Idle"
        :value="`${maintenanceKpis.engineIdlePct}%`"
        :delta="-1.2"
        deltaSuffix="MoM"
      >
        <template #icon><Timer class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Preservation Score"
        :value="`${maintenanceKpis.preservationScore} / 100`"
        :delta="1.4"
        deltaSuffix="MoM"
        accent="success"
      >
        <template #icon><ShieldCheck class="h-4 w-4 text-success" /></template>
      </KPICard>

      <KPICard
        label="Maintenance Warnings"
        :value="maintenanceKpis.maintenanceWarnings"
        :delta="-2"
        deltaSuffix="this week"
      >
        <template #icon><BellRing class="h-4 w-4 text-brand-light" /></template>
      </KPICard>
    </section>

    <ChartCard
      title="Vehicle Health"
      :subtitle="`${vehicleHealthRows.length} vehicles · health, DTCs, service window, temps and brake wear`"
    >
      <div class="overflow-x-auto -mx-1">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left border-b border-border-subtle">
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Vehicle</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Health</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">DTCs</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Service due</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Coolant</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Brake wear</th>
              <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in vehicleHealthRows"
              :key="row.vehicle"
              class="border-b border-border-subtle/40 hover:bg-surface-hover/40 transition-colors"
            >
              <td class="px-3 py-2.5">
                <div class="flex flex-col">
                  <span class="text-text-primary font-medium">{{ row.vehicle }}</span>
                  <span class="text-text-muted text-[11px]">{{ row.plate }}</span>
                </div>
              </td>
              <td class="px-3 py-2.5 min-w-[160px]">
                <div class="flex items-center gap-2.5">
                  <div class="flex-1 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div
                      :class="['h-full rounded-full transition-all', healthBarColor(row.healthScore)]"
                      :style="{ width: `${row.healthScore}%` }"
                    />
                  </div>
                  <span class="text-text-secondary tabular-nums text-[12px] w-8 text-right">
                    {{ row.healthScore }}
                  </span>
                </div>
              </td>
              <td
                :class="[
                  'px-3 py-2.5 tabular-nums text-right font-medium',
                  row.dtcs === 0 ? 'text-text-muted' : row.dtcs >= 5 ? 'text-danger' : 'text-brand-light',
                ]"
              >
                {{ row.dtcs }}
              </td>
              <td
                :class="[
                  'px-3 py-2.5 tabular-nums text-right',
                  row.serviceDueKm < 0 ? 'text-danger font-medium' : 'text-text-secondary',
                ]"
              >
                {{ formatServiceDue(row.serviceDueKm) }}
              </td>
              <td :class="['px-3 py-2.5 tabular-nums text-right font-medium', tempColor(row.coolantTemp)]">
                {{ row.coolantTemp }}°C
              </td>
              <td :class="['px-3 py-2.5 tabular-nums text-right font-medium', brakeColor(row.brakeWearPct)]">
                {{ row.brakeWearPct }}%
              </td>
              <td class="px-3 py-2.5 text-center">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border',
                    statusBadge[row.status],
                  ]"
                >
                  {{ statusLabel[row.status] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ChartCard>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="Engine Over-Rev Analysis"
        subtitle="Events per vehicle · last 30 days"
      >
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="overRevOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard
        title="Brake Wear by Driver"
        subtitle="Top 10 · % of replacement threshold"
      >
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="brakeWearOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartCard
        title="Coolant Temperature Trend"
        subtitle="Fleet average · last 14 days · threshold 100°C"
        class="lg:col-span-2"
      >
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="coolantOption" autoresize />
        </div>
      </ChartCard>

      <article
        class="glass rounded-2xl px-5 py-5 flex flex-col min-h-[300px] relative overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 420 } }"
      >
        <div
          class="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <header class="mb-2 relative">
          <h3 class="text-text-primary font-semibold text-[15px] tracking-tight">
            Tire Pressure Compliance
          </h3>
          <p class="text-caption text-text-muted mt-0.5">Fleet-wide compliance score</p>
        </header>
        <div class="flex-1 min-h-0 relative">
          <KPIGauge label="" :value="tirePressureScore" :max="100" />
        </div>
        <p class="text-caption text-text-secondary text-center -mt-2 relative">
          <span class="text-success font-semibold">{{ tirePressureScore }}%</span>
          of vehicles within target range
        </p>
      </article>
    </section>

    <ChartCard
      title="Predictive Maintenance Calendar"
      subtitle="Next 90 days · grouped by month · ordered by date"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          v-for="(month, idx) in calendarMonths"
          :key="month.label"
          :class="[
            'rounded-xl border bg-surface/40 p-4 flex flex-col gap-3',
            idx === 0 ? 'border-border-glow' : 'border-border-subtle',
          ]"
        >
          <div class="flex items-center justify-between">
            <h4
              :class="[
                'text-caption font-semibold uppercase tracking-widest',
                idx === 0 ? 'text-brand-light' : 'text-text-muted',
              ]"
            >
              {{ month.label }}
            </h4>
            <span class="text-text-muted text-[11px] tabular-nums">
              {{ month.tasks.length }} tasks
            </span>
          </div>
          <ul class="space-y-2">
            <li
              v-for="task in month.tasks"
              :key="task.id"
              class="flex items-start gap-3 rounded-lg px-2.5 py-2 hover:bg-surface-hover/60 transition-colors"
            >
              <span :class="['mt-1.5 h-2 w-2 rounded-full shrink-0', severityDot[task.severity]]" />
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-text-primary text-[13px] font-medium">{{ task.vehicle }}</span>
                  <span
                    :class="[
                      'inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold border uppercase tracking-wider',
                      severityChip[task.severity],
                    ]"
                  >
                    {{ task.severity }}
                  </span>
                </div>
                <p class="text-text-secondary text-[12px] truncate">{{ task.task }}</p>
              </div>
              <span class="text-text-muted text-[11px] tabular-nums shrink-0">{{ task.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </ChartCard>

    <ChartCard
      title="Idle Time Impact"
      subtitle="Fuel wasted vs idle hours · last 30 days"
    >
      <div class="h-[280px]">
        <VChart class="h-full w-full" :option="idleImpactOption" autoresize />
      </div>
    </ChartCard>
  </div>
</template>
