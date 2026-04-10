import {
  Code2,
  Component,
  Layers,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react"
import type { Project, ProjectCategory, ProjectTier, ServiceItem, TechGroup, StrengthItem, ProcessStep, StatItem } from "~/types/types"

/**
 * 포트폴리오 프로젝트 데이터
 *
 * [썸네일 전략]
 * 각 프로젝트의 썸네일은 **해당 데모 폴더의 대표 이미지**를 재사용한다.
 * Vite가 같은 파일을 한 번만 번들링하므로 중복 다운로드 없음.
 * 상세 페이지 스크린샷 갤러리는 지시서 #001 항목 7로 제거됨.
 *
 * [왜 데모 asset을 재사용하는가]
 * - 사용자가 목록 → 상세 → 실제 데모로 이어질 때 비주얼 일관성 확보
 * - Unsplash 외부 의존 제거
 *
 * [원칙 해석]
 * CLAUDE.md의 "데모 폴더 import 금지"는 데모끼리 혹은 데모가 메인을 참조하지 말라는 것.
 * 메인이 데모 asset(리소스)만 참조하는 건 데모의 이식성/독립성을 해치지 않는다.
 */

// ============================================================
// 썸네일 — 각 데모의 대표 이미지를 thumbnail로만 재사용
// ============================================================
import blHeroUrl from "~/demos/beauty-landing/assets/images/hero/hero-bg.webp"
import loHeroUrl from "~/demos/law-office/assets/images/hero/home-hero.webp"
import crHeroUrl from "~/demos/cafe-restaurant/assets/hero/hero-bg.webp"
import ppWork1Url from "~/demos/personal-portfolio/assets/images/works/work-1-orbit-finance.webp"
import wmGalleryUrl from "~/demos/wedding-minimal/assets/images/gallery/gallery-main.webp"
import bcGrowthUrl from "~/demos/baby-celebration/assets/images/growth/growth-12m.webp"
import pvHeroUrl from "~/demos/popup-vivid/assets/images/hero/hero-gradient.webp"
import ctHeroUrl from "~/demos/conference-tech/assets/images/home/home-hero.webp"
import wcHeroUrl from "~/demos/wedding-classic/assets/images/home/home-hero.webp"
import wbHeroUrl from "~/demos/wedding-bohemian/assets/images/hero/hero-bg.webp"
import pgHeroUrl from "~/demos/party-gradient/assets/images/hero/hero.webp"
import wvHeroUrl from "~/demos/wedding-vivid/assets/images/hero/hero.webp"
import rrHeroUrl from "~/demos/reunion-retro/assets/images/hero/hero.webp"
import ohHeroUrl from "~/demos/openhouse-arch/assets/images/hero/hero.webp"
import wcineHeroUrl from "~/demos/wedding-cinematic/assets/images/hero/hero-bg.webp"
import wmagHeroUrl from "~/demos/wedding-magazine/assets/images/cover/cover.webp"
import whanHeroUrl from "~/demos/wedding-hanji/assets/images/hero/hero.webp"
import wvnyHeroUrl from "~/demos/wedding-vinyl/assets/images/hero/album-cover.webp"
import wpixHeroUrl from "~/demos/wedding-pixel/assets/images/title/title-bg.webp"
import wpostHeroUrl from "~/demos/wedding-postal/assets/images/envelope/envelope.webp"
import wbookHeroUrl from "~/demos/wedding-storybook/assets/images/cover/cover.webp"
import flbHeroUrl from "~/demos/fashion-lookbook/assets/images/hero/hero-bg.webp"
import fmagHeroUrl from "~/demos/food-magazine/assets/images/home/home-hero.webp"
import lvmHeroUrl from "~/demos/living-modern/assets/images/hero/hero.webp"
import bpHeroUrl from "~/demos/bakery-pastel/assets/images/hero/hero-bg.webp"
import wbdHeroUrl from "~/demos/winebar-darklux/assets/images/home/home-hero.webp"
import fdmHeroUrl from "~/demos/finedining-mono/assets/images/hero/hero.webp"
import pmnHeroUrl from "~/demos/photographer-mono/assets/images/intro/intro-main.webp"
import ilvHeroUrl from "~/demos/illustrator-vivid/assets/images/hero/hero.webp"
import cwmHeroUrl from "~/demos/coach-warm/assets/images/about/hero.webp"
import mclHeroUrl from "~/demos/medical-clean/assets/images/home/home-hero.webp"
import taxHeroUrl from "~/demos/tax-office-calm/assets/images/hero/hero.webp"
import cdkHeroUrl from "~/demos/consulting-dark/assets/images/home/hero.webp"
export const projects: Project[] = [
  {
    slug: "beauty-landing",
    title: "브랜드/화장품 랜딩페이지",
    subtitle: "고급스러운 비주얼과 스크롤 애니메이션으로 브랜드 감성을 전달하는 원페이지 랜딩",
    category: "brand",
    tier: "standard",
    industry: "뷰티/화장품",
    duration: "1주",
    order: 1,
    demoUrl: "/demos/beauty-landing",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "GSAP", "Swiper.js"],
    description:
      "화장품 브랜드 런칭을 위한 감성적인 랜딩페이지입니다. 풀스크린 패럴랙스 히어로, 가로 드래그 슬라이더, 스크롤 진입 애니메이션 등 고급스러운 비주얼 인터랙션을 순수 퍼블리싱 기술로 구현했습니다. 로즈골드 톤의 컬러 시스템과 절제된 여백으로 제품이 돋보이는 레이아웃을 설계했습니다.",
    thumbnail: blHeroUrl,
    highlights: [
      {
        title: "풀스크린 패럴랙스 히어로",
        description: "GSAP ScrollTrigger를 활용한 배경 이미지 패럴랙스 효과. 스크롤 속도의 0.5배로 자연스러운 깊이감을 연출합니다.",
      },
      {
        title: "가로 드래그 제품 슬라이더",
        description: "Swiper.js 기반 터치/드래그 지원 가로 슬라이더. 호버 시 scale+오버레이 텍스트가 나타나는 카드 인터랙션을 구현했습니다.",
      },
      {
        title: "스크롤 진입 stagger 애니메이션",
        description: "Intersection Observer와 GSAP을 연동하여 섹션 진입 시 요소가 순차적으로 나타나는 stagger 애니메이션을 구현했습니다.",
      },
      {
        title: "리뷰 캐러셀 (자동 재생 + 수동)",
        description: "4초 간격 자동 재생과 도트 인디케이터를 갖춘 리뷰 캐러셀. 모바일에서는 터치 스와이프로 조작 가능합니다.",
      },
      {
        title: "완벽한 반응형",
        description: "PC(1200px+) / 태블릿(768px~) / 모바일(767px-) 세 구간 모두 최적화. 모바일에서는 패럴랙스를 비활성화하여 성능을 보장합니다.",
      },
    ],
  },
  {
    slug: "law-office",
    title: "법률사무소/병원 소개 사이트",
    subtitle: "신뢰감 있는 정보 구조와 상담 전환 설계에 집중한 전문직 멀티페이지 사이트",
    category: "professional",
    tier: "standard",
    industry: "법률/의료",
    duration: "1주",
    order: 2,
    demoUrl: "/demos/law-office",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "Kakao Map API"],
    description:
      "법률사무소·병원 등 전문직을 위한 신뢰감 중심의 소개 사이트입니다. 5개 페이지(메인/소개/전문분야/후기/상담예약)로 구성되며, 숫자 카운트업 애니메이션, 아코디언 전문분야, 상담 폼 밸리데이션, 지도 임베드, 플로팅 상담 버튼까지 실제 운영 수준의 기능을 갖췄습니다. 네이비와 골드 브라운 컬러로 전문성과 신뢰를 동시에 전달합니다.",
    thumbnail: loHeroUrl,
    highlights: [
      {
        title: "숫자 카운트업 애니메이션",
        description: "Intersection Observer로 뷰포트 진입을 감지하고, 0부터 목표 숫자까지 2초간 부드럽게 카운트업하는 애니메이션을 구현했습니다.",
      },
      {
        title: "전문분야 아코디언/탭",
        description: "CSS height 트랜지션을 활용한 아코디언 컴포넌트. 각 분야별 상담 CTA와 연결되어 전환율을 높이는 설계입니다.",
      },
      {
        title: "상담 예약 폼 + 밸리데이션",
        description: "인라인 에러 메시지와 확인 모달을 갖춘 상담 예약 폼. 실제 서버 연동 없이 완전한 UX 흐름을 구현했습니다.",
      },
      {
        title: "플로팅 상담 버튼",
        description: "스크롤 200px 이후 페이드인되는 플로팅 전화 버튼. 모든 페이지에서 항상 노출되어 즉각적인 상담 연결을 유도합니다.",
      },
      {
        title: "카카오맵 임베드",
        description: "API 키 없이 iframe 임베드 방식으로 지도를 연동. 오시는 길 정보와 함께 배치하여 오프라인 방문 전환을 지원합니다.",
      },
    ],
  },
  {
    slug: "cafe-restaurant",
    title: "카페/레스토랑 소개 사이트",
    subtitle: "따뜻한 감성 비주얼과 메뉴/갤러리 인터랙션이 돋보이는 외식업 원페이지 사이트",
    category: "fnb",
    tier: "standard",
    industry: "외식업/카페",
    duration: "1주",
    order: 3,
    demoUrl: "/demos/cafe-restaurant",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "Swiper.js", "GLightbox"],
    description:
      "카페·레스토랑을 위한 감성적인 소개 사이트입니다. 크림&테라코타 컬러 시스템, 메뉴 탭 전환, 마소닉 갤러리 + 라이트박스, 지도 임베드 등 외식업 홈페이지에 필요한 모든 요소를 담았습니다. 사진이 주인공이 되도록 여백을 넉넉히 사용하고 비대칭 레이아웃으로 역동적인 구성을 연출했습니다.",
    thumbnail: crHeroUrl,
    highlights: [
      {
        title: "메뉴 탭 전환 인터랙션",
        description: "커피/디저트/브런치/음료 카테고리 탭 클릭 시 페이드 전환으로 메뉴 목록이 교체됩니다. PC 3열/모바일 1열 반응형 그리드로 구성했습니다.",
      },
      {
        title: "마소닉 갤러리 + 라이트박스",
        description: "CSS Grid로 구현한 불규칙 갤러리 레이아웃. 사진 클릭 시 GLightbox로 전체화면 라이트박스가 열리고 좌우 넘김이 가능합니다.",
      },
      {
        title: "히어로 서서히 확대 효과",
        description: "CSS 애니메이션으로 히어로 배경 이미지가 15초 주기로 scale 1→1.05로 서서히 확대되어 생동감 있는 첫 화면을 연출합니다.",
      },
      {
        title: "비대칭 소개 섹션",
        description: "좌측 이미지 2장이 약간 기울어진 오버랩 배치로 역동적인 레이아웃을 구성. 우측 텍스트와 대비되어 시선을 자연스럽게 이동시킵니다.",
      },
      {
        title: "모바일 퍼스트 반응형",
        description: "터치 스와이프 갤러리, 햄버거 메뉴, 스택 레이아웃 등 모바일 사용자를 우선 고려한 반응형 설계를 적용했습니다.",
      },
    ],
  },
  {
    slug: "personal-portfolio",
    title: "포트폴리오/이력서 사이트",
    subtitle: "타이포그래피와 여백으로 완성하는 미니멀 개인 포트폴리오 원페이지 사이트",
    category: "personal",
    tier: "standard",
    industry: "개인/프리랜서",
    duration: "1주",
    order: 4,
    demoUrl: "/demos/personal-portfolio",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS"],
    description:
      "디자이너·개발자·프리랜서를 위한 미니멀 포트폴리오 사이트입니다. 외부 라이브러리 없이 순수 HTML/CSS/JS만으로 구현하여 10KB 이하의 초경량 JS를 달성했습니다. 타이프라이터 이름 효과, 좌우 교차 타임라인, 작업물 모달, 스킬 태그 stagger 애니메이션까지 절제된 코드로 세련된 결과물을 만들어냈습니다.",
    thumbnail: ppWork1Url,
    highlights: [
      {
        title: "타이프라이터 효과",
        description: "페이지 로드 시 이름이 한 글자씩 타이핑되는 효과. 외부 라이브러리 없이 순수 JS로 구현하여 타이핑 완료 후 커서 깜빡임까지 재현했습니다.",
      },
      {
        title: "좌우 교차 타임라인",
        description: "CSS Grid로 중앙선을 기준으로 경력이 좌우 교차 배치되는 타임라인. 스크롤 진입 시 stagger로 순차 등장합니다.",
      },
      {
        title: "작업물 모달 (라이브러리 없음)",
        description: "순수 JS로 구현한 라이트박스 모달. 클릭한 작업물의 이미지·설명·기술 스택이 팝업으로 표시되며 ESC/배경 클릭으로 닫힙니다.",
      },
      {
        title: "스킬 태그 stagger 애니메이션",
        description: "뷰포트 진입 시 스킬 태그가 0.05초 간격으로 순차 페이드인. CSS 커스텀 프로퍼티로 딜레이를 자동 계산합니다.",
      },
      {
        title: "초경량 구현 (JS 10KB 이하)",
        description: "외부 라이브러리 없이 모든 인터랙션을 네이티브 API로 구현. 번들 없이 단일 JS 파일로 동작하여 최고의 로딩 성능을 달성합니다.",
      },
    ],
  },
  {
    slug: "wedding-minimal",
    title: "미니멀 화이트 청첩장",
    subtitle: "절제된 모던 톤과 타이프라이터·스크롤 reveal로 \"글로 쓴 우리 이야기\"를 표현한 원페이지 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 5,
    demoUrl: "/demos/wedding-minimal",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "IntersectionObserver"],
    description:
      "미니멀 화이트 톤의 모바일 우선 청첩장 데모입니다. 외부 라이브러리 없이 타이프라이터, 스크롤 페이드인, 실시간 D-day 카운트다운, 계좌번호 클립보드 복사를 모두 직접 구현했습니다. 화이트 + 옅은 골드 + 충분한 여백으로 텍스트가 주인공이 되는 절제된 디자인을 추구했고, 7개 섹션(인트로/인사/우리 이야기/갤러리/결혼식 정보/계좌/푸터)을 단일 라우트에 담았습니다.",
    thumbnail: wmGalleryUrl,
    highlights: [
      {
        title: "신랑신부 이름 타이프라이터",
        description: "페이지 로드 시 영문 이니셜이 한 글자씩 타이핑되는 효과. 외부 라이브러리 없이 setInterval과 dataset만으로 구현, reduced-motion 대응 포함.",
      },
      {
        title: "실시간 D-day 카운트다운",
        description: "결혼식 일시까지 남은 일/시/분/초를 1초마다 갱신. tabular-nums로 숫자 떨림을 막고, 음수 방어 처리 포함.",
      },
      {
        title: "계좌번호 클립보드 복사 + 토스트",
        description: "navigator.clipboard와 textarea fallback을 동시에 지원해 모든 환경에서 동작. 복사 결과는 하단 토스트로 2.4초간 안내.",
      },
      {
        title: "스크롤 진입 페이드인",
        description: "IntersectionObserver로 섹션이 뷰포트에 들어올 때만 부드럽게 페이드인. once 트리거로 성능 부담 최소화.",
      },
      {
        title: "모바일 우선 반응형",
        description: "청첩장 사용자의 80% 이상이 모바일이라는 점을 반영해 max-width 680px 중앙 정렬과 좌우 24px 패딩을 기본으로 설계했습니다.",
      },
    ],
  },
  {
    slug: "baby-celebration",
    title: "돌잔치 / 백일 초대장",
    subtitle: "파스텔 톤과 성장 타임라인 슬라이더로 따뜻하게 풀어낸 가족 행사 초대장",
    category: "event",
    tier: "standard",
    industry: "가족 행사 / 돌잔치",
    duration: "1주",
    order: 6,
    demoUrl: "/demos/baby-celebration",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Pointer Events", "IntersectionObserver"],
    description:
      "옅은 크림과 파스텔 핑크/피치 톤, 둥근 폰트(Quicksand)로 사랑스러운 분위기를 살린 돌잔치·백일 초대장 데모입니다. 시그니처 인터랙션은 0~12개월 5장의 카드가 가로로 흐르는 성장 타임라인 슬라이더로, 모바일 터치 스와이프와 PC 마우스 드래그·휠·키보드 화살표·인디케이터·prev/next 버튼까지 모두 외부 라이브러리 없이 직접 구현했습니다. 카운트다운, 카카오맵, 일러스트 둥둥 모션, 답례품 카드까지 6개 섹션을 단일 라우트에 담았습니다.",
    thumbnail: bcGrowthUrl,
    highlights: [
      {
        title: "성장 타임라인 가로 슬라이더",
        description: "Pointer Events 기반으로 모바일 스와이프와 PC 드래그를 동시에 지원합니다. 25% 임계값 스냅, 키보드 화살표, 휠 가로 스크롤, 인디케이터 동기화까지 외부 라이브러리 없이 구현했습니다.",
      },
      {
        title: "실시간 D-day 카운트다운",
        description: "행사일까지 남은 일/시/분/초를 1초마다 갱신합니다. tabular-nums로 숫자 떨림을 막고, 음수 방어 처리로 안전합니다.",
      },
      {
        title: "일러스트 액센트 둥둥 모션",
        description: "인트로의 SVG 일러스트 4개에 개별 딜레이/속도를 부여해 자연스럽게 떠다니는 효과를 구현했습니다. prefers-reduced-motion 사용자에게는 모션이 자동 비활성화됩니다.",
      },
      {
        title: "카카오맵 임베드 + 오시는 길",
        description: "API 키 없이 iframe 방식으로 지도를 노출하고, 지하철·버스·주차 정보를 카드로 정리해 모바일에서도 한눈에 들어오도록 설계했습니다.",
      },
      {
        title: "모바일 우선 반응형",
        description: "초대장 사용자의 90% 이상이 모바일이라는 점을 반영해 max-width 720px 중앙 정렬을 기본으로, 카드 폭과 카운트다운/지도 비율을 모바일 가독성에 맞춰 조정했습니다.",
      },
    ],
  },
  {
    slug: "popup-vivid",
    title: "팝업스토어 / 마케팅 캠페인",
    subtitle: "비비드 그라데이션과 거대 카운트다운으로 임팩트를 살린 단기 캠페인 안내 페이지",
    category: "event",
    tier: "standard",
    industry: "팝업스토어 / 캠페인",
    duration: "1주",
    order: 7,
    demoUrl: "/demos/popup-vivid",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Inter Tight", "rAF"],
    description:
      "비비드 핑크·오렌지·옐로우 그라데이션과 Inter Tight 큰 산세리프로 구성한 트렌디 캠페인 안내 페이지 데모입니다. 풀스크린 히어로의 그라데이션은 60초 사이클로 천천히 hue가 회전하며, 거대 D-day 카운트다운이 1초마다 갱신됩니다. 컨셉, 입점 브랜드 카드 그리드, 일정·장소 정보, 카카오맵, SNS 해시태그까지 5개 섹션을 단일 라우트에 담았습니다.",
    thumbnail: pvHeroUrl,
    highlights: [
      {
        title: "비비드 그라데이션 히어로",
        description: "핑크·오렌지·옐로우 linear-gradient에 hue-rotate CSS 변수를 rAF로 60초 사이클 회전시켜 정적 이미지 없이 살아 있는 배경을 만들었습니다. prefers-reduced-motion 사용자에겐 자동으로 정지합니다.",
      },
      {
        title: "거대 D-day 카운트다운",
        description: "캠페인 시작까지 남은 일/시/분/초를 1초마다 갱신합니다. 숫자는 clamp로 모바일에서도 임팩트를 유지하고, tabular-nums로 떨림을 막았습니다.",
      },
      {
        title: "컨셉 비주얼 + 비대칭 레이아웃",
        description: "텍스트와 이미지의 1 : 1.2 비대칭 그리드와 \"VOL.01\" 핑크 칩으로 캠페인 시즌성을 강조했습니다. 이미지 hover 시 미세 줌으로 생동감을 더했습니다.",
      },
      {
        title: "입점 브랜드 카드 그리드",
        description: "3개 가상 브랜드 카드에 색상 액센트 띠를 inline CSS 변수로 주입해 동일 컴포넌트로 다양한 톤을 표현했습니다. hover 시 translateY와 그림자가 함께 작동합니다.",
      },
      {
        title: "정보 섹션 + 카카오맵 + 해시태그",
        description: "Schedule / Hours / Venue 3행 정보 표, 카카오맵 iframe, SNS 해시태그 칩까지 캠페인 안내에 필요한 모든 요소를 한 섹션에 정리했습니다.",
      },
    ],
  },
  {
    slug: "conference-tech",
    title: "테크 컨퍼런스 / B2B 행사",
    subtitle: "다크 테크 톤과 모노스페이스 타이포로 정보 밀도를 살린 멀티페이지 컨퍼런스 안내",
    category: "event",
    tier: "standard",
    industry: "B2B 행사 / 컨퍼런스",
    duration: "1주",
    order: 8,
    demoUrl: "/demos/conference-tech",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "JetBrains Mono", "IntersectionObserver"],
    description:
      "딥 다크 배경 위에 JetBrains Mono 모노스페이스 타이포를 얹은 가상 컨퍼런스 안내 데모입니다. 홈/스피커/일정 3개 sub-route를 부모 layout 한 곳에서 SCSS와 chrome을 공유하도록 구성했고, 페이지 전환 시 부드러운 페이드만으로 즉시 이동합니다. 8명 가상 스피커 카드 그리드, 트랙별 필터, 카드 클릭 모달(포커스 트랩 + ESC), 트랙 색상으로 강조되는 이틀짜리 일정표까지 정보 밀도가 높은 페이지 디자인 능력을 보여줍니다.",
    thumbnail: ctHeroUrl,
    highlights: [
      {
        title: "멀티페이지 + 부모 layout 공유",
        description: "React Router 7의 중첩 layout으로 홈/스피커/일정 3 sub-route가 동일한 chrome과 SCSS를 공유합니다. sub-route 이동 시 CSS 재로드 없이 즉시 전환됩니다.",
      },
      {
        title: "거대 D-day 카운트다운",
        description: "홈 히어로의 큰 모노스페이스 카운트다운이 1초마다 갱신됩니다. tabular-nums로 떨림을 막고, 음수 방어 처리를 포함합니다.",
      },
      {
        title: "스피커 카드 + 모달 (포커스 트랩 + ESC)",
        description: "8명 스피커 카드 클릭 시 단일 모달이 dataset에서 정보를 읽어 내용이 교체됩니다. 백드롭 클릭, 닫기 버튼, ESC 키 모두 지원하고 트리거로 포커스가 복귀합니다.",
      },
      {
        title: "트랙별 필터 (스피커 + 일정 공통)",
        description: "단일 trackFilter 모듈이 [data-ct-filter-target] 그룹과 [data-ct-filterable] 요소를 매칭해 양쪽 페이지에서 동일하게 동작합니다. 트랙별 색상이 inline CSS 변수로 주입됩니다.",
      },
      {
        title: "정보 밀도 높은 일정표",
        description: "이틀에 걸친 세션을 시간/제목/스피커/트랙 4열 그리드로 정리했습니다. 키노트는 좌측 보더로 강조하고, 휴식 시간은 자동으로 dim 처리됩니다.",
      },
    ],
  },
  {
    slug: "wedding-classic",
    title: "클래식 럭셔리 청첩장",
    subtitle: "네이비와 골드, 큰 세리프와 한영 병기로 완성한 호텔 웨딩 멀티페이지 청첩장",
    category: "event",
    tier: "standard",
    industry: "호텔 웨딩 / 청첩장",
    duration: "1주",
    order: 9,
    demoUrl: "/demos/wedding-classic",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Swiper.js", "Cormorant Garamond"],
    description:
      "네이비와 골드, Cormorant Garamond 세리프로 완성한 호텔 웨딩 청첩장 데모입니다. 홈 / 스토리 / 갤러리 / 오시는 길 4개 sub-route를 부모 layout 한 곳에서 SCSS와 헤더·푸터를 공유하도록 구성했고, 한영 병기 인사글과 챕터로 격조 있는 감성을 전달합니다. 갤러리는 Swiper 기반 풀스크린 캐러셀(키보드·페이지네이션·loop)을 직접 초기화했습니다.",
    thumbnail: wcHeroUrl,
    highlights: [
      {
        title: "멀티페이지 + 공유 layout",
        description: "React Router 7의 중첩 layout으로 4개 sub-route가 동일한 헤더·푸터·SCSS를 공유합니다. 페이지 이동 시 CSS 재로드 없이 부드러운 페이드로 전환됩니다.",
      },
      {
        title: "한영 병기 타이포",
        description: "Cormorant Garamond 세리프를 디스플레이, Pretendard를 한글 본문으로 배치해 영문과 한글이 한 흐름으로 읽히도록 설계했습니다. 외국인 친구 초청이 필요한 커플을 위한 구조입니다.",
      },
      {
        title: "Swiper 풀스크린 갤러리",
        description: "Swiper v12 vanilla 모드로 직접 초기화한 풀스크린 캐러셀. 키보드 화살표, 커스텀 네비 버튼, 페이지네이션 도트, loop, 실시간 카운터까지 지원합니다.",
      },
      {
        title: "실시간 D-day 카운트다운",
        description: "히어로의 4셀 카운트다운이 1초마다 갱신됩니다. 골드 액센트와 세리프 타이포로 격조 있는 외형을 유지합니다.",
      },
      {
        title: "오시는 길 + 카카오맵 + 한영 병기 안내",
        description: "호텔 정문 컷, 카카오맵 iframe, 지하철·발렛·셔틀 3카드 안내를 한영 병기로 제공해 외국인 하객도 불편 없이 읽을 수 있도록 구성했습니다.",
      },
    ],
  },
  {
    slug: "wedding-bohemian",
    title: "보헤미안 자연주의 청첩장",
    subtitle: "식물 SVG 패럴랙스와 매거진 스프레드로 완성한 야외 가든 웨딩 청첩장",
    category: "event",
    tier: "standard",
    industry: "야외 / 가든 웨딩",
    duration: "1주",
    order: 10,
    demoUrl: "/demos/wedding-bohemian",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "SVG", "Caveat", "Cormorant Garamond"],
    description:
      "베이지와 세이지 그린, Caveat 손글씨와 Cormorant 세리프를 혼용한 야외 가든 웨딩 청첩장 데모입니다. 시그니처는 직접 그린 식물 SVG(잎·가지·꽃다발·양치류 4종)를 서로 다른 속도로 흘려보내는 패럴랙스 — rAF + passive scroll로 가볍게 구현했습니다. 매거진 스프레드 좌우 페이드인, 살짝 기울어진 사진, 식순 타임라인, 카운트다운, 카카오맵, 드레스 코드까지 5 섹션에 담았습니다.",
    thumbnail: wbHeroUrl,
    highlights: [
      {
        title: "식물 SVG 패럴랙스 (시그니처)",
        description: "잎·가지·꽃다발·양치류 4종의 식물 SVG를 직접 그려 저작권 안전하게 사용했습니다. 각 요소에 다른 speed 계수(0.15~0.35)를 부여해 스크롤에 따라 자연스럽게 흐르는 배경 레이어를 만들었습니다.",
      },
      {
        title: "매거진 스프레드 좌우 페이드",
        description: "IntersectionObserver + data-direction 속성으로 왼쪽 글 / 오른쪽 사진이 반대 방향에서 페이드인됩니다. 짝수/홀수 아이템은 레이아웃도 자동 반전됩니다.",
      },
      {
        title: "손글씨 + 세리프 하이브리드 타이포",
        description: "Caveat 손글씨(디스플레이/eyebrow) + Cormorant Garamond 세리프(타이틀) + Pretendard(본문)를 혼용해 자연주의 감성을 유지하면서도 가독성을 확보했습니다.",
      },
      {
        title: "기울어진 매거진 사진",
        description: "홀수/짝수 이미지가 각각 -0.8°/+0.8°로 기울어져 자연스러운 매거진 레이아웃. hover 시 0°로 바르게 펴지는 미세 인터랙션을 추가했습니다.",
      },
      {
        title: "야외 웨딩 특수 안내",
        description: "지하철 대신 셔틀버스 일정, 주차, 드레스 코드(베이지/세이지/크림)까지 야외 가든 웨딩에 필요한 안내를 카드로 정리했습니다.",
      },
    ],
  },
  {
    slug: "party-gradient",
    title: "개인 파티 초대장",
    subtitle: "파스텔 그라데이션과 글래스모피즘으로 완성한 페미닌 톤 생일 파티 초대장",
    category: "event",
    tier: "standard",
    industry: "개인 파티 / 생일",
    duration: "1주",
    order: 11,
    demoUrl: "/demos/party-gradient",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "backdrop-filter", "Playfair Display"],
    description:
      "핑크·블루·퍼플 파스텔 그라데이션을 풀블리드 배경(background-attachment: fixed)으로 깔고, 그 위에 글래스모피즘 카드(backdrop-filter: blur)를 얹은 생일 파티 초대장 데모입니다. Playfair Display 이탤릭을 디스플레이로 써 페미닌하고 트렌디한 톤을 만들었습니다. 시그니처는 드레스코드 4카드(핑크/블루/퍼플/화이트)로, 컬러 칩과 키워드로 분위기를 한눈에 전달합니다. RSVP Mock 폼 + 성공 모달, D-day 카운트다운, 카카오맵까지 6섹션을 단일 라우트에 담았습니다.",
    thumbnail: pgHeroUrl,
    highlights: [
      {
        title: "풀블리드 파스텔 그라데이션",
        description: "핑크 → 블루 → 퍼플 3단계 linear-gradient에 background-attachment: fixed를 적용해 스크롤 중에도 고정된 배경 위로 콘텐츠가 흐르는 효과를 만들었습니다.",
      },
      {
        title: "글래스모피즘 카드",
        description: "backdrop-filter: blur(18px) + 반투명 흰색으로 구성한 글래스 카드를 카운트다운/정보/드레스코드/RSVP 전반에 일관되게 사용했습니다.",
      },
      {
        title: "드레스코드 4카드 (시그니처)",
        description: "Pink / Blue / Purple / White 4개 드레스코드를 컬러 칩, 이미지, 키워드, 설명으로 구성된 글래스 카드로 제공합니다. hover 시 translateY + 부드러운 그림자가 작동합니다.",
      },
      {
        title: "RSVP Mock 폼 + 성공 모달",
        description: "이름과 인원수를 받는 Mock 폼. 제출 시 서버 요청 없이 값을 읽어 성공 모달을 띄우고, ESC·백드롭·닫기 버튼 모두 지원합니다.",
      },
      {
        title: "실시간 D-day 카운트다운 + 카카오맵",
        description: "히어로의 글래스 카운트다운이 1초마다 갱신되고, 정보 섹션에는 카카오맵 iframe이 같은 글래스 톤으로 이어집니다.",
      },
    ],
  },
  {
    slug: "wedding-vivid",
    title: "모던 컬러풀 청첩장",
    subtitle: "RED / YELLOW / BLUE 컬러블록과 Archivo Black으로 완성한 MZ 커플용 볼드 청첩장",
    category: "event",
    tier: "standard",
    industry: "MZ 커플 / 결혼식",
    duration: "1주",
    order: 12,
    demoUrl: "/demos/wedding-vivid",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Archivo Black", "CSS Grid"],
    description:
      "레드·옐로·블루 3색 컬러블록을 히어로 전체에 풀블리드로 깔고, 큰 Archivo Black 타이포에 mix-blend-mode: difference를 적용해 배경 색이 바뀌어도 텍스트가 선명하게 읽히도록 설계한 MZ 커플 청첩장 데모입니다. 섹션마다 배경이 흰색 → 블랙 → 옐로 → 블루 → 레드로 바뀌며 매거진 컬러블록 인상을 줍니다. RSVP Mock 폼, 계좌 복사 버튼, D-day 카운트다운, 카카오맵까지 7섹션을 단일 라우트에 담았습니다.",
    thumbnail: wvHeroUrl,
    highlights: [
      {
        title: "3분할 컬러블록 히어로 (RYB)",
        description: "히어로를 Red / Yellow / Blue 3개 block으로 나누고 그 위에 mix-blend-mode: difference로 큰 타이포를 얹어, 배경 색과 무관하게 텍스트가 자동 반전되어 읽힙니다.",
      },
      {
        title: "섹션 단위 컬러블록 매거진",
        description: "Greeting(블랙) / Gallery(화이트) / Venue(옐로) / RSVP(블루) / Account(화이트) / Footer(레드) — 섹션이 바뀔 때마다 배경과 액센트 색이 바뀌어 매거진 컬러블록 느낌을 줍니다.",
      },
      {
        title: "RSVP Mock 폼 + 성공 모달",
        description: "블루 섹션 위에 투명 인풋 + 옐로 CTA로 구성된 폼. 제출 시 옐로 모달이 떠오르고 ESC·백드롭·닫기 버튼 모두 지원합니다.",
      },
      {
        title: "계좌 복사 + 토스트",
        description: "양가 계좌 카드에 'Copy' 버튼을 두고 navigator.clipboard + textarea fallback으로 모든 환경에서 복사되도록 구성. 복사 후 하단 토스트로 피드백합니다.",
      },
      {
        title: "D-day 카운트다운 (히어로 하단)",
        description: "히어로 우측 하단에 4셀 카운트다운을 배치하고, 1초마다 갱신합니다. tabular-nums로 떨림을 막았습니다.",
      },
    ],
  },
  {
    slug: "reunion-retro",
    title: "동창회 초대장",
    subtitle: "타자기 폰트와 세피아 톤으로 완성한 빈티지 레트로 동창회 초대장",
    category: "event",
    tier: "standard",
    industry: "동창회 / 모임",
    duration: "1주",
    order: 13,
    demoUrl: "/demos/reunion-retro",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Special Elite", "Lora"],
    description:
      "Special Elite 타자기 폰트와 Lora 세리프, 크림/브라운/빈티지 레드 색상으로 빈티지 레트로 동창회 초대장을 만들었습니다. 시그니처는 '20년을 4프레임으로' 추억 타임라인 — 2005/2010/2015/2020 4개 마일스톤을 좌우 교차 레이아웃으로 배치하고 모든 사진에 sepia 필터를 적용해 빈티지 인상을 강화했습니다. 빈티지 스탬프형 D-day, 종이 텍스처 배경, RSVP Mock 폼까지 6섹션을 단일 라우트에 담았습니다.",
    thumbnail: rrHeroUrl,
    highlights: [
      {
        title: "추억 타임라인 (시그니처)",
        description: "2005/2010/2015/2020 4개 연도 카드를 중앙선 기준 좌우 교차로 배치. 각 카드는 연도 / 한글 제목 / 영문 제목 / 본문으로 구성되고 사진에는 sepia 필터가 들어갑니다. 진입 시 좌우에서 슬라이드인.",
      },
      {
        title: "타자기 + 세리프 하이브리드",
        description: "Special Elite(타자기)를 디스플레이/eyebrow/D-day, Lora(세리프)를 본문에 배치해 빈티지 신문 같은 톤을 만들었습니다.",
      },
      {
        title: "빈티지 스탬프 D-day",
        description: "히어로 하단의 D-day는 -2° 기울어진 빈티지 스탬프 박스 안에 4셀 카운트다운으로 표현. 2px 솔리드 빈티지 레드 보더로 인쇄물 느낌을 살렸습니다.",
      },
      {
        title: "종이 텍스처 배경",
        description: "옅은 brown radial-gradient 두 개를 겹쳐 종이 위에 인쇄된 듯한 미세 텍스처를 만들었습니다. 외부 이미지 없이 CSS만으로 처리.",
      },
      {
        title: "RSVP Mock + 빈티지 스탬프 모달",
        description: "참석 여부 + 인원 Mock 폼. 제출 시 -1° 기울어진 빈티지 종이 모달이 떠오르며 'RECEIVED' 빈티지 스탬프 라벨과 함께 안내합니다.",
      },
    ],
  },
  {
    slug: "openhouse-arch",
    title: "오픈하우스 초대장",
    subtitle: "미니멀 아키텍처 모노톤과 그레이스케일 공간 그리드로 완성한 스튜디오 오픈하우스",
    category: "event",
    tier: "standard",
    industry: "건축 / 스튜디오 오프닝",
    duration: "1주",
    order: 14,
    demoUrl: "/demos/openhouse-arch",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Space Grotesk", "Inter"],
    description:
      "Studio Norra 가상 스튜디오의 3일간 오픈하우스 초대장 데모입니다. Space Grotesk + Inter를 모노톤 위에 배치한 미니멀 아키텍처 톤으로, 섹션마다 큰 번호(01/02/03/04)와 가는 보더로 매거진 같은 정보 위계를 만들었습니다. 시그니처는 공간 카드 그리드(Entrance/Main Hall/Meeting Room) 3개로, 그레이스케일 사진이 hover 시 컬러가 복원됩니다. 시간대 선택 RSVP Mock 폼, 카카오맵까지 5섹션을 단일 라우트에 담았습니다.",
    thumbnail: ohHeroUrl,
    highlights: [
      {
        title: "공간 카드 그리드 (시그니처)",
        description: "Entrance / Main Hall / Meeting Room 3개 공간을 4:5 비율 사진과 코드/한영 병기 라벨로 정리. 평소엔 grayscale(15%) 살짝 흐리게, hover 시 grayscale(0)로 컬러가 복원되며 미세 줌이 동시에 작동합니다.",
      },
      {
        title: "번호 + 보더 매거진 헤더",
        description: "각 섹션 헤더에 큰 번호(01~04)와 1px 블랙 보더를 두어 매거진 페이지 같은 정보 위계를 만듭니다. 한영 병기 부제목은 작은 모노스페이스로 처리.",
      },
      {
        title: "시간대 선택 RSVP",
        description: "5개 시간대(14:00~19:00) 토글 버튼 + 이름 입력 폼. 클릭 시 활성 칩이 블랙 인버스로 바뀌고, 제출 시 모달이 선택한 시간대를 함께 표시합니다.",
      },
      {
        title: "다크 인포 카드 + 카카오맵",
        description: "Schedule / Hours / Venue 3행을 다크 인버스 카드로 묶어 미니멀 톤 안에서 정보 밀도를 높였습니다. 우측에는 4:3 카카오맵을 배치.",
      },
      {
        title: "Space Grotesk 디스플레이 타이포",
        description: "Space Grotesk Medium을 디스플레이 전반에 사용하고, Inter를 본문에 배치해 건축 잡지 같은 톤을 유지합니다.",
      },
    ],
  },
  {
    slug: "wedding-cinematic",
    title: "영화 포스터 청첩장",
    subtitle: "시네마틱 다크 톤과 영화 메타데이터·엔딩 크레딧으로 풀어낸 트렌디 차별화 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 15,
    demoUrl: "/demos/wedding-cinematic",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Bebas Neue", "JetBrains Mono"],
    description:
      "딥 블랙과 시네마틱 골드 위에 Bebas Neue 큰 타이포로 만든 영화 포스터 청첩장 데모입니다. 가상 영화사 'PIXELMARK PICTURES PRESENTS'로 시작해 신랑신부 이름이 영화 제목처럼 등장하고, 영화 예고편 스타일로 단계별 reveal됩니다. 영화 메타데이터 시트(Director/Starring/Genre/Runtime), 영화 엔딩 크레딧 자동 스크롤(hover 일시정지), 시놉시스 드롭캡, 시네마틱 D-day까지 6섹션을 단일 라우트에 담았습니다.",
    thumbnail: wcineHeroUrl,
    highlights: [
      {
        title: "영화 예고편 스타일 단계별 reveal",
        description: "히어로 텍스트가 6단계로 시간차 reveal됩니다. 'PRESENTS' → 제목 → 부제 → 태그라인 → 등급 → 개봉일 순서로 cumulative 딜레이(0/600/1400/2200ms...)가 적용됩니다.",
      },
      {
        title: "영화 메타데이터 시트",
        description: "Director / Starring / Genre / Runtime / Rating / Studio 6행 정보 시트. 골드 보더와 모노스페이스 라벨로 IMDB 페이지 같은 톤을 만들었습니다.",
      },
      {
        title: "엔딩 크레딧 자동 스크롤 (시그니처)",
        description: "32초 사이클로 위→아래 흐르는 영화 엔딩 크레딧. mask-image로 위/아래 페이드, hover 시 animation-play-state: paused로 일시정지. 마지막은 'FIN.' 골드 마크로 마무리.",
      },
      {
        title: "시놉시스 드롭캡",
        description: "각 시놉시스 문단의 첫 글자를 큰 골드 드롭캡으로 처리해 잡지 같은 톤을 더했습니다.",
      },
      {
        title: "시네마틱 D-day + 그레이스케일 카카오맵",
        description: "Showtime 섹션에 골드 카운트다운과 grayscale(60%) 처리한 카카오맵을 배치해 시네마틱 톤을 끝까지 유지합니다.",
      },
    ],
  },
  {
    slug: "wedding-magazine",
    title: "잡지 커버 청첩장",
    subtitle: "VOGUE 스타일 매거진 커버와 에디토리얼 컬럼 레이아웃으로 풀어낸 시크 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 16,
    demoUrl: "/demos/wedding-magazine",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Bodoni Moda", "CSS Columns"],
    description:
      "Bodoni Moda 세리프 디스플레이와 Inter 본문, 화이트 + 블랙 + VOGUE 레드 + 페이퍼 베이지로 잡지 커버 같은 청첩장을 만들었습니다. 시그니처는 풀페이지 매거진 커버 — 마스트헤드, 큰 타이포 신랑신부 이름, EXCLUSIVE/INSIDE/PLUS cover lines, 가격(PRICELESS)과 바코드까지 잡지 표지의 시각 코드를 그대로 옮겼습니다. 에디토리얼 컬럼 레이아웃(CSS columns + 골드 드롭캡), 페이지 번호 마커, 4프레임 photo editorial까지 6섹션을 단일 라우트에 담았습니다.",
    thumbnail: wmagHeroUrl,
    highlights: [
      {
        title: "매거진 커버 (시그니처)",
        description: "마스트헤드(PIXELMARK EDITORIAL) + ISSUE No.01 + 큰 BODONI 타이포 신랑신부 이름 + 'EXCLUSIVE / INSIDE / PLUS' cover lines + PRICELESS 가격 + 바코드까지, VOGUE/ELLE 표지의 시각 코드를 그대로 옮겼습니다.",
      },
      {
        title: "CSS columns 에디토리얼",
        description: "에디토리얼 본문에 CSS columns를 적용해 잡지 컬럼 레이아웃을 만들고, 첫 단락 첫 글자에 큰 빨간 드롭캡을 적용했습니다. 헤드라인은 column-span: all로 양 컬럼을 가로지릅니다.",
      },
      {
        title: "페이지 번호 마커",
        description: "각 섹션 상단에 'PAGE 02 / EDITORIAL / ISSUE No.01' 형식의 페이지 번호 마커를 두어 잡지 페이지를 넘기는 듯한 흐름을 만들었습니다.",
      },
      {
        title: "4프레임 photo editorial 그리드",
        description: "에디토리얼 사진을 № 01~04 매거진 넘버링과 함께 2×2 그리드로 배치. hover 시 미세 줌이 작동하고, 각 항목엔 작은 캡션이 들어갑니다.",
      },
      {
        title: "Subscribe 카드 + 다크 인버스",
        description: "마지막 RSVP 섹션을 'Subscribe to the Story' 잡지 구독 카드로 표현. 다크 배경에 빨간 RSVP CTA로 인쇄물에서 디지털로 전환되는 느낌을 줍니다.",
      },
    ],
  },
  {
    slug: "wedding-hanji",
    title: "한지 전통 청첩장",
    subtitle: "한지 종이 텍스처와 단청, 세로쓰기 한자로 풀어낸 한국 전통 혼례 청첩장",
    category: "event",
    tier: "standard",
    industry: "전통혼례 / 한옥 웨딩",
    duration: "1주",
    order: 17,
    demoUrl: "/demos/wedding-hanji",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Noto Serif KR", "writing-mode"],
    description:
      "한지 베이지(#F5EFE0) + 먹색(#2D2416) + 단청 적/녹/금 색상으로 한국 전통 혼례 청첩장을 만들었습니다. 시그니처는 히어로의 세로쓰기 한자 이름 — `writing-mode: vertical-rl`과 `text-orientation: upright`로 한자가 위에서 아래로 흐르도록 배치했습니다. 단청 3색 디바이더, 한지 종이 텍스처(CSS radial-gradient), 한자(日/時/分/秒) 카운트다운, 한복/한옥/다례 갤러리, 양가 계좌 카드까지 6섹션을 단일 라우트에 담았습니다.",
    thumbnail: whanHeroUrl,
    highlights: [
      {
        title: "세로쓰기 한자 이름 (시그니처)",
        description: "히어로에 신랑신부 한자 이름을 `writing-mode: vertical-rl` + `text-orientation: upright`로 세로 배치. Noto Serif KR로 단정하면서도 격조 있는 인상을 줍니다.",
      },
      {
        title: "단청 3색 디바이더",
        description: "각 섹션 헤더 아래에 적색·금색·녹색 3색 가는 막대로 단청 색감을 추상화한 디바이더를 배치해 한국 전통 색채를 일관되게 가져갑니다.",
      },
      {
        title: "한지 종이 텍스처 배경",
        description: "외부 이미지 없이 CSS radial-gradient 3개를 겹쳐 한지 종이의 자연스러운 얼룩을 표현했습니다. 단청 3색의 옅은 톤이 배경에 미세하게 비칩니다.",
      },
      {
        title: "한자 카운트다운 (日時分秒)",
        description: "결혼식까지 남은 시간을 日(일)/時(시)/分(분)/秒(초) 한자 라벨로 표시. tabular-nums로 떨림을 막고, 한지 단청 톤을 끝까지 유지합니다.",
      },
      {
        title: "한복 / 한옥 / 다례 3프레임 갤러리",
        description: "한복 의상, 한옥 공간, 다례 장면을 一·二·三 한자 넘버링과 함께 3카드 그리드로 정리. 인물 얼굴 없이 전통 미감을 전달합니다.",
      },
    ],
  },
  {
    slug: "wedding-vinyl",
    title: "LP 청첩장",
    subtitle: "회전하는 LP 디스크와 A/B면 트랙리스트로 청첩장을 음반 한 장처럼 풀어낸 빈티지 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 18,
    demoUrl: "/demos/wedding-vinyl",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Antic Didone", "CSS animation"],
    description:
      "다크 블랙과 크림 + 빈티지 골드/레드로 LP 음반 같은 청첩장을 만들었습니다. 시그니처는 히어로의 회전하는 LP 디스크 — CSS infinite spin으로 18초 한 사이클씩 돌고, 가운데 spindle hole까지 디테일을 살렸습니다. A면(Save the Date / How We Met / First Dance...)과 B면(Promise / Walking Home / The Ceremony...) 5트랙씩 가상 곡명으로 청첩장 정보를 표현하고, Antic Didone 세리프와 JetBrains Mono를 결합해 LP 슬리브 인쇄물 같은 톤을 냈습니다. 6 섹션을 단일 라우트에 담았습니다.",
    thumbnail: wvnyHeroUrl,
    highlights: [
      {
        title: "회전하는 LP 디스크 (시그니처)",
        description: "히어로에 LP 디스크 + 앨범 슬리브 더블 레이어. 디스크는 CSS @keyframes로 18초 한 사이클씩 무한 회전, 가운데 spindle hole과 깊은 그림자로 실제 LP 같은 입체감을 만들었습니다. prefers-reduced-motion 시 정지.",
      },
      {
        title: "A면 / B면 트랙리스트",
        description: "Side A 5곡(Save the Date, How We Met, First Dance...) + Side B 5곡(Promise, Walking Home, The Ceremony...)으로 청첩장의 모든 정보를 가상 곡명과 러닝타임으로 표현했습니다.",
      },
      {
        title: "Liner Notes 카드",
        description: "LP 슬리브 안쪽에 적힌 짧은 글처럼, 골드 이탤릭 인용구와 본문 두 단락으로 인사글을 매거진 톤으로 풀어냈습니다.",
      },
      {
        title: "B-Roll 갤러리 (턴테이블/카세트/헤드폰)",
        description: "음악 감성 사물 3컷을 sepia 필터와 함께 바이올린 같은 카드 그리드로 배치. 각 카드엔 № 01~03 모노스페이스 라벨이 들어갑니다.",
      },
      {
        title: "Release Party 정보 + 골드 카운트다운",
        description: "결혼식을 'Release Party'로 표현. 골드 보더 인포 카드 + 시네마틱 카운트다운 + sepia 카카오맵으로 빈티지 톤을 끝까지 유지합니다.",
      },
    ],
  },
  {
    slug: "wedding-pixel",
    title: "게임 청첩장",
    subtitle: "8비트 픽셀 + 게임 UI로 청첩장을 한 편의 RPG처럼 풀어낸 트렌디 차별화 데모",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 19,
    demoUrl: "/demos/wedding-pixel",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Press Start 2P", "image-rendering"],
    description:
      "다크 네이비 + 크림 + 옐로/레드/그린의 8비트 게임 팔레트와 Press Start 2P 픽셀 폰트로, 청첩장을 한 편의 RPG처럼 풀어낸 트렌디 차별화 데모입니다. 시그니처는 PRESS START 깜빡임이 있는 게임 타이틀 화면과 글자가 한 자씩 타이핑되는 게임 대화창. STAGE 01 STORY → STAGE 02 QUEST → STAGE 03 PARTY → STAGE 04 REWARD → CONTINUE? RSVP 6 스테이지로 청첩장 정보를 게임 컨셉으로 재구성했습니다. 'GAME CLEAR' 모달과 픽셀 카드 보더(4px + 8px shadow)까지 끝까지 게이머 톤을 유지합니다.",
    thumbnail: wpixHeroUrl,
    highlights: [
      {
        title: "픽셀 타이틀 화면 + PRESS START",
        description: "Press Start 2P 픽셀 폰트, 6px 빨간 도트 그림자 타이포, P1/P2 캐릭터 슬롯, 1.4초 깜빡임 PRESS START 텍스트로 8비트 게임 타이틀 화면을 그대로 옮겼습니다.",
      },
      {
        title: "게임 대화창 typing 효과 (시그니처)",
        description: "STAGE 01 Story 섹션의 6라인 대화가 진입 시 35ms 간격으로 한 글자씩 타이핑됩니다. 진행 중인 라인엔 깜빡이는 ▌커서가 표시되고, 다음 라인은 600ms 텀 후 시작.",
      },
      {
        title: "FINAL QUEST 카드 + 픽셀 카운트다운",
        description: "결혼식을 FINAL QUEST로 표현. Date / Location / Objective / Reward / Difficulty 5행 + 4셀 픽셀 카운트다운 + hue-rotate된 카카오맵으로 RPG 퀘스트 시트 톤을 만들었습니다.",
      },
      {
        title: "PARTY 멤버 카드 (HP/MP 게이지)",
        description: "신랑/신부/식장을 RPG 파티 멤버로 표현. CLASS 라벨 + LV.30 + HP/MP 게이지 바까지 게임 캐릭터 시트 그대로 모방했습니다.",
      },
      {
        title: "GAME CLEAR 모달 + 픽셀 버튼",
        description: "RSVP는 'CONTINUE? JOIN THE QUEST' 폼. 픽셀 보더 + 4px shadow 버튼이 클릭 시 살짝 눌리는 transform 효과로 8비트 버튼 감각을 재현했습니다. 제출 시 ★ GAME CLEAR ★ 모달이 떠오릅니다.",
      },
    ],
  },
  {
    slug: "wedding-postal",
    title: "우편 청첩장",
    subtitle: "봉투가 열리며 손글씨 편지가 미끄러져 나오는 빈티지 항공우편 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 21,
    demoUrl: "/demos/wedding-postal",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Caveat", "transform-style"],
    description:
      "크라프트 베이지 + 잉크 + 우표 빨강 + 항공우편 블루 4색으로 빈티지 항공우편 청첩장을 만들었습니다. 시그니처는 봉투 오픈 인터랙션 — 페이지 진입 1.2초 후 봉투 flap이 자동으로 위로 회전(rotateX 180°)하고 안에서 손글씨 편지가 슬라이드업으로 미끄러져 나옵니다. 클릭 시 다시 접거나 펼 수 있습니다. Caveat 손글씨 편지 본문, 4개 도시 빈티지 엽서 카드(Provence/Lisbon/Kyoto/Seoul), 우표 도장과 sepia 카카오맵까지 5섹션을 단일 라우트에 담았습니다.",
    thumbnail: wpostHeroUrl,
    highlights: [
      {
        title: "봉투 오픈 인터랙션 (시그니처)",
        description: "rotateX 180°로 봉투 flap이 자동 열리고, 편지가 translateY로 슬라이드업합니다. 클릭으로 토글 가능. perspective + cubic-bezier easing으로 입체감을 살렸습니다.",
      },
      {
        title: "항공우편 빨강·파랑 보더",
        description: "border-image의 repeating-linear-gradient로 PAR AVION 항공우편 봉투 특유의 빨강·파랑 줄무늬 보더를 CSS만으로 구현했습니다.",
      },
      {
        title: "Caveat 손글씨 편지 본문",
        description: "Letter 섹션 전체를 Caveat 손글씨 폰트로 작성. 시작/끝에 빨강·파랑 줄무늬가 있는 카드 안에 4문단 편지와 손글씨 서명을 담았습니다.",
      },
      {
        title: "도시 엽서 4프레임 (살짝 기울임)",
        description: "Provence / Lisbon / Kyoto / Seoul 네 도시 엽서를 ±1° 기울어진 카드로 배치. hover 시 0°로 펴지고, 우표 도장 원형 마크와 손글씨 캡션이 들어갑니다.",
      },
      {
        title: "우표 도장 + sepia 카카오맵",
        description: "Destination 섹션에 'POSTED MAY 04 2026' 도장 마크와 sepia 처리된 카카오맵으로 빈티지 우편 톤을 끝까지 유지합니다.",
      },
    ],
  },
  {
    slug: "wedding-storybook",
    title: "동화책 청첩장",
    subtitle: "동화책 표지와 챕터 스프레드, 손글씨 본문으로 풀어낸 따뜻한 그림책 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 22,
    demoUrl: "/demos/wedding-storybook",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Caveat", "Fraunces"],
    description:
      "크림 + 브라운 + 살구 + 세이지의 동화책 팔레트와 Caveat 손글씨 + Fraunces 세리프로, 청첩장을 한 권의 그림책처럼 풀어낸 데모입니다. 시그니처는 첫 화면의 동화책 표지(8px 살구 좌측 보더 + 깊은 그림자) — 제목 / 저자 / Once upon a time… 태그라인까지 진짜 책 표지 그대로입니다. 챕터 I/II는 좌우 스프레드(텍스트 + 일러스트)로 페이지 가운데에 fold 그림자가 들어가고, 짝수 챕터는 자동으로 좌우가 반전됩니다. Happily Ever After RSVP 모달까지 6 챕터를 단일 라우트에 담았습니다.",
    thumbnail: wbookHeroUrl,
    highlights: [
      {
        title: "동화책 표지 (시그니처)",
        description: "8px 살구 좌측 보더와 깊은 그림자(0 32px 80px)를 가진 책 표지 카드. 출판사명(Pixelmark Storybooks) + 일러스트 + 큰 세리프 제목 + 손글씨 저자 + 'Once upon a time...' 태그라인까지, 그림책 표지의 시각 코드를 그대로 옮겼습니다.",
      },
      {
        title: "챕터 좌우 스프레드 + fold 그림자",
        description: "각 챕터를 텍스트 페이지 + 이미지 페이지의 좌우 스프레드로 구성. 페이지 가운데(text 페이지의 가까운 쪽 가장자리)에 linear-gradient fold 그림자를 주어 진짜 펼친 책 같은 입체감을 만들었습니다.",
      },
      {
        title: "짝수 챕터 좌우 반전",
        description: ".wbook-chapter-spread--reverse 클래스로 짝수 챕터는 이미지/텍스트 위치가 자동 반전되어, 페이지를 넘기는 듯한 리듬감을 줍니다.",
      },
      {
        title: "Caveat 손글씨 본문 + Fraunces 디스플레이",
        description: "챕터 본문은 Caveat 손글씨로 22px 큰 사이즈 작성, 챕터 제목과 정보 카드는 Fraunces 디스플레이 세리프로 배치해 손글씨와 인쇄물의 질감을 함께 살렸습니다.",
      },
      {
        title: "Happily Ever After RSVP 모달",
        description: "RSVP 폼 제출 시 살구색 좌측 보더가 들어간 'Happily Ever After' 모달이 떠오릅니다. 'your name is now part of the story'라는 손글씨 메시지가 동화책 흐름을 마무리합니다.",
      },
    ],
  },
  {
    slug: "fashion-lookbook",
    title: "패션 브랜드 룩북",
    subtitle: "Inter Tight 큰 산세리프와 풀스크린 룩북 슬라이더로 완성한 모던 미니멀 패션 브랜드",
    category: "brand",
    tier: "standard",
    industry: "패션 / 의류 브랜드",
    duration: "1주",
    order: 23,
    demoUrl: "/demos/fashion-lookbook",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Inter Tight", "Pointer Events"],
    description:
      "화이트 + 블랙의 모노톤 위에 Inter Tight 큰 산세리프를 얹어 모던 미니멀 패션 브랜드 'Noir Atelier'의 SS 26 룩북을 만들었습니다. 시그니처는 풀스크린 룩북 슬라이더 — Pointer Events 기반 드래그/스와이프, 키보드 화살표, 좌우 네비 버튼, 가는 막대 dot 인디케이터, 그리고 큰 카운터까지 외부 라이브러리 없이 직접 구현했습니다. 풀스크린 히어로 + 룩북 5컷 + 컬렉션 정보 비대칭 그리드 + 매장 카드 + grayscale 카카오맵까지 5섹션을 단일 라우트에 담았습니다.",
    thumbnail: flbHeroUrl,
    highlights: [
      {
        title: "풀스크린 룩북 슬라이더 (시그니처)",
        description: "Pointer Events로 모바일 스와이프와 PC 드래그를 동시에 지원하는 직접 구현 슬라이더. 22% 임계값 스냅, 키보드 화살표, 좌우 네비 버튼, 가는 막대 dot 인디케이터, 큰 카운터(01/05)까지.",
      },
      {
        title: "Inter Tight 700~900 큰 타이포",
        description: "히어로 브랜드명에 clamp(56px, 11vw, 168px)의 거대 Inter Tight ExtraBold를 사용해 패션 브랜드 특유의 임팩트를 만들었습니다. -0.04em letter-spacing으로 글자가 빽빽하게 붙어 있습니다.",
      },
      {
        title: "룩 번호 + 캡션 오버레이",
        description: "각 룩 슬라이드 좌상단에 'LOOK 01' 라벨, 하단에 제목/설명이 어두운 오버레이로 들어갑니다. 룩별 디테일을 사진 위에 직접 표시.",
      },
      {
        title: "비대칭 컬렉션 정보 그리드",
        description: "Collection 섹션을 좌측 본문 + 우측 메타 시트로 비대칭 배치. Designer / Season / Pieces / Made In 4행 메타 시트가 잡지 같은 정보 위계를 만듭니다.",
      },
      {
        title: "Grayscale 카카오맵 + 매장 카드",
        description: "Stores 섹션에 1px 블랙 보더 매장 카드 2개와 grayscale 카카오맵을 21:9 와이드 비율로 배치해 흑백 룩북 톤을 끝까지 유지합니다.",
      },
    ],
  },
  {
    slug: "food-magazine",
    title: "식품 브랜드 매거진",
    subtitle: "Cormorant Garamond 디스플레이와 손글씨 액센트로 완성한 따뜻한 자연주의 식품 매거진",
    category: "brand",
    tier: "standard",
    industry: "식품 / 베이커리 브랜드",
    duration: "1주",
    order: 24,
    demoUrl: "/demos/food-magazine",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "React Router 7", "Cormorant Garamond", "Caveat"],
    description:
      "강원도 작은 농장의 식료품을 다루는 가상 브랜드 'Verde Provisions'의 매거진형 카탈로그입니다. 부모 layout이 SCSS와 사이트 chrome을 한 번만 import하고, 그 아래 홈 / 제품 / 스토리 3개 sub-route가 페이드 전환으로 이어집니다. Cormorant Garamond 디스플레이 세리프 + Caveat 손글씨 액센트 + Inter 본문이 따뜻한 자연주의 톤을 만들고, 크림(#FCF8F3) + 다크 브라운 + 세이지 그린 + 테라코타 4색만으로 매거진의 격조를 유지합니다.",
    thumbnail: fmagHeroUrl,
    highlights: [
      {
        title: "부모 layout + 3 sub-route 페이드 전환",
        description: "_food-magazine.tsx 부모 layout이 SCSS와 사이트 헤더 / 푸터 / scrollReveal을 담당하고, useLocation으로 sub-route 변경을 감지해 .fmag-page에 .is-leaving 클래스를 부여 → opacity transition으로 부드럽게 전환됩니다.",
      },
      {
        title: "Cormorant Garamond + Caveat 매거진 타이포",
        description: "히어로 타이틀에 clamp(56px, 9vw, 132px)의 Cormorant Garamond 디스플레이 세리프를 사용하고, 한국어 부제는 Caveat 손글씨로 색감(테라코타)까지 분리해 따뜻한 페미닌 톤을 잡았습니다.",
      },
      {
        title: "Story 매거진 스프레드 좌우 교차",
        description: "스토리 페이지의 챕터 스프레드를 좌측 텍스트 + 우측 이미지로 배치하고, :nth-child(even)으로 다음 챕터는 자동으로 좌우 반전됩니다. 이미지가 IntersectionObserver로 뷰포트에 들어오면 1.04 → 1.0 스케일로 천천히 풀립니다.",
      },
      {
        title: "Cormorant 이탤릭 마퀴 + 자연주의 컬러",
        description: "홈 페이지 중간에 GRAIN · HONEY · JAM · BREAD · GRANOLA · TEA를 Cormorant 이탤릭 96px로 흘리는 마퀴 라인을 두어, 매거진형 카탈로그 특유의 식료품 인덱스 감각을 만들었습니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "브랜드명 / 슬로건 / 챕터 라벨 등 디스플레이는 영문으로 유지하면서, 본문 / 제품 설명 / 농장 이야기 / 매장 안내는 모두 한국어를 메인으로 작성해 한국 손님이 정보를 그대로 읽을 수 있게 했습니다.",
      },
    ],
  },
  {
    slug: "living-modern",
    title: "가구/리빙 브랜드 카탈로그",
    subtitle: "베이지 + 우드 + 세이지의 모던 자연주의로 완성한 가구 브랜드 매거진형 카탈로그",
    category: "brand",
    tier: "standard",
    industry: "가구 / 리빙 브랜드",
    duration: "1주",
    order: 25,
    demoUrl: "/demos/living-modern",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "Cormorant Garamond", "Intersection Observer"],
    description:
      "강원도 작은 농장이 아닌 한남 쇼룸에서 시작되는 가상 가구 브랜드 'Maison Brisé'의 카탈로그입니다. 풀스크린 인테리어 히어로 → 룸별 매거진 비대칭 그리드 → 시즌 컬렉션 카드 → 한남 쇼룸 안내까지 5섹션 원페이지로 묶었습니다. Cormorant Garamond 디스플레이 이탤릭과 베이지(#F4F0E8) + 다크우드(#2D261C) + 세이지(#7B8B6F) + 캐러멜 우드(#8C7B5E) 4색 팔레트로 모던 자연주의 톤을 일관되게 유지합니다.",
    thumbnail: lvmHeroUrl,
    highlights: [
      {
        title: "룸별 매거진 비대칭 그리드 (시그니처)",
        description: "거실/침실/주방 3개 룸을 메인 사진(4:3, 1.4fr) + 디테일 사진(1:1, 0.8fr) 비대칭 그리드로 배치하고, :nth-child(even)으로 짝수번 룸은 자동으로 좌우가 반전됩니다. 매거진 스프레드 같은 리듬을 만듭니다.",
      },
      {
        title: "Cormorant Garamond 이탤릭 히어로 + 8s zoom",
        description: "히어로 브랜드명에 clamp(56px, 9vw, 132px)의 Cormorant Garamond 이탤릭을 얹고, 배경 인테리어 사진은 1.06 → 1.0 스케일을 8초에 걸쳐 천천히 풀어 시네마틱한 첫 인상을 줍니다.",
      },
      {
        title: "Collection 카드 hover 그림자 + 가격 액센트",
        description: "시즌 컬렉션 4점 카드는 hover 시 24px / 64px 부드러운 그림자가 생기고 4px 위로 떠오릅니다. 하단 메타에는 가구 사이즈와 함께 캐러멜 색의 가격 표기를 분리해 카탈로그 정보 위계를 명확히 했습니다.",
      },
      {
        title: "Grayscale 카카오맵 + 한남 쇼룸 카드",
        description: "쇼룸 섹션은 화이트 카드(주소·운영시간·전화·방문 안내) + filter:grayscale(0.5) 카카오맵 2-column 구성으로, 흑백톤을 끝까지 유지하면서 매장 정보를 깔끔하게 노출합니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "브랜드명·슬로건·룸 라벨 등 디스플레이는 영문으로 유지하고, 룸 캡션·컬렉션 본문·쇼룸 안내·푸터 disclaimer는 모두 한국어 메인으로 작성해 한국 손님이 정보를 그대로 읽을 수 있게 했습니다.",
      },
    ],
  },
  {
    slug: "bakery-pastel",
    title: "베이커리 / 디저트 전문점",
    subtitle: "파스텔 핑크 + 크림 화이트로 완성한 사랑스러운 디저트 베이커리 원페이지 데모",
    category: "fnb",
    tier: "standard",
    industry: "베이커리 / 디저트",
    duration: "1주",
    order: 26,
    demoUrl: "/demos/bakery-pastel",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "IntersectionObserver", "Custom Lightbox"],
    description:
      "한남동의 작은 베이커리 'Maison Crème'를 위한 사랑스러운 파스텔 톤 데모입니다. 풀스크린 히어로 → About → 시그니처 메뉴 3종 → 마소닉 갤러리 → 매장 안내 → 푸터로 이어지는 6섹션을, 크림 화이트(#FFF9F5) + 코랄 핑크(#F4A6A6) + 피치 + 캐러멜 4색 팔레트로 묶었습니다. 디저트 사진이 주인공이 되도록 둥근 모서리(border-radius 24px)와 넉넉한 여백을 유지합니다.",
    thumbnail: bpHeroUrl,
    highlights: [
      {
        title: "마소닉 갤러리 + 직접 구현 라이트박스",
        description: "갤러리 5컷을 4-column grid에 wide(2칸)/tall(2행)/normal로 비대칭 배치한 마소닉 레이아웃. 라이트박스는 외부 라이브러리 없이 직접 구현 — 좌우 화살표 / ESC 닫기 / 키보드 조작 / 카운터까지 모두 vanilla TS로 작성했습니다.",
      },
      {
        title: "Cormorant Garamond 이탤릭 + Quicksand 본문",
        description: "히어로 브랜드명에 clamp(48px, 9vw, 132px)의 Cormorant 이탤릭을, 본문은 Quicksand 라운드 산세리프를 사용해 사랑스럽고 부드러운 베이커리 톤을 만들었습니다.",
      },
      {
        title: "히어로 18s 호흡 zoom 애니메이션",
        description: "히어로 배경이 scale 1.05 ↔ 1.12를 18초에 걸쳐 천천히 왕복합니다. ease-in-out alternate로 호흡 같은 리듬을 만들고, prefers-reduced-motion 시 비활성됩니다.",
      },
      {
        title: "시그니처 카드 그림자 hover + dashed 가격 라인",
        description: "시그니처 메뉴 3종 카드는 hover 시 4 → 24px 그림자 + 6px 떠오름 효과. 가격은 dashed 1px 라인으로 분리해 캐러멜 색으로 강조했습니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "브랜드명·시그니처 영문 메뉴명·섹션 헤딩 등 디스플레이는 영문 OK, 본문 / 메뉴 설명 / 가격 / 매장 안내 / 영업시간 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "winebar-darklux",
    title: "와인바 / 펍 다크 럭셔리",
    subtitle: "딥 블랙 + 시네마틱 골드 + 와인 레드로 완성한 어른의 멀티페이지 와인바 데모",
    category: "fnb",
    tier: "standard",
    industry: "와인바 / 펍",
    duration: "1주",
    order: 27,
    demoUrl: "/demos/winebar-darklux",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "React Router 7", "Cormorant Garamond"],
    description:
      "한남동 지하의 가상 와인바 'Verres Noirs'의 멀티페이지 데모입니다. 부모 layout이 SCSS와 사이트 chrome / 스크롤 reveal / 메뉴 탭 모듈을 한 번에 묶고, 그 아래 홈 / 메뉴 / 예약 안내 3개 sub-route가 페이드 전환으로 이어집니다. 딥 블랙(#0F0A0A) + 시네마틱 골드(#D4AF37) + 와인 레드(#722F37) 3색 팔레트와 Cormorant Garamond 이탤릭 디스플레이로 어른의 다크 럭셔리 톤을 끝까지 유지합니다.",
    thumbnail: wbdHeroUrl,
    highlights: [
      {
        title: "부모 layout + 3 sub-route 페이드 전환",
        description: "_winebar-darklux.tsx 부모가 SCSS · scrollReveal · 메뉴 탭 모듈을 모두 담당하고, useLocation으로 sub-route 변경을 감지해 .wbd-page에 .is-leaving을 잠깐 부여 → opacity transition으로 부드럽게 페이드합니다.",
      },
      {
        title: "메뉴 탭 underline 슬라이드 (시그니처)",
        description: "Wine / Cocktail / Snack 카테고리 탭은 클릭 시 해당 패널이 fadeIn으로 교체되고, 활성 탭의 골드 underline이 width 0 → 100%로 0.35s ease 슬라이드 됩니다. 외부 라이브러리 없이 vanilla TS 모듈로 직접 구현.",
      },
      {
        title: "Cormorant Garamond 이탤릭 골드 히어로 + 22s zoom",
        description: "히어로 브랜드명을 clamp(56px, 10vw, 144px)의 Cormorant 이탤릭 골드로 얹고, 어두운 매장 배경은 22초에 걸쳐 1.08 → 1.16 스케일로 천천히 호흡합니다. shadow 30px로 골드를 더 또렷이 띄웁니다.",
      },
      {
        title: "Dashed 라인 와인 리스트 + 시그니처 추천",
        description: "메뉴 항목은 잡지 와인 리스트처럼 dashed 1px 라인으로 구분되고, 가격은 별도 우측 컬럼에 골드 색으로 표기합니다. 페이지 마지막에는 1px 골드 보더 카드로 시그니처 페어링 추천을 강조합니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "브랜드명·메뉴 영문명·섹션 헤딩 등 디스플레이는 영문, 메뉴 설명 / 인사글 / 예약 정책 / 영업시간 / 드레스 코드 / 푸터 disclaimer는 모두 한국어 메인으로 작성해 한국 손님이 가장 중요한 정보를 그대로 읽을 수 있게 했습니다.",
      },
    ],
  },
  {
    slug: "finedining-mono",
    title: "파인다이닝 / 코스 레스토랑",
    subtitle: "오프 화이트 + 옅은 골드 브라운의 모노톤 시크 톤으로 완성한 미슐랭급 코스 레스토랑 데모",
    category: "fnb",
    tier: "standard",
    industry: "파인다이닝 / 코스 레스토랑",
    duration: "1주",
    order: 28,
    demoUrl: "/demos/finedining-mono",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "Cormorant Garamond", "IntersectionObserver"],
    description:
      "가상 파인다이닝 'Restaurant Solène'의 모노톤 시크 데모입니다. 풀스크린 시그니처 디시 히어로 → 셰프 소개 → 4코스 풀폭 좌우 교차 스프레드 → 와인 페어링 → 예약 안내까지 6섹션을, 오프 화이트(#F8F8F6) + 블랙 + 옅은 골드 브라운(#8B7355) 3색만으로 잡았습니다. 큰 사진과 충분한 여백, 그리고 Cormorant Garamond 이탤릭의 격조로 절제된 미식 톤을 만들었습니다.",
    thumbnail: fdmHeroUrl,
    highlights: [
      {
        title: "코스 풀폭 좌우 교차 스프레드 (시그니처)",
        description: "테이스팅 메뉴 4코스를 50/50 풀폭 그리드로 배치하고, :nth-child(even)으로 이미지가 자동 좌우 반전됩니다. IntersectionObserver가 코스에 .is-visible을 부여하면 이미지가 1.04 → 1.0 스케일로 1.2초에 걸쳐 천천히 풀립니다.",
      },
      {
        title: "12s ease 히어로 zoom + Cormorant 이탤릭",
        description: "히어로 사진은 1.05 → 1.0으로 12초 동안 한 번만 천천히 풀리고, 브랜드명은 clamp(56px, 9vw, 144px)의 Cormorant Garamond 세리프로 0.4 black-bottom gradient 위에 떠 있습니다.",
      },
      {
        title: "골드 브라운 액센트 + 가격 시그니처",
        description: "코스 번호 / 섹션 eyebrow / 가격 강조에 옅은 골드 브라운(#8B7355)을 일관되게 사용해, 모노톤 베이스에서 격조를 잃지 않고 시선이 갈 곳을 정확히 만듭니다. 메뉴 가격은 28px Cormorant + 와인 페어링 가격을 small로 분리했습니다.",
      },
      {
        title: "Grayscale 0.7 카카오맵 + 2-카드 예약",
        description: "예약 섹션은 화이트 카드 두 장(예약 정책 / 영업시간·위치)으로 분리하고, 카카오맵은 21:9 와이드 비율 + filter:grayscale(0.7)로 모노톤 톤을 끝까지 유지합니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "브랜드명·코스 영문/프랑스어명·섹션 헤딩 등 디스플레이는 영문 OK, 셰프 소개 / 코스 설명 / 와인 페어링 본문 / 예약 정책 / 영업시간 / 드레스 코드 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "photographer-mono",
    title: "사진작가 / 포토그래퍼 갤러리",
    subtitle: "흑백 톤과 큰 산세리프로 완성한 사진작가 개인 갤러리 + 작업 의뢰 페이지",
    category: "personal",
    tier: "standard",
    industry: "사진작가 / 포토그래퍼",
    duration: "1주",
    order: 29,
    demoUrl: "/demos/photographer-mono",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "Inter ExtraBold", "filter:grayscale"],
    description:
      "가상 작가 'Aria Voss'의 흑백 사진 갤러리 데모입니다. 풀스크린 작품 인트로 → 3개 시리즈 좌우 교차 매거진 그리드 → 작가 노트 → 의뢰 안내(작업 분야 / 5단계 프로세스 / 연락처) → 푸터로 이어집니다. 모든 사진은 filter:grayscale(1)로 일관된 흑백 톤을 유지하고, 클램프 200px Inter ExtraBold 작가명으로 시각적 임팩트를 만듭니다.",
    thumbnail: pmnHeroUrl,
    highlights: [
      {
        title: "시리즈 좌우 교차 매거진 그리드 (시그니처)",
        description: "3개 시리즈를 1.4fr / 1fr 비대칭 그리드에 배치하고 :nth-child(even)으로 자동 좌우 반전. 매거진처럼 시리즈마다 다른 리듬으로 흐르며 hover 시 사진이 1.04로 천천히 zoom됩니다.",
      },
      {
        title: "Inter ExtraBold 200px 작가명 + 14s zoom",
        description: "히어로의 작가명은 clamp(64px, 12vw, 200px)의 Inter 800 weight로 -0.04em 빽빽한 letter-spacing. 배경 작품은 14초에 걸쳐 1.05 → 1.0으로 천천히 풀리며 grayscale 유지.",
      },
      {
        title: "Commission 5-step 프로세스 + 3 분야 카드",
        description: "의뢰 안내는 Spaces / Still Life / Editorial 3개 분야 카드(2px black top border) + 5단계 프로세스(border-left 1px) 두 블록으로 분리. 단가 시그널과 워크플로우를 한 화면에서 보여줍니다.",
      },
      {
        title: "filter:grayscale(1) + Off-white 모노 팔레트",
        description: "오프 화이트(#FAFAFA) + 블랙(#1A1A1A) 단 2색 + 회색 보조만으로 모든 섹션을 구성. 모든 사진에 filter:grayscale(1)을 강제해 작가 톤이 어떤 원본이든 흔들리지 않게 했습니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "작가명 / 시리즈 영문명 / 섹션 헤딩은 영문 OK, 작가 노트 / 시리즈 캡션 / 의뢰 안내 / 분야 설명 / 프로세스 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "illustrator-vivid",
    title: "일러스트레이터 포트폴리오",
    subtitle: "Caveat 손글씨 + 핫 핑크/옐로/그린/블루 4색 펑키 그림자로 완성한 일러스트 포트폴리오",
    category: "personal",
    tier: "standard",
    industry: "일러스트레이터 / 캐릭터 디자이너",
    duration: "1주",
    order: 30,
    demoUrl: "/demos/illustrator-vivid",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "Caveat", "Quicksand", "Masonry Grid"],
    description:
      "가상 일러스트레이터 'Yara Lume'의 컬러풀 포트폴리오 데모입니다. 라디얼 그라데이션 4컬러 히어로 → 마소닉 작품 그리드(6컷, wide/tall 비대칭) → About → Commission(4 분야 × 4 프로세스 × 인스타 컨택) 5섹션 원페이지. 핫 핑크(#FF6B9D) / 옐로(#FFC93C) / 그린(#6BCB77) / 블루(#4D96FF) 4 컬러 액센트와 두꺼운 검정 보더 + 펑키 컬러 그림자(box-shadow)로 친근한 일러스트 톤을 만들었습니다.",
    thumbnail: ilvHeroUrl,
    highlights: [
      {
        title: "마소닉 작품 그리드 + 펑키 컬러 그림자 (시그니처)",
        description: "6점 작품을 4-column grid에 wide/tall span 비대칭으로 배치한 마소닉. 카드는 모두 3px 검정 보더 + 6px 검정 그림자, hover 시 -3/-3 이동 + 9px 핑크 그림자로 펑키하게 떠오릅니다.",
      },
      {
        title: "Caveat 손글씨 220px 작가명 + 라디얼 4컬러 배경",
        description: "히어로 작가명을 clamp(72px, 14vw, 220px)의 Caveat 손글씨로 얹고, 'Yara'는 핑크 / 'Lume'은 다크 퍼플로 분리. 배경은 4개 라디얼 그라데이션(노랑 / 핑크 / 그린 / 블루)이 부드럽게 겹칩니다.",
      },
      {
        title: "Commission 4분야 카드 × 4단계 프로세스",
        description: "캐릭터 / 포스터 / 굿즈 / 에디토리얼 4분야 카드는 각자 다른 컬러 그림자(핑크 / 옐로 / 그린 / 블루)를 가지고, 단가는 검정 pill 라벨로 표시. 4단계 프로세스는 라운드 박스로 분리해 친근하게 안내합니다.",
      },
      {
        title: "회전 + 컬러 그림자 hero 사진",
        description: "히어로 사진은 -2도 살짝 기울이고 12px 핑크 그림자를 받쳐 펑키한 일러스트 패키징처럼 만들었습니다. 작업실 사진은 -1.5도 + 옐로 그림자로 변주.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "작가명·작품 영문 타이틀·섹션 헤딩은 영문 OK, 작가 소개 / 작품 캡션 / 의뢰 분야 / 프로세스 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "coach-warm",
    title: "강사 / 코치 퍼스널 브랜드",
    subtitle: "베이지 + 코랄 워밍 톤으로 완성한 코칭 스튜디오 멀티페이지(소개 / 강의 / 문의)",
    category: "personal",
    tier: "standard",
    industry: "강사 / 코치 / 컨설턴트",
    duration: "1주",
    order: 31,
    demoUrl: "/demos/coach-warm",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "React Router 7", "Cormorant Garamond", "Mock Form"],
    description:
      "가상 코칭 스튜디오 'Aevi Studio' (코치 한소연, 가상)의 멀티페이지 데모입니다. 부모 layout이 SCSS와 사이트 chrome / scrollReveal을 한 번에 묶고, 그 아래 소개 / 강의 / 문의 3개 sub-route가 페이드 전환으로 이어집니다. 베이지(#FBF7F2) + 다크 우드(#2D2A26) + 코랄(#E8896C) + 캐러멜 우드(#B89678) 4색만으로 신뢰감 있는 워밍 톤을 만들었습니다.",
    thumbnail: cwmHeroUrl,
    highlights: [
      {
        title: "부모 layout + 3 sub-route 페이드 전환",
        description: "_coach-warm.tsx 부모가 SCSS · 사이트 헤더 · scrollReveal · 푸터를 모두 담당하고, useLocation으로 sub-route 변경마다 .cwm-page에 .is-leaving을 잠깐 부여 → opacity transition으로 부드럽게 페이드합니다.",
      },
      {
        title: "Programs 4-카탈로그 + Reviews 가상 후기 카드 (시그니처)",
        description: "강의 페이지는 4개 가상 프로그램 카탈로그(이미지 + 기간 / 대상 / 가격 메타 + 캐러멜 가격 라인) + 코랄 4px left-border 가상 후기 카드 3개로 신뢰 시그널을 완성합니다.",
      },
      {
        title: "Cormorant Garamond 이탤릭 + 코랄 액센트",
        description: "히어로 스튜디오명 clamp(48px, 8vw, 112px)의 Cormorant 이탤릭, 모든 eyebrow와 강조 라인은 코랄(#E8896C). 본문은 Inter로 가독성을 유지해 신뢰감 있는 워밍 톤을 만듭니다.",
      },
      {
        title: "Mock 문의 폼 + 일정/위치 카드",
        description: "Contact 페이지는 라운드 8px 입력 필드 4종(이름 / 이메일 / 관심 프로그램 select / 메시지)과 검정 → 코랄 hover 버튼을 가진 폼 + 운영 시간 / 주소 / 이메일 / 인스타 정보 카드 + 카카오맵을 한 화면에 묶었습니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "스튜디오명·프로그램 영문 타이틀·섹션 헤딩 등 디스플레이는 영문 OK, 코치 약력 / 활동 분야 설명 / 강의 메타 / 후기 / 문의 폼 라벨 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "medical-clean",
    title: "병원 / 의원 사이트",
    subtitle: "퓨어 화이트 + 소프트 민트 액센트로 완성한 1차 진료 의원 멀티페이지(4) 데모",
    category: "professional",
    tier: "standard",
    industry: "병원 / 의원 / 클리닉",
    duration: "1주",
    order: 32,
    demoUrl: "/demos/medical-clean",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "React Router 7", "Inter", "IntersectionObserver"],
    description:
      "가상 'Lumen Medical Clinic'의 4-페이지 의원 사이트 데모입니다. 부모 layout이 SCSS와 사이트 chrome / scrollReveal / 페이드 전환을 한 번에 묶고, 그 아래 홈 / 진료 과목 / 의료진 / 예약 안내 4개 sub-route가 이어집니다. 퓨어 화이트(#FFFFFF) + 다크 네이비(#1A2A3A) + 소프트 민트(#5BAFB0) 3색만으로 신뢰감 있는 메디컬 톤을 구성했습니다. 의료법 안전성 — 의료진 얼굴 / 시술 사례 / 효과 표시 일체 없음.",
    thumbnail: mclHeroUrl,
    highlights: [
      {
        title: "부모 layout + 4 sub-route 페이드 전환",
        description: "_medical-clean.tsx 부모가 SCSS · 사이트 헤더(고정 + CTA 버튼) · 푸터 · scrollReveal · sub-route 페이드를 모두 담당. 4개 페이지(홈 / 진료과목 / 의료진 / 예약 안내) 간 즉시 페이드 전환됩니다.",
      },
      {
        title: "Why Lumen 4-Feature 카드 + 진료 과목 좌측 보더 hover",
        description: "홈은 '긴 진료 시간 / 정직한 검사 / 재방문 알림 / 투명한 비용' 4-feature 카드를 4-column으로 배치. 진료 과목 카드는 hover 시 좌측 3px 보더가 회색 → 민트로 바뀌며 민트 그림자가 떠오릅니다.",
      },
      {
        title: "의료진 학력/경력 분리 + 손/심볼 이미지 (의료법 안전)",
        description: "원장 소개는 얼굴이 들어가지 않은 손/청진기 심볼 이미지 + 학력 / 경력 dashed-row 테이블 + 본문 3문단으로 구성. 모든 내용이 가상이며 의료광고 규제(시술 사례 / 효과 표시) 일체 없음.",
      },
      {
        title: "진료 시간 / 주차 / 위치 카드 + 카카오맵",
        description: "예약 안내 페이지는 진료 시간 + 주차 안내 카드 / 주소 + 전화 + 카카오톡 채널 카드 2-column + 21:9 카카오맵. 모든 정보가 한국 손님이 가장 먼저 확인하는 정보부터 위계 있게 배치되었습니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "의원명·진료 과목 영문 라벨·섹션 헤딩 등 디스플레이는 영문 OK, 진료 안내 / 의원 철학 / 원장 약력 / 진료 시간 / 주차 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "tax-office-calm",
    title: "세무사 / 회계 사무소",
    subtitle: "라이트 그레이 + 블루 액센트로 완성한 1인 세무사 사무소 long-form 원페이지",
    category: "professional",
    tier: "standard",
    industry: "세무사 / 회계사 / 노무사",
    duration: "1주",
    order: 33,
    demoUrl: "/demos/tax-office-calm",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "Inter", "Mock Form"],
    description:
      "가상 'Cinder Tax & Accounting'의 long-form 원페이지 데모입니다. 히어로 → 6 업무 카드 → About + 경력 → 가상 케이스 3 → 기준 수수료 표 → PDF 자료 카드 3 → 상담 신청 폼 + 위치 7섹션. 라이트 그레이(#F7F7F7) + 다크 네이비(#1A2A3A) + 블루(#2563EB) 3색만으로 차분하고 정직한 전문직 톤을 만듭니다.",
    thumbnail: taxHeroUrl,
    highlights: [
      {
        title: "7섹션 long-form 원페이지 (정보 밀도 높게)",
        description: "히어로 / 업무 안내 / About / 가상 사례 / 기준 수수료 / PDF 자료 / 상담 폼까지 7섹션을 한 페이지에 압축. 모든 섹션은 같은 1200px 컨테이너와 일관된 dashed 보더 / 좌측 3px 보더 패턴을 따릅니다.",
      },
      {
        title: "Service 카드 좌측 보더 hover (시그니처)",
        description: "6개 업무 카드는 좌측 3px 회색 보더가 hover 시 블루로 바뀌며 18/40px 블루 그림자가 생깁니다. -3px 떠오르는 transform과 함께. 정돈된 전문직 톤에 어울리는 절제된 인터랙션.",
      },
      {
        title: "투명한 기준 수수료 테이블 (3-column row)",
        description: "수수료는 1.4fr / 1fr / 1.2fr 3-column 행으로 업무명 / 가격 / 비고를 한 줄에 정렬. hover 시 행 배경이 부드럽게 라이트 그레이로 바뀌고, 가격은 블루 강조. 모든 가격이 가상이라는 안내 라인을 별도 표기.",
      },
      {
        title: "Mock 상담 폼 + 가상 사례 + PDF 카드",
        description: "사례 카드는 3개 가상 케이스를 80px Inter ExtraBold 번호 + 본문으로 분리. PDF 자료 카드는 3개를 dashed 라인으로 다운로드 링크 분리. 상담 폼은 4 필드 + 검정→블루 hover 버튼 + 가상 안내 메시지로 구성.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "사무소명 / 업무 영문 라벨 / 섹션 헤딩 등 디스플레이는 영문 OK, 인사말 / 업무 설명 / 사무소 소개 / 사례 / 수수료 안내 / 자료 / 폼 라벨 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
  {
    slug: "consulting-dark",
    title: "B2B 컨설팅 펌",
    subtitle: "딥 다크(#0F1218) + 시네마틱 골드(#C9A86E)로 완성한 프리미엄 컨설팅 멀티페이지",
    category: "professional",
    tier: "standard",
    industry: "B2B 전략 / 경영 컨설팅",
    duration: "1주",
    order: 34,
    demoUrl: "/demos/consulting-dark",
    techStack: ["HTML5", "SCSS", "Vanilla TS", "React Router 7", "Cormorant Garamond", "Inter"],
    description:
      "가상 'Northgate Consulting'의 다크 럭셔리 멀티페이지 데모입니다. 부모 layout이 SCSS와 사이트 chrome / scrollReveal / 페이드 전환을 한 번에 묶고, 그 아래 홈 / 사례 / 문의 3개 sub-route가 이어집니다. 딥 다크(#0F1218) + 시네마틱 골드(#C9A86E) + 오프 화이트 3색 팔레트와 Cormorant Garamond 이탤릭 디스플레이로 프리미엄 B2B 톤을 만들었습니다.",
    thumbnail: cdkHeroUrl,
    highlights: [
      {
        title: "부모 layout + 3 sub-route 페이드 전환",
        description: "_consulting-dark.tsx 부모가 SCSS · 사이트 헤더 · scrollReveal · 푸터를 한 번에 담당. useLocation으로 sub-route 변경마다 .cdk-page에 .is-leaving을 잠깐 부여 → opacity transition으로 부드럽게 페이드합니다.",
      },
      {
        title: "사례 카드 grayscale → color hover (시그니처)",
        description: "케이스 카드 4개는 평소 grayscale(0.3) + brightness(0.7)로 어두운 톤을 유지하다가, hover 시 grayscale(0) + brightness(0.85)로 살아납니다. 보더는 회색 → 골드로 바뀌고 24/48px 골드 그림자로 떠오릅니다.",
      },
      {
        title: "Cormorant Garamond 이탤릭 골드 + 18s zoom 히어로",
        description: "히어로 회사명을 clamp(48px, 8vw, 128px)의 Cormorant 이탤릭 골드로 얹고, 다크 도시 배경은 brightness(0.55)로 어둡게 깔린 채 18초에 걸쳐 1.05 → 1.0으로 천천히 풀립니다.",
      },
      {
        title: "Metrics 4분할 + 일하는 원칙 3-카드",
        description: "홈 페이지에 4분할 메트릭 (12 / 60+ / 12wk / 94%)를 골드 Cormorant 이탤릭 80px로 강조하고, 사례 페이지 하단에 골드 좌측 보더 1px의 일하는 원칙 3-카드(한 분기 한 문제 / 조직 안에 들어감 / 결과만 측정)를 둡니다.",
      },
      {
        title: "한국어 본문 메인 + 영문 디스플레이 (정책 v1.0)",
        description: "회사명 / 서비스 영문 라벨 / 산업 라벨 / 섹션 헤딩 등 디스플레이는 영문 OK, 인사말 / 서비스 설명 / 케이스 요약 / 일하는 원칙 / 문의 폼 / 운영 시간 / 푸터 disclaimer는 모두 한국어 메인으로 작성했습니다.",
      },
    ],
  },
]

/** slug로 단일 프로젝트 조회 */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

/** 카테고리로 필터링 */
export const getProjectsByCategory = (category: string): Project[] =>
  category === "all" ? projects : projects.filter((p) => p.category === category)

/**
 * 등급 정렬 우선순위 (피드백 #002-④)
 * STANDARD → DELUXE → PREMIUM 순서로 카드를 노출하기 위한 가중치.
 */
const TIER_PRIORITY: Record<ProjectTier, number> = {
  standard: 1,
  deluxe: 2,
  premium: 3,
}

/**
 * 등급순으로 정렬된 프로젝트 목록 반환 (피드백 #002-④)
 *
 * 1순위: tier (standard → deluxe → premium)
 * 2순위: 같은 tier 내에서 order 오름차순
 *
 * @param category - 선택. 카테고리 필터링 (예: "brand")
 */
export const getSortedProjects = (category?: ProjectCategory): Project[] => {
  const filtered = category
    ? projects.filter((p) => p.category === category)
    : projects
  return [...filtered].sort((a, b) => {
    const tierDiff = TIER_PRIORITY[a.tier] - TIER_PRIORITY[b.tier]
    if (tierDiff !== 0) return tierDiff
    return a.order - b.order
  })
}

/**
 * 추천 프로젝트 (메인 하이라이트용, 최대 n개).
 * 피드백 #002-④: 홈 featured도 등급순으로 상위 n개 — 기획자 결정 사항.
 */
export const getFeaturedProjects = (n = 3): Project[] =>
  getSortedProjects().slice(0, n)

/** 관련 프로젝트 (현재 slug 제외, 최대 n개) */
export const getRelatedProjects = (currentSlug: string, n = 2): Project[] =>
  projects.filter((p) => p.slug !== currentSlug).slice(0, n)

/* ================================================
   서비스 소개 데이터
   ================================================ */

export const services: ServiceItem[] = [
  {
    name: "웹 퍼블리싱",
    description: "디자인 시안을 정밀하게 구현하는 HTML/CSS/JS 퍼블리싱. 픽셀 퍼펙트한 마크업과 크로스 브라우저 대응을 기본으로 합니다.",
    tags: ["HTML5", "CSS3/SCSS", "Vanilla JS", "GSAP", "반응형"],
    icon: Code2, // 코드 브래킷 - 마크업 실력
  },
  {
    name: "프론트엔드 개발",
    description: "React 기반 컴포넌트 설계부터 상태관리, API 연동까지. 유지보수 가능한 코드 구조와 성능 최적화를 함께 제공합니다.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "API 연동"],
    icon: Component, // 컴포넌트 박스 - React 컴포넌트 시각화
  },
  {
    /**
     * PREMIUM 맞춤 서비스 — 데모로 보여줄 수 없는 풀스택+운영 영역.
     * 카드 클릭 시 별도 안내 페이지(/services/premium)로 이동시켜
     * "왜 별도 상담이 필요한지"를 충분히 설명한다. (지시서 #001 항목 9)
     */
    name: "PREMIUM 맞춤 서비스",
    description: "풀스택 + 운영. 회원/결제/어드민까지, 비즈니스에 딱 맞게 설계하고 만들고 운영합니다. 개별 상담 필수.",
    tags: ["회원/결제", "어드민", "백엔드 API", "DB 설계", "호스팅/운영", "유지보수"],
    icon: Layers, // 레이어 - 프론트+백엔드 스택을 쌓는 이미지
    link: "/services/premium",
  },
]

/* ================================================
   기술 스택 데이터
   ================================================ */

/**
 * 기술 스택 데이터
 *
 * [그룹 분리 기준]
 * - Frontend / Markup: 클라이언트 사이드 (React 기반 vs 순수 퍼블리싱 분리)
 * - Backend: 런타임 + 웹 프레임워크 + API 스타일 + 인증
 * - Database: RDBMS / NoSQL / ORM / 캐시·큐 모두 한 그룹으로 묶어 가시성 확보
 * - Infra: 클라우드, 컨테이너, CI/CD
 *
 * [Backend / Database 분리 이유]
 * 원래 하나였는데 Node + PostgreSQL만 있어 풀스택 역량이 빈약해 보였음.
 * 실제 사용 가능한 스택을 카테고리별로 펼쳐 신뢰도 확보.
 */
export const techGroups: TechGroup[] = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    group: "Markup",
    items: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "Swiper.js"],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Java / Spring Boot",
      "Python",
      "FastAPI",
      "Django",
      "REST API",
      "GraphQL",
      "WebSocket",
      "JWT / OAuth 2.0",
    ],
  },
  {
    group: "Database",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "Prisma ORM",
      "TypeORM",
      "Redis",
      "RabbitMQ",
    ],
  },
  {
    group: "Infra",
    items: [
      "AWS (EC2 / S3 / RDS / Lambda)",
      "Docker",
      "Kubernetes",
      "Vercel",
      "Nginx",
      "GitHub Actions",
      "Cloudflare",
    ],
  },
]

/* ================================================
   팀 소개 데이터
   ================================================ */

export const strengths: StrengthItem[] = [
  {
    icon: MessageCircle, // 대화 아이콘 - 소통 강조
    title: "정확한 소통",
    description: "요구사항을 꼼꼼히 파악하고, 진행 상황을 명확하게 공유합니다. 의사결정이 필요한 부분은 반드시 확인 후 진행합니다.",
  },
  {
    icon: CheckCircle2, // 체크 원형 - 검증/품질 보증
    title: "일관된 품질",
    description: "크고 작은 프로젝트 모두 동일한 기준으로 작업합니다. 코드 컨벤션, 반응형, 크로스 브라우저 대응은 기본입니다.",
  },
  {
    icon: Sparkles, // 반짝임 - 새로운/최신 기술
    title: "최신 기술 적용",
    description: "업계 표준 기술과 검증된 라이브러리를 선별해 사용합니다. 유행보다는 프로젝트에 가장 적합한 기술을 선택합니다.",
  },
  {
    icon: Zap, // 번개 - 빠른 속도
    title: "빠른 대응",
    description: "문의와 수정 요청에 신속하게 답변합니다. 크몽의 안전거래 시스템을 통해 견적부터 납품, 사후 수정까지 투명하게 진행합니다.",
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "상담",
    description: "요구사항, 레퍼런스, 예산, 일정을 파악합니다",
  },
  {
    step: 2,
    title: "견적",
    description: "상담 내용 기반으로 상세 견적서와 작업 범위를 확정합니다",
  },
  {
    step: 3,
    title: "개발",
    description: "단계별 진행 상황을 공유하며 개발합니다",
  },
  {
    step: 4,
    title: "검수",
    description: "납품 전 꼼꼼한 테스트와 수정을 진행합니다",
  },
  {
    step: 5,
    title: "납품",
    description: "소스코드와 함께 가이드를 제공합니다",
  },
]

/**
 * 실적 숫자 (stats)
 *
 * [제거된 이유]
 * 신규 오픈 개발샵이라 누적 납품/평점/재구매율/운영기간 모두 허위 정보가 됨.
 * 크몽 신규 개발샵으로서 "숫자"보다 "결과물 품질"로 증명하는 것이 정직하다.
 * 실적이 쌓이면 이 배열과 about.tsx의 Numbers 섹션을 다시 활성화할 수 있음.
 */
export const stats: StatItem[] = []
