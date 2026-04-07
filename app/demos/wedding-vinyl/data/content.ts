/**
 * E-S14 Wedding Vinyl — LP 청첩장 데이터
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
}

export const tracksA = [
  { num: "A1", title: "Save the Date", duration: "5.25" },
  { num: "A2", title: "How We Met", duration: "3.42" },
  { num: "A3", title: "First Dance", duration: "4.18" },
  { num: "A4", title: "Quiet Sundays", duration: "3.07" },
  { num: "A5", title: "The Letter", duration: "2.55" },
] as const

export const tracksB = [
  { num: "B1", title: "Promise", duration: "4.30" },
  { num: "B2", title: "Walking Home", duration: "3.18" },
  { num: "B3", title: "The Ceremony", duration: "11.00" },
  { num: "B4", title: "Last Slow Dance", duration: "5.20" },
  { num: "B5", title: "Forever (Outro)", duration: "1.30" },
] as const

export const greeting = {
  title: "Press play, take a seat.",
  paragraphs: [
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
  name: "○○ Sound Stage",
  nameKr: "○○ 사운드 스테이지",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const gallery = [
  { code: "01", title: "Turntable", caption: "Where every Sunday begins", image: "turntable" as const },
  { code: "02", title: "Cassettes", caption: "Mixtapes we made for each other", image: "cassette" as const },
  { code: "03", title: "Headphones", caption: "Two ears, one song, no words", image: "headphones" as const },
] as const
