import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUiStore = defineStore("ui", () => {
  const sidebarCollapsed = ref(false);
  const mobileSidebarOpen = ref(false);

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };
  const openMobileSidebar = () => { mobileSidebarOpen.value = true; };
  const closeMobileSidebar = () => { mobileSidebarOpen.value = false; };

  const sidebarWidth = computed(() => (sidebarCollapsed.value ? 76 : 256));

  return {
    sidebarCollapsed,
    mobileSidebarOpen,
    sidebarWidth,
    toggleSidebar,
    openMobileSidebar,
    closeMobileSidebar,
  };
});
