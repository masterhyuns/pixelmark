import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * 히어로 배경 패럴랙스 (0.5배속)
 *
 * [왜 GSAP ScrollTrigger인가]
 * - Lenis의 smooth scroll과 호환되려면 ScrollTrigger가 scroll 이벤트를 참조해야 함
 * - GSAP의 scrub: true 옵션이 스크롤 연동 timeline을 제공
 *
 * [구현]
 * - hero .bl-hero-bg 요소에 yPercent 변화 (기본 0 → 스크롤 끝에서 -20%)
 * - scrub: true → 스크롤 위치에 정확히 비례 (lerp 없음)
 * - trigger: .bl-hero, start: top top, end: bottom top → 히어로가 뷰포트 안에 있는 동안만 효과
 *
 * [모바일 비활성화]
 * - 기획서: 모바일에서 패럴랙스 비활성 (성능 + 사용감)
 * - matchMedia("(min-width: 768px)")로 가드
 *
 * [cleanup]
 * - ScrollTrigger.getAll()에서 이 트리거만 kill (다른 모듈의 트리거 보존)
 * - gsap.context를 쓰면 revert()로 한 번에 정리
 */
export const initParallax = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  // 모바일/reduced-motion 비활성
  const isDesktop = window.matchMedia("(min-width: 768px)").matches
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!isDesktop || reduced) return () => {}

  // ScrollTrigger가 이미 글로벌 등록돼 있을 수 있지만,
  // 안전하게 한 번 더 register (이미 등록된 경우 no-op)
  gsap.registerPlugin(ScrollTrigger)

  // gsap.context: root 스코프 안의 모든 tween/ScrollTrigger를 한 번에 revert 가능
  const ctx = gsap.context(() => {
    const heroBg = root.querySelector<HTMLElement>(".bl-hero-bg")
    if (!heroBg) return

    gsap.to(heroBg, {
      yPercent: 20, // 배경이 아래로 밀리면서 느리게 스크롤되는 느낌
      ease: "none",
      scrollTrigger: {
        trigger: root.querySelector(".bl-hero"),
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
  }, root)

  // cleanup: context.revert()로 이 컨텍스트의 모든 tween/ScrollTrigger 제거
  return () => {
    ctx.revert()
  }
}
