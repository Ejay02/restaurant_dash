<template>
  <LoadingScreen v-if="loading || googleLoading" :msg="'Brewing up something amazing'" />
  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-animate-gradient"
  >
    <div
      class="text-white glassmorphic-card w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-30"
    >
      <h2 class="text-3xl font-bold mb-6 text-center">Sign In to your Restaurant</h2>
      <form @submit.prevent="" class="space-y-6">
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
        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              minlength="8"
              placeholder="Password*"
              class="glassmorphic-input mt-1 block w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-50 rounded-md placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer"
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

        <!-- forgot -->
        <div class="mt-6 text-xs text-end">
          <a href="/forgot-password" @click="forgotPassword" class="hover:underline"
            >Forgot Password?
          </a>
        </div>
        <div>
          <button
            @click="handleLogin"
            :disabled="isButtonDisabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105 glassmorphic-button cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            Sign In
          </button>
        </div>
      </form>

      <!-- google -->
      <div class="mt-4 text-center">
        <p class="text-sm">Or Sign In with</p>
        <div class="flex justify-center space-x-4 mt-2">
          <!--  -->
          <GoogleLogin :callback="callback" class="block w-full">
            <button class="text-white p-2 rounded-md hover:bg-slate-500">
              <img src="/src/assets/google.jpg" class="w-4 h-4" />
            </button>
          </GoogleLogin>
        </div>
      </div>

      <div class="border-b border-gray-500 border-opacity-50 m-4"></div>

      <div class="text-center mt-4 text-sm">
        Need an account? <a href="/signup" class="text-indigo-400 hover:underline">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed } from 'vue'
import { setCookie } from '@/utils/cookie'
import { useUserStore } from '@/stores/userStore'
import { useMutation } from '@vue/apollo-composable'
import LoadingScreen from '@/components/loadingScreen.vue'
import { useNotifications } from '@/composables/globalAlert'
import { googleLoginMutation, loginMutation } from '@/graphql/mutations'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const isButtonDisabled = computed(() => {
  return email.value === '' || password.value === ''
})

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value
  }
}

const resetForm = () => {
  email.value = ''
  password.value = ''
}

const userStore = useUserStore()
const { notify } = useNotifications()

const { mutate: login, loading } = useMutation(loginMutation)

const handleLogin = async () => {
  try {
    const variables = {
      email: email.value,
      password: password.value
    }

    const res = await login(variables)

    if (res.data && res.data.login) {
      const { accessToken, refreshToken, user } = res.data.login

      // Set user data in the store
      userStore.setUser({
        accessToken,
        refreshToken,
        user
      })

      userStore.persistData()

      // Set cookies
      setCookie('access_token', accessToken, 7)
      setCookie('refresh_token', refreshToken, 7)

      router.push('/home/dashboard')
      notify('Login successful', 'success')
      resetForm()
    }
  } catch (error) {
    notify(error.message, 'error')
  }
}

const { mutate: googleLogin, loading: googleLoading } = useMutation(googleLoginMutation)

// googleLoginMutation
const callback = async (response) => {
  try {
    const res = await googleLogin({
      code: response.code
    })

    if (res.data) {
      userStore.setUser({
        accessToken: res.data.googleLogin.accessToken,
        refreshToken: res.data.googleLogin.refreshToken,
        user: res.data.googleLogin.user
      })

      userStore.persistData()

      // Set cookies
      setCookie('access_token', res.data.googleLogin.accessToken, 7)
      setCookie('refresh_token', res.data.googleLogin.refreshToken, 7)
      localStorage.setItem('avatar', res.data.googleLogin?.user?.avatar?.url)

      router.push('/home/dashboard')
      notify('Login successful', 'success')

      // userStore.refreshUser();
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
