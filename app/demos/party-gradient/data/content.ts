/**
 * E-S5 Party Gradient — 가상 파티 데이터
 *
 * [컨벤션]
 * - 호스트명 placeholder (Selina)
 * - 장소 가상 · 인물 얼굴 X
 */

export const party = {
  host: "Selina",
  hostFull: "Selina Kim",
  title: "Birthday Party",
  tagline: "A little party never hurt nobody.",
  greeting: [
    "올해도 어김없이 돌아온 저의 생일, 소중한 친구들과 작은 파티를 열어요.",
    "맛있는 음식, 여유로운 음악, 편안한 밤 — 부담 없이 와서 함께 이 하루를 즐겨 주세요.",
  ],
}

/** 매년 자동 갱신 (8월 8일 19:00, 지났으면 다음 해) */
export const getPartyDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 7, 8, 19, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 7, 8, 19, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Lounge Garden",
  nameKr: "○○ 라운지 가든",
  address: "서울특별시 ○○구 ○○로 ○○ · 3F",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const dressCode = [
  {
    color: "Pink",
    colorKr: "핑크",
    hex: "#ff9bb8",
    keyword: "Sweet & Playful",
    desc: "파스텔 핑크 톤의 원피스나 블라우스. 리본, 펄 액세서리 추천.",
    image: "pink" as const,
  },
  {
    color: "Blue",
    colorKr: "블루",
    hex: "#9bbaff",
    keyword: "Fresh & Cool",
    desc: "베이비 블루, 라벤더 톤. 실버/크리스털 액세서리와 매치.",
    image: "blue" as const,
  },
  {
    color: "Purple",
    colorKr: "퍼플",
    hex: "#c49bff",
    keyword: "Dreamy & Soft",
    desc: "옅은 라일락, 모브 톤. 플로럴 패턴이나 시폰 소재 권장.",
    image: "purple" as const,
  },
  {
    color: "White",
    colorKr: "화이트",
    hex: "#ffffff",
    keyword: "Pure & Clean",
    desc: "오프화이트, 크림 톤. 단정한 드레스나 깔끔한 세트업 추천.",
    image: "white" as const,
  },
] as const

export const partyInfo = {
  dateLabel: "Save the Date",
  timeLabel: "19:00 — Late",
  dressNote: "편안한 파스텔 룩이면 무엇이든 환영!",
}
