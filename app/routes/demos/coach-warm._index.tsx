import type { Route } from "./+types/coach-warm._index"
import { studio, about } from "~/demos/coach-warm/data/content"

import heroUrl from "~/demos/coach-warm/assets/images/about/hero.webp"
import coachingUrl from "~/demos/coach-warm/assets/images/about/field-coaching.webp"
import workshopUrl from "~/demos/coach-warm/assets/images/about/field-workshop.webp"
import mentoringUrl from "~/demos/coach-warm/assets/images/about/field-mentoring.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Aevi Studio · Quiet Coaching — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 강사 / 코치 퍼스널 브랜드 디자인 데모. 가상 스튜디오 'Aevi Studio'이며 실존 인물과 무관합니다.",
  },
]

const FIELD_IMAGES: Record<"coaching" | "workshop" | "mentoring", string> = {
  coaching: coachingUrl,
  workshop: workshopUrl,
  mentoring: mentoringUrl,
}

export default function CoachWarmAbout() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="cwm-hero">
        <div className="cwm-container">
          <div className="cwm-hero-grid">
            <div data-cwm-reveal>
              <span className="cwm-eyebrow cwm-hero-eyebrow">{about.hero.eyebrow}</span>
              <h1 className="cwm-hero-name">{studio.name}</h1>
              <p className="cwm-hero-tagline">"{studio.tagline}"<br />· {studio.taglineKr}</p>
              <p className="cwm-hero-body">{about.hero.body}</p>
            </div>
            <div className="cwm-hero-image" data-cwm-reveal>
              <img src={heroUrl} alt="Aevi Studio 작업실 (가상)" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bio ===== */}
      <section className="cwm-section" style={{ paddingTop: 0 }}>
        <div className="cwm-container">
          <div className="cwm-bio" data-cwm-reveal>
            <span className="cwm-eyebrow">{about.bio.eyebrow}</span>
            <h2 className="cwm-section-title">{about.bio.title}</h2>
            <p className="cwm-section-title-kr">{about.bio.titleKr}</p>
            {about.bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="cwm-fields">
            {about.fields.map((f, i) => (
              <article key={f.label} className="cwm-field" data-cwm-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="cwm-field-image">
                  <img src={FIELD_IMAGES[f.image]} alt={`${f.labelKr} (가상)`} loading="lazy" />
                </div>
                <div className="cwm-field-body">
                  <p className="cwm-field-label">{f.label}</p>
                  <h3 className="cwm-field-name">{f.labelKr}</h3>
                  <p className="cwm-field-caption">{f.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
