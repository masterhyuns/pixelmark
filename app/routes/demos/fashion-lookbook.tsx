import { useEffect, useRef } from "react"
import type { Route } from "./+types/fashion-lookbook"
import "~/demos/fashion-lookbook/main.scss"
import { initLookbookSlider } from "~/demos/fashion-lookbook/modules/lookbookSlider"
import { initScrollReveal } from "~/demos/fashion-lookbook/modules/scrollReveal"
import {
  brand,
  collection,
  looks,
  stores,
  venue,
} from "~/demos/fashion-lookbook/data/content"

import heroBgUrl from "~/demos/fashion-lookbook/assets/images/hero/hero-bg.webp"
import look1Url from "~/demos/fashion-lookbook/assets/images/lookbook/look-01.webp"
import look2Url from "~/demos/fashion-lookbook/assets/images/lookbook/look-02.webp"
import look3Url from "~/demos/fashion-lookbook/assets/images/lookbook/look-03.webp"
import look4Url from "~/demos/fashion-lookbook/assets/images/lookbook/look-04.webp"
import look5Url from "~/demos/fashion-lookbook/assets/images/lookbook/look-05.webp"

/**
 * B-S1 Fashion Lookbook — 패션 브랜드 룩북
 *
 * [컨셉] "모던 미니멀 + 큰 타이포 + 풀스크린 룩북"
 * - 화이트 + 블랙 + 그레이, Inter Tight 큰 산세리프
 * - 5 섹션: Hero / Lookbook / Collection / Stores / Footer
 *
 * [시그니처] 풀스크린 룩북 슬라이더 (Pointer Events 드래그 + 키보드 + dot + counter)
 */

export const handle = { demoName: "B-S1 Fashion Lookbook" }

export const meta: Route.MetaFunction = () => [
  { title: "Noir Atelier · SS 26 — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 패션 브랜드 룩북 디자인 데모. 가상 브랜드 'Noir Atelier'이며 실존 브랜드와 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800;900&family=Inter:wght@400;500&display=swap",
  },
]

const LOOK_IMAGES = [look1Url, look2Url, look3Url, look4Url, look5Url]

export default function FashionLookbook() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initLookbookSlider(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  return (
    <div ref={rootRef} className="fashion-lookbook">
      {/* ===== 1. Hero ===== */}
      <section className="flb-hero">
        <div className="flb-hero-bg" style={{ backgroundImage: `url(${heroBgUrl})` }} aria-hidden="true" />

        <div className="flb-hero-top">
          <span>{brand.name}</span>
          <span>{brand.season}</span>
        </div>

        <div className="flb-hero-center">
          <p className="flb-hero-tag">— {brand.designer} —</p>
          <h1 className="flb-hero-name">{brand.name}</h1>
          <p className="flb-hero-tagline">"{brand.tagline}"</p>
        </div>

        <div className="flb-hero-bottom">
          <span>Spring / Summer 2026</span>
          <span className="flb-hero-scroll">scroll for lookbook ↓</span>
        </div>
      </section>

      {/* ===== 2. Lookbook (시그니처) ===== */}
      <section className="flb-lookbook">
        <header className="flb-lookbook-header">
          <h2 className="flb-lookbook-title">Lookbook<br />SS 26</h2>
          <div className="flb-lookbook-meta">
            <p>5 LOOKS</p>
            <p>{brand.season}</p>
          </div>
        </header>

        <div className="flb-lookbook-slider" data-flb-lookbook aria-roledescription="carousel" aria-label="시즌 룩북">
          <button type="button" className="flb-lookbook-prev" aria-label="이전 룩">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button type="button" className="flb-lookbook-next" aria-label="다음 룩">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="flb-lookbook-viewport">
            <div className="flb-lookbook-track">
              {looks.map((look, i) => (
                <article key={look.num} className="flb-lookbook-slide">
                  <span className="flb-lookbook-look-num">LOOK {look.num}</span>
                  <img src={LOOK_IMAGES[i]} alt={`LOOK ${look.num} — ${look.title} (가상)`} loading="lazy" draggable={false} />
                  <div className="flb-lookbook-caption">
                    <p className="flb-lookbook-caption-title">{look.title}</p>
                    <p className="flb-lookbook-caption-desc">{look.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flb-lookbook-footer">
            <p className="flb-lookbook-counter">
              <span data-flb-counter>01</span>
              <span className="flb-lookbook-counter-total">/ {String(looks.length).padStart(2, "0")}</span>
            </p>
            <div className="flb-lookbook-dots" role="tablist" aria-label="룩 인디케이터">
              {looks.map((look, i) => (
                <button
                  key={look.num}
                  type="button"
                  className={`flb-lookbook-dot${i === 0 ? " is-active" : ""}`}
                  data-index={i}
                  aria-label={`LOOK ${look.num}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Collection ===== */}
      <section className="flb-section">
        <div className="flb-container">
          <div className="flb-section-rule">
            <span>Collection / 03</span>
            <span>SS 26</span>
          </div>
          <div className="flb-collection-grid" data-flb-reveal>
            <div>
              <h2 className="flb-collection-title">{collection.title}</h2>
              <p className="flb-collection-subtitle">— {collection.subtitle} —</p>
              <div className="flb-collection-body">
                {collection.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="flb-collection-meta">
              {collection.meta.map((row) => (
                <div key={row.label} className="flb-collection-meta-row">
                  <span className="flb-collection-meta-label">{row.label}</span>
                  <span className="flb-collection-meta-value">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Stores ===== */}
      <section className="flb-section">
        <div className="flb-container">
          <div className="flb-section-rule">
            <span>Stores / 04</span>
            <span>Visit Us</span>
          </div>
          <div className="flb-stores-grid" data-flb-reveal>
            {stores.map((store) => (
              <article key={store.name} className="flb-store-card">
                <h3 className="flb-store-name">{store.nameEn}</h3>
                <p className="flb-store-address">{store.name}</p>
                <p className="flb-store-address-kr">{store.address}</p>
                <p className="flb-store-hours">— {store.hours} —</p>
              </article>
            ))}
          </div>
          <div className="flb-stores-map" data-flb-reveal>
            <iframe src={venue.mapEmbedSrc} title="Noir Atelier 매장 위치" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="flb-footer">
        <p className="flb-footer-name">{brand.name}</p>
        <p className="flb-footer-tag">{brand.tagline}</p>
        <p className="flb-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Noir Atelier'는 가상 브랜드이며, 표시된 모든 컬렉션 / 매장 / 정보는 가상이고 실존 브랜드와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
