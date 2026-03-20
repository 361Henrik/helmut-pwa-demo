import mapboxgl from "mapbox-gl";
import { ROUTE_COORDINATES } from "@/data/mock-route";

/**
 * Generate a simplified corridor polygon around the route.
 * Uses a fixed lng/lat offset (~15km) to create a buffer.
 * Returns [outerRing, innerRing] for an inverted polygon mask.
 */
function generateCorridorPolygon(): [number, number][][] {
  const OFFSET = 0.15; // ~15km at these latitudes

  // Build left and right offset paths
  const leftPath: [number, number][] = [];
  const rightPath: [number, number][] = [];

  for (let i = 0; i < ROUTE_COORDINATES.length; i++) {
    const [lng, lat] = ROUTE_COORDINATES[i];

    // Compute perpendicular direction from segment
    let dx = 0, dy = 1;
    if (i < ROUTE_COORDINATES.length - 1) {
      dx = ROUTE_COORDINATES[i + 1][0] - lng;
      dy = ROUTE_COORDINATES[i + 1][1] - lat;
    } else if (i > 0) {
      dx = lng - ROUTE_COORDINATES[i - 1][0];
      dy = lat - ROUTE_COORDINATES[i - 1][1];
    }
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    // Perpendicular: rotate 90°
    const nx = -dy / len;
    const ny = dx / len;

    leftPath.push([lng + nx * OFFSET, lat + ny * OFFSET]);
    rightPath.push([lng - nx * OFFSET, lat - ny * OFFSET]);
  }

  // Inner ring: left path forward, then right path reversed, closed
  const innerRing: [number, number][] = [
    ...leftPath,
    ...rightPath.reverse(),
    leftPath[0], // close the ring
  ];

  // Outer ring: world bounds
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

  // Upcoming route (warm grey)
  if (!map.getLayer("route-upcoming")) {
    map.addLayer({
      id: "route-upcoming",
      type: "line",
      source: "route",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": "#B8B0A4",
        "line-width": 3,
        "line-opacity": 0.6,
      },
    });
  }

  // Active route (deep green)
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
