<!-- src/components/Explanation.vue -->
<template>
  <section class="bg-white rounded-xl shadow-sm p-4 mb-4">
    <header class="flex items-center justify-between mb-3">
      <h2 class="text-sm font-semibold text-gray-800">해설</h2>
      <div class="text-[11px] text-gray-500">
        성별: <span class="font-medium">{{ gender }}</span>
        <span class="mx-1">·</span>
        기준연령: <span class="font-medium">{{ ageBin }}세</span>
      </div>
    </header>

    <div class="grid grid-cols-1 gap-3">
      <!-- 1) 키 -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">키</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Height
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ height }} cm</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ heightPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ heightP50 != null ? `${heightP50} cm` : '—' }}
            </dd>
          </div>
        </dl>

        <!-- ⬇️ 이 부분에 '키' 전용 문구를 자유롭게 작성하세요 -->
        <!-- <p class="mt-2 text-[12px] text-gray-700">키 해설 커스텀 문장...</p> -->

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">국민건강보험공단, 건강검진통계표(2024)</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openHeight()"
          >
            더 알아보기
          </button>
          <button
            v-if="heightMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(heightMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>
      <!-- 2) BMI -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">체형(BMI)</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Body Mass Index
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ bmi }} kg</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ bmiPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 정상체중 인구 비율</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ bmiP50 != null ? `${bmiP50} %` : '—' }}
            </dd>
          </div>
        </dl>

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">—</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openBmi()"
          >
            더 알아보기
          </button>
          <button
            v-if="bmiMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(bmiMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>

      <!-- 3) 학력 -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">학력</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Education
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ education }}</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ educationPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ educationP50 != null ? educationP50 : '—' }}
            </dd>
          </div>
        </dl>

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">—</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openEducation()"
          >
            더 알아보기
          </button>
          <button
            v-if="educationMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(educationMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>

      <!-- 4) 연봉 -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">연봉</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Salary
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ salary }} 만원</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ salaryPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ salaryP50 != null ? `${(salaryP50 / 10000).toFixed(0)} 만원` : '—' }}
            </dd>
          </div>
        </dl>

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">—</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openSalary()"
          >
            더 알아보기
          </button>
          <button
            v-if="salaryMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(salaryMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>

      <!-- 5) 직업 -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">직업</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Job Tier
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ job }}</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ Math.max(1, Math.floor(jobPct)) }} %
            </dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ jobP50 != null ? jobP50 : '—' }}
            </dd>
          </div>
        </dl>

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">—</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openJob()"
          >
            더 알아보기
          </button>
          <button
            v-if="jobMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(jobMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>

      <!-- 6) 자산 -->
      <article class="border border-gray-100 rounded-lg p-3 hover:shadow-xs transition">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-700">자산</h3>
          <span
            class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
          >
            Assets
          </span>
        </div>

        <dl class="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ assets }} 원</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ assetsPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ assetsP50 != null ? `${(assetsP50 / 10000).toFixed(0)} 만원` : '—' }}
            </dd>
          </div>
        </dl>

        <p class="mt-2 text-[11px] text-gray-500 leading-snug">
          출처: <span class="text-gray-600">—</span>
        </p>

        <div class="mt-3 flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openAssets()"
          >
            더 알아보기
          </button>
          <button
            v-if="assetsMoreLink"
            type="button"
            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
            @click="openExternal(assetsMoreLink)"
          >
            상세 페이지
          </button>
        </div>
      </article>
    </div>
  </section>

  <!-- Height 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isHeightOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeHeight"></div>

      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">키</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeHeight"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ height }} cm</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ heightPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ heightP50 != null ? `${heightP50} cm` : '—' }}
            </dd>
          </div>
        </dl>

        <section class="mt-4">
          <div class="prose prose-sm max-w-none text-gray-800">
            <div>
              {{ ageBin }}세 {{ gender === 'male' ? '남성' : '여성' }} 100명을 키 순서대로 줄
              세웠을때 당신은 앞에서
              <b class="text-blue-600">{{ Math.max(1, heightRank) }}번째</b> 정도에 서 있습니다.
            </div>
            <br />
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div class="relative w-full">
                <svg
                  :viewBox="`0 0 ${graphData.svgWidth} ${graphData.svgHeight}`"
                  class="w-full h-auto overflow-visible"
                >
                  <path :d="graphData.path" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1" />

                  <line
                    :x1="graphData.meanX"
                    y1="0"
                    :x2="graphData.meanX"
                    :y2="graphData.svgHeight - 20"
                    stroke="#6B7280"
                    stroke-width="1"
                    stroke-dasharray="4 2"
                  />
                  <text
                    :x="graphData.meanX"
                    :y="graphData.svgHeight - 5"
                    font-size="10"
                    fill="#6B7280"
                    text-anchor="middle"
                  >
                    평균({{ graphData.meanValue }}cm)
                  </text>

                  <line
                    :x1="graphData.userX"
                    y1="0"
                    :x2="graphData.userX"
                    :y2="graphData.svgHeight - 20"
                    stroke="#DC2626"
                    stroke-width="2"
                  />

                  <g>
                    <rect
                      :x="graphData.userX - 18"
                      :y="-12"
                      width="36"
                      height="16"
                      rx="4"
                      fill="#DC2626"
                    />
                    <text
                      :x="graphData.userX"
                      :y="-1"
                      font-size="10"
                      font-weight="bold"
                      fill="white"
                      text-anchor="middle"
                    >
                      나
                    </text>
                    <path
                      :d="`M ${graphData.userX},4 L ${graphData.userX - 4},4 L ${graphData.userX},10 L ${graphData.userX + 4},4 Z`"
                      fill="#DC2626"
                    />
                  </g>
                </svg>

                <div class="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                  <span>{{ graphData.minX }}cm</span>
                  <span>{{ graphData.maxX }}cm</span>
                </div>
              </div>

              <p class="mt-3 text-xs text-center text-gray-500">
                * 그래프의 봉우리(가운데)가 평균이며,<br />
                가장자리에 있을수록(곡선이 낮을수록) 드문 키입니다.
              </p>
            </div>
            <br />
            <div>
              국민건강보험공단에서는 매년 건강검진 결과를 수집하여 건강검진통계표를 통해 신장 조사
              결과를 발표합니다.<br />이를 토대로 작성한 자료이며 제작자의 사견이 들어가지 않은 사실
              기반의 자료입니다.<br /><br />
              *참고 연령별 평균키
            </div>
          </div>
        </section>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">
            출처: <span class="text-gray-600">국민건강보험공단, 건강검진통계표(2024)</span>
          </p>
          <div class="flex gap-2">
            <button
              v-if="heightMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(heightMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeHeight"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
  <!-- BMI 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isBmiOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeBmi"></div>
      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">체형(BMI)</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeBmi"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ bmi }}</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ bmiPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ bmiP50 != null ? `${bmiP50} %` : '—' }}
            </dd>
          </div>
        </dl>

        <section class="mt-4">
          <div class="mb-4 text-sm text-gray-700 leading-relaxed">
            <p class="mb-2">
              회원님의 BMI는
              <b v-if="height && bmi">
                {{ (bmi / ((height / 100) * (height / 100))).toFixed(1) }}
              </b>
              <b v-else>-</b>
              로
              <b class="text-blue-600">
                {{
                  height && bmi ? getBmiCategoryName(bmi / ((height / 100) * (height / 100))) : '-'
                }}
              </b>
              에 해당합니다.
            </p>
            <p class="text-xs text-gray-500">
              * {{ ageBin }}세 동년배들의 남녀 체형 분포는 아래와 같습니다.
            </p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-3">
            <div
              class="flex text-[10px] text-gray-400 font-medium text-center pb-1 border-b border-gray-200"
            >
              <div class="w-16 text-left">구분</div>
              <div class="flex-1 text-blue-500">남성 (%)</div>
              <div class="flex-1 text-pink-500">여성 (%)</div>
            </div>

            <div v-for="item in bmiDistribution" :key="item.label" class="relative">
              <div
                v-if="item.isMe"
                class="absolute inset-0 bg-yellow-100/50 -mx-2 rounded pointer-events-none"
              ></div>

              <div class="relative flex items-center text-xs py-1">
                <div class="w-16 font-medium text-gray-600 shrink-0 truncate flex items-center">
                  {{ item.label }}
                  <span v-if="item.isMe" class="ml-1 text-[8px] text-red-500">●</span>
                </div>

                <div class="flex-1 flex items-center gap-2 h-4">
                  <div class="flex-1 flex bg-gray-200 h-2 rounded-full overflow-hidden justify-end">
                    <div class="bg-blue-400 h-full" :style="{ width: item.male + '%' }"></div>
                  </div>
                  <span class="text-[10px] text-gray-500 w-8 text-right font-mono"
                    >{{ Math.round(item.male) }}%</span
                  >
                </div>

                <div class="flex-1 flex items-center gap-2 h-4 ml-2">
                  <div class="flex-1 flex bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-pink-400 h-full" :style="{ width: item.female + '%' }"></div>
                  </div>
                  <span class="text-[10px] text-gray-500 w-8 text-right font-mono"
                    >{{ Math.round(item.female) }}%</span
                  >
                </div>
              </div>
            </div>
          </div>

          <p class="mt-2 text-[10px] text-center text-gray-400">
            * 노란색 배경과 붉은 점(●)이 회원님이 속한 구간입니다.
          </p>

          <div
            class="mt-4 p-4 rounded-lg text-sm leading-relaxed border"
            :class="[
              bmiComment.color.includes('blue')
                ? 'bg-blue-50 border-blue-100 text-blue-900'
                : bmiComment.color.includes('green')
                  ? 'bg-green-50 border-green-100 text-green-900'
                  : bmiComment.color.includes('gray')
                    ? 'bg-gray-100 border-gray-200 text-gray-800'
                    : '',
            ]"
          >
            <span v-html="bmiComment.msg"></span>
          </div>
        </section>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">출처: <span class="text-gray-600">—</span></p>
          <div class="flex gap-2">
            <button
              v-if="bmiMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(bmiMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeBmi"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>

  <!-- 학력 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isEducationOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeEducation"></div>
      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">학력</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeEducation"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ education }}</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ educationPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ educationP50 != null ? educationP50 : '—' }}
            </dd>
          </div>
        </dl>

        <section class="mt-4">
          <div class="mb-4 text-sm text-gray-700 leading-relaxed">
            <p class="mb-2">
              회원님의 출신 학교 <b>{{ education }}</b
              >은(는)<br />
              입시 결과 기준 전체 32개 등급 중
              <b class="text-blue-600">{{ myUnivGrade }}등급</b> 그룹입니다.
            </p>
          </div>

          <div class="flex justify-center mb-6">
            <div
              class="px-6 py-2 rounded-xl font-black text-lg shadow-md tracking-wider border-2"
              :class="univTierBadge.color"
            >
              {{ univTierBadge.label }}
            </div>
          </div>

          <div class="relative bg-gray-50/50 rounded-lg border border-gray-100">
            <div
              ref="ladderContainerRef"
              class="relative pl-4 pr-2 py-4 max-h-[60vh] overflow-y-auto scroll-smooth custom-scrollbar"
            >
              <div class="absolute left-[31px] top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div class="space-y-4">
                <template v-for="(item, index) in ladderList" :key="index">
                  <div class="relative flex items-start" :id="item.isMe ? 'my-grade-row' : ''">
                    <div
                      class="w-16 flex flex-col items-center justify-start relative z-10 shrink-0 pt-1"
                    >
                      <div
                        class="w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 bg-white"
                        :class="[
                          item.isMe
                            ? 'border-blue-600 text-blue-700 scale-110 shadow-lg ring-4 ring-blue-50 z-20'
                            : 'border-gray-200 text-gray-500',
                        ]"
                      >
                        <span
                          class="text-[8px] leading-none text-gray-400 mb-0.5 uppercase tracking-tighter"
                          >TOP</span
                        >
                        <span class="text-[11px] font-bold leading-none tracking-tight">
                          {{ item.percentileStr }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="flex-1 py-2 px-3 rounded-lg border text-xs transition-all duration-300 ml-1 min-h-[48px] flex flex-col justify-center"
                      :class="[
                        item.isMe
                          ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-md font-medium ring-1 ring-blue-200'
                          : 'bg-white border-transparent text-gray-400 hover:bg-gray-50',
                      ]"
                    >
                      <div class="flex flex-col gap-1.5">
                        <span class="whitespace-normal leading-relaxed break-keep">
                          {{ item.label }}
                        </span>

                        <div v-if="item.isMe" class="flex justify-end">
                          <span
                            class="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm tracking-wide"
                          >
                            YOU
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <p class="mt-3 text-[10px] text-center text-gray-400">
            * 데이터 출처: 대학알리미 입결 및 정원 통계 기반 (2024)
          </p>

          <div
            class="mt-4 p-4 rounded-lg text-sm leading-relaxed border"
            :class="[
              educationComment.color.includes('blue')
                ? 'bg-blue-50 border-blue-100 text-blue-900'
                : educationComment.color.includes('green')
                  ? 'bg-green-50 border-green-100 text-green-900'
                  : educationComment.color.includes('gray')
                    ? 'bg-gray-100 border-gray-200 text-gray-800'
                    : '',
            ]"
          >
            <span v-html="educationComment.msg"></span>
          </div>
        </section>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">출처: <span class="text-gray-600">—</span></p>
          <div class="flex gap-2">
            <button
              v-if="educationMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(educationMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeEducation"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>

  <!-- 연봉 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isSalaryOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeSalary"></div>
      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">연봉</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeSalary"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ salary }} 원</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ salaryPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ salaryP50 != null ? `${salaryP50} 원` : '—' }}
            </dd>
          </div>
        </dl>

        <div v-if="salaryGraphData" class="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div class="relative w-full h-40">
            <svg
              :viewBox="`0 0 ${salaryGraphData.svgWidth} ${salaryGraphData.svgHeight}`"
              class="w-full h-full overflow-visible"
            >
              <path
                :d="salaryGraphData.path"
                fill="rgba(96, 165, 250, 0.2)"
                stroke="#60A5FA"
                stroke-width="2"
                stroke-linejoin="round"
              />

              <line
                :x1="salaryGraphData.medianX"
                y1="0"
                :x2="salaryGraphData.medianX"
                :y2="salaryGraphData.svgHeight"
                stroke="#9CA3AF"
                stroke-width="1"
                stroke-dasharray="4 2"
              />
              <text
                :x="salaryGraphData.medianX"
                :y="salaryGraphData.svgHeight + 12"
                font-size="10"
                fill="#9CA3AF"
                text-anchor="middle"
              >
                중간({{ salaryGraphData.medianLabel }})
              </text>

              <line
                :x1="salaryGraphData.myX"
                y1="0"
                :x2="salaryGraphData.myX"
                :y2="salaryGraphData.svgHeight"
                stroke="#DC2626"
                stroke-width="1.5"
              />

              <circle
                :cx="salaryGraphData.myX"
                :cy="salaryGraphData.myY"
                r="3"
                fill="white"
                stroke="#DC2626"
                stroke-width="2"
              />

              <g>
                <rect
                  :x="salaryGraphData.myX - 20"
                  :y="-24"
                  width="40"
                  height="18"
                  rx="4"
                  fill="#DC2626"
                />
                <text
                  :x="salaryGraphData.myX"
                  :y="-12"
                  font-size="10"
                  font-weight="bold"
                  fill="white"
                  text-anchor="middle"
                >
                  YOU
                </text>
                <path
                  :d="`M ${salaryGraphData.myX},-6 L ${salaryGraphData.myX - 4},-6 L ${salaryGraphData.myX},0 L ${salaryGraphData.myX + 4},-6 Z`"
                  fill="#DC2626"
                />
              </g>
            </svg>

            <div class="absolute bottom-0 left-0 text-[10px] text-gray-400">0원</div>
            <div class="absolute bottom-0 right-0 text-[10px] text-gray-400">
              {{ salaryGraphData.maxLabel }}+
            </div>
          </div>

          <p class="mt-4 text-[10px] text-center text-gray-400">
            * 그래프의 높이가 높을수록 해당 연봉 구간에 사람이 많음을 의미합니다.
          </p>
        </div>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">출처: <span class="text-gray-600">—</span></p>
          <div class="flex gap-2">
            <button
              v-if="salaryMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(salaryMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeSalary"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>

  <!-- 직업 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isJobOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeJob"></div>
      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">직업</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeJob"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ job }}</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ Math.max(1, Math.floor(jobPct)) }} %
            </dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ jobP50 != null ? jobP50 : '—' }}</dd>
          </div>
        </dl>

        <section class="mt-4">
          <div class="mb-4 text-sm text-gray-700 leading-relaxed">
            <p class="mb-2">
              선택하신 <b>{{ job }}</b> 직군은<br />
              사회적 통념 등급표 기준
              <b class="text-blue-600"
                >상위 {{ myJobTierInfo?.percentile }}% ({{ myJobTierInfo?.tier }})</b
              >
              그룹에 속합니다.
            </p>
          </div>

          <div class="relative bg-gray-50/50 rounded-lg border border-gray-100">
            <div
              ref="jobContainerRef"
              class="relative px-3 py-4 max-h-[60vh] overflow-y-auto scroll-smooth custom-scrollbar"
            >
              <div class="space-y-3">
                <template v-for="(item, index) in jobTierList" :key="index">
                  <div
                    class="relative rounded-xl border transition-all duration-300"
                    :id="item.isMe ? 'my-job-row' : ''"
                    :class="[
                      item.isMe
                        ? `bg-white border-${item.theme}-500 shadow-md ring-1 ring-${item.theme}-200 z-10`
                        : 'bg-white border-gray-200 text-gray-500 opacity-90',
                    ]"
                  >
                    <div class="flex items-stretch min-h-[60px]">
                      <div
                        class="w-16 flex flex-col items-center justify-center border-r shrink-0 rounded-l-xl"
                        :class="[
                          item.isMe
                            ? `bg-${item.theme}-50 border-${item.theme}-100 text-${item.theme}-700`
                            : 'bg-gray-50 border-gray-200 text-gray-400',
                        ]"
                      >
                        <span class="text-xs font-black tracking-wider">{{ item.tier }}</span>
                        <span class="text-[9px] font-medium mt-0.5 opacity-80">TOP</span>
                        <span class="text-[10px] font-bold">{{ item.percentile }}%</span>
                      </div>

                      <div class="flex-1 p-3 flex flex-col justify-center text-xs relative">
                        <span
                          class="leading-relaxed break-keep"
                          :class="item.isMe ? 'text-gray-800 font-medium' : ''"
                        >
                          {{ item.jobNames }}
                        </span>

                        <div v-if="item.isMe" class="absolute top-2 right-2">
                          <span
                            class="text-[9px] text-white px-2 py-0.5 rounded-full font-bold shadow-sm"
                            :class="`bg-${item.theme}-500`"
                          >
                            ME
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <p class="mt-3 text-[10px] text-center text-gray-400">
            * 자료 출처: 결혼정보회사 등급표 및 사회 통념 기준 재구성
          </p>

          <div
            class="mt-4 p-4 rounded-lg text-sm leading-relaxed border"
            :class="[
              jobComment.color.includes('blue')
                ? 'bg-blue-50 border-blue-100 text-blue-900'
                : jobComment.color.includes('green')
                  ? 'bg-green-50 border-green-100 text-green-900'
                  : jobComment.color.includes('gray')
                    ? 'bg-gray-100 border-gray-200 text-gray-800'
                    : '',
            ]"
          >
            <span v-html="jobComment.msg"></span>
          </div>
        </section>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">출처: <span class="text-gray-600">—</span></p>
          <div class="flex gap-2">
            <button
              v-if="jobMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(jobMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeJob"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>

  <!-- 자산 전용 모달 -->
  <transition name="fade">
    <div
      v-if="isAssetsOpen"
      class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div class="absolute inset-0 bg-black/40" @click="closeAssets"></div>
      <div
        class="relative w-full sm:max-w-[640px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 z-[61]"
      >
        <header class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[11px] text-gray-500 leading-none">해설</p>
            <h4 class="text-base font-semibold text-gray-900">자산</h4>
          </div>
          <button
            class="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            @click="closeAssets"
            aria-label="닫기"
            title="닫기"
          >
            ✕
          </button>
        </header>

        <dl class="mt-3 grid grid-cols-3 gap-2 text-[12px]">
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 입력값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ assets }} 원</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">사용자 백분위</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">{{ assetsPct }} %</dd>
          </div>
          <div class="bg-gray-50 rounded-md p-2">
            <dt class="text-gray-500">동세대 중앙값</dt>
            <dd class="mt-0.5 font-semibold text-gray-800">
              {{ assetsP50 != null ? `${assetsP50} 원` : '—' }}
            </dd>
          </div>
        </dl>

        <section class="mt-4">
          <div class="mb-4 text-sm text-gray-700 leading-relaxed">
            <p class="mb-2">
              회원님의 총 자산 <b>{{ (assets / 10000).toFixed(1) }}억원</b>은<br />
              동년배 자산 분포에서 <b class="text-blue-600">백분위 {{ assetsPct }}%</b>에
              위치합니다.
            </p>
          </div>

          <div v-if="assetGraphData" class="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div class="relative w-full h-40">
              <svg
                :viewBox="`0 0 ${assetGraphData.svgWidth} ${assetGraphData.svgHeight}`"
                class="w-full h-full overflow-visible"
              >
                <path
                  :d="assetGraphData.path"
                  fill="rgba(16, 185, 129, 0.2)"
                  stroke="#10B981"
                  stroke-width="2"
                  stroke-linejoin="round"
                />

                <line
                  :x1="assetGraphData.medianX"
                  y1="0"
                  :x2="assetGraphData.medianX"
                  :y2="assetGraphData.svgHeight"
                  stroke="#6B7280"
                  stroke-width="1"
                  stroke-dasharray="4 2"
                />
                <text
                  :x="assetGraphData.medianX"
                  :y="assetGraphData.svgHeight + 12"
                  font-size="10"
                  fill="#6B7280"
                  text-anchor="middle"
                >
                  동년배 중간({{ assetGraphData.medianLabel }})
                </text>

                <line
                  :x1="assetGraphData.myX"
                  y1="0"
                  :x2="assetGraphData.myX"
                  :y2="assetGraphData.svgHeight"
                  stroke="#DC2626"
                  stroke-width="1.5"
                />
                <circle
                  :cx="assetGraphData.myX"
                  :cy="assetGraphData.myY"
                  r="3"
                  fill="white"
                  stroke="#DC2626"
                  stroke-width="2"
                />

                <g>
                  <rect
                    :x="assetGraphData.myX - 20"
                    :y="assetGraphData.myY - 26"
                    width="40"
                    height="18"
                    rx="4"
                    fill="#DC2626"
                  />
                  <text
                    :x="assetGraphData.myX"
                    :y="assetGraphData.myY - 14"
                    font-size="10"
                    font-weight="bold"
                    fill="white"
                    text-anchor="middle"
                  >
                    YOU
                  </text>
                  <path
                    :d="`M ${assetGraphData.myX},${assetGraphData.myY - 8} L ${assetGraphData.myX - 4},${assetGraphData.myY - 8} L ${assetGraphData.myX},${assetGraphData.myY - 2} L ${assetGraphData.myX + 4},${assetGraphData.myY - 8} Z`"
                    fill="#DC2626"
                  />
                </g>
              </svg>

              <div class="absolute bottom-0 left-0 text-[10px] text-gray-400">0원</div>

              <div
                class="absolute bottom-0 left-[25%] text-[10px] text-gray-400 transform -translate-x-1/2"
              >
                10억
              </div>

              <div
                class="absolute bottom-0 left-[50%] text-[10px] text-gray-400 transform -translate-x-1/2"
              >
                20억
              </div>

              <div
                class="absolute bottom-0 left-[75%] text-[10px] text-gray-400 transform -translate-x-1/2"
              >
                30억
              </div>

              <div class="absolute bottom-0 right-0 text-[10px] text-gray-400">
                {{ assetGraphData.maxLabel }}
              </div>
              <p class="mt-4 text-[10px] text-center text-gray-400">
                * 자산 분포는 소액 구간에 밀집되어 있고 고액으로 갈수록 얇게 퍼지는 형태입니다.
              </p>
            </div>

            <p class="mt-4 text-[10px] text-center text-gray-400">
              * 대한민국 전체 가구 자산 분포 기준 (동년배 중앙값 표시)
            </p>
          </div>

          <div
            class="mt-4 p-4 rounded-lg text-sm leading-relaxed border"
            :class="[
              assetsComment.color.includes('blue')
                ? 'bg-blue-50 border-blue-100 text-blue-900'
                : assetsComment.color.includes('green')
                  ? 'bg-green-50 border-green-100 text-green-900'
                  : assetsComment.color.includes('gray')
                    ? 'bg-gray-100 border-gray-200 text-gray-800'
                    : '',
            ]"
          >
            <span v-html="assetsComment.msg"></span>
          </div>
        </section>

        <footer class="mt-5 flex items-center justify-between">
          <p class="text-[11px] text-gray-500">출처: <span class="text-gray-600">—</span></p>
          <div class="flex gap-2">
            <button
              v-if="assetsMoreLink"
              class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              @click="openExternal(assetsMoreLink)"
            >
              원문 보기
            </button>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 rounded-xl"
              @click="closeAssets"
            >
              닫기
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, toRefs, nextTick } from 'vue'
import p50 from '@/assets/data/p50Stats.json'
import heightStats from '@/assets/data/heightStats.json'
import weightStats from '@/assets/data/weightStats.json'
import universityGrades from '@/assets/data/universityGrades.json'
import educationStats from '@/assets/data/educationStats.json'
import salaryStats from '@/assets/data/salaryStats.json'
import jobTiers from '@/assets/data/jobTiers.json'
import assetStats from '@/assets/data/assetStats.json'

