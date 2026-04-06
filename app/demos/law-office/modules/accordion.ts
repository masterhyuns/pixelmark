/**
 * 아코디언 (Services 페이지 전문분야 상세)
 *
 * [동작]
 * - .lo-accordion-trigger 클릭 시 부모 .lo-accordion-item에 is-open 토글
 * - .lo-accordion-content의 max-height를 scrollHeight로 설정 → 부드러운 expand
 * - 닫을 때는 max-height를 0으로 설정
 *
 * [왜 max-height: auto가 안 되는가]
 * - CSS는 'auto' 값을 transition할 수 없음 (수치 보간 불가)
 * - JS에서 실제 콘텐츠 높이(scrollHeight)를 픽셀 값으로 할당해야 함
 * - resize 시 다시 측정 필요 (모바일 가로 → 세로 등)
 *
 * [접근성]
 * - aria-expanded 속성 토글
 * - Enter/Space 키로도 동작 (button 요소면 기본 제공)
 */
export const initAccordion = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const items = Array.from(root.querySelectorAll<HTMLElement>(".lo-accordion-item"))
  if (items.length === 0) return () => {}

  interface HandlerSet {
    trigger: HTMLButtonElement
    handler: () => void
  }
  const handlers: HandlerSet[] = []

  const toggleItem = (item: HTMLElement) => {
    const content = item.querySelector<HTMLElement>(".lo-accordion-content")
    const trigger = item.querySelector<HTMLButtonElement>(".lo-accordion-trigger")
    if (!content || !trigger) return

    const isOpen = item.classList.contains("is-open")

    if (isOpen) {
      // 닫기
      item.classList.remove("is-open")
      content.style.maxHeight = "0px"
      trigger.setAttribute("aria-expanded", "false")
    } else {
      // 열기: 다른 아이템은 닫지 않음 (multi-open 허용)
      item.classList.add("is-open")
      content.style.maxHeight = `${content.scrollHeight}px`
      trigger.setAttribute("aria-expanded", "true")
    }
  }

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>(".lo-accordion-trigger")
    if (!trigger) return

    const handler = () => toggleItem(item)
    trigger.addEventListener("click", handler)
    trigger.setAttribute("aria-expanded", "false")
    handlers.push({ trigger, handler })

    // 초기 max-height 0 보장
    const content = item.querySelector<HTMLElement>(".lo-accordion-content")
    if (content) content.style.maxHeight = "0px"
  })

  // resize 시 열린 아코디언 높이 재계산
  const onResize = () => {
    items.forEach((item) => {
      if (!item.classList.contains("is-open")) return
      const content = item.querySelector<HTMLElement>(".lo-accordion-content")
      if (content) content.style.maxHeight = `${content.scrollHeight}px`
    })
  }
  window.addEventListener("resize", onResize, { passive: true })

  return () => {
    handlers.forEach(({ trigger, handler }) =>
      trigger.removeEventListener("click", handler)
    )
    window.removeEventListener("resize", onResize)
    items.forEach((item) => {
      item.classList.remove("is-open")
      const content = item.querySelector<HTMLElement>(".lo-accordion-content")
      if (content) content.style.maxHeight = ""
    })
  }
}
