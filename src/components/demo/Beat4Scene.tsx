import { SceneCallout } from "./SceneCallout";
import { CinematicImage } from "./CinematicImage";

const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center";

/**
 * Phase 2 — Awareness
 * Continues the Ken Burns motion from Phase 1 (right-drift so it feels
 * like the camera kept moving). A single ambient callout floats in.
 */
export function Beat4Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <CinematicImage
        src={RIVER_IMAGE}
        direction="right"
        duration={16}
        filter="saturate(0.95) brightness(0.98) contrast(1.05)"
        vignette={0.5}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)",
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
