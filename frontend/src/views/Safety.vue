<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import { ShieldCheck, AlertTriangle, CalendarCheck, Eye, Radio, CheckCircle } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import FleetMap from "@/components/maps/FleetMap.vue";
import {
  safetyKpis,
  incidentTimeline,
  adasBreakdown,
  dsmSafetyViolations,
  accidentTrend,
  safetyHeatmapMarkers,
} from "@/lib/mock-data";

const heatmapVehicleMarkers = safetyHeatmapMarkers.map((m, i) => ({
  id: `sh${i}`,
  lat: m.lat,
  lng: m.lng,
  status: "alert" as const,
  plate: `INC-${i + 1}`,
  driver: "Incident",
  speed: 0,
}));

const incidentOption = computed(() => ({
  grid: { left: 36, right: 18, top: 40, bottom: 26 },
  tooltip: {
    ...TOOLTIP_STYLE,
    trigger: "item",
    formatter: (p: { data: { label: string; description: string } }) =>
      `<span style="color:${BRAND.orangeLight};font-weight:600">${p.data.label}</span><br/><span style="color:${BRAND.textMuted};font-size:11px">${p.data.description}</span>`,
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    ...AXIS_STYLE,
  },
  yAxis: { show: false },
  series: [{
    type: "scatter",
    symbolSize: 20,
    symbol: "path://M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    itemStyle: { color: BRAND.danger, shadowBlur: 12, shadowColor: "rgba(239, 68, 68, 0.5)" },
    label: {
      show: true,
      position: "top",
      formatter: (p: { data: { label: string } }) => p.data.label,
      color: BRAND.textSecondary,
      fontSize: 10,
      distance: 12,
    },
    data: incidentTimeline.map(d => ({
      value: [d.month, 1],
      label: d.label,
      description: d.description,
    })),
    animationDuration: 900,
  }],
}));

const adasOption = computed(() => ({
  grid: { left: 140, right: 30, top: 12, bottom: 12 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis", axisPointer: { type: "shadow" } },
  xAxis: {
    type: "value",
    max: 100,
    ...AXIS_STYLE,
  },
  yAxis: {
    type: "category",
    data: adasBreakdown.map(d => d.name).reverse(),
    ...AXIS_STYLE,
    axisLabel: { ...AXIS_STYLE.axisLabel, color: BRAND.textSecondary },
  },
  series: [{
    type: "bar",
    data: adasBreakdown.map(d => d.value).reverse(),
    barWidth: 22,
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
    animationDuration: 900,
    animationEasing: "cubicOut",
  }],
}));

const dsmDonutOption = computed(() => ({
  tooltip: { ...TOOLTIP_STYLE, trigger: "item" },
  legend: {
    bottom: 0,
    textStyle: { color: BRAND.textMuted, fontSize: 11 },
    itemWidth: 10, itemHeight: 10, itemGap: 14,
  },
  series: [{
    type: "pie",
    radius: ["55%", "78%"],
    center: ["50%", "44%"],
    label: { show: false },
    data: dsmSafetyViolations.map(d => ({
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

const accidentOption = computed(() => ({
  grid: { left: 36, right: 18, top: 24, bottom: 26 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis" },
  xAxis: {
    type: "category",
    data: accidentTrend.map(d => d.month),
    boundaryGap: false,
    ...AXIS_STYLE,
  },
  yAxis: {
    type: "value", min: 0, max: 100,
    ...AXIS_STYLE,
  },
  series: [{
    type: "line", smooth: 0.3, symbol: "circle", symbolSize: 8,
    data: accidentTrend.map(d => d.value),
    itemStyle: { color: BRAND.orange, borderColor: BRAND.bg, borderWidth: 2 },
    lineStyle: { color: BRAND.orange, width: 2 },
    label: {
      show: true, position: "top", color: BRAND.textSecondary, fontSize: 10,
      formatter: (p: { value: number }) => `${p.value}`,
    },
    markLine: {
      silent: true,
      lineStyle: { color: BRAND.danger, type: "dashed", width: 1 },
      data: [{ yAxis: 80, label: { show: false } }],
    },
    animationDuration: 1100,
    animationEasing: "cubicOut",
  }],
}));
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Safety & HSE"
      subtitle="Incidents, ADAS, DSM violations, fatigue compliance and safety heatmap."
      eyebrow="Safety operations"
    />

    <FilterBar />

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Seatbelt Compliance"
        :value="`${safetyKpis.seatbeltCompliance}%`"
        accent="highlight"
      >
        <template #icon><ShieldCheck class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Crash Incidents"
        :value="safetyKpis.crashIncidents"
        accent="danger"
      >
        <template #icon><AlertTriangle class="h-4 w-4 text-danger" /></template>
      </KPICard>

      <KPICard
        label="Days Without Accident"
        :value="safetyKpis.daysWithoutAccident"
        accent="success"
      >
        <template #icon><CalendarCheck class="h-4 w-4 text-success" /></template>
      </KPICard>

      <KPICard
        label="Near-Misses"
        :value="safetyKpis.nearMisses"
      >
        <template #icon><Eye class="h-4 w-4 text-brand-light" /></template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KPICard
        label="Near-Misses"
        :value="safetyKpis.nearMisses"
      >
        <template #icon><Eye class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="ADAS Warning Rate"
        :value="safetyKpis.adasWarningRate"
        unit="/100km"
      >
        <template #icon><Radio class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Safety Compliance"
        :value="`${safetyKpis.safetyCompliance}%`"
        accent="success"
      >
        <template #icon><CheckCircle class="h-4 w-4 text-success" /></template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Incident Timeline">
        <div class="h-[280px]">
          <VChart class="h-full w-full" :option="incidentOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard title="ADAS Breakdown">
        <div class="h-[280px]">
          <VChart class="h-full w-full" :option="adasOption" autoresize />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartCard title="DSM Safety Violations">
        <div class="h-[280px]">
          <VChart class="h-full w-full" :option="dsmDonutOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard title="Accident Trend">
        <div class="h-[280px]">
          <VChart class="h-full w-full" :option="accidentOption" autoresize />
        </div>
      </ChartCard>

      <ChartCard title="Safety Heatmap">
        <div class="h-[280px] rounded-xl overflow-hidden border border-border-subtle">
          <FleetMap :markers="heatmapVehicleMarkers" />
        </div>
      </ChartCard>
    </section>
  </div>
</template>
