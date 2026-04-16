import { motion } from "framer-motion";

const CARDS = [
  {
    header: "Top story this sailing",
    body: "The Rheingau slope — avg. 4m 12s. 67% played audio.",
  },
  {
    header: "What guests explored most",
    body: "History (44%) · Geology (28%) · Local life (18%)",
  },
  {
    header: "Where nothing was there yet",
    body: "3 guests reached for context at km 512. No story exists there yet.",
    accent: "That's your next content brief.",
  },
];

export function Beat6Scene() {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto"
      style={{ backgroundColor: "#1B3D2F" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-body text-[11px] uppercase tracking-[0.3em] mb-6"
        style={{ color: "hsl(40 46% 68%)" }}
      >
        Insights361
      </motion.span>

      <div className="w-full max-w-sm space-y-3">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 1.4, duration: 0.6 }}
            className="rounded-xl border border-warm-white/15 bg-warm-white/10 backdrop-blur-sm px-5 py-4"
          >
            <p className="font-body text-[10px] uppercase tracking-widest text-warm-white/65">
              {card.header}
            </p>
            <p className="mt-1.5 font-display text-[18px] text-warm-white font-medium leading-snug">
              {card.body}
            </p>
            {card.accent && (
              <p
                className="mt-1.5 font-display italic text-[16px]"
                style={{ color: "hsl(40 46% 68%)" }}
              >
                {card.accent}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 0.8 }}
        className="mt-8 font-display italic text-[16px] text-warm-white/90 text-center max-w-sm"
      >
        Curiosity leaves a trace. Insights361 reads it.
      </motion.p>
    </div>
  );
}
