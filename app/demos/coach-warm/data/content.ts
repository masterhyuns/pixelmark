/**
 * PE-S3 Coach Warm — Aevi Studio
 * 언어 정책 v1.0 — 디스플레이 영문 OK / 본문·강의 설명·후기·폼은 한국어 메인
 */

export const studio = {
  name: "Aevi Studio",
  nameKr: "에비 스튜디오",
  coach: "Soyeon Han",
  coachKr: "한소연 코치",
  tagline: "Quiet Coaching for Slow Growth",
  taglineKr: "조용히, 천천히 자라기 위한 코칭",
}

export const about = {
  hero: {
    eyebrow: "Aevi · Personal Coaching",
    eyebrowKr: "1인 사업가와 크리에이터를 위한 1:1 코칭",
    body:
      "에비는 작은 일을 오래 해 온 사람들을 위한 코칭 스튜디오입니다. 큰 성공의 공식을 약속하지 않습니다. 다만 다음 한 걸음을 함께 정확하게 정해 나갑니다.",
  },
  bio: {
    eyebrow: "About the Coach · 코치 소개",
    title: "Soyeon Han, ICF PCC.",
    titleKr: "한소연 · ICF PCC 인증 코치 (가상)",
    paragraphs: [
      "한소연 코치는 IT 회사 마케팅 디렉터로 8년을 일한 뒤, 2022년부터 1인 사업가와 크리에이터를 위한 코칭을 시작했습니다. 200시간 이상의 코칭 경험과 ICF PCC 인증을 보유하고 있습니다 (가상).",
      "에비의 모든 코칭은 1:1 비대면 또는 한남동 작은 작업실에서 대면으로 진행됩니다. 큰 그룹은 진행하지 않습니다.",
    ],
  },
  fields: [
    {
      label: "Coaching",
      labelKr: "1:1 코칭",
      caption: "한 시간씩, 8주 동안. 매 회 액션 아이템 1개씩.",
      image: "coaching" as const,
    },
    {
      label: "Workshop",
      labelKr: "소그룹 워크숍",
      caption: "최대 6명. 한 번에 한 주제를 깊이 다룹니다.",
      image: "workshop" as const,
    },
    {
      label: "Mentoring",
      labelKr: "초보 1인 사업가 멘토링",
      caption: "사업 1년차 미만 대상. 격주 50분 × 6회.",
      image: "mentoring" as const,
    },
  ] as const,
}

export const programs = [
  {
    code: "01",
    title: "Slow Start · 천천히 시작하기",
    titleEn: "Slow Start · 8-Week Coaching",
    duration: "8주 / 주 1회 60분",
    target: "이제 막 시작한 1인 사업가, 사이드 프로젝트 운영자",
    price: "₩640,000 / 8회 패키지",
    image: "01" as const,
  },
  {
    code: "02",
    title: "Quiet Growth · 조용한 성장",
    titleEn: "Quiet Growth · 12-Week Program",
    duration: "12주 / 주 1회 60분",
    target: "1년차 이상 1인 사업가, 다음 단계가 막막한 분",
    price: "₩1,080,000 / 12회 패키지",
    image: "02" as const,
  },
  {
    code: "03",
    title: "Workshop · 일주일에 한 시간",
    titleEn: "Workshop · 4-Week Group",
    duration: "4주 / 주 1회 90분 (소그룹)",
    target: "혼자 막막한 사람들, 동료의 시선이 필요한 분",
    price: "₩280,000 / 4회",
    image: "03" as const,
  },
  {
    code: "04",
    title: "1-Day Reset · 하루의 점검",
    titleEn: "1-Day Reset · Single Session",
    duration: "1일 / 3시간 집중",
    target: "작년 한 해를 돌아보고 싶은 모든 분",
    price: "₩220,000 / 1회",
    image: "04" as const,
  },
] as const

export const reviews = [
  {
    quote:
      "코치가 답을 주지 않습니다. 다만 제가 막연했던 부분을 정확하게 짚어 줍니다. 8주 뒤 저는 다음 분기 계획을 직접 만들 수 있는 사람이 되어 있었습니다.",
    name: "ㅇ.ㅇ",
    role: "1인 디자인 스튜디오 운영, 33세",
  },
  {
    quote:
      "조용한 코칭이라는 말이 가장 정확합니다. 저를 다그치지 않고, 그러나 매주 한 가지씩은 분명히 변하게 만드는 시간이었습니다.",
    name: "ㅈ.ㅎ",
    role: "프리랜스 일러스트레이터, 28세",
  },
  {
    quote:
      "사업이 막혔을 때 친구도 아니고 컨설턴트도 아닌, 이런 형태의 1:1 시간이 필요했던 거였더라고요. 12주가 짧게 느껴졌습니다.",
    name: "ㅎ.ㅁ",
    role: "교육 콘텐츠 크리에이터, 41세",
  },
] as const

export const contact = {
  intro:
    "코칭은 모두 사전 인터뷰를 거쳐 진행됩니다. 아래 폼이나 이메일로 먼저 가볍게 인사 주시면, 1~2일 안에 답장 드립니다.",
  form: {
    title: "Inquiry · 코칭 문의",
    nameLabel: "성함",
    emailLabel: "이메일",
    interestLabel: "관심 있는 프로그램",
    messageLabel: "어떤 점이 막막한지 짧게 알려 주세요",
    submit: "문의 보내기",
    notice: "※ 데모 폼 — 실제로는 전송되지 않습니다.",
  },
  hours: [
    { day: "월 — 금", time: "코칭 시간 · 10:00 — 18:00" },
    { day: "토", time: "워크숍 운영 (월 1회)" },
    { day: "일", time: "휴무" },
  ],
  address: "서울특별시 용산구 ○○로 ○○ 3F",
  addressEn: "3F, ○○-ro, Yongsan-gu, Seoul",
  email: "hello@aevistudio.demo",
  instagram: "@aevistudio.demo",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5345,127.0014&hl=ko&z=15&output=embed",
}
