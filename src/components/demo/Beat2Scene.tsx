import { motion } from "framer-motion";
import { PhoneChrome } from "./PhoneChrome";

/** Decorative QR placeholder — 12x12 grid of squares */
function QRPlaceholder() {
  const cells = Array.from({ length: 144 }, (_, i) => {
    const filled =
      ((i * 31 + 7) % 5) > 1 ||
      i < 12 ||
      i % 12 === 0 ||
      i % 12 === 11 ||
      i >= 132;
    return filled;
  });
  return (
    <div className="grid grid-cols-12 gap-[2px] p-2 bg-warm-white rounded-md shadow-md">
      {cells.map((on, i) => (
        <div
          key={i}
          className={`aspect-square ${on ? "bg-deep-green" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

/**
 * Phase 6 — Operator Layer
 * Calm operator brand moment. Wordmark, single welcome line, QR pill.
 * Lives inside the phone chrome — deep-green base, warm-white type.
 */
export function Beat2Scene() {
  return (
    <PhoneChrome showStatusBar>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-warm-white/60">
            Operator
          </p>
          <h1
            className="mt-2 font-display font-medium tracking-tight text-warm-white"
            style={{ fontSize: 30 }}
          >
            Scenic Waterways
          </h1>
          <span
            className="mt-3 inline-block h-px w-12"
            style={{ backgroundColor: "#C49A5C", opacity: 0.7 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 font-body text-warm-white/85 text-center max-w-[280px] leading-relaxed"
          style={{ fontSize: 15 }}
        >
          Welcome aboard. Your guide is ready — curated stories for every moment of your journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="w-[90px] h-[90px]">
            <QRPlaceholder />
          </div>
          <p className="font-body text-[11px] tracking-wide text-warm-white/65 text-center">
            No download · no account
          </p>
        </motion.div>
      </div>
    </PhoneChrome>
  );
}
