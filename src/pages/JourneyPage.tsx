import { Ship, MapPin, ChevronRight, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MOCK_POIS, VESSEL_POSITION } from "@/data/mock-route";

export default function JourneyPage() {
  const navigate = useNavigate();

  // Find nearest upcoming POI (simple: first POI north of vessel)
  const upcomingPois = MOCK_POIS.filter(
    (poi) => poi.coordinates[1] > VESSEL_POSITION[1]
  ).slice(0, 3);

  const progress = 40; // mock: 40% of route completed

  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      {/* Branding */}
      <div className="flex items-center gap-2 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-green">
          <span className="font-display text-xs font-semibold text-deep-green-foreground">
            CL
          </span>
        </div>
        <span className="font-display text-xs font-medium uppercase tracking-widest text-muted-foreground">
          The Curated Lens
        </span>
      </div>

      {/* Voyage header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-space-4"
      >
        <p className="text-caption uppercase tracking-wider text-muted-foreground">
          Current Voyage
        </p>
        <h1 className="mt-1 font-display text-2xl font-medium text-foreground">
          Rhine River Cruise
        </h1>
        <p className="mt-1 text-body-small text-muted-foreground">
          Basel → Amsterdam · 7 nights
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mt-space-5"
      >
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <span>Basel</span>
          <span>Amsterdam</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-card">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-deep-green"
          />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Ship className="h-3.5 w-3.5 text-deep-green" />
          <span className="text-caption text-muted-foreground">
            Currently near Mainz · Day 4 of 7
          </span>
        </div>
      </motion.div>

      {/* Upcoming POIs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mt-space-6"
      >
        <h2 className="font-display text-lg font-medium text-foreground">
          Coming Up
        </h2>
        <div className="mt-space-3 space-y-3">
          {upcomingPois.map((poi) => (
            <button
              key={poi.id}
              onClick={() => navigate("/map")}
              className="flex w-full items-center gap-4 rounded-md border bg-card p-4 text-left transition-colors duration-default hover:bg-card/80"
            >
              <img
                src={poi.thumbnailUrl}
                alt={poi.name}
                className="h-14 w-14 rounded-md object-cover"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-medium text-foreground truncate">
                  {poi.name}
                </h3>
                <p className="mt-0.5 text-caption text-muted-foreground truncate">
                  {poi.teaser}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="mt-space-6 grid grid-cols-2 gap-3"
      >
        <button
          onClick={() => navigate("/map")}
          className="flex flex-col items-center gap-2 rounded-md border bg-card p-4 transition-colors duration-default hover:bg-card/80"
        >
          <Compass className="h-6 w-6 text-deep-green" />
          <span className="text-body-small font-medium text-foreground">
            Open Map
          </span>
        </button>
        <button
          onClick={() => navigate("/saved")}
          className="flex flex-col items-center gap-2 rounded-md border bg-card p-4 transition-colors duration-default hover:bg-card/80"
        >
          <MapPin className="h-6 w-6 text-deep-green" />
          <span className="text-body-small font-medium text-foreground">
            Saved Stories
          </span>
        </button>
      </motion.div>
    </div>
  );
}
