<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import { Fuel, Droplets, Wind, Leaf, TrendingDown, Download, Sparkles } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import KPIGauge from "@/components/widgets/KPIGauge.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import {
  fuelKpis,
  fuelConsumptionTrend,
  fuelWasteBreakdown,
  co2EmissionsTrend,
  sustainabilityDrivers,
  carbonBudget,
} from "@/lib/mock-data";

const fuelTrendOption = computed(() => ({
  grid: { left: 40, right: 18, top: 18, bottom: 26 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "axis",
    axisPointer: { type: "shadow" },
  },
  xAxis: {
    type: "category",
    data: fuelConsumptionTrend.map(d => d.month),
    ...AXIS_STYLE,
  },
  yAxis: {
    type: "value",
    ...AXIS_STYLE,
    axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: number) => `${v} L` },
  },
  series: [{
    type: "bar",
    barWidth: 24,
    data: fuelConsumptionTrend.map(d => d.value),
    itemStyle: {
      color: {
        type: "linear", x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: BRAND.orangeLight },
          { offset: 1, color: BRAND.orangeDark },
        ],
      },
      borderRadius: [4, 4, 0, 0],
    },
    animationDuration: 900,
    animationEasing: "cubicOut",
  }],
}));

const fuelWasteOption = computed(() => ({
  tooltip: { ...TOOLTIP_STYLE, trigger: "item" },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 10, itemHeight: 10, itemGap: 14,
  },
  series: [{
    type: "pie",
    radius: ["52%", "78%"],
    center: ["50%", "44%"],
    label: { show: false },
    data: fuelWasteBreakdown.map(d => ({
      name: d.name,
      value: d.value,
      itemStyle: { color: d.color },
    })),
    emphasis: {
      itemStyle: { shadowBlur: 16, shadowColor: "rgba(0,0,0,0.4)" },
    },
    animationType: "scale",
    animationDuration: 900,
  }],
}));

const co2Option = computed(() => ({
  grid: { left: 44, right: 18, top: 24, bottom: 36 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 14, itemHeight: 3, itemGap: 20,
  },
  xAxis: {
    type: "category",
    data: co2EmissionsTrend.map(d => d.month),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: {
    type: "value", min: 0, max: 1200,
    ...AXIS_STYLE,
  },
  series: [
    {
      name: "Target", type: "line", smooth: false,
      data: co2EmissionsTrend.map(d => d.target),
      lineStyle: { color: BRAND.success, width: 2, type: "dashed" },
      itemStyle: { color: BRAND.success },
      symbol: "none",
    },
    {
      name: "Actual", type: "line", smooth: 0.3, symbol: "circle", symbolSize: 7,
      data: co2EmissionsTrend.map(d => d.actual),
      itemStyle: { color: BRAND.orange, borderColor: BRAND.bg, borderWidth: 2 },
      lineStyle: { color: BRAND.orange, width: 2.5 },
      areaStyle: {
        color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 166, 35, 0.25)" },
            { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
          ],
        },
      },
      animationDuration: 1100,
    },
  ],
}));
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Fuel & ESG Analytics"
      subtitle="Consumption, idle waste, CO₂, carbon budget and sustainability ranking."
      eyebrow="ESG & sustainability"
    >
      <template #actions>
        <button class="hidden sm:flex items-center gap-1.5 rounded-lg border border-border-subtle hover:border-border-glow text-text-secondary hover:text-brand-light px-3 py-2 text-sm transition-colors focus-brand">
          <Download class="h-3.5 w-3.5" />
          Export
        </button>
        <button class="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-bg-deep font-semibold px-3 py-2 text-sm hover:opacity-95 transition-opacity focus-brand">
          <Sparkles class="h-3.5 w-3.5" />
          AI Insights
        </button>
      </template>
    </PageHeader>

    <FilterBar />

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Fuel Efficiency"
        :value="fuelKpis.fuelEfficiency"
        unit="L/100km"
      >
        <template #icon><Fuel class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Total Fuel Consumed"
        :value="fuelKpis.totalFuelConsumed.toLocaleString()"
        unit="L"
      >
        <template #icon><Droplets class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Idle Fuel Waste"
        :value="`${fuelKpis.idleFuelWaste}%`"
      >
        <template #icon><Wind class="h-4 w-4 text-warning" /></template>
      </KPICard>

      <article
        class="glass rounded-2xl px-5 py-4 flex flex-col min-h-[180px] relative overflow-hidden"
        v-motion
        :initial="{ opacity: 0, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
      >
        <div class="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <KPIGauge label="Eco Score" :value="fuelKpis.ecoScore" :max="100" />
      </article>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KPICard
        label="CO₂ Emissions"
        :value="fuelKpis.co2Emissions"
        unit="tons"
      >
        <template #icon><Leaf class="h-4 w-4 text-success" /></template>
      </KPICard>

      <KPICard
        label="Carbon Reduction"
        :value="`${fuelKpis.carbonReduction}%`"
        :delta="fuelKpis.carbonReduction"
        accent="danger"
      >
        <template #icon><TrendingDown class="h-4 w-4 text-danger" /></template>
      </KPICard>

      <KPICard
        label="Carbon Reduction"
        :value="`${fuelKpis.carbonReduction}%`"
        :delta="fuelKpis.carbonReduction"
        accent="danger"
      >
        <template #icon><TrendingDown class="h-4 w-4 text-danger" /></template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Fuel Consumption Trend">
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="fuelTrendOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard title="Fuel Waste Breakdown">
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="fuelWasteOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="CO2 Emissions Trend">
        <div class="h-[320px]">
          <VChart class="h-full w-full" :option="co2Option" autoresize />
        </div>
      </ChartCard>

      <div class="flex flex-col gap-4">
        <ChartCard title="Sustainability Driver Ranking">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left border-b border-border-subtle">
                  <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium w-8"></th>
                  <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
                  <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Score</th>
                  <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-center">Status</th>
                  <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium text-right">Green Score</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="d in sustainabilityDrivers"
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
                  <td class="px-3 py-2.5 text-text-secondary tabular-nums text-right">{{ d.score }}</td>
                  <td class="px-3 py-2.5 text-center">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-success/15 text-success border border-success/30">
                      {{ d.status }}
                    </span>
                  </td>
                  <td class="px-3 py-2.5 text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <Leaf class="h-3.5 w-3.5 text-success" />
                      <span class="text-success font-semibold tabular-nums">{{ d.greenScore }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard title="Fleet Carbon Budget">
          <div class="px-1 py-2">
            <div class="w-full h-5 rounded-full bg-surface-hover overflow-hidden border border-border-subtle">
              <div
                class="h-full rounded-full bg-gradient-brand transition-all duration-700"
                :style="{ width: `${carbonBudget.used}%` }"
              />
            </div>
            <div class="flex items-center justify-between mt-3 text-caption">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1.5">
                  <span class="h-2.5 w-2.5 rounded-full bg-brand" />
                  <span class="text-text-muted">Budget Cap</span>
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="h-2.5 w-2.5 rounded-full bg-surface-hover border border-border-subtle" />
                  <span class="text-text-muted">Current Usage</span>
                </span>
              </div>
              <span class="text-text-secondary font-semibold tabular-nums">{{ carbonBudget.used }}% of annual budget used</span>
            </div>
          </div>
        </ChartCard>
      </div>
    </section>
  </div>
</template>
