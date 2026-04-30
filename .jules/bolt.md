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
## 2026-04-30 - Optimize Supabase Query Operations
**Learning:** Sequential, blocking database queries in `completeOnboarding` and `updateSkillProgress` introduce significant network waterfalls, especially when inserting relational data (skills and topics) in a loop or executing independent updates and queries sequentially.
**Action:** Always utilize Supabase's array insert feature with `.select()` to perform bulk operations, and wrap independent query operations in `Promise.all()` to resolve them concurrently and eliminate artificial latency.
## 2026-04-30 - Optimize Relational Data Bulk Inserts
**Learning:** Inserting relational parent and child records in sequential N+1 loops causes massive network waterfalls.
**Action:** Optimize Supabase record creation by performing a bulk insert of parent records with `.select()` to retrieve generated IDs, then map and bulk insert child records in a single secondary operation, relying on array index mapping rather than string matching to prevent O(N^2) complexity.
