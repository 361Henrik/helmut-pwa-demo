

# POI Content Quality & Discovery Improvement Plan

## Current State

10 POIs with Unsplash stock images (none show the actual place), generic filler text in story pages, and no hidden gems or lesser-known stops. All POIs are concentrated on days 3-6 with nothing for days 1-2 or day 7.

## Plan

### 1. Replace all images with real-world photography

**What changes:** Replace every `thumbnailUrl` with a Wikimedia Commons or verified public-domain image that shows the actual place.

| POI | Current Image | Replacement Source |
|-----|--------------|-------------------|
| Loreley Rock | Generic mountain Unsplash | Wikimedia Commons photo of Loreley cliff from river |
| Koblenz Deutsches Eck | Random German town | Wikimedia photo of Deutsches Eck confluence |
| Cologne Cathedral | Distant cathedral shot | Wikimedia photo of Kölner Dom from Rhine |
| Rüdesheim Wine Town | Mountain landscape | Wikimedia photo of Drosselgasse or Rüdesheim waterfront |
| Bacharach Old Town | German village | Wikimedia photo of Bacharach from river |
| Speyer Cathedral | Random cathedral | Wikimedia photo of Speyer Cathedral |
| Rhine Gorge Vineyards | Generic vineyard | Wikimedia photo of terraced Rhine Gorge slopes |
| Düsseldorf Altstadt | Generic bar | Wikimedia photo of Altstadt waterfront |
| Marksburg Castle | Random castle | Wikimedia photo of Marksburg from Rhine |
| Bonn Beethoven House | Piano keys | Wikimedia photo of Beethoven-Haus facade |

**Approach:** Use Wikimedia Commons URLs with `?width=800` parameter for consistent sizing. All images will be verified to show the correct location.

### 2. Expand to 25-30 POIs across all 7 days

**What changes:** Add 15-20 new verified, real-world POIs filling gaps in days 1-2 and day 7, plus hidden gems throughout.

**New POIs by day:**

Day 1 (Basel):
- Basel Minster — Romanesque-Gothic cathedral overlooking Rhine (architecture)
- Dreiländereck — Three-country border point (hidden-gem)

Day 2 (Strasbourg):
- Strasbourg Cathedral — Gothic masterpiece with astronomical clock (architecture)
- Petite France — Half-timbered canal quarter (culture)
- Breisach am Rhein — Medieval hilltop town above the Rhine plain (hidden-gem)

Day 3 (Speyer/Mannheim):
- Mannheim Wasserturm — Art Nouveau water tower and gardens (engineering)
- Heidelberg Castle ruins — visible from river, one of Germany's most famous ruins (history)

Day 4 (Mainz/Rüdesheim):
- Mainz Cathedral — 1000-year-old imperial cathedral (architecture)
- Niederwald Monument — Germania statue above Rüdesheim (history)

Day 5 (Rhine Gorge) — already well-covered, add:
- Burg Rheinfels — largest castle ruin on the Rhine (history)
- St. Goar town — opposite Loreley (hidden-gem)

Day 6 (Cologne/Düsseldorf):
- Ehrenbreitstein Fortress — second-largest preserved fortress in Europe (engineering)
- Drachenfels — dragon legend mountain near Bonn (legends)

Day 7 (Netherlands):
- Arnhem Bridge — WWII "A Bridge Too Far" (history)
- Kinderdijk windmills — if close to route (engineering)
- Amsterdam Centraal arrival — journey's end (culture)

Each POI will include: verified coordinates, factual teaser (1 line), researched storyExcerpt (2-3 sentences with specific facts), real Wikimedia image URL, correct category, and day assignment.

### 3. Replace filler story text with per-POI content

**What changes:** In `StoryPage.tsx`, replace the 3 hardcoded generic paragraphs with a new `storyBody` field on each POI, containing 2-3 paragraphs of verified, place-specific content.

**Approach:**
- Add `storyBody?: string[]` to the `POI` interface — array of paragraph strings
- Populate for all POIs with factual, researched content
- If `storyBody` exists, render those paragraphs; otherwise fall back to the current generic text
- Each paragraph will include at least one verifiable fact (date, measurement, name, event)

### 4. Improve icon consistency review

**What changes:** Audit all category assignments for the expanded POI set. Ensure every new POI has a category with a clear, recognizable icon from the existing `mapIcons.ts` system.

No icon changes needed — the current SVG system (theater masks, bridge, diamond, paintbrush, etc.) already covers all categories well. The focus is on correct category assignment.

### 5. Add source attribution to Story page

**What changes:** Add a `sources?: string[]` field to POI and render a small attribution line at the bottom of each story: "Sources: UNESCO, German National Tourist Board" with a "Last verified: March 2026" line.

### 6. File changes

| File | Changes |
|---|---|
| `src/data/mock-route.ts` | Expand POI interface with `storyBody` and `sources`. Replace all 10 image URLs. Add 15-20 new POIs. |
| `src/pages/StoryPage.tsx` | Render `storyBody` paragraphs instead of hardcoded filler. Add source attribution section. |

### Tradeoffs

- **Wikimedia Commons URLs** may be slower than Unsplash CDN but show real places. Could add `loading="lazy"` and width parameters.
- **25-30 POIs** is a good density for 7 days without overwhelming. The clustering system already handles zoomed-out density.
- **Content verification**: All facts will be based on well-known, easily verifiable information (UNESCO sites, major landmarks, documented history). Nothing speculative.

