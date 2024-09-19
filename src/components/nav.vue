<template>
  <header class="glassmorphic-header">
    <div class="flex justify-between items-center px-6 py-4">
      <h1 class="text-2xl font-semibold text-black">Dashboard</h1>
      <div class="flex items-center space-x-4">
        <!-- Notification bell -->
        <div class="relative">
          <button @click="toggleNotifications" class="glassmorphic-button hover:text-sky-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 shake-animation"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>

        <!-- User profile -->
        <Profile />
      </div>
    </div>
  </header>
</template>

<script setup>
import Profile from './profile.vue'

// Optional function for handling notifications
const toggleNotifications = () => {
  // Implement your notification logic here
}
</script>

<style scoped>
.glassmorphic-header {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3); /* Darker transparent background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Slightly darker shadow */
  color: #fff;
}

.glassmorphic-button {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3); /* Transparent background with slight opacity */
  border-radius: 50%; /* Make the background round */
  padding: 5px; /* Increase size for a larger button */
  border: 1px solid #1e293b; /* Subtle border */
}

.glassmorphic-button:hover {
  background-color: rgba(0, 0, 0, 0.4); /* Slightly darker background on hover */
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
