/**
 * 메뉴 카드 3D 틸트 (직접 구현)
 *
 * [왜 직접 구현인가]
 * - 기획서 명시: "vanilla-tilt 등 사용 금지, 반드시 직접 구현"
 * - 구현 자체가 30~50줄로 간단, 외부 의존성 추가는 과잉
 *
 * [동작 원리]
 * 1. 카드에 mousemove 리스너
 * 2. 마우스 위치를 카드 중심 기준 상대 좌표로 변환 (-0.5 ~ 0.5)
 * 3. rotateX(-y*5deg) rotateY(x*5deg)로 3D 회전 (최대 5도, 기획서 명시)
 * 4. mouseleave 시 transform 초기화
 *
 * [컨셉 가이드]
 * - "따뜻하고 아늑함" 컨셉에 맞게 회전 강도 5도 이내로 미세하게
 * - 과한 회전(10도+)은 "차갑고 모던한" 느낌이라 금지
 *
 * [perspective 필수]
 * - 부모(.cr-menu-grid)에 perspective: 1000px 적용 (SCSS에서 처리)
 * - rotate만 있으면 평면적이므로 원근감이 3D 효과의 핵심
 *
 * [hover 가드]
 * - 모바일 터치 디바이스에서는 비활성 (mousemove 없음 + 컨셉 위반)
 */
const MAX_ROTATE = 5 // 기획서 명시: 5도 이내

export const initMenuCardTilt = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (!window.matchMedia("(hover: hover)").matches) return () => {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}

  const cards = Array.from(root.querySelectorAll<HTMLElement>(".cr-menu-card"))
  if (cards.length === 0) return () => {}

  interface HandlerSet {
    el: HTMLElement
    move: (e: MouseEvent) => void
    leave: () => void
  }
  const handlers: HandlerSet[] = []

  cards.forEach((card) => {
    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      // 카드 중심 기준 -0.5~0.5 좌표
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      // rotateX는 y축 반전 (마우스 위=카드 위로 젖혀짐)
      const rotateY = relX * MAX_ROTATE * 2
      const rotateX = -relY * MAX_ROTATE * 2
      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }

    const leave = () => {
      // 원위치 복귀. CSS transition이 자연스럽게 처리
      card.style.transform = ""
    }

    card.addEventListener("mousemove", move)
    card.addEventListener("mouseleave", leave)
    handlers.push({ el: card, move, leave })
  })

  return () => {
    handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
      el.style.transform = ""
    })
  }
}
