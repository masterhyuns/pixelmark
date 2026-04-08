/**
 * E-S11 Wedding Cinematic — 영화 포스터 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-3]
 * - 영화 타이틀/등급/태그라인은 영문 디스플레이 유지
 * - 시놉시스 본문, 메타 라벨, 일정/장소는 한국어 메인
 *
 * [가상 영화사] PIXELMARK PICTURES
 */

export const movie = {
  // 디스플레이 — 영문 유지
  studio: "Pixelmark Pictures",
  presents: "PIXELMARK PICTURES PRESENTS",
  title: "FOREVER, AT FIRST SIGHT",
  subtitle: "A Love Story by ○○ & ○○",
  rating: "ALL AUDIENCES · LOVE STORY",
  tagline: "Some stories begin where the credits never roll.",
  // 한국어 부제 (정보)
  titleKr: "처음 본 순간, 영원처럼",
  taglineKr: "어떤 이야기는 엔딩 크레딧이 끝난 뒤에도 계속됩니다.",
}

export const couple = {
  groomEn: "○○",
  brideEn: "○○",
  groomKr: "○○",
  brideKr: "○○",
}

// label 영문 + labelKr 병기
export const meta = [
  { label: "Director", labelKr: "감독", value: "○○" },
  { label: "Starring", labelKr: "주연", value: "○○ (신부) & ○○ (신랑)" },
  { label: "Genre", labelKr: "장르", value: "Romance / Drama" },
  { label: "Runtime", labelKr: "상영시간", value: "평생 · A Lifetime" },
  { label: "Rating", labelKr: "평점", value: "★★★★★" },
  { label: "Studio", labelKr: "제작", value: "Pixelmark Pictures" },
] as const

export const synopsis = {
  log: "// 시놉시스",
  // 본문 — 한국어 메인
  paragraphs: [
    "서울 어느 작은 동네에 살던 조용한 디자이너 ○○는, 매주 목요일 오후마다 같은 카페를 찾습니다. 어느 날, 옆 테이블에 ○○가 우연히 자리를 잡았습니다.",
    "그 뒤로 이어진 이야기는 영화에 담을 만한 것이 아닙니다. 추격전도, 극적인 독백도 없습니다. 그저 수백 번의 조용한 대화, 천 개의 작은 순간들, 그리고 함께 살아가기로 한 천천히 굳어진 결심뿐입니다.",
    "아래의 날짜에, 두 사람은 새로운 챕터를 엽니다. 누군가의 이야기 속 배우가 아니라, 자기 이야기의 작가로서.",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
    "In a small town somewhere in Seoul, a quiet designer named ○○ walks into the same café every Thursday afternoon — and one day, ○○ sits at the next table by accident.",
    "What follows is not the kind of story you'd put in a film. There are no chase scenes, no dramatic monologues — just a few hundred quiet conversations, a thousand small moments, and the slow, steady decision to share a life.",
    "On the date below, the two of them open a new chapter — not as actors in someone else's story, but as the writers of their own.",
  ],
}

// 크레딧: 역할 라벨 영문 + 한글 병기, 이름 한국어 + 영문 보조
export const credits = [
  { role: "Directed by", roleKr: "감독", name: "○○" },
  { role: "Starring", roleKr: "주연", name: "○○ & ○○" },
  { role: "Producers", roleKr: "제작 · 신랑측", name: "○○○ · ○○○" },
  { role: "Producers", roleKr: "제작 · 신부측", name: "○○○ · ○○○" },
  { role: "Music By", roleKr: "음악", name: "20년의 기억들" },
  { role: "Cinematography", roleKr: "촬영", name: "서울의 햇살 가득한 오후들" },
  { role: "Wardrobe", roleKr: "의상", name: "린넨, 데님, 그리고 조용한 흰 드레스" },
  { role: "Catering", roleKr: "케이터링", name: "우리가 사랑한 모든 카페" },
  { role: "Special Thanks", roleKr: "특별 감사", name: "친구, 가족, 그리고 모든 조용한 증인들에게" },
] as const

/** 매년 자동 갱신 (6월 15일 16:00) */
export const getReleaseDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 5, 15, 16, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 5, 15, 16, 0, 0)
  }
  return thisYear
}

export const showtime = {
  // 한국어 메인 + 영문 보조
  theater: "○○ 호텔 그랜드볼룸",
  theaterEn: "○○ THEATER",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
