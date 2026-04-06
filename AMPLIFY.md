# AWS Amplify 배포 가이드

Pixelmark 포트폴리오 사이트를 AWS Amplify Hosting에 배포하는 순서.

React Router 7은 **SSR(Server-Side Rendering)** 앱이므로 Amplify의 **compute** 환경(Node 서버)을 사용한다. 정적 S3 호스팅만으로는 동작하지 않는다.

---

## 사전 준비 체크

- [x] `react-router.config.ts`에 `ssr: true` 설정됨
- [x] `package.json`에 `"start": "react-router-serve ./build/server/index.js"` 스크립트 있음
- [x] `package.json`에 `"engines": { "node": ">=20.0.0" }` 명시됨
- [x] 루트에 `.nvmrc` (Node 20) 존재
- [x] 루트에 `amplify.yml` 빌드 설정 존재
- [x] Git 저장소: `github.com/masterhyuns/pixelmark`

---

## 1. AWS 콘솔 — 새 Amplify 앱 생성

1. AWS 콘솔 접속 → **Amplify** 검색 → **AWS Amplify** 서비스 진입
2. 우측 상단 **리전: 서울(ap-northeast-2)** 선택 (한국 사용자 기준 가장 빠름)
3. 좌측 상단 **Create new app** → **Host web app** 선택

---

## 2. GitHub 저장소 연결

1. **Source** 단계에서 **GitHub** 선택 → **Continue**
2. GitHub OAuth 권한 요청 팝업 → **Authorize AWS Amplify**
3. 저장소 접근 범위 선택 창에서:
   - **Only select repositories** 권장 (보안)
   - `masterhyuns/pixelmark` 체크
   - **Save & Install**
4. Amplify 콘솔로 돌아오면 드롭다운에서:
   - **Repository**: `masterhyuns/pixelmark`
   - **Branch**: `main` (또는 원하는 배포 브랜치)
5. **Next** 클릭

---

## 3. 빌드 설정 검토

Amplify가 자동으로 `amplify.yml`을 감지한다.

- **App name**: `pixelmark-portfolio` (원하는 이름)
- **Build and test settings**: "Use the amplify.yml from your repository" 자동 선택됨
- **Advanced settings**:
  - **Build image**: 기본값(`Amazon Linux:2023`)이면 Node 20을 지원하므로 수정 불필요
  - **Build timeout**: 기본 30분 충분
  - **Environment variables**: 현재는 추가 없음 (필요 시 §6 참고)

**Next** 클릭 → **Review** 화면에서 최종 확인 → **Save and deploy**

---

## 4. 첫 빌드 모니터링

첫 빌드는 3~6분 정도 소요. Amplify 콘솔에서 실시간 로그 확인 가능.

**Phase별 진행**
1. **Provision**: 빌드 환경 준비
2. **Build**: `amplify.yml`의 preBuild(pnpm 설치) → build(pnpm run build) 실행
3. **Deploy**: 빌드 산출물을 compute 환경에 배포
4. **Verify**: 헬스 체크

빌드 성공 시 `https://main.xxxxxxxxx.amplifyapp.com` 형태의 기본 도메인이 발급된다.

---

## 5. 빌드 실패 시 흔한 이슈와 해결

### ❌ `pnpm: command not found`
- 원인: Amplify 기본 이미지에 pnpm 없음
- 해결: `amplify.yml`의 `preBuild`에 `npm install -g pnpm@10.28.1` 포함됨 (이미 설정됨)

### ❌ `Node version mismatch`
- 원인: Amplify 기본 Node가 구버전
- 해결: `.nvmrc`가 루트에 있고 `20`이 적혀있으면 Amplify가 자동 감지
- 보조: `package.json`의 `engines.node` 확인

### ❌ `SSR not detected` / 정적 사이트로만 배포됨
- 원인: React Router 7은 Next.js처럼 자동 감지 안 됨
- 해결: `amplify.yml`의 `baseDirectory: .` (전체 프로젝트)가 필수 → 이미 설정됨
- 확인: 빌드 로그에서 `build/server/index.js`가 생성됐는지 체크

### ❌ `ERR_MODULE_NOT_FOUND` at runtime
- 원인: `package.json`의 `"type": "module"`이 빠짐
- 해결: 이미 설정되어 있음 (확인 완료)

### ❌ `pnpm-lock.yaml changed`
- 원인: `--frozen-lockfile` 실패 (로컬과 CI의 pnpm 버전 차이)
- 해결: 로컬에서 `pnpm install` 다시 실행 후 lock 커밋 → push

---

## 6. 환경 변수 설정 (선택)

현재 코드 내 하드코딩된 값들이 있어 Amplify 환경변수로 빼는 것을 권장:

