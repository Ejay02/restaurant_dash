<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top navigation -->
      <Nav />

      <!-- Page content -->
      <Dashboard />
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/nav.vue'
import Sidebar from '@/components/sidebar.vue'
import Dashboard from '@/components/dashboard.vue'

// import { useNotificationStore } from './stores/notificationStore'

// const toggleNotifications = () => {
//   notificationStore.toggleNotifications()
// }
</script>

<style scoped>

</style>
