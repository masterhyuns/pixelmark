/**
 * B-S1 Fashion Lookbook — 가상 패션 브랜드 데이터
 *
 * [언어 정책 v1.0 §4-7]
 * - 브랜드/컬렉션 제목/룩 라벨은 영문 디스플레이 유지
 * - 컬렉션 본문, 매장 안내, 룩 캡션은 한국어 메인
 */

export const brand = {
  name: "Noir Atelier",
  nameKr: "누아 아틀리에",
  tagline: "Quiet Garments for Quiet Days",
  taglineKr: "조용한 날들을 위한 조용한 옷",
  season: "SS 26 Collection",
  designer: "Designed in Seoul",
  designerKr: "서울에서 만든 옷",
}

export const collection = {
  title: "On Stillness",
  titleKr: "고요에 대하여",
  subtitle: "SS 26",
  // 본문 — 한국어 메인
  paragraphs: [
    "우리는 단 하나의 질문에서 시작했습니다. '조용한 옷장이란 어떤 모습일까?' 2026 봄/여름 컬렉션은 그 질문에 대한 천천히 내놓은 답입니다 — 본질적인 라인만 남긴 12벌의 옷.",
    "와이드 슬랙스, 오버사이즈 셔츠, 부드러운 검정 드레스. 어느 것 하나 자신을 드러내지 않습니다. 모든 옷은 시선을 끌기 위한 것이 아니라, 입고 살아가기 위한 것입니다.",
    "서울의 작은 아틀리에에서 여섯 명의 팀이 소량으로 만들었습니다.",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
    "We started with a single question: what does a quiet wardrobe look like? The 2026 Spring/Summer collection is our slow answer — twelve pieces, each pared back to its essential lines.",
    "Wide trousers, oversized shirts, soft black dresses. Nothing announces itself. Everything is meant to be lived in, not noticed.",
    "Made in small batches by a team of six in our Seoul atelier.",
  ],
  // label 영문 + labelKr 한국어 병기
  meta: [
    { label: "Designer", labelKr: "디자이너", value: "Noir Atelier Studio" },
    { label: "Season", labelKr: "시즌", value: "Spring / Summer 2026" },
    { label: "Pieces", labelKr: "구성", value: "12 garments · 12벌" },
    { label: "Made In", labelKr: "제작", value: "서울, 대한민국" },
  ],
}

// 룩: 영문 타이틀 유지, 캡션은 한국어 메인
export const looks = [
  { num: "01", title: "Oversized Coat", titleKr: "오버사이즈 코트", caption: "검정 울, 싱글 브레스트" },
  { num: "02", title: "Wide Slacks", titleKr: "와이드 슬랙스", caption: "코튼 혼방, 발목 길이" },
  { num: "03", title: "Crisp Shirt", titleKr: "크리스프 셔츠", caption: "코튼 포플린, 클래식 칼라" },
  { num: "04", title: "Leather Bag", titleKr: "레더 백", caption: "베지터블 태닝, 부드러운 손잡이" },
  { num: "05", title: "Ankle Boots", titleKr: "앵클 부츠", caption: "카프스킨, 핸드 스티치 솔" },
] as const

// 매장: 한국어 메인 + 영문 보조
export const stores = [
  {
    name: "누아 아틀리에 · 서울",
    nameEn: "Noir Atelier · Seoul",
    address: "서울특별시 ○○구 ○○로 ○○",
    addressEn: "○○-gu, Seoul",
    hours: "화 — 일 · 12:00 — 19:00",
  },
  {
    name: "누아 아틀리에 · 온라인",
    nameEn: "Noir Atelier · Online",
    address: "온라인 스토어 (가상)",
    addressEn: "noiratelier.example",
    hours: "연중무휴 · 24시간 운영",
  },
] as const

export const venue = {
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
