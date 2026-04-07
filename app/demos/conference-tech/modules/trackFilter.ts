/**
 * E-S4 Conference Tech — 트랙 필터 (스피커 + 일정 공통)
 *
 * [동작]
 * - .ct-filter-tabs[data-ct-filter-target="<group>"]
 *   각 .ct-filter-tab[data-track="<track|all>"] 클릭 시
 *   같은 group의 [data-ct-filterable][data-track]을 보이거나 숨김
 * - .is-active 토글로 탭 상태 유지
 * - 카드 fade-out → display:none → display:flex → fade-in 흐름 (CSS는 transition만, JS가 클래스 토글)
 *
 * [cleanup]
 * - 모든 이벤트 리스너 제거, 필터 상태 'all' 로 초기화
 */
export const initTrackFilter = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const groups = root.querySelectorAll<HTMLElement>("[data-ct-filter-target]")
  if (groups.length === 0) return () => {}

  const handlers: Array<{ tab: HTMLElement; fn: (e: Event) => void }> = []

  groups.forEach((group) => {
    const groupId = group.dataset.ctFilterTarget
    if (!groupId) return
    const tabs = group.querySelectorAll<HTMLElement>(".ct-filter-tab")
    const targets = root.querySelectorAll<HTMLElement>(
      `[data-ct-filterable="${groupId}"]`
    )

    const apply = (track: string) => {
      targets.forEach((el) => {
        const elTrack = el.dataset.track ?? ""
        const visible = track === "all" || elTrack === track
        el.classList.toggle("is-hidden", !visible)
      })
      tabs.forEach((t) => {
        t.classList.toggle("is-active", (t.dataset.track ?? "all") === track)
        t.setAttribute("aria-pressed", t.classList.contains("is-active") ? "true" : "false")
      })
    }

    tabs.forEach((tab) => {
      const fn = () => apply(tab.dataset.track ?? "all")
      tab.addEventListener("click", fn)
      handlers.push({ tab, fn })
    })

    // 초기 상태
    apply("all")
  })

  return () => {
    handlers.forEach(({ tab, fn }) => tab.removeEventListener("click", fn))
    root.querySelectorAll<HTMLElement>("[data-ct-filterable]").forEach((el) => {
      el.classList.remove("is-hidden")
    })
  }
}
