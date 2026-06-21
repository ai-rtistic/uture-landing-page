---
name: uture-spot-graphics
description: Use when adding or editing the uture landing site's abstract UI "spot graphics" — the illustrative diagram panels (search/analyze/embed-style nodes, connectors, media tiles, gradient-glow panels, scene/waveform strips, embedding dot-clouds, tab demos, feature-card illustrations). Covers both in-page SVG/CSS+GSAP graphics and Remotion-rendered video versions for motion-heavy pieces.
---

# Uture Spot Graphics

Branded twelvelabs-style "spot graphics" = abstract UI illustrations built from a tiny shared vocabulary.

## Colour rule (most important)

**Spot graphics are monochrome-first.** Reference twelvelabs diagrams are white/surface tiles, thin grey borders (`--border`), dark line-icons, grey connectors — on a near-neutral panel. Colour appears only as a **whisper**: a very faint glow wash (alpha ≤ 0.12) and at most one small accent (a tag ring, a single muted-tinted bar). 

- ❌ Do NOT fill tiles/nodes with saturated brand colour, stack bright glows, or colour every bar.
- ✅ Match tile = neutral tile + a bordered tag (e.g. `HIGH`) + faint accent *ring*, nothing more.
- ✅ Filled bars use a **muted** tint (`color-mix(... 32%, #d6d4d1)`), not the raw accent.
- This is scoped to spot-graphics. Text effects elsewhere (hero word-reveal) keep the fuller multicolour palette — see [[brand-palette]].

Two delivery paths:

| Path | Use for | Tech |
|------|---------|------|
| **In-page (default)** | Interactive/section diagrams, tab demos, card illustrations | React + SVG/CSS, GSAP/CSS motion |
| **Remotion video** | Heavy/looping motion you want as a real video asset | `motion/` Remotion project → transparent `.webm` → `<video>` |

Default to **in-page**. Reach for Remotion only when the motion is too heavy/cinematic for CSS or you specifically want an exportable clip. See [[brand-palette]] for colours.

## In-page path

**Reuse the existing primitives — do not reinvent.** They live in `web/src/components/graphics/`:

- `primitives.tsx` — `GFrame` (tinted glow panel; props `tint`, `grid`, `compact`), `GNode` (pill chip, `icon`/`tone`), `GConn` (flowing connector), `GTile` (media tile, `active`/`tag`/`icon`/`thumb`), `GStrip` (scene/waveform bars, `cells`/`fill`/`dashed`), `GDots` (embedding cloud), `GStack`.
- `icons.tsx` — `GIcon` 16px line icons (search/play/audio/video/image/text/sparkle/gear/target/build/flow).
- `composed.tsx` — finished graphics (`PlanGraphic`, `BuildGraphic`, `WorkflowGraphic`, `SceneGraphic`) — copy one as a template.
- `graphics.css` — all `.g-*` styles + tints (`peach amber sky rose lilac mint neutral`).

### Recipe — new graphic
1. Pick a `tint` from the brand family (keep one tint per panel for tonal consistency).
2. Compose primitives inside `<GFrame tint=...>`: usually `GStack` of `GNode → GConn → (GTile grid | GStrip | GDots | GNode)`.
3. Add it to `composed.tsx`; render it from the section. Tints rotate across sibling cards.
4. Verify in the preview (restart the preview server if screenshots come back blank after a reload).

```tsx
export function MyGraphic() {
  return (
    <GFrame tint="sky" grid>
      <GStack>
        <GNode icon="flow">입력 수집</GNode>
        <GConn />
        <GNode tone="dark" icon="sparkle">uture Agent</GNode>
        <GConn />
        <GNode icon="text">결과 자동 정리</GNode>
      </GStack>
    </GFrame>
  )
}
```

### Motion (in-page)
- Ambient: CSS keyframes already on primitives (glow pulse, connector flow, tile pulse, dot float).
- Scroll-driven: use GSAP ScrollTrigger like `web/src/ui/WordReveal.tsx` / `PinnedNarrative.tsx`.
- Always honour `prefers-reduced-motion` (see `globals.css`); reveal/animation must degrade to static.

## Remotion path (video)

Project: `motion/` (scaffolded with `create-video`, blank). Example composition: `motion/src/SpotGraphic.tsx`, registered in `motion/src/Root.tsx`.

Workflow:
1. Build the composition with `useCurrentFrame()` + `interpolate()`/`spring()` (see `rules/timing.md`, `rules/text-animations.md` in the installed `remotion-best-practices` skill). Keep a **transparent** `AbsoluteFill` (no background) for overlay use.
2. Hardcode the brand hexes (Remotion can't read the web CSS vars) — orange `#ff7a33`, peach `#ff9e6b`, border `#d3d1cf`, text `#1d1c1b`.
3. Preview: `cd motion && npm run dev` (Remotion Studio).
4. Render transparent WebM into the site:
   `cd motion && npx remotion render SpotGraphic ../web/public/assets/motion/<name>.webm --codec=vp8`
5. Embed: `<video src="/assets/motion/<name>.webm" autoPlay loop muted playsInline />`.

**REQUIRED BACKGROUND for Remotion work:** use the installed `remotion-best-practices` skill for the API details.

## Common mistakes
- Inventing new accent colours → breaks tonal consistency. Only use the 7 brand tokens; new shades must match the soft/pastel S/L band.
- Mixing many tints in one panel → keep one tint per `GFrame`.
- Using Remotion for an interactive/section diagram → use in-page primitives instead (sharper, lighter, theme-reactive).
- Forgetting `prefers-reduced-motion` fallback.
- Korean text in Remotion: ensure a Korean system/`@remotion/google-fonts` font is available at render time.
