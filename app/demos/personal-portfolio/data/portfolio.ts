/**
 * S-4 Personal Portfolio — 가상 디자이너 데이터
 *
 * [가상 인물]
 * "Mira Kalon" — 서울 기반의 가상 프로덕트 디자이너.
 * 흔한 한국식 이름 대신 합성 외국식 이름으로 실존 리스크 회피.
 * 모든 작업물·경력·스킬은 100% 가상이며 실제 인물/회사와 무관.
 *
 * [이미지 import 방식]
 * `app/demos/personal-portfolio/assets/images/` 하위 정적 파일을 Vite가 해시 URL로 번들.
 * public/이 아닌 app/ 내부라 반드시 import.
 */

// 작업물 썸네일 (모달 내 상세 이미지도 같이 쓰임)
import work1Url from "../assets/images/works/work-1-orbit-finance.jpg"
import work2Url from "../assets/images/works/work-2-meadow-journal.jpg"
import work3Url from "../assets/images/works/work-3-terra-studio.jpg"
import work4Url from "../assets/images/works/work-4-harbor-bookshop.jpg"

export interface Work {
  id: string
  title: string
  category: string
  year: string
  image: string
  description: string
  tools: string[]
  link?: string
}

export const works: Work[] = [
  {
    id: "w1",
    title: "Orbit Finance",
    category: "Mobile App",
    year: "2025",
    image: work1Url,
    description:
      "개인 투자자를 위한 자산 관리 앱 리디자인 프로젝트. 복잡한 데이터를 직관적으로 보여주는 정보 시각화에 집중했습니다.",
    tools: ["Figma", "Principle", "After Effects"],
    link: "#",
  },
  {
    id: "w2",
    title: "Meadow Journal",
    category: "Web · Branding",
    year: "2025",
    image: work2Url,
    description:
      "자연에서 영감을 받은 라이프스타일 매거진의 브랜드 시스템과 웹사이트. 타이포그래피가 주인공이 되는 에디토리얼 레이아웃.",
    tools: ["Figma", "Webflow", "Illustrator"],
    link: "#",
  },
  {
    id: "w3",
    title: "Terra Studio",
    category: "Identity",
    year: "2024",
    image: work3Url,
    description:
      "건축 스튜디오의 리브랜딩. 미니멀한 로고와 정갈한 인쇄물 체계를 설계했습니다. 스튜디오 사이트까지 이어지는 일관된 경험.",
    tools: ["Illustrator", "InDesign", "Figma"],
    link: "#",
  },
  {
    id: "w4",
    title: "Harbor Bookshop",
    category: "E-commerce",
    year: "2024",
    image: work4Url,
    description:
      "독립 서점의 온라인 스토어. 책의 촉감과 공간감을 디지털로 옮기기 위해 여백과 활자에 집중한 UI를 만들었습니다.",
    tools: ["Figma", "Shopify", "Notion"],
    link: "#",
  },
]

export const skills: string[] = [
  "Figma",
  "Sketch",
  "Illustrator",
  "Photoshop",
  "After Effects",
  "Principle",
  "HTML / CSS",
  "Webflow",
  "Notion",
  "Design System",
]

export interface CareerItem {
  period: string
  role: string
  company: string
  description: string
}

export const career: CareerItem[] = [
  {
    period: "2023 — Present",
    role: "Senior Product Designer",
    company: "Lumen Studio",
    description: "B2B SaaS 프로덕트의 디자인 시스템 설계 및 핵심 리디자인 주도",
  },
  {
    period: "2020 — 2023",
    role: "Product Designer",
    company: "Fable Inc.",
    description: "모바일 커머스 앱의 사용자 경험 개선 및 브랜드 리프레시",
  },
  {
    period: "2018 — 2020",
    role: "UX Designer",
    company: "Ground Agency",
    description: "에이전시 환경에서 다양한 업종의 웹/모바일 프로젝트 수행",
  },
  {
    period: "2017 — 2018",
    role: "Junior Designer",
    company: "Freelance",
    description: "로고·브랜드·웹 프로젝트 다수, 작은 스튜디오와 협업",
  },
]
