import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-newsprint"
import "~/demos/wedding-newsprint/main.scss"
import { initHeadlineTyping } from "~/demos/wedding-newsprint/modules/headlineTyping"
import { initScrollReveal } from "~/demos/wedding-newsprint/modules/scrollReveal"
import {
  newspaper,
  couple,
  headline,
  headlineEn,
  subhead,
  article,
  venue,
  classifieds,
  accounts,
  getWeddingDate,
} from "~/demos/wedding-newsprint/data/content"

import bw1Url from "~/demos/wedding-newsprint/assets/images/gallery/gallery-bw-01.webp"
import bw2Url from "~/demos/wedding-newsprint/assets/images/gallery/gallery-bw-02.webp"
import bw3Url from "~/demos/wedding-newsprint/assets/images/gallery/gallery-bw-03.webp"
import bw4Url from "~/demos/wedding-newsprint/assets/images/gallery/gallery-bw-04.webp"

/**
 * E-S16 Wedding Newsprint — 신문 청첩장
 *
 * [컨셉] "빈티지 신문 + 헤드라인 + 3컬럼"
 * - 종이 베이지 + 잉크 블랙 + 빈티지 레드
 * - Old Standard TT + Source Serif Pro
 * - 5 섹션: Masthead / Article / Wedding / Gallery / Classified / Footer
 *
 * [시그니처]
 * - 신문 마스트헤드 (THE PIXELMARK TIMES) + 헤드라인 typing 효과
 * - 3컬럼 신문 본문 (CSS columns + 드롭캡)
 * - WANTED/FOR SALE/LOST 분류광고 카드
 * - 흑백 갤러리 4프레임
 */

export const handle = { demoName: "E-S16 Wedding Newsprint" }

export const meta: Route.MetaFunction = () => [
  { title: "Olivia & Henry · The Pixelmark Times — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 신문 청첩장 디자인 데모. 가상 커플이며 실존 신문사/인물과 무관합니다. 빈티지 신문 컨셉 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&display=swap",
  },
]

const GALLERY = [
  { url: bw1Url, caption: "창가에 마주 앉은 두 사람" },
  { url: bw2Url, caption: "조용한 아침의 부엌" },
  { url: bw3Url, caption: "어느 오후의 산책길" },
  { url: bw4Url, caption: "편지와 느린 의식들" },
]

