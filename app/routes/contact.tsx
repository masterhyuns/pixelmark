import type { Route } from "./+types/contact"
import { createMeta, PAGE_META } from "~/utils/seo"

export const meta: Route.MetaFunction = () => createMeta(PAGE_META.contact)

const KMONG_URL = "https://kmong.com" // 실제 크몽 프로필 URL로 교체
const EMAIL = "your@email.com" // 실제 이메일로 교체

export default function Contact() {
  return (
    <div className="pt-16">
      {/* ===== 페이지 헤더 ===== */}
      <div className="pt-16 pb-16 border-b border-white/5">
        <div className="container">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">Contact</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-4">문의하기</h1>
          <p className="text-[#aaaaaa] text-base md:text-lg max-w-lg leading-relaxed">
            프로젝트 의뢰는 크몽을 통해 안전하게 진행합니다.
            견적부터 납품까지 체계적으로 관리됩니다.
          </p>
        </div>
      </div>

      <div className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* 메인 CTA 카드 */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] p-10 md:p-14 text-center mb-8">
              {/* 배경 장식 */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10">
                {/* 크몽 아이콘 영역 */}
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                  K
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  크몽에서 문의하기
                </h2>
                <p className="text-blue-200 mb-8 leading-relaxed">
                  크몽을 통한 안전한 거래로 진행합니다.<br />
                  요구사항, 레퍼런스, 예산을 알려주시면 빠르게 견적 드립니다.
                </p>

                <a
                  href={KMONG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1d4ed8] font-bold hover:bg-blue-50 transition-colors duration-150 text-base"
                >
                  크몽 프로필 바로가기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* 이메일 보조 옵션 */}
            <div className="p-6 rounded-xl bg-[#111111] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-medium mb-1">이메일 문의</p>
                <p className="text-[#666666] text-sm">크몽 외 직접 이메일로도 연락 가능합니다</p>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors duration-150"
              >
                {EMAIL}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* 안내 사항 */}
            <div className="mt-12">
              <h3 className="text-white font-semibold mb-4">문의 전 확인해주세요</h3>
              <ul className="space-y-3">
                {[
                  "레퍼런스(참고 사이트)가 있으면 공유해주시면 빠른 견적이 가능합니다",
                  "예산 범위를 알려주시면 그에 맞는 최적의 방법을 제안합니다",
                  "납기일이 있는 경우 미리 말씀해주세요",
                  "크몽 메시지를 통한 모든 대화는 기록으로 보호됩니다",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-[#666666] text-sm">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-1.5" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
