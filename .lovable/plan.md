

# Fix Broken POI Images

## Problem
The screenshot shows POI thumbnails displaying alt text instead of images on the Journey page. The Unsplash URLs use arbitrary photo IDs that may not exist or return valid images. Several URLs are also duplicated across different POIs.

## Root Cause
The Unsplash photo IDs in `thumbnailUrl` fields are fabricated/guessed rather than verified. Unsplash returns 404 for non-existent IDs, and some IDs are reused across multiple POIs.

## Fix
Replace all 26 `thumbnailUrl` values in `src/data/mock-route.ts` with verified, working Unsplash photo URLs. Each URL will use a known-valid photo ID that visually relates to the POI's subject matter (cathedrals, castles, rivers, windmills, etc.).

Additionally, add an `onError` fallback in the Journey timeline and QuickInfoSheet image elements so any future broken image gracefully shows a placeholder instead of alt text.

### Files changed
| File | Change |
|---|---|
| `src/data/mock-route.ts` | Replace all 26 thumbnailUrl values with verified working Unsplash IDs |
| `src/components/journey/JourneyTimeline.tsx` | Add `onError` fallback on `<img>` tags |
| `src/components/map/QuickInfoSheet.tsx` | Add `onError` fallback on `<img>` tag |

### Image selection approach
Use well-known, heavily-used Unsplash photos with stable IDs — prioritizing photos of European architecture, Rhine scenery, Dutch landscapes, and German landmarks. Each POI gets a unique image.

