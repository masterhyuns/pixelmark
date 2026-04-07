/**
 * generate-images.ts — fal.ai Flux 2 Pro 기반 데모 이미지 자동 생성 CLI
 *
 * 기획 지시서: /Users/hyuns/Documents/developer/kmong/Documents/portfolio/이미지-자동생성-지시서.md
 *
 * 사용:
 *   pnpm gen-images --demo event_E-S6_클래식-청첩장 --dry-run
 *   pnpm gen-images --demo event_E-S6_클래식-청첩장 --priority required
 *   pnpm gen-images --demo event_E-S6_클래식-청첩장 --only home-hero --overwrite
 *
 * v1.0 파일럿 — `--demo` 단일만 지원. `--all`, `--category`, `--retry-failed`는 v1.1.
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import * as dotenv from "dotenv"
import { fal } from "@fal-ai/client"
import sharp from "sharp"

// ============================================================
// 상수
// ============================================================

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORTFOLIO_ROOT = path.resolve(__dirname, "..")
const DOCS_ROOT = "/Users/hyuns/Documents/developer/kmong/Documents/기획"
const LOG_PATH = path.join(PORTFOLIO_ROOT, "scripts", ".gen-images.log")

/** fal.ai Flux 2 Pro 추정 단가 (공식 페이지 확인 후 보정). */
const COST_PER_IMAGE = 0.045

/** 컨벤션 기본 negative prompt (이미지.md에 개별 지정 없으면 주입). */
const DEFAULT_NEGATIVE =
  "people, faces, hands in frame, readable text, brand logos, watermark, signature, low quality, blurry, distorted"

/** 재시도 / rate limit. */
const MAX_RETRY = 3
const BACKOFF_MS = [1000, 2000, 4000]
const BETWEEN_JOBS_MS = 600

// ============================================================
// 타입
// ============================================================

type Priority = "required" | "recommended" | "optional"
const PRIORITY_RANK: Record<Priority, number> = { required: 0, recommended: 1, optional: 2 }
const PRIORITY_ICON: Record<Priority, string> = {
  required: "🔴",
  recommended: "🟡",
  optional: "🟢",
}

interface ImageJob {
  index: number
  filename: string
  outputDir: string // app/demos/<slug>/assets/images/<sub>/
  outputPath: string // 절대 경로
  width: number
  height: number
  priority: Priority
  prompt: string // 공통 컨셉 톤 합성 후 최종 프롬프트
  negativePrompt: string | null
  description: string
}

interface ParsedImageDoc {
  demoFolder: string
  slug: string
  commonTone: string | null
  jobs: ImageJob[]
}

interface CliOptions {
  demo: string
  priority: Priority
  dryRun: boolean
  overwrite: boolean
  numImages: number
  only: string[] | null
}

// ============================================================
// CLI 파서 (자체 구현, 의존성 0)
// ============================================================

const parseArgs = (argv: string[]): CliOptions => {
  const opts: CliOptions = {
    demo: "",
    priority: "required",
    dryRun: false,
    overwrite: false,
    numImages: 1,
    only: null,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    switch (a) {
      case "--demo":
        opts.demo = argv[++i] ?? ""
        break
      case "--priority": {
        const v = argv[++i] as Priority
        if (v !== "required" && v !== "recommended" && v !== "optional") {
          fail(`알 수 없는 priority: ${v}`)
        }
        opts.priority = v
        break
      }
      case "--dry-run":
        opts.dryRun = true
        break
      case "--overwrite":
        opts.overwrite = true
        break
      case "--num-images":
        opts.numImages = Number(argv[++i]) || 1
        break
      case "--only":
        opts.only = (argv[++i] ?? "").split(",").map((s) => s.trim()).filter(Boolean)
        break
      case "-h":
      case "--help":
        printUsage()
        process.exit(0)
        break
      default:
        if (a.startsWith("--")) console.warn(`⚠ 알 수 없는 옵션: ${a}`)
    }
  }
  if (!opts.demo) {
    printUsage()
    fail("--demo 옵션은 필수입니다.")
  }
  return opts
}

