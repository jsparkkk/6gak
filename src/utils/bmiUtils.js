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

  const bmi = +(weight / (height / 100) ** 2).toFixed(1)

  const matched = BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max)
  if (!matched) return null

  const matchedGroup = weightStats.find((entry) => {
    const [min, max] = entry.ageGroup.split('-').map(Number)
    return entry.gender === gender && age >= min && age <= max
  })

  if (!matchedGroup) return null

  const dist = matchedGroup.distribution
  const total = matchedGroup.total

  const categoriesInOrder = ['정상체중', '비만', '저체중', '고도비만', '초고도비만']
  let cumulative = 0
  let reached = false

  for (const category of categoriesInOrder) {
    if (category === matched.label) reached = true // 나를 만나면 플래그 켜기
    if (reached) cumulative += dist[category] || 0 // 나를 포함해서 뒤에 있는 애들 싹 다 더하기
  }

  const percentile = Math.floor((cumulative / total) * 100)

  return {
    bmi,
    category: matched.label,
    percentile,
    status: matched.status,
    color: matched.color,
  }
}
