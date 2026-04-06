/**
 * 링크 hover mask 슬라이드 — 텍스트가 위로 슬라이드 되며 새 텍스트 등장
 *
 * [구조]
 * - [data-link-mask] 요소의 원본 텍스트를 두 번 복제
 * - 위쪽 span: 기본 표시
 * - 아래쪽 span: translateY(100%)로 mask 밖에 숨음
 * - hover 시: 위 → translateY(-100%), 아래 → translateY(0)
 * - CSS overflow: hidden 컨테이너로 mask 효과
 *
 * [HTML 변환]
 * Before: <a data-link-mask>Hello</a>
 * After:  <a data-link-mask class="pp-link-mask-wrap">
 *           <span class="pp-link-mask-top">Hello</span>
 *           <span class="pp-link-mask-bottom">Hello</span>
 *         </a>
 *
 * [cleanup]
 * - 원본 textContent 복원
 */
export const initLinkMask = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-link-mask]"))
  if (targets.length === 0) return () => {}

  const originals: Array<{ el: HTMLElement; html: string }> = []

  const duration = "0.4s"
  const ease = "cubic-bezier(0.6, 0, 0.2, 1)"

  targets.forEach((el) => {
    originals.push({ el, html: el.innerHTML })
    const text = el.textContent ?? ""

    // 컨테이너 스타일
    el.innerHTML = ""
    el.style.display = "inline-block"
    el.style.overflow = "hidden"
    el.style.position = "relative"
    el.style.verticalAlign = "bottom"

    const top = document.createElement("span")
    top.className = "pp-link-mask-top"
    top.textContent = text
    top.style.display = "inline-block"
    top.style.transform = "translateY(0)"
    top.style.transition = `transform ${duration} ${ease}`

    const bottom = document.createElement("span")
    bottom.className = "pp-link-mask-bottom"
    bottom.textContent = text
    bottom.style.display = "inline-block"
    bottom.style.position = "absolute"
    bottom.style.top = "0"
    bottom.style.left = "0"
    bottom.style.transform = "translateY(100%)"
    bottom.style.transition = `transform ${duration} ${ease}`

    el.appendChild(top)
    el.appendChild(bottom)

    const onEnter = () => {
      top.style.transform = "translateY(-100%)"
      bottom.style.transform = "translateY(0)"
    }
    const onLeave = () => {
      top.style.transform = "translateY(0)"
      bottom.style.transform = "translateY(100%)"
    }

    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    // 이벤트 핸들러 참조를 dataset 대신 weak ref처럼 보관 (cleanup에서 재사용)
    ;(el as unknown as { __linkMaskEnter: () => void }).__linkMaskEnter = onEnter
    ;(el as unknown as { __linkMaskLeave: () => void }).__linkMaskLeave = onLeave
  })

  return () => {
    targets.forEach((el) => {
      const enter = (el as unknown as { __linkMaskEnter?: () => void }).__linkMaskEnter
      const leave = (el as unknown as { __linkMaskLeave?: () => void }).__linkMaskLeave
      if (enter) el.removeEventListener("mouseenter", enter)
      if (leave) el.removeEventListener("mouseleave", leave)
      el.style.display = ""
      el.style.overflow = ""
      el.style.position = ""
      el.style.verticalAlign = ""
    })
    // 원본 복원
    originals.forEach(({ el, html }) => {
      el.innerHTML = html
    })
  }
}
