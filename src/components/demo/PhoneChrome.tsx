import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhoneChromeProps {
  children: ReactNode;
  /** Show the iOS-style status bar (default true) */
  showStatusBar?: boolean;
}

/**
 * Shared device chrome for the demo — gives every scene the same iPhone-app feel.
 * Subtle status bar at top, deep-green base behind the content.
 */
export function PhoneChrome({ children, showStatusBar = true }: PhoneChromeProps) {
  return (
    <div
      className="absolute inset-0 z-10 overflow-hidden"
      style={{ backgroundColor: "#1B3D2F" }}
    >
      {showStatusBar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pt-3 pb-1.5 pointer-events-none"
        >
          <span className="font-body text-[13px] font-semibold text-warm-white tabular-nums tracking-tight">
            9:41
          </span>
          <div className="flex items-center gap-1.5 text-warm-white">
            {/* Signal */}
            <div className="flex items-end gap-[2px]">
              <span className="w-[3px] h-[4px] bg-warm-white rounded-[1px]" />
              <span className="w-[3px] h-[6px] bg-warm-white rounded-[1px]" />
              <span className="w-[3px] h-[8px] bg-warm-white rounded-[1px]" />
              <span className="w-[3px] h-[10px] bg-warm-white rounded-[1px]" />
            </div>
            {/* Wifi */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="ml-0.5">
              <path d="M7 9.5a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
              <path
                d="M2 4.2a8 8 0 0110 0M4 6.2a5 5 0 016 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Battery */}
            <div className="ml-0.5 relative w-[22px] h-[10px] border border-warm-white/80 rounded-[2px]">
              <span className="absolute inset-[1px] bg-warm-white rounded-[1px]" style={{ width: "75%" }} />
              <span className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[1.5px] h-[4px] bg-warm-white/80 rounded-r-[1px]" />
            </div>
          </div>
        </motion.div>
      )}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
