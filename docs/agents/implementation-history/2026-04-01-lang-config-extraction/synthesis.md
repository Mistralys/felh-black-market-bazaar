## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary
- Extracted the `LANGUAGE_MAP` constant (language code → game folder name + locale ID) from `scripts/lib/merge-translations.mjs` into a new shared module `scripts/lib/lang-config.mjs`.
- `scripts/lib/merge-translations.mjs` now imports `LANGUAGE_MAP` from `lang-config.mjs` instead of defining it locally. The local constant block (12 lines) was removed and replaced with a single import statement.
- `scripts/lib/lang-config.mjs` is the single source of truth for supported language codes. It exports `LANGUAGE_MAP` with JSDoc types and inline documentation explaining how to add a new language and which documentation files to update.
- Updated `AGENTS.md`: added `lang-config.mjs` to both the Project Stats table (§7) and the File Map (§9) under `scripts/lib/`.

### Documentation Updates
- **`AGENTS.md`** — Added `lang-config.mjs` row to the Project Stats table and to the `scripts/lib/` section of the File Map. This keeps the manifest in sync with the new file per the manifest maintenance rules.
- No changes were needed to `docs/modding-guide/README.md`, `docs/game-data/README.md`, or `README.md` — those documents already contain the language mapping table as human-readable reference; the new `lang-config.mjs` file adds a code-level comment pointing back to those docs, so the relationship is now bidirectional.

### Verification Summary
- Tests run: `node scripts/build.mjs` (full build pipeline)
- Static analysis run: none (project has no configured linter)
- Result: **PASS**
  - Phase 0: 404 fragments merged into 10 GameCore XML files
  - Phase 1: 1,290 strings merged into 8 English localization files across 1 language
  - Phase 1.5: 1,290 keys referenced in fragments, 1,290 keys defined in English localization — all present
  - Phase 2: 266 files deployed to game folder
  - Exit code: 0

### Code Insights
- [low] (`improvement`) `scripts/lib/lang-config.mjs`: The new module is currently only imported by `merge-translations.mjs`. If a future script needs to enumerate supported languages (e.g., a translation completeness report or a documentation generator), it can import `LANGUAGE_MAP` directly from here rather than duplicating the data. No action needed now — the extraction itself is the improvement.
- [low] (`convention`) `scripts/lib/merge-translations.mjs`: The module-level JSDoc comment (lines 1–23) still mentions "en.xml, de.xml, fr.xml, etc." as examples of discovered translation files. This is accurate and does not need updating, but a future maintainer adding a language only needs to touch `lang-config.mjs` — the comment could optionally cross-reference that file for clarity.

### Additional Comments
- The `LANGUAGE_MAP` in `lang-config.mjs` includes `it`, `pl`, and `pt` (Italian, Polish, Portuguese) which are not listed in the base game's `LocalizationDefs.xml` (the game ships with English, German, French, Spanish, Chinese, Japanese, Korean, Russian). These three codes were already present in the original `merge-translations.mjs` constant. They are harmless — the build pipeline only generates localization output for languages that have actual `<lang>.xml` files present in the `xml/` tree. No `it.xml`, `pl.xml`, or `pt.xml` files currently exist, so no output is generated for those languages.
