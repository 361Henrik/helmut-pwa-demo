

# Demo Reimagining: One Continuous iPhone Product Experience

## What changes

The current demo plays as 7 stylistically inconsistent scenes. We rebuild it as a **single cohesive app experience** in 7 phases that share one design language: deep-green app base, glass surfaces, warm-white type, Playfair headlines, Lexend body. Insights361 is removed entirely.

## The 7 phases (was 7 beats — now 7 product moments)

| # | Phase | Duration | What's on screen |
|---|-------|----------|------------------|
| 1 | Silence | 8s | Full-bleed riverscape video-feel image. No chrome. Text fades in: *"Most of what you pass…"* / *"goes unexplained."* |
| 2 | Awareness | 8s | Same image continues. Single glass callout floats in: *"Vineyards on your right — cultivated since the 12th century."* No status bar yet. |
| 3 | Live View (AR) | 10s | Camera-style interface activates: subtle reticle, faint horizon line, soft viewfinder corners. Two anchored AR labels appear over the landscape ("Rheingau slopes", "St. Goarshausen"). Microcopy: *"Look around"*. iPhone status bar appears here. |
| 4 | Depth | 10s | One AR label "taps" — Apple-Maps-style card slides up from bottom (~55% screen height max). Title, 2–3 line story, "Listen" hint with small waveform. Landscape still visible above. |
| 5 | Map Context | 10s | Map screen — desaturated dark style, thin bronze route line, 3 minimal pins. Glass overlay text near top: *"Context follows you — not just the highlights"*. |
| 6 | Operator Layer | 8s | Same app frame. Brief operator brand moment: Scenic Waterways wordmark, small welcome line, QR entry pill. Calm, not a billboard. |
| 7 | Close | — | Deep-green close. Three lines + bronze CTA + Replay. |

Total: ~54s auto-play, then close.

## Unifying device chrome

Add a **lightweight `<PhoneFrame>` wrapper** around all phases (1–7) so every scene feels like the same app:
- Subtle iPhone-style status bar (time, signal, battery) — appears from phase 3 onward (phases 1–2 are pure landscape with no chrome, by design)
- Consistent safe-area padding
- Shared bottom inset
- Same dark base color (`#1B3D2F`) showing at edges if any scene uses card layouts

This is what makes the demo "one app" instead of 7 slideshow screens.

## Files to change

### Remove
- `src/components/demo/Beat6Scene.tsx` — Insights361 deleted entirely
- Step 6 references in `DemoOverlay.tsx` and `DemoPage.tsx` (re-number close to step 7)

### New
- `src/components/demo/PhoneChrome.tsx` — shared status bar + safe areas (used by phases 3–6)
- `src/components/demo/ARLabel.tsx` — anchored AR label with thin connector line, used in phase 3
- `src/components/demo/DepthCard.tsx` — Apple-Maps-style bottom sheet for phase 4

### Rewrite (consistency pass)
- `Beat1Scene.tsx` (Phase 1 Silence) — center text, single image, lighter scrim, only 2 lines now
- `Beat4Scene.tsx` (Phase 2 Awareness) — same background image as Beat1 (continuity), keeps `SceneCallout` ambient pill
- **NEW `Beat3Scene.tsx`** (Phase 3 Live View) — fully rebuilt as AR camera UI, replacing the editorial story screen. The editorial moment moves into Phase 4.
- **NEW Phase 4 component (`Beat4DepthScene.tsx`)** — bottom-sheet card over the AR backdrop. Story content stays (Rheingau slope copy) but presented as a card, not full-screen.
- `CuratedMap` usage at Phase 5 — wrap with glass overlay text, ensure dark/desaturated map style is applied; the existing `demoMode` prop should already suppress controls.
- `Beat2Scene.tsx` (Phase 6 Operator) — slim down: smaller wordmark, smaller QR (~90px), tighter card. No oversized welcome panel.
- `Beat7Scene.tsx` (Phase 7 Close) — minor: ensure color/type matches the unified system, no changes to copy.