const props = defineProps({
  userInfo: { type: Object, required: true }, // { gender, age }
  ability: { type: Object, required: true }, // { height, bmi, education, salary, job, assets }
  percentile: { type: Object, required: true }, // { height, bmi, education, salary, job, assets }
})

// reactivity 유지 위해 toRefs 사용
const { userInfo, ability, percentile } = toRefs(props)

// 바로 쓰기 위한 최소 변수들
const gender = computed(() => props.userInfo?.gender || 'male')
const age = computed(() => userInfo.value?.age ?? null)
const ageBin = computed(() => ageToBin(props.userInfo?.age))

// 입력값(ability)
const height = computed(() => ability.value?.height ?? null)
const bmi = computed(() => ability.value?.weight ?? null)
const education = computed(() => ability.value?.university ?? null)
const salary = computed(() => ability.value?.salary ?? null)
const job = computed(() => ability.value?.job.label ?? null)
const assets = computed(() => ability.value?.asset ?? null)

// 백분위(percentile)
const heightPct = computed(() => percentile.value?.height ?? null)
const bmiPct = computed(() => percentile.value?.bmi ?? null)
const educationPct = computed(() => percentile.value?.education ?? null)
const salaryPct = computed(() => percentile.value?.salary ?? null)
const jobPct = computed(() => percentile.value?.job ?? null)
const assetsPct = computed(() => percentile.value?.assets ?? null)

