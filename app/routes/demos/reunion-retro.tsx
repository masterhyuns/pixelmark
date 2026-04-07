import { useEffect, useRef } from "react"
import type { Route } from "./+types/reunion-retro"
import "~/demos/reunion-retro/main.scss"
import { initCountdown } from "~/demos/reunion-retro/modules/countdown"
import { initScrollReveal } from "~/demos/reunion-retro/modules/scrollReveal"
import { initRsvpForm } from "~/demos/reunion-retro/modules/rsvpForm"
import {
  reunion,
  greeting,
  timeline,
  venue,
  contact,
  getReunionDate,
} from "~/demos/reunion-retro/data/content"

import heroUrl from "~/demos/reunion-retro/assets/images/hero/hero.webp"
import t2005Url from "~/demos/reunion-retro/assets/images/timeline/timeline-2005.webp"
import t2010Url from "~/demos/reunion-retro/assets/images/timeline/timeline-2010.webp"
import t2015Url from "~/demos/reunion-retro/assets/images/timeline/timeline-2015.webp"
import t2020Url from "~/demos/reunion-retro/assets/images/timeline/timeline-2020.webp"

/**
 * E-S9 Reunion Retro — 동창회 초대장 데모
 *
 * [컨셉] "타자기 + 빈티지 종이 + 세피아"
 * - Special Elite (타자기) + Lora 본문 + 크림/브라운/빈티지레드
 * - 5 섹션 원페이지: Hero / Greeting / Timeline / Venue / RSVP / Footer
 *
 * [시그니처]
 * - 추억 타임라인 (2005/2010/2015/2020 4개 카드, 좌우 교차)
 * - 빈티지 스탬프형 D-day
 * - 세피아 필터 이미지
 */

export const handle = { demoName: "E-S9 Reunion Retro" }

export const meta: Route.MetaFunction = () => [
  { title: "Class of '05 Reunion — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 동창회 초대장 디자인 데모. 가상 동창회이며 실존 인물/장소와 무관합니다. 빈티지 레트로 톤 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Special+Elite&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap",
  },
]

const TIMELINE_IMAGES = [t2005Url, t2010Url, t2015Url, t2020Url]

