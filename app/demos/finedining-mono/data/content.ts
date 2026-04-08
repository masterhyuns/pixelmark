/**
 * F-S3 Fine Dining Mono — Restaurant Solène
 * 언어 정책 v1.0 — 디스플레이는 영문/프랑스어 OK / 본문·메뉴 설명·예약 안내는 한국어 메인
 */

export const brand = {
  name: "Restaurant Solène",
  nameKr: "레스토랑 솔렌",
  tagline: "Modern French Tasting Menu",
  taglineKr: "모던 프렌치 테이스팅 메뉴",
  founded: "EST · 2024 · Seoul",
}

export const hero = {
  eyebrow: "Une Seule Table · Une Seule Histoire",
  eyebrowKr: "한 테이블, 한 이야기",
  body:
    "솔렌은 매일 저녁 단 하나의 코스만을 차립니다. 제철 재료, 작은 손, 그리고 한 시간 반 동안의 침묵 같은 집중. 그것이 솔렌이 손님에게 드릴 수 있는 전부입니다.",
}

export const chef = {
  eyebrow: "The Chef · 셰프",
  title: "From a quiet kitchen.",
  titleKr: "조용한 부엌에서 시작된 이야기",
  paragraphs: [
    "솔렌의 셰프는 파리에서 8년, 도쿄에서 4년을 보낸 뒤 서울로 돌아와 작은 부엌을 열었습니다. 화려함보다 정확함을, 화제보다 지속을 택한 셰프의 손에서 매일의 코스가 차려집니다.",
    "주방의 인원은 셰프를 포함해 단 셋. 그날의 시장에서 본 재료에 따라 코스 한두 접시는 매일 다시 쓰입니다. 그래서 같은 코스를 두 번 만나기는 어렵습니다.",
  ],
}

export const courses = [
  {
    num: "I",
    name: "Amuse-Bouche",
    nameKr: "아뮤즈 부쉬",
    caption: "한입의 인사 — 그날 아침 시장에서 받은 야채로 만든 작은 한 접시.",
    image: "1" as const,
  },
  {
    num: "II",
    name: "Première · Saison",
    nameKr: "프르미에르 · 시즌의 차가운 한 접시",
    caption: "차가운 전채 — 발효된 채소와 가벼운 시트러스, 올해 처음 나온 허브.",
    image: "2" as const,
  },
  {
    num: "III",
    name: "Poisson",
    nameKr: "푸아송 · 생선 코스",
    caption: "그날의 생선과 뵈르 블랑 — 고전적인 프랑스 소스를 가벼운 비율로 다시 씁니다.",
    image: "3" as const,
  },
  {
    num: "IV",
    name: "Plat Principal",
    nameKr: "메인 요리",
    caption: "그날의 메인 — 송아지 또는 오리, 제철 뿌리채소와 깊은 데미글라스.",
    image: "4" as const,
  },
] as const

export const menuMeta = {
  format: "Tasting Menu · 7 Courses",
  formatKr: "테이스팅 메뉴 · 7코스",
  duration: "약 1시간 30분",
  price: "₩180,000 / 1인",
  pricePairing: "+ 와인 페어링 ₩90,000",
  notice: "코스 메뉴는 매일 시장 상황에 따라 1~2 코스가 변경될 수 있습니다.",
}

export const wine = {
  eyebrow: "Wine Pairing · 와인 페어링",
  title: "Six Glasses, Six Notes.",
  titleKr: "여섯 잔, 여섯 개의 문장",
  body: [
    "와인 페어링은 코스의 연장입니다. 페어링은 솔렌의 소믈리에가 그날의 코스에 맞춰 매일 직접 골라 구성합니다.",
    "프랑스, 이탈리아, 한국의 가상 와이너리에서 가져온 작은 라벨들이 주를 이루며, 셰프와의 합을 가장 우선합니다.",
    "와인을 드시지 않는 손님께는 동일한 6잔의 무알콜 페어링(차 / 과일 침출수 / 발효 음료)을 같은 가격으로 준비합니다.",
  ],
}

export const reservation = {
  policy: [
    "예약은 전화 또는 이메일로만 받습니다. 하루 두 번의 시팅(저녁 6시 / 저녁 8시 30분), 각 시팅 12명 한정입니다.",
    "예약 확정 시 1인당 ₩50,000의 보증금이 청구되며, 방문일에 식사 비용에서 차감됩니다. 24시간 전까지 취소 가능합니다.",
    "월요일과 화요일은 정기 휴무입니다. 수요일부터 일요일까지 저녁 시팅만 운영합니다.",
  ],
  dressCode: "스마트 캐주얼 이상으로 부탁드립니다. 모자, 슬리퍼, 운동복은 정중히 사양합니다.",
  hours: [
    { day: "월 — 화", time: "정기 휴무" },
    { day: "수 — 일", time: "PM 6:00 / PM 8:30 시팅" },
  ],
  address: "서울특별시 중구 ○○로 ○○ 2F",
  addressEn: "2F, ○○-ro, Jung-gu, Seoul",
  phone: "02-000-0000 (가상)",
  email: "reservation@solene.demo",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
