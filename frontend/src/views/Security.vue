<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND, TOOLTIP_STYLE, AXIS_STYLE } from "@/lib/echarts";
import { MapPin, CircleAlert, Truck, Wifi, Shield, DoorOpen, Download, Sparkles } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import FleetMap from "@/components/maps/FleetMap.vue";
import {
  securityKpis,
  securityEvents,
  geofenceViolations,
  fraudAnomalyScores,
  unauthorizedDoorOpenings,
  fleetMarkers,
} from "@/lib/mock-data";

const severityClasses: Record<string, { dot: string; text: string }> = {
  critical: { dot: "bg-danger pulse-dot", text: "text-danger" },
  high:     { dot: "bg-brand",            text: "text-brand" },
  medium:   { dot: "bg-warning",          text: "text-warning" },
  low:      { dot: "bg-text-muted",       text: "text-text-muted" },
};

const routeMarkers = fleetMarkers.slice(0, 5).map((m, i) => ({
  ...m,
  status: i === 2 ? "alert" as const : "driving" as const,
}));

const anomalyColor = (val: number) => {
  if (val === 2) return "bg-danger/70 text-white";
  if (val === 1) return "bg-brand/50 text-white";
  return "bg-success/30 text-success";
};

const doorOption = computed(() => ({
  grid: { left: 36, right: 12, top: 12, bottom: 26 },
  tooltip: { ...TOOLTIP_STYLE, trigger: "axis", axisPointer: { type: "shadow" } },
  xAxis: {
    type: "category",
    data: unauthorizedDoorOpenings.map(d => d.month),
    ...AXIS_STYLE,
  },
  yAxis: { type: "value", ...AXIS_STYLE },
  series: [{
    type: "bar",
    barWidth: 22,
    data: unauthorizedDoorOpenings.map(d => d.value),
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
    animationDuration: 800,
    animationEasing: "cubicOut",
  }],
}));
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Security & Anti-Fraud"
      subtitle="GPS tampering, GSM jamming, unauthorized usage, route deviation and fraud anomalies."
      eyebrow="Security operations"
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
        label="GPS Tampering Events"
        :value="securityKpis.gpsTampering"
      >
        <template #icon><MapPin class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="Unauthorized Stops"
        :value="securityKpis.unauthorizedStops"
      >
        <template #icon><CircleAlert class="h-4 w-4 text-warning" /></template>
      </KPICard>

      <KPICard
        label="Towing Alerts"
        :value="securityKpis.towingAlerts"
      >
        <template #icon><Truck class="h-4 w-4 text-brand-light" /></template>
      </KPICard>

      <KPICard
        label="GSM Jamming"
        :value="securityKpis.gsmJamming"
      >
        <template #icon><Wifi class="h-4 w-4 text-brand-light" /></template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard title="Security Events Timeline" class="lg:col-span-5" style="min-height: 420px;">
        <ul class="space-y-1 overflow-y-auto max-h-[360px] pr-1">
          <li
            v-for="e in securityEvents"
            :key="e.id"
            class="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-surface-hover/60 transition-colors"
            v-motion
            :initial="{ opacity: 0, x: -8 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
          >
            <span :class="['h-2.5 w-2.5 rounded-full shrink-0 mt-1.5', severityClasses[e.severity]?.dot]" />
            <div class="grid place-items-center h-8 w-8 rounded-lg bg-surface-hover shrink-0">
              <Shield class="h-4 w-4 text-brand" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-text-primary leading-snug">
                {{ e.title }}
                <span :class="['ml-1', severityClasses[e.severity]?.text]">({{ e.severity.charAt(0).toUpperCase() + e.severity.slice(1) }})</span>
              </p>
              <p class="text-caption text-text-muted mt-0.5">{{ e.detail }}</p>
            </div>
            <span class="text-caption text-text-muted shrink-0 tabular-nums whitespace-nowrap">{{ e.time }}</span>
          </li>
        </ul>
      </ChartCard>

      <div class="lg:col-span-7 flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <KPICard
            label="GSM Jamming"
            :value="securityKpis.gsmJammingLive"
          >
            <template #icon><Wifi class="h-4 w-4 text-brand-light" /></template>
          </KPICard>

          <KPICard
            label="Unauthorized Usage"
            :value="securityKpis.unauthorizedUsage"
          >
            <template #icon><DoorOpen class="h-4 w-4 text-warning" /></template>
          </KPICard>
        </div>

        <ChartCard title="Route Deviation Map" class="flex-1">
          <div class="h-[280px] rounded-xl overflow-hidden border border-border-subtle">
            <FleetMap :markers="routeMarkers" />
          </div>
        </ChartCard>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartCard title="Geofence Violations Table">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-border-subtle">
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Vehicle</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Location</th>
                <th class="px-3 py-2.5 text-micro text-text-muted uppercase tracking-widest font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="v in geofenceViolations"
                :key="v.vehicle"
                class="border-b border-border-subtle/50 hover:bg-surface-hover/40 transition-colors"
              >
                <td class="px-3 py-2.5 text-text-primary font-medium">{{ v.vehicle }}</td>
                <td class="px-3 py-2.5 text-text-secondary">{{ v.driver }}</td>
                <td class="px-3 py-2.5 text-text-muted">{{ v.location }}</td>
                <td class="px-3 py-2.5 text-text-muted tabular-nums">{{ v.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>

      <ChartCard title="Fraud Anomaly Scores">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left border-b border-border-subtle">
                <th class="px-2 py-2 text-micro text-text-muted uppercase tracking-widest font-medium"></th>
                <th
                  v-for="cat in fraudAnomalyScores.categories"
                  :key="cat"
                  class="px-2 py-2 text-micro text-text-muted uppercase tracking-widest font-medium text-center"
                  style="writing-mode: vertical-lr; transform: rotate(180deg); max-width: 40px;"
                >{{ cat }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, ri) in fraudAnomalyScores.data"
                :key="ri"
                class="border-b border-border-subtle/50"
              >
                <td class="px-2 py-2 text-text-secondary text-caption font-medium">{{ fraudAnomalyScores.vehicles[ri] }}</td>
                <td
                  v-for="(val, ci) in row"
                  :key="ci"
                  class="px-1 py-1.5 text-center"
                >
                  <span :class="['inline-flex items-center justify-center h-8 w-full max-w-[40px] rounded-md font-semibold text-sm', anomalyColor(val)]">
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-center gap-4 mt-3 text-caption text-text-muted">
            <span class="flex items-center gap-1.5"><span class="h-3 w-6 rounded bg-success/30" /> Low</span>
            <span class="flex items-center gap-1.5"><span class="h-3 w-6 rounded bg-brand/50" /></span>
            <span class="flex items-center gap-1.5"><span class="h-3 w-6 rounded bg-danger/70" /> High</span>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Unauthorized Door Openings">
        <div class="h-[240px]">
          <VChart class="h-full w-full" :option="doorOption" autoresize />
        </div>
      </ChartCard>
    </section>
  </div>
</template>