function getGradeComment(pct, type) {
  const p = Number(pct)
  if (p >= 95)
    return {
      color: 'text-blue-700 bg-blue-50',
      msg: `대단합니다! <b>상위 5%</b> 이내의 최상위권입니다.<br>주변에서 ${type} 분야의 능력자로 인정받으시겠군요.`,
    }
  if (p >= 80)
    return {
      color: 'text-green-700 bg-green-50',
      msg: `훌륭합니다! <b>상위 20%</b> 안에 드는 수준입니다.<br>평균보다 훨씬 뛰어난 상태를 유지하고 계십니다.`,
    }
  if (p >= 50)
    return {
      color: 'text-gray-700 bg-gray-100',
      msg: `준수합니다! 딱 <b>중간 이상</b>을 유지하고 계시네요.<br>대한민국 평균 이상의 안정적인 위치입니다.`,
    }
  if (p >= 30)
    return {
      color: 'text-gray-600 bg-gray-50',
      msg: `평균에 약간 못 미치지만, 걱정 마세요.<br>대한민국 통계가 워낙 상향 평준화된 경향이 있습니다.`,
    }
  return {
    color: 'text-gray-500 bg-gray-50',
    msg: `힘내세요! 지금은 수치가 낮게 나왔지만,<br>앞으로 올라갈 일만 남았습니다. 화이팅!`,
  }
}

