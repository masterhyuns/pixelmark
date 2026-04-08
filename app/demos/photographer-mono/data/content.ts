/**
 * PE-S1 Photographer Mono — Aria Voss
 * 언어 정책 v1.0 — 디스플레이는 영문 OK / 작업 노트·의뢰 안내는 한국어 메인
 */

export const photographer = {
  name: "Aria Voss",
  nameKr: "아리아 보스",
  tagline: "Photographer based in Seoul",
  taglineKr: "서울에서 작업하는 사진작가",
}

export const intro = {
  eyebrow: "Black & White / Still Things",
  eyebrowKr: "흑백 사진 / 정물",
  body:
    "조용한 것을 오래 들여다보는 일을 합니다. 사람보다 빛, 사물의 그림자, 비어 있는 자리. 그런 것들이 가장 오래 남는다고 믿습니다.",
}

export const series = [
  {
    code: "01",
    title: "Light & Shadow",
    titleKr: "빛과 그림자",
    year: "2023 — 2024",
    caption: "햇빛이 만든 도형, 그림자가 만든 시간. 6개월에 걸친 정물 시리즈.",
    cover: "1" as const,
  },
  {
    code: "02",
    title: "Urban Quiet",
    titleKr: "조용한 도시",
    year: "2024",
    caption: "사람이 빠진 거리의 풍경. 새벽 4시부터 6시 사이에만 작업한 6컷.",
    cover: "2" as const,
  },
  {
    code: "03",
    title: "Soft Things",
    titleKr: "부드러운 것들",
    year: "2024 — 2025",
    caption: "마른 꽃, 구겨진 종이, 빈 그릇. 단단함이 아니라 부드러움에 대한 짧은 일기.",
    cover: "3" as const,
  },
] as const

export const statement = {
  eyebrow: "Statement · 작가 노트",
  title: "On staying still.",
  titleKr: "가만히 있는 일에 대하여",
  paragraphs: [
    "사진은 결국 시간을 자르는 일입니다. 어떤 사진작가는 빠른 순간을 자르고, 어떤 사진작가는 오래 머무는 순간을 자릅니다. 저는 후자에 가깝습니다.",
    "그래서 작업 시간의 대부분은 셔터를 누르는 시간이 아니라, 같은 자리에 가만히 앉아 빛이 어떻게 움직이는지 보는 시간입니다. 다섯 시간을 앉아 있다 한 컷을 찍을 때도 있습니다.",
    "이 페이지의 사진들은 그렇게 오래 머문 자리에서 나온 작은 결과입니다. 빠르지 않게, 오래 보아 주시면 좋겠습니다.",
  ],
}

export const commission = {
  eyebrow: "Commission · 작업 의뢰",
  title: "Available for quiet work.",
  titleKr: "조용한 작업을 함께 하실 분께",
  intro:
    "공간, 사물, 작은 행사, 그리고 책 표지. 큰 광고나 모델 촬영보다 — 오래 들여다볼 수 있는 작은 작업을 주로 받습니다.",
  fields: [
    {
      label: "Spaces",
      labelKr: "공간 · 인테리어",
      caption: "카페, 갤러리, 호텔, 작은 매장. 한 공간당 4 — 6컷.",
      price: "₩600,000부터",
    },
    {
      label: "Still Life",
      labelKr: "정물 · 제품",
      caption: "도자기, 가구, 식물, 책. 모노톤 톤 그대로 작업합니다.",
      price: "₩450,000부터 / 5컷",
    },
    {
      label: "Editorial",
      labelKr: "에디토리얼 · 인쇄물",
      caption: "잡지, 단행본, 브랜드 룩북. 톤 매니지먼트 포함.",
      price: "별도 협의",
    },
  ] as const,
  process: [
    { step: "01", title: "문의 · Contact", caption: "이메일로 작업 종류 / 일정 / 장소를 알려 주세요." },
    { step: "02", title: "사전 미팅 · Meeting", caption: "온라인 또는 작업실에서 30분 미팅. 톤과 레퍼런스를 맞춥니다." },
    { step: "03", title: "촬영 · Shoot", caption: "현장 촬영은 보통 반나절. 작은 공간은 1~2시간." },
    { step: "04", title: "셀렉트 · Select", caption: "1주일 안에 100컷 정도 선별본을 보내드립니다." },
    { step: "05", title: "리터칭 · Retouching", caption: "흑백 변환과 톤 매니지먼트. 2주 이내 최종본." },
  ] as const,
  contactEmail: "studio@ariavoss.demo",
  contactInstagram: "@ariavoss.demo",
}
