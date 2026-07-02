---
name: uture-motion-diagrams
description: Use when creating ANY visual artifact for uture projects — diagrams, motion graphics, hero visuals, infographics, feature cards, charts, UI mockups, animated explainers. Requests like "다이어그램/비주얼/인포그래픽/모션 만들어줘", "이 스타일로", "일관되게". Applies the uture design system (TwelveLabs-derived).
---

# uture Design System

## Overview

A design system, not a template. Any artifact — diagram, hero visual, infographic, card layout, chart, UI mockup — must look like it came from the same brand. The system is defined by **8 invariants** below; everything else (specific components, layouts) is free to invent as long as the invariants hold.

Deliver as a single self-contained HTML file (inline CSS/SVG, no JS libraries). Artifacts made for screen recording loop seamlessly; presentation artifacts (pricing, infographics) may use entrance-only motion.

## The 8 Invariants (apply to EVERY artifact, any form)

1. **One accent per scene.** Brand mains are **purple and orange**. Dark theme: warm near-black `#262221` bg + ONE muted pastel accent (defaults: lavender-purple `#E9D5FC`, peach-orange `#FFD2A8`; other muted pastels — ice-blue, mint, rose — allowed situationally when content calls for it). Light theme: warm gray `#EDECEA` bg + white cards + the purple→orange aurora gradient + vivid orange `#FF8A3C` for progress/success. Never pure black, never lime-green (old palette), never saturated primaries outside the brand pair.
2. **Everything is a capsule or rounded rect.** Radius scales with size: pills 999px, small chips 10–12px, cards 22–28px, large frames 80–120px. No sharp corners, no circles-as-decoration, no triangles.
3. **Hierarchy = filled vs outlined**, never a second color, never thicker strokes. Filled shape (accent bg, dark text) = the one emphasis point; everything else is outlined. The filled shape may be any size (a chip or a whole card) — what's fixed is that there is exactly one.
4. **Hairline strokes**: 1–1.25px, always.
5. **Restraint is the identity.** Dark theme: zero shadows, glows, gradients, textures. Light theme: soft shadow on white cards only (`0 8px 28px rgba(0,0,0,.10)`), aurora as the only gradient. Fewer elements > more.
6. **Typography roles**: one grotesque sans (Inter) for labels 12–14px; monospace for data slots (numbers, timestamps — and words like "Custom" sitting in a numeric slot); small/inline data goes in outlined mini-pills, display-size numbers stay bare mono; uppercase + 0.04em tracking for category tags.
7. **Negative space**: content occupies ~60% of the canvas, centered. When in doubt, remove elements and add space.
8. **Motion = narrative.** Elements appear in the order a person would explain them; connectors draw in (stroke-dashoffset); siblings stagger 120–180ms; entrances fade + 10px rise, ease `cubic-bezier(.22,1,.36,1)`; seamless master loop (7–9s); idle = gentle float or slow aurora drift only. Nothing bounces, nothing jitters.

## What is NOT the system (don't copy, derive)

The components in the examples (timestamp tags, vector grids, progress pills, tree fan-outs) are **reference instances, not required vocabulary**. For a new form, derive new components from the invariants instead of forcing example components in. Test: "same brand?" not "same parts?"

## Theme Decision

| Artifact | Theme |
|----------|-------|
| Technical/feature diagram, flow, UI-adjacent | **Dark outline** (default) |
| Hero, marketing visual, data/segments showcase | **Light aurora** |

## Workflow

1. Pick theme + (dark) one accent.
2. Design the artifact for its OWN purpose first, then enforce the 8 invariants on it.
3. Consult [style-guide.md](style-guide.md) for exact tokens, motion timing, CSS pitfalls, and (non-normative) reference components. Adapt [template-dark.html](template-dark.html) only when the artifact actually is a diagram.
4. **Visual QA loop (mandatory — code that "looks right" in your head is not verified):**
   a. Capture: `scripts/visual-check.sh <file.html> [loop_seconds]` → two PNGs (mid-narrative 40%, composed hold 85%). No server/browser needed.
   b. READ both PNGs and inspect against the checklist below. Look at actual pixels, especially where lines meet shapes.
   c. Any defect → fix the code → recapture. Repeat until one full pass is clean. Never deliver a file you edited after your last capture.

### Visual QA checklist

- **Connectors**: every line starts AND ends exactly on a shape's edge — no dangling ends, no lines floating in empty space, no line passing through a card/pill/text, no lens/blob artifacts where paths overlap at merges (make merging paths end collinear on a shared segment).
- **Clipping**: badges/labels that break a card edge are fully visible; nothing cut by the canvas.
- **Alignment**: siblings share axes; gaps are consistent; nothing drifted from its intended position.
- **Overlap**: text never sits on top of lines or other text.
- **Palette**: exactly one accent (dark) / brand aurora + orange pulse only (light); no retired colors.
- **Both frames**: the 40% frame should read as a sensible mid-story moment, the 85% frame as the complete composition.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forcing example components into a new form | Derive new shapes from invariants; only the 8 rules are mandatory |
| Multiple accents / hierarchy via color | One accent; emphasize with filled vs outlined |
| Thick strokes, shadows, glows on dark theme | 1.25px hairlines, flat |
| Everything animates at once | Narrative order + stagger; the artifact explains itself |
| Filling the canvas | ~60% occupancy; cut elements, keep space |
| `translateX(-50%)` centering on animated elements | Keyframes override transform → drift. Use `left:0; right:0; justify-content:center` |
