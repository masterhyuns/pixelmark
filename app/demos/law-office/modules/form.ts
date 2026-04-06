/**
 * 상담 예약 폼 밸리데이션 + 제출 모달 트리거
 *
 * [왜 vanilla인가]
 * - 기획서: 인터랙션은 vanilla TS 모듈, React state 관리 X
 * - react-hook-form 등 외부 라이브러리 없이 직접 검증
 *
 * [검증 규칙]
 * - name: 필수, 최소 2자
 * - phone: 필수, 010-XXXX-XXXX 패턴 허용 (하이픈 있어도 없어도 OK)
 * - category: 필수 선택
 * - message: 필수, 최소 10자
 * - consent: 필수 체크
 *
 * [에러 표시]
 * - 각 필드 wrapper에 has-error 클래스 토글
 * - 에러 메시지는 SCSS에서 display 제어
 *
 * [제출]
 * - 실제 서버 전송 없음 (기획서)
 * - 성공 모달(lo-modal-backdrop)에 is-open 추가
 * - form reset 후 모달 표시
 *
 * [initModal과의 상호작용]
 * - modal.ts는 닫기 버튼/배경 클릭/Esc 처리
 * - form.ts는 단순히 is-open 클래스만 추가
 */
export const initForm = (root: HTMLElement | null): (() => void) => {
  if (!root) return () => {}

  const form = root.querySelector<HTMLFormElement>(".lo-form")
  if (!form) return () => {}

  const modal = root.querySelector<HTMLElement>(".lo-modal-backdrop")

  interface ValidationResult {
    valid: boolean
    message?: string
  }

  const validators: Record<string, (value: string, checked?: boolean) => ValidationResult> = {
    name: (v) => {
      if (!v.trim()) return { valid: false, message: "이름을 입력해주세요" }
      if (v.trim().length < 2) return { valid: false, message: "이름은 2자 이상 입력해주세요" }
      return { valid: true }
    },
    phone: (v) => {
      if (!v.trim()) return { valid: false, message: "연락처를 입력해주세요" }
      // 010-XXXX-XXXX 또는 010XXXXXXXX 허용
      const pattern = /^01[016789][-\s]?\d{3,4}[-\s]?\d{4}$/
      if (!pattern.test(v.trim())) return { valid: false, message: "올바른 연락처 형식이 아닙니다" }
      return { valid: true }
    },
    category: (v) => {
      if (!v || v === "") return { valid: false, message: "상담 분야를 선택해주세요" }
      return { valid: true }
    },
    message: (v) => {
      if (!v.trim()) return { valid: false, message: "문의 내용을 입력해주세요" }
      if (v.trim().length < 10) return { valid: false, message: "10자 이상 입력해주세요" }
      return { valid: true }
    },
    consent: (_v, checked) => {
      if (!checked) return { valid: false, message: "개인정보 수집에 동의해주세요" }
      return { valid: true }
    },
  }

  /** 개별 필드 검증 및 에러 표시 */
  const validateField = (name: string): boolean => {
    const field = form.querySelector<HTMLElement>(`[data-field="${name}"]`)
    if (!field) return true

    const input = field.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select"
    )
    if (!input) return true

    const validator = validators[name]
    if (!validator) return true

    const checked = "checked" in input ? (input as HTMLInputElement).checked : undefined
    const result = validator(input.value, checked)

    const errorEl = field.querySelector<HTMLElement>(".lo-form-error")
    if (result.valid) {
      field.classList.remove("has-error")
      input.classList.remove("has-error")
    } else {
      field.classList.add("has-error")
      input.classList.add("has-error")
      if (errorEl && result.message) errorEl.textContent = result.message
    }

    return result.valid
  }

  /** 전체 폼 검증 */
  const validateAll = (): boolean => {
    const fieldNames = Object.keys(validators)
    const results = fieldNames.map((name) => validateField(name))
    return results.every(Boolean)
  }

  // ----- 실시간 검증 (blur 시) -----
  interface InputHandler {
    el: Element
    handler: () => void
  }
  const inputHandlers: InputHandler[] = []

  form.querySelectorAll<HTMLElement>("[data-field]").forEach((field) => {
    const name = field.dataset.field
    if (!name) return
    const input = field.querySelector("input, textarea, select")
    if (!input) return

    const handler = () => validateField(name)
    input.addEventListener("blur", handler)
    // 체크박스는 change 이벤트도
    if ((input as HTMLInputElement).type === "checkbox") {
      input.addEventListener("change", handler)
    }
    inputHandlers.push({ el: input, handler })
  })

  // ----- 제출 -----
  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (!validateAll()) return

    // 성공 — 모달 열기
    if (modal) {
      modal.classList.add("is-open")
      // 포커스 트랩 (접근성): 모달 내 첫 버튼에 포커스
      const closeBtn = modal.querySelector<HTMLButtonElement>(".lo-modal-close")
      closeBtn?.focus()
    }

    // 폼 초기화
    form.reset()
    form.querySelectorAll<HTMLElement>("[data-field]").forEach((field) => {
      field.classList.remove("has-error")
    })
  }
  form.addEventListener("submit", onSubmit)

  // cleanup
  return () => {
    form.removeEventListener("submit", onSubmit)
    inputHandlers.forEach(({ el, handler }) => {
      el.removeEventListener("blur", handler)
      el.removeEventListener("change", handler)
    })
  }
}
