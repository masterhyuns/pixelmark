import { useEffect, useRef } from "react"
import type { Route } from "./+types/law-office.contact"
import { initForm } from "~/demos/law-office/modules/form"
import { initModal } from "~/demos/law-office/modules/modal"

/**
 * S-2 Law Office — 상담 예약 페이지
 *
 * [구성]
 * - 페이지 헤더
 * - 좌: 상담 신청 폼 (이름/연락처/분야/내용/동의 + 제출 모달)
 * - 우: 사이드 정보 (운영시간/전화/이메일/주소) + 지도
 *
 * [form + modal 모듈 이 페이지에서만 init]
 */

export const meta: Route.MetaFunction = () => [
  { title: "상담 예약 | Aurea 법률사무소 — Pixelmark Demo" },
  { name: "description", content: "Aurea 법률사무소 상담 예약 디자인 데모. 가상 브랜드이며 실제 상담을 접수하지 않습니다." },
]

export default function LawOfficeContact() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    // form → modal 순서 (form이 모달을 열고, modal이 닫기 처리)
    const cleanupForm = initForm(root)
    const cleanupModal = initModal(root)
    return () => {
      cleanupModal()
      cleanupForm()
    }
  }, [])

  return (
    <div ref={ref}>
      <div className="lo-page-header">
        <div className="lo-container">
          <p className="lo-page-header-eyebrow">Contact</p>
          <h1>무료 상담 예약</h1>
          <p>아래 양식을 작성해 주시면 빠르게 연락드리겠습니다. 첫 상담은 무료입니다.</p>
        </div>
      </div>

      <section className="lo-contact-section">
        <div className="lo-container">
          <div className="lo-contact-grid">
            {/* 폼 카드 */}
            <div className="lo-contact-form-card">
              <h2>상담 신청</h2>
              <p className="lo-contact-form-lead">
                모든 내용은 비밀로 유지되며, 상담 목적 외에는 사용되지 않습니다.
              </p>

              <form className="lo-form" noValidate>
                {/* 이름 + 연락처 가로 2열 */}
                <div className="lo-form-group lo-form-group--row">
                  <div className="lo-form-field" data-field="name">
                    <label className="lo-form-label" htmlFor="lo-field-name">
                      이름 <span className="lo-form-required">*</span>
                    </label>
                    <input
                      id="lo-field-name"
                      type="text"
                      name="name"
                      className="lo-form-input"
                      placeholder="홍길동"
                      autoComplete="name"
                    />
                    <p className="lo-form-error" aria-live="polite" />
                  </div>

                  <div className="lo-form-field" data-field="phone">
                    <label className="lo-form-label" htmlFor="lo-field-phone">
                      연락처 <span className="lo-form-required">*</span>
                    </label>
                    <input
                      id="lo-field-phone"
                      type="tel"
                      name="phone"
                      className="lo-form-input"
                      placeholder="010-1234-5678"
                      autoComplete="tel"
                    />
                    <p className="lo-form-error" aria-live="polite" />
                  </div>
                </div>

                {/* 분야 */}
                <div className="lo-form-field" data-field="category">
                  <label className="lo-form-label" htmlFor="lo-field-category">
                    상담 분야 <span className="lo-form-required">*</span>
                  </label>
                  <select
                    id="lo-field-category"
                    name="category"
                    className="lo-form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      분야를 선택해주세요
                    </option>
                    <option value="civil">민사 소송</option>
                    <option value="criminal">형사 사건</option>
                    <option value="family">가사 사건</option>
                    <option value="real-estate">부동산</option>
                    <option value="other">기타</option>
                  </select>
                  <p className="lo-form-error" aria-live="polite" />
                </div>

                {/* 문의 내용 */}
                <div className="lo-form-field" data-field="message">
                  <label className="lo-form-label" htmlFor="lo-field-message">
                    문의 내용 <span className="lo-form-required">*</span>
                  </label>
                  <textarea
                    id="lo-field-message"
                    name="message"
                    className="lo-form-textarea"
                    placeholder="상담받고자 하는 내용을 간단히 알려주세요. (10자 이상)"
                    rows={6}
                  />
                  <p className="lo-form-error" aria-live="polite" />
                </div>

                {/* 개인정보 동의 */}
                <div className="lo-form-field" data-field="consent">
                  <label className="lo-form-consent">
                    <input type="checkbox" name="consent" />
                    <span>
                      상담 목적의 <a href="#">개인정보 수집·이용</a>에 동의합니다.{" "}
                      <span className="lo-form-required">*</span>
                    </span>
                  </label>
                  <p className="lo-form-error" aria-live="polite" />
                </div>

                <button type="submit" className="lo-btn lo-btn--cta lo-form-submit">
                  무료 상담 신청하기
                </button>
              </form>
            </div>

            {/* 사이드 정보 */}
            <aside className="lo-contact-info">
              <div className="lo-contact-info-card">
                <h3>운영 정보</h3>
                <div className="lo-contact-info-list">
                  <div className="lo-contact-info-item">
                    <div className="lo-contact-info-icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" />
                      </svg>
                    </div>
                    <div>
                      <p className="lo-contact-info-label">운영시간</p>
                      <p className="lo-contact-info-value">
                        평일 09:00 — 18:00<br />주말·공휴일 휴무
                      </p>
                    </div>
                  </div>

                  <div className="lo-contact-info-item">
                    <div className="lo-contact-info-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="lo-contact-info-label">전화</p>
                      <p className="lo-contact-info-value">02-000-1234</p>
                    </div>
                  </div>

                  <div className="lo-contact-info-item">
                    <div className="lo-contact-info-icon">
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </div>
                    <div>
                      <p className="lo-contact-info-label">이메일</p>
                      <p className="lo-contact-info-value">contact@example.com</p>
                    </div>
                  </div>

                  <div className="lo-contact-info-item">
                    <div className="lo-contact-info-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="lo-contact-info-label">주소</p>
                      <p className="lo-contact-info-value">
                        서울시 서초구 서초대로 123<br />Aurea빌딩 5층
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lo-contact-map">
                <iframe
                  src="https://map.kakao.com/?urlX=502600&urlY=1106500&urlLevel=3&itemId=&q=%EC%84%9C%EC%B4%88%EB%8F%99"
                  title="Aurea 법률사무소 위치 (가상)"
                  loading="lazy"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 성공 모달 */}
      <div className="lo-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="lo-modal-title">
        <div className="lo-modal">
          <div className="lo-modal-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <h2 id="lo-modal-title" className="lo-modal-title">상담 신청이 접수되었습니다</h2>
          <p className="lo-modal-body">
            영업일 기준 24시간 이내에 담당자가 연락드리겠습니다.
            빠른 확인이 필요하시면 전화(02-000-1234)로도 문의해 주세요.
          </p>
          <button type="button" className="lo-modal-close">확인</button>
        </div>
      </div>
    </div>
  )
}
