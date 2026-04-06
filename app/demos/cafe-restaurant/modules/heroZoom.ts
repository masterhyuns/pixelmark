/**
 * 히어로 배경 서서히 확대 효과 (Nice-to-have)
 *
 * [동작]
 * - 페이지 로드 시 .cr-hero-bg에 transform: scale(1.05) 적용
 * - SCSS에 15s ease-out transition이 이미 걸려있어 부드럽게 확대됨
 * - 단순히 class 토글이 아니라 다음 프레임에 scale 적용해야 transition이 작동
 *
 * [왜 CSS animation loop이 아닌 JS인가]
 * - CSS animation으로 구현하면 scale 1↔1.05를 왕복해야 함 (매 15s마다 리셋)
 * - 기획서의 "서서히 확대"는 한 방향으로 천천히 줌인하는 느낌
 * - JS로 "마운트 후 한 번만 scale 1.05" 방식이 의도에 맞음
 *
 * [reduced-motion]
 * - 확대 효과 비활성
 */
export const initHeroZoom = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const heroBg = root.querySelector<HTMLElement>(".cr-hero-bg")
  if (!heroBg) return () => {}

  // 다음 프레임에 scale 적용 → 초기 transform(없음)에서 1.05로 transition
  const rafId = requestAnimationFrame(() => {
    heroBg.style.transform = "scale(1.05)"
  })

  return () => {
    cancelAnimationFrame(rafId)
    heroBg.style.transform = ""
  }
}
