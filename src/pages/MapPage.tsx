import { useState } from "react";
import { CuratedMap } from "@/components/map/CuratedMap";
import {
  CategoryFilterBar,
  useSavedCategories,
} from "@/components/map/CategoryFilterBar";
import type { POICategory } from "@/data/mock-route";

export default function MapPage() {
  const savedCategories = useSavedCategories();
  const [activeFilters, setActiveFilters] = useState<POICategory[]>([]);

  return (
    <div className="absolute inset-0 bottom-[120px]">
      <CuratedMap activeCategories={activeFilters} />
      <CategoryFilterBar
        activeCategories={activeFilters}
        onFilterChange={setActiveFilters}
      />
    </div>
  );
}
