/**
 * S-1 Beauty Landing — 제품/후기/특징 하드코딩 데이터
 *
 * [왜 하드코딩인가]
 * - 데모 사이트이므로 CMS/DB 연동 불필요
 * - JSX 인라인으로 쓰면 라우트 파일이 비대해지므로 별도 파일 분리
 * - Unsplash 이미지 사용 (기획서 제약: 무료 소스만)
 *
 * [카테고리]
 * 가상의 브랜드 "Lumière" (프랑스어 "빛") 기준 4개 제품 라인업.
 */

export interface Product {
  id: string
  category: string
  name: string
  description: string
  price: string
  image: string
}

/** 4개 제품 카드 */
export const products: Product[] = [
  {
    id: "p1",
    category: "Serum",
    name: "Radiance Glow",
    description: "비타민 C가 빛을 머금은 유리알 광채 세럼",
    price: "₩58,000",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=720&h=900&fit=crop",
  },
  {
    id: "p2",
    category: "Moisturizer",
    name: "Velvet Touch",
    description: "수분과 유분의 완벽한 균형, 벨벳 터치 크림",
    price: "₩72,000",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=720&h=900&fit=crop",
  },
  {
    id: "p3",
    category: "Essence",
    name: "Pure Essence",
    description: "순수한 식물 성분이 담긴 기초 에센스",
    price: "₩65,000",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=720&h=900&fit=crop",
  },
  {
    id: "p4",
    category: "Mask",
    name: "Silk Mask",
    description: "실크 단백질 함유, 15분의 집중 진정 마스크",
    price: "₩38,000",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=720&h=900&fit=crop",
  },
]

/** 특징 카드 (SVG path는 마크업 측에서 inline) */
export interface Feature {
  key: "natural" | "clinical" | "cruelty" | "sustainable"
  title: string
  description: string
}

export const features: Feature[] = [
  {
    key: "natural",
    title: "자연 유래 성분",
    description: "엄선된 자연 원료로 피부에 부담 없는 무자극 처방",
  },
  {
    key: "clinical",
    title: "임상 검증",
    description: "피부 전문가와 함께 검증한 효능 중심의 포뮬러",
  },
  {
    key: "cruelty",
    title: "크루얼티 프리",
    description: "어떤 동물 실험도 하지 않은 윤리적 생산 원칙",
  },
  {
    key: "sustainable",
    title: "지속 가능성",
    description: "재활용 가능한 패키지와 탄소 중립을 지향합니다",
  },
]

/** 후기 카드 */
export interface Review {
  id: string
  body: string
  author: string
  stars: number
}

export const reviews: Review[] = [
  {
    id: "r1",
    body: "Lumière를 쓰고 나서 피부가 정말 달라졌어요. 아침마다 거울 보는 게 즐거워졌습니다.",
    author: "이 * 아 · 30대",
    stars: 5,
  },
  {
    id: "r2",
    body: "세럼의 텍스처가 너무 좋아요. 끈적이지 않으면서도 촉촉함이 하루 종일 유지됩니다.",
    author: "박 * 민 · 20대",
    stars: 5,
  },
  {
    id: "r3",
    body: "패키지 디자인부터 향까지, 모든 경험이 고급스럽습니다. 선물용으로도 완벽해요.",
    author: "김 * 영 · 40대",
    stars: 5,
  },
]
