import { useEffect, useRef } from "react"
import type { Route } from "./+types/personal-portfolio"
import "~/demos/personal-portfolio/main.scss"
import { initTypewriter } from "~/demos/personal-portfolio/modules/typewriter"
import { initCustomCursor } from "~/demos/personal-portfolio/modules/customCursor"
import { initSplitReveal } from "~/demos/personal-portfolio/modules/splitReveal"
import { initLinkMask } from "~/demos/personal-portfolio/modules/linkMask"
import { initDarkMode } from "~/demos/personal-portfolio/modules/darkMode"
import { initTimeline } from "~/demos/personal-portfolio/modules/timeline"
import { initWorkModal } from "~/demos/personal-portfolio/modules/workModal"
import { initWorkPreview } from "~/demos/personal-portfolio/modules/workPreview"
import { initScrollReveal } from "~/demos/personal-portfolio/modules/scrollReveal"
import { works, skills, career } from "~/demos/personal-portfolio/data/portfolio"
// About 섹션 프로필 사진 (Vite asset import)
import profileUrl from "~/demos/personal-portfolio/assets/images/about/profile.webp"

/**
 * S-4 Personal Portfolio — 미니멀 개인 포트폴리오 데모
 *
 * [컨셉] "절제, 타이포 중심"
 * - 외부 라이브러리 0개. 모든 인터랙션을 직접 구현
 * - JS 모듈 총 15KB 이하 목표
 * - 5섹션 원페이지: Intro / About / Experience / Works / Contact
 *
 * [모듈 9개]
 * 1. typewriter — 이름 타이프라이터
 * 2. customCursor — 커스텀 커서 (hover 확대)
 * 3. splitReveal — 섹션 타이틀 word 단위 mask reveal
 * 4. linkMask — 링크 hover mask 슬라이드
 * 5. darkMode — CSS 변수 + localStorage
 * 6. timeline — 경력 타임라인 draw + stagger
 * 7. workModal — 작업물 모달 (포커스 트랩 + Esc)
 * 8. workPreview — 카드 hover 시 커서 옆 미리보기 (Nice-to-have)
 * 9. scrollReveal — 일반 섹션 페이드인 + 스킬 stagger
 *
 * [data-work-* 속성으로 모달 데이터 전달]
 * - 별도 state 없이 카드의 data-* 속성만 읽어 모달 내용 교체
 * - workModal.ts가 클릭 이벤트 + dataset 파싱
 */

export const handle = { demoName: "S-4 Personal Portfolio" }

export const meta: Route.MetaFunction = () => [
  { title: "S-4 Personal Portfolio — Pixelmark Portfolio Demo" },
  {
    name: "description",
    content: "미니멀 개인 포트폴리오/이력서 사이트 가상 디자인 데모. 외부 라이브러리 0개로 구현한 타이포 중심 디자인. (인물·작업물은 모두 가상)",
  },
]

// Space Grotesk + Inter (디스플레이 + 본문)
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap",
  },
]

