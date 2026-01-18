<template>
  <header
    class="flex items-center justify-between px-4 py-3 my-1 mx-1 bg-white shadow-sm border-b border-gray-100 rounded-xl sticky top-1 z-50"
  >
    <div class="flex items-center gap-2">
      <img src="@/assets/logo.svg" alt="6GAK" class="w-7 h-7" />
      <h1 class="text-lg font-extrabold text-gray-800 tracking-tight leading-none pt-0.5">
        육각형의 남자
      </h1>
    </div>

    <div class="flex items-center gap-1">
      <button
        @click="onInfo"
        class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
        aria-label="서비스 정보"
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
</template>

<script setup>
const onInfo = () => {
  alert('이 서비스는 통계청 데이터를 기반으로 개인 스펙을 시각화합니다.')
}

const onShare = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert('링크가 클립보드에 복사되었습니다! 친구들에게 공유해보세요.'))
    .catch(() => alert('복사에 실패했습니다.'))
}
</script>
