# 유쳐 랜딩 모션 전면 재제작 — 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 스토리가 읽히지 않는 기존 모션·영상(히어로 배경 webm, 탭 데모 webm 3종, 구슬 체인, 카드 일러스트)을 전부 걷어내고, "한 문장 스토리"가 있는 인페이지 GSAP 시퀀스와 스크롤 장면 카드로 교체한다.

**Architecture:** UI 시퀀스 모션(히어로 3막, 탭 데모 3종)은 알파 WebM 영상 대신 인페이지 GSAP 타임라인 React 컴포넌트로 구현한다(iOS Safari 알파 WebM 미지원 + 영상 압축의 한글 뭉갬 회피). 공용 훅 `useLoopTimeline`(뷰포트 진입 재생/이탈 정지, reduced-motion 시 최종 상태 정적 표시)과 데모 전용 아톰(`web/src/components/demos/`)을 만들고, 그 위에 각 시퀀스를 조립한다. 내러티브는 기존 핀 스크럽 타임라인에 장면 카드 크로스페이드를 결합하고, 피처 카드는 CSS 키프레임 마이크로 루프로 재제작한다.

**Tech Stack:** React 18 + TS, GSAP 3.13 (ScrollTrigger — 이미 `web/src/lib/gsap.ts`에 설정됨), CSS 브랜드 토큰(`--c-orange --c-peach --c-amber --c-rose --c-lilac --c-sky --c-mint`). 테스트 러너 없음 → 검증은 프리뷰 서버(스냅샷/스크린샷/콘솔)로 한다.

**컬러 원칙(전 태스크 공통):** 오렌지 리드 + 7색 파스텔 로테이션. 주황 단독 금지. 장면·탭·카드마다 지정된 틴트를 쓰고 오렌지는 포인트로만.

---

### Task 1: 공용 데모 스테이지 인프라

**Files:**
- Create: `web/src/components/demos/stage.tsx`
- Create: `web/src/components/demos/demos.css`
- Modify: `web/src/main.tsx` (css import 추가)

- [ ] **Step 1: `stage.tsx` 작성**

```tsx
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReduced } from '../../lib/gsap'

/**
 * Looping GSAP sequence driver for in-page product demos.
 * - Plays only while in viewport (IntersectionObserver), pauses off-screen.
 * - prefers-reduced-motion: timeline never built → markup shows final state.
 * `build` must ONLY hide/move elements via tl.set/tl.from so that the
 * no-timeline path renders the complete final frame.
 */
export function useLoopTimeline(
  build: (tl: gsap.core.Timeline, root: HTMLDivElement) => void,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReduced) return
    let tl: gsap.core.Timeline | null = null
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true })
      build(tl, root)
    }, root)
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? tl?.play() : tl?.pause()),
      { threshold: 0.3 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [build])
  return rootRef
}

/** Char-by-char typing beat (no TextPlugin needed). */
export function typeText(
  tl: gsap.core.Timeline,
  sel: string,
  text: string,
  cps = 22,
) {
  const state = { n: 0 }
  tl.set(sel, { textContent: '' })
  tl.to(state, {
    n: text.length,
    duration: text.length / cps,
    ease: 'none',
    onUpdate() {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.textContent = text.slice(0, Math.round(state.n))
      })
    },
  })
}

/** Tinted demo panel (product-UI 프레임). tint = brand pastel key. */
export function DemoStage({
  tint,
  label,
  children,
  stageRef,
}: {
  tint: 'sky' | 'lilac' | 'amber' | 'mint' | 'peach' | 'rose'
  label: string
  children: ReactNode
  stageRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div className={`dm-stage dm-${tint}`} ref={stageRef} aria-label={label} role="img">
      <div className="dm-chrome" aria-hidden>
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-chrome-label mono">{label}</span>
      </div>
      <div className="dm-body">{children}</div>
    </div>
  )
}
```

