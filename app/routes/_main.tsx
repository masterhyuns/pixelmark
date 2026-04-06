import { Outlet, useLocation } from "react-router"
import "../app.css"
import Header from "~/components/layout/Header"
import Footer from "~/components/layout/Footer"
import PageTransition from "~/components/layout/PageTransition"
import JsonLd from "~/components/common/JsonLd"
import { organizationJsonLd, websiteJsonLd } from "~/utils/seo"

/**
 * 메인 사이트 공통 레이아웃
 *
 * [왜 별도 레이아웃 라우트로 분리했는가]
 * - 데모 라우트(/demos/*)는 Tailwind와 메인 사이트 chrome이 필요 없다.
 * - root.tsx에 모든 것이 박혀있으면 데모 라우트에서도 Header/Footer/Tailwind가 렌더된다.
 * - React Router 7의 layout() 헬퍼를 이용해 메인 사이트 전용 레이아웃으로 분리하면,
 *   해당 레이아웃 하위 라우트(/, /projects, /about, /contact)만 Tailwind + chrome 적용.
 *   데모 라우트는 _demo.tsx 레이아웃에서 완전히 다른 chrome으로 렌더된다.
 * - Vite가 이 파일이 import한 app.css를 route-scoped 자산으로 처리 → 메인 사이트 활성 시에만
 *   head에 <link> 추가되고, 데모 라우트로 이동 시 자동 제거.
 *
 * [wrapper div에 다크 테마 적용 이유]
 * - 원래는 <body className="bg-[#0a0a0a]...">로 처리했는데,
 *   이제 root.tsx의 <body>는 깨끗해야 데모 라우트에서 데모 자체의 body 색상이 적용된다.
 * - 대안으로 이 wrapper div에 다크 테마 클래스를 주어 메인 사이트 시각적 톤 유지.
 */
export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="bg-[#0a0a0a] text-white antialiased min-h-screen">
      <Header />
      {/*
        PageTransition은 key={pathname}으로 리마운트 방식을 쓴다.
        (useLayoutEffect + gsap.set으로 paint 전 opacity:0 보장 → flash 방지)
      */}
      <main className="min-h-screen">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />

      {/*
        사이트 전체 JSON-LD.
        Organization: Pixelmark 조직 정보 (검색 결과에 회사 카드)
        WebSite: 사이트 기본 메타 (검색 결과에 사이트 검색박스 등)
        → 메인 사이트 레이아웃에만 두어 데모 라우트와 중복 주입 방지.
      */}
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
    </div>
  )
}
