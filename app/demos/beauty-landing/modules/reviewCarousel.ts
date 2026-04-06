import Swiper from "swiper"
import { Autoplay, Pagination } from "swiper/modules"

/**
 * 리뷰 캐러셀 — 자동 재생 + 수동 조작 (도트 페이지네이션)
 *
 * [왜 Autoplay + Pagination인가]
 * - 기획서: 4초 간격 자동 재생 + 사용자가 도트로 수동 조작
 * - Autoplay: delay 4000ms, disableOnInteraction: false로 수동 조작 후에도 재생 지속
 * - Pagination: clickable로 도트 클릭 전환 가능
 *
 * [loop: true]
 * - 리뷰가 3개로 적으니 loop로 연속 재생 시 끊김 없음
 * - Swiper가 내부적으로 가상 복제 슬라이드를 만들어 처리
 *
 * [cleanup]
 * - Autoplay 타이머를 포함한 모든 인스턴스 destroy
 */
export const initReviewCarousel = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const container = root.querySelector<HTMLElement>(".bl-reviews-swiper")
  if (!container) return () => {}

  // reduced-motion: autoplay 비활성 (사용자가 직접 넘길 수만 있도록)
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const swiper = new Swiper(container, {
    modules: [Autoplay, Pagination],
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    autoplay: reduced
      ? false
      : {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // 마우스 올리면 잠시 멈춤 → 읽기 편함
        },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  })

  return () => {
    swiper.destroy(true, true)
  }
}
