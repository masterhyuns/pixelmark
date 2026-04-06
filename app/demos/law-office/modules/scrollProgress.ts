/**
 * 상단 스크롤 진행 라인
 *
 * [동작]
 * - window.scrollY / (documentHeight - windowHeight) = 0~1 비율
 * - .lo-scroll-progress-bar의 width를 퍼센트로 업데이트
 *
 * [requestAnimationFrame 스로틀링]
 * - scroll 이벤트는 매 프레임 수십 번 발생
 * - rAF로 묶어 다음 프레임에 한 번만 DOM 업데이트 → 60fps 유지
 *
 * [cleanup]
 * - scroll 리스너 + rAF 취소
 * - bar width 초기화
 */
export const initScrollProgress = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const bar = root.querySelector<HTMLElement>(".lo-scroll-progress-bar")
  if (!bar) return () => {}

  let rafId = 0
  let ticking = false

  const update = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    // docHeight이 0인 경우(짧은 페이지) 방어
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
    bar.style.width = `${progress * 100}%`
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      rafId = requestAnimationFrame(update)
      ticking = true
    }
  }

  // 초기 반영
  update()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    bar.style.width = ""
  }
}
