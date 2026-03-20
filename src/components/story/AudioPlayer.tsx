import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  src?: string;
  title: string;
}

/** Format seconds to mm:ss */
function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Mock duration when no real audio source
  const mockDuration = 185; // 3:05
  const effectiveDuration = src ? duration : mockDuration;

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.pause();
      audio.src = "";
      clearInterval(intervalRef.current);
    };
  }, [src]);

  // Mock playback timer when no src
  useEffect(() => {
    if (src) return;
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + speed;
          if (next >= mockDuration) {
            setPlaying(false);
            clearInterval(intervalRef.current);
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, speed, src]);

  const togglePlay = useCallback(() => {
    if (src && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setPlaying((p) => !p);
  }, [playing, src]);

  const handleSeek = useCallback(
    (value: number[]) => {
      const t = value[0];
      setCurrentTime(t);
      if (src && audioRef.current) {
        audioRef.current.currentTime = t;
      }
    },
    [src]
  );

  const handleRestart = useCallback(() => {
    setCurrentTime(0);
    if (src && audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [src]);

  const cycleSpeed = useCallback(() => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const idx = speeds.indexOf(speed);
    const next = speeds[(idx + 1) % speeds.length];
    setSpeed(next);
    if (src && audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  }, [speed, src]);

  // Sync real audio time
  useEffect(() => {
    if (!src || !audioRef.current) return;
    if (!playing) return;
    const sync = setInterval(() => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }, 250);
    return () => clearInterval(sync);
  }, [playing, src]);

  const progress = effectiveDuration > 0 ? currentTime : 0;

  return (
    <div className="rounded-xl bg-card p-4">
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-deep-green text-deep-green-foreground transition-transform active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" />
          )}
        </button>

        {/* Scrubber & time */}
        <div className="flex flex-1 flex-col gap-1">
          <Slider
            value={[progress]}
            max={effectiveDuration}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-caption text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(effectiveDuration)}</span>
          </div>
        </div>

        {/* Restart */}
        <button
          onClick={handleRestart}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Restart"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Speed toggle */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-caption text-muted-foreground">
          Narration: {title}
        </span>
        <button
          onClick={cycleSpeed}
          className="rounded-md border border-border px-2.5 py-1 text-caption font-medium text-foreground transition-colors hover:bg-background"
        >
          {speed}×
        </button>
      </div>
    </div>
  );
}
