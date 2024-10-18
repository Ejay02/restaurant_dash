<template>
  <div
    class="h-screen w-full flex justify-center bg-gradient-to-br from-purple-400 via-slate-500 to-purple-500 bg-animate-gradient"
  >
    <!-- Sidebar -->
    <Sidebar v-if="currentRouteName !== 'settings'" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top navigation -->
      <Nav />

      <!-- Page content -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Nav from '@/components/nav.vue'
import Sidebar from '@/components/sidebar.vue'

const route = useRoute()
const currentRouteName = computed(() => route.name)
</script>

<style scoped>
.bg-animate-gradient {
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.glassmorphic-card {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.glassmorphic-input {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.glassmorphic-button {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(99, 102, 241, 0.8);
}

.glassmorphic-button:hover:not(:disabled) {
  background-color: rgba(79, 82, 221, 0.9);
}
</style>
