import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface Beat7SceneProps {
  onRestart: () => void;
}

const LINES = ["Your brand.", "Your stories.", "Your guests."];

export function Beat7Scene({ onRestart }: Beat7SceneProps) {
  const handleCTA = () => {
    if (window.parent !== window) {
      window.parent.location.href = "#contact";
    } else {
      window.location.href = "#contact";
    }
  };

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 py-12"
      style={{ backgroundColor: "#1B3D2F" }}
    >
      {/* Operator logo */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-display text-base text-warm-white/90">Scenic Waterways</span>
        <span
          className="mt-1 h-[2px] w-16"
          style={{ backgroundColor: "hsl(40 46% 53%)" }}
        />
      </motion.div>

      {/* Headlines */}
      <div className="text-center max-w-md">
        {LINES.map((line, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.4, duration: 0.7 }}
            className="font-display text-5xl md:text-6xl font-medium leading-tight text-warm-white"
          >
            {line}
          </motion.h2>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-8 font-body text-base text-warm-white/70"
        >
          One platform. Your narrative, entirely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <button
            onClick={handleCTA}
            className="rounded-full px-8 py-4 text-lg font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "hsl(40 46% 53%)",
              color: "hsl(158 41% 21%)",
            }}
          >
            Request a conversation →
          </button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            onClick={onRestart}
            className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-warm-white/70 hover:text-warm-white hover:border-white/50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="font-body text-sm">Replay</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
