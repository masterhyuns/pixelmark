/**
 * 타이프라이터 — 이름 한 글자씩 타이핑
 *
 * [동작]
 * 1. [data-typewriter] 요소의 원본 텍스트를 dataset에 보관
 * 2. textContent를 비우고 setInterval로 한 글자씩 추가
 * 3. 완료 후 커서(.pp-typewriter-cursor)에 is-blinking 추가
 *
 * [접근성]
 * - reduced motion: 즉시 완성된 텍스트로 노출
 */
export const initTypewriter = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const target = root.querySelector<HTMLElement>("[data-typewriter]")
  if (!target) return () => {}

  const cursor = target.querySelector<HTMLElement>(".pp-typewriter-cursor")
  const textNode = target.querySelector<HTMLElement>(".pp-typewriter-text")
  if (!cursor || !textNode) return () => {}

  const fullText = textNode.dataset.text ?? textNode.textContent ?? ""
  textNode.textContent = ""

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (reduced) {
    textNode.textContent = fullText
    cursor.classList.add("is-blinking")
    return () => {}
  }

  // 2초에 걸쳐 전체 텍스트 타이핑
  const totalDuration = 2000
  const charCount = [...fullText].length
  const interval = Math.max(60, totalDuration / charCount)

  let index = 0
  const chars = [...fullText]
  const timerId = window.setInterval(() => {
    if (index >= chars.length) {
      window.clearInterval(timerId)
      cursor.classList.add("is-blinking")
      return
    }
    textNode.textContent = chars.slice(0, index + 1).join("")
    index++
  }, interval)

  return () => {
    window.clearInterval(timerId)
    textNode.textContent = fullText
    cursor.classList.remove("is-blinking")
  }
}