주의: `typeText`는 `sel`(root 범위 클래스 셀렉터) 대신 실제로는 `gsap.context` 안이므로 root-스코프 셀렉터 사용 가능 — 구현 시 `build(tl, root)`에서 `root.querySelector`로 엘리먼트를 잡아 클로저로 넘겨도 된다(전역 `document.querySelectorAll` 금지, root 스코프 유지).

- [ ] **Step 2: `demos.css` 작성** — 스테이지 프레임 + 공용 아톰 스타일

```css
/* ============ demo stage (in-page product-UI sequences) ============ */
.dm-stage {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: linear-gradient(180deg, #fdfcfb, #f6f4f2);
  overflow: hidden;
  position: relative;
  font-size: 14px;
}
.dm-stage::before {
  /* pastel wash — tint per stage, alpha kept low */
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 80% at 70% 0%, var(--dm-tint, transparent), transparent 62%);
  opacity: 0.16;
}
.dm-sky    { --dm-tint: var(--c-sky); }
.dm-lilac  { --dm-tint: var(--c-lilac); }
.dm-amber  { --dm-tint: var(--c-amber); }
.dm-mint   { --dm-tint: var(--c-mint); }
.dm-peach  { --dm-tint: var(--c-peach); }
.dm-rose   { --dm-tint: var(--c-rose); }

.dm-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.dm-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
.dm-chrome-label { margin-left: 8px; font-size: 11px; color: var(--muted); }
.dm-body { position: relative; padding: 22px; display: grid; gap: 12px; }

/* --- atoms --- */
.dm-bubble {
  justify-self: end;
  max-width: 85%;
  background: var(--text);
  color: #fff;
  border-radius: 16px 16px 4px 16px;
  padding: 10px 14px;
  line-height: 1.5;
}
.dm-bubble .dm-caret {
  display: inline-block;
  width: 2px; height: 1em;
  background: currentColor;
  vertical-align: text-bottom;
  animation: dm-caret 0.9s steps(2) infinite;
}
@keyframes dm-caret { 50% { opacity: 0; } }

.dm-status {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 12px;
  background: #fff;
}
.dm-status .dm-spin {
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--dm-tint) 60%, #d6d4d1);
  border-top-color: transparent;
  animation: dm-spin 0.8s linear infinite;
}
@keyframes dm-spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) {
  .dm-status .dm-spin, .dm-bubble .dm-caret { animation: none; }
}

.dm-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
  display: grid;
  gap: 8px;
}
.dm-card.is-hit { border-color: color-mix(in srgb, var(--dm-tint) 55%, var(--border)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dm-tint) 18%, transparent); }
.dm-row { display: flex; align-items: center; gap: 10px; }
.dm-title { font-weight: 600; font-size: 13.5px; }
.dm-meta { font-size: 12px; color: var(--muted); }
.dm-tag {
  font-size: 11px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 2px 8px;
  color: var(--text-2);
  background: #fff;
}
.dm-tag.is-accent { border-color: var(--c-orange); color: var(--c-orange); }
.dm-bar { height: 8px; border-radius: 4px; background: #eceae7; overflow: hidden; }
.dm-bar > span { display: block; height: 100%; width: 100%; border-radius: 4px; background: color-mix(in srgb, var(--dm-tint) 45%, #d6d4d1); transform-origin: left; }
```

- [ ] **Step 3: `web/src/main.tsx`에 import 추가**

```tsx
import './components/graphics/graphics.css'
import './components/demos/demos.css'
```

- [ ] **Step 4: 타입 체크** — Run: `npm --prefix web run build` → Expected: 통과 (기존 오류 없음 가정)

- [ ] **Step 5: Commit** — `git add web/src/components/demos web/src/main.tsx && git commit -m "데모 시퀀스 공용 인프라: useLoopTimeline + DemoStage"`

---

### Task 2: DemoSearch(사내 문서 검색) + ServiceTabs 전환

