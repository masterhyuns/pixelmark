/**
 * S-3 Cafe & Restaurant — 메뉴/갤러리/공지 하드코딩 데이터
 *
 * [왜 하드코딩인가]
 * - 기획서 제약: 메뉴 데이터 하드코딩, 동적 CMS 불필요
 * - 가상의 카페 "Ember & Oak" — 원목과 은은한 불빛의 카페 컨셉
 */

export type MenuCategory = "coffee" | "dessert" | "brunch" | "drink"

export interface MenuItem {
  id: string
  category: MenuCategory
  name: string
  description: string
  price: string
  image: string
}

/** 카테고리 탭 라벨 */
export const CATEGORIES: Array<{ key: MenuCategory; label: string }> = [
  { key: "coffee", label: "Coffee" },
  { key: "dessert", label: "Dessert" },
  { key: "brunch", label: "Brunch" },
  { key: "drink", label: "Drink" },
]

/** 메뉴 아이템 (카테고리별 3개씩) */
export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: "c1",
    category: "coffee",
    name: "Ember Latte",
    description: "깊은 향의 에스프레소와 스팀 밀크의 조화",
    price: "₩6,500",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=720&h=540&fit=crop",
  },
  {
    id: "c2",
    category: "coffee",
    name: "Oak Cold Brew",
    description: "12시간 저온 추출, 은은한 오크 향",
    price: "₩7,000",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=720&h=540&fit=crop",
  },
  {
    id: "c3",
    category: "coffee",
    name: "Honey Americano",
    description: "유기농 꿀을 더한 부드러운 아메리카노",
    price: "₩5,500",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=720&h=540&fit=crop",
  },

  // Dessert
  {
    id: "d1",
    category: "dessert",
    name: "Burnt Cheesecake",
    description: "바닐라 빈이 씹히는 바스크 치즈케이크",
    price: "₩8,500",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=720&h=540&fit=crop",
  },
  {
    id: "d2",
    category: "dessert",
    name: "Oak Tiramisu",
    description: "에스프레소 가득 머금은 수제 티라미수",
    price: "₩7,500",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=720&h=540&fit=crop",
  },
  {
    id: "d3",
    category: "dessert",
    name: "Maple Scone",
    description: "메이플 시럽이 풍부한 스콘 + 클로티드 크림",
    price: "₩4,500",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=720&h=540&fit=crop",
  },

  // Brunch
  {
    id: "b1",
    category: "brunch",
    name: "Smoked Salmon Plate",
    description: "훈제 연어, 아보카도, 사워도우 토스트",
    price: "₩18,000",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=720&h=540&fit=crop",
  },
  {
    id: "b2",
    category: "brunch",
    name: "Ember Breakfast",
    description: "에그 베네딕트 + 바삭한 베이컨 + 감자",
    price: "₩16,500",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=720&h=540&fit=crop",
  },
  {
    id: "b3",
    category: "brunch",
    name: "Avocado Toast",
    description: "으깬 아보카도 + 페타 치즈 + 수란",
    price: "₩13,500",
    image: "https://images.unsplash.com/photo-1603046891744-76e6300f82ef?w=720&h=540&fit=crop",
  },

  // Drink
  {
    id: "dr1",
    category: "drink",
    name: "Yuja Ade",
    description: "직접 담근 유자청 + 탄산수의 상큼함",
    price: "₩6,500",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=720&h=540&fit=crop",
  },
  {
    id: "dr2",
    category: "drink",
    name: "Earl Grey Milk Tea",
    description: "진한 얼그레이 + 풍부한 우유 거품",
    price: "₩6,000",
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=720&h=540&fit=crop",
  },
  {
    id: "dr3",
    category: "drink",
    name: "Berry Smoothie",
    description: "신선한 베리 믹스 + 그릭 요거트",
    price: "₩7,000",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=720&h=540&fit=crop",
  },
]

/** 갤러리 이미지 (8장) */
export const galleryImages: Array<{ src: string; alt: string }> = [
  { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop", alt: "매장 내부 전경" },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&h=600&fit=crop", alt: "창가 테이블" },
  { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&h=600&fit=crop", alt: "바 카운터" },
  { src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=900&h=1200&fit=crop", alt: "디저트 디스플레이" },
  { src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=900&h=600&fit=crop", alt: "원두 선반" },
  { src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=600&fit=crop", alt: "드립 커피" },
  { src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=900&h=600&fit=crop", alt: "테라스 좌석" },
  { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&h=600&fit=crop", alt: "브런치 플레이트" },
]

/** 공지/이벤트 카드 */
export interface NoticeItem {
  id: string
  badge: string
  title: string
  period: string
  description: string
  image: string
}

export const notices: NoticeItem[] = [
  {
    id: "n1",
    badge: "Event",
    title: "가을 시즌 메뉴 출시",
    period: "2026.04.01 — 2026.05.31",
    description: "메이플 라떼와 호박 치즈케이크가 기간 한정으로 찾아옵니다.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop",
  },
  {
    id: "n2",
    badge: "Notice",
    title: "주말 브런치 시간 확대",
    period: "2026.04.01 부터",
    description: "토·일 오전 10시부터 브런치 메뉴 주문 가능합니다.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
  },
]
