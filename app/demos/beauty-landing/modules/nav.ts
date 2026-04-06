/**
 * 네비게이션 스크롤 상태 + 스무스 스크롤
 *
 * [두 가지 기능]
 * 1. 스크롤 300px 이후 .is-scrolled 클래스 추가 → 배경 blur 전환
 * 2. 네비 앵커 링크(#products, #about 등) 클릭 시 해당 섹션으로 스무스 스크롤
 *
 * [왜 Lenis 없이도 별도 처리인가]
 * - Lenis가 이미 smooth scroll을 제공하지만, 앵커 링크는 기본 브라우저 동작을 막고
 *   수동으로 scrollTo를 호출해야 Lenis 효과가 먹힘
 * - window.scrollTo({ behavior: "smooth" })는 Lenis가 가로챈 scroll 이벤트와 같이 동작
 *
 * [cleanup]
 * - scroll 리스너 제거, 각 링크 click 리스너 제거
 */
export const initNav = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const nav = root.querySelector<HTMLElement>(".bl-nav")
  if (!nav) return () => {}

  // ----- 1. 스크롤 상태 감지 -----
  const SCROLL_THRESHOLD = 300
  const onScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add("is-scrolled")
    } else {
      nav.classList.remove("is-scrolled")
    }
  }
  // 초기 상태 반영
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })

  // ----- 2. 앵커 링크 스무스 스크롤 -----
  interface LinkHandler {
    el: HTMLAnchorElement
    handler: (e: MouseEvent) => void
  }
  const linkHandlers: LinkHandler[] = []

  const anchorLinks = nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
  anchorLinks.forEach((link) => {
    const handler = (e: MouseEvent) => {
      const targetId = link.getAttribute("href")?.slice(1)
      if (!targetId) return
      const target = root.querySelector<HTMLElement>(`#${targetId}`)
      if (!target) return

      e.preventDefault()
      // DemoHeaderBar(44) + bl-nav(72) 높이만큼 오프셋 빼서 가림 방지
      const offset = 44 + 72
      const rect = target.getBoundingClientRect()
      const targetY = window.scrollY + rect.top - offset
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
    link.addEventListener("click", handler)
    linkHandlers.push({ el: link, handler })
  })

  // cleanup
  return () => {
    window.removeEventListener("scroll", onScroll)
    linkHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler))
    nav.classList.remove("is-scrolled")
  }
}