**Files:**
- Create: `web/src/components/demos/DemoSearch.tsx`
- Modify: `web/src/components/ServiceTabs.tsx` (video → 데모 컴포넌트 레지스트리)
- Modify: `web/src/data/content.ts` (serviceTabs에서 `video` 필드 제거는 Task 4에서)

**스토리(≈13s 루프, sky 틴트):** 질문 타이핑 → "사내 문서 검색 중" → 문서 4행 등장, 1행 하이라이트 → 근거 포함 답 카드 등장 → 홀드.

- [ ] **Step 1: `DemoSearch.tsx` 작성**

```tsx
import { useCallback } from 'react'
import { DemoStage, useLoopTimeline } from './stage'

const DOCS = [
  { title: '경비정산 규정 v3.2', meta: '재무팀 · 2026.03 개정', hit: true },
  { title: '국내 출장 가이드', meta: '총무팀 · 사내위키', hit: false },
  { title: '법인카드 사용 매뉴얼', meta: '재무팀 · PDF', hit: false },
  { title: '2026 회계 캘린더', meta: '재무팀 · 정산 마감일', hit: false },
]
const QUERY = '지난달에 경비정산 규정이 바뀌었다던데, 뭐가 달라졌어요?'

export function DemoSearch() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    const q = root.querySelector('.js-q') as HTMLElement
    // 초기 상태(타임라인에서만 숨김 → reduced-motion이면 전부 보임)
    tl.set(root.querySelectorAll('.js-status, .js-doc, .js-answer'), { autoAlpha: 0, y: 10 })
    // 1막 — 입력
    const state = { n: 0 }
    tl.to(state, {
      n: QUERY.length, duration: QUERY.length / 20, ease: 'none',
      onUpdate: () => { q.textContent = QUERY.slice(0, Math.round(state.n)) },
    })
    // 2막 — 처리
    tl.to('.js-status', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.3')
    tl.to('.js-doc', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.14 }, '+=0.2')
    tl.to('.js-doc.is-hit', { scale: 1.02, duration: 0.3 }, '+=0.3')
    // 3막 — 결과
    tl.to('.js-status', { autoAlpha: 0, duration: 0.3 }, '+=0.2')
    tl.to('.js-answer', { autoAlpha: 1, y: 0, duration: 0.5 })
    tl.to({}, { duration: 2.2 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="sky" label="uture · 사내 문서 검색" stageRef={ref}>
      <div className="dm-bubble"><span className="js-q">{QUERY}</span><span className="dm-caret" /></div>
      <div className="dm-status js-status"><span className="dm-spin" />사내 문서에서 근거 찾는 중…</div>
      {DOCS.map((d) => (
        <div className={`dm-card js-doc ${d.hit ? 'is-hit' : ''}`} key={d.title}>
          <div className="dm-row">
            <span className="dm-title">{d.title}</span>
            {d.hit && <span className="dm-tag is-accent">근거</span>}
          </div>
          <span className="dm-meta">{d.meta}</span>
        </div>
      ))}
      <div className="dm-card js-answer">
        <span className="dm-title">숙박비 상한이 12만원 → 15만원으로 올랐어요.</span>
        <span className="dm-meta">근거 · 경비정산 규정 v3.2 §4 (2026.03 개정)</span>
      </div>
    </DemoStage>
  )
}
```

- [ ] **Step 2: ServiceTabs에 데모 레지스트리 연결** — `<video>` 블록을 교체:

```tsx
import { DemoSearch } from './demos/DemoSearch'
// Task 3에서 DemoAssistant, DemoReport 추가

const DEMOS: Record<string, () => JSX.Element> = { search: DemoSearch }

// services-demo 내부:
// {Demo ? <Demo key={tab.id} /> : <video ... 기존 폴백 .../>}
```

기존 IntersectionObserver/play useEffect는 데모 탭에서 불필요 — video 폴백이 모두 사라지는 Task 4에서 제거.

- [ ] **Step 3: 프리뷰 검증** — services 섹션으로 스크롤, 탭1에서 타이핑→검색→답 시퀀스 육안 확인 + `preview_console_logs` error 없음.

