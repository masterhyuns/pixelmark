/**
 * PE-S2 Illustrator Vivid — Yara Lume
 * 언어 정책 v1.0 — 디스플레이는 영문 OK / 본문·작업 안내는 한국어 메인
 */

export const artist = {
  name: "Yara Lume",
  nameKr: "야라 룸",
  tagline: "Illustrator & Character Designer",
  taglineKr: "일러스트레이터 · 캐릭터 디자이너",
}

export const hero = {
  eyebrow: "Hello, Hi, 안녕!",
  body:
    "야라는 캐릭터와 색을 다루는 일을 합니다. 그림책, 굿즈, 잡지 표지, 그리고 가끔은 친구의 결혼 청첩장까지 — 따뜻하고 살짝 유쾌한 그림을 그립니다.",
}

export const works = [
  { num: "01", title: "Soft Friends · Series", titleKr: "부드러운 친구들", year: "2024", category: "캐릭터", image: "01" as const, span: "tall" as const },
  { num: "02", title: "Mountain Festival Poster", titleKr: "산속 축제 포스터", year: "2024", category: "포스터", image: "02" as const, span: "normal" as const },
  { num: "03", title: "Tiny Town", titleKr: "작은 마을", year: "2024", category: "에디토리얼", image: "03" as const, span: "wide" as const },
  { num: "04", title: "Tote Bag — 'Bloom'", titleKr: "토트백 굿즈 · 블룸", year: "2025", category: "굿즈", image: "04" as const, span: "normal" as const },
  { num: "05", title: "Cat & Window", titleKr: "고양이와 창문", year: "2025", category: "캐릭터", image: "05" as const, span: "normal" as const },
  { num: "06", title: "Magazine Cover · No.07", titleKr: "잡지 표지 · 7호", year: "2025", category: "에디토리얼", image: "06" as const, span: "tall" as const },
] as const

export const about = {
  eyebrow: "About · 작가 소개",
  title: "A small studio,\nlots of color.",
  titleKr: "작은 작업실, 가득한 색",
  paragraphs: [
    "야라는 서울의 작은 작업실에서 매일 아침 9시부터 저녁 6시까지 그림을 그립니다. 큰 회사에서 일러스트 디렉터로 5년을 보낸 뒤 독립해 작업실을 열었습니다.",
    "주로 캐릭터, 포스터, 잡지 표지, 굿즈를 작업하지만 — 그림책과 청첩장 같은 작은 의뢰도 가장 좋아합니다. 그림에 작은 이야기를 담을 수 있는 일이라서요.",
    "도구는 Procreate · iPad Pro · Photoshop · 그리고 가끔은 종이와 색연필.",
  ],
}

export const commission = {
  eyebrow: "Commission · 의뢰 안내",
  title: "Let's make something\nbright together.",
  titleKr: "밝은 작업, 함께 해요",
  fields: [
    { label: "Character", labelKr: "캐릭터 · 마스코트", caption: "브랜드 마스코트, SNS 캐릭터, 응용 시트까지.", price: "₩550,000부터" },
    { label: "Poster", labelKr: "포스터 · 표지", caption: "공연 포스터, 잡지 표지, 책 표지.", price: "₩420,000부터 / 1컷" },
    { label: "Goods", labelKr: "굿즈 · 패키지", caption: "토트백, 머그, 스티커, 패키지 일러스트.", price: "₩380,000부터 / 시트" },
    { label: "Editorial", labelKr: "에디토리얼", caption: "잡지 / 단행본 본문 일러스트, 한 호 최대 8컷.", price: "별도 협의" },
  ] as const,
  process: [
    { step: "01", title: "문의", caption: "이메일로 작업 종류와 일정을 알려 주세요." },
    { step: "02", title: "견적", caption: "1~2일 안에 견적과 일정을 보내드립니다." },
    { step: "03", title: "스케치", caption: "1차 시안 2~3개. 함께 톤을 잡아갑니다." },
    { step: "04", title: "납품", caption: "최종 파일은 PSD / PNG / JPG 모두 전달." },
  ] as const,
  contactEmail: "studio@yaralume.demo",
  contactInstagram: "@yaralume.demo",
}
