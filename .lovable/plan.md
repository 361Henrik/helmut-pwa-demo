

## Plan: Add Mapbox Token to CuratedMap

Since Mapbox tokens are **publishable client-side keys** (not secrets), it's safe to embed directly in code.

### Change
Update `src/components/map/CuratedMap.tsx` line 17 — replace the placeholder token with the real one:
```
pk.eyJ1IjoiaGVucmlrMzYxIiwiYSI6ImNtbXluN3BnejM0cW4ycXF0N3lkeWs4dmwifQ.gTD21EnpHl9W-a5VgFhyJQ
```

This single change will make the map render immediately.

