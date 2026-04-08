import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-storybook"
import "~/demos/wedding-storybook/main.scss"
import { initScrollReveal } from "~/demos/wedding-storybook/modules/scrollReveal"
import { initRsvpForm } from "~/demos/wedding-storybook/modules/rsvpForm"
import {
  story,
  couple,
  chapters,
  gallery,
  venue,
  accounts,
  getWeddingDate,
} from "~/demos/wedding-storybook/data/content"

import coverUrl from "~/demos/wedding-storybook/assets/images/cover/cover.webp"
import ch1Url from "~/demos/wedding-storybook/assets/images/chapters/chapter-01-meeting.webp"
import ch2Url from "~/demos/wedding-storybook/assets/images/chapters/chapter-02-promise.webp"
import g1Url from "~/demos/wedding-storybook/assets/images/gallery/gallery-memory-01.webp"
import g2Url from "~/demos/wedding-storybook/assets/images/gallery/gallery-memory-02.webp"
import g3Url from "~/demos/wedding-storybook/assets/images/gallery/gallery-memory-03.webp"

/**
 * E-S18 Wedding Storybook — 동화책 청첩장
 *
 * [컨셉] "동화책 그림책 + 챕터 스프레드 + 손글씨"
 * - 크림 + 브라운 + 살구 + 세이지
 * - Caveat 손글씨 + Fraunces 디스플레이
 * - 6 챕터: Cover / Chapter I / Chapter II / Gallery / Venue / RSVP / Footer
 *
 * [시그니처]
 * - 동화책 표지 (8px 살구 보더 + 그림자)
 * - 챕터 좌우 스프레드 (텍스트 + 이미지, 짝수 챕터 반전)
 * - 페이지 fold 그림자
 */

export const handle = { demoName: "E-S18 Wedding Storybook" }

export const meta: Route.MetaFunction = () => [
  { title: "Rosé & Theo · Once Upon a Time — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 동화책 청첩장 디자인 데모. 가상 커플이며 실존 인물/장소와 무관합니다. 그림책 챕터 스프레드 컨셉 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&display=swap",
  },
]

const CHAPTER_IMAGES = [ch1Url, ch2Url]
const GALLERY_IMAGES = [g1Url, g2Url, g3Url]

