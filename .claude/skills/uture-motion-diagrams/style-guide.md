# uture Design System — Style Guide

Structure and grammar extracted from `예시디자인/` (TwelveLabs product visuals); **palette re-anchored to uture's own brand mains (purple + orange)** to stay distinct from the source. Sections 1–3 are **normative** (exact values for the invariants). Section 4 is **reference only** — example components you may reuse or ignore.

## 1. Tokens (normative)

### Dark theme (default)

```css
:root {
  --bg: #262221;            /* warm near-black, NOT pure black */
  --accent: #E9D5FC;        /* ONE of the brand mains: lavender-purple #E9D5FC | peach-orange #FFD2A8.
                               Situational alternates (when content calls for it): ice-blue #C9E6F6,
                               mint #CBEED9, rose #F9CFDA — same low saturation / high lightness. */
  --ink-on-accent: #262221; /* text on filled shapes */
  --stroke-w: 1.25px;
}
```

- Filled (the single emphasis point): `background: var(--accent); color: var(--ink-on-accent);`
- Outlined (everything else): `background: transparent; border: var(--stroke-w) solid var(--accent); color: var(--accent);`
- Lines/connectors: `stroke: var(--accent); stroke-width: 1.25;` rounded joins; leader/annotation lines are dashed (`stroke-dasharray: 3 5`).
- Translucent accent (tracks, grids, disabled): accent at 10–18% opacity.
- Forbidden on dark: box-shadow, glow, gradients, textures, a second accent.

### Light theme (aurora)

```css
:root {
  --bg: #EDECEA;           /* light warm gray */
  --card: #FFFFFF;
  --ink: #1A1A1A;
  --pulse: #FF8A3C;        /* vivid orange — progress / success / ticks only */
  --shadow: 0 8px 28px rgba(0,0,0,.10);   /* white cards only */
}
.aurora {                  /* the ONLY allowed gradient — purple → orange sunset */
  background: linear-gradient(105deg, #B79CF7 0%, #D9C2FC 25%, #F7BFD3 50%, #FFC89B 75%, #FF9857 100%);
  background-size: 200% 200%;
  animation: aurora-drift 8s ease-in-out infinite alternate;
}
@keyframes aurora-drift { from {background-position: 0% 40%;} to {background-position: 100% 60%;} }
```

