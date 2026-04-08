# Pixelmark 포트폴리오 사이트 프로젝트

> **⚠️ 데모 작업 전 필수 — 안전성 + 언어 정책 컨벤션**
>
> 모든 데모는 가상 브랜드/이미지/저작권 안전성 컨벤션과 **언어 정책**을 따른다.
> 신규 데모 작업이나 기존 데모 수정 시 **반드시** 아래 컨벤션 문서들의 체크리스트를 거친다.
>
> 📖 안전성 컨벤션: [`../Documents/portfolio/데모-명칭-이미지-컨벤션.md`](../Documents/portfolio/데모-명칭-이미지-컨벤션.md)
> 📖 **언어 정책**: [`../Documents/portfolio/언어-정책.md`](../Documents/portfolio/언어-정책.md) — *"디스플레이는 영문 OK, 정보는 한국어 강제"*
> 📖 data 한국어 패치 지시서 (위험군 8개): [`../Documents/portfolio/data-한국어-패치-지시서.md`](../Documents/portfolio/data-한국어-패치-지시서.md)
>
> 데모별 상세 작업(명칭 정리/이미지 교체)은 각 데모의 `Documents/기획/[카테고리]_[코드]_.../개발지시서.md` 와 `이미지.md` 참조.
>
> **언어 정책 요약**:
> - 가상 브랜드/커플명, 디스플레이 헤드라인, 짧은 라벨(RSVP/MENU 등) → 영문 OK
> - 본문 단락, 인사말, 일정/장소 안내, 메뉴 설명, 후기, 폼 라벨, 푸터 데모 명시 → **한국어 강제**
> - 데이터 필드 네이밍: 한국어 메인(`name`) + 영문 디스플레이 보조(`nameEn`). 기존 `nameKr` 패턴은 거꾸로이므로 패치 시 뒤집기.

> **📌 PREMIUM 정의 (중요)**
>
> PREMIUM은 데모가 아닌 **맞춤 서비스 옵션**입니다. 데모는 STANDARD/DELUXE에만 만들고, PREMIUM은 `/services/premium` 페이지에서 개별 상담으로 안내합니다.
>
> 상세: [`../Documents/portfolio/premium-서비스-안내.md`](../Documents/portfolio/premium-서비스-안내.md)



## 프로젝트 개요

**Pixelmark**(퍼블리셔 + 풀스택 개발자 2인 팀)의 기술력을 증명하는 포트폴리오 웹사이트.
퍼블리싱부터 풀스택까지 다양한 프로젝트 사례를 보여주고, 크몽 프로필로 문의를 연결한다.

## 기술스택

- **프레임워크**: React Router 7 (SSR/SEO 지원)
- **언어**: TypeScript
- **CSS**: Tailwind CSS v4 (사이트 자체) + SCSS (개별 데모)
- **애니메이션**: Framer Motion (메인 사이트 페이지 전환) + GSAP + ScrollTrigger (스크롤 애니메이션)
- **데모 외부 라이브러리**: Swiper, Lenis, GLightbox (npm 설치, 라우트 코드 스플리팅으로 자동 분리)
- **SCSS 컴파일**: Vite 내장 (sass devDependency)
- **패키지 매니저**: pnpm
- **배포**: AWS Amplify (SSR 지원, Node.js 서버 환경)

## 모든 소스에는 왜 이렇게 구현했는지 근거가 담긴 상세한 주석을 달아야 한다.

---

## 기획/설계 문서 (반드시 참조)

모든 개발 작업은 아래 문서를 기반으로 진행한다. 문서와 다른 구현이 필요한 경우 사유를 명시한다.

### 메인 포트폴리오 사이트

| 문서 | 경로 | 내용 |
|------|------|------|
| 개발지시서 | `../Documents/portfolio/개발지시서.md` | Why, What, Done 기준, 제약사항, 우선순위, Phase 분리 |
| 아키텍처 | `../Documents/portfolio/아키텍처.md` | 프로젝트 구조, 라우팅, 데이터 구조, SEO/성능 전략 |
| 기능기획 | `../Documents/portfolio/기능기획.md` | 페이지별 섹션 구성, 와이어프레임, 인터랙션 명세 |
| 디자인가이드 | `../Documents/portfolio/디자인가이드.md` | 컬러, 타이포, 간격, 컴포넌트 스타일, 애니메이션 원칙 |

