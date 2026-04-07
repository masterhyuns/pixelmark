/**
 * E-S11 Wedding Cinematic — 크레딧 자동 스크롤 (영화 엔딩 크레딧 톤)
 *
 * [동작]
 * - .wcine-credits-track 요소가 뷰포트 진입 시 .is-rolling 클래스 부여
 * - SCSS @keyframes wcine-credits 가 위에서 아래로 흐름 (transform translateY)
 * - 사용자가 호버하면 일시정지 (animation-play-state: paused)
 *
 * [cleanup]
 * - observer disconnect, 클래스 제거
 */
export const initCreditsRoll = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const target = root.querySelector<HTMLElement>(".wcine-credits-track")
  if (!target) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    target.classList.add("is-static")
    return () => target.classList.remove("is-static")
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          target.classList.add("is-rolling")
          observer.unobserve(target)
        }
      })
    },
    { threshold: 0.2 }
  )
  observer.observe(target)
  return () => {
    observer.disconnect()
    target.classList.remove("is-rolling")
  }
}