### Tighten
- `DemoOverlay.tsx` — update durations: 8/8/10/10/10/8 and remove all references to the old Insights step. Remove the floating "23 curated stories" pill from step 5 (map) — replaced by the in-scene glass overlay text from the new design.
- `DemoPage.tsx` — update step machine to new mapping; wrap each scene in `PhoneChrome` (except Phase 1–2 which are full-bleed by intent).

## Design system enforcement (applied across every file edited)

| Token | Value | Where |
|-------|-------|-------|
| App base | `#1B3D2F` (deep green) | PhoneChrome bg, edges, map underlay |
| Surface (glass) | `bg-white/8 backdrop-blur-xl border border-white/12` | All cards, callouts, overlays |
| Text primary | `text-warm-white` (#FBFAF8) | All body & headline copy |
| Text muted | `text-warm-white/70` | Captions, microcopy |
| Accent | `#C49A5C` champagne/bronze | AR reticle, route line, single CTA, never as fill |
| Headlines | `font-display` (Playfair Display), 24–32px | Phase titles, story headlines |
| Body | `font-body` (Lexend), 16–18px | All running text |
| Motion | 400ms ease, no bounce, no scale | All transitions |

**Hard rule applied everywhere:** no dark text on dark green. Every surface that sits on green uses warm-white text. Every surface on imagery uses either an opaque card OR ≥60% black scrim.

## Phase 3 Live View — concrete spec (the key moment)

```text
┌─────────────────────────┐
│ status bar (9:41 ▲ ▽)   │  ← PhoneChrome
├─────────────────────────┤
│                         │
│   [riverscape image]    │
│                         │
│      ╭─────────╮        │  ← faint reticle (bronze, 1px, 30% opacity)
│      ╰─────────╯        │
│                         │
│  ┌──────────────┐       │  ← AR label 1 (glass pill, thin line down to slope)
│  │ Rheingau     │       │
│  │ slopes       │       │
│  └──────┬───────┘       │
│         │               │
│              ┌────────┐ │  ← AR label 2
│              │ Loreley│ │
│              └────┬───┘ │
│                   │     │
│         ↓                │
│   horizon line (faint)   │
│                          │
│   "Look around"  ─ italic, centered, low contrast
└─────────────────────────┘
```

- Reticle: 80×80px, bronze 1px stroke at 30% opacity, centered slightly above middle
- Horizon line: full-width 1px line, white at 15% opacity, positioned at perceived horizon
- AR labels: glass pills (`bg-white/12 backdrop-blur-md`), 11px Lexend label inside, 1px vertical connector line in bronze
- Microcopy: Playfair italic 14px, warm-white/70

## Phase 4 Depth — bottom sheet spec

- Sheet height: 55% of viewport (not full screen)
- Sheet background: `bg-warm-white/95 backdrop-blur-2xl` with rounded-t-3xl
- Drag handle: 4px × 36px, deep-green/20, top center
- Title: Playfair 22px, deep-green
- Body: Lexend 16px, deep-green/80, 2–3 lines max
- Listen hint: small waveform (4 bars) + "Listen · 1m 24s" in deep-green/70
- AR scene visible above the sheet (not blacked out)

## Risks & decisions

1. **Phase 3 is a new component** — the existing Beat3 (editorial story) gets repurposed into Phase 4's depth card. This is the biggest structural change, but it's required to make the AR moment land properly.
2. **Status bar in phases 1–2** — intentionally absent. Those phases are "before the app speaks." The chrome appears as the product activates in Phase 3. If you'd rather have the status bar throughout, say so and I'll add it.
3. **Map style** — the existing CuratedMap uses a Mapbox style; switching to a fully desaturated dark style may need a Mapbox style URL change. If that proves intrusive, I'll apply a CSS filter (`filter: saturate(0.4) brightness(0.7)`) as a quick visual unifier.
4. **Total length** — 54s vs. previous ~84s. This is intentional: shorter, tighter, more app-like. Easy to extend if needed.

## Out of scope this pass
- Real AR camera feed (the "camera" is a styled image)
- Real audio playback
- Mapbox style URL change (will use CSS filter as fallback)
- Font swaps — Playfair + Lexend already match the brief

