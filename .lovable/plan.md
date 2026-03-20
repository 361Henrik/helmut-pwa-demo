

# Helmut Silent Companion — Full Correction Plan

## 1. Screen / State Architecture

```text
Stage 0: Journey Overview (/journey)
  → summary-only, no individual POI detail
  → "Go Live" transitions to Stage 1

Stage 1: Live GPS Map (/map)
  → route line, vessel, corridor mask
  → passive labels, bounded view
  → proximity-gated markers (not all at once)

Stage 2: Passive Discovery (automatic)
  → ProximityBar updates as vessel moves
  → markers fade in within radius
  → no user action required

Stage 3: Quick Info Card (tap marker or proximity trigger)
  → icon + title + 1 factual line + audio button
  → no image, no story text

Stage 4: Expanded Story (/story/:id)
  → text, audio, sources, save
  → NO hero image — category icon header instead

Stage 5: Live View / AR (optional from map)
  → camera overlay demo
  → graceful fallback to 2D map
```

## 2. Component Audit — Where Images Are Still Used

| File | Issue | Fix |
|---|---|---|
| `StoryPage.tsx` lines 52-62 | Hero image `<motion.img src={poi.thumbnailUrl}>` | Replace with category icon header (large icon + gradient bg) |
| `SavedPage.tsx` lines 124-129 | `<img src={item.thumbnailUrl}>` in saved list | Replace with 48x48 category icon container |
| `WelcomePage.tsx` line 6 | Hero background image import | Keep — this is branding, not POI imagery |
| `mock-route.ts` line 10 | `thumbnailUrl` field on POI interface | Keep field but stop rendering it; or mark optional |
| `QuickInfoSheet.tsx` | Already icon-based | No change needed |
| `JourneyTimeline.tsx` | Already icon-based (POINameRow) | No change needed |
| `JourneyPage.tsx` | No POI images | No change needed |

**Summary**: Two files still render POI images — `StoryPage.tsx` and `SavedPage.tsx`.

## 3. Data / Rendering Plan

### What renders immediately (on screen load)
- **Journey Overview**: header, progress bar, category mix chips, day headers (collapsed)
- **Live Map**: map tiles, route line, corridor mask, vessel marker

### What renders progressively
- **Live Map**: markers appear based on zoom level (>10) AND proximity (<50km full opacity, rest 0.3)
- **ProximityBar**: updates based on vessel position
- **Cluster circles**: visible below zoom 10, hidden above

### What is proximity-triggered
- Marker full-opacity transition (within 50km)
- ProximityBar category summary update

### What is user-triggered
- Quick Info Card (tap marker)
- Expanded Story (swipe up or tap "full story")
- Day section expand (tap day header)
- Live View overlay (tap camera button)
- Voice command (tap mic button)

### What is deferred / excluded
- Story body text (only loaded when navigating to /story/:id)
- Audio playback (only on explicit play)
- AR overlay (only on camera button tap)
- No POI images loaded anywhere

## 4. Map Behavior Plan

### Passive labels
- Port/day labels from `CRUISE_ITINERARY` — currently not rendered on map
- **New**: Add day port labels as static map markers (non-interactive text) at each port coordinate
- These appear at all zoom levels as orientation text

### Interactive POI markers
- 48px circle DOM markers with category SVG icons (already implemented)
- Hidden below zoom 10 (cluster mode instead)
- Proximity-gated opacity (50km radius)
- Category filter chips control visibility

### Clusters
- GeoJSON cluster source with circle + count layers (already implemented)
- Visible below zoom 10, hidden above
- Tap cluster → zoom to expansion level

### Journey boundary / corridor
- Inverted polygon mask already implemented (~15km buffer)
- Mutes out-of-corridor geography with 45% white overlay

### Zoom behavior
- Zoom < 10: clusters visible, DOM markers hidden
- Zoom 10-11: DOM markers appear as dots (category icons)
- Zoom > 11: full marker size
- All zoom levels: route line + vessel + corridor mask visible

### Naming behavior
- POI names do NOT appear on map at broad zoom (only cluster counts)
- POI names visible only when marker is tapped (QuickInfoSheet)
- Port names as passive labels at all zooms

