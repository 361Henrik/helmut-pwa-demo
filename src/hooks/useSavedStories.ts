import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useSavedStories() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: savedPoiIds = [], isLoading } = useQuery({
    queryKey: ["saved_stories", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("saved_stories")
        .select("poi_id, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleSave = useMutation({
    mutationFn: async (poiId: string) => {
      if (!user) throw new Error("Not authenticated");
      const isSaved = savedPoiIds.some((s) => s.poi_id === poiId);
      if (isSaved) {
        const { error } = await supabase
          .from("saved_stories")
          .delete()
          .eq("user_id", user.id)
          .eq("poi_id", poiId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("saved_stories")
          .insert({ user_id: user.id, poi_id: poiId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved_stories", user?.id] });
    },
  });

  const isSaved = (poiId: string) => savedPoiIds.some((s) => s.poi_id === poiId);

  return { savedPoiIds, isLoading, toggleSave, isSaved };
}
