import { useEffect, useRef } from "react"
import type { Route } from "./+types/beauty-landing"
// Swiper CSS는 SCSS에서 @import하면 Dart Sass 3.0에서 제거될 예정이라
// 라우트 파일에서 직접 import. Vite가 이 라우트의 CSS 청크로 번들링.
import "swiper/css"
import "swiper/css/pagination"
import "~/demos/beauty-landing/main.scss"
import { initLenis } from "~/demos/beauty-landing/modules/lenisScroll"
import { initSplitText } from "~/demos/beauty-landing/modules/splitTextReveal"
import { initMagnetic } from "~/demos/beauty-landing/modules/magnetic"
import { initHeroSpotlight } from "~/demos/beauty-landing/modules/heroSpotlight"
import { initParallax } from "~/demos/beauty-landing/modules/parallax"
import { initProductSlider } from "~/demos/beauty-landing/modules/productSlider"
import { initReviewCarousel } from "~/demos/beauty-landing/modules/reviewCarousel"
import { initScrollAnimation } from "~/demos/beauty-landing/modules/scrollAnimation"
import { initNav } from "~/demos/beauty-landing/modules/nav"
import { products, features, reviews } from "~/demos/beauty-landing/data/products"
// 히어로 배경 + about 이미지 (Vite asset import)
import heroBgUrl from "~/demos/beauty-landing/assets/images/hero/hero-bg.webp"
import aboutMainUrl from "~/demos/beauty-landing/assets/images/about/about-main.webp"

/**
 * S-1 Beauty Landing — 화장품 브랜드 랜딩 데모
 *
 * [컨셉] "고급스러운 절제"
 * - Lenis 모멘텀 스크롤 + SplitText 글자 reveal + 마그네틱 CTA + 히어로 spotlight + 패럴랙스
 * - 9개 vanilla TS 모듈이 useEffect에서 init되고 cleanup 함수 반환
 *
 * [모듈 초기화 순서 중요성]
 * 1. Lenis 먼저 (다른 모듈의 scroll 이벤트 hook 기반 동작이 있기 때문)
 * 2. SplitText → 히어로 브랜드명이 먼저 reveal되어야 첫인상 결정
 * 3. 나머지는 의존성 없어 순서 무관하지만, 가독성을 위해 카테고리별로 묶음
 *
 * [cleanup 배열 패턴]
 * - 각 init 함수는 () => void 반환 (cleanup)
 * - 배열에 모아 useEffect return에서 역순으로 실행
 * - 하나라도 빠뜨리면 메모리 누수 / 다른 라우트에서 ghost 동작 발생
 */

export const handle = { demoName: "S-1 Beauty Landing" }

export const meta: Route.MetaFunction = () => [
  { title: "S-1 Beauty Landing — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "고급스러운 화장품 브랜드 랜딩 페이지 가상 디자인 데모. Pixelmark의 비주얼 퍼블리싱·스크롤 애니메이션 샘플. (브랜드·제품은 모두 가상)",
  },
]

/**
 * 데모 전용 폰트: Cormorant Garamond (세리프 디스플레이)
 *
 * [왜 라우트 links로 로드하는가]
 * - 메인 사이트(root.tsx)에는 Pretendard만 preload됨
 * - Cormorant는 S-1 데모에서만 쓰므로 이 라우트 활성 시에만 로드해야 메인 번들 오염 없음
 * - React Router의 links() export는 라우트별 <link> 태그 관리에 최적화돼있음
 */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap",
  },
]

