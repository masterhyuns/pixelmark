/**
 * E-S18 Wedding Storybook — 동화책 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-6]
 * - 책 표지/챕터 제목은 영문 디스플레이 유지
 * - 챕터 본문은 한국어 메인 (paragraphsEn 보조)
 * - venue / 갤러리 캡션 한국어 메인
 */

export const story = {
  title: "Once Upon a Time",
  titleKr: "옛날 옛적에",
  author: "Written by Rosé & Theo",
  authorKr: "로제 & 테오 지음",
  publisher: "Pixelmark Storybooks",
  openLine: "그리 멀지 않은 어느 작은 도시에, 두 개의 조용한 마음이 살고 있었습니다.",
  openLineEn: "Once upon a time, in a small city not so far away, there lived two quiet hearts.",
}

export const couple = {
  bride: "Rosé",
  groom: "Theo",
  brideKr: "로제",
  groomKr: "테오",
}

export const chapters = [
  {
    num: "I",
    title: "The Meeting",
    titleKr: "만남",
    paragraphs: [
      "어느 화요일 오후, 하늘은 부드러운 우유 빛깔이었습니다. 로제는 도서관 가장 좋아하는 구석에서 책을 읽고 있었고, 테오는 같은 책을 찾고 있었습니다.",
      "그는 아주 정중하게, 함께 봐도 괜찮을지 물었습니다. 그녀는 괜찮다고 답했고, 두 사람은 그 후 세 시간 동안 책은 한 줄도 읽지 않았습니다.",
    ],
    paragraphsEn: [
      "It was a Tuesday afternoon, and the sky was the color of soft milk. Rosé was reading a book in her favorite corner of the library, and Theo was looking for the same book.",
      "He asked, very politely, if she would mind sharing. She didn't mind. They spent the next three hours not reading at all.",
    ],
  },
  {
    num: "II",
    title: "The Promise",
    titleKr: "약속",
    paragraphs: [
      "여러 번의 조용한 계절이 지나갔습니다. 두 사람은 같은 거리를 걸었고, 같은 커피를 마셨고, 천 번의 작은 아침으로 천천히 삶을 함께 지어 나갔습니다.",
      "그러던 어느 저녁, 작은 공원의 오래된 나무 아래에서, 두 사람은 조용한 약속을 했습니다. 두 번 말할 필요 없는 그런 약속을요.",
    ],
    paragraphsEn: [
      "Many quiet seasons passed. They walked the same streets, drank the same coffee, and slowly built a life from a thousand small mornings.",
      "And one evening, beneath an old tree in a small park, they made a quiet promise. The kind of promise you don't have to say twice.",
    ],
  },
] as const

export const gallery = [
  { num: "i", caption: "작은 나무 한 그루, 조용한 벤치 하나" },
  { num: "ii", caption: "꼭 알맞은 아침의 빛" },
  { num: "iii", caption: "그리고 어느 날, 조용한 약속 하나" },
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
  // 한국어 메인 + 영문 보조
  name: "○○ 가든 홀",
  nameEn: "○○ Garden Hall",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const accounts = [
  { side: "신부측", sideEn: "Bride's Side", role: "로제", bank: "○○BANK", number: "0000-0000-0000-00" },
  { side: "신랑측", sideEn: "Groom's Side", role: "테오", bank: "○○BANK", number: "0000-0000-0000-00" },
] as const
