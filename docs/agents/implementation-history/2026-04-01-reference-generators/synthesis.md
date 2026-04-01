## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary

- Extended `GAMECORE_ARRAY_TAGS` in [`scripts/lib/xml-parser.mjs`](../../../../scripts/lib/xml-parser.mjs) with 17 new repeating element names covering spells, abilities, units, unit stats, and effects XML structures.
- Created [`scripts/lib/reference-helpers.mjs`](../../../../scripts/lib/reference-helpers.mjs) — a new shared module exporting `ensureFreshBuild()`, `loadLocalizationKeys()`, `resolveKey()`, `escapeCell()`, `formatInternalName()`, `formatStatName()`, and `formatEffects()`. Eliminates duplication across all 6 generator scripts.
- Refactored [`scripts/generate-reference.mjs`](../../../../scripts/generate-reference.mjs) to import all shared utilities from `reference-helpers.mjs` and accept an optional `keyMap` parameter — enabling standalone mode (merge + load keys itself) and umbrella mode (receives pre-loaded keys, skips redundant I/O).
- Created 5 new individual reference generators:
  - [`scripts/generate-reference-spells.mjs`](../../../../scripts/generate-reference-spells.mjs) → [`docs/references/spells.md`](../../../../docs/references/spells.md) — 81 spells categorised by SpellType (Tactical/Strategic)
  - [`scripts/generate-reference-abilities.mjs`](../../../../scripts/generate-reference-abilities.mjs) → [`docs/references/abilities.md`](../../../../docs/references/abilities.md) — 2 ability options (flattened from AbilityBonus → AbilityBonusOption)
  - [`scripts/generate-reference-units.mjs`](../../../../scripts/generate-reference-units.mjs) → [`docs/references/units.md`](../../../../docs/references/units.md) — 22 units categorised by race (10 races)
  - [`scripts/generate-reference-unit-stats.mjs`](../../../../scripts/generate-reference-unit-stats.mjs) → [`docs/references/unit-stats.md`](../../../../docs/references/unit-stats.md) — 3 custom unit stat types
  - [`scripts/generate-reference-effects.mjs`](../../../../scripts/generate-reference-effects.mjs) → [`docs/references/effects.md`](../../../../docs/references/effects.md) — 32 visual effects (no localization)
- Created [`scripts/generate-all-references.mjs`](../../../../scripts/generate-all-references.mjs) — umbrella script that runs merge once, loads localization keys once, then calls all 6 generators with the shared `keyMap`. Reports a combined summary with per-file success/failure.
- Added 6 new npm scripts to [`package.json`](../../../../package.json): `reference:all`, `reference:spells`, `reference:abilities`, `reference:units`, `reference:unit-stats`, `reference:effects`.
- Updated [`scripts/menu.mjs`](../../../../scripts/menu.mjs) `[c]` entry from "Generate item reference" to "Generate all references" pointing to the umbrella script.

### Documentation Updates

- [`README.md`](../../../../README.md): Updated "Full item reference" section to "Reference Documents" with a table listing all 6 reference files; updated menu table `[c]` description; expanded Repository Layout table with all new scripts and the `docs/references/` directory.
- [`docs/agents/project-manifest/build-pipeline.md`](../../../../docs/agents/project-manifest/build-pipeline.md): Added documentation for all 6 individual generators and the umbrella script under "Other Scripts"; updated menu item list.
- [`docs/agents/project-manifest/tech-stack.md`](../../../../docs/agents/project-manifest/tech-stack.md): Added 7 new rows to the Build Tools table (6 generators + umbrella); added `reference-helpers.mjs` to the Shared Modules table.

### Verification Summary

- Tests run:
  - `node scripts/generate-reference.mjs` — exit code 0, 263 items parsed and written to `docs/references/items.md` (backward compatibility confirmed)
  - `node scripts/generate-all-references.mjs` — exit code 0, all 6 reference documents generated successfully
- Static analysis run: None (project has no configured linter/type-checker)
- Result: **PASS** — all generators produce well-formed Markdown with correct entry counts, resolved localization keys, and proper categorisation

### Code Insights

- [medium] (debt) `scripts/generate-reference-spells.mjs`: Several spells share the same `DisplayName` (e.g. three "Bow Attack" entries and two "Chop" entries appear in the output table). This is a data issue in the source fragments — the spells have distinct `InternalName` values but identical resolved display names. The reference table would benefit from including `InternalName` as a secondary column to disambiguate duplicates.
- [low] (improvement) `scripts/lib/xml-parser.mjs`: The `GAMECORE_ARRAY_TAGS` set now has 25 entries across multiple data types. A brief inline comment grouping them by data type (as added in this implementation) aids readability, but the set itself could be split into named sub-sets (`ITEM_ARRAY_TAGS`, `SPELL_ARRAY_TAGS`, etc.) and merged with spread syntax for even clearer organisation if the set grows further.
- [low] (refactor) `scripts/generate-reference.mjs`: The `formatStatName()` and `formatEffects()` functions were previously defined inline in this file and are now imported from `reference-helpers.mjs`. The `STAT_LABELS` constant (30+ entries) lives only in `reference-helpers.mjs` — this is the correct location, but the items generator no longer imports `formatStatName` directly (it uses `formatEffects` which calls it internally). The import list in `generate-reference.mjs` could be trimmed to remove the now-unused direct `formatStatName` import if it was left there; verified it was not imported directly in the refactored version.
- [low] (improvement) `scripts/generate-reference-spells.mjs`: The `StaminaCost` field is present on some spells but the majority show `—` for cost. Inspecting the source XML reveals most BMB spells are item-triggered (hidden, `IsCastable=0`) and have no stamina cost. A note in the generated document explaining this would reduce confusion for readers.
- [low] (convention) `docs/references/abilities.md`: With only 2 ability options currently, the reference has no Table of Contents (flat table only). If the mod grows to many more abilities, adding categorisation by `Type` (Army/Unit/etc.) would match the pattern used by the spells and units generators.

### Additional Comments

- The `ensureFreshBuild()` function in `reference-helpers.mjs` calls both `mergeXmlFragments()` and `mergeTranslations()` — the same sequence used by `build.mjs`. This means running any reference generator standalone will always regenerate the GameCore XML and localization files, keeping references in sync with the source fragments without requiring a separate build step.
- The umbrella script (`generate-all-references.mjs`) uses sequential `await` calls rather than `Promise.all()` to keep console output readable and ordered. Parallelising the generators would be a straightforward optimisation if generation time becomes a concern as the mod grows.
- All generated reference files include the `> Auto-generated` warning header as required by project conventions.
