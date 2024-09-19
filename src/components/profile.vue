<template>
  <div class="relative">
    <div
      @mouseenter="showUserMenu = true"
      @mouseleave="showUserMenu = false"
      class="flex items-center space-x-2 cursor-pointer"
    >
      <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full w-10 h-10" />
      <span class="font-medium">John Doe</span>
    </div>
    <!-- User menu dropdown -->
    <div
      v-if="showUserMenu"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <i class="fa-solid fa-user"></i> Profile</a
      >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <i class="fa-solid fa-user-gear"></i> Settings</a
      >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        ><i class="fa-solid fa-power-off"></i> Logout</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showUserMenu = ref(false)
</script>

<style scoped></style>
