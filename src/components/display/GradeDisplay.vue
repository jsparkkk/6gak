<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4">
    <h2 class="text-sm font-semibold text-gray-700 mb-2">능력치 등급표</h2>
    <table class="w-full text-sm text-center border border-gray-200 table-fixed">
      <thead class="bg-gray-50 text-gray-500">
        <tr>
          <th class="py-2">항목</th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              키
              <Transition name="check-pop">
                <div
                  v-if="heightGrade"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              비만여부
              <Transition name="check-pop">
                <div
                  v-if="bmiAnalysis"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              학벌
              <Transition name="check-pop">
                <div
                  v-if="educationResult?.grade"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              연봉
              <Transition name="check-pop">
                <div
                  v-if="salaryGrade"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              직업
              <Transition name="check-pop">
                <div
                  v-if="jobGrade"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>

          <th class="py-2">
            <div class="flex items-center justify-center gap-1">
              자산
              <Transition name="check-pop">
                <div
                  v-if="assetGrade"
                  class="flex items-center justify-center w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </Transition>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-700">
          <td class="py-3 font-semibold bg-gray-50/50">등급</td>

          <td
            class="py-2 text-blue-600 font-bold transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.height }"
          >
            <span v-if="heightGrade" class="text-blue-600 font-bold">
              <CountUp
                class="text-blue-600 font-bold"
                :to="heightGrade"
                :precision="0"
                :duration="countDuration"
              />
            </span>
            <span v-else>-</span>
          </td>

          <td
            class="py-2 text-sm text-center leading-tight transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.bmi }"
          >
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

          <td
            class="py-2 text-blue-600 font-bold transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.education }"
          >
            <span v-if="educationResult?.grade" class="text-blue-600 font-bold">
              <CountUp
                class="text-blue-600 font-bold"
                :to="educationResult.grade"
                :precision="0"
                :duration="countDuration"
              />
            </span>
            <span v-else>-</span>
          </td>

          <td
            class="py-2 text-blue-600 font-bold transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.salary }"
          >
            <span v-if="salaryGrade" class="text-blue-600 font-bold">
              <CountUp
                class="text-blue-600 font-bold"
                :to="salaryGrade"
                :precision="0"
                :duration="countDuration"
              />
            </span>
            <span v-else>-</span>
          </td>

          <td
            class="py-2 text-blue-600 font-bold transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.job }"
          >
            <span v-if="jobGrade" class="text-blue-600 font-bold">
              <CountUp
                class="text-blue-600 font-bold"
                :to="jobGrade"
                :precision="0"
                :duration="countDuration"
              />
            </span>
            <span v-else>-</span>
          </td>

          <td
            class="py-2 text-blue-600 font-bold transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.asset }"
          >
            <span v-if="assetGrade" class="text-blue-600 font-bold">
              <CountUp
                class="text-blue-600 font-bold"
                :to="assetGrade"
                :precision="0"
                :duration="countDuration"
              />
            </span>
            <span v-else>-</span>
          </td>
        </tr>

        <tr class="text-gray-700 border-t border-gray-100">
          <td class="py-3 font-semibold bg-gray-50/50">백분위</td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.height }"
          >
            <div v-if="heightPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="heightPercentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.bmi }"
          >
            <div
              v-if="bmiAnalysis?.percentile != null"
              class="flex flex-col items-center leading-none"
            >
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="bmiAnalysis.percentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.education }"
          >
            <div
              v-if="educationResult?.percentile != null"
              class="flex flex-col items-center leading-none"
            >
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="educationResult.percentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.salary }"
          >
            <div v-if="salaryPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="salaryPercentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.job }"
          >
            <div v-if="jobPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="jobPercentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>

          <td
            class="py-2 transition-colors duration-500"
            :class="{ 'animate-flash': flashFlags.asset }"
          >
            <div v-if="assetPercentile != null" class="flex flex-col items-center leading-none">
              <span class="text-[10px] text-gray-600 mb-0.5"></span>
              <span class="font-bold text-gray-800">
                <CountUp
                  class="font-bold text-gray-800"
                  :to="assetPercentile"
                  :precision="0"
                  :duration="countDuration"
                />
              </span>
            </div>
            <span v-else class="font-bold">-</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-start gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 text-gray-400 shrink-0 mt-0.5"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="text-[11px] text-gray-500 space-y-1 leading-snug">
        <p>
          등급은 수능 등급제를 따릅니다.
          <span class="text-gray-400 font-normal"
            >[1등급(~4%), 2등급(~11%), 3등급(~23%) ... ... ]</span
          >
        </p>
        <p>백분위 또한 수능 성적표의 백분위(하위 백분위 개념)를 따릅니다. 즉 높을수록 좋은 것.</p>
        <p class="text-gray-400 font-normal">(ex1. 백분위 98 -> 상위 2% -> 100명 중 2등)</p>
        <p class="text-gray-400 font-normal">(ex2. 백분위 32 -> 상위 68% -> 100명 중 68등)</p>
        <p class="text-gray-400 font-normal">(ex3. 백분위 3 -> 상위 97% -> 100명 중 97등)</p>
        <p class="text-[10px] text-gray-400 pl-1 border-l-2 border-gray-200 mt-1">
          * 단, 비만 여부 백분위의 경우 구간별로 서열 없이 같은 백분위를 가집니다.
        </p>
        <p class="text-[12px] font-bold">
          스크롤을 내려 하단으로 가시면 해설과 근거가 자세하게 서술되어 있습니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch, reactive } from 'vue'
