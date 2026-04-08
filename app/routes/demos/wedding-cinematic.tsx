import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-cinematic"
import "~/demos/wedding-cinematic/main.scss"
import { initHeroReveal } from "~/demos/wedding-cinematic/modules/heroReveal"
import { initScrollReveal } from "~/demos/wedding-cinematic/modules/scrollReveal"
import { initCountdown } from "~/demos/wedding-cinematic/modules/countdown"
import { initCreditsRoll } from "~/demos/wedding-cinematic/modules/creditsRoll"
import {
  movie,
  meta as movieMeta,
  synopsis,
  credits,
  showtime,
  getReleaseDate,
} from "~/demos/wedding-cinematic/data/content"

import heroBgUrl from "~/demos/wedding-cinematic/assets/images/hero/hero-bg.webp"

/**
 * E-S11 Wedding Cinematic — 영화 포스터 청첩장 데모
 *
 * [컨셉] "시네마틱 다크 + Bebas Neue + 영화 메타데이터"
 * - 딥 블랙 + 시네마틱 골드, Bebas Neue 큰 타이포
 * - 6 섹션 원페이지: Hero / Meta / Synopsis / Credits / Showtime / Footer
 *
 * [시그니처]
 * - 영화 예고편 스타일 단계별 텍스트 reveal (presents → 제목 → 부제 → 태그라인 → 등급 → 개봉일)
 * - 영화 메타데이터 시트 (Director / Starring / Genre / Runtime / Rating / Studio)
 * - 엔딩 크레딧 자동 스크롤 (시네마틱 위→아래 흐름)
 * - 가상 영화사 'PIXELMARK PICTURES PRESENTS'
 */

export const handle = { demoName: "E-S11 Wedding Cinematic" }

export const meta: Route.MetaFunction = () => [
  { title: "FOREVER, AT FIRST SIGHT — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 영화 포스터 시네마틱 청첩장 디자인 데모. 가상 청첩장이며 실존 인물/영화/식장과 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500&display=swap",
  },
]

