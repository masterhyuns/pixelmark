import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

/**
 * 라우트 구성
 *
 * [왜 layout() 헬퍼로 분리했는가]
 * - 메인 사이트는 Tailwind/Header/Footer/JsonLd/PageTransition 등 공통 chrome이 필요.
 * - 데모 라우트는 위 chrome이 모두 필요 없고, DemoHeaderBar + DemoFloatingHome만 있으면 됨.
 * - layout() 헬퍼를 쓰면 각 layout 라우트가 import한 CSS/컴포넌트는 해당 서브트리에만 적용됨.
 *   → root.tsx에서 Tailwind를 import하면 데모 라우트에도 영향. 그래서 _main.tsx로 옮겼음.
 *
 * [데모 트리 구조]
 * - S-1/S-3/S-4는 단일 라우트 (각자 원페이지).
 * - S-2 law-office만 5개 sub-route + 부모 layout(_law-office.tsx)으로 멀티페이지.
 *   부모 layout이 SCSS를 한 번 import하면 5개 sub-route가 공유 → 중복 로드 방지.
 *
 * [순서 주의]
 * - sitemap.xml과 catch-all(*)은 layout 밖 최상위에 등록.
 * - catch-all이 먼저 매칭되면 안 되므로 반드시 맨 마지막.
 */