- Aurora usage: fill of one hero shape, glow ring around media, or blurred segment capsules (`filter: blur(1px)` on the gradient layer). A purple-leaning variant (#8B5CF6, #A78BFA, #D8B4FE, #F3E8FF) or warm orange variant (#F4A05A, #F2875E, #FFB27A, #FFF0DC) is allowed for segment visuals.
- Light-theme neutrals: hairline `#DCDAD6`, secondary ink `#6B6864`, connector strokes `#C9C6C1` (never --pulse, never aurora for wires).
- The old lime `#A3E635` and lime→pink→peach aurora are RETIRED (source-brand palette) — do not use.
- Optional page frame: huge rounded rect (radius 80–120px) inset from the canvas edge.

### Typography (both themes)

```css
/* 한글 콘텐츠 필수: Inter/JetBrains Mono에는 한글 글리프가 없다 —
   Pretendard 폴백 없이는 한글이 시스템 폰트로 떨어져 깨져 보인다. */
font-family: 'Geist', 'Pretendard Variable', Pretendard, -apple-system, sans-serif;   /* labels: 12–14px, weight 500 — 사이트 본체와 동일 스택 */
.tag  { text-transform: uppercase; letter-spacing: .04em; font-size: 11px; }
.mono { font-family: 'Geist Mono', 'JetBrains Mono', 'Pretendard Variable', Pretendard, ui-monospace, monospace; font-size: 11px; } /* all data slots, incl. words in numeric slots */
```

```html
<!-- 허용된 외부 리소스: Google Fonts(Geist, Geist Mono) + Pretendard CDN — 유쳐 사이트 본체와 동일 -->
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
```

**오프라인/CDN 불가 환경**: 폰트가 스킬에 번들되어 있다 (`fonts/` — Pretendard Variable
전체 + Geist/Geist Mono latin subset, 전부 SIL OFL). 아티팩트 옆에 `fonts/` 폴더를
복사하고 위 CDN `<link>` 두 줄을 `<link rel="stylesheet" href="./fonts/fonts.css">`
한 줄로 대체하면 된다.

- Mini-pill wrapping applies to **small/inline data only**; display-size numbers (hero prices, big stats) are bare mono.
- 라틴/숫자는 Geist·Geist Mono가 담당하고, 한글만 Pretendard로 떨어진다 —
  두 서체 모두 그로테스크 계열이라 혼용이 자연스럽다. Bare `monospace` fallback can
  render serif-like in headless browsers.

### Shape radius scale

| Element size | Radius |
|---|---|
| Pill / capsule | 999px |
| Icon chip 26–32px | 10–12px |
| Card 150–300px | 22–28px |
| Frame / hero 500px+ | 80–120px |

Icons: inline SVG line icons only (1.25–1.5px stroke, round caps/joins). Never emoji or icon fonts in output.

## 2. Motion Grammar (normative)

```
typical 7–9s master loop:
0.0s  root/hero element: fade + 10px rise (500ms)
0.5s  connectors draw in via stroke-dashoffset (500–700ms)
1.0s  sibling elements stagger in, 120–180ms apart (fade + rise + scale .96→1)
2.0s  results/media fade in, staggered
2.8s  progress/data fills (linear)
      hold ≥1.2s (idle float ±4px / aurora drift continues)
last  whole scene fades out (400ms) → seamless restart
```

- Entrances: `cubic-bezier(.22,1,.36,1)`. Progress: `linear`. Idle: `ease-in-out`. No springs/bounce.
- All animations share ONE master `animation-duration` with percentage-based keyframe windows → perfect loop for screen recording.
- The ≥1.2s hold wins over loop length: 4+ stages or a progress fill → use 8–9s, don't squeeze.
- Static artifacts (infographics, mockups): motion optional; if present, entrance-only or idle-only.
- `prefers-reduced-motion`: show the final composed frame statically.

### CSS pitfalls

- Never put layout transforms (`translateX(-50%)`) on elements whose keyframes animate `transform` — keyframes override it and the element drifts. Center with `left:0; right:0; justify-content:center` or margin offsets.
- Draw-in lines: set `pathLength="1"` and animate `stroke-dashoffset` 1→0 with `stroke-dasharray: 1`.
- Floating badges that break a card's top edge (RECOMMENDED, 현재 단계): never `overflow:hidden` on the card — it clips the badge. If an inner ribbon needs clipping, round the ribbon itself instead.

## 3. Canvas & Delivery (normative)

- Canvas: 1200×900 default, 1600×900 wide; content centered, ~60% occupancy.
- Single self-contained HTML, inline `<style>` + inline SVG, no JS libraries. External resources: Google Fonts `Geist`/`Geist Mono` + Pretendard CDN (§1 Typography), nothing else.
- Save to `diagrams/<topic>-<theme>.html` (or the artifact's natural home in the project).

## 4. Reference Components (NON-normative — derive your own instead)

Proven instances of the invariants, from the examples. Reuse when they genuinely fit; otherwise design new components that satisfy the invariants.

| Component | Anatomy |
|-----------|---------|
| Capsule node | Pill, icon chip inside-left + label |
| Icon chip | 26–32px rounded square, line icon (play, audio, image, text-lines, sparkle=AI, search) |
| Timestamp tag | Outlined mini-pill, mono `(▶)(0:32–0:38)` + optional uppercase label pill, dashed leader to the media/segment it describes |
| Vector-index grid | Rounded card, faint grid (10–15% opacity), scattered filled squares + media chips |
| Tree connector | Hairline elbow lines, rounded corners; 1→N as bracket/brace |
| Aurora hero badge | Aurora-filled capsule: logo + name + role subtitle |
| Progress pill | Light: white capsule + vivid-orange (`--pulse`) fill bar + tick. Dark: outlined capsule, accent fill over 18%-opacity track |
| Search pill cluster | Floating outlined pills w/ magnifier chips, gently drifting |
| Media tile | 14–18px radius thumbnail fading in under its pill |
| Segment ribbon | Blurred gradient capsules in slight 3D perspective (embeddings motif) |
