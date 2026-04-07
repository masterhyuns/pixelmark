/**
 * E-S13 Wedding Hanji — 한지 전통 청첩장 데이터
 */

export const couple = {
  groom: "도윤",
  bride: "소은",
  groomHanja: "道允",
  brideHanja: "素恩",
}

export const parents = {
  groomFather: "○○○",
  groomMother: "○○○",
  brideFather: "○○○",
  brideMother: "○○○",
}

export const greeting = {
  titleEn: "Two Lives, One Promise",
  paragraphs: [
    "두 사람이 오랜 시간 서로를 닮아 가더니, 어느덧 같은 곳을 바라보게 되었습니다.",
    "이제 평생을 함께하기로 약속하며, 두 사람의 새 출발에 가까운 분들을 모시고자 합니다.",
    "귀한 걸음으로 축복해 주시면 더없이 큰 기쁨이 되겠습니다.",
  ],
}

/** 매년 자동 갱신 (4월 27일 11:00) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 3, 27, 11, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 3, 27, 11, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ 한옥 웨딩홀",
  nameHanja: "韓屋 婚禮堂",
  address: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const gallery = [
  { code: "一", title: "한복", image: "hanbok" as const, caption: "단아한 색감의 전통 혼례복" },
  { code: "二", title: "한옥", image: "hanok" as const, caption: "오래된 마루와 처마, 햇살이 머무는 곳" },
  { code: "三", title: "다례", image: "tea" as const, caption: "두 가족이 마주 앉아 나누는 한 잔의 차" },
] as const

export const accounts = [
  {
    sideKr: "신랑 측",
    sideHanja: "新郞",
    items: [
      { role: "신랑 · 도윤", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신랑 아버지", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신랑 어머니", bank: "○○은행", number: "000-0000-0000-00" },
    ],
  },
  {
    sideKr: "신부 측",
    sideHanja: "新婦",
    items: [
      { role: "신부 · 소은", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신부 아버지", bank: "○○은행", number: "000-0000-0000-00" },
      { role: "신부 어머니", bank: "○○은행", number: "000-0000-0000-00" },
    ],
  },
] as const
