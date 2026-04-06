import type { MetaDescriptor } from "react-router"
import type { Project } from "~/types/types"

/**
 * SEO 유틸 모듈
 *
 * [왜 한 파일에 모으는가]
 * - 메타 태그 / JSON-LD / sitemap URL은 모두 "사이트 정체성"에 의존한다
 * - 도메인, 사이트명, 이미지 경로를 한 곳에서 관리해야 배포 시 교체가 안전하다
 * - 페이지별 meta() 함수에서 createMeta만 호출하면 일관성 자동 유지
 */

/** 배포 시 반드시 실제 값으로 교체 */
export const SITE_NAME = "Pixelmark"
export const SITE_URL = "https://kmong-dev.kr"
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`
export const KMONG_PROFILE_URL = "https://kmong.com" // 실제 크몽 프로필로 교체

interface SeoOptions {
  title: string
  description: string
  ogImage?: string
  ogType?: "website" | "article"
  noIndex?: boolean
  canonicalPath?: string
}

/**
 * 페이지별 meta 태그 생성
 *
 * [설계 의도]
 * - OG/Twitter 카드까지 한 번에 생성하여 빠뜨림 방지
 * - React Router meta() 함수에 그대로 return 가능한 MetaDescriptor[] 형태
 * - canonicalPath를 받아 canonical link도 함께 생성 → 중복 URL 방지
 */
export const createMeta = (options: SeoOptions): MetaDescriptor[] => {
  const {
    title,
    description,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    noIndex = false,
    canonicalPath,
  } = options

  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined

  const descriptors: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },

    // Open Graph
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: ogType },
    { property: "og:site_name", content: SITE_NAME },
    ...(canonicalUrl ? [{ property: "og:url" as const, content: canonicalUrl }] : []),

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // 검색 엔진
    ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),

    // canonical link는 MetaDescriptor의 tagName 형태로 넣는다
    // (React Router v7 meta()가 link 태그도 렌더 가능)
    ...(canonicalUrl
      ? [{ tagName: "link" as const, rel: "canonical", href: canonicalUrl }]
      : []),
  ]

  return descriptors
}

/** 프로젝트 상세 페이지용 메타 */
export const createProjectMeta = (project: Project): MetaDescriptor[] =>
  createMeta({
    title: project.title,
    description: project.subtitle,
    ogImage: project.thumbnail,
    ogType: "article",
    canonicalPath: `/projects/${project.slug}`,
  })

/** 페이지별 기본 메타 설정 */
export const PAGE_META = {
  home: {
    title: "웹 퍼블리싱·프론트엔드·풀스택 개발",
    description:
      "Pixelmark 포트폴리오. 화장품 랜딩부터 전문직 사이트, React 풀스택까지 다양한 구현 사례를 확인하세요.",
    canonicalPath: "/",
  },
  projects: {
    title: "프로젝트",
    description:
      "웹 퍼블리싱, 프론트엔드, 풀스택 개발 포트폴리오. 다양한 업종과 기술 스택의 실제 구현 사례를 확인하세요.",
    canonicalPath: "/projects",
  },
  about: {
    title: "팀 소개",
    description:
      "Pixelmark 팀을 소개합니다. 정확한 소통, 일관된 품질, 최신 기술로 여러분의 프로젝트를 완성합니다.",
    canonicalPath: "/about",
  },
  contact: {
    title: "문의하기",
    description:
      "프로젝트 문의는 크몽을 통해 안전하게 진행하세요. 견적부터 납품까지 체계적으로 관리합니다.",
    canonicalPath: "/contact",
  },
} as const

/* ================================================
   JSON-LD 구조화 데이터 생성 함수
   ================================================
   [왜 JSON-LD인가]
   - Google 권장 포맷: microdata/RDFa보다 HTML과 분리되어 유지보수 쉬움
   - 검색 결과에 리치 스니펫(별점, 회사정보 등) 표시 가능성 상승
   - <script type="application/ld+json">에 JSON 문자열로 주입하는 방식

   [왜 문자열 반환인가]
   - React의 <script>는 dangerouslySetInnerHTML로 주입해야 JSON 그대로 렌더됨
   - 객체를 JSON.stringify해서 반환 → 사용처에서 __html에 바로 넣음
*/

/** Organization 스키마 - 사이트 전체에 대한 조직 정보
 *  description은 검증 불가한 경력·수치 표현을 피하고 "제공 역량"만 담는다 */
export const organizationJsonLd = () => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "웹 퍼블리싱, 프론트엔드(React/TypeScript), 풀스택 개발을 제공하는 Pixelmark. 퍼블리셔 + 풀스택 개발자 2인 팀.",
  sameAs: [KMONG_PROFILE_URL],
})

/** WebSite 스키마 - 사이트 루트 정보 */
export const websiteJsonLd = () => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ko",
})

/**
 * CreativeWork 스키마 - 프로젝트 상세 페이지
 *
 * [왜 CreativeWork인가]
 * - 포트폴리오 작업물은 Google 권장 타입으로 CreativeWork가 적합
 * - Article, Product보다 "디자인/코드 결과물" 성격에 가장 부합
 */
export const projectJsonLd = (project: Project) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.title,
  headline: project.title,
  description: project.subtitle,
  image: project.thumbnail,
  url: `${SITE_URL}/projects/${project.slug}`,
  inLanguage: "ko",
  keywords: project.techStack.join(", "),
  about: project.industry,
  creator: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
})
