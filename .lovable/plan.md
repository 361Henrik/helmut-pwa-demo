

## Audit: Phases 1-3 Gaps and Missing Elements

After reviewing every file in the project, here is what exists and what is missing.

### What is built
- Design system (tokens, typography, spacing, colors)
- Welcome screen with language picker
- Onboarding flow (narrative cards, permissions, interests)
- AppShell with bottom tab bar (Map, Saved, Settings)
- Mapbox map with Rhine route, POI markers, vessel position
- QuickInfoSheet for POI details
- Map controls (recenter, style toggle, camera)

### What is missing or incomplete

**1. No Home tab or way to return to the welcome/landing experience**
The bottom nav has Map / Saved / Settings but no "Home" or "Journey" entry point. Once past onboarding, there is no way back.

**2. Settings page is an empty placeholder**
Needs: language selector (reusing the Welcome page languages), notification preferences, location toggle, offline data management, about/help section.

**3. Saved page is an empty placeholder**
Needs: empty state with call-to-action, and the UI skeleton for a chronological timeline of saved POIs (actual saving comes in Phase 5, but the shell should exist).

**4. Category filter chips missing from map**
The onboarding collects up to 5 interest categories but the map has no filter UI to toggle them. Needs horizontal scrollable chip bar above the map.

**5. PWA app icons do not exist**
`manifest.json` references `/icons/icon-192.png` and `/icons/icon-512.png` but the files are missing.

**6. Map page has no header or contextual info**
No indication of current journey, cruise name, or voyage context. No top-level branding visible in the app shell.

**7. Camera button on map does nothing**
The camera FAB in MapControls has no action attached.

---

## Plan

### Step 1 — Add a Home/Journey tab to the bottom nav
- Add a "Journey" tab (Ship/Compass icon) as the first tab, linking to a new `/journey` route
- Create `JourneyPage.tsx` — a dashboard showing: current voyage name, progress along route, next POI approaching, quick links
- This gives users a "home base" within the app

### Step 2 — Build the Settings page
- Language selector (EN, DE, FR, ES, NO — same list as Welcome)
- Notification preferences toggle (on/off)
- Location sharing toggle
- Interest categories editor (reuse the category grid from onboarding)
- About section with app version
- Uses Switch, Select, and existing UI components

### Step 3 — Build the Saved page skeleton
- Empty state with illustration and "Start saving stories" message
- Skeleton list layout for future saved items (card-based timeline)
- Each card shows: POI thumbnail, name, category badge, date saved
- No backend wiring yet — just the UI shell with mock empty state

### Step 4 — Add category filter chips to the map
- Horizontal scrollable chip bar at top of map (below any header)
- Reads selected categories from localStorage (set during onboarding)
- Tapping a chip toggles POI marker visibility by category
- "All" chip to reset filters

### Step 5 — Add a minimal top bar to the AppShell
- Shows "The Curated Lens" branding (small logo + text) on the left
- Help icon on the right (consistent with Welcome page)
- Semi-transparent, does not obscure map when on map tab

### Step 6 — Generate PWA icons
- Create simple SVG-based icons with the "CL" monogram in deep-green circle
- Place at `/public/icons/icon-192.png` and `/public/icons/icon-512.png`

### Technical details
- New files: `src/pages/JourneyPage.tsx`, update `SettingsPage.tsx`, update `SavedPage.tsx`, `src/components/map/CategoryFilterBar.tsx`, update `AppShell.tsx` (top bar), update `BottomTabBar.tsx` (add Journey tab), update `App.tsx` (add route)
- Modified files: `CuratedMap.tsx` (integrate filter bar), `MapPage.tsx` (pass filter state)
- All state is local (localStorage + React state) — no backend needed yet
- Reuses existing shadcn components (Switch, Badge, ScrollArea)

