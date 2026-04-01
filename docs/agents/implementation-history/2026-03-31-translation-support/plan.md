# Plan: Add Translation Support via Game Localization Layer

## Summary

Migrate the Black Market Bazaar mod from hardcoded English strings to the game's XML-based localization system. This involves restructuring the `xml/` fragment directory from flat files to per-entry directories with co-located translation files, extracting all translatable text into localization key references (`TXT_BMB_*`), and updating the build pipeline to merge both game data fragments and translation fragments into their respective output locations. The result is a fully translation-ready mod where translators work on small, focused per-item translation files rather than monolithic string tables.

## Architectural Context

### Current state

- **404 XML fragment files** in [`xml/`](xml/) contain all mod content, stored as flat files:
  ```
  xml/items/AmuletOfContamination.xml
  xml/items/BirdOfCelerity.xml
  xml/weapons/Axe_Freezing.xml
  ```
- All player-facing text is **hardcoded in English** directly in the XML fragments:
  - `<DisplayName>` — 629 occurrences (including ~250+ inside `<GameModifier>` blocks)
  - `<Description>` — 331 occurrences
  - `<Provides>` — 466 occurrences
  - `<Backstory>` — 22 occurrences (in unit fragments)
  - `<DisplayName>` inside `<GameModifier>` blocks (in spell fragments)
- The existing [`BMB.str`](Mods/src/Data/BMB.str) string table uses the legacy `.str` format for 3 weapon upgrade type labels only.
- The build pipeline ([`scripts/build.mjs`](scripts/build.mjs)) merges fragments via [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs) into monolithic XML files in [`Mods/src/Data/GameCore/`](Mods/src/Data/GameCore/), then deploys `Mods/src/` to the game folder.
- The [`xml/abilities/_meta.xml`](xml/abilities/_meta.xml) already contains a `<Translate>DisplayName,Description</Translate>` directive — a game engine hint about translatable fields.

### Game's localization system

The base game uses an XML-based localization system:

1. **Localization XML files** live in `data/Localization/<Language>/Strings_*.xml` with this format:
   ```xml
   <?xml version='1.0' encoding='utf-8'?>
   <GameText>
     <Locale ID="en_US">
       <Line Key="TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME" Note="DisplayName for AmuletOfFlames">
         <Text>Amulet of Flames</Text>
       </Line>
     </Locale>
   </GameText>
   ```

2. **Game data XML** references keys instead of plain text:
   ```xml
   <DisplayName>TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME</DisplayName>
   ```

3. **Supported languages** (from `LocalizationDefs.xml`): English, German, French, Spanish, Chinese, Japanese, Korean, Russian. Locale IDs: `en_US`, `de_DE`, `fr_FR`, `es_ES`, `zh_CN`, `ja_JP`, `ko_KR`, `ru_RU`.

4. **Mods can provide their own localization files** in `Data/Localization/<Language>/`. The Champion Bonanza mod (also by Hellions, deployed at `Mods/3675545904/`) demonstrates this with `Data/Localization/English/ChampionBonanza_Strings.xml` using `TXT_CB_*` key prefixes.

5. **The `.str` file format** is a separate, older system for UI table aliases. It coexists with the XML localization system and does NOT need to be migrated.

### Key files involved

| File | Role |
|---|---|
| [`xml/`](xml/) (404 fragments) | Source of truth — will be restructured into per-entry directories |
| [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs) | Fragment merge module — needs update for new directory structure + translation merge |
| [`scripts/build.mjs`](scripts/build.mjs) | Build pipeline — unchanged (already calls merge, already deploys `Mods/src/`) |
| [`Mods/src/Data/BMB.str`](Mods/src/Data/BMB.str) | Legacy string table — **kept as-is** |
| [`Mods/src/BlackMarketBazaar.elemd`](Mods/src/BlackMarketBazaar.elemd) | Mod definition file |

## Approach / Architecture

### Per-entry directory structure with co-located translations

The core architectural change is restructuring `xml/` from flat files to per-entry directories:

**Before:**
```
xml/items/AmuletOfContamination.xml
xml/items/BirdOfCelerity.xml
xml/weapons/Axe_Freezing.xml
```

**After:**
```
xml/items/AmuletOfContamination/
├── fragment.xml          ← Game data (with TXT_BMB_* keys)
├── en.xml                ← English translation
├── de.xml                ← German translation (added by translator)
└── fr.xml                ← French translation (added by translator)

xml/items/BirdOfCelerity/
├── fragment.xml
├── en.xml
└── ...

xml/weapons/Axe_Freezing/
├── fragment.xml
├── en.xml
└── ...
```

