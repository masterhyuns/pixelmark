/**
 * P-S3 Consulting Dark — Northgate Consulting
 * 언어 정책 v1.0 — 한국어 메인 / 디스플레이 영문 보조
 */

export const firm = {
  name: "Northgate Consulting",
  nameKr: "노스게이트 컨설팅",
  tagline: "Quiet Strategy. Real Outcomes.",
  taglineKr: "조용한 전략, 실제 결과",
  founded: "EST · 2019 · Seoul",
  team: "12명 (가상)",
}

export const home = {
  hero: {
    eyebrow: "B2B Strategy Consulting · 전략 컨설팅",
    body:
      "노스게이트는 12명의 작은 컨설팅 펌입니다. 큰 슬라이드 데크 대신 — 클라이언트 조직 안에 직접 들어가, 한 분기 동안 한 가지 문제만 정확히 풉니다.",
  },
  services: [
    {
      code: "01",
      name: "Strategy",
      nameKr: "전략 컨설팅",
      caption: "신사업 / 시장 진입 / 포트폴리오 재정비. 리서치보다 의사결정에 집중합니다.",
      image: "strategy" as const,
    },
    {
      code: "02",
      name: "Operations",
      nameKr: "운영 개선",
      caption: "조직 / 프로세스 / KPI 재설계. 6주 단위 작은 사이클로만 진행합니다.",
      image: "operations" as const,
    },
    {
      code: "03",
      name: "Digital",
      nameKr: "디지털 트랜스포메이션",
      caption: "데이터 기반 의사결정 시스템 구축, 작은 PoC부터 시작합니다.",
      image: "digital" as const,
    },
    {
      code: "04",
      name: "M&A Advisory",
      nameKr: "M&A 자문",
      caption: "Buy-side / Sell-side 자문. 실사부터 통합 계획까지 함께합니다.",
      image: "ma" as const,
    },
  ] as const,
  metrics: [
    { value: "12", label: "Team Size", labelKr: "팀 인원 · 가상" },
    { value: "60+", label: "Engagements", labelKr: "누적 프로젝트 (가상)" },
    { value: "12wk", label: "Avg. Length", labelKr: "평균 프로젝트 기간" },
    { value: "94%", label: "Repeat Rate", labelKr: "재의뢰율 (가상)" },
  ] as const,
}

export const cases = [
  {
    code: "01",
    industry: "Retail",
    industryKr: "리테일 · 패션",
    title: "오프라인 매장 네트워크 재설계",
    summary: "전국 80개 매장의 입지 / 재고 / 인력 구조를 다시 설계해 첫 해 매출 변동성을 크게 낮춘 가상 사례.",
    image: "retail" as const,
  },
  {
    code: "02",
    industry: "Manufacturing",
    industryKr: "제조 · 산업",
    title: "공장 운영 KPI 재정의",
    summary: "기존 30개 KPI를 4개 핵심 지표로 압축하고, 현장 의사결정 권한을 라인장에게 이전한 12주 가상 프로젝트.",
    image: "manufacturing" as const,
  },
  {
    code: "03",
    industry: "Finance",
    industryKr: "금융 · 보험",
    title: "리테일 보험 채널 재편",
    summary: "온라인 다이렉트 채널의 손익 구조를 분기별로 재산정해 채널 믹스 의사결정 프레임을 정리한 가상 케이스.",
    image: "finance" as const,
  },
  {
    code: "04",
    industry: "Tech",
    industryKr: "테크 · SaaS",
    title: "프로덕트 조직 운영 모델",
    summary: "20명 규모 SaaS 회사의 프로덕트 / 엔지니어링 운영 모델을 squad 기반으로 재설계한 8주 가상 프로젝트.",
    image: "tech" as const,
  },
] as const

export const principles = [
  {
    num: "01",
    title: "한 분기, 한 문제.",
    caption: "큰 슬라이드 데크보다 한 가지 문제를 정확하게. 모든 프로젝트는 12주 안에서 정확히 끝납니다.",
  },
  {
    num: "02",
    title: "조직 안에 들어갑니다.",
    caption: "외부 자문이 아니라 임시 팀원으로. 클라이언트 조직 안에 실제로 자리를 잡고 함께 일합니다.",
  },
  {
    num: "03",
    title: "결과만 측정합니다.",
    caption: "산출물이 아닌 결과로만 평가받습니다. 사전 합의된 한 가지 KPI 변화만으로 프로젝트 성공을 정의합니다.",
  },
] as const

export const contact = {
  intro:
    "노스게이트는 한 분기에 새로 받을 수 있는 프로젝트가 2~3건으로 제한됩니다. 아래 폼이나 이메일로 먼저 연락 주시면, 회사 / 문제 / 일정을 듣고 1주일 안에 회신드립니다.",
  hours: [
    { day: "월 — 금", time: "10:00 — 18:00 (미팅 / 인테이크)" },
    { day: "토 — 일", time: "휴무" },
  ],
  address: "서울특별시 강남구 ○○로 ○○ 12F",
  addressEn: "12F, ○○-ro, Gangnam-gu, Seoul",
  email: "contact@northgate-consulting.demo",
  phone: "02-000-0000 (가상)",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5012,127.0396&hl=ko&z=15&output=embed",
}
