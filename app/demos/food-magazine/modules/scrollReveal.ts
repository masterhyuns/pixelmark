/**
 * 스크롤 reveal — IntersectionObserver 기반.
 * `[data-fmag-reveal]` 요소가 뷰포트에 들어오면 `is-visible` 클래스 부여.
 * cleanup 시 observer disconnect 필수.
 */
export const initScrollReveal = (root: HTMLElement): (() => void) => {
  if (typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-fmag-reveal]")
  if (!targets.length) return () => {}

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )

  targets.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
