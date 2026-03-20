import { useState, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface VoiceButtonProps {
  onCommand?: (command: string) => void;
}

export function VoiceButton({ onCommand }: VoiceButtonProps) {
  const [listening, setListening] = useState(false);

  const handleTap = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast("Voice not available", {
        description:
          "Your browser doesn't support voice commands. Try Chrome or Safari.",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      toast("Couldn't hear you", {
        description: 'Try again — say "tell me about this" or "play audio".',
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setListening(false);

      if (
        transcript.includes("play audio") ||
        transcript.includes("tell me") ||
        transcript.includes("what am i looking at") ||
        transcript.includes("what is this")
      ) {
        onCommand?.(transcript);
        toast("Got it", { description: `"${transcript}"` });
      } else {
        toast("Try saying…", {
          description: '"Tell me about this" or "Play audio"',
        });
      }
    };

    recognition.start();
  }, [onCommand]);

  return (
    <button
      onClick={handleTap}
      className={`flex h-14 w-14 items-center justify-center rounded-full shadow-md transition-colors duration-200 active:scale-[0.96] ${
        listening
          ? "bg-deep-green text-deep-green-foreground"
          : "bg-background text-deep-green hover:bg-card"
      }`}
      aria-label={listening ? "Listening…" : "Voice command"}
    >
      {listening ? (
        <Mic className="h-6 w-6 animate-pulse" />
      ) : (
        <MicOff className="h-6 w-6" />
      )}
    </button>
  );
}