const printUsage = () => {
  console.log(`
generate-images — fal.ai Flux 2 Pro 이미지 자동 생성

사용:
  pnpm gen-images --demo <폴더명> [옵션]

옵션:
  --demo <폴더명>             필수. 예: event_E-S6_클래식-청첩장
  --priority <레벨>           required | recommended | optional (기본: required)
  --dry-run                  호출 없이 파싱/비용만 확인
  --overwrite                이미 존재하는 파일 덮어쓰기
  --num-images <N>           시안 수 (기본 1, 비용 N배)
  --only <파일명,...>         특정 파일만 (쉼표 구분)
`)
}

const fail = (msg: string): never => {
  console.error(`❌ ${msg}`)
  process.exit(2)
}

// ============================================================
// 이미지.md 파서
// ============================================================

/** 공통 컨셉 톤: "## 컨셉 톤" 다음 첫 fenced code block 내용 */
const extractCommonTone = (md: string): string | null => {
  const headingRe = /^##\s+컨셉\s*톤[^\n]*$/m
  const hm = headingRe.exec(md)
  if (!hm) return null
  const rest = md.slice(hm.index + hm[0].length)
  const codeRe = /```[\w-]*\n([\s\S]*?)```/
  const cm = codeRe.exec(rest)
  if (!cm) return null
  return cm[1].replace(/\s+/g, " ").trim()
}

interface TableRow {
  index: number
  description: string
  filename: string
  outputDir: string
  width: number
  height: number
  priority: Priority
}

/**
 * 슬러그를 개발지시서.md에서 추출.
 * 5컬럼 짧은 포맷(`파일 | 위치`)의 이미지.md는 저장 위치가 `assets/images/...` 로만
 * 시작하므로 슬러그를 따로 알아야 `app/demos/<slug>/` 프리픽스를 붙일 수 있다.
 */
const extractSlugFromDevDoc = (imageMdPath: string): string | null => {
  const devPath = path.join(path.dirname(imageMdPath), "개발지시서.md")
  if (!fs.existsSync(devPath)) return null
  const content = fs.readFileSync(devPath, "utf8")
  const m = /\*\*슬러그\*\*\s*:\s*`([\w-]+)`/.exec(content)
  return m ? m[1] : null
}

/**
 * 범위 문법 지원:
 *   idx: "2~5", filename: "gallery-01~04.webp"
 *   → [{2, gallery-01.webp}, {3, gallery-02.webp}, {4, gallery-03.webp}, {5, gallery-04.webp}]
 * 제로 패딩은 원본 숫자 폭에서 추론.
 */
interface ExpandedEntry {
  idx: number
  filename: string
}
const expandRange = (idxCell: string, nameCell: string): ExpandedEntry[] | null => {
  const idxM = /^(\d+)\s*~\s*(\d+)$/.exec(idxCell)
  if (!idxM) return null
  const nameM = /^([\w-]+?)-(\d+)\s*~\s*(\d+)\.webp$/.exec(nameCell)
  if (!nameM) return null

  const iStart = Number(idxM[1])
  const iEnd = Number(idxM[2])
  const [, prefix, nStartStr, nEndStr] = nameM
  const nStart = Number(nStartStr)
  const nEnd = Number(nEndStr)
  const padWidth = nStartStr.length
  if (iEnd - iStart !== nEnd - nStart) return null // 개수 불일치

  const out: ExpandedEntry[] = []
  for (let i = 0; i <= iEnd - iStart; i++) {
    const num = String(nStart + i).padStart(padWidth, "0")
    out.push({ idx: iStart + i, filename: `${prefix}-${num}.webp` })
  }
  return out
}

/**
 * 이미지 표 파싱 — 두 포맷 지원
 *  - Long  (6열): # | 용도 | 파일명 | 저장 위치 | 사이즈 | 우선순위
 *  - Short (5열): # | 파일 | 위치 | 사이즈 | 우선순위
 * Short 포맷은 `위치` 앞에 `app/demos/<slug>/` 프리픽스를 자동 삽입.
 * `idx`가 범위("2~5") 이고 파일명도 범위("gallery-01~04.webp") 이면 자동 expand.
 */
