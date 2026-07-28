import { Volume2, VolumeX } from "lucide-react";

interface AmbientToggleProps {
  enabled: boolean;
  onEnable: () => void;
  onDisable: () => void;
}

/**
 * Ambient sound toggle — placed in DemoControls row. First tap unlocks
 * Web Audio (browser autoplay policy) and fades the generative bed in.
 */
export function AmbientToggle({ enabled, onEnable, onDisable }: AmbientToggleProps) {
  return (
    <button
      onClick={enabled ? onDisable : onEnable}
      className="flex h-10 items-center gap-1.5 rounded-full bg-deep-green px-3.5 shadow-sm transition-colors hover:bg-deep-green/90"
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4 text-deep-green-foreground" />
      ) : (
        <VolumeX className="h-4 w-4 text-deep-green-foreground" />
      )}
      <span className="text-caption font-medium text-deep-green-foreground">
        {enabled ? "Sound" : "Silent"}
      </span>
    </button>
  );
}
