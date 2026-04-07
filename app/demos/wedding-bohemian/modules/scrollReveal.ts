/**
 * E-S7 Wedding Bohemian — 스크롤 진입 페이드인
 * - [data-wb-reveal] + 옵션 data-direction="left|right|up"
 */
export const initScrollReveal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-wb-reveal]")
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
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  )

  targets.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
