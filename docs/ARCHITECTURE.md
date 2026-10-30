# Fresh Fuel foundation

## Decisions

- Expo SDK 58 stable, React Native 0.88.1, React 19.3.0 from the official blank TypeScript template. Native packages are selected from Expo's bundled compatibility map; lockfile is authoritative. Node 22.14.0 was available on the implementation machine.
- Expo Router owns navigation. `app/` contains route composition; `src/components/` holds shared UI; `src/theme/` owns tokens and local appearance persistence; `src/domains/{identity,planning,inventory,engagement}/` contains React-independent contracts.
- Dark is the initial default. AsyncStorage stores only the validated appearance enum. Hydration completes before navigation renders. Writes are serialized and failures surfaced. Device appearance is consulted only for system mode.
- Bundled Plus Jakarta Sans and Inter fonts avoid runtime font-network dependencies. No app animation currently requires a reduced-motion override. Text scales normally; content scrolls and is capped at 640 points on large displays. Controls have at least 52-point targets. Nutrition colors are decorative and require text labels.
- Local React context is sufficient for one preference. Add Zustand only when cross-screen draft/client state warrants it; TanStack Query when actual server requests exist; React Hook Form and Zod with onboarding forms. Do not install unused infrastructure now.
- Supabase authentication/PostgreSQL persistence, SecureStore credentials, and local Expo Notifications are deferred. No backend client, database, remote deployment, paid service, or credentials are required for Phase 1.

## Boundaries and future invariants

UI calls application services; services orchestrate pure domain engines and repository adapters. Domain code must not import React, Expo, Supabase, or storage. Validate external records at adapter boundaries with Zod when implemented; TypeScript interfaces alone are not runtime validation.

Identity owns profiles and named household membership. Planning snapshots preferences into each plan; never mutates the global profile through plan editing. Every new plan must pass all seven builder steps; editing uses a separate route/service and recalculates affected nutrition and inventory. Child profiles must not inherit adult weight-loss targets automatically.

Nutrition uses sourced food variants with raw/cooked state and explicit missing/uncertain evidence. No numeric food data is included. Future arithmetic uses canonical grams and documented rounding; mass/volume/count conversion needs food-specific evidence. A planner returns explained shortfalls rather than invented exact matches.

Inventory is authoritative: plan -> reserve -> prepare -> consume. Preparation does not imply deduction. Consumption and purchase receipts need transactional idempotency keys, nonnegative quantity constraints, version/concurrency checks, and an append-only adjustment ledger. Editing releases/replaces reservations atomically. Grocery check-off is separate from confirmed pantry receipt. Quantity interfaces are contracts, not yet validated operations.

Engagement stores native notification IDs and deduplication keys. Contextual permission requests, quiet hours, timezone/DST behavior, and cancellation/rescheduling belong in a future notification adapter.

## Backend design (proposal, not deployed)

Separate households, household_members, profiles, food_sources/foods, recipes/recipe_ingredients, meal_plans/planned_meals, plan_drafts, pantry_items, reservations, inventory_adjustments, grocery_lists/items/receipts, completions and reminder preferences. Store quantities with database numeric types. Every user/household record requires ownership or membership authorization and RLS before API exposure. Shared household writes require role checks. Transactions and unique operation IDs enforce exactly-once inventory effects. Never trust client-supplied ownership alone. No schema migrations are implemented in this phase.

Store only publishable Supabase configuration in public environment variables. Add reviewed SecureStore-backed session handling in the auth phase, with token-size handling. No service-role or AI secrets may enter the mobile bundle. Design export/deletion to cover memberships, dependent personal records, retained shared records, and session revocation. Dietary information is private and must not enter analytics/logs.

## Supporting routes roadmap

Auth and account onboarding are separate from `/plan-builder/[draftId]`. Later routes include `/plans/[id]`, `/meals/[id]`, `/meals/[id]/edit`, `/recipes/[id]`, nutrition breakdown, notification settings, account settings, help, and household management. These routes are intentionally not registered as empty interactive destinations.
