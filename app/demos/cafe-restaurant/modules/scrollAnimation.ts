/**
 * 섹션 진입 페이드업 애니메이션 (Intersection Observer)
 *
 * [왜 GSAP 대신 IntersectionObserver인가]
 * - S-3는 Lenis만 필요, GSAP/ScrollTrigger까지 번들에 넣을 필요 없음
 * - 단순 페이드업은 CSS transition + class toggle로 충분
 * - 번들 크기 절약 + 간단함
 *
 * [data-reveal 속성 기반]
 * - 마크업에 `data-reveal` 속성만 추가하면 자동 대상
 * - 초기 상태: opacity 0, translateY(24px) — SCSS에서 정의
 * - 뷰포트 진입 시: is-revealed 클래스 추가 → opacity 1, translateY(0)
 *
 * [cleanup]
 * - observer disconnect
 */
export const initScrollAnimation = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
  if (targets.length === 0) return () => {}

  // 초기 스타일 주입 (SCSS에 의존하지 않고 JS에서 직접 설정)
  targets.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"
    el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
  })

  if (reduced) {
    targets.forEach((el) => {
      el.style.opacity = ""
      el.style.transform = ""
    })
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
        observer.unobserve(el)
      })
    },
    { threshold: 0.15 }
  )

  targets.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    targets.forEach((el) => {
      el.style.opacity = ""
      el.style.transform = ""
      el.style.transition = ""
    })
  }
}
