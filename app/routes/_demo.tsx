import { Outlet, useMatches } from "react-router"
import DemoHeaderBar from "~/components/demo/DemoHeaderBar"
import DemoFloatingHome from "~/components/demo/DemoFloatingHome"

/**
 * 데모 공통 레이아웃
 *
 * [왜 이 레이아웃이 필요한가]
 * - 4개 데모(beauty-landing, law-office, cafe-restaurant, personal-portfolio)는
 *   각자 다른 디자인·SCSS·모듈을 쓰지만, 공통적으로 "포트폴리오 복귀 UI"가 필요함.
 * - 각 데모 라우트에 반복해서 DemoHeaderBar/FloatingHome을 import/렌더하면 실수 유발.
 * - React Router 7의 layout() 헬퍼로 묶어 하위 라우트에 자동 렌더 → DRY.
 *
 * [왜 useMatches로 handle을 읽는가]
 * - 각 데모 라우트는 자기 이름을 모름. 하지만 헤더 바에는 "현재 데모명"을 표시해야 함.
 * - 자식 라우트가 `export const handle = { demoName: "S-1 Beauty Landing" }`로 내보내면,
 *   useMatches()를 통해 부모 layout에서 읽을 수 있음 (React Router 7의 표준 패턴).
 * - 여러 중첩 라우트가 있을 경우 가장 깊은 match가 우선하도록 `findLast` 사용.
 *   (S-2는 부모 layout + sub-route 구조, 둘 다 handle을 내보낼 수 있음)
 *
 * [Tailwind/메인 chrome 완전 부재]
 * - 이 layout은 Tailwind를 import하지 않는다.
 *   → 데모 SCSS의 전역 reset과 충돌하지 않음.
 *   → body 배경·폰트는 각 데모 SCSS가 지배.
 * - Header/Footer/JsonLd/PageTransition 등 메인 사이트 chrome도 일체 포함하지 않음.
 *
 * [body padding은 여기서 주지 않음]
 * - DemoHeaderBar가 fixed로 겹치지만 padding으로 자리 비우지 않는 이유는,
 *   풀스크린 히어로 디자인(S-1, S-3)은 bar가 오버레이된 채로 시작해야 하기 때문.
 * - 각 데모가 필요시 자체 SCSS에서 `padding-top`을 조정한다.
 */
export default function DemoLayout() {
  const matches = useMatches()

  // 자식 라우트에서 export const handle = { demoName: "..." } 를 찾는다
  // 가장 깊은(마지막) match부터 거꾸로 순회해 handle.demoName이 있는 첫 항목 채택
  const handleWithName = matches
    .slice()
    .reverse()
    .find((m) => {
      const h = m.handle as { demoName?: string } | undefined
      return !!h?.demoName
    })

  const demoName = (handleWithName?.handle as { demoName?: string } | undefined)?.demoName ?? "Demo"

  return (
    <>
      <DemoHeaderBar currentDemoName={demoName} />
      <Outlet />
      <DemoFloatingHome />
    </>
  )
}
