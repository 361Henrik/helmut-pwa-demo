import { useEffect, useRef, useState } from "react";

/**
 * Generative ambient river/wind bed via Web Audio API.
 * Two filtered noise layers + a slow LFO create a hushed, breathing texture
 * with no external audio assets. Exposes a live amplitude value for
 * visualizations (waveforms).
 */
export function useAmbientBed(active: boolean, paused: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const rafRef = useRef<number | null>(null);
  const [amplitude, setAmplitude] = useState(0);
  const [enabled, setEnabled] = useState(false);

  // Build the graph once
  const ensureGraph = () => {
    if (ctxRef.current) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    master.connect(analyser);
    analyser.connect(ctx.destination);

    // Pink-ish noise buffer
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + 0.0555 * white;
      b1 = 0.96 * b1 + 0.2 * white;
      b2 = 0.86 * b2 + 0.55 * white;
      data[i] = (b0 + b1 + b2) * 0.15;
    }

    // Layer 1 — low river hum
    const src1 = ctx.createBufferSource();
    src1.buffer = buffer;
    src1.loop = true;
    const lp1 = ctx.createBiquadFilter();
    lp1.type = "lowpass";
    lp1.frequency.value = 380;
    const g1 = ctx.createGain();
    g1.gain.value = 0.9;
    src1.connect(lp1).connect(g1).connect(master);

    // Layer 2 — airy wind wash
    const src2 = ctx.createBufferSource();
    src2.buffer = buffer;
    src2.loop = true;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = "bandpass";
    bp2.frequency.value = 1600;
    bp2.Q.value = 0.6;
    const g2 = ctx.createGain();
    g2.gain.value = 0.35;
    src2.connect(bp2).connect(g2).connect(master);

    // Slow LFO on wind gain — breathes
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain).connect(g2.gain);

    src1.start();
    src2.start();
    lfo.start();

    ctxRef.current = ctx;
    masterRef.current = master;
    analyserRef.current = analyser;
    nodesRef.current = [src1, src2, lp1, bp2, g1, g2, lfo, lfoGain];
  };

  // Amplitude loop
  useEffect(() => {
    if (!enabled) return;
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      setAmplitude(Math.min(1, Math.sqrt(sum / data.length) * 4));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  // React to active / paused
  useEffect(() => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const target = active && !paused ? 0.22 : 0;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.2);
  }, [active, paused, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const enable = () => {
    ensureGraph();
    const ctx = ctxRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume();
    setEnabled(true);
  };

  return { amplitude, enable, enabled };
}
