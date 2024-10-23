<template>
  <div class="relative text-black font-extrabold" ref="dropdown">
    <!-- Avatar and Username -->
    <div class="flex items-center space-x-2 cursor-pointer" @click="toggleUserMenu">
      <div class="" v-if="avatar">
        <img :src="avatar" alt="User avatar" class="rounded-full w-10 h-10" />
      </div>
      <div
        v-else
        class="w-8 h-8 text-center text-xl rounded-md bg-amber-400 flex items-center justify-center font-bold text-gray-900"
      >
        {{ fullName?.[0] }}
      </div>
      <div class="text-white">
        <span class="font-medium">{{ fullName }}</span>
        <h6 class="text-xs">{{ email }}</h6>
      </div>
    </div>

    <!-- User menu dropdown  -->
    <Teleport to="body">
      <div
        v-if="showUserMenu"
        :style="dropdownStyle"
        class="fixed w-48 rounded-md py-1 glassmorphism text-white"
      >
        <a href="/settings" class="block px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20">
          <i class="fa-solid fa-user-gear text-white"></i>
          <span class="ml-2 text-white">Settings</span>
        </a>
        <div
          @click="handleLogout"
          class="block px-4 py-2 text-sm hover:bg-white hover:bg-opacity-20"
        >
          <i class="fa-solid fa-power-off text-white"></i>
          <span class="ml-2 text-white">Logout</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import { useNotifications } from '@/composables/globalAlert'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const showUserMenu = ref(false)
const dropdown = ref(null)
const { notify } = useNotifications()

const dropdownStyle = computed(() => {
  if (!dropdown.value) return {}

  const rect = dropdown.value.getBoundingClientRect()
  const spaceAbove = rect.top
  const spaceBelow = window.innerHeight - rect.bottom

  return {
    right: `${window.innerWidth - rect.right}px`,
    [spaceAbove > spaceBelow ? 'bottom' : 'top']:
      `${spaceAbove > spaceBelow ? window.innerHeight - rect.top : rect.bottom}px`,
    zIndex: 9999
  }
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleClickOutside = (event) => {
  if (
    dropdown.value &&
    !dropdown.value.contains(event.target) &&
    !event.target.closest('.glassmorphism')
  ) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const userStore = useUserStore()

const fullName = computed(() => userStore.name)

const email = computed(() => userStore.email)

const avatar = computed(() => userStore.avatar)

const handleLogout = async () => {
  try {
    // Clear the user store
    userStore.clearUser()

    notify('Logout successful', 'success')
    router.push('/')
  } catch (error) {
    notify('Logout error, please try again', 'error')
  }
}
</script>

<style scoped>
.glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.glassmorphism a {
  color: rgba(0, 0, 0, 0.8);
}

.glassmorphism a:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
