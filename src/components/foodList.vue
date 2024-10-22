<template>
  <div class="min-h-screen p-8 flex flex-col overflow-scroll cursor-pointer">
    <div class="max-w-3xl mx-auto w-full flex-grow flex flex-col">
      <h1 class="text-4xl font-bold text-white mb-4 text-center">Food List</h1>
      <div class="flex-grow overflow-auto mb-4">
        <div class="space-y-4">
          <div
            v-for="item in paginatedItems"
            :key="item.id"
            class="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg"
          >
            <div class="flex items-center">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div class="flex-grow">
                <h3 class="text-xl font-semibold text-white">{{ item.name }}</h3>
                <p class="text-gray-400">${{ item.price.toFixed(2) }}</p>
                <p class="text-sm text-gray-400">Created: {{ item.createdDate }}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="openEditModal(item)"
                  class="p-2 text-blue-500 hover:text-amber-400 transform transition-transform duration-300 hover:scale-125"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  @click="openDeleteModal(item)"
                  class="p-2 text-red-600 hover:text-red-800 transform transition-transform duration-300 hover:scale-125"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
      <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
    </div>

    <!-- Edit Modal -->
    <EditModal
      :is-open="isEditModalOpen"
      :item="editingItem"
      @close="closeEditModal"
      @save="saveEditedItem"
    />

    <!-- Delete Modal -->
    <DeleteModal
      :is-open="isDeleteModalOpen"
      :item="deletingItem"
      @close="closeDeleteModal"
      @confirm="deleteItem"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePagination } from '@/utils/pagination'
import EditModal from '@/components/modals/editModal.vue'
import PaginationControls from './paginationControls.vue'
import DeleteModal from '@/components/modals/deleteModal.vue'

const foodItems = ref([
  {
    id: 1,
    name: 'Pizza',
    price: 12.99,
    createdDate: '2024-09-15',
    image: 'https://picsum.photos/200'
  },
  {
    id: 2,
    name: 'Burger',
    price: 8.99,
    createdDate: '2024-09-16',
    image: 'https://picsum.photos/200'
  },
  {
    id: 3,
    name: 'Salad',
    price: 7.99,
    createdDate: '2024-09-17',
    image: 'https://picsum.photos/200'
  },
  {
    id: 4,
    name: 'Pasta',
    price: 10.99,
    createdDate: '2024-09-18',
    image: 'https://picsum.photos/200'
  },
  {
    id: 5,
    name: 'Sushi',
    price: 15.99,
    createdDate: '2024-09-19',
    image: 'https://picsum.photos/200'
  },
  {
    id: 6,
    name: 'Taco',
    price: 6.99,
    createdDate: '2024-09-20',
    image: 'https://picsum.photos/200'
  },
  {
    id: 7,
    name: 'Steak',
    price: 22.99,
    createdDate: '2024-09-21',
    image: 'https://picsum.photos/200'
  },
  {
    id: 8,
    name: 'Sandwich',
    price: 7.49,
    createdDate: '2024-09-22',
    image: 'https://picsum.photos/200'
  }
  // Add more items as needed to demonstrate scrolling
])

const itemsPerPage = 5
const { currentPage, totalPages, paginatedItems, prevPage, nextPage } = usePagination(
  foodItems,
  itemsPerPage
)

const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const editingItem = ref(null)
const deletingItem = ref(null)

const openEditModal = (item) => {
  editingItem.value = { ...item }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  editingItem.value = null
}

const saveEditedItem = (editedItem) => {
  const index = foodItems.value.findIndex((item) => item.id === editedItem.id)
  if (index !== -1) {
    foodItems.value[index] = editedItem
  }
  closeEditModal()
}

const openDeleteModal = (item) => {
  deletingItem.value = item
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  deletingItem.value = null
}

const deleteItem = (id) => {
  foodItems.value = foodItems.value.filter((item) => item.id !== id)
  closeDeleteModal()
}
</script>
