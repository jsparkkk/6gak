<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-5">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">성별</label>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="option in genderOptions"
          :key="option.value"
          @click="selectGender(option.value)"
          class="flex items-center justify-center space-x-2 py-2 rounded-xl text-sm transition-all border outline-none"
          :class="
            gender === option.value
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50 text-green-800 font-bold shadow-sm'
              : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
          "
        >
          <span>{{ option.label }}</span>
          <svg
            v-if="gender === option.value"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4 text-green-600"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">나이</label>
      <div class="relative">
        <input
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          v-model.number="age"
          placeholder="예: 30"
          min="10"
          max="99"
          class="w-full border px-3 py-2 rounded-xl text-sm transition-all outline-none"
          :class="
            age
              ? 'border-green-500 ring-1 ring-green-500 bg-green-50'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          "
        />
        <div
          v-if="age"
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

    <div class="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-start gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 text-gray-400 shrink-0 mt-0.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
      <p class="text-xs text-gray-500 leading-relaxed break-keep">
        모든 통계와 분석 결과는 입력하신 <strong>성별과 나이대</strong>에 해당하는 대한민국
        인구끼리의 비교입니다.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update'])

const gender = ref('')
const age = ref(null)

const genderOptions = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
]

function selectGender(value) {
  gender.value = value
}

// 상위(App.vue)로 전달
watch([gender, age], ([g, a]) => {
  emit('update', { gender: g, age: a })
})
</script>

<style scoped>
/* 부드러운 체크 등장 애니메이션 */
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
