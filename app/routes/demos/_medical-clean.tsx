import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/medical-clean/main.scss"
import { initScrollReveal } from "~/demos/medical-clean/modules/scrollReveal"
import { clinic } from "~/demos/medical-clean/data/content"

/**
 * P-S1 Medical Clean 부모 layout — Lumen Medical Clinic (멀티페이지 4)
 */
export const handle = { demoName: "P-S1 Lumen Medical Clinic" }

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  },
]

export default function MedicalCleanLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [location.pathname])

  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".mcl-page")
    if (!page) return
    page.classList.add("is-leaving")
    const id = requestAnimationFrame(() => page.classList.remove("is-leaving"))
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="medical-clean">
      <header className="mcl-site-header">
        <div className="mcl-site-header-inner">
          <NavLink to="/demos/medical-clean" end className="mcl-logo">
            <span className="mcl-logo-mark">L</span>
            <span className="mcl-logo-text">
              <span className="mcl-logo-name">{clinic.name}</span>
              <span className="mcl-logo-sub">{clinic.nameKr} · 가상 의원</span>
            </span>
          </NavLink>
          <nav className="mcl-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/medical-clean" end className={({ isActive }) => isActive ? "active" : ""}>홈</NavLink>
            <NavLink to="/demos/medical-clean/departments" className={({ isActive }) => isActive ? "active" : ""}>진료 과목</NavLink>
            <NavLink to="/demos/medical-clean/staff" className={({ isActive }) => isActive ? "active" : ""}>의료진</NavLink>
            <NavLink to="/demos/medical-clean/reservation" className={({ isActive }) => isActive ? "active" : ""}>예약 안내</NavLink>
          </nav>
          <NavLink to="/demos/medical-clean/reservation" className="mcl-site-cta">진료 예약 안내</NavLink>
        </div>
      </header>

      <div className="mcl-page">
        <Outlet />
      </div>

      <footer className="mcl-site-footer">
        <div className="mcl-container">
          <div className="mcl-footer-grid">
            <div>
              <p className="mcl-footer-name">{clinic.name}</p>
              <p className="mcl-footer-tag">{clinic.tagline} · {clinic.taglineKr}</p>
            </div>
            <div className="mcl-footer-meta">
              <p>{clinic.hours}</p>
              <p>02-000-0000 (가상)</p>
            </div>
          </div>
          <p className="mcl-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Lumen Medical Clinic'과 'Dr. Hae-jin Park'은 가상 의원 / 가상 의료진이며, 표시된 모든 진료 / 약력 / 일정 / 위치는 가상이고 실존 의원 또는 의료진과 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
