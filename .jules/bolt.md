## 2024-05-18 - [Optimizing chained array passes]
**Learning:** Consolidating sequential `.map()`, `.filter()`, and `.reduce()` chains into a single `for...of` pass reduces time complexity constant factors, but you must be careful to match the original type inference, such as using `undefined` instead of `null` when replacing `.find()`, to avoid breaking strict TypeScript expectations downstream.
**Action:** When converting array iterators to loops for performance, explicitly declare the loop variables with the exact same types that the original array methods returned.

## 2024-04-14 - Optimizing Array Processing Pipelines
**Learning:** Chained array methods (`.map().filter()`) or methods that force full iteration (`.filter()`) on relatively large static arrays (like skill lists) create unnecessary intermediate objects and wasted iterations.
**Action:** When searching for a limited number of results (e.g., top 8), use single-pass `for...of` loops with early exits (`break`) to avoid scanning the entire array, and consolidate mapping and filtering to prevent short-lived object allocations.
