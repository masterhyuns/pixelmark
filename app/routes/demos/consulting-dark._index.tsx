import type { Route } from "./+types/consulting-dark._index"
import { firm, home } from "~/demos/consulting-dark/data/content"

import heroUrl from "~/demos/consulting-dark/assets/images/home/hero.webp"
import strategyUrl from "~/demos/consulting-dark/assets/images/home/service-strategy.webp"
import operationsUrl from "~/demos/consulting-dark/assets/images/home/service-operations.webp"
import digitalUrl from "~/demos/consulting-dark/assets/images/home/service-digital.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Northgate Consulting — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 B2B 컨설팅 디자인 데모. 가상 펌 'Northgate Consulting'이며 실존 회사와 무관합니다.",
  },
]

const SERVICE_IMAGES: Record<"strategy" | "operations" | "digital" | "ma", string> = {
  strategy: strategyUrl,
  operations: operationsUrl,
  digital: digitalUrl,
  ma: strategyUrl,
}

export default function ConsultingDarkHome() {
  return (
    <>
      <section className="cdk-hero">
        <div className="cdk-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />
        <div className="cdk-container cdk-hero-inner">
          <div data-cdk-reveal>
            <span className="cdk-eyebrow cdk-hero-eyebrow">{home.hero.eyebrow}</span>
            <h1 className="cdk-hero-title">{firm.name}</h1>
            <p className="cdk-hero-tagline">"{firm.tagline}" · {firm.taglineKr}</p>
            <p className="cdk-hero-body">{home.hero.body}</p>
          </div>
        </div>
      </section>

      <section className="cdk-section">
        <div className="cdk-container">
          <div className="cdk-section-head" data-cdk-reveal>
            <h2 className="cdk-section-title">{`Four\nServices.`}</h2>
            <div className="cdk-section-meta">
              <p>SERVICES · 04</p>
              <p>네 가지 서비스 영역</p>
            </div>
          </div>
          <div className="cdk-services">
            {home.services.map((s, i) => (
              <article key={s.code} className="cdk-service" data-cdk-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="cdk-service-image">
                  <img src={SERVICE_IMAGES[s.image]} alt={`${s.nameKr} (가상)`} loading="lazy" />
                </div>
                <div className="cdk-service-body">
                  <p className="cdk-service-code">№ {s.code}</p>
                  <h3 className="cdk-service-name">{s.name}</h3>
                  <p className="cdk-service-name-kr">{s.nameKr}</p>
                  <p className="cdk-service-caption">{s.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="cdk-metrics" data-cdk-reveal>
            {home.metrics.map((m) => (
              <div key={m.label} className="cdk-metric">
                <p className="cdk-metric-value">{m.value}</p>
                <p className="cdk-metric-label">{m.label}</p>
                <p className="cdk-metric-label-kr">{m.labelKr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
