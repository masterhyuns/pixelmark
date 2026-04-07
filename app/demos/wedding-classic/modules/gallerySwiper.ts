/**
 * E-S6 Wedding Classic — 갤러리 Swiper 초기화
 *
 * [구조 가정]
 * .wc-swiper.swiper > .swiper-wrapper > .swiper-slide * N
 * .wc-swiper-pagination (페이지네이션)
 * .wc-swiper-prev / .wc-swiper-next (커스텀 네비 버튼)
 * [data-wc-counter] 현재 인덱스 표시
 *
 * [cleanup]
 * - Swiper 인스턴스 destroy
 */

import Swiper from "swiper"
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface GallerySwiperHandle {
  destroy: () => void
}

export const initGallerySwiper = (root: HTMLElement | null): GallerySwiperHandle => {
  if (!root || typeof window === "undefined") return { destroy: () => {} }

  const container = root.querySelector<HTMLElement>(".wc-swiper")
  if (!container) return { destroy: () => {} }

  const counter = root.querySelector<HTMLElement>("[data-wc-counter]")
  const total = container.querySelectorAll(".swiper-slide").length

  const swiper = new Swiper(container, {
    modules: [Navigation, Pagination, Keyboard, A11y],
    slidesPerView: 1,
    loop: total > 1,
    keyboard: { enabled: true },
    pagination: {
      el: root.querySelector<HTMLElement>(".wc-swiper-pagination") || undefined,
      clickable: true,
    },
    navigation: {
      prevEl: root.querySelector<HTMLElement>(".wc-swiper-prev") || undefined,
      nextEl: root.querySelector<HTMLElement>(".wc-swiper-next") || undefined,
    },
    on: {
      slideChange: (sw) => {
        if (counter) {
          counter.textContent = String(sw.realIndex + 1).padStart(2, "0")
        }
      },
    },
  })

  // 초기 카운터
  if (counter) counter.textContent = "01"

  return {
    destroy: () => {
      try {
        swiper.destroy(true, true)
      } catch {
        // noop
      }
    },
  }
}
