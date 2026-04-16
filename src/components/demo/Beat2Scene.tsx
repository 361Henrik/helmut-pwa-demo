import { motion } from "framer-motion";

/** Decorative QR placeholder — 12x12 grid of squares */
function QRPlaceholder() {
  const cells = Array.from({ length: 144 }, (_, i) => {
    // pseudo-random pattern, deterministic
    const filled = ((i * 31 + 7) % 5) > 1 || i < 12 || i % 12 === 0 || i % 12 === 11 || i >= 132;
    return filled;
  });
  return (
    <div className="grid grid-cols-12 gap-[2px] p-3 bg-warm-white rounded-lg shadow-md">
      {cells.map((on, i) => (
        <div
          key={i}
          className={`aspect-square ${on ? "bg-deep-green" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

export function Beat2Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-background flex flex-col items-center justify-between px-8 py-16">
      {/* Operator wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-display text-4xl md:text-5xl font-medium text-deep-green tracking-tight">
          Scenic Waterways
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground tracking-wide">
          Rhine &amp; Moselle Collection 2026
        </p>
      </motion.div>

      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="max-w-md rounded-2xl border border-deep-green/15 bg-deep-green/5 px-7 py-6 text-center"
      >
        <p className="font-body text-lg leading-relaxed text-foreground">
          Welcome aboard. Your Scenic Waterways guide is ready — curated stories for every moment of your journey.
        </p>
      </motion.div>

      {/* QR + caption */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-[140px] h-[140px]">
          <QRPlaceholder />
        </div>
        <p className="font-body text-[13px] text-muted-foreground text-center">
          No download. No account. Opens in their browser.
        </p>
      </motion.div>
    </div>
  );
}
