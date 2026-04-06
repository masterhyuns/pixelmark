import { Link } from "react-router"
import type { Route } from "./+types/$"

export const meta: Route.MetaFunction = () => [
  { title: "페이지를 찾을 수 없습니다 | Pixelmark" },
  { name: "robots", content: "noindex" },
]

/** 404 Not Found 페이지 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
      {/* 404 숫자 */}
      <p className="text-[8rem] md:text-[12rem] font-extrabold leading-none text-white/5 select-none mb-4">
        404
      </p>

      {/* 메시지 */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-[#666666] max-w-sm leading-relaxed mb-10">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
        주소를 다시 확인해주세요.
      </p>

      {/* 버튼 */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150"
        >
          홈으로 이동
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-medium transition-colors duration-150"
        >
          포트폴리오 보기
        </Link>
      </div>
    </div>
  )
}
