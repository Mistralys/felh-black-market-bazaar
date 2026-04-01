## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary

- Implemented the automated translation key integrity check proposed in the `[medium] (improvement)` code insight from the `2026-03-31-translation-support` synthesis.
- Created `scripts/lib/verify-translation-keys.mjs` — a reusable module that scans all `fragment.xml` files in translatable categories, extracts every `TXT_BMB_*` key referenced in them via a targeted regex, then cross-checks against the keys defined in the generated English localization files. Returns a structured result object with `passed`, `totalFragmentKeys`, `totalDefinedKeys`, and `missingKeys`.
- Created `scripts/verify-translation-keys.mjs` — a standalone entry-point script that imports the module and exits with code 1 if any keys are missing, enabling `npm run verify-keys` and CI usage.
- Integrated the check as **Phase 1.5** of `scripts/build.mjs`, running automatically after the translation merge (Phase 1) and before deploy (Phase 2). The build aborts with a clear error message if any English keys are missing.
- Added `npm run verify-keys` to `package.json`.
- Added menu item `[e] Verify translation key integrity` to `scripts/menu.mjs`.

### Documentation Updates

- **`README.md`**: Added menu item `e` (`Verify translation key integrity`) to the Available menu items table.
- **`AGENTS.md`**: Added `Key Integrity Check` row to the Project Stats table (§7); added `scripts/verify-translation-keys.mjs` and `scripts/lib/verify-translation-keys.mjs` entries to the File Map (§9).
- No changes to `docs/game-data/README.md`, `docs/modding-guide/README.md`, or `Mods/README.md` — the check is a build-pipeline concern, not a game-data schema or modding-pattern concern.

### Verification Summary

- Tests run:
  - `node scripts/verify-translation-keys.mjs` (pass path) — 1,290 keys referenced in fragments, 1,290 keys defined in English localization, 0 missing. Exit code 0. ✔
  - Failure path test — injected `TXT_BMB_ITEMS_BIRDOFCELERITY_FAKE_KEY` into `xml/items/BirdOfCelerity/fragment.xml`, ran check: reported 1 missing key with source file and key name, exit code 1. ✔ Fragment restored afterward.
  - `node scripts/verify-translation-keys.mjs` (restored state) — 1,290/1,290, exit 0. ✔
- Static analysis run: None (project has no configured linter or type checker).
- Result: Both pass and fail paths behave correctly. The build pipeline integration is in place.

### Code Insights

- [low] (`improvement`) `scripts/lib/verify-translation-keys.mjs`: The `TRANSLATABLE_CATEGORIES` constant is defined identically in both `merge-translations.mjs` and `verify-translation-keys.mjs`. If a new category is added, both files must be updated. Consider extracting this shared constant to a `scripts/lib/categories.mjs` config module to keep the two modules in sync automatically.

- [low] (`improvement`) `scripts/lib/verify-translation-keys.mjs`: The key extraction uses a regex (`>(TXT_BMB_[A-Z0-9_]+)<`) rather than the XML parser. This is intentional and safe for the current fragment format (keys are always sole text content of an element), but it is worth noting that if a fragment ever contains a `TXT_BMB_*` key inside an XML attribute value (e.g. `Note="TXT_BMB_..."`), the regex would miss it. The current schema does not use keys in attributes, so this is not a current risk.

### Additional Comments

- The check reads the *generated* localization files in `Mods/src/Data/Localization/English/`. When run standalone via `npm run verify-keys`, the localization files must already exist (i.e., `npm run build` or the translation merge phase must have run first). The module handles the absent-files case gracefully by warning and skipping rather than crashing.
- During `npm run build`, Phase 1 (translation merge) always runs before Phase 1.5 (key check), so the localization files are always fresh when the check runs in the build pipeline.
