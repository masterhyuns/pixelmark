import { useEffect, useRef } from "react"
import type { Route } from "./+types/conference-tech.schedule"
import { initTrackFilter } from "~/demos/conference-tech/modules/trackFilter"
import { initScrollReveal } from "~/demos/conference-tech/modules/scrollReveal"
import { schedule } from "~/demos/conference-tech/data/schedule"
import { TRACK_LABEL, TRACK_COLOR, type SpeakerTrack } from "~/demos/conference-tech/data/speakers"

export const meta: Route.MetaFunction = () => [
  { title: "Schedule — Pixelmark Tech Conf 2026 (Demo)" },
  {
    name: "description",
    content:
      "Pixelmark Tech Conf 2026 (가상) 일정 페이지 디자인 데모. 모든 세션은 가상입니다.",
  },
]

const TRACK_OPTIONS: Array<{ id: string; label: string }> = [
  { id: "all", label: "all" },
  { id: "frontend", label: "frontend" },
  { id: "backend", label: "backend" },
  { id: "design", label: "design" },
  { id: "ai", label: "ai" },
  { id: "general", label: "general" },
]

const trackColor = (track: string): string => {
  if (track === "general") return "#6b7280"
  return TRACK_COLOR[track as SpeakerTrack] ?? "#6b7280"
}
const trackLabel = (track: string): string => {
  if (track === "general") return "GENERAL"
  return TRACK_LABEL[track as SpeakerTrack] ?? track
}

export default function ConferenceSchedule() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanups = [
      initTrackFilter(root),
      initScrollReveal(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  return (
    <section ref={sectionRef} className="ct-section ct-schedule-page">
      <div className="ct-container">
        <div className="ct-section-header" data-ct-reveal>
          <span className="ct-eyebrow">schedule</span>
          <h2 className="ct-section-title">
            2 days <span className="ct-comment">{"// of sessions, talks, workshops"}</span>
          </h2>
          <p className="ct-section-desc">
            트랙별로 필터링해서 관심 있는 세션만 모아 볼 수 있습니다.
            전체 일정은 두 날에 걸쳐 진행됩니다.
          </p>
        </div>

        <div className="ct-filter-tabs" data-ct-filter-target="schedule" role="group" aria-label="track filter">
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

        {schedule.map((day) => (
          <div key={day.label} className="ct-schedule-day" data-ct-reveal>
            <div className="ct-schedule-day-header">
              <h3 className="ct-schedule-day-label">{day.label}</h3>
              <span className="ct-schedule-day-date">{day.date}</span>
            </div>
            <div className="ct-schedule-list">
              {day.sessions.map((session, i) => (
                <div
                  key={`${day.label}-${i}`}
                  className={`ct-schedule-row${session.type === "break" ? " is-break" : ""}${session.type === "keynote" ? " is-keynote" : ""}`}
                  data-ct-filterable="schedule"
                  data-track={session.track}
                  style={{ ["--ct-track-color" as string]: trackColor(session.track) }}
                >
                  <span className="ct-schedule-time">{session.time}</span>
                  <div className="ct-schedule-body">
                    <p className="ct-schedule-title">{session.titleKr}</p>
                    <p className="ct-schedule-title-en">{session.title}</p>
                    {session.speaker && (
                      <p className="ct-schedule-speaker">/ {session.speaker}</p>
                    )}
                  </div>
                  <span className="ct-schedule-track">{trackLabel(session.track)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
