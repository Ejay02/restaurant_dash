<template>
  <div class="sm:w-1/2 sm:pl-4 text-white">
    <h2 class="mb-4 text-center text-xl">Notifications</h2>
    <div class="flex items-center justify-between mt-10">
      <span class="mr-4">{{ notificationsEnabled ? 'Enabled' : 'Disabled' }}</span>
      <label class="switch">
        <input type="checkbox" v-model="notificationsEnabled" />
        <span class="slider"></span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notificationsEnabled = ref(true)
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: purple;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

</style>
