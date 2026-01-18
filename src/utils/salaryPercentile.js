// src/utils/salaryPercentile.js
// 연봉 → 퍼센타일 (공식 통계 기준, 하위누적 0~100)
// 데이터: src/assets/data/salaryStats.json

// [ADD] 프로젝트 컨벤션: salaryStats.json 사용
import dataset from '@/assets/data/salaryStats.json'

/**
 * 입력된 성별/나이/연봉(원)으로 하위누적 퍼센타일(0~100, 소수 둘째자리)을 계산.
 * @param {"남"|"여"|"male"|"female"|"m"|"f"} gender
 * @param {number} age - 실수/정수 OK (20세 미만→20s, 70세 이상→60s로 클램프)
 * @param {number} incomeKRW - 연봉(원, 정수 권장)
 * @param {object} data - (옵션) 외부 데이터 주입용
 */
export function getSalaryPercentile({ gender, age, incomeKRW, data = dataset }) {
  // 1. 데이터가 아예 없는 경우 방어
  if (!data || !data.cohorts) return undefined

  const key = cohortKeyFrom(gender, age)
  if (!key) return undefined

  // 2. 해당 키(예: 'male_30s')가 데이터에 없는 경우 방어
  const cohortData = data.cohorts[key]
  if (!cohortData || !cohortData.anchors) return undefined

  const anchors = cohortData.anchors
  if (!Array.isArray(anchors) || anchors.length === 0) return undefined

  const mono = enforceMonotonicByIncome(anchors)
  const p = interpolatePercentileLogIncome(incomeKRW, mono)
  return round2(p)
}

export function getSalaryPercentileWithMeta({ gender, age, incomeKRW, data = dataset }) {
  const percentile = getSalaryPercentile({ gender, age, incomeKRW, data })
  return {
    percentile,
    year: data?.year,
    percentile_type: data?.percentile_type, // "lower_cumulative"
    ft_min: data?.ft_min,
  }
}

// ---------- helpers ----------
function normGender(g) {
  if (!g) return null
  const s = String(g).trim().toLowerCase()
  if (['남', '남성', 'm', 'male'].includes(s)) return 'male'
  if (['여', '여성', 'f', 'female'].includes(s)) return 'female'
  return null
}

function decadeFromAge(age) {
  const a = Number.isFinite(age) ? Math.floor(age) : NaN
  if (!Number.isFinite(a)) return '20s'
  if (a < 20) return '20s'
  if (a >= 70) return '60s'
  if (a < 30) return '20s'
  if (a < 40) return '30s'
  if (a < 50) return '40s'
  if (a < 60) return '50s'
  return '60s'
}

function cohortKeyFrom(gender, age) {
  const g = normGender(gender)
  if (!g) return null
  const d = decadeFromAge(age)
  return `${g}_${d}` // e.g., "male_40s"
}

function interpolatePercentileLogIncome(incomeKRW, anchors) {
  if (!Array.isArray(anchors) || anchors.length === 0) return undefined
  const arr = anchors
    .filter((x) => Number.isFinite(x?.income) && Number.isFinite(x?.p))
    .slice()
    .sort((a, b) => a.income - b.income)

  if (incomeKRW <= arr[0].income) return clamp01_100(arr[0].p)
  if (incomeKRW >= arr[arr.length - 1].income) return clamp01_100(arr[arr.length - 1].p)

  // 이진탐색
  let lo = 0,
    hi = arr.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    incomeKRW < arr[mid].income ? (hi = mid) : (lo = mid)
  }

  const a = arr[lo],
    b = arr[hi]
  const x = Math.log(incomeKRW),
    x0 = Math.log(a.income),
    x1 = Math.log(b.income)
  const t = (x - x0) / (x1 - x0)
  return clamp01_100(a.p + t * (b.p - a.p))
}

function enforceMonotonicByIncome(anchors) {
  if (!anchors || anchors.length < 2) return anchors || []
  const arr = anchors.slice().sort((a, b) => a.income - b.income)
  let maxP = -Infinity
  for (const it of arr) {
    if (it.p < maxP) it.p = maxP
    maxP = it.p
  }
  return arr
}

function clamp01_100(p) {
  if (!Number.isFinite(p)) return undefined
  return Math.min(100, Math.max(0, p))
}
function round2(v) {
  if (!Number.isFinite(v)) return v
  return Math.round(v * 100) / 100
}

// (옵션) FT_min
export function getFullTimeMinimum() {
  return dataset?.ft_min ?? undefined
}
