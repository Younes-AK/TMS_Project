<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "@/components/layout/Sidebar.vue";
import MobileSidebar from "@/components/layout/MobileSidebar.vue";
import Topbar from "@/components/layout/Topbar.vue";
</script>

<template>
  <div class="relative flex min-h-dvh bg-bg-deep">
    <Sidebar />
    <MobileSidebar />

    <div class="flex flex-col flex-1 min-w-0 relative">
      <Topbar />

      <main
        class="flex-1 overflow-x-hidden relative"
      >
        <div
          class="px-4 lg:px-6 py-6 lg:py-8 max-w-[1600px] mx-auto w-full relative z-10"
        >
          <RouterView v-slot="{ Component, route }">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-300 ease-out"
              leave-active-class="transition duration-150 ease-in"
              enter-from-class="opacity-0 translate-y-2"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <component :is="Component" :key="route.fullPath" />
            </Transition>
          </RouterView>
        </div>
      </main>
    </div>
  </div>
</template>
