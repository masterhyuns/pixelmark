import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * 스크롤 진입 애니메이션 모음 (About 페이드인, Features stagger)
 *
 * [왜 GSAP ScrollTrigger인가]
 * - 섹션별로 다른 stagger/방향/딜레이 조합이 필요
 * - Intersection Observer + CSS class 방식은 복잡한 타임라인 표현이 어려움
 * - GSAP는 scrollTrigger 인라인 옵션으로 "뷰포트 진입 시 한 번만 재생" 관리가 쉬움
 *
 * [구현 대상]
 * 1. About 섹션 텍스트/이미지: 좌→우 / 우→좌 페이드인
 * 2. Features 카드: stagger 0.15s 순차 페이드업
 *
 * [once: true]
 * - 한 번 재생 후 다시 트리거되지 않도록
 * - 사용자가 위로 다시 스크롤해도 재재생 없음
 *
 * [gsap.context로 cleanup]
 * - context 안의 모든 tween/trigger를 revert()로 한 번에 제거
 */
export const initScrollAnimation = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) return () => {}

  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    // ----- About 섹션: 텍스트/이미지 좌우 페이드인 -----
    const aboutText = root.querySelector(".bl-about-text")
    const aboutImage = root.querySelector(".bl-about-image")

    if (aboutText) {
      gsap.from(aboutText, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bl-about",
          start: "top 75%",
          once: true,
        },
      })
    }

    if (aboutImage) {
      gsap.from(aboutImage, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bl-about",
          start: "top 75%",
          once: true,
        },
      })
    }

    // ----- Features 섹션: 카드 stagger 페이드업 -----
    const featureCards = root.querySelectorAll(".bl-feature-card")
    if (featureCards.length > 0) {
      gsap.from(featureCards, {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bl-features",
          start: "top 75%",
          once: true,
        },
      })
    }

    // ----- 공통: 섹션 헤더(section-subtitle / section-title) 페이드업 -----
    const sectionHeaders = root.querySelectorAll(
      ".bl-products-header, .bl-features-header, .bl-reviews-header"
    )
    sectionHeaders.forEach((header) => {
      gsap.from(header, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          once: true,
        },
      })
    })
  }, root)

  return () => {
    ctx.revert()
  }
}
