/**
 * E-S10 Open House — RSVP Mock 폼 + 시간대 토글 + 모달
 */
export const initRsvpForm = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const form = root.querySelector<HTMLFormElement>(".oh-rsvp-form")
  const modal = root.querySelector<HTMLElement>(".oh-rsvp-modal")
  if (!form || !modal) return () => {}

  const slots = form.querySelectorAll<HTMLButtonElement>("[data-oh-slot]")
  const slotInput = form.querySelector<HTMLInputElement>('input[name="slot"]')
  const closeBtn = modal.querySelector<HTMLButtonElement>(".oh-rsvp-modal-close")
  const nameSpan = modal.querySelector<HTMLElement>(".oh-rsvp-modal-name")
  const slotSpan = modal.querySelector<HTMLElement>(".oh-rsvp-modal-slot")

  const setActive = (id: string) => {
    if (slotInput) slotInput.value = id
    slots.forEach((b) => {
      const isOn = b.dataset.ohSlot === id
      b.classList.toggle("is-active", isOn)
      b.setAttribute("aria-pressed", isOn ? "true" : "false")
    })
  }
  // 초기값: 첫 슬롯
  if (slots.length > 0 && slotInput && !slotInput.value) {
    setActive(slots[0].dataset.ohSlot ?? "")
  }

  const slotHandlers: Array<[HTMLButtonElement, (e: Event) => void]> = []
  slots.forEach((btn) => {
    const fn = (e: Event) => {
      e.preventDefault()
      setActive(btn.dataset.ohSlot ?? "")
    }
    btn.addEventListener("click", fn)
    slotHandlers.push([btn, fn])
  })

  const open = (name: string, slot: string) => {
    if (nameSpan) nameSpan.textContent = name
    if (slotSpan) slotSpan.textContent = slot
    modal.classList.add("is-open")
  }
  const close = () => modal.classList.remove("is-open")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    const fd = new FormData(form)
    const name = String(fd.get("name") ?? "").trim() || "Visitor"
    const slot = String(fd.get("slot") ?? "")
    const slotLabel = root.querySelector<HTMLButtonElement>(`[data-oh-slot="${slot}"]`)?.textContent ?? slot
    open(name, slotLabel.trim())
    form.reset()
    if (slots.length > 0) setActive(slots[0].dataset.ohSlot ?? "")
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
    slotHandlers.forEach(([b, fn]) => b.removeEventListener("click", fn))
    form.removeEventListener("submit", onSubmit)
    modal.removeEventListener("click", onBackdrop)
    closeBtn?.removeEventListener("click", close)
    document.removeEventListener("keydown", onKey)
    modal.classList.remove("is-open")
  }
}
