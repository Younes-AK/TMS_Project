<script setup lang="ts">
defineProps<{
  collapsed?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-3 select-none">
    <div
      class="relative grid place-items-center h-9 w-9 rounded-xl bg-gradient-brand shrink-0"
      :class="'shadow-[0_0_0_1px_rgba(245,166,35,0.5),0_8px_24px_-8px_rgba(245,166,35,0.55)]'"
    >
      <span class="font-black text-bg-deep text-lg leading-none">S</span>
      <span
        class="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15"
        aria-hidden="true"
      />
    </div>
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="!collapsed" class="leading-none">
        <div class="text-text-primary font-bold text-[15px] tracking-tight">
          SMATCH <span class="text-gradient-brand">DIGITAL</span>
        </div>
        <div class="text-text-muted text-micro uppercase tracking-[0.16em] mt-1">
          Fleet Intelligence
        </div>
      </div>
    </Transition>
  </div>
</template>
