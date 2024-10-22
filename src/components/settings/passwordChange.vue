<template>
  <div class="text-white">
    <h2 class="mb-4 text-center text-xl">Change Password</h2>
    <form @submit.prevent="handlePasswordChange">
      <div class="flex flex-col sm:flex-row gap-4 mb-4">
        <div class="flex-1">
          <label for="currentPassword" class="block mb-2">Current Password</label>
          <div class="relative">
            <input
              autofocus
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="currentPassword"
              placeholder="Current Password"
              required
              minlength="8"
              class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              @click="togglePasswordVisibility('currentPassword')"
            >
              <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        
        <div class="flex-1">
          <label for="newPassword" class="block mb-2">New Password</label>
          <div class="relative">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              placeholder="New Password"
              required
              minlength="8"
              @input="checkPasswords"
              class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              @click="togglePasswordVisibility('newPassword')"
            >
              <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
      </div>
      <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}**</p>
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
const showNewPassword = ref(false)
const showCurrentPassword = ref(false)
const passwordError = ref('')

const resetForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  passwordError.value = ''
}

const togglePasswordVisibility = (field) => {
  if (field === 'currentPassword') {
    showCurrentPassword.value = !showCurrentPassword.value
  } else if (field === 'newPassword') {
    showNewPassword.value = !showNewPassword.value
  }
}

const checkPasswords = () => {
  if (currentPassword.value === newPassword.value) {
    passwordError.value = 'New password must be different from the current password.'
  } else {
    passwordError.value = ''
  }
}

const handlePasswordChange = () => {
  if (!passwordError.value && currentPassword.value && newPassword.value) {
    console.log('Password updated successfully')
    resetForm()
  } else {
    console.error('Password change failed')
  }
}

const isDisabled = computed(() => {
  return !currentPassword.value || !newPassword.value || !!passwordError.value
})
</script>

<style scoped>
.glassmorphic-input {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  cursor: pointer;
}
</style>