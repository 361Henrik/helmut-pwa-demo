

# Comprehensive Product & UX Review — The Curated Lens

---

## 1. Executive Summary

**The Curated Lens** is a river cruise companion PWA that surfaces location-based stories as travelers sail Basel to Amsterdam. The current build has solid foundations: a tasteful design system, a working Mapbox integration with dense Rhine coordinates, an onboarding flow, POI markers with story pages, audio playback, and basic auth with saved stories.

**Most important weaknesses:**

1. **No journey narrative arc.** The traveler has no sense of the full voyage — no timeline, no anticipation of what's ahead, no contextual awareness of "where am I in this story." The Journey tab is a shallow dashboard, not a journey companion.
2. **Content trust is zero.** There is no transparency about where stories come from, how they are written, who curates them, or whether AI is involved. For a premium editorial product, this is a critical gap.
3. **Onboarding is generic and forgettable.** The narrative cards use vague emoji-heavy copy that doesn't demonstrate the product's actual value. The permissions step is non-functional. The interest picker has no preview of what each category delivers.
4. **The Story page is a dead end.** No "next story," no journey context, no related content, no indication of what's nearby. The narrative text is hardcoded filler after the first paragraph.
5. **Live View (AR) has no entry point.** The Camera button on the map is wired to nothing.
6. **Settings is a flat utility screen.** It lacks content transparency, editorial methodology, data provenance, or any trust-building information.

**Highest-priority improvements:**

- Build a real Journey Overview as the primary post-onboarding experience
- Add content provenance and editorial transparency
- Redesign onboarding to demonstrate actual value
- Wire the Camera/Live View feature with proper progressive introduction
- Add story-to-story navigation and journey context to the Story page
- Restructure Settings into a proper information architecture

---

## 2. End-to-End User Journey Review

### Stage 1: Welcome Page (`/`)

**User goal:** Understand what this app is and decide to engage.

**Current experience:** Hero image, "Welcome aboard" headline, "Start Exploring" CTA, language picker, login link.

**What works:** Visual impact is strong. Language picker is well placed. The copy tone is appropriate — quiet, premium.

**Issues:**
- "Your silent companion for the journey ahead" — too abstract. Tells the user nothing about what the app actually does.
- "Start Exploring" is misleading — it leads to onboarding, not exploring.
- "Login / Recover Saved Journey" is confusing phrasing. "Recover" implies data loss.
- The hero image import (`@/assets/hero-welcome.jpg`) — no fallback if the image fails to load.
- No indication this is connected to their specific cruise or itinerary.

**Recommendations:**
- Rewrite subtitle: *"Stories, sounds, and secrets from the river — delivered as you sail."*
- Change CTA: "Begin Your Journey" or "Get Started"
- Change login link: "Sign In" (simple, standard)
- Add a one-line journey context: "Rhine Cruise · Basel to Amsterdam · 7 Nights"
- **Priority: Medium**

### Stage 2: Onboarding (`/onboarding`)

**User goal:** Understand how the app works and configure it for their trip.

**Current experience:** 3 narrative cards → permissions → interest picker → map.

**Issues:**
- **Narrative cards are forgettable.** Emoji icons (🏔️📖🤫) feel juvenile for a premium product. The copy is poetic but doesn't explain what happens practically. After 3 swipes, the user still doesn't know: "Will I get a notification? Will I hear audio? Will I see things on a map?"
- **Permissions are non-functional.** Both "Allow" buttons do nothing (`onClick={() => {}}`). No actual `navigator.geolocation` or `Notification.requestPermission()` calls.
- **Interest picker lacks preview.** Choosing "Legends & Stories" gives no hint of what that means in practice. A small example ("e.g. Loreley Rock, local myths") would help.
- **Progress bar shows 4 steps but only 3 exist.** The `totalSteps` is hardcoded to 4 but there are only 3 steps (narrative, permissions, interests). This is misleading.
- **No back navigation.** Once you move to permissions, you cannot return to narrative cards.
- **Category selection persists to localStorage but the key mismatch** — onboarding writes `curated-lens-categories` and the filter bar reads it, which works, but the Settings page also writes to the same key, creating a silent override pattern.

**Recommendations:**
- Replace emoji icons with illustrations or branded iconography
- Rewrite cards to show concrete examples of what the user will experience
- Wire permission requests to actual browser APIs
- Fix totalSteps to match actual step count (3, or add a 4th step — the Journey Overview)
- Add the Journey Overview as the 4th onboarding step (see Section 3)
- Add back navigation
- **Priority: High**

