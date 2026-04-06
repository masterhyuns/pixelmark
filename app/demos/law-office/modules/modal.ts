/**
 * 모달 (제출 성공 모달 닫기 처리)
 *
 * [처리 이벤트]
 * - 닫기 버튼 클릭
 * - 배경(.lo-modal-backdrop) 클릭 시 닫기 (내부 .lo-modal 클릭은 이벤트 버블링 차단)
 * - Esc 키 입력
 *
 * [포커스 트랩]
 * - 열림 상태에서 Tab 키 → 모달 내부 요소만 순환
 * - 여기선 닫기 버튼 한 개만 있어서 단순 처리: Tab 시 항상 닫기 버튼에 머무름
 *
 * [열림 감지]
 * - form.ts가 모달을 열 때 .is-open 클래스 추가
 * - 이 모듈은 열림을 감지할 필요 없이, 닫기 트리거만 처리
 */
export const initModal = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const backdrop = root.querySelector<HTMLElement>(".lo-modal-backdrop")
  if (!backdrop) return () => {}

  const modal = backdrop.querySelector<HTMLElement>(".lo-modal")
  const closeBtn = backdrop.querySelector<HTMLButtonElement>(".lo-modal-close")

  const close = () => {
    backdrop.classList.remove("is-open")
  }

  // 1. 닫기 버튼
  const onCloseClick = () => close()
  if (closeBtn) closeBtn.addEventListener("click", onCloseClick)

  // 2. 배경 클릭 (모달 내부 클릭은 버블링 차단으로 제외)
  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === backdrop) close()
  }
  backdrop.addEventListener("click", onBackdropClick)

  // 모달 내부 클릭은 이벤트가 배경까지 올라가지 않도록
  const stopPropagation = (e: MouseEvent) => e.stopPropagation()
  if (modal) modal.addEventListener("click", stopPropagation)

  // 3. Esc 키
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      close()
    }
  }
  document.addEventListener("keydown", onKeyDown)

  return () => {
    if (closeBtn) closeBtn.removeEventListener("click", onCloseClick)
    backdrop.removeEventListener("click", onBackdropClick)
    if (modal) modal.removeEventListener("click", stopPropagation)
    document.removeEventListener("keydown", onKeyDown)
    backdrop.classList.remove("is-open")
  }
}
