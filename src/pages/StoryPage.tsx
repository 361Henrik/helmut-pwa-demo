import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Landmark, TreePine, Building2, Theater, Wine, Cog, Star, Bird, Paintbrush, Gem } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { MOCK_POIS, CATEGORY_LABELS, type POICategory } from "@/data/mock-route";

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
import { AudioPlayer } from "@/components/story/AudioPlayer";
import { Badge } from "@/components/ui/badge";

export default function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromDemo = searchParams.get("from") === "demo";

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Category Icon Header */}
      <div className="relative flex-shrink-0 bg-deep-green/5 pb-8 pt-safe-top">
        <div className="flex items-center px-4 pt-3">
          <button
            onClick={() => fromDemo ? navigate("/") : navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-deep-green/10">
            {(() => {
              const Icon = CATEGORY_ICONS[poi.category];
              return <Icon className="h-10 w-10 text-deep-green" />;
            })()}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="flex flex-1 flex-col bg-background px-6 pb-8 pt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Badge
          variant="secondary"
          className="w-fit text-caption uppercase tracking-wider"
        >
          {CATEGORY_LABELS[poi.category]}
        </Badge>

        <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-foreground">
          {poi.name}
        </h1>

        <p className="mt-2 text-body-large text-muted-foreground italic">
          {poi.teaser}
        </p>

        {/* Audio Player */}
        <div className="mt-5">
          <AudioPlayer src={poi.audioUrl} title={poi.name} />
        </div>

        <div className="my-5 h-px bg-border" />

        <article className="prose-curated">
          <p className="text-body-large leading-relaxed text-foreground">
            {poi.storyExcerpt}
          </p>

          {poi.storyBody && poi.storyBody.length > 0 ? (
            poi.storyBody.map((paragraph, index) => (
              <p
                key={index}
                className="mt-5 text-body leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <>
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
            </>
          )}
        </article>

        {/* Source Attribution */}
        {poi.sources && poi.sources.length > 0 && (
          <div className="mt-6 rounded-lg bg-muted/50 px-4 py-3">
            <p className="text-caption text-muted-foreground">
              Sources: {poi.sources.join(", ")}
            </p>
            <p className="mt-1 text-caption text-muted-foreground/70">
              Last verified: March 2026
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
