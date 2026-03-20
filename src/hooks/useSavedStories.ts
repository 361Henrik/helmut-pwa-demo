import { useState, useCallback } from "react";

/** Demo-mode saved stories — uses in-memory state (no Supabase) */
export function useSavedStories() {
  const [savedPoiIds, setSavedPoiIds] = useState<{ poi_id: string; created_at: string }[]>([]);

  const toggleSave = {
    mutate: (poiId: string) => {
      setSavedPoiIds((prev) => {
        const exists = prev.some((s) => s.poi_id === poiId);
        if (exists) return prev.filter((s) => s.poi_id !== poiId);
        return [...prev, { poi_id: poiId, created_at: new Date().toISOString() }];
      });
    },
    isPending: false,
  };

  const isSaved = useCallback(
    (poiId: string) => savedPoiIds.some((s) => s.poi_id === poiId),
    [savedPoiIds]
  );

  return { savedPoiIds, isLoading: false, toggleSave, isSaved };
}
