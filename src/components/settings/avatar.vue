<template>
  <div class="mb-4 sm:mb-0 sm:w-1/2 text-white">
    <label for="avatar" class="block mb-2 text-center text-xl">Avatar</label>
    <div class="flex items-start">
      <div v-if="avatar" class="me-4">
        <img
          :src="avatar"
          alt="User Avatar"
          class="rounded w-24 h-24 sm:w-28 sm:h-28 object-cover"
        />
      </div>
      <div
        v-else
        class="me-4 w-24 h-24 sm:w-28 sm:h-28 rounded bg-orange-300 flex items-center justify-center"
      >
        <span class="text-6xl">{{ fullName?.[0] }}</span>
      </div>
      <div class="flex-wrap mt-6">
        <input
          type="file"
          id="avatar"
          @change="handleAvatarChange"
          accept=".jpg, .png, .jpeg"
          class="text-sm"
        />
        <small class="block mt-1 text-xs">jpg and png formats only*</small>
        <small class="block mt-1 text-xs">Max size 2MB*</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()

const avatar = computed(() => userStore.avatar)
const fullName = computed(() => userStore.name)

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped></style>
