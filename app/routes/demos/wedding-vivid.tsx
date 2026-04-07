import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-vivid"
import "~/demos/wedding-vivid/main.scss"
import { initCountdown } from "~/demos/wedding-vivid/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-vivid/modules/scrollReveal"
import { initRsvpForm } from "~/demos/wedding-vivid/modules/rsvpForm"
import { initCopyAccount } from "~/demos/wedding-vivid/modules/copyAccount"
import {
  couple,
  venue,
  greeting,
  accounts,
  getWeddingDate,
} from "~/demos/wedding-vivid/data/content"

import heroUrl from "~/demos/wedding-vivid/assets/images/hero/hero.webp"
import g1Url from "~/demos/wedding-vivid/assets/images/gallery/gallery-01.webp"
import g2Url from "~/demos/wedding-vivid/assets/images/gallery/gallery-02.webp"
import g3Url from "~/demos/wedding-vivid/assets/images/gallery/gallery-03.webp"
import g4Url from "~/demos/wedding-vivid/assets/images/gallery/gallery-04.webp"

/**
 * E-S8 Wedding Vivid — 모던 컬러풀 청첩장 데모
 *
 * [컨셉] "볼드 컬러블록 + Archivo Black"
 * - Red / Yellow / Blue / Black 4색 컬러블록
 * - 6 섹션 원페이지: Hero / Greeting / Gallery / Venue / RSVP / Account / Footer
 *
 * [시그니처]
 * - 히어로 3분할 컬러블록 (RYB)
 * - 섹션마다 배경 색이 바뀌어 매거진 컬러블록 느낌
 * - 섹션 헤더는 큰 Archivo Black 타이포 (mix-blend-mode 활용)
 */

export const handle = { demoName: "E-S8 Wedding Vivid" }

export const meta: Route.MetaFunction = () => [
  { title: "Mira & Jun — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 모던 컬러풀 청첩장 디자인 데모. 가상 커플이며 실존 인물/장소와 무관합니다. 볼드 컬러블록 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600&display=swap",
  },
]

const GALLERY = [
  { url: g1Url, label: "01 · Hands" },
  { url: g2Url, label: "02 · Rings" },
  { url: g3Url, label: "03 · Bouquet" },
  { url: g4Url, label: "04 · Table" },
]

