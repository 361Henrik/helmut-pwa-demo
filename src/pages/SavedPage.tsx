import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-space-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
        <Bookmark className="h-8 w-8 text-deep-green" />
      </div>
      <h1 className="mt-space-5 font-display text-2xl font-medium text-foreground">Saved Journey</h1>
      <p className="mt-space-3 max-w-xs text-center text-body text-muted-foreground">
        Stories and moments you've saved will appear here as a chronological timeline of your voyage.
      </p>
    </div>
  );
}