- [ ] **Step 4: Commit** — `git commit -m "탭 데모 1/3: 사내 문서 검색 인페이지 GSAP 시퀀스"`

---

### Task 3: DemoAssistant + DemoReport

**Files:**
- Create: `web/src/components/demos/DemoAssistant.tsx`
- Create: `web/src/components/demos/DemoReport.tsx`
- Modify: `web/src/components/ServiceTabs.tsx` (레지스트리에 추가)

**DemoAssistant 스토리(lilac):** "오늘 뭘 챙겨야 하죠?" 타이핑 → 소스 칩 3개(메일 12 · 메신저 5 · 일정 3) 순차 점등 → 우선순위 체크리스트 3건 스태거 등장(P1 오렌지 태그) → 홀드.

```tsx
// DemoAssistant.tsx — DemoSearch와 동일 골격. 마크업:
// <div className="dm-bubble"><span className="js-q">…</span></div>
// <div className="dm-row js-sources">
//   <span className="dm-tag js-src">메일 12건</span>
//   <span className="dm-tag js-src">메신저 5건</span>
//   <span className="dm-tag js-src">일정 3건</span>
// </div>
// <div className="dm-card js-todo"> P1 · 정산 마감 회신 (오늘 5시) </div> ×3
// 타임라인 비트: typeText → .js-src stagger 0.2 → .js-todo stagger 0.25 → P1 태그 scale pop → 홀드 2s
const QUERY = '오늘 꼭 챙겨야 할 일 정리해줘요.'
const TODOS = [
  { p: 'P1', text: '경비정산 마감 회신 — 오늘 17:00', accent: true },
  { p: 'P2', text: '신규 입사자 온보딩 미팅 14:00', accent: false },
  { p: 'P3', text: '주간 리포트 초안 검토', accent: false },
]
```

**DemoReport 스토리(amber):** "주간 보고서, 회사 템플릿으로 만들어줘요" 타이핑 → 템플릿 아웃라인 바(표지/핵심 요약/실적 지표/다음 주 계획)가 차례로 채워짐(dm-bar fill) → 슬라이드 썸네일 4장 팝 → `초안 완성` 오렌지 태그 → 홀드.

```tsx
// DemoReport.tsx 마크업:
// <div className="dm-bubble">…</div>
// <div className="dm-card"> 4×(라벨 + .dm-bar>span.js-fill) </div>
// <div className="dm-row js-slides"> 4×<div className="dm-slide js-slide" /> + <span className="dm-tag is-accent js-done">초안 완성</span>
// 타임라인: typeText → js-fill scaleX 0→1 stagger 0.3 → js-slide stagger pop → js-done pop → 홀드
const SECTIONS = ['표지', '핵심 요약', '실적 지표', '다음 주 계획']
```

- [ ] **Step 1: 두 컴포넌트 작성** (위 비트/데이터 그대로, `useLoopTimeline` + `DemoStage tint="lilac"|"amber"`). `demos.css`에 `.dm-slide`(48×34 흰 카드, 첫 장만 amber 워시) 추가.
- [ ] **Step 2: ServiceTabs 레지스트리에 `assistant`, `report` 등록**
- [ ] **Step 3: 프리뷰 검증** — 탭 2·3 전환 시 각 시퀀스 재생, 콘솔 에러 없음.
- [ ] **Step 4: Commit** — `git commit -m "탭 데모 2·3: 어시스턴트/템플릿 생성 시퀀스"`

---

### Task 4: WorkDemo 영상 경로 제거 + 정리

**Files:**
- Modify: `web/src/components/ServiceTabs.tsx` (video 폴백/ref/useEffect 삭제)
- Modify: `web/src/data/content.ts` (serviceTabs.tabs의 `video` 필드 삭제)
- Delete: `web/public/assets/motion/work-demo-{search,assistant,report}.webm`
- Modify: `motion/src/Root.tsx` (WorkDemo Composition 제거), Delete: `motion/src/WorkDemo.tsx`

