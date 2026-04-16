import { motion } from "framer-motion";

const RIVER_IMAGE =
  "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center";

/**
 * Phase 1 — Silence
 * Full-bleed riverscape. No chrome. Two lines fade in.
 */
export function Beat1Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <motion.img
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "linear" }}
        src={RIVER_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
          className="font-display text-warm-white leading-snug drop-shadow-lg"
          style={{ fontSize: 26, fontWeight: 400 }}
        >
          Most of what you pass…
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1.1, ease: "easeOut" }}
          className="mt-3 font-display text-warm-white leading-snug drop-shadow-lg"
          style={{ fontSize: 30, fontWeight: 500, fontStyle: "italic" }}
        >
          goes unexplained.
        </motion.p>
      </div>
    </div>
  );
}
