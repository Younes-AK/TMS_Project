<script setup lang="ts">
import { Truck, PauseCircle, StopCircle, WifiOff, AlertTriangle, MapPin } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import FleetMap from "@/components/maps/FleetMap.vue";
import {
  liveStatusCounters,
  liveEvents,
  vehicleStatusTable,
  fleetMarkers,
} from "@/lib/mock-data";

const statusCards = [
  { label: "Driving", value: liveStatusCounters.driving, icon: Truck,        color: "text-brand",   bg: "bg-brand/15",   border: "border-brand/40" },
  { label: "Idle",    value: liveStatusCounters.idle,    icon: PauseCircle,   color: "text-warning",  bg: "bg-warning/15", border: "border-warning/30" },
  { label: "Stopped", value: liveStatusCounters.stopped, icon: StopCircle,    color: "text-text-muted", bg: "bg-surface-hover", border: "border-border-glow" },
  { label: "Offline", value: liveStatusCounters.offline, icon: WifiOff,       color: "text-text-muted", bg: "bg-surface",    border: "border-border-subtle" },
];

const severityClasses: Record<string, string> = {
  critical: "text-danger",
  high: "text-brand",
  medium: "text-warning",
  low: "text-text-muted",
};

const statusBadge: Record<string, { bg: string; text: string }> = {
  Driving: { bg: "bg-success/15 border-success/30", text: "text-success" },
  Stopped: { bg: "bg-warning/15 border-warning/30", text: "text-warning" },
  Idle:    { bg: "bg-info/15 border-info/30",        text: "text-info" },
  Offline: { bg: "bg-surface-hover border-border-subtle", text: "text-text-muted" },
};
</script>

<template>
  <div class="space-y-5">
    <PageHeader
      title="Live Operations"
      subtitle="Real-time fleet map, live status counters, event feed and vehicle tracking."
      eyebrow="Live ops control room"
    />

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="lg:col-span-8 relative">
        <div class="glass rounded-2xl overflow-hidden relative" style="min-height: 520px;">
          <div class="absolute inset-0">
            <FleetMap :markers="fleetMarkers" />
          </div>

          <div class="absolute left-4 top-4 flex flex-col gap-3 z-[500]">
            <div
              v-for="s in statusCards"
              :key="s.label"
              :class="[
                'glass rounded-xl px-4 py-3 min-w-[120px] border',
                s.border,
              ]"
              v-motion
              :initial="{ opacity: 0, x: -12 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 350 } }"
            >
              <span class="text-caption text-text-secondary font-medium block">{{ s.label }}</span>
              <span :class="['text-[36px] leading-none font-bold tabular-nums tracking-tight block mt-1', s.color]">
                {{ s.value }}
              </span>
            </div>
          </div>

          <div class="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 z-[500]">
            <div class="glass rounded-xl px-5 py-3 text-center">
              <span class="text-micro text-text-muted uppercase tracking-widest block">Total Active Vehicles:</span>
              <span class="text-[28px] leading-none font-bold text-text-primary tabular-nums block mt-1">
                {{ liveStatusCounters.totalActive }}
              </span>
            </div>
            <div class="glass rounded-xl px-5 py-3 text-center border border-danger/30">
              <span class="text-micro text-text-muted uppercase tracking-widest block">Real-time Alerts:</span>
              <span class="text-[28px] leading-none font-bold text-danger tabular-nums block mt-1">
                {{ liveStatusCounters.realtimeAlerts }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ChartCard
        title="Live Events Feed"
        class="lg:col-span-4"
        style="min-height: 520px;"
      >
        <ul class="space-y-1 overflow-y-auto max-h-[440px] pr-1">
          <li
            v-for="e in liveEvents"
            :key="e.id"
            class="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-surface-hover/60 transition-colors"
            v-motion
            :initial="{ opacity: 0, x: 8 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 300 } }"
          >
            <div class="flex flex-col items-center gap-1 pt-1">
              <span :class="['h-2.5 w-2.5 rounded-full shrink-0', {
                'bg-danger pulse-dot': e.severity === 'critical',
                'bg-brand': e.severity === 'high',
                'bg-warning': e.severity === 'medium',
                'bg-text-muted': e.severity === 'low',
              }]" />
            </div>
            <div class="grid place-items-center h-8 w-8 rounded-lg bg-surface-hover shrink-0">
              <AlertTriangle v-if="e.severity === 'critical' || e.severity === 'high'" class="h-4 w-4 text-brand" />
              <MapPin v-else class="h-4 w-4 text-warning" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-text-primary leading-snug">
                <span class="text-text-muted">{{ e.time }}</span> - {{ e.vehicleId }}
              </p>
              <p class="text-caption text-text-secondary mt-0.5">
                (Driver {{ e.driverName }})
              </p>
              <p :class="['text-caption font-semibold mt-0.5', severityClasses[e.severity]]">
                {{ e.type }}
              </p>
            </div>
          </li>
        </ul>
      </ChartCard>
    </section>

    <ChartCard title="Data-Intensive Status" subtitle="Real-time vehicle telemetry feed">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left border-b border-border-subtle">
              <th class="px-4 py-3 text-micro text-text-muted uppercase tracking-widest font-medium">Vehicle ID</th>
              <th class="px-4 py-3 text-micro text-text-muted uppercase tracking-widest font-medium">Driver</th>
              <th class="px-4 py-3 text-micro text-text-muted uppercase tracking-widest font-medium">Status</th>
              <th class="px-4 py-3 text-micro text-text-muted uppercase tracking-widest font-medium">Speed</th>
              <th class="px-4 py-3 text-micro text-text-muted uppercase tracking-widest font-medium">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in vehicleStatusTable"
              :key="row.vehicleId + row.driver"
              class="border-b border-border-subtle/50 hover:bg-surface-hover/40 transition-colors"
            >
              <td class="px-4 py-3 text-text-primary font-medium tabular-nums">{{ row.vehicleId }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2.5">
                  <div
                    :style="{ background: row.avatarColor }"
                    class="h-7 w-7 rounded-full grid place-items-center text-[10px] font-bold text-bg-deep shrink-0"
                  >
                    {{ row.initials }}
                  </div>
                  <span class="text-text-primary">{{ row.driver }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border',
                  statusBadge[row.status]?.bg,
                  statusBadge[row.status]?.text,
                ]">
                  {{ row.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-text-secondary tabular-nums">{{ row.speed }} mph</td>
              <td class="px-4 py-3 text-text-secondary">{{ row.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ChartCard>
  </div>
</template>
