import { motion } from "framer-motion";
import { ArrowLeft, Map, Bookmark, Route, HelpCircle, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: Map,
    title: "Exploring the Map",
    body: "Pinch to zoom and drag to pan. Tap any marker to learn about that place. Use the category chips at the top to filter by interest — history, nature, food, and more.",
  },
  {
    icon: Route,
    title: "Your Journey Timeline",
    body: "The Journey tab shows your 7-day cruise itinerary. Each day highlights the ports and landmarks you'll pass. The current day is marked so you always know where you are.",
  },
  {
    icon: Bookmark,
    title: "Saving Stories",
    body: "Found something fascinating? Tap the bookmark icon on any story to save it. All your saved stories appear in the Saved tab, ready to revisit anytime.",
  },
  {
    icon: Compass,
    title: "Map Controls",
    body: "Use the buttons on the right side of the map: Recenter snaps back to your route, Layers switches the map style, and the Help button explains what you're looking at.",
  },
];

export default function HelpPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-4">
      <button
        onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-card"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-deep-green" />
          <h1 className="font-display text-2xl font-medium text-foreground">
            Getting Started
          </h1>
        </div>
        <p className="mt-2 text-body text-muted-foreground">
          Everything you need to know about The Curated Lens — your silent companion for the journey ahead.
        </p>
      </motion.div>

      <div className="mt-8 space-y-5">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-green/10">
                <s.icon className="h-5 w-5 text-deep-green" />
              </div>
              <h2 className="font-display text-lg font-medium text-foreground">
                {s.title}
              </h2>
            </div>
            <p className="mt-3 text-body leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-muted/50 p-5 text-center">
        <p className="text-body-small text-muted-foreground">
          Need more help? Ask any crew member or visit the reception desk.
        </p>
        <p className="mt-2 text-caption text-muted-foreground/70">
          The Curated Lens · Version 1.0
        </p>
      </div>
    </div>
  );
}
