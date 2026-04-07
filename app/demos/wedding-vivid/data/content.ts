/**
 * E-S8 Wedding Vivid — 가상 데이터
 */

export const couple = {
  groom: "Jun",
  bride: "Mira",
  groomKr: "준",
  brideKr: "미라",
}

export const parents = {
  groomFather: "○○○",
  groomMother: "○○○",
  brideFather: "○○○",
  brideMother: "○○○",
}

/** 매년 자동 갱신 (10월 25일 16:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 9, 25, 16, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 9, 25, 16, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Studio Hall",
  nameKr: "○○ 스튜디오 홀",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○ · 2F",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const greeting = {
  titleEn: "Bold New Beginning",
  titleKr: "새로운 시작을 함께해요",
  paragraphs: [
    "우리 두 사람, 각자의 색깔을 지켜온 시간 끝에 나란히 새로운 출발선에 섰습니다.",
    "평범한 하루들 사이에 피어난 결심을 여러분과 함께 나누고 싶어 작은 자리를 마련했어요.",
  ],
}

export const accounts = [
  {
    side: "Groom's Side",
    sideKr: "신랑 측",
    color: "#2962FF",
    items: [
      { role: "신랑 · Jun", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신랑 아버지", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신랑 어머니", bank: "○○은행", number: "000-0000-0000-00" },
    ],
  },
  {
    side: "Bride's Side",
    sideKr: "신부 측",
    color: "#FF5252",
    items: [
      { role: "신부 · Mira", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신부 아버지", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신부 어머니", bank: "○○은행", number: "000-0000-0000-00" },
    ],
  },
] as const
