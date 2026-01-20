<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[80vh]"
    >
      <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
        <h2 class="text-lg font-bold text-gray-800">출신 대학 선택</h2>
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
          placeholder="대학교 검색 (초성 가능)"
          class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div class="overflow-y-auto p-2">
        <ul class="space-y-1">
          <li v-for="uni in filteredList" :key="uni.name">
            <button
              @click="selectUniversity(uni.name)"
              class="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between group"
              :class="
                selectedName === uni.name
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              "
            >
              <span class="text-sm break-keep">{{ uni.name }}</span>
              <span v-if="selectedName === uni.name" class="text-indigo-600 text-lg">✔</span>
            </button>
          </li>

          <li v-if="filteredList.length === 0" class="text-center py-8 text-gray-400 text-sm">
            검색 결과가 없습니다.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import rawData from '@/assets/data/universityList.json'
import Hangul from 'hangul-js'

const props = defineProps({
  selectedName: String,
})

const emit = defineEmits(['close', 'update:university'])

const searchQuery = ref('')

// 데이터 준비 (이름순 정렬)
const allUniversities = rawData.sort((a, b) => a.name.localeCompare(b.name, 'ko'))

// 입력 핸들러
const onSearchInput = (event) => {
  searchQuery.value = event.target.value
}

// 검색 필터링 (초성 검색 지원)
const filteredList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return allUniversities

  const searcher = new Hangul.Searcher(query, { matchInitial: true })

  return allUniversities.filter((uni) => searcher.search(uni.name) !== -1)
})

const selectUniversity = (name) => {
  emit('update:university', name)
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
