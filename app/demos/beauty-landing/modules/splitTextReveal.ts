/**
 * SplitText 직접 구현 — 글자/단어 단위 reveal 애니메이션
 *
 * [왜 직접 구현인가]
 * - GSAP SplitText는 Club GreenSock 유료 플러그인 → 비용 발생
 * - 기획서 명시: "SplitText 직접 구현 (GSAP SplitText 유료 회피)"
 * - 구현 자체는 30~50줄이면 충분 (span 분해 + transition)
 *
 * [동작 원리]
 * 1. 대상 요소의 textContent를 읽고 char/word 단위로 분해
 * 2. 각 조각을 <span>으로 래핑, inline-block + opacity:0 + translateY
 * 3. JS에서 stagger 딜레이만큼 transition 걸어 순차 재생
 * 4. IntersectionObserver로 뷰포트 진입 시 play() 호출
 *
 * [data 속성 기반 선언적 사용]
 * - 마크업에 `<h1 data-split="char">` 처럼 속성만 추가하면 자동 동작
 * - 옵션은 `data-split-stagger="0.05"`, `data-split-delay="0"` 등으로 오버라이드 가능
 *
 * [hero vs section 분기]
 * - 히어로는 페이지 로드 즉시 play (스크롤 없이 첫 화면에 노출)
 * - 섹션 타이틀은 뷰포트 진입 시 play (IntersectionObserver)
 * - 마크업에서 `data-split-trigger="load"` vs `"scroll"` 로 구분
 */

type SplitMode = "char" | "word"

interface SplitInstance {
  /** 원본 텍스트 복원 (cleanup용) */
  revert: () => void
  /** 애니메이션 재생 */
  play: () => void
}

/**
 * 개별 요소에 split 적용
 *
 * @param el - 대상 요소
 * @param mode - "char"(글자 단위) 또는 "word"(단어 단위)
 * @param stagger - 각 조각 사이 딜레이 (초)
 * @param duration - 각 조각 애니메이션 지속 시간
 */
const splitText = (
  el: HTMLElement,
  mode: SplitMode,
  stagger: number,
  duration: number
): SplitInstance => {
  const originalText = el.textContent ?? ""

  // char: 글자 하나씩 배열화 (공백 포함)
  // word: 공백 기준 split, 공백은 텍스트 노드로 유지
  const tokens =
    mode === "char"
      ? [...originalText]
      : originalText.split(/(\s+)/)

  // 기존 콘텐츠 제거 후 span으로 채움
  el.textContent = ""

  tokens.forEach((token, i) => {
    // 공백은 그냥 텍스트 노드로 넣어 레이아웃 유지 (span으로 싸면 wrap 깨짐)
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token))
      return
    }

    const span = document.createElement("span")
    span.textContent = token
    // inline-block이어야 transform(translateY)이 적용됨
    span.style.display = "inline-block"
    span.style.opacity = "0"
    span.style.transform = "translateY(0.6em)"
    // will-change로 GPU 가속 힌트 (transform/opacity 변경 예정)
    span.style.willChange = "opacity, transform"
    span.style.transition =
      `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s,` +
      `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s`
    el.appendChild(span)
  })

  return {
    play: () => {
      el.querySelectorAll<HTMLElement>(":scope > span").forEach((span) => {
        span.style.opacity = "1"
        span.style.transform = "translateY(0)"
      })
    },
    revert: () => {
      el.textContent = originalText
    },
  }
}

/**
 * 루트 컨테이너 내 모든 [data-split] 요소에 split 적용
 *
 * [사용 예시 마크업]
 * ```html
 * <h1 data-split="char" data-split-trigger="load">Lumière</h1>
 * <h2 data-split="char" data-split-trigger="scroll" data-split-stagger="0.03">Our Story</h2>
 * ```
 */
export const initSplitText = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const targets = Array.from(
    root.querySelectorAll<HTMLElement>("[data-split]")
  )

  if (targets.length === 0) return () => {}

  // reduced motion: 원본 텍스트 그대로 노출 (split 하지 않음)
  if (reduced) return () => {}

  const instances: Array<{ el: HTMLElement; instance: SplitInstance }> = []

  targets.forEach((el) => {
    const mode = (el.dataset.split as SplitMode) || "char"
    const stagger = parseFloat(el.dataset.splitStagger ?? "0.05")
    const duration = parseFloat(el.dataset.splitDuration ?? "0.6")
    const trigger = el.dataset.splitTrigger ?? "scroll"

    const instance = splitText(el, mode, stagger, duration)
    instances.push({ el, instance })

    if (trigger === "load") {
      // 페이지 로드 즉시 재생 (히어로 브랜드명 등)
      // requestAnimationFrame으로 브라우저 paint 이후 실행 → 초기 상태가 먼저 그려짐
      requestAnimationFrame(() => {
        // 한 프레임 더 기다려 CSS transition이 확실히 걸린 뒤 play
        requestAnimationFrame(() => instance.play())
      })
    }
  })

  // 스크롤 트리거 (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        const found = instances.find((i) => i.el === target)
        if (found) {
          found.instance.play()
          observer.unobserve(target)
        }
      })
    },
    { threshold: 0.3 }
  )

  targets.forEach((el) => {
    if (el.dataset.splitTrigger !== "load") {
      observer.observe(el)
    }
  })

  // cleanup
  return () => {
    observer.disconnect()
    instances.forEach(({ instance }) => instance.revert())
  }
}
