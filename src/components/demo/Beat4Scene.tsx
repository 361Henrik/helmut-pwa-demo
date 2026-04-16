import { motion } from "framer-motion";
import { SceneCallout } from "./SceneCallout";

/**
 * Beat 2 — "What's around you" (ambient awareness)
 * Same passing-river family of imagery as Beat 1.
 * A soft callout pill appears mid-screen showing context the guest receives
 * without any tap. Demonstrates the "no friction" promise.
 */
export function Beat4Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      {/* Riverbank vineyards from water level */}
      <img
        src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&h=1600&fit=crop&crop=center"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Top eyebrow — sets the scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-16 left-0 right-0 flex justify-center px-6"
      >
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-warm-white/90 drop-shadow-md">
          ● Live · 11:42
        </span>
      </motion.div>

      {/* Ambient callout — appears unprompted */}
      <SceneCallout
        position="middle"
        delay={1.2}
        variant="ambient"
        eyebrow="Around you now"
        caption="No tap needed. Just notice."
      >
        You're passing the Rheingau terraces — wine has grown on these slopes since 1100.
      </SceneCallout>
    </div>
  );
}
