/**
 * F-S2 메뉴 카테고리 탭 — 클릭 시 패널 전환 + underline 슬라이드.
 */
export const initMenuTabs = (root: HTMLElement): (() => void) => {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".wbd-menu-tab"))
  const panels = Array.from(root.querySelectorAll<HTMLElement>(".wbd-menu-panel"))
  if (!tabs.length || !panels.length) return () => {}

  const onClick = (e: Event) => {
    const tab = e.currentTarget as HTMLButtonElement
    const target = tab.dataset.target
    tabs.forEach((t) => t.classList.toggle("is-active", t === tab))
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target))
  }
  tabs.forEach((t) => t.addEventListener("click", onClick))
  return () => tabs.forEach((t) => t.removeEventListener("click", onClick))
}
