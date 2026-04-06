/**
 * 일반 섹션 페이드인 + 스킬 태그 stagger
 *
 * [동작]
 * - [data-reveal] 요소: 뷰포트 진입 시 opacity/translate 전환 (CSS transition)
 * - .pp-skill 요소: stagger 0.05s 간격 순차 등장
 *
 * [초기 상태]
 * - SCSS에서 opacity:0, transform:translateY(16px)로 설정하지 않고 inline style로 관리
 * - is-revealed 클래스 추가 시 원복
 */
export const initScrollReveal = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // 1) 일반 reveal 요소
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
  targets.forEach((el) => {
    if (reduced) return
    el.style.opacity = "0"
    el.style.transform = "translateY(16px)"
    el.style.transition =
      "opacity 0.6s cubic-bezier(0.6, 0, 0.2, 1), transform 0.6s cubic-bezier(0.6, 0, 0.2, 1)"
  })

  // 2) 스킬 태그 (stagger)
  const skills = Array.from(root.querySelectorAll<HTMLElement>(".pp-skill"))
  skills.forEach((el, i) => {
    if (reduced) {
      el.classList.add("is-revealed")
      return
    }
    el.style.transitionDelay = `${i * 0.05}s`
  })

  if (reduced) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        if (el.classList.contains("pp-skill")) {
          el.classList.add("is-revealed")
        } else {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }
        observer.unobserve(el)
      })
    },
    { threshold: 0.2 }
  )

  targets.forEach((el) => observer.observe(el))
  skills.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    targets.forEach((el) => {
      el.style.opacity = ""
      el.style.transform = ""
      el.style.transition = ""
    })
    skills.forEach((el) => {
      el.classList.remove("is-revealed")
      el.style.transitionDelay = ""
    })
  }
}
