import { Link } from "react-router"

/**
 * DemoHeaderBar — 데모 상단 고정 바
 *
 * [왜 이 컴포넌트가 필요한가]
 * - 데모 라우트는 메인 사이트 Header가 없어 사용자가 "포트폴리오로 돌아가는 방법"을 잃을 수 있음.
 * - 각 데모 디자인을 방해하지 않으면서 항상 복귀 경로를 제공해야 함.
 * - 상단 40~44px 얇은 바는 데모 콘텐츠 위에 overlay되지만 콘텐츠를 해치지 않는 최소 높이.
 *
 * [색상을 CSS 변수로 분리한 이유]
 * - 각 데모 컨셉(웜화이트/네이비/크림/미니멀)에 맞춰 톤을 다르게 해야 자연스러움.
 * - 데모의 `_demo-chrome.scss`에서 `--demo-bar-*` 변수를 override하면 자동 반영.
 * - 데모 SCSS는 자기 데모 라우트가 활성일 때만 로드되므로, CSS 변수도 자동으로 해당 데모 값으로 바뀜.
 * - 기본값은 메인 사이트 다크 테마와 일관되도록 딥블랙 계열로 설정.
 *
 * [backdrop-filter blur 처리]
 * - 데모 콘텐츠 위에 반투명으로 떠있되, 배경이 비쳐도 가독성을 유지해야 함.
 * - blur(12px)는 일반적인 iOS/macOS UI와 유사한 강도.
 */
interface DemoHeaderBarProps {
  /** 현재 데모 이름 (예: "S-1 Beauty Landing") */
  currentDemoName: string
}

const DemoHeaderBar = ({ currentDemoName }: DemoHeaderBarProps) => {
  return (
    <>
      <div
        className="demo-header-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "var(--demo-bar-bg, rgba(10, 10, 10, 0.85))",
          color: "var(--demo-bar-text, #ffffff)",
          borderBottom: "1px solid var(--demo-bar-border, rgba(255, 255, 255, 0.08))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          fontFamily: "'Pretendard Variable', -apple-system, sans-serif",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {/* 좌측: 복귀 링크 + 구분점 + 현재 데모명 */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "inherit",
            textDecoration: "none",
          }}
          aria-label="Pixelmark 포트폴리오로 돌아가기"
        >
          {/* 좌측 화살표 아이콘 */}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M13 8H3M7 12l-4-4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontWeight: 600 }}>Pixelmark Portfolio</span>
          <span style={{ opacity: 0.4, margin: "0 4px" }}>·</span>
          <span style={{ opacity: 0.8 }}>{currentDemoName}</span>
        </Link>

        {/* 우측: 데모 컬렉션 정보 (간단한 라벨만, 추후 다음 데모 이동 화살표 확장 가능) */}
        <span style={{ fontSize: 11, opacity: 0.5, letterSpacing: 0.5, textTransform: "uppercase" }}>
          Demo
        </span>
      </div>

      {/*
        고정 바 높이만큼 body에 spacer를 주지 않는 이유:
        - 각 데모는 자체 레이아웃(풀스크린 히어로 등)을 사용하므로,
          body padding으로 공간 확보하면 데모 디자인이 망가진다.
        - 대신 각 데모가 필요시 자체 SCSS에서 `body { padding-top: 44px; }` 처리.
        - 풀스크린 히어로 데모는 bar가 오버레이된 채로 시작 (디자인 의도).
      */}
    </>
  )
}

export default DemoHeaderBar
