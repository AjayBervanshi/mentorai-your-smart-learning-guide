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
## 2024-05-24 - TypedArray Cache Overflow & Loop Short-Circuiting
**Learning:** When using TypedArrays (`Uint16Array`) for performance caching (like dynamic programming matrices), be wary of integer overflow for edge cases (max value 65535). Also, when adding early exits (`break`/`continue`) to distance-based search loops, ensure they don't inadvertently skip exact matches or bypass secondary string comparisons needed to calculate the true minimum distance.
**Action:** Use `Int32Array` for numeric caching where bounds might theoretically exceed 16-bit limits, even if unlikely. Rigorously review loop logic during optimizations to guarantee that early exits only trigger on absolute certainty (e.g., distance 0, not 1) and that all branches required to establish a correct sorting metric (like minimum distance across aliases) are fully evaluated before pushing to the results array.
