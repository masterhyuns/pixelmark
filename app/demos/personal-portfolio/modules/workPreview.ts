/**
 * 작업물 카드 hover 시 커서 옆 썸네일 미리보기 (Nice-to-have)
 *
 * [동작]
 * - 고정된 .pp-work-preview 요소가 마우스 위치를 따라다님
 * - 작업물 카드 hover 시 is-visible 추가 + 해당 카드의 이미지로 src 교체
 * - 카드를 벗어나면 숨김
 *
 * [Nice-to-have]
 * - 기획서: Phase 2 항목. 필수 아니지만 디테일로 추가
 */
export const initWorkPreview = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (!window.matchMedia("(hover: hover)").matches) return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const preview = root.querySelector<HTMLElement>(".pp-work-preview")
  const previewImg = preview?.querySelector<HTMLImageElement>("img")
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".pp-work-card"))
  if (!preview || !previewImg || cards.length === 0) return () => {}

  let rafId = 0
  let mouseX = 0
  let mouseY = 0
  let ticking = false
  let activeCard: HTMLElement | null = null

  const updatePos = () => {
    // 커서 위치 + 약간 우하단 오프셋
    preview.style.transform = `translate(${mouseX + 24}px, ${mouseY + 24}px) scale(${activeCard ? 1 : 0.9})`
    ticking = false
  }

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!ticking) {
      rafId = requestAnimationFrame(updatePos)
      ticking = true
    }
  }
  document.addEventListener("mousemove", onMove)

  const onEnter = (card: HTMLElement) => () => {
    activeCard = card
    const img = card.dataset.workImage
    if (img && previewImg) previewImg.src = img
    preview.classList.add("is-visible")
  }
  const onLeave = () => {
    activeCard = null
    preview.classList.remove("is-visible")
  }

  const handlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = []
  cards.forEach((card) => {
    const enter = onEnter(card)
    card.addEventListener("mouseenter", enter)
    card.addEventListener("mouseleave", onLeave)
    handlers.push({ el: card, enter, leave: onLeave })
  })

  return () => {
    cancelAnimationFrame(rafId)
    document.removeEventListener("mousemove", onMove)
    handlers.forEach(({ el, enter, leave }) => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    })
    preview.classList.remove("is-visible")
  }
}