// 각 항목별 코멘트 computed (템플릿에서 갖다 쓰기 위함)
const heightComment = computed(() => getGradeComment(heightPct.value, '피지컬'))
const bmiComment = computed(() => getGradeComment(bmiPct.value, '건강 관리')) // ✅ 질문하신 부분
const educationComment = computed(() => getGradeComment(educationPct.value, '학업 성취'))
const salaryComment = computed(() => getGradeComment(salaryPct.value, '소득 경쟁력'))
const jobComment = computed(() => getGradeComment(jobPct.value, '직업 안정성'))
const assetsComment = computed(() => getGradeComment(assetsPct.value, '자산 형성'))

//p50 값
const heightP50 = computed(() => {
  return p50?.height?.[gender.value]?.[ageBin.value]?.mean ?? null
})
const bmiP50 = computed(() => {
  return p50?.bmi?.[gender.value]?.[ageBin.value] ?? null
})
const educationP50 = computed(() => {
  return p50?.education?.[gender.value]?.[ageBin.value] ?? null
})
const salaryP50 = computed(() => {
  return p50?.salary?.[gender.value]?.[ageBin.value] ?? null
})
const jobP50 = computed(() => {
  return p50?.job?.[gender.value]?.[ageBin.value] ?? null
})
const assetsP50 = computed(() => {
  return p50?.assets?.[gender.value]?.[ageBin.value] ?? null
})

