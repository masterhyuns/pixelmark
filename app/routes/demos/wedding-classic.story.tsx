import { useEffect, useRef } from "react"
import type { Route } from "./+types/wedding-classic.story"
import { initScrollReveal } from "~/demos/wedding-classic/modules/scrollReveal"
import { couple, parents, greeting, story } from "~/demos/wedding-classic/data/content"

export const meta: Route.MetaFunction = () => [
  { title: "Story — ○○ & ○○ Wedding (Demo)" },
  {
    name: "description",
    content:
      "Pixelmark의 클래식 럭셔리 청첩장 (가상) 스토리 페이지 디자인 데모. 한영 병기 인사글과 두 사람의 이야기.",
  },
]

export default function WeddingClassicStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cleanup = initScrollReveal(root)
    return () => cleanup()
  }, [])

  return (
    <section ref={sectionRef} className="wc-story">
      <div className="wc-container wc-container--narrow">
        <div data-wc-reveal>
          <p className="wc-eyebrow" style={{ textAlign: "center", display: "block" }}>{greeting.headingEn}</p>
          <h2 className="wc-section-title">{greeting.headingEn}</h2>
          <p className="wc-section-title-kr">{greeting.headingKr}</p>
          <div className="wc-divider" style={{ margin: "0 auto 56px" }} />

          <div className="wc-story-greeting">
            <div className="wc-story-greeting-en">
              {greeting.paragraphsEn.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="wc-divider wc-divider--horizontal" style={{ margin: "32px auto" }} />
            <div className="wc-story-greeting-kr">
              {greeting.paragraphsKr.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="wc-story-parents">
            <div>
              <p className="wc-side-label">Groom&apos;s Family</p>
              <p className="wc-side-names">
                {parents.groomFather} · {parents.groomMother}
                <br />
                <em>Son · {couple.groomName}</em>
              </p>
            </div>
            <div className="wc-side-divider" aria-hidden="true" />
            <div>
              <p className="wc-side-label">Bride&apos;s Family</p>
              <p className="wc-side-names">
                {parents.brideFather} · {parents.brideMother}
                <br />
                <em>Daughter · {couple.brideName}</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 세 챕터 */}
      <div className="wc-container" style={{ marginTop: "120px" }}>
        <div className="wc-story-chapters">
          {story.map((chapter, i) => (
            <article key={i} className="wc-story-chapter" data-wc-reveal>
              <p className="wc-chapter-label">{chapter.chapterEn}</p>
              <p className="wc-chapter-label-kr">{chapter.chapterKr}</p>
              <h3 className="wc-chapter-title">{chapter.titleEn}</h3>
              <p className="wc-chapter-title-kr">{chapter.titleKr}</p>
              <p className="wc-chapter-body-en">{chapter.bodyEn}</p>
              <p className="wc-chapter-body-kr">{chapter.bodyKr}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
