<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Bell, Search, Menu, ChevronDown, Calendar, ChevronRight } from "lucide-vue-next";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const route = useRoute();

const range = ref<"24h" | "7d" | "30d" | "90d">("7d");
const ranges: { value: typeof range.value; label: string }[] = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d",  label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];
const rangeOpen = ref(false);

const breadcrumbs = computed(() => {
  const parts = route.path.split("/").filter(Boolean);
  return parts.map((segment, idx) => ({
    label: segment.replace(/-/g, " "),
    path: "/" + parts.slice(0, idx + 1).join("/"),
    last: idx === parts.length - 1,
  }));
});

const pageTitle = computed(
  () => (route.meta?.title as string | undefined) ?? "Dashboard"
);

const notifCount = 5;
</script>

<template>
  <header
    class="h-16 shrink-0 border-b border-border-subtle bg-surface/60 backdrop-blur-xl relative z-20"
  >
    <div class="h-full px-4 lg:px-6 flex items-center gap-4">
      <button
        class="lg:hidden -ml-1 p-2 rounded-lg text-text-secondary hover:text-brand-light hover:bg-surface-hover transition-colors focus-brand"
        @click="ui.openMobileSidebar"
        aria-label="Open menu"
      >
        <Menu class="h-5 w-5" />
      </button>

      <nav class="hidden md:flex items-center gap-1.5 text-caption text-text-muted min-w-0">
        <RouterLink to="/dashboard" class="hover:text-brand-light transition-colors">
          Smatch
        </RouterLink>
        <template v-for="crumb in breadcrumbs" :key="crumb.path">
          <ChevronRight class="h-3.5 w-3.5 text-text-muted/60 shrink-0" />
          <RouterLink
            :to="crumb.path"
            :class="[
              'capitalize truncate transition-colors',
              crumb.last ? 'text-text-primary' : 'hover:text-brand-light',
            ]"
          >
            {{ crumb.label }}
          </RouterLink>
        </template>
      </nav>

      <div class="md:hidden text-text-primary font-semibold truncate flex-1">
        {{ pageTitle }}
      </div>

      <div class="flex-1 hidden md:block" />

      <div class="hidden md:flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 w-64 focus-within:border-border-glow transition-colors">
        <Search class="h-4 w-4 text-text-muted shrink-0" />
        <input
          type="text"
          placeholder="Search fleet, drivers, alerts…"
          class="bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-muted flex-1 min-w-0"
        />
        <kbd
          class="hidden xl:inline-flex items-center text-micro text-text-muted border border-border-subtle rounded px-1.5 py-0.5"
        >
          ⌘K
        </kbd>
      </div>

      <div class="relative">
        <button
          class="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-sm text-text-secondary hover:border-border-glow hover:text-text-primary transition-colors focus-brand"
          @click="rangeOpen = !rangeOpen"
        >
          <Calendar class="h-4 w-4 text-brand-light" />
          <span class="hidden sm:inline">
            {{ ranges.find((r) => r.value === range)?.label }}
          </span>
          <ChevronDown
            class="h-4 w-4 transition-transform"
            :class="rangeOpen ? 'rotate-180' : ''"
          />
        </button>
        <Transition
          enter-active-class="transition duration-150"
          leave-active-class="transition duration-100"
          enter-from-class="opacity-0 translate-y-1"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="rangeOpen"
            class="absolute right-0 mt-2 w-48 rounded-lg glass-elevated p-1 z-30"
          >
            <button
              v-for="r in ranges"
              :key="r.value"
              class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
              :class="
                r.value === range
                  ? 'bg-gradient-brand-soft text-brand-light'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              "
              @click="range = r.value; rangeOpen = false"
            >
              {{ r.label }}
            </button>
          </div>
        </Transition>
      </div>

      <button
        class="relative rounded-lg border border-border-subtle bg-surface p-2 text-text-secondary hover:border-border-glow hover:text-brand-light transition-colors focus-brand"
        aria-label="Notifications"
      >
        <Bell class="h-4 w-4" />
        <span
          v-if="notifCount > 0"
          class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-white text-[10px] font-bold grid place-items-center ring-2 ring-bg-deep"
        >
          {{ notifCount }}
        </span>
      </button>

      <div class="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-border-subtle">
        <div
          class="h-8 w-8 rounded-full bg-gradient-brand grid place-items-center text-bg-deep font-bold text-sm"
        >
          YA
        </div>
        <div class="hidden xl:block leading-tight">
          <div class="text-sm font-medium text-text-primary">Younes A.</div>
          <div class="text-micro text-text-muted">Fleet Administrator</div>
        </div>
        <ChevronDown class="hidden xl:block h-4 w-4 text-text-muted" />
      </div>
    </div>
  </header>
</template>