// 5세 구간으로 변환
function ageToBin(age) {
  const clamp = (n, lo, hi) => Math.min(Math.max(+n || 20, lo), hi)
  const c = clamp(age, 20, 64)
  const s = Math.floor(c / 5) * 5
  const start = Math.max(20, s)
  const end = Math.min(start + 4, 64)
  return `${start}-${end}`
}

// ⬇️ Height 전용 모달 상태
const isHeightOpen = ref(false)
//const heightDetails = ref('') // 필요 시 HTML 문자열 채우기
const heightMoreLink = ref('') // 외부 링크가 있으면 URL 문자열
const heightRank = computed(() => Math.round(100 - heightPct.value))
const currentHeightStat = computed(() => {
  const g = gender.value
  const stat = heightStats[g]?.[ageBin.value]
  return stat || { mean: 173, stdDev: 5.7 }
})
function getGaussianY(x, mean, stdDev) {
  return Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
}

const graphData = computed(() => {
  const { mean, stdDev } = currentHeightStat.value
  const userH = height.value || mean // 사용자 키 (없으면 평균)

  // X축 범위 설정 (평균 ± 3.5 표준편차 -> 전체의 99.9% 커버)
  const minX = mean - 3.5 * stdDev
  const maxX = mean + 3.5 * stdDev
  const rangeX = maxX - minX

  // SVG 크기 설정 (비율)
  const svgWidth = 300
  const svgHeight = 100
  const paddingBottom = 20 // 텍스트 들어갈 공간

  // X좌표 변환 함수 (실제 키 -> SVG X좌표)
  const getX = (val) => {
    const pct = (val - minX) / rangeX
    return pct * svgWidth
  }

  // 사용자 위치 (붉은 선)
  const userX = Math.max(0, Math.min(svgWidth, getX(userH)))

  // 평균 위치 (점선)
  const meanX = getX(mean)

  // 곡선 그리기 (Points 생성)
  let pathD = `M 0,${svgHeight - paddingBottom} ` // 시작점
  const step = rangeX / 50 // 50등분

  let maxY = 0 // 정규화(높이 맞추기)를 위해 최대 Y값 찾기

  // 1차 루프: 최대 높이 계산 (그래프를 꽉 차게 그리기 위함)
  for (let x = minX; x <= maxX; x += step) {
    const y = getGaussianY(x, mean, stdDev)
    if (y > maxY) maxY = y
  }

  // 2차 루프: 실제 Path 생성
  for (let x = minX; x <= maxX; x += step) {
    const px = getX(x)
    const yRatio = getGaussianY(x, mean, stdDev) / maxY
    // Y좌표는 위가 0이므로 뒤집어야 함 (paddingBottom 고려)
    const py = svgHeight - paddingBottom - yRatio * (svgHeight - paddingBottom - 10)
    pathD += `L ${px.toFixed(1)},${py.toFixed(1)} `
  }

  pathD += `L ${svgWidth},${svgHeight - paddingBottom} Z` // 바닥 닫기

  return {
    path: pathD,
    userX,
    meanX,
    meanValue: mean,
    minX: Math.round(minX),
    maxX: Math.round(maxX),
    svgWidth,
    svgHeight,
  }
})
function openHeight() {
  isHeightOpen.value = true
}
function closeHeight() {
  isHeightOpen.value = false
}

// Weight 전용 모달 상태
const isBmiOpen = ref(false)
const bmiDetails = ref('') // 필요 시 HTML 문자열 채우기
const bmiMoreLink = '' // 외부 링크가 있으면 URL 문자열

function openBmi() {
  isBmiOpen.value = true
}
function closeBmi() {
  isBmiOpen.value = false
}

