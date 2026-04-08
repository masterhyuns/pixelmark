/**
 * P-S1 Medical Clean — Lumen Medical Clinic
 * 언어 정책 v1.0 — 한국어 메인 (의료 정보는 모두 한국어)
 */

export const clinic = {
  name: "Lumen Medical Clinic",
  nameKr: "루멘 메디컬 클리닉",
  tagline: "Care That Listens.",
  taglineKr: "오래 듣고, 정확하게 진료합니다",
  hours: "평일 09:00 — 18:00 / 토 09:00 — 13:00",
}

export const home = {
  hero: {
    eyebrow: "General Clinic · 1차 진료",
    eyebrowKr: "한남동 · 작은 동네 의원",
    body:
      "루멘 메디컬 클리닉은 빠른 진료보다 정확한 진료를 우선합니다. 환자분의 이야기를 충분히 듣고, 필요한 검사만 권하는 작은 동네 의원입니다.",
  },
  signature: {
    eyebrow: "Why Lumen · 우리가 다른 점",
    title: "오래 듣고, 천천히 답합니다.",
    paragraphs: [
      "1차 진료는 약을 처방하는 일이 아니라 듣는 일이라고 믿습니다. 평균 진료 시간은 15분, 첫 방문은 25분을 따로 둡니다.",
      "검사 권유는 임상 가이드라인 안에서만 합니다. 불필요한 영상 / 채혈 검사는 권하지 않습니다. 추가 검사가 필요하면 이유를 충분히 설명드린 뒤 결정합니다.",
    ],
  },
  features: [
    { icon: "★", title: "긴 진료 시간", caption: "평균 15분, 첫 진료 25분" },
    { icon: "✓", title: "정직한 검사", caption: "임상 가이드라인 안에서만" },
    { icon: "♡", title: "재방문 알림", caption: "약 복용 / 추적 검사 알림" },
    { icon: "↔", title: "투명한 비용", caption: "모든 비급여 사전 안내" },
  ] as const,
}

export const departments = [
  {
    code: "01",
    name: "General Medicine",
    nameKr: "일반 진료 · 1차 의료",
    caption: "감기 / 두통 / 복통 / 만성 질환 관리. 가장 처음 들르실 수 있는 진료입니다.",
    points: ["감기·발열·기침", "두통·소화불량·복통", "혈압·당뇨 등 만성질환 관리"],
    image: "1" as const,
  },
  {
    code: "02",
    name: "Health Check-up",
    nameKr: "건강 검진",
    caption: "기본 검진과 추가 채혈, 영상 검사. 검진 결과는 직접 설명드립니다.",
    points: ["기본 건강검진", "혈압·혈당·콜레스테롤", "결과 설명 30분 별도"],
    image: "2" as const,
  },
  {
    code: "03",
    name: "Counseling",
    nameKr: "상담 진료",
    caption: "처방 전 상담, 약 복용 점검, 생활 습관 코칭. 따로 약을 권하지 않는 시간입니다.",
    points: ["처방 전 1:1 상담", "복약 지도", "생활 습관 코칭"],
    image: "3" as const,
  },
] as const

export const staff = {
  eyebrow: "About the Doctor · 원장 소개",
  title: "Dr. Hae-jin Park, M.D.",
  titleKr: "박해진 원장 · 가정의학과 전문의 (가상)",
  paragraphs: [
    "박해진 원장은 서울의 큰 종합병원에서 12년간 가정의학과 전문의로 근무한 뒤, 2024년 한남동에 작은 동네 의원을 열었습니다.",
    "전공은 만성 질환 관리(고혈압 / 당뇨)와 건강 검진. 큰 병원에서 자주 보지 못한 '오래 듣는 진료'를 만들기 위해 작은 의원을 선택했습니다 (가상 약력).",
    "외부 진료 / 강연 등으로 자리를 비우는 날은 한 달 전에 사이트와 인스타그램으로 미리 안내드립니다.",
  ],
  career: [
    { year: "2024 —", item: "루멘 메디컬 클리닉 원장 (가상)" },
    { year: "2012 — 2024", item: "○○대학교 병원 가정의학과 (가상)" },
    { year: "2010", item: "○○대학교 의과대학 졸업 (가상)" },
  ],
}

export const reservation = {
  intro:
    "예약은 전화 또는 카카오톡 채널로 받습니다. 예약 없이 방문하셔도 진료 가능하지만, 평일 오전과 저녁 시간에는 대기가 길 수 있습니다.",
  hours: [
    { day: "월 — 금", time: "09:00 — 18:00 (점심 13:00 — 14:00)" },
    { day: "토요일", time: "09:00 — 13:00 (점심 휴진 없음)" },
    { day: "일·공휴일", time: "휴진" },
  ],
  parking: "건물 지하 주차장 1시간 무료. 만차 시 인근 공영 주차장 영수증 환산 (1시간).",
  address: "서울특별시 용산구 ○○로 ○○ 2F",
  addressEn: "2F, ○○-ro, Yongsan-gu, Seoul",
  phone: "02-000-0000 (가상)",
  kakao: "@lumen-medical (가상)",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
