import { Link } from "react-router"
import type { Project, ProjectCategory } from "~/types/types"
import { CATEGORY_LABEL, TIER_LABEL } from "~/types/types"
// TIER_STYLE은 app/utils/tierStyle.ts에서 단일 진실의 원천으로 관리 (지시서 #001 항목 8)
import { TIER_STYLE } from "~/utils/tierStyle"
import TechBadge from "./TechBadge"

/**
 * 카테고리(주제/업종) 색상 매핑 - 카드 좌상단 메인 라벨용
 *
 * 다크 테마(#0a0a0a 배경) 위에서 잘 보이도록 채도/명도를 조정.
 * 디자인가이드의 라이트 모드 색상을 다크 모드용으로 변환:
 * - 배경: 색상/10 (옅은 틴트)
 * - 텍스트: 색상-300 또는 -400 (밝은 톤)
 * - 보더: 색상/20
 */
const CATEGORY_STYLE: Record<ProjectCategory, string> = {
  brand: "bg-pink-500/10 text-pink-300 border-pink-400/20",
  professional: "bg-blue-500/10 text-blue-300 border-blue-400/20",
  fnb: "bg-orange-500/10 text-orange-300 border-orange-400/20",
  event: "bg-indigo-500/10 text-indigo-300 border-indigo-400/20",
  personal: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
}

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
  const { slug, title, subtitle, category, tier, techStack, thumbnail, industry, duration } = project

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
        {/* 카테고리 배지 (좌상단, 메인 라벨 - 큰 시각 비중) */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${CATEGORY_STYLE[category]}`}
        >
          {CATEGORY_LABEL[category]}
        </span>
        {/* 등급 뱃지 (우상단, 패키지 시그널 - 작은 시각 비중) */}
        <span
          className={`absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${TIER_STYLE[tier]}`}
        >
          {TIER_LABEL[tier]}
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