const bmiDistribution = computed(() => {
  // [수정] JSON 파일이 이제 "20-24" 형식이므로 ageBin("20-24")을 그대로 사용합니다.
  const targetBin = ageBin.value

  // 남성 데이터 찾기
  const maleData = weightStats.find((d) => d.ageGroup === targetBin && d.gender === 'male')
  // 여성 데이터 찾기
  const femaleData = weightStats.find((d) => d.ageGroup === targetBin && d.gender === 'female')

  if (!maleData || !femaleData) return []

  // 표시할 카테고리 순서
  const categories = ['저체중', '정상체중', '비만', '고도비만', '초고도비만']

  return categories.map((cat) => {
    // 남성 비율 계산
    const mCount = maleData.distribution[cat] || 0
    const mTotal = maleData.total || 1
    const mPct = ((mCount / mTotal) * 100).toFixed(1)

    // 여성 비율 계산
    const fCount = femaleData.distribution[cat] || 0
    const fTotal = femaleData.total || 1
    const fPct = ((fCount / fTotal) * 100).toFixed(1)

    let myRealBmiScore = 0

    // bmi.value는 몸무게(kg), height.value는 키(cm)
    const weightVal = bmi.value
    const heightVal = height.value

    if (weightVal && heightVal) {
      // BMI 공식: 몸무게(kg) / (키(m) * 키(m))
      const h_meter = heightVal / 100
      myRealBmiScore = weightVal / (h_meter * h_meter)
    }

    // 계산된 BMI 수치로 카테고리 판별 ('비만', '정상체중' 등)
    const myCat = getBmiCategoryName(myRealBmiScore)

    // 현재 루프 도는 카테고리(cat)가 내 카테고리(myCat)와 같은지 확인
    const isMe = cat === myCat

    return { label: cat, male: mPct, female: fPct, isMe }
  })
})

// BMI 수치로 카테고리 이름 반환 (bmiUtils 로직과 동일하게 맞춤)
function getBmiCategoryName(val) {
  const b = Number(val)
  if (!b) return ''
  if (b < 18.5) return '저체중'
  if (b < 25) return '정상체중'
  if (b < 30) return '비만'
  if (b < 35) return '고도비만'
  return '초고도비만'
}

// Education 전용 모달 상태
const isEducationOpen = ref(false)
const educationDetails = ref('') // 필요 시 HTML 문자열 채우기
const educationMoreLink = '' // 외부 링크가 있으면 URL 문자열

function closeEducation() {
  isEducationOpen.value = false
}

const myUnivGrade = computed(() => {
  const myUniv = education.value // 사용자 입력값 (예: 서울대학교)
  if (!myUniv) return 32 // 입력 없으면 기본값 (고졸 등)

  // universityGrades.json을 순회하며 내 대학이 속한 등급 찾기
  for (const group of universityGrades) {
    // universities 배열 안에 내 대학 이름이 있는지 확인
    const found = group.universities.find((u) => u.name === myUniv)
    if (found) return group.grade
  }

  // 예외 처리: 만약 리스트에 없는 대학이면 '기타 4년제(31)' 혹은 '고졸(32)' 등으로 처리
  // (여기서는 안전하게 31로 가정하거나, 로직에 따라 조정 가능)
  return 31
})

// 2. 사다리 리스트 데이터 생성
// 2. 사다리 리스트 (백분위 계산 로직 추가)
const ladderList = computed(() => {
  const current = myUnivGrade.value
  const result = []

  // --- 📊 통계 보정 계수 계산 (educationUtils 로직과 동일) ---
  const BASE_AGE_KEY = '20-24'
  const BASE_TOTAL = educationStats[BASE_AGE_KEY].total // 약 258만명
  const BASE_UNI = educationStats[BASE_AGE_KEY].university
  const BASE_RATE = BASE_UNI / BASE_TOTAL

  // 사용자 연령대 통계
  // (만약 데이터에 없는 나이면 20-24를 기본값으로)
  const userStats = educationStats[ageBin.value] || educationStats[BASE_AGE_KEY]
  const userTotal = userStats.total
  const userUni = userStats.university

  // 보정 계수 (이 세대가 대학을 얼마나 많이 갔는가?)
  // 대학 진학률이 높은 세대면 상위%가 더 널널하게(숫자가 크게) 나오고,
  // 진학률이 낮은 세대면 상위%가 더 빡빡하게(숫자가 작게) 나옵니다.
  const currentRate = userUni / userTotal
  const adjFactor = currentRate / BASE_RATE

  let cumulativeCapacity = 0 // 누적 정원

  // 1등급 ~ 32등급 루프
  for (let grade = 1; grade <= 32; grade++) {
    const groupData = universityGrades.find((g) => g.grade === grade)

    // 라벨 생성
    let label = ''
    let capacity = 0

    if (groupData) {
      if (groupData.universities.length > 0) {
        // 대학 이름 전부 나열
        const names = groupData.universities.map((u) => u.name)
        label = names.join(', ')
        // 정원 합산
        capacity = groupData.universities.reduce((sum, u) => sum + u.capacity, 0)
      } else {
        // 대학 리스트가 비어있는 등급(31, 32 등) 처리
        if (grade === 31) label = '기타 4년제 / 전문대'
        else if (grade === 32) label = '고등학교 졸업 미만'
        else label = '-'
      }
    }

    // --- 🧮 퍼센티지(Top %) 계산 ---
    cumulativeCapacity += capacity

    // 1년치 정원 * 5년 = 5년치(한 세대) 정원 추정
    const estimatedCohort = cumulativeCapacity * 5

    // 기본 백분위 (기준 세대 인구 대비)
    let rawPct = (estimatedCohort / BASE_TOTAL) * 100

    // 세대 보정 적용
    let finalPct = rawPct * adjFactor

    // 등급별 예외 처리 (31, 32등급은 통계 데이터 기반으로 덮어쓰기 or 100% 처리)
    if (grade === 31) {
      // 전문대 포함 비율까지 확장
      const juniorAdd = (userStats.juniorCollege / userTotal) * 100
      // 대학(university) 비율 + 전문대 비율
      // (정확한 누적을 위해 단순 합산보다는, 현재까지의 4년제 비율 + 전문대 비율로 근사)
      // 여기서는 심플하게 max 85% 정도로 잡거나, 계산된 값 유지
    }
    if (grade === 32) finalPct = 100.0 // 마지막은 무조건 100%

    // 소수점 정리 (상위 1% 미만은 소수점 2자리, 그 외는 1자리)
    const displayPct = finalPct < 1 ? finalPct.toFixed(2) : finalPct.toFixed(1)

    result.push({
      type: 'node',
      grade: grade, // id용으로 등급 남겨둠
      percentileStr: `${displayPct}%`, // 화면 표시용
      label: label,
      isMe: grade === current,
    })
  }
  return result
})

// 3. 스크롤 제어를 위한 Ref
const ladderContainerRef = ref(null) // 스크롤 박스

