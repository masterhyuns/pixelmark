/**
 * E-S10 Open House — 가상 스튜디오 데이터
 */

export const studio = {
  name: "Studio Norra",
  nameKr: "스튜디오 노라",
  tag: "Architecture / Interior",
  tagline: "Open House — Three Days Only",
  taglineKr: "오픈 하우스 · 3일간",
}

export const greeting = {
  title: "A New Space, Open to You",
  titleKr: "새로운 공간을 열며",
  paragraphs: [
    "Studio Norra는 지난 18개월 동안 공간을 다듬어 왔습니다. 작은 방의 구조와 빛, 동선, 머무는 시간 — 그 모든 것을 천천히 매만진 시간이 마무리에 다가왔습니다.",
    "이제 그 결과물을 가까운 분들과 함께 나누고 싶습니다. 짧은 일정이지만 편안하게 둘러보시고, 차 한 잔과 짧은 이야기를 나눠 주세요.",
  ],
}

export const spaces = [
  {
    code: "01",
    title: "Entrance",
    titleKr: "입구",
    desc: "처음 들어서는 좁고 긴 진입 공간. 바깥의 빛이 안으로 흘러드는 길.",
    image: "entrance" as const,
  },
  {
    code: "02",
    title: "Main Hall",
    titleKr: "메인 홀",
    desc: "스튜디오의 중심. 콘크리트 바닥과 라임우드 가구가 만나는 단정한 공간.",
    image: "main" as const,
  },
  {
    code: "03",
    title: "Meeting Room",
    titleKr: "미팅룸",
    desc: "한 면이 통창인 작은 회의실. 외부와 내부의 경계를 부드럽게 잇는 창.",
    image: "meeting" as const,
  },
] as const

/** 매년 자동 갱신 (10월 18일 14:00) */
export const getOpenDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 9, 18, 14, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 9, 18, 14, 0, 0)
  }
  return thisYear
}

export const event = {
  schedule: "Oct 18 — 20",
  scheduleKr: "10월 18일 — 20일 (3일간)",
  hours: "14:00 — 19:00",
  parking: "건물 지하 1층 주차 무료 (2시간)",
}

export const venue = {
  name: "Studio Norra",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○ · 1F",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const timeSlots = [
  { id: "14", label: "14:00 — 15:00" },
  { id: "15", label: "15:00 — 16:00" },
  { id: "16", label: "16:00 — 17:00" },
  { id: "17", label: "17:00 — 18:00" },
  { id: "18", label: "18:00 — 19:00" },
] as const
