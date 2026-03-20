import { useState, useEffect } from "react";
import { Globe, Bell, MapPin, Wifi, HelpCircle, Info, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "no", label: "Norsk" },
];

const CATEGORIES = [
  "History",
  "Nature & Landscapes",
  "Architecture",
  "Culture & Local Life",
  "Food & Drink",
  "Engineering & Infrastructure",
  "Legends & Stories",
  "Wildlife",
  "Art & Music",
  "Hidden Gems",
];

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("curated-lens-language") ?? "en";
  });
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("curated-lens-notifications") !== "false";
  });
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("curated-lens-location") !== "false";
  });
  const [offlineData, setOfflineData] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("curated-lens-categories") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("curated-lens-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("curated-lens-notifications", String(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("curated-lens-location", String(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem(
      "curated-lens-categories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      if (prev.length >= 5) return prev;
      return [...prev, cat];
    });
  };

  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      <h1 className="font-display text-2xl font-medium text-foreground">
        Settings
      </h1>

      {/* Language */}
      <section className="mt-space-5">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-deep-green" />
          <h2 className="font-display text-lg font-medium text-foreground">
            Language
          </h2>
        </div>
        <div className="mt-space-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Preferences */}
      <section className="mt-space-6">
        <h2 className="font-display text-lg font-medium text-foreground">
          Preferences
        </h2>
        <div className="mt-space-3 space-y-4">
          <div className="flex items-center justify-between rounded-md border bg-card p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-deep-green" />
              <div>
                <p className="text-body-small font-medium text-foreground">
                  Notifications
                </p>
                <p className="text-caption text-muted-foreground">
                  Alerts when approaching POIs
                </p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between rounded-md border bg-card p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-deep-green" />
              <div>
                <p className="text-body-small font-medium text-foreground">
                  Location Sharing
                </p>
                <p className="text-caption text-muted-foreground">
                  Show stories near your position
                </p>
              </div>
            </div>
            <Switch checked={location} onCheckedChange={setLocation} />
          </div>

          <div className="flex items-center justify-between rounded-md border bg-card p-4">
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-deep-green" />
              <div>
                <p className="text-body-small font-medium text-foreground">
                  Offline Data
                </p>
                <p className="text-caption text-muted-foreground">
                  Download stories for offline use
                </p>
              </div>
            </div>
            <Switch checked={offlineData} onCheckedChange={setOfflineData} />
          </div>
        </div>
      </section>

      {/* Interest Categories */}
      <section className="mt-space-6">
        <h2 className="font-display text-lg font-medium text-foreground">
          Your Interests
        </h2>
        <p className="mt-1 text-caption text-muted-foreground">
          Choose up to 5 topics · {selectedCategories.length}/5 selected
        </p>
        <div className="mt-space-3 grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            const isDisabled = !isSelected && selectedCategories.length >= 5;
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                disabled={isDisabled}
                className={`min-h-[44px] rounded-md border px-3 py-2 font-body text-sm font-medium transition-colors duration-default ${
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
      </section>

      {/* About */}
      <section className="mt-space-6 pb-space-5">
        <h2 className="font-display text-lg font-medium text-foreground">
          About
        </h2>
        <div className="mt-space-3 space-y-3">
          <div className="flex items-center gap-3 rounded-md border bg-card p-4">
            <Info className="h-5 w-5 text-deep-green" />
            <div>
              <p className="text-body-small font-medium text-foreground">
                The Curated Lens
              </p>
              <p className="text-caption text-muted-foreground">
                Version 1.0.0 · Made for curious travellers
              </p>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 rounded-md border bg-card p-4 text-left transition-colors duration-default hover:bg-card/80">
            <HelpCircle className="h-5 w-5 text-deep-green" />
            <p className="text-body-small font-medium text-foreground">
              Help & Support
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}
