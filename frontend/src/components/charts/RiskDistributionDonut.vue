<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND } from "@/lib/echarts";

const props = defineProps<{
  data: { name: string; value: number; color: string }[];
}>();

const total = computed(() =>
  props.data.reduce((s, d) => s + d.value, 0)
);

const option = computed(() => ({
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(20, 20, 25, 0.92)",
    borderColor: BRAND.border,
    borderWidth: 1,
    textStyle: { color: BRAND.textPrimary, fontFamily: "Inter, sans-serif" },
    extraCssText: "backdrop-filter: blur(8px); border-radius: 10px;",
    formatter: (p: { name: string; value: number; percent: number; color: string }) =>
      `<span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${p.color};margin-right:6px"></span><span style="color:${BRAND.textPrimary};font-weight:600">${p.name}</span><br/><span style="color:${BRAND.textMuted};font-size:11px">${p.value} drivers · ${p.percent}%</span>`,
  },
  series: [
    {
      type: "pie",
      radius: ["62%", "92%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: BRAND.bg,
        borderWidth: 4,
      },
      label: { show: false },
      labelLine: { show: false },
      data: props.data.map((d) => ({
        value: d.value,
        name: d.name,
        itemStyle: { color: d.color },
      })),
      animationDuration: 900,
      animationEasing: "cubicOut",
    },
  ],
}));
</script>

<template>
  <div class="relative w-full h-full flex flex-col">
    <div class="relative flex-1 min-h-0">
      <VChart class="h-full w-full" :option="option" autoresize />
      <div class="absolute inset-0 grid place-items-center pointer-events-none">
        <div class="flex flex-col items-center">
          <span class="text-text-muted text-micro uppercase tracking-[0.16em]">Total</span>
          <span class="text-[28px] leading-none font-bold text-text-primary tabular-nums mt-1">
            {{ total }}
          </span>
        </div>
      </div>
    </div>
    <ul class="flex items-center justify-center gap-4 flex-wrap pt-3 px-1">
      <li
        v-for="d in data"
        :key="d.name"
        class="flex items-center gap-1.5 text-caption text-text-secondary"
      >
        <span class="h-2 w-2 rounded-full" :style="{ background: d.color }" />
        {{ d.name }}
      </li>
    </ul>
  </div>
</template>
