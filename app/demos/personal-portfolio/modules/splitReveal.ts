/**
 * 단어 단위 mask reveal (섹션 타이틀)
 *
 * [왜 word 단위인가]
 * - S-4 컨셉은 "절제, 타이포 중심" — char 단위는 지나치게 장식적
 * - word 단위 mask 슬라이드는 에디토리얼 레이아웃 특유의 품격
 *
 * [mask 구조]
 * - 각 단어를 <span class="pp-word-wrap">(overflow hidden) > <span class="pp-word-inner">로 래핑
 * - inner가 translateY(110%)로 mask 아래 숨음
 * - reveal 시 translateY(0) → 단어가 위에서 아래로 드러남
 *
 * [트리거]
 * - IntersectionObserver로 뷰포트 진입 시 재생
 * - 진입한 요소 내부의 모든 inner span에 transition-delay 순차 적용
 *
 * [cleanup]
 * - observer disconnect
 * - 원본 텍스트 복원
 */
export const initSplitReveal = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-split-reveal]"))
  if (targets.length === 0) return () => {}

  // 원본 텍스트 보관 (cleanup 시 복원)
  const originals: Array<{ el: HTMLElement; text: string }> = []

  targets.forEach((el) => {
    const text = el.textContent ?? ""
    originals.push({ el, text })

    if (reduced) return // reduced motion: 변환 스킵

    el.textContent = ""
    const words = text.split(/(\s+)/)

    words.forEach((word, i) => {
      if (/^\s+$/.test(word)) {
        el.appendChild(document.createTextNode(word))
        return
      }
      const wrap = document.createElement("span")
      wrap.className = "pp-word-wrap"
      wrap.style.display = "inline-block"
      wrap.style.overflow = "hidden"
      wrap.style.verticalAlign = "top"

      const inner = document.createElement("span")
      inner.className = "pp-word-inner"
      inner.textContent = word
      inner.style.display = "inline-block"
      inner.style.transform = "translateY(110%)"
      inner.style.transition = `transform 0.7s cubic-bezier(0.6, 0, 0.2, 1) ${i * 0.06}s`

      wrap.appendChild(inner)
      el.appendChild(wrap)
    })
  })

  if (reduced) return () => {}

  // IntersectionObserver로 진입 감지
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        target.querySelectorAll<HTMLElement>(".pp-word-inner").forEach((inner) => {
          inner.style.transform = "translateY(0)"
        })
        observer.unobserve(target)
      })
    },
    { threshold: 0.3 }
  )

  targets.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    // 원본 텍스트 복원
    originals.forEach(({ el, text }) => {
      el.textContent = text
    })
  }
}
