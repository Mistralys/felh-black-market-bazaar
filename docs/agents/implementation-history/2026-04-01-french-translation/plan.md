# Plan: French Translation for All Mod Items

## Summary

Add French (`fr.xml`) translation files for all 371 translatable entries across the 8 translatable categories in the Black Market Bazaar mod. Each entry directory under `xml/<category>/<InternalName>/` currently has an `en.xml` (English) file; a corresponding `fr.xml` file must be created with the same XML structure but French-translated text content. After all files are created, a build (`npm run build`) will generate the monolithic `BMB_Strings_<Category>.xml` files under `Mods/src/Data/Localization/French/`.

## Architectural Context

### Localization system

The BMB mod uses a **per-entry directory translation system** documented in [`localization.md`](../../project-manifest/localization.md). Each translatable entry lives in:

```
xml/<category>/<InternalName>/
├── fragment.xml    ← game data with TXT_BMB_* keys
├── en.xml          ← English translation (source of truth)
└── fr.xml          ← French translation (NEW — to be created)
```

### Build pipeline

The build pipeline ([`build-pipeline.md`](../../project-manifest/build-pipeline.md)) handles French automatically:

1. **Phase 1** ([`merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs)) scans all `<lang>.xml` files, discovers `fr` as a language code, and generates `BMB_Strings_<Category>.xml` in `Mods/src/Data/Localization/French/`.
2. **Language mapping** ([`lang-config.mjs`](../../../../scripts/lib/lang-config.mjs)) already includes `fr: { folder: 'French', locale: 'fr_FR' }`.
3. **No code changes** are needed — the pipeline auto-discovers `fr.xml` files.

### Translation file format

Each `fr.xml` must mirror the structure of its sibling `en.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Nom traduit</DisplayName>
    <Description>Description traduite.</Description>
    <Provides index="1">Texte de bonus traduit</Provides>
</Translation>
```

Elements vary by category:
- **Items/Weapons/Armor/Clothes**: `<DisplayName>`, `<Description>`, optional `<Provides index="N">`
- **Spells**: `<DisplayName>`, `<Description>`, optional `<ModifierDisplayName index="N">`
- **Abilities**: `<DisplayName>`, `<Description>`, optional `<Provides index="N">`
- **Units**: `<DisplayName>`, optional `<Backstory>`
- **Unit-stats**: `<DisplayName>`, `<Description>`, optional `<DisplayNameShort>`

### Encoding & conventions

Per [`constraints.md`](../../project-manifest/constraints.md):
- **UTF-8 (no BOM)** — mandatory for all XML files
- French accented characters (é, è, ê, ë, à, â, ç, ù, û, ô, î, ï, etc.) stored as UTF-8 byte sequences
- XML entities for `&`, `<`, `>`, `'`, `"` where needed (e.g., `&apos;`)

## Approach / Architecture

### Work organization: batched by category

Given 371 files, the work is organized into **8 work packages** — one per translatable category. This aligns with the project's directory structure and allows independent, parallelizable work. Each work package produces a set of `fr.xml` files that can be built and verified independently.

| # | Category | Directory | Entry Count | Complexity |
|---|----------|-----------|-------------|------------|
| 1 | Items | `xml/items/` | 88 | Medium — many have `<Provides>` text |
| 2 | Weapons | `xml/weapons/` | 71 | Medium — many have `<Provides>` text |
| 3 | Armor | `xml/armor/` | 85 | Low — mostly `DisplayName` + `Description` |
| 4 | Clothes | `xml/clothes/` | 19 | Low — mostly `DisplayName` + `Description` |
| 5 | Spells | `xml/spells/` | 81 | High — many have `<ModifierDisplayName>` lists |
| 6 | Abilities | `xml/abilities/` | 2 | Low — only 2 entries |
| 7 | Units | `xml/units/` | 22 | High — `<Backstory>` is long narrative text |
| 8 | Unit Stats | `xml/unit-stats/` | 3 | Low — only 3 entries |

### Translation approach

For each entry:
1. Read the `en.xml` file to get the English source text.
2. Translate all text elements to French, preserving:
   - The exact XML structure (same elements, same `index` attributes)
   - XML entity encoding (e.g., `&apos;` stays as `&apos;`)
   - Multi-line text formatting (literal newlines where present)
3. Write the `fr.xml` file with identical structure but French content.

### Translation guidelines

- **Item/weapon/armor names**: Translate descriptively where the name conveys meaning (e.g., "Freezing Axe" → "Hache Glaciale"). Keep proper nouns and fantasy names untranslated (e.g., "Vetrar" stays "Vetrar").
- **Descriptions**: Full literary translation preserving the fantasy tone and flavor.
- **Provides text**: Translate the descriptive part; keep game mechanic terms recognizable (e.g., "Backswing", "Cleave" can be translated but should remain clear to French-speaking players).
- **Spell ModifierDisplayNames**: Translate potion/effect names.
- **Unit backstories**: Full narrative translation preserving the lore tone (second-person for Wraith units, third-person for others per [`constraints.md`](../../project-manifest/constraints.md)).
- **Unit stat names**: Translate display names; keep descriptions clear and concise.

## Rationale

- **Category-based batching** matches the project's directory structure and the build pipeline's per-category output files, making verification straightforward.
- **No tooling changes needed** — the existing build pipeline ([`merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs)) and language config ([`lang-config.mjs`](../../../../scripts/lib/lang-config.mjs)) already support French. This is purely a content addition.
- **Starting with low-complexity categories** (abilities, unit-stats, clothes) allows early validation of the workflow before tackling the larger categories.

## Detailed Steps

### Phase 1: Low-complexity categories (24 files)

1. **Create `fr.xml` for `xml/abilities/` (2 entries)**
   - `xml/abilities/BMB_EruditeAbility/fr.xml`
   - `xml/abilities/BMB_FamousAbility/fr.xml`

2. **Create `fr.xml` for `xml/unit-stats/` (3 entries)**
   - `xml/unit-stats/UnitStat_BlackSpike/fr.xml`
   - `xml/unit-stats/UnitStat_Mastersmith/fr.xml`
   - `xml/unit-stats/UnitStat_PenitentsSuffering/fr.xml`

3. **Create `fr.xml` for `xml/clothes/` (19 entries)**
   - All 19 clothing entry directories

4. **Validation checkpoint**: Run `npm run build` and verify:
   - `Mods/src/Data/Localization/French/BMB_Strings_Abilities.xml` is generated
   - `Mods/src/Data/Localization/French/BMB_Strings_UnitStats.xml` is generated
   - `Mods/src/Data/Localization/French/BMB_Strings_Clothes.xml` is generated
   - No build warnings about missing `fr.xml` files for these categories
   - Generated XML is well-formed and uses `<Locale ID="fr_FR">`

### Phase 2: Medium-complexity categories (244 files)

5. **Create `fr.xml` for `xml/armor/` (85 entries)**
   - All 85 armor entry directories

6. **Create `fr.xml` for `xml/items/` (88 entries)**
   - All 88 item entry directories (many include `<Provides>` elements)

7. **Create `fr.xml` for `xml/weapons/` (71 entries)**
   - All 71 weapon entry directories (many include `<Provides>` elements)

8. **Validation checkpoint**: Run `npm run build` and verify:
   - `Mods/src/Data/Localization/French/BMB_Strings_Armor.xml` is generated
   - `Mods/src/Data/Localization/French/BMB_Strings_Items.xml` is generated
   - `Mods/src/Data/Localization/French/BMB_Strings_Weapons.xml` is generated

### Phase 3: High-complexity categories (103 files)

9. **Create `fr.xml` for `xml/spells/` (81 entries)**
   - All 81 spell entry directories (many include `<ModifierDisplayName>` lists)

10. **Create `fr.xml` for `xml/units/` (22 entries)**
    - All 22 unit entry directories (include `<Backstory>` narrative text)

11. **Final validation**: Run `npm run build` and verify:
    - All 8 `BMB_Strings_<Category>.xml` files exist under `Mods/src/Data/Localization/French/`
    - Build completes without errors
    - Spot-check a few generated files for correct `fr_FR` locale ID and French content

### Phase 4: Documentation updates

12. **Update [`Mods/README.md`](../../../../Mods/README.md)** — note French translation support in the mod description or localization section.

## Dependencies

- All 371 `en.xml` files must exist (verified: ✅ all present)
- [`scripts/lib/lang-config.mjs`](../../../../scripts/lib/lang-config.mjs) must include `fr` mapping (verified: ✅ already present)
- [`scripts/lib/merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs) must auto-discover `fr.xml` files (verified: ✅ uses dynamic language discovery)
- Node.js and npm must be available for build verification

## Required Components

### New files (371 total)

| Category | Count | Pattern |
|----------|-------|---------|
| `xml/abilities/<Name>/fr.xml` | 2 | NEW |
| `xml/unit-stats/<Name>/fr.xml` | 3 | NEW |
| `xml/clothes/<Name>/fr.xml` | 19 | NEW |
| `xml/armor/<Name>/fr.xml` | 85 | NEW |
| `xml/items/<Name>/fr.xml` | 88 | NEW |
| `xml/weapons/<Name>/fr.xml` | 71 | NEW |
| `xml/spells/<Name>/fr.xml` | 81 | NEW |
| `xml/units/<Name>/fr.xml` | 22 | NEW |

### Modified files

| File | Change |
|------|--------|
| [`Mods/README.md`](../../../../Mods/README.md) | Add French translation to supported languages |

### No code changes

- [`scripts/lib/lang-config.mjs`](../../../../scripts/lib/lang-config.mjs) — already has `fr` entry
- [`scripts/lib/merge-translations.mjs`](../../../../scripts/lib/merge-translations.mjs) — auto-discovers languages
- No new scripts needed

## Assumptions

- The AI agent performing the translation work has sufficient French language capability to produce quality game translations.
- Fantasy proper nouns (character names, place names, faction names) should remain untranslated unless they have established French equivalents in the game's existing French localization.
- Game mechanic terms (stat names like "Attack", "Defense", "HP") should use the same French terms as the base game's French localization where possible.
- The base game ships with French localization files that can be referenced for consistent terminology.

## Constraints

- **UTF-8 (no BOM)** encoding for all `fr.xml` files — per [`constraints.md`](../../project-manifest/constraints.md)
- **XML structure must exactly match** the corresponding `en.xml` — same elements, same `index` attributes, same nesting
- **No inline English** — all player-facing text must be translated; do not leave English text in `fr.xml`
- **XML entity encoding** must be preserved (e.g., `&apos;` for apostrophes, which are very common in French)
- **File naming**: exactly `fr.xml` (lowercase, no prefix/suffix)

## Out of Scope

- Other languages (German, Spanish, etc.) — this plan covers French only
- Changes to `fragment.xml` files — no game data modifications
- Changes to the build pipeline or scripts
- In-game testing of French text rendering (UI overflow, font support)
- Translation of `BMB.str` weapon type labels (separate system, not part of per-entry translations)
- Translation of `effects/` or `core-items-mods/` entries (no player-facing text)

## Acceptance Criteria

1. All 371 entry directories contain a `fr.xml` file
2. Every `fr.xml` file is valid XML with UTF-8 encoding (no BOM)
3. Every `fr.xml` file has the same XML structure as its sibling `en.xml` (same elements, same index attributes)
4. All text content in `fr.xml` files is in French (no untranslated English text except proper nouns)
5. `npm run build` completes successfully and generates 8 `BMB_Strings_<Category>.xml` files under `Mods/src/Data/Localization/French/`
6. Generated French localization files use `<Locale ID="fr_FR">`
7. [`Mods/README.md`](../../../../Mods/README.md) is updated to reflect French language support

## Testing Strategy

### Automated verification

- **Build test**: `npm run build` must complete without errors and generate all 8 French localization files
- **Key verification**: `npm run verify-keys` continues to pass (this checks English keys; French is additive)
- **XML well-formedness**: The build pipeline's XML parser will reject malformed `fr.xml` files during merge

### Manual verification

- **Spot-check** 5–10 generated `BMB_Strings_<Category>.xml` files for correct French content and `fr_FR` locale
- **Structure comparison**: For a sample of entries, compare `fr.xml` element structure against `en.xml` to confirm they match
- **Encoding check**: Open a few `fr.xml` files with accented characters and verify they display correctly (not mojibake)

### In-game testing (post-deployment, out of scope for this plan)

- Switch game language to French and verify mod item names/descriptions display correctly
- Check for UI text overflow on items with longer French translations

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Translation quality** — AI-generated translations may have awkward phrasing or incorrect game terminology | Review translations against base game French localization for consistent terminology; flag entries needing human review |
| **XML structure mismatch** — `fr.xml` missing elements or wrong index values | Each `fr.xml` must be created by copying the `en.xml` structure and replacing only text content; build pipeline will warn on missing keys |
| **Encoding errors** — accented characters corrupted | Enforce UTF-8 (no BOM) in all file writes; French uses many accented characters (é, è, ê, à, ç, etc.) that must be valid UTF-8 |
| **Scale of work** — 371 files is a large batch, risk of inconsistency | Batch by category with validation checkpoints; use consistent translation patterns within each category |
| **Apostrophe handling** — French uses many apostrophes (l', d', qu', etc.) | Use `&apos;` XML entity consistently, matching the pattern in existing `en.xml` files (e.g., `Philosopher&apos;s Stone`) |
| **Long French text** — French translations are typically 15–20% longer than English | Not a file-level concern (the game handles text wrapping), but note for future UI testing |
| **Build pipeline warnings** — partial completion generates warnings for missing `fr.xml` in other categories | Expected during phased implementation; warnings are non-fatal and resolve as each category is completed |