export default function WeddingNewsprint() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initHeadlineTyping(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const monthFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]
  const dayFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
  const today = new Date()
  const todayLabel = `${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][today.getDay()]} · ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`

  return (
    <div ref={rootRef} className="wedding-newsprint">
      {/* ===== 1. Masthead + Headline ===== */}
      <header className="wnews-masthead">
        <div className="wnews-masthead-inner">
          <div className="wnews-masthead-meta">
            <span>{todayLabel}</span>
            <span className="wnews-masthead-edition">{newspaper.edition}</span>
            <span>{newspaper.city}</span>
          </div>

          <h1 className="wnews-masthead-title">{newspaper.masthead}</h1>
          <p className="wnews-masthead-motto">"{newspaper.motto}"</p>

          <div className="wnews-headline-block">
            <p className="wnews-headline-eyebrow">— BREAKING NEWS —</p>
            {/* 큰 영문 헤드라인 (디스플레이) */}
            <h2 className="wnews-headline" data-wnews-typing>{headlineEn}</h2>
            {/* 한국어 메인 헤드라인 + 부제 (정보 전달) */}
            <p className="wnews-headline-kr">{headline}</p>
            <p className="wnews-subhead">{subhead}</p>
            <span className="wnews-masthead-stamp">SPECIAL EDITION</span>
          </div>
        </div>
      </header>

      {/* ===== 2. Article (3컬럼) ===== */}
      <section className="wnews-section wnews-section--no-border">
        <div className="wnews-container">
          <div className="wnews-section-rule">
            <span className="wnews-section-label">Lifestyle · Page 02</span>
            <span className="wnews-section-rule-spacer" />
            <span className="wnews-section-meta">{newspaper.city}</span>
          </div>

          <p className="wnews-article-byline" data-wnews-reveal>{article.byline}</p>
          <div className="wnews-article-body" data-wnews-reveal>
            {article.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ===== 3. Wedding Section ===== */}
      <section className="wnews-section">
        <div className="wnews-container">
          <div className="wnews-section-rule">
            <span className="wnews-section-label wnews-section-label-red">Wedding Section · Page 03</span>
            <span className="wnews-section-rule-spacer" />
            <span className="wnews-section-meta">DETAILS</span>
          </div>

          <div className="wnews-wedding-grid" data-wnews-reveal>
            <div className="wnews-wedding-info">
              <p className="wnews-wedding-info-eyebrow">— 결혼 안내 · Wedding Notice —</p>
              <div className="wnews-wedding-row">
                <p className="wnews-wedding-row-label">신랑 신부 · The Couple</p>
                <p className="wnews-wedding-row-value">{couple.brideKr} ({couple.bride}) &amp; {couple.groomKr} ({couple.groom})</p>
              </div>
              <div className="wnews-wedding-row">
                <p className="wnews-wedding-row-label">일시 · Date</p>
                <p className="wnews-wedding-row-value">{`${yyyy}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${["일","월","화","수","목","금","토"][date.getDay()]}) 오후 2시`}</p>
              </div>
              <div className="wnews-wedding-row">
                <p className="wnews-wedding-row-label">예식장 · Venue</p>
                <p className="wnews-wedding-row-value">{venue.name} ({venue.nameEn})</p>
              </div>
              <div className="wnews-wedding-row">
                <p className="wnews-wedding-row-label">주소 · Address</p>
                <p className="wnews-wedding-row-value">{venue.address}</p>
              </div>
            </div>
            <div className="wnews-wedding-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. Photo Page ===== */}
      <section className="wnews-section">
        <div className="wnews-container">
          <div className="wnews-section-rule">
            <span className="wnews-section-label">Photo Page · Page 04</span>
            <span className="wnews-section-rule-spacer" />
            <span className="wnews-section-meta">FOUR FRAMES</span>
          </div>

          <div className="wnews-gallery-grid">
            {GALLERY.map((g, i) => (
              <figure key={g.url} className="wnews-gallery-item" data-wnews-reveal data-stagger-index={i}>
                <div className="wnews-gallery-image">
                  <img src={g.url} alt={`${g.caption} (가상)`} loading="lazy" />
                </div>
                <figcaption className="wnews-gallery-caption">— {g.caption} —</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Classified ===== */}
      <section className="wnews-section">
        <div className="wnews-container">
          <div className="wnews-section-rule">
            <span className="wnews-section-label wnews-section-label-red">Classified · Page 05</span>
            <span className="wnews-section-rule-spacer" />
            <span className="wnews-section-meta">RSVP &amp; ACCOUNTS</span>
          </div>

          <div className="wnews-classified-grid" data-wnews-reveal>
            {classifieds.map((c) => (
              <article key={c.label} className="wnews-classified-card">
                <span className="wnews-classified-label">{c.label}</span>
                <h3 className="wnews-classified-title">{c.title}</h3>
                <p className="wnews-classified-desc">{c.desc}</p>
              </article>
            ))}
          </div>

          <div className="wnews-accounts" data-wnews-reveal>
            {accounts.map((a) => (
              <div key={a.side} className="wnews-account">
                <p className="wnews-account-side">— {a.side} —</p>
                <p className="wnews-account-role">{a.role}</p>
                <p className="wnews-account-bank">{a.bank}</p>
                <p className="wnews-account-number">{a.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wnews-footer">
        <p className="wnews-footer-end">— END OF EDITION —</p>
        <p className="wnews-footer-sub">{`${newspaper.masthead} · ${newspaper.edition}`}</p>
        <p className="wnews-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'The Pixelmark Times'는 가상 신문이며, 표시된 모든 인물 / 장소 / 기사 / 일정은 가상이고 실존 신문 또는 인물과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
