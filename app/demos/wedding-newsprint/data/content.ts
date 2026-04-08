/**
 * E-S16 Wedding Newsprint — 신문 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-1]
 * - 디스플레이(제호/모토/발행/카테고리 라벨)는 영문 유지
 * - 본문(헤드라인 부제, article paragraphs, 분류광고 본문)은 한국어 메인
 * - 영문 본문은 *En 접미사로 디스플레이용 보존
 */

export const newspaper = {
  // 디스플레이 — 영문 유지
  masthead: "THE PIXELMARK TIMES",
  motto: "All the news that's fit to celebrate.",
  edition: "WEDDING EDITION · No. 0042",
  city: "SEOUL · KOREA",
}

export const couple = {
  bride: "Olivia",
  groom: "Henry",
  brideKr: "올리비아",
  groomKr: "헨리",
}

// 큰 디스플레이 헤드라인 (영문 유지)
export const headlineEn = "OLIVIA & HENRY TO WED THIS SPRING"
// 한글 메인 헤드라인 (정보 전달)
export const headline = "올리비아와 헨리, 봄에 결혼합니다"
// 부제 (한국어 메인)
export const subhead = "10년의 시간을 함께 걸어온 두 사람이 가족이 됩니다."
export const subheadEn = "Long-time companions announce a quiet ceremony among close friends and family."

export const article = {
  // 디스플레이 영문 유지
  byline: "By Pixelmark Lifestyle Desk",
  bylineKr: "픽셀마크 라이프스타일 데스크",
  // 본문 — 한국어 메인
  paragraphs: [
    "10년의 시간을 함께 걸어온 두 사람이, 이제 가족이 되려 합니다. 결혼식은 늦봄의 어느 오후, 가까운 분들만 모시고 조용히 진행할 예정입니다.",
    "\"큰 파티도 생각해봤어요. 그런데 둘 다 주목받는 걸 좋아하는 편이 아니라서요.\" 신부 올리비아의 말에 신랑 헨리는 조용히 고개를 끄덕입니다. 두 사람은 친구의 소개로 만나, 그 후로 줄곧 서로의 일상을 함께 채워왔습니다.",
    "결혼식은 서울 시내의 작은 공간에서 진행됩니다. 가까운 가족과 친구들만 모시고, 짧은 오후 식순 후 이른 저녁식사를 함께할 예정입니다.",
    "양가 부모님 모두 두 사람의 결정을 진심으로 축하해 주고 계십니다. \"조용한 두 사람이에요. 두 사람에게 꼭 맞는 결혼식이 될 거예요.\" 신부 어머님의 말씀입니다.",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
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
  // 한국어 메인 + 영문 보조 (정책 §3 패턴)
  name: "○○ 홀",
  nameEn: "○○ Hall",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

// 분류광고: 라벨만 영문, 본문은 한국어 (위트 살림)
export const classifieds = [
  {
    label: "WANTED",
    title: "조용한 오후를 좋아하는 하객을 모십니다",
    desc: "아래 RSVP 폼으로 신청해 주세요. 경력 무관, 저녁식사 포함.",
  },
  {
    label: "FOR SALE",
    title: "두 개의 마음, 사용감 약간 있음",
    desc: "둘 다 정상 작동. 분리 불가. 사실 비매품입니다.",
  },
  {
    label: "LOST",
    title: "총각 1명을 잃어버렸습니다 (이름: 헨리)",
    desc: "마지막 목격 시 조용한 미소를 짓고 있었습니다. 발견 시 올리비아에게 돌려주세요.",
  },
] as const

// 계좌: 영문 라벨 + 한글 병기
export const accounts = [
  { side: "신부측 · BRIDE", role: "올리비아 (Olivia)", bank: "○○은행", number: "0000-0000-0000-00" },
  { side: "신랑측 · GROOM", role: "헨리 (Henry)", bank: "○○은행", number: "0000-0000-0000-00" },
] as const
