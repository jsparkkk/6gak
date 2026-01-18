<template>
  <section class="bg-white rounded-xl shadow-sm p-4 space-y-4">
    <!-- 키 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">키 (cm)</label>
      <input
        type="number"
        v-model.number="height"
        placeholder="예: 175"
        min="100"
        max="250"
        class="w-full border px-3 py-2 rounded-md text-sm"
      />
    </div>

    <!-- 몸무게 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">몸무게 (kg)</label>
      <input
        type="number"
        v-model.number="weight"
        placeholder="예: 70"
        min="30"
        max="200"
        class="w-full border px-3 py-2 rounded-md text-sm"
      />
    </div>

    <!-- 학벌 -->
    <!-- 출신 대학 (자동완성, v-model 없이 구현) -->
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700 mb-1">출신 대학</label>
      <input
        type="text"
        :value="university"
        @input="handleUniversityInput"
        @compositionstart="isComposing = true"
        @compositionend="handleCompositionEnd"
        @focus="showSuggestions = true"
        @blur="handleUniversityBlur"
        placeholder="예: 서울대학교"
        autocomplete="off"
        class="w-full border px-3 py-2 rounded-md text-sm"
      />
      <ul
        v-if="showSuggestions && filteredUniversities.length"
        class="absolute z-10 bg-white border mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow text-sm"
      >
        <li
          v-for="(item, index) in filteredUniversities"
          :key="index"
          @mousedown.prevent="selectUniversity(item)"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- 연봉 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">연봉 (만원)</label>
      <input
        type="number"
        v-model.number="salary"
        placeholder="예: 5000"
        min="0"
        class="w-full border px-3 py-2 rounded-md text-sm"
      />
    </div>

    <!-- 직업 (옵션 리스트: jobTiers.json의 모든 직업, 가나다순) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">직업</label>
      <select v-model="selectedJobValue" class="w-full border px-3 py-2 rounded-md text-sm">
        <option value="" disabled>직업을 선택하세요</option>
        <option v-for="opt in jobOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <!-- 필요 시: 작은 도움말 -->
      <p class="mt-1 text-xs text-gray-500">
        * 리스트는 가나다순이며, 본인 직업이 여러직군에 걸쳐 있다면 더 좋아보이는 쪽으로!
      </p>
    </div>
    <!-- 자산 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">총 자산 (만원)</label>
      <input
        type="number"
        v-model.number="asset"
        placeholder="예: 20000"
        min="0"
        class="w-full border px-3 py-2 rounded-md text-sm"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import universityList from '@/assets/data/universityList.json'
import jobTiers from '@/assets/data/jobTiers.json'
import Hangul from 'hangul-js' // ⬅️ hangul-js 불러오기

const emit = defineEmits(['update'])

const height = ref(null)
const weight = ref(null)

const university = ref('')
const showSuggestions = ref(false)
const allUniversities = ref([])
const filteredUniversities = ref([])
const isComposing = ref(false) // 한글 조합 중 여부

const job = ref('')
const salary = ref(null)
const asset = ref(null)

onMounted(() => {
  allUniversities.value = universityList.map((u) => u.name) // name만 추출해서 리스트화
})

// 🔤 검색 필터링 함수
function updateFilteredList(query) {
  const trimmed = query.trim()
  if (!trimmed) {
    filteredUniversities.value = []
    return
  }

  const searcher = new Hangul.Searcher(trimmed, { matchInitial: true })
  filteredUniversities.value = allUniversities.value
    .filter((name) => searcher.search(name) !== -1)
    .sort((a, b) => a.localeCompare(b, 'ko'))
}

// 🔤 일반 input 이벤트 (IME 조합 아닐 때만 처리)
function handleUniversityInput(event) {
  university.value = event.target.value
  const length = university.value.trim().length

  if (!isComposing.value || length >= 1) {
    updateFilteredList(university.value)
    showSuggestions.value = true
  }
}

// 🔤 한글 조합 끝났을 때 처리
function handleCompositionEnd(event) {
  isComposing.value = false
  university.value = event.target.value
  updateFilteredList(university.value)
  showSuggestions.value = true
}

function selectUniversity(name) {
  university.value = name
  showSuggestions.value = false
}

function handleUniversityBlur() {
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}

// 직업 선택 상태
const selectedJobValue = ref('') // "T7__간호사" 같은 내부값
const jobSelected = computed(() => {
  if (!selectedJobValue.value) return null
  const [tier, ...rest] = selectedJobValue.value.split('__')
  const label = rest.join('__') // label에 __ 있을 가능성 방지
  return { tier, label }
})

// jobTiers.json → 평탄화 + 한글 정렬
const jobOptions = computed(() => {
  const flat = jobTiers.flatMap((t) =>
    (t.jobs || []).map((j) => ({
      label: j.name, // 화면에 보일 이름
      tier: t.tier, // T1~T10
      value: `${t.tier}__${j.name}`, // 내부값 (tier+label)
    })),
  )
  // 가나다순 정렬
  return flat.sort((a, b) => a.label.localeCompare(b.label, 'ko'))
})

// 상위로 전체 상태 전달
watch([height, weight, university, selectedJobValue, salary, asset], () => {
  emit('update', {
    height: height.value,
    weight: weight.value,
    university: university.value,
    job: jobSelected.value,
    salary: salary.value,
    asset: asset.value,
    assetKRW: asset.value == null ? null : Math.round(Number(asset.value) * 10000), // 계산 단위(원)
  })
})
</script>
