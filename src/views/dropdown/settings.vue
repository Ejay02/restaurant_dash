<template>
  <div class="p-4 sm:p-8 overflow-auto">
    <div
      class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 p-4 sm:p-6"
    >
      <h1 class="text-center mb-6 text-2xl sm:text-3xl text-white">User Settings</h1>

      <div class="border-b border-gray-500 border-opacity-50 mb-4"></div>

      <!-- Avatar and Notifications Section -->
      <div
        class="flex flex-col sm:flex-row justify-between mb-6 pb-4 border-b border-gray-500 border-opacity-50"
      >
        <!-- Avatar Section -->
        <Avatar />
        <div class="border border-gray-200 border-opacity-10 mb-4"></div>
        <!-- Notifications Section -->
        <Notifications />
      </div>

      <!-- Password Change Section -->
      <PasswordChange />
    </div>
  </div>
</template>

<script setup>
import Avatar from '@/components/settings/avatar.vue'
import Notifications from '@/components/settings/notifications.vue'
import PasswordChange from '@/components/settings/passwordChange.vue'
</script>

<style scoped></style>