// 4. 모달 열기 + 자동 스크롤 함수
async function openEducation() {
  isEducationOpen.value = true

  // 모달이 렌더링될 때까지 기다림
  await nextTick()

  if (ladderContainerRef.value) {
    // '나'에 해당하는 요소를 찾음 (ID 사용)
    const myRow = ladderContainerRef.value.querySelector('#my-grade-row')

    if (myRow) {
      // 부드럽게 해당 위치가 가운데로 오도록 스크롤
      myRow.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }
}

// 3. 티어 배지 (32등급을 6단계 티어로 변환)
const univTierBadge = computed(() => {
  const g = myUnivGrade.value
  // 등급 구간은 임의로 설정 (데이터 분포 보고 조정 가능)
  if (g <= 2) return { label: 'CHALLENGER', color: 'bg-indigo-600 text-white border-indigo-200' } // 의치한약수, 서울대
  if (g <= 6) return { label: 'DIAMOND', color: 'bg-blue-500 text-white border-blue-200' } // 서연고서성한
  if (g <= 12) return { label: 'PLATINUM', color: 'bg-teal-500 text-white border-teal-200' } // 중경외시 ~ 국숭세단
  if (g <= 20) return { label: 'GOLD', color: 'bg-yellow-400 text-white border-yellow-200' } // 지방거점국립 ~ 수도권
  if (g <= 26) return { label: 'SILVER', color: 'bg-gray-400 text-white border-gray-200' }
  return { label: 'BRONZE', color: 'bg-orange-700 text-white border-orange-200' }
})

// Salary 전용 모달 상태
const isSalaryOpen = ref(false)
const salaryDetails = ref('') // 필요 시 HTML 문자열 채우기
const salaryMoreLink = '' // 외부 링크가 있으면 URL 문자열

function openSalary() {
  isSalaryOpen.value = true
}
function closeSalary() {
  isSalaryOpen.value = false
}

// Explanation.vue <script setup> 내부

// ...

// -----------------------------------------------------------
// 🖌️ 부드러운 곡선(Bezier) 생성 헬퍼 함수
// -----------------------------------------------------------
function getSmoothPath(points, svgHeight, svgWidth) {
  if (points.length < 2) return ''

  // 시작점
  let d = `M ${points[0].x},${points[0].y} `

  // 곡선 제어점 계산 로직 (Catmull-Rom Spline 변형)
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1] || points[i + 1] // 마지막 점 처리를 위해 조정
    const p3 = points[i + 2] || p2

    // 제어점 좌표 계산 (곡률 조절: 0.2는 텐션)
    const cp1x = p1.x + (p2.x - p0.x) * 0.2
    const cp1y = p1.y + (p2.y - p0.y) * 0.2
    const cp2x = p2.x - (p3.x - p1.x) * 0.2
    const cp2y = p2.y - (p3.y - p1.y) * 0.2

    // Bezier Curve 명령어 추가
    d += `C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} `
  }

  // 바닥으로 닫기 (영역 채우기 위함)
  d += `L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`

  return d
}

// -----------------------------------------------------------
// 💰 연봉 곡선 그래프 로직 (스무딩 적용)
// -----------------------------------------------------------
const salaryGraphData = computed(() => {
  // 1. 데이터 가져오기
  let ageKey = '20s'
  const a = age.value
  if (a >= 30 && a < 40) ageKey = '30s'
  else if (a >= 40 && a < 50) ageKey = '40s'
  else if (a >= 50 && a < 60) ageKey = '50s'
  else if (a >= 60) ageKey = '60s'

  const cohortKey = `${gender.value === 'male' ? 'male' : 'female'}_${ageKey}`
  const cohortData = salaryStats.cohorts[cohortKey]
  if (!cohortData || !cohortData.anchors) return null

  const anchors = cohortData.anchors

  const svgWidth = 300
  const svgHeight = 120

  const maxDataIncome = anchors[anchors.length - 1].income
  const maxIncome = Math.max(maxDataIncome, salary.value * 10000) * 1.05

  const getX = (inc) => (inc / maxIncome) * svgWidth

  // 2. 밀도(Density) 계산
  let rawPoints = []

  // 첫 번째 점 (0원, 0%) 강제 추가
  // (데이터가 700만원부터 시작하므로 앞부분을 자연스럽게 잇기 위함)
  if (anchors[0].income > 0) {
    rawPoints.push({ x: 0, density: 0 })
  }

  for (let i = 0; i < anchors.length - 1; i++) {
    const curr = anchors[i]
    const next = anchors[i + 1]

    const diffP = next.p - curr.p
    const diffIncome = next.income - curr.income

    if (diffIncome <= 0) continue

    const density = diffP / diffIncome
    const midIncome = (curr.income + next.income) / 2

    rawPoints.push({ x: midIncome, density: density })
  }

  // 3. 데이터 스무딩 (Moving Average)
  // 인접한 값들의 평균을 내서 튀는 값을 진정시킵니다.
  const smoothedPoints = rawPoints.map((pt, i, arr) => {
    const prev = arr[i - 1] || pt
    const next = arr[i + 1] || pt
    // 3점 평균 (자신 + 앞 + 뒤)
    const avgDensity = (prev.density + pt.density + next.density) / 3
    return { x: pt.x, density: avgDensity }
  })

  // 최대 밀도 찾기 (Y축 스케일링용)
  let maxDensity = 0
  smoothedPoints.forEach((p) => {
    if (p.density > maxDensity) maxDensity = p.density
  })

  // 4. 좌표 변환 (SVG 좌표계로)
  const renderPoints = smoothedPoints.map((p) => ({
    x: getX(p.x),
    // 밀도가 너무 낮으면 바닥에 붙어버리므로, 최소 높이를 살짝 보정할 수도 있음
    y: svgHeight - (p.density / maxDensity) * (svgHeight * 0.9),
  }))

  // 5. 곡선 Path 생성
  const pathD = getSmoothPath(renderPoints, svgHeight, svgWidth)

  // 6. 기타 좌표 계산
  const myX = getX(salary.value * 10000)

  // 내 위치 높이 찾기 (보간법)
  let myY = svgHeight
  for (let i = 0; i < renderPoints.length - 1; i++) {
    const curr = renderPoints[i]
    const next = renderPoints[i + 1]
    if (myX >= curr.x && myX < next.x) {
      // 베지에 곡선 위 정확한 점 찾기는 복잡하므로, 선형 보간으로 근사치 사용
      // (시각적으로 큰 차이 없음)
      const ratio = (myX - curr.x) / (next.x - curr.x)
      myY = curr.y + ratio * (next.y - curr.y)
      break
    }
  }

  const medianAnchor = anchors.find((a) => a.p >= 50)
  const medianX = getX(medianAnchor.income)
  const medianLabel = `${Math.round(medianAnchor.income / 10000).toLocaleString()}만원`

  return {
    svgWidth,
    svgHeight,
    path: pathD,
    myX,
    myY,
    medianX,
    medianLabel,
    maxLabel: Math.round(maxIncome / 100000000) + '억',
  }
})

