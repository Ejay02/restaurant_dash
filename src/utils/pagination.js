import { ref, computed } from 'vue'

export function usePagination(items, pageSize = 10) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return items.value.slice(start, end)
  })

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    prevPage,
    nextPage
  }
}
