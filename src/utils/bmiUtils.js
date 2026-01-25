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

  // 1. 내 BMI 계산
  const bmi = +(weight / (height / 100) ** 2).toFixed(1)

  // 2. 내 카테고리 찾기
  const matched = BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max)
  if (!matched) return null

  // 3. 통계 그룹 찾기
  const matchedGroup = weightStats.find((entry) => {
    // "20-24" 같은 문자열 파싱
    if (entry.ageGroup === '65-69' && age >= 65) return entry.gender === gender
    const [min, max] = entry.ageGroup.split('-').map(Number)
    return entry.gender === gender && age >= min && age <= max
  })

  // 매칭되는 통계가 없으면(방어코드) 기본값 반환
  if (!matchedGroup) {
    return {
      bmi,
      category: matched.label,
      percentile: 50,
      status: matched.status,
      color: matched.color,
      score: 50,
    }
  }

  const dist = matchedGroup.distribution
  const total = matchedGroup.total

  // 4. 🔥 [핵심 수정] 건강한 순서대로 누적 (1등부터 나까지 더하기)
  // 순서: 정상 -> 저체중 -> 비만 -> 고도 -> 초고도 (원하시는 서열로 조정 가능)
  const categoriesInOrder = ['정상체중', '저체중', '비만', '고도비만', '초고도비만']

  let cumulative = 0

  for (const category of categoriesInOrder) {
    // 일단 순서대로 인구수를 더함
    cumulative += dist[category] || 0

    // 만약 이번에 더한 게 '나'라면? 여기서 멈춤! (Break)
    // 예: 정상이면 (정상 인구)에서 멈춤 -> 상위 20%
    // 예: 비만이면 (정상 + 저체중 + 비만)에서 멈춤 -> 상위 70%
    if (category === matched.label) {
      break
    }
  }

  // 5. 백분위 계산
  const percentile = (cumulative / total) * 100

  // 6. 📊 차트용 점수 (Score) 추가
  // (GradeDisplay에서 차트 그릴 때 필요함)
  let score = 10
  if (matched.label === '정상체중') score = 95
  else if (matched.label === '저체중') score = 70
  else if (matched.label === '비만') score = 60
  else if (matched.label === '고도비만') score = 30
  else score = 10

  return {
    bmi,
    category: matched.label,
    percentile, // 화면 표시용: 누적 비율 (예: 20.5)
    score, // 차트용: 점수 (예: 95)
    status: matched.status,
    color: matched.color,
  }
}
