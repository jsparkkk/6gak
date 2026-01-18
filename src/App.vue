<template>
  <div class="min-h-screen flex justify-center bg-gray-100 px-4">
    <main class="w-full max-w-[600px] py-8">
      <HeaderBar />

      <!-- 성별, 나이 입력 -->
      <UserContextInput @update="handleUserContext" />

      <!-- 키, 체형, 학력, 소득, 자산, 직업 입력 -->
      <AbilityTable @update="handleAbilityUpdate" />

      <!-- 수능식 등급 표시 -->
      <GradeDisplay
        :ability="abilityData"
        :gender="userInfo.gender"
        :age="userInfo.age"
        @update-height="onUpdateHeight"
        @update-bmi="onUpdateBmi"
        @update-education="onUpdateEducation"
        @update-salary="onUpdateSalary"
        @update-job="onUpdateJob"
        @update-asset="onUpdateAsset"
      />

      <!-- 6각 레이더 차트 -->
      <ScoreRadar
        :percentiles="{
          height: percentiles.height,
          bmi: percentiles.bmi,
          education: percentiles.education,
          salary: percentiles.salary,
          job: percentiles.job,
          assets: percentiles.assets,
        }"
      />

      <Explanation :userInfo="userInfo" :ability="abilityData" :percentile="percentiles" />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from './components/layout/HeaderBar.vue'
import UserContextInput from './components/inputs/UserContextInput.vue'
import AbilityTable from './components/inputs/AbilityTable.vue'
import GradeDisplay from './components/display/GradeDisplay.vue'
import ScoreRadar from './components/display/ScoreRadar.vue'
import Explanation from './components/display/Explanation.vue'
import { ref, computed, reactive } from 'vue'

const userInfo = reactive({
  gender: '',
  age: null,
})

function handleUserContext({ gender, age }) {
  userInfo.gender = gender
  userInfo.age = age
}

const abilityData = reactive({
  height: null,
  weight: null,
  university: '',
  job: '',
  salary: null,
  asset: null,
})

function handleAbilityUpdate(data) {
  abilityData.height = data.height
  abilityData.weight = data.weight
  abilityData.university = data.university
  abilityData.job = data.job
  abilityData.salary = data.salary
  abilityData.asset = data.asset
}

const percentiles = reactive({
  height: null,
  bmi: null,
  education: '',
  job: '',
  salary: null,
  assets: null,
})
function onUpdateHeight(v) {
  percentiles.height = +Number(v.percentile).toFixed(1)
}
function onUpdateBmi(v) {
  percentiles.bmi = +Number(v.percentile).toFixed(1)
}
function onUpdateEducation(v) {
  percentiles.education = +Number(v.percentile).toFixed(1)
}
function onUpdateSalary(v) {
  percentiles.salary = +Number(v.percentile).toFixed(1)
}
function onUpdateJob(v) {
  percentiles.job = +Number(v.percentile).toFixed(1)
}
function onUpdateAsset(v) {
  percentiles.assets = +Number(v.percentile).toFixed(1)
}

const gradeData = reactive({
  height: null,
  weight: null,
  university: '',
  job: '',
  salary: null,
  asset: null,
})
</script>
