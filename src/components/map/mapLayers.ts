import mapboxgl from "mapbox-gl";
import { ROUTE_COORDINATES, MOCK_POIS } from "@/data/mock-route";

/**
 * Generate a simplified corridor polygon around the route.
 * Uses a fixed lng/lat offset (~15km) to create a buffer.
 * Returns [outerRing, innerRing] for an inverted polygon mask.
 */
function generateCorridorPolygon(): [number, number][][] {
  const OFFSET = 0.15; // ~15km at these latitudes

  const leftPath: [number, number][] = [];
  const rightPath: [number, number][] = [];

  for (let i = 0; i < ROUTE_COORDINATES.length; i++) {
    const [lng, lat] = ROUTE_COORDINATES[i];

    let dx = 0, dy = 1;
    if (i < ROUTE_COORDINATES.length - 1) {
      dx = ROUTE_COORDINATES[i + 1][0] - lng;
      dy = ROUTE_COORDINATES[i + 1][1] - lat;
    } else if (i > 0) {
      dx = lng - ROUTE_COORDINATES[i - 1][0];
      dy = lat - ROUTE_COORDINATES[i - 1][1];
    }
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    leftPath.push([lng + nx * OFFSET, lat + ny * OFFSET]);
    rightPath.push([lng - nx * OFFSET, lat - ny * OFFSET]);
  }

  const innerRing: [number, number][] = [
    ...leftPath,
    ...rightPath.reverse(),
    leftPath[0],
  ];

  const outerRing: [number, number][] = [
    [-180, -90],
    [180, -90],
    [180, 90],
    [-180, 90],
    [-180, -90],
  ];

  return [outerRing, innerRing];
}

/**
 * Compute padded bounds from the route coordinates.
 */
export function getRouteBounds(padding = 0.5): mapboxgl.LngLatBounds {
  let minLng = Infinity, maxLng = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;

  for (const [lng, lat] of ROUTE_COORDINATES) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  return new mapboxgl.LngLatBounds(
    [minLng - padding, minLat - padding],
    [maxLng + padding, maxLat + padding]
  );
}

/**
 * Build a GeoJSON FeatureCollection from POIs for clustering.
 */
export function buildPoiFeatureCollection(): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: MOCK_POIS.map((poi) => ({
      type: "Feature" as const,
      properties: {
        id: poi.id,
        name: poi.name,
        category: poi.category,
      },
      geometry: {
        type: "Point" as const,
        coordinates: poi.coordinates,
      },
    })),
  };
}

/**
 * Add all custom sources and layers to the map.
 * Called on initial load AND after style changes.
 */
export function addRouteLayers(map: mapboxgl.Map) {
  // --- Corridor mask (inverted polygon) ---
  const [outerRing, innerRing] = generateCorridorPolygon();

  if (!map.getSource("corridor-mask")) {
    map.addSource("corridor-mask", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [outerRing, innerRing],
        },
      },
    });
  }

  if (!map.getLayer("corridor-mask-fill")) {
    map.addLayer({
      id: "corridor-mask-fill",
      type: "fill",
      source: "corridor-mask",
      paint: {
        "fill-color": "#FFFFFF",
        "fill-opacity": 0.45,
      },
    });
  }

  // --- Route line ---
  if (!map.getSource("route")) {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: ROUTE_COORDINATES,
        },
      },
    });
  }

  if (!map.getLayer("route-upcoming")) {
    map.addLayer({
      id: "route-upcoming",
      type: "line",
      source: "route",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#B8B0A4",
        "line-width": 4,
        "line-opacity": 0.5,
        "line-blur": 2,
      },
    });
  }

  if (!map.getLayer("route-active")) {
    map.addLayer({
      id: "route-active",
      type: "line",
      source: "route",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#1F4A3A",
        "line-width": 4,
      },
    });
  }

  // --- POI clusters ---
  if (!map.getSource("pois-cluster")) {
    map.addSource("pois-cluster", {
      type: "geojson",
      data: buildPoiFeatureCollection(),
      cluster: true,
      clusterRadius: 50,
      clusterMaxZoom: 11,
    });
  }

  if (!map.getLayer("cluster-circles")) {
    map.addLayer({
      id: "cluster-circles",
      type: "circle",
      source: "pois-cluster",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": "#1F4A3A",
        "circle-radius": 24,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#F6F3EE",
      },
    });
  }

  if (!map.getLayer("cluster-count")) {
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "pois-cluster",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 15,
      },
      paint: {
        "text-color": "#F6F3EE",
      },
    });
  }

  // Custom water/land colors
  try {
    map.setPaintProperty("water", "fill-color", "#D4E4ED");
    if (map.getLayer("land")) {
      map.setPaintProperty("land", "background-color", "#F0EDE8");
    }
  } catch {
    // Layers may not exist in all styles
  }
}
