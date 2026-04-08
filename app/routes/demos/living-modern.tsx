import { useEffect, useRef } from "react"
import type { Route } from "./+types/living-modern"
import "~/demos/living-modern/main.scss"
import { initScrollReveal } from "~/demos/living-modern/modules/scrollReveal"
import {
  brand,
  hero,
  rooms,
  collection,
  showroom,
} from "~/demos/living-modern/data/content"

import heroUrl from "~/demos/living-modern/assets/images/hero/hero.webp"
import livingMainUrl from "~/demos/living-modern/assets/images/rooms/room-living-main.webp"
import livingDetailUrl from "~/demos/living-modern/assets/images/rooms/room-living-detail.webp"
import bedroomMainUrl from "~/demos/living-modern/assets/images/rooms/room-bedroom-main.webp"
import bedroomDetailUrl from "~/demos/living-modern/assets/images/rooms/room-bedroom-detail.webp"
import kitchenUrl from "~/demos/living-modern/assets/images/rooms/room-kitchen.webp"
import sofaUrl from "~/demos/living-modern/assets/images/collection/collection-sofa.webp"
import tableUrl from "~/demos/living-modern/assets/images/collection/collection-table.webp"
import lampUrl from "~/demos/living-modern/assets/images/collection/collection-lamp.webp"

/**
 * B-S3 Living Modern — Maison Brisé
 *
 * [컨셉] 모던 우드 + 매거진 비대칭 그리드 + 절제된 모션
 * 5 섹션: Hero / Rooms / Collection / Showroom / Footer
 * 시그니처: 룸별 매거진 스프레드(메인+디테일 비대칭, 짝수번 좌우 반전)
 */

export const handle = { demoName: "B-S3 Maison Brisé" }

export const meta: Route.MetaFunction = () => [
  { title: "Maison Brisé · Modern Living — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 가구/리빙 브랜드 카탈로그 디자인 데모. 가상 브랜드 'Maison Brisé'이며 실존 브랜드와 무관합니다.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap",
  },
]

const ROOM_MAIN: Record<"living-main" | "bedroom-main" | "kitchen", string> = {
  "living-main": livingMainUrl,
  "bedroom-main": bedroomMainUrl,
  "kitchen": kitchenUrl,
}
const ROOM_DETAIL: Record<"living-detail" | "bedroom-detail", string> = {
  "living-detail": livingDetailUrl,
  "bedroom-detail": bedroomDetailUrl,
}
// 컬렉션 4번 chair는 권장이라 미생성 → sofa 재사용으로 그래이스풀 fallback
const COLLECTION_IMAGES: Record<"sofa" | "table" | "lamp" | "chair", string> = {
  sofa: sofaUrl,
  table: tableUrl,
  lamp: lampUrl,
  chair: sofaUrl,
}

