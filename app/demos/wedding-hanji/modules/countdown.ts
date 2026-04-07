export const initCountdown = (root: HTMLElement | null): (() => void) => {
  if (!root || typeof window === "undefined") return () => {}
  const container = root.querySelector<HTMLElement>("[data-whan-countdown]")
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
    if (dEl) dEl.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)))
    if (hEl) hEl.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24))
    if (mEl) mEl.textContent = pad(Math.floor((diff / (1000 * 60)) % 60))
    if (sEl) sEl.textContent = pad(Math.floor((diff / 1000) % 60))
  }
  tick()
  const timer = window.setInterval(tick, 1000)
  return () => window.clearInterval(timer)
}
