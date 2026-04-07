/**
 * E-S8 Wedding Vivid — 계좌 복사 + 토스트
 */
export const initCopyAccount = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-wv-copy]")
  const toast = root.querySelector<HTMLElement>(".wv-toast")
  if (buttons.length === 0 || !toast) return () => {}
  let timer: number | null = null

  const show = (msg: string) => {
    toast.textContent = msg
    toast.classList.add("is-show")
    if (timer !== null) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      toast.classList.remove("is-show")
      timer = null
    }, 2200)
  }

  const copy = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch { /* noop */ }
    try {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(ta)
      return ok
    } catch { return false }
  }

  const handlers: Array<[HTMLButtonElement, (e: Event) => void]> = []
  buttons.forEach((btn) => {
    const fn = async (e: Event) => {
      e.preventDefault()
      const val = btn.dataset.wvCopy ?? ""
      if (!val) return
      const ok = await copy(val)
      show(ok ? "계좌번호가 복사되었습니다" : "복사에 실패했습니다")
    }
    btn.addEventListener("click", fn)
    handlers.push([btn, fn])
  })

  return () => {
    handlers.forEach(([btn, fn]) => btn.removeEventListener("click", fn))
    if (timer !== null) window.clearTimeout(timer)
    toast.classList.remove("is-show")
  }
}
