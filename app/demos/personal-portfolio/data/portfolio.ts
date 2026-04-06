/**
 * S-4 Personal Portfolio — 가상 디자이너/개발자 데이터
 *
 * [가상 인물] "Sion Park" — 서울 기반 프로덕트 디자이너
 * - 미니멀 포트폴리오 레퍼런스 톤 유지
 * - 4개 작업물, 10개 스킬, 4개 경력
 */

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
    image: "https://images.unsplash.com/photo-1616077167599-cd33ebbc2567?w=1200&h=900&fit=crop",
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
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&h=900&fit=crop",
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
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=900&fit=crop",
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
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=900&fit=crop",
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
