import { motion } from "framer-motion";

function Waveform() {
  const bars = Array.from({ length: 22 });
  return (
    <div className="flex items-end gap-[3px] h-7">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full block"
          style={{
            backgroundColor: "hsl(40 46% 63%)",
            height: 22,
            originY: 1,
          }}
          animate={{ scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 6) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Beat 3 — "Understand it"
 * The guest chose to learn more. Story screen reframed away from
 * famous landmarks toward the ordinary slope that has its own deep history.
 */
export function Beat3Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      {/* European riverside village/terraced slope */}
      <img
        src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=900&h=1600&fit=crop&crop=center"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Strong bottom scrim guarantees text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col px-7 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block self-start rounded-full px-3 py-1 text-[10px] font-body uppercase tracking-widest mb-3"
          style={{
            backgroundColor: "hsl(40 46% 53% / 0.95)",
            color: "hsl(158 41% 21%)",
          }}
        >
          Geology · History
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-[32px] font-medium text-warm-white leading-tight"
        >
          The Rheingau slope
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 font-body text-[18px] leading-relaxed text-warm-white"
        >
          Romans planted the first vines here. The slate cliffs hold the day's heat into the night, ripening Riesling that exists nowhere else.
        </motion.p>

        {/* CALLOUT_SLOT — research callout will land here next pass */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 flex items-center gap-3"
        >
          <Waveform />
          <span className="font-body text-[12px] uppercase tracking-[0.2em] text-warm-white/85">
            Tap to hear the full story
          </span>
        </motion.div>
      </div>
    </div>
  );
}
