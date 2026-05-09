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
## 2026-05-07 - [Avoid concurrent deletion of related database records]
**Learning:** While `Promise.all()` is excellent for concurrent independent queries or independent updates, using it to concurrently delete related parent and child records (like `user_skills` and `user_topics`) can trigger foreign key constraint violations if the parent record is deleted before the child record.
**Action:** When deleting records with potential foreign key dependencies, maintain sequential execution or ensure the schema is explicitly configured with `ON DELETE CASCADE`.

## 2026-05-07 - [Careful dependency arrays in Context]
**Learning:** When refactoring context functions to derive states locally instead of refetching from the database, be careful not to inadvertently add frequently updating global state objects (like `profile`) into `useCallback` dependency arrays, as this will trigger unnecessary recreations of the callback and subsequent re-renders in consumer components.
**Action:** When optimizing React Context providers, evaluate the impact of dependency array changes. Rely on local component derivations or ensure that you only reference state when safe to do so.
