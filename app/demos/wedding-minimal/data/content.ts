/**
 * E-S1 Wedding Minimal — 데모 콘텐츠 데이터
 *
 * [컨벤션]
 * - 신랑신부 이름 / 양가 부모 / 식장 / 주소 / 계좌번호 모두 placeholder.
 * - 향후 실제 의뢰 시 클라이언트가 이 파일만 교체.
 * - 흔한 실명/실존 식장 사용 금지 (데모 안전성 컨벤션 #001).
 */

export const couple = {
  groomName: "○○",
  brideName: "○○",
  /** 영문 디스플레이 이름 (Cormorant Garamond 디스플레이용) */
  groomDisplay: "GROOM",
  brideDisplay: "BRIDE",
}

export const parents = {
  groomFather: "○○○",
  groomMother: "○○○",
  brideFather: "○○○",
  brideMother: "○○○",
}

export const greeting = [
  "서로의 곁에서 같은 곳을 바라보며 걸어온 시간이 어느덧 결실을 맺으려 합니다.",
  "두 사람이 사랑으로 만든 약속의 자리에 귀한 걸음으로 축복해 주시면 더없는 기쁨으로 간직하겠습니다.",
]

export const story = [
  {
    chapter: "Chapter 01",
    title: "처음 만난 날",
    body:
      "조용한 카페 창가에서 우리는 우연히 같은 책을 펼쳤습니다. 짧은 인사가 긴 대화가 되었고, 그날의 따뜻한 햇살을 우리는 아직 기억합니다.",
  },
  {
    chapter: "Chapter 02",
    title: "함께한 계절",
    body:
      "봄의 산책길, 여름의 바닷가, 가을의 낙엽길, 겨울의 골목길. 같은 풍경을 다른 마음으로 보던 우리는 어느새 같은 마음이 되었습니다.",
  },
  {
    chapter: "Chapter 03",
    title: "약속의 순간",
    body:
      "수많은 평범한 저녁 중 어느 하루, 우리는 평생을 함께하기로 약속했습니다. 화려한 다짐 대신 조용한 끄덕임으로, 그렇게 오래된 친구처럼.",
  },
]

/**
 * 결혼식 일정 — 미래 날짜로 둬야 D-day 카운트다운이 의미 있음.
 * 데모이므로 매년 6월 15일로 자동 갱신되도록 helper 사용.
 */
export const getWeddingDate = (): Date => {
  const now = new Date()
  // 올해 6월 15일이 지났으면 내년 6월 15일로
  const thisYear = new Date(now.getFullYear(), 5, 15, 13, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 15, 13, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ 웨딩홀 그랜드볼룸",
  address: "서울특별시 ○○구 ○○로 ○○",
  detail: "5층 그랜드볼룸",
  /** 가상 좌표 — 카카오맵 일반 임베드용 (서울시청 부근) */
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const directions = [
  {
    type: "지하철",
    desc: "○○역 1번 출구에서 도보 5분 거리에 있습니다.",
  },
  {
    type: "버스",
    desc: "간선 ○○○, 지선 ○○○ 정류장에서 도보 3분.",
  },
  {
    type: "자가용",
    desc: "건물 지하 1층~3층 주차장 이용 가능 (2시간 무료).",
  },
]

export const accounts = [
  {
    side: "신랑측",
    items: [
      { role: "신랑", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
      { role: "신랑 아버지", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
      { role: "신랑 어머니", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
    ],
  },
  {
    side: "신부측",
    items: [
      { role: "신부", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
      { role: "신부 아버지", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
      { role: "신부 어머니", bank: "○○은행", number: "000-0000-0000-00", name: "○ ○ ○" },
    ],
  },
]
