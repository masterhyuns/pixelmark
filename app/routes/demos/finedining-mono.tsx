import { useEffect, useRef } from "react"
import type { Route } from "./+types/finedining-mono"
import "~/demos/finedining-mono/main.scss"
import { initScrollReveal } from "~/demos/finedining-mono/modules/scrollReveal"
import { brand, hero, chef, courses, menuMeta, wine, reservation } from "~/demos/finedining-mono/data/content"

import heroUrl from "~/demos/finedining-mono/assets/images/hero/hero.webp"
import chefUrl from "~/demos/finedining-mono/assets/images/chef/chef-hands.webp"
import c1Url from "~/demos/finedining-mono/assets/images/menu/course-1.webp"
import c2Url from "~/demos/finedining-mono/assets/images/menu/course-2.webp"
import c3Url from "~/demos/finedining-mono/assets/images/menu/course-3.webp"
import c4Url from "~/demos/finedining-mono/assets/images/menu/course-4.webp"

export const handle = { demoName: "F-S3 Restaurant Solène" }

export const meta: Route.MetaFunction = () => [
  { title: "Restaurant Solène · Tasting Menu — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 모노톤 시크 파인다이닝 디자인 데모. 가상 레스토랑 'Restaurant Solène'이며 실존 매장과 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap",
  },
]

const COURSE_IMAGES: Record<"1" | "2" | "3" | "4", string> = { "1": c1Url, "2": c2Url, "3": c3Url, "4": c4Url }

export default function FineDiningMono() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    return initScrollReveal(root)
  }, [])

  return (
    <div ref={rootRef} className="finedining-mono">
      {/* ===== Hero ===== */}
      <section className="fdm-hero">
        <div className="fdm-hero-image">
          <img src={heroUrl} alt="Restaurant Solène signature dish (가상)" loading="eager" />
        </div>
        <div className="fdm-container fdm-hero-inner">
          <div className="fdm-hero-top">
            <span>{brand.name}</span>
            <span>{brand.founded}</span>
          </div>
          <div className="fdm-hero-center">
            <span className="fdm-hero-eyebrow">— {hero.eyebrow} —</span>
            <h1 className="fdm-hero-name">{brand.name}</h1>
            <p className="fdm-hero-tagline">{brand.tagline} · {brand.taglineKr}</p>
            <p className="fdm-hero-body">{hero.body}</p>
          </div>
          <div className="fdm-hero-bottom">
            <span>Tasting Menu Only</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      {/* ===== Chef ===== */}
      <section className="fdm-section">
        <div className="fdm-container">
          <div className="fdm-chef-grid">
            <div className="fdm-chef-image" data-fdm-reveal>
              <img src={chefUrl} alt="셰프의 손과 요리 (가상)" loading="lazy" />
            </div>
            <div className="fdm-chef-text" data-fdm-reveal>
              <span className="fdm-eyebrow">{chef.eyebrow}</span>
              <h2>{chef.titleKr}</h2>
              {chef.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Menu — Courses ===== */}
      <section className="fdm-section" style={{ paddingTop: 0 }}>
        <div className="fdm-container">
          <div className="fdm-section-head" data-fdm-reveal>
            <span className="fdm-eyebrow">— {menuMeta.format} —</span>
            <h2 className="fdm-section-title">{`Tonight's\nMenu.`}</h2>
            <p className="fdm-section-title-kr">{menuMeta.formatKr} · {menuMeta.duration}</p>
          </div>
        </div>

        <div className="fdm-courses">
          {courses.map((c) => (
            <article key={c.num} className="fdm-course">
              <div className="fdm-course-image">
                <img src={COURSE_IMAGES[c.image]} alt={`${c.nameKr} (가상)`} loading="lazy" />
              </div>
              <div className="fdm-course-text">
                <span className="fdm-course-num">{c.num}</span>
                <h3 className="fdm-course-name">{c.name}</h3>
                <p className="fdm-course-name-kr">{c.nameKr}</p>
                <p className="fdm-course-caption">{c.caption}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="fdm-container">
          <div className="fdm-menu-meta" data-fdm-reveal>
            <p className="fdm-menu-meta-format">{menuMeta.format}</p>
            <p className="fdm-menu-meta-row">{menuMeta.formatKr} · {menuMeta.duration}</p>
            <p className="fdm-menu-meta-price">
              {menuMeta.price}
              <small>{menuMeta.pricePairing}</small>
            </p>
            <p className="fdm-menu-meta-notice">"{menuMeta.notice}"</p>
          </div>
        </div>
      </section>

      {/* ===== Wine ===== */}
      <section className="fdm-section fdm-wine">
        <div className="fdm-container">
          <div className="fdm-wine-grid" data-fdm-reveal>
            <span className="fdm-eyebrow">{wine.eyebrow}</span>
            <h2 className="fdm-wine-title">{wine.titleKr}</h2>
            <div className="fdm-wine-body">
              {wine.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Reservation ===== */}
      <section className="fdm-section">
        <div className="fdm-container">
          <div className="fdm-section-head" data-fdm-reveal>
            <span className="fdm-eyebrow">Reservation · 예약 안내</span>
            <h2 className="fdm-section-title">Save the Evening.</h2>
            <p className="fdm-section-title-kr">하루 두 번의 시팅, 12명 한정</p>
          </div>

          <div className="fdm-rsv-grid">
            <div className="fdm-rsv-card" data-fdm-reveal>
              <h3>예약 정책</h3>
              {reservation.policy.map((p, i) => <p key={i}>{p}</p>)}
              <div className="fdm-rsv-info">
                <strong>Dress Code · 드레스 코드</strong>
                <p>{reservation.dressCode}</p>
              </div>
            </div>
            <div className="fdm-rsv-card" data-fdm-reveal>
              <h3>영업시간 / 위치</h3>
              <div>
                {reservation.hours.map((h) => (
                  <div key={h.day} className="fdm-rsv-hours-row">
                    <strong>{h.day}</strong>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="fdm-rsv-info">
                <strong>주소</strong>
                <p>{reservation.address}</p>
                <strong>전화</strong>
                <p>{reservation.phone}</p>
                <strong>이메일</strong>
                <p>{reservation.email}</p>
              </div>
            </div>
          </div>
          <div className="fdm-rsv-map" data-fdm-reveal>
            <iframe src={reservation.mapEmbedSrc} title="Restaurant Solène 위치 지도" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="fdm-footer">
        <p className="fdm-footer-name">{brand.name}</p>
        <p className="fdm-footer-tag">{brand.tagline} · {brand.taglineKr}</p>
        <p className="fdm-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Restaurant Solène'은 가상 파인다이닝 레스토랑이며, 표시된 모든 셰프 / 코스 / 가격 / 일정은 가상이고 실존 매장과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