export default function WeddingVivid() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initCountdown(root),
      initScrollReveal(root),
      initRsvpForm(root),
      initCopyAccount(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]

  return (
    <div ref={rootRef} className="wedding-vivid">
      {/* ===== 1. Hero ===== */}
      <section className="wv-hero">
        <div className="wv-hero-blocks" aria-hidden="true">
          <div className="wv-hero-block wv-hero-block--red">
            <div className="wv-hero-block-img" style={{ backgroundImage: `url(${heroUrl})` }} />
          </div>
          <div className="wv-hero-block wv-hero-block--yellow" />
          <div className="wv-hero-block wv-hero-block--blue" />
        </div>

        <div className="wv-hero-overlay">
          <div className="wv-hero-top">
            <span>※ Pixelmark Portfolio Demo</span>
            <span>Vol. 08 / Wedding Vivid</span>
          </div>

          <div className="wv-hero-center">
            <h1 className="wv-hero-names">
              {couple.bride}
              <br />&amp;&nbsp;
              {couple.groom}
            </h1>
            <p className="wv-hero-names-sub">{`We are getting married · ${monthShort} ${date.getDate()}, ${yyyy}`}</p>
          </div>

          <div className="wv-hero-bottom">
            <span>{`${yyyy}.${mm}.${dd} · ${dayShort}`}</span>
            <div className="wv-hero-countdown" data-wv-countdown data-target={date.toISOString()} style={{ pointerEvents: "auto" }} aria-label="결혼식까지 남은 시간">
              <div className="wv-hero-countdown-cell">
                <div className="wv-hero-countdown-num" data-cd-days>00</div>
                <div className="wv-hero-countdown-label">Days</div>
              </div>
              <div className="wv-hero-countdown-cell">
                <div className="wv-hero-countdown-num" data-cd-hours>00</div>
                <div className="wv-hero-countdown-label">Hours</div>
              </div>
              <div className="wv-hero-countdown-cell">
                <div className="wv-hero-countdown-num" data-cd-minutes>00</div>
                <div className="wv-hero-countdown-label">Min</div>
              </div>
              <div className="wv-hero-countdown-cell">
                <div className="wv-hero-countdown-num" data-cd-seconds>00</div>
                <div className="wv-hero-countdown-label">Sec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="wv-section wv-greeting">
        <div className="wv-container">
          <div className="wv-section-header" data-wv-reveal>
            <span className="wv-eyebrow">Greeting</span>
            <h2 className="wv-section-title">{greeting.titleEn}</h2>
            <p className="wv-section-title-kr">{greeting.titleKr}</p>
          </div>
          <div className="wv-greeting-body wv-prose" data-wv-reveal>
            {greeting.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="wv-greeting-signature" data-wv-reveal>
            <span>{couple.bride}</span>
            <span>&amp;</span>
            <span>{couple.groom}</span>
          </div>
        </div>
      </section>

      {/* ===== 3. Gallery ===== */}
      <section className="wv-section">
        <div className="wv-container">
          <div className="wv-section-header" data-wv-reveal>
            <span className="wv-eyebrow">Gallery</span>
            <h2 className="wv-section-title">Moments in<br />Color</h2>
            <p className="wv-section-title-kr">우리의 색깔</p>
          </div>
          <div className="wv-gallery-grid">
            {GALLERY.map((g, i) => (
              <figure key={g.url} className="wv-gallery-item" data-wv-reveal data-stagger-index={i}>
                <span className="wv-gallery-badge">{g.label}</span>
                <img src={g.url} alt={`Gallery ${g.label} (가상)`} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Venue ===== */}
      <section className="wv-section wv-venue">
        <div className="wv-container">
          <div className="wv-section-header" data-wv-reveal>
            <span className="wv-eyebrow">Venue</span>
            <h2 className="wv-section-title">When &amp; Where</h2>
            <p className="wv-section-title-kr">일정 &amp; 장소</p>
          </div>
          <div className="wv-venue-grid" data-wv-reveal>
            <div className="wv-venue-info">
              <p className="wv-venue-date">{`${monthShort} ${date.getDate()} ${yyyy}`}</p>
              <p className="wv-venue-day">{`${dayShort} · 16:00`}</p>
              <p className="wv-venue-name">{venue.name}</p>
              <p className="wv-venue-name-kr">{venue.nameKr}</p>
              <p className="wv-venue-address">{venue.address}</p>
              <p className="wv-venue-address">{venue.addressKr}</p>
            </div>
            <div className="wv-venue-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. RSVP ===== */}
      <section className="wv-section wv-rsvp">
        <div className="wv-container">
          <div className="wv-section-header" data-wv-reveal>
            <span className="wv-eyebrow">RSVP</span>
            <h2 className="wv-section-title">Are you<br />coming?</h2>
            <p className="wv-section-title-kr">참석 여부 · Mock 폼</p>
          </div>

          <form className="wv-rsvp-form" data-wv-reveal>
            <label className="wv-rsvp-label">
              Name
              <input type="text" name="name" className="wv-rsvp-input" placeholder="Your name" autoComplete="off" required />
            </label>
            <label className="wv-rsvp-label">
              Attending
              <select name="count" className="wv-rsvp-select" defaultValue="yes">
                <option value="yes">Yes, I'll be there</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </label>
            <button type="submit" className="wv-btn wv-rsvp-submit">Send RSVP ↗</button>
          </form>
        </div>

        {/* 모달 */}
        <div className="wv-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="wv-rsvp-modal-title">
          <div className="wv-rsvp-modal-dialog">
            <button type="button" className="wv-rsvp-modal-close" aria-label="모달 닫기">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
            <h3 id="wv-rsvp-modal-title" className="wv-rsvp-modal-title">Thank<br />You!</h3>
            <p className="wv-rsvp-modal-desc">
              <strong className="wv-rsvp-modal-name">Guest</strong> 님, <br />
              RSVP 접수되었어요. 결혼식에서 만나요!
              <br /><br />
              (※ 데모 폼 — 실제 접수되지 않습니다)
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. Account ===== */}
      <section className="wv-section">
        <div className="wv-container">
          <div className="wv-section-header" data-wv-reveal>
            <span className="wv-eyebrow">With Heart</span>
            <h2 className="wv-section-title">Share Your<br />Blessing</h2>
            <p className="wv-section-title-kr">마음 전하실 곳</p>
          </div>
          <div className="wv-account-groups" data-wv-reveal>
            {accounts.map((group) => (
              <div key={group.side} className="wv-account-group">
                <div className="wv-account-group-header">
                  <p className="wv-account-group-label">{group.side}</p>
                  <p className="wv-account-group-label-kr">{group.sideKr}</p>
                </div>
                {group.items.map((item) => (
                  <div key={item.role} className="wv-account-item">
                    <div className="wv-account-info">
                      <span className="wv-account-role">{item.role}</span>
                      <span className="wv-account-number">
                        <strong>{item.bank}</strong> {item.number}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="wv-account-copy"
                      data-wv-copy={item.number}
                      aria-label={`${item.role} 계좌번호 복사`}
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wv-footer">
        <p className="wv-footer-thanks">Thank<br />You</p>
        <p className="wv-footer-sub">{`${couple.bride} & ${couple.groom} · ${venue.name}`}</p>
        <p className="wv-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          신랑신부 / 양가 부모 / 식장 / 계좌 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>

      {/* 토스트 */}
      <div className="wv-toast" role="status" aria-live="polite" />
    </div>
  )
}
