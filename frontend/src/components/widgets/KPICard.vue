<script setup lang="ts">
import { computed } from "vue";
import { TrendingUp, TrendingDown } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    unit?: string;
    delta?: number;
    deltaSuffix?: string;
    accent?: "default" | "highlight" | "success" | "danger";
  }>(),
  { accent: "default" }
);

const deltaPositive = computed(() => (props.delta ?? 0) >= 0);

const accentClasses = computed(() => {
  switch (props.accent) {
    case "highlight":
      return "border-border-glow shadow-[var(--shadow-glow-md)]";
    case "success":
      return "border-success/30";
    case "danger":
      return "border-danger/30";
    default:
      return "";
  }
});
</script>

<template>
  <article
    :class="[
      'glass glass-hover rounded-2xl px-5 py-4 flex flex-col gap-2.5 relative overflow-hidden',
      accentClasses,
    ]"
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 380 } }"
  >
    <div
      class="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-brand/10 blur-3xl pointer-events-none"
      aria-hidden="true"
    />

    <header class="flex items-center justify-between gap-2 relative">
      <h4 class="text-caption text-text-secondary font-medium truncate">
        {{ label }}
      </h4>
      <slot name="icon" />
    </header>

    <div class="flex items-baseline gap-1.5 relative">
      <span
        class="text-[34px] leading-none font-bold text-text-primary tabular-nums tracking-tight"
      >
        {{ value }}
      </span>
      <span v-if="unit" class="text-caption text-text-muted font-medium">
        {{ unit }}
      </span>
    </div>

    <div
      v-if="typeof delta === 'number'"
      class="flex items-center gap-1.5 text-caption relative"
    >
      <span
        :class="[
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-semibold text-[11px]',
          deltaPositive
            ? 'bg-success/15 text-success'
            : 'bg-danger/15 text-danger',
        ]"
      >
        <TrendingUp v-if="deltaPositive" class="h-3 w-3" />
        <TrendingDown v-else class="h-3 w-3" />
        {{ deltaPositive ? "+" : "" }}{{ delta }}%
      </span>
      <span class="text-text-muted">{{ deltaSuffix ?? "vs last period" }}</span>
    </div>
  </article>
</template>
