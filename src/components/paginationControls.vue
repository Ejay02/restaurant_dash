<!-- PaginationControls.vue -->
<template>
  <div class="mt-4 flex justify-center items-center space-x-4 mb-10">
    <button
      @click="onPrevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-blue-500 text-white rounded-md transform transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="onNextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-blue-500 text-white rounded-md transform transition-transform duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['prev-page', 'next-page'])

const onPrevPage = () => {
  emit('prev-page')
}

const onNextPage = () => {
  emit('next-page')
}
</script>
