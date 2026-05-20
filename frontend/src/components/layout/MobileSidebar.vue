<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
import { X } from "lucide-vue-next";
import { useUiStore } from "@/stores/ui";
import { NAV_ITEMS } from "@/lib/nav";
import Logo from "@/components/brand/Logo.vue";

const ui = useUiStore();
const route = useRoute();

const isActive = (to: string, exact?: boolean) => {
  if (exact) return route.path === to;
  return route.path === to || route.path.startsWith(to + "/");
};
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="ui.mobileSidebarOpen"
      class="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      @click="ui.closeMobileSidebar"
    />
  </Transition>

  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    leave-active-class="transition-transform duration-200 ease-in"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="ui.mobileSidebarOpen"
      class="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-surface border-r border-border-subtle flex flex-col"
    >
      <div class="h-16 flex items-center justify-between px-4 border-b border-border-subtle">
        <Logo />
        <button
          class="text-text-muted hover:text-brand-light transition-colors p-2 rounded-lg hover:bg-surface-hover focus-brand"
          @click="ui.closeMobileSidebar"
          aria-label="Close menu"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.to"
          :to="item.to"
          @click="ui.closeMobileSidebar"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
            isActive(item.to, item.exact)
              ? 'bg-gradient-brand-soft text-brand-light border border-border-glow'
              : 'text-text-secondary border border-transparent hover:bg-surface-hover',
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-danger/15 text-danger border border-danger/30"
          >
            {{ item.badge }}
          </span>
        </RouterLink>
      </nav>
    </aside>
  </Transition>
</template>
