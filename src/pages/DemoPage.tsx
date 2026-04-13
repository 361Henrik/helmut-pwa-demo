import { useState, useCallback, useRef } from "react";
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

  const getInitialStep = (): DemoStep => {
    const saved = sessionStorage.getItem("demo-step");
    if (saved) {
      sessionStorage.removeItem("demo-step");
      const parsed = Number(saved) as DemoStep;
      if (parsed >= 1 && parsed <= 6) return parsed;
    }
    return 1;
  };

  const [step, setStep] = useState<DemoStep>(getInitialStep);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [paused, setPaused] = useState(false);
  const [autoExpandSheet, setAutoExpandSheet] = useState(false);

  const visiblePois = step <= 4 ? DEMO_POIS.filter((p) => p.id === PRIMARY_POI_ID) : DEMO_POIS;
  const highlightPoiId = step === 2 && !paused ? PRIMARY_POI_ID : undefined;

  const advance = useCallback(() => {
    setStep((s) => (s < 6 ? ((s + 1) as DemoStep) : s));
  }, []);

  const restart = useCallback(() => {
    setStep(1);
    setSelectedPoi(null);
    setPaused(false);
    setAutoExpandSheet(false);
  }, []);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  const handlePoiSelect = useCallback(
    (poi: POI | null) => {
      setSelectedPoi(poi);
      if (poi && step === 2) {
        setTimeout(() => setStep(3), 400);
      }
    },
    [step]
  );

  const handleSheetExpand = useCallback(() => {
    if (step === 3) {
      setAutoExpandSheet(false);
      setTimeout(() => setStep(4), 300);
    }
  }, [step]);

  const handleFullStory = useCallback(() => {
    if (selectedPoi) {
      sessionStorage.setItem("demo-step", "5");
      navigate(`/story/${selectedPoi.id}?from=demo`);
    }
  }, [selectedPoi, navigate]);

  // Auto-simulate: tap the primary POI marker after timeout
  const autoTap = useCallback(() => {
    const poi = DEMO_POIS.find((p) => p.id === PRIMARY_POI_ID);
    if (poi) {
      setSelectedPoi(poi);
      setTimeout(() => setStep(3), 400);
    }
  }, []);

  // Auto-simulate: expand the sheet after timeout
  const autoExpand = useCallback(() => {
    setAutoExpandSheet(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-border/40">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${(step / 6) * 100}%`,
            backgroundColor: "hsl(40 46% 53%)",
          }}
        />
      </div>
      <CuratedMap
        pois={visiblePois}
        highlightPoiId={highlightPoiId}
        onPoiSelect={handlePoiSelect}
        onSheetExpand={handleSheetExpand}
        onFullStory={handleFullStory}
        selectedPoi={selectedPoi}
        hideControls={step <= 1}
        autoExpandSheet={autoExpandSheet}
        demoMode
      />

      <DemoOverlay
        step={step}
        onAdvance={advance}
        paused={paused}
        onRestart={restart}
        onAutoTap={autoTap}
        onAutoExpand={autoExpand}
      />

      {step < 6 && (
        <DemoControls onRestart={restart} paused={paused} onTogglePause={togglePause} />
      )}
    </div>
  );
}
