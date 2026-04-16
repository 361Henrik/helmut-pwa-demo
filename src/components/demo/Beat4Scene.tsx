import { SceneCallout } from "./SceneCallout";

const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center";

/**
 * Phase 2 — Awareness
 * Same image as Phase 1 (continuity). A single ambient callout floats in.
 * No interaction; no chrome.
 */
export function Beat4Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <img
        src={RIVER_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <SceneCallout
        position="middle"
        delay={0.9}
        variant="ambient"
        eyebrow="Around you now"
        caption="No tap needed. Just notice."
      >
        Vineyards on your right — cultivated since the 12th century.
      </SceneCallout>
    </div>
  );
}