export default function LivingModern() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanup = initScrollReveal(root)
    return cleanup
  }, [])

  return (
    <div ref={rootRef} className="living-modern">
      {/* ===== Hero ===== */}
      <section className="lvm-hero">
        <div className="lvm-hero-image">
          <img src={heroUrl} alt="Maison Brisé 인테리어 (가상)" loading="eager" />
        </div>
        <div className="lvm-container lvm-hero-inner">
          <div className="lvm-hero-top">
            <span>{brand.name}</span>
            <span>{brand.founded}</span>
          </div>
          <div className="lvm-hero-center">
            <span className="lvm-hero-eyebrow">{hero.eyebrow} · {hero.eyebrowKr}</span>
            <h1 className="lvm-hero-name">{brand.name}</h1>
            <p className="lvm-hero-tagline">"{brand.tagline}" · {brand.taglineKr}</p>
            <p className="lvm-hero-body">{hero.body}</p>
          </div>
          <div className="lvm-hero-bottom">
            <span>Spring Collection 2026</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      {/* ===== Rooms (시그니처) ===== */}
      <section className="lvm-section">
        <div className="lvm-container">
          <div className="lvm-section-head" data-lvm-reveal>
            <h2 className="lvm-section-title">{`Four\nRooms.`}</h2>
            <div className="lvm-section-meta">
              <p>ROOMS · 03</p>
              <p>공간별로 보는 가구</p>
            </div>
          </div>

          <div className="lvm-rooms-list">
            {rooms.map((r) => (
              <article key={r.code} className="lvm-room" data-lvm-reveal>
                <div className="lvm-room-main">
                  <img src={ROOM_MAIN[r.main]} alt={`${r.nameKr} (가상)`} loading="lazy" />
                </div>
                {r.detail ? (
                  <div className="lvm-room-detail">
                    <img src={ROOM_DETAIL[r.detail]} alt={`${r.nameKr} 디테일 (가상)`} loading="lazy" />
                  </div>
                ) : (
                  <div className="lvm-room-detail" aria-hidden="true">
                    <img src={ROOM_MAIN[r.main]} alt="" loading="lazy" />
                  </div>
                )}
                <div className="lvm-room-info" style={{ gridColumn: "1 / -1" }}>
                  <span className="lvm-room-code">№ {r.code}</span>
                  <div>
                    <h3 className="lvm-room-name">{r.name}</h3>
                    <p className="lvm-room-name-kr">{r.nameKr}</p>
                  </div>
                  <p className="lvm-room-caption">{r.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Collection ===== */}
      <section className="lvm-section lvm-collection">
        <div className="lvm-container">
          <div className="lvm-collection-intro" data-lvm-reveal>
            <div>
              <span className="lvm-eyebrow">{collection.eyebrow}</span>
              <h2 className="lvm-collection-title">{collection.titleKr}</h2>
            </div>
            <p className="lvm-collection-body">{collection.body}</p>
          </div>

          <div className="lvm-collection-grid">
            {collection.items.map((it, i) => (
              <article key={it.num} className="lvm-collection-card" data-lvm-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="lvm-collection-card-image">
                  <img src={COLLECTION_IMAGES[it.image]} alt={`${it.titleKr} (가상)`} loading="lazy" />
                </div>
                <div className="lvm-collection-card-body">
                  <p className="lvm-collection-card-num">№ {it.num} · {collection.eyebrow}</p>
                  <h3 className="lvm-collection-card-title">{it.title}</h3>
                  <p className="lvm-collection-card-title-kr">{it.titleKr}</p>
                  <p className="lvm-collection-card-caption">{it.caption}</p>
                  <div className="lvm-collection-card-meta">
                    <span>{it.size}</span>
                    <span className="lvm-collection-card-price">{it.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Showroom ===== */}
      <section className="lvm-section">
        <div className="lvm-container">
          <div className="lvm-section-head" data-lvm-reveal>
            <h2 className="lvm-section-title">{`Visit the\nShowroom.`}</h2>
            <div className="lvm-section-meta">
              <p>HANNAM, SEOUL</p>
              <p>한남 쇼룸 안내</p>
            </div>
          </div>

          <div className="lvm-showroom-grid">
            <div className="lvm-showroom-card" data-lvm-reveal>
              <h3 className="lvm-showroom-name">{showroom.name}</h3>
              <p className="lvm-showroom-name-en">{showroom.nameEn}</p>
              <p className="lvm-showroom-row"><strong>Address · 주소</strong>{showroom.address}</p>
              <p className="lvm-showroom-row"><strong>Hours · 운영시간</strong>{showroom.hours}</p>
              <p className="lvm-showroom-row"><strong>Phone · 전화</strong>{showroom.phone}</p>
              <p className="lvm-showroom-notice">{showroom.notice}</p>
            </div>
            <div className="lvm-showroom-map" data-lvm-reveal>
              <iframe src={showroom.mapEmbedSrc} title="Maison Brisé 쇼룸 위치 지도" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="lvm-footer">
        <div className="lvm-container">
          <div className="lvm-footer-grid">
            <div>
              <p className="lvm-footer-name">{brand.name}</p>
              <p className="lvm-footer-tag">{brand.tagline} · {brand.taglineKr}</p>
            </div>
            <div className="lvm-footer-meta">
              <p>{brand.founded}</p>
              <p>Modern Wood / Slow Living</p>
            </div>
          </div>
          <p className="lvm-footer-disclaimer">
            ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
            <br />
            'Maison Brisé'는 가상 가구 / 리빙 브랜드이며, 표시된 모든 가구 / 쇼룸 / 가격은 가상이고 실존 브랜드와 무관합니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
