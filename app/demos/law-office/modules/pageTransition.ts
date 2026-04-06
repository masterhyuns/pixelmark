/**
 * 페이지 전환 페이드 (0.3s fade out → 0.3s fade in)
 *
 * [React Router 7 환경에서 구현 방법]
 * - React Router는 클라이언트 라우팅 시 즉시 DOM 교체 — 기본적으로 페이드 없음
 * - 원래 라우트별 transition을 만들려면 Framer Motion 등이 필요하지만,
 *   S-2는 외부 라이브러리 0개 제약이 있어 Framer Motion 사용 불가
 * - 대안: useLocation 변경을 감지해 CSS 클래스 토글로 페이드 시뮬레이션
 *
 * [이 모듈의 역할]
 * - 부모 layout에서 호출되며, .lo-page 클래스가 붙은 sub-route wrapper를 관찰
 * - 실제 페이드 클래스 토글은 부모 layout이 useEffect + useLocation으로 처리
 * - 이 모듈 자체는 "is-leaving" 클래스를 짧게 부여한 뒤 제거하는 fade-in 역할만
 *
 * [대안 고려]
 * - ViewTransition API도 있지만 브라우저 지원이 제한적
 * - 기획서의 "페이지 전환 페이드" 수준이면 CSS opacity transition으로 충분
 *
 * 사실 이 모듈은 현재 상태에서는 부모 layout의 useEffect 로직으로 대체 가능하지만,
 * 다른 모듈과의 일관성을 위해 init/cleanup 인터페이스 유지.
 */
export const initPageTransition = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  // 현재는 no-op — 실제 전환은 부모 layout의 useLocation 로직이 담당
  // 이 훅은 확장성을 위한 자리 표시
  return () => {}
}
