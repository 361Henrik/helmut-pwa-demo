import { motion } from "framer-motion";
import { PhoneChrome } from "./PhoneChrome";
import { ARLabel } from "./ARLabel";

const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center";

/**
 * Phase 3 — Live View (AR)
 * Camera-style interface activates. Faint reticle, horizon line,
 * two anchored AR labels, "Look around" microcopy.
 */
export function Beat3Scene() {
  return (
    <PhoneChrome showStatusBar>
      {/* Camera feed */}
      <img
        src={RIVER_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle camera vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Viewfinder corners */}
      {[
        "top-12 left-4 border-t border-l rounded-tl-md",
        "top-12 right-4 border-t border-r rounded-tr-md",
        "bottom-20 left-4 border-b border-l rounded-bl-md",
        "bottom-20 right-4 border-b border-r rounded-br-md",
      ].map((cls, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`absolute w-6 h-6 ${cls}`}
          style={{ borderColor: "rgba(196,154,92,0.55)" }}
        />
      ))}

      {/* Horizon line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 right-0 h-px origin-center"
        style={{
          top: "48%",
          backgroundColor: "rgba(255,255,255,0.18)",
        }}
      />

      {/* Reticle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "38%" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="#C49A5C"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <circle cx="40" cy="40" r="2" fill="#C49A5C" fillOpacity="0.6" />
          <line x1="40" y1="14" x2="40" y2="22" stroke="#C49A5C" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="40" y1="58" x2="40" y2="66" stroke="#C49A5C" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="14" y1="40" x2="22" y2="40" stroke="#C49A5C" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="58" y1="40" x2="66" y2="40" stroke="#C49A5C" strokeOpacity="0.45" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* AR labels — anchored to landscape features */}
      <ARLabel x={28} y={56} lineLength={48} delay={1.4} label="Rheingau slopes" />
      <ARLabel x={68} y={62} lineLength={40} delay={2.0} label="St. Goarshausen" />

      {/* Microcopy */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute left-0 right-0 text-center font-display italic text-warm-white/75 drop-shadow-md"
        style={{ bottom: "9%", fontSize: 14 }}
      >
        Look around
      </motion.p>
    </PhoneChrome>
  );
}
