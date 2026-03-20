import type { POICategory } from "@/data/mock-route";

/**
 * Monochrome SVG icons for each POI category.
 * Rendered at 22×22 inside 48×48 circular markers.
 * Stroke-based, uses currentColor for theming.
 */
export const CATEGORY_SVG_ICONS: Record<POICategory, string> = {
  // Columns / temple for history
  history: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 10h1"/><path d="M14 10h1"/></svg>`,

  // Tree for nature
  nature: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8c.7-1 1-2.2 1-3.5C18 2.5 16.6 1 15 1c-1 0-1.8.5-2.3 1.2A3.6 3.6 0 0 0 9 1C7.4 1 6 2.5 6 4.5c0 1.3.3 2.5 1 3.5"/><path d="M12 22V8"/><path d="M8 12c-2.4-.8-4-2.4-4-5"/><path d="M16 12c2.4-.8 4-2.4 4-5"/><path d="M8 16c-2 0-3.5-.5-4.5-1.5"/><path d="M16 16c2 0 3.5-.5 4.5-1.5"/></svg>`,

  // Building with dome for architecture
  architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 7v15h16V7l-8-5z"/><path d="M12 2v6"/><circle cx="12" cy="12" r="2"/><path d="M9 22v-4h6v4"/></svg>`,

  // Theater masks for culture (improved recognizability)
  culture: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4a8 8 0 0 0 16 0"/><path d="M7 9h.01"/><path d="M13 9h.01"/><path d="M9 13c.5.5 1.5 1 3 1"/><path d="M4 20a8 8 0 0 1 16 0"/><path d="M9 16h.01"/><path d="M15 16h.01"/><path d="M10 19c1 .5 2.5.5 4 0"/></svg>`,

  // Wine glass for food & drink
  food: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="M8 2c0 4 4 6 4 9"/><path d="M16 2c0 4-4 6-4 9"/><ellipse cx="12" cy="11" rx="5" ry="2"/></svg>`,

  // Bridge / cog for engineering (improved)
  engineering: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20"/><path d="M4 18v-4"/><path d="M20 18v-4"/><path d="M4 14c0-4 3.5-8 8-8s8 4 8 8"/><path d="M8 14v4"/><path d="M12 14v4"/><path d="M16 14v4"/></svg>`,

  // Star for legends
  legends: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,

  // Bird for wildlife
  wildlife: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/></svg>`,

  // Paintbrush for art (improved clarity)
  art: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>`,

  // Diamond for hidden gem (distinct from star)
  "hidden-gem": `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M12 22 6 9"/><path d="M12 22l6-13"/></svg>`,
};
