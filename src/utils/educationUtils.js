import universityGrades from '@/assets/data/universityGrades.json'
import educationStats from '@/assets/data/educationStats.json'

// 수능 등급 변환 기준
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

// 기준 세대: 20-24세
const BASE_AGE_KEY = '20-24'
const BASE_TOTAL_POPULATION = educationStats[BASE_AGE_KEY].total
const BASE_UNIVERSITY_GRADUATES = educationStats[BASE_AGE_KEY].university
const BASE_GRADUATION_RATE = BASE_UNIVERSITY_GRADUATES / BASE_TOTAL_POPULATION

export function calculateEducationPercentileAndGrade(age, universityName) {
  const ageNum = Number(age)
  const base = Math.floor(ageNum / 5) * 5
  const clamped = Math.min(Math.max(base, 20), 60)
  const ageKey = `${clamped}-${clamped + 4}`

  const ageStats = educationStats[ageKey] ?? {
    total: 0,
    university: 0,
    juniorCollege: 0,
  }

  const totalPopulation = ageStats.total
  const universityGraduates = ageStats.university
  const juniorCollegeGraduates = ageStats.juniorCollege

  if (!universityName || !totalPopulation) {
    console.log(universityName, totalPopulation)
    return {
      percentile: 100.0,
      grade: 9,
    }
  }

  // 🎯 대학 등급 판별
  let selectedGrade = null
  for (const group of universityGrades) {
    for (const uni of group.universities) {
      if (uni.name === universityName) {
        selectedGrade = group.grade
        break
      }
    }
    if (selectedGrade !== null) break
  }

  if (selectedGrade === null) {
    return {
      percentile: 100.0,
      grade: 9,
    }
  }

  // 🎯 estimatedPercentile 계산
  let estimatedPercentile

  if (selectedGrade === 32) {
    // grade 32는 고정값으로 처리
    estimatedPercentile = 75
  } else {
    // 정원 누계 계산
    let totalCapacity = 0
    for (const group of universityGrades) {
      if (group.grade <= selectedGrade) {
        for (const uni of group.universities) {
          totalCapacity += uni.capacity
        }
      }
    }

    const estimatedGraduates = totalCapacity * 5

    // 상한 인구 설정
    const capGraduates =
      selectedGrade >= 31 ? universityGraduates + juniorCollegeGraduates : universityGraduates

    // 상한 적용
    const cappedGraduates = Math.min(estimatedGraduates, capGraduates)

    // 기준세대 인구 기준으로 계산
    estimatedPercentile = (cappedGraduates / BASE_TOTAL_POPULATION) * 100
  }

  // 🎯 보정 계수
  const graduationBase = universityGraduates

  const graduationRate = graduationBase / totalPopulation
  const adjustmentFactor = graduationRate / BASE_GRADUATION_RATE

  // 🎯 최종 백분위 계산
  const finalPercentile = 100 - estimatedPercentile * adjustmentFactor

  return {
    percentile: Number(finalPercentile.toFixed(1)),
    grade: percentileToGrade(finalPercentile),
  }
}
