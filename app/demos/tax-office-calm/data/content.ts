/**
 * P-S2 Tax Office Calm — Cinder Tax & Accounting
 * 언어 정책 v1.0 — 한국어 메인 / 디스플레이 영문 보조
 */

export const office = {
  name: "Cinder Tax & Accounting",
  nameKr: "신더 세무회계",
  tagline: "Honest Numbers, Quiet Work.",
  taglineKr: "정직한 숫자, 조용한 일",
  founded: "EST · 2018 · Seoul",
}

export const hero = {
  eyebrow: "Tax & Accounting · 세무회계",
  body:
    "신더 세무회계는 1인 사업자, 작은 법인, 그리고 처음 창업하는 분들을 위한 작은 세무사 사무소입니다. 큰 컨설팅 없이, 매월 정확한 숫자만 정직하게 정리합니다.",
}

export const services = [
  { code: "01", name: "법인세", nameEn: "Corporate Tax", caption: "법인세 신고 / 부가세 신고 / 원천세 신고. 매월 정기 기장 포함." },
  { code: "02", name: "개인 종합소득세", nameEn: "Personal Income Tax", caption: "프리랜서 / 1인 사업자 / 임대 소득자. 5월 종합소득세 신고." },
  { code: "03", name: "창업 컨설팅", nameEn: "Startup Consulting", caption: "사업자 등록 / 절세 구조 설계 / 회계 셋업까지 1:1 안내." },
  { code: "04", name: "양도 / 상속세", nameEn: "Capital Gains & Inheritance", caption: "부동산 양도 / 가족 상속 / 증여 신고. 사전 시뮬레이션 포함." },
  { code: "05", name: "세무 조사 대응", nameEn: "Tax Audit Defense", caption: "세무서 조사 / 사전 통지 / 이의 신청. 사례별 동행 가능." },
  { code: "06", name: "기타 신고", nameEn: "Other Filings", caption: "현금영수증 / 4대 보험 / 직원 급여 신고. 단건 의뢰도 OK." },
] as const

export const about = {
  eyebrow: "About · 사무소 소개",
  title: "A small office,\nrun by hand.",
  titleKr: "손으로 굴러가는 작은 사무소",
  paragraphs: [
    "신더는 2018년 종로의 작은 사무실에서 시작되었습니다. 한 명의 세무사와 두 명의 회계 담당이 — 정확히 그 인원만으로 — 매월의 숫자를 정리합니다.",
    "광고를 거의 하지 않고 소개로만 일합니다. 그래서 의뢰의 90%는 기존 고객의 추천으로 들어옵니다. 그 비율을 유지하기 위해, 한 달에 새로 받을 수 있는 신규 의뢰는 최대 3건입니다.",
  ],
  career: [
    { year: "2018 —", item: "신더 세무회계 개업 (가상)" },
    { year: "2014 — 2018", item: "○○회계법인 / ○○세무법인 (가상)" },
    { year: "2012", item: "한국공인회계사회 등록 (가상)" },
  ] as const,
}

export const cases = [
  {
    code: "01",
    title: "1인 디자인 스튜디오 — 종합소득세 절세",
    desc: "매월 자료 정리와 비용 분류만 정확히 — 별도 공격적인 절세 없이도 적정 신고만으로 충분히 안정적인 결과를 얻은 케이스 (가상).",
  },
  {
    code: "02",
    title: "작은 IT 스타트업 — 사업 첫 해 결산",
    desc: "초기 회계 셋업, 4대 보험 신고, 첫 부가세 / 법인세 신고까지 12개월 동안 함께한 케이스. 결과는 가상이며 일반화할 수 없음.",
  },
  {
    code: "03",
    title: "프리랜서 일러스트레이터 — 외화 수익 신고",
    desc: "해외 클라이언트로부터 받은 외화 수익의 환차익 / 환차손 처리, 종합소득세 신고까지 도운 가상 사례.",
  },
] as const

export const pricing = [
  { name: "월 기장 · 1인 사업자", price: "₩100,000부터 / 월", note: "기본 매출 10건 이내" },
  { name: "월 기장 · 소규모 법인", price: "₩220,000부터 / 월", note: "기본 매출 30건 이내" },
  { name: "종합소득세 신고 (1회)", price: "₩220,000부터", note: "매월 기장 미가입 손님" },
  { name: "법인세 신고 (1회)", price: "₩550,000부터", note: "매월 기장 미가입 손님" },
  { name: "창업 컨설팅 (1:1)", price: "₩180,000 / 90분", note: "사업자 등록 / 셋업 포함" },
] as const

export const resources = [
  { code: "01", title: "1인 사업자 시작 시 알아둘 7가지 (PDF)", caption: "사업자 등록 직후에 챙겨야 할 항목 정리" },
  { code: "02", title: "프리랜서 종합소득세 가이드 (PDF)", caption: "5월 신고 시즌 전에 미리 준비할 자료" },
  { code: "03", title: "초기 법인 회계 셋업 체크리스트 (PDF)", caption: "법인 설립 후 첫 6개월 안에 끝낼 일들" },
] as const

export const contact = {
  intro:
    "신규 상담은 한 달에 최대 3건만 받습니다. 아래 폼이나 이메일로 먼저 가볍게 인사 주시면, 1~2일 안에 회신드립니다.",
  form: {
    title: "상담 신청 (Mock)",
    submit: "상담 신청 보내기",
    notice: "※ 데모 폼 — 실제 전송되지 않습니다.",
  },
  hours: [
    { day: "월 — 금", time: "09:00 — 18:00" },
    { day: "토", time: "사전 예약 손님만" },
    { day: "일", time: "휴무" },
  ],
  address: "서울특별시 종로구 ○○로 ○○ 4F",
  addressEn: "4F, ○○-ro, Jongno-gu, Seoul",
  phone: "02-000-0000 (가상)",
  email: "office@cinder-tax.demo",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
