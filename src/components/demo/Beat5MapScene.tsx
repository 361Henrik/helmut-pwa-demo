import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhoneChrome } from "./PhoneChrome";

/**
 * Phase 5 — Map Context
 * Fully hand-drawn cinematic route: an SVG river path draws itself
 * across the phone frame, POIs drop in sequentially with a soft bloom,
 * and a live counter climbs to 23 curated stories.
 */
export function Beat5MapScene() {
  const pois = [
    { x: 20, y: 26, label: "Rüdesheim" },
    { x: 34, y: 40, label: "Rheingau" },
    { x: 52, y: 55, label: "Loreley" },
    { x: 68, y: 68, label: "St. Goar" },
    { x: 82, y: 82, label: "Koblenz" },
  ];
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 23));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <PhoneChrome showStatusBar>
      {/* Deep base with subtle terrain texture */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, #24503C 0%, #1B3D2F 45%, #12291F 100%)",
        }}
      />
      {/* Terrain grain — very subtle noise via SVG */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />
      {/* Gentle contour rings */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.14]" viewBox="0 0 100 178" preserveAspectRatio="none">
        {[15, 30, 45, 60, 75].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="89"
            r={r}
            fill="none"
            stroke="#C49A5C"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      {/* Animated route */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 178"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {/* Faint route shadow */}
        <path
          d="M 12 18 Q 28 30, 34 42 T 52 60 T 68 78 T 88 100"
          fill="none"
          stroke="#C49A5C"
          strokeOpacity="0.15"
          strokeWidth="1.2"
        />
        {/* The drawing line */}
        <motion.path
          d="M 12 18 Q 28 30, 34 42 T 52 60 T 68 78 T 88 100"
          fill="none"
          stroke="#C49A5C"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 2px rgba(196,154,92,0.7))" }}
        />
      </svg>

      {/* POI drops */}
      {pois.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, scale: 0.3, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.9 + i * 0.32,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div className="relative flex items-center gap-2">
            {/* Bloom pulse */}
            <motion.span
              className="absolute -inset-2 rounded-full"
              style={{ backgroundColor: "rgba(196,154,92,0.35)" }}
              animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: 1 + i * 0.32,
                ease: "easeOut",
              }}
            />
            <span
              className="relative block w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: "#C49A5C",
                boxShadow: "0 0 12px rgba(196,154,92,0.9)",
              }}
            />
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.32, duration: 0.4 }}
              className="font-body text-[10px] uppercase tracking-[0.15em] text-warm-white/85"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
            >
              {p.label}
            </motion.span>
          </div>
        </motion.div>
      ))}

      {/* Glass overlay near top */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="absolute top-12 left-0 right-0 z-40 flex justify-center px-6 pointer-events-none"
      >
        <div
          className="rounded-2xl px-5 py-3 backdrop-blur-xl border max-w-[300px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderColor: "rgba(255,255,255,0.16)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <p
            className="font-body text-warm-white text-center leading-snug"
            style={{ fontSize: 14 }}
          >
            Context follows you — not just the highlights.
          </p>
        </div>
      </motion.div>

      {/* Live counter chip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
      >
        <div
          className="flex items-baseline gap-2 rounded-full px-5 py-2.5 backdrop-blur-xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.10)",
            borderColor: "rgba(196,154,92,0.35)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span
            className="font-display tabular-nums"
            style={{ fontSize: 22, color: "#C49A5C", fontWeight: 500 }}
          >
            {count}
          </span>
          <span className="font-body text-warm-white/80 text-[12px] uppercase tracking-[0.18em]">
            curated stories
          </span>
        </div>
      </motion.div>
    </PhoneChrome>
  );
}