export default [
  // ============================================================
  // 메인 사이트 (Tailwind + Header/Footer + JsonLd + PageTransition)
  // ============================================================
  layout("routes/_main.tsx", [
    index("routes/home.tsx"),
    route("projects", "routes/projects._index.tsx"),
    route("projects/:slug", "routes/projects.$slug.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("services/premium", "routes/services.premium.tsx"),
  ]),

  // ============================================================
  // 데모 라우트 (메인 chrome 없음, DemoHeaderBar + DemoFloatingHome만)
  // ============================================================
  layout("routes/_demo.tsx", [
    // S-1 화장품 브랜드 랜딩 (단일 라우트, 원페이지)
    route("demos/beauty-landing", "routes/demos/beauty-landing.tsx"),

    // S-3 카페/레스토랑 (단일 라우트, 원페이지)
    route("demos/cafe-restaurant", "routes/demos/cafe-restaurant.tsx"),

    // S-4 개인 포트폴리오 (단일 라우트, 원페이지, 외부 라이브러리 0개)
    route("demos/personal-portfolio", "routes/demos/personal-portfolio.tsx"),

    // E-S1 미니멀 화이트 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-minimal", "routes/demos/wedding-minimal.tsx"),

    // E-S2 돌잔치/백일 초대장 (단일 라우트, 원페이지)
    route("demos/baby-celebration", "routes/demos/baby-celebration.tsx"),

    // E-S3 팝업스토어 / 마케팅 캠페인 (단일 라우트, 원페이지)
    route("demos/popup-vivid", "routes/demos/popup-vivid.tsx"),

    // E-S7 보헤미안 자연주의 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-bohemian", "routes/demos/wedding-bohemian.tsx"),

    // E-S5 개인 파티 (단일 라우트, 원페이지)
    route("demos/party-gradient", "routes/demos/party-gradient.tsx"),

    // E-S8 모던 컬러풀 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-vivid", "routes/demos/wedding-vivid.tsx"),

    // E-S9 동창회 (단일 라우트, 원페이지)
    route("demos/reunion-retro", "routes/demos/reunion-retro.tsx"),

    // E-S10 오픈하우스 (단일 라우트, 원페이지)
    route("demos/openhouse-arch", "routes/demos/openhouse-arch.tsx"),

    // E-S11 영화 포스터 시네마틱 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-cinematic", "routes/demos/wedding-cinematic.tsx"),

    // E-S12 잡지 커버 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-magazine", "routes/demos/wedding-magazine.tsx"),

    // E-S13 한지 전통 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-hanji", "routes/demos/wedding-hanji.tsx"),

    // E-S14 LP 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-vinyl", "routes/demos/wedding-vinyl.tsx"),

    // E-S15 게임 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-pixel", "routes/demos/wedding-pixel.tsx"),

    // E-S16 신문 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-newsprint", "routes/demos/wedding-newsprint.tsx"),

    // E-S17 우편 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-postal", "routes/demos/wedding-postal.tsx"),

    // E-S18 동화책 청첩장 (단일 라우트, 원페이지)
    route("demos/wedding-storybook", "routes/demos/wedding-storybook.tsx"),

    // B-S1 패션 룩북 (단일 라우트, 원페이지)
    route("demos/fashion-lookbook", "routes/demos/fashion-lookbook.tsx"),

    // B-S2 식품 매거진 Verde Provisions (멀티페이지: 부모 layout + 3 sub-route)
    layout("routes/demos/_food-magazine.tsx", [
      route("demos/food-magazine", "routes/demos/food-magazine._index.tsx"),
      route("demos/food-magazine/products", "routes/demos/food-magazine.products.tsx"),
      route("demos/food-magazine/story", "routes/demos/food-magazine.story.tsx"),
    ]),

    // B-S3 가구/리빙 Maison Brisé (단일 라우트, 원페이지)
    route("demos/living-modern", "routes/demos/living-modern.tsx"),

    // F-S1 베이커리 Maison Crème (단일 라우트, 원페이지)
    route("demos/bakery-pastel", "routes/demos/bakery-pastel.tsx"),

    // F-S2 와인바 Verres Noirs (멀티페이지: 부모 layout + 3 sub-route)
    layout("routes/demos/_winebar-darklux.tsx", [
      route("demos/winebar-darklux", "routes/demos/winebar-darklux._index.tsx"),
      route("demos/winebar-darklux/menu", "routes/demos/winebar-darklux.menu.tsx"),
      route("demos/winebar-darklux/reservation", "routes/demos/winebar-darklux.reservation.tsx"),
    ]),

    // F-S3 파인다이닝 Restaurant Solène (단일 라우트, 원페이지)
    route("demos/finedining-mono", "routes/demos/finedining-mono.tsx"),

    // PE-S1 사진작가 Aria Voss (단일 라우트, 원페이지)
    route("demos/photographer-mono", "routes/demos/photographer-mono.tsx"),

    // PE-S2 일러스트레이터 Yara Lume (단일 라우트, 원페이지)
    route("demos/illustrator-vivid", "routes/demos/illustrator-vivid.tsx"),

    // PE-S3 강사/코치 Aevi Studio (멀티페이지: 부모 layout + 3 sub-route)
    layout("routes/demos/_coach-warm.tsx", [
      route("demos/coach-warm", "routes/demos/coach-warm._index.tsx"),
      route("demos/coach-warm/programs", "routes/demos/coach-warm.programs.tsx"),
      route("demos/coach-warm/contact", "routes/demos/coach-warm.contact.tsx"),
    ]),

    // P-S1 병원/의원 Lumen Medical Clinic (멀티페이지: 부모 layout + 4 sub-route)
    layout("routes/demos/_medical-clean.tsx", [
      route("demos/medical-clean", "routes/demos/medical-clean._index.tsx"),
      route("demos/medical-clean/departments", "routes/demos/medical-clean.departments.tsx"),
      route("demos/medical-clean/staff", "routes/demos/medical-clean.staff.tsx"),
      route("demos/medical-clean/reservation", "routes/demos/medical-clean.reservation.tsx"),
    ]),

    // E-S4 컨퍼런스 (멀티페이지: 부모 layout + 3 sub-route)
    layout("routes/demos/_conference-tech.tsx", [
      route("demos/conference-tech", "routes/demos/conference-tech._index.tsx"),
      route("demos/conference-tech/speakers", "routes/demos/conference-tech.speakers.tsx"),
      route("demos/conference-tech/schedule", "routes/demos/conference-tech.schedule.tsx"),
    ]),

    // E-S6 클래식 럭셔리 청첩장 (멀티페이지: 부모 layout + 4 sub-route)
    layout("routes/demos/_wedding-classic.tsx", [
      route("demos/wedding-classic", "routes/demos/wedding-classic._index.tsx"),
      route("demos/wedding-classic/story", "routes/demos/wedding-classic.story.tsx"),
      route("demos/wedding-classic/gallery", "routes/demos/wedding-classic.gallery.tsx"),
      route("demos/wedding-classic/visit", "routes/demos/wedding-classic.visit.tsx"),
    ]),

    // S-2 법률사무소 (멀티페이지: 부모 layout + 5개 sub-route)
    // 부모 layout이 SCSS와 공통 모듈(nav, scrollProgress, floatingButton)을 담당.
    layout("routes/demos/_law-office.tsx", [
      route("demos/law-office", "routes/demos/law-office._index.tsx"),
      route("demos/law-office/about", "routes/demos/law-office.about.tsx"),
      route("demos/law-office/services", "routes/demos/law-office.services.tsx"),
      route("demos/law-office/reviews", "routes/demos/law-office.reviews.tsx"),
      route("demos/law-office/contact", "routes/demos/law-office.contact.tsx"),
    ]),
  ]),

  // ============================================================
  // 리소스 라우트 & catch-all (layout 밖)
  // ============================================================
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig
