import { useRef, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Ship,
  ChevronDown,
  Anchor,
  Navigation,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CRUISE_ITINERARY,
  MOCK_POIS,
  CATEGORY_LABELS,
  type CruiseDay,
  type POI,
  type POICategory,
} from "@/data/mock-route";

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

function CategoryChip({ category }: { category: POICategory }) {
  const Icon = CATEGORY_ICONS[category];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-caption text-muted-foreground">
      <Icon className="h-3 w-3" />
      {CATEGORY_LABELS[category]}
    </span>
  );
}

/** Simple name + icon row for the overview — no card, no navigation */
function POINameRow({ poi, isPast }: { poi: POI; isPast: boolean }) {
  const Icon = CATEGORY_ICONS[poi.category];
  return (
    <div
      className={`flex items-center gap-2.5 py-1 ${
        isPast ? "opacity-50" : ""
      }`}
    >
      <Icon className="h-4 w-4 shrink-0 text-deep-green" />
      <span
        className={`text-body-small ${
          isPast ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {poi.name}
      </span>
    </div>
  );
}

function DaySection({
  cruiseDay,
  pois,
  index,
  defaultOpen,
}: {
  cruiseDay: CruiseDay;
  pois: POI[];
  index: number;
  defaultOpen: boolean;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(defaultOpen);
  const isCurrent = cruiseDay.status === "current";
  const isPast = cruiseDay.status === "past";

  const uniqueCategories = useMemo(() => {
    const cats = new Set<POICategory>();
    pois.forEach((p) => cats.add(p.category));
    return Array.from(cats);
  }, [pois]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center">
        {isCurrent ? (
          <div className="relative flex h-7 w-7 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-deep-green animate-pulse-gentle" />
            <Ship className="relative h-4 w-4 text-deep-green-foreground" />
          </div>
        ) : (
          <div
            className={`h-3 w-3 rounded-full border-2 ${
              isPast
                ? "border-muted-foreground bg-muted-foreground"
                : "border-border bg-background"
            }`}
          />
        )}
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="w-full text-left pb-2 group"
            data-current-day={isCurrent ? true : undefined}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p
                  className={`text-caption uppercase tracking-wider ${
                    isCurrent
                      ? "text-deep-green font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {isCurrent && "● "}Day {cruiseDay.day}
                  {isCurrent && " — Today"}
                </p>
                <h3
                  className={`font-display text-lg font-medium leading-snug ${
                    isPast ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {cruiseDay.title}
                </h3>
                <p className="mt-0.5 text-body-small text-muted-foreground">
                  {cruiseDay.port}
                </p>
              </div>
              <ChevronDown
                className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Collapsed summary */}
            {!open && pois.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {uniqueCategories.slice(0, 4).map((cat) => (
                  <CategoryChip key={cat} category={cat} />
                ))}
                <span className="text-caption text-muted-foreground ml-1">
                  · {pois.length} {pois.length === 1 ? "stop" : "stops"}
                </span>
              </div>
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <p
            className={`text-body-small leading-relaxed mb-3 ${
              isPast ? "text-muted-foreground/70" : "text-muted-foreground"
            }`}
          >
            {cruiseDay.description}
          </p>

          {pois.length > 0 && (
            <div className="mb-2 space-y-0.5">
              {pois.map((poi) => (
                <POINameRow key={poi.id} poi={poi} isPast={isPast} />
              ))}
            </div>
          )}

          {/* View on Live Map link */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/map");
            }}
            className="inline-flex items-center gap-1.5 text-caption font-medium text-deep-green active:scale-[0.97]"
          >
            <Navigation className="h-3.5 w-3.5" />
            View on Live Map
          </button>
        </CollapsibleContent>
      </Collapsible>

      <div className="pb-5" />
    </motion.div>
  );
}

export function JourneyTimeline() {
  const currentDayRef = useRef<HTMLDivElement>(null);

  const poisByDay = useMemo(() => {
    const map = new Map<number, POI[]>();
    MOCK_POIS.forEach((poi) => {
      if (poi.day) {
        const existing = map.get(poi.day) || [];
        existing.push(poi);
        map.set(poi.day, existing);
      }
    });
    return map;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.querySelector("[data-current-day]");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col">
      <div className="absolute bottom-0 left-[13px] top-0 w-px bg-border" />

      {CRUISE_ITINERARY.map((cruiseDay, index) => (
        <div
          key={cruiseDay.day}
          ref={cruiseDay.status === "current" ? currentDayRef : undefined}
        >
          <DaySection
            cruiseDay={cruiseDay}
            pois={poisByDay.get(cruiseDay.day) || []}
            index={index}
            defaultOpen={cruiseDay.status === "current"}
          />
        </div>
      ))}

      <div className="relative pl-10">
        <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center">
          <Anchor className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-caption text-muted-foreground uppercase tracking-wider">
          Disembarkation
        </p>
      </div>
    </div>
  );
}
