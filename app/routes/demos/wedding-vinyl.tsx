import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-vinyl"
import "~/demos/wedding-vinyl/main.scss"
import { initCountdown } from "~/demos/wedding-vinyl/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-vinyl/modules/scrollReveal"
import {
  album,
  couple,
  tracksA,
  tracksB,
  greeting,
  venue,
  gallery,
  getReleaseDate,
} from "~/demos/wedding-vinyl/data/content"

import vinylUrl from "~/demos/wedding-vinyl/assets/images/hero/vinyl-disc.webp"
import sleeveUrl from "~/demos/wedding-vinyl/assets/images/hero/album-cover.webp"
import turntableUrl from "~/demos/wedding-vinyl/assets/images/gallery/gallery-turntable.webp"
import cassetteUrl from "~/demos/wedding-vinyl/assets/images/gallery/gallery-cassette.webp"
import headphonesUrl from "~/demos/wedding-vinyl/assets/images/gallery/gallery-headphones.webp"

/**
 * E-S14 Wedding Vinyl — LP 청첩장
 *
 * [컨셉] "LP 음반 + 트랙리스트 + 빈티지 음악"
 * - 다크 블랙 + 크림 + 골드 + 빈티지 레드
 * - Antic Didone 디스플레이 + Inter 본문
 * - 6 섹션: Hero / Tracks / Liner Notes / Gallery / Release / Footer
 *
 * [시그니처]
 * - 회전하는 LP 디스크 (CSS infinite spin)
 * - A면/B면 트랙리스트 (각 5곡, 청첩장 정보를 곡명으로 표현)
 */

export const handle = { demoName: "E-S14 Wedding Vinyl" }

export const meta: Route.MetaFunction = () => [
  { title: "Luna & Felix · Our First Album — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 LP 청첩장 디자인 데모. 가상 커플이며 실존 음반/아티스트와 무관합니다. 빈티지 음악 무드 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Antic+Didone&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap",
  },
]

const GALLERY_IMAGES: Record<"turntable" | "cassette" | "headphones", string> = {
  turntable: turntableUrl,
  cassette: cassetteUrl,
  headphones: headphonesUrl,
}

