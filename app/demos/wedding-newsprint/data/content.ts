/**
 * E-S16 Wedding Newsprint — 신문 청첩장 데이터
 */

export const newspaper = {
  masthead: "THE PIXELMARK TIMES",
  motto: "All the news that's fit to celebrate.",
  edition: "WEDDING EDITION · No. 0042",
  city: "SEOUL · KOREA",
}

export const couple = {
  bride: "Olivia",
  groom: "Henry",
}

export const headline = "OLIVIA & HENRY TO WED THIS SPRING"
export const subhead = "Long-time companions announce a quiet ceremony among close friends and family."

export const article = {
  byline: "By Pixelmark Lifestyle Desk",
  paragraphs: [
    "After almost a decade of patient mornings, slow Sundays, and one shared apartment, Olivia and Henry have decided to make it official. The ceremony, planned for late spring, will be small and unfussy — much like the couple themselves.",
    "\"We thought about a big party,\" Olivia explains, \"but neither of us is particularly good at being the center of attention.\" Henry, true to form, simply nods. The couple met through a mutual friend and have been quietly building a life together since.",
    "The wedding will be held at a small venue in central Seoul. Close friends and family are invited, with a brief afternoon program followed by an early dinner.",
    "Both families have expressed their joy. \"They're a quiet pair, and I think that's exactly what they needed,\" said Olivia's mother.",
  ],
}

/** 매년 자동 갱신 (4월 13일 14:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 3, 13, 14, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 3, 13, 14, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Hall",
  nameKr: "○○ 홀",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const classifieds = [
  {
    label: "WANTED",
    title: "GUESTS WHO LOVE A QUIET AFTERNOON",
    desc: "Apply via the RSVP form below. No experience necessary. Free dinner included.",
  },
  {
    label: "FOR SALE",
    title: "TWO HEARTS, GENTLY USED",
    desc: "Both in working condition. Cannot be separated. Not for sale, actually.",
  },
  {
    label: "LOST",
    title: "ONE BACHELOR, NAMED HENRY",
    desc: "Last seen wearing a quiet smile. If found, please return to Olivia.",
  },
] as const

export const accounts = [
  { side: "BRIDE'S COLUMN", role: "Olivia", bank: "○○BANK", number: "0000-0000-0000-00" },
  { side: "GROOM'S COLUMN", role: "Henry", bank: "○○BANK", number: "0000-0000-0000-00" },
] as const
