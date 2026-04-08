import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/coach-warm/main.scss"
import { initScrollReveal } from "~/demos/coach-warm/modules/scrollReveal"
import { studio } from "~/demos/coach-warm/data/content"

/**
 * PE-S3 Coach Warm 부모 layout — Aevi Studio (멀티페이지 3)
 */
export const handle = { demoName: "PE-S3 Aevi Studio" }

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
  },
]

export default function CoachWarmLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [location.pathname])

  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".cwm-page")
    if (!page) return
    page.classList.add("is-leaving")
    const id = requestAnimationFrame(() => page.classList.remove("is-leaving"))
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="coach-warm">
      <header className="cwm-site-header">
        <div className="cwm-site-header-inner">
          <NavLink to="/demos/coach-warm" end className="cwm-logo">
            <span className="cwm-logo-name">{studio.name}</span>
            <span className="cwm-logo-tag">{studio.coachKr} · 가상</span>
          </NavLink>
          <nav className="cwm-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/coach-warm" end className={({ isActive }) => isActive ? "active" : ""}>About · 소개</NavLink>
            <NavLink to="/demos/coach-warm/programs" className={({ isActive }) => isActive ? "active" : ""}>Programs · 강의</NavLink>
            <NavLink to="/demos/coach-warm/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact · 문의</NavLink>
          </nav>
        </div>
      </header>

      <div className="cwm-page">
        <Outlet />
      </div>

      <footer className="cwm-site-footer">
        <div className="cwm-container">
          <p className="cwm-footer-name">{studio.name}</p>
          <p className="cwm-footer-tag">{studio.tagline} · {studio.taglineKr}</p>
          <p className="cwm-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Aevi Studio'와 'Soyeon Han'은 가상 코칭 스튜디오 / 가상 코치이며, 표시된 모든 강의 / 후기 / 가격 / 약력은 가상이고 실존 인물 또는 업체와 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
