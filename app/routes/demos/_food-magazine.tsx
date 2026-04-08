import { useEffect, useRef } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import "~/demos/food-magazine/main.scss"
import { initScrollReveal } from "~/demos/food-magazine/modules/scrollReveal"
import { brand } from "~/demos/food-magazine/data/content"

/**
 * B-S2 Food Magazine 부모 layout — Verde Provisions
 *
 * [구조]
 * - SCSS는 부모에서 한 번만 import → 3개 sub-route가 공유
 * - sub-route 변경 시 .fmag-page에 .is-leaving을 잠깐 부여 → opacity transition으로 fade
 * - scrollReveal은 sub-route 변경마다 재초기화 (새 페이지 요소를 다시 관측)
 */

export const handle = { demoName: "B-S2 Verde Provisions" }

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&family=Caveat:wght@500;600&display=swap",
  },
]

export default function FoodMagazineLayout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // sub-route 변경마다 scrollReveal 재초기화
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanup = initScrollReveal(root)
    return cleanup
  }, [location.pathname])

  // 페이드 전환 + 스크롤 top
  useEffect(() => {
    const page = rootRef.current?.querySelector<HTMLElement>(".fmag-page")
    if (!page) return
    page.classList.add("is-leaving")
    const id = requestAnimationFrame(() => page.classList.remove("is-leaving"))
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <div ref={rootRef} className="food-magazine">
      <header className="fmag-site-header">
        <div className="fmag-site-header-inner">
          <NavLink to="/demos/food-magazine" end className="fmag-logo">
            <span className="fmag-logo-name">{brand.name}</span>
            <span className="fmag-logo-script">— {brand.taglineKr} —</span>
          </NavLink>
          <nav className="fmag-site-nav" aria-label="주 메뉴">
            <NavLink to="/demos/food-magazine" end className={({ isActive }) => isActive ? "active" : ""}>
              Home · 홈
            </NavLink>
            <NavLink to="/demos/food-magazine/products" className={({ isActive }) => isActive ? "active" : ""}>
              Products · 제품
            </NavLink>
            <NavLink to="/demos/food-magazine/story" className={({ isActive }) => isActive ? "active" : ""}>
              Story · 스토리
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="fmag-page">
        <Outlet />
      </div>

      <footer className="fmag-site-footer">
        <div className="fmag-container">
          <div className="fmag-footer-inner">
            <div>
              <p className="fmag-footer-name">{brand.name}</p>
              <p className="fmag-footer-tag">{brand.taglineKr}</p>
            </div>
            <div className="fmag-footer-meta">
              <p>{brand.founded}</p>
              <p>{brand.tagline}</p>
            </div>
          </div>
          <p className="fmag-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Verde Provisions'는 가상 식품 브랜드이며, 표시된 모든 제품 / 농장 / 매장 / 가격은 가상이고 실존 브랜드와 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
