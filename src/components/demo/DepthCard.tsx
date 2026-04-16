import { motion } from "framer-motion";

interface DepthCardProps {
  eyebrow?: string;
  title: string;
  body: string;
  duration?: string;
}

function MiniWaveform() {
  const bars = [0.45, 0.85, 0.6, 1];
  return (
    <div className="flex items-end gap-[3px] h-3.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full block"
          style={{
            backgroundColor: "hsl(158 41% 21%)",
            height: 14,
            transformOrigin: "bottom",
          }}
          animate={{ scaleY: [h * 0.5, h, h * 0.6, h] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Apple-Maps style bottom sheet — slides up over the AR backdrop.
 * Never takes over the full screen.
 */
export function DepthCard({
  eyebrow = "Around you",
  title,
  body,
  duration = "1m 24s",
}: DepthCardProps) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-0 left-0 right-0 z-30"
      style={{ height: "55%" }}
    >
      <div
        className="h-full rounded-t-3xl px-7 pt-3 pb-8 flex flex-col"
        style={{
          backgroundColor: "rgba(251,250,248,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Drag handle */}
        <div
          className="mx-auto mb-5 rounded-full"
          style={{
            width: 36,
            height: 4,
            backgroundColor: "hsl(158 41% 21% / 0.2)",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="font-body text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "hsl(158 41% 21% / 0.6)" }}
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-2 font-display font-medium leading-tight"
          style={{
            fontSize: 26,
            color: "hsl(158 41% 21%)",
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55 }}
          className="mt-4 font-body leading-relaxed"
          style={{
            fontSize: 16,
            color: "hsl(158 41% 21% / 0.85)",
          }}
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-auto pt-6 flex items-center gap-3"
        >
          <div
            className="flex items-center gap-2.5 rounded-full px-4 py-2.5"
            style={{
              backgroundColor: "hsl(158 41% 21% / 0.06)",
            }}
          >
            <MiniWaveform />
            <span
              className="font-body text-[13px] font-medium"
              style={{ color: "hsl(158 41% 21% / 0.8)" }}
            >
              Listen · {duration}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
