## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary

- Created a new shared XML parser module at [`scripts/lib/xml-parser.mjs`](../../../../scripts/lib/xml-parser.mjs) that exports four functions:
  - [`parseTranslationXml(xmlString)`](../../../../scripts/lib/xml-parser.mjs) — parses `<Translation>` wrapper files; returns a structured object with `displayName`, `description`, `backstory`, `provides[]`, `modifierDisplayNames[]`.
  - [`parseLocalizationXml(xmlString)`](../../../../scripts/lib/xml-parser.mjs) — parses `<GameText><Locale><Line>` localization files; returns a `Map<key, text>`.
  - [`parseGameCoreXml(xmlString)`](../../../../scripts/lib/xml-parser.mjs) — parses GameCore XML (items, weapons, etc.); returns the parsed document. Moves the parser configuration that was previously inline in `generate-reference.mjs`.
  - [`extractAbilityOptionNames(xmlString)`](../../../../scripts/lib/xml-parser.mjs) — extracts `AbilityBonusOption` `InternalName` attributes from fragment XML; replaces the regex in `parseAbilityTranslationFile()`.
  - [`escapeXml(text)`](../../../../scripts/lib/xml-parser.mjs) — XML entity escaping for output assembly; consolidated from the duplicate definitions in `merge-translations.mjs`.

- Refactored [`scripts/lib/merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs):
  - `parseTranslationFile()` now calls `parseTranslationXml()` instead of six regex patterns.
  - `parseAbilityTranslationFile()` now calls `extractAbilityOptionNames()` instead of a regex on the fragment XML.
  - Removed `unescapeXml()` — entity decoding is handled automatically by the parser.
  - Removed the local `escapeXml()` — imported from the shared module.

- Refactored [`scripts/generate-reference.mjs`](../../../../scripts/generate-reference.mjs):
  - `loadLocalizationKeys()` now calls `parseLocalizationXml()` instead of a regex loop with manual entity unescaping.
  - `parseItemFile()` now calls `parseGameCoreXml()` instead of the locally-defined `parser.parse()`.
  - Removed the local `XMLParser` import and the `ARRAY_TAGS` / `parser` definitions — all moved to the shared module.

- Two non-trivial edge cases were discovered and handled during implementation:
  1. **Empty elements** (`<Description></Description>`): `fast-xml-parser` returns `""` for empty tags. The old regex matched and captured an empty string. Fixed by using `!== null` checks in `parseTranslationFile()` instead of truthiness checks, and by having `extractText()` return `""` (not `null`) for empty elements.
  2. **Multi-line text with CRLF**: `fast-xml-parser` normalises `\r\n` to `\n` within text content. Five source files contain descriptions that span multiple lines with CRLF line endings. Fixed by restoring bare `\n` to `\r\n` in `extractText()` using a lookbehind regex (`/(?<!\r)\n/g`).

### Documentation Updates

- [`AGENTS.md`](../../../../AGENTS.md) — Added `xml-parser.mjs` row to the **Project Stats** table (§ 7) and to the **File Map** (§ 9 `scripts/lib/` listing). This documents the new shared module for future agents.
- No changes to `Mods/README.md` or `docs/modding-guide/README.md` — this is a pure internal tooling change with no effect on mod content, XML schemas, or naming conventions.

### Verification Summary

- Tests run:
  - `npm run build` — before and after refactoring; string counts and file counts identical (1290 strings, 8 localization files, 404 fragments).
  - `npm run reference` — before and after refactoring; 1290 keys loaded, 263 items parsed, reference document generated.
  - Binary diff (`fc /b`) of all four baseline localization files (`BMB_Strings_Items.xml`, `BMB_Strings_Weapons.xml`, `BMB_Strings_Armor.xml`, `BMB_Strings_Abilities.xml`) — **no differences found**.
  - Binary diff of `docs/references/items.md` — **no differences found**.
- Static analysis run: none (project has no configured linter/type-checker).
- Result: **PASS** — all output files are byte-for-byte identical to the pre-refactoring baseline.

### Code Insights

- [medium] (`debt`) [`xml/spells/BMB_PenitentsSuffering/en.xml`](../../../../xml/spells/BMB_PenitentsSuffering/en.xml): Contains `<Description></Description>` — an empty description element. This causes a localization entry with an empty `<Text></Text>` value to be emitted, which is meaningless for the game. The entry should either have a real description or the empty element should be removed. The current implementation preserves this behaviour for output parity, but the source file should be cleaned up. **FIXED**.

- [medium] (`debt`) [`xml/items/RejuvenatingFusion/en.xml`](../../../../xml/items/RejuvenatingFusion/en.xml), [`xml/armor/SlimyWaders/en.xml`](../../../../xml/armor/SlimyWaders/en.xml), [`xml/weapons/Dagger_Dual_ShadowSharp/en.xml`](../../../../xml/weapons/Dagger_Dual_ShadowSharp/en.xml), [`xml/units/BMB_Unit_Dead_Mage_Lightning_AI/en.xml`](../../../../xml/units/BMB_Unit_Dead_Mage_Lightning_AI/en.xml), [`xml/units/BMB_Unit_Dead_Staff_AI/en.xml`](../../../../xml/units/BMB_Unit_Dead_Staff_AI/en.xml): These five translation files contain multi-line text content with embedded `\r\n` line endings inside XML element values. While the build handles this correctly (CRLF is restored in `extractText()`), embedding literal line breaks inside XML element values is fragile — it depends on the source file's line endings being CRLF. Consider normalising these descriptions to single-line text or using a consistent convention.

- [low] (`improvement`) [`scripts/lib/xml-parser.mjs`](../../../../scripts/lib/xml-parser.mjs) — `extractText()`: The CRLF restoration uses a lookbehind regex (`/(?<!\r)\n/g`). This is correct for Node.js (V8 supports lookbehind), but worth noting as a non-trivial pattern. An alternative is `s.replace(/\r?\n/g, '\r\n')` which is simpler and equally correct since the parser always produces bare `\n` (never `\r\n`) for normalised content.

- [low] (`improvement`) [`scripts/lib/merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs) — `parseAbilityTranslationFile()`: The function uses only the first `AbilityBonusOption` `InternalName` as the key base, discarding any additional options. A comment notes this. If a future ability fragment has multiple `AbilityBonusOption` children with distinct translation needs, this logic will silently produce incorrect keys. Consider adding a warning log if `optionNames.length > 1`.

