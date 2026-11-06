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

## 2025-03-01 - Optimized Levenshtein algorithm with Int32Array and Early Exits
**Learning:** During string matching over large datasets, the naive dynamic programming approach for Levenshtein allocates `O(m)` new arrays resulting in `O(m * n)` iterations. The array allocations cause high GC pressure, and without bounds checking it calculates costs that are functionally irrelevant for fuzzy search where `threshold <= 3`.
**Action:** When writing sequence alignment or string distance functions, use a module-level cached `Int32Array` instead of runtime `Array.from()`, and aggressively early-exit when partial distances strictly exceed the search domain threshold to transform `O(m * n)` calculations into a worst-case of `O(n * threshold)`.

## 2024-05-20 - [Fix typeof Parsing Error]
**Learning:** In TypeScript, avoid using optional chaining inside a `typeof` type annotation (e.g., `typeof obj?.prop[0]`), as this causes ESLint parsing errors (`Parsing error: ',' expected`).
**Action:** Instead, extract the type using bracket notation (e.g., `(typeof obj)['prop'][0] | undefined`).

## 2024-05-20 - [Batch Supabase Queries & Avoid Empty Types in Promise.all]
**Learning:** When pushing independent Supabase queries to an array to be executed with `Promise.all()`, relying on implicit union types can cause TypeScript parsing errors like `Unexpected any` if the `.push()` uses a type not inferred during array initialization.
**Action:** When initializing an array of Supabase queries intended for `Promise.all()`, explicitly type it as `PromiseLike<any>[]` (and use `eslint-disable-next-line` if needed) to ensure that pushing differently-typed table operations does not trigger linter errors.

## 2024-06-25 - [Batch Independent Supabase Queries in Loops]
**Learning:** A sequential `for...of` loop executing independent Supabase database operations (e.g., `.from().insert()`) creates a network waterfall, significantly delaying user operations like onboarding where multiple skills are added simultaneously.
**Action:** To optimize performance and avoid network waterfalls, always batch independent Supabase queries (e.g., inside a loop) using `Promise.all()` to execute them concurrently rather than awaiting them sequentially.

## 2024-03-24 - Short-Circuiting Levenshtein Needs Exact Match Evaluation
**Learning:** When attempting to optimize fuzzy matching (Levenshtein distance) by short-circuiting on exact matches (`dist === 0`), ensure the optimization is placed in a code path where exact matches actually reach. If an earlier step (like a substring match) already returns early for exact matches, the `dist === 0` check in the fuzzy fallback will become unreachable dead code. However, applying this optimization in contexts where it *is* reachable (e.g., in a standalone normalization loop) correctly yields performance benefits by skipping unnecessary string evaluations for perfect hits.
**Action:** Before optimizing fallback algorithms to short-circuit on exact matches, rigorously trace the control flow to verify that exact matches haven't already been handled by preceding code (e.g., substring match early-returns).

## 2024-03-24 - Bulk Inserts are faster than Promise.all inserts
**Learning:** When inserting multiple records into Supabase, mapping over an array to execute concurrent independent inserts inside `Promise.all` executes N concurrent queries, which is much slower and uses more database connections than bundling the data into a single array for a bulk insert (e.g., `.insert(array)`).
**Action:** Prefer bundling data into a single array for bulk inserts over `Promise.all` for multiple `.insert()` calls.
