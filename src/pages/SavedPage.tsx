import { Bookmark, MapPin, Trash2, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSavedStories } from "@/hooks/useSavedStories";
import { MOCK_POIS, CATEGORY_LABELS } from "@/data/mock-route";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { savedPoiIds, isLoading, toggleSave } = useSavedStories();

  // Not signed in
  if (!authLoading && !user) {
    return (
      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <h1 className="font-display text-2xl font-medium text-foreground">
          Saved Stories
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-1 flex-col items-center justify-center text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card">
            <LogIn className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-5 font-display text-xl font-medium text-foreground">
            Sign in to save stories
          </h2>
          <p className="mt-3 max-w-xs text-body text-muted-foreground">
            Create an account to bookmark stories and build your personal
            journey timeline.
          </p>
          <Button className="mt-5" onClick={() => navigate("/auth")}>
            <LogIn className="h-5 w-5" />
            Sign In
          </Button>
        </motion.div>
      </div>
    );
  }

  // Loading
  if (isLoading || authLoading) {
    return (
      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <h1 className="font-display text-2xl font-medium text-foreground">
          Saved Stories
        </h1>
        <div className="mt-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 rounded-xl bg-card p-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Resolve POIs from saved IDs
  const savedItems = savedPoiIds
    .map((s) => {
      const poi = MOCK_POIS.find((p) => p.id === s.poi_id);
      return poi ? { ...poi, savedAt: s.created_at } : null;
    })
    .filter(Boolean) as (typeof MOCK_POIS[number] & { savedAt: string })[];

  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      <h1 className="font-display text-2xl font-medium text-foreground">
        Saved Stories
      </h1>
      <p className="mt-1 text-body-small text-muted-foreground">
        {savedItems.length} {savedItems.length === 1 ? "story" : "stories"} in
        your journey
      </p>

      {savedItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 flex flex-1 flex-col items-center justify-center text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card">
            <Bookmark className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-5 font-display text-xl font-medium text-foreground">
            No saved stories yet
          </h2>
          <p className="mt-3 max-w-xs text-body text-muted-foreground">
            When you discover a story that moves you, tap the bookmark icon to
            save it here.
          </p>
          <Button className="mt-5" onClick={() => navigate("/map")}>
            <MapPin className="h-5 w-5" />
            Explore the Map
          </Button>
        </motion.div>
      ) : (
        <div className="mt-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {savedItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => navigate(`/story/${item.id}`)}
                className="flex w-full gap-4 rounded-xl bg-card p-4 text-left transition-shadow hover:shadow-md active:scale-[0.98]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                layout
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col justify-center overflow-hidden">
                  <span className="text-caption uppercase text-muted-foreground">
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  <h3 className="font-display text-base font-medium leading-tight text-foreground truncate">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 text-caption text-muted-foreground">
                    Saved {new Date(item.savedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave.mutate(item.id);
                  }}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-destructive transition-colors"
                  aria-label="Remove from saved"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
