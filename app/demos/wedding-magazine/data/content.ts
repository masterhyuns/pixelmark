/**
 * E-S12 Wedding Magazine — 잡지 커버 청첩장 데이터
 */

export const magazine = {
  title: "ELARA",
  subtitle: "& THEO",
  issue: "ISSUE No. 01",
  volume: "Vol. I · Spring/Summer",
  cover: {
    headline: "The Wedding Issue",
    subheadline: "A Quiet Editorial on Two Lives Becoming One",
    cover_lines: [
      "EXCLUSIVE — A 10-year love story, in their own words",
      "INSIDE — The intimate ceremony, the venue, the after-party",
      "PLUS — A guide to the perfect quiet wedding",
    ],
  },
  price: "PRICELESS",
  barcode: "978 0000 000000 1",
}

export const couple = {
  bride: "Elara",
  groom: "Theo",
}

export const editorial = {
  byline: "By Elara & Theo",
  date: "Featured Issue",
  paragraphs: [
    "There was nothing dramatic about the way they met. A friend's birthday party, a quiet corner of the room, and a conversation that stretched a little longer than it should have. Ten years later, they decided to make it official.",
    "\"We didn't want a spectacle,\" Elara says, her voice soft. \"We wanted a quiet day with the people who already know us.\" Theo nods. They are the kind of couple that finishes each other's thoughts, but never each other's sentences — out of respect, perhaps, or simply because there is no need.",
    "The ceremony will be small. The afterparty, smaller still. And yet, in the careful curation of every detail — the linen, the flowers, the playlist of songs they fell in love to — there is a kind of grandness that only quiet things can hold.",
  ],
}

export const editorialItems = [
  { num: "01", title: "The Linen", caption: "Ivory and oat tones throughout" },
  { num: "02", title: "The Florals", caption: "Locally sourced, mostly white" },
  { num: "03", title: "The Setting", caption: "An old hall, gently restored" },
  { num: "04", title: "The Music", caption: "A playlist a decade in the making" },
] as const

/** 매년 자동 갱신 (5월 25일 15:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 4, 25, 15, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 4, 25, 15, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "The Hall on ○○",
  nameKr: "○○ 홀",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
