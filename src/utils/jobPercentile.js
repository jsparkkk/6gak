// src/utils/jobPercentile.js
import jobTiers from '@/assets/data/jobTiers.json'

// 누적 하위% → 상위% (점수형)로 변환하는 유틸
// - 기존 jobTiers.json의 percentile/cumulative는 "하위 누적%"로 기록되어 있음
// - 우리가 원하는 출력: 상위일수록 큰 값 => upper = 100 - lower
const TOTAL = jobTiers[jobTiers.length - 1]?.cumulative ?? 0

const tierToLowerPct = {} // 하위 누적%
const tierToUpperPct = {} // 상위(점수형)%

const labelToTier = new Map()

for (const t of jobTiers) {
  // 1) 해당 티어의 "하위 누적%" 계산
  const lower =
    typeof t.percentile === 'number' ? t.percentile : TOTAL > 0 ? (t.cumulative / TOTAL) * 100 : 100

  // 2) 우리가 화면에 보여줄 값 = 상위% (점수처럼 클수록 상위)
  const upper = clamp(100 - lower, 0, 100)

  tierToLowerPct[t.tier] = Number(lower)
  tierToUpperPct[t.tier] = Number(upper)

  // 라벨 → 티어 매핑
  if (Array.isArray(t.jobs)) {
    for (const j of t.jobs) {
      if (!j?.name) continue
      labelToTier.set(j.name, t.tier)
      labelToTier.set(normalize(j.name), t.tier)
    }
  }
}

function clamp(x, min, max) {
  return Math.min(max, Math.max(min, x))
}
function normalize(s) {
  return String(s)
    .replace(/\(.*?\)/g, '') // 괄호 설명 제거
    .replace(/\s+/g, '') // 공백 제거
    .toLowerCase()
}

// ✅ 화면에 쓸 "상위%" 반환 (없으면 T10=0으로 폴백 → 화면에서 Math.max(1, …) 처리)
export function getJobPercentileByTier(tier) {
  return tierToUpperPct[tier] ?? tierToUpperPct['T10'] ?? 0
}

export function getJobPercentileByLabel(label) {
  if (!label) return tierToUpperPct['T10'] ?? 0
  const t = labelToTier.get(label) || labelToTier.get(normalize(label))
  return getJobPercentileByTier(t)
}

export function getJobPercentileFromSelection(sel) {
  if (!sel) return tierToUpperPct['T10'] ?? 0
  return sel.tier ? getJobPercentileByTier(sel.tier) : getJobPercentileByLabel(sel.label)
}

// (옵션) 하위 누적%가 필요할 때 쓸 수 있도록 보존
export function getJobLowerPercentileByTier(tier) {
  return tierToLowerPct[tier] ?? 100
}
