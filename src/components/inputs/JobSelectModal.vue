<template>
  <div
    class="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/50 px-4"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[70vh] md:max-h-[80vh]"
    >
      <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
        <h2 class="text-lg font-bold text-gray-800">직업 선택</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="px-5 py-2 shrink-0">
        <input
          :value="searchQuery"
          @input="onSearchInput"
          type="text"
          placeholder="직업명 검색 (초성 가능)"
          class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div class="overflow-y-auto p-2">
        <ul class="space-y-1">
          <li v-for="job in filteredJobs" :key="job">
            <button
              @click="selectJob(job)"
              class="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between group"
              :class="
                selectedJob === job
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <span class="text-sm break-keep">{{ job }}</span>
              <span v-if="selectedJob === job" class="text-indigo-600 text-lg">✔</span>
            </button>
          </li>

          <li v-if="filteredJobs.length === 0" class="text-center py-8 text-gray-400 text-sm">
            검색 결과가 없습니다.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import rawData from '@/assets/data/jobTiers.json'
import Hangul from 'hangul-js' // ✅ hangul-js 적용 (초성검색 지원)

const props = defineProps({
  selectedJob: String,
})

const emit = defineEmits(['close', 'update:job'])

const searchQuery = ref('')

// 데이터 가공 (이름만 뽑아서 가나다순 정렬)
const allJobs = rawData
  .flatMap((tier) => tier.jobs.map((job) => job.name))
  .sort((a, b) => a.localeCompare(b))

// 🔥 핵심 함수: 입력 즉시 변수에 반영
const onSearchInput = (event) => {
  searchQuery.value = event.target.value
}

// 검색 필터링 (hangul-js 사용)
const filteredJobs = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return allJobs

  // 1. 일반 includes 검색 (빠른 처리)
  // 2. Hangul.Searcher 사용 (초성 검색 및 한글 조합 검색 최적화)
  const searcher = new Hangul.Searcher(query, { matchInitial: true })

  return allJobs.filter((job) => searcher.search(job) !== -1)
})

const selectJob = (job) => {
  emit('update:job', job)
  emit('close')
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out forwards;
}
</style>
