import type { Route } from "./+types/food-magazine.story"
import { story, stores, venue } from "~/demos/food-magazine/data/content"

import farmUrl from "~/demos/food-magazine/assets/images/story/story-farm.webp"
import processUrl from "~/demos/food-magazine/assets/images/story/story-process.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Our Story · 우리 이야기 — Verde Provisions Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 식품 매거진 데모. 가상 브랜드 'Verde Provisions'의 농장 / 부엌 / 매장 안내 매거진 스프레드.",
  },
]

const SPREAD_IMAGES: Record<"farm" | "process", string> = {
  farm: farmUrl,
  process: processUrl,
}

export default function FoodMagazineStory() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="fmag-story-hero">
        <div className="fmag-container">
          <div className="fmag-story-hero-eyebrow">
            <span className="fmag-eyebrow">{story.eyebrow}</span>
            <span className="fmag-eyebrow-kr">{story.eyebrowKr}</span>
          </div>
          <h1 className="fmag-story-title">{story.titleKr}</h1>
        </div>
      </section>

      {/* ===== Spreads ===== */}
      {story.spreads.map((s) => (
        <section key={s.label} className="fmag-spread">
          <div className="fmag-container">
            <div className="fmag-spread-grid">
              <div className="fmag-spread-image" data-fmag-reveal>
                <img src={SPREAD_IMAGES[s.image]} alt={`${s.title} (가상)`} loading="lazy" />
              </div>
              <div className="fmag-spread-text" data-fmag-reveal>
                <p className="fmag-spread-label">{s.label}</p>
                <p className="fmag-spread-label-kr">{s.labelKr}</p>
                <h2 className="fmag-spread-title">{s.title}</h2>
                <p className="fmag-spread-title-en">{s.titleEn}</p>
                <div className="fmag-spread-body">
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== Stores ===== */}
      <section className="fmag-stores">
        <div className="fmag-container">
          <div className="fmag-section-head" data-fmag-reveal>
            <h2 className="fmag-section-title">{`Where\nto Find Us`}</h2>
            <div className="fmag-section-meta">
              <p>STORES · 02</p>
              <p>매장 안내</p>
            </div>
          </div>
          <div className="fmag-stores-grid">
            {stores.map((s) => (
              <article key={s.nameEn} className="fmag-store" data-fmag-reveal>
                <h3 className="fmag-store-name">{s.name}</h3>
                <p className="fmag-store-name-en">{s.nameEn}</p>
                <p className="fmag-store-row"><strong>Address · 주소</strong>{s.address}</p>
                <p className="fmag-store-row"><strong>Hours · 운영시간</strong>{s.hours}</p>
              </article>
            ))}
          </div>
          <div className="fmag-stores-map" data-fmag-reveal>
            <iframe src={venue.mapEmbedSrc} title="Verde Provisions 매장 위치 지도" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  )
}
