/**
 * 갤러리 라이트박스 (GLightbox)
 *
 * [왜 dynamic import인가 — SSR 호환]
 * - GLightbox는 모듈 top-level에서 window.CustomEvent, document 등을 참조
 * - React Router 7 SSR 환경에서는 서버에서 라우트 모듈을 평가할 때 window가 없어 크래시
 * - 정적 `import GLightbox from "glightbox"`는 서버에서도 실행되므로 사용 불가
 * - `import("glightbox")`를 init 내부(클라이언트 전용 코드 경로)에서 호출하면 서버 평가 회피
 *
 * [초기화 race condition 처리]
 * - Dynamic import는 Promise라서 비동기 — 그 사이 컴포넌트가 언마운트될 수 있음
 * - disposed 플래그로 "이미 cleanup된 상태면 lightbox 생성 스킵"
 * - 반대로 lightbox가 생성된 후 cleanup되면 destroy 호출
 *
 * [selector .cr-gl-item]
 * - GLightbox는 querySelectorAll로 전체 DOM에서 selector를 찾음
 * - 데모별로 격리하기 위해 prefix 클래스 사용 (cr- = cafe-restaurant)
 */

type GLightboxInstance = { destroy: () => void }

export const initGallery = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  const grid = root.querySelector<HTMLElement>(".cr-gallery-grid")
  if (!grid) return () => {}

  // 갤러리 링크에 식별 클래스 부여 (selector 수집 대상)
  const items = Array.from(grid.querySelectorAll<HTMLAnchorElement>(":scope > a"))
  items.forEach((a) => a.classList.add("cr-gl-item"))

  // 상태 변수: 비동기 로드 중 언마운트 케이스 처리
  let lightbox: GLightboxInstance | null = null
  let disposed = false

  // 동적 import — SSR에서는 호출되지 않음 (window 가드 위에서 return)
  import("glightbox").then((mod) => {
    if (disposed) return
    const GLightbox = mod.default
    lightbox = GLightbox({
      selector: ".cr-gl-item",
      touchNavigation: true,
      loop: true,
      closeButton: true,
      keyboardNavigation: true,
      openEffect: "fade",
      closeEffect: "fade",
      slideEffect: "slide",
    }) as unknown as GLightboxInstance
  }).catch((err) => {
    console.warn("[cafe-restaurant] GLightbox load failed:", err)
  })

  return () => {
    disposed = true
    if (lightbox) {
      lightbox.destroy()
      lightbox = null
    }
    items.forEach((a) => a.classList.remove("cr-gl-item"))
  }
}
