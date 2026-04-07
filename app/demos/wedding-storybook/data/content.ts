/**
 * E-S18 Wedding Storybook — 동화책 청첩장 데이터
 */

export const story = {
  title: "Once Upon a Time",
  author: "Written by Rosé & Theo",
  publisher: "Pixelmark Storybooks",
  openLine: "Once upon a time, in a small city not so far away, there lived two quiet hearts.",
}

export const couple = {
  bride: "Rosé",
  groom: "Theo",
}

export const chapters = [
  {
    num: "I",
    title: "The Meeting",
    titleKr: "만남",
    paragraphs: [
      "It was a Tuesday afternoon, and the sky was the color of soft milk. Rosé was reading a book in her favorite corner of the library, and Theo was looking for the same book.",
      "He asked, very politely, if she would mind sharing. She didn't mind. They spent the next three hours not reading at all.",
    ],
  },
  {
    num: "II",
    title: "The Promise",
    titleKr: "약속",
    paragraphs: [
      "Many quiet seasons passed. They walked the same streets, drank the same coffee, and slowly built a life from a thousand small mornings.",
      "And one evening, beneath an old tree in a small park, they made a quiet promise. The kind of promise you don't have to say twice.",
    ],
  },
] as const

export const gallery = [
  { num: "i", caption: "A small tree, a quiet bench" },
  { num: "ii", caption: "The morning light, just so" },
  { num: "iii", caption: "And then, a quiet promise" },
] as const

/** 매년 자동 갱신 (5월 11일 13:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 4, 11, 13, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 4, 11, 13, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Garden Hall",
  nameKr: "○○ 가든 홀",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const accounts = [
  { side: "Bride's Side", role: "Rosé", bank: "○○BANK", number: "0000-0000-0000-00" },
  { side: "Groom's Side", role: "Theo", bank: "○○BANK", number: "0000-0000-0000-00" },
] as const
