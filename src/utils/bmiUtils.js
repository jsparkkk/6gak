import weightStats from '@/assets/data/weightStats.json'

const BMI_CATEGORIES = [
  { label: '저체중', min: 0, max: 18.5, status: 'Pass', color: 'orange' },
  { label: '정상체중', min: 18.5, max: 25, status: 'Pass', color: 'green' },
  { label: '비만', min: 25, max: 30, status: 'Pass', color: 'orange' },
  { label: '고도비만', min: 30, max: 35, status: 'Fail', color: 'red' },
  { label: '초고도비만', min: 35, max: Infinity, status: 'Fail', color: 'red' },
]

export function getBmiAnalysis({ gender, age, height, weight }) {
  if (!gender || !age || !height || !weight) return null

  // 1. BMI 계산
  const bmi = +(weight / (height / 100) ** 2).toFixed(1)

  // 2. 카테고리 판별
  const matched = BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max)
  if (!matched) return null

  // 3. 통계 데이터 찾기
  const matchedGroup = weightStats.find((entry) => {
    if (entry.ageGroup === '65-69' && age >= 65) return entry.gender === gender
    const [min, max] = entry.ageGroup.split('-').map(Number)
    return entry.gender === gender && age >= min && age <= max
  })

  // 데이터 없으면 기본값 리턴
  if (!matchedGroup) {
    return {
      bmi,
      category: matched.label,
      percentile: 50,
      score: 50,
      status: matched.status,
      color: matched.color,
    }
  }

  const dist = matchedGroup.distribution
  const total = matchedGroup.total

  // 4. 🔥 [핵심 수정] "나보다 안 좋은 상태"부터 누적 (Bottom-Up)
  // 순서: 안좋음 -> 좋음 (이 순서대로 더해야 정상이 100이 됨)
  // 서열: 초고도 < 고도 < 비만 < 저체중 < 정상
  const categoriesFromWorst = ['초고도비만', '고도비만', '비만', '저체중', '정상체중']

  let cumulative = 0

  for (const category of categoriesFromWorst) {
    // 해당 구간 인구 더하기
    cumulative += dist[category] || 0

    // 만약 더한 게 '나'라면? 여기서 멈춤!
    // 예: 정상이면 끝까지 다 더해서 100%가 됨
    // 예: 초고도비만이면 자기 자신만 더하고 멈춰서 아주 낮은 점수가 됨
    if (category === matched.label) {
      break
    }
  }

  // 5. 백분위(점수) 계산 (0 ~ 100)
  const percentile = Math.floor((cumulative / total) * 100)

  return {
    bmi,
    category: matched.label,
    percentile, // 화면 표시용 (100, 80, 50...)
    score: percentile, // 차트용 (100이면 꽉 참)
    status: matched.status,
    color: matched.color,
  }
}