export default function PersonalPortfolioDemo() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // 모듈 초기화 순서:
    // - darkMode 먼저 (CSS 변수 초기 상태 확정)
    // - typewriter (페이지 로드 즉시 재생)
    // - customCursor (모든 이후 모듈의 hoverable 요소에 영향)
    // - 나머지는 의존성 무관
    const cleanups: Array<() => void> = [
      initDarkMode(root),
      initTypewriter(root),
      initCustomCursor(root),
      initSplitReveal(root),
      initLinkMask(root),
      initTimeline(root),
      initScrollReveal(root),
      initWorkModal(root),
      initWorkPreview(root),
    ]

    return () => {
      cleanups.reverse().forEach((fn) => {
        try {
          fn()
        } catch (err) {
          console.warn("[personal-portfolio] cleanup error:", err)
        }
      })
    }
  }, [])

  return (
    <div ref={rootRef} className="personal-portfolio">
      {/* ===== 다크모드 토글 ===== */}
      <button type="button" className="pp-theme-toggle" aria-label="테마 전환">
        {/* Moon (라이트 모드에서 표시) */}
        <svg className="pp-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        {/* Sun (다크 모드에서 표시) */}
        <svg className="pp-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>

      {/* ===== Intro ===== */}
      <section className="pp-intro">
        <p className="pp-intro-eyebrow">Hello, I&apos;m</p>
        <h1 className="pp-intro-name" data-typewriter>
          <span className="pp-typewriter-text" data-text="Mira Kalon" />
          <span className="pp-typewriter-cursor" />
        </h1>
        <p className="pp-intro-title">
          Product Designer based in Seoul.
          <br />
          Crafting calm, focused digital experiences.
        </p>
        <div className="pp-intro-scroll">
          <span>Scroll</span>
          <svg viewBox="0 0 14 20" fill="none" aria-hidden="true">
            <rect x="0.5" y="0.5" width="13" height="19" rx="6.5" stroke="currentColor" />
            <circle cx="7" cy="6" r="1.25" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="pp-about">
        <div className="pp-container">
          <p className="pp-section-subtitle">About</p>
          <h2 className="pp-section-title" data-split-reveal>
            Designing with intention
          </h2>

          <div className="pp-about-inner">
            <div className="pp-about-photo">
              <img
                src={profileUrl}
                alt="Mira Kalon 프로필 사진 (가상)"
                loading="lazy"
              />
            </div>

            <div className="pp-about-body" data-reveal>
              <p>
                저는 서울에서 활동하는 프로덕트 디자이너 시온 박입니다. 명확한 위계,
                정갈한 활자, 충분한 여백으로 "정돈된" 경험을 만드는 것이 목표입니다.
              </p>
              <p>
                화려한 장식보다 본질적인 문제 정의와 사용자 리서치에 더 많은 시간을
                씁니다. 디자인 시스템을 설계하고, 엔지니어와 함께 결과물을 끝까지
                다듬는 과정을 좋아합니다.
              </p>
              <p>
                이 사이트 또한 제가 추구하는 원칙을 그대로 반영한 결과물입니다.
                당신의 이야기도 함께 들어보고 싶어요.
              </p>

              <div className="pp-skills">
                <p className="pp-skills-label">Tools &amp; Skills</p>
                <div className="pp-skills-list">
                  {skills.map((skill) => (
                    <span key={skill} className="pp-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Experience ===== */}
      <section className="pp-experience">
        <div className="pp-container">
          <p className="pp-section-subtitle">Experience</p>
          <h2 className="pp-section-title" data-split-reveal>
            A path of making
          </h2>

          <div className="pp-timeline">
            <div className="pp-timeline-line-fill" aria-hidden="true" />
            {career.map((item) => (
              <div key={item.period} className="pp-timeline-item">
                <div className="pp-timeline-content">
                  <p className="pp-timeline-period">{item.period}</p>
                  <p className="pp-timeline-role">{item.role}</p>
                  <p className="pp-timeline-company">{item.company}</p>
                  <p className="pp-timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Works ===== */}
      <section className="pp-works">
        <div className="pp-container">
          <p className="pp-section-subtitle">Selected Works</p>
          <h2 className="pp-section-title" data-split-reveal>
            Recent projects
          </h2>

          <div className="pp-works-grid">
            {works.map((work) => (
              <article
                key={work.id}
                className="pp-work-card"
                data-work-id={work.id}
                data-work-title={work.title}
                data-work-category={work.category}
                data-work-year={work.year}
                data-work-image={work.image}
                data-work-desc={work.description}
                data-work-tools={work.tools.join(", ")}
                data-work-link={work.link ?? "#"}
                data-hoverable
              >
                <div className="pp-work-thumb">
                  <img src={work.image} alt={work.title} loading="lazy" />
                  <div className="pp-work-overlay">
                    <span>View Project</span>
                  </div>
                </div>
                <div className="pp-work-meta">
                  <h3 className="pp-work-title">{work.title}</h3>
                  <span className="pp-work-category">
                    {work.category} · {work.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 모달 (단일 모달, 카드 클릭 시 내용 교체) */}
        <div
          className="pp-work-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pp-work-modal-title"
        >
          <div className="pp-work-modal">
            <div className="pp-work-modal-image">
              <img src="" alt="" />
            </div>
            <div className="pp-work-modal-header">
              <h2 id="pp-work-modal-title" />
              <span className="pp-work-modal-year" />
            </div>
            <p className="pp-work-modal-category" />
            <p className="pp-work-modal-desc" />
            <div className="pp-work-modal-tools" />
            <div className="pp-work-modal-actions">
              <a className="pp-work-modal-link" href="#" target="_blank" rel="noopener noreferrer">
                View Project ↗
              </a>
              <button type="button" className="pp-work-modal-close">
                Close
              </button>
            </div>
          </div>
        </div>

        {/* 커서 옆 미리보기 (Nice-to-have) */}
        <div className="pp-work-preview" aria-hidden="true">
          <img src="" alt="" />
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="pp-contact">
        <div className="pp-container">
          <h2 className="pp-contact-title" data-split-reveal>
            Let&apos;s work together
          </h2>
          <p className="pp-contact-lead">
            새로운 프로젝트, 콜라보레이션, 또는 그저 안부까지.
            <br />
            편하게 연락 주세요.
          </p>

          <a href="mailto:hello@mirakalon.design" className="pp-contact-email">
            hello@mirakalon.design
          </a>

          <div className="pp-contact-socials">
            <a href="#" data-link-mask data-hoverable>
              GitHub
            </a>
            <a href="#" data-link-mask data-hoverable>
              LinkedIn
            </a>
            <a href="#" data-link-mask data-hoverable>
              Behance
            </a>
            <a href="#" data-link-mask data-hoverable>
              Dribbble
            </a>
          </div>

          <p className="pp-contact-copy">
            © {new Date().getFullYear()} Pixelmark 디자인 데모입니다. 브랜드명·인물·제품·후기는 모두 가상입니다.
          </p>
        </div>
      </section>
    </div>
  )
}
