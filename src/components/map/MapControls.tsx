import { Locate, Layers, CircleHelp, Camera } from "lucide-react";
import { toast } from "sonner";

interface MapControlsProps {
  onRecenter: () => void;
  onToggleStyle: () => void;
}

export function MapControls({ onRecenter, onToggleStyle }: MapControlsProps) {
  const btnClass =
    "flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-md transition-colors duration-default hover:bg-card active:scale-[0.96]";

  return (
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

      {/* Live View — coming soon */}
      <div className="relative">
        <button
          onClick={() =>
            toast("Live View coming soon", {
              description: "Point your camera at the landscape to discover what you're seeing.",
            })
          }
          className={`${btnClass} opacity-60`}
          aria-label="Live View — coming soon"
        >
          <Camera className="h-6 w-6 text-deep-green" />
        </button>
        <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 font-body text-[10px] font-semibold text-accent-foreground shadow-sm">
          Soon
        </span>
      </div>

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
  );
}
