import {
  Code2,
  Component,
  Layers,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react"
import type { Project, ServiceItem, TechGroup, StrengthItem, ProcessStep, StatItem } from "~/types/types"

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
import wnewsHeroUrl from "~/demos/wedding-newsprint/assets/images/header/header-bg.webp"
import wpostHeroUrl from "~/demos/wedding-postal/assets/images/envelope/envelope.webp"
import wbookHeroUrl from "~/demos/wedding-storybook/assets/images/cover/cover.webp"
import flbHeroUrl from "~/demos/fashion-lookbook/assets/images/hero/hero-bg.webp"
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
    slug: "wedding-newsprint",
    title: "신문 청첩장",
    subtitle: "빈티지 신문 헤드라인과 3컬럼 기사 + 분류광고 위트로 풀어낸 트렌디 청첩장",
    category: "event",
    tier: "standard",
    industry: "결혼식 / 청첩장",
    duration: "1주",
    order: 20,
    demoUrl: "/demos/wedding-newsprint",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla TS", "Old Standard TT", "CSS columns"],
    description:
      "종이 베이지 + 잉크 블랙 + 빈티지 레드의 신문 팔레트와 Old Standard TT 세리프로 빈티지 신문 1면 같은 청첩장을 만들었습니다. 시그니처는 'THE PIXELMARK TIMES' 마스트헤드와 한 글자씩 타이핑되는 헤드라인. 3컬럼 기사 본문(CSS columns + 골드 드롭캡), 흑백 4프레임 photo page, WANTED/FOR SALE/LOST 위트 분류광고, 신문지 격조의 계좌 광고 카드까지 5섹션을 단일 라우트에 담았습니다.",
    thumbnail: wnewsHeroUrl,
    highlights: [
      {
        title: "신문 마스트헤드 + 헤드라인 타이핑 (시그니처)",
        description: "'THE PIXELMARK TIMES' 마스트헤드 아래 BREAKING NEWS 헤드라인이 한 글자씩 45ms 간격으로 타이핑됩니다. 4px 더블 보더와 SPECIAL EDITION 빈티지 스탬프로 신문 1면을 그대로 옮겼습니다.",
      },
      {
        title: "3컬럼 기사 본문 + 드롭캡",
        description: "Article 섹션에 CSS columns: 3과 column-rule을 적용해 진짜 신문 컬럼처럼 본문이 3등분됩니다. 첫 단락 첫 글자엔 큰 빨간 드롭캡.",
      },
      {
        title: "Wedding Section 정보 카드 + 흑백 카카오맵",
        description: "Page 03을 'Wedding Section'으로 표현. 2px 솔리드 보더 인포 카드와 grayscale(1) 처리한 카카오맵으로 신문지 인쇄 톤을 유지합니다.",
      },
      {
        title: "흑백 Photo Page",
        description: "Page 04에 4프레임 흑백 갤러리. 이탤릭 캡션과 1px 보더로 신문 사진 페이지의 톤을 그대로 살렸습니다.",
      },
      {
        title: "WANTED/FOR SALE/LOST 분류광고",
        description: "Page 05 Classified 섹션에 'WANTED: 조용한 오후를 좋아하는 손님', 'FOR SALE: 두 마음', 'LOST: Henry'라는 위트 있는 가상 분류광고 3개와 신랑·신부 계좌 광고 2개를 배치했습니다.",
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
]

/** slug로 단일 프로젝트 조회 */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

/** 카테고리로 필터링 */
export const getProjectsByCategory = (category: string): Project[] =>
  category === "all" ? projects : projects.filter((p) => p.category === category)

/** 추천 프로젝트 (메인 하이라이트용, 최대 n개) */
export const getFeaturedProjects = (n = 3): Project[] =>
  [...projects].sort((a, b) => a.order - b.order).slice(0, n)

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
