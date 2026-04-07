/**
 * E-S15 Wedding Pixel — RSVP Mock + GAME CLEAR 모달
 */
export const initRsvpForm = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const form = root.querySelector<HTMLFormElement>(".wpix-rsvp-form")
  const modal = root.querySelector<HTMLElement>(".wpix-rsvp-modal")
  if (!form || !modal) return () => {}
  const closeBtn = modal.querySelector<HTMLButtonElement>(".wpix-rsvp-modal-close")
  const nameSpan = modal.querySelector<HTMLElement>(".wpix-rsvp-modal-name")

  const open = (name: string) => {
    if (nameSpan) nameSpan.textContent = name
    modal.classList.add("is-open")
  }
  const close = () => modal.classList.remove("is-open")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    const fd = new FormData(form)
    const name = String(fd.get("name") ?? "").trim() || "Player"
    open(name.toUpperCase())
    form.reset()
  }
  const onBackdrop = (e: MouseEvent) => { if (e.target === modal) close() }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close()
  }

  form.addEventListener("submit", onSubmit)
  modal.addEventListener("click", onBackdrop)
  closeBtn?.addEventListener("click", close)
  document.addEventListener("keydown", onKey)

  return () => {
    form.removeEventListener("submit", onSubmit)
    modal.removeEventListener("click", onBackdrop)
    closeBtn?.removeEventListener("click", close)
    document.removeEventListener("keydown", onKey)
    modal.classList.remove("is-open")
  }
}
