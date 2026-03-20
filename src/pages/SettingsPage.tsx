import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-space-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
        <Settings className="h-8 w-8 text-deep-green" />
      </div>
      <h1 className="mt-space-5 font-display text-2xl font-medium text-foreground">Settings</h1>
      <p className="mt-space-3 max-w-xs text-center text-body text-muted-foreground">
        Manage your language, audio preferences, and offline data from here.
      </p>
    </div>
  );
}
