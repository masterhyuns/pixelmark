/**
 * S-2 Law Office — 전문 분야 / 후기 / 실적 데이터
 *
 * [가상 사무소] "Aurea 법률사무소"
 * - 개인 변호사 1인 사무소 (가상)
 * - 민사/형사/가사/부동산 4개 분야
 * - 대표 변호사명·사무소명·실적·후기 모두 가상이며 실존 법인과 무관
 */

// ----- 전문 분야 (Services 페이지 아코디언) -----
export interface ServiceItem {
  key: string
  title: string
  summary: string
  description: string
  cases: string[]
}

export const services: ServiceItem[] = [
  {
    key: "civil",
    title: "민사 소송",
    summary: "계약 분쟁, 채권 회수, 손해배상 등 개인·법인 민사 사건",
    description:
      "계약서 해석부터 소송 수행까지 전 과정을 책임집니다. 상대방과의 협상 전략, 증거 수집, 법정 변론 모두 직접 진행합니다.",
    cases: [
      "공사대금 회수 성공 사례 다수",
      "임대차 보증금 반환 청구",
      "매매계약 해제 및 손해배상",
      "채권 추심 및 집행",
    ],
  },
  {
    key: "criminal",
    title: "형사 사건",
    summary: "수사 초기부터 재판까지 의뢰인의 권리를 지킵니다",
    description:
      "경찰 조사 동행, 구속영장 대응, 검찰 수사, 법원 공판까지 단계별 전문 대응. 사건의 흐름에 맞춘 맞춤형 변론 전략을 제공합니다.",
    cases: [
      "무혐의 처분 사례 다수",
      "집행유예·선고유예 성공",
      "피해자 합의 및 형량 감경",
      "무고 사건 대응",
    ],
  },
  {
    key: "family",
    title: "가사 사건",
    summary: "이혼·상속·양육권 등 가족 관계 법률 문제",
    description:
      "민감한 가족 문제를 차분하고 원칙 있게 다룹니다. 상담 단계에서 의뢰인의 상황과 감정을 충분히 이해한 뒤 최선의 방향을 제시합니다.",
    cases: [
      "협의·조정 이혼 진행",
      "재산분할 및 위자료 청구",
      "양육권·면접교섭 조정",
      "상속재산 분할 협의",
    ],
  },
  {
    key: "real-estate",
    title: "부동산",
    summary: "매매·임대차·경매·재개발 등 부동산 관련 법률",
    description:
      "부동산 거래의 모든 단계에서 법률 리스크를 점검하고 분쟁을 예방합니다. 계약서 검토부터 분쟁 해결까지 원스톱 서비스를 제공합니다.",
    cases: [
      "매매계약서 검토 및 리스크 분석",
      "임대차 분쟁 조정",
      "경매 입찰 및 명도",
      "재개발·재건축 법률 자문",
    ],
  },
]

// ----- 숫자 카운트업 (Home 페이지) -----
// 실제 실적 아닌 데모 수치 — 포트폴리오 목적으로 개연성 있는 숫자
export interface StatItem {
  value: number
  suffix: string
  label: string
}

export const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "상담 건수" },
  { value: 15, suffix: "년", label: "경력" },
  { value: 95, suffix: "%", label: "의뢰인 만족도" },
  { value: 4, suffix: "개", label: "전문 분야" },
]

// ----- 후기 (Reviews 페이지 + Home 미리보기) -----
export interface Review {
  id: string
  stars: number
  category: string
  title: string
  body: string
  date: string
  author: string
}

export const reviews: Review[] = [
  {
    id: "r1",
    stars: 5,
    category: "민사",
    title: "공사대금 회수 성공",
    body: "수년간 받지 못했던 공사대금을 변호사님 덕분에 완전히 회수할 수 있었습니다. 처음부터 끝까지 꼼꼼히 챙겨주셔서 감사드립니다. 증거 수집부터 법정 변론까지 모든 과정을 믿고 맡길 수 있었습니다.",
    date: "2026.02.15",
    author: "김 * 수",
  },
  {
    id: "r2",
    stars: 5,
    category: "가사",
    title: "이혼 조정 원만히 마무리",
    body: "가장 힘든 시기에 차분하게 상황을 정리해주시고, 최선의 합의안을 도출해주셨습니다. 감정적으로 흔들리지 않고 법적으로 탄탄하게 진행해주셔서 안정감을 느꼈습니다.",
    date: "2026.01.28",
    author: "이 * 영",
  },
  {
    id: "r3",
    stars: 5,
    category: "형사",
    title: "집행유예 선고",
    body: "초범이라 너무 두려웠는데 수사 단계부터 재판까지 모든 과정을 설명해주시고 함께해주셨습니다. 결과도 만족스럽고, 무엇보다 과정이 든든했습니다.",
    date: "2026.01.10",
    author: "박 * 민",
  },
  {
    id: "r4",
    stars: 5,
    category: "부동산",
    title: "임대차 분쟁 해결",
    body: "임대인과의 보증금 반환 분쟁이 몇 개월간 지속됐는데, 변호사님 상담 후 바로 방향이 잡혔습니다. 내용증명부터 소송까지 전략적으로 진행해 빠르게 마무리됐습니다.",
    date: "2025.12.22",
    author: "정 * 아",
  },
  {
    id: "r5",
    stars: 5,
    category: "민사",
    title: "손해배상 청구 성공",
    body: "상대방의 과실을 입증하기 어려운 상황이었는데, 변호사님께서 증거를 체계적으로 정리해주셔서 승소할 수 있었습니다. 전문성과 집요함이 느껴졌습니다.",
    date: "2025.12.05",
    author: "최 * 호",
  },
  {
    id: "r6",
    stars: 5,
    category: "가사",
    title: "상속재산 분할 협의",
    body: "가족 간 감정이 상하지 않게 중재해주셨습니다. 법적인 부분뿐 아니라 가족 관계까지 고려하신 상담이 인상 깊었습니다.",
    date: "2025.11.18",
    author: "한 * 진",
  },
]

// ----- 경력 (About 페이지 타임라인) -----
export interface CareerItem {
  period: string
  title: string
  description: string
}

export const career: CareerItem[] = [
  { period: "2024 — 현재", title: "Aurea 법률사무소 개소", description: "서울 서초동에서 개업, 4개 분야 전문 자문" },
  { period: "2019 — 2023", title: "법무법인 ○○ 파트너 변호사", description: "민사·형사 사건 주력, 주요 소송 다수 수행" },
  { period: "2014 — 2019", title: "법무법인 △△ 소속 변호사", description: "기업 자문 및 민사 소송 실무 경험" },
  { period: "2012 — 2014", title: "사법연수원 제○○기 수료", description: "민사재판부 실무 수습" },
  { period: "2008 — 2012", title: "○○대학교 법학과 졸업", description: "법학 학사, 2012년 제○회 변호사시험 합격" },
]
