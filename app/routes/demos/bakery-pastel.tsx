import { useEffect, useRef } from "react"
import type { Route } from "./+types/bakery-pastel"
import "~/demos/bakery-pastel/main.scss"
import { initScrollReveal } from "~/demos/bakery-pastel/modules/scrollReveal"
import { initLightbox } from "~/demos/bakery-pastel/modules/lightbox"
import { brand, hero, about, signatures, gallery, visit } from "~/demos/bakery-pastel/data/content"

import heroBgUrl from "~/demos/bakery-pastel/assets/images/hero/hero-bg.webp"
import aboutMainUrl from "~/demos/bakery-pastel/assets/images/about/about-main.webp"
import sig1Url from "~/demos/bakery-pastel/assets/images/signature/signature-1.webp"
import sig2Url from "~/demos/bakery-pastel/assets/images/signature/signature-2.webp"
import sig3Url from "~/demos/bakery-pastel/assets/images/signature/signature-3.webp"
import g01Url from "~/demos/bakery-pastel/assets/images/gallery/gallery-01-display.webp"
import g02Url from "~/demos/bakery-pastel/assets/images/gallery/gallery-02-cake.webp"
import g03Url from "~/demos/bakery-pastel/assets/images/gallery/gallery-03-oven.webp"
import g04Url from "~/demos/bakery-pastel/assets/images/gallery/gallery-04-macarons.webp"
import g05Url from "~/demos/bakery-pastel/assets/images/gallery/gallery-05-storefront.webp"

/**
 * F-S1 Bakery Pastel — Maison Crème
 * 6 섹션: Hero / About / Signature / Gallery (마소닉 + 라이트박스) / Visit / Footer
 */

export const handle = { demoName: "F-S1 Maison Crème" }

export const meta: Route.MetaFunction = () => [
  { title: "Maison Crème · Daily Bakery — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 베이커리 / 디저트 전문점 디자인 데모. 가상 브랜드 'Maison Crème'이며 실존 매장과 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Quicksand:wght@400;500;600&display=swap",
  },
]

const SIG_IMAGES: Record<"1" | "2" | "3", string> = { "1": sig1Url, "2": sig2Url, "3": sig3Url }
const GAL_IMAGES: Record<"01" | "02" | "03" | "04" | "05", string> = {
  "01": g01Url, "02": g02Url, "03": g03Url, "04": g04Url, "05": g05Url,
}

