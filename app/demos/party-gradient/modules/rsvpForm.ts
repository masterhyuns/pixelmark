/**
 * E-S5 Party Gradient — RSVP Mock 폼 + 성공 모달
 *
 * [동작]
 * - .pg-rsvp-form submit → 서버 요청 없이 값 읽어 .pg-rsvp-modal 활성
 * - 모달: 백드롭 클릭 / ESC / 닫기 버튼으로 닫힘
 *
 * [cleanup]
 * - form submit 리스너 제거, 모달 닫기
 */
export const initRsvpForm = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const form = root.querySelector<HTMLFormElement>(".pg-rsvp-form")
  const modal = root.querySelector<HTMLElement>(".pg-rsvp-modal")
  if (!form || !modal) return () => {}

  const closeBtn = modal.querySelector<HTMLButtonElement>(".pg-rsvp-modal-close")
  const nameSpan = modal.querySelector<HTMLElement>(".pg-rsvp-modal-name")
  const countSpan = modal.querySelector<HTMLElement>(".pg-rsvp-modal-count")

  const open = (name: string, count: string) => {
    if (nameSpan) nameSpan.textContent = name
    if (countSpan) countSpan.textContent = count
    modal.classList.add("is-open")
  }
  const close = () => {
    modal.classList.remove("is-open")
  }

  const onSubmit = (e: Event) => {
    e.preventDefault()
    const fd = new FormData(form)
    const name = String(fd.get("name") ?? "").trim() || "Guest"
    const count = String(fd.get("count") ?? "1")
    open(name, count)
    form.reset()
  }

  const onBackdrop = (e: MouseEvent) => {
    if (e.target === modal) close()
  }
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
