<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black bg-animate-gradient">
    <div class="glassmorphic-container w-full h-full flex items-center justify-center">
      <div class="text-white text-2xl font-bold flex items-center">
        <span>{{ msg }}</span>
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
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    default: 'Loading, please wait'
  }
})
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

.glassmorphic-container {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  z-index: 1000;
}

@keyframes pulse {
  0%, 100% {
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