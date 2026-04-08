import { useEffect, useRef } from "react"
import type { Route } from "./+types/illustrator-vivid"
import "~/demos/illustrator-vivid/main.scss"
import { initScrollReveal } from "~/demos/illustrator-vivid/modules/scrollReveal"
import { artist, hero, works, about, commission } from "~/demos/illustrator-vivid/data/content"

import heroUrl from "~/demos/illustrator-vivid/assets/images/hero/hero.webp"
import w01 from "~/demos/illustrator-vivid/assets/images/works/work-01.webp"
import w02 from "~/demos/illustrator-vivid/assets/images/works/work-02.webp"
import w03 from "~/demos/illustrator-vivid/assets/images/works/work-03.webp"
import w04 from "~/demos/illustrator-vivid/assets/images/works/work-04.webp"
import w05 from "~/demos/illustrator-vivid/assets/images/works/work-05.webp"
import w06 from "~/demos/illustrator-vivid/assets/images/works/work-06.webp"
import studioUrl from "~/demos/illustrator-vivid/assets/images/studio/studio.webp"

export const handle = { demoName: "PE-S2 Yara Lume · Illustrator" }

export const meta: Route.MetaFunction = () => [
  { title: "Yara Lume · Illustrator — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 일러스트레이터 포트폴리오 디자인 데모. 가상 작가 'Yara Lume'이며 실존 인물과 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Quicksand:wght@400;500;600;700;800&display=swap",
  },
]

const WORK_IMAGES: Record<"01" | "02" | "03" | "04" | "05" | "06", string> = {
  "01": w01, "02": w02, "03": w03, "04": w04, "05": w05, "06": w06,
}

export default function IllustratorVivid() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [])

  return (
    <div ref={rootRef} className="illustrator-vivid">
      {/* ===== Hero ===== */}
      <section className="ilv-hero">
        <div className="ilv-container">
          <div className="ilv-hero-grid">
            <div data-ilv-reveal>
              <span className="ilv-hero-eyebrow">{hero.eyebrow}</span>
              <h1 className="ilv-hero-name">
                <span>Yara</span> <span>Lume.</span>
              </h1>
              <p className="ilv-hero-tagline">{artist.tagline} · {artist.taglineKr}</p>
              <p className="ilv-hero-body">{hero.body}</p>
            </div>
            <div className="ilv-hero-image" data-ilv-reveal>
              <img src={heroUrl} alt="Yara Lume signature illustration (가상)" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Works ===== */}
      <section className="ilv-section">
        <div className="ilv-container">
          <div className="ilv-section-head" data-ilv-reveal>
            <span className="ilv-eyebrow">selected works · 작품</span>
            <h2 className="ilv-section-title">
              <span className="ilv-section-title-script">Little</span>{" "}Bright Things.
            </h2>
          </div>
          <div className="ilv-works-grid">
            {works.map((w, i) => (
              <article
                key={w.num}
                className={`ilv-work ilv-work--${w.span}`}
                data-ilv-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <img src={WORK_IMAGES[w.image]} alt={`${w.titleKr} (가상)`} loading="lazy" />
                <div className="ilv-work-overlay">
                  <p className="ilv-work-name">{w.title}</p>
                  <p className="ilv-work-meta">{w.titleKr} · {w.year} · {w.category}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="ilv-section ilv-about">
        <div className="ilv-container">
          <div className="ilv-about-grid">
            <div className="ilv-about-image" data-ilv-reveal>
              <img src={studioUrl} alt="Yara Lume 작업실 일러스트 (가상)" loading="lazy" />
            </div>
            <div className="ilv-about-text" data-ilv-reveal>
              <span className="ilv-eyebrow">{about.eyebrow}</span>
              <h2>{about.titleKr}</h2>
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Commission ===== */}
      <section className="ilv-section">
        <div className="ilv-container">
          <div className="ilv-section-head" data-ilv-reveal>
            <span className="ilv-eyebrow">{commission.eyebrow}</span>
            <h2 className="ilv-section-title">{commission.titleKr}</h2>
          </div>

          <div className="ilv-fields">
            {commission.fields.map((f) => (
              <div key={f.label} className="ilv-field" data-ilv-reveal>
                <p className="ilv-field-label">{f.label}</p>
                <p className="ilv-field-name">{f.labelKr}</p>
                <p className="ilv-field-caption">{f.caption}</p>
                <p className="ilv-field-price">{f.price}</p>
              </div>
            ))}
          </div>

          <div className="ilv-process" data-ilv-reveal>
            {commission.process.map((p) => (
              <div key={p.step} className="ilv-process-step">
                <p className="ilv-process-num">{p.step}</p>
                <p className="ilv-process-title">{p.title}</p>
                <p className="ilv-process-caption">{p.caption}</p>
              </div>
            ))}
          </div>

          <div className="ilv-contact" data-ilv-reveal>
            <p className="ilv-contact-title">say hi! 👋</p>
            <div className="ilv-contact-rows">
              <span><small>이메일</small>{commission.contactEmail}</span>
              <span><small>인스타그램</small>{commission.contactInstagram}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="ilv-footer">
        <p className="ilv-footer-name">{artist.name}</p>
        <p className="ilv-footer-tag">{artist.tagline} · {artist.taglineKr}</p>
        <p className="ilv-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Yara Lume'은 가상 일러스트레이터이며, 표시된 모든 작품 / 의뢰 안내 / 가격은 가상이고 실존 인물과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
