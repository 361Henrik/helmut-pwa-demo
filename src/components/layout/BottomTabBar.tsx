import { NavLink } from "react-router-dom";
import { Ship, Map, Bookmark, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/journey", label: "Journey", icon: Ship },
  { to: "/map", label: "Map", icon: Map },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm safe-area-pb">
      <div className="flex h-16 items-center justify-around px-space-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex min-h-[48px] min-w-[48px] flex-col items-center justify-center gap-1 rounded-md px-3 py-1 font-body text-xs font-medium transition-colors duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
