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
}

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

/** Rhine cruise: Basel → Amsterdam segment */
export const ROUTE_COORDINATES: [number, number][] = [
  [7.5886, 47.5596],   // Basel
  [7.6261, 47.6338],   // Rheinfelden
  [7.7521, 47.7600],   // Bad Säckingen
  [7.8942, 47.8537],   // Waldshut
  [8.2242, 47.6985],   // Schaffhausen
  [8.5391, 47.6656],   // Stein am Rhein
  [8.8465, 47.6618],   // Konstanz
  [8.4044, 48.2667],   // Tuttlingen
  [7.7689, 48.0035],   // Breisach
  [7.5886, 48.5734],   // Strasbourg
  [8.2317, 49.0069],   // Speyer
  [8.4660, 49.4875],   // Mannheim
  [8.2473, 49.9929],   // Mainz
  [7.9050, 50.0874],   // Rüdesheim
  [7.7285, 50.1420],   // Bacharach
  [7.5889, 50.1970],   // St. Goar (Loreley)
  [7.5985, 50.3569],   // Koblenz
  [7.1620, 50.4238],   // Bad Breisig
  [7.0984, 50.6394],   // Bonn
  [6.9603, 50.9375],   // Köln
  [6.7735, 51.2277],   // Düsseldorf
  [6.7625, 51.4332],   // Duisburg
  [6.1431, 51.8126],   // Emmerich
  [5.9167, 51.9667],   // Arnhem
  [4.8952, 52.3702],   // Amsterdam
];

/** Vessel starts mid-route at Mainz heading north */
export const VESSEL_POSITION: [number, number] = [8.2473, 49.9929];
export const VESSEL_HEADING = 330; // degrees, roughly NNW

export const MOCK_POIS: POI[] = [
  {
    id: "poi-1",
    name: "Loreley Rock",
    category: "legends",
    coordinates: [7.5889, 50.1970],
    teaser: "The legendary siren cliff of the Rhine",
    storyExcerpt: "Rising 120 metres above the waterline, the Loreley has inspired poets, painters, and composers for centuries. Heinrich Heine's 1824 poem immortalised the golden-haired maiden whose song lured sailors to their doom on the treacherous narrows below.",
    thumbnailUrl: "https://images.unsplash.com/photo-1588002171910-4a4a2e653e11?w=400&h=300&fit=crop",
  },
  {
    id: "poi-2",
    name: "Koblenz Deutsches Eck",
    category: "history",
    coordinates: [7.5985, 50.3569],
    teaser: "Where the Moselle meets the Rhine",
    storyExcerpt: "The German Corner marks the dramatic confluence of two great European rivers. The monumental equestrian statue of Kaiser Wilhelm I, destroyed in 1945 and rebuilt in 1993, towers over the headland as a symbol of German reunification.",
    thumbnailUrl: "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400&h=300&fit=crop",
  },
  {
    id: "poi-3",
    name: "Cologne Cathedral",
    category: "architecture",
    coordinates: [6.9603, 50.9375],
    teaser: "632 years to complete this Gothic marvel",
    storyExcerpt: "The Kölner Dom took 632 years to build — from 1248 to 1880. Its twin spires reach 157 metres, making it the tallest twin-spired church in the world. Miraculously, it survived 14 bombing raids during WWII, standing amid the ruins.",
    thumbnailUrl: "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?w=400&h=300&fit=crop",
  },
  {
    id: "poi-4",
    name: "Rüdesheim Wine Town",
    category: "food",
    coordinates: [7.9050, 50.0874],
    teaser: "The heart of Rheingau wine country",
    storyExcerpt: "Nestled at the southern entrance of the Rhine Gorge, Rüdesheim has been the capital of Rheingau Riesling since Roman times. The famous Drosselgasse alley is barely two metres wide but overflows with wine taverns and live music.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    id: "poi-5",
    name: "Bacharach Old Town",
    category: "culture",
    coordinates: [7.7285, 50.1420],
    teaser: "A medieval gem frozen in time",
    storyExcerpt: "Victor Hugo called Bacharach one of the most beautiful towns on the Rhine. Its half-timbered houses, Gothic chapel ruins, and Stahleck Castle perched above create a picture so perfect it seems painted rather than built.",
    thumbnailUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
  },
  {
    id: "poi-6",
    name: "Speyer Cathedral",
    category: "architecture",
    coordinates: [8.2317, 49.0069],
    teaser: "The largest Romanesque church in the world",
    storyExcerpt: "Built in 1030, Speyer Cathedral is the largest surviving Romanesque church. Four Holy Roman Emperors are buried in its crypt. The massive nave, with its alternating pillars and columns, creates a rhythm of light and shadow.",
    thumbnailUrl: "https://images.unsplash.com/photo-1548585744-56de0e62f0ef?w=400&h=300&fit=crop",
  },
  {
    id: "poi-7",
    name: "Rhine Gorge Vineyards",
    category: "nature",
    coordinates: [7.6500, 50.1700],
    teaser: "Steep terraced slopes of the UNESCO valley",
    storyExcerpt: "The Upper Middle Rhine Valley's impossibly steep vineyard terraces have been cultivated since Roman times. Some slopes angle at 70 degrees — harvesting is done entirely by hand, making these among the most labour-intensive wines on Earth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
  },
  {
    id: "poi-8",
    name: "Düsseldorf Altstadt",
    category: "food",
    coordinates: [6.7735, 51.2277],
    teaser: "The longest bar counter in the world",
    storyExcerpt: "With over 260 bars, pubs, and restaurants packed into half a square kilometre, Düsseldorf's Old Town has earned its legendary nickname. The local Altbier — a copper-coloured top-fermented ale — is served in small 200ml glasses by swift Köbes waiters.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  {
    id: "poi-9",
    name: "Marksburg Castle",
    category: "history",
    coordinates: [7.6500, 50.2700],
    teaser: "The only undefeated hill castle on the Rhine",
    storyExcerpt: "Perched 150 metres above the river, Marksburg is the only hill castle on the Rhine never destroyed. Its medieval kitchen, armoury, and torture chamber remain intact — a rare window into 700 years of fortress life along the busiest waterway in Europe.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581351123004-757df0faaab2?w=400&h=300&fit=crop",
  },
  {
    id: "poi-10",
    name: "Bonn Beethoven House",
    category: "art",
    coordinates: [7.0984, 50.6394],
    teaser: "Where the maestro drew his first breath",
    storyExcerpt: "Ludwig van Beethoven was born in this modest Baroque house in 1770. The museum holds the largest Beethoven collection in the world, including his last grand piano and the ear trumpets he used as deafness consumed his hearing.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop",
  },
];
