/**
 * E-S8 Wedding Vivid — RSVP Mock 폼 + 모달
 */
export const initRsvpForm = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const form = root.querySelector<HTMLFormElement>(".wv-rsvp-form")
  const modal = root.querySelector<HTMLElement>(".wv-rsvp-modal")
  if (!form || !modal) return () => {}
  const closeBtn = modal.querySelector<HTMLButtonElement>(".wv-rsvp-modal-close")
  const nameSpan = modal.querySelector<HTMLElement>(".wv-rsvp-modal-name")

  const open = (name: string) => {
    if (nameSpan) nameSpan.textContent = name
    modal.classList.add("is-open")
  }
  const close = () => modal.classList.remove("is-open")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    const fd = new FormData(form)
    const name = String(fd.get("name") ?? "").trim() || "Guest"
    open(name)
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
