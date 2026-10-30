# Fresh Fuel UI/UX v1.0

Phase 1.5 refines the established `app/` routes rather than migrating to the scaffold's suggested `src/app/`. Domain interfaces, dependencies, theme persistence keys and account/backend boundaries are unchanged.

## Tokens and composition

`src/theme/tokens.ts` defines the approved dark/light background, surface, elevated, mint, primary/secondary text, and per-theme protein/carbohydrate/fat/calorie colors. Semantic success, warning, error, focus, border, divider, disabled, and muted-background tokens support future components. Light secondary `#607369` is retained on background/white. It measures 4.43:1 against elevated `#EAF2EC`; `mutedOnElevated: #5D7065` is used for elevated secondary text to meet AA. Decorative dividers are intentionally subdued and carry no information alone.

Inter regular/semibold remains body, labels, and metrics; the existing Plus Jakarta Sans bold remains headings. Screen titles are 30, section titles 20, card titles 17–18, body 15, supporting text 12–14. Metrics use tabular numerals. There is no maximum font-scaling cap. Padding is 16 on narrow screens and 20 otherwise, card padding 16, section gap 24, card radius 20. Content caps at 720 points and scrolls inside safe areas. Nutrition switches to a vertical layout below 350 points or above 1.3 text scale. Tab height expands with text scale and bottom inset.

## Component map

- `ui.tsx`: existing Screen/Card/Action/Section/Copy are refined, not duplicated under new names. AppHeader, SectionHeader, PrimaryButton/SecondaryButton, EmptyState, CategoryChip, SettingsRow, Divider, and decorative Icon compose the screens. Chips without callbacks are static labels, not filters. Real actions have explicit labels, roles, 48-point minimum targets, press feedback, and keyboard focus borders.
- `nutrition.tsx`: NutritionRing, MacroProgressBar, MetricCard, ChartCard, and the current empty NutritionSummary. A 64-segment native-view ring avoids a new chart dependency. No analytics, target inference, nutrition calculation, or backend state exists here. Only prop-to-display ratios are calculated. Future weekly charts/WeekSelector are deferred until real history/schedules warrant them.
- `food.tsx`: RecipeImage, MealCard, PlanCard, IngredientRow, GroceryItemRow, ItemRow, and ListGroup are presentation-only building blocks. None persist records or inject fixtures into production. No populated meal/recipe/item component is currently mounted in normal screens.

## Progress contract

Missing, negative, NaN and infinite intake are unknown (`—`), not zero. Zero intake is valid. A target must be finite and positive; missing/zero/negative/nonfinite targets never produce a ratio. Known intake and unknown goals remain distinct. Over-target values retain their supplied numerical value and explicit text; only the visual fill/accessibility percentage caps at 100. Accessible descriptions contain the label, intake/missing state, goal/missing state and over-target status. Unknown values have text semantics, not a fabricated progress percentage. Colors always accompany nutrient names and amounts.

## Images and motion

RecipeImage reserves its aspect ratio before loading, crops with cover, exposes loading/failure alternatives, and resets request state on source change. The native Image sizes to its container; callers must supply appropriately sized licensed assets (there is no image transformation service). Test-only `example.test` sources never reach production screens. There are no bundled food photographs, generated meal records, third-party hotlinks or image-license assumptions. The fallback is an original geometric arrangement with existing Ionicons; icon licensing remains under the installed package's license. Future imagery needs recorded owner/source/license, usage rights, and optimized size variants before inclusion.

No new animations are added. Progress and focus changes are immediate; press feedback is opacity only. There is no entrance/spinning/progress animation requiring a reduced-motion hook. Existing navigation retains platform behavior. iOS reduced-motion navigation must still be checked manually.

## Screen states

Today has real local date context, unknown calorie/macros, no active plan, a Plans action, empty scheduled meals and valid pantry/grocery shortcuts. Plans exposes creation as explicitly coming soon, not an interactive fake builder. Pantry has static category architecture and no search/add controls. Grocery has no checked items or fabricated purchases. Profile has no fabricated identity; only Appearance is actionable. Appearance keeps persisted dark/light/system selection and surfaced storage errors. Account defaults remain separate from plan settings in the existing domain design.
