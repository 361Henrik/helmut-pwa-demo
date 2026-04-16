import { motion } from "framer-motion";

const LINES = [
  { text: "The river passes.", emphasis: false },
  { text: "The shoreline changes.", emphasis: false },
  { text: "Most of it goes unexplained.", emphasis: false },
  { text: "That's where we begin.", emphasis: true },
];

export function Beat1Scene() {
  return (
    <div className="absolute inset-0 z-10 bg-black overflow-hidden">
      {/* River from a passing ship — Rhine valley */}
      <img
        src="https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&h=1600&fit=crop&crop=center"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-7">
        <div className="space-y-4">
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: line.emphasis ? 1 : 0.9, y: 0 }}
              transition={{ delay: 0.5 + i * 0.9, duration: 0.9, ease: "easeOut" }}
              className={`font-display leading-snug text-warm-white drop-shadow-lg ${
                line.emphasis
                  ? "text-[28px] font-medium"
                  : "text-[24px] font-normal"
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
