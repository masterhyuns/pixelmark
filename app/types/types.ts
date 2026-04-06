/**
 * 포트폴리오 프로젝트 타입 정의
 * 모든 데이터 구조는 이 파일에서 관리한다
 */

/** 프로젝트 카테고리 - 서비스 등급별 분류 */
export type ProjectCategory = "standard" | "deluxe" | "premium"

/** 프로젝트 카테고리 라벨 매핑 */
export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
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
 * 포트폴리오 프로젝트 데이터 구조
 * app/data/projects.ts에서 이 인터페이스를 구현한다
 */
export interface Project {
  /** URL 식별자 (예: s-1-brand-cosmetics) */
  slug: string
  /** 프로젝트 제목 */
  title: string
  /** 부제목 (한 줄 설명) */
  subtitle: string
  /**
   * 카테고리: standard(퍼블리싱) | deluxe(프론트엔드) | premium(풀스택)
   * 목록 필터 및 배지 색상에 사용된다
   */
  category: ProjectCategory
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
}

/** 서비스 소개 카드 타입 */
export interface ServiceItem {
  /** 서비스 이름 */
  name: string
  /** 한 줄 설명 */
  description: string
  /** 포함 기술 태그 목록 */
  tags: string[]
  /** 아이콘 문자 또는 이모지 */
  icon: string
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
  /** 아이콘 문자 */
  icon: string
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
