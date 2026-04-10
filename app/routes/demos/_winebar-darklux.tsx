import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/winebar-darklux/main.scss"
import { initScrollReveal } from "~/demos/winebar-darklux/modules/scrollReveal"
import { initMenuTabs } from "~/demos/winebar-darklux/modules/menuTabs"
import { brand } from "~/demos/winebar-darklux/data/content"

/**
 * F-S2 Winebar Dark Lux 부모 layout — Verres Noirs
 * 부모에서 SCSS 한 번만 import. 3 sub-route가 공유.
 */

export const handle = { demoName: "F-S2 Verres Noirs" }

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
  },
]

export default function WinebarLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initScrollReveal(root), initMenuTabs(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [location.pathname])

  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".wbd-page")
    if (!page) return
    page.classList.add("is-leaving")
    const id = requestAnimationFrame(() => page.classList.remove("is-leaving"))
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="winebar-darklux">
      <header className="wbd-site-header">
        <div className="wbd-site-header-inner">
          <NavLink to="/demos/winebar-darklux" end className="wbd-logo">
            <span className="wbd-logo-name">{brand.name}</span>
            <span className="wbd-logo-tag">{brand.hours}</span>
          </NavLink>
          <nav className="wbd-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/winebar-darklux" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/demos/winebar-darklux/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
            <NavLink to="/demos/winebar-darklux/reservation" className={({ isActive }) => isActive ? "active" : ""}>Reservation</NavLink>
          </nav>
        </div>
      </header>

      <div className="wbd-page">
        <Outlet />
      </div>

      <footer className="wbd-site-footer">
        <div className="wbd-container">
          <p className="wbd-footer-name">{brand.name}</p>
          <p className="wbd-footer-tag">{brand.tagline} · {brand.taglineKr}</p>
          <p className="wbd-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Verres Noirs'는 가상 와인바 브랜드이며, 표시된 모든 메뉴 / 가격 / 일정은 가상이고 실존 매장과 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