This design means:
- A translator working on "Bird of Celerity" opens `xml/items/BirdOfCelerity/` and sees the game data fragment alongside all existing translations.
- Adding a new language is as simple as creating a new `<lang>.xml` file in each entry directory.
- No monolithic string tables to navigate — each translation file contains only the strings for that one entry.

### Translation file format

Each per-entry translation file (e.g., `en.xml`) uses a simplified format:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Bird of Celerity</DisplayName>
    <Description>This beautiful statuette allows its owner to distort the space and time continuum and cast haste on a global scale.</Description>
    <Provides index="1">Allows the wielder to cast Mass Haste</Provides>
</Translation>
```

This format is:
- **Simple** — translators only see the fields they need to translate, no game engine boilerplate.
- **Self-contained** — each file has all translatable strings for one entry.
- **Indexed** — `<Provides>` uses an `index` attribute to match the sequential order of `<GameModifier>` blocks in the fragment.

For spells with `<GameModifier><DisplayName>` (like [`BMB_AlchemicalSurprise.xml`](xml/spells/BMB_AlchemicalSurprise.xml)):
```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Alchemical Surprise</DisplayName>
    <Description>Random alchemical formula.</Description>
    <ModifierDisplayName index="1">Healing Nectar!</ModifierDisplayName>
    <ModifierDisplayName index="2">Healing Nectar!</ModifierDisplayName>
    <!-- ... -->
</Translation>
```

For units with `<Backstory>`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Lightning Strikers</DisplayName>
    <Backstory>..."I seek no mercenaries..."...</Backstory>
</Translation>
```

For abilities with nested `<AbilityBonusOption>`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Erudite</DisplayName>
    <Description>+30% Experience and 10% Research</Description>
    <Provides index="1">+30% Experience</Provides>
    <Provides index="2">+10% Research</Provides>
</Translation>
```

### Key naming convention

Following the base game pattern and the Champion Bonanza precedent (`TXT_CB_*`):

```
TXT_BMB_{CATEGORY}_{INTERNALNAME}_{FIELD}
```

Where:
- `{CATEGORY}` = `ITEMS`, `WEAPONS`, `ARMOR`, `CLOTHES`, `SPELLS`, `ABILITIES`, `UNITS`, `UNITSTATS`
- `{INTERNALNAME}` = The `InternalName` attribute, uppercased (e.g., `BIRDOFCELERITY`, `AXE_FREEZING`)
- `{FIELD}` = `DISPLAYNAME`, `DESCRIPTION`, `PROVIDES_1`, `PROVIDES_2`, `BACKSTORY`, `MODIFIER_1_DISPLAYNAME`, etc.

Examples:
```
TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME
TXT_BMB_ITEMS_BIRDOFCELERITY_DESCRIPTION
TXT_BMB_ITEMS_BIRDOFCELERITY_PROVIDES_1
TXT_BMB_WEAPONS_AXE_FREEZING_DISPLAYNAME
TXT_BMB_WEAPONS_AXE_FREEZING_PROVIDES_1
TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_1_DISPLAYNAME
TXT_BMB_UNITS_BMB_UNIT_ALTARIAN_MAGE_LIGHTNING_AI_BACKSTORY
TXT_BMB_ABILITIES_BMB_ERUDITE_DISPLAYNAME
```

### Build pipeline: merged localization output

The build pipeline merges per-entry translation files into monolithic localization XML files for deployment:

```
Mods/src/Data/Localization/
├── English/
│   ├── BMB_Strings_Items.xml        ← Merged from xml/items/*/en.xml
│   ├── BMB_Strings_Weapons.xml      ← Merged from xml/weapons/*/en.xml
│   ├── BMB_Strings_Armor.xml        ← Merged from xml/armor/*/en.xml
│   ├── BMB_Strings_Clothes.xml      ← Merged from xml/clothes/*/en.xml
│   ├── BMB_Strings_Spells.xml       ← Merged from xml/spells/*/en.xml
│   ├── BMB_Strings_Abilities.xml    ← Merged from xml/abilities/*/en.xml
│   ├── BMB_Strings_Units.xml        ← Merged from xml/units/*/en.xml
│   └── BMB_Strings_UnitStats.xml    ← Merged from xml/unit-stats/*/en.xml
├── French/                           ← Only created if fr.xml files exist
│   ├── BMB_Strings_Items.xml
│   └── ...
└── German/                           ← Only created if de.xml files exist
    ├── BMB_Strings_Items.xml
    └── ...