- [ ] **Step 1: ServiceTabs에서 `<video>`·videoRef·useEffect 제거**, `DEMOS[tab.id]` 직접 렌더
- [ ] **Step 2: content.ts에서 `video:` 3줄 삭제**
- [ ] **Step 3: webm 3개 + WorkDemo.tsx 삭제, Root.tsx 정리**
- [ ] **Step 4: `npm --prefix web run build` 통과 + 프리뷰에서 3탭 모두 정상**
- [ ] **Step 5: Commit** — `git commit -m "탭 데모 영상 경로 제거 (webm → 인페이지 시퀀스 완전 전환)"`

---

### Task 5: HeroAutomation — 히어로 3막 시퀀스

**Files:**
- Create: `web/src/components/demos/HeroAutomation.tsx`
- Modify: `web/src/components/Hero.tsx` (배경 video 제거, HeroVisual → HeroAutomation)
- Modify: `web/src/styles/components.css` (.hero-motion 삭제, .hero-visual 컨테이너 조정)
- Delete: `web/src/components/HeroVisual.tsx`, `web/public/assets/motion/hero-flow.webm`
- Modify: `motion/src/Root.tsx` (HeroFlow 제거), Delete: `motion/src/HeroFlow.tsx`

**스토리(≈14s 루프):** 하나의 패널 안에서 3막 크로스페이드.
1. **요청(sky):** 채팅 버블 타이핑 "이번 달 경비정산 마감 보고서 부탁해요"
2. **처리(lilac→amber):** 상태 스텝 3개가 순차 완료 — `사내 문서 검색`(lilac) → `데이터 표 작성`(amber) → `초안 완성`(mint 체크)
3. **자산화(mint+orange):** "사내 AX 도입 현황" 미니 보드(기존 HeroVisual 행 재사용: 주간 리포트 자동화 에이전트 등 3행) 위로 새 행 `경비정산 보고 자동화 · 재무팀 · 운영중`이 슬라이드 인 + 카운터 `+1`(오렌지) — 홀드 후 루프.

- [ ] **Step 1: `HeroAutomation.tsx` 작성** — `DemoStage`는 탭 데모용 chrome이 있으므로 히어로는 자체 래퍼 `.hero-seq`(유리 패널, hv-card 스타일 계승) 사용. 마크업 3그룹(`.js-act1/2/3`), `useLoopTimeline`으로 막 전환(`autoAlpha` 크로스페이드, 막당 3.5~4.5s). 행 데이터는 HeroVisual의 ROWS에서 3행 + 신규 행 1행을 가져와 이 파일에 상수로 이전.
- [ ] **Step 2: Hero.tsx 정리** — 배경 `<video>` + videoRef useEffect 삭제, `<HeroVisual />` → `<HeroAutomation />`. hero-aura는 유지.
- [ ] **Step 3: CSS** — `.hero-motion` 블록 삭제, `.hero-visual`(포지셔닝 래퍼)은 `.hero-seq`로 개명해 재사용(우측 배치·float 애니메이션·모바일 hidden 유지), hv-* 스타일 중 보드 행 스타일은 3막 보드에 재사용.
- [ ] **Step 4: 파일 삭제 + Root.tsx 정리** — hero-flow.webm, HeroVisual.tsx, HeroFlow.tsx 삭제. `motion/src/Root.tsx`엔 SpotGraphic만 남음.
- [ ] **Step 5: 검증** — 빌드 통과, 프리뷰 히어로에서 3막 루프 + 넓은 뷰포트(1280)에서 우측 배치, 콘솔 클린.
- [ ] **Step 6: Commit** — `git commit -m "히어로: 배경 webm 제거, 업무 자동화 3막 시퀀스로 교체"`

---

### Task 6: 내러티브 — 장면 카드 전환

