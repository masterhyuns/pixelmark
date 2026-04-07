import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-hanji"
import "~/demos/wedding-hanji/main.scss"
import { initCountdown } from "~/demos/wedding-hanji/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-hanji/modules/scrollReveal"
import {
  couple,
  parents,
  greeting,
  venue,
  gallery,
  accounts,
  getWeddingDate,
} from "~/demos/wedding-hanji/data/content"

import heroUrl from "~/demos/wedding-hanji/assets/images/hero/hero.webp"
import hanbokUrl from "~/demos/wedding-hanji/assets/images/gallery/gallery-hanbok.webp"
import hanokUrl from "~/demos/wedding-hanji/assets/images/gallery/gallery-hanok.webp"
import teaUrl from "~/demos/wedding-hanji/assets/images/gallery/gallery-tea.webp"

/**
 * E-S13 Wedding Hanji — 한지 전통 청첩장 데모
 *
 * [컨셉] "한지 + 단청 + 세로쓰기"
 * - 한지 베이지 + 먹색 + 단청 적/녹/금
 * - Noto Serif KR + 세로쓰기 한자
 * - 6 섹션: Hero / Greeting / Gallery / Venue / Account / Footer
 *
 * [시그니처]
 * - 히어로 세로쓰기 한자 이름 (writing-mode: vertical-rl)
 * - 단청 3색 디바이더
 * - 한지 종이 텍스처 배경 (CSS radial-gradient)
 */

export const handle = { demoName: "E-S13 Wedding Hanji" }

export const meta: Route.MetaFunction = () => [
  { title: "소은 & 도윤 — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 한지 전통 청첩장 디자인 데모. 가상 청첩장이며 실존 인물/장소와 무관합니다. 한복 / 한옥 웨딩 톤 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap",
  },
]

const GALLERY_IMAGES: Record<"hanbok" | "hanok" | "tea", string> = {
  hanbok: hanbokUrl,
  hanok: hanokUrl,
  tea: teaUrl,
}

const Divider = () => (
  <div className="whan-divider" aria-hidden="true">
    <span className="whan-divider-line" />
    <span className="whan-divider-line" />
    <span className="whan-divider-line" />
  </div>
)

