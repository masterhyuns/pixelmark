import { useSearchParams } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import type { Route } from "./+types/projects._index"
import { createMeta, PAGE_META } from "~/utils/seo"
import { projects } from "~/data/projects"
import ProjectCard from "~/components/projects/ProjectCard"
import type { FilterCategory } from "~/types/types"

export const meta: Route.MetaFunction = () => createMeta(PAGE_META.projects)

/**
 * 필터 탭 - 카테고리(주제/업종) 기준
 *
 * 고객 시점의 분류로, 자기 사업 분야 사례를 빠르게 찾도록 한다.
 * 가격 등급(STANDARD/DELUXE/PREMIUM)은 카드 우상단 뱃지에서 별도 표시.
 */
const FILTER_TABS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "brand", label: "브랜드" },
  { value: "professional", label: "전문 서비스" },
  { value: "fnb", label: "매장·F&B" },
  { value: "event", label: "이벤트" },
  { value: "personal", label: "개인" },
]

export default function ProjectsIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategory = (searchParams.get("category") ?? "all") as FilterCategory

  const filtered =
    currentCategory === "all"
      ? projects
      : projects.filter((p) => p.category === currentCategory)

  const handleFilter = (category: FilterCategory) => {
    if (category === "all") {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  return (
    <div className="pt-16">
      {/* 페이지 헤더 */}
      <div className="pt-16 pb-12 border-b border-white/5">
        <div className="container">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">Portfolio</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-4">프로젝트</h1>
          <p className="text-[#666666] text-base max-w-xl">
            다양한 업종과 기술 스택의 실제 구현 사례를 확인하세요.
          </p>
        </div>
      </div>

      {/* 필터 바 */}
      <div className="sticky top-16 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="container">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {FILTER_TABS.map(({ value, label }) => {
              const count = value === "all"
                ? projects.length
                : projects.filter((p) => p.category === value).length
              const isActive = currentCategory === value

              return (
                <button
                  key={value}
                  onClick={() => handleFilter(value)}
                  className={`relative flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive ? "text-white" : "text-[#666666] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* 활성 탭 배경 (layout animation) */}
                  {isActive && (
                    <motion.span
                      layoutId="filter-active-bg"
                      className="absolute inset-0 rounded-lg bg-[#2563eb]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">
                    {label}
                    <span className="ml-2 text-xs opacity-60">{count}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 프로젝트 그리드 */}
      <div className="container py-12">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-[#666666]">해당 카테고리의 프로젝트가 없습니다.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-[#666666] text-sm mb-8">
              총 <span className="text-white font-medium">{filtered.length}</span>개 프로젝트
            </p>

            {/* AnimatePresence로 카드 진입/퇴장 애니메이션 */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