### 개별 데모 프로젝트 (포트폴리오에 포함될 4개 퍼블리싱 샘플)

각 프로젝트는 **기획서 + 개발지시서** 한 쌍을 가진다. **두 문서를 모두 읽고** 작업한다.

| 데모 | 슬러그 | 컨셉 | 기획서 | 개발지시서 |
|------|--------|------|--------|------------|
| S-1 화장품 브랜드 랜딩 | `beauty-landing` | **고급스러운 절제** | `../Documents/기획/S-1_브랜드_화장품/기획서.md` | `../Documents/기획/S-1_브랜드_화장품/개발지시서.md` |
| S-2 법률사무소/병원 | `law-office` | **신뢰감, 정보 중심** | `../Documents/기획/S-2_법률사무소_병원/기획서.md` | `../Documents/기획/S-2_법률사무소_병원/개발지시서.md` |
| S-3 카페/레스토랑 | `cafe-restaurant` | **따뜻하고 아늑함** | `../Documents/기획/S-3_카페_레스토랑/기획서.md` | `../Documents/기획/S-3_카페_레스토랑/개발지시서.md` |
| S-4 개인 포트폴리오/이력서 | `personal-portfolio` | **절제, 타이포 중심** | `../Documents/기획/S-4_포트폴리오_이력서/기획서.md` | `../Documents/기획/S-4_포트폴리오_이력서/개발지시서.md` |

---

## 카테고리 / 등급 매트릭스

데모는 두 차원으로 분류한다. **둘은 직교**한다 — 같은 카테고리에 여러 등급이 존재할 수 있다.

### 카테고리 (category) — 5종, 고객 시점 분류

`/projects` 페이지의 필터 메인 축. 고객이 자기 사업 분야 사례를 빠르게 찾도록 한다.

| 슬러그 | 한글 라벨 | 톤 | 예시 업종 |
|--------|----------|----|---------|
| `brand` | 브랜드 / 제품 | 핑크 | 화장품, 패션, 식품, 가구 |
| `professional` | 전문 서비스 | 블루 | 법률, 의료, 세무, 노무, 컨설팅 |
| `fnb` | 매장 / F&B | 오렌지 | 카페, 레스토랑, 베이커리, 펍 |
| `event` | 이벤트 / 캠페인 | 인디고 | 청첩장, 행사, 팝업 스토어, 컨퍼런스 |
| `personal` | 개인 / 크리에이터 | 그린 | 포트폴리오, 이력서, 디자이너, 강사 |

### 등급 (tier) — 3종, 작업 깊이 분류

카드 **우상단 작은 뱃지**로만 노출. 가격 시그널 역할.

| 슬러그 | 라벨 | 의미 | 백엔드 |
|--------|------|------|--------|
| `standard` | STANDARD | 퍼블리싱 (정적 마크업 + CSS + 기본 인터랙션) | 없음 |
| `deluxe` | DELUXE | 프론트엔드 (동적 상호작용, 폼, 상태 관리, 라이브러리) | 없음 또는 Mock |
| `premium` | PREMIUM | 풀스택 (백엔드 / DB / 인증 / 결제 / 어드민) | **필요** |

### 매트릭스 현황 (2026-04 기준)

5 카테고리 × 3 등급 = 15칸 중 **4칸 채워짐** (모두 STANDARD).

| 카테고리 \ 등급 | STANDARD | DELUXE | PREMIUM |
|---------------|---------|--------|---------|
| **brand** (브랜드 / 제품) | ✅ S-1 화장품 | ⬜ | ⬜ |
| **professional** (전문 서비스) | ✅ S-2 법률사무소 | ⬜ | ⬜ |
| **fnb** (매장 / F&B) | ✅ S-3 카페 | ⬜ | ⬜ |
| **event** (이벤트 / 캠페인) | ⬜ | ⬜ | ⬜ |
| **personal** (개인 / 크리에이터) | ✅ S-4 포트폴리오 | ⬜ | ⬜ |

향후 카테고리당 여러 데모를 추가하면서 매트릭스를 채워나간다. 어떤 칸을 우선 채울지는 별도 세션에서 결정.

