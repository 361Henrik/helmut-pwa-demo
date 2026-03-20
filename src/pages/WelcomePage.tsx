import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-welcome.jpg";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "no", label: "Norsk" },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    const browserLang = navigator.language.slice(0, 2);
    return LANGUAGES.find((l) => l.code === browserLang)?.code ?? "en";
  });
  const [showLangPicker, setShowLangPicker] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A river cruise vessel gliding through a scenic European valley at golden hour"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Subtle bottom gradient for text readability — playbook-compliant */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Persistent help icon */}
      <button
        onClick={() => navigate("/help")}
        className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5 text-foreground" />
      </button>

      {/* Operator logo area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex items-center justify-center pt-16"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-green">
            <span className="font-display text-lg font-semibold text-deep-green-foreground">CL</span>
          </div>
          <span className="font-display text-sm font-medium tracking-widest text-foreground/80 uppercase">
            The Curated Lens
          </span>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="relative z-10 mt-auto flex flex-col px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
            Welcome aboard
          </h1>
          <p className="max-w-sm text-body-large text-muted-foreground leading-relaxed">
            Your silent companion for the journey ahead. Discover the stories hidden in every landscape you pass.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 space-y-3"
        >
          <Button
            size="lg"
            className="w-full text-lg"
            onClick={() => navigate("/onboarding")}
          >
            Start Exploring
          </Button>

          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => navigate("/map")}
          >
            Login / Recover Saved Journey
          </Button>
        </motion.div>

        {/* Language selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-6 flex justify-center"
        >
          <div className="relative">
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex min-h-[44px] items-center gap-2 rounded-md px-4 py-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Select language"
            >
              <Globe className="h-4 w-4" />
              <span>{currentLang?.label}</span>
            </button>

            {showLangPicker && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border bg-background p-1 shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangPicker(false);
                    }}
                    className={`flex min-h-[44px] w-full items-center rounded-sm px-4 py-2 font-body text-sm transition-colors ${
                      lang.code === language
                        ? "bg-card text-foreground"
                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
