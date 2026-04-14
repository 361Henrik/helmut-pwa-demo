# Current User Flow: Helmut PWA Demo

This document outlines the exact mechanics and user flow currently implemented in the demo application (`DemoPage.tsx` and `StoryPage.tsx`). You can edit and comment on this file to outline the changes needed to bring it up to Host Atlas standards.

## 1. The Map Demo Experience (DemoPage.tsx)
The entry point (`/` or `/demo`) drops the user into a full-screen guided map experience.

### Mechanics & State
- **Fixed Fullscreen:** The map takes up the entire viewport.
- **Guided Progression:** Driven by a `step` state (1 through 6). A progress bar is rendered at the absolute top of the screen to indicate progression.
- **Overlay Elements:** `DemoOverlay` and `DemoControls` sit on top of the map. The controls allow the user to pause/play or restart the demo.

### The 6-Step Journey
1. **Intro:** The user lands on the map with POIs visible. The interface has limited controls to guide focus.
2. **Highlight:** The system visually highlights a specific primary POI (Loreley Rock). The user is prompted to tap it. If idle, an `autoTap` function simulates a click after a short delay.
3. **Selection:** The POI is selected. The system automatically advances to Step 4 after a 300ms delay.
4. **Bottom Sheet Expansion:** The `CuratedMap` component slides up a bottom sheet revealing teaser content about the selected POI. 
5. **Full Story Trigger:** Inside the bottom sheet, the user clicks a "Read Full Story" call-to-action. The app saves their `step: 5` state in `sessionStorage` and navigates them to the `/story/:id` page via the router.
6. **Completion:** When the user returns from the story page, the demo reads `sessionStorage`, restores them to Step 5, and then eventually allows them to finish the demo at Step 6.

---

## 2. The Narrative Experience (StoryPage.tsx)
Triggered when the user clicks "Full Story" in the map's bottom sheet. Navigate to `/story/:id`.

### Mechanics & State
- **Missing POI Fallback:** If an invalid ID is passed, it displays a fullscreen "Story not found" screen with a "Go back" link.
- **Contextual Return:** Uses URL query params (`?from=demo`) to know where the user came from so the "Back" button routes them correctly.

### Interface Structure (Top to Bottom)
1. **Gradient Header:** A 200px tall header.
   - Background is a hardcoded linear CSS gradient with a radial glow. 
   - A semi-transparent overlay houses a "Back" button in the top left.
   - **Centered Icon:** An animated (`framer-motion`) Lucide icon corresponding to the POI category (e.g., `TreePine` for Nature, `Landmark` for History) sits inside a blurry container.
2. **Content Container:** The main body slides up incrementally.
3. **Header Details:** 
   - A `Badge` indicating the category label (e.g., "NATURE").
   - The large POI Name (`<h1>`).
   - A short, italicized teaser summary.
4. **Media Integration:** An inline `AudioPlayer` is embedded directly below the teaser block.
5. **Main Prose:** 
   - A visual divider line.
   - A `prose-curated` container holding the story text. It defaults to generic fallback paragraphs if no real story content has been fed from the database.
6. **Attribution Block:** A muted footer container listing sources and a "Last verified" date.

---

## Observations vs. Host Atlas Standards
*Add your comments and edits below to outline how we pivot this to standard.*

- **Visual Baseline:** Gradients and standard Lucide icons feel out-of-the-box instead of relying on the rich, tokenized 361 Foundation design system.
- **Narrative Delivery:** The story page acts like a standard blog post rather than a rich *scrollytelling* experience.
- **Interactions:** The 6-step progress bar and `autoTap` simulate a user rather than naturally guiding them. The transitions lack the glassmorphism and depth typical of premium products. 
