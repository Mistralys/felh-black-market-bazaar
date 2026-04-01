# Project Manifest - Build Pipeline
_SOURCE: Build script architecture, data flows, and module API surface_
# Build script architecture, data flows, and module API surface
```
// Structure of documents
└── docs/
    └── agents/
        └── project-manifest/
            └── build-pipeline.md

```
###  Path: `\docs\agents\project-manifest/build-pipeline.md`

```md
# Build Pipeline

This document describes the build pipeline architecture, data flow, and module API surface.

---

## Pipeline Overview

```
  npm run build
       │
       ▼
  ┌─────────────────────┐
  │  Phase 0: Merge XML  │  merge-xml.mjs
  │  xml/ → GameCore/    │  Assembles fragment.xml files into monolithic XML
  └──────────┬──────────┘
             ▼
  ┌──────────────────────────┐
  │  Phase 1: Merge Translations │  merge-translations.mjs
  │  en.xml → Localization/      │  Assembles per-entry <lang>.xml into localization XML
  └──────────┬───────────────┘
             ▼
  ┌───────────────────────────────┐
  │  Phase 1.5: Verify Keys       │  verify-translation-keys.mjs
  │  TXT_BMB_* in fragments       │  Checks every key has an English translation
  │  vs. generated localization    │
  └──────────┬────────────────────┘
             ▼
  ┌─────────────────────┐
  │  Phase 2: Deploy     │  build.mjs
  │  Mods/src/ → game    │  Clean delete + copy to deployPath
  └─────────────────────┘