### Stage 3: Journey Page (`/journey`)

**User goal:** Understand where they are in the cruise and what's coming.

**Current experience:** Brand header, "Rhine River Cruise" title, a progress bar (hardcoded 40%), 3 upcoming POIs, 2 quick-action buttons.

**Issues:**
- **Everything is hardcoded.** Progress, day count, location label — all static strings.
- **No narrative arc.** This should be the emotional heart of the app — "here's your journey, here's where you are, here's what's ahead." Instead it's a flat list.
- **No visual connection to the route.** The progress bar is a generic horizontal bar with no sense of the river, the landscape, or the geography.
- **Upcoming POIs are filtered wrong.** `poi.coordinates[1] > VESSEL_POSITION[1]` filters by latitude being north, which doesn't account for the river's actual path (the Rhine goes west and east, not just north).
- **No distinction between passed, current, and upcoming stops.**
- **No day-by-day structure.** A 7-night cruise has a natural daily rhythm — this page ignores it.

**Recommendations:**
- This page should become the Journey Overview (see Section 3)
- Replace the flat progress bar with a vertical scrollable timeline or mini-map route view
- Structure content by day/segment
- Show passed, current, and future segments with visual differentiation
- **Priority: Critical**

### Stage 4: Map Page (`/map`)

**User goal:** See where they are and discover nearby stories.

**Current experience:** Full-screen Mapbox map with Rhine route, POI markers, vessel dot, category filter chips, quick-info sheet on marker tap.

**What works:** Map rendering is solid. Route line follows the river. Markers have category icons. Filter chips work. QuickInfoSheet is well-designed with drag-to-expand.

**Issues:**
- **No header or context.** The map floats without any indication of the journey. No "Day 4 · Near Mainz" context.
- **Camera button does nothing.** This is confusing — a visible control with no action erodes trust.
- **Map style toggle breaks the route.** When switching styles via `setStyle()`, the route source and layers are destroyed. The map would need to re-add them on `style.load`.
- **QuickInfoSheet play button on audio** — present on all POIs (condition is `poi.audioUrl !== undefined`) but no POIs have `audioUrl` set, so the button never shows. However, the condition logic is inverted — it would show only when audioUrl IS defined, which is never. This is correct behavior but means no POI ever shows the quick-play button.
- **"Swipe up for full story"** — on desktop, swiping is not intuitive. Should say "Tap for full story" on non-touch devices.
- **No "You are here" label** on the vessel marker.
- **Filter state resets on navigation.** Leaving the map and returning clears the active filters.

**Recommendations:**
- Add minimal top context bar: "Day 4 · Approaching Koblenz"
- Remove Camera button until Live View is wired (or add a "Coming soon" tooltip)
- Fix style toggle to re-add route/markers after style change
- Persist filter state
- Add vessel label or tooltip
- **Priority: High**

### Stage 5: Story Page (`/story/:id`)

**User goal:** Read/listen to a story about something they're seeing or passing.

**Current experience:** Hero image, category badge, title, teaser, audio player, 4 paragraphs of text, save CTA.

**Issues:**
- **3 of 4 paragraphs are generic filler** — identical regardless of POI. Only `storyExcerpt` is unique. This makes every story feel the same.
- **No journey context.** Where is this POI relative to the vessel? Am I approaching it, passing it, or is it behind me?
- **No "next story" navigation.** The page is a dead end — back button only.
- **No related stories.** "If you liked this, you might also enjoy…"
- **Share button does nothing** (`onClick` not wired).
- **Audio is mock.** The player shows a 3:05 timer but produces no sound. Acceptable for MVP but should be clearly labeled as "demo."
- **No source attribution.** Who wrote this? Where did the information come from?

**Recommendations:**
- Add "Next Story" / "Nearby Stories" at the bottom
- Add distance/direction from vessel: "2.3 km ahead, starboard side"
- Add source line: "Curated from [source] · Last verified [date]"
- Wire the share button (Web Share API)
- Replace filler paragraphs with per-POI content
- **Priority: High**

### Stage 6: Saved Page (`/saved`)

**User goal:** Review stories I've bookmarked.

**Current experience:** List of saved POIs with thumbnail, category, date saved, delete button. Auth-gated with sign-in CTA.

**What works:** Clean layout. Delete animation. Auth state handling.

