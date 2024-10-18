<template>
  <div class="p-4 sm:p-8 overflow-auto">
    <div
      class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 p-4 sm:p-6"
    >
      <h1 class="text-center mb-6 text-2xl sm:text-3xl">User Settings</h1>

      <div class="border-b border-gray-500 border-opacity-50 mb-4"></div>

      <!-- Avatar and Notifications Section -->
      <div
        class="flex flex-col sm:flex-row justify-between mb-6 pb-4 border-b border-gray-500 border-opacity-50"
      >
        <!-- Avatar Section -->
        <div class="mb-4 sm:mb-0 sm:w-1/2">
          <label for="avatar" class="block mb-2 text-center text-xl">Avatar</label>
          <div class="flex items-start">
            <div v-if="avatar" class="me-4">
              <img
                :src="avatar"
                alt="User Avatar"
                class="rounded w-24 h-24 sm:w-28 sm:h-28 object-cover"
              />
            </div>
            <div
              v-else
              class="me-4 w-24 h-24 sm:w-28 sm:h-28 rounded bg-orange-300 flex items-center justify-center"
            >
              <span>{{ initials || 'N/A' }}</span>
            </div>
            <div class="flex-wrap mt-6">
              <input
                type="file"
                id="avatar"
                @change="handleAvatarChange"
                accept=".jpg, .png, .jpeg"
                class="text-sm"
              />
              <small class="block mt-1 text-xs">jpg and png formats only*</small>
              <small class="block mt-1 text-xs">Max size 2MB*</small>
            </div>
          </div>
        </div>
        <div class="border border-gray-200 border-opacity-10 mb-4"></div>
        <!-- Notifications Section -->
        <div class="sm:w-1/2 sm:pl-4">
          <h2 class="mb-4 text-center text-xl">Notifications</h2>
          <div class="flex items-center justify-between mt-10">
            <span class="mr-4">{{ notificationsEnabled ? 'Enabled' : 'Disabled' }}</span>
            <label class="switch">
              <input type="checkbox" v-model="notificationsEnabled" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Password Change Section -->
      <div>
        <h2 class="mb-4 text-center text-xl">Change Password</h2>
        <form @submit.prevent="handlePasswordChange">
          <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <div class="flex-1">
              <label for="currentPassword" class="block mb-2">Current Password</label>
              <input
                autofocus
                type="password"
                v-model="currentPassword"
                placeholder="Current Password"
                required
                minlength="8"
                class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>
            <div class="flex-1">
              <label for="newPassword" class="block mb-2">New Password</label>
              <input
                type="password"
                v-model="newPassword"
                placeholder="New Password"
                required
                minlength="8"
                class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>
          </div>
          <!-- Update Password Button -->

          <div class="flex justify-end">
            <button
              :disabled="isDisabled"
              type="submit"
              class="rounded bg-blue-200 text-black px-4 py-2 text-sm mt-4 w-full sm:w-40 hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50 transform transition-transform duration-300 hover:scale-105"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const avatar = ref('')
const notificationsEnabled = ref(true)
const currentPassword = ref('')

const newPassword = ref('')

const initials = ref('JD')

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handlePasswordChange = () => {
  if (newPassword.value) {
    console.log('Password updated successfully')
    currentPassword.value = ''
    newPassword.value = ''
  } else {
    console.error('Passwords do not match')
  }
}

const isDisabled = computed(() => {
  return !(currentPassword.value && newPassword.value)
})
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: purple;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.glassmorphic-input {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
