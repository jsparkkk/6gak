// src/utils/assetUtils.js
// ------------------------------------------------------------
// 자산 퍼센타일 계산 유틸
// - assetStats.json의 전연령 히스토그램(bins)로 CDF 구성
// - 연령대별 (중위, 평균)에 맞춰 η(에타) 자동 적합
// - 사용자 입력(나이, 자산)에 대해 상위 퍼센트 반환
// ------------------------------------------------------------

import stats from '@/assets/data/assetStats.json'

// =========================
// 내부 상태
// =========================
let MODEL = {
  // 전연령 CDF 에지 {lo, hi, mass, cdfLo, cdfHi, openEnded}
  edges: [],
  // tail 설정
  tail: {
    model: 'cap', // 'cap' | 'pareto'
    cap_percentile: 99.0,
    pareto_alpha: null,
    open_lo: 3_300_000_000,
  },
  // 전체 중위값
  medianAll: 240_000_000,
  // 연령대별 통계 { median, mean }
  ageStats: {
    '20s': { median: 50_000_000, mean: 100_000_000 },
    '30s': { median: 160_000_000, mean: 250_000_000 },
    '40s': { median: 290_000_000, mean: 450_000_000 },
    '50s': { median: 300_000_000, mean: 510_000_000 },
    '60s': { median: 250_000_000, mean: 520_000_000 },
  },
  // η(연령별 형태 보정) — json에 값 있으면 사용, 없으면 런타임 추정
  etaByAge: {
    '20s': null,
    '30s': null,
    '40s': null,
    '50s': null,
    '60s': null,
  },
  // 설정
  settings: {
    percentile_rounding_digits: 2,
    negative_range_handling: 'linear_scale',
    normalize_bin_percents: true,
  },
  // 누적합 정규화 계수(퍼센트 → 1 기준)
  pctNorm: 1.0,
}

// =========================
// 유틸 함수
// =========================

/** KRW 통화 포맷 */
export function formatKRW(n) {
  if (n == null || !isFinite(n)) return '₩0'
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}

/** 나이 → 버킷 */
export function getAgeBucket(age) {
  if (age >= 20 && age <= 29) return '20s'
  if (age >= 30 && age <= 39) return '30s'
  if (age >= 40 && age <= 49) return '40s'
  if (age >= 50 && age <= 59) return '50s'
  return '60s' // 60대 이상
}

/** 클램프 */
function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x))
}

/** 안전한 거듭제곱: 음수에 η 적용 피함(양수에만 거듭제곱) */
function powSafe(x, p) {
  return Math.pow(Math.max(0, x), p)
}

/** JSON 로드 → 내부 상태로 초기화 */
export function initAssetModel(jsonOverride) {
  const cfg = jsonOverride || stats

  // 전체 중위값
  MODEL.medianAll = cfg?.overall?.median ?? MODEL.medianAll

  // tail 설정
  MODEL.tail = {
    model: cfg?.overall?.tail?.model ?? 'cap',
    cap_percentile: cfg?.overall?.tail?.cap_percentile ?? 99.0,
    pareto_alpha: cfg?.overall?.tail?.pareto_alpha ?? null,
    open_lo: cfg?.overall?.tail?.open_lo ?? 3_300_000_000,
  }

  // bins 정규화
  const rawBins = Array.isArray(cfg?.overall?.bins) ? cfg.overall.bins.slice() : []
  const sumPct = rawBins.reduce((s, b) => s + (Number(b.pct) || 0), 0)
  const needNormalize = cfg?.settings?.normalize_bin_percents ?? true
  const normFactor = needNormalize && sumPct > 0 ? 100.0 / sumPct : 1.0
  MODEL.pctNorm = normFactor

  // edges 구성
  MODEL.edges = []
  let acc = 0 // [0..100]
  for (const b of rawBins) {
    const lo = Number(b.lo)
    const hi = b.hi == null ? Infinity : Number(b.hi)
    const pct = (Number(b.pct) || 0) * normFactor // 정규화
    const cdfLo = acc / 100
    const cdfHi = (acc + pct) / 100
    MODEL.edges.push({
      lo,
      hi,
      mass: pct / 100,
      cdfLo,
      cdfHi,
      openEnded: b.hi == null || !!b.open_ended,
    })
    acc += pct
  }
  // 마지막 누적 치환 안전장치
  if (MODEL.edges.length > 0) {
    const last = MODEL.edges[MODEL.edges.length - 1]
    if (Math.abs(last.cdfHi - 1) > 1e-6) {
      last.cdfHi = 1
      last.mass = 1 - last.cdfLo
    }
  }

  // 연령 통계
  if (cfg?.age_stats) MODEL.ageStats = { ...MODEL.ageStats, ...cfg.age_stats }
  // eta 초기값
  if (cfg?.age_shape_eta) MODEL.etaByAge = { ...MODEL.etaByAge, ...cfg.age_shape_eta }
}