import CountUp from '@/components/common/CountUp.vue'

import { getHeightPercentile, percentileToGrade } from '@/utils/heightUtils'
import { getBmiAnalysis } from '@/utils/bmiUtils'
import { calculateEducationPercentileAndGrade } from '@/utils/educationUtils'
import { getSalaryPercentile } from '@/utils/salaryPercentile'
import { getJobPercentileFromSelection } from '@/utils/jobPercentile'
import { percentileForAgeAndAsset } from '@/utils/assetUtils'

// ⏱️ 카운팅 속도 (ms)
const countDuration = 3000

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

const toTopPercent = (score) => {
  if (score == null) return 0
  const top = 100 - score
  return Math.max(0.1, top)
}

// ⚡ Flash State & Trigger Logic
const flashFlags = reactive({
  height: false,
  bmi: false,
  education: false,
  salary: false,
  job: false,
  asset: false,
})

const triggerFlash = (key) => {
  flashFlags[key] = false
  setTimeout(() => {
    flashFlags[key] = true
    // 애니메이션 시간(2s)에 맞춰서 플래그 끄기
    setTimeout(() => {
      flashFlags[key] = false
    }, 2000)
  }, 10)
}

// --- Computed Properties ---
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
  return getSalaryPercentile({ gender: props.gender, age: props.age, incomeKRW: salaryKRW.value })
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

// --- Watchers (Emit & Trigger Flash) ---

watch(heightPercentile, (p) => {
  if (p != null) {
    emit('update-height', { percentile: p })
    triggerFlash('height') // ⚡
  }
})

watch(
  () => bmiAnalysis.value,
  (val) => {
    if (val && val.percentile != null) {
      let graphScore = 100 - val.percentile
      graphScore = Math.max(0, graphScore)
      emit('update-bmi', { percentile: graphScore })
      triggerFlash('bmi') // ⚡
    }
  },
  { deep: true },
)

watch(
  () => educationResult.value?.percentile,
  (p) => {
    if (p != null) {
      emit('update-education', { percentile: p })
      triggerFlash('education') // ⚡
    }
  },
)

watch(salaryPercentile, (p) => {
  if (p != null) {
    emit('update-salary', { percentile: p })
    triggerFlash('salary') // ⚡
  }
})

watch(jobPercentile, (p) => {
  if (p != null) {
    emit('update-job', { percentile: p })
    triggerFlash('job') // ⚡
  }
})

watch(assetPercentile, (p) => {
  if (p != null) {
    emit('update-asset', { percentile: p })
    triggerFlash('asset') // ⚡
  }
})
</script>

<style scoped>
/* ⚡ Flash 애니메이션 */
.animate-flash {
  /* 플래시 지속시간 2초 */
  animation: flash 2s ease-out;
}

@keyframes flash {
  0% {
    background-color: rgba(219, 234, 254, 0.7);
  } /* blue-100 */
  100% {
    background-color: transparent;
  }
}

/* ✅ 체크 아이콘 등장 애니메이션 (Pop) */
.check-pop-enter-active {
  animation: check-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.check-pop-leave-active {
  transition: opacity 0.2s ease;
}
.check-pop-leave-to {
  opacity: 0;
}

@keyframes check-pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
