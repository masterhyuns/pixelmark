/**
 * E-S11 Wedding Cinematic — 히어로 영화 예고편 스타일 reveal
 *
 * [동작]
 * - 페이지 로드 시 [data-wcine-reveal-step] 요소들에 순차로 .is-visible 부여
 * - data-step="1|2|3|4..." 순서대로 0, 600, 1300, 2000... ms 딜레이
 *
 * [cleanup]
 * - 모든 setTimeout 정리, 클래스 원복
 */
export const initHeroReveal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const targets = root.querySelectorAll<HTMLElement>("[data-wcine-reveal-step]")
  if (targets.length === 0) return () => {}

  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"))
    return () => {}
  }

  const timers: number[] = []
  // 순서별 누적 딜레이 (단계 격차를 점차 늘림)
  const cumulative = [0, 600, 1400, 2200, 2800, 3300]

  targets.forEach((el) => {
    const step = Number(el.dataset.wcineRevealStep ?? "0")
    const delay = cumulative[Math.min(step, cumulative.length - 1)]
    const t = window.setTimeout(() => {
      el.classList.add("is-visible")
    }, delay)
    timers.push(t)
  })

  return () => {
    timers.forEach((t) => window.clearTimeout(t))
    targets.forEach((el) => el.classList.remove("is-visible"))
  }
}
