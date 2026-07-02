---
name: uture-spot-graphics
description: Use when adding or editing the uture landing site's abstract UI "spot graphics" — the illustrative diagram panels (search/analyze/embed-style nodes, connectors, media tiles, gradient-glow panels, scene/waveform strips, embedding dot-clouds, tab demos, feature-card illustrations). Covers in-page SVG/CSS+GSAP graphics, in-page GSAP demo sequences, and (rarely) Remotion-rendered video versions.
---

# Uture Spot Graphics

Branded twelvelabs-style "spot graphics" = abstract UI illustrations built from a tiny shared vocabulary.

## Delivery paths — pick in this order

| Path | Use for | Tech |
|------|---------|------|
| **In-page 다이어그램 (default)** | 섹션 다이어그램, 카드 일러스트, 정적+앰비언트 모션 | React + SVG/CSS (graphics primitives) |
| **In-page GSAP 시퀀스** | "제품 데모"류 UI 시퀀스 — 타이핑→처리→결과 같은 스토리 루프 (히어로 비주얼, 탭 데모) | React + GSAP timeline (`web/src/components/demos/`) |
| **Remotion 영상 (최후)** | 시네마틱 연출, 사이트 밖으로 내보낼 클립 | `motion/` → WebM/MP4 |

**UI 시퀀스를 영상으로 만들지 말 것.** 과거 기본이었던 "Remotion → 알파 WebM" 경로는 두 가지 실결함으로 강등됨:
1. **알파 WebM(VP8/VP9)은 iOS Safari에서 재생 불가** — 아이폰에서 빈 화면이 된다.
2. **영상 압축이 작은 한글 UI 텍스트를 뭉갠다** — 스토리 가독성 훼손.
인페이지 GSAP 시퀀스는 텍스트가 레티나에서 선명하고, 수 KB이며, reduced-motion 대응이 자연스럽다.

## Colour rules

**오렌지 리드 + 7색 파스텔 — 단, 로테이션 단위는 "섹션"이다 (사용자 확정 원칙).**
한 화면(섹션) 안에서는 틴트 **하나만** 쓴다: 내러티브=amber, 피처 카드 4장=sky, 탭 데모=탭당 1색.
한 화면에 파스텔 3색 이상 섞으면 유치해 보인다("아기자기" 피드백의 원인).
로테이션은 페이지 레벨 섹션 간에만. 오렌지는 최종 강조 포인트로만.
토큰은 `web/src/styles/globals.css` `:root`의 `--c-*` 7색만 사용.

**장식 배경은 와이어프레임으로.** 블러 그라디언트 덩어리(캡슐) 대신 1~1.5px 아웃라인
UI 실루엣(캡슐/타일) + 채움은 소량(틴트 13% 수준)만 — `PinnedNarrative`의 `.n-shape` 참고.
다크 차콜 밴드(`.band-dark`, 토큰 오버라이드)로 라이트↔다크 섹션 리듬을 만들 수 있다.

**히어로 배경 = 프로스트 타일 행렬 영상 (사용자 확정, 2026-07-02).**
사용자가 `examples/TWL_Web_Generate_2508px.mp4`(트웰브랩스 원본, 참고용 — 그대로 쓰지 말 것)를
레퍼런스로 지정 → `motion/src/TileFlow.tsx`로 재창작, `web/public/assets/motion/hero-tiles.mp4`
임베드는 `graphics/HeroTilesVideo.tsx`. 이전 시도(구슬 체인 CSS/JS/영상)는 전부 기각됨.
성립 조건:
1. **타일 내부가 전부다** — 시드 랜덤 색 패치(radial-gradient 4~5겹, 코어 32%까지 진하게
   유지) + 절반 확률 광택 밴드. 균일한 그라디언트는 납작해서 실패한다.
2. 둥근 사각 타일(radius 36%), 대각선 두 줄 행진, 가장자리로 갈수록 큼(원근), 서로 안 겹침.
3. 심리스 루프: 한 루프에 정확히 M칸 전진 + 외형 시드 = (slot mod M).
4. 좌측 텍스트 존 보호는 **페이지 CSS mask**로 (영상에 굽지 말 것 — object-cover 크롭 때문에
   뷰포트마다 어긋난다).
