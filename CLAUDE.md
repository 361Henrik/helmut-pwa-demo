# Helmut PWA Demo — Claude Code Context

## What this is
A sales demo for HostAtlas (by ThreeSixtyOne / The Curated Lens).
Target audience: travel operators — cruise lines, river cruise, coastal, rail.
The demo runs as a guided 8-step sequence showing the guest experience (Helmut PWA)
followed by a Live View concept moment and an Insights361 operator intelligence close.

## What it is NOT
This is not a product walkthrough. It is a sales demo optimised for persuasion.
Every decision prioritises operator desire over feature completeness.

## Personas
- Helmut: the guest. Typically 55–67. Curious, low friction tolerance, heads-up mode.
- Olga: the operator admin panel (Discovery → Storyteller → Publisher → Helmut → Insights361).
  Olga is not shown in this demo — only referenced in the Insights361 close.

## Demo arc (8 beats)
1. The gap — full-bleed landscape, no chrome, research opening line
2. Operator brand moment — their logo, their welcome, QR entry shown
3. Editorial WOW — story screen, Playfair headline, audio, full-bleed photo
4. Map as scale proof — full route, curated markers across whole journey
5. Live View concept — static viewfinder still, one sentence, move on
6. Insights361 — heatmap, top stories, Blank Space Signal
7. Operator close — 3 lines, operator logo, single CTA, Replay button

## Design system (non-negotiable)
- Deep Forest Green: #1B3D2F
- Warm White: #FBFAF8
- Antique Bronze: #C49A5C (accent only, <8% of visible area)
- Near Black: #1A1A2E
- Off-White: #F5F3EF
- Headlines: Playfair Display (font-display)
- Body/UI: Lexend (font-body)
- Touch targets: 48px minimum
- Primary content: 18px (text-lg), never text-base
- Transitions: 300–400ms ease, no bounce, no scale
- Operator logo is the ONLY visible brand — never show Curated Lens or HostAtlas to guest

## Key language (use verbatim or very close)
- Opening: "The information was needed in real time. It arrived too late."
- Gap stat: "60 to 80 percent of sailing time passes without guided context."
- Operator force multiplier: "HostAtlas makes you everywhere at once."
- Insights361 close: "Curiosity leaves a trace. Insights361 reads it."
- Final close: "Your brand. Your stories. Your guests."
- Platform line: "One platform. Your narrative, entirely."

## Current demo structure (Lovable v1)
- DemoPage.tsx — step machine (1–6), pause/resume timer refs, sessionStorage handoff
- DemoOverlay.tsx — STEP_CONTENT and overlay rendering per step
- DemoStep type: currently 1|2|3|4|5|6 — needs extending to 1|2|3|4|5|6|7
- StoryPage.tsx — editorial story screen (navigated to from step 4, returns to step 5)
- CuratedMap.tsx — Mapbox map with Rhine mock route data
- mock-route.ts — POI data, itinerary copy, story content

## Rules — do not break these
- Do not break the pause/resume timer ref logic in DemoOverlay.tsx
- Do not remove the sessionStorage handoff between DemoPage and StoryPage
- Do not hardcode brand colours — always use CSS token variables
- Do not add Supabase auth — it is removed and must stay removed
- Do not add hover-only states — this is mobile-first
- Do not show Curated Lens or HostAtlas branding to the guest at any point
- Always show a diff before applying any change
