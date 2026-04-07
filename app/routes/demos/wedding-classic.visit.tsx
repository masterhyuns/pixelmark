import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-classic.visit"
import { initScrollReveal } from "~/demos/wedding-classic/modules/scrollReveal"
import { venue, directions } from "~/demos/wedding-classic/data/content"
import visitHotelUrl from "~/demos/wedding-classic/assets/images/visit/visit-hotel.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Visit — ○○ & ○○ Wedding (Demo)" },
  {
    name: "description",
    content:
      "Pixelmark의 클래식 럭셔리 청첩장 (가상) 오시는 길 페이지 디자인 데모. 호텔 웨딩 카카오맵 임베드 샘플.",
  },
]

export default function WeddingClassicVisit() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanup = initScrollReveal(root)
    return () => cleanup()
  }, [])

  return (
    <section ref={sectionRef} className="wc-visit">
      <div className="wc-container">
        <div className="wc-visit-header" data-wc-reveal>
          <p className="wc-eyebrow">Visit</p>
          <h2 className="wc-section-title">Where We Meet</h2>
          <p className="wc-section-title-kr">오시는 길</p>
          <div className="wc-divider" style={{ margin: "0 auto" }} />
        </div>

        <div className="wc-visit-image" data-wc-reveal>
          <img src={visitHotelUrl} alt={`${venue.name} 호텔 정문 (가상)`} loading="lazy" />
        </div>

        <div className="wc-visit-info" data-wc-reveal>
          <h3 className="wc-visit-name">{venue.name}</h3>
          <p className="wc-visit-name-kr">{venue.nameKr}</p>
          <p className="wc-visit-hall">{venue.hall}</p>
          <p className="wc-visit-address">{venue.address}</p>
          <p className="wc-visit-address-kr">{venue.addressKr}</p>
        </div>

        <div className="wc-visit-map" data-wc-reveal>
          <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
        </div>

        <div className="wc-visit-directions" data-wc-reveal>
          {directions.map((d) => (
            <div key={d.typeEn} className="wc-direction-card">
              <p className="wc-direction-type">{d.typeEn}</p>
              <p className="wc-direction-type-kr">{d.typeKr}</p>
              <p className="wc-direction-desc">{d.descEn}</p>
              <p className="wc-direction-desc-kr">{d.descKr}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
