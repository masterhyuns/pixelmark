/**
 * 네비게이션 모듈
 *
 * [기능]
 * 1. 스크롤 100px 이후 .cr-nav에 is-scrolled 추가 → blur 배경
 * 2. 햄버거 버튼 클릭 시 모바일 드로어 열기/닫기
 * 3. 네비/드로어 앵커 링크 클릭 시 스무스 스크롤 (Lenis 자동 연동)
 * 4. 상단 스크롤 버튼 (footer의 .cr-footer-top)
 *
 * [Lenis 연동]
 * - Lenis는 window.scrollTo의 smooth behavior를 가로채 처리
 * - 따라서 별도 Lenis API 호출 없이 `window.scrollTo({ behavior: "smooth" })`만 하면 됨
 */
export const initNav = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const nav = root.querySelector<HTMLElement>(".cr-nav")
  const hamburger = root.querySelector<HTMLButtonElement>(".cr-nav-hamburger")
  const mobileMenu = root.querySelector<HTMLElement>(".cr-mobile-menu")

  // ----- 1. 스크롤 상태 감지 -----
  const SCROLL_THRESHOLD = 100
  const onScroll = () => {
    if (!nav) return
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add("is-scrolled")
    } else {
      nav.classList.remove("is-scrolled")
    }
  }
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })

  // ----- 2. 햄버거 토글 -----
  const onHamburgerClick = () => {
    if (!hamburger || !mobileMenu) return
    const isOpen = hamburger.classList.toggle("is-open")
    mobileMenu.classList.toggle("is-open", isOpen)
  }
  if (hamburger) {
    hamburger.addEventListener("click", onHamburgerClick)
  }

  // ----- 3. 앵커 링크 스무스 스크롤 (네비 + 드로어 + 풋터 top) -----
  const OFFSET = 44 + 64 // DemoHeaderBar + cr-nav
  interface LinkHandler {
    el: HTMLAnchorElement
    handler: (e: MouseEvent) => void
  }
  const linkHandlers: LinkHandler[] = []

  const handleAnchor = (link: HTMLAnchorElement) => {
    const handler = (e: MouseEvent) => {
      const href = link.getAttribute("href")
      if (!href || !href.startsWith("#")) return
      const target = root.querySelector<HTMLElement>(href)
      if (!target) return
      e.preventDefault()

      // 드로어 닫기 (모바일)
      if (hamburger?.classList.contains("is-open")) {
        hamburger.classList.remove("is-open")
        mobileMenu?.classList.remove("is-open")
      }

      const rect = target.getBoundingClientRect()
      // #top (맨 위)은 offset 적용 안 함
      const targetY = href === "#top" ? 0 : window.scrollY + rect.top - OFFSET
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
    link.addEventListener("click", handler)
    linkHandlers.push({ el: link, handler })
  }

  root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(handleAnchor)

  // cleanup
  return () => {
    window.removeEventListener("scroll", onScroll)
    if (hamburger) hamburger.removeEventListener("click", onHamburgerClick)
    linkHandlers.forEach(({ el, handler }) => el.removeEventListener("click", handler))
    if (nav) nav.classList.remove("is-scrolled")
    if (hamburger) hamburger.classList.remove("is-open")
    if (mobileMenu) mobileMenu.classList.remove("is-open")
  }
}
