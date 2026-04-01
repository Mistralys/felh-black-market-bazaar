# Project Manifest - File Tree
_SOURCE: Annotated project directory structure_
# Annotated project directory structure
```
// Structure of documents
└── docs/
    └── agents/
        └── project-manifest/
            └── file-tree.md

```
###  Path: `\docs\agents\project-manifest/file-tree.md`

```md
# File Tree

```
felh-black-market-bazaar/
├── AGENTS.md                          ← AI agent operating manual
├── CLAUDE.md                          ← Claude agent entry point (imports AGENTS.md)
├── README.md                          ← Project overview, build instructions, credits
├── package.json                       ← npm scripts and dependencies
├── build.config.json                  ← Local build config (git-ignored, machine-specific)
├── context.yaml                       ← CTX Generator config
├── local-workspace.md                 ← Multi-root workspace disk paths
│
├── xml/                               ← ★ SOURCE OF TRUTH — XML fragment files
│   ├── items/                         ← Per-entry dirs → BMB_Items.xml
│   │   └── <InternalName>/
│   │       ├── fragment.xml           ← Game data (TXT_BMB_* key references)
│   │       ├── en.xml                 ← English translation strings
│   │       └── <lang>.xml             ← Additional language translations (optional)
│   ├── weapons/                       ← Per-entry dirs → BMB_Weapons.xml
│   ├── armor/                         ← Per-entry dirs → BMB_Armor.xml
│   ├── clothes/                       ← Per-entry dirs → BMB_Clothes.xml
│   ├── spells/                        ← Per-entry dirs → BMB_Spells.xml
│   ├── abilities/                     ← Per-entry dirs → BMB_Abilities.xml
│   │   └── _meta.xml                  ← DataChecksum metadata (flat file, not a content entry)
│   ├── units/                         ← Per-entry dirs → BMB_Units.xml
│   ├── unit-stats/                    ← Per-entry dirs → BMB_UnitStats.xml
│   ├── effects/                       ← Flat .xml files → BMB_Effects.xml (no localization)
│   └── core-items-mods/               ← Flat .xml files → BMB_CoreItemsModifications.xml (no localization)
│
├── docs/
│   ├── agents/
│   │   ├── project-manifest/          ← ★ THIS MANIFEST — canonical AI reference
│   │   ├── implementation-history/    ← Archived implementation plans & synthesis
│   │   ├── plans/                     ← Agent work plans (dated directories)
│   │   └── research/                  ← Compatibility research documents
│   ├── game-data/                     ← Base game data reference (consolidated into manifest)
│   ├── modding-guide/                 ← Modding patterns & rules (consolidated into manifest)
│   └── references/
│       ├── items.md                   ← Auto-generated item reference (npm run reference)
│       └── original-felh-readme.txt   ← Original FELH mod readme
│
├── scripts/
│   ├── build.mjs                      ← Build/deploy script (merges fragments + translations, then deploys)
│   ├── generate-reference.mjs         ← Item reference generator (resolves TXT_BMB_* keys)
│   ├── menu.mjs                       ← Interactive terminal menu
│   ├── migrate-to-dirs.mjs            ← One-time migration (flat files → per-entry dirs + en.xml extraction)
│   ├── prepare.mjs                    ← Config-reminder hook (npm prepare)
│   ├── split-xml.mjs                  ← One-time migration script (monolithic → fragments)
│   ├── verify-translation-keys.mjs    ← Standalone entry point for key integrity check
│   └── lib/
│       ├── merge-xml.mjs              ← XML fragment merge module
│       ├── merge-translations.mjs     ← Translation merge module (en.xml → Localization/)
│       ├── verify-translation-keys.mjs ← Key integrity check module (Phase 1.5 of build)
│       ├── xml-parser.mjs             ← Shared fast-xml-parser configurations
│       ├── lang-config.mjs            ← Language code → folder/locale mapping
│       └── output.mjs                 ← Console output helpers (ANSI colour)
│
├── design/                            ← PSD source files for icons
│
└── Mods/
    ├── README.md                      ← Mod file inventory & changelog
    ├── module-context.yaml            ← CTX Generator module config
    └── src/
        ├── BlackMarketBazaar.elemd    ← Mod definition file
        ├── Data/
        │   ├── BMB.str                ← String table (weapon type names)
        │   ├── GameCore/              ← ★ GENERATED from xml/ fragments (git-ignored)
        │   │   ├── BMB_Items.xml
        │   │   ├── BMB_Weapons.xml
        │   │   ├── BMB_Armor.xml
        │   │   ├── BMB_Clothes.xml
        │   │   ├── BMB_Spells.xml
        │   │   ├── BMB_Abilities.xml
        │   │   ├── BMB_Effects.xml
        │   │   ├── BMB_Units.xml
        │   │   ├── BMB_UnitStats.xml
        │   │   └── BMB_CoreItemsModifications.xml
        │   └── Localization/          ← ★ GENERATED from xml/<cat>/<Name>/<lang>.xml (git-ignored)
        │       └── English/
        │           ├── BMB_Strings_Items.xml
        │           ├── BMB_Strings_Weapons.xml
        │           ├── BMB_Strings_Armor.xml
        │           ├── BMB_Strings_Clothes.xml
        │           ├── BMB_Strings_Spells.xml
        │           ├── BMB_Strings_Abilities.xml
        │           ├── BMB_Strings_Units.xml
        │           └── BMB_Strings_UnitStats.xml
        └── Gfx/
            └── Black Market Bazaar Icons/  ← 227 PNG icons + 16 DDS textures
```

## Generated Files (git-ignored)

The following are output artifacts — never edit directly:

| Directory | Generated By | Source |
|---|---|---|
| `Mods/src/Data/GameCore/*.xml` | `merge-xml.mjs` | `xml/<category>/<Name>/fragment.xml` |
| `Mods/src/Data/Localization/<Lang>/*.xml` | `merge-translations.mjs` | `xml/<category>/<Name>/<lang>.xml` |
| `docs/references/items.md` | `generate-reference.mjs` | GameCore + Localization XML |

## GMC Output File Mapping

| Source Directory | Output File | Root Element |
|---|---|---|
| `xml/items/` | `BMB_Items.xml` | `<GameItemTypes>` |
| `xml/weapons/` | `BMB_Weapons.xml` | `<GameItemTypes>` |
| `xml/armor/` | `BMB_Armor.xml` | `<GameItemTypes>` |
| `xml/clothes/` | `BMB_Clothes.xml` | `<GameItemTypes>` |
| `xml/spells/` | `BMB_Spells.xml` | `<Spells>` |
| `xml/abilities/` | `BMB_Abilities.xml` | `<AbilityBonuses>` |
| `xml/effects/` | `BMB_Effects.xml` | `<EffectBlueprints>` |
| `xml/units/` | `BMB_Units.xml` | `<UnitTypes>` |
| `xml/unit-stats/` | `BMB_UnitStats.xml` | `<PlayerAbilityTypes>` |
| `xml/core-items-mods/` | `BMB_CoreItemsModifications.xml` | `<GameItemTypes>` |

## Supporting Files

| File | Purpose |
|---|---|
| `Mods/src/Data/BMB.str` | String table for UI labels (weapon type names: LightningStaff, PoisonStaff, Wand) |
| `Mods/src/BlackMarketBazaar.elemd` | Mod definition file loaded by the game engine |

```
---
**File Statistics**
- **Size**: 7.68 KB
- **Lines**: 144
File: `modules/project-manifest/file-tree.md`
