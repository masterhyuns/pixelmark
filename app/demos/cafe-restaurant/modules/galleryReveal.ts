/**
 * 갤러리 이미지 clip-path reveal (위→아래로 펼쳐짐)
 *
 * [동작 원리]
 * 1. SCSS 초기값: `clip-path: inset(100% 0 0 0); opacity: 0;` — 이미지가 완전히 가려짐
 * 2. IntersectionObserver로 뷰포트 진입 감지
 * 3. 진입한 항목에 `.is-revealed` 클래스 추가 → clip-path: inset(0) + opacity: 1
 * 4. stagger 효과는 CSS transition-delay로 (JS에서 인덱스 기반 계산)
 *
 * [왜 clip-path인가]
 * - opacity/transform fade-up보다 "사진이 위에서 펼쳐지는" 고급스러운 느낌
 * - "갤러리 사이트 감성"을 강화하는 핵심 디테일
 * - GPU 가속되므로 성능 좋음
 *
 * [stagger를 JS에서 계산하는 이유]
 * - SCSS에서 :nth-child(n) transition-delay로 하면 반복적이고 정적
 * - JS에서 실제 DOM 순서대로 0.08s씩 증가시키면 유연함
 *
 * [cleanup]
 * - IntersectionObserver disconnect
 * - is-revealed 클래스는 유지해도 문제 없음 (revert 불필요)
 */
const STAGGER = 0.08 // 기획서 명시: 0.08s 간격

export const initGalleryReveal = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const items = Array.from(
    root.querySelectorAll<HTMLElement>(".cr-gallery-grid > a")
  )
  if (items.length === 0) return () => {}

  // reduced motion: 즉시 모두 reveal, observer 없이
  if (reduced) {
    items.forEach((item) => item.classList.add("is-revealed"))
    return () => {}
  }

  // stagger 딜레이를 inline style로 설정 (SCSS transition이 이 delay를 참조하도록)
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * STAGGER}s`
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-revealed")
        observer.unobserve(entry.target)
      })
    },
    // threshold 0.15 → 0으로 낮춤: clip-path inset(100%) 상태에서도 확실히 트리거
    { threshold: 0, rootMargin: "0px 0px -4% 0px" }
  )

  items.forEach((item) => observer.observe(item))

  // 안전 장치: 2초 뒤에도 reveal 안 된 아이템이 있으면 강제 reveal
  const fallbackTimer = setTimeout(() => {
    items.forEach((item) => {
      if (!item.classList.contains("is-revealed")) {
        item.classList.add("is-revealed")
      }
    })
  }, 2000)

  return () => {
    clearTimeout(fallbackTimer)
    observer.disconnect()
  }
}
