import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_POIS, type POI } from "@/data/mock-route";
import { CuratedMap } from "@/components/map/CuratedMap";
import { DemoOverlay, type DemoStep } from "@/components/demo/DemoOverlay";
import { DemoControls } from "@/components/demo/DemoControls";

/** Hand-picked POIs for the guided demo */
const DEMO_POI_IDS = ["poi-1", "poi-20", "poi-4"];
const DEMO_POIS = MOCK_POIS.filter((p) => DEMO_POI_IDS.includes(p.id));

/** Primary guided POI — Loreley Rock */
const PRIMARY_POI_ID = "poi-1";

export default function DemoPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<DemoStep>(1);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const hasViewedFullStory = useRef(false);

  // Determine which POIs and highlight to show based on step
  const visiblePois = step <= 4 ? DEMO_POIS.filter((p) => p.id === PRIMARY_POI_ID) : DEMO_POIS;
  const highlightPoiId = step === 2 ? PRIMARY_POI_ID : undefined;

  const advance = useCallback(() => {
    setStep((s) => (s < 6 ? ((s + 1) as DemoStep) : s));
  }, []);

  const restart = useCallback(() => {
    setStep(1);
    setSelectedPoi(null);
    hasViewedFullStory.current = false;
  }, []);

  // Listen for returning from story page
  useEffect(() => {
    const handleFocus = () => {
      if (hasViewedFullStory.current && step === 4) {
        setStep(5);
        hasViewedFullStory.current = false;
      }
    };
    window.addEventListener("focus", handleFocus);
    // Also check on mount in case we came back via browser navigation
    if (hasViewedFullStory.current && step === 4) {
      setStep(5);
      hasViewedFullStory.current = false;
    }
    return () => window.removeEventListener("focus", handleFocus);
  }, [step]);

  // When user taps a marker (Quick Info opens) → advance from step 2 to 3
  const handlePoiSelect = useCallback(
    (poi: POI | null) => {
      setSelectedPoi(poi);
      if (poi && step === 2) {
        // Small delay so sheet opens first
        setTimeout(() => setStep(3), 400);
      }
    },
    [step]
  );

  // When Quick Info sheet expands → advance from step 3 to 4
  const handleSheetExpand = useCallback(() => {
    if (step === 3) {
      setTimeout(() => setStep(4), 300);
    }
  }, [step]);

  // When user taps "full story" → navigate with demo flag
  const handleFullStory = useCallback(() => {
    if (selectedPoi) {
      hasViewedFullStory.current = true;
      navigate(`/story/${selectedPoi.id}?from=demo`);
    }
  }, [selectedPoi, navigate]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <CuratedMap
        pois={visiblePois}
        highlightPoiId={highlightPoiId}
        onPoiSelect={handlePoiSelect}
        onSheetExpand={handleSheetExpand}
        onFullStory={handleFullStory}
        selectedPoi={selectedPoi}
        hideControls={step <= 1}
        demoMode
      />

      <DemoOverlay step={step} onAdvance={advance} />

      <DemoControls onRestart={restart} onExit={() => navigate("/")} />
    </div>
  );
}
