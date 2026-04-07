import { useRef, useEffect } from "react"
import { Link } from "react-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Route } from "./+types/home"
import { createMeta, PAGE_META } from "~/utils/seo"
import { getFeaturedProjects, services, techGroups } from "~/data/projects"
import ProjectCard from "~/components/projects/ProjectCard"

export const meta: Route.MetaFunction = () => createMeta(PAGE_META.home)

const KMONG_URL = "https://kmong.com" // 실제 크몽 프로필 URL로 교체

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const featured = getFeaturedProjects(3)

  // 히어로 섹션 애니메이션 대상
  const heroRef = useRef<HTMLDivElement>(null)
  // 프로젝트 카드 그리드 컨테이너
  const cardsRef = useRef<HTMLDivElement>(null)
  // 서비스 카드 컨테이너
  const servicesRef = useRef<HTMLDivElement>(null)
  // 기술 스택 그룹 컨테이너
  const techRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      // 히어로 텍스트 순차 진입 (페이지 로드 시)
      const heroChildren = heroRef.current?.querySelectorAll(".hero-anim")
      if (heroChildren) {
        gsap.fromTo(
          heroChildren,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.1,
          }
        )
      }

      // 프로젝트 카드 stagger (스크롤 진입 시)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".project-card-item")
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }

      // 서비스 카드 stagger
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll(".service-card-item")
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }

      // 기술 스택 stagger
      if (techRef.current) {
        const groups = techRef.current.querySelectorAll(".tech-group-item")
        gsap.fromTo(
          groups,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: techRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-16">
      {/* ===== 히어로 섹션 ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 배경 그라디언트 */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2563eb]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1d4ed8]/5 rounded-full blur-[100px]" />
        </div>

        <div ref={heroRef} className="container text-center relative z-10">
          {/* 태그라인 - 허위 경력 표기 없이 "신규 오픈 + 의뢰 가능" 상태만 표시 */}
          <span className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 text-[#60a5fa] text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" aria-hidden="true" />
            Pixelmark · 신규 오픈
          </span>

          {/* 메인 헤딩 */}
          <h1 className="hero-anim text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
            퍼블리싱부터{" "}
            <span className="text-[#2563eb]">풀스택</span>
            <br />
            모두 맡겨주세요
          </h1>

          {/* 서브 카피 - 한 업종에 국한되지 않는 카테고리 폭을 강조 */}
          <p className="hero-anim text-[#aaaaaa] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            브랜딩 사이트부터 풀스택 서비스까지.<br />
            디자인 의도를 정확히 구현하고, 납기와 소통으로 증명합니다.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={KMONG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150 text-base"
            >
              크몽에서 문의하기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors duration-150 text-base"
            >
              포트폴리오 보기
            </Link>
          </div>

          {/* 스크롤 유도 */}
          <div className="hero-anim mt-20 flex flex-col items-center gap-2 text-[#444444] text-sm animate-bounce">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="아래로 스크롤" role="img">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ===== 프로젝트 하이라이트 섹션 ===== */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Projects</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white leading-tight">
                최근 작업 사례
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-white transition-colors duration-150"
            >
              전체 보기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <div key={project.slug} className="project-card-item">
                {/* 첫 번째 카드만 priority=true → 메인 피처드 영역의 LCP 개선
                    나머지는 lazy loading으로 유지하여 초기 네트워크 부담 최소화 */}
                <ProjectCard project={project} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 서비스 소개 섹션 ===== */}
      <section className="py-24 md:py-32 bg-[#0d0d0d]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Services</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
              제공하는 서비스
            </h2>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="service-card-item p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                {/* Lucide 아이콘 컴포넌트를 데이터에서 꺼내 렌더. size/strokeWidth로 정밀 제어 */}
                <div className="mb-4 text-[#2563eb]" aria-hidden="true">
                  <service.icon size={32} strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-[#666666] text-sm leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs text-[#aaaaaa] bg-white/5 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 기술 스택 섹션 ===== */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Tech Stack</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
              사용하는 기술
            </h2>
          </div>

          {/* 5개 그룹(Frontend/Markup/Backend/Database/Infra)
              lg:grid-cols-3으로 3+2 배치 → 5번째가 고아 카드로 남지 않고 균형 유지
              Backend/Database는 아이템이 많아 좁은 열보단 3열 폭이 가독성 유리 */}
          <div ref={techRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techGroups.map((group) => (
              <div key={group.group} className="tech-group-item p-5 rounded-xl bg-[#111111] border border-white/5">
                <h3 className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-4">
                  {group.group}
                </h3>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-[#cccccc] text-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 배너 섹션 ===== */}
      <section className="py-24 md:py-32 bg-[#0d0d0d]">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] p-12 md:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white mb-4">
                프로젝트가 있으신가요?
              </h2>
              <p className="text-blue-200 text-base md:text-lg mb-8 max-w-md mx-auto">
                크몽을 통해 안전하게 시작하세요.<br />
                견적부터 납품까지 투명하게 진행합니다.
              </p>
              <a
                href={KMONG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[#1d4ed8] font-bold hover:bg-blue-50 transition-colors duration-150 text-base"
              >
                크몽에서 문의하기
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
