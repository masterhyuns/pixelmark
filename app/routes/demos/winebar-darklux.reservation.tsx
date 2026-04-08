import type { Route } from "./+types/winebar-darklux.reservation"
import { reservation } from "~/demos/winebar-darklux/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "Reservation · 예약 — Verres Noirs Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 다크 럭셔리 와인바 데모. 'Verres Noirs'의 예약 정책 / 영업시간 / 위치 안내.",
  },
]

export default function WinebarReservation() {
  return (
    <section className="wbd-section">
      <div className="wbd-container">
        <div className="wbd-rsv-head" data-wbd-reveal>
          <span className="wbd-eyebrow">— Reservation · 예약 안내 —</span>
          <h2 className="wbd-menu-title">Save Your Seat</h2>
        </div>

        <div className="wbd-rsv-grid">
          <div className="wbd-rsv-card" data-wbd-reveal>
            <h3>Reservation Policy · 예약 정책</h3>
            {reservation.policy.map((p, i) => <p key={i}>{p}</p>)}
            <div className="wbd-rsv-info">
              <strong>Dress Code · 드레스 코드</strong>
              <p>{reservation.dressCode}</p>
            </div>
          </div>

          <div className="wbd-rsv-card" data-wbd-reveal>
            <h3>Hours & Location · 영업시간 / 위치</h3>
            <div className="wbd-rsv-hours">
              {reservation.hoursList.map((h) => (
                <div key={h.day} className="wbd-rsv-hours-row">
                  <strong>{h.day}</strong>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
            <div className="wbd-rsv-info">
              <strong>Address · 주소</strong>
              <p>{reservation.address}</p>
              <strong>Phone · 전화</strong>
              <p>{reservation.phone}</p>
              <strong>Instagram · 인스타그램</strong>
              <p>{reservation.instagram}</p>
            </div>
          </div>
        </div>

        <div className="wbd-rsv-map" style={{ marginTop: 56 }} data-wbd-reveal>
          <iframe src={reservation.mapEmbedSrc} title="Verres Noirs 위치 지도" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
