import { useEffect, useRef } from "react"
import type { Route } from "./+types/cafe-restaurant"
// GLightbox CSS는 라이트박스 스타일, 라우트 파일에서 JS import로 로드
import "glightbox/dist/css/glightbox.min.css"
import "~/demos/cafe-restaurant/main.scss"
import { initLenis } from "~/demos/cafe-restaurant/modules/lenisScroll"
import { initNav } from "~/demos/cafe-restaurant/modules/nav"
import { initMenuTabs } from "~/demos/cafe-restaurant/modules/menuTabs"
import { initMenuCardTilt } from "~/demos/cafe-restaurant/modules/menuCardTilt"
import { initGallery } from "~/demos/cafe-restaurant/modules/gallery"
import { initGalleryReveal } from "~/demos/cafe-restaurant/modules/galleryReveal"
import { initScrollAnimation } from "~/demos/cafe-restaurant/modules/scrollAnimation"
import { initHeroZoom } from "~/demos/cafe-restaurant/modules/heroZoom"
import { CATEGORIES, menuItems, galleryImages, notices } from "~/demos/cafe-restaurant/data/menu"

/**
 * S-3 Cafe & Restaurant — 외식업 감성 원페이지 데모
 *
 * [컨셉] "따뜻하고 아늑함"
 * 크림/테라코타/올리브 톤, 둥근 모서리, Playfair Display 세리프, 비대칭 이미지 배치
 *
 * [모듈 8개]
 * 1. lenisScroll (S-1에서 복사, import 금지 원칙)
 * 2. nav — 스크롤 상태 + 햄버거 + 스무스 스크롤
 * 3. menuTabs — 탭 + underline 슬라이드
 * 4. menuCardTilt — 3D 틸트 직접 구현 (5도)
 * 5. gallery — GLightbox 라이트박스
 * 6. galleryReveal — clip-path 위→아래 펼침 (stagger 0.08s)
 * 7. scrollAnimation — 섹션 페이드업 (Intersection Observer)
 * 8. heroZoom — 히어로 배경 서서히 확대
 *
 * [메뉴 필터링 방식]
 * - 메뉴 아이템을 전부 렌더하고 data-category 속성으로 필터링
 * - 활성 카테고리와 다른 아이템은 CSS `display: none`으로 숨김
 * - React state로 관리하지 않음 (vanilla 원칙)
 */

export const handle = { demoName: "S-3 Cafe & Restaurant" }

export const meta: Route.MetaFunction = () => [
  { title: "S-3 Cafe & Restaurant — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "따뜻한 카페/레스토랑 소개 사이트 데모. 감성 비주얼, 메뉴/갤러리 UI, 카카오맵 연동 샘플.",
  },
]

// Playfair Display 폰트 — 세리프 디스플레이 (가게명, 섹션 타이틀)
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap",
  },
]

