import type { Route } from "./+types/coach-warm.contact"
import { contact, programs } from "~/demos/coach-warm/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "Contact · 문의 — Aevi Studio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 코치 데모. 'Aevi Studio'의 코칭 문의 폼 / 일정 안내 / 위치 페이지.",
  },
]

export default function CoachWarmContact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("데모 폼입니다. 실제 전송되지 않습니다.")
  }

  return (
    <section className="cwm-section">
      <div className="cwm-container">
        <div className="cwm-section-head" data-cwm-reveal>
          <span className="cwm-eyebrow">Contact · 코칭 문의</span>
          <h2 className="cwm-section-title">Say Hello, Quietly.</h2>
          <p className="cwm-section-title-kr">조용한 인사 한 통이면 충분합니다</p>
        </div>

        <div className="cwm-contact-grid">
          <div className="cwm-contact-card" data-cwm-reveal>
            <p className="cwm-contact-intro">{contact.intro}</p>
            <form className="cwm-contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cwm-name">{contact.form.nameLabel}</label>
                <input id="cwm-name" type="text" placeholder="홍길동" required />
              </div>
              <div>
                <label htmlFor="cwm-email">{contact.form.emailLabel}</label>
                <input id="cwm-email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="cwm-interest">{contact.form.interestLabel}</label>
                <select id="cwm-interest" defaultValue="">
                  <option value="" disabled>프로그램 선택</option>
                  {programs.map((p) => (
                    <option key={p.code} value={p.code}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cwm-message">{contact.form.messageLabel}</label>
                <textarea id="cwm-message" placeholder="짧게 한 문단이면 충분합니다." />
              </div>
              <button type="submit" className="cwm-contact-submit">{contact.form.submit}</button>
              <p className="cwm-contact-form-notice">{contact.form.notice}</p>
            </form>
          </div>

          <div className="cwm-info-card" data-cwm-reveal>
            {contact.hours.map((h) => (
              <div key={h.day} className="cwm-info-row">
                <strong>{h.day}</strong>
                <span>{h.time}</span>
              </div>
            ))}
            <div className="cwm-info-meta">
              <strong>주소</strong>
              <p>{contact.address}</p>
              <strong>이메일</strong>
              <p>{contact.email}</p>
              <strong>인스타그램</strong>
              <p>{contact.instagram}</p>
            </div>
          </div>
        </div>

        <div className="cwm-contact-map" data-cwm-reveal>
          <iframe src={contact.mapEmbedSrc} title="Aevi Studio 위치 지도" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
