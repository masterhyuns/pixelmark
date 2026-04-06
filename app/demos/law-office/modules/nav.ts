/**
 * 네비게이션 (사이트 헤더 스크롤 상태 + 햄버거 토글)
 *
 * [두 기능]
 * 1. 스크롤 시 .lo-site-header에 is-scrolled 클래스 → 하단 shadow/border 추가
 * 2. 햄버거 버튼 클릭 시 모바일 드로어 열기/닫기
 *
 * [NavLink active 상태는 React Router가 자동 처리]
 * - 따라서 JS에서 별도로 active 클래스 토글 안 함
 * - 이 모듈은 스크롤 상태와 햄버거만 담당
 */
export const initNav = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const header = root.querySelector<HTMLElement>(".lo-site-header")
  const hamburger = root.querySelector<HTMLButtonElement>(".lo-site-hamburger")
  const mobileMenu = root.querySelector<HTMLElement>(".lo-mobile-menu")

  // ----- 1. 스크롤 감지 -----
  const SCROLL_THRESHOLD = 40
  const onScroll = () => {
    if (!header) return
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add("is-scrolled")
    } else {
      header.classList.remove("is-scrolled")
    }
  }
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })

  // ----- 2. 햄버거 토글 -----
  const onHamburgerClick = () => {
    if (!hamburger || !mobileMenu) return
    const isOpen = hamburger.classList.toggle("is-open")
    mobileMenu.classList.toggle("is-open", isOpen)
    hamburger.setAttribute("aria-expanded", String(isOpen))
  }
  if (hamburger) {
    hamburger.addEventListener("click", onHamburgerClick)
  }

  // ----- 3. 드로어 링크 클릭 시 드로어 닫기 -----
  const mobileLinks = mobileMenu?.querySelectorAll<HTMLAnchorElement>("a") ?? []
  const closeOnClick = () => {
    if (hamburger?.classList.contains("is-open")) {
      hamburger.classList.remove("is-open")
      hamburger.setAttribute("aria-expanded", "false")
      mobileMenu?.classList.remove("is-open")
    }
  }
  mobileLinks.forEach((a) => a.addEventListener("click", closeOnClick))

  // cleanup
  return () => {
    window.removeEventListener("scroll", onScroll)
    if (hamburger) hamburger.removeEventListener("click", onHamburgerClick)
    mobileLinks.forEach((a) => a.removeEventListener("click", closeOnClick))
    if (header) header.classList.remove("is-scrolled")
    if (hamburger) hamburger.classList.remove("is-open")
    if (mobileMenu) mobileMenu.classList.remove("is-open")
  }
}
