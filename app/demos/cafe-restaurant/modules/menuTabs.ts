/**
 * 메뉴 탭 전환 + underline 슬라이드
 *
 * [구현 전략]
 * - DOM 구조: .cr-menu-tabs 안에 .cr-menu-tab 여러 개 + .cr-menu-tab-underline 한 개
 * - 초기: 활성 탭의 getBoundingClientRect로 underline 위치/너비 계산
 * - 탭 클릭: 해당 탭의 rect를 읽어 underline transform/width 업데이트
 * - 전환 애니메이션은 CSS transition이 담당 (JS는 값만 설정)
 *
 * [페이드 전환]
 * - 탭 클릭 시 .cr-menu-grid에 is-switching 토글로 opacity 페이드아웃
 * - 0.15s 후 data-category 업데이트 → 새 아이템 렌더 → is-switching 해제 → 페이드인
 * - 이 동작은 React가 아닌 vanilla DOM 조작으로 (데이터 속성 활용)
 *
 * [왜 React state 대신 vanilla인가]
 * - 기획서: "퍼블리싱 역량 증명 의도, React 상태 관리 X"
 * - data-category 속성 토글로 CSS가 `[data-category="coffee"] .cr-menu-item` 식으로 필터링
 *
 * [cleanup]
 * - 탭 click 리스너 + window resize 리스너(underline 재계산) 제거
 */
export const initMenuTabs = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const tabs = root.querySelectorAll<HTMLButtonElement>(".cr-menu-tab")
  const underline = root.querySelector<HTMLElement>(".cr-menu-tab-underline")
  const grid = root.querySelector<HTMLElement>(".cr-menu-grid")
  if (tabs.length === 0 || !underline || !grid) return () => {}

  /** 특정 탭을 기준으로 underline 위치 계산 및 적용 */
  const moveUnderlineTo = (tab: HTMLElement) => {
    const parentRect = tab.parentElement!.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    const offsetX = tabRect.left - parentRect.left
    underline.style.transform = `translateX(${offsetX}px)`
    underline.style.width = `${tabRect.width}px`
  }

  /** 탭 활성화 + 그리드 페이드 전환 */
  const activate = (tab: HTMLButtonElement) => {
    const category = tab.dataset.category
    if (!category) return

    // 탭 active 클래스 갱신
    tabs.forEach((t) => t.classList.toggle("is-active", t === tab))
    moveUnderlineTo(tab)

    // 그리드 페이드아웃 → 카테고리 속성 교체 → 페이드인
    grid.classList.add("is-switching")
    window.setTimeout(() => {
      grid.dataset.category = category
      grid.classList.remove("is-switching")
    }, 150)
  }

  // 탭 클릭 핸들러 등록
  const handlers: Array<{ el: HTMLButtonElement; handler: () => void }> = []
  tabs.forEach((tab) => {
    const handler = () => activate(tab)
    tab.addEventListener("click", handler)
    handlers.push({ el: tab, handler })
  })

  // 초기 활성 탭 (첫 번째) 기준 underline 배치
  // requestAnimationFrame으로 layout이 안정된 다음 프레임에서 측정
  const initialTab = tabs[0]
  initialTab.classList.add("is-active")
  requestAnimationFrame(() => moveUnderlineTo(initialTab))

  // 화면 리사이즈 시 underline 재계산 (탭 너비가 반응형으로 바뀔 수 있음)
  const onResize = () => {
    const active = root.querySelector<HTMLElement>(".cr-menu-tab.is-active")
    if (active) moveUnderlineTo(active)
  }
  window.addEventListener("resize", onResize)

  // cleanup
  return () => {
    handlers.forEach(({ el, handler }) => el.removeEventListener("click", handler))
    window.removeEventListener("resize", onResize)
  }
}
