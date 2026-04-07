/**
 * E-S15 Wedding Pixel — 게임 청첩장 데이터
 */

export const game = {
  title: "LOVE QUEST",
  subtitle: "Two Players, One Save File",
  player1: { name: "LIA", role: "Player 1", code: "P1" },
  player2: { name: "KAI", role: "Player 2", code: "P2" },
  studio: "PIXELMARK GAMES · 2026",
  pressStart: "PRESS START TO BEGIN",
}

export const stages = [
  { num: "01", label: "Story", color: "yellow" },
  { num: "02", label: "Quest", color: "green" },
  { num: "03", label: "Party", color: "red" },
  { num: "04", label: "Reward", color: "yellow" },
] as const

export const dialogue = [
  { speaker: "LIA", line: "그러니까... 우리 어떻게 만났더라?" },
  { speaker: "KAI", line: "친구가 만든 작은 파티였잖아. 그 시끄럽고 작은 방." },
  { speaker: "LIA", line: "맞아! 그날 너 진짜 조용했어." },
  { speaker: "KAI", line: "쟤가 너무 말을 많이 해서 끼어들 틈이 없었어." },
  { speaker: "LIA", line: "...그래서 결혼하기로 한 거지." },
  { speaker: "KAI", line: "응. 십 년 후에." },
] as const

export const quest = {
  name: "FINAL QUEST · The Wedding Day",
  objective: "Bring all guests to the venue",
  reward: "1 lifetime of memories",
  difficulty: "★★★☆☆",
}

/** 매년 자동 갱신 (10월 8일 17:00) */
export const getEventDate = (): Date => {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), 9, 8, 17, 0, 0)
  if (thisYear.getTime() <= now.getTime()) {
    return new Date(now.getFullYear() + 1, 9, 8, 17, 0, 0)
  }
  return thisYear
}

export const venue = {
  name: "○○ ARENA",
  nameKr: "○○ 아레나",
  address: "Seoul, Korea ○○",
  addressKr: "서울특별시 ○○구 ○○로 ○○",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=37.5665,126.9780&hl=ko&z=15&output=embed",
}

export const treasures = [
  { item: "BRIDE'S CHEST", side: "신부 측", bank: "○○BANK", number: "0000-0000-0000-00" },
  { item: "GROOM'S CHEST", side: "신랑 측", bank: "○○BANK", number: "0000-0000-0000-00" },
] as const
