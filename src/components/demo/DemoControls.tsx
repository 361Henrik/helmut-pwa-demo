import { RotateCcw } from "lucide-react";

interface DemoControlsProps {
  onRestart: () => void;
  onExit?: () => void;
}

export function DemoControls({ onRestart }: DemoControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-40 flex gap-2">
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
