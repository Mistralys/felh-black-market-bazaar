## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary

- Migrated the Black Market Bazaar mod from hardcoded English strings to the game's XML-based localization system.
- Restructured `xml/` from 404 flat fragment files into per-entry directories (`xml/<category>/<InternalName>/fragment.xml` + `en.xml`). Categories `effects/` and `core-items-mods/` remain as flat files (no translatable text). `xml/abilities/_meta.xml` remains as a flat file.
- Extracted 1,290 translatable strings across 371 entries into co-located `en.xml` translation files using the `<Translation>` format.
- Replaced all `<DisplayName>`, `<Description>`, `<Provides>`, `<Backstory>`, and `<GameModifier><DisplayName>` values in `fragment.xml` files with `TXT_BMB_*` localization keys.
- Created `scripts/migrate-to-dirs.mjs` — idempotent one-time migration script. Running it a second time correctly reports all entries already up-to-date.
- Created `scripts/lib/merge-translations.mjs` — translation merge module that assembles per-entry `en.xml` (and future `<lang>.xml`) files into monolithic `Mods/src/Data/Localization/<Language>/BMB_Strings_<Category>.xml` files in the game's `<GameText><Locale>` format.
- Updated `scripts/lib/merge-xml.mjs` to support both flat files (for `effects/`, `core-items-mods/`) and per-entry directories (for all other categories) via a `flatFiles` flag in `MERGE_CONFIG`.
- Updated `scripts/build.mjs` to add Phase 1 (translation merge) between Phase 0 (fragment merge) and Phase 2 (deploy).
- Updated `scripts/generate-reference.mjs` to resolve `TXT_BMB_*` keys to English text by loading the generated localization files before parsing item data.
- Updated `scripts/menu.mjs` and `package.json` to expose the migration script as menu item d and `npm run migrate-to-dirs`.
- Added `Mods/src/Data/Localization/` to `.gitignore` (generated output, same as `GameCore/`).
- Key integrity verified: 1,290 keys in GameCore XML = 1,290 keys in localization files. Zero missing, zero extra.

### Documentation Updates

- **`README.md`**: Updated build steps to include translation merge phase; added menu item d to the Available menu items table; added XML fragment workflow section documenting per-entry directory structure; updated Repository Layout table.
- **`AGENTS.md`**: Updated Manifest Maintenance Rules (new item/translation rows); updated Efficiency Rules (added localization editing rules); updated Project Stats (added Translation Merge and Dir Migration rows, updated Architecture and Build Tool descriptions); updated File Map (section 9) to reflect per-entry directory structure, new scripts, and `Mods/src/Data/Localization/` generated output.
- **`docs/game-data/README.md`**: Expanded Localization section with full XML format, folder structure, locale ID mapping table, mod localization explanation, and `.str` file format note.
- **`docs/modding-guide/README.md`**: Added item 6 to Table of Contents; appended full Localization section covering per-entry directory structure, translation file format, `TXT_BMB_*` key naming convention, adding new entries, adding new languages, language code mapping table, `.str` vs XML relationship, and what is NOT localized.
- **`Mods/README.md`**: Updated XML Fragment Workflow section; added localization files to Supporting Files table with note about generated files.

### Verification Summary

- Tests run:
  - `node scripts/migrate-to-dirs.mjs` — 371 entries migrated, 1,290 strings extracted (run 1); all 371 entries already up-to-date (run 2, idempotency confirmed).
  - `npm run build` — Phase 0: 404 fragments merged into 10 GameCore XML files; Phase 1: 1,290 strings merged into 8 English localization files; Phase 2: deployed to game folder.
  - Key integrity check via `scripts/verify-keys.mjs` — 1,290 keys in GameCore, 1,290 in localization, 0 missing, 0 extra. PASS.
  - `npm run reference` — item reference generated with resolved English names (e.g., "Abyssal Greatsword", "Aerial Conductor") rather than raw `TXT_BMB_*` keys.
- Static analysis run: None (project has no configured linter or type checker).
- Result: All verifiable acceptance criteria pass. Acceptance criterion 8 (in-game smoke test) and criterion 9 (in-game display) require manual in-game testing and are out of scope for automated verification.

### Code Insights

- [medium] (`debt`) `scripts/migrate-to-dirs.mjs`: The XML text extraction uses regex-based parsing (`/<DisplayName>([\s\S]*?)<\/DisplayName>/`) rather than a proper XML parser. This is pragmatic for a one-time migration script, but the same regex approach is also used in `scripts/lib/merge-xml.mjs` for fragment extraction. If XML content ever contains CDATA sections, XML comments inside elements, or deeply nested same-name elements, the regex approach will silently produce incorrect output. Consider migrating to a lightweight XML parser (e.g., `fast-xml-parser` or Node's built-in `DOMParser` via `node:vm`) for the merge modules. **DONE**.

- [medium] (`improvement`) `scripts/lib/merge-translations.mjs`: The module currently only warns about missing translation files for a language (when a language exists for some entries but not others) but does not validate that every `TXT_BMB_*` key referenced in `fragment.xml` files has a corresponding entry in the translation files. The key integrity check was performed manually via a one-off script. Consider adding an automated key integrity check as part of the build pipeline (Phase 1.5) that fails the build if any key is missing from the English localization, preventing silent display of raw `TXT_BMB_*` strings in-game. **DONE**.

- [low] (`improvement`) `scripts/lib/merge-translations.mjs`: The `LANG_MAP` constant (language code → folder name + locale ID) is defined locally in this module. The same mapping information is documented in `docs/modding-guide/README.md` and `docs/game-data/README.md`. If a new language is added, the developer must update both the code and the documentation. Consider extracting `LANG_MAP` to a shared config file (e.g., `scripts/lib/lang-config.mjs`) so documentation generators can import it directly, keeping code and docs in sync. **DONE**.

- [low] (`debt`) `scripts/lib/merge-xml.mjs`: The `MERGE_CONFIG` array uses a `flatFiles` boolean flag to distinguish between flat-file categories and per-entry-directory categories. This is clear but fragile — a future developer adding a new category must know to set `flatFiles: false` (the non-obvious default for translatable categories). Consider renaming the flag to `translatable` (true = per-entry dirs with `en.xml`, false = flat files) to make the intent self-documenting. **DONE**.

- [low] (`convention`) `scripts/verify-keys.mjs`: This file was created as a one-off verification script during implementation and was not removed afterward. It is not referenced by `package.json` or `menu.mjs`. It should either be promoted to a proper `npm run verify-keys` script (useful for CI) or deleted to avoid confusion. **DONE**.

### Additional Comments

- The in-game smoke test (acceptance criteria 8 and 9) must be performed manually by loading the mod in Elemental: Reforged and verifying that item names, descriptions, provides text, and unit backstories display correctly in English. The build pipeline produces structurally valid XML that matches the Champion Bonanza mod's confirmed working format, but only in-game testing can confirm the game engine loads the localization files correctly.
- Adding a new language translation is now as simple as creating `<lang>.xml` files in each entry directory and running `npm run build`. The infrastructure is fully in place for community translators.
- The `BMB.str` file was not modified. It continues to serve its separate purpose (weapon upgrade type UI labels) and coexists with the new XML localization system.
