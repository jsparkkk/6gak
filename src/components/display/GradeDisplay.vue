<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">능력치 등급표</h2>
    <table class="w-full text-sm text-center border border-gray-200">
      <thead class="bg-gray-50 text-gray-500">
        <tr>
          <th class="w-1/7 py-2">항목</th>
          <th class="w-1/7 py-2">키</th>
          <th class="w-1/7 py-2">체형</th>
          <th class="w-1/7 py-2">학벌</th>
          <th class="w-1/7 py-2">연봉</th>
          <th class="w-1/7 py-2">직업</th>
          <th class="w-1/7 py-2">자산</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-700">
          <td class="py-2 font-semibold">등급</td>
          <td class="py-2 text-blue-600 font-bold">{{ heightGrade }}등급</td>
          <td class="py-2 text-sm text-center leading-tight">
            <div class="flex flex-col items-center justify-center">
              <div
                :class="[
                  'font-bold',
                  bmiAnalysis?.color === 'green'
                    ? 'text-green-600'
                    : bmiAnalysis?.color === 'orange'
                      ? 'text-orange-500'
                      : 'text-red-500',
                ]"
              >
                {{ bmiAnalysis?.category ?? '-' }}
              </div>
              <div class="text-xs text-gray-500">
                {{ bmiAnalysis?.bmi }}
              </div>
            </div>
          </td>

          <td class="py-2 text-blue-600 font-bold">{{ educationResult?.grade ?? '-' }}등급</td>
          <td class="py-2 text-blue-600 font-bold">
            <span class="font-bold" v-if="salaryPercentile != null"
              >{{ percentileToGrade(salaryPercentile) }}등급</span
            >
            <span v-else>-</span>
          </td>
          <td class="py-2 text-blue-600 font-bold">{{ jobGrade }}등급</td>
          <td class="py-2 text-blue-600 font-bold">
            <span span class="font-bold" v-if="assetPercentile != null"
              >{{ percentileToGrade(assetPercentile) }}등급</span
            >
            <span v-else>-</span>
          </td>
        </tr>
        <!-- ✅ 추가된 백분위 줄 -->
        <tr class="text-gray-700">
          <td class="py-2 font-semibold">백분위(%)</td>
          <td class="py-2 font-bold">{{ Math.max(1, Math.floor(heightPercentile)) }}</td>
          <td class="py-2 font-bold">
            {{
              bmiAnalysis?.percentile !== undefined
                ? Math.max(1, Math.floor(bmiAnalysis.percentile))
                : '-'
            }}
          </td>
          <td class="py-2 font-bold">
            {{
              educationResult?.percentile !== undefined
                ? Math.max(1, Math.round(educationResult.percentile))
                : '-'
            }}
          </td>
          <!-- [CHANGED] 연봉 백분위: 점수→퍼센타일 -->
          <td class="py-2 font-bold">
            <span class="font-bold" v-if="salaryPercentile != null">{{
              Math.max(1, Math.floor(salaryPercentile))
            }}</span>
            <span v-else>-</span>
          </td>
          <td class="py-2 font-bold">{{ Math.max(1, Math.floor(jobPercentile)) }}</td>
          <td class="py-2 font-bold">
            <span class="font-bold" v-if="assetPercentile != null">{{
              Math.max(1, Math.floor(assetPercentile))
            }}</span>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { computed, watch, toRefs } from 'vue'
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

const heightPercentile = computed(() => {
  const h = props.ability?.height
  const g = props.gender
  const a = props.age

  if (!h || !g || !a) return 0
  return getHeightPercentile(h, g, a)
})

const heightGrade = computed(() => percentileToGrade(heightPercentile.value))

watch(
  () => [props.ability?.height, props.gender, props.age],
  ([h, g, a]) => {
    if (!h || !g || !a) return
    const percentile = getHeightPercentile(h, g, a)
    const grade = percentileToGrade(percentile)
    emit('update-height', { percentile })
  },
  { immediate: true },
)

//weight 계산
const bmiAnalysis = computed(() => {
  const h = props.ability?.height
  const w = props.ability?.weight
  const g = props.gender
  const a = props.age
  if (!h || !w || !g || !a) return null
  return getBmiAnalysis({ height: h, weight: w, gender: g, age: a })
})

/*
const toGrade = (score) => {
  if (score >= 95) return 1
  if (score >= 90) return 2
  if (score >= 80) return 3
  if (score >= 70) return 4
  if (score >= 60) return 5
  if (score >= 50) return 6
  if (score >= 40) return 7
  if (score >= 30) return 8
  return 9
}
  */
