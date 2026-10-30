# Fresh Fuel

Mobile-first meal-planning foundation with the Phase 1.5 Fresh Fuel UI redesign: five tabs, a compact empty-state nutrition dashboard, reusable visual primitives, typed domain contracts, and persistent dark/light/system appearance. No nutrition values or account data are fabricated.

## Develop

Use Node 22 LTS and npm. Run `npm ci`, then `npm start`. Expo Router starts at Today. Run `npm run web` for a browser preview. Public environment configuration is documented in `.env.example`; no environment variables are required now.

Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npx expo install --check`, `npx expo-doctor`, `npx expo export --platform web`. Mobile JS check: `npx expo export --platform ios --platform android --no-bytecode`. A JS export does not validate native compilation or device behavior.

## iPhone acceptance checklist

1. Install an Expo Go release supporting SDK 58. The SDK 58 announcement states the App Store rollout may lag; if your installed Expo Go reports an incompatible SDK, use a matching development build instead. See https://expo.dev/changelog/sdk-58 and https://expo.dev/go.
2. Run `npm start` with phone and computer on the same network. Scan the QR code with the iPhone Camera and open Expo Go. Allow the local-network prompt if needed.
3. On a fresh installation, confirm the dark Fresh Fuel palette, Plus Jakarta Sans headings and Inter body text. There should be no sample calories or fabricated meal records.
4. Visit Today, Plans, Pantry, Grocery, and Profile. Confirm active tab indication. Explore your plans must open Plans. Profile -> Appearance settings must open Appearance; the header back control returns to Profile.
5. Choose Light, close/reopen the app and confirm persistence. Repeat for Dark. Choose Match device settings, change iOS appearance and confirm the app follows it. Explicit Dark/Light should ignore the device setting.
6. Test a small phone and a larger phone, portrait/landscape, largest practical Dynamic Type, VoiceOver reading order, readable labels, button targets, scrolling and bottom safe areas. On web, test keyboard tab/enter navigation. No animation is required to understand the UI.
7. Reload offline after assets have loaded. Navigation and appearance should continue working. Unsupported future features must remain explanatory text without pretend controls.

No Phase 1 feature intentionally requires a development build beyond the SDK compatibility caveat. Native iOS builds require macOS/Xcode locally or an explicitly approved EAS build. No build service was invoked. Future notification/security integrations must be checked against Expo Go limitations when implemented.

## Architecture and review

Each completed phase includes a versioned report in `docs/reports/`, followed by a commit and push to [GitHub](https://github.com/darrylrachel/momentum). Phase 1's report is [here](docs/reports/phase-01-foundation.md). New phases require review before implementation.

- `app/`: route layouts, five tabs, appearance, not-found.
- `src/components/`: shared accessible text, cards, screens and real actions.
- `src/theme/`: palettes, typography, persistence and preference validation.
- `src/domains/`: identity, planning, inventory and engagement models.
- `__tests__/`: appearance and router integration tests.
- [Architecture](docs/ARCHITECTURE.md): decisions, boundaries and security design.
- [Roadmap](docs/ROADMAP.md): future PR sequence and acceptance gates.
- [UI design system](docs/UI-DESIGN-SYSTEM.md): component contracts, accessibility decisions, and asset policy.
- [Phase 1.5 review checklist](docs/QA-PHASE-1-5.md): iPhone and visual acceptance steps.

Profile editing, authentication, forms, nutrition engines, pantry operations, Plan Builder, grocery operations, progress, reminders, and households are not implemented. No remote Supabase schema or RLS policies exist yet; they are required before backend data is exposed. App-store icon artwork and physical-device layout review are still needed before distribution.
