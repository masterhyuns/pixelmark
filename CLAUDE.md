# 포트폴리오 사이트 프로젝트

## 프로젝트 개요

크몽 개발샵의 기술력을 증명하는 포트폴리오 웹사이트. 퍼블리싱부터 풀스택까지 다양한 프로젝트 사례를 보여주고, 크몽 프로필로 문의를 연결한다.

## 기술스택

- **프레임워크**: React Router 7 (SSR/SEO 지원)
- **언어**: TypeScript
- **CSS**: Tailwind CSS (사이트 자체) + SCSS (프로젝트별 데모)
- **애니메이션**: Framer Motion (페이지 전환) + GSAP + ScrollTrigger (스크롤 애니메이션)
- **패키지 매니저**: pnpm
- **배포**: 미정

## 기획/설계 문서 (반드시 참조)

모든 개발 작업은 아래 문서를 기반으로 진행한다. 문서와 다른 구현이 필요한 경우 사유를 명시한다.

| 문서 | 경로 | 내용 |
|------|------|------|
| 개발지시서 | `../Documents/portfolio/개발지시서.md` | Why, What, Done 기준, 제약사항, 우선순위, Phase 분리 |
| 아키텍처 | `../Documents/portfolio/아키텍처.md` | 프로젝트 구조, 라우팅, 데이터 구조, SEO/성능 전략 |
| 기능기획 | `../Documents/portfolio/기능기획.md` | 페이지별 섹션 구성, 와이어프레임, 인터랙션 명세 |
| 디자인가이드 | `../Documents/portfolio/디자인가이드.md` | 컬러, 타이포, 간격, 컴포넌트 스타일, 애니메이션 원칙 |

### 개별 프로젝트 기획서 (포트폴리오에 들어갈 데모 프로젝트)

| 프로젝트 | 경로 | 카테고리 |
|---------|------|---------|
| 브랜드/화장품 랜딩 | `../Documents/기획/S-1_브랜드_화장품/기획서.md` | STANDARD |
| 법률사무소/병원 | `../Documents/기획/S-2_법률사무소_병원/기획서.md` | STANDARD |
| 카페/레스토랑 | `../Documents/기획/S-3_카페_레스토랑/기획서.md` | STANDARD |
| 포트폴리오/이력서 | `../Documents/기획/S-4_포트폴리오_이력서/기획서.md` | STANDARD |

## 개발 규칙

### 코드 컨벤션
- 함수는 화살표 함수 사용
- 타입 정의는 `app/types/types.ts`에서 정의, 주석 상세하게
- 컴포넌트 파일명: PascalCase (예: `ProjectCard.tsx`)
- 유틸/훅 파일명: camelCase (예: `useScrollAnimation.ts`)

### CSS 규칙
- 포트폴리오 사이트 자체: Tailwind CSS만 사용, SCSS 금지
- 개별 프로젝트 데모: SCSS 사용, var 변수 활용 (scss 변수 사용 금지)
- 반응형 breakpoint: 767px (모바일) / 768px~1199px (태블릿) / 1200px+ (PC)

### 커밋 규칙
- git commit convention 에 따라 한글로 작성
- claude code 정보 제외

## 개발 Phase

### Phase 1: 기본 구조 (현재)
프로젝트 초기화 → 레이아웃 → 메인 페이지 → 프로젝트 목록/상세 → 반응형 → SEO

### Phase 2: 인터랙션
페이지 전환 → 스크롤 애니메이션 → 모바일 메뉴 → 필터 애니메이션

### Phase 3: 완성도
팀 소개 상세 → JSON-LD → sitemap → 404 → 성능 최적화
