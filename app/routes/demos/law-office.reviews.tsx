import type { Route } from "./+types/law-office.reviews"
import { reviews } from "~/demos/law-office/data/content"

/**
 * S-2 Law Office — 후기/사례 페이지
 *
 * [구성]
 * - 페이지 헤더
 * - 후기 카드 그리드 3열 (별점 + 카테고리 + 제목 + 본문 + 작성자/날짜)
 * - 하단 요약
 *
 * [간단한 페이지] 별도 모듈 없음
 */

export const meta: Route.MetaFunction = () => [
  { title: "후기 | Aurea 법률사무소 — Pixelmark Demo" },
  { name: "description", content: "Aurea 법률사무소 상담·수임 후기. 모든 후기와 의뢰인 이름은 가상입니다. (Pixelmark 디자인 데모)" },
]

export default function LawOfficeReviews() {
  return (
    <>
      <div className="lo-page-header">
        <div className="lo-container">
          <p className="lo-page-header-eyebrow">Reviews</p>
          <h1>의뢰인의 후기</h1>
          <p>실제 상담과 수임 후 남겨주신 솔직한 이야기입니다.</p>
        </div>
      </div>

      <section className="lo-reviews-section">
        <div className="lo-container">
          <div className="lo-reviews-grid">
            {reviews.map((review) => (
              <article key={review.id} className="lo-review-card">
                <div className="lo-review-top">
                  <div className="lo-review-stars" aria-label={`별점 ${review.stars}점`}>
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                      </svg>
                    ))}
                  </div>
                  <span className="lo-review-category">{review.category}</span>
                </div>
                <h3 className="lo-review-title">{review.title}</h3>
                <p className="lo-review-body">{review.body}</p>
                <div className="lo-review-meta">
                  <span>{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </article>
            ))}
          </div>

          <p className="lo-reviews-summary">
            본 후기는 실제 의뢰인의 동의를 얻어 게시된 내용입니다.
            개인정보 보호를 위해 이름의 일부는 가명 처리되었습니다.
          </p>
        </div>
      </section>
    </>
  )
}
