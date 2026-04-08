/**
 * E-S4 Conference Tech — 가상 일정 데이터
 *
 * 이틀짜리 가상 컨퍼런스 일정. 모든 세션 placeholder.
 */
import type { SpeakerTrack } from "./speakers"

export interface Session {
  time: string
  title: string
  /** 한국어 메인 세션명 (정책 v1.0 §4-8) */
  titleKr: string
  speaker?: string
  track: SpeakerTrack | "general"
  type: "session" | "break" | "keynote"
}

export interface ScheduleDay {
  label: string
  date: string
  sessions: Session[]
}

export const schedule: ScheduleDay[] = [
  {
    label: "Day 01",
    date: "2026.05.14 (목)",
    sessions: [
      { time: "09:00 — 09:30", title: "Registration & Coffee", titleKr: "등록 및 커피", track: "general", type: "break" },
      { time: "09:30 — 10:30", title: "Opening Keynote: The Next Decade of Web", titleKr: "오프닝 키노트 — 웹의 다음 10년", speaker: "Aria Voss", track: "frontend", type: "keynote" },
      { time: "10:45 — 11:30", title: "Modern Frontend Patterns: Beyond the Component", titleKr: "모던 프론트엔드 패턴 — 컴포넌트를 넘어서", speaker: "Aria Voss", track: "frontend", type: "session" },
      { time: "11:45 — 12:30", title: "Distributed Systems Without the Drama", titleKr: "조용한 분산 시스템 운영기", speaker: "Theo Nakamura", track: "backend", type: "session" },
      { time: "12:30 — 14:00", title: "Lunch Break", titleKr: "점심 시간", track: "general", type: "break" },
      { time: "14:00 — 14:45", title: "Designing Calm Interfaces in a Loud World", titleKr: "시끄러운 세상 속, 차분한 인터페이스 설계", speaker: "Mira Kalon", track: "design", type: "session" },
      { time: "15:00 — 15:45", title: "Production-grade LLM Pipelines", titleKr: "프로덕션급 LLM 파이프라인 구축", speaker: "Lina Park", track: "ai", type: "session" },
      { time: "16:00 — 16:45", title: "Edge Rendering, Now and Next", titleKr: "엣지 렌더링의 현재와 미래", speaker: "Owen Brandt", track: "frontend", type: "session" },
      { time: "17:00 — 18:00", title: "Day 1 Closing Panel", titleKr: "1일차 클로징 패널", track: "general", type: "keynote" },
    ],
  },
  {
    label: "Day 02",
    date: "2026.05.15 (금)",
    sessions: [
      { time: "09:30 — 10:00", title: "Morning Coffee", titleKr: "모닝 커피", track: "general", type: "break" },
      { time: "10:00 — 10:45", title: "Where Code Meets Craft", titleKr: "코드와 공예가 만나는 자리", speaker: "Kai Andersen", track: "design", type: "session" },
      { time: "11:00 — 11:45", title: "Scaling Teams, Not Just Servers", titleKr: "서버가 아니라 팀을 확장한다는 것", speaker: "Sienna Cho", track: "backend", type: "session" },
      { time: "11:45 — 13:00", title: "Lunch & Networking", titleKr: "점심 및 네트워킹", track: "general", type: "break" },
      { time: "13:00 — 13:45", title: "Designing With Probabilistic UX", titleKr: "확률적 UX를 위한 설계", speaker: "Noor Vance", track: "ai", type: "session" },
      { time: "14:00 — 15:30", title: "Hands-on Workshops (Frontend / Backend / AI)", titleKr: "실습 워크숍 (프론트엔드 / 백엔드 / AI)", track: "general", type: "session" },
      { time: "15:45 — 16:30", title: "Lightning Talks", titleKr: "라이트닝 토크", track: "general", type: "session" },
      { time: "16:30 — 17:30", title: "Closing Keynote & After Party", titleKr: "클로징 키노트 & 애프터 파티", track: "general", type: "keynote" },
    ],
  },
]

/**
 * 컨퍼런스 시작일 — 매년 5/14 09:30 (지났으면 다음 해)
 */
export const getConferenceDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 4, 14, 9, 30, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 4, 14, 9, 30, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ 컨벤션 센터 Hall A",
  address: "서울특별시 ○○구 ○○로 ○○",
  /** 가상 좌표 — 카카오맵 일반 임베드(서울시청 부근) */
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const sponsors = [
  { code: "S—01", name: "NORTHWIND" },
  { code: "S—02", name: "POLARIS" },
  { code: "S—03", name: "RIVERMARK" },
  { code: "S—04", name: "HALCYON" },
  { code: "S—05", name: "DRIFT LAYER" },
  { code: "S—06", name: "VERGE & CO" },
] as const
