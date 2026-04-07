import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-pixel"
import "~/demos/wedding-pixel/main.scss"
import { initCountdown } from "~/demos/wedding-pixel/modules/countdown"
import { initScrollReveal } from "~/demos/wedding-pixel/modules/scrollReveal"
import { initDialogueTyping } from "~/demos/wedding-pixel/modules/dialogueTyping"
import { initRsvpForm } from "~/demos/wedding-pixel/modules/rsvpForm"
import {
  game,
  dialogue,
  quest,
  venue,
  treasures,
  getEventDate,
} from "~/demos/wedding-pixel/data/content"

import titleBgUrl from "~/demos/wedding-pixel/assets/images/title/title-bg.webp"
import coupleUrl from "~/demos/wedding-pixel/assets/images/sprites/sprite-couple.webp"
import castleUrl from "~/demos/wedding-pixel/assets/images/sprites/sprite-castle.webp"
import treasureUrl from "~/demos/wedding-pixel/assets/images/sprites/sprite-treasure.webp"

/**
 * E-S15 Wedding Pixel — 게임 청첩장
 *
 * [컨셉] "8비트 픽셀 + 게임 UI"
 * - 다크 네이비 + 크림 + 옐로/레드/그린, Press Start 2P
 * - 6 스테이지: Title / Stage1 Story / Stage2 Quest / Stage3 Party / Stage4 Reward / Continue
 *
 * [시그니처]
 * - PRESS START 깜빡임 + 픽셀 도트 그림자 타이포
 * - Stage 1: 게임 대화창 + 글자 typing 효과
 * - Stage 4: 보물상자(계좌) 카드
 * - GAME CLEAR 모달
 */

export const handle = { demoName: "E-S15 Wedding Pixel" }

export const meta: Route.MetaFunction = () => [
  { title: "LIA & KAI · LOVE QUEST — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content:
      "Pixelmark의 게임 청첩장 디자인 데모. 가상 커플이며 실존 게임/IP와 무관합니다. 8비트 픽셀 + 레트로 게임 UI 샘플.",
  },
]

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
  },
]

