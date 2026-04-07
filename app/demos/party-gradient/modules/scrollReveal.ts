/**
 * E-S5 Party Gradient — 스크롤 진입 페이드인 + stagger
 */
export const initScrollReveal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-pg-reveal]")
  if (targets.length === 0) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"))
    return () => {}
  }

  // stagger: data-stagger-index 가 있으면 그 값 × 80ms 딜레이 적용
  targets.forEach((el) => {
    const idx = Number(el.dataset.staggerIndex ?? "0")
    el.style.transitionDelay = idx > 0 ? `${idx * 80}ms` : ""
  })

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
  return () => {
    observer.disconnect()
    targets.forEach((el) => { el.style.transitionDelay = "" })
  }
}
