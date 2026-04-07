/**
 * S-3 Cafe & Restaurant — 메뉴/갤러리/공지 하드코딩 데이터
 *
 * [이미지 import 방식]
 * - `app/demos/cafe-restaurant/assets/` 경로의 webp/jpg를 Vite가 빌드 시 해시 URL로 변환
 * - `vite/client` 타입 기본 지원
 * - 데모 폴더 밖에서는 직접 접근 불가, 반드시 import
 *
 * [가상 브랜드]
 * "Ember & Oak" (원목과 은은한 불빛의 카페 컨셉) — 영문 두 단어 조합이라 실존 위험 낮음.
 * 모든 메뉴명·가격·이벤트는 가상이며 실제 매장과 무관.
 */

// ---------- Coffee ----------
import coffee1Url from "../assets/coffee/menu-coffee-1.webp"
import coffee2Url from "../assets/coffee/menu-coffee-2.webp"
import coffee3Url from "../assets/coffee/menu-coffee-3.webp"

// ---------- Dessert ----------
import dessert1Url from "../assets/dessert/menu-dessert-1.webp"
import dessert2Url from "../assets/dessert/menu-dessert-2.webp"
import dessert3Url from "../assets/dessert/menu-dessert-3.webp"

// ---------- Brunch ----------
import brunch1Url from "../assets/brunch/menu-brunch-1.webp"
import brunch2Url from "../assets/brunch/menu-brunch-2.webp"
import brunch3Url from "../assets/brunch/menu-brunch-3.webp"

// ---------- Drink (jpg) ----------
import drink1Url from "../assets/menu/drink/menu-drink-1.jpg"
import drink2Url from "../assets/menu/drink/menu-drink-2.jpg"
import drink3Url from "../assets/menu/drink/menu-drink-3.jpg"

// ---------- Gallery (8장) ----------
import gallery1Url from "../assets/gallery/gallery-01-interior.webp"
import gallery2Url from "../assets/gallery/gallery-02-window.webp"
import gallery3Url from "../assets/gallery/gallery-03-counter.webp"
import gallery4Url from "../assets/gallery/gallery-04-dessert.webp"
import gallery5Url from "../assets/gallery/gallery-05-beans.webp"
import gallery6Url from "../assets/gallery/gallery-06-pour.webp"
import gallery7Url from "../assets/gallery/gallery-07-terrace.webp"
import gallery8Url from "../assets/gallery/gallery-08-plate.webp"

// ---------- Notice ----------
import notice1Url from "../assets/menu/notice/notice-01-autumn.jpg"
import notice2Url from "../assets/menu/notice/notice-02-brunc.jpg"

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
    image: coffee1Url,
  },
  {
    id: "c2",
    category: "coffee",
    name: "Oak Cold Brew",
    description: "12시간 저온 추출, 은은한 오크 향",
    price: "₩7,000",
    image: coffee2Url,
  },
  {
    id: "c3",
    category: "coffee",
    name: "Honey Americano",
    description: "유기농 꿀을 더한 부드러운 아메리카노",
    price: "₩5,500",
    image: coffee3Url,
  },

  // Dessert
  {
    id: "d1",
    category: "dessert",
    name: "Burnt Cheesecake",
    description: "바닐라 빈이 씹히는 바스크 치즈케이크",
    price: "₩8,500",
    image: dessert1Url,
  },
  {
    id: "d2",
    category: "dessert",
    name: "Oak Tiramisu",
    description: "에스프레소 가득 머금은 수제 티라미수",
    price: "₩7,500",
    image: dessert2Url,
  },
  {
    id: "d3",
    category: "dessert",
    name: "Maple Scone",
    description: "메이플 시럽이 풍부한 스콘 + 클로티드 크림",
    price: "₩4,500",
    image: dessert3Url,
  },

  // Brunch
  {
    id: "b1",
    category: "brunch",
    name: "Smoked Salmon Plate",
    description: "훈제 연어, 아보카도, 사워도우 토스트",
    price: "₩18,000",
    image: brunch1Url,
  },
  {
    id: "b2",
    category: "brunch",
    name: "Ember Breakfast",
    description: "에그 베네딕트 + 바삭한 베이컨 + 감자",
    price: "₩16,500",
    image: brunch2Url,
  },
  {
    id: "b3",
    category: "brunch",
    name: "Avocado Toast",
    description: "으깬 아보카도 + 페타 치즈 + 수란",
    price: "₩13,500",
    image: brunch3Url,
  },

  // Drink
  {
    id: "dr1",
    category: "drink",
    name: "Yuja Ade",
    description: "직접 담근 유자청 + 탄산수의 상큼함",
    price: "₩6,500",
    image: drink1Url,
  },
  {
    id: "dr2",
    category: "drink",
    name: "Earl Grey Milk Tea",
    description: "진한 얼그레이 + 풍부한 우유 거품",
    price: "₩6,000",
    image: drink2Url,
  },
  {
    id: "dr3",
    category: "drink",
    name: "Berry Smoothie",
    description: "신선한 베리 믹스 + 그릭 요거트",
    price: "₩7,000",
    image: drink3Url,
  },
]

/** 갤러리 이미지 (8장) */
export const galleryImages: Array<{ src: string; alt: string }> = [
  { src: gallery1Url, alt: "매장 내부 전경" },
  { src: gallery2Url, alt: "창가 테이블" },
  { src: gallery3Url, alt: "바 카운터" },
  { src: gallery4Url, alt: "디저트 디스플레이" },
  { src: gallery5Url, alt: "원두 선반" },
  { src: gallery6Url, alt: "드립 커피" },
  { src: gallery7Url, alt: "테라스 좌석" },
  { src: gallery8Url, alt: "브런치 플레이트" },
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
    image: notice1Url,
  },
  {
    id: "n2",
    badge: "Notice",
    title: "주말 브런치 시간 확대",
    period: "2026.04.01 부터",
    description: "토·일 오전 10시부터 브런치 메뉴 주문 가능합니다.",
    image: notice2Url,
  },
]
