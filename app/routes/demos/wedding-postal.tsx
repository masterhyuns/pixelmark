import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-postal"
import "~/demos/wedding-postal/main.scss"
import { initEnvelopeOpen } from "~/demos/wedding-postal/modules/envelopeOpen"
import { initScrollReveal } from "~/demos/wedding-postal/modules/scrollReveal"
import {
  couple,
  envelope,
  letter,
  postcards,
  venue,
  getWeddingDate,
} from "~/demos/wedding-postal/data/content"

import p1Url from "~/demos/wedding-postal/assets/images/postcards/postcard-01.webp"
import p2Url from "~/demos/wedding-postal/assets/images/postcards/postcard-02.webp"
import p3Url from "~/demos/wedding-postal/assets/images/postcards/postcard-03.webp"
import p4Url from "~/demos/wedding-postal/assets/images/postcards/postcard-04.webp"

/**
 * E-S17 Wedding Postal — 우편 청첩장
 *
 * [컨셉] "빈티지 우편 + 봉투 오픈 + 손글씨 편지"
 * - 크라프트 + 잉크 + 우표 빨강 + 항공우편 블루
 * - Caveat 손글씨 + Cormorant Garamond
 * - 5 섹션: Envelope / Letter / Postcards / Destination / Footer
 *
 * [시그니처]
 * - 봉투 오픈 인터랙션 (자동 열림 + 클릭 토글, flap rotateX + 편지 슬라이드업)
 * - 항공우편 빨강·파랑 보더 (repeating-linear-gradient)
 * - 손글씨 편지 본문 (Caveat 폰트)
 */

export const handle = { demoName: "E-S17 Wedding Postal" }

export const meta: Route.MetaFunction = () => [
  { title: "Amélie & Léo · A Letter for You — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 우편 청첩장 디자인 데모. 가상 커플이며 실존 인물/장소와 무관합니다. 빈티지 항공우편 컨셉 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap",
  },
]

const POSTCARD_IMAGES: Record<"01" | "02" | "03" | "04", string> = {
  "01": p1Url,
  "02": p2Url,
  "03": p3Url,
  "04": p4Url,
}

export default function WeddingPostal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initEnvelopeOpen(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const monthFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]
  const dayFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]

  return (
    <div ref={rootRef} className="wedding-postal">
      {/* ===== 1. Envelope ===== */}
      <section className="wpost-envelope-section">
        <div className="wpost-envelope" role="button" tabIndex={0} aria-label="봉투 열기">
          <div className="wpost-envelope-body">
            <div className="wpost-envelope-addresses">
              <div className="wpost-envelope-addr">
                <p className="wpost-envelope-addr-label">From</p>
                {envelope.from.name}<br />
                {envelope.from.address}
              </div>
              <div className="wpost-envelope-addr wpost-envelope-addr--to">
                <p className="wpost-envelope-addr-label">To</p>
                {envelope.to.name}<br />
                {envelope.to.address}
              </div>
            </div>
            <div className="wpost-stamp" aria-hidden="true">
              <div className="wpost-stamp-inner">
                <span className="wpost-stamp-mark">PAR<br />AVION</span>
                <span className="wpost-stamp-icon">A&amp;L</span>
              </div>
            </div>
          </div>
          <div className="wpost-envelope-flap" aria-hidden="true" />
          <div className="wpost-letter">
            <p className="wpost-letter-greeting">{letter.greeting}</p>
            <div className="wpost-letter-line" />
            <div className="wpost-letter-line" />
            <div className="wpost-letter-line" />
            <p className="wpost-letter-tease">— click to open / tap to fold —</p>
          </div>
        </div>
        <p className="wpost-envelope-hint">— click the envelope to open the letter —</p>
      </section>

      {/* ===== 2. Letter ===== */}
      <section className="wpost-section wpost-letter-section">
        <div className="wpost-container">
          <div className="wpost-section-header" data-wpost-reveal>
            <p className="wpost-eyebrow">— A Handwritten Letter —</p>
            <h2 className="wpost-section-title">From Us, To You</h2>
            <p className="wpost-section-title-sub">손으로 쓴 편지</p>
          </div>

          <div className="wpost-letter-card" data-wpost-reveal>
            <p className="wpost-letter-greeting-big">{letter.greeting}</p>
            <div className="wpost-letter-body">
              {letter.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="wpost-letter-signature">{letter.signature}</p>
          </div>
        </div>
      </section>

      {/* ===== 3. Postcards ===== */}
      <section className="wpost-section">
        <div className="wpost-container">
          <div className="wpost-section-header" data-wpost-reveal>
            <p className="wpost-eyebrow">— Stamps from the Road —</p>
            <h2 className="wpost-section-title">Cities We've Walked</h2>
            <p className="wpost-section-title-sub">우리가 걸었던 도시들</p>
          </div>

          <div className="wpost-postcards-grid">
            {postcards.map((p, i) => (
              <article key={p.code} className="wpost-postcard" data-wpost-reveal data-stagger-index={i}>
                <div className="wpost-postcard-image">
                  <img src={POSTCARD_IMAGES[p.image]} alt={`${p.city} postcard (가상)`} loading="lazy" />
                </div>
                <div className="wpost-postcard-meta">
                  <span className="wpost-postcard-num">№{p.code}</span>
                  <span className="wpost-postcard-city">{p.city}</span>
                  <span className="wpost-postmark">POSTED<br />A&amp;L</span>
                  <p className="wpost-postcard-caption">— {p.caption} —</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Destination ===== */}
      <section className="wpost-section wpost-destination">
        <div className="wpost-container">
          <div className="wpost-section-header" data-wpost-reveal>
            <p className="wpost-eyebrow">— Final Destination —</p>
            <h2 className="wpost-section-title">Please Come</h2>
            <p className="wpost-section-title-sub">와 주세요</p>
          </div>

          <div className="wpost-destination-grid" data-wpost-reveal>
            <div className="wpost-destination-card">
              <div className="wpost-destination-stamp">
                {`POSTED\n${monthFull.slice(0, 3).toUpperCase()} ${date.getDate()}\n${yyyy}`}
              </div>
              <p className="wpost-destination-eyebrow">— RSVP By Mail —</p>
              <h3 className="wpost-destination-name">{venue.name}</h3>
              <p className="wpost-destination-name-kr">{venue.nameKr}</p>
              <div className="wpost-destination-row">
                <p className="wpost-destination-row-label">Date</p>
                <p className="wpost-destination-row-value">{`${monthFull} ${date.getDate()}, ${yyyy} · ${dayFull}`}</p>
              </div>
              <div className="wpost-destination-row">
                <p className="wpost-destination-row-label">Time</p>
                <p className="wpost-destination-row-value">14:00 sharp</p>
              </div>
              <div className="wpost-destination-row">
                <p className="wpost-destination-row-label">Address</p>
                <p className="wpost-destination-row-value">{venue.addressKr}</p>
              </div>
              <div className="wpost-destination-row">
                <p className="wpost-destination-row-label">Postcode</p>
                <p className="wpost-destination-row-value">{venue.postcode}</p>
              </div>
            </div>
            <div className="wpost-destination-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wpost-footer">
        <p className="wpost-footer-thanks">— With Love —</p>
        <p className="wpost-footer-sub">{`${couple.bride} & ${couple.groom} · ${venue.name}`}</p>
        <p className="wpost-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          신랑신부 / 양가 부모 / 식장 / 주소 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
