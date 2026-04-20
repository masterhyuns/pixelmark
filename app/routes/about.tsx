import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Route } from "./+types/about"
import { createMeta, PAGE_META } from "~/utils/seo"
import { strengths, processSteps } from "~/data/projects"

export const meta: Route.MetaFunction = () => createMeta(PAGE_META.about)

const KMONG_URL = "https://kmong.com/gig/760141"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const strengthsRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // 강점 카드 stagger (뷰포트 진입 시 순차 페이드업)
      if (strengthsRef.current) {
        gsap.fromTo(
          strengthsRef.current.querySelectorAll(".strength-item"),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.55, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: strengthsRef.current, start: "top 85%", once: true },
          }
        )
      }

      // 프로세스 스텝 stagger (좌에서 슬라이드인)
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.querySelectorAll(".process-item"),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: processRef.current, start: "top 85%", once: true },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-16">
      {/* ===== 페이지 헤더 ===== */}
      <div className="pt-16 pb-16 border-b border-white/5">
        <div className="container">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">About</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-4">팀 소개</h1>
          <p className="text-[#aaaaaa] text-base md:text-lg leading-relaxed">
            퍼블리싱부터 풀스택까지. 새롭게 시작하는 2인 개발팀 Pixelmark를 소개합니다.
          </p>
        </div>
      </div>

      {/* ===== 팀 강점 섹션 ===== */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Strengths</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
              왜 저희를 선택하나요
            </h2>
          </div>

          <div ref={strengthsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="strength-item p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                {/* Lucide 아이콘 컴포넌트 렌더 */}
                <div className="mb-4 text-[#2563eb]" aria-hidden="true">
                  <item.icon size={28} strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 작업 프로세스 섹션 ===== */}
      <section className="py-24 md:py-32 bg-[#0d0d0d]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Process</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
              작업 프로세스
            </h2>
          </div>

          <div className="relative max-w-2xl mx-auto">
            {/* 세로선 */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" aria-hidden="true" />

            <div ref={processRef} className="space-y-0">
              {processSteps.map((step) => (
                <div key={step.step} className="process-item relative flex gap-6 pb-10 last:pb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#111111] border border-[#2563eb]/30 flex items-center justify-center z-10">
                    <span className="text-[#2563eb] text-sm font-bold">{step.step}</span>
                  </div>
                  <div className="pt-2.5 pb-2">
                    <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                    <p className="text-[#666666] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-[#0d0d0d] border-t border-white/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-3">함께 만들어볼까요?</h2>
          <p className="text-[#666666] mb-8">크몽을 통해 안전하게 시작하세요.</p>
          <a
            href={KMONG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150"
          >
            크몽에서 문의하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
