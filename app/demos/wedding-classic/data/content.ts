/**
 * E-S6 Wedding Classic — 가상 데이터
 *
 * [컨벤션]
 * - 신랑신부 / 부모 / 호텔 / 계좌 모두 placeholder
 * - 한영 병기 (영문은 Cormorant 세리프 디스플레이용)
 */

export const couple = {
  groomName: "○○",
  brideName: "○○",
  groomEn: "Groom",
  brideEn: "Bride",
}

export const parents = {
  groomFather: "○○○",
  groomMother: "○○○",
  brideFather: "○○○",
  brideMother: "○○○",
}

/** 매년 자동 갱신되는 미래 결혼식일 (6월 15일 15:00, 지났으면 다음 해) */
export const getWeddingDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 5, 15, 15, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 15, 15, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ Grand Hotel",
  nameKr: "○○ 그랜드 호텔",
  hall: "Crystal Ballroom",
  hallKr: "크리스탈 볼룸 (4F)",
  address: "Seoul, Korea ○○-○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const greeting = {
  headingEn: "With the Warmest Welcome",
  headingKr: "소중한 분들을 초대합니다",
  paragraphsEn: [
    "We are pleased to announce our marriage and would be honored by your presence on our wedding day.",
    "Your blessing and company will make this moment truly unforgettable for both of us and our families.",
  ],
  paragraphsKr: [
    "두 사람이 오랜 시간 쌓아 올린 마음이 결실을 맺으려 합니다. 저희의 새로운 시작에 귀한 걸음으로 함께해 주시면 감사하겠습니다.",
    "한 사람의 마음이 다른 한 사람의 마음에 닿아 이제 한 가족이 되려 합니다. 따뜻한 축복으로 함께해 주세요.",
  ],
}

export const story = [
  {
    chapterEn: "Chapter One",
    chapterKr: "첫 만남",
    titleEn: "Where It All Began",
    titleKr: "이야기의 시작",
    bodyEn:
      "A quiet afternoon in a small library, a shared page, and a single quiet conversation that lasted a little longer than it should have. That was the beginning.",
    bodyKr:
      "작은 도서관의 조용한 오후, 우연히 펼쳐진 같은 책 한 페이지. 그날의 짧은 대화가 조금 더 길어졌고, 그 시간이 우리의 시작이 되었습니다.",
  },
  {
    chapterEn: "Chapter Two",
    chapterKr: "함께한 시간",
    titleEn: "Walking Together",
    titleKr: "나란히 걸으며",
    bodyEn:
      "Seasons passed. We learned the small things that make each other smile, and found a quiet rhythm together — one that feels like home.",
    bodyKr:
      "서로의 작은 기쁨을 하나하나 배워가며 계절이 지나갔습니다. 어느새 우리의 하루에는 서로가 가장 자연스러운 풍경이 되었습니다.",
  },
  {
    chapterEn: "Chapter Three",
    chapterKr: "약속의 순간",
    titleEn: "A Quiet Promise",
    titleKr: "조용한 약속",
    bodyEn:
      "Without grand gestures, without a crowd — only a shared look and a quiet nod. That was the moment we knew this was for always.",
    bodyKr:
      "화려한 말 대신 조용한 끄덕임으로, 평생을 함께하기로 약속했습니다. 오래된 친구처럼, 또 새로운 동반자처럼.",
  },
]

export const directions = [
  {
    typeEn: "Subway",
    typeKr: "지하철",
    descEn: "Line ○, ○○ Station (Exit 2), 7 min walk",
    descKr: "○호선 ○○역 2번 출구에서 도보 7분",
  },
  {
    typeEn: "Car / Valet",
    typeKr: "자가용 / 발렛",
    descEn: "Complimentary valet service at the main entrance.",
    descKr: "호텔 정문 무료 발렛 서비스 제공",
  },
  {
    typeEn: "Shuttle",
    typeKr: "셔틀버스",
    descEn: "Shuttle from ○○ Station every 20 min (13:00 — 16:00).",
    descKr: "○○역에서 20분 간격 셔틀 운행 (13:00 — 16:00)",
  },
]
