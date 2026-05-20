<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

defineProps<{
  title: string;
  subtitle?: string;
  contentClass?: string;
  noPadding?: boolean;
}>();
</script>

<template>
  <section
    class="glass rounded-2xl flex flex-col overflow-hidden group/card"
    v-motion
    :initial="{ opacity: 0, y: 12 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 420 } }"
  >
    <header class="flex items-start justify-between px-5 pt-4 pb-3 shrink-0">
      <div class="min-w-0">
        <h3 class="text-text-primary font-semibold text-[15px] tracking-tight truncate">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-caption text-text-muted mt-0.5 truncate">
          {{ subtitle }}
        </p>
      </div>
      <button
        class="p-1 rounded-md text-text-muted hover:text-brand-light hover:bg-surface-hover transition-colors focus-brand opacity-70 group-hover/card:opacity-100"
        aria-label="More options"
      >
        <MoreHorizontal class="h-4 w-4" />
      </button>
    </header>

    <div
      :class="[
        'flex-1 min-h-0',
        noPadding ? '' : 'px-5 pb-5',
        contentClass,
      ]"
    >
      <slot />
    </div>
  </section>
</template>
