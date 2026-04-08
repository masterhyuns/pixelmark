/**
 * E-S14 Wedding Vinyl — LP 청첩장 데이터
 *
 * [언어 정책 v1.0 §4-5]
 * - 앨범/Side A·B/곡명은 영문 디스플레이 유지
 * - 라이너 노트(greeting), 곡 매핑, venue는 한국어 메인
 */

export const album = {
  artist: "LUNA & FELIX",
  title: "OUR FIRST ALBUM",
  subtitle: "A Love Story in 12 Tracks",
  label: "PIXELMARK RECORDS",
  catalog: "PMR-001",
}

export const couple = {
  bride: "Luna",
  groom: "Felix",
  brideKr: "루나",
  groomKr: "펠릭스",
}

// 트랙: 곡명 영문 + 한글 매핑
export const tracksA = [
  { num: "A1", title: "Save the Date", titleKr: "그날의 약속", duration: "5.25" },
  { num: "A2", title: "How We Met", titleKr: "처음 만난 날", duration: "3.42" },
  { num: "A3", title: "First Dance", titleKr: "첫 춤", duration: "4.18" },
  { num: "A4", title: "Quiet Sundays", titleKr: "조용한 일요일", duration: "3.07" },
  { num: "A5", title: "The Letter", titleKr: "편지", duration: "2.55" },
] as const

export const tracksB = [
  { num: "B1", title: "Promise", titleKr: "약속", duration: "4.30" },
  { num: "B2", title: "Walking Home", titleKr: "집으로 가는 길", duration: "3.18" },
  { num: "B3", title: "The Ceremony", titleKr: "본식 (오후 5시 25분)", duration: "11.00" },
  { num: "B4", title: "Last Slow Dance", titleKr: "마지막 슬로우 댄스", duration: "5.20" },
  { num: "B5", title: "Forever (Outro)", titleKr: "영원 (아웃트로)", duration: "1.30" },
] as const

export const greeting = {
  title: "Press play, take a seat.",
  titleKr: "재생 버튼을 누르고, 자리에 앉아 주세요.",
  // 한국어 라이너 노트 메인
  paragraphs: [
    "루나와 펠릭스는 거의 10년 동안 둘이서 노래를 만들어 왔습니다. 주방에서, 느린 일요일 아침마다, 조용히.",
    "아래의 날짜에, 두 사람은 남은 평생을 위한 녹음 버튼을 누릅니다. 첫 번째 트랙은 'Save the Date'. Side A는 오후 5시 25분에 시작됩니다.",
  ],
  // 영문 디스플레이 옵션 (보존)
  paragraphsEn: [
    "Luna and Felix have been writing songs together — quietly, mostly in their kitchen, over slow Sunday mornings — for almost a decade.",
    "On the date below, they'll press the record button on the rest of their lives. The first track is called 'Save the Date.' Side A starts at 5:25 PM.",
  ],
}

/** 매년 자동 갱신 (5월 25일 17:25) */
export const getReleaseDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 4, 25, 17, 25, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 4, 25, 17, 25, 0)
  }
  return thisYear
}

export const venue = {
  // 한국어 메인 + 영문 보조
  name: "○○ 사운드 스테이지",
  nameEn: "○○ Sound Stage",
  address: "서울특별시 ○○구 ○○로 ○○",
  addressEn: "Seoul, Korea ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

// 갤러리: 카드 제목 영문 + 한국어 캡션
export const gallery = [
  { code: "01", title: "Turntable", titleKr: "턴테이블", caption: "모든 일요일이 시작되는 곳", image: "turntable" as const },
  { code: "02", title: "Cassettes", titleKr: "카세트", caption: "서로에게 만들어 주던 믹스테이프", image: "cassette" as const },
  { code: "03", title: "Headphones", titleKr: "헤드폰", caption: "두 귀, 하나의 노래, 말은 필요 없는", image: "headphones" as const },
] as const
