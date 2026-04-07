import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-magazine"
import "~/demos/wedding-magazine/main.scss"
import { initScrollReveal } from "~/demos/wedding-magazine/modules/scrollReveal"
import {
  magazine,
  couple,
  editorial,
  editorialItems,
  venue,
  getWeddingDate,
} from "~/demos/wedding-magazine/data/content"

import coverUrl from "~/demos/wedding-magazine/assets/images/cover/cover.webp"
import e1Url from "~/demos/wedding-magazine/assets/images/editorial/editorial-01.webp"
import e2Url from "~/demos/wedding-magazine/assets/images/editorial/editorial-02.webp"
import e3Url from "~/demos/wedding-magazine/assets/images/editorial/editorial-03.webp"
import e4Url from "~/demos/wedding-magazine/assets/images/editorial/editorial-04.webp"

/**
 * E-S12 Wedding Magazine — 잡지 커버 청첩장 데모
 *
 * [컨셉] "VOGUE 매거진 커버 + 에디토리얼 컬럼"
 * - 화이트 + 블랙 + VOGUE 레드 + 페이퍼 베이지
 * - Bodoni Moda 디스플레이 + Inter 본문
 * - 6 섹션: Cover / Editorial / Gallery / Venue / Subscribe / Footer
 *
 * [시그니처]
 * - 매거진 커버 (마스트헤드 + 큰 타이포 + cover lines + 가격/바코드)
 * - 에디토리얼 컬럼 레이아웃 (CSS columns + 드롭캡)
 * - 페이지 번호 마커
 */

export const handle = { demoName: "E-S12 Wedding Magazine" }

export const meta: Route.MetaFunction = () => [
  { title: "Elara & Theo · Wedding Issue — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 잡지 커버 청첩장 디자인 데모. 가상 커플이며 실존 인물/장소와 무관합니다. VOGUE 스타일 에디토리얼 톤 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
  },
]

const EDITORIAL_IMAGES = [e1Url, e2Url, e3Url, e4Url]

