/**
 * 마그네틱 CTA 효과 — 마우스 근접 시 버튼이 커서 방향으로 미세 이동
 *
 * [왜 이 효과가 필요한가]
 * - "고급스러운 절제" 컨셉에서 CTA의 존재감을 강화하는 최소 단위 상호작용
 * - 버튼이 마우스를 "당기는" 느낌 → 클릭 유도 + 디테일 감각
 *
 * [구현 전략]
 * - mouseenter/mousemove/mouseleave 세 이벤트로 관리
 * - 버튼의 bounding rect 기준 마우스 상대 위치 계산
 * - 버튼 중심에서 커서 방향으로 최대 8px 이동 (기획서: 8px 이하)
 * - mouseleave 시 원위치 복귀 (CSS transition으로 자연스럽게)
 *
 * [모바일 가드]
 * - @media (hover: hover)에서만 활성
 * - 터치 디바이스는 마우스 이벤트가 없어 의미 없고, 모바일 컨셉 위반
 *
 * [cleanup]
 * - 모든 리스너 제거, 버튼 transform 초기화
 */
const MAX_OFFSET = 8 // 기획서 명시: 최대 8px

export const initMagnetic = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}
  if (!window.matchMedia("(hover: hover)").matches) return () => {}

  // 기획서: CTA 버튼(구매하기/문의하기 등) 대상
  // 마크업에서 data-magnetic 속성으로 표시
  const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"))
  if (targets.length === 0) return () => {}

  interface HandlerSet {
    el: HTMLElement
    move: (e: MouseEvent) => void
    leave: () => void
  }
  const handlers: HandlerSet[] = []

  targets.forEach((el) => {
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      // 마우스의 버튼 중심 기준 상대 좌표 (-0.5 ~ 0.5)
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      // 중심 방향 * MAX_OFFSET → 커서 방향으로 최대 8px 이동
      const tx = relX * MAX_OFFSET * 2
      const ty = relY * MAX_OFFSET * 2
      el.style.transform = `translate(${tx}px, ${ty}px)`
    }

    const leave = () => {
      // 원위치 복귀. CSS의 transition이 자연스럽게 받아줌 (_layout.scss의 .bl-btn transition)
      el.style.transform = ""
    }

    el.addEventListener("mousemove", move)
    el.addEventListener("mouseleave", leave)
    handlers.push({ el, move, leave })
  })

  // cleanup
  return () => {
    handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
      el.style.transform = ""
    })
  }
}
