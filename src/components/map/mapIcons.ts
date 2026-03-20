import type { POICategory } from "@/data/mock-route";

/**
 * Monochrome SVG icons for each POI category.
 * Rendered at 18×18 inside 40×40 circular markers.
 * Stroke-based, uses currentColor for theming.
 */
export const CATEGORY_SVG_ICONS: Record<POICategory, string> = {
  history: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 10h1"/><path d="M14 10h1"/></svg>`,

  nature: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8c.7-1 1-2.2 1-3.5C18 2.5 16.6 1 15 1c-1 0-1.8.5-2.3 1.2A3.6 3.6 0 0 0 9 1C7.4 1 6 2.5 6 4.5c0 1.3.3 2.5 1 3.5"/><path d="M12 22V8"/><path d="M8 12c-2.4-.8-4-2.4-4-5"/><path d="M16 12c2.4-.8 4-2.4 4-5"/><path d="M8 16c-2 0-3.5-.5-4.5-1.5"/><path d="M16 16c2 0 3.5-.5 4.5-1.5"/></svg>`,

  architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 7v15h16V7l-8-5z"/><path d="M12 2v6"/><circle cx="12" cy="12" r="2"/><path d="M9 22v-4h6v4"/></svg>`,

  culture: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10.5c1.5-2.5 4-4 7-4 1 0 2 .2 3 .5 1-.3 2-.5 3-.5 3 0 5.5 1.5 7 4"/><circle cx="8" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/><path d="M12 18c-1 0-2-.5-2.5-1.5"/><path d="M12 18c1 0 2-.5 2.5-1.5"/></svg>`,

  food: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 11v11"/><path d="M8 2c0 4 4 6 4 9"/><path d="M16 2c0 4-4 6-4 9"/><ellipse cx="12" cy="11" rx="5" ry="2"/></svg>`,

  engineering: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4"/><path d="M12 19v4"/><path d="M1 12h4"/><path d="M19 12h4"/><path d="M4.2 4.2l2.8 2.8"/><path d="M17 17l2.8 2.8"/><path d="M4.2 19.8l2.8-2.8"/><path d="M17 7l2.8-2.8"/></svg>`,

  legends: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,

  wildlife: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/></svg>`,

  art: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="2.5"/><path d="M9 12c0-4.4 3.6-8 8-8 0 4.4-3.6 8-8 8z"/><path d="M8 14.5V20h0"/><path d="M3 20h18"/></svg>`,

  "hidden-gem": `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/></svg>`,
};