export default function BeautyLandingDemo() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // 모든 모듈 초기화 + cleanup 함수 수집
    const cleanups: Array<() => void> = [
      initLenis(),
      initNav(root),
      initSplitText(root),
      initMagnetic(root),
      initHeroSpotlight(root),
      initParallax(root),
      initProductSlider(root),
      initReviewCarousel(root),
      initScrollAnimation(root),
    ]

    // cleanup: 라우트 이탈 시 역순 실행 (의존성 역순 보장)
    return () => {
      cleanups.reverse().forEach((fn) => {
        try {
          fn()
        } catch (err) {
          // 한 모듈의 cleanup 실패가 다른 모듈 cleanup을 막지 않도록 try-catch
          console.warn("[beauty-landing] cleanup error:", err)
        }
      })
    }
  }, [])

  return (
    <div ref={rootRef} className="beauty-landing">
      {/* ===== 네비게이션 ===== */}
      <nav className="bl-nav" aria-label="데모 내부 네비게이션">
        <div className="bl-nav-inner">
          <a href="#top" className="bl-nav-logo serif">
            Lumière
          </a>
          <ul className="bl-nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#reviews">Reviews</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section id="top" className="bl-hero">
        {/* 배경 이미지 (패럴랙스 대상) */}
        <div
          className="bl-hero-bg"
          style={{ backgroundImage: `url(${heroBgUrl})` }}
          aria-hidden="true"
        />
        {/* 어두운 그라디언트 오버레이 */}
        <div className="bl-hero-overlay" aria-hidden="true" />
        {/* 마우스 spotlight */}
        <div className="bl-hero-spotlight" aria-hidden="true" />

        <div className="bl-hero-content">
          <span className="bl-hero-eyebrow">Luxury Skincare</span>
          <h1
            className="bl-hero-title"
            data-split="char"
            data-split-trigger="load"
            data-split-stagger="0.05"
            data-split-duration="0.8"
          >
            Lumière
          </h1>
          <p className="bl-hero-tagline">
            빛을 머금은 피부를 위한 자연의 선물.
            <br />
            매일의 루틴에 특별함을 더하세요.
          </p>
          <div className="bl-hero-actions">
            <button type="button" className="bl-btn bl-btn--primary" data-magnetic>
              Shop the Collection
            </button>
            <button type="button" className="bl-btn bl-btn--ghost" data-magnetic>
              Learn More
            </button>
          </div>
        </div>

        <div className="bl-hero-scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="bl-about">
        <div className="container">
          <div className="bl-about-inner">
            <div className="bl-about-text">
              <p className="section-subtitle">Our Story</p>
              <h2
                className="section-title"
                data-split="char"
                data-split-stagger="0.03"
              >
                빛에서 시작된 이야기
              </h2>
              <div className="bl-about-body">
                <p>
                  Lumière는 프랑스어로 "빛"을 의미합니다. 우리는 피부가 스스로 빛을
                  머금을 수 있도록 돕는 진실한 포뮬러를 만듭니다.
                </p>
                <p>
                  엄선된 자연 유래 성분, 임상으로 검증된 효능, 그리고 지속 가능성까지.
                  매일의 루틴이 특별한 경험이 될 수 있도록 모든 과정에 정성을 담습니다.
                </p>
              </div>
              <p className="bl-about-sign">— Lumière Atelier</p>
            </div>
            <div className="bl-about-image">
              <img
                src={aboutMainUrl}
                alt="Lumière 브랜드 제품 이미지 (가상)"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Products ===== */}
      <section id="products" className="bl-products">
        <div className="bl-products-header">
          <p className="section-subtitle">The Collection</p>
          <h2
            className="section-title"
            data-split="char"
            data-split-stagger="0.03"
          >
            Our Products
          </h2>
        </div>

        {/*
          Swiper는 .swiper 클래스가 필요하고, 하위 .swiper-wrapper > .swiper-slide 구조를 요구한다.
          SCSS에서는 .bl-products-swiper 래핑 클래스로 추가 스타일 적용.
        */}
        <div className="bl-products-swiper swiper">
          <div className="swiper-wrapper">
            {products.map((product) => (
              <div key={product.id} className="swiper-slide">
                <article className="bl-product-card">
                  <div className="bl-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="bl-product-overlay">
                      <span>View Detail</span>
                    </div>
                  </div>
                  <div className="bl-product-body">
                    <p className="bl-product-category">{product.category}</p>
                    <h3 className="bl-product-name">{product.name}</h3>
                    <p className="bl-product-desc">{product.description}</p>
                    <p className="bl-product-price">{product.price}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="bl-features">
        <div className="container">
          <div className="bl-features-header">
            <p className="section-subtitle">Why Lumière</p>
            <h2
              className="section-title"
              data-split="char"
              data-split-stagger="0.03"
            >
              피부를 위한 약속
            </h2>
            <p className="section-lead" style={{ margin: "16px auto 0" }}>
              우리는 단순한 화장품이 아닌, 매일의 의식을 만듭니다.
            </p>
          </div>

          <div className="bl-features-grid">
            {features.map((feature) => (
              <div key={feature.key} className="bl-feature-card">
                <div className="bl-feature-icon">
                  <FeatureIcon type={feature.key} />
                </div>
                <h3 className="bl-feature-title">{feature.title}</h3>
                <p className="bl-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="bl-reviews">
        <div className="container">
          <div className="bl-reviews-header">
            <p className="section-subtitle">Testimonials</p>
            <h2
              className="section-title"
              data-split="char"
              data-split-stagger="0.03"
            >
              고객의 이야기
            </h2>
          </div>

          <div className="bl-reviews-swiper swiper">
            <div className="swiper-wrapper">
              {reviews.map((review) => (
                <div key={review.id} className="swiper-slide">
                  <article className="bl-review-card">
                    <div className="bl-review-stars" aria-label={`별점 ${review.stars}점`}>
                      {Array.from({ length: review.stars }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="bl-review-body">{review.body}</p>
                    <p className="bl-review-author">{review.author}</p>
                  </article>
                </div>
              ))}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bl-footer">
        <div className="container">
          <p className="bl-footer-logo serif">Lumière</p>
          <p className="bl-footer-tagline">Skincare · Made with Light</p>

          <div className="bl-footer-social">
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="카카오톡">
              <KakaoIcon />
            </a>
            <a href="#" aria-label="Email">
              <MailIcon />
            </a>
          </div>

          <p className="bl-footer-copy">
            Pixelmark 디자인 데모입니다. 브랜드명·인물·제품·후기는 모두 가상입니다.
            <br />© {new Date().getFullYear()} Pixelmark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ============================================================
   SVG 아이콘 컴포넌트 (inline)
   ============================================================
   [왜 별도 파일이 아닌가]
   - 이 데모 외에서 재사용 안 함
   - 외부 파일로 빼면 import 경로만 늘어나고 번들 크기 거의 동일
   - 이 섹션에 모여있어 유지보수도 쉬움
*/

const FeatureIcon = ({ type }: { type: "natural" | "clinical" | "cruelty" | "sustainable" }) => {
  switch (type) {
    case "natural":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C8 6 6 10 6 14c0 4 3 7 6 7s6-3 6-7c0-4-2-8-6-12z" />
          <path d="M12 13c-1 0-2 1-2 2" />
        </svg>
      )
    case "clinical":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 2v6l-4 8a4 4 0 0 0 4 6h6a4 4 0 0 0 4-6l-4-8V2" />
          <path d="M9 2h6" />
        </svg>
      )
    case "cruelty":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="14" r="6" />
          <path d="M8 8L6 4M16 8l2-4M5 12l-2-2M19 12l2-2" />
        </svg>
      )
    case "sustainable":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 2v8l6 4" />
        </svg>
      )
  }
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4C7 4 3 7 3 11c0 2.5 1.5 4.7 4 6l-1 4 4.5-2.5c.5.1 1 .1 1.5.1 5 0 9-3 9-7s-4-7-9-7z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)
