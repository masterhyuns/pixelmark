/**
 * E-S17 Wedding Postal — 봉투 오픈 인터랙션
 *
 * .wpost-envelope를 클릭하면 .is-open 클래스가 토글되고
 * SCSS에서 flap rotate + letter slide-up이 작동한다.
 * 페이지 진입 시 자동으로 살짝 열리도록 한 번 트리거.
 */
export const initEnvelopeOpen = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const envelope = root.querySelector<HTMLElement>(".wpost-envelope")
  if (!envelope) return () => {}

  const onClick = () => envelope.classList.toggle("is-open")
  envelope.addEventListener("click", onClick)

  // 자동 열림 (1.2초 후)
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  let auto: number | null = null
  if (!reduced) {
    auto = window.setTimeout(() => envelope.classList.add("is-open"), 1200)
  } else {
    envelope.classList.add("is-open")
  }

  return () => {
    envelope.removeEventListener("click", onClick)
    if (auto !== null) window.clearTimeout(auto)
    envelope.classList.remove("is-open")
  }
}
