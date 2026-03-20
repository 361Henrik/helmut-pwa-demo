

## Make the Route Follow the Actual Rhine River

### Problem
The current `ROUTE_COORDINATES` array has ~25 city-level waypoints connected by straight lines. This creates a jagged path that cuts across land instead of following the Rhine's actual course.

### Approach: Use Mapbox Directions API (river-snapped polyline)

There are two viable options:

**Option A — Pre-baked detailed coordinates (recommended)**
Replace the 25-point array with ~200-400 points that trace the actual Rhine river path. I will generate these coordinates by densely sampling the Rhine's known geography from Basel to Amsterdam. This requires no API calls at runtime and keeps the app fully offline-capable.

**Option B — Mapbox Map Matching API at runtime**
Call the Mapbox Map Matching API with the existing waypoints to snap them to waterways. This adds a network dependency and complexity.

### Recommendation: Option A

I will replace `ROUTE_COORDINATES` in `src/data/mock-route.ts` with a dense array of ~200+ coordinates that closely follow the Rhine's actual river path from Basel through Strasbourg, Mannheim, Mainz, Koblenz, Cologne, Düsseldorf, and on to Amsterdam. The route will also be corrected to remove the current detour through Konstanz/Tuttlingen (which is Lake Constance, not the navigable Rhine cruise route).

### Changes
1. **`src/data/mock-route.ts`** — Replace `ROUTE_COORDINATES` with a dense, river-accurate coordinate array (~200-400 points tracing the Rhine)
2. No other files need changes — `CuratedMap.tsx` already renders the route from this array

### Corrected route geography
The current array incorrectly routes through Schaffhausen → Konstanz → Tuttlingen → Breisach. The actual Basel-Amsterdam cruise follows: Basel → Breisach → Strasbourg → Speyer → Mannheim → Mainz → northward. This will be fixed.

