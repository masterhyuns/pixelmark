import type { Config } from "@react-router/dev/config"
import { projects } from "./app/data/projects"

/**
 * React Router 7 — Pre-rendering 모드 (정적 HTML 생성)
 *
 * [왜 SSR 대신 prerender인가]
 * - AWS Amplify Hosting Gen 1은 Next.js SSR만 자동 감지
 * - React Router 7 SSR은 정적 사이트로 오인되어 "No index.html" 오류 발생
 * - Amplify Gen 2의 WEB_COMPUTE 플랫폼을 쓰려면 CLI 수동 설정이 필요하고 복잡
 * - 포트폴리오는 모든 라우트가 빌드 시점에 알려진 정적 콘텐츠 → prerender가 최적
 *
 * [prerender가 해주는 것]
 * - 나열한 각 경로에 대해 빌드 타임에 HTML 생성 → build/client/ 하위에 정적 파일
 * - meta() / links() / loader() 모두 빌드 시점에 실행 → SEO 메타태그 HTML에 베이킹
 * - JSON-LD 스크립트도 HTML에 그대로 포함
 * - 리소스 라우트(sitemap.xml 등)도 loader 결과를 정적 파일로 저장
 * - 결과적으로 Amplify 정적 호스팅이 완벽하게 서빙 가능
 *
 * [ssr: false + prerender 조합]
 * - SPA 모드 + 미리 렌더된 HTML
 * - 브라우저는 처음에 prerender된 HTML 받음 → 이후 클라이언트 라우팅
 * - 검색엔진은 각 경로의 전용 HTML을 보게 되어 SEO 문제 없음
 *
 * [동적 라우트 처리]
 * - /projects/:slug는 slug가 빌드 타임에 알려져 있으므로 projects 데이터에서 생성
 * - 새 프로젝트가 추가되면 빌드가 자동으로 해당 HTML 생성
 */
export default {
  ssr: false,

  /**
   * prerender할 경로 목록을 반환하는 async 함수.
   * 함수로 제공하면 동적 데이터(projects) 기반으로 경로를 생성할 수 있다.
   */
  async prerender() {
    // 정적 경로
    const staticRoutes = [
      "/",
      "/projects",
      "/about",
      "/contact",
      "/services/premium",

      // 데모 라우트 (S-1, S-3, S-4 — 단일 라우트)
      "/demos/beauty-landing",
      "/demos/cafe-restaurant",
      "/demos/personal-portfolio",
      "/demos/wedding-minimal",
      "/demos/baby-celebration",
      "/demos/popup-vivid",
      "/demos/conference-tech",
      "/demos/conference-tech/speakers",
      "/demos/conference-tech/schedule",
      "/demos/wedding-classic",
      "/demos/wedding-classic/story",
      "/demos/wedding-classic/gallery",
      "/demos/wedding-classic/visit",
      "/demos/wedding-bohemian",
      "/demos/party-gradient",
      "/demos/wedding-vivid",
      "/demos/reunion-retro",
      "/demos/openhouse-arch",

      // S-2 법률사무소 — 멀티페이지 5개 sub-route
      "/demos/law-office",
      "/demos/law-office/about",
      "/demos/law-office/services",
      "/demos/law-office/reviews",
      "/demos/law-office/contact",

      // 리소스 라우트: loader가 XML 응답 → 정적 파일로 생성됨
      "/sitemap.xml",
    ]

    // 동적 프로젝트 상세 페이지 (/projects/{slug})
    // projects 데이터가 늘어나면 자동 반영
    const projectRoutes = projects.map((p) => `/projects/${p.slug}`)

    return [...staticRoutes, ...projectRoutes]
  },
} satisfies Config
