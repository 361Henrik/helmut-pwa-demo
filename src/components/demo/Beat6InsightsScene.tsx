import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhoneChrome } from "./PhoneChrome";
import { useBrand } from "./BrandContext";

// Stylised Rhine-ish path for the mini map
const ROUTE_PATH =
  "M 30 60 C 60 50, 90 90, 130 80 S 200 60, 240 90 S 300 130, 330 120";

// Dwell-weighted heatmap points along the route
const HEAT = [
  { x: 70, y: 62, w: 0.55 },
  { x: 130, y: 82, w: 0.9 },  // Loreley — hottest
  { x: 180, y: 72, w: 0.4 },
  { x: 230, y: 92, w: 0.75 },
  { x: 300, y: 128, w: 0.35 },
];

// Blank Space Signal — high curiosity, no story yet
const BLANK_SPOT = { x: 200, y: 78 };

const TOP_STORIES = [
  { title: "The Loreley Legend", target: 1247 },
  { title: "Rheingau Slopes", target: 892 },
  { title: "Marksburg Fortress", target: 640 },
];

function Ticker({ target }: { target: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <span className="tabular-nums">{v.toLocaleString()}</span>;
}

export function Beat6InsightsScene() {
  const brand = useBrand();
  const accent = brand.accent;

  return (
    <PhoneChrome showStatusBar>
      <div
        className="absolute inset-0 flex flex-col px-6 pt-12 pb-6"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #23503f 0%, #10251c 60%, #0a1912 100%)",
        }}
      >
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline justify-between"
        >
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-warm-white/55">
              Operator view
            </p>
            <h1
              className="mt-1 font-display font-medium text-warm-white"
              style={{ fontSize: 22 }}
            >
              Insights<span style={{ color: accent }}>361</span>
            </h1>
          </div>
          <span
            className="font-body text-[10px] uppercase tracking-[0.2em] text-warm-white/50"
          >
            Live · Rhine
          </span>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <svg viewBox="0 0 360 170" className="w-full h-[150px]">
            <defs>
              {HEAT.map((h, i) => (
                <radialGradient key={i} id={`heat-${i}`}>
                  <stop offset="0%" stopColor={accent} stopOpacity={h.w} />
                  <stop offset="100%" stopColor={accent} stopOpacity={0} />
                </radialGradient>
              ))}
              <radialGradient id="blank">
                <stop offset="0%" stopColor="#8fd3ff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#8fd3ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Route */}
            <motion.path
              d={ROUTE_PATH}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
            />

            {/* Heat blooms */}
            {HEAT.map((h, i) => (
              <motion.circle
                key={i}
                cx={h.x}
                cy={h.y}
                r={40}
                fill={`url(#heat-${i})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.8 }}
                style={{ transformOrigin: `${h.x}px ${h.y}px` }}
              />
            ))}

            {/* POI dots */}
            {HEAT.map((h, i) => (
              <motion.circle
                key={`d-${i}`}
                cx={h.x}
                cy={h.y}
                r={2.5}
                fill={accent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
              />
            ))}

            {/* Blank Space Signal */}
            <motion.circle
              cx={BLANK_SPOT.x}
              cy={BLANK_SPOT.y}
              r={30}
              fill="url(#blank)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.85] }}
              transition={{ delay: 2.2, duration: 1.2 }}
              style={{ transformOrigin: `${BLANK_SPOT.x}px ${BLANK_SPOT.y}px` }}
            />
            <motion.circle
              cx={BLANK_SPOT.x}
              cy={BLANK_SPOT.y}
              r={5}
              fill="none"
              stroke="#8fd3ff"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ delay: 2.4, duration: 0.8 }}
            />
          </svg>
        </motion.div>

        {/* Top stories */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-5"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-warm-white/55 mb-2">
            Top stories today
          </p>
          <div className="space-y-1.5">
            {TOP_STORIES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + i * 0.12, duration: 0.4 }}
                className="flex items-baseline justify-between rounded-lg px-3 py-2"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span className="font-body text-[13px] text-warm-white/90">
                  {s.title}
                </span>
                <span
                  className="font-body text-[12px]"
                  style={{ color: accent }}
                >
                  <Ticker target={s.target} /> plays
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Blank Space callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="mt-4 rounded-xl px-4 py-3"
          style={{
            border: "1px solid rgba(143, 211, 255, 0.35)",
            backgroundColor: "rgba(143, 211, 255, 0.06)",
          }}
        >
          <p
            className="font-body text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#8fd3ff" }}
          >
            Blank Space Signal
          </p>
          <p className="mt-1 font-body text-[13px] text-warm-white/90 leading-snug">
            High curiosity between Bacharach and Kaub — no story yet. Your next
            piece of content, already asked for.
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.7 }}
          className="mt-auto pt-4 font-display italic text-center text-warm-white/70"
          style={{ fontSize: 14 }}
        >
          Curiosity leaves a trace. Insights<span style={{ color: accent }}>361</span> reads it.
        </motion.p>
      </div>
    </PhoneChrome>
  );
}
