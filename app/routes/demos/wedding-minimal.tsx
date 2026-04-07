import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-minimal"
import "~/demos/wedding-minimal/main.scss"
import { initTypewriter } from "~/demos/wedding-minimal/modules/typewriter"
import { initCountdown } from "~/demos/wedding-minimal/modules/countdown"
import { initCopyAccount } from "~/demos/wedding-minimal/modules/copyAccount"
import { initScrollReveal } from "~/demos/wedding-minimal/modules/scrollReveal"
import {
  couple,
  parents,
  greeting,
  story,
  venue,
  directions,
  accounts,
  getWeddingDate,
} from "~/demos/wedding-minimal/data/content"

// 이미지 (Vite asset import — 라우트 코드 스플리팅으로 데모 chunk에 포함)
import introBgUrl from "~/demos/wedding-minimal/assets/images/intro/intro-bg.webp"
import story1Url from "~/demos/wedding-minimal/assets/images/story/story-1.webp"
import story2Url from "~/demos/wedding-minimal/assets/images/story/story-2.webp"
import story3Url from "~/demos/wedding-minimal/assets/images/story/story-3.webp"
import galleryMainUrl from "~/demos/wedding-minimal/assets/images/gallery/gallery-main.webp"
import gallerySubUrl from "~/demos/wedding-minimal/assets/images/gallery/gallery-sub.webp"

/**
 * E-S1 Wedding Minimal — 미니멀 화이트 청첩장 데모
 *
 * [컨셉] "절제된 모던, 글로 쓴 우리 이야기"
 * - 화이트 + 옅은 골드 + 충분한 여백
 * - 외부 라이브러리 0개 (모든 인터랙션 직접 구현)
 * - 7섹션 원페이지: Intro / Greeting / Story / Gallery / Details / Account / Footer
 *
 * [모듈 4개]
 * 1. typewriter — 신랑신부 영문 이름 한 글자씩 타이핑
 * 2. scrollReveal — IntersectionObserver 기반 페이드인
 * 3. countdown — D-day 실시간 카운트다운 (setInterval)
 * 4. copyAccount — navigator.clipboard + 토스트
 *
 * [컨벤션 — 가상 데모]
 * - 신랑신부 / 부모 / 식장 / 계좌 모두 placeholder
 * - 인물 사진 X (식물/공간/디테일 위주의 fal.ai 생성 이미지)
 * - 푸터에 가상 데모 명시 필수
 */

export const handle = { demoName: "E-S1 Wedding Minimal" }

export const meta: Route.MetaFunction = () => [
  { title: "○○ & ○○ Wedding — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 미니멀 화이트 청첩장 디자인 데모. 가상 청첩장이며 실존 인물/식장과 무관합니다. 절제된 모던 청첩장 샘플.",
  },
]

// 디스플레이 세리프 폰트 (Cormorant Garamond) — 데모 라우트에서만 로드
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap",
  },
]

// story 챕터에 이미지 매핑 (data 모듈은 string 의존성 없이 깨끗하게 유지)
const STORY_IMAGES = [story1Url, story2Url, story3Url]

