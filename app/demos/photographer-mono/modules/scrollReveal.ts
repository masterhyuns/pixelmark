/** PE-S1 reveal */
export const initScrollReveal = (root: HTMLElement): (() => void) => {
  if (typeof window === "undefined") return () => {}
  const targets = root.querySelectorAll<HTMLElement>("[data-pmn-reveal]")
  if (!targets.length) return () => {}
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible")
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )
  targets.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