### 백엔드 전략 (PREMIUM 등급용)

PREMIUM 데모는 백엔드가 필요하다 (회원, DB, 결제, 어드민 등).
**구체 인프라(Supabase / 자체 서버 / Firebase 등) 결정은 PREMIUM 데모 작업 시점에 한다.** 현재는 `Project.backend` 인터페이스만 정의되어 있고 데이터는 비어있음.

검토 옵션 (참고):
- Supabase: PostgreSQL 기반 BaaS, 무료 티어 넉넉, 운영 부담 0
- Firebase: NoSQL 기반 BaaS, 더 빠른 셋업
- AWS Amplify Backend: 메인 사이트 배포와 동일 생태계
- 자체 서버 (Hono/Fastify + Postgres): 완전 통제, 운영 부담

이 결정은 첫 PREMIUM 데모를 만들 때 진행한다.

### 데이터 구조 (`Project` 인터페이스)

```ts
interface Project {
  slug: string
  title: string
  category: ProjectCategory  // 'brand' | 'professional' | 'fnb' | 'event' | 'personal'
  tier: ProjectTier          // 'standard' | 'deluxe' | 'premium'
  techStack: string[]
  // ...
  backend?: ProjectBackend   // PREMIUM 전용 옵션 필드
}
```

`app/types/types.ts` 가 단일 진실의 원천이다. 카테고리/등급/백엔드 구조 변경 시 항상 이 파일을 먼저 수정.

---

## 데모 통합 구조

4개 데모는 메인 portfolio 프로젝트에 **React Router 라우트**로 통합된다.
각 데모는 자체 라우트(`/demos/[slug]`)를 가지며, 메인 사이트와 격리된 SCSS/JS를 가진다.

### 폴더 구조

```
portfolio/
├── app/
│   ├── root.tsx                              # 최소 골격 (<html><body>{children}</body></html>)
│   ├── routes.ts                             # layout() 헬퍼로 _main / _demo 분리
│   │
│   ├── routes/
│   │   ├── _main.tsx                         # 메인 사이트 레이아웃 (Header/Footer/Tailwind/JsonLd/PageTransition)
│   │   ├── home.tsx                          # /
│   │   ├── about.tsx                         # /about
│   │   ├── contact.tsx                       # /contact
│   │   ├── projects._index.tsx               # /projects
│   │   ├── projects.$slug.tsx                # /projects/:slug (데모 진입점)
│   │   │
│   │   ├── _demo.tsx                         # 데모 레이아웃 (DemoHeaderBar + DemoFloatingHome만)
│   │   └── demos/
│   │       ├── beauty-landing.tsx            # /demos/beauty-landing
│   │       ├── cafe-restaurant.tsx           # /demos/cafe-restaurant
│   │       ├── personal-portfolio.tsx        # /demos/personal-portfolio
│   │       ├── _law-office.tsx               # /demos/law-office 부모 layout (SCSS 한 번 import)
│   │       ├── law-office._index.tsx         # /demos/law-office
│   │       ├── law-office.about.tsx          # /demos/law-office/about
│   │       ├── law-office.services.tsx       # /demos/law-office/services
│   │       ├── law-office.reviews.tsx        # /demos/law-office/reviews
│   │       └── law-office.contact.tsx        # /demos/law-office/contact
│   │
│   ├── components/
│   │   ├── layout/                           # 메인 사이트 chrome (Header, Footer, PageTransition 등)
│   │   └── demo/
│   │       ├── DemoHeaderBar.tsx             # 데모 상단 복귀 bar
│   │       └── DemoFloatingHome.tsx          # 데모 우측 하단 플로팅 복귀 버튼
│   │
│   └── demos/                                # 데모별 SCSS / 모듈 / assets (라우트 격리)
│       ├── beauty-landing/
│       │   ├── main.scss                     # 라우트에서 import (RR7이 자동 route-scoped)
│       │   ├── _variables.scss
│       │   ├── _reset.scss                   # 자체 reset (Tailwind preflight 의존 X)
│       │   ├── _base.scss
│       │   ├── sections/
│       │   ├── modules/                      # vanilla 스타일 ts 모듈, useEffect에서 호출
│       │   │   ├── lenisScroll.ts
│       │   │   ├── splitTextReveal.ts        # 직접 구현 (GSAP SplitText 유료 회피)
│       │   │   ├── magnetic.ts
│       │   │   └── ...
│       │   └── assets/
│       │       └── images/
│       ├── law-office/
│       ├── cafe-restaurant/
│       └── personal-portfolio/
```

