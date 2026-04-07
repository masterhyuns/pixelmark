/**
 * E-S1 Wedding Minimal — 계좌번호 클립보드 복사 + 토스트
 *
 * [동작]
 * - [data-wm-copy="번호"] 클릭 → navigator.clipboard 또는 textarea fallback
 * - 성공 시 .wm-toast 요소에 is-show 추가, 3초 후 제거
 *
 * [cleanup]
 * - 이벤트 리스너 / 토스트 타이머 정리
 */
export const initCopyAccount = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-wm-copy]")
  const toast = root.querySelector<HTMLElement>(".wm-toast")
  if (buttons.length === 0 || !toast) return () => {}

  let toastTimer: number | null = null

  const showToast = (message: string) => {
    toast.textContent = message
    toast.classList.add("is-show")
    if (toastTimer !== null) window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-show")
      toastTimer = null
    }, 2400)
  }

  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      // fallthrough
    }
    // fallback: textarea
    try {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.setAttribute("readonly", "")
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }

  const handlers: Array<[HTMLButtonElement, (e: Event) => void]> = []
  buttons.forEach((btn) => {
    const handler = async (e: Event) => {
      e.preventDefault()
      const value = btn.dataset.wmCopy ?? ""
      if (!value) return
      const ok = await copyText(value)
      showToast(ok ? "계좌번호가 복사되었습니다" : "복사에 실패했습니다")
    }
    btn.addEventListener("click", handler)
    handlers.push([btn, handler])
  })

  return () => {
    handlers.forEach(([btn, fn]) => btn.removeEventListener("click", fn))
    if (toastTimer !== null) window.clearTimeout(toastTimer)
    toast.classList.remove("is-show")
  }
}
