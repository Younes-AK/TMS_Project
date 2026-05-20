<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div class="min-w-0">
      <div
        v-if="eyebrow"
        class="text-micro uppercase tracking-[0.16em] text-brand-light mb-2"
      >
        {{ eyebrow }}
      </div>
      <h1
        class="text-h1 font-bold text-text-primary"
        v-motion
        :initial="{ opacity: 0, y: 8 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
      >
        {{ title }}
      </h1>
      <p
        v-if="subtitle"
        class="text-body text-text-secondary mt-1 max-w-2xl"
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
