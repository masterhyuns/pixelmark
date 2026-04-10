import { Link } from "react-router"

/**
 * DemoFloatingHome — 데모 우하단 플로팅 홈 버튼
 *
 * [왜 DemoHeaderBar와 함께 필요한가]
 * - 긴 원페이지 데모(S-1, S-3, S-4)에서는 사용자가 스크롤을 많이 내린 상태에서
 *   갑자기 포트폴리오로 돌아가고 싶을 때 상단까지 스크롤 올라가는 번거로움이 있음.
 * - 우하단 고정 버튼은 모바일 UX에서 가장 엄지 접근성이 좋은 위치.
 * - "포트폴리오 안에 들어와있는 데모"라는 맥락을 상시 상기시키는 역할.
 *
 * [idle 호흡 애니메이션이 필요한 이유]
 * - 정적 버튼은 데모 콘텐츠에 섞여 무시되기 쉽다.
 * - scale 0.95 ↔ 1.0 3초 호흡은 "살아있음"을 암시하면서도 산만하지 않은 최소 미동.
 * - prefers-reduced-motion 시 비활성해 접근성 준수.
 *
 * [CSS 변수 override 패턴]
 * - DemoHeaderBar와 동일: `--demo-fab-bg`, `--demo-fab-icon`을 데모 SCSS에서 override.
 * - 각 데모의 컨셉 컬러(로즈골드/네이비/테라코타/흑백)에 맞춰 자동 조정.
 *
 * [z-index 90]
 * - DemoHeaderBar(100)보다 낮게 설정해 스크롤 시 헤더에 가려지지 않도록 분리.
 * - 데모 자체의 모달(z >= 1000 가정)보다는 확실히 낮게 두어 모달 위로 올라가지 않음.
 */
const DemoFloatingHome = () => {
  return (
    <>
      <Link
        to="/projects"
        className="demo-floating-home"
        aria-label="작업사례로 돌아가기"
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          zIndex: 90,
          borderRadius: "50%",
          background: "var(--demo-fab-bg, #2563eb)",
          color: "var(--demo-fab-icon, #ffffff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.08)",
          textDecoration: "none",
          /* GPU 가속 힌트 + 호흡 애니메이션 */
          transformOrigin: "center center",
          animation: "demoFabBreath 3s ease-in-out infinite",
        }}
      >
        {/* 홈 아이콘 (단순 집 모양) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/*
        애니메이션과 반응형/접근성은 style 태그 한 번에 주입한다.
        - 컴포넌트 전역 CSS 파일을 만들지 않아 번들 오염 최소화.
        - 데모 라우트에 함께 로드되는 유일한 전역 스타일이라 문제 없음.
      */}
      <style>{`
        @keyframes demoFabBreath {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1); }
        }

        /* hover 시 호흡 중단 후 확대 */
        .demo-floating-home:hover {
          animation: none !important;
          transform: scale(1.1) !important;
          transition: transform 0.2s ease-out;
        }

        /* 모바일 크기 축소 */
        @media (max-width: 767px) {
          .demo-floating-home {
            right: 16px !important;
            bottom: 16px !important;
            width: 48px !important;
            height: 48px !important;
          }
        }

        /* 접근성: 모션 축소 시 호흡 비활성 */
        @media (prefers-reduced-motion: reduce) {
          .demo-floating-home {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}

export default DemoFloatingHome
