import { useEffect, useState } from "react";
import { CATEGORY_LABELS, type POICategory } from "@/data/mock-route";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as POICategory[];

/** Maps onboarding display names to POICategory keys */
const DISPLAY_TO_KEY: Record<string, POICategory> = {
  History: "history",
  "Nature & Landscapes": "nature",
  Architecture: "architecture",
  "Culture & Local Life": "culture",
  "Food & Drink": "food",
  "Engineering & Infrastructure": "engineering",
  "Legends & Stories": "legends",
  Wildlife: "wildlife",
  "Art & Music": "art",
  "Hidden Gems": "hidden-gem",
};

interface CategoryFilterBarProps {
  activeCategories: POICategory[];
  onFilterChange: (categories: POICategory[]) => void;
}

export function CategoryFilterBar({
  activeCategories,
  onFilterChange,
}: CategoryFilterBarProps) {
  const allActive =
    activeCategories.length === 0 ||
    activeCategories.length === ALL_CATEGORIES.length;

  const toggle = (cat: POICategory) => {
    if (allActive) {
      onFilterChange([cat]);
    } else if (activeCategories.includes(cat)) {
      const next = activeCategories.filter((c) => c !== cat);
      onFilterChange(next.length === 0 ? [] : next);
    } else {
      onFilterChange([...activeCategories, cat]);
    }
  };

  const chipBase =
    "shrink-0 rounded-full px-5 py-2.5 font-body text-sm font-medium shadow-sm transition-colors duration-default min-h-[44px] flex items-center";

  return (
    <div className="absolute left-0 right-0 top-5 z-10 px-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {/* All chip */}
        <button
          onClick={() => onFilterChange([])}
          className={`${chipBase} ${
            allActive
              ? "bg-deep-green text-deep-green-foreground"
              : "bg-background/95 text-foreground backdrop-blur-sm"
          }`}
        >
          All
        </button>

        {ALL_CATEGORIES.map((cat) => {
          const isActive = !allActive && activeCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className={`${chipBase} ${
                isActive
                  ? "bg-deep-green text-deep-green-foreground"
                  : "bg-background/95 text-foreground backdrop-blur-sm"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Hook to read saved categories from localStorage */
export function useSavedCategories(): POICategory[] {
  const [categories, setCategories] = useState<POICategory[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("curated-lens-categories") || "[]"
      ) as string[];
      const mapped = stored
        .map((name) => DISPLAY_TO_KEY[name])
        .filter(Boolean) as POICategory[];
      setCategories(mapped);
    } catch {
      setCategories([]);
    }
  }, []);

  return categories;
}
