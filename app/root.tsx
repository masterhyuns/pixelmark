import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"

/**
 * root.tsx — 최소 골격만 유지한다.
 *
 * [왜 Header/Footer/Tailwind를 여기서 분리했는가]
 * - 데모 라우트(/demos/*)는 Tailwind/메인 사이트 chrome이 전혀 필요 없다.
 * - root.tsx에 app.css를 import하면 데모 라우트에도 Tailwind가 로드돼 데모 SCSS와 충돌한다.
 * - Tailwind의 preflight(* {box-sizing, margin:0 ...})가 데모 디자인을 망가뜨린다.
 * - 해결: Tailwind/Header/Footer/JsonLd/PageTransition은 _main.tsx(메인 사이트 레이아웃)로 이동.
 *   데모는 _demo.tsx 레이아웃에서 DemoHeaderBar/DemoFloatingHome만 렌더.
 * - React Router 7이 라우트별로 CSS를 자동으로 route-scope 처리하므로,
 *   layout 라우트에서 import한 CSS는 해당 서브트리가 활성일 때만 head에 삽입된다.
 *
 * [Pretendard 폰트를 여기 유지하는 이유]
 * - 메인 사이트와 데모 모두 한글 본문에 사용 → 중복 제거 및 preload 이득
 * - 데모별 전용 폰트(Cormorant/Playfair/Space Grotesk 등)는 각 데모 라우트의
 *   links() export로 별도 로드되어 메인 번들을 오염시키지 않는다.
 */

export const links: Route.LinksFunction = () => [
  // Pretendard 가변 폰트 (메인 + 데모 공통)
  {
    rel: "preload",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/pretendardvariable.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 기본 테마 컬러 (모바일 브라우저 상단 색상) */}
        <meta name="theme-color" content="#0a0a0a" />
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

/**
 * ErrorBoundary는 root에 그대로 유지한다.
 * 이유: 에러는 _main/_demo 레이아웃 밖에서도 발생할 수 있고,
 *       에러 UI는 최소한의 Tailwind 없이도 인라인 스타일로 동작해야 한다.
 *       (Tailwind import가 없어도 동작하도록 클래스 대신 style 속성 고려)
 *
 * 단, 여기 클래스들은 Tailwind 로드가 안 된 상태에서는 작동 안 할 수 있음.
 * _main 레이아웃 하위에서 터진 에러는 _main의 ErrorBoundary가 처리하면 더 안전.
 * 우선은 기본 스타일만 적용된 fallback UI로 유지.
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "오류가 발생했습니다"
  let details = "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 16px",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontFamily: "'Pretendard Variable', sans-serif",
          }}
        >
          <p style={{ color: "#666666", fontSize: 14, marginBottom: 16 }}>404</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
            페이지를 찾을 수 없습니다
          </h1>
          <p style={{ color: "#666666", marginBottom: 32 }}>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link
            to="/"
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            홈으로 이동
          </Link>
        </div>
      )
    }
    message = `${error.status} 오류`
    details = error.statusText || details
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "'Pretendard Variable', sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{message}</h1>
      <p style={{ color: "#666666", marginBottom: 32 }}>{details}</p>
      <Link
        to="/"
        style={{
          padding: "12px 24px",
          borderRadius: 8,
          backgroundColor: "#2563eb",
          color: "#ffffff",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        홈으로 이동
      </Link>
    </div>
  )
}