export default function WeddingMagazine() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanup = initScrollReveal(root)
    return () => cleanup()
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()]

  return (
    <div ref={rootRef} className="wedding-magazine">
      {/* ===== 1. Magazine Cover ===== */}
      <section className="wmag-cover">
        <div className="wmag-cover-bg" style={{ backgroundImage: `url(${coverUrl})` }} aria-hidden="true" />

        <div className="wmag-cover-inner">
          <header className="wmag-cover-top">
            <p className="wmag-cover-masthead">PIXELMARK <em style={{ fontStyle: "italic", color: "var(--wmag-red)" }}>EDITORIAL</em></p>
            <div className="wmag-cover-issue">
              <strong>{magazine.issue}</strong>
              <span>{magazine.volume}</span>
            </div>
          </header>

          <div className="wmag-cover-title-block">
            <p className="wmag-cover-headline">— {magazine.cover.headline} —</p>
            <h1 className="wmag-cover-title">
              {couple.bride.toUpperCase()}
              <span className="wmag-cover-amp"> &amp; </span>
              {couple.groom.toUpperCase()}
            </h1>
            <p className="wmag-cover-subhead">{magazine.cover.subheadline}</p>
            <div className="wmag-cover-lines">
              {magazine.cover.cover_lines.map((line, i) => {
                const [tag, ...rest] = line.split(" — ")
                return (
                  <p key={i} className="wmag-cover-line">
                    <strong>{tag}</strong> — {rest.join(" — ")}
                  </p>
                )
              })}
            </div>
          </div>

          <footer className="wmag-cover-bottom">
            <span className="wmag-cover-price">{magazine.price}</span>
            <span className="wmag-cover-date">{`${monthShort} ${date.getDate()} · ${yyyy}`}</span>
            <span className="wmag-cover-barcode">{magazine.barcode}</span>
          </footer>
        </div>
      </section>

      {/* ===== 2. Editorial ===== */}
      <section className="wmag-section">
        <div className="wmag-container">
          <div className="wmag-page-marker">
            <span className="wmag-page-marker-num">PAGE 02</span>
            <span className="wmag-page-marker-title">EDITORIAL</span>
            <span className="wmag-page-marker-issue">{magazine.issue}</span>
          </div>

          <div className="wmag-editorial-grid" data-wmag-reveal>
            <aside className="wmag-editorial-aside">
              <p className="wmag-editorial-byline">{editorial.byline}</p>
              <p className="wmag-editorial-date">{editorial.date}</p>
            </aside>
            <div>
              <h2 className="wmag-editorial-headline">A Quiet Editorial<br />on Two Lives Becoming One</h2>
              <div className="wmag-editorial-body">
                {editorial.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Gallery ===== */}
      <section className="wmag-section">
        <div className="wmag-container">
          <div className="wmag-page-marker">
            <span className="wmag-page-marker-num">PAGE 04</span>
            <span className="wmag-page-marker-title">PHOTO EDITORIAL</span>
            <span className="wmag-page-marker-issue">{magazine.issue}</span>
          </div>

          <div className="wmag-gallery-intro" data-wmag-reveal>
            <h2 className="wmag-gallery-intro-title">Four Frames of the Day</h2>
            <p className="wmag-gallery-intro-sub">A quiet editorial — linen, florals, the setting, and the music.</p>
          </div>

          <div className="wmag-gallery-grid">
            {editorialItems.map((item, i) => (
              <article key={item.num} className="wmag-gallery-item" data-wmag-reveal data-stagger-index={i}>
                <div className="wmag-gallery-image">
                  <img src={EDITORIAL_IMAGES[i]} alt={`${item.title} editorial (가상)`} loading="lazy" />
                </div>
                <div className="wmag-gallery-meta">
                  <span className="wmag-gallery-num">№ {item.num}</span>
                  <div>
                    <h3 className="wmag-gallery-title">{item.title}</h3>
                    <p className="wmag-gallery-caption">{item.caption}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Venue ===== */}
      <section className="wmag-section wmag-venue">
        <div className="wmag-container">
          <div className="wmag-page-marker">
            <span className="wmag-page-marker-num">PAGE 08</span>
            <span className="wmag-page-marker-title">THE VENUE</span>
            <span className="wmag-page-marker-issue">{magazine.issue}</span>
          </div>

          <div className="wmag-venue-grid" data-wmag-reveal>
            <div className="wmag-venue-info">
              <p className="wmag-venue-eyebrow">— Now Featured —</p>
              <h3 className="wmag-venue-name">{venue.name}</h3>
              <p className="wmag-venue-name-kr">{venue.nameKr}</p>
              <div className="wmag-venue-row">
                <p className="wmag-venue-row-label">Date</p>
                <p className="wmag-venue-row-value">{`${monthShort} ${date.getDate()}, ${yyyy}`}</p>
              </div>
              <div className="wmag-venue-row">
                <p className="wmag-venue-row-label">Time</p>
                <p className="wmag-venue-row-value">15:00 — Late</p>
              </div>
              <div className="wmag-venue-row">
                <p className="wmag-venue-row-label">Address</p>
                <p className="wmag-venue-row-value">{venue.addressKr}</p>
              </div>
            </div>
            <div className="wmag-venue-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Subscribe ===== */}
      <section className="wmag-section wmag-subscribe">
        <div className="wmag-container">
          <div className="wmag-subscribe-card" data-wmag-reveal>
            <p className="wmag-subscribe-eyebrow">— Subscribe to the Story —</p>
            <h2 className="wmag-subscribe-title">Will You Be There?</h2>
            <p className="wmag-subscribe-sub">A quiet editorial on a quiet day. Reserve your seat.</p>

            <div className="wmag-subscribe-info">
              <div className="wmag-subscribe-info-row">
                <span className="wmag-subscribe-info-label">Issue</span>
                <span className="wmag-subscribe-info-value">{magazine.issue}</span>
              </div>
              <div className="wmag-subscribe-info-row">
                <span className="wmag-subscribe-info-label">Date</span>
                <span className="wmag-subscribe-info-value">{`${monthShort} ${date.getDate()}, ${yyyy}`}</span>
              </div>
              <div className="wmag-subscribe-info-row">
                <span className="wmag-subscribe-info-label">Venue</span>
                <span className="wmag-subscribe-info-value">{venue.name}</span>
              </div>
              <div className="wmag-subscribe-info-row">
                <span className="wmag-subscribe-info-label">Price</span>
                <span className="wmag-subscribe-info-value">{magazine.price}</span>
              </div>
            </div>

            <a
              href="#"
              className="wmag-subscribe-rsvp"
              onClick={(e) => e.preventDefault()}
            >
              SUBSCRIBE / RSVP →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wmag-footer">
        <p className="wmag-footer-mast">— FIN —</p>
        <p className="wmag-footer-issue">{`Pixelmark Editorial · ${magazine.issue} · ${magazine.volume}`}</p>
        <p className="wmag-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Editorial'은 가상 매거진이며, 표시된 모든 인물 / 장소 / 일정 / 호 정보는 가상이고 실존 인물 또는 매거진과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
