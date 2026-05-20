<script setup lang="ts">
import { ref } from "vue";
import { Calendar, MapPin, Truck, Users, RefreshCcw, X } from "lucide-vue-next";

type FilterValue = string;

const dateRange = ref<FilterValue>("Last 7 days");
const vehicleGroup = ref<FilterValue>("All vehicles");
const driverGroup = ref<FilterValue>("All drivers");
const region = ref<FilterValue>("All regions");

const dateOptions   = ["Today", "Last 24 hours", "Last 7 days", "Last 30 days", "Last 90 days"];
const vehicleOptions = ["All vehicles", "Trucks", "Vans", "Cars", "EVs"];
const driverOptions  = ["All drivers", "Long-haul", "City delivery", "Cold chain"];
const regionOptions  = ["All regions", "EU", "MENA", "APAC", "Americas"];

const reset = () => {
  dateRange.value = "Last 7 days";
  vehicleGroup.value = "All vehicles";
  driverGroup.value = "All drivers";
  region.value = "All regions";
};
</script>

<template>
  <div
    class="glass rounded-2xl p-3 flex flex-wrap items-center gap-2"
  >
    <label class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border-subtle hover:border-border-glow transition-colors focus-within:border-border-glow">
      <Calendar class="h-4 w-4 text-brand-light shrink-0" />
      <select
        v-model="dateRange"
        class="bg-transparent text-sm text-text-primary outline-none pr-1 [&>option]:bg-surface"
      >
        <option v-for="opt in dateOptions" :key="opt">{{ opt }}</option>
      </select>
    </label>

    <label class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border-subtle hover:border-border-glow transition-colors focus-within:border-border-glow">
      <Truck class="h-4 w-4 text-brand-light shrink-0" />
      <select
        v-model="vehicleGroup"
        class="bg-transparent text-sm text-text-primary outline-none pr-1 [&>option]:bg-surface"
      >
        <option v-for="opt in vehicleOptions" :key="opt">{{ opt }}</option>
      </select>
    </label>

    <label class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border-subtle hover:border-border-glow transition-colors focus-within:border-border-glow">
      <Users class="h-4 w-4 text-brand-light shrink-0" />
      <select
        v-model="driverGroup"
        class="bg-transparent text-sm text-text-primary outline-none pr-1 [&>option]:bg-surface"
      >
        <option v-for="opt in driverOptions" :key="opt">{{ opt }}</option>
      </select>
    </label>

    <label class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 border border-border-subtle hover:border-border-glow transition-colors focus-within:border-border-glow">
      <MapPin class="h-4 w-4 text-brand-light shrink-0" />
      <select
        v-model="region"
        class="bg-transparent text-sm text-text-primary outline-none pr-1 [&>option]:bg-surface"
      >
        <option v-for="opt in regionOptions" :key="opt">{{ opt }}</option>
      </select>
    </label>

    <div class="flex-1" />

    <button
      class="flex items-center gap-1.5 rounded-lg border border-border-subtle hover:border-border-glow text-text-secondary hover:text-brand-light px-3 py-2 text-sm transition-colors focus-brand"
      @click="reset"
    >
      <X class="h-3.5 w-3.5" />
      Reset
    </button>

    <button
      class="flex items-center gap-1.5 rounded-lg bg-gradient-brand text-bg-deep font-semibold px-3 py-2 text-sm hover:opacity-95 transition-opacity focus-brand"
    >
      <RefreshCcw class="h-3.5 w-3.5" />
      Apply
    </button>
  </div>
</template>
