/**
 * F-S1 라이트박스 — 직접 구현 (외부 라이브러리 없이).
 * 갤러리 이미지 클릭 → 풀스크린 모달 + 좌우 화살표 + ESC 닫기 + 키보드 화살표.
 */
export const initLightbox = (root: HTMLElement): (() => void) => {
  if (typeof window === "undefined") return () => {}

  const items = Array.from(root.querySelectorAll<HTMLElement>(".bp-gallery-item"))
  const overlay = root.querySelector<HTMLElement>(".bp-lightbox")
  if (!items.length || !overlay) return () => {}

  const img = overlay.querySelector<HTMLImageElement>(".bp-lightbox-image")
  const counter = overlay.querySelector<HTMLElement>(".bp-lightbox-counter")
  const prevBtn = overlay.querySelector<HTMLButtonElement>(".bp-lightbox-btn--prev")
  const nextBtn = overlay.querySelector<HTMLButtonElement>(".bp-lightbox-btn--next")
  const closeBtn = overlay.querySelector<HTMLButtonElement>(".bp-lightbox-close")
  if (!img || !counter || !prevBtn || !nextBtn || !closeBtn) return () => {}

  let currentIdx = 0
  const sources = items.map((it) => {
    const src = it.querySelector("img")?.src ?? ""
    const alt = it.querySelector("img")?.alt ?? ""
    return { src, alt }
  })

  const show = (idx: number) => {
    currentIdx = (idx + sources.length) % sources.length
    const s = sources[currentIdx]
    img.src = s.src
    img.alt = s.alt
    counter.textContent = `${String(currentIdx + 1).padStart(2, "0")} / ${String(sources.length).padStart(2, "0")}`
  }

  const open = (idx: number) => {
    show(idx)
    overlay.classList.add("is-open")
    document.body.style.overflow = "hidden"
  }
  const close = () => {
    overlay.classList.remove("is-open")
    document.body.style.overflow = ""
  }
  const next = () => show(currentIdx + 1)
  const prev = () => show(currentIdx - 1)

  const onItemClick = (e: Event) => {
    const idx = items.indexOf(e.currentTarget as HTMLElement)
    if (idx >= 0) open(idx)
  }
  const onKey = (e: KeyboardEvent) => {
    if (!overlay.classList.contains("is-open")) return
    if (e.key === "Escape") close()
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
  }
  const onOverlayClick = (e: MouseEvent) => {
    if (e.target === overlay) close()
  }

  items.forEach((el) => el.addEventListener("click", onItemClick))
  prevBtn.addEventListener("click", prev)
  nextBtn.addEventListener("click", next)
  closeBtn.addEventListener("click", close)
  overlay.addEventListener("click", onOverlayClick)
  window.addEventListener("keydown", onKey)

  return () => {
    items.forEach((el) => el.removeEventListener("click", onItemClick))
    prevBtn.removeEventListener("click", prev)
    nextBtn.removeEventListener("click", next)
    closeBtn.removeEventListener("click", close)
    overlay.removeEventListener("click", onOverlayClick)
    window.removeEventListener("keydown", onKey)
    document.body.style.overflow = ""
  }
}
