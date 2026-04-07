import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-classic._index"
import { initCountdown } from "~/demos/wedding-classic/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-classic/modules/scrollReveal"
import { couple, venue, getWeddingDate } from "~/demos/wedding-classic/data/content"
import homeHeroUrl from "~/demos/wedding-classic/assets/images/home/home-hero.webp"

export const meta: Route.MetaFunction = () => [
  { title: "○○ & ○○ Save the Date — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 클래식 럭셔리 청첩장 디자인 데모. 가상 청첩장이며 실존 인물/호텔과 무관합니다. 호텔 웨딩 격조 톤 샘플.",
  },
]

export default function WeddingClassicHome() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanups = [initCountdown(root), initScrollReveal(root)]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getWeddingDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]

  return (
    <section ref={sectionRef} className="wc-home">
      <div className="wc-home-hero">
        <div
          className="wc-home-hero-bg"
          style={{ backgroundImage: `url(${homeHeroUrl})` }}
          aria-hidden="true"
        />
        <div className="wc-home-hero-inner" data-wc-reveal>
          <p className="wc-eyebrow wc-home-eyebrow">Save the Date</p>
          <p className="wc-home-save">We Invite You</p>

          <div className="wc-home-names">
            <span className="wc-home-names-name">{couple.groomEn}</span>
            <span className="wc-home-names-and">&amp;</span>
            <span className="wc-home-names-name">{couple.brideEn}</span>
          </div>

          <p className="wc-home-date">{`${monthName} ${date.getDate()}, ${yyyy}, ${dayName}`}</p>
          <p className="wc-home-date-kr">{`${yyyy}. ${mm}. ${dd}. ${dayName.slice(0, 3).toUpperCase()}`}</p>

          {/* 카운트다운 */}
          <div
            className="wc-countdown"
            data-wc-countdown
            data-target={date.toISOString()}
            aria-label="결혼식까지 남은 시간"
          >
            <div className="wc-countdown-cell">
              <div className="wc-countdown-num" data-cd-days>00</div>
              <div className="wc-countdown-label">Days</div>
            </div>
            <div className="wc-countdown-cell">
              <div className="wc-countdown-num" data-cd-hours>00</div>
              <div className="wc-countdown-label">Hours</div>
            </div>
            <div className="wc-countdown-cell">
              <div className="wc-countdown-num" data-cd-minutes>00</div>
              <div className="wc-countdown-label">Minutes</div>
            </div>
            <div className="wc-countdown-cell">
              <div className="wc-countdown-num" data-cd-seconds>00</div>
              <div className="wc-countdown-label">Seconds</div>
            </div>
          </div>

          <p className="wc-home-venue">{venue.name}</p>
          <p className="wc-home-venue-kr">{venue.nameKr} · {venue.hallKr}</p>
        </div>
      </div>
    </section>
  )
}
