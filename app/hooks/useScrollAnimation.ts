import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// ScrollTrigger 플러그인 등록 (클라이언트 전용)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * 요소 배열에 뷰포트 진입 시 stagger fade-up 애니메이션을 적용하는 훅
 *
 * @param containerRef - 부모 컨테이너 ref (컨텍스트 스코프용)
 * @param selector - 애니메이션 대상 CSS 선택자 (예: ".card-item")
 * @param options - 애니메이션 옵션
 */
export const useStaggerReveal = (
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options: {
    y?: number
    duration?: number
    stagger?: number
    start?: string
    once?: boolean
  } = {}
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const { y = 30, duration = 0.6, stagger = 0.1, start = "top 85%", once = true } = options

    // prefers-reduced-motion 체크
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector, containerRef.current!)
      if (elements.length === 0) return

      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, selector])
}

/**
 * 단일 요소에 뷰포트 진입 fade-up 애니메이션을 적용하는 훅
 */
export const useReveal = (
  ref: React.RefObject<HTMLElement | null>,
  options: {
    y?: number
    x?: number
    duration?: number
    delay?: number
    start?: string
  } = {}
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const { y = 20, x = 0, duration = 0.6, delay = 0, start = "top 85%" } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [ref])
}

/**
 * 숫자 카운트업 애니메이션 훅
 * about 페이지의 실적 숫자에 사용
 *
 * @param ref - 숫자를 표시하는 요소의 ref
 * @param target - 목표 숫자
 * @param options - duration, 소수점 여부
 */
export const useCountUp = (
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  options: { duration?: number; decimal?: boolean } = {}
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (ref.current) {
        ref.current.textContent = options.decimal ? target.toFixed(1) : String(target)
      }
      return
    }

    const { duration = 2, decimal = false } = options
    const counter = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = decimal
              ? counter.value.toFixed(1)
              : Math.round(counter.value).toString()
          }
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [ref, target])
}
