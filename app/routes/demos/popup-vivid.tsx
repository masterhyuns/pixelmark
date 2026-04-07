import { useEffect, useRef } from "react"
import type { Route } from "./+types/popup-vivid"
import "~/demos/popup-vivid/main.scss"
import { initCountdown } from "~/demos/popup-vivid/modules/countdown"
import { initGradientAnim } from "~/demos/popup-vivid/modules/gradientAnim"
import { initScrollReveal } from "~/demos/popup-vivid/modules/scrollReveal"
import {
  campaign,
  tagline,
  concept,
  brands,
  event,
  hashtags,
  getCampaignDate,
} from "~/demos/popup-vivid/data/content"

// 이미지 (Vite asset import — 라우트 코드 스플리팅으로 데모 chunk에 포함)
import heroGradientUrl from "~/demos/popup-vivid/assets/images/hero/hero-gradient.webp"
import conceptVisualUrl from "~/demos/popup-vivid/assets/images/concept/concept-visual.webp"
import brand1Url from "~/demos/popup-vivid/assets/images/brands/brand-1.webp"
import brand2Url from "~/demos/popup-vivid/assets/images/brands/brand-2.webp"
import brand3Url from "~/demos/popup-vivid/assets/images/brands/brand-3.webp"

/**
 * E-S3 Popup Vivid — 팝업스토어 / 마케팅 캠페인 안내 데모
 *
 * [컨셉] "트렌디 임팩트"
 * - 비비드 핑크/오렌지/옐로우 그라데이션 + Inter Tight 큰 산세리프
 * - 5 섹션: Hero / Concept / Brands / Info / Footer
 *
 * [모듈 3개]
 * 1. countdown — 거대 D-day (4셀 1초 갱신)
 * 2. gradientAnim — 히어로 hue 천천히 회전 (60s 사이클, rAF)
 * 3. scrollReveal — IntersectionObserver 페이드인
 *
 * [컨벤션 — 가상 캠페인]
 * - 캠페인명/입점 브랜드/장소 모두 placeholder
 * - 인물 얼굴 X, 그래픽/추상 컷만
 * - 푸터에 가상 데모 명시 필수
 */

export const handle = { demoName: "E-S3 Pixelmark Popup" }

export const meta: Route.MetaFunction = () => [
  { title: "Pixelmark Popup Vol. 01 — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 팝업스토어 / 마케팅 캠페인 안내 페이지 디자인 데모. 가상 캠페인이며 실존 행사·브랜드와 무관합니다. 비비드 컬러풀 캠페인 샘플.",
  },
]

// Inter Tight 큰 산세리프
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,500;0,700;0,800;0,900;1,500&display=swap",
  },
]

const BRAND_IMAGES = [brand1Url, brand2Url, brand3Url]

