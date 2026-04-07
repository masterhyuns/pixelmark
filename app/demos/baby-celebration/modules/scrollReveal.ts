/**
 * E-S2 Baby Celebration — 스크롤 진입 페이드인
 *
 * - [data-bc-reveal] 요소가 뷰포트 진입 시 .is-visible 추가
 * - SCSS의 .is-visible로 opacity/translateY 트랜지션
 * - prefers-reduced-motion 시 즉시 노출
 */
export const initScrollReveal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-bc-reveal]")
  if (targets.length === 0) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"))
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  )

  targets.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
