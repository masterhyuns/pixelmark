import { Link } from "react-router"
import {
  Users,
  CreditCard,
  ShieldCheck,
  Database,
  Server,
  Settings,
  Check,
  AlertTriangle,
} from "lucide-react"
import type { Route } from "./+types/services.premium"
import { createMeta, PAGE_META } from "~/utils/seo"
import { techGroups } from "~/data/projects"

/**
 * PREMIUM 맞춤 서비스 안내 페이지 (지시서 #001 항목 9)
 *
 * [왜 별도 페이지인가]
 * - PREMIUM은 데모로 보여줄 수 없는 풀스택+운영 영역.
 * - 카드 한 장으로는 "왜 별도 상담이 필요한지" 설득 불가.
 * - STANDARD/DELUXE와 명확히 다른 가격·일정·책임 범위를 사전 안내해
 *   상담 시점의 미스매치를 줄인다.
 *
 * [디자인 원칙]
 * - home/about과 동일한 다크 톤 + #2563eb 액센트.
 * - 별도 컴포넌트 분리 없이 단일 파일 (재사용 대상이 없음).
 * - 구체 금액은 표기하지 않고 "개별 상담" 강조.
 */

export const meta: Route.MetaFunction = () => createMeta(PAGE_META.premium)

const KMONG_URL = "https://kmong.com"

/** 비교 표 데이터 — STANDARD/DELUXE/PREMIUM 차이를 한 눈에 */
const COMPARISON: Array<{ label: string; standard: string; deluxe: string; premium: string }> = [
  { label: "결과물", standard: "정적 페이지", deluxe: "동적 프론트엔드", premium: "풀스택 서비스" },
  { label: "백엔드/DB", standard: "없음", deluxe: "Mock/외부 API", premium: "직접 설계·구축" },
  { label: "회원/결제", standard: "없음", deluxe: "외부 SaaS 연동", premium: "직접 구현" },
  { label: "어드민", standard: "없음", deluxe: "선택", premium: "포함" },
  { label: "운영/유지보수", standard: "납품 종료", deluxe: "납품 종료", premium: "협의 가능" },
  { label: "상담 방식", standard: "표준 패키지", deluxe: "표준 패키지", premium: "개별 견적" },
]

/** 작업 범위 카드 */
const SCOPE = [
  { icon: Users, title: "회원 시스템", desc: "가입/로그인, 소셜 로그인, 이메일 인증, 권한 관리" },
  { icon: CreditCard, title: "결제 연동", desc: "PG/카카오페이/토스페이먼츠 등 국내 결제 모듈 통합" },
  { icon: ShieldCheck, title: "백엔드 API", desc: "REST/GraphQL, 인증·권한, 비즈니스 로직, 외부 연동" },
  { icon: Database, title: "DB 설계", desc: "PostgreSQL/MySQL, 마이그레이션, 인덱스/쿼리 최적화" },
  { icon: Server, title: "어드민/운영도구", desc: "콘텐츠/회원/주문 관리, 통계 대시보드" },
  { icon: Settings, title: "인프라/배포", desc: "AWS/Vercel, Docker, CI/CD, 모니터링 기본 세팅" },
]

/** "이런 분에게" 체크리스트 */
const FOR_WHO = [
  "회원가입과 결제가 필요한 서비스를 처음부터 만들고 싶어요",
  "사내 운영팀이 콘텐츠/주문을 직접 관리할 수 있는 어드민이 필요해요",
  "외주받은 코드의 운영·유지보수를 함께 맡길 곳을 찾고 있어요",
  "기획 단계부터 함께 설계하고, 비즈니스에 맞게 커스텀하고 싶어요",
]

