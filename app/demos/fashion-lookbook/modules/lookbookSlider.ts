/**
 * B-S1 Fashion Lookbook — 풀스크린 룩북 슬라이더
 *
 * Pointer Events 기반 가로 드래그/스와이프 + 키보드 + dot 인디케이터 + prev/next.
 * baby-celebration의 growthSlider와 동일한 패턴.
 */
export const initLookbookSlider = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const slider = root.querySelector<HTMLElement>("[data-flb-lookbook]")
  if (!slider) return () => {}

  const viewport = slider.querySelector<HTMLElement>(".flb-lookbook-viewport")
  const track = slider.querySelector<HTMLElement>(".flb-lookbook-track")
  const slides = slider.querySelectorAll<HTMLElement>(".flb-lookbook-slide")
  const dots = slider.querySelectorAll<HTMLElement>(".flb-lookbook-dot")
  const prevBtn = slider.querySelector<HTMLButtonElement>(".flb-lookbook-prev")
  const nextBtn = slider.querySelector<HTMLButtonElement>(".flb-lookbook-next")
  const counter = slider.querySelector<HTMLElement>("[data-flb-counter]")
  if (!viewport || !track || slides.length === 0) return () => {}

  let currentIndex = 0
  let cardStep = 0
  let dragStartX = 0
  let dragOffset = 0
  let dragging = false

  const measure = () => {
    cardStep = slides.length >= 2 ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth
  }
  const apply = (px: number, anim: boolean) => {
    track.style.transition = anim ? "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none"
    track.style.transform = `translate3d(${px}px, 0, 0)`
  }
  const goTo = (i: number) => {
    currentIndex = Math.max(0, Math.min(slides.length - 1, i))
    apply(-currentIndex * cardStep, true)
    updateUi()
  }
  const updateUi = () => {
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === currentIndex)
      d.setAttribute("aria-current", i === currentIndex ? "true" : "false")
    })
    if (prevBtn) prevBtn.disabled = currentIndex === 0
    if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1
    if (counter) counter.textContent = String(currentIndex + 1).padStart(2, "0")
  }

  const onPointerDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest(".flb-lookbook-dot, .flb-lookbook-prev, .flb-lookbook-next")) return
    dragging = true
    dragStartX = e.clientX
    slider.classList.add("is-dragging")
    track.style.transition = "none"
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return
    dragOffset = e.clientX - dragStartX
    apply(-currentIndex * cardStep + dragOffset, false)
  }
  const endDrag = () => {
    if (!dragging) return
    dragging = false
    slider.classList.remove("is-dragging")
    const threshold = cardStep * 0.22
    if (dragOffset > threshold && currentIndex > 0) goTo(currentIndex - 1)
    else if (dragOffset < -threshold && currentIndex < slides.length - 1) goTo(currentIndex + 1)
    else goTo(currentIndex)
    dragOffset = 0
  }

  const onPrev = () => goTo(currentIndex - 1)
  const onNext = () => goTo(currentIndex + 1)
  const onDot = (e: Event) => {
    const idx = Number((e.currentTarget as HTMLElement).dataset.index)
    if (!Number.isNaN(idx)) goTo(idx)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(currentIndex - 1)
    if (e.key === "ArrowRight") goTo(currentIndex + 1)
  }

  measure()
  goTo(0)

  viewport.addEventListener("pointerdown", onPointerDown)
  viewport.addEventListener("pointermove", onPointerMove)
  viewport.addEventListener("pointerup", endDrag)
  viewport.addEventListener("pointercancel", endDrag)
  prevBtn?.addEventListener("click", onPrev)
  nextBtn?.addEventListener("click", onNext)
  dots.forEach((d) => d.addEventListener("click", onDot))
  slider.setAttribute("tabindex", "0")
  slider.addEventListener("keydown", onKey)

  const onResize = () => {
    measure()
    apply(-currentIndex * cardStep, false)
  }
  window.addEventListener("resize", onResize)

  return () => {
    viewport.removeEventListener("pointerdown", onPointerDown)
    viewport.removeEventListener("pointermove", onPointerMove)
    viewport.removeEventListener("pointerup", endDrag)
    viewport.removeEventListener("pointercancel", endDrag)
    prevBtn?.removeEventListener("click", onPrev)
    nextBtn?.removeEventListener("click", onNext)
    dots.forEach((d) => d.removeEventListener("click", onDot))
    slider.removeEventListener("keydown", onKey)
    window.removeEventListener("resize", onResize)
    slider.classList.remove("is-dragging")
    track.style.transform = ""
    track.style.transition = ""
  }
}
