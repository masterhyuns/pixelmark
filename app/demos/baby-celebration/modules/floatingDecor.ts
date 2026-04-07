/**
 * E-S2 Baby Celebration — 일러스트 액센트 둥둥 모션
 *
 * [동작]
 * - [data-bc-float] 요소들에 개별 딜레이/속도를 CSS 변수로 부여
 * - 실제 모션은 SCSS @keyframes bc-float (translateY 6px ↔ -6px, ease-in-out)
 * - prefers-reduced-motion 시 클래스 미부여 → 모션 자동 비활성
 *
 * [cleanup]
 * - 부여한 inline style 원복
 */
export const initFloatingDecor = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-bc-float]")
  if (targets.length === 0) return () => {}

  targets.forEach((el, i) => {
    // 0.3s 간격으로 딜레이 차등, 4~6초 사이 속도
    const delay = (i % 4) * 0.35
    const duration = 4 + (i % 3) * 0.8
    el.style.setProperty("--bc-float-delay", `${delay}s`)
    el.style.setProperty("--bc-float-duration", `${duration}s`)
    el.classList.add("is-floating")
  })

  return () => {
    targets.forEach((el) => {
      el.style.removeProperty("--bc-float-delay")
      el.style.removeProperty("--bc-float-duration")
      el.classList.remove("is-floating")
    })
  }
}