```

---

## Entry Point: `build.mjs`

**npm script:** `npm run build`

Orchestrates the full pipeline:

1. **Phase 0** — Calls `mergeXmlFragments()` from `merge-xml.mjs` (skipped if `xml/` doesn't exist)
2. **Phase 1** — Calls `mergeTranslations()` from `merge-translations.mjs` (skipped if no per-entry directories exist)
3. **Phase 1.5** — Calls `verifyTranslationKeys()` from `verify-translation-keys.mjs`
4. **Phase 2** — Reads `build.config.json`, validates `deployPath` and `modID`, deletes existing deployment, copies `Mods/src/` to deployment target

### Build configuration

`build.config.json` (git-ignored, machine-specific):

```json
{
  "deployPath": "C:\\Users\\...\\My Games\\ElementalReforged\\Mods",
  "modID": "BlackMarketBazaar"
}
```

---

## Module: `merge-xml.mjs`

**Purpose:** Assembles individual XML fragment files into monolithic GameCore XML files.

### Export

```js
export async function mergeXmlFragments()
```

### Behaviour

- Reads `MERGE_CONFIG` — an array mapping each `xml/<subfolder>` to its output file, root element, and flags.
- For **translatable** categories: scans for `<InternalName>/fragment.xml` entry directories.
- For **non-translatable** categories: scans for flat `*.xml` files.
- Mixed mode supported (partial migration states).
- Strips `<Fragment>` wrapper from each fragment during merge.
- Optional `_meta.xml` support (e.g., `abilities/_meta.xml` for `DataChecksum` metadata).
- Writes output to `Mods/src/Data/GameCore/`.
- Uses CRLF line endings.

### MERGE_CONFIG entries

| Subfolder | Output File | Root Element | Translatable |
|---|---|---|---|
| `items` | `BMB_Items.xml` | `GameItemTypes` | yes |
| `weapons` | `BMB_Weapons.xml` | `GameItemTypes` | yes |
| `armor` | `BMB_Armor.xml` | `GameItemTypes` | yes |
| `clothes` | `BMB_Clothes.xml` | `GameItemTypes` | yes |
| `spells` | `BMB_Spells.xml` | `Spells` | yes |
| `abilities` | `BMB_Abilities.xml` | `AbilityBonuses` | yes |
| `effects` | `BMB_Effects.xml` | `EffectBlueprints` | no |
| `units` | `BMB_Units.xml` | `UnitTypes` | yes |
| `unit-stats` | `BMB_UnitStats.xml` | `PlayerAbilityTypes` | yes |
| `core-items-mods` | `BMB_CoreItemsModifications.xml` | `GameItemTypes` | no |

---

## Module: `merge-translations.mjs`

**Purpose:** Assembles per-entry `<lang>.xml` files into monolithic localization XML files.

### Export

```js
export async function mergeTranslations()
```

### Behaviour

- Scans `TRANSLATABLE_CATEGORIES` — the 8 categories with per-entry directories.
- For each entry directory, discovers all `<lang>.xml` files (excluding `fragment.xml`).
- Parses each translation file using `parseTranslationXml()` from `xml-parser.mjs`.
- Generates TXT_BMB_* keys using the entry's InternalName and category.
- Writes `BMB_Strings_<Category>.xml` to `Mods/src/Data/Localization/<Language>/`.
- Output matches base game format: `<GameText><Locale ID="..."><Line Key="..." Note="..."><Text>`.
- Uses CRLF line endings.

### Translatable categories

`items`, `weapons`, `armor`, `clothes`, `spells`, `abilities`, `units`, `unit-stats`

---

## Module: `verify-translation-keys.mjs`

**Purpose:** Verifies every `TXT_BMB_*` key referenced in fragment files has a corresponding English translation entry.

### Export

```js
export async function verifyTranslationKeys()
```

**Standalone:** `npm run verify-keys`

### Behaviour

- Scans all `fragment.xml` files in translatable categories.
- Extracts `TXT_BMB_*` keys using regex: `>(TXT_BMB_[A-Z0-9_]+)<`.
- Loads generated English localization files from `Mods/src/Data/Localization/English/`.
- Reports any keys missing from the localization output.
- Exit code 1 on missing keys (prevents silent broken localization).

---

## Module: `xml-parser.mjs`

**Purpose:** Pre-configured `fast-xml-parser` instances for the three XML formats used in this project.

### Exports

| Function | Purpose |
|---|---|
| `parseTranslationXml(xmlString)` | Parses per-entry `<Translation>` wrapper files — returns `{ displayName, description, backstory, provides[], modifierDisplayNames[] }` |
| `parseLocalizationXml(xmlString)` | Parses generated `<GameText>` localization files — returns `Map<key, text>` |
| `parseGameCoreXml(xmlString)` | Parses GameCore data files — returns raw parsed document |
| `extractAbilityOptionNames(xmlString)` | Extracts `AbilityBonusOption` InternalNames from ability fragments |
| `escapeXml(text)` | XML entity escaping for output assembly |

### Parser configurations

- **Translation parser:** Forces `Provides` and `ModifierDisplayName` into arrays. Restores CRLF from LF-normalised parser output.
- **Localization parser:** Forces `Line` into arrays.
- **GameCore parser:** Forces repeating tags (`Type`, `GameModifier`, `Prereq`, `GameItemTypeModelPack`, `SupportedUnitModelType`, etc.) into arrays.

---

## Module: `lang-config.mjs`

**Purpose:** Single source of truth for language code → folder/locale mapping.

### Export

```js
export const LANGUAGE_MAP = {
  en: { folder: 'English',    locale: 'en_US' },
  de: { folder: 'German',     locale: 'de_DE' },
  fr: { folder: 'French',     locale: 'fr_FR' },
  es: { folder: 'Spanish',    locale: 'es_ES' },
  zh: { folder: 'Chinese',    locale: 'zh_CN' },
  ja: { folder: 'Japanese',   locale: 'ja_JP' },
  ko: { folder: 'Korean',     locale: 'ko_KR' },
  ru: { folder: 'Russian',    locale: 'ru_RU' },
  it: { folder: 'Italian',    locale: 'it_IT' },
  pl: { folder: 'Polish',     locale: 'pl_PL' },
  pt: { folder: 'Portuguese', locale: 'pt_BR' },
};
```

---

## Module: `output.mjs`

**Purpose:** Console output helpers with ANSI colour support.

### Exports

| Function | Symbol | Purpose |
|---|---|---|
| `success(msg)` | ✔ (green) | Completion messages |
| `error(msg)` | ✖ (red) | Error messages (stderr) |
| `warn(msg)` | ⚠ (yellow) | Warning messages (stderr) |
| `info(msg)` | ℹ (cyan) | Informational messages |
| `step(msg)` | (dim) | Progress step messages |

Colour detection: respects `FORCE_COLOR`, `NO_COLOR`, and TTY detection.

---

## Other Scripts

### `generate-reference.mjs`

**npm script:** `npm run reference`

Reads monolithic GameCore XML + English localization, resolves `TXT_BMB_*` keys, and generates `docs/references/items.md`. Triggers a fresh merge before generating.

### `menu.mjs`

**npm script:** `npm run menu`

Interactive terminal menu with alphabetical shortcut keys for all available scripts:
- `[a]` Generate context documentation
- `[b]` Build mod
- `[c]` Generate item reference
- `[d]` Migrate fragments to directories
- `[e]` Verify translation keys

### `migrate-to-dirs.mjs`

**npm script:** `npm run migrate-to-dirs`

One-time migration: restructures flat `xml/<category>/<Name>.xml` files into per-entry directories with separate `fragment.xml` and `en.xml` files. Extracts English text from inline values and replaces them with `TXT_BMB_*` keys.

### `split-xml.mjs`

One-time migration: splits monolithic XML files into individual fragment files.

```
---
**File Statistics**
- **Size**: 8.91 KB
- **Lines**: 254
File: `modules/project-manifest/build-pipeline.md`
