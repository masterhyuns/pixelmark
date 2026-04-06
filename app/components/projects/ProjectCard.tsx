import { Link } from "react-router"
import type { Project } from "~/types/types"
import { CATEGORY_LABEL } from "~/types/types"
import TechBadge from "./TechBadge"

interface ProjectCardProps {
  project: Project
  /**
   * 우선 로딩 이미지 여부
   * - true: LCP 영향 구간(메인 하이라이트, 목록 최상단)에서 사용
   *   loading="eager" + fetchpriority="high" 적용해 첫 화면 노출 속도 개선
   * - false(기본): loading="lazy"로 스크롤 진입 시 로드
   */
  priority?: boolean
}

/**
 * 프로젝트 목록 카드 컴포넌트
 *
 * [성능 설계]
 * - aspect-[16/10]로 컨테이너 높이 고정 → CLS(Cumulative Layout Shift) 방지
 * - width/height 속성을 명시해 브라우저가 이미지 로드 전에도 공간 예약
 * - loading 속성은 priority prop으로 분기 (LCP 구간 vs 스크롤 진입 구간)
 * - decoding="async"로 메인 스레드 블로킹 방지
 */
const ProjectCard = ({ project, priority = false }: ProjectCardProps) => {
  const { slug, title, subtitle, category, techStack, thumbnail, industry, duration } = project

  const categoryStyle = {
    standard: "bg-[#f0fdf4]/10 text-[#4ade80] border-[#4ade80]/20",
    deluxe: "bg-[#eff6ff]/10 text-[#60a5fa] border-[#60a5fa]/20",
    premium: "bg-[#fdf4ff]/10 text-[#c084fc] border-[#c084fc]/20",
  }[category]

  return (
    <Link
      to={`/projects/${slug}`}
      className="group block bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      {/* 썸네일 - 디자인가이드의 16:10 비율 (760x475 원본 기준) */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={thumbnail}
          alt={`${title} 썸네일`}
          width={760}
          height={475}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
        {/* 카테고리 배지 */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryStyle}`}
        >
          {CATEGORY_LABEL[category]}
        </span>
      </div>

      {/* 콘텐츠 */}
      <div className="p-5">
        {/* 업종 + 기간 */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#666666] text-xs">{industry}</span>
          <span className="w-px h-3 bg-white/10" aria-hidden="true" />
          <span className="text-[#666666] text-xs">{duration}</span>
        </div>

        {/* 제목 */}
        <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-[#2563eb] transition-colors duration-150 leading-snug">
          {title}
        </h3>

        {/* 부제목 */}
        <p className="text-[#666666] text-sm leading-relaxed mb-4 line-clamp-2">{subtitle}</p>

        {/* 기술 스택 (최대 4개) */}
        <div className="flex flex-wrap gap-1.5">
          {techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {techStack.length > 4 && (
            <span className="text-xs text-[#666666]">+{techStack.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