export default function WeddingMinimal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initTypewriter(root),
      initScrollReveal(root),
      initCountdown(root),
      initCopyAccount(root),
    ]
    return () => {
      cleanups.reverse().forEach((fn) => {
        try { fn() } catch (err) { console.warn("[wedding-minimal] cleanup", err) }
      })
    }
  }, [])

  /**
   * 결혼식 날짜 — 매년 6월 15일 13:00 (지난 해면 다음 해)
   * 카운트다운 모듈은 data-target ISO 문자열만 읽음
   */
  const weddingDate = getWeddingDate()
  const weddingISO = weddingDate.toISOString()
  const yyyy = weddingDate.getFullYear()
  const mm = String(weddingDate.getMonth() + 1).padStart(2, "0")
  const dd = String(weddingDate.getDate()).padStart(2, "0")
  const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][weddingDate.getDay()]

  return (
    <div ref={rootRef} className="wedding-minimal">
      {/* ===== 1. Intro ===== */}
      <section className="wm-intro">
        <div className="wm-intro-bg" style={{ backgroundImage: `url(${introBgUrl})` }} aria-hidden="true" />
        <div className="wm-intro-inner">
          <p className="wm-eyebrow wm-intro-eyebrow">We are getting married</p>
          <div className="wm-intro-names">
            <span className="wm-typewriter" data-wm-typewriter>
              <span className="wm-typewriter-text" data-text={couple.groomDisplay} />
              <span className="wm-typewriter-cursor" />
            </span>
            <span className="wm-intro-and">&amp;</span>
            <span className="wm-typewriter" data-wm-typewriter>
              <span className="wm-typewriter-text" data-text={couple.brideDisplay} />
              <span className="wm-typewriter-cursor" />
            </span>
          </div>
          <p className="wm-intro-date">{`${yyyy}. ${mm}. ${dd}. ${dayName}`}</p>
          <p className="wm-intro-venue">{venue.name}</p>
        </div>
        <div className="wm-intro-scroll" aria-hidden="true">
          <span>Scroll</span>
          <svg viewBox="0 0 14 22" fill="none">
            <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" />
            <circle cx="7" cy="6" r="1.25" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== 2. Greeting ===== */}
      <section className="wm-section wm-greeting" data-wm-reveal>
        <div className="wm-container">
          <p className="wm-eyebrow wm-section-eyebrow">Invitation</p>
          <h2 className="wm-section-title">소중한 분들을 초대합니다</h2>
          <div className="wm-divider" style={{ margin: "0 auto 40px" }} />
          <div className="wm-greeting-body wm-prose">
            {greeting.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="wm-greeting-parents">
            <div>
              <p className="wm-side-label">신랑측</p>
              <p className="wm-side-names">
                <strong>{parents.groomFather}</strong> · <strong>{parents.groomMother}</strong>
                <br />의 아들 <strong>{couple.groomName}</strong>
              </p>
            </div>
            <div className="wm-side-divider" aria-hidden="true" />
            <div>
              <p className="wm-side-label">신부측</p>
              <p className="wm-side-names">
                <strong>{parents.brideFather}</strong> · <strong>{parents.brideMother}</strong>
                <br />의 딸 <strong>{couple.brideName}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Story ===== */}
      <section className="wm-section wm-story">
        <div className="wm-container">
          <p className="wm-eyebrow wm-section-eyebrow">Our Story</p>
          <h2 className="wm-section-title">우리의 이야기</h2>
          <div className="wm-divider" style={{ margin: "0 auto 56px" }} />
          <div className="wm-story-list">
            {story.map((chapter, i) => (
              <article key={chapter.chapter} className="wm-story-item" data-wm-reveal>
                <div className="wm-story-text">
                  <p className="wm-story-chapter">{chapter.chapter}</p>
                  <h3 className="wm-story-title">{chapter.title}</h3>
                  <p className="wm-story-body">{chapter.body}</p>
                </div>
                <div className="wm-story-image">
                  <img src={STORY_IMAGES[i]} alt={`${chapter.title} 이미지 (가상)`} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Gallery ===== */}
      <section className="wm-section">
        <div className="wm-container">
          <p className="wm-eyebrow wm-section-eyebrow">Gallery</p>
          <h2 className="wm-section-title">두 사람의 풍경</h2>
          <div className="wm-divider" style={{ margin: "0 auto 48px" }} />
          <div data-wm-reveal>
            <div className="wm-gallery-main">
              <img src={galleryMainUrl} alt="결혼식 풍경 이미지 (가상)" loading="lazy" />
            </div>
            <div className="wm-gallery-sub">
              <img src={gallerySubUrl} alt="갤러리 서브 이미지 (가상)" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Details ===== */}
      <section className="wm-section wm-details">
        <div className="wm-container">
          <p className="wm-eyebrow wm-section-eyebrow">Wedding Day</p>
          <h2 className="wm-section-title">결혼식 안내</h2>
          <div className="wm-divider" style={{ margin: "0 auto 40px" }} />

          <div data-wm-reveal>
            <p className="wm-details-date">{`${yyyy}. ${mm}. ${dd}`}</p>
            <p className="wm-details-time">{`${dayName} · 오후 1시`}</p>
            <p className="wm-details-venue">{venue.name}</p>
            <p className="wm-details-address">{venue.address} · {venue.detail}</p>

            {/* 카운트다운 */}
            <div className="wm-countdown" data-wm-countdown data-target={weddingISO} aria-label="결혼식까지 남은 시간">
              <div className="wm-countdown-cell">
                <div className="wm-countdown-num" data-cd-days>00</div>
                <div className="wm-countdown-label">Days</div>
              </div>
              <div className="wm-countdown-cell">
                <div className="wm-countdown-num" data-cd-hours>00</div>
                <div className="wm-countdown-label">Hours</div>
              </div>
              <div className="wm-countdown-cell">
                <div className="wm-countdown-num" data-cd-minutes>00</div>
                <div className="wm-countdown-label">Minutes</div>
              </div>
              <div className="wm-countdown-cell">
                <div className="wm-countdown-num" data-cd-seconds>00</div>
                <div className="wm-countdown-label">Seconds</div>
              </div>
            </div>

            {/* 지도 */}
            <div className="wm-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>

            {/* 오시는 길 */}
            <div className="wm-directions">
              {directions.map((d) => (
                <div key={d.type} className="wm-direction-item">
                  <p className="wm-direction-type">{d.type}</p>
                  <p className="wm-direction-desc">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Account ===== */}
      <section className="wm-section">
        <div className="wm-container">
          <p className="wm-eyebrow wm-section-eyebrow">With Heart</p>
          <h2 className="wm-section-title">마음 전하실 곳</h2>
          <div className="wm-divider" style={{ margin: "0 auto 40px" }} />
          <div className="wm-account-groups" data-wm-reveal>
            {accounts.map((group) => (
              <div key={group.side} className="wm-account-group">
                <p className="wm-account-side-title">{group.side}</p>
                <div className="wm-account-list">
                  {group.items.map((item) => (
                    <div key={item.role} className="wm-account-item">
                      <div className="wm-account-row">
                        <span className="wm-account-role">{item.role} · {item.name}</span>
                        <button
                          type="button"
                          className="wm-account-copy"
                          data-wm-copy={item.number}
                          aria-label={`${item.role} 계좌번호 복사`}
                        >
                          복사
                        </button>
                      </div>
                      <p className="wm-account-bank">
                        <strong>{item.bank}</strong> {item.number}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Footer ===== */}
      <footer className="wm-footer">
        <p className="wm-footer-thanks">Thank You</p>
        <p className="wm-footer-sub">소중한 발걸음으로 축복해 주시는 모든 분들께 감사드립니다.</p>
        <p className="wm-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          신랑신부 / 양가 부모 / 식장 / 계좌 등 모든 정보는 가상이며 실제 인물 또는 장소와 무관합니다.
        </p>
      </footer>

      {/* 토스트 (계좌 복사 결과) */}
      <div className="wm-toast" role="status" aria-live="polite" />
    </div>
  )
}
