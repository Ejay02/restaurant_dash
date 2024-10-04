<template>
  <div class="flex flex-col items-center justify-center h-screen w-screen glassmorphism-container">
    <div class="text-white text-2xl font-bold flex items-center">
      <span>{{ message }}</span>
      <div class="flex ml-2 mt-3">
        <span
          v-for="i in 3"
          :key="i"
          class="w-1 h-1 bg-white rounded-full mx-1 animate-pulse"
          :style="{ animationDelay: `${(i - 1) * 0.3}s` }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading, please wait'
  }
})
</script>

<style scoped>
.glassmorphism-container {
  @apply backdrop-filter backdrop-blur-md bg-white bg-opacity-10 rounded-none;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
