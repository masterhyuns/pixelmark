/**
 * E-S16 Wedding Newsprint — 헤드라인 typing 효과
 *
 * [data-wnews-typing] 요소의 텍스트를 한 글자씩 타이핑.
 * 페이지 로드 후 짧은 딜레이 뒤 시작.
 */
export const initHeadlineTyping = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const target = root.querySelector<HTMLElement>("[data-wnews-typing]")
  if (!target) return () => {}

  const original = target.textContent ?? ""
  target.textContent = ""

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    target.textContent = original
    return () => {}
  }

  let i = 0
  const chars = [...original]
  const timers: number[] = []

  const startTimer = window.setTimeout(() => {
    const tick = () => {
      if (i >= chars.length) return
      target.textContent = chars.slice(0, i + 1).join("")
      i++
      const t = window.setTimeout(tick, 45)
      timers.push(t)
    }
    tick()
  }, 400)
  timers.push(startTimer)

  return () => {
    timers.forEach((t) => { window.clearTimeout(t) })
    target.textContent = original
  }
}
