<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { ChevronLeft, ChevronRight, Settings } from "lucide-vue-next";
import { useUiStore } from "@/stores/ui";
import { NAV_ITEMS } from "@/lib/nav";
import Logo from "@/components/brand/Logo.vue";

const ui = useUiStore();
const route = useRoute();

const isActive = (to: string, exact?: boolean) => {
  if (exact) return route.path === to;
  return route.path === to || route.path.startsWith(to + "/");
};

const widthClass = computed(() =>
  ui.sidebarCollapsed ? "w-[76px]" : "w-[256px]"
);
</script>

<template>
  <aside
    :class="[
      'hidden lg:flex flex-col shrink-0 transition-[width] duration-300 ease-out',
      'border-r border-border-subtle bg-surface/60 backdrop-blur-xl relative z-30',
      widthClass,
    ]"
  >
    <div class="h-16 flex items-center px-4 border-b border-border-subtle">
      <Logo :collapsed="ui.sidebarCollapsed" />
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      <RouterLink
        v-for="item in NAV_ITEMS"
        :key="item.to"
        :to="item.to"
        v-slot="{ navigate }"
        custom
      >
        <button
          type="button"
          :title="ui.sidebarCollapsed ? item.label : undefined"
          :class="[
            'group w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left',
            'transition-all duration-200 focus-brand outline-none',
            isActive(item.to, item.exact)
              ? 'bg-gradient-brand-soft text-brand-light border border-border-glow shadow-[inset_0_0_0_1px_rgba(245,166,35,0.15)]'
              : 'text-text-secondary border border-transparent hover:bg-surface-hover hover:text-text-primary',
          ]"
          @click="navigate"
        >
          <component
            :is="item.icon"
            :class="[
              'h-5 w-5 shrink-0 transition-colors',
              isActive(item.to, item.exact) ? 'text-brand' : 'text-text-muted group-hover:text-brand-light',
            ]"
          />
          <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-100"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <span
              v-if="!ui.sidebarCollapsed"
              class="flex-1 text-sm font-medium truncate"
            >
              {{ item.label }}
            </span>
          </Transition>
          <span
            v-if="item.badge && !ui.sidebarCollapsed"
            class="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-danger/15 text-danger border border-danger/30"
          >
            {{ item.badge }}
          </span>
          <span
            v-if="isActive(item.to, item.exact)"
            class="absolute left-0 h-6 w-0.5 rounded-r bg-brand"
            aria-hidden="true"
          />
        </button>
      </RouterLink>
    </nav>

    <div class="border-t border-border-subtle p-3 space-y-2">
      <div
        class="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-hover transition-colors"
      >
        <div
          class="h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-bg-deep font-bold shrink-0"
        >
          YA
        </div>
        <div v-if="!ui.sidebarCollapsed" class="flex-1 min-w-0">
          <div class="text-sm font-medium text-text-primary truncate">
            Younes A.
          </div>
          <div class="text-caption text-text-muted truncate">
            Fleet Administrator
          </div>
        </div>
        <button
          v-if="!ui.sidebarCollapsed"
          class="text-text-muted hover:text-brand-light transition-colors focus-brand rounded p-1"
          aria-label="Settings"
        >
          <Settings class="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 rounded-lg border border-border-subtle hover:border-border-glow py-2 text-text-muted hover:text-brand-light text-caption transition-colors focus-brand"
        @click="ui.toggleSidebar"
        :aria-label="ui.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeft v-if="!ui.sidebarCollapsed" class="h-4 w-4" />
        <ChevronRight v-else class="h-4 w-4" />
        <span v-if="!ui.sidebarCollapsed">Collapse</span>
      </button>
    </div>
  </aside>
</template>