**Files:**
- Create: `web/src/components/graphics/NarrativeScenes.tsx`
- Modify: `web/src/components/PinnedNarrative.tsx` (FIELD/BeadChain/Placeholder 제거, 장면 결합)
- Modify: `web/src/styles/components.css` (.narrative-field/.float-* 정리, .narrative-scene 추가)
- Delete: `web/src/components/graphics/BeadChain.tsx`

**스토리:** 각 step 텍스트와 짝지어진 장면 3개가 스크럽 타임라인에서 텍스트와 함께 크로스페이드.
1. step 01 "모두에게 같은 강의" → 동일한 강의 타일 3행이 기계적으로 쌓임, 구석의 사람 노드에 `내 업무에는?` 말풍선 (amber whisper)
2. step 02 "실무로 이어지지 않는 학습" → `강의 노트` 노드와 `내 업무` 보드 사이 **끊어진 점선 커넥터** (sky whisper)
3. step 03 "맞지 않는 범용 툴" → 범용 툴 블록이 `보안`·`데이터 정책` 태그에 막혀 슬롯에 안 맞음 (rose whisper)

- [ ] **Step 1: `NarrativeScenes.tsx` 작성** — 기존 프리미티브(GNode/GTile/GStrip/GConn dashed) 조합으로 `SceneLecture`/`SceneGap`/`SceneMisfit` 3개 + `export const narrativeScenes = [...]`. 각 장면은 `GFrame` 없이 투명 배경(뉴트럴 타일+파스텔 한 방울, 스팟 그래픽 문법).
- [ ] **Step 2: PinnedNarrative 개편** — FIELD 상수·BeadChain·Placeholder import 삭제. `.narrative-field` 대신 `.narrative-scene` 스택(스텝과 1:1, absolute 겹침)을 텍스트 옆(데스크톱 우측 45% / 모바일 hidden)에 렌더. 기존 스크럽 타임라인의 스텝 전환 비트에 `tl.to(scenes[i], …)` 크로스페이드를 같은 위치(`'<'`)에 추가. reduced-motion이면 첫 장면만 정적 표시.
- [ ] **Step 3: CSS** — `.narrative-field/.float-item/.float-clip/.float-time` 블록 삭제, `.narrative-scene` 스택 + 레이아웃(2컬럼) 추가. 모바일(≤820px)은 장면 hidden(기존 field와 동일 정책).
- [ ] **Step 4: BeadChain.tsx 삭제** (다른 참조 없음 확인됨 — PinnedNarrative가 유일)
- [ ] **Step 5: 검증** — 스크럽으로 3장면 전환 확인(스크롤 에뮬레이트), 콘솔 클린, reduced-motion 정적 폴백.
- [ ] **Step 6: Commit** — `git commit -m "내러티브: 구슬 체인 → 텍스트 호응 장면 카드"`

---

### Task 7: FeatureCards 스토리 마이크로 루프

**Files:**
- Modify: `web/src/components/graphics/composed.tsx` (SCENES 4종 재작성)
- Modify: `web/src/components/graphics/graphics.css` (마이크로 루프 keyframes 추가)

카드별 스토리/틴트 (모두 CSS 키프레임 루프, GSAP 불필요):

| name | 틴트 | 루프(≈6s) | 구현 |
|------|------|-----------|------|
| target | sky | 스캔 라인이 타일 6개를 훑고 지나가면 P1 태그 점등 | `.g-scan` 가로 라인 translateX 루프 + 타일 `.is-lit` 순차 점등(keyframes delay) |
| people | peach | 미팅 노드 펄스 → 체크마크가 업무 타일 3개로 순차 확산 | `.g-check` opacity/scale 스태거 keyframes |
| build | lilac | 블록 3개가 순차 슬라이드-인으로 조립 → 기어 태그 등장 | `.g-block` translateY+opacity 스태거 |
| cloud | mint | 사이클 링 회전 + 지표 바 2개가 차오름 | `.g-cycle` rotate 루프 + `.g-bar.is-fill` scaleX 루프 |

