<template>
  <LoadingScreen v-if="loading" :msg="'Password Recovery in Progress'" />
  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-animate-gradient"
  >
    <div
      class="text-white w-full max-w-md p-4 rounded-2xl shadow-xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-white">Reset Password</h2>
      <form class="space-y-6">
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white"
            >New Password:</label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="myPassword@#12$"
              minlength="8"
              class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-10"
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
        <div>
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-white"
            >Confirm New Password:</label
          >
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="myPassword@#12$"
              minlength="8"
              class="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black pr-10"
              @input="checkPasswordsMatch"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              @click="togglePasswordVisibility('confirmPassword')"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <p v-if="!passwordsMatch" class="text-red-500 text-sm mt-1">Passwords do not match</p>
        <div>
          <button
            @click="handleResetPassword"
            :disabled="isButtonDisabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105 glassmorphic-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="text-center mt-4 text-sm">
        Go back to <a href="/" class="text-indigo-400 hover:underline">Sign In</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import router from '@/router'
import LoadingScreen from '@/components/loadingScreen.vue'
import { useNotifications } from '@/composables/globalAlert'
import { resetPasswordMutation } from '@/graphql/mutations'

const { notify } = useNotifications()
const password = ref('')
const confirmPassword = ref('')
const activationToken = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const passwordsMatch = ref(true)

onMounted(() => {
  activationToken.value = localStorage.getItem('resetPasswordToken')
  if (!activationToken.value) {
    notify('Invalid or missing reset token', 'error')
  }
})

const isButtonDisabled = computed(() => {
  return password.value === '' || confirmPassword.value === '' || !passwordsMatch.value
})

const resetForm = () => {
  password.value = ''
  confirmPassword.value = ''
}

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value
  } else {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}

const checkPasswordsMatch = () => {
  passwordsMatch.value = password.value === confirmPassword.value
}

const { mutate: resetPassword, loading } = useMutation(resetPasswordMutation)

const handleResetPassword = async () => {
  if (!passwordsMatch.value) {
    notify('Passwords do not match', 'error')
    return
  }

  try {
    const res = await resetPassword({
      password: password.value,
      activationToken: activationToken.value
    })
    if (res.data) {
      notify('Password Reset Successful', 'success')
      router.push('/')
      resetForm()
      localStorage.removeItem('resetPasswordToken')
    }
  } catch (error) {
    notify(error.message, 'error')
  }
}
</script>