watch(
  () => bmiAnalysis.value?.percentile,
  (p) => {
    if (p == null) return
    emit('update-bmi', { percentile: p })
  },
  { immediate: true },
)

//대학 계산
const educationResult = computed(() => {
  const name = props.ability?.university
  const age = props.age

  if (!name || !age) return null
  return calculateEducationPercentileAndGrade(age, name)
})

// ✅ 점수 → 백분위 변환 함수 (정상적으로 등급과 매칭되도록 선형 추정)
/*
const toPercentile = (score) => {
  return score.toFixed(0)
}
  */

// 점수 계산
/*
const scoreFrom = {
  height: (val) => (val >= 180 ? 95 : val >= 170 ? 80 : 60),
  bmi: (bmi) => {
    if (!bmi) return 'F'
    if (bmi >= 30 || bmi < 16.5) return 'F'
    if (bmi >= 25 || bmi < 18.5) return 'P주황'
    return 'P녹색'
  },
  university: (val) => (val?.includes('서울') ? 90 : 60),
  salary: (val) => (val > 10000 ? 95 : val > 5000 ? 80 : 50),
  asset: (val) => (val > 50000 ? 95 : val > 20000 ? 80 : 50),
}
*/
watch(
  () => educationResult.value,
  (r) => {
    if (!r || r.percentile == null) return
    emit('update-education', { percentile: r.percentile })
  },
  { immediate: true },
)

// BMI 계산
/*
const bmi = computed(() => {
  const h = props.ability?.height
  const w = props.ability?.weight
  if (!h || !w) return null
  const m = h / 100
  return +(w / (m * m)).toFixed(1)
})

const bmiLevel = computed(() => {
  const val = bmi.value
  const label = scoreFrom.bmi(val)
  if (label === 'F') return 'F'
  if (label === 'P주황') return 'P'
  return 'P'
})

const bmiClass = computed(() => {
  const val = scoreFrom.bmi(bmi.value)
  if (val === 'F') return 'text-red-500'
  if (val === 'P주황') return 'text-orange-500'
  return 'text-green-600'
})*/

/* [ADD] 연봉 퍼센타일 계산
   - AbilityTable의 연봉 입력은 "만원" 단위이므로 KRW(원)로 변환 필요: * 10,000
*/
const salaryKRW = computed(() => {
  const v = props.ability?.salary
  if (v == null) return null
  return Math.round(Number(v) * 10000) // 만원 → 원
})

const salaryPercentile = computed(() => {
  if (salaryKRW.value == null || !props.gender || !props.age) return null
  return getSalaryPercentile({
    gender: props.gender,
    age: props.age,
    incomeKRW: salaryKRW.value,
  })
})
watch(
  () => salaryPercentile.value,
  (p) => {
    if (p == null) return
    emit('update-salary', { percentile: p })
  },
  { immediate: true },
)

// ⬇️ 추가: 자산(만원) → 원(KRW)
const assetKRW = computed(() => {
  const v = props.ability?.asset
  if (v == null) return null
  return Math.round(Number(v) * 10000) // 만원 → 원 (음수도 허용)
})

// ⬇️ 추가: 자산 퍼센타일 (상위 1% → 99, 중위 50 → 50)
const assetPercentile = computed(() => {
  if (assetKRW.value == null || !isFinite(assetKRW.value) || !props.age) return null
  // percentileForAgeAndAsset(age, KRW) → { percentile, bucket, ... }
  const { percentile } = percentileForAgeAndAsset(props.age, assetKRW.value)
  return percentile // 숫자(예: 76.34) — 상위일수록 큼
})

// 개별 점수 계산
/*
const heightScore = computed(() => scoreFrom.height(props.ability?.height))

const salaryScore = computed(() => scoreFrom.salary(props.ability?.salary))
const assetScore = computed(() => scoreFrom.asset(props.ability?.asset))
*/
// ✅ 직업 누적 백분위: 선택 객체 { tier, label } 기준
const jobPercentile = computed(() => {
  const sel = props.ability?.job // { tier:'T7', label:'간호사' } 형태(옵션 리스트 버전)
  return getJobPercentileFromSelection(sel)
})
watch(
  () => jobPercentile.value,
  (p) => {
    if (p == null) return
    emit('update-job', { percentile: p })
  },
  { immediate: true },
)
const jobGrade = computed(() => percentileToGrade(jobPercentile.value))

watch(
  () => assetPercentile.value,
  (p) => {
    if (p == null) return
    emit('update-asset', { percentile: p })
  },
  { immediate: true },
)
</script>
