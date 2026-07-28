import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { PhoneChrome } from "./PhoneChrome";
import { useBrand } from "./BrandContext";

interface Beat7SceneProps {
  onRestart: () => void;
}

const LINES = ["Your brand.", "Your stories.", "Your guests."];

export function Beat7Scene({ onRestart }: Beat7SceneProps) {
  const brand = useBrand();
  const handleCTA = () => {
    const target = brand.cta;
    const isExternal = /^https?:\/\//i.test(target);
    if (isExternal && window.parent !== window) {
      window.parent.location.href = target;
    } else if (window.parent !== window) {
      window.parent.location.href = target;
    } else {
      window.location.href = target;
    }
  };

  return (
    <PhoneChrome showStatusBar>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.3em] text-warm-white/60">
            {brand.name}
          </span>
          <span
            className="mt-2 h-px w-10"
            style={{ backgroundColor: brand.accent, opacity: 0.7 }}
          />
        </motion.div>

        <div className="text-center max-w-sm">
          {LINES.map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.4, duration: 0.7 }}
              className="font-display font-medium text-warm-white"
              style={{ fontSize: 32, lineHeight: 1.18 }}
            >
              {line}
            </motion.h2>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-6 font-body text-warm-white/75"
            style={{ fontSize: 14 }}
          >
            One platform. Your narrative, entirely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="mt-9 flex flex-col items-center gap-4"
          >
            <button
              onClick={handleCTA}
              className="rounded-full px-7 py-3.5 font-body font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: brand.accent,
                color: "#1B3D2F",
                fontSize: 15,
              }}
            >
              {brand.ctaLabel} →
            </button>

            <button
              onClick={onRestart}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-warm-white/70 hover:text-warm-white transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="font-body text-[13px]">Replay</span>
            </button>
          </motion.div>
        </div>
      </div>
    </PhoneChrome>
  );
}
