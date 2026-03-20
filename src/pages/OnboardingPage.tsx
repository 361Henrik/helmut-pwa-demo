import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NARRATIVE_CARDS = [
  {
    title: "Never miss what you're looking at",
    description: "Your journey passes through landscapes rich with hidden stories. We surface them gently, right when you need them.",
    icon: "🏔️",
  },
  {
    title: "A hill is just a hill — until you know its story",
    description: "Every castle ruin, vineyard slope, and river bend has a tale. Tap a marker to hear it. Or just watch and wonder.",
    icon: "📖",
  },
  {
    title: "Here when you need us, invisible when you don't",
    description: "No pings, no pressure. Glance down when you're curious. We'll be ready.",
    icon: "🤫",
  },
];

const CATEGORIES = [
  "History", "Nature & Landscapes", "Architecture", "Culture & Local Life",
  "Food & Drink", "Engineering & Infrastructure", "Legends & Stories",
  "Wildlife", "Art & Music", "Hidden Gems",
];

type Step = "narrative" | "permissions" | "interests";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("narrative");
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      if (prev.length >= 5) return prev;
      return [...prev, cat];
    });
  };

  const totalSteps = 4;
  const currentStep =
    step === "narrative" ? 1 :
    step === "permissions" ? 2 : 3;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-6 pb-12 pt-8">
      {/* Progress & Skip */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${
                i < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => navigate("/map")}
          className="min-h-[44px] font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip Intro
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === "narrative" && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-space-7 flex flex-1 flex-col"
          >
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="text-6xl">{NARRATIVE_CARDS[cardIndex].icon}</span>
              <h2 className="mt-space-5 font-display text-3xl font-medium leading-snug text-foreground">
                {NARRATIVE_CARDS[cardIndex].title}
              </h2>
              <p className="mt-space-4 max-w-sm text-body-large text-muted-foreground leading-relaxed">
                {NARRATIVE_CARDS[cardIndex].description}
              </p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 py-6">
              {NARRATIVE_CARDS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    i === cardIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                if (cardIndex < NARRATIVE_CARDS.length - 1) {
                  setCardIndex(cardIndex + 1);
                } else {
                  setStep("permissions");
                }
              }}
            >
              {cardIndex < NARRATIVE_CARDS.length - 1 ? "Next" : "Continue"}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === "permissions" && (
          <motion.div
            key="permissions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-space-7 flex flex-1 flex-col"
          >
            <h2 className="font-display text-3xl font-medium text-foreground">
              A few quick permissions
            </h2>
            <p className="mt-space-3 text-body-large text-muted-foreground">
              These help us show you the right stories at the right time. You can change these later in Settings.
            </p>

            <div className="mt-space-7 space-y-4">
              {/* Location */}
              <div className="rounded-md border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background">
                    <MapPin className="h-5 w-5 text-deep-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-medium text-foreground">Location</h3>
                    <p className="mt-1 text-body-small text-muted-foreground">
                      Lets us show stories for the landscape you're passing right now. Your location stays on your device.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => {}}>Allow</Button>
                      <Button size="sm" variant="ghost" onClick={() => {}}>Not Now</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="rounded-md border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background">
                    <Bell className="h-5 w-5 text-deep-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-medium text-foreground">Notifications</h3>
                    <p className="mt-1 text-body-small text-muted-foreground">
                      A gentle alert when you're approaching something remarkable. No spam, ever.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => {}}>Allow</Button>
                      <Button size="sm" variant="ghost" onClick={() => {}}>Not Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-space-7">
              <Button
                size="lg"
                className="w-full"
                onClick={() => setStep("interests")}
              >
                Continue
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "interests" && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-space-7 flex flex-1 flex-col"
          >
            <h2 className="font-display text-3xl font-medium text-foreground">
              What draws you to the water?
            </h2>
            <p className="mt-space-3 text-body text-muted-foreground">
              Choose up to 5 topics to personalise your map. You can change these anytime.
            </p>

            <div className="mt-space-5 grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                const isDisabled = !isSelected && selectedCategories.length >= 5;
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    disabled={isDisabled}
                    className={`min-h-[48px] rounded-md border px-4 py-3 font-body text-sm font-medium transition-colors duration-300 ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : isDisabled
                        ? "border-border bg-background text-muted-foreground/50"
                        : "border-border bg-background text-foreground hover:bg-card"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-center text-caption text-muted-foreground">
              {selectedCategories.length}/5 selected
            </p>

            <div className="mt-auto pt-space-7">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  localStorage.setItem("curated-lens-categories", JSON.stringify(selectedCategories));
                  navigate("/map");
                }}
                disabled={selectedCategories.length === 0}
              >
                Continue to Journey
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
