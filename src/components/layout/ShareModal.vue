<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden p-6 animate-fade-in-up"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-bold text-gray-800">친구에게 공유하기</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
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

      <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <span class="text-gray-500 text-lg">🔗</span>
        <input
          type="text"
          :value="currentUrl"
          readonly
          class="bg-transparent text-sm text-gray-600 w-full focus:outline-none truncate font-mono"
        />
      </div>

      <button
        @click="copyLink"
        class="w-full py-3 rounded-xl font-bold transition-all duration-200 flex justify-center items-center gap-2"
        :class="
          isCopied
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        "
      >
        <span v-if="isCopied">✅ 복사되었습니다!</span>
        <span v-else>링크 복사하기</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

// 현재 주소 가져오기
const currentUrl = window.location.href
// 복사 완료 상태 (버튼 색깔 바꾸기용)
const isCopied = ref(false)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl)
    // 복사 성공 시 상태 변경
    isCopied.value = true

    // 1.5초 뒤에 자동으로 창 닫기 (센스 있는 기능)
    setTimeout(() => {
      emit('close')
      isCopied.value = false // 상태 초기화
    }, 1500)
  } catch (err) {
    alert('복사에 실패했습니다.')
  }
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
