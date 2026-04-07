/**
 * E-S15 Wedding Pixel — 게임 대화창 typing 효과
 *
 * [동작]
 * - .wpix-dialogue-line 요소들의 텍스트를 한 글자씩 타이핑
 * - 사용자가 dialogue 컨테이너 클릭 시 다음 라인으로 진행
 * - 처음엔 첫 번째 라인만 보이고, 클릭/스크롤 진입 시 자동 진행
 *
 * 단순화: 진입 시 모든 라인이 순차적으로 자동 typing (총 ~12초)
 * cleanup: 모든 setTimeout 정리, 텍스트 원복
 */
export const initDialogueTyping = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const container = root.querySelector<HTMLElement>("[data-wpix-dialogue]")
  if (!container) return () => {}

  const lines = Array.from(container.querySelectorAll<HTMLElement>(".wpix-dialogue-line"))
  if (lines.length === 0) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  // 원본 텍스트 보관 + 비우기
  const originalTexts = lines.map((el) => el.textContent ?? "")
  lines.forEach((el) => { el.textContent = ""; el.classList.remove("is-typing", "is-done") })

  if (reduced) {
    lines.forEach((el, i) => {
      el.textContent = originalTexts[i]
      el.classList.add("is-done")
    })
    return () => {}
  }

  const timers: number[] = []

  const typeLine = (idx: number, onDone: () => void) => {
    if (idx >= lines.length) { onDone(); return }
    const el = lines[idx]
    const text = originalTexts[idx]
    el.classList.add("is-typing")
    let i = 0
    const tick = () => {
      if (i >= text.length) {
        el.classList.remove("is-typing")
        el.classList.add("is-done")
        // 다음 라인으로 (살짝 쉬고)
        const t2 = window.setTimeout(() => typeLine(idx + 1, onDone), 600)
        timers.push(t2)
        return
      }
      el.textContent = text.slice(0, i + 1)
      i++
      const t = window.setTimeout(tick, 35)
      timers.push(t)
    }
    tick()
  }

  // IntersectionObserver로 진입 시 시작
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          typeLine(0, () => {})
        }
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(container)

  return () => {
    observer.disconnect()
    timers.forEach((t) => window.clearTimeout(t))
    lines.forEach((el, i) => {
      el.textContent = originalTexts[i]
      el.classList.remove("is-typing", "is-done")
    })
  }
}
