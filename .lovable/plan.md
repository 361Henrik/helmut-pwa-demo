# All three, shipped in one pass

## 1. Polish scene transitions
- Replace the current `AnimatePresence mode="wait"` opacity swap with a true cross-fade: outgoing scene stays mounted 600ms while the incoming scene fades in over it.
- Add a shared background "film base" (deep-green) so no black flash ever appears between beats.
- Match the color-grade filter transition duration (800ms) to the scene fade so grading drifts continuously instead of snapping on step change.
- On beats that share landscape imagery (1 → 2, 3 → 4), reuse the same image URL and let Ken Burns continue — creates seamless continuity.

## 2. Operator branding via URL params
Read query params on mount, expose through a `BrandContext`:
- `?logo=<url>` — operator logo shown in Beat 2 (Awareness) and Beat 6 (Operator Layer)
- `?name=<string>` — operator name in welcome copy + close beat
- `?color=<hex>` — overrides the champagne accent (progress bar, CTA)
- `?cta=<url>` — target for the "Get in Touch" button (default `#contact`)
- `?ctaLabel=<string>` — button label (default "Get in Touch")

Falls back to Curated Lens defaults when params are absent. Enables per-operator embedding without a rebuild.

## 3. Insights361 bonus beat (new Beat 6.5, becomes Beat 7; close becomes Beat 8)
Operator-facing scene inserted before the close:
- Dark editorial background, "Insights361" wordmark top-left
- Animated heatmap over a stylized route (POIs bloom by dwell weight)
- Top 3 stories list with play counts ticking up
- "Blank Space Signal" callout: identifies a stretch with high curiosity, no story yet — the operator's next content opportunity
- Tagline: *"Curiosity leaves a trace. Insights361 reads it."*
- Auto-advances after 10s to the close beat

## Technical notes
- New files: `src/components/demo/BrandContext.tsx`, `src/components/demo/Beat6InsightsScene.tsx`
- Edit: `DemoPage.tsx` (steps 1..8, cross-fade, brand provider), `DemoOverlay.tsx` (add step 7 duration, bump max to 8), `Beat2Scene.tsx` + `Beat7Scene.tsx` (consume brand), progress bar denominator → 8
- `DemoStep` type widens to `1..8`
- Preserves the pause/resume ref logic, sessionStorage handoff, and ambient audio graph
