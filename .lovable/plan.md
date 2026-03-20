

# The Curated Lens — PWA Implementation Plan

## Vision
A "Silent Companion" PWA for premium river cruise and coastal voyage travelers — a landscape awareness and storytelling tool that helps guests understand what they're seeing, never competing with the real-world view. Museum-quality editorial design for travelers aged 50–85.

---

## Phase 1 — Design System Foundation & Core Shell

**Design token installation** — Map the entire Curated Lens palette into Tailwind CSS custom properties:
- Base Canvas `#F6F3EE`, Warm Stone `#E8E2D9`, Deep Charcoal `#1A1F1A`, Muted `#6E6A5E`
- Deep Green `#1F4A3A`, Terracotta `#C35C3C`, Champagne Bronze `#C9A962`, Warm Border `#CCC4B8`
- 9-step spacing scale (4px–96px), motion tokens (300–400ms ease-out)

**Typography stack** — Install Playfair Display (display/headings, weight 500) + Lexend (body/UI, weight 400/500). Define all 9 type roles from Display (48px) to Caption (12px) with correct line-heights and letter-spacing.

**Base component reskinning** — Restyle Button (primary=terracotta, secondary=stone, ghost, destructive), Card (warm stone surface, shadow-sm), Input/Select/Switch to match the playbook. All interactive elements: 44px min touch target, no bounce/scale animations.

**App shell & navigation** — Persistent bottom tab bar (Map, Saved, Settings) with 48px+ touch targets. PWA manifest, service worker registration via `vite-plugin-pwa`, mobile meta tags, and installability.

---

## Phase 2 — Welcome, Onboarding & Route Setup (H01–H03)

**H01 — Welcome & Entry screen**
- Full-bleed hero image with operator logo at top
- Personalized welcome message and value proposition
- "Start Exploring" primary CTA, "Login / Recover Saved Journey" secondary link
- Language selector (EN/DE/FR/ES/NO), persistent help (?) icon
- Auto-detect device language, validate route token from URL params

**H02a — Onboarding Carousel & Permissions**
- Swipeable 3-card narrative carousel with calming illustrations
- Progress dots (Step 1 of 4), "Skip Intro" button
- Contextual permission priming (location, notifications) with HTML explanation before native prompt
- "Not Now" ghost buttons — graceful degradation

**H02b — Interest Category Selection**
- 2-column chip grid: History, Nature, Architecture, Culture, Food & Drink, Engineering, Legends, Wildlife, Art & Music, Hidden Gems
- Max 5 selections enforced, "Recommended by [Operator]" preset toggle
- Saves preferences locally, pre-filters map marker index

**H03 — Route Overview & Offline Prep**
- Zoomed-out static map showing full journey route with clustered POI nodes
- Journey title, start/end points
- "Download Route" CTA with progress bar, "Stay Online Only" secondary
- Service worker caches route geometry, map labels, quick info text, priority audio

---

## Phase 3 — Map System (H04–H05)

**H04 — Main Map View** (the heart of the app)
- Mapbox GL JS integration with custom Curated Lens style:
  - Water: `#D4E4ED`, Land: `#F0EDE8`, Terrain shadow: `#E2DDD6`
  - Route line: Deep Green (active) / warm grey at 60% (upcoming)
  - Vessel position: 8px solid Deep Green circle, smooth interpolation every 30–60s
- 5-layer rendering: Base Geography → Landscape Labels → Route → POIs → Interaction
- Map markers: white disk + black ring + category icon (monochrome), bronze ring on select
- Compass-locked rotation (device heading), journey boundary zoom constraints
- Floating controls: Map style toggle, Recenter button, Live View shortcut, Camera shortcut
- Marker clustering with number badges at wider zoom levels
- POI names only at tight zoom to prevent text overlap
- Senior-readable map labels: 15–17pt equivalent with high-contrast halos
- First-time hint: pulsing dot on nearest marker with tooltip text
- Geofence-triggered soft chime/vibration for high-priority markers

**H05 — Quick Info Card (Bottom Sheet)**
- Slides up over map on marker tap — thumbnail, bold title, ~50-char story teaser
- Play Audio shortcut icon, swipe-up chevron indicator
- Swipe down or tap backdrop to dismiss
- Motion-aware: card stays if phone held steady, collapses if lowered abruptly (accelerometer)

---

## Phase 4 — Storytelling, Audio & Camera (H06–H08)

**H06 — Full Story + Audio Screen**
- Full-width hero image or swipeable gallery, back chevron
- Audio player: play/pause, scrubber, speed toggle (1x/1.5x/2x)
- Scrollable narrative text (Body Large 18px, max-w-prose)
- "Save to Journey" toggle, Camera shortcut
- Trust banner: "Curated by [Operator]. Tap to view sources."
- Media Session API for background audio continuity (screen lock, minimize, camera)
- Offline fallback: hide hi-res images, show text, "Viewing offline version" banner

**H07 — Live View (AR Mode)**
- Camera feed background with floating labels anchored to geography
- Landscape orientation lock with rotation prompt overlay
- Calibration indicator (figure-8 guide if gyroscope drifts)
- Graceful degradation: "Live View unavailable. Returning to Map" if WebXR unsupported
- Tapping AR marker opens H05 Quick Info over camera feed

**H08 — Camera Capture**
- Embedded/native camera viewfinder with shutter button
- "Return to Journey" button — restores exact previous screen state
- Audio continues playing over camera viewfinder via Media Session API

---

## Phase 5 — Saved Flow, Settings & Polish (H09–H10)

**H09 — Saved Timeline**
- Vertical chronological timeline of saved story cards (thumbnail + title + timestamp)
- "Export Journal" and "Share" CTAs
- Temporary storage warning banner for anonymous users: "Your saves are stored temporarily on this device. Create a free link to keep them forever."
- Tapping a saved item opens H06 directly

**H10 — Settings & Trust**
- Grouped mobile list: Language selector, Audio auto-play toggle, Offline data management (view size, delete)
- Trust & Transparency accordion: "About the Content" — explains curated guide nature, "View Content Sources" link
- All changes apply immediately without page reload

**"Soft Truth" overlay** — When tapping blank map space: "No operator-approved marker here" with option to save the spot

---

## Phase 6 — PWA Hardening & Operator Expression

**Offline resilience** — Service worker strategy: cache-first for map tiles/route data, network-first for story content, lazy-load tiles → labels → markers for battery optimization

**Operator Expression Mode** — Token-based theming: operator logo, accent color override (replaces terracotta for CTAs), optional route color override, custom welcome copy. Structural rules (spacing, typography, map design, marker anatomy) remain immutable.

**Accessibility audit** — WCAG AA on all text (AAA preferred for body), `prefers-reduced-motion` respect, persistent visible labels on all forms, inline error messages, focus indicators on all interactive elements

---

## Technical Approach
- **React + Vite + Tailwind** with Curated Lens design tokens
- **Mapbox GL JS** for the map system (custom style JSON matching the playbook's map palette)
- **vite-plugin-pwa** for service worker, manifest, and offline caching
- **Framer Motion** (restrained: 300ms ease-out only) for bottom sheet, card transitions, marker animations
- **Mock data layer** for routes, POIs, operator config — ready for future Supabase backend
- **Local storage** for preferences, saved items, and session state

