/**
 * 기술 스택 배지 컴포넌트
 * 프로젝트 카드 및 상세 페이지에서 기술 태그를 표시한다
 */
const TechBadge = ({ name }: { name: string }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-[#aaaaaa] border border-white/8">
    {name}
  </span>
)

export default TechBadge
