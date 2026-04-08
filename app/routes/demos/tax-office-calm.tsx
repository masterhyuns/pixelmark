import { useEffect, useRef } from "react"
import type { Route } from "./+types/tax-office-calm"
import "~/demos/tax-office-calm/main.scss"
import { initScrollReveal } from "~/demos/tax-office-calm/modules/scrollReveal"
import { office, hero, services, about, cases, pricing, resources, contact } from "~/demos/tax-office-calm/data/content"

import heroUrl from "~/demos/tax-office-calm/assets/images/hero/hero.webp"

export const handle = { demoName: "P-S2 Cinder Tax & Accounting" }

export const meta: Route.MetaFunction = () => [
  { title: "Cinder Tax & Accounting — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 세무사 / 회계사 사무소 디자인 데모. 가상 사무소 'Cinder Tax & Accounting'이며 실존 사무소와 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
  },
]

export default function TaxOfficeCalm() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("데모 폼입니다. 실제 전송되지 않습니다.")
  }

  return (
    <div ref={rootRef} className="tax-office-calm">
      {/* ===== Hero ===== */}
      <section className="tax-hero">
        <div className="tax-container">
          <div className="tax-hero-grid">
            <div data-tax-reveal>
              <span className="tax-eyebrow tax-hero-eyebrow">{hero.eyebrow}</span>
              <h1 className="tax-hero-name">{office.nameKr}</h1>
              <p className="tax-hero-tagline">"{office.tagline}" · {office.taglineKr}</p>
              <p className="tax-hero-body">{hero.body}</p>
              <div className="tax-hero-meta">
                <span>{office.founded}</span>
                <span>한 달 신규 의뢰 3건</span>
              </div>
            </div>
            <div className="tax-hero-image" data-tax-reveal>
              <img src={heroUrl} alt="Cinder Tax 사무실 (가상)" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="tax-section">
        <div className="tax-container">
          <div className="tax-section-head" data-tax-reveal>
            <span className="tax-eyebrow">Services · 업무 안내</span>
            <h2 className="tax-section-title">여섯 가지 업무를 합니다.</h2>
            <p className="tax-section-sub">큰 컨설팅이 아니라, 매월의 숫자를 정리하는 데 가장 많은 시간을 씁니다.</p>
          </div>
          <div className="tax-services">
            {services.map((s, i) => (
              <article key={s.code} className="tax-service" data-tax-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <p className="tax-service-code">№ {s.code}</p>
                <h3 className="tax-service-name">{s.name}</h3>
                <p className="tax-service-name-en">{s.nameEn}</p>
                <p className="tax-service-caption">{s.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="tax-section tax-about">
        <div className="tax-container">
          <div className="tax-about-grid">
            <div className="tax-about-text" data-tax-reveal>
              <span className="tax-eyebrow">{about.eyebrow}</span>
              <h2>{about.titleKr}</h2>
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="tax-career" data-tax-reveal>
              <h3>경력 (가상)</h3>
              {about.career.map((c) => (
                <div key={c.year} className="tax-career-row">
                  <strong>{c.year}</strong>
                  <span>{c.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Cases ===== */}
      <section className="tax-section">
        <div className="tax-container">
          <div className="tax-section-head" data-tax-reveal>
            <span className="tax-eyebrow">Cases · 가상 이용 사례</span>
            <h2 className="tax-section-title">손님과 함께한 작은 일들.</h2>
            <p className="tax-section-sub">아래는 모두 가상 사례이며, 결과는 일반화할 수 없습니다.</p>
          </div>
          <div className="tax-cases">
            {cases.map((c, i) => (
              <article key={c.code} className="tax-case" data-tax-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="tax-case-code">№ {c.code}</span>
                <div>
                  <h3 className="tax-case-title">{c.title}</h3>
                  <p className="tax-case-desc">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section className="tax-section" style={{ paddingTop: 0 }}>
        <div className="tax-container">
          <div className="tax-section-head" data-tax-reveal>
            <span className="tax-eyebrow">Pricing · 기준 수수료 (가상)</span>
            <h2 className="tax-section-title">투명한 기준 수수료.</h2>
            <p className="tax-section-sub">매월 매출 / 직원 수 / 업종에 따라 조정될 수 있으며, 모든 수수료는 사전 견적 후 진행됩니다.</p>
          </div>
          <div className="tax-pricing" data-tax-reveal>
            {pricing.map((p) => (
              <div key={p.name} className="tax-pricing-row">
                <span className="tax-pricing-name">{p.name}</span>
                <span className="tax-pricing-price">{p.price}</span>
                <span className="tax-pricing-note">{p.note}</span>
              </div>
            ))}
          </div>
          <p className="tax-pricing-notice">"위 표는 가상 기준 수수료입니다. 실제는 사전 상담 후 결정됩니다."</p>
        </div>
      </section>

      {/* ===== Resources ===== */}
      <section className="tax-section" style={{ paddingTop: 0 }}>
        <div className="tax-container">
          <div className="tax-section-head" data-tax-reveal>
            <span className="tax-eyebrow">Resources · 자료 다운로드 (Mock)</span>
            <h2 className="tax-section-title">미리 보면 도움 될 자료들.</h2>
          </div>
          <div className="tax-resources">
            {resources.map((r, i) => (
              <article key={r.code} className="tax-resource" data-tax-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="tax-resource-code">№ {r.code} · PDF</p>
                <p className="tax-resource-title">{r.title}</p>
                <p className="tax-resource-caption">{r.caption}</p>
                <p className="tax-resource-link">↓ 다운로드 (Mock)</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="tax-section tax-contact">
        <div className="tax-container">
          <div className="tax-section-head" data-tax-reveal>
            <span className="tax-eyebrow">Contact · 상담 신청</span>
            <h2 className="tax-section-title">한 통의 인사로 충분합니다.</h2>
            <p className="tax-section-sub">{contact.intro}</p>
          </div>

          <div className="tax-contact-grid">
            <form className="tax-contact-form" onSubmit={handleSubmit} data-tax-reveal>
              <div>
                <label htmlFor="tax-name">성함</label>
                <input id="tax-name" type="text" placeholder="홍길동" required />
              </div>
              <div>
                <label htmlFor="tax-email">이메일</label>
                <input id="tax-email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="tax-service">관심 업무</label>
                <select id="tax-service" defaultValue="">
                  <option value="" disabled>업무 선택</option>
                  {services.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="tax-message">짧은 메모</label>
                <textarea id="tax-message" placeholder="어떤 도움이 필요하신지 한 문단이면 충분합니다." />
              </div>
              <button type="submit" className="tax-contact-submit">{contact.form.submit}</button>
              <p className="tax-contact-form-notice">{contact.form.notice}</p>
            </form>

            <div className="tax-contact-info-card" data-tax-reveal>
              {contact.hours.map((h) => (
                <div key={h.day} className="tax-info-row">
                  <strong>{h.day}</strong>
                  <span>{h.time}</span>
                </div>
              ))}
              <div className="tax-info-meta">
                <strong>주소</strong>
                <p>{contact.address}</p>
                <strong>전화</strong>
                <p>{contact.phone}</p>
                <strong>이메일</strong>
                <p>{contact.email}</p>
              </div>
            </div>
          </div>

          <div className="tax-contact-map" data-tax-reveal>
            <iframe src={contact.mapEmbedSrc} title="Cinder Tax & Accounting 위치 지도" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="tax-footer">
        <div className="tax-container">
          <div className="tax-footer-grid">
            <div>
              <p className="tax-footer-name">{office.name}</p>
              <p className="tax-footer-tag">{office.tagline} · {office.taglineKr}</p>
            </div>
            <div className="tax-footer-tag" style={{ textAlign: "right" }}>
              <p>{office.founded}</p>
              <p>한 달 신규 의뢰 최대 3건</p>
            </div>
          </div>
          <p className="tax-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Cinder Tax & Accounting'은 가상 세무회계 사무소이며, 표시된 모든 업무 / 사례 / 수수료 / 약력은 가상이고 실존 사무소 또는 인물과 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
