/**
 * E-S17 Wedding Postal — 우편 청첩장 데이터
 */

export const couple = {
  bride: "Amélie",
  groom: "Léo",
}

export const envelope = {
  from: {
    name: "Amélie & Léo",
    address: "○○-dong, Seoul, KOREA",
  },
  to: {
    name: "To Our Dearest Friend",
    address: "Wherever you are reading this",
  },
  stamp: "PAR AVION · AIR MAIL",
}

export const letter = {
  greeting: "Dear Friend,",
  paragraphs: [
    "By the time this letter reaches you, we have already decided. We are getting married — quietly, without much fanfare, on a soft afternoon this spring.",
    "We thought a long time about how to tell you. A message felt too quick. A phone call felt too sudden. So we wrote you this letter instead, the way people used to.",
    "We hope you'll be there with us. There won't be much, just a few flowers, an old hall, and the people we love most in the world. Please come if you can.",
    "With love,",
  ],
  signature: "Amélie & Léo",
}

export const postcards = [
  { code: "01", city: "Provence, France", caption: "Where we walked through lavender", image: "01" as const },
  { code: "02", city: "Lisbon, Portugal", caption: "Old yellow trams and tiled walls", image: "02" as const },
  { code: "03", city: "Kyoto, Japan", caption: "Quiet temples in spring rain", image: "03" as const },
  { code: "04", city: "Seoul, Korea", caption: "Where we'll finally settle down", image: "04" as const },
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
  name: "○○ Garden Hall",
  nameKr: "○○ 가든 홀",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  postcode: "○○○○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
