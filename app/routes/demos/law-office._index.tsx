import { useEffect, useRef } from "react"
import { Link } from "react-router"
import type { Route } from "./+types/law-office._index"
import { initCountUp } from "~/demos/law-office/modules/countUp"
import { services, stats, reviews } from "~/demos/law-office/data/content"
// 히어로 이미지 (가상 대표 변호사, Vite asset import)
import homeHeroUrl from "~/demos/law-office/assets/images/hero/home-hero.webp"

/**
 * S-2 Law Office — 메인 페이지
 *
 * [섹션]
 * 1. Hero — 대표 이미지 + 핵심 메시지 + CTA
 * 2. Services 미리보기 — 4개 분야 카드 (hover 좌측 보더)
 * 3. Stats — 숫자 카운트업 (뷰포트 진입 시)
 * 4. Reviews 미리보기 — 최신 후기 3개
 * 5. CTA 배너 — 무료 상담 예약
 *
 * [countUp 모듈 초기화]
 * - 이 페이지에만 data-count 속성 사용 → 부모 layout이 아닌 이 sub-route에서 init
 * - sub-route unmount 시 cleanup
 */

export const meta: Route.MetaFunction = () => [
  { title: "Aurea 법률사무소 — 민사·형사·가사·부동산 전문 | Pixelmark Demo" },
  { name: "description", content: "Aurea 법률사무소 디자인 데모. 브랜드·인물은 모두 가상입니다. (Pixelmark Portfolio Demo)" },
]

export default function LawOfficeHome() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const cleanup = initCountUp(root)
    return cleanup
  }, [])

  // 홈에서 후기는 최신 3개만
  const featuredReviews = reviews.slice(0, 3)

  return (
    <div ref={ref}>
      {/* ===== Hero ===== */}
      <section className="lo-home-hero">
        <div className="lo-container">
          <div className="lo-home-hero-inner">
            <div className="lo-home-hero-text">
              <span className="lo-section-eyebrow">Aurea 법률사무소</span>
              <h1>
                신뢰할 수 있는
                <br />
                <span className="lo-home-hero-highlight">법률 파트너</span>
              </h1>
              <p className="lo-home-hero-lead">
                민사, 형사, 가사, 부동산. 15년 경력의 전문 변호사가 의뢰인의 입장에서
                최선의 결과를 만들어냅니다. 첫 상담은 무료입니다.
              </p>
              <div className="lo-home-hero-actions">
                <Link to="/demos/law-office/contact" className="lo-btn lo-btn--cta">
                  무료 상담 예약
                </Link>
                <Link to="/demos/law-office/services" className="lo-btn lo-btn--ghost">
                  전문 분야 보기
                </Link>
              </div>
            </div>

            <div className="lo-home-hero-image">
              <img
                src={homeHeroUrl}
                alt="Aurea 법률사무소 대표 변호사 (가상)"
                loading="eager"
              />
              <div className="lo-home-hero-badge">
                <p className="lo-home-hero-badge-value">15년+</p>
                <p className="lo-home-hero-badge-label">변호사 경력</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services 미리보기 ===== */}
      <section className="lo-home-services">
        <div className="lo-container">
          <div className="lo-home-section-header">
            <p className="lo-section-eyebrow">Services</p>
            <h2 className="lo-section-title">전문 분야</h2>
            <p className="lo-section-lead">
              Aurea 법률사무소는 네 가지 분야에서 깊이 있는 법률 자문과 소송 수행을 제공합니다.
            </p>
          </div>

          <div className="lo-home-services-grid">
            {services.map((service) => (
              <Link
                key={service.key}
                to="/demos/law-office/services"
                className="lo-service-card"
              >
                <div className="lo-service-card-icon">
                  <ServiceIcon type={service.key} />
                </div>
                <h3 className="lo-service-card-title">{service.title}</h3>
                <p className="lo-service-card-desc">{service.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="lo-home-stats">
        <div className="lo-container">
          <div className="lo-home-section-header">
            <p className="lo-section-eyebrow">Numbers</p>
            <h2 className="lo-section-title">숫자로 보는 Aurea 법률사무소</h2>
          </div>

          <div className="lo-home-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="lo-stat-card">
                <div className="lo-stat-value">
                  <span data-count={stat.value}>0</span>
                  {stat.suffix}
                </div>
                <p className="lo-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reviews 미리보기 ===== */}
      <section className="lo-home-reviews lo-section-alt">
        <div className="lo-container">
          <div className="lo-home-section-header">
            <p className="lo-section-eyebrow">Reviews</p>
            <h2 className="lo-section-title">의뢰인의 말씀</h2>
            <p className="lo-section-lead">실제 상담과 수임 후 남겨주신 후기입니다.</p>
          </div>

          <div className="lo-home-reviews-grid">
            {featuredReviews.map((review) => (
              <article key={review.id} className="lo-review-card">
                <div className="lo-review-top">
                  <div className="lo-review-stars" aria-label={`별점 ${review.stars}점`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                      </svg>
                    ))}
                  </div>
                  <span className="lo-review-category">{review.category}</span>
                </div>
                <h3 className="lo-review-title">{review.title}</h3>
                <p className="lo-review-body">{review.body}</p>
                <div className="lo-review-meta">
                  <span>{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="lo-home-reviews-more">
            <Link to="/demos/law-office/reviews" className="lo-btn lo-btn--ghost">
              전체 후기 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA 배너 ===== */}
      <section className="lo-home-cta">
        <div className="lo-container">
          <h2>지금 바로 무료 상담을 예약하세요</h2>
          <p>어떤 상황이든 먼저 들어보겠습니다. 연락만 주셔도 좋습니다.</p>
          <Link to="/demos/law-office/contact" className="lo-btn lo-btn--cta">
            무료 상담 예약하기
          </Link>
        </div>
      </section>
    </div>
  )
}

/** 서비스 카드 아이콘 */
const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "civil":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18M4 8h16M4 14h16" />
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      )
    case "criminal":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z" />
        </svg>
      )
    case "family":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="10" r="2.5" />
          <path d="M3 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 2-4 4-4s3 1 3 3" />
        </svg>
      )
    case "real-estate":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    default:
      return null
  }
}