## 5. Overview → Live Handoff

### Current state
- Journey tab shows overview with "Go Live" CTA → navigates to /map
- Live tab shows status chip "● Live · Day 4 · Rüdesheim"
- These are already separate tabs/routes

### What needs reinforcement
- No changes needed to the handoff mechanism itself
- The separation is already structurally correct (different routes, different tabs)
- The "Go Live" button and tab switch both work

## 6. Voice Architecture Recommendation

### Assessment

**ElevenLabs**: High-quality but adds latency, API cost, streaming complexity, and fragility for a demo. Audio is a Layer 4 feature (expanded story), not the primary interaction. Offline/poor-connectivity scenarios make live TTS risky.

**Browser-native Web Speech API**: Already implemented for voice commands. For TTS, `speechSynthesis` is free, instant, works offline, but sounds robotic.

**Pre-generated audio files**: Most reliable for demo. Can be stored as static assets or in storage. Zero latency, works offline, premium feel.

**Recommendation**: **Hybrid approach — do not use ElevenLabs yet.**

- **Priority stories** (top 5-8 POIs): Pre-generate audio files using ElevenLabs offline (not live API calls), serve as static MP3s
- **Other POIs**: `audioUrl` remains undefined, audio button hidden
- **Voice commands**: Keep browser-native `webkitSpeechRecognition` (already implemented)
- **Fallback**: Text-only when audio unavailable

This gives premium audio quality for demo moments without runtime API dependency. ElevenLabs can be integrated as a live service later when offline caching and error handling are production-ready.

### Where audio fits in the flow
- **Quick Info Card (Layer 3)**: Play button visible if `audioUrl` exists
- **Expanded Story (Layer 4)**: Full AudioPlayer component
- **NOT** auto-triggered — always user-initiated or voice-commanded

## 7. Implementation Sequence

**Step 1**: Remove POI images from `StoryPage.tsx`
- Replace hero image with large category icon header (80px icon in gradient container)
- Remove `<motion.img>` block

**Step 2**: Remove POI images from `SavedPage.tsx`
- Replace `<img src={item.thumbnailUrl}>` with 48px category icon container
- Same pattern as QuickInfoSheet

**Step 3**: Add passive port labels to live map
- In `mapLayers.ts`, add a new GeoJSON source + symbol layer for day ports
- Non-interactive, visible at all zoom levels
- Data from `CRUISE_ITINERARY` port coordinates

**Step 4**: Make `thumbnailUrl` optional in POI interface
- Change type to `thumbnailUrl?: string` so it's clear the field is not relied upon

**Step 5**: Verify progressive loading behavior
- Confirm cluster → marker transition works at zoom 10
- Confirm proximity opacity gating at 50km
- Confirm QuickInfoSheet is icon-only (already done)

## 8. Risk List

| Risk | Location | Fix |
|---|---|---|
| Hero image still rendered | `StoryPage.tsx` lines 52-62 | Step 1 — replace with icon header |
| Thumbnail still rendered | `SavedPage.tsx` lines 124-129 | Step 2 — replace with icon |
| No passive port labels on map | `mapLayers.ts` / `CuratedMap.tsx` | Step 3 — add port label layer |
| `thumbnailUrl` required in interface | `mock-route.ts` line 10 | Step 4 — make optional |
| Overview and live map are already separate | No conflict | Correct — tabs/routes already distinct |
| QuickInfoSheet | Already icon-based | No conflict |
| JourneyTimeline | Already icon-based | No conflict |
| Voice button | Already browser-native | No conflict |
| AR overlay | Already demo-only | No conflict |

## File Changes Summary

| File | Change |
|---|---|
| `src/pages/StoryPage.tsx` | Replace hero image with category icon header |
| `src/pages/SavedPage.tsx` | Replace thumbnail with category icon |
| `src/data/mock-route.ts` | Make `thumbnailUrl` optional |
| `src/components/map/mapLayers.ts` | Add passive port label layer |

No other files need changes — the rest of the layered architecture is already correctly implemented.

