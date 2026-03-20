import { Locate, Layers } from "lucide-react";

interface MapControlsProps {
  onRecenter: () => void;
  onToggleStyle: () => void;
}

export function MapControls({ onRecenter, onToggleStyle }: MapControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-10 flex flex-col gap-space-3">
      <button
        onClick={onRecenter}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md transition-colors duration-default hover:bg-card active:scale-[0.96]"
        aria-label="Recenter map"
      >
        <Locate className="h-5 w-5 text-deep-green" />
      </button>
      <button
        onClick={onToggleStyle}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md transition-colors duration-default hover:bg-card active:scale-[0.96]"
        aria-label="Toggle map style"
      >
        <Layers className="h-5 w-5 text-deep-green" />
      </button>
    </div>
  );
}
