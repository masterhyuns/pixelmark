/**
 * 플로팅 상담 버튼 페이드인 (스크롤 200px 이후)
 *
 * [동작]
 * - 초기 상태: .lo-floating-consult는 opacity 0 + pointer-events none (SCSS 기본)
 * - 스크롤 200px 이상일 때 .is-visible 추가 → opacity 1 + pointer-events auto
 *
 * [기획서 명시값]
 * - 임계값: 200px
 * - 트랜지션: CSS가 담당 (0.4s)
 */
export const initFloatingButton = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const button = root.querySelector<HTMLElement>(".lo-floating-consult")
  if (!button) return () => {}

  const THRESHOLD = 200
  const onScroll = () => {
    if (window.scrollY > THRESHOLD) {
      button.classList.add("is-visible")
    } else {
      button.classList.remove("is-visible")
    }
  }

  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })

  return () => {
    window.removeEventListener("scroll", onScroll)
    button.classList.remove("is-visible")
  }
}
