<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-slate-500 to-purple-500 bg-animate-gradient p-4"
  >
    <div
      class="glassmorphic-card w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30"
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
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="8"
            placeholder="Password*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <!-- button -->
        <div>
          <button
            :disabled="isButtonDisabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out glassmorphic-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSignup"
          >
            Sign in
          </button>
        </div>
      </form>

      <div class="text-center mt-4 text-sm">
        Have an account? <a href="/" class="text-indigo-700">Login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')

const logo = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    logo.value = file
  }
}

const isButtonDisabled = computed(() => {
  return email.value === '' || password.value === ''
})

const handleSignup = () => {
  router.push('/home/dashboard')
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
