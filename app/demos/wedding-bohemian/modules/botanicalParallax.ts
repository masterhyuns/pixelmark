/**
 * E-S7 Wedding Bohemian — 식물 SVG 패럴랙스 (시그니처)
 *
 * [동작]
 * - [data-wb-float] 요소에 data-speed(0.1 ~ 0.5) 속도로 scroll 연동 translateY
 * - requestAnimationFrame + passive scroll 리스너
 * - prefers-reduced-motion 시 비활성 (정적 위치)
 *
 * [수식]
 *   translateY = -(scrollY - elementTop) * speed
 *   → 위로 스크롤할 때 요소가 느리게 따라 내려오거나 흐르는 효과
 *
 * [cleanup]
 * - scroll 리스너 제거, transform 원복
 */
export const initBotanicalParallax = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) return () => {}

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-wb-float]"))
  if (targets.length === 0) return () => {}

  // 각 요소의 기준 offsetTop을 한 번만 측정 (리사이즈 시 재측정)
  interface TargetState {
    el: HTMLElement
    anchorY: number
    speed: number
  }

  const state: TargetState[] = []
  const measure = () => {
    state.length = 0
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const anchorY = rect.top + window.scrollY + rect.height / 2
      const speed = Number(el.dataset.speed ?? "0.25")
      state.push({ el, anchorY, speed })
    })
  }

  let rafId = 0
  let ticking = false

  const update = () => {
    ticking = false
    const scrollY = window.scrollY
    const viewportCenter = scrollY + window.innerHeight / 2
    for (const s of state) {
      const delta = (viewportCenter - s.anchorY) * s.speed
      s.el.style.transform = `translate3d(0, ${delta.toFixed(1)}px, 0)`
    }
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    rafId = window.requestAnimationFrame(update)
  }

  const onResize = () => {
    measure()
    update()
  }

  measure()
  update()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize)

  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onResize)
    if (rafId) window.cancelAnimationFrame(rafId)
    targets.forEach((el) => {
      el.style.transform = ""
    })
  }
}
