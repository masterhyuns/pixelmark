import type { Project, ServiceItem, TechGroup, StrengthItem, ProcessStep, StatItem } from "~/types/types"

/**
 * 포트폴리오 프로젝트 데이터
 * 실제 스크린샷은 개발 완료 후 /public/images/projects/에 교체 예정
 * 현재는 placeholder 이미지 사용
 */
export const projects: Project[] = [
  {
    slug: "beauty-landing",
    title: "브랜드/화장품 랜딩페이지",
    subtitle: "고급스러운 비주얼과 스크롤 애니메이션으로 브랜드 감성을 전달하는 원페이지 랜딩",
    category: "standard",
    industry: "뷰티/화장품",
    duration: "2주",
    order: 1,
    demoUrl: "/demos/beauty-landing",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "GSAP", "Swiper.js"],
    description:
      "화장품 브랜드 런칭을 위한 감성적인 랜딩페이지입니다. 풀스크린 패럴랙스 히어로, 가로 드래그 슬라이더, 스크롤 진입 애니메이션 등 고급스러운 비주얼 인터랙션을 순수 퍼블리싱 기술로 구현했습니다. 로즈골드 톤의 컬러 시스템과 절제된 여백으로 제품이 돋보이는 레이아웃을 설계했습니다.",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=760&h=475&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=750&fit=crop",
    ],
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
    category: "standard",
    industry: "법률/의료",
    duration: "3주",
    order: 2,
    demoUrl: "/demos/law-office",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "Kakao Map API"],
    description:
      "법률사무소·병원 등 전문직을 위한 신뢰감 중심의 소개 사이트입니다. 5개 페이지(메인/소개/전문분야/후기/상담예약)로 구성되며, 숫자 카운트업 애니메이션, 아코디언 전문분야, 상담 폼 밸리데이션, 지도 임베드, 플로팅 상담 버튼까지 실제 운영 수준의 기능을 갖췄습니다. 네이비와 골드 브라운 컬러로 전문성과 신뢰를 동시에 전달합니다.",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=760&h=475&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=750&fit=crop",
    ],
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
    category: "standard",
    industry: "외식업/카페",
    duration: "2주",
    order: 3,
    demoUrl: "/demos/cafe-restaurant",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS", "Swiper.js", "GLightbox"],
    description:
      "카페·레스토랑을 위한 감성적인 소개 사이트입니다. 크림&테라코타 컬러 시스템, 메뉴 탭 전환, 마소닉 갤러리 + 라이트박스, 지도 임베드 등 외식업 홈페이지에 필요한 모든 요소를 담았습니다. 사진이 주인공이 되도록 여백을 넉넉히 사용하고 비대칭 레이아웃으로 역동적인 구성을 연출했습니다.",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=760&h=475&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1200&h=750&fit=crop",
    ],
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
    category: "standard",
    industry: "개인/프리랜서",
    duration: "1주",
    order: 4,
    demoUrl: "/demos/personal-portfolio",
    techStack: ["HTML5", "CSS3", "SCSS", "Vanilla JS"],
    description:
      "디자이너·개발자·프리랜서를 위한 미니멀 포트폴리오 사이트입니다. 외부 라이브러리 없이 순수 HTML/CSS/JS만으로 구현하여 10KB 이하의 초경량 JS를 달성했습니다. 타이프라이터 이름 효과, 좌우 교차 타임라인, 작업물 모달, 스킬 태그 stagger 애니메이션까지 절제된 코드로 세련된 결과물을 만들어냈습니다.",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=760&h=475&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=750&fit=crop",
    ],
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
    icon: "◈",
  },
  {
    name: "프론트엔드 개발",
    description: "React 기반 컴포넌트 설계부터 상태관리, API 연동까지. 유지보수 가능한 코드 구조와 성능 최적화를 함께 제공합니다.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "API 연동"],
    icon: "◉",
  },
  {
    name: "풀스택 개발",
    description: "프론트엔드부터 백엔드 API, DB 설계, 인증, 배포까지 전 과정을 원스톱으로 제공합니다. 런칭까지 필요한 모든 것을 맡겨주세요.",
    /**
     * 풀스택 태그에 실제로 자주 쓰는 핵심만 노출
     * - 세부 기술은 아래 techGroups 섹션에서 전체 나열
     * - 카드 레이아웃 유지를 위해 7개 이하로 제한
     */
    tags: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "JWT/OAuth", "AWS", "Docker"],
    icon: "◎",
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
    icon: "◈",
    title: "정확한 소통",
    description: "요구사항을 꼼꼼히 파악하고, 진행 상황을 명확하게 공유합니다. 의사결정이 필요한 부분은 반드시 확인 후 진행합니다.",
  },
  {
    icon: "◉",
    title: "일관된 품질",
    description: "크고 작은 프로젝트 모두 동일한 기준으로 작업합니다. 코드 컨벤션, 반응형, 크로스 브라우저 대응은 기본입니다.",
  },
  {
    icon: "◎",
    title: "최신 기술 적용",
    description: "업계 표준 기술과 검증된 라이브러리를 선별해 사용합니다. 유행보다는 프로젝트에 가장 적합한 기술을 선택합니다.",
  },
  {
    icon: "●",
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
