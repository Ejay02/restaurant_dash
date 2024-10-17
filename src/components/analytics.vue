<template>
  <div
    class="mt-10 overflow-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl border border-white border-opacity-30 sm:p-4 p-4 m-4"
  >
  <div class="text-center">{{ currentYear }} Month-over-Month (MoM) Analytics</div>
    <Chart :key="chartType" :type="chartType" :data="computedChartData" :options="chartOptions" />
    <button
      @click="toggleChartType"
      class="rounded bg-blue-200 text-black px-4 py-2 text-sm float-right mt-4"
    >
      Switch to {{ nextChartType }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Chart } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

const currentYear = ref(new Date().getFullYear());

const chartType = ref('line')

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Page Views',
      data: [100, 20, 150, 800, 200, 220, 250, 280, 400, 320, 130, 80],
      pointBackgroundColor: 'black',
      pointBorderColor: 'pink',
      
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'black'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'black'
      }
    },
    y: {
      ticks: {
        color: 'black'
      },
      beginAtZero: true
    }
  }
}

const computedChartData = computed(() => {
  const data = { ...chartData }
  if (chartType.value === 'bar') {
    data.datasets[0].pointBackgroundColor = 'rgba(0, 0, 0, 0.2)'
  }
  return data
})

const nextChartType = computed(() => (chartType.value === 'line' ? 'Bar' : 'Line'))

function toggleChartType() {
  chartType.value = chartType.value === 'line' ? 'bar' : 'line'
}
</script>
