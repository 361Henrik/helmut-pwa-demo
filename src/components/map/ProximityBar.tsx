import { useMemo } from "react";
import {
  MOCK_POIS,
  VESSEL_POSITION,
  CATEGORY_LABELS,
  type POICategory,
} from "@/data/mock-route";
import {
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

const PROXIMITY_KM = 50;

function haversineKm(
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number]
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function ProximityBar() {
  const nearby = useMemo(() => {
    return MOCK_POIS.filter(
      (poi) => haversineKm(VESSEL_POSITION, poi.coordinates) <= PROXIMITY_KM
    );
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<POICategory>();
    nearby.forEach((p) => cats.add(p.category));
    return Array.from(cats).slice(0, 3);
  }, [nearby]);

  if (nearby.length === 0) return null;

  return (
    <div className="absolute left-4 right-20 top-14 z-10 flex items-center gap-2 rounded-full bg-background/90 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
      <span className="shrink-0 text-caption font-medium text-foreground">
        {nearby.length} nearby
      </span>
      <span className="text-caption text-muted-foreground">·</span>
      <div className="flex items-center gap-1.5 overflow-hidden">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          return (
            <span
              key={cat}
              className="inline-flex items-center gap-0.5 text-caption text-muted-foreground"
            >
              <Icon className="h-3 w-3" />
              {CATEGORY_LABELS[cat]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
