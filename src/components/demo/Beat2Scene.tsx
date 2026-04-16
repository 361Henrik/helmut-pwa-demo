import { motion } from "framer-motion";

/** Decorative QR placeholder — 12x12 grid of squares */
function QRPlaceholder() {
  const cells = Array.from({ length: 144 }, (_, i) => {
    const filled = ((i * 31 + 7) % 5) > 1 || i < 12 || i % 12 === 0 || i % 12 === 11 || i >= 132;
    return filled;
  });
  return (
    <div className="grid grid-cols-12 gap-[2px] p-2.5 bg-warm-white rounded-lg shadow-md">
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
 * Beat 5 — Operator brand moment.
 * Portrait stack: wordmark → welcome card → QR. High-contrast throughout.
 */
export function Beat2Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-8 px-7 py-12">
      {/* Operator wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-[32px] font-medium text-deep-green tracking-tight leading-tight">
          Scenic Waterways
        </h1>
        <p className="mt-1.5 font-body text-[13px] text-deep-green/70 tracking-wide">
          Rhine &amp; Moselle Collection 2026
        </p>
      </motion.div>

      {/* Welcome card — high contrast deep-green on warm bg */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="w-full max-w-sm rounded-2xl bg-deep-green px-6 py-6 text-center shadow-lg"
      >
        <p className="font-body text-[17px] leading-relaxed text-warm-white">
          Welcome aboard. Your Scenic Waterways guide is ready — curated stories for every moment of your journey.
        </p>
      </motion.div>

      {/* QR + caption */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-[110px] h-[110px]">
          <QRPlaceholder />
        </div>
        <p className="font-body text-[13px] text-foreground/80 text-center max-w-[240px]">
          No download. No account. Opens in their browser.
        </p>
      </motion.div>
    </div>
  );
}
