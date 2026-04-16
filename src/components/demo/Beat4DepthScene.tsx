import { motion } from "framer-motion";
import { PhoneChrome } from "./PhoneChrome";
import { ARLabel } from "./ARLabel";
import { DepthCard } from "./DepthCard";

const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center";

/**
 * Phase 4 — Depth
 * One AR label was tapped. A bottom sheet slides up with the editorial story.
 * The landscape stays visible above; this is depth without takeover.
 */
export function Beat4DepthScene() {
  return (
    <PhoneChrome showStatusBar>
      <img
        src={RIVER_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Active AR label — slightly highlighted to show "tapped" state */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <ARLabel
          x={28}
          y={28}
          lineLength={36}
          delay={0}
          label="Rheingau slopes"
        />
      </motion.div>

      {/* Bottom sheet card */}
      <DepthCard
        eyebrow="Around you"
        title="The Rheingau slope"
        body="Romans planted the first vines here. The slate cliffs hold the day's heat into the night, ripening Riesling that exists nowhere else."
        duration="1m 24s"
      />
    </PhoneChrome>
  );
}