**Issues:**
- **No chronological/journey ordering.** Items are in save-order, not route-order. A traveler wants to see their journey timeline, not a reverse-chronological dump.
- **No grouping by day or location segment.**
- **No export or sharing.** "Share my journey" is a natural desire.
- **No way to add notes or personal reflections.**

**Recommendations:**
- Order by route position, not save date
- Add day/segment grouping
- Add optional personal note per saved story
- **Priority: Medium**

### Stage 7: Settings Page (`/settings`)

**User goal:** Adjust preferences and understand the app.

**Current experience:** Language picker, 3 toggles (notifications, location, offline), interest categories, account section, about section.

**Issues:** See dedicated Section 4 below.

### Stage 8: Auth Page (`/auth`)

**User goal:** Sign in or create an account.

**Current experience:** Email/password form with toggle between sign-in and sign-up.

**What works:** Clean, functional, proper error handling.

**Issues:**
- **No social auth.** Email-only feels dated for a premium product.
- **No password reset flow.**
- **After sign-up, redirects to /map** — should return to where the user came from.
- **No explanation of why to create an account.** The page says "save stories" but doesn't convey the value proposition.

**Recommendations:**
- Add "Forgot password?" link
- Track redirect origin and return there after auth
- Add brief value prop: "Your saved stories, preferences, and journey — synced across devices"
- **Priority: Medium**

---

## 3. Journey Overview Feature Recommendation

### Purpose
Give the traveler an immediate, emotionally engaging sense of the full cruise — where they've been, where they are, and what's ahead. Create anticipation, orientation, and narrative continuity.

### Best format: Vertical scrollable route timeline (not a separate screen)

The Journey Overview should **replace the current JourneyPage** as the primary `/journey` tab content. It should combine:

1. **A vertical timeline** that follows the river from Basel to Amsterdam
2. **Day markers** showing each cruise day (Day 1: Basel, Day 2: Strasbourg, etc.)
3. **A "you are here" indicator** that divides past from future
4. **POI cards** placed at their natural positions along the timeline
5. **Segment descriptions** — brief editorial text about each stretch of river

### UX rationale
- A vertical timeline is natural for a river journey — you scroll "downstream"
- It mirrors the physical experience: linear, sequential, unfolding
- It provides both overview (scroll quickly to see the whole trip) and detail (stop to read about upcoming POIs)
- It connects the onboarding promise ("stories hidden in every landscape") to concrete content

### Required content
- Day/night schedule of the cruise
- Key stops and ports
- POIs grouped by segment
- Brief segment descriptions ("The Rhine Gorge: where the river narrows to 200m between towering cliffs")
- Estimated arrival times or "distance from now" indicators

### Interaction model
- Scroll vertically through the full route
- "You are here" marker stays visible or can be jumped to
- Tapping a POI card opens the story or the map centered on that point
- Past segments are visually muted; future segments are vivid
- A floating "Jump to Now" button if the user scrolls away from current position

### Connection to onboarding
Add this as the **4th onboarding step**: a brief preview of the journey timeline that says "Here's your voyage" with 2-3 highlighted upcoming POIs visible, then CTA: "Let's begin." This replaces the direct jump to the map.

### Risks
- Requires structured day/segment data that doesn't exist yet in mock-route.ts
- If the vessel position doesn't update, the "you are here" loses meaning
- Content-heavy — needs real editorial for each segment

---

## 4. Settings Page Review and Transparency Improvements

### What's missing

The Settings page currently has zero information about:
- Who writes the stories
- What sources are used
- Whether AI is involved in content creation
- How recommendations are personalized
- What data is collected and how it's used
- How accurate the information is
- When content was last verified
- Editorial standards or methodology

For a product that positions itself as a "curated" editorial experience, this absence is a trust problem. "Curated" implies human judgment — but there's no evidence of it.

### What users need to trust the content

1. **Editorial methodology** — "How we write stories: Our editorial team researches each location using [sources]. Stories are verified against [standards]."
2. **Source transparency** — Per-story attribution (belongs on the Story page, not Settings)
3. **AI disclosure** — If AI is used for drafting, say so: "Our writers use AI tools to draft and fact-check narratives, with human editorial review."
4. **Content freshness** — "Last updated" dates on stories
5. **Personalization explanation** — "Why am I seeing this?" — belongs contextually near recommendations
6. **Privacy/data** — What location data is stored, who sees it, how long it's kept

### Recommended information architecture

