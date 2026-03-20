

# Journey Overview vs Live GPS — Layered Discovery Redesign

## Architecture

The current app has two tabs: `/journey` (timeline) and `/map` (full route map). The request is to reframe these as two distinct modes — **Overview** (planning/orientation) and **Live** (GPS-driven, progressive discovery) — and add layered reveal throughout.

```text
Tab Structure (unchanged):
┌──────────┬──────────┬──────────┬──────────┐
│ Journey  │   Live   │  Saved   │ Settings │
│(overview)│ (GPS map)│          │          │
└──────────┴──────────┴──────────┴──────────┘
```

## Changes

### 1. Rename "Map" tab → "Live" + add mode indicator

**`BottomTabBar.tsx`**: Rename the Map tab label to "Live" and swap the `Map` icon for `Navigation` (Lucide). This signals that the second tab is real-time GPS context, not a static route browser.

**`MapPage.tsx`**: Add a top-left status chip: `● Live · Day 4 · Rüdesheim` (pulled from `CRUISE_ITINERARY` current day). This immediately tells users they're in live mode.

### 2. Simplify Journey Overview to summary-only

**`JourneyPage.tsx`**: This is already a good overview page. Enhancements:
- Add a "category mix" section below the progress bar: a row of category chips with counts (e.g., `[Landmark] 8  [Wine] 4  [Theater] 3`) derived from all POIs. This tells the character of the trip at a glance.
- Add a prominent CTA: "Go Live →" button that navigates to `/map` (the live tab).
- Keep the collapsible day timeline as-is — it's already well-structured.

**`JourneyTimeline.tsx`**: Remove the detailed POI cards from the collapsed/expanded day view. Instead:
- Collapsed: keep category chips + stop count (already done)
- Expanded: show day description + a simple list of POI names with category icons (no card styling, no chevrons, no navigation). Just orientation text.
- Add a "View on Live Map" link per day that navigates to `/map` and could center on that day's port.

The overview should **not** be the entry point for deep POI content. It's for understanding the trip shape.

### 3. Live Map — proximity-based progressive disclosure

**`CuratedMap.tsx` + new `ProximityBar.tsx`**:

Replace the current "show all markers at once" approach with proximity-gated layers:

- **Layer 1 (always visible)**: Route line + vessel position + day port labels (passive context)
- **Layer 2 (zoom > 9)**: Category-colored dots (no labels) for POIs within ~20km of vessel
- **Layer 3 (zoom > 11 or tap a dot)**: Full marker with icon + name label appears
- **Layer 4 (tap marker)**: QuickInfoSheet — facts-first, no image

Implement by adding a `proximityFilter` to the marker visibility logic. Use `VESSEL_POSITION` to calculate distance and only show markers within a configurable radius (demo: 50km so enough are visible). Far-away markers get reduced opacity (0.3) instead of hidden entirely.

Add a new **`ProximityBar.tsx`** component: a slim bar at the top of the live map showing "3 nearby · History, Architecture" — a glanceable summary of what's around without looking at the map.

### 4. QuickInfoSheet — facts-first, no image

**`QuickInfoSheet.tsx`**: Replace the 96×96 thumbnail with a 48×48 category icon container (same pattern as JourneyTimeline POI cards). Keep: category label, name, teaser, audio button. Remove: image. This aligns with the "no speculative imagery in live flow" principle.

### 5. StoryPage — keep images but add category icon header

**`StoryPage.tsx`**: The deep-detail story page (Stage 5) keeps the hero image since this is intentional expansion. But add the category icon + label as a more prominent header element above the title.

### 6. Voice activation demo (lightweight)

**New `VoiceButton.tsx`**: A floating mic button on the live map (bottom-right, above controls). On tap:
- Uses Web Speech API (`SpeechRecognition`) for basic command recognition
- Recognizes: "play audio" → triggers audio on nearest POI, "tell me about this" → opens QuickInfoSheet for nearest POI, "what am I looking at" → same
- Shows a brief listening indicator
- No external API needed — browser-native speech recognition
- Fallback: if speech API unavailable, tap shows toast explaining feature

### 7. Live View / AR trigger

**`MapControls.tsx`**: The Camera/Live View button already exists with "Soon" badge. Enhance:
- When tapped, instead of just a toast, show a brief modal/sheet explaining: "Live View uses your camera to identify landmarks. Point at the landscape to discover what you're seeing." with a "Try Demo" button that opens the device camera in a fullscreen overlay with a static label overlay (no real AR, just camera + "Loreley Rock — 2.3km ahead" text positioned center). This makes the concept tangible for demo.

### 8. Bottom tab bar update

**`BottomTabBar.tsx`**: 
- Tab 1: Journey (Route icon) — overview
- Tab 2: Live (Navigation icon) — GPS map
- Tab 3: Saved (Bookmark icon)
- Tab 4: Settings (Settings icon)

## File Changes

| File | Change |
|---|---|
| `BottomTabBar.tsx` | Rename Map→Live, swap icon to Navigation |
| `JourneyPage.tsx` | Add category mix summary, "Go Live" CTA |
| `JourneyTimeline.tsx` | Simplify expanded days to name-only POI list, add "View on Live Map" |
| `MapPage.tsx` | Add live status chip at top-left |
| `CuratedMap.tsx` | Add proximity-based marker filtering, distance calculation |
| `QuickInfoSheet.tsx` | Replace image with category icon |
| `src/components/map/ProximityBar.tsx` | New — glanceable "nearby" summary bar |
| `src/components/map/VoiceButton.tsx` | New — Web Speech API voice command button |
| `MapControls.tsx` | Enhanced Live View demo modal |

## Implementation Order

1. Tab rename + live status chip (quick, visible impact)
2. Journey overview simplification + category mix
3. QuickInfoSheet facts-first redesign
4. Proximity-based marker filtering
5. ProximityBar component
6. VoiceButton demo
7. Live View demo modal

## Key assumptions

- Demo mode: proximity radius set to ~50km so enough POIs are visible around the simulated vessel position near Rüdesheim
- Voice uses browser-native `webkitSpeechRecognition` — works in Chrome/Safari, graceful fallback elsewhere
- No real AR — the "Live View demo" is camera + static text overlay to communicate the concept
- The Journey tab remains the default landing after onboarding; Live is explicitly entered

