/**
 * E-S4 Conference Tech — 가상 스피커 데이터
 *
 * [컨벤션]
 * - 모든 이름 / 회사 / 약력 placeholder
 * - 실존 회사명 / 인물 회피 (Aria, Mira 등 일반화된 이름)
 */

export type SpeakerTrack = "frontend" | "backend" | "design" | "ai"

export interface Speaker {
  id: string
  name: string
  role: string
  company: string
  track: SpeakerTrack
  bio: string
  topic: string
  /** 카드 좌상단 이니셜 / 코드 */
  code: string
}

export const TRACK_LABEL: Record<SpeakerTrack, string> = {
  frontend: "Frontend",
  backend: "Backend",
  design: "Design",
  ai: "AI / ML",
}

export const TRACK_COLOR: Record<SpeakerTrack, string> = {
  frontend: "#3b82f6", // blue
  backend: "#22c55e", // green
  design: "#a855f7",  // purple
  ai: "#f97316",      // orange
}

export const speakers: Speaker[] = [
  {
    id: "s01",
    code: "01",
    name: "Aria Voss",
    role: "Principal Engineer",
    company: "Northwind Labs",
    track: "frontend",
    topic: "Modern Frontend Patterns: Beyond the Component",
    bio: "10년 이상의 프론트엔드 아키텍처 경험. 대규모 디자인 시스템과 컴포넌트 설계 패턴에 대한 강연을 자주 진행합니다.",
  },
  {
    id: "s02",
    code: "02",
    name: "Mira Kalon",
    role: "Lead Product Designer",
    company: "Lumen Studio",
    track: "design",
    topic: "Designing Calm Interfaces in a Loud World",
    bio: "복잡한 정보 구조를 사용자 친화적인 화면으로 풀어내는 작업을 합니다. 다양한 SaaS 제품의 디자인 시스템을 설계해 왔습니다.",
  },
  {
    id: "s03",
    code: "03",
    name: "Theo Nakamura",
    role: "Staff Backend Engineer",
    company: "Rivermark",
    track: "backend",
    topic: "Distributed Systems Without the Drama",
    bio: "결제·정산 시스템에서 일관성과 확장성의 트레이드오프를 다뤄왔습니다. 운영 가능한 분산 시스템에 대해 이야기합니다.",
  },
  {
    id: "s04",
    code: "04",
    name: "Lina Park",
    role: "ML Research Engineer",
    company: "Halcyon AI",
    track: "ai",
    topic: "Production-grade LLM Pipelines",
    bio: "프로덕션에서 동작하는 LLM 파이프라인 설계와 안전성 평가가 주요 관심사. 지난 2년간 다양한 LLM 인프라를 운영했습니다.",
  },
  {
    id: "s05",
    code: "05",
    name: "Owen Brandt",
    role: "Frontend Architect",
    company: "Polaris",
    track: "frontend",
    topic: "Edge Rendering, Now and Next",
    bio: "엣지 런타임 환경에서의 렌더링 전략과 성능 최적화 경험을 공유합니다. 다수의 글로벌 서비스 프론트 인프라를 설계했습니다.",
  },
  {
    id: "s06",
    code: "06",
    name: "Sienna Cho",
    role: "Engineering Manager",
    company: "Verge & Co",
    track: "backend",
    topic: "Scaling Teams, Not Just Servers",
    bio: "엔지니어링 조직 성장에 대한 책임자 관점의 사례. 작은 팀에서 50명+ 조직으로 확장한 경험을 정리합니다.",
  },
  {
    id: "s07",
    code: "07",
    name: "Kai Andersen",
    role: "Design Engineer",
    company: "Gridform",
    track: "design",
    topic: "Where Code Meets Craft",
    bio: "디자인과 코드의 경계에서 작업하는 디자인 엔지니어. 모션, 토큰, 디자인 시스템 자동화에 대해 이야기합니다.",
  },
  {
    id: "s08",
    code: "08",
    name: "Noor Vance",
    role: "AI Product Lead",
    company: "Drift Layer",
    track: "ai",
    topic: "Designing With Probabilistic UX",
    bio: "확률적으로 동작하는 AI 기능을 제품에 녹이는 방법론. 실패 시나리오와 사용자 신뢰 회복에 집중합니다.",
  },
]
