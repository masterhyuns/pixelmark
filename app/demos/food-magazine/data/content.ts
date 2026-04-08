/**
 * B-S2 Food Magazine — Verde Provisions 데이터
 *
 * [언어 정책 v1.0]
 * - 브랜드명/슬로건은 영문 디스플레이 유지
 * - 본문/제품 설명/스토리는 한국어 메인 (영문 보조)
 */

export const brand = {
  name: "Verde Provisions",
  nameKr: "베르데 프로비전",
  tagline: "From Field to Table",
  taglineKr: "들판에서 식탁까지",
  founded: "2024 · Seoul",
}

export const home = {
  heroEyebrow: "Slow Food, Honestly Made",
  heroEyebrowKr: "정직하게 만든 슬로 푸드",
  heroTitle: "Verde\nProvisions",
  // 본문 — 한국어 메인
  heroBody:
    "강원도 작은 농장에서 키운 곡물과 과일로, 천천히 그리고 손으로 만듭니다. 라벨이 짧을수록 좋은 재료라는 믿음으로 — 단 다섯 가지 원료만으로 만드는 베르데의 식료품을 소개합니다.",
  heroBodyEn:
    "Grains and fruit from a small farm in Gangwon, slowly made by hand. Five ingredients or fewer, always.",
  marqueeWords: ["GRAIN", "HONEY", "JAM", "BREAD", "GRANOLA", "TEA"],
}

export const featured = [
  {
    num: "01",
    title: "Wildflower Honey",
    titleKr: "야생화 꿀",
    caption: "강원도 산 야생화 꿀 한 병",
    image: "honey" as const,
  },
  {
    num: "02",
    title: "Stone Ground Bread",
    titleKr: "통밀 사워도우",
    caption: "효모 없이 천천히 발효한 빵",
    image: "bread" as const,
  },
  {
    num: "03",
    title: "Artisan Granola",
    titleKr: "수제 그래놀라",
    caption: "오트와 견과, 그리고 단풍시럽",
    image: "granola" as const,
  },
]

export const products = [
  {
    num: "01",
    title: "Wildflower Honey",
    titleKr: "야생화 꿀",
    category: "Honey",
    categoryKr: "꿀 · 시럽",
    caption: "강원도 봉화의 야생화에서 모은 꿀. 가열하지 않고 거칠게 거른 그대로 병에 담았습니다.",
    price: "₩18,000 / 250g",
    image: "honey" as const,
  },
  {
    num: "02",
    title: "Stone Ground Sourdough",
    titleKr: "통밀 사워도우",
    category: "Bread",
    categoryKr: "베이커리",
    caption: "스톤밀로 직접 빻은 통밀에 자연 발효종만 더해 36시간 천천히 부풀린 사워도우입니다.",
    price: "₩12,000 / 600g",
    image: "bread" as const,
  },
  {
    num: "03",
    title: "Maple Oat Granola",
    titleKr: "메이플 오트 그래놀라",
    category: "Granola",
    categoryKr: "그래놀라 · 시리얼",
    caption: "오트와 아몬드, 호두에 단풍시럽만 더해 낮은 온도에서 천천히 구웠습니다. 단맛은 절제했습니다.",
    price: "₩16,000 / 400g",
    image: "granola" as const,
  },
  {
    num: "04",
    title: "Berry Preserve",
    titleKr: "베리 프리저브",
    category: "Jam",
    categoryKr: "잼 · 프리저브",
    caption: "여름 한 철에만 만드는 산딸기 프리저브. 설탕 대신 사과 농축액으로 단맛을 냈습니다.",
    price: "₩14,000 / 200g",
    image: "jam" as const,
  },
] as const

export const story = {
  eyebrow: "Our Story",
  eyebrowKr: "우리 이야기",
  title: "Slow is\nan Ingredient.",
  titleKr: "느림도 하나의 재료입니다",
  // 한국어 메인
  spreads: [
    {
      label: "Chapter 01 · The Farm",
      labelKr: "1장 · 농장",
      title: "강원의 작은 들판에서",
      titleEn: "On a quiet field in Gangwon",
      body: [
        "베르데는 강원도 봉화의 작은 농장에서 시작됩니다. 봄이면 야생화가 피고, 여름이면 산딸기가 익고, 가을이면 곡식이 영글어 갑니다. 이 사계절이 우리 라벨의 절반입니다.",
        "농장은 작습니다. 모든 일을 손으로 합니다. 트랙터 한 대, 봉지 단위로 헤아리는 수확, 그리고 천천히 흐르는 시간.",
      ],
      image: "farm" as const,
    },
    {
      label: "Chapter 02 · The Kitchen",
      labelKr: "2장 · 부엌",
      title: "다섯 가지 재료, 그 이상은 없이",
      titleEn: "Five ingredients, never more",
      body: [
        "우리 제품 라벨은 짧습니다. 꿀에는 꿀만, 빵에는 밀과 물과 소금, 그래놀라에는 오트와 견과와 단풍시럽. 그게 전부입니다.",
        "조미료, 보존제, 색소를 넣는 대신 시간을 더합니다. 사워도우는 36시간, 잼은 한 솥에 천천히, 그래놀라는 낮은 온도로 오래.",
      ],
      image: "process" as const,
    },
  ],
}

export const stores = [
  {
    name: "베르데 프로비전 · 서울 한남",
    nameEn: "Verde Provisions · Hannam",
    address: "서울특별시 용산구 ○○로 ○○",
    addressEn: "Hannam-dong, Yongsan-gu, Seoul",
    hours: "화 — 일 · 11:00 — 19:00",
  },
  {
    name: "베르데 농장 · 강원 봉화",
    nameEn: "Verde Farm · Bonghwa",
    address: "강원도 봉화군 ○○면 ○○리 (사전 예약제)",
    addressEn: "Bonghwa, Gangwon (by appointment)",
    hours: "토 · 10:00 — 16:00",
  },
] as const

export const venue = {
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
