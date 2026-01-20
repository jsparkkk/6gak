<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-800">서비스 소개</h2>
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

      <div class="px-6 py-6 text-gray-600 text-sm leading-relaxed">
        <p class="mb-4">
          <span
            class="font-semibold underline underline-offset-4 decoration-indigo-500 decoration-2"
          >
            육각형의 남자</span
          >란?
        </p>
        원래는 스포츠 게임에서 선수 능력치를 시각화하던 육각형 그래프에서 유래된 말로, 연애 시장에서
        외모, 학력, 재력 등의 능력치가 어디 하나 모자란 데 없이
        <span class="font-semibold">전부 평균 이상인 남자(여자)</span>를 의미하게 되었습니다. 가장
        선호도가 높은 연애 상대로 취급 받습니다. <br /><br />
        본 웹에서는 <span class="font-semibold">신장, 체중, 학력, 소득, 직업, 자산</span> 총 6가지
        데이터에 대한 통계 서비스를 제공합니다.
        <span class="font-semibold">통계청과 국세청</span>에서 최대한의 데이터를 차용하였으며 학력과
        직업 서열은 입시 사이트와 결혼정보회사 등급표 등을 참고하였습니다. <br /><br />
        <span class="font-semibold"
          >"생각보다 후하다", "생각보다 짜다"라는 생각이 들 수 있습니다.<br />
          하지만 그것이 데이터에 기반한 사실입니다.<br /><br
        /></span>
        하단 "더 알아보기" 코너에 이용자의 백분위에 대한 근거를 충분히 납득 가능하게 서술하였으니 꼭
        읽어보시고 만약 반박하고 싶거나 납득이 불가한 있다면
        <span class="font-semibold">제작자 이메일</span>로 내용을 꼭 보내주세요.<br />
        어떤 내용이라도 환영합니다. 디자인이 별로여도 메일 보내주세요. 더 정교한 서비스를 만들 수
        있도록 조언 많이 보내주세요.
        <div class="bg-gray-100 p-4 rounded-lg text-xs text-gray-500 mt-4">
          데이터 출처: 통계청,국세청통계포털 등<br />
          제작자 이메일: contact@6gak.com
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 flex justify-end">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 부모 컴포넌트(HeaderBar)에게 'close'라는 신호를 보낼 수 있게 설정
const emit = defineEmits(['close'])
</script>

<style scoped>
/* 모달이 뿅 하고 올라오는 애니메이션 */
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
