import Lenis from "lenis"

/**
 * Lenis 모멘텀 스크롤 초기화
 *
 * [왜 Lenis인가]
 * - 네이티브 스크롤은 관성이 즉각 멈춰 "고급 사이트" 느낌이 약함
 * - Lenis는 wheel/touch 이벤트를 가로채 RAF 루프에서 부드럽게 보간 (lerp)
 * - GSAP ScrollTrigger와 잘 연동됨 (lenis.on("scroll", ScrollTrigger.update))
 *
 * [lerp 값 의미]
 * - lerp(0~1): 목표 위치에 얼마나 빨리 다가갈지 (1에 가까울수록 즉각, 0.1이면 10%)
 * - 0.1이 가장 자연스러운 "고급스러운 관성" — 기획서 명시값
 *
 * [cleanup 의무]
 * - 반드시 lenis.destroy()로 RAF 루프 정지 + 이벤트 해제
 * - 안 하면 다른 라우트로 이동한 후에도 스크롤이 가로채짐 → 메인 사이트 망가짐
 *
 * [접근성]
 * - prefers-reduced-motion 시 Lenis 비활성 (네이티브 스크롤 복귀)
 * - 이 경우 GSAP ScrollTrigger도 기본 스크롤 이벤트로 동작하므로 문제 없음
 */
export const initLenis = (): (() => void) => {
  if (typeof window === "undefined") return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const lenis = new Lenis({
    // lerp는 0~1, 0.1은 기획서 명시값 (관성감 충분, 지연감 최소)
    lerp: 0.1,
    // wheelMultiplier를 올리면 wheel 한 번에 더 많이 이동 (기본 1)
    wheelMultiplier: 1,
    // touchMultiplier: 터치 드래그 강도 (기본 2, 모바일 사용감 개선)
    touchMultiplier: 2,
  })

  // RAF 루프: lenis.raf(time)에 DOMHighResTimeStamp 넘겨 보간 실행
  let rafId = 0
  const raf = (time: number) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // cleanup
  return () => {
    cancelAnimationFrame(rafId)
    lenis.destroy()
  }
}
