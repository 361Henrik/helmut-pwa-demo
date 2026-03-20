/** Mock Rhine cruise route & POI data for Phase 3 */

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  coordinates: [number, number]; // [lng, lat]
  teaser: string;
  storyExcerpt: string;
  thumbnailUrl: string;
  audioUrl?: string;
  /** Which cruise day this POI belongs to (1-based) */
  day?: number;
  /** Place-specific story paragraphs — replaces generic filler */
  storyBody?: string[];
  /** Attribution sources for factual content */
  sources?: string[];
}

/** A single cruise day with port/segment info */
export interface CruiseDay {
  day: number;
  title: string;
  port: string;
  description: string;
  /** Approximate coordinate for this day's main port */
  coordinates: [number, number];
  /** Whether the vessel has passed this day already */
  status: "past" | "current" | "future";
}

/** 7-night Rhine cruise itinerary */
export const CRUISE_ITINERARY: CruiseDay[] = [
  {
    day: 1,
    title: "Embarkation",
    port: "Basel",
    description:
      "Board your vessel in Basel, where Switzerland, France, and Germany converge. The city's medieval Altstadt and the Rhine promenade set the tone for the journey ahead.",
    coordinates: [7.5886, 47.5596],
    status: "past",
  },
  {
    day: 2,
    title: "The Upper Rhine Plain",
    port: "Strasbourg",
    description:
      "Sail north through the wide Rhine plain past Breisach and into Alsace. Strasbourg's half-timbered Petite France quarter and Gothic cathedral await.",
    coordinates: [7.5886, 48.5734],
    status: "past",
  },
  {
    day: 3,
    title: "Imperial Cities",
    port: "Speyer · Mannheim",
    description:
      "Two great cathedral cities in a single day. Speyer's Romanesque basilica — the largest surviving from its era — gives way to the industrial elegance of Mannheim at the Neckar confluence.",
    coordinates: [8.4660, 49.4875],
    status: "past",
  },
  {
    day: 4,
    title: "The Rheingau",
    port: "Mainz · Rüdesheim",
    description:
      "The river narrows as vineyards climb steep slate slopes. Rüdesheim's Drosselgasse overflows with Riesling, and Mainz reveals Gutenberg's printing revolution.",
    coordinates: [8.2473, 49.9929],
    status: "current",
  },
  {
    day: 5,
    title: "The Rhine Gorge",
    port: "Bacharach · Koblenz",
    description:
      "The legendary stretch: the river squeezes between 200-metre cliffs crowned with castles. The Loreley rock looms at the tightest bend. Koblenz marks the confluence with the Moselle.",
    coordinates: [7.5985, 50.3569],
    status: "future",
  },
  {
    day: 6,
    title: "Cathedral & Culture",
    port: "Cologne · Düsseldorf",
    description:
      "Cologne's twin-spired Dom dominates the skyline — 632 years in the making. Downstream, Düsseldorf's Altstadt offers 260 bars in half a square kilometre.",
    coordinates: [6.9603, 50.9375],
    status: "future",
  },
  {
    day: 7,
    title: "Into the Netherlands",
    port: "Arnhem · Amsterdam",
    description:
      "The Rhine splits into the Nederrijn as the landscape flattens into Dutch polders. Your voyage concludes in Amsterdam's historic harbour.",
    coordinates: [4.8952, 52.3702],
    status: "future",
  },
];

export type POICategory =
  | "history"
  | "nature"
  | "architecture"
  | "culture"
  | "food"
  | "engineering"
  | "legends"
  | "wildlife"
  | "art"
  | "hidden-gem";

export const CATEGORY_LABELS: Record<POICategory, string> = {
  history: "History",
  nature: "Nature",
  architecture: "Architecture",
  culture: "Culture",
  food: "Food & Drink",
  engineering: "Engineering",
  legends: "Legends",
  wildlife: "Wildlife",
  art: "Art & Music",
  "hidden-gem": "Hidden Gem",
};

