/**
 * E-S2 Baby Celebration — 데모 콘텐츠 데이터
 *
 * [컨벤션]
 * - 아기/부모/식장/계좌 모두 placeholder
 * - 흔한 실명 사용 금지 (데모 안전성 컨벤션)
 * - 향후 실제 의뢰 시 클라이언트가 이 파일만 교체
 */

export const baby = {
  name: "○○이",
  /** 인트로 디스플레이용 영문 (Quicksand) */
  display: "BABY",
  birthDate: "2024. 06. 22",
}

export const parents = {
  father: "○○",
  mother: "○○",
}

export const greeting = [
  "사랑스러운 우리 아이가 어느덧 첫 번째 생일을 맞이합니다.",
  "건강하게 자라준 아이의 작은 축하 자리에, 따뜻한 마음으로 함께해 주시면 큰 기쁨이 되겠습니다.",
]

export const growth = [
  {
    month: 0,
    label: "0 months",
    title: "처음 만난 날",
    caption: "아주 작은 손, 더 작은 발. 세상에서 가장 큰 선물이 되어 우리 곁에 왔습니다.",
  },
  {
    month: 3,
    label: "3 months",
    title: "첫 미소",
    caption: "조그만 신발도 아직 너무 큰 시기. 옹알이로 처음 우리에게 인사를 건넸어요.",
  },
  {
    month: 6,
    label: "6 months",
    title: "장난감 친구",
    caption: "곰돌이 인형이 가장 친한 친구. 손에 닿는 모든 것이 신기하고 즐거운 시간.",
  },
  {
    month: 9,
    label: "9 months",
    title: "한 발짝씩",
    caption: "혼자 앉고, 기고, 작은 한 걸음. 매일이 새로운 기록이 되는 계절.",
  },
  {
    month: 12,
    label: "12 months",
    title: "첫 번째 생일",
    caption: "케이크 위 작은 1번 초. 우리에게 와 주어 고마운 1년이 지나갑니다.",
  },
] as const

/**
 * 행사 일정 — 매년 6월 22일 12:00 (지났으면 다음 해)
 */
export const getEventDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 5, 22, 12, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 22, 12, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ 컨벤션",
  hall: "3층 가든홀",
  address: "서울특별시 ○○구 ○○로 ○○",
  /** 가상 좌표 — 카카오맵 일반 임베드(서울시청 부근) */
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const directions = [
  { type: "지하철", desc: "○○역 2번 출구에서 도보 7분 거리에 있습니다." },
  { type: "버스", desc: "간선 ○○○, 지선 ○○○ 정류장에서 도보 4분." },
  { type: "주차", desc: "건물 지하 1층~3층 주차장 무료 이용 가능 (3시간)." },
]

export const gifts = [
  {
    title: "감사의 작은 선물",
    desc: "오시는 모든 분들께 작은 답례 박스를 준비했습니다. 정성스럽게 포장된 손편지가 함께합니다.",
  },
  {
    title: "달콤한 마카롱",
    desc: "아이의 첫 번째 생일을 기념해 파스텔 컬러 마카롱 한 상자를 함께 드립니다.",
  },
] as const