// Job 전용 모달 상태
const isJobOpen = ref(false)
const jobDetails = ref('') // 필요 시 HTML 문자열 채우기
const jobMoreLink = '' // 외부 링크가 있으면 URL 문자열

const myJobTierInfo = computed(() => {
  const myJobName = job.value // 사용자 직업 (예: "대기업 종사자...")
  if (!myJobName) return null

  // 1) 직업 이름으로 직접 찾기
  for (const t of jobTiers) {
    const found = t.jobs.find((j) => j.name === myJobName)
    if (found) return { ...t, myJobName } // 찾으면 Tier 정보 반환
  }

  // 2) 못 찾으면 기본값 (T10 혹은 예외처리)
  // 여기서는 안전하게 마지막 Tier 반환
  return { ...jobTiers[jobTiers.length - 1], myJobName: '기타' }
})

// 2. 리스트 데이터 가공
const jobTierList = computed(() => {
  const myTier = myJobTierInfo.value?.tier

  return jobTiers.map((t) => {
    // 해당 Tier의 대표 직업들 이름 나열
    const jobNames = t.jobs.map((j) => j.name).join(', ')

    // 색상 테마 결정 (상위권일수록 화려하게)
    let themeColor = 'gray'
    if (t.tier === 'T1') themeColor = 'indigo'
    else if (t.tier === 'T2') themeColor = 'purple'
    else if (t.tier === 'T3') themeColor = 'blue'
    else if (t.tier === 'T4') themeColor = 'cyan'
    else if (t.tier === 'T5') themeColor = 'teal'
    else if (t.tier === 'T6') themeColor = 'green'
    else if (t.tier === 'T7') themeColor = 'lime'
    else if (t.tier === 'T8') themeColor = 'yellow'
    else if (t.tier === 'T9') themeColor = 'orange'

    return {
      tier: t.tier, // "T1"
      percentile: t.percentile, // 1.26
      jobNames: jobNames,
      theme: themeColor,
      isMe: t.tier === myTier,
    }
  })
})

// 3. 스크롤 제어 Ref
const jobContainerRef = ref(null)

// 4. 모달 열기 + 자동 스크롤
async function openJob() {
  isJobOpen.value = true
  await nextTick()
  if (jobContainerRef.value) {
    const myRow = jobContainerRef.value.querySelector('#my-job-row')
    if (myRow) {
      myRow.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }
}
function closeJob() {
  isJobOpen.value = false
}

// Assets 전용 모달 상태
const isAssetsOpen = ref(false)
const assetsDetails = ref('') // 필요 시 HTML 문자열 채우기
const assetsMoreLink = '' // 외부 링크가 있으면 URL 문자열

function openAssets() {
  isAssetsOpen.value = true
}
function closeAssets() {
  isAssetsOpen.value = false
}

const assetGraphData = computed(() => {
  const bins = assetStats.overall.bins
  if (!bins || bins.length === 0) return null

  const svgWidth = 300
  const svgHeight = 120

  // 1. X축 스케일 설정 (Linear)
  // 마지막 구간이 33억+ 이므로, 그래프 끝을 넉넉하게 40억으로 잡습니다.
  const maxAxisAsset = 4000000000
  // 만약 내 자산이 40억보다 많으면 그래프를 더 확장합니다.
  const maxAsset = Math.max(maxAxisAsset, assets.value * 10000) * 1.05

  // X축 변환 함수: (금액 / 최대금액) * 너비
  const getX = (val) => (val / maxAsset) * svgWidth

  // 2. 밀도(Density) 데이터 생성
  // 그래프 높이 = (해당 구간의 인구 비율) / (해당 구간의 너비)
  // 너비가 좁은데 사람이 많으면 뾰족하고, 너비가 넓은데 사람이 적으면 납작해집니다.
  const points = []

  // 시작점 (0원)
  points.push({ x: 0, density: 0 })

  bins.forEach((bin) => {
    let width = 0
    let mid = 0

    // 구간 너비와 중간점 계산
    if (bin.hi !== null) {
      width = bin.hi - bin.lo
      mid = (bin.lo + bin.hi) / 2
    } else {
      // 마지막 열린 구간 (33억+)
      // 시각화를 위해 임의로 33억~43억(10억 구간) 정도로 가정
      width = 1000000000
      mid = bin.lo + width / 2
    }

    // 밀도 계산
    // (값이 너무 작아지므로 계산상 편의를 위해 스케일링은 나중에 함)
    const density = bin.pct / width

    points.push({ x: mid, density: density })
  })

  // Y축 스케일 (최대 밀도 기준 정규화)
  let maxDensity = 0
  points.forEach((p) => {
    if (p.density > maxDensity) maxDensity = p.density
  })

  // 0~1억 구간이 너무 압도적으로 높으면 나머지 구간이 안 보이므로,
  // 시각적 보정을 위해 maxDensity를 살짝 낮춰서(Clamp) 윗부분을 자를 수도 있지만,
  // 요청하신 대로 "있는 그대로" 보여드리기 위해 그대로 계산합니다.
  const getY = (d) => svgHeight - (d / maxDensity) * (svgHeight * 0.9)

  // 3. 렌더링용 포인트 변환
  const renderPoints = points.map((p) => ({
    x: getX(p.x),
    y: getY(p.density),
  }))

  // 4. 곡선 Path 생성
  const pathD = getSmoothPath(renderPoints, svgHeight, svgWidth)

  // 5. 내 위치 좌표
  const myAssetWon = assets.value * 10000
  const myX = getX(myAssetWon)

  // 내 위치 높이 보간 (그래프 선 위에 점 찍기)
  let myY = svgHeight
  for (let i = 0; i < renderPoints.length - 1; i++) {
    const curr = renderPoints[i]
    const next = renderPoints[i + 1]
    if (myX >= curr.x && myX < next.x) {
      const ratio = (myX - curr.x) / (next.x - curr.x)
      myY = curr.y + ratio * (next.y - curr.y)
      break
    }
  }

  // 6. 동년배 중앙값 위치
  let ageKey = '20s'
  const a = age.value
  if (a >= 30 && a < 40) ageKey = '30s'
  else if (a >= 40 && a < 50) ageKey = '40s'
  else if (a >= 50 && a < 60) ageKey = '50s'
  else if (a >= 60) ageKey = '60s'

  const medianVal = assetStats.age_stats[ageKey].median
  const medianX = getX(medianVal)
  const medianLabel = `${(medianVal / 100000000).toFixed(1)}억`

  return {
    svgWidth,
    svgHeight,
    path: pathD,
    myX,
    myY,
    medianX,
    medianLabel,
    // X축 라벨용 최대값 표시
    maxLabel: Math.round(maxAsset / 100000000) + '억',
  }
})

// 공용 외부 열기
function openExternal(url) {
  if (!url) return
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (e) {}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 커스텀 스크롤바 (Chrome, Safari, Edge) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db; /* gray-300 */
  border-radius: 20px;
}
</style>
