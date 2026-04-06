/**
 * 경력 타임라인 — 중앙선 draw + 좌우 교차 stagger
 *
 * [두 가지]
 * 1. 타임라인 아이템 뷰포트 진입 시 .is-revealed 추가 → opacity/translate 전환
 * 2. 스크롤 연동 중앙선 draw: .pp-timeline-line-fill의 height를 스크롤 진행도에 비례해 증가
 *
 * [스크롤 연동 계산]
 * - 타임라인 컨테이너의 top이 뷰포트 상단에 걸쳐있는 동안 progress 0~1 계산
 * - progress * containerHeight = line-fill의 height
 * - 간단히 IntersectionObserver로 처음 진입 후 scroll 리스너 활성화 → 부담 최소화
 */
export const initTimeline = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const container = root.querySelector<HTMLElement>(".pp-timeline")
  const items = Array.from(root.querySelectorAll<HTMLElement>(".pp-timeline-item"))
  const lineFill = root.querySelector<HTMLElement>(".pp-timeline-line-fill")
  if (!container || items.length === 0) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // ----- 1. 아이템 stagger reveal -----
  if (reduced) {
    items.forEach((el) => el.classList.add("is-revealed"))
  } else {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          // 진입한 아이템의 인덱스 기반 딜레이 (자연스러운 순차)
          const itemIndex = items.indexOf(el)
          el.style.transitionDelay = `${itemIndex * 0.08}s`
          el.classList.add("is-revealed")
          itemObserver.unobserve(el)
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((el) => itemObserver.observe(el))
  }

  // ----- 2. 중앙선 draw (scroll 연동) -----
  if (!lineFill || reduced) {
    return () => {}
  }

  let rafId = 0
  let ticking = false

  const updateLine = () => {
    const rect = container.getBoundingClientRect()
    const vh = window.innerHeight
    // 진행도: 컨테이너 상단이 뷰포트 중앙에 도달했을 때부터 하단이 중앙을 지날 때까지
    const start = vh * 0.7
    const end = -rect.height + vh * 0.3
    const raw = (start - rect.top) / (start - end)
    const progress = Math.max(0, Math.min(1, raw))
    lineFill.style.height = `${progress * 100}%`
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      rafId = requestAnimationFrame(updateLine)
      ticking = true
    }
  }

  updateLine()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    items.forEach((el) => {
      el.classList.remove("is-revealed")
      el.style.transitionDelay = ""
    })
    if (lineFill) lineFill.style.height = ""
  }
}
