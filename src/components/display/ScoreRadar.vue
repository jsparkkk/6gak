<template>
  <section
    class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"
    ></div>

    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
        Stats Overview
      </h2>
    </div>

    <div class="relative w-full aspect-square max-w-[400px] mx-auto my-2">
      <canvas ref="radarCanvas" />
    </div>

    <div class="mt-4 pt-4 border-t border-gray-100 text-center">
      <p class="text-xs text-gray-400 font-medium mb-1 tracking-wider">6GAK SCORE</p>
      <div class="flex items-baseline justify-center gap-1">
        <span
          class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500"
        >
          <CountUp :to="scaledTotalScore" :precision="0" :duration="2000" />
        </span>
        <span class="text-gray-400 font-medium text-sm">/ 10,000</span>
      </div>
      <p class="text-[11px] text-gray-400 mt-2">
        * 종합 능력치 환산 점수 (색칠된 내부 면적 넓이, 최대 10,000의 값을 가짐)
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import CountUp from '@/components/common/CountUp.vue'
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
    required: true,
  },
})

// 차트 인스턴스
const radarCanvas = ref(null)
let radarChart = null

// 라벨 순서 (시계 방향)
const labels = ['키', '체중(BMI)', '학벌', '연봉', '자산', '직업']

// 데이터 추출 헬퍼
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

// 넓이 계산 (육각형 내부 면적)
function calculateRadarArea(scoreArr) {
  const sin60 = Math.sin(Math.PI / 3)
  let area = 0

  for (let i = 0; i < scoreArr.length; i++) {
    const current = scoreArr[i]
    const next = scoreArr[(i + 1) % scoreArr.length]
    area += 0.5 * current * next * sin60
  }

  return area
}

// 10,000점 만점 기준 최대 넓이 상수 (반지름 100인 정육각형 넓이)
const MAX_AREA = 25980.76

const rawTotalArea = ref(0)

// 10,000점으로 환산된 점수 (Computed)
const scaledTotalScore = computed(() => {
  const score = (rawTotalArea.value / MAX_AREA) * 10000
  // 정수 반환 보장
  return Math.round(Math.max(0, Math.min(10000, score)))
})

onMounted(() => {
  const ctx = radarCanvas.value.getContext('2d')

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: '내 능력치',
          data: getScoreArray(props.percentiles),
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 2,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: 'rgba(79, 70, 229, 1)',
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          beginAtZero: true,
          ticks: {
            display: false,
            stepSize: 20,
            maxTicksLimit: 6,
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            circular: false,
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
          pointLabels: {
            font: {
              size: 12,
              family: "'Pretendard', sans-serif",
              weight: 'bold',
            },
            color: '#4B5563',
            padding: 10,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          titleFont: { size: 13 },
          bodyFont: { size: 13 },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: (context) => ` 상위 ${context.raw}% 점수`,
          },
        },
      },
    },
  })

  // 초기 점수 계산
  rawTotalArea.value = calculateRadarArea(getScoreArray(props.percentiles))
})

watch(
  () => props.percentiles,
  (newScores) => {
    const data = getScoreArray(newScores)
    rawTotalArea.value = calculateRadarArea(data)

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
  height: auto !important;
}
</style>
