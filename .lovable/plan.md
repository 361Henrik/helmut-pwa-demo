

# Demo-Ready Polish — Implementation Plan

## Problem Summary

From the screenshots:
1. **Broken images** — POI thumbnails show alt text instead of images (Wikimedia Commons URLs are failing, likely due to hotlink restrictions)
2. **Route cuts across land** — the route coordinates form a rough polyline that doesn't follow the actual river path precisely enough at zoomed-in views
3. **Auth blocks demo flow** — Sign-in required for Saved page and story bookmarks
4. **Help button does nothing** — Settings "Help & Support" has no destination; Welcome page help icon has no handler
5. **"Back to Travel App"** — generic placeholder text, should use a realistic operator name

## Plan

### 1. Demo Access / Auth Bypass

**Changes:**
- In `useAuth.tsx`, add a `demoMode` flag that creates a fake user/session so `user` is always truthy
- The AuthProvider immediately sets a mock user object (no real Supabase call) so all auth-gated features (Saved, bookmarks) work without signing in
- In `WelcomePage.tsx`, change "Login / Recover Saved Journey" to "Enter Demo" and route to `/journey` instead of `/auth`
- In `SavedPage.tsx` and `StoryPage.tsx`, the existing auth checks will pass automatically since `user` is always set
- In `useSavedStories.ts`, fall back to localStorage when Supabase queries fail (demo resilience)

### 2. Help / Support Flow

**Changes:**
- Create a new `HelpPage.tsx` at `/help` with polished Getting Started content (how the app works, FAQ, support contact)
- Wire the Settings "Help & Support" button to navigate to `/help`
- Wire the WelcomePage help icon to navigate to `/help`
- Wire the MapControls help button to show a richer toast (already works, but improve text)
- Add the `/help` route to `App.tsx` inside AppShell

### 3. Branding / Text Cleanup

**Changes:**
- In `BottomTabBar.tsx`, change "Back to Travel App" default to "Back to Viking River Cruises"
- In `WelcomePage.tsx`, change "Start Exploring" to "Begin Your Journey", fix subtitle
- Consistent operator name across all surfaces

### 4. Images / Content Realism

**Root cause:** Wikimedia Commons blocks hotlinking from external domains. The `thumbnailUrl` values use Wikimedia thumb URLs which return 403 or empty responses when loaded as `<img src>` from a different origin.

**Fix:** Replace all Wikimedia Commons URLs with Unsplash URLs that reliably serve images via CDN. Use specific, place-appropriate Unsplash photos (river cruises, castles, cathedrals, Rhine scenery). Unsplash allows hotlinking via their CDN (`images.unsplash.com`).

Update all 26 POIs in `mock-route.ts` with working Unsplash URLs that match the real places.

### 5. River Route / Map Fix

**Root cause:** The route coordinates are manually approximated and don't follow the actual Rhine river path. At zoomed-in views (e.g., the Bonn screenshot), the polyline cuts straight through land because the coordinate density isn't high enough and positions are interpolated rather than traced from the actual river.

**Recommended fix:** The current coordinate set has ~450 points, which is reasonable density. The real issue is that many coordinates are slightly off the river center, especially in curvy sections. The most impactful improvement without a complete data overhaul:
- Increase the `line-width` slightly and use a more transparent line style so small deviations from the river are less obvious
- Add `line-blur` to soften the line edges
- Correct the most egregious straight-line segments (Bonn-Cologne area, Basel initial section where the route goes east into Switzerland before coming back)

The Basel section (lines 127-200) has a serious geographic error: the route goes east along the Swiss-German border (toward Lake Constance) then loops back west — this is not the navigable Rhine path. Basel to Strasbourg should go straight north along the Upper Rhine plain. I will fix these coordinates.

**Tradeoff:** A complete river-accurate trace would require thousands of coordinates from a GIS source. For demo purposes, fixing the worst offenders and softening the line style is the pragmatic approach.

### File Changes

| File | Changes |
|---|---|
| `src/hooks/useAuth.tsx` | Add demo mode — mock user always set |
| `src/hooks/useSavedStories.ts` | localStorage fallback for demo |
| `src/pages/WelcomePage.tsx` | Update CTAs and help icon |
| `src/pages/AuthPage.tsx` | Auto-redirect in demo mode |
| `src/pages/HelpPage.tsx` | New — Getting Started / FAQ page |
| `src/App.tsx` | Add `/help` route |
| `src/components/layout/BottomTabBar.tsx` | Viking River Cruises branding |
| `src/pages/SettingsPage.tsx` | Wire Help & Support to `/help` |
| `src/data/mock-route.ts` | Fix Basel route coordinates, replace all image URLs |
| `src/components/map/mapLayers.ts` | Soften route line style |

### Implementation Order
1. Fix images (biggest visual impact)
2. Demo auth bypass
3. Help page + wiring
4. Branding cleanup
5. Route coordinate fixes + line softening

