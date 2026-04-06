/**
 * 커스텀 커서 — 작은 원형 추적 + hover 시 확대
 *
 * [동작]
 * 1. document.body에 .pp-custom-cursor 요소 추가
 * 2. mousemove로 위치 업데이트 (rAF 스로틀링)
 * 3. hover 가능 요소(a, button, [data-hoverable]) enter/leave로 is-hovering 토글
 * 4. :root에 pp-cursor-on 클래스 추가 → SCSS가 기본 커서 숨김
 *
 * [@media (hover: hover)]
 * - 터치 디바이스는 초기화 스킵
 *
 * [왜 body에 직접 추가하는가]
 * - 커서가 fixed라 어느 조상에 있든 상관없음
 * - root 내부에 넣으면 mix-blend-mode가 제한됨 (조상에 isolation 이슈)
 * - body가 가장 안전
 */
export const initCustomCursor = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (!window.matchMedia("(hover: hover)").matches) return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  // 커서 DOM 생성
  const cursor = document.createElement("div")
  cursor.className = "pp-custom-cursor"
  document.body.appendChild(cursor)
  document.documentElement.classList.add("pp-cursor-on")

  let mouseX = 0
  let mouseY = 0
  let rafId = 0
  let ticking = false

  const update = () => {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    ticking = false
  }

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!ticking) {
      rafId = requestAnimationFrame(update)
      ticking = true
    }
  }

  // hover 가능 요소: 링크, 버튼, data-hoverable 속성
  const hoverables = Array.from(
    root.querySelectorAll<HTMLElement>("a, button, [data-hoverable]")
  )
  const onEnter = () => cursor.classList.add("is-hovering")
  const onLeave = () => cursor.classList.remove("is-hovering")

  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
  })

  document.addEventListener("mousemove", onMove)

  // 화면 이탈 시 커서 숨김
  const onDocLeave = () => (cursor.style.opacity = "0")
  const onDocEnter = () => (cursor.style.opacity = "1")
  document.addEventListener("mouseleave", onDocLeave)
  document.addEventListener("mouseenter", onDocEnter)

  // cleanup
  return () => {
    cancelAnimationFrame(rafId)
    document.removeEventListener("mousemove", onMove)
    document.removeEventListener("mouseleave", onDocLeave)
    document.removeEventListener("mouseenter", onDocEnter)
    hoverables.forEach((el) => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
    })
    cursor.remove()
    document.documentElement.classList.remove("pp-cursor-on")
  }
}