export default function PopupVivid() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initCountdown(root),
      initGradientAnim(root),
      initScrollReveal(root),
    ]
    return () => {
      cleanups.reverse().forEach((fn) => {
        try { fn() } catch (err) { console.warn("[popup-vivid] cleanup", err) }
      })
    }
  }, [])

  const campaignDate = getCampaignDate()
  const yyyy = campaignDate.getFullYear()
  const mm = String(campaignDate.getMonth() + 1).padStart(2, "0")
  const dd = String(campaignDate.getDate()).padStart(2, "0")
  const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][campaignDate.getDay()]

  return (
    <div ref={rootRef} className="popup-vivid">
      {/* ===== 1. Hero ===== */}
      <section className="pv-hero" data-pv-hero>
        <div className="pv-hero-bg" aria-hidden="true" />
        <div
          className="pv-hero-texture"
          style={{ backgroundImage: `url(${heroGradientUrl})` }}
          aria-hidden="true"
        />
        <div className="pv-hero-grain" aria-hidden="true" />

        <div className="pv-hero-inner">
          <div className="pv-hero-top">
            <span className="pv-hero-pill">Coming Soon</span>
            <div className="pv-hero-meta">
              <span>{`${yyyy}.${mm}.${dd}. ${dayName}`}</span>
              <span>{event.venueName}</span>
            </div>
          </div>

          <div>
            <h1 className="pv-hero-title">
              {campaign.display.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="pv-hero-slogan">{campaign.slogan}</p>
            <p className="pv-hero-tagline">{tagline}</p>

            {/* 거대 카운트다운 */}
            <div
              className="pv-hero-countdown"
              data-pv-countdown
              data-target={campaignDate.toISOString()}
              aria-label="캠페인 시작까지 남은 시간"
            >
              <div className="pv-hero-countdown-cell">
                <div className="pv-hero-countdown-num" data-cd-days>00</div>
                <div className="pv-hero-countdown-label">Days</div>
              </div>
              <div className="pv-hero-countdown-cell">
                <div className="pv-hero-countdown-num" data-cd-hours>00</div>
                <div className="pv-hero-countdown-label">Hours</div>
              </div>
              <div className="pv-hero-countdown-cell">
                <div className="pv-hero-countdown-num" data-cd-minutes>00</div>
                <div className="pv-hero-countdown-label">Minutes</div>
              </div>
              <div className="pv-hero-countdown-cell">
                <div className="pv-hero-countdown-num" data-cd-seconds>00</div>
                <div className="pv-hero-countdown-label">Seconds</div>
              </div>
            </div>

            <div className="pv-hero-bottom">
              <span>{event.schedule}</span>
              <span>{event.hours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Concept ===== */}
      <section className="pv-section pv-concept">
        <div className="pv-container">
          <div className="pv-concept-grid" data-pv-reveal>
            <div className="pv-concept-body">
              <span className="pv-eyebrow">{concept.eyebrow}</span>
              <h2 className="pv-concept-title">{concept.title}</h2>
              <div className="pv-concept-paragraphs pv-prose">
                {concept.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="pv-concept-image">
              <img src={conceptVisualUrl} alt="캠페인 컨셉 비주얼 (가상)" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Brands ===== */}
      <section className="pv-section pv-brands">
        <div className="pv-container">
          <div className="pv-section-header" data-pv-reveal>
            <span className="pv-eyebrow">Brands</span>
            <h2 className="pv-section-title">3 brands<br />one space</h2>
          </div>
          <div className="pv-brands-grid" data-pv-reveal>
            {brands.map((brand, i) => (
              <article
                key={brand.code}
                className="pv-brand-card"
                style={{ ["--pv-brand-color" as string]: brand.color }}
              >
                <div className="pv-brand-image">
                  <img src={BRAND_IMAGES[i]} alt={`${brand.name} 비주얼 (가상)`} loading="lazy" />
                </div>
                <div className="pv-brand-body">
                  <span className="pv-brand-code">{brand.code}</span>
                  <h3 className="pv-brand-name">{brand.name}</h3>
                  <p className="pv-brand-desc">{brand.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Info ===== */}
      <section className="pv-section pv-info">
        <div className="pv-container">
          <div className="pv-section-header" data-pv-reveal>
            <span className="pv-eyebrow">Info</span>
            <h2 className="pv-section-title">When &amp; Where</h2>
          </div>

          <div className="pv-info-rows" data-pv-reveal>
            <div className="pv-info-row">
              <span className="pv-info-label">Schedule</span>
              <span className="pv-info-value">
                {event.schedule}
                <small>{`Opening · ${yyyy}.${mm}.${dd}. ${dayName} 14:00`}</small>
              </span>
            </div>
            <div className="pv-info-row">
              <span className="pv-info-label">Hours</span>
              <span className="pv-info-value">
                {event.hours}
                <small>월요일 휴무 · 무료 입장</small>
              </span>
            </div>
            <div className="pv-info-row">
              <span className="pv-info-label">Venue</span>
              <span className="pv-info-value">
                {event.venueName}
                <small>{event.address}</small>
              </span>
            </div>
          </div>

          <div className="pv-info-map" data-pv-reveal>
            <iframe src={event.mapEmbedSrc} title={`${event.venueName} 위치 지도`} loading="lazy" />
          </div>

          <div className="pv-info-tags" data-pv-reveal>
            {hashtags.map((tag) => (
              <span key={tag} className="pv-info-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Footer ===== */}
      <footer className="pv-footer">
        <p className="pv-footer-thanks">See You There</p>
        <p className="pv-footer-sub">{`${event.schedule} · ${event.venueName}`}</p>
        <p className="pv-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Popup Vol. 01'은 가상 캠페인이며, 표시된 모든 입점 브랜드 / 장소 / 일정은 가상이고 실존 행사 또는 브랜드와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
