<template>
  <div class="relative text-black font-extrabold" ref="dropdown">
    <!-- Avatar and Username -->
    <div class="flex items-center space-x-2 cursor-pointer" @click="toggleUserMenu">
      <img src="https://via.placeholder.com/40" alt="User avatar" class="rounded-full w-10 h-10" />
      <span class="font-medium">John Doe</span>
    </div>

    <!-- User menu dropdown with glassmorphism effect -->
    <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 rounded-md py-1 z-10 glassmorphism">
      <a href="/home/profile" class="block px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20">
        <i class="fa-solid fa-user"></i>
        <span class="ml-2">Profile</span>
      </a>
      <a href="/home/settings" class="block px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20">
        <i class="fa-solid fa-user-gear"></i>
        <span class="ml-2">Settings</span>
      </a>
      <a href="#" class="block px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20">
        <i class="fa-solid fa-power-off"></i>
        <span class="ml-2">Logout</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showUserMenu = ref(false)
const dropdown = ref(null)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Adjust text color for better visibility */
.glassmorphism a {
  color: rgba(0, 0, 0, 0.8);
}

/* Adjust hover effect */
.glassmorphism a:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
