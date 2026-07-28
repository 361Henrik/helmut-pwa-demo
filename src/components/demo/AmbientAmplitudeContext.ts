import { createContext, useContext } from "react";

/** Live amplitude (0–1) of the ambient audio bed, shared to visualizations. */
export const AmbientAmplitudeContext = createContext<number>(0);
export const useAmbientAmplitude = () => useContext(AmbientAmplitudeContext);
