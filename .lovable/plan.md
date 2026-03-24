

# Guided Demo Flow — `/demo` Route

## Overview

A self-contained 60-90 second guided experience at `/demo` that walks users through the 3-layer POI discovery system using 3 hand-picked POIs near the Rhine Gorge. No auth, no settings, no noise.

## Screen Architecture

```text
/demo
├── DemoMap (stripped CuratedMap — 3 POIs only, no filters, no ProximityBar)
├── DemoOverlay (step-by-step guidance layer)
├── QuickInfoSheet (reused, unchanged)
└── DemoControls (restart / exit buttons)
```

## Guided Steps

| Step | Overlay Content | User Action | What Happens |
|---|---|---|---|
| 1 | "You're passing one of the most iconic stretches of the Rhine" | Auto-dismisses after 3s or tap | Map animates to Rhine Gorge, vessel visible |
| 2 | Loreley Rock marker pulses with ring animation + hint: "Tap to discover what you're seeing" | User taps marker | QuickInfoSheet opens (Layer 3) |
| 3 | Small hint arrow near "Swipe up for more" | User taps/swipes "for more" | Sheet expands (Layer 3.5) — excerpt + audio |
| 4 | Hint near "Tap for full story" | User taps | Navigates to `/story/poi-1` with back-to-demo |
| 5 | On return or after story view: "Explore two more discoveries nearby" | Free exploration | Burg Rheinfels + Rüdesheim markers now active |
| 6 | After ~15s or 2nd POI interaction: "That's the experience. Ready to learn more?" | End state | CTA: "Learn More" (external link) + "Restart Demo" |

If user doesn't act within 8s at any step, the hint pulses more prominently.

## Data

Define a `DEMO_POIS` constant — a filtered subset of 3 POIs from `MOCK_POIS`:
- `poi-1` Loreley Rock (legends) — primary guided POI
- `poi-20` Burg Rheinfels (history)
- `poi-4` Rüdesheim Wine Town (food)

Vessel position stays at current `VESSEL_POSITION` (Mainz area).

## New Files

| File | Purpose |
|---|---|
| `src/pages/DemoPage.tsx` | Demo route — renders DemoMap + DemoOverlay + DemoControls |
| `src/components/demo/DemoOverlay.tsx` | Step-by-step hint overlays with framer-motion transitions |
| `src/components/demo/DemoControls.tsx` | "Restart" and "Exit" floating buttons |

## Modified Files

| File | Change |
|---|---|
| `src/App.tsx` | Add `/demo` route (standalone, no AppShell) |
| `src/pages/WelcomePage.tsx` | Change "Enter Demo" to navigate to `/demo` |
| `src/pages/StoryPage.tsx` | Accept `?from=demo` query param; show "Back to Demo" instead of normal back nav |
| `src/components/map/QuickInfoSheet.tsx` | No changes — reused as-is |
| `src/components/map/CuratedMap.tsx` | Add optional `pois` prop to override `MOCK_POIS`; add optional `highlightPoiId` prop to pulse a specific marker |

## DemoPage Structure

```text
<DemoPage>
  ├── <CuratedMap pois={DEMO_POIS} highlightPoiId={currentHighlight} />
  ├── <DemoOverlay step={step} onAdvance={nextStep} />
  └── <DemoControls onRestart={reset} onExit={exit} />
</DemoPage>
```

State machine: `step` goes 1→2→3→4→5→6. Each step change triggers overlay text + map behavior.

No bottom tab bar. No category filters. No ProximityBar. No settings. Pure guided experience.

## Demo Controls UI

Two small pill buttons, top-right:
- "Restart" (RotateCcw icon) — resets step to 1, closes sheets, recenters map
- "Exit" (X icon) — navigates to `/`

## Marker Highlight

When `highlightPoiId` is set on CuratedMap, that marker gets a CSS pulse animation (ring expanding outward, like the vessel marker already has). Other markers stay normal or hidden depending on step.

Step 2: only Loreley visible + pulsing. Steps 5-6: all 3 visible, no pulse.

## Embed Readiness

- `/demo` has no auth dependency (demo user auto-applied)
- No broken states — all data is hardcoded
- Loads fast — only 3 markers, no full dataset
- Can be iframed: `<iframe src="https://app.../demo" />`

## Implementation Order

1. Add `DEMO_POIS` filter + `pois`/`highlightPoiId` props to CuratedMap
2. Create DemoOverlay component (6-step state machine with hints)
3. Create DemoControls component
4. Create DemoPage combining them
5. Add `/demo` route to App.tsx, update WelcomePage nav
6. Add `?from=demo` handling in StoryPage for back navigation

