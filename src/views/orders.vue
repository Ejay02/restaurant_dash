<template>
  <div class="p-5 overflow-auto cursor-pointer">
    <div
      class="bg-white bg-opacity-20 backdrop-blur-lg rounded shadow-xl border border-white border-opacity-30 sm:p-4"
    >
      <h2 class="text-center text-2xl m-2 p-2">{{ title }}</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead
            class="text-lg sm:text-xl font-bold mb-4 text-center border-b-2 border-gray-200 border-t-2"
          >
            <tr>
              <th class="px-2 py-3">Order ID</th>
              <th class="px-2 py-3">Customer</th>
              <th class="px-2 py-3">Items</th>
              <th class="px-2 py-3">Total</th>
              <th class="px-2 py-3">Status</th>
              <th class="px-2 py-3">Date</th>
            </tr>
          </thead>
          <tbody class="text-center cursor-pointer">
            <tr v-for="order in displayedOrders" :key="order.id" class="hover:bg-gray-400">
              <td class="px-2 py-3">#{{ order.id }}</td>
              <td class="px-2 py-3">{{ order.customerName }}</td>

              <td class="p-2">
                <ul>
                  <li v-for="(item, index) in order.items" :key="index">
                    {{ item.quantity }}x {{ item.name
                    }}{{ index < order.items.length - 1 ? ', ' : '' }}
                  </li>
                </ul>
              </td>
              <td class="px-2 py-3">{{ order.total }}</td>
              <td
                class="px-2 py-3"
                :class="{
                  'text-green-700': order.status === 'delivered',
                  'text-yellow-500': order.status === 'preparing',
                  'text-red-700': order.status === 'cancelled'
                }"
              >
                {{ order.status }}
              </td>
              <td class="px-2 py-3">{{ order.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationControls
        v-if="showPagination"
        :current-page="currentPage"
        :total-pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePagination } from '@/utils/pagination'
import PaginationControls from '@/components/paginationControls.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Orders'
  },
  limit: {
    type: Number,
    default: 0
  },
  showPagination: {
    type: Boolean,
    default: true
  }
})

const orders = ref([
  {
    id: 209201,
    date: '2024-02-20',
    customerName: 'John Doe',
    total: '$15.99',
    status: 'delivered',
    items: [{ name: 'Margherita', quantity: 2 }]
  },
  {
    id: 20292,
    date: '2024-02-21',
    customerName: 'Jane Doe',
    total: '$10.99',
    status: 'preparing',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1 },
      { name: 'Fanta', quantity: 1 }
    ]
  },
  {
    id: 38393,
    date: '2024-02-22',
    customerName: 'Bob Smith',
    total: '$20.99',
    status: 'cancelled',
    items: [
      { name: 'Meatball Sub', quantity: 1 },
      { name: 'Iced Tea', quantity: 1 }
    ]
  },
  {
    id: 49384,
    date: '2024-02-23',
    customerName: 'Alice Johnson',
    total: '$30.99',
    status: 'preparing',
    items: [
      { name: 'Veggie Pizza', quantity: 1 },
      { name: 'Burger', quantity: 1 }
    ]
  },
  {
    id: 29305,
    date: '2024-02-24',
    customerName: 'Mike Brown',
    total: '$25.99',
    status: 'delivered',
    items: [
      { name: 'Chicken Wings', quantity: 2 },
      { name: 'Sprite', quantity: 1 }
    ]
  },
  {
    id: 39406,
    date: '2024-02-25',
    customerName: 'Emily Davis',
    total: '$35.99',
    status: 'cancelled',
    items: [
      { name: 'Taco', quantity: 2 },
      { name: 'Milkshake', quantity: 1 }
    ]
  },
  {
    id: 57557,
    date: '2024-02-26',
    customerName: 'David Lee',
    total: '$40.99',
    status: 'delivered',
    items: [
      { name: 'Steak', quantity: 1 },
      { name: 'Garlic Bread', quantity: 1 }
    ]
  },
  {
    id: 988,
    date: '2024-02-27',
    customerName: 'Sophia Patel',
    total: '$45.99',
    status: 'preparing',
    items: [
      { name: 'Salad', quantity: 1 },
      { name: 'Lemonade', quantity: 1 }
    ]
  },
  {
    id: 23399,
    date: '2024-02-28',
    customerName: 'Oliver Kim',
    total: '$50.99',
    status: 'cancelled',
    items: [
      { name: 'Ribs', quantity: 2 },
      { name: 'Corn on the Cob', quantity: 1 }
    ]
  },
  {
    id: 19090,
    date: '2024-03-01',
    customerName: 'Ava Chen',
    total: '$55.99',
    status: 'preparing',
    items: [
      { name: 'Shrimp', quantity: 1 },
      { name: 'Fries', quantity: 1 }
    ]
  },
  {
    id: 12731,
    date: '2024-03-02',
    customerName: 'Ethan Hall',
    total: '$60.99',
    status: 'delivered',
    items: [
      { name: 'Chicken Parmesan', quantity: 1 },
      { name: 'Onion Rings', quantity: 1 }
    ]
  },
  {
    id: 19802,
    date: '2024-03-03',
    customerName: 'Lily Wong',
    total: '$65.99',
    status: 'cancelled',
    items: [
      { name: 'Fish and Chips', quantity: 1 },
      { name: 'Apple Pie', quantity: 1 }
    ]
  }
])

const itemsPerPage = 10
const { currentPage, totalPages, paginatedItems, prevPage, nextPage } = usePagination(
  orders,
  itemsPerPage
)

const displayedOrders = computed(() => {
  if (props.showPagination) {
    return paginatedItems.value
  } else {
    return orders.value.slice(0, props.limit)
  }
})
</script>

<style scoped>
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}
</style>
