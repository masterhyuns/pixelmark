import { useEffect, useRef } from "react"
import type { Route } from "./+types/openhouse-arch"
import "~/demos/openhouse-arch/main.scss"
import { initScrollReveal } from "~/demos/openhouse-arch/modules/scrollReveal"
import { initRsvpForm } from "~/demos/openhouse-arch/modules/rsvpForm"
import {
  studio,
  greeting,
  spaces,
  event,
  venue,
  timeSlots,
  getOpenDate,
} from "~/demos/openhouse-arch/data/content"

import heroUrl from "~/demos/openhouse-arch/assets/images/hero/hero.webp"
import entranceUrl from "~/demos/openhouse-arch/assets/images/spaces/space-entrance.webp"
import mainUrl from "~/demos/openhouse-arch/assets/images/spaces/space-main.webp"
import meetingUrl from "~/demos/openhouse-arch/assets/images/spaces/space-meeting.webp"

/**
 * E-S10 Open House — 미니멀 아키텍처 톤 오픈하우스
 *
 * [컨셉] "콘크리트 + 타이포 + 그레이스케일"
 * - 화이트 / 블랙 / 그레이 모노톤, Space Grotesk 디스플레이
 * - 5 섹션 원페이지: Hero / About / Spaces / Visit / RSVP / Footer
 *
 * [시그니처]
 * - 공간 카드 그리드 (3개) + 그레이스케일 hover 컬러 복원
 * - 시간대 선택 RSVP Mock + 모달
 */

export const handle = { demoName: "E-S10 Open House" }

export const meta: Route.MetaFunction = () => [
  { title: "Studio Norra · Open House — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 오픈하우스 초대장 디자인 데모. 가상 스튜디오이며 실존 인물/장소와 무관합니다. 미니멀 아키텍처 톤 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap",
  },
]

const SPACE_IMAGES: Record<"entrance" | "main" | "meeting", string> = {
  entrance: entranceUrl,
  main: mainUrl,
  meeting: meetingUrl,
}