**Settings page should contain:**
- Language, notifications, location, offline (current — keep)
- Account (current — keep)
- **Privacy & Data** section (new): what data is collected, retention, export
- **Personalization** section: interest categories (current) + explanation of how they affect content

**New standalone page: "About Our Content" (accessible from Settings and from Story pages):**
- Editorial philosophy
- How stories are created
- Source types used (historical archives, local experts, academic sources, field research)
- Role of AI (if applicable)
- Accuracy commitments
- How to report errors
- Content team / editorial board (even if anonymous: "Our editorial team includes historians, travel writers, and local experts")

**On each Story page:**
- Source line: "Sources: Rhine Historical Society, UNESCO World Heritage records"
- "Last verified: March 2026"
- Link to "About Our Content"

### Wording themes
- Transparent but not defensive
- Confident but not arrogant
- Specific rather than vague
- "We research, we verify, we care" — not "we guarantee"

---

## 5. Live View Integration Plan

### What Live View solves
The traveler is standing on deck, looking at a landscape feature, and wants to know: "What am I looking at?" Live View overlays contextual labels on the camera feed, identifying visible POIs, landmarks, and river features.

### Where it enters the flow

1. **Onboarding:** Brief mention in narrative cards — "Point your camera at the landscape to discover what you're seeing" (one sentence, not a full step)
2. **Map page:** The existing Camera button becomes the Live View entry point
3. **Story page:** "See it in Live View" link when the POI is nearby
4. **Journey page:** "Try Live View" contextual prompt when approaching a POI cluster

### Progressive introduction

- **Phase 1 (now):** Remove the Camera button or add "Coming Soon" state
- **Phase 2:** Basic camera view with POI labels overlaid based on compass heading + GPS
- **Phase 3:** AR-style markers that track with device orientation (gyroscope)
- **Phase 4:** Landscape recognition — identify mountains, buildings, bridges without GPS dependency

### UX behavior

- Opens as a full-screen overlay (not a new route — preserves map state)
- Shows a simplified camera feed with floating labels
- Labels show POI name + distance + direction
- Tapping a label opens the QuickInfoSheet or Story
- "Close" returns to the previous screen
- Horizontal compass strip at the top showing cardinal direction

### Prerequisites and edge cases
- Requires camera permission (separate from location)
- Needs device orientation API (not available on all browsers — must detect and fallback)
- Fallback: "Your device doesn't support Live View. Use the map to find nearby stories."
- Must handle: camera denied, no GPS, no gyroscope, landscape vs portrait
- Night mode: reduce brightness, show fewer labels
- Indoor detection: "Live View works best outdoors on deck"

### Onboarding for Live View
- First time the user taps the Camera button: a 2-screen coach overlay explaining what they'll see
- Not gated behind permissions — show the explanation first, then request camera access
- After first use, skip the coach overlay

---

## 6. "Welcome on board: How it works" Audit

### Current state
The onboarding has 3 narrative cards:

1. "Never miss what you're looking at" — 🏔️
2. "A hill is just a hill — until you know its story" — 📖
3. "Here when you need us, invisible when you don't" — 🤫

### What's wrong

**The titles are poetic but not instructive.** After reading all three, the user knows the app's *philosophy* but not its *mechanics*. They don't know:
- That stories appear automatically as they sail
- That they can listen to audio narrations
- That they can save stories
- That they can filter by interest
- That there's a map tracking their position

**The descriptions are vague.** "We surface them gently, right when you need them" — how? Push notification? Map marker? Audio cue?

**The emoji icons undermine the premium positioning.** A product with Playfair Display headings and a terracotta-and-deep-green palette should not use 🏔️📖🤫 as its visual system.

**The flow is too long.** 3 narrative cards + permissions + interests = 5-6 taps before seeing anything real. For an app meant to feel effortless, this is too much friction.

### Recommended replacement

**Reduce to 2 narrative cards + permissions + interests + journey preview (4 total steps):**

**Card 1: "Your journey, narrated"**
*Description:* "As your ship sails, stories appear on your map — about the castles, vineyards, and hidden places you're passing. Listen, read, or simply glance."
*Visual:* A stylized map snippet showing a marker with a story card, not an emoji.

**Card 2: "Curated for you"**
*Description:* "Choose your interests, and we'll highlight what matters most to you. Everything is researched, verified, and written for curious travelers."
*Visual:* A grid of category icons (consistent with the interest picker).

Then: Permissions → Interests → Journey Preview → Map.

