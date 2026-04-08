/**
 * F-S1 Bakery Pastel — Maison Crème
 * 언어 정책 v1.0 — 디스플레이 영문 OK / 본문·메뉴 설명·매장 안내는 한국어 메인
 */

export const brand = {
  name: "Maison Crème",
  nameKr: "메종 크렘",
  tagline: "Daily Fresh, Daily Sweet",
  taglineKr: "매일 굽고, 매일 달콤하게",
}

export const hero = {
  eyebrow: "Patisserie · Seoul",
  eyebrowKr: "한남동 · 작은 베이커리",
  body:
    "메종 크렘은 매일 아침 직접 반죽하고 굽는 작은 동네 베이커리입니다. 그날 만든 것은 그날 안에 — 단정한 단맛과 부드러운 결을 약속합니다.",
}

export const about = {
  eyebrow: "About",
  eyebrowKr: "우리 이야기",
  title: "A small bakery,\nmade slowly.",
  titleKr: "천천히 만드는, 작은 베이커리",
  paragraphs: [
    "메종 크렘은 한남동의 골목 끝, 햇빛이 잘 드는 작은 가게에서 시작되었습니다. 우리는 화려한 디저트보다, 매일 두고 먹어도 질리지 않는 부드럽고 단정한 빵과 케이크를 만듭니다.",
    "재료는 단순하게, 시간은 충분히. 발효종은 자가 배양, 버터는 무가염 프리미엄, 바닐라는 마다가스카르 빈을 그대로 갈아 씁니다. 라벨에 적을 게 적을수록 좋은 디저트라고 믿습니다.",
    "예약 주문은 오전 11시까지 받습니다. 그 외 시간에도 매장에서 그날 구운 것들을 자유롭게 만나실 수 있습니다.",
  ],
}

export const signatures = [
  {
    code: "01",
    name: "Vanilla Bean Tart",
    nameKr: "바닐라 빈 타르트",
    caption: "마다가스카르 바닐라 빈을 통째로 갈아 넣은 부드러운 커스터드 타르트",
    price: "₩7,500",
    image: "1" as const,
  },
  {
    code: "02",
    name: "Honey Crème Brûlée",
    nameKr: "허니 크렘 브륄레",
    caption: "강원도 야생화 꿀과 무가염 버터로 졸인 진한 크렘 브륄레",
    price: "₩6,800",
    image: "2" as const,
  },
  {
    code: "03",
    name: "Pistachio Macaron",
    nameKr: "피스타치오 마카롱",
    caption: "이란산 피스타치오를 직접 갈아 만든 가나슈를 채운 마카롱",
    price: "₩3,500",
    image: "3" as const,
  },
] as const

export const gallery = [
  { code: "01", caption: "디스플레이 진열장", image: "01" as const, span: "wide" as const },
  { code: "02", caption: "오늘의 케이크", image: "02" as const, span: "tall" as const },
  { code: "03", caption: "갓 구운 빵", image: "03" as const, span: "normal" as const },
  { code: "04", caption: "마카롱 어레이", image: "04" as const, span: "wide" as const },
  { code: "05", caption: "매장 외관", image: "05" as const, span: "normal" as const },
] as const

export const visit = {
  hours: [
    { day: "월요일", time: "휴무" },
    { day: "화 — 금", time: "10:30 — 19:00" },
    { day: "토 — 일", time: "10:00 — 19:30" },
  ],
  notice:
    "오븐 사정에 따라 소진 시 영업이 일찍 마감될 수 있습니다. 케이크 사전 예약은 인스타그램 DM으로 받습니다.",
  address: "서울특별시 용산구 ○○로 ○○ 1F",
  addressEn: "1F, ○○-ro, Yongsan-gu, Seoul",
  phone: "02-000-0000 (가상)",
  instagram: "@maisoncreme.demo",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
