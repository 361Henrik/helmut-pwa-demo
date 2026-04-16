import { motion } from "framer-motion";

const LINES = [
  { text: "She spent three hours after the trip", emphasis: false },
  { text: "matching her photos to paper kilometer markers.", emphasis: false },
  { text: "The information was needed in real time.", emphasis: true },
  { text: "It arrived too late.", emphasis: true },
];

export function Beat1Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=900&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-24">
        <div className="max-w-2xl space-y-3">
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: line.emphasis ? 1 : 0.85, y: 0 }}
              transition={{ delay: 0.4 + i * 0.8, duration: 0.9, ease: "easeOut" }}
              className={`font-display leading-snug text-warm-white ${
                line.emphasis
                  ? "text-3xl md:text-4xl font-medium"
                  : "text-2xl md:text-3xl font-normal"
              }`}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
