import heightStats from '@/assets/data/heightStats.json'

/**
 * 해당 성별(gender)과 나이(age)에 맞는 통계(mean, stdDev) 데이터를 찾아줍니다.
 */
export function getHeightStats(gender, age) {
  const data = heightStats[gender]
  if (!data) return null

  const ageGroups = Object.keys(data)
  const match = ageGroups.find((group) => {
    const [min, max] = group.split('-').map(Number)
    return age >= min && age <= max
  })

  // 못 찾으면 기본값 (20-24세 사용)
  return data[match || '20-24']
}

/**
 * 사용자 키에 해당하는 백분위를 계산합니다.
 * (정규분포 기반 계산, 소수점 첫째자리까지 반올림)
 */
export function getHeightPercentile(height, gender, age) {
  const stats = getHeightStats(gender, age)
  if (!stats) return 0

  const { mean, stdDev } = stats
  const z = (height - mean) / stdDev
  const percentile = normalCDF(z) * 100
  return +percentile.toFixed(1)
}

/**
 * 백분위 점수를 등급으로 변환합니다 (1~9등급)
 */
export function percentileToGrade(percentile) {
  if (percentile >= 96) return 1
  if (percentile >= 89) return 2
  if (percentile >= 77) return 3
  if (percentile >= 62) return 4
  if (percentile >= 40) return 5
  if (percentile >= 23) return 6
  if (percentile >= 11) return 7
  if (percentile >= 4) return 8
  return 9
}

// ===== 내부 수학 함수 =====

function normalCDF(z) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)))
}

function erf(x) {
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x)

  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911

  const t = 1 / (1 + p * x)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return sign * y
}
