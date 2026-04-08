/**
 * F-S2 Winebar Dark Lux — Verres Noirs
 * 언어 정책 v1.0 — 디스플레이 영문 OK / 본문·메뉴 설명·예약 안내는 한국어 메인
 */

export const brand = {
  name: "Verres Noirs",
  nameKr: "베르 누아",
  tagline: "Dark Wine, Slow Hours.",
  taglineKr: "어두운 와인, 천천히 흐르는 밤",
  hours: "PM 6 ~ AM 2",
}

export const home = {
  eyebrow: "Wine Bar · Hannam, Seoul",
  eyebrowKr: "한남동 · 와인바",
  greeting: [
    "베르 누아는 어두운 한 잔을 천천히 마시는 곳입니다. 밝은 조명도, 큰 음악도 없이 — 단정한 와인 리스트와 작은 안주, 그리고 충분한 적막을 준비해 두었습니다.",
    "예약 없이 들르셔도 좋습니다. 자리가 있다면 한 잔, 자리가 없다면 다음 밤에 — 그런 식으로 흐르는 가게입니다.",
  ],
}

export const menu = {
  categories: [
    { id: "wine", label: "Wine", labelKr: "와인" },
    { id: "cocktail", label: "Cocktail", labelKr: "칵테일" },
    { id: "snack", label: "Snack", labelKr: "안주" },
  ] as const,
  items: {
    wine: [
      { name: "House Red — Côte Sombre", nameKr: "하우스 레드 · 어두운 언덕", caption: "프랑스 남부의 미디엄 바디 레드 (가상). 가벼운 탄닌과 검은 베리 향.", price: "₩14,000 / Glass" },
      { name: "Old Vine Tempranillo", nameKr: "올드 바인 템프라니요", caption: "스페인 리오하 가상 와이너리. 가죽과 향신료가 도드라지는 풀바디.", price: "₩18,000 / Glass" },
      { name: "Coastal Riesling", nameKr: "코스털 리슬링", caption: "독일 모젤 가상 빈야드. 미네랄과 백도 향, 산뜻한 산미.", price: "₩15,000 / Glass" },
      { name: "Volcanic Nebbiolo", nameKr: "볼캐닉 네비올로", caption: "이탈리아 피에몬테 가상 빈야드. 장미와 송로 향, 긴 여운.", price: "₩22,000 / Glass" },
    ],
    cocktail: [
      { name: "Smoke Negroni", nameKr: "스모크 네그로니", caption: "오크 향이 입혀진 시그니처 네그로니. 진한 캄파리 어둠.", price: "₩18,000" },
      { name: "Black Pear Sour", nameKr: "블랙 페어 사워", caption: "흑배 시럽과 라이 위스키, 레몬으로 균형 잡은 사워.", price: "₩17,000" },
      { name: "Midnight Espresso Martini", nameKr: "미드나잇 에스프레소 마티니", caption: "에스프레소와 보드카, 카카오 비터스. 밤의 디저트.", price: "₩16,000" },
    ],
    snack: [
      { name: "Aged Cheese Board", nameKr: "에이지드 치즈 보드", caption: "3종 숙성 치즈 + 무화과 잼 + 호두. 와인과 가장 잘 어울립니다.", price: "₩28,000" },
      { name: "Truffle Olive Plate", nameKr: "트러플 올리브 플레이트", caption: "트러플 오일 마리네이드 그린 / 블랙 올리브.", price: "₩14,000" },
      { name: "Pâté & Sourdough", nameKr: "파테 & 사워도우", caption: "직접 만든 컨트리 파테와 통밀 사워도우. 코르니숑 곁들임.", price: "₩19,000" },
    ],
  },
  recommendation:
    "처음 오신 손님께는 하우스 레드 + 에이지드 치즈 보드 조합을 권합니다. 가장 많은 손님이 두 잔째까지 머물게 되는 조합입니다.",
}

export const reservation = {
  policy: [
    "예약은 전화 또는 인스타그램 DM으로만 받습니다. 요일별로 자리가 한정되어 있어, 가능한 하루 전까지 연락 부탁드립니다.",
    "월요일은 정기 휴무입니다. 화요일부터 일요일까지 저녁 6시부터 새벽 2시까지 영업합니다 (라스트 오더 새벽 1시 30분).",
    "단체(6인 이상)는 별도 안내가 필요합니다. 인스타그램으로 먼저 문의 부탁드립니다.",
  ],
  dressCode:
    "드레스 코드는 스마트 캐주얼입니다. 정장을 요구하지는 않지만, 슬리퍼와 운동복은 정중히 사양합니다.",
  hoursList: [
    { day: "월요일", time: "정기 휴무" },
    { day: "화 — 목", time: "PM 6:00 — AM 1:30" },
    { day: "금 — 토", time: "PM 6:00 — AM 2:00" },
    { day: "일요일", time: "PM 6:00 — AM 12:00" },
  ],
  address: "서울특별시 용산구 ○○로 ○○ B1",
  addressEn: "B1, ○○-ro, Yongsan-gu, Seoul",
  phone: "02-000-0000 (가상)",
  instagram: "@verresnoirs.demo",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