| 하드코딩 위치 | 현재 값 | 권장 환경변수 |
|--------------|---------|--------------|
| `app/utils/seo.ts` — `SITE_URL` | `https://kmong-dev.kr` | `SITE_URL` |
| `app/utils/seo.ts` — `KMONG_PROFILE_URL` | `https://kmong.com` | `KMONG_PROFILE_URL` |
| 각 라우트의 `EMAIL` 상수 | `your@email.com` | `CONTACT_EMAIL` |

**Amplify 콘솔에서 추가**
1. App settings → **Environment variables** → **Manage variables**
2. Key/Value 입력 → **Save**
3. 코드에서 `import.meta.env.VITE_SITE_URL` 등으로 참조 (단, `VITE_` prefix 필수)
4. Redeploy 트리거 필요

> **현재는 env 없이도 빌드/배포 됨.** 실제 운영 전 위 값들을 실제 값으로 교체하고, 민감한 값만 환경변수로 분리하는 것을 권장.

---

## 7. 커스텀 도메인 연결 (선택)

1. Amplify 콘솔 → 앱 선택 → 좌측 메뉴 **Domain management** → **Add domain**
2. 도메인 입력 (예: `pixelmark.kr`)
3. Amplify가 제시하는 DNS 레코드를 도메인 등록업체(가비아/후이즈/Route53 등)에 추가
   - `CNAME` 레코드 2개: Amplify 호스트 → 배포 URL + ACM 인증서 검증용
4. DNS 전파 및 ACM 인증서 발급 대기 (보통 5~30분)
5. 인증서 발급 완료 시 자동으로 `https://pixelmark.kr` 활성화

---

## 8. 자동 배포 파이프라인

- `main` 브랜치에 push → Amplify가 webhook 수신 → 자동 빌드·배포
- 다른 브랜치(staging 등)를 추가 배포하려면 Amplify 앱에 브랜치 추가 가능
- PR 프리뷰: App settings → Previews → Enable pull request previews

---

## 9. 배포 후 필수 확인

- [ ] 메인 `/` 정상 렌더
- [ ] `/projects`, `/about`, `/contact` 모두 200
- [ ] `/projects/beauty-landing` 등 동적 라우트 동작
- [ ] `/demos/beauty-landing`, `/demos/law-office/*`, `/demos/cafe-restaurant`, `/demos/personal-portfolio` 모두 200
- [ ] `/sitemap.xml` XML 반환 확인
- [ ] 페이지 소스 보기로 SSR 동작 확인 (HTML에 실제 콘텐츠가 있어야 함)
- [ ] Lighthouse 점수 확인 (Performance 90+, SEO 95+)
- [ ] 모바일/PC 반응형 확인
- [ ] 각 데모의 인터랙션(Lenis, 다크모드 등) 정상 동작

---

## 10. 비용 예상 (2026 기준, 참고)

Amplify Hosting은 사용량 기반:
- **빌드**: $0.01 / 분 (월 1,000분 무료)
- **호스팅(compute)**: 요청 수 + 함수 실행 시간 기반
  - 월 500,000 요청까지 프리티어
  - 이후 1M 요청당 약 $0.20
- **데이터 전송**: GB당 약 $0.15

**포트폴리오 트래픽 수준(월 1만 방문 이내)이라면 프리티어 안에서 무료에 가까움**

---

## 11. 재배포 / 롤백

### 재배포
- `main`에 새 커밋 push → 자동 재배포
- 수동 재배포: Amplify 콘솔 → 배포 이력 → **Redeploy this version**

### 롤백
- Amplify 콘솔 → 앱 → 배포 이력에서 이전 성공 빌드 선택 → **Redeploy this version**
- 또는 `main` 브랜치에 이전 커밋 revert push

---

## 체크리스트 요약

**로컬 준비 (완료)**
- [x] `.nvmrc` (Node 20)
- [x] `amplify.yml` 빌드 설정
- [x] `package.json` engines field
- [x] SSR 모드 활성화 확인
- [x] GitHub 저장소 `masterhyuns/pixelmark`로 push

**AWS 작업 (사용자 직접)**
- [ ] Amplify 앱 생성 (서울 리전)
- [ ] GitHub 저장소 연결
- [ ] 첫 빌드 성공 확인
- [ ] 환경 변수 설정 (실제 URL/이메일 교체)
- [ ] 커스텀 도메인 연결 (선택)
- [ ] 배포 후 라우트 전체 검증

---

## 참고 링크

- [Amplify Hosting 문서](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [React Router 7 배포 가이드](https://reactrouter.com/start/framework/deploying)
- [Amplify 빌드 사양 reference](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)
