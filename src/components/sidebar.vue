<template>
  <aside
    :class="['transition-all duration-300 ease-in-out', isOpen ? 'w-64' : 'w-20']"
    class="bg-slate-800 text-white"
  >
    <div class="p-4">
      <button @click="toggleSidebar" class="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <nav class="mt-8 space-y-2">
      <a
        v-for="item in menuItems"
        :key="item.name"
        href="#"
        class="flex items-center py-3 px-4 hover:bg-[#1e293b]"
      >
        <i :class="item.icon" class="w-6 h-6 mr-3"></i>
        <span
          :class="{ hidden: !isOpen, 'transition-opacity duration-300': true }"
          :style="{ opacity: isOpen ? 1 : 0 }"
        >
          {{ item.name }}
        </span>
      </a>
    </nav>
  </aside>
</template>
<script setup>
import { ref } from 'vue';

const isOpen = ref(true)

// const notificationStore = useNotificationStore()

const menuItems = [
  { name: 'Dashboard', icon: 'fas fa-home' },
  { name: 'Orders', icon: 'fas fa-shopping-cart' },
  { name: 'Create Food', icon: 'fas fa-utensils' },
  { name: 'Analytics', icon: 'fas fa-chart-bar' }
]

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>
<style scoped></style>