/** 모듈 import 즉시 1차 초기화 */
initAssetModel()

// =========================
// 전연령 CDF / Quantile
// =========================

/** 전연령 CDF: 자산 a(원) → 누적확률 [0,1] */
export function overallCDF(a) {
  const edges = MODEL.edges
  if (!edges.length) return 0

  // a가 최솟값보다 작으면 0
  if (a <= edges[0].lo) return 0

  for (const e of edges) {
    const { lo, hi, cdfLo, cdfHi, openEnded } = e

    // 유한 구간
    if (!openEnded && a >= lo && a < hi) {
      const t = (a - lo) / (hi - lo)
      return cdfLo + (cdfHi - cdfLo) * clamp(t, 0, 1)
    }

    // 오픈꼬리 구간 (a >= lo)
    if (openEnded && a >= lo) {
      if (MODEL.tail.model === 'pareto' && MODEL.tail.pareto_alpha && MODEL.tail.pareto_alpha > 0) {
        // Pareto tail: F(x) = 1 - (1 - F(lo)) * (lo/x)^alpha
        const alpha = MODEL.tail.pareto_alpha
        const tailMass = 1 - cdfLo
        const ratio = lo / Math.max(lo, a)
        const surv = tailMass * Math.pow(ratio, alpha) // S(x) = tailMass * (lo/x)^alpha
        return 1 - surv
      }
      // cap 모드: lo 이상은 전부 동일 누적치(cdfLo)로 캡
      return cdfLo
    }
  }
  // 모든 구간 상단을 초과: 1
  return 1
}

/** 전연령 Quantile(역함수): 누적확률 u∈[0,1) → 자산 x(원) */
export function overallQuantile(u) {
  const edges = MODEL.edges
  if (!edges.length) return 0
  const uu = clamp(u, 0, 0.999999)

  for (const e of edges) {
    const { lo, hi, cdfLo, cdfHi, openEnded } = e
    if (uu >= cdfLo && uu < cdfHi) {
      // 유한 구간: 선형 역보간
      if (!openEnded) {
        const t = (uu - cdfLo) / (cdfHi - cdfLo)
        return lo + (hi - lo) * clamp(t, 0, 1)
      }
      // 오픈꼬리
      if (openEnded) {
        if (
          MODEL.tail.model === 'pareto' &&
          MODEL.tail.pareto_alpha &&
          MODEL.tail.pareto_alpha > 0
        ) {
          // u = 1 - tailMass * (lo/x)^alpha  =>  (lo/x)^alpha = (1-u)/tailMass
          const alpha = MODEL.tail.pareto_alpha
          const tailMass = 1 - cdfLo
          const rhs = (1 - uu) / tailMass
          const x = e.lo * Math.pow(1 / Math.max(rhs, 1e-12), 1 / alpha)
          return x
        }
        // cap 모드: 임계값으로 고정
        return e.lo
      }
    }
  }
  // 경계값 처리
  const last = edges[edges.length - 1]
  return last.openEnded ? last.lo : last.hi
}

// =========================
// 연령대 보정 변환 g_c, g^{-1}_c
// =========================

/**
 * 연령대 c의 전방 변환 v = g_c(x)
 * x: 전연령 축(원), v: 연령대 축(원)
 * 양수: v = m_c * (x/m_all)^{eta}
 * 음수: v = x * (m_c/m_all)  (선형 스케일)
 */
