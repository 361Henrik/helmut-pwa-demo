
This is already a fully-formed implementation plan from the user. They've laid out the complete 7-beat architecture, file changes, scene components, timer logic, and verification steps. My job is to confirm the plan is ready to execute and surface any final concerns before switching to build mode.

Quick sanity check against the codebase:
- DemoOverlay.tsx timer refs exist as described — pause/resume logic preserved ✓
- DemoPage.tsx currently has the map-interaction state to remove ✓
- StoryPage.tsx + sessionStorage handoff stays intact ✓
- Beat 5 in revised order is operator brand (Beat2Scene component) — but the "23 curated stories" hint in DemoOverlay is for step 4 (map), which matches ✓
- Beat 3 (step 3) is Editorial WOW inline — no navigation to /story/:id needed during the auto-play. StoryPage stays only for direct URL access. The `handleFullStory` / sessionStorage code can be removed entirely since no beat navigates to it. The user said "kept for StoryPage compat" — but since no beat triggers it, this is dead code. I'll flag this.

One small concern: the user wrote "Keep `sessionStorage.setItem('demo-step', ...)` pattern via a simplified `handleFullStory` kept for StoryPage compat" — but no beat in the new 7-step flow navigates to StoryPage. The handoff is only meaningful if something calls it. I'll drop it unless the user wants to preserve a manual exit path.

Otherwise the plan is complete and self-consistent. Presenting concise confirmation.
