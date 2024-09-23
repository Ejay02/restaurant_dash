<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
        <div
          class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          @click="closeModal"
        ></div>
        <div
          class="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-xl max-w-md w-full m-4"
        >
          <h2 class="text-2xl font-bold mb-4 text-white">Confirm Deletion</h2>
          <p class="text-white mb-6">
            Are you sure you want to delete "{{ item.name }}"? This action cannot be undone.
          </p>
          <div class="flex justify-end space-x-2">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  item: Object
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('confirm', props.item.id)
  closeModal()
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
