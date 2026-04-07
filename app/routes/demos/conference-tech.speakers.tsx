import { useEffect, useRef } from "react"
import type { Route } from "./+types/conference-tech.speakers"
import { initSpeakerModal } from "~/demos/conference-tech/modules/speakerModal"
import { initTrackFilter } from "~/demos/conference-tech/modules/trackFilter"
import { initScrollReveal } from "~/demos/conference-tech/modules/scrollReveal"
import { speakers, TRACK_LABEL, TRACK_COLOR } from "~/demos/conference-tech/data/speakers"
import speakerSilhouetteUrl from "~/demos/conference-tech/assets/images/speakers/speaker-silhouette.webp"

export const meta: Route.MetaFunction = () => [
  { title: "Speakers — Pixelmark Tech Conf 2026 (Demo)" },
  {
    name: "description",
    content:
      "Pixelmark Tech Conf 2026 (가상) 스피커 페이지 디자인 데모. 모든 스피커는 가상 인물입니다.",
  },
]

const TRACK_OPTIONS: Array<{ id: string; label: string }> = [
  { id: "all", label: "all" },
  { id: "frontend", label: "frontend" },
  { id: "backend", label: "backend" },
  { id: "design", label: "design" },
  { id: "ai", label: "ai" },
]

export default function ConferenceSpeakers() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanups = [
      initTrackFilter(root),
      initSpeakerModal(root),
      initScrollReveal(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  return (
    <section ref={sectionRef} className="ct-section ct-speakers-page">
      <div className="ct-container">
        <div className="ct-section-header" data-ct-reveal>
          <span className="ct-eyebrow">speakers</span>
          <h2 className="ct-section-title">
            8 voices <span className="ct-comment">{"// across 4 tracks"}</span>
          </h2>
          <p className="ct-section-desc">
            프론트엔드 / 백엔드 / 디자인 / AI 네 트랙에서 8명의 가상 스피커가 등장합니다.
            카드를 클릭하면 발표 주제와 약력을 볼 수 있습니다.
          </p>
        </div>

        {/* 트랙 필터 */}
        <div className="ct-filter-tabs" data-ct-filter-target="speakers" role="group" aria-label="track filter">
          {TRACK_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`ct-filter-tab${opt.id === "all" ? " is-active" : ""}`}
              data-track={opt.id}
            >
              <span className="ct-comment">//</span> {opt.label}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        <div className="ct-speakers-grid" data-ct-reveal>
          {speakers.map((s) => (
            <article
              key={s.id}
              className="ct-speaker-card"
              data-ct-filterable="speakers"
              data-track={s.track}
              data-speaker-id={s.id}
              data-speaker-name={s.name}
              data-speaker-role={s.role}
              data-speaker-company={s.company}
              data-speaker-code={s.code}
              data-speaker-topic={s.topic}
              data-speaker-bio={s.bio}
              data-speaker-track-label={TRACK_LABEL[s.track]}
              data-speaker-track-color={TRACK_COLOR[s.track]}
              style={{ ["--ct-track-color" as string]: TRACK_COLOR[s.track] }}
              aria-label={`${s.name} 스피커 상세 보기`}
            >
              <span className="ct-speaker-code">{s.code}</span>
              <span className="ct-speaker-track">{TRACK_LABEL[s.track]}</span>
              <div className="ct-speaker-thumb">
                <img src={speakerSilhouetteUrl} alt={`${s.name} 실루엣 (가상)`} loading="lazy" />
              </div>
              <div className="ct-speaker-body">
                <h3 className="ct-speaker-name">{s.name}</h3>
                <p className="ct-speaker-role">{s.role} · {s.company}</p>
                <p className="ct-speaker-topic"><strong>Topic.</strong> {s.topic}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ===== 모달 (단일 모달, 카드 클릭 시 내용 교체) ===== */}
      <div className="ct-modal" role="dialog" aria-modal="true" aria-labelledby="ct-modal-name">
        <div className="ct-modal-dialog">
          <button type="button" className="ct-modal-close" aria-label="모달 닫기">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 2 L12 12 M12 2 L2 12" />
            </svg>
          </button>
          <p className="ct-modal-code"></p>
          <h2 id="ct-modal-name" className="ct-modal-name"></h2>
          <p className="ct-modal-role"></p>
          <span className="ct-modal-track"></span>
          <p className="ct-modal-section-label">// topic</p>
          <p className="ct-modal-topic"></p>
          <p className="ct-modal-section-label">// bio</p>
          <p className="ct-modal-bio"></p>
        </div>
      </div>
    </section>
  )
}
