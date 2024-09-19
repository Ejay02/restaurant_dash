<template>
  <div class="relative" ref="dropdown">
    <!-- Avatar and Username -->
    <div class="flex items-center space-x-2 cursor-pointer" @click="toggleUserMenu">
      <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full w-10 h-10" />
      <span class="font-medium">John Doe</span>
    </div>

    <!-- User menu dropdown -->
    <div
      v-if="showUserMenu"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <i class="fa-solid fa-user text-gray-500"></i>
        <span class="ml-2"> Profile </span>
      </a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <i class="fa-solid fa-user-gear text-gray-500"></i>
        <span class="ml-2"> Settings </span>
      </a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        ><i class="fa-solid fa-power-off text-gray-500"></i>
        <span class="ml-2"> Logout </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showUserMenu = ref(false)
const dropdown = ref(null)

// Toggle dropdown visibility on click
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

// Set up event listener for clicks outside the dropdown
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Clean up event listener on component unmount
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped></style>
