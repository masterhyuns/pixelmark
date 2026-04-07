/**
 * E-S3 Popup Vivid — 거대 D-day 카운트다운
 *
 * 다른 데모와 동일 패턴, 셀렉터를 [data-pv-countdown]로 격리.
 * 1초마다 days/hours/minutes/seconds 갱신.
 */
export const initCountdown = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}

  const container = root.querySelector<HTMLElement>("[data-pv-countdown]")
  if (!container) return () => {}

  const targetISO = container.dataset.target
  if (!targetISO) return () => {}
  const target = new Date(targetISO).getTime()
  if (Number.isNaN(target)) return () => {}

  const dEl = container.querySelector<HTMLElement>("[data-cd-days]")
  const hEl = container.querySelector<HTMLElement>("[data-cd-hours]")
  const mEl = container.querySelector<HTMLElement>("[data-cd-minutes]")
  const sEl = container.querySelector<HTMLElement>("[data-cd-seconds]")

  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0")

  const tick = () => {
    const diff = target - Date.now()
    if (diff <= 0) {
      if (dEl) dEl.textContent = "00"
      if (hEl) hEl.textContent = "00"
      if (mEl) mEl.textContent = "00"
      if (sEl) sEl.textContent = "00"
      window.clearInterval(timer)
      return
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    if (dEl) dEl.textContent = pad(days)
    if (hEl) hEl.textContent = pad(hours)
    if (mEl) mEl.textContent = pad(minutes)
    if (sEl) sEl.textContent = pad(seconds)
  }

  tick()
  const timer = window.setInterval(tick, 1000)
  return () => window.clearInterval(timer)
}
