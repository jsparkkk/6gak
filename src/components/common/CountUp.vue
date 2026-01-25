<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  to: { type: [Number, String], required: true }, // 목표 숫자
  duration: { type: Number, default: 1500 }, // 애니메이션 시간 (ms)
  precision: { type: Number, default: 1 }, // 소수점 자리수
})

const current = ref(0)

// 화면에 보여질 값 포맷팅 (소수점 처리)
const displayValue = computed(() => {
  if (props.to === null || props.to === '-' || props.to === undefined) return '-'
  return Number(current.value).toFixed(props.precision)
})

const animate = () => {
  const start = 0
  const end = Number(props.to)

  // 값이 유효하지 않으면 애니메이션 스킵
  if (isNaN(end)) {
    current.value = 0
    return
  }

  const startTime = performance.now()

  const frame = (now) => {
    const progress = Math.min((now - startTime) / props.duration, 1)

    // Easing 함수 (easeOutExpo: 끝부분에서 부드럽게 감속)
    // 1 - Math.pow(2, -10 * progress)
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

    current.value = start + (end - start) * ease

    if (progress < 1) {
      requestAnimationFrame(frame)
    } else {
      current.value = end // 확실하게 끝값 보장
    }
  }

  requestAnimationFrame(frame)
}

// 값이 바뀌거나 컴포넌트가 마운트되면 애니메이션 시작
watch(
  () => props.to,
  () => animate(),
  { immediate: true },
)
</script>
