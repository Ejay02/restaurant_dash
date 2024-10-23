<template>
  <LoadingScreen v-if="loading" :msg="'Password Recovery in Progress'" />
  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-animate-gradient"
  >
    <div
      class="text-white w-full max-w-md p-4 rounded-2xl shadow-xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30"
    >
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-center mb-2">Forgot Password?</h2>
        <h6>No worries, we'll send reset instructions to your email.</h6>
      </div>

      

      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autofocus
            placeholder="Email*"
            class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer"
          />
        </div>

        <div class="">
          <button
            @click="handleForgotPassword"
            :disabled="isButtonDisabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105 glassmorphic-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            Send Mail
          </button>
        </div>
      </form>

      <div class="border-b border-gray-500 border-opacity-50 mt-5"></div>

      <div class="text-center mt-4 text-sm">
        Go back to <a href="/" class="text-indigo-400 hover:underline">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import LoadingScreen from '@/components/loadingScreen.vue'
import { useNotifications } from '@/composables/globalAlert'
import { forgotPasswordMutation } from '@/graphql/mutations'

const email = ref('')
const isButtonDisabled = computed(() => {
  return email.value === ''
})

const { notify } = useNotifications()

const {
  mutate: forgotPassword,
  // error,
  loading
} = useMutation(forgotPasswordMutation)

const handleForgotPassword = async () => {
  try {
    const res = await forgotPassword({ email: email.value })

    if (res.data) {
      notify('Password reset email sent to your email', 'success')
      email.value = ''
    }
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