5. 배경색(#f5f5f5) 구운 H.264 + CRF28 재인코딩(≈2MB) + 포스터 스틸. 웜 팔레트만(오렌지 리드).

## In-page 다이어그램 (primitives)

**Reuse the existing primitives — do not reinvent.** `web/src/components/graphics/`:

- `primitives.tsx` — `GFrame`(틴트 글로우 패널; `tint`/`grid`/`compact`), `GNode`(필 칩), `GConn`(커넥터), `GTile`(미디어 타일), `GStrip`(바 스트립), `GDots`(임베딩 클라우드), `GStack`.
- `icons.tsx` — `GIcon` 16px 라인 아이콘.
- `composed.tsx` — 완성 그래픽 + **피처 카드 마이크로 루프**(`fs-*` 클래스, 6s CSS 루프 — 스캔/체크 확산/블록 조립/사이클) 참고 템플릿.
- `NarrativeScenes.tsx` — 스크럽 타임라인과 결합되는 장면 카드(`ns-*`) 예시.
- `graphics.css` — 모든 `.g-*`/`.fs-*` 스타일. `.g-tint-*`는 CSS 변수만 세팅하므로 GFrame 밖 래퍼에도 붙일 수 있다.

### Recipe — 새 다이어그램
1. 파스텔 틴트 하나 선택(형제 카드들과 로테이션).
2. `<GFrame tint=...>` 안에 프리미티브 조합 (`GNode → GConn → 타일/스트립`).
3. `composed.tsx`에 추가, 섹션에서 렌더.
4. 프리뷰로 검증 (백그라운드 탭이면 rAF 스로틀로 애니메이션이 멈춰 보임 — 코드 버그로 오판하지 말 것).

### Recipe — CSS 마이크로 루프 (피처 카드류)
- 6s `infinite` keyframes + `animation-delay: calc(var(--i) * …)` 스태거.
- **base 상태 = 최종 프레임**으로 설계 — `prefers-reduced-motion`에서 `animation: none`이면 완성 장면이 정적으로 보인다. keyframes가 0%에서 숨겼다가 등장시키는 구조.

## In-page GSAP 시퀀스 (데모)

인프라: `web/src/components/demos/stage.tsx`
- `useLoopTimeline(build)` — 루프 타임라인 드라이버. 뷰포트 진입 시 재생/이탈 시 정지(IntersectionObserver), `prefersReduced`면 타임라인을 아예 만들지 않음.
- `typeText(tl, el, text)` — 플러그인 없는 타이핑 비트.
- `DemoStage` — 다이어그램 프레임. **테마는 호스트 섹션에 맞춘다 (무조건 다크 금지, 사용자 확정)**:
  라이트 섹션 = 흰 카드 + 뉴트럴 와이어 + 오로라 캡슐(그라디언트 1곳) + 펄스 오렌지(진행·성과);
  다크 밴드/독립 클립 = 웜 니어블랙 + 단일 파스텔 아웃라인. 채움 강조는 데모당 하나. 크롬바 포함.
  레퍼런스: examples/ax-*.html (다크 5종 + 라이트 1종). 아톰: `.dm-bubble .dm-status .dm-card .dm-tag .dm-bar .dm-slides .dm-agents/.dm-agent`(서브에이전트 칩, 스피너→체크) `.dm-deliver`(메일/대시보드 딜리버리 칩) — demos.css.

**챗봇처럼 보이게 만들지 말 것 (사용자 명시 피드백).** 데모는 단순 문답이 아니라 **에이전트 오케스트레이션**을 보여준다: 서브에이전트 칩들이 병렬로 돌다가 하나씩 완료되고(`.dm-agent` 스피너→체크+결과 카운트), 결과는 화면 속 답변이 아니라 **메일 발송 · 대시보드 게시**(`.dm-deliver`)로 끝난다. 예약 실행(요청 없이 스스로 시작) 프레이밍도 좋은 패턴 — `DemoAssistant.tsx` 참고.

### Recipe — 새 시퀀스
1. **스토리를 한 문장으로** 먼저 쓴다 (예: "질문하면 사내 문서에서 근거와 함께 답이 온다").
2. 3박자 구성: **입력(타이핑) → 처리 → 결과 → 홀드 2s+**. 단계 사이는 `drawWire()`로
   세로 연결선(`.dm-wire`)을 그려 작업이 '흘러가는' 것을 보여준다 — 타이핑 시작 +
   플로우 다이어그램 문법의 하이브리드 (uture-motion-diagrams 스킬에서 이식, 사용자 확정).
   스피너 상태 칩보다 연결선 드로우가 더 절제된 '처리 중' 표현.
3. **마크업은 최종 프레임 그대로 렌더**하고, `build` 안에서 `tl.set`으로만 숨긴다 — reduced-motion이 자동으로 정적 최종 장면이 된다.
4. 셀렉터는 `gsap.context`로 root 스코프됨 — `tl.to('.js-doc', …)` 형태 OK. 전역 `document.querySelectorAll` 금지.
5. `DemoStage tint=`로 파스텔 배정 (탭 데모: search sky · assistant lilac · report amber).

기존 예시: `DemoSearch.tsx` `DemoAssistant.tsx` `DemoReport.tsx` `HeroAutomation.tsx`(3막 크로스페이드 — act 그룹 absolute 스택, CSS는 최종막만 기본 표시).

### 스크롤 결합 (내러티브형)
핀 스크럽 타임라인에 장면 크로스페이드를 같은 위치(`'<'`)로 끼운다 — `PinnedNarrative.tsx` 참고.

## Remotion path (시네마틱/내보내기 전용)

Project: `motion/` (`motion/src/SpotGraphic.tsx` 예시). **사이트 내 UI 시퀀스에는 쓰지 않는다** (위 결함 참고).
1. `useCurrentFrame()` + `interpolate()`/`spring()` (installed `remotion-best-practices` 스킬 필수 참조).
2. 브랜드 hex 하드코딩 (CSS 변수 접근 불가): 오렌지 `#ff7a33`, 보더 `#d3d1cf`, 텍스트 `#1d1c1b` + 파스텔 7색.
3. Preview `cd motion && npm run dev`, 렌더는 배포 대상에 맞는 코덱 선택. 웹 임베드가 꼭 필요하면 알파 없는 MP4(H.264) + 페이지 배경색 매트를 우선 검토.
4. 한글 텍스트: 렌더 머신에 한글 폰트 필요.

## Common mistakes
- 새 악센트 색 발명 → 7색 토큰만. 새 색이 필요하면 같은 소프트/파스텔 대역.
- 모든 모션을 오렌지로만 → 파스텔 로테이션 위반 (사용자 명시 피드백).
- UI 데모를 영상으로 렌더 → iOS 미재생 + 텍스트 뭉갬. 인페이지 GSAP로.
- 시퀀스 마크업을 "시작 프레임"으로 렌더 → reduced-motion에서 빈 화면이 된다. 항상 최종 프레임.
- 백그라운드 탭 프리뷰에서 애니메이션이 느리다고 디버깅 시작 → rAF 스로틀. `document.hidden` 먼저 확인.
- 한 패널에 여러 틴트 혼합 → 패널당 한 틴트.
