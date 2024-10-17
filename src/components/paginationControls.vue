<!-- PaginationControls.vue -->
<template>
  <div class="mt-4 flex justify-center items-center space-x-4 mb-10">
    <button
      @click="onPrevPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      Previous
    </button>
    <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="onNextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
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
