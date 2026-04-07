/**
 * E-S3 Popup Vivid — 히어로 그라데이션 hue 회전
 *
 * [동작]
 * - [data-pv-hero] 요소의 `--pv-hero-hue` CSS 변수를 0→360 천천히 순환
 * - 60초 한 사이클 → SCSS의 hue-rotate(var(--pv-hero-hue)) 가 반응
 * - requestAnimationFrame 으로 부드럽게 갱신
 *
 * [접근성]
 * - prefers-reduced-motion 시 비활성 (정적 그라데이션 유지)
 *
 * [cleanup]
 * - rAF 취소 + 변수 원복
 */
export const initGradientAnim = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) return () => {}

  const hero = root.querySelector<HTMLElement>("[data-pv-hero]")
  if (!hero) return () => {}

  const cycleMs = 60_000
  const start = performance.now()
  let rafId = 0

  const tick = (now: number) => {
    const elapsed = (now - start) % cycleMs
    const hue = (elapsed / cycleMs) * 360
    hero.style.setProperty("--pv-hero-hue", `${hue.toFixed(2)}deg`)
    rafId = window.requestAnimationFrame(tick)
  }

  rafId = window.requestAnimationFrame(tick)

  return () => {
    if (rafId) window.cancelAnimationFrame(rafId)
    hero.style.removeProperty("--pv-hero-hue")
  }
}
