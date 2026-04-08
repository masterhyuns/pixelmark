import type { Route } from "./+types/consulting-dark.contact"
import { contact } from "~/demos/consulting-dark/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "Contact · 문의 — Northgate Consulting Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 컨설팅 데모. 'Northgate Consulting'의 프로젝트 문의 폼 / 위치 / 운영 시간 안내.",
  },
]

export default function ConsultingDarkContact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("데모 폼입니다. 실제 전송되지 않습니다.")
  }

  return (
    <section className="cdk-section">
      <div className="cdk-container">
        <div className="cdk-section-head" data-cdk-reveal>
          <h2 className="cdk-section-title">{`Begin a\nProject.`}</h2>
          <div className="cdk-section-meta">
            <p>INTAKE FORM · MOCK</p>
            <p>프로젝트 문의 (가상 폼)</p>
          </div>
        </div>

        <p style={{ maxWidth: 760, marginBottom: 56, color: "var(--cdk-text-soft)" }} data-cdk-reveal>{contact.intro}</p>

        <div className="cdk-contact-grid">
          <form className="cdk-contact-form" onSubmit={handleSubmit} data-cdk-reveal>
            <div>
              <label htmlFor="cdk-company">회사명</label>
              <input id="cdk-company" type="text" placeholder="○○ Corporation" required />
            </div>
            <div>
              <label htmlFor="cdk-name">담당자 성함</label>
              <input id="cdk-name" type="text" placeholder="홍길동" required />
            </div>
            <div>
              <label htmlFor="cdk-email">이메일</label>
              <input id="cdk-email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="cdk-message">프로젝트 개요 (한 문단)</label>
              <textarea id="cdk-message" placeholder="회사 / 풀고자 하는 한 가지 문제 / 희망 일정" />
            </div>
            <button type="submit" className="cdk-contact-submit">Send Inquiry · 문의 보내기</button>
            <p className="cdk-contact-form-notice">※ 데모 폼 — 실제 전송되지 않습니다.</p>
          </form>

          <div className="cdk-contact-info-card" data-cdk-reveal>
            {contact.hours.map((h) => (
              <div key={h.day} className="cdk-info-row">
                <strong>{h.day}</strong>
                <span>{h.time}</span>
              </div>
            ))}
            <div className="cdk-info-meta">
              <strong>주소</strong>
              <p>{contact.address}</p>
              <strong>이메일</strong>
              <p>{contact.email}</p>
              <strong>전화</strong>
              <p>{contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="cdk-contact-map" data-cdk-reveal>
          <iframe src={contact.mapEmbedSrc} title="Northgate Consulting 위치 지도" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
