/**
 * 숫자 카운트업 (Home 페이지 실적 수치)
 *
 * [동작]
 * - [data-count] 속성을 가진 요소를 뷰포트 진입 시 감지
 * - 0부터 목표값까지 2초간 easeOutCubic 곡선으로 증가
 * - 한 번 실행 후 observer unobserve (재재생 없음)
 *
 * [부모 layout 위치에서 호출]
 * - home 페이지 sub-route가 마운트될 때마다 확인
 * - 하지만 이 모듈은 부모 layout에서 한 번 init하고, sub-route가 바뀌면
 *   해당 DOM 요소가 사라졌다 다시 나타나므로 재init 필요
 * - 따라서 이 모듈은 "홈 sub-route 자체"에서 useEffect로 호출하는 것이 맞음
 *
 * [easeOutCubic]
 * - 초반은 빠르고 후반으로 갈수록 감속 → 자연스러운 멈춤
 * - t * t * t 대신 1 - Math.pow(1 - t, 3) 사용
 */
export const initCountUp = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"))
  if (targets.length === 0) return () => {}

  // reduced motion: 목표값 즉시 표시, animation skip
  if (reduced) {
    targets.forEach((el) => {
      el.textContent = el.dataset.count ?? "0"
    })
    return () => {}
  }

  const animate = (el: HTMLElement) => {
    const target = parseInt(el.dataset.count ?? "0", 10)
    if (isNaN(target)) return

    const duration = 2000 // 2초
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      const value = Math.floor(target * eased)
      el.textContent = String(value)

      if (t < 1) {
        requestAnimationFrame(step)
      } else {
        // 마지막엔 정확한 목표값 보정
        el.textContent = String(target)
      }
    }

    requestAnimationFrame(step)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        animate(entry.target as HTMLElement)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.4 }
  )

  targets.forEach((el) => {
    el.textContent = "0" // 초기값
    observer.observe(el)
  })

  return () => {
    observer.disconnect()
  }
}
