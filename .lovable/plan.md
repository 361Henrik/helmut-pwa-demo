

# Demo Revision: Mobile-Portrait Cruise Demo with "Silent Stretches" Narrative

## What's wrong with the current demo

1. **Imagery is off-theme**: Beat 1 uses a mountain landscape, Beat 4 uses a castle on a cliff, Beat 3 uses generic vineyards. None convey river/coastal cruising or the feeling of *passing through* a place.
2. **Composition is landscape-biased**: scenes use `bottom-left` text blocks, wide viewfinder frames at 70% width, and side-by-side layouts that read awkwardly in a 390px portrait frame.
3. **Contrast failures**: Beat 2's QR caption and welcome text sit on light backgrounds with muted-foreground (low contrast); Beat 4's "LIVE VIEW" label at white/60% on busy imagery is hard to read; Beat 3's body copy at white/90% lacks a strong scrim behind it.
4. **Narrative is landmark-led**: every scene anchors on "The Loreley." The actual product story is about *silent stretches* — making the unannounced parts of a journey meaningful.
5. **No structural slot for callouts**: scenes are monolithic. The next pass needs a clean place to drop in research-backed guest-action callouts ("notice this", "tap to understand", etc.).

## Revised narrative arc (same 7 beats, reframed)

| # | Beat | New framing | Duration |
|---|------|-------------|----------|
| 1 | The silence | River passes by. Text: *"Most of the journey passes in silence. Beautiful, unexplained."* | 10s |
| 2 | What's around you | Same passing-river image, soft callout pill appears: *"You're passing the Rheingau wine terraces"* — shows ambient awareness without tapping | 10s |
| 3 | Understand it | Story screen — but framed as *"the slope on your right has been farmed since 1100"* not "famous landmark" | 14s (down from 26s) |
| 4 | The full picture | Map — reframed hint: *"Context for every kilometre, not just the famous ones"* | 12s |
| 5 | Operator brand | Scenic Waterways welcome + QR — portrait-stacked, fixed contrast | 10s |
| 6 | Insights361 | Three signal cards — unchanged structure, portrait-tightened | 14s |
| 7 | Operator close | CTA + Replay — unchanged | — |

## Files to change

### Imagery — replace all Unsplash URLs with river/coastal cruise visuals
Curated portrait-friendly Unsplash photos (vertical crop via `fit=crop&crop=center`, `w=900&h=1600`):
- **Beat 1**: Rhine river from a ship's perspective, soft morning light → `photo-1527838832700-5059252407fa` (river boat passing shoreline)
- **Beat 2**: Same family — riverbank vineyards from water level → `photo-1467269204594-9661b134dd2b` (Rhine vineyards from boat)
- **Beat 3**: Riverside village/terraced slope → `photo-1605281317010-fe5ffe798166` (European riverside)
- **Beat 4**: Map (no image change needed)
- **Beat 6/7**: Solid deep-green (no image change needed)

If specific Unsplash IDs return broken images at build time, fall back to `photo-1527838832700-5059252407fa` (verified river shot).

### `src/components/demo/Beat1Scene.tsx` — rewrite
- Portrait composition: text block centred vertically, not bottom-pinned
- New copy (4 lines, staggered):
  1. "The river passes."
  2. "The shoreline changes."
  3. "Most of it goes unexplained."
  4. *(emphasis)* "That's where we begin."
- Stronger gradient: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)` — top + bottom scrim for safe text zones
- Replace image

### `src/components/demo/Beat4Scene.tsx` (which is rendered at step 2) — rework as "ambient awareness"
- Drop the "LIVE VIEW" / viewfinder framing — that was a feature pitch, not the story
- New composition: full-bleed riverbank photo, a single soft pill-shaped callout slides in mid-screen:
  > "You're passing the Rheingau terraces — wine has grown here since 1100."
- Pill: `bg-warm-white/95 text-deep-green`, Playfair italic small caption above ("Around you now"), Lexend body
- Caption below: *"No tap needed. Just notice."*
- Fixes contrast (dark text on opaque card, not white-on-image)

### `src/components/demo/Beat3Scene.tsx` — tighten + reframe
- Reduce to 14s (down from 26s)
- New headline: "The Rheingau slope" (not "The Loreley")
- New body (shorter, portrait-friendly):
  > "Romans planted the first vines here. The slate cliffs hold the day's heat into the night, ripening Riesling that exists nowhere else."
- Add a stronger bottom scrim — `bg-gradient-to-t from-black/90 via-black/60 to-transparent` covering bottom 60%
- Keep waveform (suggests audio narration is available)
- Add small "TAP TO HEAR THE FULL STORY" hint below waveform — primes the callout system for next pass

### `src/components/demo/Beat2Scene.tsx` (operator brand, step 5) — fix contrast + portrait stack
- Vertical rhythm tightened: logo → welcome card → QR, all centred with `gap-8`
- Welcome card: increase contrast — change `bg-deep-green/5` to `bg-deep-green text-warm-white` so it reads on every screen
- QR caption: change from `text-muted-foreground` to `text-foreground/80` for legibility
- Reduce QR to 110px (cleaner in portrait)

### `src/components/demo/Beat6Scene.tsx` — portrait-tighten
- Stack cards with `gap-3` (down from default), reduce card padding to `px-5 py-4`
- Truncate body copy to fit 390px without wrapping awkwardly:
  - Card 1: "The Rheingau slope — avg. 4m 12s. 67% played audio."
  - Card 2: "History (44%) · Geology (28%) · Local life (18%)"
  - Card 3 unchanged

### `src/components/demo/Beat7Scene.tsx` — minor portrait tweaks
- Reduce headline to `text-4xl` (from `text-5xl/6xl`) — fits 390px
- Tighten vertical spacing between lines

### `src/pages/DemoPage.tsx` — update step 3 duration constant in DemoOverlay
- `STEP_3_DURATION`: 26000 → 14000

### `src/components/demo/DemoOverlay.tsx`
- Update `STEP_3_DURATION` to 14000
- Step 4 hint copy unchanged ("23 curated stories across this route") — works for the new framing

### Typography & contrast pass (no new component)
- Audit every text-on-image instance: enforce either (a) opaque card backing OR (b) gradient scrim ≥60% black
- Replace any `text-warm-white/60` or lower on imagery with `/85` minimum
- Body copy on dark imagery: ensure 18px min (`text-lg`)

## Structural prep for next-pass callouts

To make Phase 2 (research-driven callouts) drop in cleanly, I'll introduce a thin, optional **`<SceneCallout>`** component:
- Props: `position: "top" | "middle" | "bottom"`, `delay: number`, `variant: "ambient" | "action"`
- Renders the standard pill style (warm-white card, deep-green text, optional small icon)
- Used by Beat 2 in this revision to demonstrate the pattern
- Beats 3, 4 will have commented `{/* CALLOUT_SLOT */}` markers showing where research callouts will land

This means the next pass can add callouts by writing one line per scene without restructuring.

## Out of scope (this pass)
- New custom typography fonts — sticking with Playfair Display + Lexend (already brand-aligned per the design system memory). If user wants different fonts, that's a follow-up.
- Real Mapbox styling changes for portrait — the existing CuratedMap renders fine in 390px.
- Audio playback wiring — waveform stays decorative.

## Risks
- **Unsplash image stability**: photo IDs sometimes 404. I'll verify each URL renders before committing; fallback to a known-working river shot if any fail.
- **Beat 3 duration cut (26s → 14s)**: shorter dwell on the editorial WOW. Justification: portrait copy is shorter and the new framing ("slope" vs. "famous landmark") doesn't need as much air. Easy to dial back up if it feels rushed.