export default function WeddingStorybook() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initScrollReveal(root), initRsvpForm(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const monthFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]
  const dayFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]

  return (
    <div ref={rootRef} className="wedding-storybook">
      {/* ===== 1. Cover ===== */}
      <section className="wbook-cover">
        <div className="wbook-cover-book">
          <p className="wbook-cover-publisher">— {story.publisher} —</p>
          <div className="wbook-cover-image">
            <img src={coverUrl} alt={`${story.title} cover (가상)`} loading="eager" />
          </div>
          <h1 className="wbook-cover-title">{story.title}</h1>
          <p className="wbook-cover-author">{story.author}</p>
          <p className="wbook-cover-tagline">"{story.openLine}"</p>
        </div>
      </section>

      {/* ===== 2~3. Chapters ===== */}
      {chapters.map((c, i) => {
        const reverse = i % 2 === 1
        return (
          <section key={c.num} className="wbook-section">
            <div className="wbook-container">
              <div className="wbook-chapter-mark" data-wbook-reveal>
                <p className="wbook-chapter-num">— Chapter {c.num} —</p>
                <h2 className="wbook-chapter-title">{c.title}</h2>
                <p className="wbook-chapter-title-kr">{c.titleKr}</p>
              </div>

              <article className={`wbook-chapter-spread${reverse ? " wbook-chapter-spread--reverse" : ""}`} data-wbook-reveal>
                <div className="wbook-chapter-page wbook-chapter-page--image">
                  <img src={CHAPTER_IMAGES[i]} alt={`${c.title} illustration (가상)`} loading="lazy" />
                </div>
                <div className="wbook-chapter-page wbook-chapter-page--text">
                  <p className="wbook-chapter-roman">— Chapter {c.num} —</p>
                  <h3 className="wbook-chapter-text-title">{c.title}</h3>
                  <p className="wbook-chapter-text-title-kr">{c.titleKr}</p>
                  <div className="wbook-chapter-body">
                    {c.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                  <p className="wbook-chapter-page-num">— page {(i + 1) * 2 + 1} —</p>
                </div>
              </article>
            </div>
          </section>
        )
      })}

      {/* ===== Gallery ===== */}
      <section className="wbook-section">
        <div className="wbook-container">
          <div className="wbook-chapter-mark" data-wbook-reveal>
            <p className="wbook-chapter-num">— Chapter III —</p>
            <h2 className="wbook-chapter-title">Little Pictures</h2>
            <p className="wbook-chapter-title-kr">작은 그림들</p>
          </div>
          <div className="wbook-gallery-grid">
            {gallery.map((g, i) => (
              <article key={g.num} className="wbook-gallery-card" data-wbook-reveal data-stagger-index={i}>
                <div className="wbook-gallery-image">
                  <img src={GALLERY_IMAGES[i]} alt={`Memory ${g.num} (가상)`} loading="lazy" />
                </div>
                <div className="wbook-gallery-body">
                  <p className="wbook-gallery-num">— {g.num} —</p>
                  <p className="wbook-gallery-caption">{g.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Venue ===== */}
      <section className="wbook-section wbook-venue">
        <div className="wbook-container">
          <div className="wbook-chapter-mark" data-wbook-reveal>
            <p className="wbook-chapter-num">— Chapter IV —</p>
            <h2 className="wbook-chapter-title">The Wedding Day</h2>
            <p className="wbook-chapter-title-kr">결혼식 날</p>
          </div>

          <div className="wbook-venue-card" data-wbook-reveal>
            <p className="wbook-venue-eyebrow">— Save the Date —</p>
            <p className="wbook-venue-date">{`${monthFull} ${date.getDate()}, ${yyyy}`}</p>
            <p className="wbook-venue-time">{`${dayFull} · 13:00`}</p>
            <p className="wbook-venue-name">{venue.nameEn}</p>
            <p className="wbook-venue-name-kr">{venue.name}</p>
            <p className="wbook-venue-address">{venue.address}</p>
          </div>

          <div className="wbook-venue-map" data-wbook-reveal>
            <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== RSVP + Account ===== */}
      <section className="wbook-section wbook-rsvp">
        <div className="wbook-container">
          <div className="wbook-chapter-mark" data-wbook-reveal>
            <p className="wbook-chapter-num">— Chapter V —</p>
            <h2 className="wbook-chapter-title">To Our Friends</h2>
            <p className="wbook-chapter-title-kr">우리 친구들에게</p>
          </div>

          <form className="wbook-rsvp-form" data-wbook-reveal>
            <label className="wbook-rsvp-label">— Will you join our story? —</label>
            <input type="text" name="name" className="wbook-rsvp-input" placeholder="Your name" autoComplete="off" required />
            <button type="submit" className="wbook-rsvp-submit">— Send RSVP →</button>
          </form>

          <div className="wbook-accounts" data-wbook-reveal>
            {accounts.map((a) => (
              <div key={a.side} className="wbook-account">
                <p className="wbook-account-side">— {a.side} —</p>
                <p className="wbook-account-role">{a.role}</p>
                <p className="wbook-account-bank">{a.bank}</p>
                <p className="wbook-account-number">{a.number}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 모달 */}
        <div className="wbook-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="wbook-rsvp-modal-title">
          <div className="wbook-rsvp-modal-dialog">
            <button type="button" className="wbook-rsvp-modal-close" aria-label="모달 닫기">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
            <p className="wbook-rsvp-modal-eyebrow">— And so —</p>
            <h3 id="wbook-rsvp-modal-title" className="wbook-rsvp-modal-title">Happily<br />Ever After</h3>
            <p className="wbook-rsvp-modal-desc">
              <span className="wbook-rsvp-modal-name">Friend</span>,<br />
              your name is now part of the story.
              <br /><br />
              See you at the chapter where it all begins.
              <br /><br />
              <small>(※ 데모 폼 — 실제 접수되지 않습니다)</small>
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wbook-footer">
        <p className="wbook-footer-end">— The End —</p>
        <p className="wbook-footer-sub">{`${couple.bride} & ${couple.groom} · ${story.publisher}`}</p>
        <p className="wbook-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Storybooks'는 가상 출판사이며, 표시된 모든 인물 / 장소 / 일정은 가상이고 실존 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
