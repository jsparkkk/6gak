<template>
  <section class="bg-white rounded-xl shadow-sm p-4 space-y-5">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">키 (cm)</label>
      <div class="relative">
        <input
          type="number"
          v-model.number="height"
          placeholder="예: 175"
          min="100"
          max="250"
          class="w-full border px-3 py-2 rounded-xl text-sm transition-all outline-none"
          :class="
            height
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          "
        />
        <div
          v-if="height"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">몸무게 (kg)</label>
      <div class="relative">
        <input
          type="number"
          v-model.number="weight"
          placeholder="예: 70"
          min="30"
          max="200"
          class="w-full border px-3 py-2 rounded-xl text-sm transition-all outline-none"
          :class="
            weight
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          "
        />
        <div
          v-if="weight"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">출신 대학</label>

      <button
        @click="showUniversityModal = true"
        class="w-full border px-3 py-2 rounded-xl text-sm text-left flex justify-between items-center transition-all outline-none"
        :class="
          university
            ? 'border-green-500 ring-1 ring-green-500 bg-green-50 text-gray-900 font-semibold'
            : 'bg-white border-gray-300 text-gray-400'
        "
      >
        <span class="truncate">{{ university || '대학을 선택하세요' }}</span>

        <svg
          v-if="university"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 text-green-500"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-gray-400 shrink-0"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">연봉 (만원)</label>
      <div class="relative">
        <input
          type="number"
          v-model.number="salary"
          placeholder="예: 5000"
          min="0"
          class="w-full border px-3 py-2 rounded-xl text-sm transition-all outline-none"
          :class="
            salary
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          "
        />
        <div
          v-if="salary"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">직업</label>

      <button
        @click="showJobModal = true"
        class="w-full border px-3 py-2 rounded-xl text-sm text-left flex justify-between items-center transition-all outline-none"
        :class="
          jobName
            ? 'border-green-500 ring-1 ring-green-500 bg-green-50 text-gray-900 font-semibold'
            : 'bg-white border-gray-300 text-gray-400'
        "
      >
        <span class="truncate">{{ jobName || '직업을 선택하세요' }}</span>

        <svg
          v-if="jobName"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 text-green-500"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-gray-400 shrink-0"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <p class="mt-1 text-xs text-gray-500">
        * 리스트는 가나다순이며, 본인 직업이 여러직군에 걸쳐 있다면 더 좋아보이는 쪽으로!
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">총 자산 (만원)</label>
      <div class="relative">
        <input
          type="number"
          v-model.number="asset"
          placeholder="예: 20000"
          min="0"
          class="w-full border px-3 py-2 rounded-xl text-sm transition-all outline-none"
          :class="
            asset
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          "
        />
        <div
          v-if="asset"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <JobSelectModal
      v-if="showJobModal"
      :selectedJob="jobName"
      @update:job="onJobSelect"
      @close="showJobModal = false"
    />

    <UniversitySelectModal
      v-if="showUniversityModal"
      :selectedName="university"
      @update:university="onUniversitySelect"
      @close="showUniversityModal = false"
    />
  </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import jobTiers from '@/assets/data/jobTiers.json'
import JobSelectModal from './JobSelectModal.vue'
import UniversitySelectModal from './UniversitySelectModal.vue'

const emit = defineEmits(['update'])

// --- 상태 변수들 ---
const height = ref(null)
const weight = ref(null)
const university = ref('')
const salary = ref(null)
const asset = ref(null)

const showJobModal = ref(false)
const showUniversityModal = ref(false)

const jobName = ref('')

// --- 대학교 선택 ---
const onUniversitySelect = (name) => {
  university.value = name
}

// --- 직업 선택 ---
const onJobSelect = (name) => {
  jobName.value = name
}

const jobSelected = computed(() => {
  if (!jobName.value) return null
  let foundTier = ''
  for (const group of jobTiers) {
    const found = group.jobs.find((j) => j.name === jobName.value)
    if (found) {
      foundTier = group.tier
      break
    }
  }
  return { label: jobName.value, tier: foundTier }
})

// --- 데이터 업데이트 감지 ---
watch([height, weight, university, jobSelected, salary, asset], () => {
  emit('update', {
    height: height.value,
    weight: weight.value,
    university: university.value,
    job: jobSelected.value,
    salary: salary.value,
    asset: asset.value,
    assetKRW: asset.value == null ? null : Math.round(Number(asset.value) * 10000),
  })
})
</script>

<style scoped>
/* 아이콘이 뿅! 하고 나타나는 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}
.animate-fade-in {
  animation: fadeIn 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
}
</style>
