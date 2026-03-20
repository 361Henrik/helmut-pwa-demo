import { useEffect, useRef, useCallback, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  ROUTE_COORDINATES,
  VESSEL_POSITION,
  MOCK_POIS,
  type POI,
} from "@/data/mock-route";
import { MapControls } from "./MapControls";
import { QuickInfoSheet } from "./QuickInfoSheet";

/** Free public token — replace with operator token in production */
const MAPBOX_TOKEN =
  "pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtOTdvMXJzbTAyczQya3M4dm15c3BreXoifQ.placeholder";

/** Category icon mapping to simple unicode for markers */
const CATEGORY_ICONS: Record<string, string> = {
  history: "🏛",
  nature: "🌿",
  architecture: "⛪",
  culture: "🎭",
  food: "🍷",
  engineering: "⚙",
  legends: "✨",
  wildlife: "🦅",
  art: "🎵",
  "hidden-gem": "💎",
};

export function CuratedMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const initMap = useCallback(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: VESSEL_POSITION,
        zoom: 8,
        minZoom: 5,
        maxZoom: 16,
        attributionControl: false,
        pitchWithRotate: false,
      });

      map.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        "bottom-left"
      );

      map.on("load", () => {
        // Custom map styling overrides
        try {
          // Water color
          map.setPaintProperty("water", "fill-color", "#D4E4ED");
          // Land color
          if (map.getLayer("land")) {
            map.setPaintProperty("land", "background-color", "#F0EDE8");
          }
        } catch {
          // Some layers may not exist in the style
        }

        // Route line
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

        // Upcoming route (warm grey)
        map.addLayer({
          id: "route-upcoming",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#B8B0A4",
            "line-width": 3,
            "line-opacity": 0.6,
          },
        });

        // Active route (deep green)
        map.addLayer({
          id: "route-active",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#1F4A3A",
            "line-width": 4,
          },
        });

        // POI Markers
        MOCK_POIS.forEach((poi) => {
          const el = document.createElement("div");
          el.className = "curated-marker";
          el.innerHTML = `<span class="curated-marker-icon">${CATEGORY_ICONS[poi.category] || "📍"}</span>`;
          el.style.cssText = `
            width: 40px; height: 40px;
            background: white;
            border: 2px solid #1A1F1A;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: border-color 0.3s, box-shadow 0.3s;
            font-size: 18px;
          `;

          el.addEventListener("mouseenter", () => {
            el.style.borderColor = "#C9A962";
            el.style.boxShadow = "0 2px 12px rgba(201,169,98,0.4)";
          });
          el.addEventListener("mouseleave", () => {
            if (selectedPoi?.id !== poi.id) {
              el.style.borderColor = "#1A1F1A";
              el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
            }
          });

          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelectedPoi(poi);
            // Bronze ring on selected
            markersRef.current.forEach((m) => {
              const mEl = m.getElement();
              mEl.style.borderColor = "#1A1F1A";
              mEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
            });
            el.style.borderColor = "#C9A962";
            el.style.boxShadow = "0 2px 12px rgba(201,169,98,0.4)";

            map.flyTo({ center: poi.coordinates, zoom: 11, duration: 800 });
          });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(poi.coordinates)
            .addTo(map);

          markersRef.current.push(marker);
        });

        // Vessel position marker
        const vesselEl = document.createElement("div");
        vesselEl.style.cssText = `
          width: 16px; height: 16px;
          background: #1F4A3A;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 2px #1F4A3A, 0 2px 8px rgba(0,0,0,0.3);
        `;

        new mapboxgl.Marker({ element: vesselEl })
          .setLngLat(VESSEL_POSITION)
          .addTo(map);

        setMapReady(true);
      });

      map.on("error", (e) => {
        console.error("Mapbox error:", e);
        const err = e.error as Record<string, unknown> | undefined;
        if (err?.status === 401 || err?.status === 403) {
          setTokenError(true);
        }
      });

      mapRef.current = map;
    } catch (err) {
      console.error("Map init error:", err);
      setTokenError(true);
    }
  }, []);

  useEffect(() => {
    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, [initMap]);

  const handleRecenter = () => {
    mapRef.current?.flyTo({
      center: VESSEL_POSITION,
      zoom: 8,
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
    // Reset all marker styles
    markersRef.current.forEach((m) => {
      const mEl = m.getElement();
      mEl.style.borderColor = "#1A1F1A";
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
          Please add your token to the project secrets as{" "}
          <code className="rounded bg-card px-1.5 py-0.5 text-xs">
            MAPBOX_TOKEN
          </code>
          .
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
          // Phase 4: navigate to full story screen
          console.log("Expand to full story:", selectedPoi?.id);
        }}
      />
    </div>
  );
}
