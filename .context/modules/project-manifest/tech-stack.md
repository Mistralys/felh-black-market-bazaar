# Project Manifest - Tech Stack
_SOURCE: Runtime, game target, frameworks, build tools, shared modules_
# Runtime, game target, frameworks, build tools, shared modules
```
// Structure of documents
└── docs/
    └── agents/
        └── project-manifest/
            └── tech-stack.md

```
###  Path: `\docs\agents\project-manifest/tech-stack.md`

```md
# Tech Stack & Patterns

## Runtime & Language

| Property | Value |
|---|---|
| **Primary language** | XML (game data definitions) |
| **Build scripts** | Node.js (ESM modules) |
| **Node.js requirement** | Current LTS or later |
| **Package manager** | npm |

## Target Game

| Property | Value |
|---|---|
| **Game** | Elemental: Reforged (Steam) |
| **Original game** | Fallen Enchantress: Legendary Heroes |
| **Mod format** | Loose XML files + PNG/DDS assets |
| **Mod definition** | `BlackMarketBazaar.elemd` |

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `fast-xml-parser` | ^5.5.9 | XML parsing for build scripts (translation merge, reference generation, key verification) |

No other runtime or development dependencies.

## Architecture

**Per-entry XML fragment architecture** — each game entity (item, weapon, spell, etc.) lives in its own directory under `xml/<category>/<InternalName>/` containing:

- `fragment.xml` — game data with `TXT_BMB_*` localization key references
- `en.xml` — English translation strings
- `<lang>.xml` — optional additional language translations

Flat-file categories (no translatable text): `effects/`, `core-items-mods/`.

The build pipeline merges fragments into monolithic XML files that the game engine loads. Generated files are git-ignored; the `xml/` directory is the single source of truth.

## Build Tools

| Tool | Entry Point | npm Script | Purpose |
|---|---|---|---|
| Build & Deploy | `scripts/build.mjs` | `npm run build` | Merge XML fragments + translations, verify keys, deploy to game folder |
| XML Fragment Merge | `scripts/lib/merge-xml.mjs` | (internal) | Assembles `xml/` fragments into `Mods/src/Data/GameCore/` |
| Translation Merge | `scripts/lib/merge-translations.mjs` | (internal) | Assembles per-entry `<lang>.xml` into `Mods/src/Data/Localization/` |
| Key Integrity Check | `scripts/lib/verify-translation-keys.mjs` | `npm run verify-keys` | Verifies every `TXT_BMB_*` key in fragments has an English translation |
| Items Reference Generator | `scripts/generate-reference.mjs` | `npm run reference` | Generates `docs/references/items.md` |
| Spells Reference Generator | `scripts/generate-reference-spells.mjs` | `npm run reference:spells` | Generates `docs/references/spells.md` |
| Abilities Reference Generator | `scripts/generate-reference-abilities.mjs` | `npm run reference:abilities` | Generates `docs/references/abilities.md` |
| Units Reference Generator | `scripts/generate-reference-units.mjs` | `npm run reference:units` | Generates `docs/references/units.md` |
| Unit Stats Reference Generator | `scripts/generate-reference-unit-stats.mjs` | `npm run reference:unit-stats` | Generates `docs/references/unit-stats.md` |
| Effects Reference Generator | `scripts/generate-reference-effects.mjs` | `npm run reference:effects` | Generates `docs/references/effects.md` |
| All References (Umbrella) | `scripts/generate-all-references.mjs` | `npm run reference:all` | Generates all 6 reference documents in one pass |
| Interactive Menu | `scripts/menu.mjs` | `npm run menu` | Terminal-based script runner |
| Migration (one-time) | `scripts/migrate-to-dirs.mjs` | `npm run migrate-to-dirs` | Flat files → per-entry directories + English translation extraction |

## Shared Modules

| Module | Path | Purpose |
|---|---|---|
| `xml-parser.mjs` | `scripts/lib/` | Pre-configured `fast-xml-parser` instances for translation XML, localization XML, and GameCore XML |
| `lang-config.mjs` | `scripts/lib/` | Language code → folder/locale mapping (single source of truth for supported languages) |
| `output.mjs` | `scripts/lib/` | Console output helpers with ANSI colour support (`success`, `error`, `warn`, `info`, `step`) |
| `reference-helpers.mjs` | `scripts/lib/` | Shared reference generation utilities: `ensureFreshBuild()`, `loadLocalizationKeys()`, `resolveKey()`, `escapeCell()`, `formatInternalName()`, `formatStatName()`, `formatEffects()` |

## Content Inventory

| Category | Source | Count | Notes |
|---|---|---|---|
| Items (accessories, consumables) | `xml/items/` | — | 31 consumables with `HideInHiergamenon=1` |
| Weapons | `xml/weapons/` | — | Adds LightningStaff, PoisonStaff, Wand types |
| Armor | `xml/armor/` | — | |
| Clothes | `xml/clothes/` | 19 | Sovereign-equippable outfits |
| Spells | `xml/spells/` | 76 | Item-triggered spell definitions |
| Abilities | `xml/abilities/` | — | Item-granted hero/unit abilities |
| Effects | `xml/effects/` | — | Visual effect definitions (no localization) |
| Units | `xml/units/` | — | Custom units (summoned creatures, AI armies) |
| Unit Stats | `xml/unit-stats/` | — | Custom stat type definitions |
| Core Item Mods | `xml/core-items-mods/` | — | Base game item overrides (no localization) |
| Icons | `Mods/src/Gfx/` | 227 PNG | Item icons |
| Textures | `Mods/src/Gfx/` | 16 DDS | 3D model textures |

## Workspace Layout

This is a **multi-root workspace** with three folders:

| Folder | Purpose |
|---|---|
| `felh-black-market-bazaar/` | Mod development (this repository) |
| `ElementalReforged/` (My Documents) | User mod deployment target |
| `Elemental Reforged/` (Steam) | Base game install; read-only reference for `data/` |

See `local-workspace.md` in the project root for full disk paths.

```
---
**File Statistics**
- **Size**: 4.66 KB
- **Lines**: 110
File: `modules/project-manifest/tech-stack.md`
