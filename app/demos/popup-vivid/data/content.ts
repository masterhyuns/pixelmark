/**
 * E-S3 Popup Vivid — 가상 캠페인 데이터
 *
 * [컨벤션]
 * - 캠페인 / 입점 브랜드 / 장소 모두 placeholder
 * - 실존 브랜드명/로고 사용 금지
 */

export const campaign = {
  title: "Pixelmark Popup Vol. 01",
  /** 디스플레이용 (큰 산세리프 3행 분할) */
  display: ["PIXELMARK", "POPUP", "VOL.01"],
  slogan: "Color the Moment",
}

export const tagline =
  "잠깐 머무는 공간, 오래 남는 컬러. 일주일 동안만 열리는 비비드 컬러 캠페인."

export const concept = {
  eyebrow: "Concept",
  title: "We turn space into color.",
  paragraphs: [
    "Pixelmark Popup Vol. 01은 짧지만 강렬한 색을 남기는 캠페인입니다. 비비드 핑크와 옐로우, 일렉트릭 오렌지 — 세 가지 컬러가 하나의 공간 안에서 충돌하고 섞입니다.",
    "그래픽, 사물, 사운드, 향까지 — 모든 감각이 동시에 작동하는 일주일짜리 실험. 일상의 흐름을 잠시 끊고, 색이 가진 힘을 직접 경험해 보세요.",
  ],
}

export const brands = [
  {
    code: "B—01",
    name: "BRAND ONE",
    color: "#ff3366",
    desc: "비비드 핑크를 베이스로 한 컬러 오브제 작업 그룹. 첫 번째 룸에서 만나볼 수 있습니다.",
  },
  {
    code: "B—02",
    name: "BRAND TWO",
    color: "#ff7a18",
    desc: "오렌지·옐로우 톤의 그래픽 디자인 스튜디오. 한정판 포스터 시리즈를 공개합니다.",
  },
  {
    code: "B—03",
    name: "BRAND THREE",
    color: "#1d6cff",
    desc: "일렉트릭 블루 × 핑크의 사운드 / 비주얼 콜라보 팀. 현장 라이브 세션이 진행됩니다.",
  },
] as const

/**
 * 캠페인 시작일 — 매년 7월 12일 14:00 (지났으면 다음 해)
 */
export const getCampaignDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 6, 12, 14, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 6, 12, 14, 0, 0)
  }
  return thisYear
}

export const event = {
  schedule: "07.12 (SAT) — 07.20 (SUN)",
  hours: "12:00 — 21:00 (Last Entry 20:30)",
  venueName: "○○ 갤러리 1F",
  address: "서울특별시 ○○구 ○○로 ○○",
  /** 가상 좌표 — 카카오맵 일반 임베드(서울시청 부근) */
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const hashtags = [
  "#PixelmarkPopup",
  "#ColorTheMoment",
  "#PopupVol01",
  "#OneWeekOnly",
] as const
