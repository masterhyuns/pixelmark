/**
 * E-S4 Conference Tech — 스크롤 진입 페이드인
 * - [data-ct-reveal] 셀렉터로 격리
 */
export const initScrollReveal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-ct-reveal]")
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
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  )

  targets.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
