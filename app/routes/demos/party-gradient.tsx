import { useEffect, useRef } from "react"
import type { Route } from "./+types/party-gradient"
import "~/demos/party-gradient/main.scss"
import { initCountdown } from "~/demos/party-gradient/modules/countdown"
import { initScrollReveal } from "~/demos/party-gradient/modules/scrollReveal"
import { initRsvpForm } from "~/demos/party-gradient/modules/rsvpForm"
import {
  party,
  venue,
  dressCode,
  partyInfo,
  getPartyDate,
} from "~/demos/party-gradient/data/content"

import heroUrl from "~/demos/party-gradient/assets/images/hero/hero.webp"
import greetingBgUrl from "~/demos/party-gradient/assets/images/hero/greeting-bg.webp"
import dressPinkUrl from "~/demos/party-gradient/assets/images/dresscode/dress-pink.webp"
import dressBlueUrl from "~/demos/party-gradient/assets/images/dresscode/dress-blue.webp"
import dressPurpleUrl from "~/demos/party-gradient/assets/images/dresscode/dress-purple.webp"
import dressWhiteUrl from "~/demos/party-gradient/assets/images/dresscode/dress-white.webp"

/**
 * E-S5 Party Gradient — 개인 파티 초대장 데모
 *
 * [컨셉] "파스텔 그라데이션 + 글래스모피즘"
 * - 핑크 → 블루 → 퍼플 그라데이션 background-attachment fixed
 * - 글래스모피즘 카드 (backdrop-filter blur)
 * - Playfair Display 이탤릭 + Pretendard 본문
 * - 5 섹션 원페이지: Hero / Greeting / Info / Dresscode / RSVP / Footer
 *
 * [시그니처]
 * - 드레스코드 4카드 hover translateY + 컬러 칩
 * - RSVP Mock 폼 + 성공 모달
 * - 카운트다운 + 카카오맵
 */

export const handle = { demoName: "E-S5 Party Gradient" }

export const meta: Route.MetaFunction = () => [
  { title: "Selina's Birthday Party — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 개인 파티 초대장 디자인 데모. 가상 파티이며 실존 인물/장소와 무관합니다. 파스텔 그라데이션 페미닌 톤 샘플.",
  },
]

// Playfair Display + Inter
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
  },
]

const DRESS_IMAGES = {
  pink: dressPinkUrl,
  blue: dressBlueUrl,
  purple: dressPurpleUrl,
  white: dressWhiteUrl,
}

