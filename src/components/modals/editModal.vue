<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="closeModal"></div>
        <div class="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-xl max-w-md w-full m-4">
          <h2 class="text-2xl font-bold mb-4 text-white">Edit Food Item</h2>
          <form @submit.prevent="saveChanges">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-white mb-1">Name</label>
              <input
                type="text"
                id="name"
                v-model="editedItem.name"
                class="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-300"
                placeholder="Enter food name"
              />
            </div>
            <div class="mb-4">
              <label for="price" class="block text-sm font-medium text-white mb-1">Price</label>
              <input
                type="number"
                id="price"
                v-model="editedItem.price"
                step="0.01"
                class="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-300"
                placeholder="Enter price"
              />
            </div>
            <div class="mb-4">
              <label for="image" class="block text-sm font-medium text-white mb-1">Image URL</label>
              <input
                type="text"
                id="image"
                v-model="editedItem.image"
                class="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-300"
                placeholder="Enter image URL"
              />
            </div>
            <div class="mb-4">
              <img :src="editedItem.image" :alt="editedItem.name" class="w-full h-40 object-cover rounded-md" />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  item: Object,
});

const emit = defineEmits(['close', 'save']);

const editedItem = ref({ ...props.item });

watch(() => props.item, (newItem) => {
  editedItem.value = { ...newItem };
});

const closeModal = () => {
  emit('close');
};

const saveChanges = () => {
  emit('save', editedItem.value);
  closeModal();
};
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