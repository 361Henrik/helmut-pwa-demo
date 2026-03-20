import { useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ship, MapPin, ChevronRight, Anchor } from "lucide-react";
import {
  CRUISE_ITINERARY,
  MOCK_POIS,
  CATEGORY_LABELS,
  type CruiseDay,
  type POI,
} from "@/data/mock-route";

function DayMarker({
  cruiseDay,
  pois,
  index,
}: {
  cruiseDay: CruiseDay;
  pois: POI[];
  index: number;
}) {
  const navigate = useNavigate();
  const isCurrent = cruiseDay.status === "current";
  const isPast = cruiseDay.status === "past";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
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

      {/* Day header */}
      <div className="pb-2">
        <p
          className={`text-caption uppercase tracking-wider ${
            isCurrent ? "text-deep-green font-medium" : "text-muted-foreground"
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

      {/* Segment description */}
      <p
        className={`text-body-small leading-relaxed ${
          isPast ? "text-muted-foreground/70" : "text-muted-foreground"
        }`}
      >
        {cruiseDay.description}
      </p>

      {/* POI cards for this day */}
      {pois.length > 0 && (
        <div className="mt-3 space-y-2">
          {pois.map((poi) => (
            <button
              key={poi.id}
              onClick={() => navigate(`/story/${poi.id}`)}
              className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors duration-default active:scale-[0.98] ${
                isPast
                  ? "bg-card/50 border-border/50"
                  : "bg-card border-border hover:border-champagne"
              }`}
            >
              <img
                src={poi.thumbnailUrl}
                alt={poi.name}
                className={`h-12 w-12 rounded object-cover ${
                  isPast ? "opacity-60" : ""
                }`}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <h4
                  className={`font-display text-sm font-medium truncate ${
                    isPast ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {poi.name}
                </h4>
                <p className="text-caption text-muted-foreground truncate">
                  {CATEGORY_LABELS[poi.category]} · {poi.teaser}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

      {/* Spacer between days */}
      <div className="pb-6" />
    </motion.div>
  );
}

export function JourneyTimeline() {
  const currentDayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group POIs by day
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

  // Auto-scroll to current day on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      currentDayRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const currentDay = CRUISE_ITINERARY.find((d) => d.status === "current");

  return (
    <div ref={scrollContainerRef} className="relative flex flex-col">
      {/* Timeline vertical line */}
      <div className="absolute bottom-0 left-[13px] top-0 w-px bg-border" />

      {CRUISE_ITINERARY.map((cruiseDay, index) => (
        <div
          key={cruiseDay.day}
          ref={cruiseDay.status === "current" ? currentDayRef : undefined}
        >
          <DayMarker
            cruiseDay={cruiseDay}
            pois={poisByDay.get(cruiseDay.day) || []}
            index={index}
          />
        </div>
      ))}

      {/* Journey end marker */}
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