/** Rhine cruise: Basel → Amsterdam — dense river-following coordinates */
export const ROUTE_COORDINATES: [number, number][] = [
  // Basel — heading north along the Upper Rhine
  [7.5886, 47.5596],
  [7.5890, 47.5700],
  [7.5885, 47.5800],
  [7.5880, 47.5900],
  [7.5875, 47.6000],
  [7.5870, 47.6100],
  [7.5860, 47.6200],
  [7.5850, 47.6300],
  [7.5840, 47.6400],
  [7.5830, 47.6500],
  [7.5820, 47.6600],
  [7.5810, 47.6700],
  [7.5800, 47.6800],
  [7.5790, 47.6900],
  [7.5780, 47.7000],
  [7.5770, 47.7100],
  [7.5760, 47.7200],
  [7.5750, 47.7300],
  [7.5740, 47.7400],
  [7.5730, 47.7500],
  [7.5720, 47.7600],
  [7.5710, 47.7700],
  [7.5700, 47.7800],
  [7.5700, 47.7900],
  [7.5700, 47.8000],
  [7.5700, 47.8100],
  [7.5710, 47.8200],
  [7.5720, 47.8300],
  [7.5740, 47.8400],
  // Breisach area
  [7.5760, 47.8500],
  [7.5780, 47.8600],
  [7.5800, 47.8700],
  [7.5830, 47.8800],
  [7.5850, 47.8900],
  [7.5870, 47.9000],
  [7.5890, 47.9100],
  [7.5900, 47.9200],
  [7.5910, 47.9300],
  [7.5920, 47.9400],
  [7.5930, 47.9500],
  [7.5940, 47.9600],
  [7.5950, 47.9700],
  [7.5960, 47.9800],
  [7.5970, 47.9900],
  [7.5980, 48.0035],
  // Breisach area
  [7.7800, 47.8500],
  [7.7750, 47.8700],
  [7.7700, 47.8900],
  [7.7689, 47.9100],
  [7.7700, 47.9300],
  [7.7720, 47.9500],
  [7.7750, 47.9700],
  [7.7780, 47.9900],
  [7.7800, 48.0035],
  // North along the Rhine plain
  [7.7750, 48.0200],
  [7.7700, 48.0400],
  [7.7650, 48.0600],
  [7.7600, 48.0800],
  [7.7550, 48.1000],
  [7.7500, 48.1200],
  [7.7450, 48.1400],
  [7.7400, 48.1600],
  [7.7380, 48.1800],
  [7.7350, 48.2000],
  [7.7300, 48.2200],
  [7.7200, 48.2400],
  [7.7100, 48.2600],
  [7.7000, 48.2800],
  [7.6900, 48.3000],
  [7.6800, 48.3200],
  [7.6700, 48.3400],
  [7.6600, 48.3600],
  [7.6500, 48.3800],
  [7.6400, 48.4000],
  [7.6300, 48.4200],
  [7.6200, 48.4400],
  // Strasbourg area
  [7.6100, 48.4600],
  [7.6000, 48.4800],
  [7.5950, 48.5000],
  [7.5920, 48.5200],
  [7.5900, 48.5400],
  [7.5886, 48.5600],
  [7.5886, 48.5734],
  [7.5900, 48.5900],
  [7.6000, 48.6100],
  [7.6100, 48.6300],
  // North of Strasbourg
  [7.6250, 48.6500],
  [7.6400, 48.6700],
  [7.6550, 48.6900],
  [7.6700, 48.7100],
  [7.6900, 48.7300],
  [7.7100, 48.7500],
  [7.7300, 48.7700],
  [7.7550, 48.7900],
  [7.7800, 48.8100],
  [7.8050, 48.8300],
  [7.8300, 48.8500],
  [7.8600, 48.8700],
  [7.8900, 48.8900],
  // Speyer area
  [7.9200, 48.9100],
  [7.9500, 48.9300],
  [7.9800, 48.9500],
  [8.0100, 48.9650],
  [8.0500, 48.9750],
  [8.0900, 48.9850],
  [8.1300, 48.9920],
  [8.1700, 48.9970],
  [8.2000, 49.0020],
  [8.2317, 49.0069],
  // North toward Mannheim
  [8.2600, 49.0200],
  [8.2900, 49.0400],
  [8.3200, 49.0600],
  [8.3500, 49.0800],
  [8.3700, 49.1000],
  [8.3900, 49.1200],
  [8.4050, 49.1400],
  [8.4150, 49.1600],
  [8.4200, 49.1800],
  [8.4250, 49.2000],
  [8.4300, 49.2200],
  [8.4350, 49.2400],
  [8.4400, 49.2600],
  [8.4450, 49.2800],
  [8.4500, 49.3000],
  [8.4550, 49.3200],
  [8.4580, 49.3400],
  [8.4600, 49.3600],
  [8.4620, 49.3800],
  [8.4640, 49.4000],
  [8.4650, 49.4200],
  // Mannheim / Ludwigshafen
  [8.4660, 49.4400],
  [8.4660, 49.4600],
  [8.4660, 49.4875],
  [8.4650, 49.5100],
  [8.4600, 49.5300],
  [8.4500, 49.5500],
  [8.4350, 49.5700],
  [8.4200, 49.5900],
  [8.4050, 49.6100],
  [8.3900, 49.6300],
  [8.3750, 49.6500],
  [8.3600, 49.6700],
  [8.3450, 49.6900],
  [8.3300, 49.7100],
  [8.3200, 49.7300],
  [8.3100, 49.7500],
  [8.3000, 49.7700],
  [8.2900, 49.7900],
  [8.2800, 49.8100],
  [8.2750, 49.8300],
  [8.2700, 49.8500],
  [8.2650, 49.8700],
  [8.2600, 49.8900],
  [8.2550, 49.9100],
  [8.2520, 49.9300],
  [8.2500, 49.9500],
  [8.2490, 49.9700],
  // Mainz
  [8.2473, 49.9929],
  [8.2400, 50.0100],
  [8.2300, 50.0200],
  [8.2100, 50.0300],
  [8.1900, 50.0350],
  [8.1700, 50.0400],
  [8.1500, 50.0450],
  [8.1300, 50.0500],
  [8.1100, 50.0550],
  [8.0900, 50.0600],
  [8.0700, 50.0650],
  [8.0500, 50.0700],
  [8.0300, 50.0750],
  [8.0100, 50.0780],
  [7.9900, 50.0800],
  [7.9700, 50.0830],
  [7.9500, 50.0850],
  // Rüdesheim
  [7.9300, 50.0860],
  [7.9050, 50.0874],
  // Into the Rhine Gorge
  [7.8800, 50.0900],
  [7.8600, 50.0950],
  [7.8400, 50.1000],
  [7.8200, 50.1050],
  [7.8000, 50.1100],
  [7.7800, 50.1150],
  [7.7600, 50.1200],
  [7.7500, 50.1300],
  // Bacharach
  [7.7400, 50.1380],
  [7.7285, 50.1420],
  [7.7200, 50.1480],
  [7.7100, 50.1550],
  [7.7000, 50.1620],
  [7.6900, 50.1700],
  [7.6800, 50.1750],
  [7.6700, 50.1800],
  [7.6600, 50.1850],
  [7.6500, 50.1900],
  // Loreley / St. Goar
  [7.6300, 50.1930],
  [7.6100, 50.1950],
  [7.5989, 50.1960],
  [7.5889, 50.1970],
  [7.5800, 50.2000],
  [7.5750, 50.2100],
  [7.5700, 50.2200],
  [7.5680, 50.2300],
  [7.5700, 50.2400],
  [7.5750, 50.2500],
  [7.5800, 50.2600],
  // Marksburg area
  [7.5900, 50.2700],
  [7.5950, 50.2800],
  [7.5980, 50.2900],
  [7.5990, 50.3000],
  [7.5985, 50.3100],
  [7.5980, 50.3200],
  [7.5975, 50.3300],
  [7.5978, 50.3400],
  // Koblenz
  [7.5985, 50.3500],
  [7.5985, 50.3569],
  [7.5980, 50.3650],
  [7.5950, 50.3750],
  [7.5900, 50.3850],
  [7.5800, 50.3950],
  [7.5700, 50.4000],
  [7.5550, 50.4050],
  // Heading north from Koblenz
  [7.5400, 50.4100],
  [7.5200, 50.4150],
  [7.5000, 50.4180],
  [7.4800, 50.4200],
  [7.4600, 50.4220],
  [7.4400, 50.4250],
  [7.4200, 50.4280],
  [7.4000, 50.4320],
  [7.3800, 50.4370],
  [7.3600, 50.4420],
  [7.3400, 50.4480],
  [7.3200, 50.4550],
  [7.3000, 50.4630],
  [7.2800, 50.4700],
  [7.2600, 50.4800],
  [7.2400, 50.4900],
  [7.2200, 50.5000],
  [7.2000, 50.5100],
  [7.1800, 50.5200],
  [7.1620, 50.5300],
  // Remagen / Bad Breisig area
  [7.1500, 50.5400],
  [7.1400, 50.5500],
  [7.1350, 50.5600],
  [7.1300, 50.5700],
  [7.1250, 50.5800],
  [7.1200, 50.5900],
  [7.1150, 50.6000],
  [7.1100, 50.6100],
  [7.1050, 50.6200],
  [7.1020, 50.6300],
  // Bonn
  [7.0984, 50.6394],
  [7.0950, 50.6500],
  [7.0900, 50.6600],
  [7.0850, 50.6750],
  [7.0800, 50.6900],
  [7.0750, 50.7050],
  [7.0700, 50.7200],
  [7.0650, 50.7350],
  [7.0600, 50.7500],
  [7.0550, 50.7650],
  [7.0500, 50.7800],
  [7.0450, 50.7950],
  [7.0400, 50.8100],
  [7.0350, 50.8250],
  [7.0300, 50.8400],
  [7.0200, 50.8550],
  [7.0100, 50.8700],
  [7.0000, 50.8850],
  [6.9900, 50.9000],
  [6.9800, 50.9100],
  [6.9700, 50.9200],
  // Cologne
  [6.9650, 50.9300],
  [6.9603, 50.9375],
  [6.9580, 50.9500],
  [6.9560, 50.9650],
  [6.9550, 50.9800],
  [6.9540, 50.9950],
  [6.9520, 51.0100],
  [6.9500, 51.0250],
  [6.9480, 51.0400],
  [6.9450, 51.0550],
  [6.9400, 51.0700],
  [6.9350, 51.0850],
  [6.9250, 51.1000],
  [6.9100, 51.1150],
  [6.8950, 51.1300],
  [6.8800, 51.1450],
  [6.8650, 51.1600],
  [6.8500, 51.1700],
  [6.8350, 51.1800],
  [6.8200, 51.1900],
  [6.8050, 51.2000],
  [6.7900, 51.2100],
  // Düsseldorf
  [6.7800, 51.2200],
  [6.7735, 51.2277],
  [6.7700, 51.2400],
  [6.7680, 51.2550],
  [6.7670, 51.2700],
  [6.7660, 51.2850],
  [6.7650, 51.3000],
  [6.7640, 51.3150],
  [6.7630, 51.3300],
  [6.7625, 51.3450],
  [6.7620, 51.3600],
  [6.7620, 51.3750],
  [6.7620, 51.3900],
  [6.7625, 51.4050],
  [6.7625, 51.4200],
  // Duisburg
  [6.7625, 51.4332],
  [6.7620, 51.4500],
  [6.7600, 51.4650],
  [6.7550, 51.4800],
  [6.7500, 51.4950],
  [6.7400, 51.5100],
  [6.7300, 51.5250],
  [6.7200, 51.5400],
  [6.7100, 51.5550],
  [6.7000, 51.5700],
  [6.6900, 51.5850],
  [6.6750, 51.6000],
  [6.6600, 51.6150],
  [6.6450, 51.6300],
  [6.6300, 51.6450],
  [6.6150, 51.6600],
  [6.6000, 51.6750],
  [6.5800, 51.6900],
  [6.5600, 51.7050],
  [6.5400, 51.7200],
  [6.5200, 51.7350],
  [6.5000, 51.7500],
  [6.4800, 51.7600],
  [6.4600, 51.7700],
  [6.4400, 51.7800],
  [6.4200, 51.7880],
  [6.4000, 51.7950],
  [6.3800, 51.8000],
  [6.3600, 51.8050],
  [6.3400, 51.8080],
  [6.3200, 51.8100],
  [6.3000, 51.8110],
  [6.2800, 51.8120],
  [6.2600, 51.8120],
  [6.2400, 51.8125],
  [6.2200, 51.8126],
  [6.2000, 51.8126],
  // Emmerich
  [6.1800, 51.8126],
  [6.1600, 51.8126],
  [6.1431, 51.8126],
  [6.1200, 51.8200],
  [6.1000, 51.8300],
  [6.0800, 51.8400],
  [6.0600, 51.8500],
  [6.0400, 51.8600],
  [6.0200, 51.8700],
  [6.0000, 51.8800],
  // Into Netherlands — Arnhem
  [5.9800, 51.8900],
  [5.9600, 51.9000],
  [5.9400, 51.9200],
  [5.9200, 51.9400],
  [5.9167, 51.9667],
  // Toward Amsterdam via Nederrijn / Amsterdam-Rijnkanaal
  [5.9000, 51.9800],
  [5.8800, 52.0000],
  [5.8500, 52.0200],
  [5.8200, 52.0400],
  [5.7900, 52.0600],
  [5.7600, 52.0800],
  [5.7300, 52.1000],
  [5.7000, 52.1200],
  [5.6700, 52.1400],
  [5.6400, 52.1550],
  [5.6100, 52.1700],
  [5.5800, 52.1850],
  [5.5500, 52.2000],
  [5.5200, 52.2150],
  [5.4900, 52.2300],
  [5.4600, 52.2450],
  [5.4300, 52.2600],
  [5.4000, 52.2750],
  [5.3700, 52.2850],
  [5.3400, 52.2950],
  [5.3100, 52.3050],
  [5.2800, 52.3150],
  [5.2500, 52.3200],
  [5.2200, 52.3250],
  [5.1900, 52.3300],
  [5.1600, 52.3350],
  [5.1300, 52.3400],
  [5.1000, 52.3450],
  [5.0700, 52.3500],
  [5.0400, 52.3550],
  [5.0100, 52.3600],
  [4.9800, 52.3650],
  [4.9500, 52.3670],
  [4.9200, 52.3690],
  // Amsterdam
  [4.8952, 52.3702],
];