export default function CafeRestaurantDemo() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cleanups: Array<() => void> = [
      initLenis(),
      initNav(root),
      initMenuTabs(root),
      initMenuCardTilt(root),
      initGallery(root),
      initGalleryReveal(root),
      initScrollAnimation(root),
      initHeroZoom(root),
    ]

    return () => {
      cleanups.reverse().forEach((fn) => {
        try {
          fn()
        } catch (err) {
          console.warn("[cafe-restaurant] cleanup error:", err)
        }
      })
    }
  }, [])

  return (
    <div ref={rootRef} className="cafe-restaurant">
      {/* ===== 네비게이션 ===== */}
      <nav className="cr-nav" aria-label="카페 네비게이션">
        <div className="cr-nav-inner">
          <a href="#top" className="cr-nav-logo">
            Ember &amp; Oak
          </a>
          <ul className="cr-nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
          </ul>
          <button
            type="button"
            className="cr-nav-hamburger"
            aria-label="메뉴 열기"
            aria-expanded="false"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* 모바일 드로어 */}
      <div className="cr-mobile-menu">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#location">Location</a></li>
        </ul>
      </div>

      {/* ===== Hero ===== */}
      <section id="top" className="cr-hero">
        <div
          className="cr-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1280&fit=crop')",
          }}
          aria-hidden="true"
        />
        <div className="cr-hero-overlay" aria-hidden="true" />

        <div className="cr-hero-content">
          <span className="cr-hero-since">Since 2024 · 성수</span>
          <h1 className="cr-hero-logo">Ember &amp; Oak</h1>
          <p className="cr-hero-tagline">원목과 은은한 불빛, 그리고 한 잔의 여유</p>
          <div className="cr-hero-hours">
            <span className="cr-hero-hours-dot" aria-hidden="true" />
            <span>AM 10:00 — PM 10:00</span>
          </div>
        </div>

        <div className="cr-hero-scroll-cue" aria-hidden="true">
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
            <rect x="1" y="1" width="16" height="22" rx="8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="8" r="1.5" fill="currentColor" />
          </svg>
          <span>Scroll</span>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="cr-about">
        <div className="container">
          <div className="cr-about-inner">
            <div className="cr-about-images">
              <div className="cr-about-img cr-about-img--main">
                <img
                  src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=800&fit=crop"
                  alt="Ember & Oak 내부 전경"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="cr-about-img cr-about-img--sub">
                <img
                  src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=600&fit=crop"
                  alt="바 카운터"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="cr-about-text" data-reveal>
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title">하루의 온기를 담은 공간</h2>
              <div className="cr-about-body">
                <p>
                  Ember &amp; Oak는 "잔불(Ember)"과 "참나무(Oak)"의 따뜻함을 담은 카페입니다.
                  직접 로스팅한 원두의 향과 오크 가구의 질감이 어우러져, 하루의 여운을 천천히
                  즐길 수 있는 공간을 만들었습니다.
                </p>
                <p>
                  세심하게 선별한 디저트와 브런치, 그리고 정성껏 내린 커피 한 잔.
                  빠르지 않아도 좋은 순간을, 당신의 하루에 더하고 싶습니다.
                </p>
              </div>
              <p className="cr-about-sign">— Ember &amp; Oak Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Menu ===== */}
      <section id="menu" className="cr-menu">
        <div className="container">
          <div className="cr-menu-header" data-reveal>
            <p className="section-eyebrow">Our Menu</p>
            <h2 className="section-title">정성껏 준비한 메뉴</h2>
          </div>

          {/* 카테고리 탭 */}
          <div className="cr-menu-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className="cr-menu-tab"
                data-category={cat.key}
                role="tab"
              >
                {cat.label}
              </button>
            ))}
            <span className="cr-menu-tab-underline" aria-hidden="true" />
          </div>

          {/*
            메뉴 그리드 - data-category로 현재 활성 필터 표시
            모든 아이템 렌더, CSS로 [data-category] 매칭 안 되는 아이템 숨김
          */}
          <div className="cr-menu-grid" data-category="coffee">
            {menuItems.map((item) => (
              <article
                key={item.id}
                className="cr-menu-card"
                data-item-category={item.category}
              >
                <div className="cr-menu-card-image">
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                </div>
                <div className="cr-menu-card-body">
                  <h3 className="cr-menu-card-name">{item.name}</h3>
                  <p className="cr-menu-card-desc">{item.description}</p>
                  <p className="cr-menu-card-price">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section id="gallery" className="cr-gallery">
        <div className="container">
          <div className="cr-gallery-header" data-reveal>
            <p className="section-eyebrow">Gallery</p>
            <h2 className="section-title">공간의 순간들</h2>
          </div>

          {/*
            불규칙 그리드 + GLightbox 트리거
            각 a 태그의 href는 원본 이미지, 클릭 시 라이트박스 오픈
          */}
          <div className="cr-gallery-grid">
            {galleryImages.map((img, i) => (
              <a
                key={i}
                href={img.src}
                data-glightbox={`title: ${img.alt}`}
                aria-label={`${img.alt} 확대 보기`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Notice ===== */}
      <section id="notice" className="cr-notice">
        <div className="container">
          <div className="cr-notice-header" data-reveal>
            <p className="section-eyebrow">What&apos;s New</p>
            <h2 className="section-title">새로운 소식</h2>
          </div>

          <div className="cr-notice-grid">
            {notices.map((notice) => (
              <article key={notice.id} className="cr-notice-card">
                <div className="cr-notice-image">
                  <img src={notice.image} alt={notice.title} loading="lazy" decoding="async" />
                </div>
                <div className="cr-notice-body">
                  <span className="cr-notice-badge">{notice.badge}</span>
                  <h3 className="cr-notice-title">{notice.title}</h3>
                  <p className="cr-notice-period">{notice.period}</p>
                  <p className="cr-notice-desc">{notice.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Location ===== */}
      <section id="location" className="cr-location">
        <div className="container">
          <div className="cr-location-header" data-reveal>
            <p className="section-eyebrow">Find Us</p>
            <h2 className="section-title">오시는 길</h2>
          </div>

          <div className="cr-location-grid">
            {/*
              카카오맵 iframe 임베드 (API 키 불필요)
              실제 프로덕션에서는 정확한 장소 ID가 필요하지만,
              데모이므로 kakaomap 기본 임베드 URL 사용
            */}
            <div className="cr-location-map">
              <iframe
                src="https://map.kakao.com/?urlX=508344&urlY=1132232&urlLevel=3&itemId=&q=%EC%84%B1%EC%88%98%EB%8F%99%20%EC%B9%B4%ED%8E%98"
                title="Ember & Oak 위치"
                loading="lazy"
              />
            </div>

            <div className="cr-location-info">
              <h3>Ember &amp; Oak</h3>
              <div className="cr-location-list">
                <div className="cr-location-item">
                  <div className="cr-location-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="cr-location-label">Address</p>
                    <p className="cr-location-value">서울시 성동구 성수이로 123, 1층</p>
                  </div>
                </div>

                <div className="cr-location-item">
                  <div className="cr-location-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="cr-location-label">Phone</p>
                    <p className="cr-location-value">02-123-4567</p>
                  </div>
                </div>

                <div className="cr-location-item">
                  <div className="cr-location-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div>
                    <p className="cr-location-label">Hours</p>
                    <p className="cr-location-value">매일 10:00 — 22:00 (L.O. 21:30)</p>
                  </div>
                </div>

                <div className="cr-location-item">
                  <div className="cr-location-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="8" width="18" height="12" rx="2" />
                      <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
                    </svg>
                  </div>
                  <div>
                    <p className="cr-location-label">Parking</p>
                    <p className="cr-location-value">건물 지하 주차장 1시간 무료</p>
                  </div>
                </div>
              </div>

              <p className="cr-location-transport">
                <strong>지하철</strong> 2호선 성수역 3번 출구 도보 5분
                <br />
                <strong>버스</strong> 성수초등학교 정류장 하차
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="cr-footer">
        <div className="container">
          <a href="#top" className="cr-footer-top" aria-label="맨 위로 이동">
            <svg viewBox="0 0 24 24">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
          <p className="cr-footer-logo">Ember &amp; Oak</p>
          <p className="cr-footer-tagline">A warm corner for your day</p>

          <div className="cr-footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="네이버 플레이스">
              <svg viewBox="0 0 24 24">
                <path d="M7 4v16M17 4v16M7 4l10 16" />
              </svg>
            </a>
            <a href="#" aria-label="전화">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>

          <p className="cr-footer-copy">
            이 페이지는 Pixelmark 포트폴리오 데모입니다. 실제 매장·브랜드와 무관합니다.
            <br />© {new Date().getFullYear()} Pixelmark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
