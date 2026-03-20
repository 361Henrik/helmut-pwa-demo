

# Journey UI Refinement — Collapsible Days, Icon-Based POIs, Better Overview

## Changes

### 1. Replace POI images with category icons (`JourneyTimeline.tsx`)

Remove `<img>` thumbnails from POI cards. Replace with a 40×40 rounded icon container showing the Lucide icon for each category. Create a `CATEGORY_LUCIDE_ICONS` map in `mock-route.ts` mapping each `POICategory` to a Lucide component name (e.g., `history` → `Landmark`, `nature` → `TreePine`, `architecture` → `Building2`, `food` → `Wine`, `culture` → `Theater`, `engineering` → `Cog`, `legends` → `Star`, `wildlife` → `Bird`, `art` → `Paintbrush`, `hidden-gem` → `Gem`).

POI card layout: `[icon 40px] [title + category label] [chevron]` — no teaser text in the collapsed day view, just name and category.

### 2. Make all days collapsible (`JourneyTimeline.tsx`)

Wrap each day's content in a collapsible section using Radix Collapsible (already installed). 

- **Default state**: Current day is expanded. Past and future days are collapsed.
- **Collapsed view** shows: day number, title, port, and a compact summary row (see below).
- **Expanded view** shows: full description + POI cards.
- Tap the day header area to toggle. Add a small chevron indicator.

### 3. Compact collapsed-day summary

In the collapsed state, show a row of category icon pills below the day header. For each day, derive the unique categories from its POIs and render them as small chips: `[icon] Culture  [icon] Food  [icon] History`. This gives users an instant sense of what the day contains without text walls.

Also show POI count: "4 stops" as a subtle label.

### 4. Stronger voyage overview (`JourneyPage.tsx`)

Enhance the header section:
- Add a 1-line trip summary below "Your Voyage": "Basel to Amsterdam along the Rhine — castles, cathedrals, vineyards, and hidden gems."
- Make "7 Nights" and port endpoints more prominent
- Add total POI count: "26 discoveries across 7 days"

### 5. Journey home page audit

`/journey` IS the journey home page — it's the first tab in the bottom nav. No new page needed. The header already serves as the overview. The collapsible day redesign will make it function better as both overview and detail view.

## Files Changed

| File | Change |
|---|---|
| `src/data/mock-route.ts` | Add `CATEGORY_LUCIDE_ICONS` mapping |
| `src/components/journey/JourneyTimeline.tsx` | Collapsible days, icon-based POI cards, category summary chips |
| `src/pages/JourneyPage.tsx` | Enhanced header with trip summary and stats |

## Implementation Order
1. Add category-to-Lucide-icon mapping
2. Rewrite `JourneyTimeline` with collapsible days + icon POI cards
3. Update `JourneyPage` header

