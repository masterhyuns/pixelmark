import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/consulting-dark/main.scss"
import { initScrollReveal } from "~/demos/consulting-dark/modules/scrollReveal"
import { firm } from "~/demos/consulting-dark/data/content"

/**
 * P-S3 Consulting Dark 부모 layout — Northgate Consulting (멀티페이지 3)
 */
export const handle = { demoName: "P-S3 Northgate Consulting" }

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap",
  },
]

export default function ConsultingDarkLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [location.pathname])

  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".cdk-page")
    if (!page) return
    page.classList.add("is-leaving")
    const id = requestAnimationFrame(() => page.classList.remove("is-leaving"))
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="consulting-dark">
      <header className="cdk-site-header">
        <div className="cdk-site-header-inner">
          <NavLink to="/demos/consulting-dark" end className="cdk-logo">
            <span className="cdk-logo-name">{firm.name}</span>
            <span className="cdk-logo-tag">{firm.founded}</span>
          </NavLink>
          <nav className="cdk-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/consulting-dark" end className={({ isActive }) => isActive ? "active" : ""}>Home · 홈</NavLink>
            <NavLink to="/demos/consulting-dark/cases" className={({ isActive }) => isActive ? "active" : ""}>Cases · 사례</NavLink>
            <NavLink to="/demos/consulting-dark/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact · 문의</NavLink>
          </nav>
        </div>
      </header>

      <div className="cdk-page">
        <Outlet />
      </div>

      <footer className="cdk-site-footer">
        <div className="cdk-container">
          <div className="cdk-footer-grid">
            <div>
              <p className="cdk-footer-name">{firm.name}</p>
              <p className="cdk-footer-tag">{firm.tagline} · {firm.taglineKr}</p>
            </div>
            <div className="cdk-footer-meta">
              <p>{firm.founded}</p>
              <p>Team {firm.team}</p>
            </div>
          </div>
          <p className="cdk-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Northgate Consulting'은 가상 컨설팅 펌이며, 표시된 모든 서비스 / 사례 / 산업 / 약력 / 일정은 가상이고 실존 회사 또는 클라이언트와 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
