

# Map Experience — Mobile-First Accessibility Update

## Summary
Six workstreams to improve the map for 60+ river-cruise passengers on mobile. Focus: larger touch targets, better icons, POI clustering, clearer navigation, and accessibility across all controls.

---

## 1. Bottom Navigation Overhaul (`BottomTabBar.tsx`)

**Changes:**
- Increase tab bar height from `h-16` (64px) to `h-20` (80px) for breathing room
- Increase icon size from `h-6 w-6` (24px) to `h-7 w-7` (28px)
- Increase label font from `text-xs` (12px) to `text-sm` (14px)
- Increase min tap target from `48px` to `56px`
- Replace `Ship` icon with `Navigation` (river route arrow) — more relevant to cruise progression than a cargo ship
- Make the "Return to Operator" bar always visible (not just when query param present) — use a default placeholder text like "Back to Travel App" so it's always discoverable; still driven by `returnUrl` param for the actual link
- Increase the return bar height from `h-8` to `h-10` with `text-sm` instead of `text-caption`
- Add `ArrowLeft` icon at 16px for the return bar

**Why:** Current 24px icons and 12px labels are below comfortable reading size for older adults. The Ship icon doesn't communicate "journey progression." The operator return link is invisible without a query param.

---

## 2. Journey, Live View, Camera & Help Icons

**Changes:**
- **Journey tab**: Replace `Ship` with `Route` (Lucide) — a path/route icon that communicates river progression
- **Map controls**: Add a Help button (`CircleHelp` icon) below the existing Recenter and Layers buttons — same 14×14 circular style, opens a brief tooltip or modal explaining controls
- **Live View / Camera**: Add a Camera button back to `MapControls` but with a "Coming Soon" badge overlay and disabled state. Uses `Camera` icon. When tapped, shows a toast: "Live View coming soon"
- All map control buttons: increase from `h-12 w-12` to `h-14 w-14`, icons from `h-5 w-5` to `h-6 w-6`

**Why:** Users asked for camera/help to be visible. Hiding the camera entirely removes discoverability. A disabled-with-explanation state is better than invisible.

---

## 3. POI Marker Icon Quality Improvements (`mapIcons.ts`)

**Changes:**
- Increase marker size from 40×40 to 48×48 px
- Increase SVG icon size from 18×18 to 22×22 px
- Increase border width from 2px to 2.5px
- Increase stroke-width in SVGs from 1.8 to 2.0 for better legibility
- Replace weak icons:
  - `culture`: current face/mask icon is unrecognizable → replace with a theater masks icon (two overlapping circles with expressions)
  - `engineering`: current sun/gear is ambiguous → replace with a bridge/cog icon
  - `hidden-gem`: duplicate star shape (same as `legends`) → replace with a diamond/gem shape
  - `art`: current flower/palette is unclear → replace with a paintbrush icon
- Keep `history`, `nature`, `architecture`, `food`, `legends`, `wildlife` — these are recognizable

**Why:** At 40px on mobile, the current 18px stroke icons are too small and some are indistinguishable. Several categories share similar shapes (legends and hidden-gem are both stars).

---

## 4. POI Clustering at Zoom-Out (`CuratedMap.tsx`)

**Changes:**
- Switch from individual DOM markers to a **Mapbox GeoJSON source + symbol layer** for POIs at low zoom
- Use Mapbox's built-in `cluster` option on the GeoJSON source:
  ```
  source: { type: "geojson", data: poiFeatureCollection, cluster: true, clusterRadius: 50, clusterMaxZoom: 11 }
  ```
- Cluster circles: 48px, deep-green background, white count text (16px bold)
- At zoom > 11: clusters dissolve into individual markers (keep current DOM marker approach)
- Hybrid approach: use GeoJSON clusters for zoomed-out, switch to DOM markers when zoomed in past threshold
- On cluster click: zoom into the cluster extent using `getClusterExpansionZoom`

**Implementation:**
- Add a `pois` GeoJSON source with clustering enabled in `mapLayers.ts`
- Add `cluster-circles` and `cluster-count` layers
- In `CuratedMap.tsx`, listen to zoom level: hide DOM markers when zoom < 11, show cluster layer; reverse when zoom >= 11
- Handle `click` on cluster layer to expand

**Why:** With 10 POIs it's manageable, but the plan calls for many more. Clustering prevents visual clutter at zoomed-out views and communicates density clearly.

---

## 5. Category Filter Bar Accessibility (`CategoryFilterBar.tsx`)

**Changes:**
- Increase chip height: add `py-2.5` (from `py-2`)
- Increase chip font from `text-xs` to `text-sm`
- Add `min-h-[44px]` to each chip for WCAG touch target
- Increase horizontal padding from `px-4` to `px-5`
- Move filter bar down slightly from `top-4` to `top-5` to avoid conflict with map controls on right

**Why:** Current filter chips at 12px text and ~36px height are too small for 60+ users on mobile.

---

## 6. QuickInfoSheet Accessibility (`QuickInfoSheet.tsx`)

**Changes:**
- Increase title font from `text-lg` to `text-xl`
- Increase close button from `h-8 w-8` to `h-10 w-10`
- Increase "Swipe/Tap for full story" text from `text-caption` to `text-body-small`
- Increase thumbnail from `h-20 w-20` to `h-24 w-24`

---

## File Changes Summary

| File | Changes |
|---|---|
| `BottomTabBar.tsx` | Larger bar, bigger icons/labels, better Journey icon, visible operator return |
| `MapControls.tsx` | Larger buttons, add Help button, add disabled Camera/Live View button |
| `CuratedMap.tsx` | Add cluster source/layers, zoom-based marker visibility toggle, larger DOM markers |
| `mapLayers.ts` | Add POI cluster source and layers |
| `mapIcons.ts` | Larger SVGs (22px), replace culture/engineering/hidden-gem/art icons |
| `CategoryFilterBar.tsx` | Larger chips, bigger text, better spacing |
| `QuickInfoSheet.tsx` | Larger text, bigger close button, bigger thumbnail |
| `src/index.css` | Update vessel marker sizes to match new scale |

## Implementation Order

1. Bottom nav + icon changes (foundational, affects all pages)
2. Map control buttons (larger + help + camera placeholder)
3. POI marker icon redesign (bigger, clearer)
4. POI clustering (new Mapbox source/layer system)
5. Filter bar + QuickInfoSheet accessibility
6. Mobile viewport testing

