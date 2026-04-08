import type { Route } from "./+types/medical-clean.staff"
import { staff } from "~/demos/medical-clean/data/content"
import staffUrl from "~/demos/medical-clean/assets/images/staff/staff-symbol.webp"

export const meta: Route.MetaFunction = () => [
  { title: "의료진 — Lumen Medical Clinic Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 의원 데모. 'Lumen Medical Clinic'의 가상 의료진 소개 페이지.",
  },
]

export default function MedicalCleanStaff() {
  return (
    <section className="mcl-section">
      <div className="mcl-container">
        <div className="mcl-staff-grid">
          <div className="mcl-staff-image" data-mcl-reveal>
            <img src={staffUrl} alt="원장 심볼 (가상, 손/청진기 디테일)" loading="lazy" />
          </div>
          <div className="mcl-staff-text" data-mcl-reveal>
            <span className="mcl-eyebrow">{staff.eyebrow}</span>
            <h2>{staff.title}</h2>
            <p className="mcl-staff-title-kr">{staff.titleKr}</p>
            {staff.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <div className="mcl-staff-career">
              {staff.career.map((c) => (
                <div key={c.year} className="mcl-staff-career-row">
                  <strong>{c.year}</strong>
                  <span>{c.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
