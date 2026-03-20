import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronUp, Play, X, Landmark, TreePine, Building2, Theater, Wine, Cog, Star, Bird, Paintbrush, Gem, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { POI, POICategory } from "@/data/mock-route";
import { CATEGORY_LABELS } from "@/data/mock-route";

const CATEGORY_ICONS: Record<POICategory, LucideIcon> = {
  history: Landmark,
  nature: TreePine,
  architecture: Building2,
  culture: Theater,
  food: Wine,
  engineering: Cog,
  legends: Star,
  wildlife: Bird,
  art: Paintbrush,
  "hidden-gem": Gem,
};

interface QuickInfoSheetProps {
  poi: POI | null;
  onClose: () => void;
  onFullStory: () => void;
}

export function QuickInfoSheet({ poi, onClose, onFullStory }: QuickInfoSheetProps) {
  const [expanded, setExpanded] = useState(false);

  // Reset expanded state when POI changes
  useEffect(() => {
    setExpanded(false);
  }, [poi?.id]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80) {
      if (expanded) {
        setExpanded(false);
      } else {
        onClose();
      }
    } else if (info.offset.y < -60) {
      if (!expanded) {
        setExpanded(true);
      }
    }
  };

  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  const Icon = poi ? CATEGORY_ICONS[poi.category] : null;

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
              {/* Header row — always visible */}
              <div className="flex gap-space-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-deep-green/10">
                  {Icon && <Icon className="h-6 w-6 text-deep-green" />}
                </div>

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
              </div>

              {/* Expanded content — Layer 3.5 */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 24, stiffness: 260 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-space-4 space-y-space-4">
                      {/* Story excerpt */}
                      <p className="text-body text-foreground/90 leading-relaxed">
                        {poi.storyExcerpt}
                      </p>

                      {/* Audio trigger — only in expanded state */}
                      {poi.audioUrl !== undefined && (
                        <button className="flex w-full items-center gap-3 rounded-xl bg-deep-green/10 px-4 py-3 transition-colors duration-200 active:scale-[0.98]">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-green text-deep-green-foreground">
                            <Play className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-body-small font-medium text-foreground">Listen to this story</span>
                            <span className="block text-body-small text-muted-foreground">~2 min audio</span>
                          </div>
                        </button>
                      )}

                      {/* Full story CTA */}
                      <button
                        onClick={onFullStory}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-deep-green py-3.5 text-deep-green-foreground transition-colors duration-200 active:scale-[0.98]"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="font-body text-sm font-medium">Tap for full story</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed CTA — "Tap for more" */}
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="mt-space-4 flex w-full items-center justify-center gap-1 text-body-small text-muted-foreground"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span>
                    {isTouch ? "Swipe up for more" : "Tap for more"}
                  </span>
                </button>
              )}
            </div>

            {/* Close button */}
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
