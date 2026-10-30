# Phase 1.5 manual acceptance

These are reviewer steps, not claims that they have been executed.

1. In `C:/Users/rache/Documents/ChatGPT/Momentum`, run `npm start`. Open the QR code on an iPhone with matching SDK 58 Expo Go (or a compatible development build if needed). No new native module or development-build-only feature was added.
2. Fresh install: confirm the default dark palette and bundled headings/body fonts. Today must show an em dash and no target, not invented calorie intake or goals. Protein, Carbs and Fat have text labels; bars have no populated progress.
3. Confirm local date, compact dashboard structure, Explore your plans, empty Today's meals, and working pantry/grocery shortcuts. Check small and large iPhones in portrait and landscape; scroll to the last content with nothing hidden behind tabs.
4. Visit all five tabs. Confirm active state, readable tab labels, bottom safe-area padding and large targets. In Plans creation is explicitly unavailable; Pantry search/add/filter are absent; Grocery has no fake checked items. Profile contains no fabricated person/email/household.
5. Profile -> Appearance settings. Select Light, relaunch, verify persistence. Repeat Dark. Select Match device settings; change iOS dark/light and verify response. Explicit themes must ignore the device setting. Back returns to Profile. Reload offline and repeat appearance selection.
6. At iOS Accessibility Text Size 180% or the closest available setting, inspect every screen and Appearance. Confirm wrapped text, stacked nutrition, expanded tab bar, no clipped labels, and scroll access. Repeat the narrowest supported phone size.
7. Enable VoiceOver: verify logical reading order, calorie/macros announce unknown intake/targets, and navigation/actions have names and roles. Appearance choices must announce checked state. No information should depend solely on colors/icons.
8. Enable Reduce Motion: verify navigation remains usable; progress/components have no app-added motion. Check increased contrast and bold-text system settings.
9. In a web browser, check 320, 390, 430 and 1024 pixel viewports and enlarged text/zoom. Tab through real actions; focus must be visible and Enter/Space must activate them. Check empty states and scroll behavior in light and dark.
10. Image fallback and missing/zero/over-goal demonstrations exist in automated component tests only; production contains no fixture gallery. Review RecipeImage loading/error/source-change behavior in tests. Before actual photography ships, verify crop, sized assets, rights, network failure and screen-reader alternatives on device.

Automated enlarged-text coverage renders the summary at a mocked 1.8 font scale; it does not replace iOS Dynamic Type, native layout, VoiceOver or screenshot review.