export default function BakeryPastel() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initScrollReveal(root), initLightbox(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  return (
    <div ref={rootRef} className="bakery-pastel">
      {/* ===== Hero ===== */}
      <section className="bp-hero">
        <div className="bp-hero-bg" style={{ backgroundImage: `url(${heroBgUrl})` }} aria-hidden="true" />
        <div className="bp-container bp-hero-inner">
          <div className="bp-hero-top">
            <span>{brand.name}</span>
            <span>Hannam, Seoul</span>
          </div>
          <div className="bp-hero-center">
            <span className="bp-hero-eyebrow">{hero.eyebrow} · {hero.eyebrowKr}</span>
            <h1 className="bp-hero-name">{brand.name}</h1>
            <p className="bp-hero-tagline">"{brand.tagline}" · {brand.taglineKr}</p>
            <p className="bp-hero-body">{hero.body}</p>
          </div>
          <div className="bp-hero-bottom">
            <span>EST · 2024</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="bp-section">
        <div className="bp-container">
          <div className="bp-about-grid">
            <div className="bp-about-image" data-bp-reveal>
              <img src={aboutMainUrl} alt="Maison Crème 매장 인테리어 (가상)" loading="lazy" />
            </div>
            <div data-bp-reveal>
              <div className="bp-about-eyebrow">
                <span className="bp-eyebrow">{about.eyebrow}</span>
                <span className="bp-about-eyebrow-kr">{about.eyebrowKr}</span>
              </div>
              <h2 className="bp-section-title">{about.titleKr}</h2>
              <p className="bp-section-title-kr">{about.title.replace("\n", " ")}</p>
              <div className="bp-about-body">
                {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Signature ===== */}
      <section className="bp-section" style={{ paddingTop: 0 }}>
        <div className="bp-container">
          <div className="bp-section-head" data-bp-reveal>
            <span className="bp-eyebrow">Signature · 시그니처</span>
            <h2 className="bp-section-title" style={{ marginTop: 12 }}>{`Three\nFavorites.`}</h2>
            <p className="bp-section-title-kr">매일 만나실 수 있는 세 가지 메뉴</p>
          </div>
          <div className="bp-signature-grid">
            {signatures.map((s, i) => (
              <article key={s.code} className="bp-sig-card" data-bp-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="bp-sig-image">
                  <img src={SIG_IMAGES[s.image]} alt={`${s.nameKr} (가상)`} loading="lazy" />
                </div>
                <div className="bp-sig-body">
                  <p className="bp-sig-code">№ {s.code}</p>
                  <h3 className="bp-sig-name">{s.name}</h3>
                  <p className="bp-sig-name-kr">{s.nameKr}</p>
                  <p className="bp-sig-caption">{s.caption}</p>
                  <p className="bp-sig-price">{s.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery (마소닉 + 라이트박스) ===== */}
      <section className="bp-section bp-gallery">
        <div className="bp-container">
          <div className="bp-section-head" data-bp-reveal>
            <span className="bp-eyebrow">Gallery · 갤러리</span>
            <h2 className="bp-section-title" style={{ marginTop: 12 }}>{`A Sweet\nLittle Album.`}</h2>
            <p className="bp-section-title-kr">사진을 클릭하면 크게 볼 수 있습니다</p>
          </div>
          <div className="bp-gallery-grid">
            {gallery.map((g, i) => (
              <button
                type="button"
                key={g.code}
                className={`bp-gallery-item bp-gallery-item--${g.span}`}
                data-bp-reveal
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img src={GAL_IMAGES[g.image]} alt={`${g.caption} (가상)`} loading="lazy" />
                <span className="bp-gallery-caption">{g.caption}</span>
              </button>
            ))}
          </div>
        </div>

        {/* lightbox overlay */}
        <div className="bp-lightbox" role="dialog" aria-modal="true" aria-label="갤러리 라이트박스">
          <span className="bp-lightbox-counter">01 / 05</span>
          <button type="button" className="bp-lightbox-close" aria-label="닫기">✕</button>
          <button type="button" className="bp-lightbox-btn bp-lightbox-btn--prev" aria-label="이전">‹</button>
          <img className="bp-lightbox-image" src="" alt="" />
          <button type="button" className="bp-lightbox-btn bp-lightbox-btn--next" aria-label="다음">›</button>
        </div>
      </section>

      {/* ===== Visit ===== */}
      <section className="bp-section">
        <div className="bp-container">
          <div className="bp-section-head" data-bp-reveal>
            <span className="bp-eyebrow">Visit · 매장 안내</span>
            <h2 className="bp-section-title" style={{ marginTop: 12 }}>{`Come Visit Us.`}</h2>
            <p className="bp-section-title-kr">한남동 골목 끝 작은 가게에서</p>
          </div>
          <div className="bp-visit-grid">
            <div className="bp-visit-card" data-bp-reveal>
              {visit.hours.map((h) => (
                <div key={h.day} className="bp-visit-hours-row">
                  <strong>{h.day}</strong>
                  <span>{h.time}</span>
                </div>
              ))}
              <p className="bp-visit-notice">{visit.notice}</p>
              <div className="bp-visit-info">
                <strong>주소</strong>
                <p>{visit.address}</p>
                <strong>전화</strong>
                <p>{visit.phone}</p>
                <strong>인스타그램</strong>
                <p>{visit.instagram}</p>
              </div>
            </div>
            <div className="bp-visit-map" data-bp-reveal>
              <iframe src={visit.mapEmbedSrc} title="Maison Crème 위치 지도" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bp-footer">
        <p className="bp-footer-name">{brand.name}</p>
        <p className="bp-footer-tag">{brand.tagline} · {brand.taglineKr}</p>
        <p className="bp-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Maison Crème'는 가상 베이커리 브랜드이며, 표시된 모든 메뉴 / 가격 / 매장 / 일정은 가상이고 실존 매장과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
