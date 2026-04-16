import { motion } from "framer-motion";

interface ARLabelProps {
  /** Horizontal position as % of viewport width */
  x: number;
  /** Vertical position of the pill as % of viewport height */
  y: number;
  /** Length of the connector line in px */
  lineLength?: number;
  /** Animation delay in seconds */
  delay?: number;
  label: string;
  /** Side the connector line drops toward */
  anchor?: "below" | "above";
}

/**
 * Anchored AR label — glass pill with a thin bronze connector line
 * pointing to the feature in the landscape it describes.
 */
export function ARLabel({
  x,
  y,
  lineLength = 56,
  delay = 0,
  label,
  anchor = "below",
}: ARLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: anchor === "below" ? -8 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="absolute z-20 -translate-x-1/2 flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <div
        className="rounded-full px-3 py-1.5 backdrop-blur-md border"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          borderColor: "rgba(255,255,255,0.18)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        }}
      >
        <span className="font-body text-[11px] font-medium tracking-wide text-warm-white">
          {label}
        </span>
      </div>
      {anchor === "below" && (
        <motion.span
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeOut" }}
          className="block w-px origin-top mt-1"
          style={{
            height: lineLength,
            backgroundColor: "#C49A5C",
            opacity: 0.55,
          }}
        />
      )}
    </motion.div>
  );
}
