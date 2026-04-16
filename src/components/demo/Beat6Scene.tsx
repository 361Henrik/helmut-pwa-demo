import { motion } from "framer-motion";

const CARDS = [
  {
    header: "Top story this sailing",
    body: "The Loreley — avg. 4m 12s dwell time. 67% listened to audio.",
  },
  {
    header: "What guests explored most",
    body: "History & legends (44%) · Geology (28%) · Local life (18%)",
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
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 py-12 overflow-y-auto"
      style={{ backgroundColor: "#1B3D2F" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-body text-[11px] uppercase tracking-[0.25em] mb-8"
        style={{ color: "hsl(40 46% 63%)" }}
      >
        Insights361
      </motion.span>

      <div className="w-full max-w-md space-y-4">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 1.5, duration: 0.6 }}
            className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm px-6 py-5"
          >
            <p className="font-body text-[11px] uppercase tracking-widest text-white/50">
              {card.header}
            </p>
            <p className="mt-2 font-display text-xl text-warm-white font-medium leading-snug">
              {card.body}
            </p>
            {card.accent && (
              <p
                className="mt-2 font-display italic text-lg"
                style={{ color: "hsl(40 46% 63%)" }}
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
        transition={{ delay: 6.5, duration: 0.8 }}
        className="mt-10 font-display italic text-lg text-warm-white/85 text-center max-w-md"
      >
        Curiosity leaves a trace. Insights361 reads it.
      </motion.p>
    </div>
  );
}
