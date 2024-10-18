<template>
  <div class="p-4 overflow-auto">
    <div class="">
      <div
        class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 sm:p-4 p-4"
      >
        <h2 class="text-3xl sm:text-4xl font-bold sm:mb-4 text-center">Create Food</h2>
        <form @submit.prevent="handleCreateFood" class="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div class="flex-1 space-y-6">
            <div>
              <label for="foodName" class="block text-sm font-medium mb-2">Food Name</label>
              <input
                id="foodName"
                v-model="food.name"
                type="text"
                required
                placeholder="Enter food name"
                autofocus
                class="glassmorphic-input w-full px-4 py-2 rounded-lg text-lg"
              />
            </div>
            <div>
              <label for="foodCategory" class="block text-sm font-medium mb-2">Category</label>
              <select
                id="foodCategory"
                v-model="food.category"
                required
                class="glassmorphic-input w-full px-4 py-2 rounded-lg text-lg"
              >
                <option value="" disabled selected>Select category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <!-- price -->
            <div>
              <label for="foodPrice" class="block text-sm font-medium mb-2">Price</label>
              <input
                id="foodPrice"
                v-model.number="food.price"
                type="number"
                required
                placeholder="Set price"
                min="0"
                class="glassmorphic-input w-full px-4 py-2 rounded-lg text-lg"
              />
            </div>
            <div>
              <label for="foodImages" class="block text-sm font-medium mb-2">Food Images</label>
              <input
                id="foodImages"
                type="file"
                multiple
                @change="uploadImages"
                accept=".jpg, .png, .jpeg"
                class="glassmorphic-input w-full px-4 py-2 rounded-lg text-lg"
              />
            </div>
            <div v-if="food.images.length" class="mt-2 flex flex-wrap gap-2">
              <div v-for="(image, index) in food.images" :key="index" class="relative">
                <img
                  :src="image"
                  :alt="`Food preview ${index + 1}`"
                  class="w-16 h-16 object-cover rounded-full"
                />
                <button
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col">
            <label for="foodDescription" class="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="foodDescription"
              v-model="food.description"
              required
              placeholder="Describe the food ✨"
              rows="10"
              class="glassmorphic-input flex-grow w-full px-4 py-2 rounded-lg text-lg resize-none"
            ></textarea>
          </div>
        </form>
        <!-- <div class="mt-6 sm:mt-4"> -->
        <!--  -->
        <div class="flex justify-end">
          <button
            :disabled="isButtonDisabled"
            type="submit"
            class="rounded bg-blue-200 text-black px-4 py-2 text-sm mt-4 w-full sm:w-40 hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50 transform transition-transform duration-300 hover:scale-105"
          >
            Create Food
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const food = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  images: []
})

const isButtonDisabled = computed(() => {
  return (
    !food.value.name ||
    !food.value.description ||
    !food.value.price ||
    !food.value.category ||
    food.value.images.length === 0
  )
})

const uploadImages = (event) => {
  const files = Array.from(event.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      food.value.images.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  food.value.images.splice(index, 1)
}

const handleCreateFood = () => {
  // Functionality to create food will go here
  console.log(food.value)
}

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Appetizers',
  'Desserts',
  'Beverages',
  'Salads'
]
</script>

<style scoped>
.glassmorphic-input {
  @apply bg-white bg-opacity-20 border border-white border-opacity-50 placeholder-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent;
}

.glassmorphic-button {
  @apply bg-opacity-80 backdrop-filter backdrop-blur-sm;
}
</style>
