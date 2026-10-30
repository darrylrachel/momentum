# Independently reviewable follow-up PRs

Phase 1.5 delivers the UI design system and dashboard redesign before the feature sequence below. Physical iPhone visual/accessibility review remains a review gate; it does not authorize backend work.

Each PR adds its own relevant tests. Approval of Phase 1 does not authorize implementing these phases.

1. Authentication + account onboarding: Supabase sessions, runtime validation, separate welcome flow, minimal profile and single-member household creation, RLS isolation tests, sign-out and deletion/export design. No required body metrics in Everyday mode.
2. Profile persistence: editable preferences and mode, RHF/Zod validation, server-state handling, offline/error UX, profile-versus-plan isolation tests.
3. Nutrition data: select a licensed reliable source, provenance/raw/cooked/variant model, missing data UX, ingestion validation and tests.
4. Pure nutrition engine: quantity validation, conversions, rounding, recipe/meal/day totals, remaining targets and feasibility tests against sourced fixtures.
5. Pantry: validated stock operations, units, ledger, optional expiry, nonnegative/concurrency tests.
6. Guided Plan Builder: seven required steps, back navigation, prefill, versioned persisted drafts, date/schedule validation, accessibility and navigation tests. Every new plan uses this flow.
7. Daily generation: deterministic constraints, quantity limits, preferences, explainable shortfalls, no fabricated matches; AI optional and always validated.
8. Manual editing: direct existing-plan edits, recalculation and reservation validation, tests proving onboarding is not repeated.
9. Grocery generation: pantry offsets, aggregation, separate purchased/received states, idempotent receipt tests.
10. Meal completion: transactional reservation/consumption lifecycle, repeated completion/edit retry tests, inventory reconciliation.
11. Local notifications: permission denial, categories, quiet hours, DST, cancellation and duplicate prevention tests.
12. Weekly planning: multi-day scheduling and reservations, editing/regeneration boundaries and feasibility tests.
13. Analytics: sourced intake/completion history, explicit missing-data handling, privacy controls.
14. Households: named invitations, permissions, shared stock/lists, per-person portions, child safeguards and cross-household authorization tests.

Phase 1 does not include nutrition arithmetic, conversions, feasibility, inventory, form, builder, draft or editing behavior tests because those implementations are deferred. They are required acceptance gates for the corresponding PRs, not pretend passing coverage.
