/**
 * JSON-LD 구조화 데이터 주입 컴포넌트
 *
 * [왜 별도 컴포넌트인가]
 * - <script type="application/ld+json"> 태그는 React에서 dangerouslySetInnerHTML로만
 *   원본 JSON 문자열을 그대로 넣을 수 있다 (자식 텍스트로 넣으면 escape됨)
 * - 이 패턴을 매번 페이지에서 반복하면 실수 유발 → 단일 컴포넌트로 캡슐화
 *
 * [왜 body 내부에 렌더해도 되는가]
 * - JSON-LD는 전통적으로 <head>에 넣지만 Google은 body 어디에 있어도 인식
 * - React Router의 meta() 함수는 link/meta만 지원 (script 미지원)
 * - 페이지 컴포넌트 내부에서 렌더하는 것이 가장 단순한 해결책
 */
interface JsonLdProps {
  /** JSON.stringify된 JSON-LD 객체 (seo.ts의 *JsonLd 함수 반환값) */
  data: string
}

const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: data }}
  />
)

export default JsonLd