```

The merge step:
1. Scans all entry directories for translation files (`en.xml`, `de.xml`, `fr.xml`, etc.).
2. For each language found, generates monolithic localization XML files in the game's expected format.
3. Uses the correct `<Locale ID="...">` for each language (e.g., `en_US`, `de_DE`, `fr_FR`).
4. Uses the correct language folder name (e.g., `English`, `German`, `French`).

### Language code mapping

| File suffix | Folder name | Locale ID |
|---|---|---|
| `en.xml` | `English` | `en_US` |
| `de.xml` | `German` | `de_DE` |
| `fr.xml` | `French` | `fr_FR` |
| `es.xml` | `Spanish` | `es_ES` |
| `zh.xml` | `Chinese` | `zh_CN` |
| `ja.xml` | `Japanese` | `ja_JP` |
| `ko.xml` | `Korean` | `ko_KR` |
| `ru.xml` | `Russian` | `ru_RU` |
| `it.xml` | `Italian` | `it_IT` |
| `pl.xml` | `Polish` | `pl_PL` |
| `pt.xml` | `Portuguese` | `pt_BR` |

### What is NOT localized

- **`InternalName` attributes** — engine identifiers, never displayed to players.
- **`StrVal` values** — references to game stat/ability InternalNames.
- **`AIPrefType`, `AIPriority`** — AI configuration values.
- **`IconFile`, `ModelFile`, `Texture_*`** — asset file references.
- **`SFX`, `AttackSFX`, `EquipSFX`** — sound references.
- **`BMB.str` entries** — separate system for UI table aliases.
- **`effects/` fragments** — no player-facing text (only particle/visual configuration). These stay as flat files.
- **`core-items-mods/` fragments** — base game item overrides that already have their own localization. These stay as flat files.
- **`abilities/_meta.xml`** — metadata, not a content entry. Stays as a flat file.

### Handling special cases

1. **`effects/` and `core-items-mods/` subfolders**: These contain no translatable text. Their fragments remain as flat files (no directory restructuring). The merge script must handle both flat files and entry directories.

2. **`abilities/_meta.xml`**: This is a metadata file (prefixed with `_`), not a content entry. It stays as a flat file in `xml/abilities/`. The merge script already skips `_`-prefixed files.

3. **Duplicate `<Provides>` text**: Many items share identical text (e.g., "+2 Fire Attack"). Each occurrence gets its own unique key to allow per-item translation flexibility, matching the base game pattern.

4. **`<GameModifier><DisplayName>` in spells**: These are display names for random modifier outcomes. They get `<ModifierDisplayName index="N">` entries in the translation file.

5. **Abilities with nested `<AbilityBonusOption>`**: The translatable fields are on the option child. The key uses the option's `InternalName`.

## Rationale

- **Per-entry directories over monolithic string tables**: Translators work on one item at a time, seeing the game data alongside the translation. This is far more ergonomic than scrolling through a 1,000+ line string table. It also reduces merge conflicts when multiple translators work simultaneously.
- **Co-located translation files**: Having `en.xml` next to `fragment.xml` means a translator can immediately see the English source text while writing their translation. No cross-referencing between distant files.
- **Build-time merge into monolithic localization XML**: The game engine expects monolithic `Strings_*.xml` files in `Data/Localization/<Language>/`. The build pipeline handles this transformation transparently.
- **Simple `<Translation>` format**: The per-entry translation files use a minimal format that strips away all game engine boilerplate. Translators only see the text they need to translate.
- **Keeping `BMB.str`**: The `.str` file serves a different purpose (weapon upgrade type UI labels) and coexists with the XML localization system.

## Detailed Steps

### Step 1: Create the directory restructuring migration script

**New file:** `scripts/migrate-to-dirs.mjs`

This one-time migration script:
1. Reads each flat fragment file in `xml/<category>/<InternalName>.xml`.
2. Creates a directory `xml/<category>/<InternalName>/`.
3. Moves the fragment file to `xml/<category>/<InternalName>/fragment.xml`.
4. Extracts all translatable strings from the fragment.
5. Generates the English translation file `xml/<category>/<InternalName>/en.xml`.
6. Replaces the plain text in `fragment.xml` with `TXT_BMB_*` keys.
7. Skips `effects/` and `core-items-mods/` subfolders (no translatable text — flat files stay).
8. Skips `_`-prefixed files (like `_meta.xml`).
9. Reports a summary: entries migrated, strings extracted, per category.

The script must:
- Be idempotent: if a directory already exists with `fragment.xml`, skip it.
- Preserve original fragment formatting (only text content of specific elements changes).
- Use OS-independent paths (`node:path`) per AGENTS.md §6.
- Handle the `AbilityBonusOption` nesting in ability fragments.

### Step 2: Update the merge module for the new directory structure

**Modified file:** [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs)

Update the fragment discovery logic:
1. For each subfolder in `MERGE_CONFIG`, scan for both:
   - **Flat files**: `xml/<category>/<name>.xml` (for `effects/` and `core-items-mods/`)
   - **Entry directories**: `xml/<category>/<name>/fragment.xml` (for all other categories)
2. The `extractFragmentContent()` function remains unchanged — it operates on file content regardless of path.
3. Fragment files are still sorted alphabetically by entry name for deterministic output.

### Step 3: Add translation merge to the build pipeline

**New file:** `scripts/lib/merge-translations.mjs`

This module:
1. Scans all entry directories in `xml/` for translation files (`en.xml`, `de.xml`, `fr.xml`, etc.).
2. Discovers which languages are present (at minimum `en`).
3. For each language found:
   a. Reads all per-entry translation files for that language.
   b. Generates the `TXT_BMB_*` keys from the entry's `InternalName` and category.
   c. Assembles a monolithic localization XML file per category in the game's `<GameText><Locale>` format.
   d. Writes the output to `Mods/src/Data/Localization/<Language>/BMB_Strings_<Category>.xml`.
4. Returns a summary: languages found, strings per language, files written.

**Modified file:** [`scripts/build.mjs`](scripts/build.mjs)

Add the translation merge as a new phase after the XML fragment merge:
```
Phase 0: Merge XML fragments → Mods/src/Data/GameCore/
Phase 1: Merge translations  → Mods/src/Data/Localization/<Language>/
Phase 2: Deploy              → Game folder (existing logic)
```

### Step 4: Run the migration script (one-time)

Execute `node scripts/migrate-to-dirs.mjs` to:
1. Restructure ~370 fragment files into per-entry directories (excluding `effects/` and `core-items-mods/`).
2. Generate ~370 English translation files (`en.xml`).
3. Replace plain text with `TXT_BMB_*` keys in all `fragment.xml` files.

### Step 5: Verify round-trip fidelity

After migration:
1. Run `npm run build` to merge fragments and translations, then deploy.
2. Verify the generated `Mods/src/Data/GameCore/` XML files contain `TXT_BMB_*` keys.
3. Verify the generated `Mods/src/Data/Localization/English/` XML files contain the English text.
4. Verify the deployed mod loads in-game without errors.
5. Verify item names, descriptions, and provides text display correctly in English.

### Step 6: Update the reference generator

**Modified file:** [`scripts/generate-reference.mjs`](scripts/generate-reference.mjs)

Update to resolve `TXT_BMB_*` keys:
1. After merging XML fragments (which it already does), also load the generated English localization XML files.
2. Build a key→text lookup map.
3. When generating the reference document, resolve `TXT_BMB_*` keys to their English text.

### Step 7: Add menu items and npm scripts

**Modified file:** [`scripts/menu.mjs`](scripts/menu.mjs)
- Add menu item: `"Migrate fragments to translation directories"` → `node scripts/migrate-to-dirs.mjs`

**Modified file:** [`package.json`](package.json)
- Add `"migrate-to-dirs": "node scripts/migrate-to-dirs.mjs"` to scripts.

### Step 8: Add generated localization files to `.gitignore`

**Modified file:** [`.gitignore`](.gitignore)

The monolithic localization XML files in `Mods/src/Data/Localization/` are **generated** from the per-entry translation files during build (same as the GameCore XML files). Add them to `.gitignore`:

```
Mods/src/Data/Localization/
```

### Step 9: Update documentation

**[`docs/game-data/README.md`](docs/game-data/README.md)**:
- Expand the Localization section with details about the XML localization file format.
- Document the `Data/Localization/<Language>/` folder structure.
- Document the `<GameText><Locale ID="...">` XML format.
- Document the locale ID mapping table.

**[`docs/modding-guide/README.md`](docs/modding-guide/README.md)**:
- Add a new "Localization" section documenting:
  - The per-entry directory structure (`fragment.xml` + `en.xml` + `<lang>.xml`).
  - The `<Translation>` file format for translators.
  - The `TXT_BMB_*` key naming convention.
  - How to add a new translatable string when creating new items.
  - How to add a new language translation.
  - The relationship between `.str` files and XML localization.
  - Which categories are excluded from localization (`effects/`, `core-items-mods/`).

**[`Mods/README.md`](Mods/README.md)**:
- Add the `Data/Localization/<Language>/` files to the Supporting Files table.
- Note that localization files are generated from per-entry translation files during build.

**[`AGENTS.md`](AGENTS.md)**:
- Update the File Map to include the new directory structure under `xml/`.
- Update the Manifest Maintenance Rules table:
  - New item/weapon/armor/clothing: create entry directory with `fragment.xml` + `en.xml`.
  - New translation: add `<lang>.xml` to existing entry directories.
- Add `merge-translations.mjs` and `migrate-to-dirs.mjs` to the Project Stats table.
- Update Efficiency Rules to mention the per-entry directory structure.

**[`README.md`](README.md)**:
- Add the new menu item to the "Available menu items" table.
- Document the translation workflow for contributors.
- Update the Repository Layout table.

## Dependencies

- [`node:fs/promises`](scripts/build.mjs:1) — file I/O (already used throughout)
- [`node:path`](scripts/build.mjs:3) — path construction (already used throughout)
- [`scripts/lib/output.mjs`](scripts/lib/output.mjs) — console output helpers (already exists)
- No new npm dependencies required.

## Required Components

### New files

| File | Purpose |
|---|---|
| `scripts/migrate-to-dirs.mjs` | One-time migration: flat files → per-entry directories + English translation extraction |
| `scripts/lib/merge-translations.mjs` | Translation merge module: per-entry `<lang>.xml` → monolithic `Localization/<Language>/` |
| `xml/<category>/<InternalName>/fragment.xml` | ~370 restructured game data fragments (with `TXT_BMB_*` keys) |
| `xml/<category>/<InternalName>/en.xml` | ~370 English translation files |

### Modified files

| File | Change |
|---|---|
| [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs) | Support both flat files and entry directories |
| [`scripts/build.mjs`](scripts/build.mjs) | Add translation merge phase between fragment merge and deploy |
| [`scripts/generate-reference.mjs`](scripts/generate-reference.mjs) | Resolve `TXT_BMB_*` keys via localization lookup |
| [`scripts/menu.mjs`](scripts/menu.mjs) | Add migration menu item |
| [`package.json`](package.json) | Add `migrate-to-dirs` script |
| [`.gitignore`](.gitignore) | Add `Mods/src/Data/Localization/` |
| [`README.md`](README.md) | Document translation workflow, update layout |
| [`AGENTS.md`](AGENTS.md) | Update File Map, Manifest Maintenance Rules, Project Stats |
| [`docs/game-data/README.md`](docs/game-data/README.md) | Expand Localization section |
| [`docs/modding-guide/README.md`](docs/modding-guide/README.md) | Add Localization section |
| [`Mods/README.md`](Mods/README.md) | Add localization files to inventory |

### Unchanged files

| File | Reason |
|---|---|
| [`Mods/src/Data/BMB.str`](Mods/src/Data/BMB.str) | Legacy `.str` format for weapon type UI labels — separate system |
| `xml/effects/*.xml` (32 files) | No translatable text — stay as flat files |
| `xml/core-items-mods/*.xml` (1 file) | Base game override — uses base game's own localization, stays as flat file |
| `xml/abilities/_meta.xml` | Metadata file — stays as flat file (prefixed with `_`) |

## Assumptions

- The game engine loads localization XML files from `Data/Localization/<Language>/` within mod directories (confirmed by Champion Bonanza mod precedent).
- The `TXT_BMB_*` key prefix is unique enough to avoid collisions with base game keys and other mod keys.
- The game engine falls back to displaying the raw key string if a localization entry is missing.
- The `.str` file system and XML localization system coexist without conflict.
- The `<Locale ID="en_US">` locale identifier is correct for English (confirmed by base game files).
- The merge script can handle a mixed directory structure (flat files in `effects/` and `core-items-mods/`, entry directories elsewhere).
- Translators will create `<lang>.xml` files manually by copying `en.xml` and translating the text content.

## Constraints

- All scripts must be OS-independent per AGENTS.md §6.
- All XML files must use UTF-8 encoding (no BOM) per AGENTS.md §6.
- The migration script must be idempotent (safe to run multiple times).
- The localization XML output must follow the exact format used by the base game.
- The `BMB.str` file must not be modified or removed.
- The `effects/` and `core-items-mods/` subfolders must remain as flat files (no directory restructuring).
- The merge script must support both flat files and entry directories within the same `xml/` tree.

## Out of Scope

- **Actual translations** into non-English languages — this plan only creates the infrastructure and English source files.
- **Localization of the `.elemd` mod definition file** — uses a different format.
- **Localization of the `.str` file entries** — separate system.
- **Automated translation** (machine translation or AI-assisted translation).
- **Translation management platform integration** (Crowdin, Transifex, etc.).
- **Localization testing in non-English game clients**.
- **Translation validation tooling** (checking for missing translations, key mismatches) — can be added later.

## Acceptance Criteria

1. All fragment files with translatable text (excluding `effects/` and `core-items-mods/`) are restructured into per-entry directories: `xml/<category>/<InternalName>/fragment.xml`.
2. Each entry directory contains an `en.xml` file with all translatable strings in the `<Translation>` format.
3. All `<DisplayName>`, `<Description>`, `<Provides>`, `<Backstory>`, and `<GameModifier><DisplayName>` values in `fragment.xml` files are replaced with `TXT_BMB_*` keys.
4. `effects/` and `core-items-mods/` fragments remain as flat files, unchanged.
5. `xml/abilities/_meta.xml` remains as a flat file, unchanged.
6. `npm run build` succeeds and:
   - Generates monolithic GameCore XML files with `TXT_BMB_*` keys.
   - Generates monolithic English localization XML files in `Mods/src/Data/Localization/English/`.
   - Deploys both to the game folder.
7. Every `TXT_BMB_*` key used in fragments has a corresponding entry in the English localization files.
8. The mod loads in Elemental: Reforged without XML parsing errors in `debug.err`.
9. Item names, descriptions, provides text, and backstories display correctly in English in-game.
10. `npm run reference` generates a correct item reference with resolved English names.
11. The `BMB.str` file is unchanged.
12. The migration script is idempotent.
13. All documentation is updated.

## Testing Strategy

- **Migration script**: Run `node scripts/migrate-to-dirs.mjs` and verify:
  - ~370 entry directories created.
  - ~370 `en.xml` files generated.
  - ~370 `fragment.xml` files contain `TXT_BMB_*` keys.
  - `effects/` and `core-items-mods/` are untouched.
  - Running again produces no changes (idempotency).
- **Build verification**: Run `npm run build` and verify:
  - GameCore XML files contain `TXT_BMB_*` keys.
  - `Mods/src/Data/Localization/English/` contains 8 localization XML files.
  - All localization files are valid XML with correct `<GameText><Locale>` structure.
- **Key integrity**: Verify no duplicate keys exist within or across localization files. Verify every key in fragments has a corresponding localization entry and vice versa.
- **Reference generator**: Run `npm run reference` and verify item names are resolved to English text.
- **In-game smoke test**: Load the mod and verify:
  - Item names display correctly in shops and inventory.
  - Item descriptions display correctly in tooltips.
  - Provides text displays correctly on item stat summaries.
  - Unit backstories display correctly.
  - The Hiergamenon shows correct text.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Game engine doesn't load mod localization XML files** | Confirmed working by Champion Bonanza mod precedent. If issues arise, fall back to the `.str` format. |
| **Key naming collisions with base game** | All BMB keys use the `TXT_BMB_` prefix, distinct from base game prefixes. |
| **Regex-based extraction misses edge cases** | Handle: nested elements, multi-line text, XML entities (`&amp;`, `&lt;`), special characters (e.g., `soirées`). Test with known edge cases. |
| **Reference generator breaks during migration** | Update in the same work package as the migration. |
| **Large diff on migration commit** | ~370 files move + ~370 new files + ~370 modified files. Split into logical commits: (1) add scripts, (2) restructure directories, (3) update documentation. |
| **Mixed flat/directory structure confuses merge script** | Explicit configuration in `MERGE_CONFIG`: categories with `translatable: true` use directories, others use flat files. |
| **Translators create malformed XML** | The build script should validate translation files and report clear errors for malformed XML. |
| **Missing translations for some entries in a language** | The merge script should warn about incomplete translations but still generate output for available entries. Missing keys will show as raw `TXT_BMB_*` strings in-game (standard engine fallback). |
