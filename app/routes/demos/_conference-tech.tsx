import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/conference-tech/main.scss"

/**
 * E-S4 Conference Tech 부모 layout — 멀티페이지(3 sub-route) 공유 chrome
 *
 * [구조]
 * - /demos/conference-tech              → 홈
 * - /demos/conference-tech/speakers     → 스피커
 * - /demos/conference-tech/schedule     → 일정
 *
 * [SCSS는 부모에서 한 번만 import]
 * - sub-route 간 이동 시 CSS 유지 → 즉시 전환
 * - law-office와 동일한 패턴
 *
 * [페이지 전환 페이드]
 * - useLocation 변경 시 .ct-page에 is-leaving을 잠깐 부여 → 다음 frame에 제거
 * - opacity 트랜지션이 자연스럽게 entering 효과 제공
 *
 * [모달/카운트다운 등 sub-route별 모듈]
 * - 각 sub-route 라우트 파일의 useEffect에서 init/cleanup
 * - 부모 layout은 SCSS와 chrome만 담당
 */

export const handle = { demoName: "E-S4 Pixelmark Tech Conf" }

// JetBrains Mono (디스플레이용 모노스페이스)
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  },
]

export default function ConferenceTechLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // sub-route 변경 시 entering 페이드 + 상단 스크롤
  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".ct-page")
    if (!page) return
    page.classList.add("is-leaving")
    const rafId = requestAnimationFrame(() => {
      page.classList.remove("is-leaving")
    })
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(rafId)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="conference-tech">
      {/* ===== 사이트 헤더 ===== */}
      <header className="ct-site-header">
        <div className="ct-site-header-inner">
          <NavLink to="/demos/conference-tech" className="ct-site-logo" end>
            <span className="ct-prompt">$</span>
            <span>pixelmark/tech-conf</span>
          </NavLink>

          <nav className="ct-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/conference-tech" end className={({ isActive }) => isActive ? "active" : ""}>./home</NavLink>
            <NavLink to="/demos/conference-tech/speakers" className={({ isActive }) => isActive ? "active" : ""}>./speakers</NavLink>
            <NavLink to="/demos/conference-tech/schedule" className={({ isActive }) => isActive ? "active" : ""}>./schedule</NavLink>
          </nav>

          <a
            href="#"
            className="ct-btn ct-btn--primary ct-site-cta"
            onClick={(e) => e.preventDefault()}
          >
            ./register
          </a>
        </div>
      </header>

      {/* ===== 페이지 콘텐츠 ===== */}
      <div className="ct-page" style={{ paddingTop: "calc(44px + var(--ct-header-h))" }}>
        <Outlet />
      </div>

      {/* ===== 사이트 푸터 ===== */}
      <footer className="ct-site-footer">
        <div className="ct-site-footer-inner">
          <div className="ct-footer-top">
            <div className="ct-footer-brand">
              <p className="ct-footer-brand-logo">
                <span className="ct-prompt">$</span>pixelmark/tech-conf
              </p>
              <p className="ct-footer-brand-tag">
                Pixelmark Tech Conf 2026 (가상)
                <br />
                개발 / 디자인 / AI 트랙으로 구성된 이틀 짜리 가상 컨퍼런스 데모
              </p>
            </div>

            <div className="ct-footer-col">
              <h4>menu</h4>
              <ul>
                <li><NavLink to="/demos/conference-tech" end>./home</NavLink></li>
                <li><NavLink to="/demos/conference-tech/speakers">./speakers</NavLink></li>
                <li><NavLink to="/demos/conference-tech/schedule">./schedule</NavLink></li>
              </ul>
            </div>

            <div className="ct-footer-col">
              <h4>contact</h4>
              <ul>
                <li><p>contact@pixelmark.example</p></li>
                <li><p>weekday 10:00 — 19:00</p></li>
              </ul>
            </div>
          </div>

          <div className="ct-footer-bottom">
            <p className="ct-footer-copy">
              © {new Date().getFullYear()} Pixelmark Tech Conf (가상). All rights reserved.
            </p>
            <p className="ct-footer-disclaimer">
              ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
              'Pixelmark Tech Conf 2026'은 가상 컨퍼런스이며, 표시된 모든 스피커 / 세션 / 후원사는
              가상이고 실제 행사 또는 인물과 무관합니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
