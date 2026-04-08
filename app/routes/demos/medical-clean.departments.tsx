import type { Route } from "./+types/medical-clean.departments"
import { departments } from "~/demos/medical-clean/data/content"

import d1 from "~/demos/medical-clean/assets/images/departments/dept-1.webp"
import d2 from "~/demos/medical-clean/assets/images/departments/dept-2.webp"
import d3 from "~/demos/medical-clean/assets/images/departments/dept-3.webp"

export const meta: Route.MetaFunction = () => [
  { title: "진료 과목 — Lumen Medical Clinic Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 의원 데모. 'Lumen Medical Clinic'의 가상 진료 과목 안내 페이지.",
  },
]

const DEPT_IMAGES: Record<"1" | "2" | "3", string> = { "1": d1, "2": d2, "3": d3 }

export default function MedicalCleanDepartments() {
  return (
    <section className="mcl-section">
      <div className="mcl-container">
        <div className="mcl-section-head" data-mcl-reveal>
          <span className="mcl-eyebrow">Departments · 진료 과목</span>
          <h2 className="mcl-section-title">세 가지 진료를 합니다.</h2>
          <p className="mcl-section-title-sub">루멘은 1차 진료에 집중합니다. 큰 검사 / 시술이 필요한 경우는 사전에 안내드리고 큰 병원으로 의뢰합니다.</p>
        </div>
        <div className="mcl-depts">
          {departments.map((d, i) => (
            <article key={d.code} className="mcl-dept" data-mcl-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="mcl-dept-image">
                <img src={DEPT_IMAGES[d.image]} alt={`${d.nameKr} (가상)`} loading="lazy" />
              </div>
              <div className="mcl-dept-body">
                <p className="mcl-dept-code">№ {d.code} · Department</p>
                <h3 className="mcl-dept-name">{d.nameKr}</h3>
                <p className="mcl-dept-name-en">{d.name}</p>
                <p className="mcl-dept-caption">{d.caption}</p>
                <ul className="mcl-dept-points">
                  {d.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