export default function WeddingPixel() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cleanups = [
      initCountdown(root),
      initScrollReveal(root),
      initDialogueTyping(root),
      initRsvpForm(root),
    ]
    return () => cleanups.reverse().forEach((fn) => { try { fn() } catch {} })
  }, [])

  const date = getEventDate()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")

  return (
    <div ref={rootRef} className="wedding-pixel">
      {/* ===== TITLE SCREEN ===== */}
      <section className="wpix-title">
        <div className="wpix-title-bg" style={{ backgroundImage: `url(${titleBgUrl})` }} aria-hidden="true" />
        <div className="wpix-title-inner">
          <p className="wpix-title-studio">▶ {game.studio}</p>
          <h1 className="wpix-title-name">{game.title}</h1>
          <p className="wpix-title-sub">— {game.subtitle} —</p>

          <div className="wpix-title-players">
            <div className="wpix-title-player">
              <p className="wpix-title-player-code">{game.player1.code}</p>
              <p className="wpix-title-player-name">{game.player1.name}</p>
            </div>
            <div className="wpix-title-player">
              <p className="wpix-title-player-code">{game.player2.code}</p>
              <p className="wpix-title-player-name">{game.player2.name}</p>
            </div>
          </div>

          <p className="wpix-title-press">▶ {game.pressStart} ◀</p>
        </div>
      </section>

      {/* ===== STAGE 1: STORY ===== */}
      <section className="wpix-section">
        <div className="wpix-container">
          <div className="wpix-stage-header" data-wpix-reveal>
            <span className="wpix-stage-num">STAGE 01</span>
            <h2 className="wpix-stage-title">▶ STORY MODE</h2>
            <p className="wpix-stage-title-kr">우리의 이야기</p>
          </div>

          <div className="wpix-dialogue" data-wpix-dialogue data-wpix-reveal>
            {dialogue.map((d, i) => (
              <div key={i} className="wpix-dialogue-line">
                <span className={`wpix-dialogue-speaker${d.speaker === "KAI" ? " kai" : ""}`}>{d.speaker} ▸</span>
                <span className="wpix-dialogue-text">{d.line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STAGE 2: QUEST ===== */}
      <section className="wpix-section">
        <div className="wpix-container">
          <div className="wpix-stage-header" data-wpix-reveal>
            <span className="wpix-stage-num green">STAGE 02</span>
            <h2 className="wpix-stage-title">▶ FINAL QUEST</h2>
            <p className="wpix-stage-title-kr">일정 &amp; 장소</p>
          </div>

          <div className="wpix-card wpix-quest-card" data-wpix-reveal>
            <p className="wpix-quest-name">{quest.name}</p>
            <div className="wpix-quest-row">
              <span className="wpix-quest-label">Date</span>
              <span className="wpix-quest-value">{`${yyyy}.${mm}.${dd}`} <strong>· 17:00</strong></span>
            </div>
            <div className="wpix-quest-row">
              <span className="wpix-quest-label">Location</span>
              <span className="wpix-quest-value">{venue.name} ({venue.nameKr})</span>
            </div>
            <div className="wpix-quest-row">
              <span className="wpix-quest-label">Objective</span>
              <span className="wpix-quest-value">{quest.objective}</span>
            </div>
            <div className="wpix-quest-row">
              <span className="wpix-quest-label">Reward</span>
              <span className="wpix-quest-value"><strong>{quest.reward}</strong></span>
            </div>
            <div className="wpix-quest-row">
              <span className="wpix-quest-label">Difficulty</span>
              <span className="wpix-quest-value">{quest.difficulty}</span>
            </div>

            <div className="wpix-countdown" data-wpix-countdown data-target={date.toISOString()} aria-label="결혼식까지 남은 시간">
              <div className="wpix-countdown-cell">
                <div className="wpix-countdown-num" data-cd-days>00</div>
                <div className="wpix-countdown-label">DAYS</div>
              </div>
              <div className="wpix-countdown-cell">
                <div className="wpix-countdown-num" data-cd-hours>00</div>
                <div className="wpix-countdown-label">HRS</div>
              </div>
              <div className="wpix-countdown-cell">
                <div className="wpix-countdown-num" data-cd-minutes>00</div>
                <div className="wpix-countdown-label">MIN</div>
              </div>
              <div className="wpix-countdown-cell">
                <div className="wpix-countdown-num" data-cd-seconds>00</div>
                <div className="wpix-countdown-label">SEC</div>
              </div>
            </div>

            <div className="wpix-quest-map">
              <iframe src={venue.mapEmbedSrc} title={`${venue.name} 위치 지도`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STAGE 3: PARTY ===== */}
      <section className="wpix-section">
        <div className="wpix-container">
          <div className="wpix-stage-header" data-wpix-reveal>
            <span className="wpix-stage-num red">STAGE 03</span>
            <h2 className="wpix-stage-title">▶ PARTY MEMBERS</h2>
            <p className="wpix-stage-title-kr">파티 멤버</p>
          </div>

          <div className="wpix-party-grid">
            <article className="wpix-party-card" data-wpix-reveal>
              <div className="wpix-party-image"><img src={coupleUrl} alt="LIA sprite (가상)" /></div>
              <div className="wpix-party-body">
                <p className="wpix-party-class">▶ CLASS · DESIGNER</p>
                <p className="wpix-party-name">LIA · LV.30</p>
                <div className="wpix-party-stat">
                  HP <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "90%" }} />
                </div>
                <div className="wpix-party-stat">
                  MP <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "85%" }} />
                </div>
              </div>
            </article>
            <article className="wpix-party-card" data-wpix-reveal>
              <div className="wpix-party-image"><img src={castleUrl} alt="THE CASTLE sprite (가상)" /></div>
              <div className="wpix-party-body">
                <p className="wpix-party-class">▶ CLASS · VENUE</p>
                <p className="wpix-party-name">THE CASTLE</p>
                <div className="wpix-party-stat">
                  CAP <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "100%" }} />
                </div>
                <div className="wpix-party-stat">
                  CHARM <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "95%" }} />
                </div>
              </div>
            </article>
            <article className="wpix-party-card" data-wpix-reveal>
              <div className="wpix-party-image"><img src={treasureUrl} alt="KAI sprite (가상)" /></div>
              <div className="wpix-party-body">
                <p className="wpix-party-class">▶ CLASS · DEVELOPER</p>
                <p className="wpix-party-name">KAI · LV.31</p>
                <div className="wpix-party-stat">
                  HP <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "88%" }} />
                </div>
                <div className="wpix-party-stat">
                  MP <div className="wpix-party-stat-bar" style={{ ["--wpix-stat" as string]: "92%" }} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== STAGE 4: REWARD ===== */}
      <section className="wpix-section">
        <div className="wpix-container">
          <div className="wpix-stage-header" data-wpix-reveal>
            <span className="wpix-stage-num">STAGE 04</span>
            <h2 className="wpix-stage-title">▶ TREASURE CHEST</h2>
            <p className="wpix-stage-title-kr">마음 전하실 곳</p>
          </div>

          <div className="wpix-reward-grid" data-wpix-reveal>
            {treasures.map((t) => (
              <div key={t.item} className="wpix-reward-chest">
                <p className="wpix-reward-icon">[ ★ ]</p>
                <p className="wpix-reward-name">{t.item}</p>
                <p className="wpix-reward-side">{t.side}</p>
                <p className="wpix-reward-bank">{t.bank}</p>
                <p className="wpix-reward-number">{t.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTINUE? RSVP ===== */}
      <section className="wpix-section wpix-continue">
        <div className="wpix-container">
          <div className="wpix-stage-header" data-wpix-reveal>
            <span className="wpix-stage-num green">CONTINUE?</span>
            <h2 className="wpix-stage-title">▶ JOIN THE QUEST</h2>
            <p className="wpix-stage-title-kr">참석 여부 · Mock 폼</p>
          </div>

          <form className="wpix-rsvp-form" data-wpix-reveal>
            <label className="wpix-rsvp-label">▶ ENTER YOUR NAME</label>
            <input type="text" name="name" className="wpix-rsvp-input" placeholder="PLAYER NAME" autoComplete="off" required />
            <button type="submit" className="wpix-rsvp-submit">▶ START GAME</button>
          </form>
        </div>

        <div className="wpix-rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="wpix-rsvp-modal-title">
          <div className="wpix-rsvp-modal-dialog">
            <button type="button" className="wpix-rsvp-modal-close" aria-label="모달 닫기">X</button>
            <h3 id="wpix-rsvp-modal-title" className="wpix-rsvp-modal-title">★ GAME<br />CLEAR ★</h3>
            <p className="wpix-rsvp-modal-desc">
              <span className="wpix-rsvp-modal-name">PLAYER</span><br /><br />
              JOINED THE QUEST!<br /><br />
              See you at the venue.
              <br /><br />
              <small>(※ 데모 폼 — 실제 접수되지 않습니다)</small>
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="wpix-footer">
        <p className="wpix-footer-end">★ THANK YOU ★</p>
        <p className="wpix-footer-credits">{`${game.studio} · LOVE QUEST v1.0`}</p>
        <p className="wpix-footer-disclaimer">
          ※ 이 페이지는 Pixelmark의 디자인 데모입니다.
          <br />
          'Pixelmark Games'는 가상 게임 스튜디오이며, 표시된 모든 인물 / 장소 / 게임 / 일정은 가상이고 실존 게임 또는 인물과 무관합니다.
        </p>
      </footer>
    </div>
  )
}
