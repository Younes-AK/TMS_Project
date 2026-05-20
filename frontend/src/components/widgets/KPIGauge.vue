<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    value: number;
    max?: number;
    unit?: string;
  }>(),
  { max: 100, unit: "" }
);

const SIZE = 220;
const CENTER = SIZE / 2;
const STROKE = 16;
const RADIUS = CENTER - STROKE - 2;
const START = 135;
const END = 405;
const SWEEP = END - START;

const polar = (angleDeg: number) => {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(a), y: CENTER + RADIUS * Math.sin(a) };
};

const arcPath = (fromDeg: number, toDeg: number) => {
  const s = polar(fromDeg);
  const e = polar(toDeg);
  const largeArc = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${e.x} ${e.y}`;
};

const trackPath = computed(() => arcPath(START, END));
const filledPath = computed(() => {
  const pct = Math.max(0, Math.min(1, props.value / props.max));
  return arcPath(START, START + SWEEP * pct);
});
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full">
    <header class="self-stretch flex items-start justify-between">
      <h4 class="text-text-primary font-semibold text-[15px] tracking-tight">
        {{ label }}
      </h4>
      <slot name="badge" />
    </header>

    <div class="relative grid place-items-center w-full flex-1 min-h-0 py-2">
      <svg
        :viewBox="`0 0 ${SIZE} ${SIZE}`"
        class="w-full max-w-[240px] h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient :id="`gauge-grad-${label}`" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFB84D" />
            <stop offset="55%" stop-color="#F5A623" />
            <stop offset="100%" stop-color="#E8950E" />
          </linearGradient>
          <filter :id="`gauge-glow-${label}`" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          :d="trackPath"
          fill="none"
          stroke="rgba(245, 166, 35, 0.12)"
          :stroke-width="STROKE"
          stroke-linecap="round"
        />

        <path
          :d="filledPath"
          fill="none"
          :stroke="`url(#gauge-grad-${label})`"
          :stroke-width="STROKE"
          stroke-linecap="round"
          :filter="`url(#gauge-glow-${label})`"
        />
      </svg>

      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          class="text-[56px] leading-none font-bold text-text-primary tabular-nums tracking-tight"
        >
          {{ value }}
        </span>
        <span class="text-text-muted text-caption mt-1">{{ unit || max }}</span>
      </div>
    </div>
  </div>
</template>
