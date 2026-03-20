import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Ship,
  Navigation,
  ArrowDown,
  Landmark,
  TreePine,
  Building2,
  Theater,
  Wine,
  Cog,
  Star,
  Bird,
  Paintbrush,
  Gem,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CRUISE_ITINERARY, MOCK_POIS, CATEGORY_LABELS, type POICategory } from "@/data/mock-route";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { useMemo, useState, useEffect, useRef } from "react";

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

export default function JourneyPage() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showJumpBtn, setShowJumpBtn] = useState(false);

  const currentDay = useMemo(
    () => CRUISE_ITINERARY.find((d) => d.status === "current"),
    []
  );

  const progress = useMemo(() => {
    if (!currentDay) return 0;
    return Math.round(((currentDay.day - 0.5) / CRUISE_ITINERARY.length) * 100);
  }, [currentDay]);

  // Category mix with counts
  const categoryMix = useMemo(() => {
    const counts = new Map<POICategory, number>();
    MOCK_POIS.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      setShowJumpBtn(container.scrollTop > 400);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpToNow = () => {
    const el = document.querySelector("[data-current-day]");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-green">
            <span className="font-display text-xs font-semibold text-deep-green-foreground">
              CL
            </span>
          </div>
          <span className="font-display text-xs font-medium uppercase tracking-widest text-muted-foreground">
            The Curated Lens
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-space-4"
        >
          <p className="text-caption uppercase tracking-wider text-muted-foreground">
            Rhine Cruise · 7 Nights
          </p>
          <h1 className="mt-1 font-display text-2xl font-medium text-foreground">
            Your Voyage
          </h1>
          <p className="mt-1.5 text-body-small leading-relaxed text-muted-foreground">
            Basel to Amsterdam along the Rhine — castles, cathedrals, vineyards,
            and hidden gems.
          </p>
          <p className="mt-1 text-caption text-muted-foreground">
            {MOCK_POIS.length} discoveries across {CRUISE_ITINERARY.length} days
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="mt-space-4"
        >
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span>Basel</span>
            <span>Amsterdam</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-card">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-deep-green"
            />
          </div>
          {currentDay && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <Ship className="h-3.5 w-3.5 text-deep-green" />
              <span className="text-caption text-muted-foreground">
                Day {currentDay.day} · {currentDay.port}
              </span>
            </div>
          )}
        </motion.div>

        {/* Category mix */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-space-4 flex flex-wrap gap-2"
        >
          {categoryMix.map(([cat, count]) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-caption text-muted-foreground"
              >
                <Icon className="h-3 w-3" />
                {CATEGORY_LABELS[cat]}
                <span className="ml-0.5 font-medium text-foreground">{count}</span>
              </span>
            );
          })}
        </motion.div>

        {/* Go Live CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="mt-space-4 flex gap-3"
        >
          <button
            onClick={() => navigate("/map")}
            className="flex items-center gap-2 rounded-md bg-deep-green px-5 py-2.5 text-body-small font-medium text-deep-green-foreground transition-colors active:scale-[0.98]"
          >
            <Navigation className="h-4 w-4" />
            Go Live
          </button>
        </motion.div>

        <div className="my-space-5 h-px bg-border" />
      </div>

      {/* Timeline */}
      <div className="flex-1 px-6 pb-8">
        <JourneyTimeline />
      </div>

      {/* Jump to Now */}
      {showJumpBtn && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={jumpToNow}
          className="fixed bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-deep-green px-4 py-2.5 text-body-small font-medium text-deep-green-foreground shadow-lg active:scale-[0.97]"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          Jump to Today
        </motion.button>
      )}
    </div>
  );
}
