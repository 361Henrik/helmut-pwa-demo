import { motion } from "framer-motion";
import { MOCK_POIS } from "@/data/mock-route";
import { CuratedMap } from "@/components/map/CuratedMap";
import { PhoneChrome } from "./PhoneChrome";

const DEMO_POI_IDS = ["poi-1", "poi-20", "poi-4"];
const DEMO_POIS = MOCK_POIS.filter((p) => DEMO_POI_IDS.includes(p.id));

/**
 * Phase 5 — Map Context
 * Desaturated dark map (CSS filter), thin route, minimal pins.
 * A single glass overlay near the top frames the moment.
 */
export function Beat5MapScene() {
  return (
    <PhoneChrome showStatusBar>
      {/* Desaturated map underlay */}
      <div
        className="absolute inset-0"
        style={{
          filter: "saturate(0.35) brightness(0.72) contrast(1.05)",
        }}
      >
        <CuratedMap pois={DEMO_POIS} hideControls demoMode />
      </div>

      {/* Subtle dark wash to unify with deep-green app base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,61,47,0.35) 0%, rgba(27,61,47,0.05) 30%, rgba(27,61,47,0.35) 100%)",
        }}
      />

      {/* Glass overlay near top */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="absolute top-12 left-0 right-0 z-30 flex justify-center px-6 pointer-events-none"
      >
        <div
          className="rounded-2xl px-5 py-3 backdrop-blur-xl border max-w-[300px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderColor: "rgba(255,255,255,0.16)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <p className="font-body text-warm-white text-center leading-snug" style={{ fontSize: 14 }}>
            Context follows you — not just the highlights.
          </p>
        </div>
      </motion.div>
    </PhoneChrome>
  );
}
