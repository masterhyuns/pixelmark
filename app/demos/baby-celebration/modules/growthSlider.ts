/**
 * E-S2 Baby Celebration — 성장 타임라인 가로 드래그 슬라이더 ⭐ 시그니처
 *
 * [동작]
 * - 터치(touch*) + 마우스/포인터(pointer*) 모두 지원 → 모바일 스와이프와 PC 드래그 동시 대응
 * - 드래그 중 .is-dragging 클래스 → CSS에서 cursor:grabbing + transition 제거
 * - 드래그 종료 시 가장 가까운 카드 인덱스로 스냅
 * - 인디케이터 dot, prev/next 버튼 동기화 (PC만 노출)
 * - 휠 deltaX(또는 shift+deltaY)로 가로 휠 스크롤 지원
 *
 * [구조 가정]
 * .bc-growth-slider[data-bc-growth-slider]
 *   .bc-growth-viewport
 *     .bc-growth-track
 *       .bc-growth-card (n)
 *   .bc-growth-dots
 *     .bc-growth-dot (n)
 *   .bc-growth-prev / .bc-growth-next
 *
 * [cleanup]
 * - 모든 리스너 제거, transform/class 원복
 */
export const initGrowthSlider = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const slider = root.querySelector<HTMLElement>("[data-bc-growth-slider]")
  if (!slider) return () => {}

  const viewport = slider.querySelector<HTMLElement>(".bc-growth-viewport")
  const track = slider.querySelector<HTMLElement>(".bc-growth-track")
  const cards = slider.querySelectorAll<HTMLElement>(".bc-growth-card")
  const dots = slider.querySelectorAll<HTMLElement>(".bc-growth-dot")
  const prevBtn = slider.querySelector<HTMLButtonElement>(".bc-growth-prev")
  const nextBtn = slider.querySelector<HTMLButtonElement>(".bc-growth-next")
  if (!viewport || !track || cards.length === 0) return () => {}

  let currentIndex = 0
  let cardStep = 0 // 카드 1장당 이동 거리(px)
  let dragStartX = 0
  let dragCurrentX = 0
  let dragOffset = 0 // 현재 인덱스 기준 임시 offset
  let dragging = false
  let pointerId: number | null = null

  /** 카드 1장 + gap을 한 단위로 측정 (첫 번째와 두 번째 카드의 left 차이) */
  const measure = () => {
    if (cards.length >= 2) {
      cardStep = cards[1].offsetLeft - cards[0].offsetLeft
    } else {
      cardStep = cards[0].offsetWidth
    }
  }

  const applyTransform = (px: number, withTransition: boolean) => {
    track.style.transition = withTransition
      ? "transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)"
      : "none"
    track.style.transform = `translate3d(${px}px, 0, 0)`
  }

  const goTo = (index: number) => {
    currentIndex = Math.max(0, Math.min(cards.length - 1, index))
    applyTransform(-currentIndex * cardStep, true)
    updateUi()
  }

  const updateUi = () => {
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex)
      dot.setAttribute("aria-current", i === currentIndex ? "true" : "false")
    })
    if (prevBtn) prevBtn.disabled = currentIndex === 0
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1
  }

  // ---------- 드래그 ----------
  const onPointerDown = (e: PointerEvent) => {
    // 인덱스 버튼 클릭은 드래그로 처리하지 않음
    if ((e.target as HTMLElement).closest(".bc-growth-dot, .bc-growth-prev, .bc-growth-next")) return
    dragging = true
    dragStartX = e.clientX
    dragCurrentX = e.clientX
    pointerId = e.pointerId
    slider.classList.add("is-dragging")
    track.style.transition = "none"
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return
    dragCurrentX = e.clientX
    dragOffset = dragCurrentX - dragStartX
    applyTransform(-currentIndex * cardStep + dragOffset, false)
  }

  const endDrag = (e?: PointerEvent) => {
    if (!dragging) return
    dragging = false
    slider.classList.remove("is-dragging")
    if (pointerId !== null && e) {
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture(pointerId)
      } catch {
        /* noop */
      }
    }
    pointerId = null

    // 스냅: 25% 이상 끌었으면 다음/이전, 아니면 원위치
    const threshold = cardStep * 0.25
    if (dragOffset > threshold && currentIndex > 0) {
      goTo(currentIndex - 1)
    } else if (dragOffset < -threshold && currentIndex < cards.length - 1) {
      goTo(currentIndex + 1)
    } else {
      goTo(currentIndex)
    }
    dragOffset = 0
  }

  // ---------- 휠 ----------
  const onWheel = (e: WheelEvent) => {
    // 가로 휠(트랙패드) 또는 shift+세로 휠
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0
    if (dx === 0) return
    e.preventDefault()
    if (dx > 12 && currentIndex < cards.length - 1) goTo(currentIndex + 1)
    else if (dx < -12 && currentIndex > 0) goTo(currentIndex - 1)
  }

  // ---------- 버튼 ----------
  const onPrev = () => goTo(currentIndex - 1)
  const onNext = () => goTo(currentIndex + 1)
  const onDotClick = (e: Event) => {
    const dot = e.currentTarget as HTMLElement
    const idx = Number(dot.dataset.index)
    if (!Number.isNaN(idx)) goTo(idx)
  }

  // ---------- 키보드 ----------
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(currentIndex - 1)
    if (e.key === "ArrowRight") goTo(currentIndex + 1)
  }

  // ---------- 초기화 ----------
  measure()
  goTo(0)

  viewport.addEventListener("pointerdown", onPointerDown)
  viewport.addEventListener("pointermove", onPointerMove)
  viewport.addEventListener("pointerup", endDrag as EventListener)
  viewport.addEventListener("pointercancel", endDrag as EventListener)
  viewport.addEventListener("wheel", onWheel, { passive: false })
  prevBtn?.addEventListener("click", onPrev)
  nextBtn?.addEventListener("click", onNext)
  dots.forEach((dot) => dot.addEventListener("click", onDotClick))
  slider.setAttribute("tabindex", "0")
  slider.addEventListener("keydown", onKeyDown)

  // 리사이즈 시 스텝 재측정
  const onResize = () => {
    measure()
    applyTransform(-currentIndex * cardStep, false)
  }
  window.addEventListener("resize", onResize)

  return () => {
    viewport.removeEventListener("pointerdown", onPointerDown)
    viewport.removeEventListener("pointermove", onPointerMove)
    viewport.removeEventListener("pointerup", endDrag as EventListener)
    viewport.removeEventListener("pointercancel", endDrag as EventListener)
    viewport.removeEventListener("wheel", onWheel)
    prevBtn?.removeEventListener("click", onPrev)
    nextBtn?.removeEventListener("click", onNext)
    dots.forEach((dot) => dot.removeEventListener("click", onDotClick))
    slider.removeEventListener("keydown", onKeyDown)
    window.removeEventListener("resize", onResize)
    slider.classList.remove("is-dragging")
    track.style.transition = ""
    track.style.transform = ""
  }
}
