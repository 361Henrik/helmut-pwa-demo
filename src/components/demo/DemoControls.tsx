import { RotateCcw, Play, Pause } from "lucide-react";

interface DemoControlsProps {
  onRestart: () => void;
  paused: boolean;
  onTogglePause: () => void;
}

export function DemoControls({ onRestart, paused, onTogglePause }: DemoControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-40 flex gap-2">
      <button
        onClick={onTogglePause}
        className="flex h-10 items-center gap-1.5 rounded-full bg-deep-green px-3.5 shadow-sm transition-colors hover:bg-deep-green/90"
        aria-label={paused ? "Resume demo" : "Pause demo"}
      >
        {paused ? (
          <Play className="h-4 w-4 text-deep-green-foreground" />
        ) : (
          <Pause className="h-4 w-4 text-deep-green-foreground" />
        )}
        <span className="text-caption font-medium text-deep-green-foreground">
          {paused ? "Play" : "Pause"}
        </span>
      </button>
      <button
        onClick={onRestart}
        className="flex h-10 items-center gap-1.5 rounded-full bg-background/80 px-3.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
        aria-label="Restart demo"
      >
        <RotateCcw className="h-4 w-4 text-foreground" />
        <span className="text-caption font-medium text-foreground">Restart</span>
      </button>
    </div>
  );
}
