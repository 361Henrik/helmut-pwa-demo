import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  VESSEL_POSITION,
  MOCK_POIS,
  type POI,
  type POICategory,
} from "@/data/mock-route";
import { CATEGORY_SVG_ICONS } from "./mapIcons";
import { addRouteLayers, getRouteBounds } from "./mapLayers";
import { MapControls } from "./MapControls";
import { QuickInfoSheet } from "./QuickInfoSheet";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGVucmlrMzYxIiwiYSI6ImNtbXluN3BnejM0cW4ycXF0N3lkeWs4dmwifQ.gTD21EnpHl9W-a5VgFhyJQ";

/** Zoom threshold: above this, show individual DOM markers; below, show clusters */
const CLUSTER_ZOOM_THRESHOLD = 10;
const PROXIMITY_KM = 50;

function haversineKm(
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number]
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface CuratedMapProps {
  activeCategories?: POICategory[];
}

export function CuratedMap({ activeCategories = [] }: CuratedMapProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const markerCategoryRef = useRef<Map<mapboxgl.Marker, POICategory>>(new Map());
  const markerCoordsRef = useRef<Map<mapboxgl.Marker, [number, number]>>(new Map());
  const vesselMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const routeBounds = useRef(getRouteBounds(0.5));

  /** Update DOM marker visibility based on zoom + active filters */
  const updateMarkerVisibility = useCallback(
    (zoom: number) => {
      const showDom = zoom >= CLUSTER_ZOOM_THRESHOLD;
      markersRef.current.forEach((marker) => {
        const cat = markerCategoryRef.current.get(marker);
        const catVisible =
          activeCategories.length === 0 || (cat && activeCategories.includes(cat));
        marker.getElement().style.display =
          showDom && catVisible ? "flex" : "none";
      });
    },
    [activeCategories]
  );

  /** Create all POI markers and the vessel marker */
  const createMarkers = useCallback(
    (map: mapboxgl.Map) => {
      // Clear existing
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      markerCategoryRef.current.clear();
      vesselMarkerRef.current?.remove();

      // POI markers (48×48)
      MOCK_POIS.forEach((poi) => {
        const el = document.createElement("div");
        el.className = "curated-marker";
        el.innerHTML = CATEGORY_SVG_ICONS[poi.category] || "";
        el.style.cssText = `
          width: 48px; height: 48px;
          background: hsl(37 31% 95%);
          border: 2.5px solid hsl(120 9% 11%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: border-color 0.3s, box-shadow 0.3s;
          color: hsl(158 41% 21%);
        `;

        el.addEventListener("mouseenter", () => {
          el.style.borderColor = "hsl(40 46% 53%)";
          el.style.boxShadow = "0 2px 12px hsla(40,46%,53%,0.4)";
        });
        el.addEventListener("mouseleave", () => {
          if (selectedPoi?.id !== poi.id) {
            el.style.borderColor = "hsl(120 9% 11%)";
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
          }
        });

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelectedPoi(poi);
          markersRef.current.forEach((m) => {
            const mEl = m.getElement();
            mEl.style.borderColor = "hsl(120 9% 11%)";
            mEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
          });
          el.style.borderColor = "hsl(40 46% 53%)";
          el.style.boxShadow = "0 2px 12px hsla(40,46%,53%,0.4)";
          map.flyTo({ center: poi.coordinates, zoom: 11, duration: 800 });
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(poi.coordinates)
          .addTo(map);

        markersRef.current.push(marker);
        markerCategoryRef.current.set(marker, poi.category);
      });

      // Vessel marker with pulse
      const vesselContainer = document.createElement("div");
      vesselContainer.className = "vessel-marker-container";
      vesselContainer.innerHTML = `
        <div class="vessel-pulse-ring"></div>
        <div class="vessel-dot"></div>
        <div class="vessel-label">You are here</div>
      `;

      vesselMarkerRef.current = new mapboxgl.Marker({ element: vesselContainer })
        .setLngLat(VESSEL_POSITION)
        .addTo(map);

      // Set initial DOM marker visibility
      updateMarkerVisibility(map.getZoom());
    },
    [selectedPoi, updateMarkerVisibility]
  );

  const initMap = useCallback(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      const bounds = routeBounds.current;

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        bounds: bounds,
        fitBoundsOptions: { padding: 40 },
        minZoom: 5.5,
        maxZoom: 16,
        maxBounds: getRouteBounds(1.0),
        attributionControl: false,
        pitchWithRotate: false,
      });

      map.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        "bottom-left"
      );

      const setupMap = () => {
        addRouteLayers(map);
        createMarkers(map);
        setMapReady(true);
      };

      map.on("load", setupMap);

      // Re-add layers after style change
      map.on("style.load", () => {
        if (mapReady || map.isStyleLoaded()) {
          addRouteLayers(map);
        }
      });

      // Zoom-based cluster/marker toggle
      map.on("zoom", () => {
        updateMarkerVisibility(map.getZoom());

        // Toggle cluster layer visibility
        const showClusters = map.getZoom() < CLUSTER_ZOOM_THRESHOLD;
        try {
          if (map.getLayer("cluster-circles")) {
            map.setLayoutProperty(
              "cluster-circles",
              "visibility",
              showClusters ? "visible" : "none"
            );
          }
          if (map.getLayer("cluster-count")) {
            map.setLayoutProperty(
              "cluster-count",
              "visibility",
              showClusters ? "visible" : "none"
            );
          }
        } catch {
          // layers may not exist yet
        }
      });

      // Click on cluster → zoom in
      map.on("click", "cluster-circles", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["cluster-circles"],
        });
        if (!features.length) return;
        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("pois-cluster") as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geometry = features[0].geometry;
          if (geometry.type === "Point") {
            map.easeTo({
              center: geometry.coordinates as [number, number],
              zoom: zoom ?? CLUSTER_ZOOM_THRESHOLD,
            });
          }
        });
      });

      // Cursor on clusters
      map.on("mouseenter", "cluster-circles", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "cluster-circles", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("error", (e) => {
        console.error("Mapbox error:", e);
        const status = (e.error as unknown as { status?: number })?.status;
        if (status === 401 || status === 403) {
          setTokenError(true);
        }
      });

      mapRef.current = map;
    } catch (err) {
      console.error("Map init error:", err);
      setTokenError(true);
    }
  }, [createMarkers, mapReady, updateMarkerVisibility]);

  useEffect(() => {
    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [initMap]);

  // Filter markers by active categories
  useEffect(() => {
    if (mapRef.current) {
      updateMarkerVisibility(mapRef.current.getZoom());
    }
  }, [activeCategories, updateMarkerVisibility]);

  const handleRecenter = () => {
    mapRef.current?.fitBounds(routeBounds.current, {
      padding: 40,
      duration: 1000,
    });
  };

  const handleToggleStyle = () => {
    if (!mapRef.current) return;
    const current = mapRef.current.getStyle().name;
    const nextStyle =
      current === "Mapbox Light"
        ? "mapbox://styles/mapbox/outdoors-v12"
        : "mapbox://styles/mapbox/light-v11";
    mapRef.current.setStyle(nextStyle);
  };

  const handleCloseSheet = () => {
    setSelectedPoi(null);
    markersRef.current.forEach((m) => {
      const mEl = m.getElement();
      mEl.style.borderColor = "hsl(120 9% 11%)";
      mEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    });
  };

  if (tokenError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-space-4 bg-background px-space-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card">
          <span className="text-2xl">🗺️</span>
        </div>
        <h2 className="font-display text-xl font-medium text-foreground">
          Map Configuration Needed
        </h2>
        <p className="max-w-xs text-center text-body-small text-muted-foreground">
          A Mapbox access token is required to display the interactive map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={containerRef} className="h-full w-full" />

      {mapReady && (
        <MapControls
          onRecenter={handleRecenter}
          onToggleStyle={handleToggleStyle}
        />
      )}

      <QuickInfoSheet
        poi={selectedPoi}
        onClose={handleCloseSheet}
        onExpand={() => {
          if (selectedPoi) {
            navigate(`/story/${selectedPoi.id}`);
          }
        }}
      />
    </div>
  );
}
