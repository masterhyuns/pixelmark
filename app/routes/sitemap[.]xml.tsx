import { projects } from "~/data/projects"
import { SITE_URL } from "~/utils/seo"

/**
 * 동적 sitemap.xml 생성 라우트
 *
 * [왜 resource route인가]
 * - 정적 public/sitemap.xml은 프로젝트가 추가될 때마다 수동 수정 필요 → 누락 위험
 * - React Router 7에서 컴포넌트 export 없이 loader만 있는 파일은 resource route
 *   → GET /sitemap.xml 요청 시 loader 응답을 그대로 반환 (XML body)
 * - projects 데이터가 바뀌면 sitemap도 자동 반영 → 유지보수 제로
 *
 * [파일명에 [.]xml인 이유]
 * - React Router의 route 파일명에서 "."은 경로 구분자(/)로 해석됨
 * - [.]로 감싸면 리터럴 "."으로 인식되어 "sitemap.xml" 경로가 됨
 */

/**
 * 정적 페이지 URL 목록 (priority, changefreq 포함)
 *
 * [왜 데모 라우트가 sitemap에 포함되는가]
 * - 데모는 Pixelmark의 기술력을 증명하는 실제 결과물이므로 검색 엔진에 노출해야 함
 * - "웹 퍼블리싱 외주", "랜딩페이지 제작" 등 검색어 유입 채널 확장
 * - S-2 law-office는 5개 sub-route 모두 개별 노출 (멀티페이지 구조의 SEO 이점 활용)
 * - priority 0.7: 메인(1.0)보다는 낮지만 일반 정보 페이지와 비슷한 우선순위
 */
const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  // 메인 사이트
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/services/premium", priority: "0.8", changefreq: "monthly" },

  // 데모 라우트 (Pixelmark의 실제 퍼블리싱 결과물)
  { path: "/demos/beauty-landing", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/cafe-restaurant", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/personal-portfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-minimal", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/baby-celebration", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/popup-vivid", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/conference-tech", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/conference-tech/speakers", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/conference-tech/schedule", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/wedding-classic", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-classic/story", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/wedding-classic/gallery", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/wedding-classic/visit", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/wedding-bohemian", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/party-gradient", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-vivid", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/reunion-retro", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/openhouse-arch", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-cinematic", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-magazine", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-hanji", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-vinyl", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-pixel", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-newsprint", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/wedding-postal", priority: "0.7", changefreq: "monthly" },

  // S-2 law-office는 멀티페이지 구조 → 5개 sub-route 모두 노출
  { path: "/demos/law-office", priority: "0.7", changefreq: "monthly" },
  { path: "/demos/law-office/about", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/law-office/services", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/law-office/reviews", priority: "0.6", changefreq: "monthly" },
  { path: "/demos/law-office/contact", priority: "0.6", changefreq: "monthly" },
]

export const loader = () => {
  // 오늘 날짜 YYYY-MM-DD 형식 (lastmod용)
  // 배포 시점 기준이므로 정확한 콘텐츠 변경일은 아니지만,
  // 검색 엔진 크롤러에게 "최근성" 신호로 충분하다
  const today = new Date().toISOString().split("T")[0]

  // 정적 페이지 + 프로젝트 상세 페이지를 모두 포함
  const urls = [
    ...STATIC_ROUTES.map(({ path, priority, changefreq }) => ({
      loc: `${SITE_URL}${path}`,
      lastmod: today,
      changefreq,
      priority,
    })),
    ...projects.map((project) => ({
      loc: `${SITE_URL}/projects/${project.slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ]

  // XML 문자열 수동 생성 (외부 라이브러리 없이 경량 유지)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // 검색 엔진 크롤러가 매번 다시 가져오지 않도록 1시간 캐시
      // (너무 길면 신규 프로젝트 노출 지연, 너무 짧으면 서버 부하)
      "Cache-Control": "public, max-age=3600",
    },
  })
}
