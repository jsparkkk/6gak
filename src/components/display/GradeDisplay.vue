<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">능력치 등급표</h2>
    <table class="w-full text-sm text-center border border-gray-200 table-fixed">
      <thead class="bg-gray-50 text-gray-500">
        <tr>
          <th class="py-2">항목</th>
          <th class="py-2">키</th>
          <th class="py-2">비만여부</th>
          <th class="py-2">학벌</th>
          <th class="py-2">연봉</th>
          <th class="py-2">직업</th>
          <th class="py-2">자산</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-700">
          <td class="py-3 font-semibold bg-gray-50/50">등급</td>

          <td class="py-2 text-blue-600 font-bold">
            {{ heightGrade ? `${heightGrade}등급` : '-' }}
          </td>

          <td class="py-2 text-sm text-center leading-tight">
            <div v-if="bmiAnalysis" class="flex flex-col items-center justify-center">
              <div
                :class="[
                  'font-bold',
                  bmiAnalysis.color === 'green'
                    ? 'text-green-600'
                    : bmiAnalysis.color === 'orange'
                      ? 'text-orange-500'
                      : 'text-red-500',
                ]"
              >
                {{ bmiAnalysis.category }}
              </div>
            </div>
            <div v-else>-</div>
          </td>

          <td class="py-2 text-blue-600 font-bold">
            {{ educationResult?.grade ? `${educationResult.grade}등급` : '-' }}
          </td>

          <td class="py-2 text-blue-600 font-bold">
            {{ salaryGrade ? `${salaryGrade}등급` : '-' }}
          </td>

          <td class="py-2 text-blue-600 font-bold">
            {{ jobGrade ? `${jobGrade}등급` : '-' }}
          </td>

          <td class="py-2 text-blue-600 font-bold">
            {{ assetGrade ? `${assetGrade}등급` : '-' }}
          </td>
        </tr>

        <tr class="text-gray-700 border-t border-gray-100">
          <td class="py-3 font-semibold bg-gray-50/50">백분위</td>

          <td class="py-2">
            <div v-if="heightPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="toTopPercent(heightPercentile)"
                  :precision="1"
                />%
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td class="py-2">
            <div
              v-if="bmiAnalysis?.percentile != null"
              class="flex flex-col items-center leading-none"
            >
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="bmiAnalysis.percentile"
                  :precision="1"
                />% 이내
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td class="py-2">
            <div
              v-if="educationResult?.percentile != null"
              class="flex flex-col items-center leading-none"
            >
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="toTopPercent(educationResult.percentile)"
                  :precision="1"
                />%
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td class="py-2">
            <div v-if="salaryPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="toTopPercent(salaryPercentile)"
                  :precision="1"
                />%
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td class="py-2">
            <div v-if="jobPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="toTopPercent(jobPercentile)"
                  :precision="1"
                />%
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td class="py-2">
            <div v-if="assetPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5">상위</span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="toTopPercent(assetPercentile)"
                  :precision="1"
                />%
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'
import CountUp from '@/components/common/CountUp.vue'

import { getHeightPercentile, percentileToGrade } from '@/utils/heightUtils'
import { getBmiAnalysis } from '@/utils/bmiUtils'
import { calculateEducationPercentileAndGrade } from '@/utils/educationUtils'
import { getSalaryPercentile } from '@/utils/salaryPercentile'
import { getJobPercentileFromSelection } from '@/utils/jobPercentile'
import { percentileForAgeAndAsset } from '@/utils/assetUtils'

const props = defineProps({
  ability: Object,
  gender: String,
  age: Number,
})

const emit = defineEmits([
  'update-height',
  'update-bmi',
  'update-education',
  'update-salary',
  'update-job',
  'update-asset',
])

// 점수(99)를 상위%(1.0) 숫자로 변환
const toTopPercent = (score) => {
  if (score == null) return 0
  const top = 100 - score
  return Math.max(0.1, top)
}

// --- Computed Properties (기존 유지) ---
const heightPercentile = computed(() => {
  const h = props.ability?.height
  const g = props.gender
  const a = props.age
  if (!h || !g || !a) return null
  return getHeightPercentile(h, g, a)
})
const heightGrade = computed(() =>
  heightPercentile.value != null ? percentileToGrade(heightPercentile.value) : null,
)

const bmiAnalysis = computed(() => {
  const h = props.ability?.height
  const w = props.ability?.weight
  const g = props.gender
  const a = props.age
  if (!h || !w || !g || !a) return null
  return getBmiAnalysis({ height: h, weight: w, gender: g, age: a })
})

const educationResult = computed(() => {
  const name = props.ability?.university
  const age = props.age
  if (!name || !age) return null
  return calculateEducationPercentileAndGrade(age, name)
})

const salaryKRW = computed(() => {
  const v = props.ability?.salary
  if (v === '' || v === null) return null
  return Math.round(Number(v) * 10000)
})
const salaryPercentile = computed(() => {
  if (salaryKRW.value === null || !props.gender || !props.age) return null
  return getSalaryPercentile({
    gender: props.gender,
    age: props.age,
    incomeKRW: salaryKRW.value,
  })
})
const salaryGrade = computed(() =>
  salaryPercentile.value != null ? percentileToGrade(salaryPercentile.value) : null,
)

const jobPercentile = computed(() => {
  const sel = props.ability?.job
  if (!sel || (!sel.tier && !sel.label)) return null
  return getJobPercentileFromSelection(sel)
})
const jobGrade = computed(() =>
  jobPercentile.value != null ? percentileToGrade(jobPercentile.value) : null,
)

const assetKRW = computed(() => {
  const v = props.ability?.asset
  if (v === '' || v === null) return null
  return Math.round(Number(v) * 10000)
})
const assetPercentile = computed(() => {
  if (assetKRW.value === null || !isFinite(assetKRW.value) || !props.age) return null
  const { percentile } = percentileForAgeAndAsset(props.age, assetKRW.value)
  return percentile
})
const assetGrade = computed(() =>
  assetPercentile.value != null ? percentileToGrade(assetPercentile.value) : null,
)

// --- Watchers (기존 유지) ---
watch(heightPercentile, (p) => {
  if (p != null) emit('update-height', { percentile: p })
})

watch(
  () => bmiAnalysis.value,
  (val) => {
    if (val && val.percentile != null) {
      let graphScore = 100 - val.percentile
      graphScore = Math.max(0, graphScore)
      emit('update-bmi', { percentile: graphScore })
    }
  },
  { deep: true },
)

watch(
  () => educationResult.value?.percentile,
  (p) => {
    if (p != null) emit('update-education', { percentile: p })
  },
)
watch(salaryPercentile, (p) => {
  if (p != null) emit('update-salary', { percentile: p })
})
watch(assetPercentile, (p) => {
  if (p != null) emit('update-asset', { percentile: p })
})
watch(jobPercentile, (p) => {
  if (p != null) emit('update-job', { percentile: p })
})
</script>