/** Vessel starts mid-route at Mainz heading north */
export const VESSEL_POSITION: [number, number] = [8.2473, 49.9929];
export const VESSEL_HEADING = 330; // degrees, roughly NNW

export const MOCK_POIS: POI[] = [
  // ===== DAY 1 — Basel =====
  {
    id: "poi-11",
    name: "Basel Minster",
    category: "architecture",
    coordinates: [7.5930, 47.5560],
    teaser: "Red sandstone cathedral above the Rhine",
    storyExcerpt:
      "Basel Minster's distinctive red sandstone facade and colourful tiled roof have dominated the city's skyline since the 12th century. Rebuilt after the 1356 earthquake — one of Europe's most destructive — the cathedral blends Romanesque and Gothic styles.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
    day: 1,
    storyBody: [
      "Basel Minster stands on the highest point of the old city, its terrace offering panoramic views across the Rhine into France and Germany. The original church was consecrated in 1019 in the presence of Emperor Henry II, whose tomb lies within.",
      "The devastating earthquake of 18 October 1356 — the most significant seismic event in Central European history — destroyed much of the cathedral. The reconstruction introduced the soaring Gothic elements visible today, including the slender 64-metre spires.",
      "Erasmus of Rotterdam, the great humanist scholar, is buried here. His modest tomb in the north aisle contrasts sharply with the grandeur of the building, a fitting tribute to a man who valued ideas over ostentation.",
    ],
    sources: ["Basel Tourism", "Swiss Heritage Society"],
  },
  {
    id: "poi-12",
    name: "Dreiländereck",
    category: "hidden-gem",
    coordinates: [7.5907, 47.5890],
    teaser: "Stand in three countries at once",
    storyExcerpt:
      "The Dreiländereck marks the exact point where Switzerland, France, and Germany converge on the Rhine. A small pylon and viewing platform let you gaze into three nations simultaneously — a geographical oddity unique to Basel.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    day: 1,
    storyBody: [
      "At the northern tip of Basel's harbour, a modest monument marks one of Europe's most unusual geographical points. Here the borders of Switzerland, France, and Germany meet on the Rhine, creating a triple frontier visible from a single vantage point.",
      "The spot is best reached by the free ferry that crosses the Rhine at this point — one of four traditional cable ferries in Basel that use only the river's current for propulsion, requiring no engine or fuel.",
      "Standing at the Dreiländereck at dusk, you can watch the lights of three nations flicker on simultaneously. It is a quiet reminder that borders on maps are human inventions — the Rhine flows through all three without regard for sovereignty.",
    ],
    sources: ["Basel Tourism"],
  },

  // ===== DAY 2 — Strasbourg / Breisach =====
  {
    id: "poi-13",
    name: "Breisach am Rhein",
    category: "hidden-gem",
    coordinates: [7.5831, 48.0285],
    teaser: "Medieval hilltop town above the Rhine plain",
    storyExcerpt:
      "Breisach's St. Stephan's Minster crowns a basalt outcrop rising abruptly from the flat Rhine plain. The town changed hands between France and Germany so many times that its identity became a blend of both cultures.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&h=600&fit=crop",
    day: 2,
    storyBody: [
      "Rising like a sentinel above the Upper Rhine Plain, Breisach's volcanic basalt hill has been fortified since Celtic times. The Romans recognised its strategic value, and the town subsequently passed between French and German control at least seventeen times.",
      "The Minster of St. Stephan, perched at the summit, houses a remarkable late-Gothic altarpiece carved from linden wood by an unknown master around 1526. The 'Last Judgment' fresco by Martin Schongauer — one of the most important Gothic painters — adorns the west wall.",
      "Today Breisach is the gateway to the Kaiserstuhl wine region, where volcanic soils and a microclimate warmer than anywhere else in Germany produce exceptional Spätburgunder (Pinot Noir). The town's dual heritage is visible in everything from its architecture to its menus.",
    ],
    sources: ["Breisach Tourist Board", "Baden Wine Region"],
  },
  {
    id: "poi-14",
    name: "Strasbourg Cathedral",
    category: "architecture",
    coordinates: [7.7510, 48.5818],
    teaser: "Gothic masterpiece with an astronomical clock",
    storyExcerpt:
      "Strasbourg's cathedral was the world's tallest building from 1647 to 1874. Its single 142-metre spire of pink Vosges sandstone and the famous astronomical clock, rebuilt in 1843, draw over four million visitors annually.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop",
    day: 2,
    storyBody: [
      "Construction of Strasbourg Cathedral began in 1015, but the building we see today is primarily 12th-to-15th-century Gothic. At 142 metres, its single completed spire made it the tallest structure in the world for 227 years — a record held longer than any other building.",
      "The astronomical clock in the south transept is a masterpiece of Renaissance engineering. Rebuilt between 1838 and 1843, it displays a perpetual calendar, the positions of the sun, moon, and planets, and a procession of apostles that appears daily at 12:30.",
      "Victor Hugo described the facade as 'a gigantic and delicate marvel.' The rose window, 15 metres in diameter, catches the afternoon light and fills the nave with patterns of gold and crimson that shift with the seasons.",
    ],
    sources: ["Fondation de l'Œuvre Notre-Dame", "Strasbourg Tourism"],
  },
  {
    id: "poi-15",
    name: "Petite France",
    category: "culture",
    coordinates: [7.7410, 48.5800],
    teaser: "Half-timbered canal quarter in Strasbourg",
    storyExcerpt:
      "Strasbourg's most picturesque quarter straddles four canals of the River Ill. Its 16th- and 17th-century half-timbered houses, once home to tanners and fishermen, now form a UNESCO World Heritage site of extraordinary charm.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1583265627959-fb7042f5133b?w=800&h=600&fit=crop",
    day: 2,
    storyBody: [
      "The name 'Petite France' has nothing to do with patriotism — it derives from a 15th-century hospice for soldiers suffering from syphilis, then called the 'French disease.' The tanners, millers, and fishermen who originally inhabited these half-timbered houses would hardly recognise the quarter's glamorous present.",
      "The buildings lean over the canals of the Ill at improbable angles, their steep roofs pierced by dormer windows once used for drying hides. Ground floors opened directly onto the water, and goods were loaded from boats into workshops.",
      "Walking Petite France at dawn, before the tourist crowds arrive, is one of Strasbourg's great secret pleasures. The reflections of the half-timbered facades in the still canal water create perfect symmetries that have drawn painters and photographers for generations.",
    ],
    sources: ["UNESCO World Heritage Centre", "Strasbourg Tourism"],
  },

  // ===== DAY 3 — Speyer / Mannheim =====
  {
    id: "poi-6",
    name: "Speyer Cathedral",
    category: "architecture",
    coordinates: [8.4424, 49.3173],
    teaser: "The largest Romanesque church in the world",
    storyExcerpt:
      "Built in 1030, Speyer Cathedral is the largest surviving Romanesque church. Four Holy Roman Emperors are buried in its crypt. The massive nave, with its alternating pillars and columns, creates a rhythm of light and shadow.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop",
    day: 3,
    storyBody: [
      "When Emperor Conrad II laid the foundation stone in 1030, he intended Speyer Cathedral to be the largest church in Christendom. Nearly a millennium later, it remains the largest surviving Romanesque church in the world, its dimensions still impressive: 134 metres long, 33 metres to the vault.",
      "The imperial crypt beneath the altar holds the remains of four emperors, four kings, and three empresses — the most significant collection of medieval royal tombs in Europe. The red sandstone sarcophagi lie in austere rows beneath ribbed vaulting that influenced cathedral architecture for centuries.",
      "UNESCO inscribed the cathedral in 1981, recognising it as a 'major monument of Romanesque art.' The building's influence extends far beyond architecture: it was here that Emperor Henry IV launched his famous walk to Canossa in 1077, barefoot in the snow, to seek papal absolution.",
    ],
    sources: ["UNESCO World Heritage Centre", "Diocese of Speyer"],
  },
  {
    id: "poi-16",
    name: "Mannheim Wasserturm",
    category: "engineering",
    coordinates: [8.4770, 49.4836],
    teaser: "Art Nouveau water tower and garden ensemble",
    storyExcerpt:
      "Mannheim's Wasserturm, built in 1889, is one of Germany's finest Art Nouveau monuments. The 60-metre sandstone tower anchors a formal garden designed by Bruno Schmitz, creating an urban ensemble of remarkable elegance.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop",
    day: 3,
    storyBody: [
      "Mannheim's Wasserturm was never merely functional. When it was inaugurated in 1889, the 60-metre tower was designed as a civic monument — its sandstone exterior decorated with allegorical figures and crowned by an amphora that held 2,000 cubic metres of water to supply the growing industrial city.",
      "The surrounding Friedrichsplatz, designed by Bruno Schmitz, is Germany's largest coherent Art Nouveau square. Fountains, colonnades, and precisely clipped hedges create a formal garden that transitions seamlessly from grand civic space to intimate promenade.",
      "The tower ceased functioning as a water supply in the 1990s but remains Mannheim's most recognisable landmark. Illuminated at night, it anchors the city's identity — proof that infrastructure, when treated with architectural ambition, can become a source of civic pride.",
    ],
    sources: ["Mannheim Tourism", "German Architecture Forum"],
  },
  {
    id: "poi-17",
    name: "Heidelberg Castle",
    category: "history",
    coordinates: [8.7153, 49.4105],
    teaser: "Germany's most famous castle ruin",
    storyExcerpt:
      "Perched above the Neckar valley, Heidelberg Castle blends Gothic, Renaissance, and Baroque elements across five centuries of construction. Its partly ruined state, the result of 17th-century French destruction, only adds to its romantic appeal.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&h=600&fit=crop",
    day: 3,
    storyBody: [
      "Heidelberg Castle has been a ruin since French troops under Louis XIV devastated the Palatinate in 1693 and again in 1689. Yet the destruction only enhanced its appeal: by the early 19th century, it had become the defining symbol of German Romanticism, drawing writers, painters, and poets from across Europe.",
      "The castle's Großes Fass (Great Barrel) in the cellar holds 221,726 litres of wine — enough to fill nearly 300,000 standard bottles. Built in 1751 from 130 oak trunks, it is the world's largest wine barrel and was historically kept full, guarded by a court jester named Perkeo who reportedly drank nothing but wine.",
      "Mark Twain spent three months in Heidelberg in 1878 and devoted several chapters of 'A Tramp Abroad' to the castle and town. He wrote: 'One thinks of Heidelberg by day — with its surroundings — as the last possibility of the beautiful; but when he sees Heidelberg by night... he requires time to consider.'",
    ],
    sources: ["Schloss Heidelberg", "German National Tourist Board"],
  },

  // ===== DAY 4 — Mainz / Rüdesheim =====
  {
    id: "poi-18",
    name: "Mainz Cathedral",
    category: "architecture",
    coordinates: [8.2743, 49.9987],
    teaser: "Imperial cathedral of a thousand years",
    storyExcerpt:
      "Mainz Cathedral has been the seat of powerful prince-bishops since 975 AD. Rebuilt six times after fires and wars, its blend of Romanesque, Gothic, and Baroque elements records a millennium of architectural evolution in a single building.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=600&fit=crop",
    day: 4,
    storyBody: [
      "The Archbishop of Mainz was the most powerful ecclesiastic in the Holy Roman Empire — an Elector with the right to crown the Emperor. His cathedral, founded in 975, reflects that authority. The building was completed on the day of its consecration in 1009, only to be destroyed by fire that same day.",
      "Rebuilt and burned, rebuilt and bombed, the cathedral standing today is its sixth incarnation. Each reconstruction added elements of its era: Romanesque nave, Gothic choir, Baroque chapels. The result is an accidental but compelling architectural history lesson spanning a thousand years.",
      "The cathedral houses one of the finest collections of medieval tomb monuments in Europe. Over forty archbishops lie here, their effigies progressing from flat Romanesque carvings to fully three-dimensional Renaissance sculptures — a timeline of how Europeans chose to remember their powerful dead.",
    ],
    sources: ["Diocese of Mainz", "German National Tourist Board"],
  },
  {
    id: "poi-4",
    name: "Rüdesheim Wine Town",
    category: "food",
    coordinates: [7.9050, 50.0874],
    teaser: "The heart of Rheingau wine country",
    storyExcerpt:
      "Nestled at the southern entrance of the Rhine Gorge, Rüdesheim has been the capital of Rheingau Riesling since Roman times. The famous Drosselgasse alley is barely two metres wide but overflows with wine taverns and live music.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=600&fit=crop",
    day: 4,
    storyBody: [
      "Rüdesheim's relationship with wine predates written records. The Romans planted vines on these south-facing slopes above the Rhine, and Benedictine monks refined the art during the Middle Ages. Today the Rheingau produces some of Germany's most celebrated Rieslings, with Rüdesheim at its heart.",
      "The Drosselgasse — a 144-metre alley barely two metres wide — is one of the most visited streets in Germany, drawing three million visitors annually. Its wine taverns, many family-run for generations, serve Riesling from vineyards visible through their windows.",
      "Above the town, the Niederwald Monument's 10.5-metre bronze Germania statue gazes across the Rhine valley. Reached by cable car through the vineyards, it offers views that explain why UNESCO inscribed the entire Upper Middle Rhine Valley in 2002.",
    ],
    sources: ["Rheingau Wine Region", "UNESCO World Heritage Centre"],
  },
  {
    id: "poi-19",
    name: "Niederwald Monument",
    category: "history",
    coordinates: [7.9028, 50.0810],
    teaser: "Germania statue above the Rhine",
    storyExcerpt:
      "The Niederwald Monument, completed in 1883, commemorates the unification of Germany. Its 10.5-metre bronze Germania holds a sword and the imperial crown, gazing defiantly toward France from a ridge 225 metres above Rüdesheim.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1609952048180-7b35ea6b083b?w=800&h=600&fit=crop",
    day: 4,
    storyBody: [
      "Perched on a ridge 225 metres above the Rhine, the Niederwald Monument was unveiled on 28 September 1883 — the twelfth anniversary of German unification. Kaiser Wilhelm I attended in person, arriving by the same cable railway that visitors use today.",
      "The monument's 38-tonne bronze Germania figure holds the recovered imperial crown in her right hand and a sword in her left. She faces west — toward France — a not-so-subtle message about the outcome of the Franco-Prussian War that precipitated unification.",
      "In 1883, anarchists attempted to assassinate the Kaiser during the unveiling ceremony by planting a bomb in a drainage pipe beneath the processional route. The fuse was dampened by rain and the bomb failed to detonate — discovered years later by construction workers.",
    ],
    sources: ["German Historical Museum", "Rüdesheim Tourism"],
  },

  // ===== DAY 5 — Rhine Gorge =====
  {
    id: "poi-5",
    name: "Bacharach Old Town",
    category: "culture",
    coordinates: [7.7685, 50.0579],
    teaser: "A medieval gem frozen in time",
    storyExcerpt:
      "Victor Hugo called Bacharach one of the most beautiful towns on the Rhine. Its half-timbered houses, Gothic chapel ruins, and Stahleck Castle perched above create a picture so perfect it seems painted rather than built.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590076215667-875c2d0fade3?w=800&h=600&fit=crop",
    day: 5,
    storyBody: [
      "Bacharach's name may derive from the Latin 'Bacchi ara' — altar of Bacchus — reflecting the ancient Roman wine tradition on these slopes. The town's 14th-century walls remain almost entirely intact, encircling half-timbered houses that lean at angles suggesting they are holding each other up.",
      "The ruins of the Werner Chapel, perched above the town, are among the finest examples of German Gothic architecture. Never completed — construction halted in 1289 — the roofless skeleton of red sandstone tracery has been considered more beautiful in its ruined state than any finished church.",
      "Victor Hugo lived in Bacharach during his Rhine journey of 1840 and sketched the town obsessively. His drawings, now in the Bibliothèque nationale de France, show a town that has changed remarkably little in nearly two centuries.",
    ],
    sources: ["Bacharach Tourism", "UNESCO Rhine Gorge"],
  },
  {
    id: "poi-1",
    name: "Loreley Rock",
    category: "legends",
    coordinates: [7.7282, 50.1413],
    teaser: "The legendary siren cliff of the Rhine",
    storyExcerpt:
      "Rising 120 metres above the waterline, the Loreley has inspired poets, painters, and composers for centuries. Heinrich Heine's 1824 poem immortalised the golden-haired maiden whose song lured sailors to their doom on the treacherous narrows below.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&h=600&fit=crop",
    day: 5,
    storyBody: [
      "The Loreley cliff rises 120 metres above the Rhine at its narrowest and deepest point — just 113 metres wide and 25 metres deep. The combination of the tight bend, strong current, and submerged rocks made this passage the most dangerous on the entire navigable Rhine, claiming countless vessels over the centuries.",
      "The legend of the Loreley siren was actually invented in 1801 by the Romantic poet Clemens Brentano, then immortalised by Heinrich Heine's 1824 poem 'Die Lore-Ley.' Heine's golden-haired maiden, combing her hair and singing sailors to their doom, became one of Germany's most enduring myths — despite being barely two centuries old.",
      "Today the Loreley is a UNESCO World Heritage site. A visitor centre at the summit tells the geological and cultural story. The echo off the rock face — once attributed to the siren's voice — is actually caused by the cliff's concave shape amplifying the sound of the river below.",
    ],
    sources: ["UNESCO World Heritage Centre", "Loreley Visitor Centre"],
  },
  {
    id: "poi-7",
    name: "Rhine Gorge Vineyards",
    category: "nature",
    coordinates: [7.6500, 50.1700],
    teaser: "Steep terraced slopes of the UNESCO valley",
    storyExcerpt:
      "The Upper Middle Rhine Valley's impossibly steep vineyard terraces have been cultivated since Roman times. Some slopes angle at 70 degrees — harvesting is done entirely by hand, making these among the most labour-intensive wines on Earth.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    day: 5,
    storyBody: [
      "The terraced vineyards of the Rhine Gorge cling to slopes so steep — up to 70 degrees in places — that no machine can work them. Every task, from pruning to harvest, is done by hand, making these among the most labour-intensive wines produced anywhere on Earth.",
      "The slate soils that make cultivation so difficult are also what give Riesling its distinctive mineral character. The dark stone absorbs heat during the day and radiates it through the cool nights, creating a microclimate that pushes the grape to full ripeness at this northern latitude.",
      "UNESCO inscribed the Upper Middle Rhine Valley in 2002, recognising it as 'an outstanding example of a traditional way of life and communication in a narrow river valley.' The inscription explicitly protects the vineyard terraces, which are as much cultural monuments as the castles above them.",
    ],
    sources: ["UNESCO World Heritage Centre", "Rheingau Wine Association"],
  },
  {
    id: "poi-20",
    name: "Burg Rheinfels",
    category: "history",
    coordinates: [7.7110, 50.1520],
    teaser: "Largest castle ruin on the Rhine",
    storyExcerpt:
      "Built in 1245 by Count Dieter V of Katzenelnbogen, Burg Rheinfels was once the largest fortress on the Rhine. It withstood a siege by 28,000 troops in 1692 but was finally dismantled by French revolutionary forces in 1796.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590077428295-2a21e61583e8?w=800&h=600&fit=crop",
    day: 5,
    storyBody: [
      "Count Dieter V of Katzenelnbogen built Burg Rheinfels in 1245 to enforce a toll on Rhine shipping. At its peak, the fortress complex covered an area five times larger than it does today — making it the mightiest fortification on the entire river.",
      "The castle's finest hour came in 1692 when a force of just 2,700 defenders withstood a siege by 28,000 French troops for over two months. The French eventually withdrew — one of their few defeats during Louis XIV's devastating Palatinate campaigns.",
      "Ironically, what the French army could not take by force, the French Revolution accomplished by decree. In 1796, revolutionary troops occupied the castle and systematically dismantled it, selling the stone as building material. What remains — dramatic vaulted tunnels, towering walls, and panoramic Rhine views — is still the largest castle ruin on the river.",
    ],
    sources: ["Burg Rheinfels Museum", "German Castle Association"],
  },
  {
    id: "poi-21",
    name: "St. Goar",
    category: "hidden-gem",
    coordinates: [7.7120, 50.1540],
    teaser: "Quiet town opposite the Loreley",
    storyExcerpt:
      "Named after a 6th-century hermit who guided boats through the dangerous narrows, St. Goar sits directly opposite the Loreley rock. Its medieval Stiftskirche contains rare 14th-century frescoes uncovered during 1960s restoration.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    day: 5,
    storyBody: [
      "St. Goar takes its name from Goar of Aquitaine, a 6th-century Celtic missionary who settled on this stretch of the Rhine and devoted his life to rescuing shipwrecked sailors. His hermitage became a pilgrimage site, and the town grew around it.",
      "The Stiftskirche (Collegiate Church) holds one of the Rhine valley's best-kept secrets: a cycle of 14th-century frescoes discovered behind plaster during renovations in the 1960s. The paintings depict scenes from the life of Christ in vivid colours that survived centuries of concealment.",
      "From St. Goar's waterfront promenade, the Loreley rock rises directly across the river. On summer evenings, a sound-and-light show projects the legend onto the cliff face — but the real spectacle is the natural play of sunset light on the ancient stone.",
    ],
    sources: ["St. Goar Tourism", "Evangelical Church of the Rhineland"],
  },
  {
    id: "poi-9",
    name: "Marksburg Castle",
    category: "history",
    coordinates: [7.6381, 50.2747],
    teaser: "The only undefeated hill castle on the Rhine",
    storyExcerpt:
      "Perched 150 metres above the river, Marksburg is the only hill castle on the Rhine never destroyed. Its medieval kitchen, armoury, and torture chamber remain intact — a rare window into 700 years of fortress life along the busiest waterway in Europe.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600623047481-697d463a0f49?w=800&h=600&fit=crop&q=80",
    day: 5,
    storyBody: [
      "Of the forty-odd castles along the Rhine Gorge, Marksburg alone was never conquered or deliberately destroyed. Its survival is partly strategic — the steep approach made siege engines useless — and partly lucky: it was simply too remote to bother demolishing when the Palatinate was laid waste in the 1690s.",
      "The castle's interior offers an authentic medieval experience unmatched on the Rhine. The kitchen still has its original 13th-century hearth; the armoury displays weapons spanning five centuries; and the herb garden is planted according to a medieval monastic plan documented in the 9th century.",
      "The German Castle Association (Deutsche Burgenvereinigung) has been headquartered at Marksburg since 1900 and has meticulously maintained it ever since. A visit here reveals what all those romantic ruins along the Rhine once looked like when they were still functioning fortresses.",
    ],
    sources: ["Deutsche Burgenvereinigung", "UNESCO Rhine Gorge"],
  },
  {
    id: "poi-2",
    name: "Koblenz Deutsches Eck",
    category: "history",
    coordinates: [7.6067, 50.3645],
    teaser: "Where the Moselle meets the Rhine",
    storyExcerpt:
      "The German Corner marks the dramatic confluence of two great European rivers. The monumental equestrian statue of Kaiser Wilhelm I, destroyed in 1945 and rebuilt in 1993, towers over the headland as a symbol of German reunification.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=600&fit=crop&q=80",
    day: 5,
    storyBody: [
      "The Deutsches Eck — German Corner — is the dramatic headland where the Moselle pours into the Rhine. The Teutonic Knights established a commandery here in 1216, giving the site its name. For eight centuries, it has been a symbol of German identity and, at times, of German division.",
      "The original equestrian statue of Kaiser Wilhelm I, erected in 1897, was destroyed by American artillery in 1945. For forty-eight years, the empty pedestal stood as an unofficial monument to German reunification — until the statue was reconstructed and unveiled in 1993.",
      "Standing at the very tip of the headland, you can watch the clear green water of the Moselle merge with the muddier Rhine. The two rivers remain visibly distinct for several hundred metres downstream — a natural phenomenon best observed from the elevated platform behind the monument.",
    ],
    sources: ["Koblenz Tourism", "German Historical Museum"],
  },
  {
    id: "poi-22",
    name: "Ehrenbreitstein Fortress",
    category: "engineering",
    coordinates: [7.6150, 50.3650],
    teaser: "Europe's second-largest preserved fortress",
    storyExcerpt:
      "Towering 118 metres above the Rhine opposite Koblenz, Ehrenbreitstein is Europe's second-largest preserved fortress after Gibraltar. Rebuilt by the Prussians between 1817 and 1828, it was designed to be impregnable — and never fell.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=80",
    day: 5,
    storyBody: [
      "The rock of Ehrenbreitstein has been fortified since at least 1000 AD, but the current fortress dates from the Prussian reconstruction of 1817–1828. Built to be the largest and most modern fortification on the Rhine, it incorporated every lesson learned from the Napoleonic Wars.",
      "The fortress complex extends across 80 hectares and includes barracks, powder magazines, tunnels, and cisterns capable of sustaining a garrison of 1,500 soldiers indefinitely. It was designed to withstand bombardment from any angle — and in fact, no army ever attempted a direct assault.",
      "Today a cable car connects the fortress to the Deutsches Eck below, offering what is arguably the finest view on the entire Rhine: the confluence of two great rivers, the old city of Koblenz, and the Rhine Gorge stretching south toward the Loreley.",
    ],
    sources: ["GDKE Rheinland-Pfalz", "Koblenz Tourism"],
  },

  // ===== DAY 6 — Bonn / Cologne / Düsseldorf =====
  {
    id: "poi-23",
    name: "Drachenfels",
    category: "legends",
    coordinates: [7.2090, 50.6680],
    teaser: "The dragon mountain of the Rhine",
    storyExcerpt:
      "Legend says Siegfried slew a dragon on this mountain and bathed in its blood to become invincible. The Drachenfels is the most-climbed mountain in Germany, and its ruined castle offers panoramic views over the Siebengebirge and the Rhine.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590076082090-9b5a0c4e2a62?w=800&h=600&fit=crop&q=80",
    day: 6,
    storyBody: [
      "The Drachenfels — Dragon Rock — rises 321 metres above the Rhine near Königswinter. According to the Nibelungenlied, this is where the hero Siegfried slew a dragon and bathed in its blood, making himself invulnerable everywhere except a spot between his shoulder blades where a linden leaf stuck.",
      "A rack railway, Germany's oldest (1883), carries visitors to near the summit. At the top, the ruins of a 12th-century castle offer views across the Siebengebirge — the Seven Mountains — a volcanic landscape that Lord Byron described in 'Childe Harold's Pilgrimage' as 'the castled crag of Drachenfels.'",
      "The mountain is officially the most-climbed in Germany, with over a million hikers annually. Its trachyte stone was quarried for centuries — the stone used to build Cologne Cathedral came from Drachenfels. Quarrying was halted in 1836 to preserve the mountain, making it one of Europe's earliest conservation victories.",
    ],
    sources: ["Siebengebirge Nature Park", "German Alpine Association"],
  },
  {
    id: "poi-10",
    name: "Bonn Beethoven House",
    category: "art",
    coordinates: [7.0984, 50.7335],
    teaser: "Where the maestro drew his first breath",
    storyExcerpt:
      "Ludwig van Beethoven was born in this modest Baroque house in 1770. The museum holds the largest Beethoven collection in the world, including his last grand piano and the ear trumpets he used as deafness consumed his hearing.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1584811644165-33db3b146db5?w=800&h=600&fit=crop",
    day: 6,
    storyBody: [
      "Ludwig van Beethoven was born in this modest Baroque house at Bonngasse 20 in December 1770. The family occupied a small room in the attic — the exact room, with its sloping ceiling and single window, can still be visited today.",
      "The museum holds over 150 original Beethoven items, including his last grand piano (an 1825 Graf), the ear trumpets crafted by Johann Nepomuk Mälzel, and a lock of hair confirmed by DNA analysis in 2023 to be authentically his. The hair analysis also revealed lead poisoning as a likely contributor to his ailments.",
      "In the intimate chamber music hall adjacent to the house, concerts are performed on period instruments. Hearing Beethoven's late quartets in a room steps from his birthplace, played on instruments of his era, is among the most affecting musical experiences the Rhine journey offers.",
    ],
    sources: ["Beethoven-Haus Bonn", "German National Tourist Board"],
  },
  {
    id: "poi-3",
    name: "Cologne Cathedral",
    category: "architecture",
    coordinates: [6.9580, 50.9413],
    teaser: "632 years to complete this Gothic marvel",
    storyExcerpt:
      "The Kölner Dom took 632 years to build — from 1248 to 1880. Its twin spires reach 157 metres, making it the tallest twin-spired church in the world. Miraculously, it survived 14 bombing raids during WWII, standing amid the ruins.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=800&h=600&fit=crop",
    day: 6,
    storyBody: [
      "Construction began in 1248, halted in 1473, and was not resumed until 1840 — when the original medieval plans were rediscovered. The cathedral was finally completed on 15 October 1880, 632 years after the first stone was laid, making it one of the longest building projects in human history.",
      "The twin spires reach 157.38 metres, making Cologne Cathedral the tallest twin-spired church in the world. For four years after completion, it was also the world's tallest structure — until the Washington Monument surpassed it in 1884.",
      "During World War II, the cathedral was hit by 14 aerial bombs but remained standing while the city around it was reduced to rubble. Historians believe Allied pilots used the conspicuous spires as a navigation landmark, inadvertently preserving the very structure they flew over. Today it receives six million visitors annually — more than any other German landmark.",
    ],
    sources: ["UNESCO World Heritage Centre", "Cologne Cathedral Chapter"],
  },
  {
    id: "poi-8",
    name: "Düsseldorf Altstadt",
    category: "food",
    coordinates: [6.7735, 51.2277],
    teaser: "The longest bar counter in the world",
    storyExcerpt:
      "With over 260 bars, pubs, and restaurants packed into half a square kilometre, Düsseldorf's Old Town has earned its legendary nickname. The local Altbier — a copper-coloured top-fermented ale — is served in small 200ml glasses by swift Köbes waiters.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1577019027784-4a9f5e895a72?w=800&h=600&fit=crop",
    day: 6,
    storyBody: [
      "Düsseldorf's Altstadt packs over 260 bars, brewhouses, and restaurants into half a square kilometre, earning it the nickname 'die längste Theke der Welt' — the longest bar counter in the world. The concentration of drinking establishments per square metre is unmatched anywhere in Europe.",
      "The local speciality is Altbier, a copper-coloured, top-fermented ale brewed according to a recipe predating lager. It is served in small 200ml cylindrical glasses called 'Stangen' by waiters known as 'Köbes' — notoriously brusque characters who replace your empty glass with a full one without being asked, marking each round on your beer mat.",
      "Beyond the bars, the Altstadt harbours genuine cultural weight. The Kunstsammlung Nordrhein-Westfalen houses one of Europe's finest collections of modern art, and the Heinrich-Heine-Institut honours the poet who was born here in 1797 — the same Heine who immortalised the Loreley upstream.",
    ],
    sources: ["Düsseldorf Tourism", "German Brewers' Association"],
  },

  // ===== DAY 7 — Netherlands =====
  {
    id: "poi-24",
    name: "Arnhem Bridge",
    category: "history",
    coordinates: [5.9118, 51.9785],
    teaser: "A Bridge Too Far — the WWII battle site",
    storyExcerpt:
      "The John Frost Bridge in Arnhem was the 'bridge too far' of Operation Market Garden in September 1944. British paratroopers held the northern end for four days against overwhelming German forces in one of the war's most heroic and tragic engagements.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=75",
    day: 7,
    storyBody: [
      "On 17 September 1944, British paratroopers of the 1st Airborne Division landed near Arnhem as part of Operation Market Garden — the largest airborne operation in history. Their objective: seize the bridge over the Lower Rhine and hold it until ground forces arrived.",
      "Lieutenant Colonel John Frost and approximately 740 men reached the bridge and held its northern end for four days against two SS Panzer divisions. Of the 10,600 men who landed at Arnhem, only 2,398 escaped back across the Rhine. The bridge was, as Field Marshal Montgomery's critics observed, 'a bridge too far.'",
      "The rebuilt bridge was renamed the John Frost Bridge in 1977. The Airborne Museum at nearby Oosterbeek, housed in the former Hartenstein Hotel that served as divisional headquarters, tells the full story. Each September, Arnhem holds a memorial march that draws thousands of participants.",
    ],
    sources: ["Airborne Museum Hartenstein", "Commonwealth War Graves Commission"],
  },
  {
    id: "poi-25",
    name: "Kinderdijk Windmills",
    category: "engineering",
    coordinates: [4.6400, 51.8833],
    teaser: "Nineteen windmills in a UNESCO landscape",
    storyExcerpt:
      "Kinderdijk's 19 windmills, built around 1740, form the largest concentration of historic windmills in the Netherlands. This UNESCO site demonstrates the Dutch genius for water management that made habitation of the low-lying polders possible.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=800&h=600&fit=crop",
    day: 7,
    storyBody: [
      "The 19 windmills of Kinderdijk were built between 1738 and 1740 as part of a water management system that kept the Alblasserwaard polder from flooding. Each mill could pump water up to a higher canal, working in sequence to lift water several metres from the low-lying farmland to the river.",
      "The name Kinderdijk — 'children's dike' — may derive from a legend about the great St. Elizabeth's flood of 1421, when a cradle with a baby and a cat was found floating against the dike. Whether true or not, the story captures the Dutch relationship with water: constant vigilance against an ever-present threat.",
      "UNESCO inscribed Kinderdijk in 1997 as 'an outstanding man-made landscape that bears testimony to human ingenuity and grit.' Two of the mills are open to visitors, and on summer Saturdays all 19 are set turning — their sails casting moving shadows across the polder in a spectacle unchanged for nearly three centuries.",
    ],
    sources: ["UNESCO World Heritage Centre", "Kinderdijk Foundation"],
  },
  {
    id: "poi-26",
    name: "Amsterdam Canal Ring",
    category: "culture",
    coordinates: [4.8952, 52.3702],
    teaser: "Journey's end — Amsterdam's Golden Age canals",
    storyExcerpt:
      "Your Rhine journey concludes in Amsterdam, where the 17th-century Canal Ring — a UNESCO World Heritage site — encircles the old city in concentric semicircles. Over 1,500 monumental buildings line 100 kilometres of canals spanned by 1,753 bridges.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    day: 7,
    storyBody: [
      "Amsterdam's Canal Ring was dug during the Dutch Golden Age, between 1613 and 1662, as both a drainage system and an address of prestige. The three main canals — Herengracht, Keizersgracht, and Prinsengracht — curve in concentric semicircles around the medieval city, creating a plan that is both practical and beautiful.",
      "Over 1,500 monumental buildings line the canals, their narrow facades dictated by a 17th-century tax based on frontage width. The result is one of the most uniform and elegant cityscapes in Europe — a continuous wall of gabled brick facades reflected in still water.",
      "Arriving in Amsterdam by water, as your Rhine cruise does, is to approach the city as it was designed to be entered. The transition from broad river to intimate canal, from open landscape to dense urbanism, encapsulates the entire journey: from nature to civilisation, from ancient legend to modern life.",
    ],
    sources: ["UNESCO World Heritage Centre", "Amsterdam Canal District Foundation"],
  },
];
