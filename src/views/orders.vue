<template>
  <div class="p-5 overflow-auto">
    <div
      class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 sm:p-4"
    >
      <table class="w-full mt-5">
        <thead class="text-2xl font-bold mb-4 text-center border-b-2 border-gray-200 border-t-2">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="order in paginatedItems" :key="order.id" class="hover:bg-gray-400">
            <td>{{ order.id }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.total }}</td>
            <td
              :class="{
                'text-green-700 text-lg': order.status === 'completed',
                'text-yellow-500 text-lg': order.status === 'pending',
                'text-red-700 text-lg': order.status === 'cancelled'
              }"
            >
              {{ order.status }}
            </td>
          </tr>
        </tbody>
      </table>

      <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePagination } from '@/utils/pagination'
import PaginationControls from '@/components/paginationControls.vue'

const orders = ref([
  { id: 209201, date: '2023-02-20', customerName: 'John Doe', total: '$15.99', status: 'completed' },
  { id: 20292, date: '2023-02-21', customerName: 'Jane Doe', total: '$10.99', status: 'pending' },
  { id: 38393, date: '2023-02-22', customerName: 'Bob Smith', total: '$20.99', status: 'cancelled' },
  { id: 49384, date: '2023-02-23', customerName: 'Alice Johnson', total: '$30.99', status: 'pending' },
  { id: 29305, date: '2023-02-24', customerName: 'Mike Brown', total: '$25.99', status: 'completed' },
  { id: 39406, date: '2023-02-25', customerName: 'Emily Davis', total: '$35.99', status: 'cancelled' },
  { id: 57557, date: '2023-02-26', customerName: 'David Lee', total: '$40.99', status: 'completed' },
  { id: 988, date: '2023-02-27', customerName: 'Sophia Patel', total: '$45.99', status: 'pending' },
  { id: 23399, date: '2023-02-28', customerName: 'Oliver Kim', total: '$50.99', status: 'cancelled' },
  { id: 19090, date: '2023-03-01', customerName: 'Ava Chen', total: '$55.99', status: 'pending' },
  { id: 12731, date: '2023-03-02', customerName: 'Ethan Hall', total: '$60.99', status: 'completed' },
  { id: 19802, date: '2023-03-03', customerName: 'Lily Wong', total: '$65.99', status: 'cancelled' }
])

const itemsPerPage = 10
const { currentPage, totalPages, paginatedItems, prevPage, nextPage } = usePagination(
  orders,
  itemsPerPage
)
</script>

<style scoped>
td,
th {
  @apply py-3;
  cursor: pointer;
}
</style>
