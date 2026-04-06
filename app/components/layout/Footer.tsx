import { Link } from "react-router"

const NAV_LINKS = [
  { to: "/projects", label: "프로젝트" },
  { to: "/about", label: "팀 소개" },
  { to: "/contact", label: "문의" },
]

const KMONG_URL = "https://kmong.com" // 실제 크몽 프로필 URL로 교체

/** 사이트 공통 푸터 */
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* 로고 + 설명 */}
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition-opacity duration-150 w-fit"
            >
              <span className="text-[#2563eb]">P</span>ixelmark
            </Link>
            <p className="text-[#666666] text-sm leading-relaxed">
              Pixelmark · 퍼블리셔 + 풀스택 2인 팀
            </p>
          </div>

          {/* 네비게이션 */}
          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[#666666] hover:text-white text-sm transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
            <a
              href={KMONG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-white text-sm transition-colors duration-150"
            >
              크몽 프로필 ↗
            </a>
          </nav>

          {/* 상단 이동 버튼 */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-[#666666] hover:text-white text-sm transition-colors duration-150"
            aria-label="맨 위로 이동"
          >
            맨 위로
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 저작권 */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[#444444] text-xs">
            © {new Date().getFullYear()} Pixelmark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
