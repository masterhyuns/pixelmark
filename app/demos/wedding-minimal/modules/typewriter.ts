/**
 * E-S1 Wedding Minimal — 신랑신부 이름 타이프라이터
 *
 * [동작]
 * - [data-wm-typewriter] 안의 .wm-typewriter-text(data-text)를 한 글자씩 타이핑
 * - 완료 후 .wm-typewriter-cursor에 is-blinking 클래스 추가 → CSS keyframes로 깜빡임
 *
 * [접근성]
 * - prefers-reduced-motion: 즉시 완성된 텍스트 노출
 *
 * [cleanup]
 * - 라우트 이탈 시 setInterval 정리, 텍스트 원복
 */
export const initTypewriter = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const targets = root.querySelectorAll<HTMLElement>("[data-wm-typewriter]")
  if (targets.length === 0) return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const timers: number[] = []

  targets.forEach((target, idx) => {
    const textEl = target.querySelector<HTMLElement>(".wm-typewriter-text")
    const cursor = target.querySelector<HTMLElement>(".wm-typewriter-cursor")
    if (!textEl) return
    const fullText = textEl.dataset.text ?? textEl.textContent ?? ""
    textEl.textContent = ""

    if (reduced) {
      textEl.textContent = fullText
      cursor?.classList.add("is-blinking")
      return
    }

    // 타깃별 시작 딜레이(여러 단어 순차 타이핑)
    const startDelay = idx * 600
    const totalDuration = 1500
    const chars = [...fullText]
    const interval = Math.max(70, totalDuration / Math.max(1, chars.length))

    let index = 0
    const startTimer = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        if (index >= chars.length) {
          window.clearInterval(timer)
          cursor?.classList.add("is-blinking")
          return
        }
        textEl.textContent = chars.slice(0, index + 1).join("")
        index++
      }, interval)
      timers.push(timer)
    }, startDelay)
    timers.push(startTimer)
  })

  return () => {
    timers.forEach((id) => {
      window.clearInterval(id)
      window.clearTimeout(id)
    })
    targets.forEach((target) => {
      const textEl = target.querySelector<HTMLElement>(".wm-typewriter-text")
      if (textEl) textEl.textContent = textEl.dataset.text ?? ""
    })
  }
}