export default function WeddingCinematic() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initHeroReveal(root),
      initScrollReveal(root),
      initCountdown(root),
      initCreditsRoll(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getReleaseDate()
  const yyyy = date.getFullYear()
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]

  return (
    <div ref={rootRef} className="wedding-cinematic">
      {/* ===== 1. Hero (영화 포스터) ===== */}
      <section className="wcine-hero">
        <div className="wcine-hero-bg" style={{ backgroundImage: `url(${heroBgUrl})` }} aria-hidden="true" />

        <div className="wcine-hero-inner">
          <p className="wcine-hero-presents" data-wcine-reveal-step="0">{movie.presents}</p>
          <h1 className="wcine-hero-title" data-wcine-reveal-step="1">{movie.title}</h1>
          <p className="wcine-hero-subtitle" data-wcine-reveal-step="2">— {movie.titleKr} —</p>
          <p className="wcine-hero-tagline" data-wcine-reveal-step="3">"{movie.taglineKr}"</p>
          <span className="wcine-hero-rating" data-wcine-reveal-step="4">
            <span className="wcine-hero-rating-icon">❤</span>
            {movie.rating}
          </span>
          <p className="wcine-hero-release" data-wcine-reveal-step="5">
            {`COMING — ${monthShort} ${date.getDate()}, ${yyyy}`}
          </p>
        </div>
      </section>

      {/* ===== 2. Meta ===== */}
      <section className="wcine-section wcine-meta">
        <div className="wcine-container">
          <div className="wcine-section-header" data-wcine-reveal>
            <p className="wcine-eyebrow wcine-section-eyebrow">Movie Info</p>
            <h2 className="wcine-section-title">Production Sheet</h2>
            <p className="wcine-section-title-kr">영화 메타데이터</p>
          </div>
          <div className="wcine-meta-sheet" data-wcine-reveal>
            {movieMeta.map((row) => (
              <div key={row.label} className="wcine-meta-row">
                <span className="wcine-meta-label">{row.label} · {row.labelKr}</span>
                <span className="wcine-meta-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Synopsis ===== */}
      <section className="wcine-section">
        <div className="wcine-container">
          <div className="wcine-section-header" data-wcine-reveal>
            <p className="wcine-eyebrow wcine-section-eyebrow">Synopsis</p>
            <h2 className="wcine-section-title">The Story</h2>
            <p className="wcine-section-title-kr">시놉시스</p>
          </div>
          <div className="wcine-synopsis-body" data-wcine-reveal>
            <p className="wcine-synopsis-log">{synopsis.log}</p>
            {synopsis.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ===== 4. Credits (시그니처) ===== */}
      <section className="wcine-section wcine-credits">
        <div className="wcine-container">
          <div className="wcine-section-header" data-wcine-reveal>
            <p className="wcine-eyebrow wcine-section-eyebrow">End Credits</p>
            <h2 className="wcine-section-title">Roll the Credits</h2>
            <p className="wcine-section-title-kr">엔딩 크레딧</p>
          </div>
          <div className="wcine-credits-stage" data-wcine-reveal>
            <div className="wcine-credits-track">
              {credits.map((c, i) => (
                <div key={i} className="wcine-credit-row">
                  <span className="wcine-credit-role">{c.role} · {c.roleKr}</span>
                  <p className="wcine-credit-name">{c.name}</p>
                </div>
              ))}
              <p className="wcine-credits-end">FIN.</p>
            </div>
          </div>
          <p className="wcine-credits-hint">// hover to pause</p>
        </div>
      </section>

      {/* ===== 5. Showtime ===== */}
      <section className="wcine-section wcine-showtime">
        <div className="wcine-container">
          <div className="wcine-section-header" data-wcine-reveal>
            <p className="wcine-eyebrow wcine-section-eyebrow">Now Showing</p>
            <h2 className="wcine-section-title">Showtime</h2>
            <p className="wcine-section-title-kr">상영 정보 · 일정 &amp; 장소</p>
          </div>

          <div className="wcine-showtime-grid" data-wcine-reveal>
            <div className="wcine-showtime-info">
              <p className="wcine-showtime-label">Now Showing At · 상영관</p>
              <p className="wcine-showtime-theater">{showtime.theater}</p>
              <p className="wcine-showtime-theater-kr">{showtime.theaterEn}</p>

              <div className="wcine-showtime-row">
                <p className="wcine-showtime-row-label">개봉일 · Release Date</p>
                <p className="wcine-showtime-row-value">{`${yyyy}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${["일","월","화","수","목","금","토"][date.getDay()]}) 오후 4시`}</p>
              </div>
              <div className="wcine-showtime-row">
                <p className="wcine-showtime-row-label">주소 · Address</p>
                <p className="wcine-showtime-row-value">{showtime.address}</p>
              </div>

              <div className="wcine-countdown" data-wcine-countdown data-target={date.toISOString()} aria-label="개봉까지 남은 시간">
                <div className="wcine-countdown-cell">
                  <div className="wcine-countdown-num" data-cd-days>00</div>
                  <div className="wcine-countdown-label">days</div>
                </div>
                <div className="wcine-countdown-cell">
                  <div className="wcine-countdown-num" data-cd-hours>00</div>
                  <div className="wcine-countdown-label">hours</div>
                </div>
                <div className="wcine-countdown-cell">
                  <div className="wcine-countdown-num" data-cd-minutes>00</div>
                  <div className="wcine-countdown-label">min</div>
                </div>
                <div className="wcine-countdown-cell">
                  <div className="wcine-countdown-num" data-cd-seconds>00</div>
                  <div className="wcine-countdown-label">sec</div>
                </div>
              </div>
            </div>

            <div className="wcine-showtime-map">
              <iframe src={showtime.mapEmbedSrc} title={`${showtime.theater} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wcine-footer">
        <p className="wcine-footer-fin">THE END</p>
        <p className="wcine-footer-sub">Thank you for being part of our story</p>
        <p className="wcine-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Pictures'는 가상 영화사이며, 표시된 모든 영화 / 인물 / 식장 / 일정은 가상이고 실존 영화 또는 인물과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
