import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface Brand {
  name: string;
  logo?: string;
  accent: string;
  cta: string;
  ctaLabel: string;
}

const DEFAULT: Brand = {
  name: "Scenic Waterways",
  logo: undefined,
  accent: "#C49A5C",
  cta: "#contact",
  ctaLabel: "Request a conversation",
};

const BrandContext = createContext<Brand>(DEFAULT);

export function useBrand() {
  return useContext(BrandContext);
}

/** Read operator branding from URL params (?name=&logo=&color=&cta=&ctaLabel=). */
export function BrandProvider({ children }: { children: ReactNode }) {
  const brand = useMemo<Brand>(() => {
    if (typeof window === "undefined") return DEFAULT;
    const p = new URLSearchParams(window.location.search);
    const color = p.get("color");
    const accent =
      color && /^#?[0-9a-fA-F]{3,8}$/.test(color)
        ? color.startsWith("#") ? color : `#${color}`
        : DEFAULT.accent;
    return {
      name: p.get("name") || DEFAULT.name,
      logo: p.get("logo") || undefined,
      accent,
      cta: p.get("cta") || DEFAULT.cta,
      ctaLabel: p.get("ctaLabel") || DEFAULT.ctaLabel,
    };
  }, []);

  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}
