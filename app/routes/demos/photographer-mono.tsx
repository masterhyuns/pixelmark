import { useEffect, useRef } from "react"
import type { Route } from "./+types/photographer-mono"
import "~/demos/photographer-mono/main.scss"
import { initScrollReveal } from "~/demos/photographer-mono/modules/scrollReveal"
import { photographer, intro, series, statement, commission } from "~/demos/photographer-mono/data/content"

import introUrl from "~/demos/photographer-mono/assets/images/intro/intro-main.webp"
import s1Url from "~/demos/photographer-mono/assets/images/series/series-1-cover.webp"
import s2Url from "~/demos/photographer-mono/assets/images/series/series-2-cover.webp"
import s3Url from "~/demos/photographer-mono/assets/images/series/series-3-cover.webp"
import statementUrl from "~/demos/photographer-mono/assets/images/statement/statement-art.webp"

export const handle = { demoName: "PE-S1 Aria Voss · Photographer" }

export const meta: Route.MetaFunction = () => [
  { title: "Aria Voss · Photographer — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 사진작가 / 포토그래퍼 갤러리 디자인 데모. 가상 작가 'Aria Voss'이며 실존 인물과 무관합니다.",
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

const SERIES_IMAGES: Record<"1" | "2" | "3", string> = { "1": s1Url, "2": s2Url, "3": s3Url }

export default function PhotographerMono() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [])

  return (
    <div ref={rootRef} className="photographer-mono">
      {/* ===== Intro ===== */}
      <section className="pmn-intro">
        <div className="pmn-intro-image">
          <img src={introUrl} alt="Aria Voss signature work (가상)" loading="eager" />
        </div>
        <div className="pmn-container pmn-intro-inner">
          <div className="pmn-intro-top">
            <span>{photographer.name}</span>
            <span>{intro.eyebrow}</span>
          </div>
          <div>
            <h1 className="pmn-intro-name">{photographer.name}</h1>
            <p className="pmn-intro-tag">{photographer.tagline} · {photographer.taglineKr}</p>
          </div>
          <div className="pmn-intro-bottom">
            <span>Selected Works · 03 Series</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      {/* ===== Series ===== */}
      <section className="pmn-section">
        <div className="pmn-container">
          <div className="pmn-section-head" data-pmn-reveal>
            <h2 className="pmn-section-title">{`Selected\nSeries.`}</h2>
            <div className="pmn-section-meta">
              <p>03 SERIES · 2023 — 2025</p>
              <p>주요 시리즈</p>
            </div>
          </div>

          <div className="pmn-series-grid">
            {series.map((s) => (
              <article key={s.code} className="pmn-series-card" data-pmn-reveal>
                <div className="pmn-series-image">
                  <img src={SERIES_IMAGES[s.cover]} alt={`${s.titleKr} 시리즈 (가상)`} loading="lazy" />
                </div>
                <div className="pmn-series-text">
                  <p className="pmn-series-code">№ {s.code} · Series</p>
                  <h3 className="pmn-series-title">{s.title}</h3>
                  <p className="pmn-series-title-kr">{s.titleKr}</p>
                  <p className="pmn-series-year">— {s.year} —</p>
                  <p className="pmn-series-caption">{s.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Statement ===== */}
      <section className="pmn-section pmn-statement">
        <div className="pmn-container">
          <div className="pmn-statement-grid">
            <div className="pmn-statement-image" data-pmn-reveal>
              <img src={statementUrl} alt="Statement artwork (가상)" loading="lazy" />
            </div>
            <div className="pmn-statement-text" data-pmn-reveal>
              <span className="pmn-eyebrow">{statement.eyebrow}</span>
              <h2>{statement.titleKr}</h2>
              {statement.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Commission ===== */}
      <section className="pmn-section">
        <div className="pmn-container">
          <div className="pmn-commission-intro" data-pmn-reveal>
            <span className="pmn-eyebrow">{commission.eyebrow}</span>
            <h2>{commission.titleKr}</h2>
            <p>{commission.intro}</p>
          </div>

          <div className="pmn-fields">
            {commission.fields.map((f) => (
              <div key={f.label} className="pmn-field" data-pmn-reveal>
                <p className="pmn-field-label">{f.label}</p>
                <p className="pmn-field-name">{f.labelKr}</p>
                <p className="pmn-field-caption">{f.caption}</p>
                <p className="pmn-field-price">{f.price}</p>
              </div>
            ))}
          </div>

          <div className="pmn-process" data-pmn-reveal>
            {commission.process.map((step) => (
              <div key={step.step} className="pmn-process-step">
                <p className="pmn-process-num">№ {step.step}</p>
                <p className="pmn-process-title">{step.title}</p>
                <p className="pmn-process-caption">{step.caption}</p>
              </div>
            ))}
          </div>

          <div className="pmn-contact" data-pmn-reveal>
            <div className="pmn-contact-row">
              <strong>Email · 이메일</strong>
              <p>{commission.contactEmail}</p>
            </div>
            <div className="pmn-contact-row">
              <strong>Instagram · 인스타그램</strong>
              <p>{commission.contactInstagram}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="pmn-footer">
        <div className="pmn-container">
          <div className="pmn-footer-grid">
            <div>
              <p className="pmn-footer-name">{photographer.name}</p>
            </div>
            <div className="pmn-footer-tag">
              <p>{photographer.tagline}</p>
              <p>{photographer.taglineKr}</p>
            </div>
          </div>
          <p className="pmn-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Aria Voss'는 가상 사진작가이며, 표시된 모든 작품 / 시리즈 / 의뢰 안내는 가상이고 실존 인물과 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
