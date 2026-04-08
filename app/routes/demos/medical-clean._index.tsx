import type { Route } from "./+types/medical-clean._index"
import { NavLink } from "react-router"
import { clinic, home } from "~/demos/medical-clean/data/content"
import heroUrl from "~/demos/medical-clean/assets/images/home/home-hero.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Lumen Medical Clinic — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 병원 / 의원 디자인 데모. 가상 의원 'Lumen Medical Clinic'이며 실존 의원과 무관합니다.",
  },
]

export default function MedicalCleanHome() {
  return (
    <>
      <section className="mcl-hero">
        <div className="mcl-container">
          <div className="mcl-hero-grid">
            <div data-mcl-reveal>
              <span className="mcl-eyebrow mcl-hero-eyebrow">{home.hero.eyebrow}</span>
              <h1 className="mcl-hero-title">{clinic.nameKr}</h1>
              <p className="mcl-hero-tagline">"{clinic.tagline}" · {clinic.taglineKr}</p>
              <p className="mcl-hero-body">{home.hero.body}</p>
              <NavLink to="/demos/medical-clean/reservation" className="mcl-hero-cta">
                진료 예약 안내 →
              </NavLink>
            </div>
            <div className="mcl-hero-image" data-mcl-reveal>
              <img src={heroUrl} alt="Lumen Medical Clinic 대기실 (가상)" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      <section className="mcl-section">
        <div className="mcl-container">
          <div className="mcl-section-head" data-mcl-reveal>
            <span className="mcl-eyebrow">{home.signature.eyebrow}</span>
            <h2 className="mcl-section-title">{home.signature.title}</h2>
            <p className="mcl-section-title-sub">
              {home.signature.paragraphs[0]}
            </p>
          </div>

          <div className="mcl-features">
            {home.features.map((f, i) => (
              <div key={f.title} className="mcl-feature" data-mcl-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="mcl-feature-icon">{f.icon}</div>
                <p className="mcl-feature-title">{f.title}</p>
                <p className="mcl-feature-caption">{f.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
