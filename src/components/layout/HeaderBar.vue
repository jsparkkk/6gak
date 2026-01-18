<template>
  <header class="flex items-center justify-between px-4 py-3 my-0.5 bg-white shadow-md rounded-xl">
    <!-- 좌측: 로고 -->
    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold text-blue-600">Hexagon man</span>
    </div>

    <!-- 중앙: 제목 -->
    <h1 class="text-base font-semibold text-gray-700">육각형의 남자(7의 남자)</h1>

    <!-- 우측: 버튼들 -->
    <div class="flex items-center space-x-2">
      <button @click="onInfo" class="text-gray-500 hover:text-gray-700 text-xl">ℹ️</button>
      <button @click="onShare" class="text-gray-500 hover:text-gray-700 text-xl">🔗</button>
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
    .then(() => alert('링크가 클립보드에 복사되었습니다.'))
    .catch(() => alert('복사에 실패했습니다.'))
}
</script>
