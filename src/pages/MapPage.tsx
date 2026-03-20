import { useState, useMemo } from "react";
import { CuratedMap } from "@/components/map/CuratedMap";
import {
  CategoryFilterBar,
  useSavedCategories,
} from "@/components/map/CategoryFilterBar";
import { ProximityBar } from "@/components/map/ProximityBar";
import type { POICategory } from "@/data/mock-route";
import { CRUISE_ITINERARY } from "@/data/mock-route";

export default function MapPage() {
  const savedCategories = useSavedCategories();
  const [activeFilters, setActiveFilters] = useState<POICategory[]>([]);

  const currentDay = useMemo(
    () => CRUISE_ITINERARY.find((d) => d.status === "current"),
    []
  );

  return (
    <div className="absolute inset-0 bottom-[120px]">
      {/* Live status chip */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-2 shadow-md backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-deep-green opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-deep-green" />
        </span>
        <span className="font-body text-sm font-medium text-foreground">
          Live · Day {currentDay?.day ?? "—"} · {currentDay?.port?.split("·")[0]?.trim() ?? ""}
        </span>
      </div>

      <ProximityBar />
      <CuratedMap activeCategories={activeFilters} />
      <CategoryFilterBar
        activeCategories={activeFilters}
        onFilterChange={setActiveFilters}
      />
    </div>
  );
}