function forwardTransform(ageBucket, x, eta) {
  const mAll = MODEL.medianAll
  const mC = MODEL.ageStats[ageBucket]?.median ?? mAll
  if (x >= 0) {
    const ratio = x / mAll
    return mC * Math.pow(Math.max(0, ratio), eta)
  } else {
    return x * (mC / mAll)
  }
}

/**
 * 연령대 c의 역변환 x = g_c^{-1}(v)
 * v: 연령대 축(원), x: 전연령 축(원)
 * 양수: x = m_all * (v/m_c)^{1/eta}
 * 음수: x = v * (m_all/m_c)
 */
function inverseTransform(ageBucket, v, eta) {
  const mAll = MODEL.medianAll
  const mC = MODEL.ageStats[ageBucket]?.median ?? mAll
  if (v >= 0) {
    const ratio = v / Math.max(1, mC) // 0분모 방지
    return mAll * Math.pow(Math.max(0, ratio), 1 / Math.max(1e-6, eta))
  } else {
    return v * (mAll / Math.max(1, mC))
  }
}

// =========================
// η(에타) 적합: E[g_c(X)] = mean_c
// =========================

/** 구간 내 평균 g(x) 근사치(샘플링) */
function averageTransformedInBin(ageBucket, eta, lo, hi, samples = 64, openEnded = false) {
  // 오픈꼬리 처리
  if (openEnded) {
    if (MODEL.tail.model === 'pareto' && MODEL.tail.pareto_alpha && MODEL.tail.pareto_alpha > 0) {
      // Pareto 꼬리: q in (0,1), x = lo / (1 - q)^{1/alpha}
      const alpha = MODEL.tail.pareto_alpha
      let sum = 0
      for (let i = 0; i < samples; i++) {
        const q = (i + 0.5) / samples
        const x = lo / Math.pow(1 - q, 1 / alpha)
        sum += forwardTransform(ageBucket, x, eta)
      }
      return sum / samples
    }
    // cap: 전부 lo에서 고정
    return forwardTransform(ageBucket, lo, eta)
  }

  // 유한 구간: 균일 샘플링
  if (!isFinite(lo) || !isFinite(hi) || hi === lo) {
    return forwardTransform(ageBucket, lo, eta)
  }
  let acc = 0
  for (let i = 0; i < samples; i++) {
    const t = (i + 0.5) / samples
    const x = lo + (hi - lo) * t
    acc += forwardTransform(ageBucket, x, eta)
  }
  return acc / samples
}

/** 주어진 η에서의 기대값 E[g_c(X)] 근사 */
function expectedTransformedMean(ageBucket, eta) {
  let mean = 0
  for (const e of MODEL.edges) {
    const avg = averageTransformedInBin(ageBucket, eta, e.lo, e.hi, 96, e.openEnded)
    mean += avg * e.mass
  }
  return mean
}

/** 연령 버킷별 η 추정 (이분법) */
function fitEtaForAge(ageBucket) {
  const targetMean = MODEL.ageStats[ageBucket]?.mean
  const medianC = MODEL.ageStats[ageBucket]?.median
  if (!isFinite(targetMean) || !isFinite(medianC)) return 1.0

  // 단조성 가정 하 이분법
  let lo = 0.6
  let hi = 1.4
  let mid = 1.0
  const TOL = 1e-3 // 약 천원 단위 정밀도
  const MAX_IT = 40

  // 목표 평균이 중위보다 많이 높지 않으면 eta를 1 근처로
  // (안정성 향상용 소프트 힌트)
  for (let it = 0; it < MAX_IT; it++) {
    mid = (lo + hi) / 2
    const mLo = expectedTransformedMean(ageBucket, lo)
    const mMid = expectedTransformedMean(ageBucket, mid)
    // 목표와의 거리 비교하여 구간 축소
    if (mMid < targetMean) {
      lo = mid
    } else {
      hi = mid
    }
    if (Math.abs(mMid - targetMean) <= TOL) break
  }
  return mid
}

