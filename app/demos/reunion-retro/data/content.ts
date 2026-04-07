/**
 * E-S9 Reunion Retro — 가상 동창회 데이터
 */

export const reunion = {
  title: "Class of '05 Reunion",
  subtitle: "○○ High School",
  subtitleKr: "○○고등학교",
  slogan: "Twenty Years Later, We Gather Again",
  sloganKr: "20년 후, 우리는 다시 만납니다",
}

export const greeting = [
  "2005년 봄, 우리는 같은 교복을 입고 같은 운동장을 뛰어다녔습니다.",
  "20년이 지난 지금, 각자의 자리에서 살아가고 있지만 그 시절의 이야기는 여전히 우리 안에 남아 있어요.",
  "오랜만에 한 자리에 모여 사진과 추억, 그리고 지금의 서로를 나누는 저녁을 함께하지 않으시겠어요?",
]

export const timeline = [
  {
    year: "2005",
    title: "졸업",
    titleEn: "Graduation",
    body: "운동장에서의 마지막 조회, 졸업식, 그리고 서로의 다음을 응원하던 그 봄.",
  },
  {
    year: "2010",
    title: "각자의 길",
    titleEn: "Our Own Paths",
    body: "누군가는 대학을, 누군가는 군대를, 누군가는 이미 일을 시작한 5년 차. 각자의 첫 실패와 첫 성취.",
  },
  {
    year: "2015",
    title: "서른의 무게",
    titleEn: "Thirty, Then",
    body: "서른을 처음 맞이한 해. 조금 더 조용해졌지만, 그만큼 단단해진 이야기들이 쌓이기 시작한 때.",
  },
  {
    year: "2020",
    title: "멀어진 거리",
    titleEn: "Apart, Together",
    body: "오래된 친구들에게 안부를 묻게 되던 그 해. 우리는 서로를 기억하고 있었고, 그 사실이 위로가 되었습니다.",
  },
] as const

/** 매년 자동 갱신 (11월 15일 18:00) */
export const getReunionDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 10, 15, 18, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 10, 15, 18, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ 다이닝 & 라운지",
  nameKr: "○○ Dining & Lounge",
  address: "서울특별시 ○○구 ○○로 ○○ · 4F",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const contact = {
  organizer: "총무 · ○○○",
  phone: "010-0000-0000",
  email: "reunion@example.com",
}