/** 작업 프로세스 (PREMIUM 전용 5단계) */
const PROCESS = [
  { step: 1, title: "상담", desc: "사업 모델, 핵심 기능, 예산/일정 범위를 함께 정리합니다." },
  { step: 2, title: "요건 정의", desc: "기능 목록, 화면 흐름, 데이터 구조 초안을 문서화합니다." },
  { step: 3, title: "설계", desc: "DB 스키마, API 명세, 화면 와이어프레임을 확정합니다." },
  { step: 4, title: "개발", desc: "마일스톤별로 진행 상황과 결과물을 공유하며 진행합니다." },
  { step: 5, title: "배포·운영", desc: "배포 후 안정화 기간을 거쳐 운영/유지보수 협의로 전환합니다." },
]

/** 예산/기간 가이드 */
const BUDGET = [
  { label: "예산", desc: "기능 범위에 따라 달라지며, 상담 후 개별 견적으로 산정합니다." },
  { label: "기간", desc: "최소 4주 이상. 회원/결제/어드민 포함 시 6~12주가 일반적입니다." },
  { label: "결제", desc: "크몽 안전거래로 단계별(착수/중간/납품) 분할 진행합니다." },
]

/** 주의사항/제외 범위 */
const NOTES = [
  "디자인 시안이 필요한 경우 별도 디자이너 협업이 필요할 수 있습니다.",
  "운영 중 도메인/호스팅/외부 API 비용은 클라이언트 부담입니다.",
  "법적 검토가 필요한 약관·개인정보 처리방침은 별도 전문가의 검토가 필요합니다.",
  "납품 후 신규 기능 추가는 별도 견적으로 진행됩니다.",
]

/** FAQ */
const FAQ = [
  {
    q: "STANDARD/DELUXE 데모처럼 미리 볼 수 있는 샘플이 있나요?",
    a: "PREMIUM은 비즈니스마다 요구가 달라 표준 데모를 두지 않습니다. 대신 상담 시 유사 도메인의 작업 사례와 화면을 공유드립니다.",
  },
  {
    q: "기획서나 디자인 없이도 의뢰할 수 있나요?",
    a: "가능합니다. 기획 단계부터 함께 정리해드리는 것이 PREMIUM의 핵심입니다. 다만 기간이 더 필요합니다.",
  },
  {
    q: "기존에 만들어진 시스템도 이어받아 운영할 수 있나요?",
    a: "코드 품질·구조에 대한 사전 점검 후 가능 여부를 답변드립니다. 점검만 단독 의뢰도 가능합니다.",
  },
  {
    q: "납품 후 운영·유지보수도 맡길 수 있나요?",
    a: "월 단위 운영 계약으로 협의 가능합니다. 장애 대응, 소규모 기능 개선, 모니터링 등을 포함합니다.",
  },
]

