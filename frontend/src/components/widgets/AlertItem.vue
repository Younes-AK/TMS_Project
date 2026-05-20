<script setup lang="ts">
import { computed } from "vue";
import { AlertTriangle, AlertOctagon, Gauge, MapPin, CloudOff } from "lucide-vue-next";
import type { Alert } from "@/lib/mock-data";

const props = defineProps<{ alert: Alert }>();

const severityClass = computed(() => {
  switch (props.alert.severity) {
    case "critical": return "text-danger bg-danger/15 border-danger/30";
    case "high":     return "text-danger bg-danger/12 border-danger/25";
    case "medium":   return "text-warning bg-warning/15 border-warning/30";
    default:         return "text-info bg-info/12 border-info/25";
  }
});

const Icon = computed(() => {
  switch (props.alert.type) {
    case "Crash Detected": return AlertOctagon;
    case "Speeding":       return Gauge;
    case "Geofence Exit":  return MapPin;
    case "Idle":           return CloudOff;
    default:               return AlertTriangle;
  }
});
</script>

<template>
  <li
    class="flex items-center gap-3 py-2.5 px-1 border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/40 transition-colors rounded-md"
  >
    <span
      :class="[
        'grid place-items-center h-9 w-9 rounded-lg border shrink-0',
        severityClass,
      ]"
    >
      <component :is="Icon" class="h-4 w-4" />
    </span>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-semibold text-text-primary truncate">
        {{ alert.type }}
      </div>
      <div class="text-caption text-text-muted truncate">
        {{ alert.detail }}
      </div>
    </div>
    <time class="text-caption text-text-muted tabular-nums shrink-0">
      {{ alert.time }}
    </time>
  </li>
</template>
