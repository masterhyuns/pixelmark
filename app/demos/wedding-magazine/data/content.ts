/**
 * E-S12 Wedding Magazine — 잡지 커버 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-2]
 * - 매거진 제호/Issue/cover headline은 영문 디스플레이 유지
 * - 표지 cover_lines, editorial 본문, venue는 한국어 메인
 */

export const magazine = {
  // 디스플레이 — 영문 유지
  title: "ELARA",
  subtitle: "& THEO",
  issue: "ISSUE No. 01",
  volume: "Vol. I · Spring/Summer",
  cover: {
    headline: "The Wedding Issue",
    headlineKr: "두 사람의 봄날, 한 권의 잡지로",
    subheadline: "10년의 시간을 함께 걸어온 두 사람의 조용한 결혼 이야기",
    subheadlineEn: "A Quiet Editorial on Two Lives Becoming One",
    // 영문 라벨 + 한국어 본문
    coverLines: [
      { tag: "EXCLUSIVE", text: "10년 사랑 이야기 — 두 사람의 목소리로" },
      { tag: "INSIDE", text: "작은 식순, 격조 있는 공간, 그리고 오후의 식사" },
      { tag: "PLUS", text: "조용하고 정성스러운 결혼식 준비 가이드" },
    ],
  },
  price: "PRICELESS",
  barcode: "978 0000 000000 1",
}

export const couple = {
  bride: "Elara",
  groom: "Theo",
  brideKr: "엘라라",
  groomKr: "테오",
}

export const editorial = {
  // 디스플레이
  byline: "By Elara & Theo",
  bylineKr: "엘라라와 테오의 글",
  date: "Featured Issue",
  // 본문 — 한국어 메인
  paragraphs: [
    "두 사람이 처음 만난 날에는 특별한 일이 없었습니다. 친구의 생일파티, 방 한쪽의 조용한 자리, 그리고 평소보다 조금 더 길어진 대화 한 토막. 그렇게 10년이 흐른 지금, 두 사람은 함께 살아가기로 결정했습니다.",
    "\"큰 결혼식은 원하지 않았어요. 우리를 이미 알고 있는 사람들과 조용한 하루를 보내고 싶었어요.\" 엘라라의 말에 테오는 조용히 고개를 끄덕입니다. 두 사람은 서로의 생각을 끝까지 듣지만, 서로의 문장을 끊지 않는 그런 사이입니다.",
    "결혼식은 작게 치를 예정입니다. 피로연은 그보다 더 작게요. 그러나 리넨 한 장, 꽃 한 송이, 함께 사랑한 노래의 플레이리스트까지 — 두 사람이 정성을 들인 모든 디테일 안에 조용한 아름다움이 깃들 것입니다.",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
    "There was nothing dramatic about the way they met. A friend's birthday party, a quiet corner of the room, and a conversation that stretched a little longer than it should have. Ten years later, they decided to make it official.",
    "\"We didn't want a spectacle,\" Elara says, her voice soft. \"We wanted a quiet day with the people who already know us.\" Theo nods. They are the kind of couple that finishes each other's thoughts, but never each other's sentences — out of respect, perhaps, or simply because there is no need.",
    "The ceremony will be small. The afterparty, smaller still. And yet, in the careful curation of every detail — the linen, the flowers, the playlist of songs they fell in love to — there is a kind of grandness that only quiet things can hold.",
  ],
}

// 에디토리얼 4프레임: 영문 라벨 + 한글 캡션
export const editorialItems = [
  { num: "01", title: "The Linen", titleKr: "린넨", caption: "아이보리와 오트 톤으로 통일된 테이블" },
  { num: "02", title: "The Florals", titleKr: "꽃", caption: "직접 고른 흰 꽃들로 채운 공간" },
  { num: "03", title: "The Setting", titleKr: "공간", caption: "오래된 홀, 조심스럽게 정돈된 곳" },
  { num: "04", title: "The Music", titleKr: "음악", caption: "10년에 걸쳐 모은 두 사람의 플레이리스트" },
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
  // 한국어 메인 + 영문 보조
  name: "○○ 홀",
  nameEn: "The Hall on ○○",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
