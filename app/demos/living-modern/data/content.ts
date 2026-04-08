/**
 * B-S3 Living Modern — Maison Brisé 가구/리빙 데이터
 *
 * [언어 정책 v1.0]
 * - 브랜드명/슬로건은 영문 디스플레이 유지
 * - 본문/룸 설명/매장 안내는 한국어 메인
 */

export const brand = {
  name: "Maison Brisé",
  nameKr: "메종 브리제",
  tagline: "Spaces that breathe.",
  taglineKr: "숨 쉬는 공간",
  founded: "EST · 2024 · Seoul",
}

export const hero = {
  eyebrow: "Modern Living, Slowly Made",
  eyebrowKr: "천천히 짓는 모던 리빙",
  body:
    "메종 브리제는 단단한 우드와 부드러운 리넨, 그리고 충분한 여백으로 공간을 짓습니다. 가구 한 점이 아니라 — 그 가구가 머무를 시간을 함께 디자인합니다.",
}

export const rooms = [
  {
    code: "01",
    name: "Living Room",
    nameKr: "거실",
    caption: "햇살이 가장 오래 머무르는 자리. 리넨 소파와 우드 콘솔 한 점.",
    main: "living-main" as const,
    detail: "living-detail" as const,
  },
  {
    code: "02",
    name: "Bedroom",
    nameKr: "침실",
    caption: "베이지 리넨 침구와 따뜻한 우드 헤드보드. 조명은 단 하나만.",
    main: "bedroom-main" as const,
    detail: "bedroom-detail" as const,
  },
  {
    code: "03",
    name: "Kitchen",
    nameKr: "주방",
    caption: "우드 캐비닛과 흰 벽. 작은 화병 하나로 완성되는 자리.",
    main: "kitchen" as const,
    detail: null,
  },
] as const

export const collection = {
  eyebrow: "Spring Collection · 2026",
  eyebrowKr: "2026 봄 컬렉션",
  title: "Four Pieces,\nMade to Stay.",
  titleKr: "오래 머물 네 가지 가구",
  body:
    "이번 시즌의 주력 가구 네 점을 소개합니다. 가구 한 점은 며칠 안에 골라지더라도, 함께 머무는 시간은 길어지길 바라며 만들었습니다.",
  items: [
    {
      num: "01",
      title: "Linen Lounge Sofa",
      titleKr: "리넨 라운지 소파",
      caption: "오크 프레임 + 베이지 리넨 커버, 3인용",
      size: "W2200 × D900 × H780",
      price: "₩1,680,000부터",
      image: "sofa" as const,
    },
    {
      num: "02",
      title: "Oak Dining Table",
      titleKr: "오크 다이닝 테이블",
      caption: "원목 오크 + 라운드 엣지 마감, 4~6인",
      size: "W1800 × D850 × H740",
      price: "₩1,420,000부터",
      image: "table" as const,
    },
    {
      num: "03",
      title: "Brass Floor Lamp",
      titleKr: "브라스 플로어 램프",
      caption: "리넨 셰이드 + 무광 브라스 스탠드",
      size: "Ø380 × H1620",
      price: "₩540,000",
      image: "lamp" as const,
    },
    {
      num: "04",
      title: "Walnut Lounge Chair",
      titleKr: "월넛 라운지 체어",
      caption: "월넛 프레임 + 베이지 폼 쿠션",
      size: "W740 × D820 × H810",
      price: "₩820,000",
      image: "chair" as const,
    },
  ] as const,
}

export const showroom = {
  name: "메종 브리제 쇼룸 · 서울 한남",
  nameEn: "Maison Brisé Showroom · Hannam, Seoul",
  address: "서울특별시 용산구 ○○로 ○○ 1F",
  addressEn: "1F, ○○-ro, Yongsan-gu, Seoul",
  hours: "화 — 일 · 11:00 — 19:00 (월요일 휴무)",
  phone: "02-000-0000 (가상)",
  notice:
    "쇼룸은 사전 예약 없이 자유롭게 방문하실 수 있습니다. 가구 상담은 평일 오후 2시 이후가 가장 한가합니다.",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
