import type { Route } from "./+types/consulting-dark.cases"
import { cases, principles } from "~/demos/consulting-dark/data/content"

import retailUrl from "~/demos/consulting-dark/assets/images/cases/case-retail.webp"
import manuUrl from "~/demos/consulting-dark/assets/images/cases/case-manufacturing.webp"
import financeUrl from "~/demos/consulting-dark/assets/images/cases/case-finance.webp"
import techUrl from "~/demos/consulting-dark/assets/images/cases/case-tech.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Cases · 사례 — Northgate Consulting Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 컨설팅 데모. 'Northgate Consulting'의 가상 케이스 스터디 + 일하는 원칙 페이지.",
  },
]

const CASE_IMAGES: Record<"retail" | "manufacturing" | "finance" | "tech", string> = {
  retail: retailUrl,
  manufacturing: manuUrl,
  finance: financeUrl,
  tech: techUrl,
}

export default function ConsultingDarkCases() {
  return (
    <section className="cdk-section">
      <div className="cdk-container">
        <div className="cdk-section-head" data-cdk-reveal>
          <h2 className="cdk-section-title">{`Selected\nCases.`}</h2>
          <div className="cdk-section-meta">
            <p>CASES · 04 · ALL FICTIONAL</p>
            <p>주요 가상 케이스 4건</p>
          </div>
        </div>

        <div className="cdk-cases">
          {cases.map((c, i) => (
            <article key={c.code} className="cdk-case" data-cdk-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <div className="cdk-case-image">
                <img src={CASE_IMAGES[c.image]} alt={`${c.title} (가상)`} loading="lazy" />
              </div>
              <div className="cdk-case-body">
                <p className="cdk-case-code">№ {c.code} · {c.industry}</p>
                <p className="cdk-case-industry">{c.industryKr}</p>
                <h3 className="cdk-case-title">{c.title}</h3>
                <p className="cdk-case-summary">{c.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cdk-principles" data-cdk-reveal>
          {principles.map((p) => (
            <div key={p.num} className="cdk-principle">
              <p className="cdk-principle-num">{p.num}</p>
              <p className="cdk-principle-title">{p.title}</p>
              <p className="cdk-principle-caption">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
