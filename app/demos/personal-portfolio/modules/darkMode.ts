/**
 * 다크모드 토글
 *
 * [저장]
 * - localStorage "pp-theme" 키에 "light" | "dark" 저장
 * - 페이지 재진입 시 저장값 복원
 * - 저장값 없으면 시스템 preference 참조
 *
 * [적용]
 * - document.documentElement(`<html>`)에 data-theme 속성 설정
 * - SCSS의 :root[data-theme="dark"] 블록이 CSS 변수 override
 *
 * [FOUC 방지]
 * - useLayoutEffect에서 호출되면 paint 전에 속성 설정 가능
 * - 다만 이 모듈은 이미 컴포넌트 마운트 후 실행되므로 짧은 라이트 모드 플래시가 있을 수 있음
 * - 완전한 FOUC 방지는 root.tsx에서 inline script로 처리해야 하는데, 데모 특성상 허용
 *
 * [cleanup]
 * - 라우트 이탈 시 설정한 data-theme 속성 제거
 *   (메인 사이트는 다크모드 없음, 속성이 남아있으면 영향 없지만 깔끔하게 제거)
 */
const STORAGE_KEY = "pp-theme"

type Theme = "light" | "dark"

const getStoredTheme = (): Theme | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === "dark" || v === "light" ? v : null
  } catch {
    return null
  }
}

const setStoredTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private 모드 등에서 실패할 수 있음 — 무시 */
  }
}

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme)
}

export const initDarkMode = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}
  if (typeof window === "undefined") return () => {}

  // 초기 테마 결정
  const stored = getStoredTheme()
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const initial: Theme = stored ?? (prefersDark ? "dark" : "light")
  applyTheme(initial)

  // 토글 버튼
  const toggle = root.querySelector<HTMLButtonElement>(".pp-theme-toggle")
  const onClick = () => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "light"
    const next: Theme = current === "dark" ? "light" : "dark"
    applyTheme(next)
    setStoredTheme(next)
  }

  if (toggle) toggle.addEventListener("click", onClick)

  // cleanup
  return () => {
    if (toggle) toggle.removeEventListener("click", onClick)
    // 메인 사이트로 돌아갈 때 속성 제거 (다크모드가 메인에 영향 없지만 깔끔하게)
    document.documentElement.removeAttribute("data-theme")
  }
}
