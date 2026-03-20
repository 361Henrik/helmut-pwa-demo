import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import { MOCK_POIS, CATEGORY_LABELS } from "@/data/mock-route";
import { AudioPlayer } from "@/components/story/AudioPlayer";
import { Badge } from "@/components/ui/badge";

export default function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const poi = useMemo(() => MOCK_POIS.find((p) => p.id === id), [id]);

  if (!poi) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background px-6">
        <p className="text-body text-muted-foreground">Story not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleToggleSave = () => {
    setSaved((s) => !s);
    // Phase 5: persist to Supabase
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Image */}
      <div className="relative h-72 w-full flex-shrink-0 overflow-hidden">
        <motion.img
          src={poi.thumbnailUrl}
          alt={poi.name}
          className="h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 pt-safe-top">
          <button
            onClick={() => navigate(-1)}
            className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleToggleSave}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
              aria-label={saved ? "Remove from saved" : "Save to journey"}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5 text-foreground" />
              )}
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="-mt-6 flex flex-1 flex-col rounded-t-2xl bg-background px-6 pb-8 pt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Category badge */}
        <Badge
          variant="secondary"
          className="w-fit text-caption uppercase tracking-wider"
        >
          {CATEGORY_LABELS[poi.category]}
        </Badge>

        {/* Title */}
        <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-foreground">
          {poi.name}
        </h1>

        {/* Teaser */}
        <p className="mt-2 text-body-large text-muted-foreground italic">
          {poi.teaser}
        </p>

        {/* Audio Player */}
        {poi.audioUrl !== undefined && (
          <div className="mt-5">
            <AudioPlayer src={poi.audioUrl} title={poi.name} />
          </div>
        )}

        {/* Mock audio player for POIs without audio */}
        {poi.audioUrl === undefined && (
          <div className="mt-5">
            <AudioPlayer title={poi.name} />
          </div>
        )}

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Narrative text */}
        <article className="prose-curated">
          <p className="text-body-large leading-relaxed text-foreground">
            {poi.storyExcerpt}
          </p>

          {/* Extended narrative — mock content for richness */}
          <p className="mt-5 text-body leading-relaxed text-foreground/90">
            As the vessel glides past, the landscape transforms into a living
            canvas of history and natural beauty. Each bend in the river reveals
            new perspectives on centuries of human endeavour intertwined with the
            timeless flow of the Rhine.
          </p>
          <p className="mt-5 text-body leading-relaxed text-foreground/90">
            Local guides speak of traditions passed down through generations —
            stories that no guidebook can capture, moments that exist only in the
            memory of those who have walked these paths and sailed these waters.
          </p>
          <p className="mt-5 text-body leading-relaxed text-foreground/90">
            The interplay of light on water, the distant sound of church bells
            echoing across the valley, the scent of wildflowers carried on the
            breeze — these sensory impressions compose the true narrative of the
            Rhine, one that unfolds not in pages but in the quiet spaces between
            words.
          </p>
        </article>

        {/* Save CTA at bottom */}
        <div className="mt-8 flex items-center justify-between rounded-xl bg-card p-4">
          <div>
            <p className="text-body font-medium text-foreground">
              Save to Journey
            </p>
            <p className="text-body-small text-muted-foreground">
              Add this story to your personal timeline
            </p>
          </div>
          <button
            onClick={handleToggleSave}
            className={`flex h-12 items-center gap-2 rounded-lg px-5 font-body text-sm font-medium transition-colors ${
              saved
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground"
            }`}
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Save
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
