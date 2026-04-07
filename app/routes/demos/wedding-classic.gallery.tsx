import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-classic.gallery"
import { initGallerySwiper } from "~/demos/wedding-classic/modules/gallerySwiper"
import gallery1Url from "~/demos/wedding-classic/assets/images/gallery/gallery-1.webp"
import gallery2Url from "~/demos/wedding-classic/assets/images/gallery/gallery-2.webp"
import gallery3Url from "~/demos/wedding-classic/assets/images/gallery/gallery-3.webp"
import gallery4Url from "~/demos/wedding-classic/assets/images/gallery/gallery-4.webp"
import gallery5Url from "~/demos/wedding-classic/assets/images/gallery/gallery-5.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Gallery — ○○ & ○○ Wedding (Demo)" },
  {
    name: "description",
    content:
      "Pixelmark의 클래식 럭셔리 청첩장 (가상) 갤러리 페이지 디자인 데모. Swiper 기반 풀스크린 캐러셀 샘플.",
  },
]

/**
 * gallery-1~5 필수(🔴), gallery-6~7은 권장(🟡).
 * 추가 생성 시 이 배열만 확장하면 자동 반영.
 */
const IMAGES = [
  { url: gallery1Url, caption: "The Venue" },
  { url: gallery2Url, caption: "The Hall" },
  { url: gallery3Url, caption: "The Table" },
  { url: gallery4Url, caption: "The Flowers" },
  { url: gallery5Url, caption: "The Promise" },
]

export default function WeddingClassicGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const handle = initGallerySwiper(root)
    return () => handle.destroy()
  }, [])

  return (
    <section ref={sectionRef} className="wc-gallery">
      <div className="wc-gallery-header">
        <p className="wc-eyebrow">Gallery</p>
        <h2 className="wc-section-title">Moments in Frame</h2>
        <p className="wc-section-title-kr">우리의 풍경</p>
        <div className="wc-divider" style={{ margin: "0 auto 8px" }} />
      </div>

      <div className="wc-gallery-swiper">
        <button type="button" className="wc-swiper-button wc-swiper-prev" aria-label="이전 사진">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button type="button" className="wc-swiper-button wc-swiper-next" aria-label="다음 사진">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="wc-swiper swiper">
          <div className="swiper-wrapper">
            {IMAGES.map((img, i) => (
              <div key={img.url} className="swiper-slide">
                <img
                  src={img.url}
                  alt={`Wedding gallery ${i + 1} — ${img.caption} (가상)`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="wc-swiper-pagination" />

        <p className="wc-gallery-counter">
          <span data-wc-counter>01</span>
          <span> / </span>
          <span>{String(IMAGES.length).padStart(2, "0")}</span>
        </p>
      </div>
    </section>
  )
}
