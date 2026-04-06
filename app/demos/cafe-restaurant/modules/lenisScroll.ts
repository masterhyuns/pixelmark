import Lenis from "lenis"

/**
 * Lenis 모멘텀 스크롤 초기화
 *
 * [S-1에서 복사한 이유]
 * - CLAUDE.md 원칙: "다른 데모 폴더 import 금지"
 * - S-1과 S-3가 동일한 Lenis 초기화가 필요하지만, 공유하면 데모 간 의존성이 생겨
 *   각 데모의 "독립된 클라이언트 프로젝트" 성격이 훼손됨
 * - 복사본이 있는 게 "데모 폴더 통째로 이식 가능"을 유지하는 방법
 *
 * [lerp 0.1]
 * - 기획서 명시값. 갤러리 사이트 감성에 어울리는 부드러운 관성
 *
 * [cleanup]
 * - destroy 필수. 안 하면 라우트 이동 후에도 스크롤 가로채짐
 */
export const initLenis = (): (() => void) => {
  if (typeof window === "undefined") return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  let rafId = 0
  const raf = (time: number) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
    lenis.destroy()
  }
}
