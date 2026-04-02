## 2024-05-24 - React useMemo array allocations
**Learning:** React state changes like selecting quiz answers trigger re-renders that can cause expensive synchronous data generation to rerun unnecessarily.
**Action:** Use useMemo to wrap data generation functions that depend on stable props to prevent reallocation and unnecessary calculations on subsequent renders caused by unrelated state changes.
