import type { Route } from "./+types/coach-warm.programs"
import { programs, reviews } from "~/demos/coach-warm/data/content"

import p1 from "~/demos/coach-warm/assets/images/programs/program-01.webp"
import p2 from "~/demos/coach-warm/assets/images/programs/program-02.webp"
import p3 from "~/demos/coach-warm/assets/images/programs/program-03.webp"
import p4 from "~/demos/coach-warm/assets/images/programs/program-04.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Programs · 강의 — Aevi Studio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 코치 데모. 'Aevi Studio'의 4개 가상 코칭 프로그램 + 가상 후기 카드.",
  },
]

const PROGRAM_IMAGES: Record<"01" | "02" | "03" | "04", string> = { "01": p1, "02": p2, "03": p3, "04": p4 }

export default function CoachWarmPrograms() {
  return (
    <>
      <section className="cwm-section">
        <div className="cwm-container">
          <div className="cwm-section-head" data-cwm-reveal>
            <span className="cwm-eyebrow">Programs · 강의 카탈로그</span>
            <h2 className="cwm-section-title">Four Quiet Programs.</h2>
            <p className="cwm-section-title-kr">네 가지 코칭 프로그램</p>
          </div>

          <div className="cwm-programs">
            {programs.map((p, i) => (
              <article key={p.code} className="cwm-program" data-cwm-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="cwm-program-image">
                  <img src={PROGRAM_IMAGES[p.image]} alt={`${p.title} (가상)`} loading="lazy" />
                </div>
                <div className="cwm-program-body">
                  <p className="cwm-program-code">№ {p.code} · Program</p>
                  <h3 className="cwm-program-title">{p.title}</h3>
                  <p className="cwm-program-title-en">{p.titleEn}</p>
                  <div className="cwm-program-meta">
                    <p><strong>Duration</strong>{p.duration}</p>
                    <p><strong>Target</strong>{p.target}</p>
                  </div>
                  <p className="cwm-program-price">{p.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cwm-section" style={{ paddingTop: 0 }}>
        <div className="cwm-container">
          <div className="cwm-section-head" data-cwm-reveal>
            <span className="cwm-eyebrow">Reviews · 후기 (가상)</span>
            <h2 className="cwm-section-title">From Past Sessions.</h2>
            <p className="cwm-section-title-kr">지난 코칭에서 받은 후기들</p>
          </div>
          <div className="cwm-reviews">
            {reviews.map((r, i) => (
              <article key={i} className="cwm-review" data-cwm-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="cwm-review-quote">"{r.quote}"</p>
                <p className="cwm-review-name"><strong>{r.name}</strong> · {r.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