export default function WeddingVinyl() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initCountdown(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getReleaseDate()
  const yyyy = date.getFullYear()
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]
  const dayShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]

  return (
    <div ref={rootRef} className="wedding-vinyl">
      {/* ===== 1. Hero ===== */}
      <section className="wvny-hero">
        <div className="wvny-hero-grid">
          <div className="wvny-hero-vinyl">
            <div className="wvny-vinyl-disc">
              <img src={vinylUrl} alt="LP vinyl disc (가상)" />
            </div>
            <div className="wvny-album-sleeve">
              <img src={sleeveUrl} alt={`${album.title} album sleeve (가상)`} loading="eager" />
            </div>
          </div>

          <div className="wvny-hero-text">
            <p className="wvny-hero-label">{album.label} · {album.catalog}</p>
            <h1 className="wvny-hero-artist">{album.artist}</h1>
            <p className="wvny-hero-album">{album.title}</p>
            <p className="wvny-hero-sub">{album.subtitle}</p>
            <div className="wvny-hero-meta">
              <div>
                Release Date
                <strong>{`${monthShort} ${date.getDate()}, ${yyyy}`}</strong>
              </div>
              <div>
                Format
                <strong>12" Vinyl LP</strong>
              </div>
              <div>
                Tracks
                <strong>10</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Tracklist ===== */}
      <section className="wvny-section wvny-tracks">
        <div className="wvny-container">
          <div className="wvny-section-header" data-wvny-reveal>
            <p className="wvny-eyebrow wvny-section-eyebrow">Tracklist</p>
            <h2 className="wvny-section-title">A·Side / B·Side</h2>
            <p className="wvny-section-title-sub">5 + 5 tracks</p>
          </div>

          <div className="wvny-tracks-grid">
            <div className="wvny-tracks-side" data-wvny-reveal>
              <header className="wvny-tracks-side-header">
                <h3 className="wvny-tracks-side-label">Side A</h3>
                <span className="wvny-tracks-side-name">— The Beginning</span>
              </header>
              {tracksA.map((t) => (
                <div key={t.num} className="wvny-track-row">
                  <span className="wvny-track-num">{t.num}</span>
                  <span className="wvny-track-title">
                    {t.title}
                    <small className="wvny-track-title-kr"> · {t.titleKr}</small>
                  </span>
                  <span className="wvny-track-duration">{t.duration}</span>
                </div>
              ))}
            </div>

            <div className="wvny-tracks-side" data-wvny-reveal data-stagger-index="1">
              <header className="wvny-tracks-side-header">
                <h3 className="wvny-tracks-side-label">Side B</h3>
                <span className="wvny-tracks-side-name">— Forever</span>
              </header>
              {tracksB.map((t) => (
                <div key={t.num} className="wvny-track-row">
                  <span className="wvny-track-num">{t.num}</span>
                  <span className="wvny-track-title">
                    {t.title}
                    <small className="wvny-track-title-kr"> · {t.titleKr}</small>
                  </span>
                  <span className="wvny-track-duration">{t.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Liner Notes ===== */}
      <section className="wvny-section wvny-liner">
        <div className="wvny-container">
          <div className="wvny-section-header" data-wvny-reveal>
            <p className="wvny-eyebrow wvny-section-eyebrow">Liner Notes</p>
            <h2 className="wvny-section-title">From the Sleeve</h2>
            <p className="wvny-section-title-sub">앨범에 적힌 짧은 글</p>
          </div>

          <div className="wvny-liner-card" data-wvny-reveal>
            <h3 className="wvny-liner-title">"{greeting.title}"</h3>
            <div className="wvny-liner-body">
              {greeting.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Gallery ===== */}
      <section className="wvny-section">
        <div className="wvny-container">
          <div className="wvny-section-header" data-wvny-reveal>
            <p className="wvny-eyebrow wvny-section-eyebrow">B·Roll</p>
            <h2 className="wvny-section-title">Things We Spin</h2>
            <p className="wvny-section-title-sub">우리 사이의 작은 사물들</p>
          </div>
          <div className="wvny-gallery-grid">
            {gallery.map((g, i) => (
              <article key={g.code} className="wvny-gallery-item" data-wvny-reveal data-stagger-index={i}>
                <div className="wvny-gallery-image">
                  <img src={GALLERY_IMAGES[g.image]} alt={`${g.title} (가상)`} loading="lazy" />
                </div>
                <div className="wvny-gallery-body">
                  <p className="wvny-gallery-code">№ {g.code}</p>
                  <h3 className="wvny-gallery-title">{g.title} <small>· {g.titleKr}</small></h3>
                  <p className="wvny-gallery-caption">{g.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Release ===== */}
      <section className="wvny-section wvny-release">
        <div className="wvny-container">
          <div className="wvny-section-header" data-wvny-reveal>
            <p className="wvny-eyebrow wvny-section-eyebrow">Release Party</p>
            <h2 className="wvny-section-title">Where the Album Drops</h2>
            <p className="wvny-section-title-sub">일정 &amp; 장소</p>
          </div>

          <div className="wvny-release-grid" data-wvny-reveal>
            <div className="wvny-release-info">
              <p className="wvny-release-label">Release Date</p>
              <p className="wvny-release-date">{`${monthShort} ${date.getDate()}`}</p>
              <p className="wvny-release-day">{`${dayShort} · ${yyyy} · 17:25`}</p>

              <div className="wvny-release-row">
                <p className="wvny-release-row-label">Venue</p>
                <p className="wvny-release-row-value">{venue.name}</p>
              </div>
              <div className="wvny-release-row">
                <p className="wvny-release-row-label">Address</p>
                <p className="wvny-release-row-value">{venue.address}</p>
              </div>

              <div className="wvny-countdown" data-wvny-countdown data-target={date.toISOString()} aria-label="릴리즈까지 남은 시간">
                <div className="wvny-countdown-cell">
                  <div className="wvny-countdown-num" data-cd-days>00</div>
                  <div className="wvny-countdown-label">days</div>
                </div>
                <div className="wvny-countdown-cell">
                  <div className="wvny-countdown-num" data-cd-hours>00</div>
                  <div className="wvny-countdown-label">hours</div>
                </div>
                <div className="wvny-countdown-cell">
                  <div className="wvny-countdown-num" data-cd-minutes>00</div>
                  <div className="wvny-countdown-label">min</div>
                </div>
                <div className="wvny-countdown-cell">
                  <div className="wvny-countdown-num" data-cd-seconds>00</div>
                  <div className="wvny-countdown-label">sec</div>
                </div>
              </div>
            </div>

            <div className="wvny-release-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wvny-footer">
        <p className="wvny-footer-thanks">— end of side b —</p>
        <p className="wvny-footer-sub">{`${album.label} · ${album.catalog} · ${couple.bride} & ${couple.groom}`}</p>
        <p className="wvny-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Records'는 가상 레이블이며, 표시된 모든 음반 / 아티스트 / 곡 / 일정은 가상이고 실존 음반 또는 아티스트와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
