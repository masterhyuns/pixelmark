import type { ProjectTier } from "~/types/types"

/**
 * 프로젝트 등급(tier) 색상 매핑 — 단일 진실의 원천 (Single Source of Truth)
 *
 * [왜 별도 파일로 분리했나]
 * 이전엔 ProjectCard.tsx와 projects.$slug.tsx 두 곳에 동일한 TIER_STYLE 상수가
 * 중복 존재했다. UI 피드백 지시서 #001 항목 4에서 STANDARD 색상을 바꿀 때
 * 두 곳을 동시에 손대야 했고, 실수로 한쪽만 고치면 시각 불일치가 발생할 위험이 있었다.
 * → 단일 파일로 통합해 한 번의 수정이 두 컴포넌트 모두에 자동 반영되도록 구조화.
 *
 * [디자인 의도 — 다크 테마 기준]
 * - STANDARD: 다크 배경에서 너무 옅어 보이던 문제로 라이트 블루 반투명 + 흰 글씨
 *   → 가장 기본 등급이지만 시각 가시성은 확보
 * - DELUXE: 앰버 톤 (중간 등급 시그널)
 *   → 미묘한 프리미엄 느낌, 눈에 띄지만 과하지 않음
 * - PREMIUM: 다크 강조 (화이트 반투명 + 진한 보더)
 *   → 최상위 등급임을 명확하게
 *
 * [확장 가이드]
 * - 새 등급 추가 시(예: "enterprise") ProjectTier 타입에 값을 추가한 뒤 여기 한 곳만 수정
 * - 다른 컴포넌트(메인 페이지 카드, 어드민 뱃지 등)에서도 등급 뱃지를 쓰게 되면
 *   `import { TIER_STYLE } from "~/utils/tierStyle"` 한 줄로 동일 톤 유지
 *
 * [관련 TODO — 이번 범위 외]
 * 같은 패턴으로 CATEGORY_STYLE도 두 파일에 중복 존재함.
 * 이번 작업이 안정적으로 동작하면 다음 지시서에서 `categoryStyle.ts`로 분리 권장.
 */
export const TIER_STYLE: Record<ProjectTier, string> = {
  standard: "bg-[#abbdef9c] text-white border-[#abbdef]/50",
  deluxe: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  premium: "bg-white/20 text-white border-white/40",
}
