<template>
  <aside
    :class="[
      'transition-all duration-300 ease-in-out h-screen fixed top-0 left-0 ',
      isOpen ? 'w-64' : 'w-20',
      'glassmorphic-sidebar'
    ]"
  >
    <div class="p-4">
      <button @click="toggleSidebar" class="hover:text-gray-300 transition-colors">
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
    <nav class="mt-8 space-y-2 px-3 text-black font-extrabold text-xl">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="`/home${item.route}`"
        class="flex py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
        :class="[
          {
            'flex-col items-center': !isOpen,
            'items-center': isOpen
          }
        ]"
      >
        <i :class="[item.icon, 'w-4 h-4']"></i>
        <span
          :class="{
            'opacity-0': !isOpen,
            'opacity-100': isOpen,
            'transition-opacity duration-300': true,
            'ml-2': isOpen,
            'text-center': !isOpen
          }"
        >
          {{ item.name }}
        </span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', route: '/dashboard', icon: 'fas fa-home' },
  { name: 'Orders', route: '/orders', icon: 'fas fa-shopping-cart' },
  { name: 'Food', route: '/food', icon: 'fas fa-utensils' },
  { name: 'Analytics', route: '/analytics', icon: 'fa-solid fa-chart-line' },
  { name: 'Create Food', route: '/create-food', icon: 'fa-solid fa-plus' }
]

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.router-link-active {
  background-color: rgba(255, 255, 255, 0.2); /* Customize the active background */
}

.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.3); /* Customize the exact active background */
}

.glassmorphic-sidebar {
  backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  color: black;
  position: relative;
}

.glassmorphic-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  z-index: -1;
}

.glassmorphic-sidebar nav {
  display: flex;
  flex-direction: column;
}

.glassmorphic-sidebar nav a {
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.glassmorphic-sidebar nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.glassmorphic-sidebar nav a i {
  transition: transform 0.2s ease;
}

.glassmorphic-sidebar nav a:hover i {
  transform: scale(1.1);
}
</style>
