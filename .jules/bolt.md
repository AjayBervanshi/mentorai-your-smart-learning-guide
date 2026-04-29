## 2024-05-18 - [Avoid any micro optimizations unless they are measurable]
**Learning:** Micro optimizations are generally not worth it without metrics. Focus on caching and avoiding O(N^2) instead of micro things like variable swapping.
**Action:** Always measure.

## 2026-04-08 - [Batch Independent Supabase Queries]
**Learning:** Sequential Supabase queries during initial data loading (`loadUserData`) create a network waterfall, significantly delaying the application load time. This is a common performance bottleneck in architectures relying heavily on client-side Supabase calls.
**Action:** Always batch independent Supabase queries using `Promise.all()` to fetch data concurrently, reducing overall latency.
## 2024-06-11 - Batch Supabase Queries & Derive State Locally
**Learning:** Making independent sequential Supabase `.from()` queries causes noticeable network waterfalls, especially when reading from multiple related tables on component mount, or updating multiple tables upon user interaction.
**Action:** When executing independent database requests in Supabase, parallelize them by wrapping them in `Promise.all()`. Additionally, derive intermediate states locally from the global React Context rather than running redundant `SELECT` queries right before an `UPDATE`, to avoid unnecessary roundtrips.
## 2024-05-18 - [Optimizing chained array passes]
**Learning:** Consolidating sequential `.map()`, `.filter()`, and `.reduce()` chains into a single `for...of` pass reduces time complexity constant factors, but you must be careful to match the original type inference, such as using `undefined` instead of `null` when replacing `.find()`, to avoid breaking strict TypeScript expectations downstream.
**Action:** When converting array iterators to loops for performance, explicitly declare the loop variables with the exact same types that the original array methods returned.
## 2024-06-13 - [Optimize Keystroke Search Loops & Distance Allocations]
**Learning:** Running algorithms like Levenshtein distance during autocomplete keystrokes causes significant garbage collection overhead if allocating 2D arrays or new arrays per call. Chaining `.map()`, `.filter()`, and sorting on large datasets exacerbates this UI latency.
**Action:** When optimizing autocomplete search operations or algorithms running in tight loops, avoid dynamic array allocations by using single-array buffers (e.g., `Uint16Array(256)`). Replace chained array methods with single-pass loops utilizing early exits (e.g., length-threshold checks) to skip expensive distance computations and reduce GC pressure. When implementing length-threshold early exits for fuzzy matching, calculate the length difference for both raw strings and cleaned/normalized strings to prevent falsely skipping valid matches where special characters have been stripped.
