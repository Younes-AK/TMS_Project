<script setup lang="ts">
import { Sparkles, ArrowUpRight, Download } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";

defineProps<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
  upcomingWidgets?: string[];
}>();
</script>

<template>
  <div class="space-y-6">
    <PageHeader :title="title" :subtitle="subtitle" :eyebrow="eyebrow ?? 'Phase 2 — Layout ready'">
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

    <div
      class="glass rounded-2xl p-8 lg:p-10 bg-grid relative overflow-hidden"
      v-motion
      :initial="{ opacity: 0, y: 12 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 450 } }"
    >
      <div class="absolute inset-0 bg-gradient-brand-soft opacity-40 pointer-events-none" />
      <div class="relative">
        <div class="inline-flex items-center gap-2 rounded-full bg-bg-deep/60 border border-border-glow px-3 py-1 text-micro text-brand-light uppercase tracking-[0.16em]">
          <span class="h-1.5 w-1.5 rounded-full bg-brand pulse-dot" />
          Coming next phase
        </div>
        <h2 class="text-h2 font-bold text-text-primary mt-3 max-w-2xl">
          {{ title }} widgets land in
          <span class="text-gradient-brand">Phase 3 &amp; 4</span>
        </h2>
        <p class="text-body text-text-secondary mt-2 max-w-2xl">
          Layout shell, design tokens and navigation are complete. KPI cards,
          gauges, charts and the live map will plug into the grid below.
        </p>

        <ul
          v-if="upcomingWidgets?.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8"
        >
          <li
            v-for="(widget, i) in upcomingWidgets"
            :key="widget"
            class="glass-hover rounded-xl bg-surface/60 border border-border-subtle px-4 py-3 flex items-center gap-3 group"
            v-motion
            :initial="{ opacity: 0, y: 8 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 350, delay: 80 + i * 40 },
            }"
          >
            <span class="grid place-items-center h-8 w-8 rounded-lg bg-gradient-brand-soft border border-border-subtle text-brand-light font-semibold text-caption">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <span class="text-sm text-text-primary flex-1 truncate">
              {{ widget }}
            </span>
            <ArrowUpRight class="h-4 w-4 text-text-muted group-hover:text-brand-light transition-colors" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