- [ ] **Step 1: graphics.css에 keyframes 추가** — `g-scan-sweep`, `g-lit-seq`, `g-check-pop`, `g-block-in`, `g-cycle-spin`, `g-fill-up`. 전부 `animation-timing` 완만, `prefers-reduced-motion`에서 `animation: none` (기존 미디어쿼리 블록에 추가).
- [ ] **Step 2: composed.tsx SCENES 재작성** — 각 장면 마크업에 위 클래스 부여. 틴트를 sky/peach/lilac/mint로 교체(현 peach/rose/lilac/amber에서 로테이션 재배치). 필요한 신규 마크업(`.g-scan` 라인, `.g-check` 체크 배지, `.g-cycle` 링)은 composed.tsx 안에서 span으로 구성 — 새 프리미티브 파일 불필요(YAGNI).
- [ ] **Step 3: 검증** — features 섹션 스크린샷 + 각 카드 루프 육안 확인.
- [ ] **Step 4: Commit** — `git commit -m "피처 카드 4종: 스토리 마이크로 루프로 재제작"`

---

### Task 8: 전체 검증

- [ ] **Step 1: 빌드** — `npm --prefix web run build` 통과
- [ ] **Step 2: 데스크톱 풀 패스** — 프리뷰에서 top→bottom 스크롤, 섹션별 스크린샷(히어로/내러티브/피처/탭), `preview_console_logs level=error` 클린
- [ ] **Step 3: 모바일(375px)** — 히어로 시퀀스/장면 카드 hidden 정책 확인, 탭 데모 세로 레이아웃 확인
- [ ] **Step 4: reduced-motion 에뮬레이션** — 모든 시퀀스가 최종 상태 정적 표시(빈 화면 없음)
- [ ] **Step 5: 미사용 자산 확인** — `web/public/assets/motion/`에 spot-search.webm만 남았는지, `grep -rn "hero-flow\|work-demo" web/src motion/src` 무결과
- [ ] **Step 6: Commit** (수정 있었으면)

---

### Task 9: uture-spot-graphics 스킬 갱신

**Files:**
- Modify: `.claude/skills/uture-spot-graphics/SKILL.md`

- [ ] **Step 1: 스킬 문서 개정**
  - 전달 경로 표: **in-page GSAP 시퀀스(신규 기본, `web/src/components/demos/` — useLoopTimeline/DemoStage)** / in-page SVG+CSS(다이어그램) / Remotion(시네마틱·내보내기 전용으로 강등)
  - 알파 WebM의 iOS Safari 미지원 + 영상 압축의 한글 텍스트 뭉갬 명시 — "UI 시퀀스는 영상으로 만들지 말 것"
  - 컬러 절: "모노크롬-퍼스트 + 색은 속삭임"을 **다이어그램(스팟 그래픽)에 한정**하고, 데모 시퀀스/모션은 "오렌지 리드 + 7색 파스텔 로테이션(주황 단독 금지)" 원칙 추가
  - 새 레시피: 데모 시퀀스 만들기(useLoopTimeline 훅 사용법, reduced-motion 최종상태 규칙, root-스코프 셀렉터)
- [ ] **Step 2: Commit** — `git commit -m "uture-spot-graphics 스킬 갱신: 인페이지 GSAP 시퀀스 기본화"`

---

## Self-Review 결과

- **스펙 커버리지:** 스펙 §1(히어로)=Task 5, §2(내러티브)=Task 6, §3(피처카드)=Task 7, §4(탭 데모)=Task 2–4, §5(스킬)=Task 9, 검증=Task 8. 누락 없음.
- **타입/네이밍 일관성:** `useLoopTimeline`/`DemoStage`/`typeText`는 Task 1 정의를 2·3·5가 사용. 데모 파일은 전부 `web/src/components/demos/`.
- **주의점:** Task 2의 `typeText` 전역 셀렉터 주의(root 스코프로 구현), Task 5에서 hv-* CSS 재사용 범위는 구현 시 판단.
