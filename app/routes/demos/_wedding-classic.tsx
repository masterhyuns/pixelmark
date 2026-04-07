import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/wedding-classic/main.scss"
import { couple } from "~/demos/wedding-classic/data/content"

/**
 * E-S6 Wedding Classic 부모 layout — 멀티페이지(4 sub-route) 공유 chrome
 *
 * [구조]
 * - /demos/wedding-classic         → 홈
 * - /demos/wedding-classic/story   → 스토리
 * - /demos/wedding-classic/gallery → 갤러리
 * - /demos/wedding-classic/visit   → 오시는 길
 *
 * [SCSS 부모에서 한 번만 import]
 * - sub-route 간 이동 시 CSS 유지 → 즉시 전환
 * - law-office / conference-tech와 동일 패턴
 *
 * [페이지 전환 페이드]
 * - useLocation 변경 시 .wc-page에 is-leaving을 잠깐 부여 → 다음 frame에 제거
 * - opacity 트랜지션이 자연스럽게 entering 효과 제공
 *
 * [sub-route별 모듈]
 * - 카운트다운, 스크롤 reveal은 각 sub-route의 useEffect에서 init/cleanup
 * - 부모 layout은 SCSS와 chrome만 담당
 */

export const handle = { demoName: "E-S6 Wedding Classic" }

// Cormorant Garamond + Inter (디스플레이 세리프 + 영문 본문)
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap",
  },
]

const NAV_ITEMS = [
  { to: "/demos/wedding-classic", label: "Home", end: true },
  { to: "/demos/wedding-classic/story", label: "Story" },
  { to: "/demos/wedding-classic/gallery", label: "Gallery" },
  { to: "/demos/wedding-classic/visit", label: "Visit" },
]

export default function WeddingClassicLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // sub-route 변경 시 entering 페이드 + 상단 스크롤
  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".wc-page")
    if (!page) return
    page.classList.add("is-leaving")
    const rafId = requestAnimationFrame(() => {
      page.classList.remove("is-leaving")
    })
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(rafId)
  }, [location.pathname])

  // 현재 페이지 라벨 (모바일 헤더 우측)
  const current = NAV_ITEMS.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
  )

  return (
    <div ref={rootRef} className="wedding-classic">
      {/* ===== 사이트 헤더 ===== */}
      <header className="wc-site-header">
        <div className="wc-site-header-inner">
          <NavLink to="/demos/wedding-classic" className="wc-site-logo" end>
            {couple.groomName} &amp; {couple.brideName}
          </NavLink>

          <nav className="wc-site-nav" aria-label="주 메뉴">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <span className="wc-site-current">{current?.label}</span>
        </div>
      </header>

      {/* ===== 페이지 콘텐츠 ===== */}
      <div className="wc-page" style={{ paddingTop: "calc(44px + var(--wc-header-h))" }}>
        <Outlet />
      </div>

      {/* ===== 사이트 푸터 ===== */}
      <footer className="wc-site-footer">
        <div className="wc-site-footer-inner">
          <p className="wc-footer-thanks">Thank You</p>
          <p className="wc-footer-thanks-kr">소중한 발걸음으로 축복해 주시는 모든 분들께 감사드립니다.</p>
          <p className="wc-footer-copy">
            © {new Date().getFullYear()} {couple.groomName} &amp; {couple.brideName} (가상). All rights reserved.
          </p>
          <p className="wc-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            신랑신부 / 양가 부모 / 호텔 / 사진 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
