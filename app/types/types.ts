import type { LucideIcon } from "lucide-react"

/**
 * 포트폴리오 프로젝트 타입 정의
 * 모든 데이터 구조는 이 파일에서 관리한다
 *
 * [카테고리 vs 등급 - 의미 분리]
 * - category: 주제/업종. 고객이 자기 사업 분야로 사례를 찾는 필터의 메인 축.
 *             고객 중심 분류이며, /projects 페이지의 필터 탭으로 노출된다.
 * - tier:     가격 구간. 작업 깊이(퍼블리싱/프론트/풀스택)를 표현.
 *             내부 기준에 가깝지만 카드 우상단의 작은 뱃지로 노출되어
 *             "이 정도 결과물이 어떤 패키지에 해당하는지" 시그널을 준다.
 *
 * 두 차원은 직교한다. 같은 카테고리(예: brand)에도 standard/deluxe/premium
 * 등급이 모두 존재할 수 있다.
 */

/**
 * 프로젝트 카테고리 (주제/업종)
 * 고객이 자기 업종 사례를 찾는 필터의 메인 축
 */
export type ProjectCategory =
  | "brand"          // 브랜드 / 제품 (화장품, 패션, 식품 등)
  | "professional"   // 전문 서비스 (법률, 의료, 세무 등)
  | "fnb"            // 매장 / F&B (카페, 레스토랑, 베이커리)
  | "event"          // 이벤트 / 캠페인 (청첩장, 행사, 팝업)
  | "personal"       // 개인 / 크리에이터 (포트폴리오, 이력서)

/**
 * 프로젝트 카테고리 한글 라벨 매핑 (UI 노출용)
 */
export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  brand: "브랜드 / 제품",
  professional: "전문 서비스",
  fnb: "매장 / F&B",
  event: "이벤트 / 캠페인",
  personal: "개인 / 크리에이터",
}

/**
 * 가격 등급 (작업 깊이)
 * - standard: 퍼블리싱 (정적 마크업 + CSS + 기본 인터랙션)
 * - deluxe:   프론트엔드 (동적 상호작용, 폼, 상태 관리, 라이브러리 활용)
 * - premium:  풀스택 (백엔드 / DB / 인증 / 결제 / 어드민)
 */
export type ProjectTier = "standard" | "deluxe" | "premium"

/**
 * 등급 라벨 매핑 (카드 뱃지용)
 */
export const TIER_LABEL: Record<ProjectTier, string> = {
  standard: "STANDARD",
  deluxe: "DELUXE",
  premium: "PREMIUM",
}

/** 필터 메뉴에서 사용하는 카테고리 타입 (전체 포함) */
export type FilterCategory = "all" | ProjectCategory

/** 프로젝트 하이라이트 포인트 */
export interface ProjectHighlight {
  /** 제목 */
  title: string
  /** 상세 설명 */
  description: string
}

/**
 * PREMIUM 등급 데모 전용 - 백엔드 메타데이터
 *
 * 백엔드를 사용하는 데모만 이 필드를 채운다.
 * 구체 인프라(Supabase, 자체 서버 등) 결정은 PREMIUM 데모 작업 시점에 한다.
 */
export interface ProjectBackend {
  /** 사용한 백엔드 스택 (예: ["PostgreSQL", "JWT", "Stripe"]) */
  stack: string[]
  /** 구현된 백엔드 기능 목록 */
  features: string[]
  /** Live Demo 여부 (true: 진짜 백엔드 작동 / false: Mock 데이터) */
  isLive: boolean
}

/**
 * 포트폴리오 프로젝트 데이터 구조
 * app/data/projects.ts에서 이 인터페이스를 구현한다
 */
export interface Project {
  /** URL 식별자 (예: beauty-landing) */
  slug: string
  /** 프로젝트 제목 */
  title: string
  /** 부제목 (한 줄 설명) */
  subtitle: string
  /**
   * 카테고리 (주제/업종)
   * 고객 시점의 분류이며 /projects 필터의 기준이 된다.
   */
  category: ProjectCategory
  /**
   * 가격 등급 (작업 깊이)
   * 카드 우상단 뱃지로 노출되어 패키지 시그널을 준다.
   */
  tier: ProjectTier
  /** 사용한 기술 스택 목록 */
  techStack: string[]
  /** 상세 설명 (2~3문단) */
  description: string
  /**
   * 썸네일 이미지 경로 (16:10 비율 권장)
   * /public/images/projects/ 기준 상대 경로 또는 외부 URL
   */
  thumbnail: string
  /**
   * 상세 페이지용 스크린샷 이미지 배열
   * 순서대로 표시된다
   */
  images: string[]
  /** 데모 링크 (없으면 undefined) */
  demoUrl?: string
  /** 업종 (예: 뷰티/화장품, 법률, 외식업) */
  industry: string
  /** 핵심 구현 포인트 3~5개 */
  highlights: ProjectHighlight[]
  /** 작업 기간 (예: 2주) */
  duration: string
  /** 목록 정렬 순서 (낮을수록 앞에 표시) */
  order: number
  /**
   * PREMIUM 등급 전용 - 백엔드 메타데이터
   * 백엔드 없는 데모는 이 필드 없음.
   */
  backend?: ProjectBackend
}

/** 서비스 소개 카드 타입 */
export interface ServiceItem {
  /** 서비스 이름 */
  name: string
  /** 한 줄 설명 */
  description: string
  /** 포함 기술 태그 목록 */
  tags: string[]
  /** Lucide 아이콘 컴포넌트 (예: Code2, Layers). 렌더 시 <service.icon /> 으로 사용 */
  icon: LucideIcon
}

/** 기술 스택 그룹 타입 */
export interface TechGroup {
  /** 그룹 이름 (예: Frontend, Backend) */
  group: string
  /** 기술 목록 */
  items: string[]
}

/** 팀 강점 카드 타입 */
export interface StrengthItem {
  /** 강점 제목 */
  title: string
  /** 상세 설명 */
  description: string
  /** Lucide 아이콘 컴포넌트 (예: MessageCircle, Zap). 렌더 시 <item.icon /> 으로 사용 */
  icon: LucideIcon
}

/** 작업 프로세스 단계 타입 */
export interface ProcessStep {
  /** 단계 번호 */
  step: number
  /** 단계명 */
  title: string
  /** 단계 설명 */
  description: string
}

/** 실적 숫자 카드 타입 */
export interface StatItem {
  /** 숫자 값 */
  value: number
  /** 단위 (예: 건, 년, %) */
  unit: string
  /** 항목 레이블 */
  label: string
}