export default function PremiumService() {
  return (
    <div className="pt-16">
      {/* ===== 1. Hero ===== */}
      <section className="pt-20 pb-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#2563eb]/10 rounded-full blur-[120px]" />
        </div>
        <div className="container relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-white text-sm mb-8 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            홈으로
          </Link>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider border bg-white/20 text-white border-white/40 mb-4">
            PREMIUM
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-tight mb-5">
            맞춤 서비스 — <span className="text-[#2563eb]">풀스택부터 운영까지</span>
          </h1>
          <p className="text-[#aaaaaa] text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            회원, 결제, 어드민, 운영까지. 비즈니스에 딱 맞게 설계하고, 만들고, 함께 운영합니다.
            STANDARD/DELUXE 데모로는 보여드리기 어려운 영역이라, 반드시 개별 상담으로 시작합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={KMONG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150"
            >
              크몽에서 상담 신청
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors duration-150"
            >
              STANDARD 사례 먼저 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. 무엇이 다른가 (비교 표) ===== */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Compare</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
              다른 패키지와 무엇이 다른가요
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#666666] font-semibold py-4 px-4"></th>
                  <th className="text-left text-[#aaaaaa] font-semibold py-4 px-4">STANDARD</th>
                  <th className="text-left text-[#aaaaaa] font-semibold py-4 px-4">DELUXE</th>
                  <th className="text-left text-white font-bold py-4 px-4">PREMIUM</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-white/5">
                    <td className="py-4 px-4 text-[#666666] font-medium">{row.label}</td>
                    <td className="py-4 px-4 text-[#888888]">{row.standard}</td>
                    <td className="py-4 px-4 text-[#888888]">{row.deluxe}</td>
                    <td className="py-4 px-4 text-white font-medium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 3. 이런 분에게 ===== */}
      <section className="py-20 md:py-24 bg-[#0d0d0d]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">For You</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">이런 분에게 추천합니다</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {FOR_WHO.map((line) => (
              <div key={line} className="flex items-start gap-3 p-5 rounded-xl bg-[#111111] border border-white/5">
                <Check className="flex-shrink-0 text-[#60a5fa] mt-0.5" size={20} strokeWidth={2.25} aria-hidden="true" />
                <p className="text-[#cccccc] text-sm leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. 작업 범위 ===== */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Scope</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">작업 범위</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCOPE.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-colors duration-300">
                <div className="mb-4 text-[#2563eb]" aria-hidden="true">
                  <item.icon size={28} strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. 기술 스택 ===== */}
      <section className="py-20 md:py-24 bg-[#0d0d0d]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Tech Stack</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">사용하는 기술</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techGroups.map((group) => (
              <div key={group.group} className="p-5 rounded-xl bg-[#111111] border border-white/5">
                <h3 className="text-[#666666] text-xs font-semibold uppercase tracking-wider mb-4">{group.group}</h3>
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

      {/* ===== 6. 진행 프로세스 ===== */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Process</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">진행 프로세스</h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" aria-hidden="true" />
            <div className="space-y-0">
              {PROCESS.map((step) => (
                <div key={step.step} className="relative flex gap-6 pb-10 last:pb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#111111] border border-[#2563eb]/30 flex items-center justify-center z-10">
                    <span className="text-[#2563eb] text-sm font-bold">{step.step}</span>
                  </div>
                  <div className="pt-2.5 pb-2">
                    <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                    <p className="text-[#666666] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. 예산/기간 가이드 ===== */}
      <section className="py-20 md:py-24 bg-[#0d0d0d]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Budget</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">예산과 기간</h2>
            <p className="text-[#666666] text-sm mt-3">구체 금액은 상담 후 개별 견적으로 안내드립니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {BUDGET.map((item) => (
              <div key={item.label} className="p-6 rounded-xl bg-[#111111] border border-white/5">
                <h3 className="text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-3">{item.label}</h3>
                <p className="text-[#cccccc] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. 주의사항/제외 범위 ===== */}
      <section className="py-20 md:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">Notes</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">미리 알아두실 점</h2>
          </div>
          <ul className="space-y-3">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3 p-4 rounded-lg bg-[#111111] border border-white/5">
                <AlertTriangle className="flex-shrink-0 text-amber-300 mt-0.5" size={18} strokeWidth={2} aria-hidden="true" />
                <p className="text-[#aaaaaa] text-sm leading-relaxed">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 9. FAQ ===== */}
      <section className="py-20 md:py-24 bg-[#0d0d0d]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-5 rounded-xl bg-[#111111] border border-white/5">
                <summary className="cursor-pointer text-white font-semibold text-sm md:text-base list-none flex justify-between items-center gap-4">
                  <span>{item.q}</span>
                  <span className="text-[#666666] group-open:rotate-45 transition-transform duration-200" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 text-[#aaaaaa] text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. CTA ===== */}
      <section className="py-24 border-t border-white/5">
        <div className="container text-center">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white mb-3">
            먼저 이야기부터 나눠볼까요?
          </h2>
          <p className="text-[#666666] mb-8">
            기능 범위와 일정을 함께 정리해드립니다. 견적은 그 다음입니다.
          </p>
          <a
            href={KMONG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold transition-colors duration-150"
          >
            크몽에서 상담 신청
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