export default function PartyGradient() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initCountdown(root),
      initScrollReveal(root),
      initRsvpForm(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getPartyDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]

  return (
    <div ref={rootRef} className="party-gradient">
      {/* ===== 1. Hero ===== */}
      <section className="pg-hero">
        <div className="pg-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />
        <div className="pg-hero-inner">
          <p className="pg-eyebrow pg-hero-eyebrow">{partyInfo.dateLabel}</p>
          <h1 className="pg-hero-title">
            {party.host}'s
            <br />
            <em>{party.title}</em>
          </h1>
          <p className="pg-hero-subtitle">{`${monthName} ${date.getDate()}, ${yyyy}`}</p>
          <p className="pg-hero-tagline">{party.tagline}</p>

          <div
            className="pg-countdown"
            data-pg-countdown
            data-target={date.toISOString()}
            aria-label="파티까지 남은 시간"
          >
            <div className="pg-countdown-cell">
              <div className="pg-countdown-num" data-cd-days>00</div>
              <div className="pg-countdown-label">Days</div>
            </div>
            <div className="pg-countdown-cell">
              <div className="pg-countdown-num" data-cd-hours>00</div>
              <div className="pg-countdown-label">Hours</div>
            </div>
            <div className="pg-countdown-cell">
              <div className="pg-countdown-num" data-cd-minutes>00</div>
              <div className="pg-countdown-label">Minutes</div>
            </div>
            <div className="pg-countdown-cell">
              <div className="pg-countdown-num" data-cd-seconds>00</div>
              <div className="pg-countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        <div className="pg-hero-scroll" aria-hidden="true">
          <span>scroll</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 4v12M4 10l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="pg-section pg-greeting">
        <div className="pg-greeting-bg" style={{ backgroundImage: `url(${greetingBgUrl})` }} aria-hidden="true" />
        <div className="pg-container pg-container--narrow" data-pg-reveal>
          <p className="pg-eyebrow" style={{ display: "inline-flex" }}>Invitation</p>
          <h2 className="pg-section-title">You're Invited</h2>
          <p className="pg-section-sub">특별한 하루에 당신을 초대합니다</p>
          <div className="pg-greeting-body pg-prose">
            {party.greeting.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      </section>

      {/* ===== 3. Info ===== */}
      <section className="pg-section pg-info">
        <div className="pg-container">
          <div data-pg-reveal>
            <p className="pg-eyebrow" style={{ display: "inline-flex" }}>When &amp; Where</p>
            <h2 className="pg-section-title">Details</h2>
            <p className="pg-section-sub">일정 &amp; 장소</p>
          </div>

          <div className="pg-info-card pg-glass" data-pg-reveal>
            <p className="pg-info-date">{`${monthName} ${date.getDate()}, ${yyyy}`}</p>
            <p className="pg-info-time">{`${dayName} · ${partyInfo.timeLabel}`}</p>
            <p className="pg-info-venue">{venue.name}</p>
            <p className="pg-info-venue-kr">{venue.nameKr}</p>
            <p className="pg-info-address">{venue.address}</p>
          </div>

          <div className="pg-info-map" data-pg-reveal>
            <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== 4. Dresscode ⭐ ===== */}
      <section className="pg-section pg-dresscode">
        <div className="pg-container">
          <div data-pg-reveal>
            <p className="pg-eyebrow" style={{ display: "inline-flex" }}>Dress Code</p>
            <h2 className="pg-section-title">Pastel Dress Code</h2>
            <p className="pg-section-sub">드레스 코드</p>
          </div>
          <p className="pg-dresscode-note">{partyInfo.dressNote}</p>

          <div className="pg-dresscode-grid">
            {dressCode.map((dress, i) => (
              <article
                key={dress.color}
                className="pg-dress-card"
                data-pg-reveal
                data-stagger-index={i}
              >
                <div className="pg-dress-image">
                  <img
                    src={DRESS_IMAGES[dress.image]}
                    alt={`${dress.color} dress code sample (가상)`}
                    loading="lazy"
                  />
                </div>
                <div className="pg-dress-body">
                  <span className="pg-dress-chip">
                    <span className="pg-dress-dot" style={{ background: dress.hex }} />
                    <span className="pg-dress-color-kr">{dress.colorKr}</span>
                  </span>
                  <h3 className="pg-dress-color">{dress.color}</h3>
                  <p className="pg-dress-keyword">{dress.keyword}</p>
                  <p className="pg-dress-desc">{dress.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. RSVP ===== */}
      <section className="pg-section pg-rsvp">
        <div className="pg-container">
          <div data-pg-reveal>
            <p className="pg-eyebrow" style={{ display: "inline-flex" }}>RSVP</p>
            <h2 className="pg-section-title">Will you join?</h2>
            <p className="pg-section-sub">참석 여부 · Mock 폼</p>
          </div>

          <form className="pg-rsvp-card pg-glass pg-rsvp-form" data-pg-reveal>
            <label className="pg-rsvp-label">
              Name
              <input
                type="text"
                name="name"
                className="pg-rsvp-input"
                placeholder="Your name"
                autoComplete="off"
                required
              />
            </label>
            <label className="pg-rsvp-label">
              Attendees
              <select name="count" className="pg-rsvp-select" defaultValue="1">
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4+ people</option>
              </select>
            </label>
            <button type="submit" className="pg-btn pg-rsvp-submit">
              Send RSVP ↗
            </button>
          </form>
        </div>

        {/* 모달 */}
        <div className="pg-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="pg-rsvp-modal-title">
          <div className="pg-rsvp-modal-dialog">
            <button type="button" className="pg-rsvp-modal-close" aria-label="모달 닫기">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
            <div className="pg-rsvp-modal-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 id="pg-rsvp-modal-title" className="pg-rsvp-modal-title">Thank you!</h3>
            <p className="pg-rsvp-modal-desc">
              <strong className="pg-rsvp-modal-name">Guest</strong> 님,
              <br />
              <strong className="pg-rsvp-modal-count">1</strong>명 참석 접수되었어요. 파티에서 만나요 💌
              <br />
              <br />
              (※ 이것은 데모 폼입니다. 실제로 접수되지 않습니다.)
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="pg-footer">
        <p className="pg-footer-thanks">See you there</p>
        <p className="pg-footer-sub">{`${party.hostFull} · ${venue.name}`}</p>
        <p className="pg-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          호스트 / 장소 / 일정 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
