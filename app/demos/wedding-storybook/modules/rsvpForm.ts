export const initRsvpForm = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const form = root.querySelector<HTMLFormElement>(".wbook-rsvp-form")
  const modal = root.querySelector<HTMLElement>(".wbook-rsvp-modal")
  if (!form || !modal) return () => {}
  const closeBtn = modal.querySelector<HTMLButtonElement>(".wbook-rsvp-modal-close")
  const nameSpan = modal.querySelector<HTMLElement>(".wbook-rsvp-modal-name")

  const open = (name: string) => {
    if (nameSpan) nameSpan.textContent = name
    modal.classList.add("is-open")
  }
  const close = () => modal.classList.remove("is-open")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    const fd = new FormData(form)
    const name = String(fd.get("name") ?? "").trim() || "Friend"
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
