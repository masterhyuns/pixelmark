import { useEffect, useRef } from "react"
import { NavLink } from "react-router"
import type { Route } from "./+types/conference-tech._index"
import { initCountdown } from "~/demos/conference-tech/modules/countdown"
import { initScrollReveal } from "~/demos/conference-tech/modules/scrollReveal"
import { getConferenceDate, venue, sponsors } from "~/demos/conference-tech/data/schedule"
import homeHeroUrl from "~/demos/conference-tech/assets/images/home/home-hero.webp"

/**
 * E-S4 Conference Tech — Home (sub-route _index)
 *
 * 풀스크린 다크 히어로 + 큰 카운트다운 + 후원사 그리드.
 */

export const meta: Route.MetaFunction = () => [
  { title: "Pixelmark Tech Conf 2026 — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 다크 테크 톤 컨퍼런스 안내 페이지 디자인 데모. 가상 컨퍼런스이며 실존 행사 / 인물과 무관합니다.",
  },
]

export default function ConferenceHome() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanups = [
      initCountdown(root),
      initScrollReveal(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getConferenceDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]

  return (
    <section ref={sectionRef}>
      {/* ===== Hero ===== */}
      <div className="ct-home-hero">
        <div
          className="ct-home-hero-bg"
          style={{ backgroundImage: `url(${homeHeroUrl})` }}
          aria-hidden="true"
        />
        <div className="ct-container ct-home-hero-inner">
          <div className="ct-home-tags">
            <span className="ct-home-tag">// Conf 2026</span>
            <span className="ct-home-tag">// 2 Days</span>
            <span className="ct-home-tag">// 4 Tracks</span>
          </div>

          <h1 className="ct-home-title">
            <span className="ct-line">Pixelmark</span>
            <span className="ct-line">Tech Conf <em>2026</em></span>
            <span className="ct-line ct-comment">// build the next decade</span>
          </h1>

          <div className="ct-home-meta">
            <div className="ct-home-meta-item">
              <div className="ct-home-meta-label">Date</div>
              <div className="ct-home-meta-value">{`${yyyy}.${mm}.${dd}–${String(date.getDate() + 1).padStart(2, "0")}. ${dayName}`}</div>
            </div>
            <div className="ct-home-meta-item">
              <div className="ct-home-meta-label">Venue</div>
              <div className="ct-home-meta-value">{venue.name}</div>
            </div>
            <div className="ct-home-meta-item">
              <div className="ct-home-meta-label">Tracks</div>
              <div className="ct-home-meta-value">FE / BE / Design / AI</div>
            </div>
          </div>

          {/* 큰 카운트다운 */}
          <div
            className="ct-home-countdown"
            data-ct-countdown
            data-target={date.toISOString()}
            aria-label="컨퍼런스까지 남은 시간"
          >
            <div className="ct-home-countdown-cell">
              <div className="ct-home-countdown-num" data-cd-days>00</div>
              <div className="ct-home-countdown-label">// days</div>
            </div>
            <div className="ct-home-countdown-cell">
              <div className="ct-home-countdown-num" data-cd-hours>00</div>
              <div className="ct-home-countdown-label">// hours</div>
            </div>
            <div className="ct-home-countdown-cell">
              <div className="ct-home-countdown-num" data-cd-minutes>00</div>
              <div className="ct-home-countdown-label">// min</div>
            </div>
            <div className="ct-home-countdown-cell">
              <div className="ct-home-countdown-num" data-cd-seconds>00</div>
              <div className="ct-home-countdown-label">// sec</div>
            </div>
          </div>

          <div className="ct-home-actions">
            <a
              href="#"
              className="ct-btn ct-btn--primary"
              onClick={(e) => e.preventDefault()}
            >
              ./register
            </a>
            <NavLink to="/demos/conference-tech/speakers" className="ct-btn">
              ./view-speakers
            </NavLink>
          </div>
        </div>
      </div>

      {/* ===== Sponsors ===== */}
      <div className="ct-section ct-sponsors">
        <div className="ct-container" data-ct-reveal>
          <p className="ct-sponsors-label">// sponsors &amp; partners</p>
          <div className="ct-sponsors-grid">
            {sponsors.map((s) => (
              <div key={s.code} className="ct-sponsor">
                <p className="ct-sponsor-code">{s.code}</p>
                <p className="ct-sponsor-name">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Venue / Map ===== */}
      <div className="ct-section">
        <div className="ct-container">
          <div className="ct-section-header" data-ct-reveal>
            <span className="ct-eyebrow">venue</span>
            <h2 className="ct-section-title">
              {venue.name} <span className="ct-comment">{`// ${venue.address}`}</span>
            </h2>
          </div>
          <div data-ct-reveal style={{ aspectRatio: "16 / 9", border: "1px solid var(--ct-border)", overflow: "hidden" }}>
            <iframe
              src={venue.mapEmbedSrc}
              title={`${venue.name} 위치 지도`}
              loading="lazy"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