export default function ReunionRetro() {
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

  const date = getReunionDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
  const monthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]

  return (
    <div ref={rootRef} className="reunion-retro">
      {/* ===== 1. Hero ===== */}
      <section className="rr-hero">
        <div className="rr-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />
        <div className="rr-hero-inner">
          <p className="rr-eyebrow rr-hero-eyebrow">Save the Date</p>
          <h1 className="rr-hero-title">{reunion.title}</h1>
          <p className="rr-hero-school">{reunion.subtitle}</p>
          <p className="rr-hero-school-kr">{reunion.subtitleKr}</p>
          <p className="rr-hero-slogan">{reunion.slogan}<br />— {reunion.sloganKr}</p>

          <div className="rr-hero-stamp" data-rr-countdown data-target={date.toISOString()}>
            <p className="rr-hero-stamp-label">{`${monthName} ${date.getDate()} · ${yyyy}`}</p>
            <div className="rr-hero-countdown" aria-label="동창회까지 남은 시간">
              <div className="rr-hero-cd-cell">
                <div className="rr-hero-cd-num" data-cd-days>00</div>
                <div className="rr-hero-cd-label">days</div>
              </div>
              <div className="rr-hero-cd-cell">
                <div className="rr-hero-cd-num" data-cd-hours>00</div>
                <div className="rr-hero-cd-label">hours</div>
              </div>
              <div className="rr-hero-cd-cell">
                <div className="rr-hero-cd-num" data-cd-minutes>00</div>
                <div className="rr-hero-cd-label">min</div>
              </div>
              <div className="rr-hero-cd-cell">
                <div className="rr-hero-cd-num" data-cd-seconds>00</div>
                <div className="rr-hero-cd-label">sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="rr-section rr-greeting">
        <div className="rr-container">
          <div className="rr-section-header" data-rr-reveal>
            <span className="rr-eyebrow rr-section-eyebrow">Letter</span>
            <h2 className="rr-section-title">Dear Friends,</h2>
            <p className="rr-section-sub">친구들에게</p>
            <div className="rr-divider" style={{ margin: "20px auto 0" }} />
          </div>
          <div className="rr-greeting-body rr-prose" data-rr-reveal>
            {greeting.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ===== 3. Timeline (시그니처) ===== */}
      <section className="rr-section rr-timeline">
        <div className="rr-container">
          <div className="rr-section-header" data-rr-reveal>
            <span className="rr-eyebrow rr-section-eyebrow">Memories</span>
            <h2 className="rr-section-title">20 Years in 4 Frames</h2>
            <p className="rr-section-sub">우리가 지나온 20년</p>
            <div className="rr-divider" style={{ margin: "20px auto 0" }} />
          </div>

          <div className="rr-timeline-list">
            {timeline.map((item, i) => (
              <article key={item.year} className="rr-timeline-item">
                <div className="rr-timeline-card" data-rr-reveal data-direction={i % 2 === 0 ? "left" : "right"}>
                  <p className="rr-timeline-year">{item.year}</p>
                  <h3 className="rr-timeline-title">{item.title}</h3>
                  <p className="rr-timeline-title-en">{item.titleEn}</p>
                  <p className="rr-timeline-body">{item.body}</p>
                </div>
                <div className="rr-timeline-image" data-rr-reveal data-direction={i % 2 === 0 ? "right" : "left"}>
                  <img src={TIMELINE_IMAGES[i]} alt={`${item.year} ${item.title} (가상)`} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Venue ===== */}
      <section className="rr-section rr-venue">
        <div className="rr-container">
          <div className="rr-section-header" data-rr-reveal>
            <span className="rr-eyebrow rr-section-eyebrow">Venue</span>
            <h2 className="rr-section-title">When &amp; Where</h2>
            <p className="rr-section-sub">일정 &amp; 장소</p>
            <div className="rr-divider" style={{ margin: "20px auto 0" }} />
          </div>

          <div className="rr-venue-card" data-rr-reveal>
            <p className="rr-venue-date">{`${yyyy}. ${mm}. ${dd}`}</p>
            <p className="rr-venue-time">{`${dayName} · 18:00`}</p>
            <div className="rr-venue-divider" />
            <p className="rr-venue-name">{venue.name}</p>
            <p className="rr-venue-name-en">{venue.nameKr}</p>
            <p className="rr-venue-address">{venue.address}</p>
          </div>

          <div className="rr-venue-map" data-rr-reveal>
            <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== 5. RSVP ===== */}
      <section className="rr-section rr-rsvp">
        <div className="rr-container">
          <div className="rr-section-header" data-rr-reveal>
            <span className="rr-eyebrow rr-section-eyebrow">RSVP</span>
            <h2 className="rr-section-title">Are You Coming?</h2>
            <p className="rr-section-sub">참석 여부 · Mock 폼</p>
            <div className="rr-divider" style={{ margin: "20px auto 0" }} />
          </div>

          <form className="rr-rsvp-form" data-rr-reveal>
            <label className="rr-rsvp-label">
              Name
              <input type="text" name="name" className="rr-rsvp-input" placeholder="이름을 입력하세요" autoComplete="off" required />
            </label>
            <label className="rr-rsvp-label">
              Attending
              <select name="attend" className="rr-rsvp-select" defaultValue="yes">
                <option value="yes">참석합니다</option>
                <option value="no">참석이 어렵습니다</option>
              </select>
            </label>
            <button type="submit" className="rr-btn rr-rsvp-submit">Send RSVP →</button>
          </form>
        </div>

        {/* 모달 */}
        <div className="rr-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="rr-rsvp-modal-title">
          <div className="rr-rsvp-modal-dialog">
            <button type="button" className="rr-rsvp-modal-close" aria-label="모달 닫기">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
            <span className="rr-rsvp-modal-stamp">RECEIVED</span>
            <h3 id="rr-rsvp-modal-title" className="rr-rsvp-modal-title">고마워요</h3>
            <p className="rr-rsvp-modal-desc">
              <strong className="rr-rsvp-modal-name">친구</strong> 님,<br />
              RSVP 접수되었어요. 그날 만나요!
              <br /><br />
              (※ 데모 폼 — 실제 접수되지 않습니다)
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="rr-footer">
        <p className="rr-footer-thanks">See You Soon</p>
        <p className="rr-footer-sub">Class of '05 Reunion · {venue.name}</p>
        <p className="rr-footer-contact">{`${contact.organizer} · ${contact.phone}`}</p>
        <p className="rr-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          학교 / 동창회 / 장소 / 인물 등 모든 정보는 가상이며 실제 행사 또는 인물과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
