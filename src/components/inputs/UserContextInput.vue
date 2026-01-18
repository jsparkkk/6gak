<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-4">
    <!-- 성별 선택 -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">성별</label>
      <div class="flex space-x-3">
        <button
          v-for="option in genderOptions"
          :key="option.value"
          @click="selectGender(option.value)"
          :class="[
            'px-4 py-2 rounded-full text-sm',
            gender === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- 나이 입력 -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">나이</label>
      <input
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
        v-model.number="age"
        placeholder="예: 25"
        min="10"
        max="99"
        class="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
      />
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
