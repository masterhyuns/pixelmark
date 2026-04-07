/**
 * E-S4 Conference Tech — 스피커 카드 모달
 *
 * [동작]
 * - .ct-speaker-card[data-speaker-id] 클릭 → 단일 모달 .ct-modal 의 내부 텍스트/이미지를 dataset에서 채워 노출
 * - 닫기: 백드롭 클릭, X 버튼, ESC 키
 * - 포커스 트랩: 모달 열렸을 때 첫 포커스 가능 요소로 이동, ESC 시 트리거로 복귀
 *
 * [cleanup]
 * - 카드/모달/document 리스너 제거, body overflow 원복
 */
export const initSpeakerModal = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const cards = root.querySelectorAll<HTMLElement>(".ct-speaker-card[data-speaker-id]")
  const modal = root.querySelector<HTMLElement>(".ct-modal")
  if (cards.length === 0 || !modal) return () => {}

  const backdrop = modal // 자체가 backdrop 역할
  const dialog = modal.querySelector<HTMLElement>(".ct-modal-dialog")
  const closeBtn = modal.querySelector<HTMLButtonElement>(".ct-modal-close")
  const nameEl = modal.querySelector<HTMLElement>(".ct-modal-name")
  const roleEl = modal.querySelector<HTMLElement>(".ct-modal-role")
  const codeEl = modal.querySelector<HTMLElement>(".ct-modal-code")
  const trackEl = modal.querySelector<HTMLElement>(".ct-modal-track")
  const topicEl = modal.querySelector<HTMLElement>(".ct-modal-topic")
  const bioEl = modal.querySelector<HTMLElement>(".ct-modal-bio")
  if (!dialog) return () => {}

  let lastTrigger: HTMLElement | null = null

  const open = (card: HTMLElement) => {
    lastTrigger = card
    if (nameEl) nameEl.textContent = card.dataset.speakerName ?? ""
    if (roleEl) roleEl.textContent = `${card.dataset.speakerRole ?? ""} · ${card.dataset.speakerCompany ?? ""}`
    if (codeEl) codeEl.textContent = card.dataset.speakerCode ?? ""
    if (topicEl) topicEl.textContent = card.dataset.speakerTopic ?? ""
    if (bioEl) bioEl.textContent = card.dataset.speakerBio ?? ""
    if (trackEl) {
      trackEl.textContent = card.dataset.speakerTrackLabel ?? ""
      trackEl.style.setProperty("--ct-track-color", card.dataset.speakerTrackColor ?? "#3b82f6")
    }
    modal.classList.add("is-open")
    document.body.style.overflow = "hidden"
    closeBtn?.focus()
  }

  const close = () => {
    modal.classList.remove("is-open")
    document.body.style.overflow = ""
    lastTrigger?.focus()
    lastTrigger = null
  }

  const onCardClick = (e: Event) => {
    const card = (e.currentTarget as HTMLElement)
    open(card)
  }
  const onCardKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      open(e.currentTarget as HTMLElement)
    }
  }
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === backdrop) close()
  }
  const onCloseClick = () => close()
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close()
  }

  cards.forEach((card) => {
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "button")
    card.addEventListener("click", onCardClick)
    card.addEventListener("keydown", onCardKey)
  })
  backdrop.addEventListener("click", onBackdropClick)
  closeBtn?.addEventListener("click", onCloseClick)
  document.addEventListener("keydown", onKeyDown)

  return () => {
    cards.forEach((card) => {
      card.removeEventListener("click", onCardClick)
      card.removeEventListener("keydown", onCardKey)
      card.removeAttribute("tabindex")
      card.removeAttribute("role")
    })
    backdrop.removeEventListener("click", onBackdropClick)
    closeBtn?.removeEventListener("click", onCloseClick)
    document.removeEventListener("keydown", onKeyDown)
    modal.classList.remove("is-open")
    document.body.style.overflow = ""
  }
}
