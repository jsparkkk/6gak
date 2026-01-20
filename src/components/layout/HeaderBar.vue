<template>
  <header
    class="flex items-center justify-between px-4 py-3 my-1 mx-1 bg-white shadow-sm border-b border-gray-100 rounded-xl"
  >
    <div class="flex items-center gap-2">
      <img src="@/assets/logo.svg" alt="6GAK" class="w-7 h-7" />
      <h1 class="text-lg font-extrabold text-gray-800 tracking-tight leading-none pt-0.5">
        육각형의 남자
      </h1>
    </div>

    <div class="flex items-center gap-1">
      <button
        @click="showModal = true"
        class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </button>

      <button
        @click="onShare"
        class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
        aria-label="링크 공유"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
      </button>
    </div>
  </header>

  <InfoModal v-if="showModal" @close="showModal = false" />
  <Transition name="fade">
    <div
      v-if="showToast"
      class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
    >
      <span>✅ 링크가 복사되었습니다!</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import InfoModal from './InfoModal.vue'

const showModal = ref(false)
const showToast = ref(false) // 토스트 메시지 상태

const onShare = async () => {
  // 1. 모바일: 네이티브 공유 창 띄우기 (Web Share API)
  if (navigator.share) {
    try {
      await navigator.share({
        title: '육각형의 남자',
        text: '대한민국 데이터 기반 내 등급 확인하기',
        url: window.location.href,
      })
      return // 공유 성공시 여기서 끝
    } catch (err) {
      // 사용자가 취소했거나 에러가 나면 아래 복사 로직으로 넘어감 (Fallback)
      console.log('공유 취소됨')
    }
  }

  // 2. PC 또는 지원 안 함: 클립보드 복사 + 토스트 메시지
  copyToClipboard()
}

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      // 토스트 메시지 보여주기
      showToast.value = true
      // 2초 뒤에 사라지게 하기
      setTimeout(() => {
        showToast.value = false
      }, 2000)
    })
    .catch(() => alert('복사에 실패했습니다.')) // 정말 만약의 경우
}
</script>

<style scoped>
/* 토스트 메시지 애니메이션 (부드럽게 사라짐) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
