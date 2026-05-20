<script setup lang="ts">
import { computed } from "vue";
import VChart from "vue-echarts";
import "@/lib/echarts";
import { BRAND } from "@/lib/echarts";

const props = defineProps<{
  data: { month: string; score: number }[];
}>();

const option = computed(() => ({
  grid: { left: 36, right: 18, top: 18, bottom: 26 },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(20, 20, 25, 0.92)",
    borderColor: BRAND.border,
    borderWidth: 1,
    textStyle: { color: BRAND.textPrimary, fontFamily: "Inter, sans-serif" },
    extraCssText:
      "backdrop-filter: blur(8px); border-radius: 10px; box-shadow: 0 8px 24px -8px rgba(0,0,0,0.6);",
    formatter: (params: { name: string; value: number }[]) => {
      const p = params[0];
      return `<span style="color:${BRAND.textMuted};font-size:11px">${p.name}</span><br/><span style="color:${BRAND.orangeLight};font-weight:600;font-size:14px">${p.value}</span> <span style="color:${BRAND.textMuted};font-size:11px">score</span>`;
    },
  },
  xAxis: {
    type: "category",
    data: props.data.map((d) => d.month),
    boundaryGap: false,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: BRAND.textMuted, fontSize: 11, margin: 12 },
  },
  yAxis: {
    type: "value",
    min: 50,
    max: 100,
    interval: 10,
    splitLine: { lineStyle: { color: "rgba(245, 166, 35, 0.08)", type: "dashed" } },
    axisLabel: { color: BRAND.textMuted, fontSize: 11 },
  },
  series: [
    {
      type: "line",
      smooth: 0.4,
      symbol: "circle",
      symbolSize: 8,
      itemStyle: {
        color: BRAND.orange,
        borderColor: BRAND.bg,
        borderWidth: 2,
        shadowBlur: 12,
        shadowColor: "rgba(245, 166, 35, 0.55)",
      },
      lineStyle: { color: BRAND.orange, width: 2.5, shadowBlur: 12, shadowColor: "rgba(245, 166, 35, 0.4)" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 166, 35, 0.45)" },
            { offset: 1, color: "rgba(245, 166, 35, 0.02)" },
          ],
        },
      },
      data: props.data.map((d) => d.score),
      animationDuration: 1100,
      animationEasing: "cubicOut",
    },
  ],
}));
</script>

<template>
  <VChart class="h-full w-full" :option="option" autoresize />
</template>
