import { motion } from "framer-motion";

function Waveform() {
  const bars = Array.from({ length: 20 });
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full block"
          style={{
            backgroundColor: "hsl(40 46% 53% / 0.75)",
            height: 24,
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

export function Beat3Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=1600&h=900&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-20 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block self-start rounded-full px-3 py-1 text-[11px] font-body uppercase tracking-widest mb-4"
          style={{
            backgroundColor: "hsl(40 46% 53% / 0.9)",
            color: "hsl(158 41% 21%)",
          }}
        >
          History
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-4xl md:text-5xl font-medium text-warm-white"
        >
          The Loreley
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-5 font-body text-lg leading-relaxed text-warm-white/90 max-w-xl"
        >
          For centuries, sailors feared this bend. The rock rises 132 metres above the
          tightest point on the Rhine — where the current runs fastest and the cliffs
          close in on both sides.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6"
        >
          <Waveform />
        </motion.div>
      </div>
    </div>
  );
}
