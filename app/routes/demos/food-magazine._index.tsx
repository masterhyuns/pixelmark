import type { Route } from "./+types/food-magazine._index"
import { brand, home, featured } from "~/demos/food-magazine/data/content"

import heroUrl from "~/demos/food-magazine/assets/images/home/home-hero.webp"
import honeyUrl from "~/demos/food-magazine/assets/images/products/product-honey.webp"
import breadUrl from "~/demos/food-magazine/assets/images/products/product-bread.webp"
import granolaUrl from "~/demos/food-magazine/assets/images/products/product-granola.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Verde Provisions — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 식품 매거진 디자인 데모. 가상 식품 브랜드 'Verde Provisions'의 매거진형 카탈로그 홈 페이지.",
  },
]

const FEATURED_IMAGES: Record<"honey" | "bread" | "granola", string> = {
  honey: honeyUrl,
  bread: breadUrl,
  granola: granolaUrl,
}

export default function FoodMagazineHome() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="fmag-hero">
        <div className="fmag-container">
          <div className="fmag-hero-grid">
            <div data-fmag-reveal>
              <div className="fmag-hero-eyebrow">
                <span className="fmag-eyebrow">{home.heroEyebrow}</span>
                <span className="fmag-eyebrow-kr">{home.heroEyebrowKr}</span>
              </div>
              <h1 className="fmag-hero-title">{home.heroTitle}</h1>
              <p className="fmag-hero-body">{home.heroBody}</p>
              <div className="fmag-hero-meta">
                <span>EST · {brand.founded}</span>
                <span>{brand.tagline}</span>
              </div>
            </div>
            <div className="fmag-hero-image" data-fmag-reveal>
              <img src={heroUrl} alt="Verde Provisions 식료품 (가상)" loading="eager" />
              <p className="fmag-hero-image-tag">From a small farm in Gangwon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <section className="fmag-marquee" aria-hidden="true">
        <div className="fmag-marquee-inner">
          {[...home.marqueeWords, ...home.marqueeWords].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </section>

      {/* ===== Featured ===== */}
      <section className="fmag-featured">
        <div className="fmag-container">
          <div className="fmag-section-head" data-fmag-reveal>
            <h2 className="fmag-section-title">{`Featured\nThis Season`}</h2>
            <div className="fmag-section-meta">
              <p>VOL. 01 · 2026 SS</p>
              <p>이번 시즌의 식료품</p>
            </div>
          </div>
          <div className="fmag-featured-grid">
            {featured.map((f, i) => (
              <article key={f.num} className="fmag-feat-card" data-fmag-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="fmag-feat-card-num">№ {f.num}</p>
                <div className="fmag-feat-card-image">
                  <img src={FEATURED_IMAGES[f.image]} alt={`${f.title} (가상)`} loading="lazy" />
                </div>
                <h3 className="fmag-feat-card-title">{f.title}</h3>
                <p className="fmag-feat-card-title-kr">{f.titleKr}</p>
                <p className="fmag-feat-card-caption">{f.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