const extractTable = (md: string, slug: string | null): TableRow[] => {
  const lines = md.split("\n")

  // 헤더 위치 + 포맷 감지
  let headerIdx = -1
  let isShort = false
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    if (!/\|\s*#\s*\|/.test(l)) continue
    if (/파일명/.test(l) && /저장\s*위치/.test(l)) {
      headerIdx = i
      isShort = false
      break
    }
    if (/\|\s*파일\s*\|/.test(l) && /\|\s*위치\s*\|/.test(l)) {
      headerIdx = i
      isShort = true
      break
    }
  }
  if (headerIdx === -1) return []

  const rows: TableRow[] = []
  let prevDir = ""

  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i]
    if (!/^\s*\|/.test(line)) break
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((s) => s.trim())

    const minCells = isShort ? 5 : 6
    if (cells.length < minCells) continue

    let idxCell: string
    let descCell: string
    let nameCell: string
    let dirCell: string
    let sizeCell: string
    let prioCell: string

    if (isShort) {
      ;[idxCell, nameCell, dirCell, sizeCell, prioCell] = cells
      descCell = ""
    } else {
      ;[idxCell, descCell, nameCell, dirCell, sizeCell, prioCell] = cells
    }

    // 저장 위치 (백틱 제거, "동" 이면 이전 행 상속)
    let dir = dirCell.replace(/[`]/g, "").trim()
    if (dir === "동") dir = prevDir
    if (!dir) {
      console.warn(`⚠ 저장 위치 누락 (#${idxCell}) 스킵`)
      continue
    }
    prevDir = dir

    // Short 포맷이면 슬러그 기반 프리픽스 삽입
    if (isShort && !dir.startsWith("app/demos/")) {
      if (!slug) {
        console.warn(`⚠ 슬러그 추출 실패 — 개발지시서.md 확인 필요 (#${idxCell}) 스킵`)
        continue
      }
      // 이미 "assets/..." 로 시작하면 그대로 prepend
      const stripped = dir.replace(/^\/+/, "")
      dir = `app/demos/${slug}/${stripped}`
    }

    // 사이즈
    const sizeM = /(\d+)\s*[×x]\s*(\d+)/.exec(sizeCell)
    if (!sizeM) {
      console.warn(`⚠ 사이즈 파싱 실패 (#${idxCell}) 스킵`)
      continue
    }
    const width = Number(sizeM[1])
    const height = Number(sizeM[2])

    // 우선순위
    let priority: Priority = "optional"
    if (prioCell.includes("🔴")) priority = "required"
    else if (prioCell.includes("🟡")) priority = "recommended"
    else if (prioCell.includes("🟢")) priority = "optional"

    // 파일명 (백틱 제거)
    const rawName = nameCell.replace(/[`]/g, "").trim()

    // 범위 문법 체크
    const expanded = expandRange(idxCell.trim(), rawName)
    if (expanded) {
      for (const ent of expanded) {
        rows.push({
          index: ent.idx,
          description: descCell,
          filename: ent.filename,
          outputDir: dir,
          width,
          height,
          priority,
        })
      }
      continue
    }

    // 단일 행
    const idx = Number(idxCell)
    if (Number.isNaN(idx)) continue
    if (!/^[\w-]+\.webp$/.test(rawName)) {
      console.warn(`⚠ 파일명 형식 오류 스킵: "${rawName}"`)
      continue
    }

    rows.push({
      index: idx,
      description: descCell,
      filename: rawName,
      outputDir: dir,
      width,
      height,
      priority,
    })
  }
  return rows
}

interface PromptSection {
  filename: string
  prompt: string
  negativePrompt: string | null
  size: { width: number; height: number } | null
}

/** 프롬프트 모음 파싱: ### N. filename.webp ~ 다음 ### 또는 --- 사이 */
const extractPromptSections = (md: string): PromptSection[] => {
  const sections: PromptSection[] = []
  // ### 1. `home-hero.webp` (필수) 또는 ### 1. home-hero.webp
  const headingRe = /###\s+(\d+)\.\s*`?([\w-]+\.webp)`?[^\n]*/g
  const matches: Array<{ start: number; filename: string }> = []
  let m: RegExpExecArray | null
  while ((m = headingRe.exec(md)) !== null) {
    matches.push({ start: m.index + m[0].length, filename: m[2] })
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].start
    const end =
      i + 1 < matches.length
        ? md.indexOf("###", start) // 안전 fallback
        : md.length
    const nextStart = i + 1 < matches.length ? matches[i + 1].start - 1000 : end
    const sectionEnd = Math.max(start, Math.min(end, nextStart > 0 ? end : end))
    const body = md.slice(start, sectionEnd)

    // 첫 fenced code block
    const codeM = /```[\w-]*\n([\s\S]*?)```/.exec(body)
    if (!codeM) {
      console.warn(`⚠ 프롬프트 code block 누락: ${matches[i].filename}`)
      continue
    }
    const prompt = codeM[1].replace(/\s+/g, " ").trim()

    // Negative
    const negM = /\*\*Negative\*\*\s*:\s*`?([^`\n]*)`?/i.exec(body)
    const negativePrompt = negM ? negM[1].trim().replace(/`/g, "") || null : null

    // Size
    const sizeM = /\*\*Size\*\*\s*:\s*(\d+)\s*[×x]\s*(\d+)/i.exec(body)
    const size = sizeM ? { width: Number(sizeM[1]), height: Number(sizeM[2]) } : null

    sections.push({
      filename: matches[i].filename,
      prompt,
      negativePrompt,
      size,
    })
  }
  return sections
}

/** `app/demos/<slug>/assets/images/...` 패턴 검증 + slug 추출 */
const validateAndExtractSlug = (outputDir: string): string | null => {
  const m = /^app\/demos\/([\w-]+)\/assets\/images\//.exec(outputDir.replace(/\\/g, "/"))
  return m ? m[1] : null
}

/** 공통 컨셉 톤 + job 프롬프트 합성 */
const composePrompt = (commonTone: string | null, jobPrompt: string): string => {
  let base = jobPrompt
  if (commonTone) {
    base = `${commonTone}, ${jobPrompt}`
  }
  // no people / no faces 중복 검사
  if (!/no people/i.test(base)) base = `${base}, no people`
  if (!/no faces/i.test(base)) base = `${base}, no faces`
  if (base.length > 1500) {
    console.warn(`⚠ 프롬프트 길이 ${base.length}자 (1500자 초과, 잘릴 수 있음)`)
  }
  return base
}

const parseImageDoc = (filePath: string): ParsedImageDoc => {
  const md = fs.readFileSync(filePath, "utf8")
  const commonTone = extractCommonTone(md)

  // 슬러그는 개발지시서.md에서 먼저 추출(Short 포맷 대응).
  // 실패해도 Long 포맷이면 첫 행 저장 위치로 역추출 가능.
  const slugFromDev = extractSlugFromDevDoc(filePath)
  const rows = extractTable(md, slugFromDev)
  const sections = extractPromptSections(md)

  if (rows.length === 0) fail("표 파싱 결과 0건. 이미지.md 구조를 확인하세요.")

  // slug: 개발지시서에서 먼저, 실패 시 첫 행 저장 위치에서 fallback
  const firstDir = rows[0].outputDir
  const slug = slugFromDev ?? validateAndExtractSlug(firstDir)
  if (!slug) fail(`슬러그를 확인할 수 없음 (개발지시서.md와 저장 위치 둘 다 실패): "${firstDir}"`)

  const demoFolder = path.basename(path.dirname(filePath))

  // 표와 프롬프트 매칭
  const sectionMap = new Map(sections.map((s) => [s.filename, s]))
  const jobs: ImageJob[] = []
  for (const row of rows) {
    const sec = sectionMap.get(row.filename)
    if (!sec) {
      console.warn(`⚠ "${row.filename}" 프롬프트 섹션 누락 — 스킵`)
      continue
    }
    const width = sec.size?.width ?? row.width
    const height = sec.size?.height ?? row.height
    const finalPrompt = composePrompt(commonTone, sec.prompt)
    const outputPath = path.join(PORTFOLIO_ROOT, row.outputDir, row.filename)
    jobs.push({
      index: row.index,
      filename: row.filename,
      outputDir: row.outputDir,
      outputPath,
      width,
      height,
      priority: row.priority,
      prompt: finalPrompt,
      negativePrompt: sec.negativePrompt,
      description: row.description,
    })
  }

  return { demoFolder, slug: slug!, commonTone, jobs }
}

// ============================================================
// fal.ai 호출 + 다운로드 + webp 변환
// ============================================================

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

interface GenerationResult {
  ok: boolean
  durationMs: number
  error?: string
}

const generateOne = async (job: ImageJob, numImages: number): Promise<GenerationResult> => {
  const startedAt = Date.now()
  let lastErr: unknown = null
  for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
    try {
      // fal SDK의 Flux2ProInput 타입이 엄격해 num_images / negative_prompt 등
      // 실제 API가 받는 필드 일부를 선언하지 않았음 → 객체로 먼저 만들고 통째로 캐스팅
      const input = {
        prompt: job.prompt,
        image_size: { width: job.width, height: job.height },
        num_images: numImages,
        enable_safety_checker: true,
        negative_prompt: job.negativePrompt ?? DEFAULT_NEGATIVE,
        output_format: "png",
      } as unknown as Record<string, unknown>

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (fal.subscribe as any)("fal-ai/flux-2-pro", {
        input,
        logs: false,
      })

      // 응답에서 첫 이미지 url 추출 (SDK 버전에 따라 형태 다를 수 있어 방어적으로)
      const url: string | undefined = result?.data?.images?.[0]?.url ?? result?.images?.[0]?.url
      if (!url) {
        throw new Error("fal 응답에서 이미지 url을 찾을 수 없음")
      }

      // 다운로드
      const res = await fetch(url)
      if (!res.ok) throw new Error(`이미지 다운로드 실패: ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())

      // webp 변환 + 사이즈 강제
      fs.mkdirSync(path.dirname(job.outputPath), { recursive: true })
      await sharp(buf)
        .resize(job.width, job.height, { fit: "cover" })
        .toFormat("webp", { quality: 90 })
        .toFile(job.outputPath)

      return { ok: true, durationMs: Date.now() - startedAt }
    } catch (err) {
      lastErr = err
      const msg = err instanceof Error ? err.message : String(err)
      // safety_checker 차단은 재시도 무의미
      if (/safety|nsfw|content/i.test(msg)) {
        return { ok: false, durationMs: Date.now() - startedAt, error: `safety: ${msg}` }
      }
      if (attempt < MAX_RETRY - 1) {
        console.warn(`  ↻ 재시도 ${attempt + 1}/${MAX_RETRY - 1} (${msg})`)
        await sleep(BACKOFF_MS[attempt])
      }
    }
  }
  return {
    ok: false,
    durationMs: Date.now() - startedAt,
    error: lastErr instanceof Error ? lastErr.message : String(lastErr),
  }
}

// ============================================================
// 로그
// ============================================================

const appendLog = (line: string) => {
  try {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true })
    fs.appendFileSync(LOG_PATH, line + "\n", "utf8")
  } catch (err) {
    console.warn("로그 기록 실패:", err)
  }
}

const readCumulativeCost = (): number => {
  if (!fs.existsSync(LOG_PATH)) return 0
  const content = fs.readFileSync(LOG_PATH, "utf8")
  let total = 0
  for (const line of content.split("\n")) {
    const m = /\$([\d.]+)/.exec(line)
    if (m) total += Number(m[1])
  }
  return total
}

// ============================================================
// 메인
// ============================================================

const pad = (s: string, n: number) => (s.length >= n ? s : s + " ".repeat(n - s.length))

const main = async () => {
  // .env.local 로드
  dotenv.config({ path: path.join(PORTFOLIO_ROOT, ".env.local") })

  const opts = parseArgs(process.argv.slice(2))

  const key = process.env.FAL_KEY
  if (!key && !opts.dryRun) {
    fail("FAL_KEY 환경변수가 없습니다. portfolio/.env.local에 FAL_KEY=... 추가하세요.")
  }
  if (key) fal.config({ credentials: key })

  // 이미지.md 경로
  const mdPath = path.join(DOCS_ROOT, opts.demo, "이미지.md")
  if (!fs.existsSync(mdPath)) {
    fail(`이미지.md 파일을 찾을 수 없음: ${mdPath}`)
  }

  const parsed = parseImageDoc(mdPath)

  // priority 필터
  const threshold = PRIORITY_RANK[opts.priority]
  let jobs = parsed.jobs.filter((j) => PRIORITY_RANK[j.priority] <= threshold)

  // --only 필터
  if (opts.only) {
    const onlySet = new Set(
      opts.only.map((s) => (s.endsWith(".webp") ? s : `${s}.webp`))
    )
    jobs = jobs.filter((j) => onlySet.has(j.filename))
  }

  // 헤더 출력
  const countByPriority = {
    required: parsed.jobs.filter((j) => j.priority === "required").length,
    recommended: parsed.jobs.filter((j) => j.priority === "recommended").length,
    optional: parsed.jobs.filter((j) => j.priority === "optional").length,
  }

  console.log()
  if (opts.dryRun) {
    console.log(`[DRY RUN] ${parsed.demoFolder} → ${parsed.slug}`)
  } else {
    console.log(`▶ ${parsed.demoFolder} → ${parsed.slug}`)
  }
  console.log(`  ✓ ${parsed.jobs.length} jobs parsed`)
  console.log(
    `  🔴 required: ${countByPriority.required}  🟡 recommended: ${countByPriority.recommended}  🟢 optional: ${countByPriority.optional}`
  )
  console.log(
    `  💰 estimated cost (selected, ${opts.numImages}x): $${(jobs.length * COST_PER_IMAGE * opts.numImages).toFixed(3)}`
  )
  if (parsed.commonTone) {
    console.log(`  ℹ 공통 컨셉 톤: ${parsed.commonTone.slice(0, 80)}${parsed.commonTone.length > 80 ? "…" : ""}`)
  }
  console.log()

  if (opts.dryRun) {
    // 드라이런: job 리스트만 출력
    jobs.forEach((job, i) => {
      console.log(
        `  [${pad(`${i + 1}/${jobs.length}`, 5)}] ${PRIORITY_ICON[job.priority]} ${pad(job.filename, 26)} ${job.width}×${job.height}`
      )
    })
    console.log()
    console.log(`✓ dry-run 완료. API 호출 없음.`)
    return
  }

  // 실제 생성
  let success = 0
  let skipped = 0
  let failed = 0
  let totalCost = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const prefix = `[${pad(`${i + 1}/${jobs.length}`, 5)}] ${PRIORITY_ICON[job.priority]} ${pad(job.filename, 26)}`

    // overwrite 체크
    if (!opts.overwrite && fs.existsSync(job.outputPath)) {
      console.log(`${prefix} ⏭  already exists (use --overwrite)`)
      skipped++
      continue
    }

    process.stdout.write(`${prefix} ⏳ generating...\n`)
    const r = await generateOne(job, opts.numImages)
    if (r.ok) {
      totalCost += COST_PER_IMAGE * opts.numImages
      success++
      console.log(
        `${prefix} ✅ saved (${(r.durationMs / 1000).toFixed(1)}s, $${(COST_PER_IMAGE * opts.numImages).toFixed(3)})`
      )
    } else {
      failed++
      console.log(`${prefix} ❌ ${r.error}`)
    }

    // rate limit
    if (i < jobs.length - 1) await sleep(BETWEEN_JOBS_MS)
  }

  // 로그 기록
  const timestamp = new Date().toISOString()
  const state = failed === 0 ? "success" : success === 0 ? "failed" : "partial"
  appendLog(
    `${timestamp} | ${parsed.demoFolder} | ${parsed.slug} | ${success}/${jobs.length} | $${totalCost.toFixed(3)} | ${state}`
  )

  // 리포트
  const cumulative = readCumulativeCost()
  console.log()
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("📊 generate-images 결과 리포트")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log(`데모: ${parsed.demoFolder} → ${parsed.slug}`)
  console.log()
  console.log(`✅ 성공: ${success}장`)
  console.log(`⏭  스킵: ${skipped}장`)
  console.log(`❌ 실패: ${failed}장`)
  console.log()
  console.log(`💰 이번 실행 비용: $${totalCost.toFixed(3)}`)
  console.log(`💰 누적 비용: $${cumulative.toFixed(3)}`)
  console.log()
  console.log(`📁 출력: app/demos/${parsed.slug}/assets/images/`)
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // 종료 코드
  if (failed === 0) process.exit(0)
  if (success === 0) process.exit(2)
  process.exit(1)
}

main().catch((err) => {
  console.error("❌ 예기치 못한 오류:", err)
  process.exit(2)
})
