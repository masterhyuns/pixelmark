/**
 * E-S17 Wedding Postal — 우편 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-4]
 * - 봉투 외관 PAR AVION 등은 영문 디스플레이 유지
 * - 편지 본문은 손글씨 한국어 메인
 * - 엽서 도시명은 영문 OK, 캡션은 한국어
 */

export const couple = {
  bride: "Amélie",
  groom: "Léo",
  brideKr: "아멜리",
  groomKr: "레오",
}

export const envelope = {
  from: {
    name: "Amélie & Léo",
    nameKr: "아멜리와 레오",
    address: "서울특별시 ○○동",
    addressEn: "○○-dong, Seoul, KOREA",
  },
  to: {
    name: "To Our Dearest Friend",
    nameKr: "사랑하는 친구에게",
    address: "이 편지를 읽고 계신 그곳에",
    addressEn: "Wherever you are reading this",
  },
  stamp: "PAR AVION · AIR MAIL",
}

export const letter = {
  greeting: "사랑하는 친구에게,",
  greetingEn: "Dear Friend,",
  // 본문 — 한국어 메인 (손글씨 폰트 + 한국어)
  paragraphs: [
    "이 편지가 너에게 닿을 즈음이면, 우리는 이미 결정했을 거야. 우리, 결혼해. 시끄럽지 않게, 부드러운 봄날의 어느 오후에.",
    "어떻게 알릴까 오래 고민했어. 메시지는 너무 빠른 것 같았고, 전화는 너무 갑작스러웠고. 그래서 옛날 사람들처럼, 이렇게 편지를 써.",
    "그날 와 줄래? 거창하진 않을 거야. 작은 꽃 몇 송이, 오래된 홀 하나, 그리고 우리가 가장 사랑하는 사람들. 시간이 된다면, 와 줘.",
    "사랑을 담아,",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
    "By the time this letter reaches you, we have already decided. We are getting married — quietly, without much fanfare, on a soft afternoon this spring.",
    "We thought a long time about how to tell you. A message felt too quick. A phone call felt too sudden. So we wrote you this letter instead, the way people used to.",
    "We hope you'll be there with us. There won't be much, just a few flowers, an old hall, and the people we love most in the world. Please come if you can.",
    "With love,",
  ],
  signature: "아멜리 & 레오",
  signatureEn: "Amélie & Léo",
}

// 엽서: 도시명 영문 OK, 캡션 한국어
export const postcards = [
  { code: "01", city: "Provence, France", cityKr: "프로방스", caption: "라벤더 사이를 함께 걸었던 곳", image: "01" as const },
  { code: "02", city: "Lisbon, Portugal", cityKr: "리스본", caption: "노란 트램과 타일 벽의 오후", image: "02" as const },
  { code: "03", city: "Kyoto, Japan", cityKr: "교토", caption: "봄비 내리던 조용한 사찰의 풍경", image: "03" as const },
  { code: "04", city: "Seoul, Korea", cityKr: "서울", caption: "마침내 우리가 함께 머무를 곳", image: "04" as const },
] as const

/** 매년 자동 갱신 (5월 4일 14:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 4, 4, 14, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 4, 4, 14, 0, 0)
  }
  return thisYear
}

export const venue = {
  // 한국어 메인 + 영문 보조
  name: "○○ 가든 홀",
  nameEn: "○○ Garden Hall",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  postcode: "○○○○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
