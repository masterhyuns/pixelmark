import Swiper from "swiper"
import { FreeMode, Mousewheel } from "swiper/modules"

/**
 * 제품 라인업 슬라이더 (가로 드래그)
 *
 * [왜 Swiper인가]
 * - 터치/드래그/휠 지원을 직접 구현하면 버그가 많고 접근성도 잃음
 * - Swiper는 이런 부분을 이미 잘 해결했고, 모듈화돼 있어 필요한 것만 import 가능
 *
 * [FreeMode 사용 이유]
 * - 기본 Swiper는 "한 슬라이드씩" 스냅 이동
 * - FreeMode는 드래그 관성으로 자유롭게 이동 → 갤러리처럼 연속 스크롤 가능
 * - 제품 카드가 4개로 적을 때도 부드러운 탐색감 제공
 *
 * [Mousewheel 모듈]
 * - 데스크탑에서 가로 슬라이더에 세로 휠을 가로 스크롤로 변환
 * - 단, Lenis 모멘텀 스크롤과 충돌할 수 있음
 *   → forceToAxis: true로 지정해 가로 휠 제스처일 때만 작동
 *
 * [cleanup]
 * - swiper.destroy(true, true)로 이벤트 리스너/DOM 완전 정리
 *   첫 번째 true: DOM 초기화, 두 번째 true: 스타일 초기화
 */
export const initProductSlider = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const container = root.querySelector<HTMLElement>(".bl-products-swiper")
  if (!container) return () => {}

  const swiper = new Swiper(container, {
    modules: [FreeMode, Mousewheel],
    slidesPerView: "auto",
    spaceBetween: 24,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumRatio: 0.6,
    },
    mousewheel: {
      forceToAxis: true, // 세로 휠이 가로 슬라이더에 간섭하지 않도록
      sensitivity: 1,
    },
    grabCursor: true,
    // 양 끝 여백 (컨테이너 패딩 + 추가 여백으로 첫/마지막 카드 숨 트임)
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
  })

  return () => {
    swiper.destroy(true, true)
  }
}