### routes.ts 패턴

```ts
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  // 메인 사이트 라우트 (Header/Footer/Tailwind 적용)
  layout("routes/_main.tsx", [
    index("routes/home.tsx"),
    route("projects", "routes/projects._index.tsx"),
    route("projects/:slug", "routes/projects.$slug.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),

  // 데모 라우트 (메인 chrome 없음, DemoHeaderBar + DemoFloatingHome만)
  layout("routes/_demo.tsx", [
    route("demos/beauty-landing", "routes/demos/beauty-landing.tsx"),
    route("demos/cafe-restaurant", "routes/demos/cafe-restaurant.tsx"),
    route("demos/personal-portfolio", "routes/demos/personal-portfolio.tsx"),

    // S-2 멀티페이지: 부모 layout이 SCSS 한 번 import → 5개 sub-route 공유
    layout("routes/demos/_law-office.tsx", [
      route("demos/law-office", "routes/demos/law-office._index.tsx"),
      route("demos/law-office/about", "routes/demos/law-office.about.tsx"),
      route("demos/law-office/services", "routes/demos/law-office.services.tsx"),
      route("demos/law-office/reviews", "routes/demos/law-office.reviews.tsx"),
      route("demos/law-office/contact", "routes/demos/law-office.contact.tsx"),
    ]),
  ]),

  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig
```

---

## root.tsx 리팩토링 가이드 (필수)

현재 `root.tsx`에는 Header/Footer/Tailwind/PageTransition/JsonLd/body className이 모두 박혀있다.
**데모 라우트와 격리하려면 이것들을 모두 `_main.tsx`로 옮겨야 한다.**

### root.tsx (변경 후)

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

// ErrorBoundary는 유지
```

핵심:
- `import "./app.css"` 제거 (Tailwind는 `_main.tsx`에서 import)
- `<Header />`, `<Footer />`, `<PageTransition>`, `<JsonLd />` 제거
- `<body>` 의 className 제거 (데모 라우트의 body 색상은 데모 SCSS의 `body` 셀렉터가 결정)
- Pretendard 폰트 preload는 메인 사이트 + 데모 모두 사용하므로 root.tsx에 유지 가능. 다만 데모마다 다른 폰트는 각 데모 라우트의 `links()`에서 추가 로드.

### `_main.tsx` (신규)

```tsx
// app/routes/_main.tsx
import { Outlet, useLocation } from "react-router"
import "../app.css"  // Tailwind v4 (해당 라우트 활성 시에만 로드)
import Header from "~/components/layout/Header"
import Footer from "~/components/layout/Footer"
import PageTransition from "~/components/layout/PageTransition"
import JsonLd from "~/components/common/JsonLd"
import { organizationJsonLd, websiteJsonLd } from "~/utils/seo"

export default function MainLayout() {
  const location = useLocation()
  return (
    <div className="bg-[#0a0a0a] text-white antialiased min-h-screen">
      <Header />
      <main className="min-h-screen">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
    </div>
  )
}
```

핵심:
- 메인 사이트 다크 테마는 wrapper `<div>`에 적용 (body className 못 쓰는 대신)
- Tailwind, Header, Footer, JsonLd 모두 여기로 이동
- 데모 라우트는 이 layout을 안 거치므로 메인 사이트 chrome이 안 들어감

### `_demo.tsx` (신규)

```tsx
// app/routes/_demo.tsx
import { Outlet, useMatches } from "react-router"
import DemoHeaderBar from "~/components/demo/DemoHeaderBar"
import DemoFloatingHome from "~/components/demo/DemoFloatingHome"

export default function DemoLayout() {
  const matches = useMatches()
  // 자식 라우트에서 export const handle = { demoName: "..." } 를 읽음
  const demoName = matches.findLast(m => (m.handle as any)?.demoName)?.handle as { demoName?: string } | undefined

  return (
    <>
      <DemoHeaderBar currentDemoName={demoName?.demoName ?? "Demo"} />
      <Outlet />
      <DemoFloatingHome />
    </>
  )
}
```

각 데모 라우트는 `handle`을 export해서 자기 데모명을 알린다:

```tsx
// app/routes/demos/beauty-landing.tsx
import "~/demos/beauty-landing/main.scss"
import { useEffect } from "react"

