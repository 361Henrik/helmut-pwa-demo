

# Map Experience Improvement Plan

## Overview

Five interconnected improvements to transform the map from a free-exploration tool into a constrained, premium journey companion.

---

## 1. Zoom and Pan Constraints

**What changes:**
- Compute a `LngLatBounds` from `ROUTE_COORDINATES` with ~30km padding on each side
- Set `maxBounds` on the Mapbox Map constructor to lock panning to the route corridor
- Change `minZoom` from 5 to a value calculated so the full route fits portrait viewport (~5.5-6, determined dynamically via `map.fitBounds` logic)
- Keep `maxZoom: 16` (already appropriate)
- Update `handleRecenter` to use `fitBounds` instead of flying to a fixed center/zoom

**Why it matters:** Prevents users from panning to Africa or zooming out to see the whole continent. Reinforces that this map serves one journey only.

**Technical approach:**
- Helper function `getRouteBounds()` that iterates `ROUTE_COORDINATES` to find min/max lng/lat, then pads by ~0.5 degrees
- Pass `maxBounds` to the Map constructor
- On init, call `map.fitBounds(routeBounds, { padding: 40 })` instead of hardcoded center/zoom

**Tradeoffs:** Tight bounds may feel restrictive if POIs sit near the edge. The 30km padding handles this.

---

## 2. Journey Corridor Visualization

**What changes:**
- Add a GeoJSON polygon layer representing a ~15-20km buffer around the route line
- Areas **outside** the corridor get a semi-transparent overlay (white/grey at ~40% opacity) that mutes the base map
- The corridor itself remains clear, showing full map detail
- The route line sits on top of the corridor

**Why it matters:** Visually communicates "content lives here, not out there." Creates a productized, intentional feel rather than a generic map.

**Technical approach:**
- Generate a corridor polygon by offsetting `ROUTE_COORDINATES` left and right by ~0.15 degrees (simplified buffer — no Turf.js dependency needed)
- Add an **inverted mask layer**: a full-world polygon with the corridor cut out as a hole, filled with `rgba(255, 255, 255, 0.4)`
- Layer order: base map → mask overlay → route line → markers
- The mask uses a `fill` layer with a GeoJSON `Polygon` that has an outer ring covering the world and an inner ring tracing the corridor

**Implementation detail:**
```
Outer ring: [[-180,-90],[180,-90],[180,90],[-180,90],[-180,-90]]
Inner ring: corridor polygon points (route offset left + route offset right reversed)
```

This is a standard Mapbox "inverted polygon" technique — no external libraries needed.

**Tradeoffs:** The simplified offset (adding/subtracting a fixed lng/lat delta) won't produce a perfectly geodesic buffer, but at this scale the distortion is negligible.

---

## 3. Route Accuracy — Style Toggle Fix

**What changes:**
- The current `handleToggleStyle` calls `map.setStyle()` which destroys all custom sources and layers (route, corridor mask)
- Add a `style.load` event handler that re-adds the route source, corridor mask, and route layers after any style change
- Extract the "add sources and layers" logic into a reusable function called from both initial load and style change

**Why it matters:** Currently switching map styles breaks the entire route display. This is a critical bug.

**Technical approach:**
- Create `addRouteLayers(map)` function containing the route source, mask source, and all layer definitions
- Call it in `map.on('load')` and also in `map.on('style.load')` (which fires after `setStyle`)
- Re-add POI markers after style change as well (they persist as DOM elements but may need re-attachment)

---

## 4. Icon and Marker Design Improvements

**What changes:**
- Replace emoji-based markers (`🏛`, `🌿`, `⛪`, etc.) with SVG icons rendered inline
- Use a consistent design language: monochrome deep-green icons on white circular markers
- Each category gets a purpose-designed SVG path (e.g., column for history, leaf for nature, church for architecture, wine glass for food, gear for engineering, star for legends, binoculars for wildlife, note for art, diamond for hidden-gem, masks for culture)
- Markers get a subtle category color accent on the border instead of all being `#1A1F1A`
- Selected state uses champagne bronze border (already exists, keep)
- Add a pulsing ring animation to the vessel marker to make it more prominent

**Why it matters:** Emoji render inconsistently across devices, are not accessible, and undermine the premium visual identity. SVG icons give full control.

**Technical approach:**
- Define `CATEGORY_SVG_ICONS: Record<POICategory, string>` with inline SVG markup
- Replace `el.innerHTML` in marker creation with the SVG string
- Style the SVG to be 18x18px, stroke-based, using `currentColor`
- Add a CSS animation for the vessel pulse ring

**Tradeoffs:** More code for icon definitions, but eliminates platform inconsistency entirely.

---

## 5. "Return to Travel Operator App" Navigation

**What changes:**
- Add a subtle button in the bottom tab bar area or as a fixed element above the tab bar
- Label: "Return to [Operator]" or a generic "Back to App"
- Uses `window.parent.postMessage()` for iframe embedding, or `window.close()` / deep link for native webview embedding
- Visually: a small text link with a left-arrow icon, placed at the top of the screen or integrated into the tab bar as a 5th minimal element

**Recommended placement:** A small persistent bar **above** the bottom tab bar, or a link in the Settings page under an "App" section. For the map specifically, it should not compete with map controls.

**Best approach:** Add it to `BottomTabBar.tsx` as a top-edge link above the tab icons — a thin strip with "← Back to [Operator Name]" in muted text. This is always visible but unobtrusive.

**Technical approach:**
- Add an optional `operatorName` and `returnUrl` to app config (could be env vars or query params)
- If `returnUrl` is present, show the return bar
- On tap: `window.location.href = returnUrl` for deep links, or `postMessage` for iframe

**Tradeoffs:** Needs coordination with the travel operator on integration method (iframe vs webview vs standalone). For now, implement as a configurable link that can be hidden when not embedded.

---

## 6. Additional Quick Fixes (bundled)

- **Remove Camera button** from `MapControls` until Live View is implemented
- **Add vessel label**: a small tooltip "You are here" on the vessel marker
- **Fix "Swipe up" text**: detect touch support, show "Tap for full story" on non-touch devices

---

## File Changes Summary

| File | Changes |
|---|---|
| `src/components/map/CuratedMap.tsx` | Bounds calculation, maxBounds, corridor mask layer, SVG markers, vessel pulse, style toggle fix, extract layer setup function |
| `src/components/map/MapControls.tsx` | Remove Camera button |
| `src/components/map/QuickInfoSheet.tsx` | Touch detection for "swipe up" vs "tap" text |
| `src/components/layout/BottomTabBar.tsx` | Add optional "Return to Operator" bar |
| `src/data/mock-route.ts` | Add corridor polygon helper or export bounds constant |
| `src/index.css` | Add vessel pulse animation CSS |

---

## Implementation Order

1. Zoom/pan bounds + recenter fix (foundational)
2. Style toggle fix (bug fix, needed before corridor work)
3. Corridor mask overlay (visual hierarchy)
4. SVG icon system (design quality)
5. Return-to-operator nav (integration)
6. Quick fixes (cleanup)

