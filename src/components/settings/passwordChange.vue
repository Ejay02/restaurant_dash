<template>
  <div class="text-white">
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
          class="rounded bg-indigo-600 px-4 py-2 text-sm mt-4 w-full sm:w-40 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transform transition-transform duration-300 hover:scale-105"
        >
          Update Password
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const currentPassword = ref('')

const newPassword = ref('')

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
.glassmorphic-input {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
