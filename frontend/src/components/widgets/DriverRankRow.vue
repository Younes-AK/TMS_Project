<script setup lang="ts">
import { computed } from "vue";
import type { DriverRank } from "@/lib/mock-data";

const props = defineProps<{ driver: DriverRank }>();

const statusBadge = computed(() => {
  switch (props.driver.status) {
    case "top":
      return { label: "Top Performer", cls: "text-success bg-success/12 border-success/25" };
    case "watch":
      return { label: "On Watch", cls: "text-warning bg-warning/12 border-warning/30" };
    default:
      return { label: "At Risk", cls: "text-danger bg-danger/12 border-danger/25" };
  }
});
</script>

<template>
  <li
    class="grid grid-cols-[1.5rem_1fr_auto_auto] items-center gap-3 py-2.5 px-1 border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/40 transition-colors rounded-md"
  >
    <span class="text-text-muted text-caption font-semibold text-center">
      {{ driver.rank }}
    </span>

    <div class="flex items-center gap-3 min-w-0">
      <span
        class="h-8 w-8 rounded-full grid place-items-center text-bg-deep font-bold text-caption shrink-0"
        :style="{ background: driver.avatarColor }"
      >
        {{ driver.initials }}
      </span>
      <span class="text-sm text-text-primary font-medium truncate">
        {{ driver.name }}
      </span>
    </div>

    <span class="text-sm font-semibold text-text-primary tabular-nums shrink-0">
      {{ driver.score }}
    </span>

    <span
      :class="[
        'inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider shrink-0',
        statusBadge.cls,
      ]"
    >
      {{ statusBadge.label }}
    </span>
  </li>
</template>
