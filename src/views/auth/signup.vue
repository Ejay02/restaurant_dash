<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-animate-gradient"
  >
    <div
      class="glassmorphic-card w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30 m-6 text-white"
    >
      <h2 class="text-3xl font-bold mb-4 text-center">Signup</h2>
      <form @submit.prevent="" class="space-y-6">
        <!-- rest name -->
        <div>
          <label for="name" class="block text-sm font-medium">Restaurant Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            autofocus
            placeholder="Restaurant Name*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- logo -->
        <div>
          <label for="logo" class="block text-sm font-medium">Logo</label>
          <input
            id="logo"
            type="file"
            @change="handleFileChange"
            required
            accept=".jpg, .png, .jpeg"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- country -->
        <div>
          <label for="country" class="block text-sm font-medium">Country</label>
          <input
            id="country"
            v-model="country"
            type="text"
            required
            autofocus
            placeholder="Country*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- city -->
        <div>
          <label for="city" class="block text-sm font-medium">City</label>
          <input
            id="city"
            v-model="city"
            type="text"
            required
            autofocus
            placeholder="City*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- address -->
        <div>
          <label for="address" class="block text-sm font-medium">Address</label>
          <input
            id="address"
            v-model="address"
            type="text"
            required
            autofocus
            placeholder="Address*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- phone -->
        <div>
          <label for="number" class="block text-sm font-medium">Phone Number</label>
          <input
            id="number"
            v-model="number"
            type="number"
            required
            autofocus
            min="0"
            placeholder="Restaurant Number*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- email -->
        <div>
          <label for="email" class="block text-sm font-medium">Restaurant Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autofocus
            placeholder="Restaurant Email*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <!-- PASSword -->
        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="8"
              placeholder="Password*"
              class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              @click="togglePasswordVisibility('password')"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- button -->
        <div>
          <button
            :disabled="isButtonDisabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105 glassmorphic-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSignup"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div class="border-b border-gray-500 border-opacity-50 mt-6"></div>

      <div class="text-center mt-4 text-sm">
        Have an account? <a href="/" class="text-indigo-400 hover:underline">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotifications } from '@/composables/globalAlert'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const logo = ref(null)
const { notify } = useNotifications()

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    logo.value = file
  }
}

const isButtonDisabled = computed(() => {
  return email.value === '' || password.value === ''
})

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value
  }
}

// TODO create restaurant sign up endpoint
const handleSignup = async () => {
  try {
    notify('Apologies, this endpoint is not setup yet.', 'info')
  } catch (error) {
    notify(error.message, 'error')
  }
}
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
  cursor: pointer;
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
