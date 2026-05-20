<script setup lang="ts">
import { Truck, Users, Fuel, Leaf, Activity, Route, Download, Sparkles } from "lucide-vue-next";
import PageHeader from "@/components/layout/PageHeader.vue";
import FilterBar from "@/components/layout/FilterBar.vue";
import KPIGauge from "@/components/widgets/KPIGauge.vue";
import KPICard from "@/components/widgets/KPICard.vue";
import ChartCard from "@/components/widgets/ChartCard.vue";
import SafetyScoreTrend from "@/components/charts/SafetyScoreTrend.vue";
import RiskDistributionDonut from "@/components/charts/RiskDistributionDonut.vue";
import FleetMap from "@/components/maps/FleetMap.vue";
import AlertItem from "@/components/widgets/AlertItem.vue";
import DriverRankRow from "@/components/widgets/DriverRankRow.vue";

import {
  fleetKpis,
  fleetMarkers,
  safetyTrend,
  riskDistribution,
  recentAlerts,
  driverRanking,
} from "@/lib/mock-data";
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Fleet Overview KPI"
      subtitle="Executive snapshot — safety, availability, fuel and risk across the live fleet."
      eyebrow="Fleet intelligence"
    >
      <template #actions>
        <button
          class="hidden sm:flex items-center gap-1.5 rounded-lg border border-border-subtle hover:border-border-glow text-text-secondary hover:text-brand-light px-3 py-2 text-sm transition-colors focus-brand"
        >
          <Download class="h-3.5 w-3.5" />
          Export
        </button>
        <button
          class="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-bg-deep font-semibold px-3 py-2 text-sm hover:opacity-95 transition-opacity focus-brand"
        >
          <Sparkles class="h-3.5 w-3.5" />
          AI Insights
        </button>
      </template>
    </PageHeader>

    <FilterBar />

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <article
        class="glass rounded-2xl px-5 py-5 sm:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col min-h-[280px] lg:min-h-[340px] relative overflow-hidden"
      >
        <div
          class="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-brand/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <KPIGauge
          label="Fleet Safety Score"
          :value="fleetKpis.safetyScore"
          :max="100"
        />
      </article>

      <KPICard
        label="Active Vehicles"
        :value="fleetKpis.activeVehicles"
        :delta="3.2"
        deltaSuffix="this week"
      >
        <template #icon>
          <Truck class="h-4 w-4 text-brand-light" />
        </template>
      </KPICard>

      <KPICard
        label="Active Drivers"
        :value="fleetKpis.activeDrivers"
        :delta="1.4"
        deltaSuffix="this week"
      >
        <template #icon>
          <Users class="h-4 w-4 text-brand-light" />
        </template>
      </KPICard>

      <KPICard
        label="Fuel Efficiency"
        :value="fleetKpis.fuelEfficiency"
        unit="L/100km"
        :delta="-2.1"
        deltaSuffix="vs target"
      >
        <template #icon>
          <Fuel class="h-4 w-4 text-brand-light" />
        </template>
      </KPICard>

      <KPICard
        label="CO₂ Emissions"
        :value="fleetKpis.co2Tons"
        unit="tons"
        :delta="-4.6"
        deltaSuffix="MoM"
        accent="success"
      >
        <template #icon>
          <Leaf class="h-4 w-4 text-success" />
        </template>
      </KPICard>

      <KPICard
        label="Fleet Availability"
        :value="`${fleetKpis.fleetAvailability}%`"
        :delta="0.8"
        accent="highlight"
      >
        <template #icon>
          <Activity class="h-4 w-4 text-brand-light" />
        </template>
      </KPICard>

      <KPICard
        label="Total Distance"
        :value="(fleetKpis.totalDistanceKm / 1000).toFixed(1)"
        unit="× 10³ km"
        :delta="5.7"
      >
        <template #icon>
          <Route class="h-4 w-4 text-brand-light" />
        </template>
      </KPICard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="Real-time Fleet Map"
        subtitle="24 vehicles · live telemetry · New York region"
        :contentClass="'px-5 pb-5'"
      >
        <div class="h-[340px] rounded-xl overflow-hidden border border-border-subtle">
          <FleetMap :markers="fleetMarkers" />
        </div>
      </ChartCard>

      <ChartCard
        title="Safety Score trends"
        subtitle="6-month rolling fleet safety score"
      >
        <div class="h-[340px]">
          <SafetyScoreTrend :data="safetyTrend" />
        </div>
      </ChartCard>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <ChartCard
        title="Driver Risk Distribution"
        subtitle="289 active drivers"
        class="lg:col-span-3"
      >
        <div class="h-[280px]">
          <RiskDistributionDonut :data="riskDistribution" />
        </div>
      </ChartCard>

      <ChartCard
        title="Recent Alerts"
        subtitle="Last 24 hours"
        class="lg:col-span-4"
      >
        <ul class="space-y-0.5">
          <AlertItem v-for="a in recentAlerts" :key="a.id" :alert="a" />
        </ul>
      </ChartCard>

      <ChartCard
        title="Driver Ranking"
        subtitle="Top 5 by behavioral score"
        class="lg:col-span-5"
      >
        <div class="grid grid-cols-[1.5rem_1fr_auto_auto] items-center gap-3 px-1 pb-2 mb-1 border-b border-border-subtle text-micro uppercase tracking-[0.16em] text-text-muted">
          <span class="text-center">#</span>
          <span>Driver</span>
          <span>Score</span>
          <span>Status</span>
        </div>
        <ul class="space-y-0.5">
          <DriverRankRow v-for="d in driverRanking" :key="d.rank" :driver="d" />
        </ul>
      </ChartCard>
    </section>
  </div>
</template>
