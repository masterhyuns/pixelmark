import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-bohemian"
import "~/demos/wedding-bohemian/main.scss"
import { initBotanicalParallax } from "~/demos/wedding-bohemian/modules/botanicalParallax"
import { initCountdown } from "~/demos/wedding-bohemian/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-bohemian/modules/scrollReveal"
import {
  couple,
  parents,
  venue,
  heroCopy,
  story,
  ceremony,
  directions,
  getWeddingDate,
} from "~/demos/wedding-bohemian/data/content"

// 이미지 (Vite asset import)
import heroBgUrl from "~/demos/wedding-bohemian/assets/images/hero/hero-bg.webp"
import story1Url from "~/demos/wedding-bohemian/assets/images/story/story-1.webp"
import story2Url from "~/demos/wedding-bohemian/assets/images/story/story-2.webp"
import visitVenueUrl from "~/demos/wedding-bohemian/assets/images/visit/visit-venue.webp"

/**
 * E-S7 Wedding Bohemian — 보헤미안 자연주의 청첩장 데모
 *
 * [컨셉] "따뜻한 자연주의 + 식물 SVG 패럴랙스"
 * - 베이지 + 세이지 그린, Caveat 손글씨 + Cormorant 세리프
 * - 5 섹션 원페이지: Hero / Story / Ceremony / Visit / Footer
 *
 * [시그니처 인터랙션]
 * - 식물 SVG 패럴랙스 (botanicalParallax) — 스크롤에 따라 각 SVG가 다른 속도로 흐름
 * - 매거진형 좌우 교차 페이드인
 * - 사진 살짝 기울임 (-0.8° ↔ +0.8°)
 *
 * [SVG 일러스트]
 * - 직접 그린 simple path (저작권 안전)
 * - 잎 / 가지 / 꽃 모티프 4종, 컴포넌트로 분리해 속도별 패럴랙스
 *
 * [모듈 3개]
 * 1. botanicalParallax — SVG 패럴랙스 (rAF + passive scroll)
 * 2. countdown — D-day 1초 갱신
 * 3. scrollReveal — 섹션 진입 페이드인
 */

export const handle = { demoName: "E-S7 Wedding Bohemian" }

export const meta: Route.MetaFunction = () => [
  { title: "○○ & ○○ Wedding — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 보헤미안 자연주의 청첩장 디자인 데모. 가상 청첩장이며 실존 인물/식장과 무관합니다. 야외 웨딩 식물 SVG 패럴랙스 샘플.",
  },
]

// Caveat 손글씨 + Cormorant Garamond 디스플레이
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap",
  },
]

/**
 * 식물 SVG — 단순 path 기반, CC0 수준의 자체 제작 모티프
 * - leaf: 잎사귀 한 가지 (곡선 줄기 + 잎 5~6장)
 * - branch: 가는 가지 + 작은 잎
 * - bouquet: 작은 꽃다발 원 + 줄기 3개
 * - fern: 양치류 느낌 대칭 잎
 */

const LeafSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 280" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M100 260 Q 100 180 80 120 Q 60 70 90 20" />
    <path d="M95 200 Q 70 200 50 180 Q 70 190 95 180 Z" fill="currentColor" fillOpacity="0.18" />
    <path d="M90 170 Q 110 180 130 160 Q 115 170 92 160 Z" fill="currentColor" fillOpacity="0.18" />
    <path d="M85 140 Q 60 140 40 115 Q 65 130 90 125 Z" fill="currentColor" fillOpacity="0.18" />
    <path d="M80 110 Q 100 120 120 95 Q 100 110 82 98 Z" fill="currentColor" fillOpacity="0.18" />
    <path d="M75 80 Q 55 75 38 50 Q 60 70 80 70 Z" fill="currentColor" fillOpacity="0.18" />
    <path d="M85 60 Q 110 60 125 35 Q 105 55 88 52 Z" fill="currentColor" fillOpacity="0.18" />
  </svg>
)

const BranchSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 240 160" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M10 80 Q 80 60 140 80 Q 200 100 235 70" />
    <path d="M60 72 Q 55 58 45 52" />
    <path d="M60 72 Q 72 60 82 56" />
    <path d="M110 76 Q 108 60 100 50" />
    <path d="M110 76 Q 122 62 132 58" />
    <path d="M170 86 Q 170 70 162 60" />
    <path d="M170 86 Q 184 72 196 68" />
    <circle cx="45" cy="52" r="5" fill="currentColor" fillOpacity="0.22" />
    <circle cx="82" cy="56" r="5" fill="currentColor" fillOpacity="0.22" />
    <circle cx="100" cy="50" r="5" fill="currentColor" fillOpacity="0.22" />
    <circle cx="132" cy="58" r="5" fill="currentColor" fillOpacity="0.22" />
    <circle cx="162" cy="60" r="5" fill="currentColor" fillOpacity="0.22" />
    <circle cx="196" cy="68" r="5" fill="currentColor" fillOpacity="0.22" />
  </svg>
)

const BouquetSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="100" cy="60" r="18" fill="currentColor" fillOpacity="0.22" />
    <circle cx="72" cy="75" r="12" fill="currentColor" fillOpacity="0.2" />
    <circle cx="128" cy="78" r="14" fill="currentColor" fillOpacity="0.2" />
    <circle cx="85" cy="45" r="10" fill="currentColor" fillOpacity="0.18" />
    <circle cx="118" cy="42" r="11" fill="currentColor" fillOpacity="0.18" />
    <path d="M100 90 Q 100 160 92 220" />
    <path d="M100 90 Q 115 150 125 220" />
    <path d="M100 90 Q 80 150 72 220" />
    <path d="M90 130 Q 75 125 68 112" />
    <path d="M108 135 Q 126 128 132 115" />
  </svg>
)

const FernSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M100 250 Q 100 180 92 110 Q 82 50 100 10" />
    {Array.from({ length: 12 }).map((_, i) => {
      const y = 30 + i * 18
      const len = 50 - i * 3
      return (
        <g key={i}>
          <path d={`M100 ${y} Q ${100 - len * 0.6} ${y + 6} ${100 - len} ${y - 4}`} />
          <path d={`M100 ${y} Q ${100 + len * 0.6} ${y + 6} ${100 + len} ${y - 4}`} />
        </g>
      )
    })}
  </svg>
)

