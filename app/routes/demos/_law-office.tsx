import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/law-office/main.scss"
import { initNav } from "~/demos/law-office/modules/nav"
import { initScrollProgress } from "~/demos/law-office/modules/scrollProgress"
import { initFloatingButton } from "~/demos/law-office/modules/floatingButton"

/**
 * S-2 Law Office 부모 layout — 멀티페이지 공유 chrome
 *
 * [왜 부모 layout에 SCSS를 import하는가]
 * - 5 sub-route가 모두 같은 디자인 시스템 사용
 * - 각 sub-route에서 중복 import하면 번들러가 여러 번 평가할 수 있음
 * - 부모 layout에서 한 번만 import → React Router가 이 layout 활성 동안 CSS 유지
 *   → 5 sub-route 간 이동 시 CSS 재로드 없이 즉시 전환
 *
 * [이 부모 layout이 렌더하는 것]
 * - DemoHeaderBar/FloatingHome은 더 상위 _demo.tsx가 담당
 * - 여기서는 "법률사무소 사이트" 자체의 chrome: 스크롤 진행바 + 사이트 헤더 + 푸터 + 플로팅 상담 버튼
 * - <Outlet />에는 현재 sub-route 콘텐츠가 들어감
 *
 * [페이지 전환 페이드]
 * - useLocation().pathname 변경 시 .lo-page 요소에 is-leaving 클래스를 잠깐 추가했다가
 *   다음 tick에 제거 → opacity transition이 자연스럽게 0→1 실행
 * - 완전한 "out → mount → in" 시퀀스는 React가 즉시 DOM 교체해버려 어렵지만,
 *   새 페이지가 fade in 되는 효과만으로도 충분히 "전환이 있는" 느낌 제공
 *
 * [모듈 초기화 주의]
 * - initNav / initScrollProgress / initFloatingButton은 부모 layout이 살아있는 동안 유지되면 됨
 * - sub-route만 바뀌어도 부모 layout은 unmount 안 되므로 이 useEffect는 한 번만 실행
 * - 단 countUp / accordion / form / modal은 특정 sub-route에만 필요 → 각 sub-route에서 init
 */

export const handle = { demoName: "S-2 Law Office" }

// Inter 폰트 추가 로드 (Pretendard는 공통 root.tsx에서 로드됨)
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
]

export default function LawOfficeLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // ----- 공통 모듈 초기화 (부모 layout 마운트 시 1회) -----
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cleanups: Array<() => void> = [
      initNav(root),
      initScrollProgress(root),
      initFloatingButton(root),
    ]

    return () => {
      cleanups.reverse().forEach((fn) => {
        try {
          fn()
        } catch (err) {
          console.warn("[law-office] cleanup error:", err)
        }
      })
    }
  }, [])

  // ----- sub-route 변경 시 페이드 효과 + 상단 스크롤 -----
  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".lo-page")
    if (!page) return

    // 새 페이지가 이미 DOM에 렌더된 상태에서 is-leaving → 즉시 제거하면
    // opacity 0 → 1 transition 실행 (entering 효과)
    page.classList.add("is-leaving")
    const rafId = requestAnimationFrame(() => {
      page.classList.remove("is-leaving")
    })

    // 새 페이지 진입 시 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })

    return () => cancelAnimationFrame(rafId)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="law-office">
      {/* 상단 스크롤 진행 라인 */}
      <div className="lo-scroll-progress" aria-hidden="true">
        <div className="lo-scroll-progress-bar" />
      </div>

      {/* 사이트 헤더 */}
      <header className="lo-site-header">
        <div className="lo-site-header-inner">
          <NavLink to="/demos/law-office" className="lo-site-logo" end>
            <span className="lo-site-logo-mark">정</span>
            <span className="lo-site-logo-text">정우 법률사무소</span>
          </NavLink>

          <nav className="lo-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/law-office" end>홈</NavLink>
            <NavLink to="/demos/law-office/about">소개</NavLink>
            <NavLink to="/demos/law-office/services">전문분야</NavLink>
            <NavLink to="/demos/law-office/reviews">후기</NavLink>
            <NavLink to="/demos/law-office/contact">상담 예약</NavLink>
          </nav>

          <NavLink to="/demos/law-office/contact" className="lo-btn lo-btn--cta lo-site-cta">
            무료 상담 예약
          </NavLink>

          <button
            type="button"
            className="lo-site-hamburger"
            aria-label="메뉴 열기"
            aria-expanded="false"
            aria-controls="lo-mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* 모바일 드로어 */}
      <div id="lo-mobile-menu" className="lo-mobile-menu">
        <ul>
          <li><NavLink to="/demos/law-office" end>홈</NavLink></li>
          <li><NavLink to="/demos/law-office/about">소개</NavLink></li>
          <li><NavLink to="/demos/law-office/services">전문분야</NavLink></li>
          <li><NavLink to="/demos/law-office/reviews">후기</NavLink></li>
          <li><NavLink to="/demos/law-office/contact">상담 예약</NavLink></li>
        </ul>
        <NavLink to="/demos/law-office/contact" className="lo-btn lo-btn--cta" style={{ width: "100%" }}>
          무료 상담 예약
        </NavLink>
      </div>

      {/* 페이지 콘텐츠 (sub-route) */}
      <div className="lo-page" style={{ paddingTop: "116px" }}>
        {/* 44(DemoHeaderBar) + 72(site-header) = 116px spacer */}
        <Outlet />
      </div>

      {/* 사이트 푸터 */}
      <footer className="lo-site-footer">
        <div className="lo-site-footer-inner">
          <div className="lo-site-footer-top">
            <div className="lo-footer-brand">
              <p className="lo-footer-logo">정우 법률사무소</p>
              <p className="lo-footer-tagline">
                민사·형사·가사·부동산 전문
                <br />
                신뢰로 쌓아가는 법률 서비스
              </p>
            </div>

            <div className="lo-footer-col">
              <h4>메뉴</h4>
              <ul>
                <li><NavLink to="/demos/law-office" end>홈</NavLink></li>
                <li><NavLink to="/demos/law-office/about">소개</NavLink></li>
                <li><NavLink to="/demos/law-office/services">전문분야</NavLink></li>
                <li><NavLink to="/demos/law-office/reviews">후기</NavLink></li>
              </ul>
            </div>

            <div className="lo-footer-col">
              <h4>연락처</h4>
              <ul>
                <li><p>02-000-1234</p></li>
                <li><p>contact@example.com</p></li>
                <li><p>평일 09:00 — 18:00</p></li>
              </ul>
            </div>

            <div className="lo-footer-col">
              <h4>위치</h4>
              <ul>
                <li><p>서울시 서초구 서초대로 123</p></li>
                <li><p>정우빌딩 5층</p></li>
              </ul>
            </div>
          </div>

          <div className="lo-site-footer-bottom">
            <p className="lo-footer-copy">
              © {new Date().getFullYear()} 정우 법률사무소. All rights reserved.
            </p>
            <p className="lo-footer-note">
              이 페이지는 Pixelmark 포트폴리오 데모입니다. 실제 법률사무소·변호사와 무관합니다.
            </p>
          </div>
        </div>
      </footer>

      {/* 플로팅 상담 버튼 (모든 페이지 공통) */}
      <NavLink to="/demos/law-office/contact" className="lo-floating-consult" aria-label="무료 상담 예약">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="lo-floating-consult-text">무료 상담</span>
      </NavLink>
    </div>
  )
}