/** 모든 연령대 η 채우기 */
export function ensureEtasFitted() {
  for (const bucket of ['20s', '30s', '40s', '50s', '60s']) {
    if (!isFinite(MODEL.etaByAge[bucket])) {
      MODEL.etaByAge[bucket] = fitEtaForAge(bucket)
    }
  }
  return { ...MODEL.etaByAge }
}

// =========================
// 퍼센타일 계산 API
// =========================

/**
 * 사용 API (가장 중요):
 * age(숫자), assetKRW(원) → { percentile, bucket, eta, debug }
 * - percentile: 상위 백분위(%) — 0.00~99.99
 *   예) 76.34면 "상위 76.34%"
 */
export function percentileForAgeAndAsset(age, assetKRW) {
  // 방어
  const a = Number(assetKRW)
  const bucket = getAgeBucket(Number(age))
  if (!isFinite(a)) return { percentile: 0, bucket, eta: 1, debug: { reason: 'NaN asset' } }

  // η 확보(필요 시 적합)
  ensureEtasFitted()
  const eta = MODEL.etaByAge[bucket] ?? 1.0

  // 연령축 v(=입력 자산) → 전연령축 x 로 역변환
  const xOverall = inverseTransform(bucket, a, eta)

  // 전연령 CDF 평가
  let u = overallCDF(xOverall) // [0,1]
  // cap 모드면 상단이 정확히 cdfLo(예: 0.99)에서 멈출 수 있음
  // 퍼센타일(%)로 변환 및 표시용 정밀도 적용
  const digits = MODEL.settings.percentile_rounding_digits ?? 2
  const pct = clamp(+(u * 100).toFixed(digits), 0, 99.99)

  return {
    percentile: pct,
    bucket,
    eta,
    debug: {
      xOverall,
      medianAll: MODEL.medianAll,
      medianAge: MODEL.ageStats[bucket]?.median ?? MODEL.medianAll,
      meanAge: MODEL.ageStats[bucket]?.mean ?? null,
      tail: MODEL.tail,
    },
  }
}

/**
 * (보너스) 연령대 상위 p% 커트라인(원)을 반환
 * p: 80 → 상위 80% (하위 20% 분위)
 * 구현: v = g_c( Q_overall(1 - p/100) )
 */
export function cutoffForTopPercent(age, p) {
  const bucket = getAgeBucket(Number(age))
  ensureEtasFitted()
  const eta = MODEL.etaByAge[bucket] ?? 1.0
  const prob = clamp(1 - Number(p) / 100, 0, 0.999999) // 하위 분위
  const x = overallQuantile(prob)
  const v = forwardTransform(bucket, x, eta)
  return Math.max(v, -1e12) // 너무 큰 음수 방지
}

// =========================
// 상태/디버그 제공자
// =========================

/** 현재 적합된 η 값 확인 */
export function getFittedEtas() {
  return { ...MODEL.etaByAge }
}

/** 모델 내부 상태 요약 (QA용) */
export function getModelSummary() {
  return {
    medianAll: MODEL.medianAll,
    tail: { ...MODEL.tail },
    etas: { ...MODEL.etaByAge },
    edges: MODEL.edges.map((e) => ({
      lo: e.lo,
      hi: e.hi === Infinity ? null : e.hi,
      mass: +e.mass.toFixed(6),
      cdfLo: +e.cdfLo.toFixed(6),
      cdfHi: +e.cdfHi.toFixed(6),
      openEnded: e.openEnded,
    })),
  }
}

// ------------------------------------------------------------
// 사용 예 (주석):
// import { percentileForAgeAndAsset, cutoffForTopPercent, formatKRW } from '@/utils/assetUtils'
//
// const p = percentileForAgeAndAsset(35, 350_000_000)
// console.log(`상위 ${p.percentile}% (버킷=${p.bucket}, η=${p.eta.toFixed(3)})`)
//
// const cut50s_top10 = cutoffForTopPercent(55, 10) // 50대 상위 10% 커트라인
// console.log('50대 상위 10% 컷:', formatKRW(cut50s_top10))
// ------------------------------------------------------------
