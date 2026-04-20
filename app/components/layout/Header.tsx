import { Link, NavLink, useLocation } from "react-router"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [
  { to: "/", label: "홈" },
  { to: "/projects", label: "프로젝트" },
  { to: "/about", label: "팀 소개" },
  { to: "/contact", label: "문의" },
]

const KMONG_URL = "https://kmong.com/gig/760141"

/**
 * 사이트 공통 헤더
 * - sticky + 스크롤 시 blur 배경
 * - active 링크 2px 인디케이터
 * - 모바일: Framer Motion 풀스크린 오버레이 햄버거 메뉴
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container h-full flex items-center justify-between">
          {/* 로고 */}
          <Link
            to="/"
            className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity duration-150 z-10"
          >
            <span className="text-[#2563eb]">P</span>ixelmark
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors duration-150 relative py-1 ${
                    isActive
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2563eb] after:rounded-full"
                      : "text-[#aaaaaa] hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* 크몽 링크 버튼 (데스크탑) */}
          <div className="hidden md:flex items-center">
            <a
              href={KMONG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium transition-colors duration-150"
            >
              크몽 문의
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* 햄버거 버튼 (모바일)
              bar 간격: h-px(1px) × 3 + gap-1.5(6px) × 2 = 15px 총높이
              버튼 높이 40px → 각 bar 중심에서 center(20px)까지 거리: ±7px
              정확한 y 이동값을 사용해야 X가 중앙에 정렬됨 */}
          <button
            className="md:hidden relative z-10 flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 오버레이 메뉴
          opacity 페이드인 대신 y-slide 사용:
          opacity 애니메이션은 배경 포함 전체가 반투명해져 뒤가 비침
          y: "-100%" → 0 슬라이드는 배경이 항상 불투명하게 유지됨 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 네비게이션"
            className="md:hidden fixed inset-0 z-40 bg-[#0a0a0a]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col h-full pt-20 px-6 pb-10">
              {/* 네비 링크 목록 */}
              <div className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.06, ease: "easeOut" }}
                  >
                    <NavLink
                      to={to}
                      end={to === "/"}
                      className={({ isActive }) =>
                        `block text-lg font-semibold py-3 px-4 rounded-xl transition-colors duration-150 ${
                          isActive
                            ? "text-white bg-white/5"
                            : "text-[#aaaaaa] hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* 하단 CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <a
                  href={KMONG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150"
                >
                  크몽에서 문의하기
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
