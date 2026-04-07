import type { Route } from "./+types/law-office.about"
import { career } from "~/demos/law-office/data/content"
// 대표 변호사 프로필 이미지 (가상, Vite asset import)
import aboutLawyerUrl from "~/demos/law-office/assets/images/about/about-lawyer.webp"

/**
 * S-2 Law Office — 소개 페이지
 *
 * [섹션]
 * 1. 페이지 헤더 (타이틀 + 리드)
 * 2. 대표 프로필 + 타임라인 (좌 사진 / 우 정보+경력)
 * 3. 인증/자격 배지
 */

export const meta: Route.MetaFunction = () => [
  { title: "소개 | Aurea 법률사무소 — Pixelmark Demo" },
  { name: "description", content: "Aurea 법률사무소 대표 변호사와 사무소 안내. 가상 브랜드 디자인 데모입니다." },
]

export default function LawOfficeAbout() {
  return (
    <>
      {/* 페이지 헤더 */}
      <div className="lo-page-header">
        <div className="lo-container">
          <p className="lo-page-header-eyebrow">About</p>
          <h1>의뢰인의 편에 서는 법률 파트너</h1>
          <p>Aurea 법률사무소의 이야기를 소개합니다.</p>
        </div>
      </div>

      {/* 대표 프로필 + 타임라인 */}
      <section className="lo-about-profile">
        <div className="lo-container">
          <div className="lo-about-profile-inner">
            <div className="lo-about-photo">
              <img
                src={aboutLawyerUrl}
                alt="Aurea Han 변호사 (가상)"
                loading="eager"
              />
            </div>

            <div className="lo-about-info">
              <h2>Aurea Han</h2>
              <p className="lo-about-role">대표 변호사</p>

              <div className="lo-about-summary">
                <p>
                  안녕하세요, Aurea 법률사무소 대표 변호사 Aurea Han입니다. 법률은 어렵고 멀게
                  느껴지지만, 저는 의뢰인의 언어로 설명하고 의뢰인의 입장에서 해결책을
                  찾는 것을 원칙으로 삼습니다.
                </p>
                <p>
                  15년간 민사·형사·가사·부동산 분야에서 다양한 사건을 수행하며 쌓은
                  경험을 바탕으로, 단순히 법리만 다투는 것이 아니라 의뢰인의 삶 전반을
                  고려한 전략을 제시하고 있습니다.
                </p>
                <p>
                  첫 상담은 언제나 무료입니다. 어려운 상황일수록 혼자 고민하지 마시고,
                  먼저 저에게 이야기해 주세요.
                </p>
              </div>

              <ol className="lo-about-timeline">
                {career.map((item) => (
                  <li key={item.period} className="lo-timeline-item">
                    <p className="lo-timeline-period">{item.period}</p>
                    <p className="lo-timeline-title">{item.title}</p>
                    <p className="lo-timeline-desc">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 인증/자격 */}
      <section className="lo-about-credentials">
        <div className="lo-container">
          <div className="lo-home-section-header">
            <p className="lo-section-eyebrow">Credentials</p>
            <h2 className="lo-section-title">자격 및 인증</h2>
            <p className="lo-section-lead">대한변호사협회 정회원이며 다양한 전문 자격을 보유하고 있습니다.</p>
          </div>

          <ul className="lo-credentials-list">
            <li>
              <div className="lo-credential-mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="none" />
                </svg>
              </div>
              <p className="lo-credential-name">대한변호사협회</p>
            </li>
            <li>
              <div className="lo-credential-mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 12l2 2 5-5" />
                </svg>
              </div>
              <p className="lo-credential-name">서울지방변호사회</p>
            </li>
            <li>
              <div className="lo-credential-mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
              </div>
              <p className="lo-credential-name">민사전문 등록</p>
            </li>
            <li>
              <div className="lo-credential-mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" />
                </svg>
              </div>
              <p className="lo-credential-name">형사전문 등록</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
