/**
 * 작업물 모달 — 직접 구현
 *
 * [동작]
 * - .pp-work-card[data-work-id] 클릭 시 해당 id의 데이터를 모달에 주입 후 열기
 * - 배경 / 닫기 버튼 / Esc 키로 닫기
 * - 포커스 트랩: 모달 내 첫 포커스 가능 요소에 포커스, Tab 순환
 *
 * [데이터 소스]
 * - 마크업에 모달 템플릿과 데이터가 모두 있다고 가정 (HTML 내장)
 * - JS는 카드의 data-work-id를 읽어 해당 ID의 모달 콘텐츠 DOM을 활성화
 * - 가장 간단한 접근: 모든 작업물에 대해 모달 DOM이 숨겨져 있고, 클릭 시 해당 모달만 활성
 *   → 여기서는 단일 모달 + 카드 클릭 시 내용 갈아끼우는 방식
 */
export const initWorkModal = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const backdrop = root.querySelector<HTMLElement>(".pp-work-modal-backdrop")
  const modal = backdrop?.querySelector<HTMLElement>(".pp-work-modal")
  if (!backdrop || !modal) return () => {}

  const cards = Array.from(root.querySelectorAll<HTMLElement>(".pp-work-card"))
  const closeBtn = backdrop.querySelector<HTMLButtonElement>(".pp-work-modal-close")

  // 모달 내 fillable 슬롯
  const slots = {
    image: modal.querySelector<HTMLImageElement>(".pp-work-modal-image img"),
    title: modal.querySelector<HTMLElement>(".pp-work-modal-header h2"),
    year: modal.querySelector<HTMLElement>(".pp-work-modal-year"),
    category: modal.querySelector<HTMLElement>(".pp-work-modal-category"),
    desc: modal.querySelector<HTMLElement>(".pp-work-modal-desc"),
    tools: modal.querySelector<HTMLElement>(".pp-work-modal-tools"),
    link: modal.querySelector<HTMLAnchorElement>(".pp-work-modal-link"),
  }

  const openModal = (card: HTMLElement) => {
    // 카드의 data-* 속성에서 정보 읽어 모달에 주입
    if (slots.image) {
      slots.image.src = card.dataset.workImage ?? ""
      slots.image.alt = card.dataset.workTitle ?? ""
    }
    if (slots.title) slots.title.textContent = card.dataset.workTitle ?? ""
    if (slots.year) slots.year.textContent = card.dataset.workYear ?? ""
    if (slots.category) slots.category.textContent = card.dataset.workCategory ?? ""
    if (slots.desc) slots.desc.textContent = card.dataset.workDesc ?? ""
    if (slots.link) slots.link.href = card.dataset.workLink ?? "#"

    if (slots.tools) {
      slots.tools.innerHTML = ""
      const toolsRaw = card.dataset.workTools ?? ""
      toolsRaw.split(",").forEach((t) => {
        const trimmed = t.trim()
        if (!trimmed) return
        const span = document.createElement("span")
        span.textContent = trimmed
        slots.tools!.appendChild(span)
      })
    }

    backdrop.classList.add("is-open")
    // body 스크롤 잠금
    document.body.style.overflow = "hidden"
    // 포커스 이동
    closeBtn?.focus()
  }

  const closeModal = () => {
    backdrop.classList.remove("is-open")
    document.body.style.overflow = ""
  }

  // 카드 클릭
  const cardHandlers: Array<{ el: HTMLElement; handler: () => void }> = []
  cards.forEach((card) => {
    const handler = () => openModal(card)
    card.addEventListener("click", handler)
    cardHandlers.push({ el: card, handler })
  })

  // 닫기 버튼
  const onCloseClick = () => closeModal()
  closeBtn?.addEventListener("click", onCloseClick)

  // 배경 클릭
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === backdrop) closeModal()
  }
  backdrop.addEventListener("click", onBackdropClick)

  // Esc
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeModal()
    }
  }
  document.addEventListener("keydown", onKey)

  return () => {
    cardHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler))
    closeBtn?.removeEventListener("click", onCloseClick)
    backdrop.removeEventListener("click", onBackdropClick)
    document.removeEventListener("keydown", onKey)
    backdrop.classList.remove("is-open")
    document.body.style.overflow = ""
  }
}
