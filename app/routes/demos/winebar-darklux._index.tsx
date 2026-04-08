import type { Route } from "./+types/winebar-darklux._index"
import { brand, home } from "~/demos/winebar-darklux/data/content"
import heroUrl from "~/demos/winebar-darklux/assets/images/home/home-hero.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Verres Noirs · Wine Bar — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 다크 럭셔리 와인바 디자인 데모. 가상 브랜드 'Verres Noirs'이며 실존 매장과 무관합니다.",
  },
]

export default function WinebarHome() {
  return (
    <>
      <section className="wbd-hero">
        <div className="wbd-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />
        <div className="wbd-container wbd-hero-inner">
          <div className="wbd-hero-top">
            <span>{brand.name}</span>
            <span>Hannam · Seoul</span>
          </div>
          <div className="wbd-hero-center">
            <span className="wbd-hero-eyebrow">{home.eyebrow} · {home.eyebrowKr}</span>
            <h1 className="wbd-hero-name">{brand.name}</h1>
            <p className="wbd-hero-tagline">"{brand.tagline}" · {brand.taglineKr}</p>
            <p className="wbd-hero-hours">EVERY NIGHT · <strong>{brand.hours}</strong></p>
          </div>
          <div className="wbd-hero-bottom">
            <span>EST · 2024</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      <section className="wbd-section">
        <div className="wbd-container">
          <div className="wbd-greeting-grid" data-wbd-reveal>
            <span className="wbd-eyebrow">A Word from the Bar</span>
            <h2 className="wbd-greeting-title">Slow nights, dark wines.</h2>
            <div className="wbd-greeting-body">
              {home.greeting.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