export const handle = { demoName: "S-1 Beauty Landing" }

export const meta = () => [
  { title: "S-1 Beauty Landing — Pixelmark Portfolio Demo" },
  { name: "description", content: "고급스러운 화장품 브랜드 랜딩 페이지 데모. Pixelmark의 퍼블리싱 역량을 보여주는 샘플." },
]

export default function BeautyLanding() {
  useEffect(() => {
    // vanilla 모듈 초기화 (Lenis, SplitText, magnetic 등)
    // cleanup 필수
  }, [])

  return (
    <main className="hero">
      {/* 마크업 */}
    </main>
  )
}
```

---

## CSS 격리 원리

React Router 7 + Vite는 **라우트 모듈이 import한 CSS를 자동으로 route-scoped로 처리**한다:

- 라우트 활성 시 → CSS `<link>` 태그가 head에 추가
- 라우트 비활성 시 → 자동으로 제거
- 별도 `?url` import 같은 수동 처리 불필요

→ 데모 SCSS는 그냥 `import "~/demos/beauty-landing/main.scss"` 만 하면 됨.
→ 데모 SCSS의 `:root`, `body`, `*` 같은 전역 셀렉터는 그 라우트에서만 적용됨.

### 한 가지 주의

라우트 전환 사이에 짧은 frame(보통 16~50ms) 양쪽 CSS가 동시에 head에 존재할 수 있다.
실무에선 거의 무시 가능하지만, **각 데모 SCSS에 자체 reset.scss를 포함**해 안전성을 높인다.

---

## 데모 컴포넌트 명세 (필수 구현)

### `<DemoHeaderBar>` (`app/components/demo/DemoHeaderBar.tsx`)

- **위치**: 상단 fixed, 높이 40~44px
- **좌측**: `←` 아이콘 + `Pixelmark Portfolio` (메인 `/`로 링크) + 구분점(`·`) + 현재 데모명
- **우측**: (선택) 다음 데모로 이동 화살표 또는 데모 카운터
- **배경**: 반투명 + `backdrop-filter: blur(12px)`
- **색상**: CSS 변수 (`--demo-bar-bg`, `--demo-bar-text`, `--demo-bar-border`) — 각 데모 SCSS가 정의
- **z-index**: 100 (데모 컨텐츠 위, 모달 아래)
- **모바일**: 동일하게 fixed top, 좌측 텍스트 축약 가능

### `<DemoFloatingHome>` (`app/components/demo/DemoFloatingHome.tsx`)

- **위치**: 우측 하단 fixed (PC: bottom 24px, right 24px / 모바일: bottom 16px, right 16px)
- **형태**: 동그란 버튼 (PC 직경 56px, 모바일 48px), `home` 또는 `←` 아이콘
- **클릭**: 메인 portfolio (`/`)로 이동
- **idle 애니메이션**: scale 0.95 ↔ 1.0, 3s loop, ease-in-out (호흡)
- **hover**: scale 1.1, 0.2s
- **색상**: CSS 변수 (`--demo-fab-bg`, `--demo-fab-icon`) — 각 데모 SCSS가 정의
- **`prefers-reduced-motion`**: 호흡 애니메이션 비활성

### 두 컴포넌트 공통

- `_demo.tsx` 레이아웃에서 자동으로 모든 데모 라우트에 렌더됨
- 색상을 CSS 변수로 분리해두면, 각 데모의 SCSS가 자기 컨셉 색상에 맞춰 override 가능 (S-1은 웜화이트 톤, S-3는 크림 톤 등)

---

## 데모별 인터랙션 강도 가이드 (반드시 준수)

각 데모는 컨셉이 다르므로 **인터랙션 강도와 종류가 다르다**. "트렌디 = 화려함"이 아니다.

### 데모 카테고리/등급 매핑

| 데모 | 카테고리 | 등급 |
|------|---------|------|
| S-1 화장품 (`beauty-landing`) | `brand` (브랜드 / 제품) | `standard` |
| S-2 법률사무소 (`law-office`) | `professional` (전문 서비스) | `standard` |
| S-3 카페 (`cafe-restaurant`) | `fnb` (매장 / F&B) | `standard` |
| S-4 개인 포트폴리오 (`personal-portfolio`) | `personal` (개인 / 크리에이터) | `standard` |

### S-1 화장품 — "고급스러운 절제"
- **허용**: Lenis 모멘텀 스크롤, SplitText 글자 단위 reveal(직접 구현), 마그네틱 CTA(8px 이하), 히어로 마우스 spotlight
- **금지**: WebGL 디스토션, 3D 카드 틸트, 마퀴, 커스텀 커서
- **외부 라이브러리**: Swiper, GSAP(ScrollTrigger 포함), Lenis (npm)

### S-2 법률사무소 — "신뢰감, 정보 중심" (절제 강도 최고)
- **허용**: 상단 스크롤 진행 라인, 페이지 전환 페이드(0.3s), 카드 hover 좌측 보더 슬라이드, 카운트업
- **금지**: 커스텀 커서, 마그네틱, 패럴랙스, WebGL, Lenis 등 모든 화려한 효과
- **외부 라이브러리**: 없음 (카카오맵 iframe만 예외)

### S-3 카페 — "따뜻하고 아늑함"
- **허용**: 3D 카드 틸트(5도 이내, 직접 구현), Lenis, 갤러리 clip-path reveal, 메뉴 탭 underline 슬라이드
- **금지**: WebGL 디스토션, 마퀴 등 차갑거나 모던한 효과
- **외부 라이브러리**: Swiper, GLightbox, Lenis (npm)

### S-4 개인 포트폴리오 — "절제, 타이포 중심"
- **허용**: 커스텀 커서, 단어 단위 mask reveal(직접 구현), 링크 mask 슬라이드, 다크모드 토글, 작업물 hover 미리보기
- **금지**: 패럴랙스, WebGL, 카드 틸트
- **외부 라이브러리**: **0개** (모든 효과 직접 구현, JS 모듈 총 15KB 이하 목표)

### 공통 원칙
- 마우스 기반 인터랙션은 모두 `@media (hover: hover)` 가드로 모바일 비활성화
- `prefers-reduced-motion` 대응 (애니메이션/패럴랙스 비활성)
- 인터랙션 추가는 **컨셉 가이드 안에서만** 진행

---

## 데모 라우트 작성 규칙

### vanilla 스타일 모듈 사용

데모는 React 컴포넌트지만 인터랙션은 vanilla JS 스타일로 작성한다 (퍼블리싱 역량 증명 의도 유지).
모듈은 `app/demos/[name]/modules/*.ts` 에 두고, 라우트의 `useEffect`에서 호출.

```tsx
import { useEffect, useRef } from "react"
import { initLenis } from "~/demos/beauty-landing/modules/lenisScroll"
import { initSplitText } from "~/demos/beauty-landing/modules/splitTextReveal"

export default function BeautyLanding() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const lenis = initLenis()
    const splitCleanup = initSplitText(heroRef.current)
    return () => {
      lenis.destroy()
      splitCleanup()
    }
  }, [])

  return <main ref={heroRef}>...</main>
}
```

### Cleanup 책임 (절대 빠뜨리지 말 것)

- **GSAP ScrollTrigger**: `ScrollTrigger.getAll().forEach(t => t.kill())` 또는 `useGSAP` 훅 사용
- **Lenis**: `lenis.destroy()`
- **이벤트 리스너**: `removeEventListener`
- **인터벌/타임아웃**: `clearInterval`, `clearTimeout`
- **커스텀 커서**: 추가한 DOM 요소 `remove()`

cleanup 빠뜨리면 → 라우트 이동 후 메모리 누수, 다른 라우트에서 ghost 트리거 발동.

### 하이드레이션 안정성

vanilla 모듈은 React가 그린 DOM 구조 자체를 변경하면 안 됨.
- ✅ 허용: 이벤트 리스너 추가, ref로 접근, style/class 변경, 새 요소 추가
- ❌ 금지: 기존 요소 제거, 자식 순서 변경, React가 관리하는 텍스트 노드 직접 수정

---

## SEO 인덱싱 정책

- **데모 라우트는 검색 엔진에 노출**한다 (포트폴리오 발견 채널 확장 목적)
- 각 데모 라우트의 `meta()` export로 title/description 정의
- `routes/sitemap[.]xml.tsx` 의 loader에서 데모 라우트 4개(+S-2 sub-route 5개) 추가
- robots.txt는 기본 설정 (전체 허용)

---

## `/projects/:slug` 데모 진입 방식

데모 진입은 **두 가지 경로 모두 제공**한다:

1. **같은 탭에서 데모 보기** → `<Link to="/demos/beauty-landing">`
2. **새 탭에서 열기** → `<a href="/demos/beauty-landing" target="_blank" rel="noopener">`

`/projects/:slug` 설명 페이지에 두 버튼을 함께 배치한다. 사용자가 컨텍스트(맥락 유지 vs 비교 보기)를 선택할 수 있게.

---

## 외부 라이브러리 (npm 설치)

```bash
pnpm add swiper lenis glightbox
# gsap, @gsap/react, framer-motion 은 이미 설치됨
# sass 는 이미 devDependency
```

각 데모 라우트에서 `import Swiper from "swiper"` 등으로 직접 import.
React Router 7의 라우트별 코드 스플리팅으로 **해당 데모 chunk에만 포함**됨 → 메인 사이트 번들 영향 없음.

S-4는 외부 라이브러리 0개 제약이라 어떤 import도 하지 않음.

---

## 정리 작업

- `app/welcome/` 폴더 삭제 (사용하지 않는 기본 템플릿 잔여물)

---

## 개발 규칙

### 코드 컨벤션
- 함수는 화살표 함수 사용
- 타입 정의는 `app/types/types.ts`에서 정의, 주석 상세하게
- 컴포넌트 파일명: PascalCase (예: `ProjectCard.tsx`, `DemoHeaderBar.tsx`)
- 유틸/훅 파일명: camelCase (예: `useScrollAnimation.ts`)
- 데모 vanilla 모듈: camelCase + ts (예: `lenisScroll.ts`, `splitTextReveal.ts`)

### CSS 규칙
- 메인 사이트(`_main` layout): Tailwind CSS만, SCSS 금지
- 데모(`_demo` layout 하위): SCSS 사용, CSS 변수(`var()`) 활용 (scss 변수 사용 금지)
- 데모 SCSS는 자체 reset 포함 (Tailwind preflight에 의존하지 않음)
- 반응형 breakpoint: 767px (모바일) / 768px~1199px (태블릿) / 1200px+ (PC)

### 데모 작업 시 추가 규칙
- 데모 라우트에서는 메인 사이트 컴포넌트(Header, Footer 등) import 금지
- 데모 SCSS/모듈은 `app/demos/[name]/` 안에서만 import (다른 데모 폴더 참조 금지)
- vanilla 모듈은 useEffect 안에서만 호출, cleanup 필수

### 커밋 규칙
- git commit convention 에 따라 한글로 작성
- claude code 정보 제외

---

## 개발 Phase

### Phase 1: 메인 사이트 기본 구조
프로젝트 초기화 → 레이아웃 → 메인 페이지 → 프로젝트 목록/상세 → 반응형 → SEO

### Phase 2: 인터랙션
페이지 전환 → 스크롤 애니메이션 → 모바일 메뉴 → 필터 애니메이션

### Phase 3: 데모 통합 사전 작업
- root.tsx 리팩토링 (Header/Footer/Tailwind/PageTransition/JsonLd/body className 모두 `_main.tsx`로 이동)
- routes.ts 를 layout 헬퍼 패턴으로 재구성
- `_demo.tsx` 레이아웃 + `DemoHeaderBar` + `DemoFloatingHome` 컴포넌트 작성
- `app/welcome/` 폴더 삭제
- swiper, lenis, glightbox npm 설치

### Phase 4: 데모 4종 통합
S-1 → S-3 → S-2 → S-4 순으로 `app/demos/` 와 `app/routes/demos/` 에 작성, sitemap 갱신

### Phase 5: 완성도
팀 소개 상세 → JSON-LD 정비 → sitemap → 404 → 성능 최적화 → AWS Amplify 배포
