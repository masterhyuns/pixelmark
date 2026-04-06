import { Link } from "react-router"
import type { Route } from "./+types/projects.$slug"
import { createProjectMeta, projectJsonLd } from "~/utils/seo"
import { getProjectBySlug, getRelatedProjects } from "~/data/projects"
import { CATEGORY_LABEL } from "~/types/types"
import TechBadge from "~/components/projects/TechBadge"
import ProjectCard from "~/components/projects/ProjectCard"
import JsonLd from "~/components/common/JsonLd"

export const loader = ({ params }: Route.LoaderArgs) => {
  const project = getProjectBySlug(params.slug ?? "")
  if (!project) {
    throw new Response("Not Found", { status: 404 })
  }
  const related = getRelatedProjects(params.slug ?? "", 2)
  return { project, related }
}

export const meta: Route.MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not Found" }]
  return createProjectMeta(data.project)
}

const KMONG_URL = "https://kmong.com" // 실제 크몽 프로필 URL로 교체

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { project, related } = loaderData

  const categoryStyle = {
    standard: "bg-[#f0fdf4]/10 text-[#4ade80] border-[#4ade80]/20",
    deluxe: "bg-[#eff6ff]/10 text-[#60a5fa] border-[#60a5fa]/20",
    premium: "bg-[#fdf4ff]/10 text-[#c084fc] border-[#c084fc]/20",
  }[project.category]

  return (
    <div className="pt-16">
      {/* 프로젝트 CreativeWork JSON-LD
          검색 엔진이 각 프로젝트를 독립적인 작업물로 인식하게 함
          → 리치 스니펫(이미지, 제목, 설명) 노출 기회 증가 */}
      <JsonLd data={projectJsonLd(project)} />

      {/* ===== 프로젝트 헤더 ===== */}
      <div className="pt-12 pb-12 border-b border-white/5">
        <div className="container">
          {/* 뒤로가기 */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-white text-sm mb-8 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            프로젝트 목록
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* 카테고리 배지 */}
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border mb-4 ${categoryStyle}`}>
                {CATEGORY_LABEL[project.category]}
              </span>

              {/* 제목 */}
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white mb-3 leading-tight">
                {project.title}
              </h1>

              {/* 부제목 */}
              <p className="text-[#aaaaaa] text-base md:text-lg max-w-2xl leading-relaxed mb-6">
                {project.subtitle}
              </p>

              {/* 기술 스택 */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>

            {/* 메타 정보 + CTA */}
            <div className="lg:w-64 xl:w-72 flex-shrink-0">
              <div className="p-5 rounded-xl bg-[#111111] border border-white/5">
                <dl className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <dt className="text-[#666666]">카테고리</dt>
                    <dd className="text-white font-medium">{CATEGORY_LABEL[project.category]}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-[#666666]">업종</dt>
                    <dd className="text-white font-medium">{project.industry}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-[#666666]">작업 기간</dt>
                    <dd className="text-white font-medium">{project.duration}</dd>
                  </div>
                </dl>

                {/* 데모 진입 버튼 2개
                    1) 같은 탭으로 데모 보기: Link 컴포넌트 (클라이언트 라우팅, 컨텍스트 유지)
                    2) 새 탭으로 열기: target="_blank" (비교 보기 용도)
                    사용자가 상황에 맞게 선택할 수 있도록 둘 다 제공 */}
                {project.demoUrl && (
                  <>
                    <Link
                      to={project.demoUrl}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium transition-colors duration-150 mb-2"
                    >
                      데모 보기
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </Link>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-[#aaaaaa] hover:text-white text-xs font-medium transition-colors duration-150 mb-2"
                    >
                      새 탭에서 열기
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </>
                )}

                <a
                  href={KMONG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors duration-150"
                >
                  이런 사이트 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 스크린샷 ===== */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-xl font-semibold text-white mb-8">스크린샷</h2>
          <div className="space-y-4">
            {project.images.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/5">
                {/* width/height 명시로 CLS 방지
                    첫 이미지만 eager + high priority (상세 페이지 LCP) */}
                <img
                  src={src}
                  alt={`${project.title} 스크린샷 ${i + 1}`}
                  width={1200}
                  height={750}
                  className="w-full h-auto object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 프로젝트 설명 ===== */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 설명 */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-5">프로젝트 개요</h2>
              <p className="text-[#aaaaaa] leading-relaxed text-base">{project.description}</p>
            </div>

            {/* 상세 메타 */}
            <aside>
              <h3 className="text-sm font-semibold text-[#666666] uppercase tracking-wider mb-4">
                기술 스택
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== 핵심 포인트 ===== */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-xl font-semibold text-white mb-8">핵심 구현 포인트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#111111] border border-white/5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2563eb]/20 text-[#60a5fa] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                    <p className="text-[#666666] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 데모 (iframe) ===== */}
      {project.demoUrl && (
        <section className="py-16 bg-[#0d0d0d]">
          <div className="container">
            <h2 className="text-xl font-semibold text-white mb-8">라이브 데모</h2>
            {/* PC에서만 iframe 표시, 모바일은 버튼 */}
            <div className="hidden md:block rounded-xl overflow-hidden border border-white/5 aspect-video">
              <iframe
                src={project.demoUrl}
                title={`${project.title} 데모`}
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="md:hidden">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium transition-colors duration-150"
              >
                데모 사이트 열기
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ===== 문의 CTA ===== */}
      <section className="py-16 border-t border-white/5">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            이런 사이트가 필요하신가요?
          </h2>
          <p className="text-[#666666] mb-8">크몽을 통해 안전하게 의뢰해주세요.</p>
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

      {/* ===== 다른 프로젝트 ===== */}
      {related.length > 0 && (
        <section className="py-16 bg-[#0d0d0d]">
          <div className="container">
            <h2 className="text-xl font-semibold text-white mb-8">다른 프로젝트</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