The key change: **show, don't tell.** Use actual UI elements as illustrations rather than abstract metaphors.

---

## 7. Prioritized Improvement Roadmap

### Quick wins (1-2 implementation messages each)
- Fix `totalSteps` in onboarding (4 → 3, or add the journey preview step)
- Remove or disable Camera button on map until Live View is ready
- Fix map style toggle (re-add route/markers on style.load)
- Wire Share button on Story page (Web Share API)
- Add "Forgot password?" to auth page
- Add per-story source attribution line
- Fix "Login / Recover Saved Journey" copy on Welcome page → "Sign In"
- Add vessel label/tooltip on map

### Medium-effort improvements (1 session each)
- Rewrite onboarding narrative cards with concrete, instructive copy
- Wire actual permission requests (geolocation, notifications)
- Add "Next Story" / "Nearby" navigation to Story page
- Build "About Our Content" page with editorial transparency
- Add journey context bar to map ("Day 4 · Near Mainz")
- Order Saved page by route position, add day grouping
- Replace filler story text with per-POI content for all 10 POIs
- Add password reset flow
- Persist map filter state across navigation

### High-impact strategic improvements (multi-session)
- **Rebuild Journey page as vertical route timeline** with day segments, POI cards, and "you are here" indicator
- **Build Live View Phase 2** — camera overlay with POI labels
- **Add day/segment data model** to mock-route.ts (cruise schedule, port stops, segment descriptions)
- **Add editorial transparency system** — per-story sources, verification dates, methodology page
- **Social auth** (Google) for frictionless sign-up

---

## 8. Screen-by-Screen Recommendations

| Screen | Key Change |
|---|---|
| Welcome | Rewrite subtitle and CTAs. Add journey context line. |
| Onboarding | Rewrite cards. Wire permissions. Fix step count. Add journey preview as final step. |
| Journey | Replace with vertical route timeline. Add day structure and "you are here." |
| Map | Add context bar. Fix style toggle. Remove/disable Camera. Persist filters. |
| Story | Add source line. Wire share. Add next/nearby stories. Replace filler text. |
| Saved | Order by route. Add day grouping. |
| Settings | Add Privacy & Data section. Add link to "About Our Content." |
| Auth | Add forgot password. Track redirect origin. Add value prop. |
| *New: About Our Content* | Editorial methodology, sources, AI disclosure, accuracy, reporting. |
| *New: Live View* | Camera overlay with POI labels. Progressive introduction. Coach marks. |

---

## 9. Open Questions / Assumptions

1. **Is the vessel position dynamic or static?** Currently hardcoded. Real-time position updates would transform the Journey and Map experiences but require a data source.
2. **Who writes the content?** The editorial transparency section needs real information. Is there a content team? Are stories AI-generated? This must be decided before the transparency page can be written.
3. **Is the day/itinerary data available?** The journey timeline needs a cruise schedule. Is this provided by the operator or does the app need to infer it?
4. **What is the Live View technical constraint?** DeviceOrientation API requires HTTPS and user gesture. Safari has additional restrictions. Is this acceptable for the target audience?
5. **Multi-cruise support?** The app currently hardcodes "Rhine River Cruise." Will it support multiple itineraries? This affects data architecture significantly.
6. **Offline requirement?** The offline toggle exists but nothing is implemented. How critical is offline for the cruise context (often poor connectivity on water)?
7. **Operator branding?** "The Curated Lens" is the product name, but will individual cruise operators white-label this? Affects the Welcome page and branding approach.

---

## 10. Final Recommended Product Direction

The Curated Lens should evolve from a "map with markers" into a **journey companion that tells a continuous story.** The transformation centers on three shifts:

**From map-first to journey-first.** The primary experience should be the timeline — a scrollable, day-by-day narrative of the voyage with "you are here" as the anchor. The map becomes a supporting tool for spatial exploration, not the landing page.

**From content-hidden to trust-visible.** Every story should carry provenance. An "About Our Content" section should make the editorial process transparent. If AI is involved, say so confidently. Trust is the product's moat — without it, the app is just a prettified Wikipedia overlay.

**From passive to gently active.** Live View, proximity notifications, and audio narration should create moments of discovery that feel serendipitous rather than forced. The app should say: "Look left — that's Loreley Rock" at exactly the right moment, through exactly the right channel (a gentle vibration, a map highlight, or an AR label on camera).

The product's promise is: **"You will never look at a landscape the same way again."** Every feature, every screen, every line of copy should serve that promise.

