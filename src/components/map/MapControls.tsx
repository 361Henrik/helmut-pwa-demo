import { useState } from "react";
import { Locate, Layers, CircleHelp, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { VoiceButton } from "./VoiceButton";

interface MapControlsProps {
  onRecenter: () => void;
  onToggleStyle: () => void;
}

export function MapControls({ onRecenter, onToggleStyle }: MapControlsProps) {
  const [showArOverlay, setShowArOverlay] = useState(false);

  const btnClass =
    "flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-md transition-colors duration-default hover:bg-card active:scale-[0.96]";

  return (
    <>
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-space-3">
        <button
          onClick={onRecenter}
          className={btnClass}
          aria-label="Recenter map to journey route"
        >
          <Locate className="h-6 w-6 text-deep-green" />
        </button>

        <button
          onClick={onToggleStyle}
          className={btnClass}
          aria-label="Toggle map style"
        >
          <Layers className="h-6 w-6 text-deep-green" />
        </button>

        {/* Live View */}
        <div className="relative">
          <button
            onClick={() => setShowArOverlay(true)}
            className={`${btnClass} opacity-60`}
            aria-label="Live View"
          >
            <Camera className="h-6 w-6 text-deep-green" />
          </button>
          <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 font-body text-[10px] font-semibold text-accent-foreground shadow-sm">
            Soon
          </span>
        </div>

        {/* Voice */}
        <VoiceButton
          onCommand={(cmd) => {
            toast("Voice command", { description: cmd });
          }}
        />

        <button
          onClick={() =>
            toast("Map Help", {
              description:
                "Tap markers to learn about places along your route. Use the filter chips at the top to show specific categories. Pinch to zoom, drag to explore.",
              duration: 6000,
            })
          }
          className={btnClass}
          aria-label="Help"
        >
          <CircleHelp className="h-6 w-6 text-deep-green" />
        </button>
      </div>

      {/* Live View demo overlay */}
      {showArOverlay && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-charcoal/95">
          <button
            onClick={() => setShowArOverlay(false)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/20"
            aria-label="Close Live View"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <Camera className="h-16 w-16 text-white/60" />
            <h2 className="font-display text-xl font-medium text-white">
              Live View
            </h2>
            <p className="max-w-xs text-body-small leading-relaxed text-white/70">
              Point your camera at the landscape to discover what you're seeing.
              Landmarks are identified by GPS and heading.
            </p>

            {/* Demo label simulation */}
            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
              <p className="text-caption uppercase tracking-wider text-white/50">
                Demo Preview
              </p>
              <p className="mt-1 font-display text-lg font-medium text-white">
                Loreley Rock
              </p>
              <p className="text-body-small text-white/60">
                2.3 km ahead · Legends
              </p>
            </div>

            <p className="mt-4 text-caption text-white/40">
              Full camera integration coming soon
            </p>
          </div>
        </div>
      )}
    </>
  );
}
