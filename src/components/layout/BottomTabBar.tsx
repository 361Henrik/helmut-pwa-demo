import { NavLink } from "react-router-dom";
import { Route, Map, Bookmark, Settings, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/journey", label: "Journey", icon: Route },
  { to: "/map", label: "Map", icon: Map },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

/** Read operator return URL from query params */
function getOperatorReturn(): { name: string; url: string } | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("returnUrl");
    const name = params.get("operatorName") || "Viking River Cruises";
    if (url) return { name, url };
  } catch {
    // ignore
  }
  return null;
}

export function BottomTabBar() {
  const operator = getOperatorReturn();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm safe-area-pb">
      {/* Operator return bar — always visible */}
      <a
        href={operator?.url || "#"}
        onClick={(e) => {
          if (!operator?.url) e.preventDefault();
        }}
        className={cn(
          "flex h-10 items-center justify-center gap-2 border-b border-border/50 text-sm transition-colors",
          operator
            ? "text-muted-foreground hover:text-foreground"
            : "text-muted-foreground/60"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to {operator?.name || "Viking River Cruises"}</span>
      </a>

      <div className="flex h-20 items-center justify-around px-space-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex min-h-[56px] min-w-[56px] flex-col items-center justify-center gap-1.5 rounded-md px-3 py-1.5 font-body text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="h-7 w-7" strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
