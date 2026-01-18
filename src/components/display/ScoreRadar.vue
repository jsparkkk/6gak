<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">능력치 육각형</h2>
    <canvas ref="radarCanvas" />
    <p class="mt-3 text-center text-sm text-gray-600">
      종합 점수(육각형 내부의 넓이): <span class="font-bold text-blue-600">{{ totalScore }}</span
      >점
    </p>
  </section>
</template>

<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

const props = defineProps({
  percentiles: {
    type: Object,
    required: true, // { height, bmi, education, salary, job, assets } (0~100)
  },
})

const scores = computed(() => [
  norm(props.percentiles.height),
  norm(props.percentiles.bmi),
  norm(props.percentiles.education),
  norm(props.percentiles.salary),
  norm(props.percentiles.assets),
  norm(props.percentiles.job),
])

const round2 = (x) => Math.round(Number(x) * 100) / 100
const norm = (x) => {
  const v = Number(x)
  if (!Number.isFinite(v)) return 0
  return round2(Math.min(100, Math.max(0, v)))
}
const radarCanvas = ref(null)
let radarChart = null

const labels = ['키', 'BMI', '학벌', '연봉', '자산', '직업']

function getScoreArray(percentiles) {
  return [
    percentiles.height ?? 0,
    percentiles.bmi ?? 0,
    percentiles.education ?? 0,
    percentiles.salary ?? 0,
    percentiles.assets ?? 0,
    percentiles.job ?? 0,
  ]
}

function calculateRadarArea(scoreArr) {
  const r = 100
  const angles = scoreArr.map((_, i, arr) => (2 * Math.PI * i) / arr.length)
  const coords = scoreArr.map((val, i) => {
    const rad = (val / r) * 100
    return [rad * Math.cos(angles[i]), rad * Math.sin(angles[i])]
  })

  let area = 0
  for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = coords[i]
    const [x2, y2] = coords[(i + 1) % coords.length]
    area += (x1 * y2 - x2 * y1) / 2
  }
  return Math.abs(area.toFixed(0))
}

const totalScore = ref(0)

onMounted(() => {
  radarChart = new Chart(radarCanvas.value, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: '능력치 점수',
          data: getScoreArray(props.percentiles),
          backgroundColor: 'rgba(59,130,246,0.2)',
          borderColor: 'rgba(59,130,246,1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(59,130,246,1)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // ← 중요: 무한 공백 방지
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#999',
            backdropColor: 'transparent',
          },
          pointLabels: {
            font: {
              size: 12,
              weight: 'bold',
            },
            color: '#333',
          },
          grid: {
            color: '#ccc',
          },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  })
  totalScore.value = calculateRadarArea(getScoreArray(props.percentiles))
})

watch(
  () => props.percentiles,
  (newScores) => {
    const data = getScoreArray(newScores)
    totalScore.value = calculateRadarArea(data)
    if (radarChart) {
      radarChart.data.datasets[0].data = data
      radarChart.update()
    }
  },
  { deep: true },
)
</script>

<style scoped>
canvas {
  width: 100% !important;
  max-width: 100%;
}
</style>