export default function WeddingBohemian() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initBotanicalParallax(root),
      initCountdown(root),
      initScrollReveal(root),
    ]
    return () => {
      cleanups.reverse().forEach((fn) => {
        try { fn() } catch (err) { console.warn("[wedding-bohemian] cleanup", err) }
      })
    }
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]

  return (
    <div ref={rootRef} className="wedding-bohemian">
      {/* ===== 1. Hero ===== */}
      <section className="wb-hero">
        <div className="wb-hero-bg" style={{ backgroundImage: `url(${heroBgUrl})` }} aria-hidden="true" />

        {/* 식물 SVG 패럴랙스 — 각기 다른 speed로 스크롤 연동 */}
        <div className="wb-botanical wb-botanical-1" data-wb-float data-speed="0.18">
          <BranchSvg />
        </div>
        <div className="wb-botanical wb-botanical-2" data-wb-float data-speed="0.3">
          <LeafSvg />
        </div>
        <div className="wb-botanical wb-botanical-3" data-wb-float data-speed="0.22">
          <BouquetSvg />
        </div>
        <div className="wb-botanical wb-botanical-4" data-wb-float data-speed="0.35">
          <FernSvg />
        </div>

        <div className="wb-hero-inner">
          <p className="wb-eyebrow wb-hero-eyebrow">{heroCopy.eyebrow}</p>
          <h1 className="wb-hero-names">
            {couple.groomDisplay}
            <span className="wb-hero-and">&amp;</span>
            {couple.brideDisplay}
          </h1>
          <p className="wb-hero-tagline">{heroCopy.dateDisplay}</p>
          <div className="wb-hero-date">
            <span className="wb-hero-date-en">{`${monthName} ${date.getDate()}, ${yyyy} · ${dayName}`}</span>
            <span className="wb-hero-date-kr">{`${yyyy}. ${mm}. ${dd}`}</span>
          </div>
        </div>

        <div className="wb-hero-scroll" aria-hidden="true">
          <span>scroll</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M10 4v12M4 10l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ===== 2. Story ===== */}
      <section className="wb-section wb-story">
        {/* 배경 식물 (스토리 섹션도 패럴랙스) */}
        <div className="wb-story-botanical wb-story-botanical-1" data-wb-float data-speed="0.15">
          <LeafSvg />
        </div>
        <div className="wb-story-botanical wb-story-botanical-2" data-wb-float data-speed="0.28">
          <FernSvg />
        </div>

        <div className="wb-container">
          <p className="wb-eyebrow wb-section-eyebrow">Our Story</p>
          <h2 className="wb-section-title">Two Paths, One Garden</h2>
          <p className="wb-section-title-kr">두 사람이 함께 걷는 길</p>
          <div className="wb-divider" style={{ margin: "0 auto 72px" }} />

          <div className="wb-story-list">
            {story.map((chapter, i) => {
              const img = i === 0 ? story1Url : story2Url
              return (
                <article key={chapter.chapter} className="wb-story-item">
                  <div className="wb-story-text" data-wb-reveal data-direction={i % 2 === 0 ? "left" : "right"}>
                    <p className="wb-story-chapter">{chapter.chapter}</p>
                    <p className="wb-story-chapter-kr">{chapter.chapterKr}</p>
                    <h3 className="wb-story-title">{chapter.title}</h3>
                    <p className="wb-story-body">{chapter.body}</p>
                  </div>
                  <div className="wb-story-image" data-wb-reveal data-direction={i % 2 === 0 ? "right" : "left"}>
                    <img src={img} alt={`${chapter.chapter} 이미지 (가상)`} loading="lazy" />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. Ceremony ===== */}
      <section className="wb-section wb-ceremony">
        <div className="wb-container wb-container--narrow">
          <p className="wb-eyebrow wb-section-eyebrow">Ceremony</p>
          <h2 className="wb-section-title">Our Day Together</h2>
          <p className="wb-section-title-kr">그날의 순서</p>
          <div className="wb-divider" style={{ margin: "0 auto 56px" }} />

          <div className="wb-ceremony-list" data-wb-reveal>
            {ceremony.map((item) => (
              <div key={item.time} className="wb-ceremony-item">
                <span className="wb-ceremony-time">{item.time}</span>
                <div>
                  <p className="wb-ceremony-title">{item.title}</p>
                  <p className="wb-ceremony-title-kr">{item.titleKr}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 카운트다운 */}
          <div
            className="wb-countdown"
            data-wb-countdown
            data-target={date.toISOString()}
            aria-label="결혼식까지 남은 시간"
          >
            <div className="wb-countdown-cell">
              <div className="wb-countdown-num" data-cd-days>00</div>
              <div className="wb-countdown-label">days</div>
            </div>
            <div className="wb-countdown-cell">
              <div className="wb-countdown-num" data-cd-hours>00</div>
              <div className="wb-countdown-label">hours</div>
            </div>
            <div className="wb-countdown-cell">
              <div className="wb-countdown-num" data-cd-minutes>00</div>
              <div className="wb-countdown-label">minutes</div>
            </div>
            <div className="wb-countdown-cell">
              <div className="wb-countdown-num" data-cd-seconds>00</div>
              <div className="wb-countdown-label">seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Visit ===== */}
      <section className="wb-section wb-visit">
        <div className="wb-container">
          <p className="wb-eyebrow wb-section-eyebrow">Visit</p>
          <h2 className="wb-section-title">Where We Gather</h2>
          <p className="wb-section-title-kr">오시는 길</p>
          <div className="wb-divider" style={{ margin: "0 auto 56px" }} />

          <div className="wb-visit-image" data-wb-reveal>
            <img src={visitVenueUrl} alt={`${venue.name} 야외 식장 (가상)`} loading="lazy" />
          </div>

          <div className="wb-visit-name" data-wb-reveal>
            <p className="wb-visit-name-en">{venue.name}</p>
            <p className="wb-visit-name-kr">{venue.nameKr}</p>
            <p className="wb-visit-address">{venue.addressKr}</p>
          </div>

          <div className="wb-visit-map" data-wb-reveal>
            <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
          </div>

          <div className="wb-visit-directions" data-wb-reveal>
            {directions.map((d) => (
              <div key={d.type} className="wb-direction-card">
                <p className="wb-direction-type">{d.type}</p>
                <p className="wb-direction-type-kr">{d.typeKr}</p>
                <p className="wb-direction-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Footer ===== */}
      <footer className="wb-footer">
        <p className="wb-footer-thanks">Thank You</p>
        <p className="wb-footer-sub">{`${parents.groomFather} · ${parents.groomMother} / ${parents.brideFather} · ${parents.brideMother}`}</p>
        <p className="wb-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          신랑신부 / 양가 부모 / 식장 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
