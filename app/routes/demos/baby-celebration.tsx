import { useEffect, useRef } from "react"
import type { Route } from "./+types/baby-celebration"
import "~/demos/baby-celebration/main.scss"
import { initGrowthSlider } from "~/demos/baby-celebration/modules/growthSlider"
import { initCountdown } from "~/demos/baby-celebration/modules/countdown"
import { initFloatingDecor } from "~/demos/baby-celebration/modules/floatingDecor"
import { initScrollReveal } from "~/demos/baby-celebration/modules/scrollReveal"
import {
  baby,
  parents,
  greeting,
  growth,
  venue,
  directions,
  gifts,
  getEventDate,
} from "~/demos/baby-celebration/data/content"

// 이미지 (Vite asset import — 라우트 코드 스플리팅으로 데모 chunk에 포함)
import introDecorUrl from "~/demos/baby-celebration/assets/images/intro/intro-decor.webp"
import growth0mUrl from "~/demos/baby-celebration/assets/images/growth/growth-0m.webp"
import growth3mUrl from "~/demos/baby-celebration/assets/images/growth/growth-3m.webp"
import growth6mUrl from "~/demos/baby-celebration/assets/images/growth/growth-6m.webp"
import growth9mUrl from "~/demos/baby-celebration/assets/images/growth/growth-9m.webp"
import growth12mUrl from "~/demos/baby-celebration/assets/images/growth/growth-12m.webp"
import gift1Url from "~/demos/baby-celebration/assets/images/gift/gift-1.webp"
import gift2Url from "~/demos/baby-celebration/assets/images/gift/gift-2.webp"

/**
 * E-S2 Baby Celebration — 돌잔치 / 백일 초대장 데모
 *
 * [컨셉] "사랑스러운 따뜻함"
 * - 옅은 크림 + 핑크/피치 파스텔 + 둥근 폰트(Quicksand)
 * - 6 섹션 원페이지: Intro / Greeting / Growth / Details / Gift / Footer
 *
 * [모듈 4개]
 * 1. growthSlider — 성장 타임라인 가로 드래그/스와이프 슬라이더 ⭐
 * 2. countdown — D-day 실시간 카운트다운
 * 3. floatingDecor — 일러스트 액센트 둥둥 모션
 * 4. scrollReveal — IntersectionObserver 기반 페이드인
 *
 * [컨벤션 — 가상 데모]
 * - 아기/부모/식장 모두 placeholder
 * - 아기 얼굴 등장 X (작은 발/사물/케이크 등 디테일 일러스트)
 * - 푸터에 가상 데모 명시 필수
 */

export const handle = { demoName: "E-S2 Baby Celebration" }

export const meta: Route.MetaFunction = () => [
  { title: "○○이의 첫 생일 — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 돌잔치/백일 초대장 디자인 데모. 가상 초대장이며 실존 인물/장소와 무관합니다. 따뜻한 파스텔 톤 가족 행사 초대장 샘플.",
  },
]

// 둥근 산세리프 디스플레이 폰트 (Quicksand)
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap",
  },
]

// 성장 슬라이더용 이미지 매핑 (data 모듈은 string 의존성 없이 깨끗하게 유지)
const GROWTH_IMAGES = [growth0mUrl, growth3mUrl, growth6mUrl, growth9mUrl, growth12mUrl]
const GIFT_IMAGES = [gift1Url, gift2Url]

