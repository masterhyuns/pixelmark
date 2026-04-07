import { useEffect, useRef } from "react"
import { Link } from "react-router"
import type { Route } from "./+types/law-office.services"
import { initAccordion } from "~/demos/law-office/modules/accordion"
import { services } from "~/demos/law-office/data/content"

/**
 * S-2 Law Office — 전문 분야 페이지
 *
 * [구성]
 * - 페이지 헤더
 * - 아코디언 형태로 4개 분야 상세 (직접 구현, 열고 닫기)
 * - 각 아코디언: 분야명 + 요약 + 상세 설명 + 주요 사례 + 상담 CTA
 * - 하단 CTA
 *
 * [accordion 모듈은 이 페이지에서만 init]
 */

export const meta: Route.MetaFunction = () => [
  { title: "전문 분야 | Aurea 법률사무소 — Pixelmark Demo" },
  { name: "description", content: "Aurea 법률사무소의 민사·형사·가사·부동산 각 분야별 상세 안내. 가상 브랜드 디자인 데모입니다." },
]

export default function LawOfficeServices() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const cleanup = initAccordion(root)
    return cleanup
  }, [])

  return (
    <div ref={ref}>
      {/* 페이지 헤더 */}
      <div className="lo-page-header">
        <div className="lo-container">
          <p className="lo-page-header-eyebrow">Services</p>
          <h1>전문 분야</h1>
          <p>각 분야별 깊이 있는 경험과 맞춤형 전략으로 함께합니다.</p>
        </div>
      </div>

      {/* 아코디언 */}
      <section className="lo-services-section">
        <div className="lo-container">
          <div className="lo-services-inner">
            <div className="lo-services-lead">
              <p className="lo-section-lead">
                클릭하시면 각 분야의 상세 안내와 주요 사례를 확인하실 수 있습니다.
                궁금한 점은 언제든 무료 상담으로 문의해 주세요.
              </p>
            </div>

            <div className="lo-accordion">
              {services.map((service, i) => (
                <div key={service.key} className="lo-accordion-item">
                  <button type="button" className="lo-accordion-trigger">
                    <div className="lo-accordion-label">
                      <span className="lo-accordion-number">{String(i + 1).padStart(2, "0")}</span>
                      <div className="lo-accordion-title-wrap">
                        <p className="lo-accordion-title">{service.title}</p>
                        <p className="lo-accordion-summary">{service.summary}</p>
                      </div>
                    </div>
                    <span className="lo-accordion-chevron" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <div className="lo-accordion-content">
                    <div className="lo-accordion-content-inner">
                      <p className="lo-accordion-desc">{service.description}</p>
                      <ul className="lo-accordion-cases">
                        {service.cases.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                      <Link to="/demos/law-office/contact" className="lo-btn lo-btn--cta">
                        이 분야 상담 예약
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lo-services-cta">
              <p>원하시는 분야가 명확하지 않으셔도 괜찮습니다. 상담에서 함께 정리해 드립니다.</p>
              <Link to="/demos/law-office/contact" className="lo-btn lo-btn--primary">
                무료 상담 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
