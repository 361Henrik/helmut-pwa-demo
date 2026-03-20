import { Bookmark, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const navigate = useNavigate();

  // Phase 5 will wire real saved data; for now show empty state
  const savedItems: never[] = [];

  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      <h1 className="font-display text-2xl font-medium text-foreground">
        Saved Stories
      </h1>
      <p className="mt-1 text-body-small text-muted-foreground">
        Your personal journey timeline
      </p>

      {savedItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-space-8 flex flex-1 flex-col items-center justify-center text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card">
            <Bookmark className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-space-5 font-display text-xl font-medium text-foreground">
            No saved stories yet
          </h2>
          <p className="mt-space-3 max-w-xs text-body text-muted-foreground">
            When you discover a story that moves you, tap the bookmark icon to
            save it here. Your journey will build a beautiful timeline of
            moments.
          </p>
          <Button
            className="mt-space-5"
            onClick={() => navigate("/map")}
          >
            <MapPin className="h-5 w-5" />
            Explore the Map
          </Button>
        </motion.div>
      ) : (
        /* Timeline skeleton for future saved items */
        <div className="mt-space-5 space-y-4">
          {/* This will be populated in Phase 5 */}
        </div>
      )}
    </div>
  );
}
