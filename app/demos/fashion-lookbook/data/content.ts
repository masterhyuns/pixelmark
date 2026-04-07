/**
 * B-S1 Fashion Lookbook — 가상 패션 브랜드 데이터
 */

export const brand = {
  name: "Noir Atelier",
  nameKr: "누아 아틀리에",
  tagline: "Quiet Garments for Quiet Days",
  season: "SS 26 Collection",
  designer: "Designed in Seoul",
}

export const collection = {
  title: "On Stillness",
  subtitle: "SS 26",
  paragraphs: [
    "We started with a single question: what does a quiet wardrobe look like? The 2026 Spring/Summer collection is our slow answer — twelve pieces, each pared back to its essential lines.",
    "Wide trousers, oversized shirts, soft black dresses. Nothing announces itself. Everything is meant to be lived in, not noticed.",
    "Made in small batches by a team of six in our Seoul atelier.",
  ],
  meta: [
    { label: "Designer", value: "Noir Atelier Studio" },
    { label: "Season", value: "Spring / Summer 2026" },
    { label: "Pieces", value: "12 garments" },
    { label: "Made In", value: "Seoul, Korea" },
  ],
}

export const looks = [
  { num: "01", title: "Oversized Coat", caption: "Black wool, single breasted" },
  { num: "02", title: "Wide Slacks", caption: "Cotton blend, ankle length" },
  { num: "03", title: "Crisp Shirt", caption: "Cotton poplin, classic collar" },
  { num: "04", title: "Leather Bag", caption: "Vegetable-tanned, soft handle" },
  { num: "05", title: "Ankle Boots", caption: "Calfskin, hand-stitched sole" },
] as const

export const stores = [
  {
    name: "Noir Atelier · Seoul",
    address: "○○-gu, Seoul",
    addressKr: "서울특별시 ○○구 ○○로 ○○",
    hours: "Tue — Sun · 12:00 — 19:00",
  },
  {
    name: "Noir Atelier · Online",
    address: "noiratelier.example",
    addressKr: "온라인 스토어 (가상)",
    hours: "Open 24/7",
  },
] as const

export const venue = {
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
