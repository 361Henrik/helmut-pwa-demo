import { motion } from "framer-motion";

export function Beat4Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&h=900&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* LIVE VIEW label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-20 left-0 right-0 flex justify-center"
      >
        <span className="font-body text-[11px] uppercase tracking-[0.25em] text-warm-white/60">
          ● Live View
        </span>
      </motion.div>

      {/* Viewfinder frame + story card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] rounded-2xl"
        style={{
          width: "70%",
          height: "55%",
          maxWidth: 600,
          border: "1.5px solid hsl(40 46% 53%)",
        }}
      >
        {/* Corner accents */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute w-6 h-6 ${cls}`}
            style={{ borderColor: "hsl(40 46% 53%)" }}
          />
        ))}

        {/* Story card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[85%] rounded-xl bg-black/60 backdrop-blur-md px-5 py-4"
        >
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-body uppercase tracking-widest"
            style={{
              backgroundColor: "hsl(40 46% 53%)",
              color: "hsl(158 41% 21%)",
            }}
          >
            History
          </span>
          <h3 className="mt-2 font-display text-[22px] text-warm-white">Loreley Rock</h3>
          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="font-body text-[15px] text-warm-white/80">
              Rising 132m above the Rhine's tightest bend
            </p>
            <div className="flex items-end gap-[2px] h-4 flex-shrink-0">
              <span className="w-[2px] h-2 rounded-full" style={{ backgroundColor: "hsl(40 46% 53%)" }} />
              <span className="w-[2px] h-4 rounded-full" style={{ backgroundColor: "hsl(40 46% 53%)" }} />
              <span className="w-[2px] h-3 rounded-full" style={{ backgroundColor: "hsl(40 46% 53%)" }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Caption below viewfinder */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-16 left-0 right-0 text-center font-body text-base text-warm-white/70 px-8"
      >
        Point at anything you pass. Understand it instantly.
      </motion.p>
    </div>
  );
}
