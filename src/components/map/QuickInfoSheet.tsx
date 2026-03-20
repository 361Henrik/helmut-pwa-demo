import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronUp, Play, X } from "lucide-react";
import type { POI } from "@/data/mock-route";
import { CATEGORY_LABELS } from "@/data/mock-route";

interface QuickInfoSheetProps {
  poi: POI | null;
  onClose: () => void;
  onExpand: () => void;
}

export function QuickInfoSheet({ poi, onClose, onExpand }: QuickInfoSheetProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80) {
      onClose();
    } else if (info.offset.y < -60) {
      onExpand();
    }
  };

  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  return (
    <AnimatePresence>
      {poi && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 rounded-t-2xl bg-background shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="px-space-5 pb-space-6">
              <div className="flex gap-space-4">
                {/* Thumbnail — larger for accessibility */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={poi.thumbnailUrl}
                    alt={poi.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>

                {/* Content — larger text */}
                <div className="flex flex-1 flex-col justify-center">
                  <span className="text-body-small uppercase text-muted-foreground">
                    {CATEGORY_LABELS[poi.category]}
                  </span>
                  <h3 className="font-display text-xl font-medium leading-tight text-foreground">
                    {poi.name}
                  </h3>
                  <p className="mt-1 text-body-small text-muted-foreground line-clamp-2">
                    {poi.teaser}
                  </p>
                </div>

                {/* Audio shortcut */}
                {poi.audioUrl !== undefined && (
                  <button
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-deep-green text-deep-green-foreground"
                    aria-label="Play audio"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Expand hint */}
              <button
                onClick={onExpand}
                className="mt-space-4 flex w-full items-center justify-center gap-1 text-body-small text-muted-foreground"
              >
                <ChevronUp className="h-4 w-4" />
                <span>
                  {isTouch ? "Swipe up for full story" : "Tap for full story"}
                </span>
              </button>
            </div>

            {/* Close button — larger tap target */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
