/**
 * E-S7 Wedding Bohemian — 가상 데이터
 *
 * [컨벤션]
 * - 신랑신부 / 부모 / 식장 모두 placeholder
 * - 손글씨 감성 영문 디스플레이 + 한글 본문
 */

export const couple = {
  groomName: "○○",
  brideName: "○○",
  groomDisplay: "Groom",
  brideDisplay: "Bride",
}

export const parents = {
  groomFather: "○○○",
  groomMother: "○○○",
  brideFather: "○○○",
  brideMother: "○○○",
}

/** 매년 자동 갱신되는 미래 결혼식일 (9월 20일 11:00, 지났으면 다음 해) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 8, 20, 11, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 8, 20, 11, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Garden Wedding",
  nameKr: "○○ 가든 웨딩",
  address: "Gyeonggi-do, Korea ○○",
  addressKr: "경기도 ○○시 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const heroCopy = {
  eyebrow: "Under the Open Sky",
  dateDisplay: "We'll Say I Do",
}

export const story = [
  {
    chapter: "Our Beginning",
    chapterKr: "시작",
    title: "A small yard, a long afternoon.",
    body:
      "우리는 작은 마당에서 처음 서로를 알아갔습니다. 바람에 흔들리던 풀잎, 해가 지던 방향, 조용히 내려앉던 오후의 공기 — 그 모든 것이 우리의 첫 기억이 되었습니다.",
  },
  {
    chapter: "Walking Slowly",
    chapterKr: "걸음",
    title: "Among trees and wildflowers.",
    body:
      "우리는 천천히 걷는 사람들이었습니다. 야생화가 핀 길, 오래된 나무 아래, 굳이 빠를 필요가 없는 산책들. 그 느긋함이 우리를 닮게 했고, 서로를 닮게 했습니다.",
  },
] as const

export const ceremony = [
  { time: "11:00", title: "Welcome & Garden Tea", titleKr: "입장 · 가든 티" },
  { time: "11:30", title: "Outdoor Ceremony", titleKr: "야외 예식" },
  { time: "12:30", title: "Lunch Reception", titleKr: "가든 오찬" },
  { time: "14:00", title: "Afternoon Walk", titleKr: "산책 & 사진 시간" },
  { time: "15:00", title: "Farewell", titleKr: "마무리" },
] as const

export const directions = [
  {
    type: "Shuttle",
    typeKr: "셔틀버스",
    desc: "○○역 3번 출구에서 오전 10:00 / 10:30 두 번 운행",
  },
  {
    type: "Parking",
    typeKr: "주차",
    desc: "식장 내 주차 공간 무료 · 만차 시 인근 공영주차장 안내",
  },
  {
    type: "Dress Code",
    typeKr: "드레스 코드",
    desc: "베이지 · 세이지 그린 · 크림 톤의 편안한 자연주의 의상 권장",
  },
]
