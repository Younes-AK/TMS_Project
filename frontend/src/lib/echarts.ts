import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart, BarChart, GaugeChart, RadarChart, ScatterChart, HeatmapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  VisualMapComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  GaugeChart,
  RadarChart,
  ScatterChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  VisualMapComponent,
]);

export const BRAND = {
  orange: "#F5A623",
  orangeDark: "#E8950E",
  orangeLight: "#FFB84D",
  surface: "#141419",
  surfaceElevated: "#1A1A22",
  bg: "#0A0A0F",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0B0",
  textMuted: "#6B6B7B",
  border: "rgba(245, 166, 35, 0.18)",
  success: "#22C55E",
  warning: "#F5A623",
  danger: "#EF4444",
  info: "#3B82F6",
} as const;

export const TOOLTIP_STYLE = {
  backgroundColor: "rgba(20, 20, 25, 0.92)",
  borderColor: BRAND.border,
  borderWidth: 1,
  textStyle: { color: BRAND.textPrimary, fontFamily: "Inter, sans-serif", fontSize: 12 },
  extraCssText:
    "backdrop-filter: blur(8px); border-radius: 10px; box-shadow: 0 8px 24px -8px rgba(0,0,0,0.6);",
} as const;

export const AXIS_STYLE = {
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: BRAND.textMuted, fontSize: 11, margin: 12 },
  splitLine: { lineStyle: { color: "rgba(245, 166, 35, 0.08)", type: "dashed" as const } },
} as const;