export default function WeddingHanji() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [initCountdown(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayKr = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]

  return (
    <div ref={rootRef} className="wedding-hanji">
      {/* ===== 1. Hero ===== */}
      <section className="whan-hero">
        <div className="whan-hero-bg" style={{ backgroundImage: `url(${heroUrl})` }} aria-hidden="true" />

        <div className="whan-hero-inner">
          <p className="whan-eyebrow whan-hero-eyebrow">결혼합니다 · 結婚</p>

          {/* 세로쓰기 한자 이름 */}
          <div className="whan-hero-vertical">
            <span className="whan-hero-vertical-name">{couple.brideHanja}</span>
            <span className="whan-hero-vertical-amp">·</span>
            <span className="whan-hero-vertical-name">{couple.groomHanja}</span>
          </div>

          <h1 className="whan-hero-names-kr">{couple.bride} &amp; {couple.groom}</h1>
          <p className="whan-hero-names-en">— {greeting.titleEn} —</p>

          <div className="whan-hero-stamp">
            <p className="whan-hero-stamp-label">吉 日</p>
            <p className="whan-hero-stamp-date">{`${yyyy}. ${mm}. ${dd} (${dayKr})`}</p>
          </div>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="whan-section whan-greeting">
        <div className="whan-container">
          <div className="whan-section-header" data-whan-reveal>
            <p className="whan-eyebrow whan-section-eyebrow">초대 · 招待</p>
            <h2 className="whan-section-title">소중한 분들을 모십니다</h2>
            <p className="whan-section-title-hanja">— 婚禮의 글 —</p>
            <Divider />
          </div>

          <div className="whan-greeting-card" data-whan-reveal>
            <div className="whan-greeting-body whan-prose">
              {greeting.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="whan-greeting-parents">
              <div>
                <p className="whan-side-label">신랑 측</p>
                <p className="whan-side-names">
                  {parents.groomFather} · {parents.groomMother}
                  <br />의 아들 <strong>{couple.groom}</strong>
                </p>
              </div>
              <div className="whan-side-divider" aria-hidden="true" />
              <div>
                <p className="whan-side-label">신부 측</p>
                <p className="whan-side-names">
                  {parents.brideFather} · {parents.brideMother}
                  <br />의 딸 <strong>{couple.bride}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Gallery ===== */}
      <section className="whan-section">
        <div className="whan-container">
          <div className="whan-section-header" data-whan-reveal>
            <p className="whan-eyebrow whan-section-eyebrow">한 컷 · 一片</p>
            <h2 className="whan-section-title">우리의 풍경</h2>
            <p className="whan-section-title-hanja">— 韓의 풍경 —</p>
            <Divider />
          </div>

          <div className="whan-gallery-grid">
            {gallery.map((g, i) => (
              <article key={g.code} className="whan-gallery-item" data-whan-reveal data-stagger-index={i}>
                <div className="whan-gallery-image">
                  <img src={GALLERY_IMAGES[g.image]} alt={`${g.title} (가상)`} loading="lazy" />
                </div>
                <p className="whan-gallery-code">{g.code}</p>
                <h3 className="whan-gallery-title">{g.title}</h3>
                <p className="whan-gallery-caption">{g.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Venue ===== */}
      <section className="whan-section whan-venue">
        <div className="whan-container">
          <div className="whan-section-header" data-whan-reveal>
            <p className="whan-eyebrow whan-section-eyebrow">길 · 道</p>
            <h2 className="whan-section-title">오시는 길</h2>
            <p className="whan-section-title-hanja">— 婚禮 場所 —</p>
            <Divider />
          </div>

          <div className="whan-venue-card" data-whan-reveal>
            <p className="whan-venue-date">{`${yyyy}年 ${mm}月 ${dd}日`}</p>
            <p className="whan-venue-time">{`${dayKr}요일 · 오전 11시`}</p>
            <p className="whan-venue-name">{venue.name}</p>
            <p className="whan-venue-name-hanja">{venue.nameHanja}</p>
            <p className="whan-venue-address">{venue.address}</p>
          </div>

          <div
            className="whan-countdown"
            data-whan-countdown
            data-target={date.toISOString()}
            data-whan-reveal
            aria-label="결혼식까지 남은 시간"
          >
            <div className="whan-countdown-cell">
              <div className="whan-countdown-num" data-cd-days>00</div>
              <div className="whan-countdown-label">日</div>
            </div>
            <div className="whan-countdown-cell">
              <div className="whan-countdown-num" data-cd-hours>00</div>
              <div className="whan-countdown-label">時</div>
            </div>
            <div className="whan-countdown-cell">
              <div className="whan-countdown-num" data-cd-minutes>00</div>
              <div className="whan-countdown-label">分</div>
            </div>
            <div className="whan-countdown-cell">
              <div className="whan-countdown-num" data-cd-seconds>00</div>
              <div className="whan-countdown-label">秒</div>
            </div>
          </div>

          <div className="whan-venue-map" data-whan-reveal>
            <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== 5. Account ===== */}
      <section className="whan-section">
        <div className="whan-container">
          <div className="whan-section-header" data-whan-reveal>
            <p className="whan-eyebrow whan-section-eyebrow">마음 · 心</p>
            <h2 className="whan-section-title">마음 전하실 곳</h2>
            <p className="whan-section-title-hanja">— 心을 전하는 곳 —</p>
            <Divider />
          </div>

          <div className="whan-account-groups" data-whan-reveal>
            {accounts.map((group) => (
              <div key={group.sideKr} className="whan-account-group">
                <div className="whan-account-group-header">
                  <p className="whan-account-side-hanja">{group.sideHanja}</p>
                  <p className="whan-account-side-kr">{group.sideKr}</p>
                </div>
                {group.items.map((item) => (
                  <div key={item.role} className="whan-account-item">
                    <div className="whan-account-info">
                      <span className="whan-account-role">{item.role}</span>
                      <span className="whan-account-number">
                        <strong>{item.bank}</strong> {item.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="whan-footer">
        <p className="whan-footer-thanks">감사합니다</p>
        <p className="whan-footer-sub">{`${couple.bride} · ${couple.groom} · ${venue.name}`}</p>
        <p className="whan-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          신랑신부 / 양가 부모 / 식장 / 계좌 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>
    </div>
  )
}
