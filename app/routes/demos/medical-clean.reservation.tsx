import type { Route } from "./+types/medical-clean.reservation"
import { reservation } from "~/demos/medical-clean/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "예약 안내 — Lumen Medical Clinic Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 의원 데모. 'Lumen Medical Clinic'의 진료 시간 / 위치 / 예약 안내 페이지.",
  },
]

export default function MedicalCleanReservation() {
  return (
    <section className="mcl-section">
      <div className="mcl-container">
        <div className="mcl-section-head" data-mcl-reveal>
          <span className="mcl-eyebrow">Reservation · 예약 안내</span>
          <h2 className="mcl-section-title">진료 시간 & 위치</h2>
          <p className="mcl-section-title-sub">{reservation.intro}</p>
        </div>

        <div className="mcl-rsv-grid">
          <div className="mcl-rsv-card" data-mcl-reveal>
            <h3>진료 시간</h3>
            {reservation.hours.map((h) => (
              <div key={h.day} className="mcl-rsv-row">
                <strong>{h.day}</strong>
                <span>{h.time}</span>
              </div>
            ))}
            <div className="mcl-rsv-info">
              <strong>주차 안내</strong>
              <p>{reservation.parking}</p>
            </div>
          </div>

          <div className="mcl-rsv-card" data-mcl-reveal>
            <h3>위치 / 연락처</h3>
            <div className="mcl-rsv-info" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
              <strong>주소</strong>
              <p>{reservation.address}</p>
              <strong>전화</strong>
              <p>{reservation.phone}</p>
              <strong>카카오톡 채널</strong>
              <p>{reservation.kakao}</p>
            </div>
          </div>
        </div>

        <div className="mcl-rsv-map" data-mcl-reveal>
          <iframe src={reservation.mapEmbedSrc} title="Lumen Medical Clinic 위치 지도" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
