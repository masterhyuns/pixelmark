import { useRef, useLayoutEffect, type ReactNode } from "react"
import { gsap } from "gsap"

interface PageTransitionProps {
  children: ReactNode
}

/**
 * 페이지 진입 fade-in 컴포넌트
 *
 * [왜 useLayoutEffect + gsap.set인가]
 * - Framer Motion initial: JS로 opacity:0 적용 → 브라우저 첫 paint 이후 → flash 발생
 * - CSS @keyframes + AnimatePresence: AnimatePresence가 새 요소를 렌더/숨김 반복 → 2회 flash
 * - useLayoutEffect: DOM 변경 후 브라우저 paint **전**에 동기 실행
 *   gsap.set()으로 paint 전에 opacity:0 보장 → flash 없음
 *
 * [key prop 패턴]
 * root.tsx의 App에서 key={location.pathname}을 넘겨
 * 라우트 변경 시 이 컴포넌트를 완전히 리마운트 → useLayoutEffect 재실행
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // prefers-reduced-motion 존중
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    // paint 전에 동기적으로 invisible 상태 강제 적용
    gsap.set(el, { opacity: 0 })

    // 다음 프레임에 fade in 시작
    const tween = gsap.to(el, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    })

    return () => {
      tween.kill()
    }
  }, []) // 마운트 시 1회 실행 (key 변경으로 리마운트될 때마다 재실행됨)

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default PageTransition