export default function BabyCelebration() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initGrowthSlider(root),
      initCountdown(root),
      initFloatingDecor(root),
      initScrollReveal(root),
    ]
    return () => {
      cleanups.reverse().forEach((fn) => {
        try { fn() } catch (err) { console.warn("[baby-celebration] cleanup", err) }
      })
    }
  }, [])

  // 행사 일자 (매년 6/22 자동 갱신)
  const eventDate = getEventDate()
  const yyyy = eventDate.getFullYear()
  const mm = String(eventDate.getMonth() + 1).padStart(2, "0")
  const dd = String(eventDate.getDate()).padStart(2, "0")
  const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][eventDate.getDay()]

  return (
    <div ref={rootRef} className="baby-celebration">
      {/* ===== 1. Intro ===== */}
      <section className="bc-intro">
        <div className="bc-intro-decor" style={{ backgroundImage: `url(${introDecorUrl})` }} aria-hidden="true" />

        {/* 둥둥 떠다니는 데코 SVG (인라인) */}
        <svg className="bc-intro-float bc-intro-float-1" data-bc-float viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8 2 6 5 6 8c0 4 6 11 6 11s6-7 6-11c0-3-2-6-6-6z" opacity="0.85" />
        </svg>
        <svg className="bc-intro-float bc-intro-float-2" data-bc-float viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
        </svg>
        <svg className="bc-intro-float bc-intro-float-3" data-bc-float viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6 2 9.2h7.6z" />
        </svg>
        <svg className="bc-intro-float bc-intro-float-4" data-bc-float viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7-5.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 11-7 11z" opacity="0.9" />
        </svg>

        <div className="bc-intro-inner">
          <p className="bc-eyebrow bc-intro-eyebrow">First Birthday Invitation</p>
          <h1 className="bc-intro-name">
            <strong>{baby.name}</strong>의<br />첫 번째 생일
          </h1>
          <p className="bc-intro-sub">A Little Party for a Big Day</p>
          <p className="bc-intro-parents">
            <strong>{parents.father}</strong>·<strong>{parents.mother}</strong> 의 사랑스러운 아이
          </p>
          <span className="bc-intro-date-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            {`${yyyy}. ${mm}. ${dd}. ${dayName}`}
          </span>
        </div>

        <div className="bc-intro-scroll" aria-hidden="true">
          <span>Scroll</span>
          <svg viewBox="0 0 14 22" fill="none">
            <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" />
            <circle cx="7" cy="6" r="1.25" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="bc-section bc-greeting" data-bc-reveal>
        <div className="bc-container">
          <p className="bc-eyebrow bc-section-eyebrow">Invitation</p>
          <h2 className="bc-section-title">소중한 분들을 초대합니다</h2>
          <div className="bc-divider" />
          <div className="bc-greeting-body bc-prose">
            {greeting.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bc-greeting-info">
            <div className="bc-greeting-info-row">
              <span className="bc-greeting-info-label">아이 이름</span>
              <span className="bc-greeting-info-value">{baby.name}</span>
            </div>
            <div className="bc-greeting-info-row">
              <span className="bc-greeting-info-label">출생일</span>
              <span className="bc-greeting-info-value">{baby.birthDate}</span>
            </div>
            <div className="bc-greeting-info-row">
              <span className="bc-greeting-info-label">부모님</span>
              <span className="bc-greeting-info-value">{parents.father} · {parents.mother}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Growth ⭐ 시그니처 ===== */}
      <section className="bc-section bc-growth">
        <div className="bc-container">
          <p className="bc-eyebrow bc-section-eyebrow">Our Story</p>
          <h2 className="bc-section-title">○○이의 1년</h2>
          <div className="bc-divider" />

          <div className="bc-growth-slider" data-bc-growth-slider data-bc-reveal aria-roledescription="carousel" aria-label="아이의 1년 성장 슬라이드">
            <button type="button" className="bc-growth-prev" aria-label="이전 슬라이드">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button type="button" className="bc-growth-next" aria-label="다음 슬라이드">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="bc-growth-viewport">
              <div className="bc-growth-track">
                {growth.map((item, i) => (
                  <article key={item.month} className="bc-growth-card" aria-roledescription="slide" aria-label={`${i + 1} / ${growth.length}`}>
                    <div className="bc-growth-card-image">
                      <img src={GROWTH_IMAGES[i]} alt={`${item.month}개월 성장 사진 (가상 일러스트)`} loading="lazy" draggable={false} />
                    </div>
                    <div className="bc-growth-card-body">
                      <span className="bc-growth-card-month">{item.label}</span>
                      <h3 className="bc-growth-card-title">{item.title}</h3>
                      <p className="bc-growth-card-caption">{item.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bc-growth-dots" role="tablist" aria-label="슬라이드 인디케이터">
              {growth.map((item, i) => (
                <button
                  key={item.month}
                  type="button"
                  className={`bc-growth-dot${i === 0 ? " is-active" : ""}`}
                  data-index={i}
                  aria-label={`${item.label} 슬라이드로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Details ===== */}
      <section className="bc-section bc-details">
        <div className="bc-container">
          <p className="bc-eyebrow bc-section-eyebrow">Celebration Day</p>
          <h2 className="bc-section-title">행사 안내</h2>
          <div className="bc-divider" />

          <div data-bc-reveal>
            <p className="bc-details-date">{`${yyyy}. ${mm}. ${dd}`}</p>
            <p className="bc-details-time">{`${dayName} · 낮 12시`}</p>
            <p className="bc-details-venue">{venue.name}</p>
            <p className="bc-details-address">{venue.address} · {venue.hall}</p>

            <div className="bc-countdown" data-bc-countdown data-target={eventDate.toISOString()} aria-label="행사까지 남은 시간">
              <div className="bc-countdown-cell">
                <div className="bc-countdown-num" data-cd-days>00</div>
                <div className="bc-countdown-label">Days</div>
              </div>
              <div className="bc-countdown-cell">
                <div className="bc-countdown-num" data-cd-hours>00</div>
                <div className="bc-countdown-label">Hours</div>
              </div>
              <div className="bc-countdown-cell">
                <div className="bc-countdown-num" data-cd-minutes>00</div>
                <div className="bc-countdown-label">Minutes</div>
              </div>
              <div className="bc-countdown-cell">
                <div className="bc-countdown-num" data-cd-seconds>00</div>
                <div className="bc-countdown-label">Seconds</div>
              </div>
            </div>

            <div className="bc-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>

            <div className="bc-directions">
              {directions.map((d) => (
                <div key={d.type} className="bc-direction-item">
                  <span className="bc-direction-type">{d.type}</span>
                  <p className="bc-direction-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Gift ===== */}
      <section className="bc-section">
        <div className="bc-container">
          <p className="bc-eyebrow bc-section-eyebrow">With Heart</p>
          <h2 className="bc-section-title">작은 답례</h2>
          <div className="bc-divider" />
          <div className="bc-gift-grid" data-bc-reveal>
            {gifts.map((gift, i) => (
              <article key={gift.title} className="bc-gift-card">
                <div className="bc-gift-image">
                  <img src={GIFT_IMAGES[i]} alt={`${gift.title} 일러스트 (가상)`} loading="lazy" />
                </div>
                <div className="bc-gift-body">
                  <h3 className="bc-gift-title">{gift.title}</h3>
                  <p className="bc-gift-desc">{gift.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="bc-footer">
        <p className="bc-footer-thanks">Thank You</p>
        <p className="bc-footer-sub">소중한 발걸음으로 우리 아이의 첫 번째 생일을 함께해 주셔서 감사합니다.</p>
        <p className="bc-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          아기 / 부모 / 식장 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
