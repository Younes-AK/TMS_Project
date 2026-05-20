<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPIGauge from "@/components/widgets/KPIGauge.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import {
  behaviorScores,
  driverBehaviorTable,
  harshEventsBreakdown,
  speedingAnalysis,
  dsmViolations,
} from "@/lib/mock-data";

const gauges = [
  { label: "Behavioral Score", value: behaviorScores.behavioral },
  { label: "Safety Score",     value: behaviorScores.safety },
  { label: "Eco Score",        value: behaviorScores.eco },
  { label: "Maintainability",  value: behaviorScores.maintainability },
  { label: "Discipline",       value: behaviorScores.discipline },
];

const badgeClasses: Record<string, string> = {
  Expert: "bg-success/15 text-success border-success/30",
  Gold:   "bg-brand/15 text-brand-light border-brand/30",
  Risk:   "bg-danger/15 text-danger border-danger/30",
};

const harshOption = computed(() => ({
  grid: { left: 48, right: 18, top: 18, bottom: 40 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 12, itemHeight: 8, itemGap: 16,
  },
  xAxis: {
    type: "category",
    data: ["Acceleration", "Braking", "Cornering"],
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", ...AXIS_STYLE },
  series: [
    {
      name: "Acceleration", type: "bar", barWidth: 18,
      data: harshEventsBreakdown.map(d => d.accel),
      itemStyle: { color: BRAND.orangeLight, borderRadius: [3, 3, 0, 0] },
    },
    {
      name: "Braking", type: "bar", barWidth: 18,
      data: harshEventsBreakdown.map(d => d.braking),
      itemStyle: { color: BRAND.orange, borderRadius: [3, 3, 0, 0] },
    },
    {
      name: "Cornering", type: "bar", barWidth: 18,
      data: harshEventsBreakdown.map(d => d.cornering),
      itemStyle: { color: BRAND.danger, borderRadius: [3, 3, 0, 0] },
    },
  ],
  animationDuration: 900,
  animationEasing: "cubicOut" as const,
}));

const speedingOption = computed(() => ({
  grid: { left: 36, right: 18, top: 18, bottom: 26 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value}%</span>`;
    },
  },
  xAxis: {
    type: "category",
    data: speedingAnalysis.map(d => d.month),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: {
    type: "value", min: 50, max: 100, interval: 10,
    ...AXIS_STYLE,
  },
  series: [{
    type: "line", smooth: 0.4, symbol: "circle", symbolSize: 8,
    itemStyle: { color: BRAND.orange, borderColor: BRAND.bg, borderWidth: 2, shadowBlur: 12, shadowColor: "rgba(245, 166, 35, 0.55)" },
    lineStyle: { color: BRAND.orange, width: 2.5, shadowBlur: 12, shadowColor: "rgba(245, 166, 35, 0.4)" },
    areaStyle: {
      color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: "rgba(245, 166, 35, 0.45)" },
          { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
        ],
      },
    },
    data: speedingAnalysis.map(d => d.value),
    animationDuration: 1100,
    animationEasing: "cubicOut" as const,
  }],
}));

const dsmCellColor = (val: number) => {
  if (val >= 8) return "bg-danger/80 text-white";
  if (val >= 6) return "bg-danger/50 text-white";
  if (val >= 4) return "bg-brand/50 text-white";
  return "bg-brand/25 text-brand-light";
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Driver Behavior Analytics"
      subtitle="Behavioral, safety, eco, maintainability and discipline scoring with AI coaching."
      eyebrow="Behavioral intelligence"
    />

    <FilterBar />

    <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <article
        v-for="g in gauges"
        :key="g.label"
        class="glass rounded-2xl px-4 py-4 flex flex-col min-h-[200px] relative overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
      >
        <div
          class="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <KPIGauge :label="g.label" :value="g.value" :max="100" />
      </article>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Driver Ranking Table">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-border-subtle">
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium w-8"></th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Safety Score</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Harsh Events/100km</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Speeding %</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Risk Badge</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="d in driverBehaviorTable"
                :key="d.rank"
                class="border-b border-border-subtle/50 hover:bg-surface-hover/40 transition-colors"
              >
                <td class="px-3 py-2.5 text-text-muted tabular-nums text-center">{{ d.rank }}</td>
                <td class="px-3 py-2.5">
                  <div class="flex items-center gap-2">
                    <div
                      :style="{ background: d.avatarColor }"
                      class="h-6 w-6 rounded-full grid place-items-center text-[9px] font-bold text-bg-deep shrink-0"
                    >{{ d.initials }}</div>
                    <span class="text-text-primary font-medium">{{ d.name }}</span>
                  </div>
                </td>
                <td class="px-3 py-2.5 text-text-secondary tabular-nums text-right">{{ d.safetyScore }}</td>
                <td class="px-3 py-2.5 text-text-secondary tabular-nums text-right">{{ d.harshPer100km }}</td>
                <td class="px-3 py-2.5 text-text-secondary tabular-nums text-right">{{ d.speedingPct }}</td>
                <td class="px-3 py-2.5 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border',
                    badgeClasses[d.riskBadge],
                  ]">{{ d.riskBadge }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard title="Harsh Events Breakdown">
        <div class="h-[340px]">
          <VChart class="h-full w-full" :option="harshOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Speeding Analysis" subtitle="30-day trend">
        <div class="h-[300px]">
          <VChart class="h-full w-full" :option="speedingOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard title="DSM Violations Heatmap">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-border-subtle">
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium w-8"></th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Fatigue</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Phone Use</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Seatbelt</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="d in dsmViolations"
                :key="d.rank"
                class="border-b border-border-subtle/50"
              >
                <td class="px-3 py-2.5 text-text-muted tabular-nums text-center">{{ d.rank }}</td>
                <td class="px-3 py-2.5 text-text-primary font-medium">{{ d.name }}</td>
                <td class="px-3 py-2 text-center">
                  <span :class="['inline-flex items-center justify-center h-8 w-10 rounded-md font-semibold text-sm', dsmCellColor(d.fatigue)]">
                    {{ d.fatigue }}
                  </span>
                </td>
                <td class="px-3 py-2 text-center">
                  <span :class="['inline-flex items-center justify-center h-8 w-10 rounded-md font-semibold text-sm', dsmCellColor(d.phoneUse)]">
                    {{ d.phoneUse }}
                  </span>
                </td>
                <td class="px-3 py-2 text-center">
                  <span :class="['inline-flex items-center justify-center h-8 w-10 rounded-md font-semibold text-sm', dsmCellColor(d.seatbelt)]">
                    {{ d.seatbelt }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </section>
  </div>
</template>
