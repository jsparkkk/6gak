<template>
  <section class="bg-white rounded-xl shadow-sm p-4 space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">키 (cm)</label>
      <input
        type="number"
        v-model.number="height"
        placeholder="예: 175"
        min="100"
        max="250"
        class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">몸무게 (kg)</label>
      <input
        type="number"
        v-model.number="weight"
        placeholder="예: 70"
        min="30"
        max="200"
        class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">출신 대학</label>

      <button
        @click="showUniversityModal = true"
        class="w-full border px-3 py-2 rounded-md text-sm bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="university ? 'text-gray-900' : 'text-gray-400'"
      >
        <span class="truncate">{{ university || '대학을 선택하세요' }}</span>

        <svg
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
      <input
        type="number"
        v-model.number="salary"
        placeholder="예: 5000"
        min="0"
        class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">직업</label>

      <button
        @click="showJobModal = true"
        class="w-full border px-3 py-2 rounded-md text-sm bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="jobName ? 'text-gray-900' : 'text-gray-400'"
      >
        <span class="truncate">{{ jobName || '직업을 선택하세요' }}</span>

        <svg
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
      <input
        type="number"
        v-model.number="asset"
        placeholder="예: 20000"
        min="0"
        class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
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
import UniversitySelectModal from './UniversitySelectModal.vue' // ✅ Import 추가

const emit = defineEmits(['update'])

// --- 상태 변수들 ---
const height = ref(null)
const weight = ref(null)
const university = ref('') // 선택된 대학 이름
const salary = ref(null)
const asset = ref(null)

// 모달 표시 여부
const showJobModal = ref(false)
const showUniversityModal = ref(false) // ✅ 추가

// 직업 관련
const jobName = ref('')

// --- 대학교 선택 로직 (모달에서 선택 시 실행) ---
const onUniversitySelect = (name) => {
  university.value = name
}

// --- 직업 선택 로직 ---
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
