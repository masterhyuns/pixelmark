/**
 * 히어로 영역 마우스 spotlight 효과 (Nice-to-have)
 *
 * [동작 원리]
 * - 히어로 섹션에 반투명 radial-gradient 오버레이를 둠
 * - 마우스 이동에 따라 gradient 중심점(--x, --y) 업데이트
 * - 마우스가 히어로를 떠나면 opacity 페이드 아웃
 *
 * [왜 CSS 변수로 하는가]
 * - JS에서 el.style.background를 매번 갱신하면 레이아웃 reflow 유발
 * - CSS 변수만 바꾸면 브라우저가 composite 단계에서 처리 → GPU 가속
 * - requestAnimationFrame으로 스로틀링하여 60fps 유지
 *
 * [접근성]
 * - hover 디바이스에만 (pointer 없는 기기는 무의미)
 * - prefers-reduced-motion 시 비활성
 */
export const initHeroSpotlight = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (!window.matchMedia("(hover: hover)").matches) return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const hero = root.querySelector<HTMLElement>(".bl-hero")
  const spotlight = root.querySelector<HTMLElement>(".bl-hero-spotlight")
  if (!hero || !spotlight) return () => {}

  let rafId = 0
  let pendingX = 0
  let pendingY = 0
  let isScheduled = false

  const applyPosition = () => {
    spotlight.style.setProperty("--x", `${pendingX}px`)
    spotlight.style.setProperty("--y", `${pendingY}px`)
    isScheduled = false
  }

  const onMove = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect()
    pendingX = e.clientX - rect.left
    pendingY = e.clientY - rect.top
    if (!isScheduled) {
      isScheduled = true
      rafId = requestAnimationFrame(applyPosition)
    }
  }

  const onEnter = () => {
    hero.classList.add("is-spotlight-on")
  }

  const onLeave = () => {
    hero.classList.remove("is-spotlight-on")
  }

  hero.addEventListener("mouseenter", onEnter)
  hero.addEventListener("mousemove", onMove)
  hero.addEventListener("mouseleave", onLeave)

  // cleanup
  return () => {
    cancelAnimationFrame(rafId)
    hero.removeEventListener("mouseenter", onEnter)
    hero.removeEventListener("mousemove", onMove)
    hero.removeEventListener("mouseleave", onLeave)
    hero.classList.remove("is-spotlight-on")
  }
}