export default function OpenHouseArch() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initScrollReveal(root), initRsvpForm(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getOpenDate()
  const yyyy = date.getFullYear()
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]

  return (
    <div ref={rootRef} className="openhouse-arch">
      {/* ===== 1. Hero ===== */}
      <section className="oh-hero">
        <div className="oh-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />

        <div className="oh-hero-top">
          <span>{`${studio.name} / ${studio.tag}`}</span>
          <span>{`${yyyy} · Vol.10`}</span>
        </div>

        <div className="oh-hero-center">
          <p className="oh-hero-tag">{studio.taglineKr}</p>
          <h1 className="oh-hero-title">Open<br />House</h1>
          <p className="oh-hero-tagline">
            Studio Norra opens its doors for three days only. <br />
            Slow tour, quiet conversation, a cup of tea.
          </p>
        </div>

        <div className="oh-hero-bottom">
          <div>
            <span>Date</span>
            {`${monthShort} ${date.getDate()} — ${date.getDate() + 2} · ${yyyy}`}
          </div>
          <div>
            <span>Hours</span>
            {event.hours}
          </div>
        </div>
      </section>

      {/* ===== 2. About ===== */}
      <section className="oh-section">
        <div className="oh-container">
          <div className="oh-section-header" data-oh-reveal>
            <p className="oh-section-num">01</p>
            <div>
              <h2 className="oh-section-title">{greeting.title}</h2>
              <p className="oh-section-title-kr">{greeting.titleKr}</p>
            </div>
          </div>
          <div className="oh-about-body oh-prose" data-oh-reveal>
            {greeting.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ===== 3. Spaces ===== */}
      <section className="oh-section">
        <div className="oh-container">
          <div className="oh-section-header" data-oh-reveal>
            <p className="oh-section-num">02</p>
            <div>
              <h2 className="oh-section-title">Three Rooms, One Story</h2>
              <p className="oh-section-title-kr">세 개의 방 · 하나의 이야기</p>
            </div>
          </div>
          <div className="oh-spaces-grid">
            {spaces.map((space, i) => (
              <article key={space.code} className="oh-space-card" data-oh-reveal data-stagger-index={i}>
                <div className="oh-space-image">
                  <img src={SPACE_IMAGES[space.image]} alt={`${space.title} 공간 사진 (가상)`} loading="lazy" />
                </div>
                <div className="oh-space-meta">
                  <span className="oh-space-code">{space.code}</span>
                  <div>
                    <h3 className="oh-space-title">{space.title}</h3>
                    <span className="oh-space-title-kr">{space.titleKr}</span>
                  </div>
                  <p className="oh-space-desc">{space.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Visit ===== */}
      <section className="oh-section">
        <div className="oh-container">
          <div className="oh-section-header" data-oh-reveal>
            <p className="oh-section-num">03</p>
            <div>
              <h2 className="oh-section-title">When &amp; Where</h2>
              <p className="oh-section-title-kr">일정 &amp; 장소</p>
            </div>
          </div>
          <div className="oh-visit-grid" data-oh-reveal>
            <div className="oh-visit-info">
              <div className="oh-visit-row">
                <p className="oh-visit-label">Schedule</p>
                <p className="oh-visit-value">{event.schedule}<small>{event.scheduleKr}</small></p>
              </div>
              <div className="oh-visit-row">
                <p className="oh-visit-label">Hours</p>
                <p className="oh-visit-value">{event.hours}<small>{event.parking}</small></p>
              </div>
              <div className="oh-visit-row">
                <p className="oh-visit-label">Venue</p>
                <p className="oh-visit-value">{venue.name}<small>{venue.address}</small><small>{venue.addressKr}</small></p>
              </div>
            </div>
            <div className="oh-visit-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. RSVP ===== */}
      <section className="oh-section">
        <div className="oh-container">
          <div className="oh-section-header" data-oh-reveal>
            <p className="oh-section-num">04</p>
            <div>
              <h2 className="oh-section-title">Reserve Your Slot</h2>
              <p className="oh-section-title-kr">방문 시간 예약 · Mock 폼</p>
            </div>
          </div>

          <form className="oh-rsvp-form" data-oh-reveal>
            <label className="oh-rsvp-label">
              Name
              <input type="text" name="name" className="oh-rsvp-input" placeholder="Your name" autoComplete="off" required />
            </label>
            <div className="oh-rsvp-label">
              Time Slot
              <div className="oh-rsvp-slots" role="group" aria-label="time slot">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className="oh-rsvp-slot"
                    data-oh-slot={slot.id}
                    aria-pressed="false"
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="slot" defaultValue="" />
            </div>
            <button type="submit" className="oh-btn oh-rsvp-submit">Reserve →</button>
          </form>
        </div>

        {/* 모달 */}
        <div className="oh-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="oh-rsvp-modal-title">
          <div className="oh-rsvp-modal-dialog">
            <button type="button" className="oh-rsvp-modal-close" aria-label="모달 닫기">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
            <p className="oh-rsvp-modal-eyebrow">Confirmed</p>
            <h3 id="oh-rsvp-modal-title" className="oh-rsvp-modal-title">See You Soon</h3>
            <p className="oh-rsvp-modal-desc">
              <strong className="oh-rsvp-modal-name">Visitor</strong> 님,<br />
              <strong className="oh-rsvp-modal-slot">14:00 — 15:00</strong> 시간대로 예약 접수되었어요.
              <br /><br />
              (※ 데모 폼 — 실제 접수되지 않습니다)
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="oh-footer">
        <p className="oh-footer-thanks">Studio Norra</p>
        <p className="oh-footer-sub">{`${event.schedule} · ${event.hours}`}</p>
        <p className="oh-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          스튜디오 / 장소 / 일정 등 모든 정보는 가상이며 실제 행사 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
