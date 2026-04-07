/**
 * E-S11 Wedding Cinematic — 영화 포스터 청첩장 데이터
 *
 * [가상 영화사] PIXELMARK PICTURES
 */

export const movie = {
  studio: "Pixelmark Pictures",
  presents: "PIXELMARK PICTURES PRESENTS",
  title: "FOREVER, AT FIRST SIGHT",
  subtitle: "A Love Story by ○○ & ○○",
  rating: "ALL AUDIENCES · LOVE STORY",
  tagline: "Some stories begin where the credits never roll.",
}

export const couple = {
  groomEn: "○○",
  brideEn: "○○",
  groomKr: "○○",
  brideKr: "○○",
}

export const meta = [
  { label: "Director", value: "○○" },
  { label: "Starring", value: "○○ & ○○" },
  { label: "Genre", value: "Romance / Drama" },
  { label: "Runtime", value: "A Lifetime" },
  { label: "Rating", value: "★★★★★" },
  { label: "Studio", value: "Pixelmark Pictures" },
] as const

export const synopsis = {
  log: "// LOG",
  paragraphs: [
    "In a small town somewhere in Seoul, a quiet designer named ○○ walks into the same café every Thursday afternoon — and one day, ○○ sits at the next table by accident.",
    "What follows is not the kind of story you'd put in a film. There are no chase scenes, no dramatic monologues — just a few hundred quiet conversations, a thousand small moments, and the slow, steady decision to share a life.",
    "On the date below, the two of them open a new chapter — not as actors in someone else's story, but as the writers of their own.",
  ],
}

export const credits = [
  { role: "Directed by", name: "○○" },
  { role: "Starring", name: "○○ & ○○" },
  { role: "Producers", name: "○○○ · ○○○ (Groom's Side)" },
  { role: "Producers", name: "○○○ · ○○○ (Bride's Side)" },
  { role: "Music By", name: "Memories of Twenty Years" },
  { role: "Cinematography", name: "Sunlit Afternoons in Seoul" },
  { role: "Wardrobe", name: "Linen, Denim, and a Quiet White Dress" },
  { role: "Catering", name: "All The Cafés We Loved" },
  { role: "Special Thanks", name: "Friends, Family, and Every Quiet Witness" },
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
  theater: "○○ THEATER",
  theaterKr: "○○ 호텔 그랜드볼룸",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}