- [low] (`convention`) [`scripts/lib/xml-parser.mjs`](../../../../scripts/lib/xml-parser.mjs): The `escapeXml()` function is a simple string-replace chain rather than using `XMLBuilder` from `fast-xml-parser`. The plan noted this is intentional (output assembly is string-based). The comment in the module explains the rationale. No action needed, but future maintainers should be aware that `XMLBuilder` is available if the output assembly is ever refactored.

### Additional Comments

- The `trimValues: true` option on the translation parser trims leading/trailing whitespace from all element values. This matches the `.trim()` calls in the old regex extraction. However, it also trims the multi-line descriptions — the CRLF restoration in `extractText()` runs *after* trimming, so leading/trailing newlines are correctly stripped while internal newlines are preserved.
- The `parseTagValue: false` option prevents `fast-xml-parser` from coercing numeric strings (e.g. index values like `"1"`, `"2"`) to JavaScript numbers. This is important for the `@_index` attribute on `Provides` and `ModifierDisplayName` elements, which must remain strings for key construction.
- No changes were made to `scripts/lib/merge-xml.mjs`, `scripts/split-xml.mjs`, `scripts/migrate-to-dirs.mjs`, `scripts/build.mjs`, `scripts/menu.mjs`, or `scripts/prepare.mjs` — all out of scope per the plan.
