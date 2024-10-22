<template>
  <div
    class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 p-4 sm:p-6 m-4 cursor-pointer overflow-auto"
  >
    <div class="mb-4 text-right text-white">
      <h1 class="text-2xl font-bold">Hello {{ fullName }},</h1>
      <h6>Welcome to your dashboard</h6>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
      <!-- Orders Summary -->
      <div
        class="bg-blue-100 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
      >
        <h2 class="text-lg font-semibold mb-2">Orders</h2>
        <div class="flex justify-between items-center mt-2">
          <i class="fa-solid fa-arrow-up-right-dots fa-2xl" style="color: blue"></i>
          <p class="text-3xl font-bold">25</p>
        </div>
        <p class="text-xs text-gray-400 text-center mt-2">Today's Orders</p>
      </div>

      <!-- Revenue -->
      <div
        class="bg-green-100 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
      >
        <h2 class="text-lg font-semibold mb-2">Revenue</h2>
        <div class="flex justify-between items-center mt-2">
          <i class="fa-solid fa-money-bill-trend-up fa-2xl" style="color: green"></i>
          <p class="text-3xl font-bold">${{ 1250 }}</p>
        </div>
        <p class="text-xs text-gray-400 text-center mt-2">Today's Revenue</p>
      </div>

      <!-- Popular Dish -->
      <div
        class="bg-yellow-100 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
      >
        <h2 class="text-lg font-semibold mb-2">Popular Dish</h2>
        <div class="flex justify-between items-center mt-2">
          <i class="fa-solid fa-fire fa-2xl" style="color: red"></i>
          <p class="text-xl font-bold">Margherita Pizza</p>
        </div>
        <p class="text-xs text-gray-400 text-center mt-2">15 orders today</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-6 text-center">
      <h2 class="text-xl font-semibold mb-3 text-white">Quick Actions</h2>
      <div class="flex flex-wrap gap-2 text-center items-center justify-center">
        <RouterLink
          to="/home/orders"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-95"
        >
          View Orders
        </RouterLink>
        <RouterLink
          to="/home/food"
          class="bg-green-500 text-white px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-95"
        >
          Manage Menu
        </RouterLink>
        <RouterLink
          to="/home/analytics"
          class="bg-yellow-500 text-white px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-95"
        >
          View Analytics
        </RouterLink>
        <RouterLink
          to="/home/create-food"
          class="bg-purple-500 text-white px-4 py-2 rounded-lg transform transition-transform duration-300 hover:scale-95"
        >
          Add New Dish
        </RouterLink>
      </div>
    </div>

    <div class="mt-6">
      <Orders title="Recent Orders" :limit="3" :showPagination="false" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import Orders from '@/views/orders.vue'
import { computed } from 'vue'

const userStore = useUserStore()

const fullName = computed(() => userStore.name)
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
