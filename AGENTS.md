# AGENTS.md — Black Market Bazaar

> **Purpose:** Operating manual for AI agents entering this codebase.
> Read this file first. Follow its directives. No exceptions.

---

## 1. Project Overview

**Black Market Bazaar (BMB)** is a content mod for the PC game *Elemental: Reforged* (formerly *Fallen Enchantress: Legendary Heroes*). It adds new items, spells, and clothing pieces via XML data files. This repository is the development workspace — it is not a compiled application.

---

## 2. Project Manifest — Start Here

**Location:** `docs/`

The manifest is the canonical documentation source. Read it before touching any XML file.

| Document | Path | Purpose |
|---|---|---|
| Project README | `README.md` | High-level mod description and history |
| Game Data Reference | `docs/game-data/README.md` | Base game XML schemas, folder layout, encoding rules, Reforged breaking changes |
| Modding Guide | `docs/modding-guide/README.md` | BMB-specific XML patterns, naming conventions, validation checklist |
| Mod Module README | `Mods/README.md` | File inventory, naming conventions, Reforged compatibility changelog |
| Local Workspace | `local-workspace.md` | Multi-root workspace layout and disk paths |
| Research Notes | `docs/agents/research/` | Compatibility research documents |
| Plans | `docs/agents/plans/` | Agent work plans (dated directories) |
| Implementation History | `docs/agents/implementation-history/` | Archived implementation plans and synthesis documents |

### Quick Start Workflow

1. **Read** `README.md` — understand what the mod is.
2. **Read** `docs/modding-guide/README.md` — learn the XML patterns, naming conventions, and Reforged constraints.
3. **Read** `docs/game-data/README.md` — understand the base game's data schemas.
4. **Read** `Mods/README.md` — review the file inventory and recent compatibility changes.
5. **Reference** specific XML files only after completing steps 1–4.

---

## 3. Manifest Maintenance Rules

When you change code, update the corresponding manifest documents:

| Change Made | Documents to Update |
|---|---|
| New item / weapon / armor / clothing added | Add fragment to `xml/<subfolder>/`, `Mods/README.md` (file inventory & counts), `docs/modding-guide/README.md` (if new pattern) |
| New spell or ability added | Add fragment to `xml/<subfolder>/`, `Mods/README.md`, `docs/modding-guide/README.md` |
| New unit added | Add fragment to `xml/units/`, `Mods/README.md` |
| New XML fragment subfolder added | `Mods/README.md` (file inventory table), `scripts/lib/merge-xml.mjs` (MERGE_CONFIG), `Mods/module-context.yaml`, `context.yaml` |
| Icon or texture added | `Mods/src/Gfx/Black Market Bazaar Icons/` (place file), `Mods/README.md` (update counts if noted) |
| String table entry added | `Mods/src/Data/BMB.str` |
| Base game override changed | Add/edit fragment in `xml/core-items-mods/`, `Mods/README.md` (compatibility section) |
| Naming convention changed | `docs/modding-guide/README.md` |
| Game data schema discovered | `docs/game-data/README.md` |
| New Reforged breaking change found | `docs/game-data/README.md`, `docs/modding-guide/README.md` |
| Directory restructured | `context.yaml`, relevant `module-context.yaml` files |
| New `npm run` script or menu item added | `README.md` (Script Runner — Available menu items table), `AGENTS.md` (Project Stats Build Tool row if applicable) |

---

## 4. Efficiency Rules — Search Smart

- **Finding files?** Check the file inventory table in `Mods/README.md` FIRST.
- **Editing item/spell/unit content?** Edit the fragment file in `xml/<subfolder>/` — NOT the monolithic files in `Mods/src/Data/GameCore/` (those are generated).
- **Understanding XML schemas?** Check `docs/game-data/README.md` FIRST.
- **Implementation patterns & conventions?** Check `docs/modding-guide/README.md` FIRST.
- **Reforged compatibility rules?** Check BOTH `docs/game-data/README.md` and `docs/modding-guide/README.md` FIRST.
- **Only then** read source XML fragment files in `xml/`.

Do NOT scan all XML files to discover structure. The manifest already documents it.
Do NOT edit monolithic XML files in `Mods/src/Data/GameCore/` directly — they are generated from `xml/` fragments during `npm run build`.

---

## 5. Failure Protocol & Decision Matrix

| Scenario | Action | Priority |
|---|---|---|
| Ambiguous XML schema requirement | Use most restrictive interpretation; check base game `GameCore/` files for precedent | MUST |
| Manifest/code conflict | Trust manifest, flag code for fix | MUST |
| Missing documentation | Flag gap, do not invent facts | MUST |
| Untested code path | Proceed with caution, add note for in-game smoke test | SHOULD |
| `InternalName` collision uncertainty | Search ALL BMB XML files for the name before using it | MUST |
| Unsure about Reforged compatibility | Check `docs/game-data/README.md` deprecation notes; do not guess | MUST |
| New consumable item added | Verify `HideInHiergamenon=1` is present if `IsUsable=1` and no `CanBeEquipped` | MUST |
| New non-weapon equipment added | Do NOT include `Skeleton` in `SupportedUnitModelType` | MUST |
| New ability for item-granted use | Do NOT add `AbilityBonusType`; omit it entirely | MUST |
| File encoding unclear | Always use UTF-8 (no BOM); never ISO-8859-1 | MUST |

---

## 6. Key Conventions

### InternalName Prefix

All BMB entities use the `BMB_` prefix:

- Items / weapons / armor / clothes: `BMB_PascalCaseName`
- Abilities: `BMB_PascalCaseAbilityName`
- Spells: `BMB_PascalCaseSpellName`
- Units: `BMB_Unit_Description_AI` (AI army) or `BMB_Unit_Description` (summons)

### File Encoding

All XML files MUST use **UTF-8** (no BOM). Declare in the XML prolog:

```xml
<?xml version="1.0" encoding="utf-8"?>
```

### Art File Naming

- Icons: `BMB_PascalCaseName.png` (must match `InternalName`)
- Ability icons: `BMB_Ability_PascalCaseName.png`
- 3D textures: `BMB_PascalCaseName_Texture.dds`

### Script OS Independence

All scripts in `scripts/` MUST be OS-independent. Targeted platforms: Windows, macOS, and Unix (Linux).

- Use `node:path` (`path.join`, `path.resolve`) for all file paths — never hardcode separators.
- Use `node:fs` / `node:fs/promises` for file operations — never shell-specific commands (`rm`, `del`, `xcopy`, `cp`).
- Use `node:child_process` with `execSync`/`spawn` when invoking external tools — never platform-specific shells.
- ANSI escape sequences are acceptable for terminal styling (supported on all target platforms).
- Config examples must show paths for all three platforms.

---

## 7. Project Stats

| Property | Value |
|---|---|
| **Language** | XML (game data definitions) |
| **Game** | Elemental: Reforged (Steam) |
| **Original Game** | Fallen Enchantress: Legendary Heroes |
| **Mod Format** | Loose XML files + PNG/DDS assets |
| **Encoding** | UTF-8 (no BOM) |
| **Architecture** | Flat XML file set with `InternalName` cross-references |
| **Package Manager** | N/A (manual file deployment) |
| **Test Framework** | Manual in-game smoke testing |
| **Build Tool** | `npm run build` (`scripts/build.mjs` — merges XML fragments, then deploys mod to game folder) |
| **XML Fragment Merge** | `scripts/lib/merge-xml.mjs` (assembles `xml/` fragments into `Mods/src/Data/GameCore/`) |
| **XML Split (migration)** | `scripts/split-xml.mjs` (one-time: splits monolithic XML into fragments) |
| **Reference Generator** | `npm run reference` (`scripts/generate-reference.mjs` — generates `docs/references/items.md`) |
| **Context Generator** | CTX Generator (`context.yaml`) |
| **String Table** | `Mods/src/Data/BMB.str` |

---

## 8. Workspace Layout

This is a **multi-root workspace** with three folders:

| Folder | Purpose |
|---|---|
| `felh-black-market-bazaar/` | Mod development (this repository) |
| `ElementalReforged/` (My Documents) | User mod deployment target |
| `Elemental Reforged/` (Steam) | Base game install; read-only reference for `data/` |

See `local-workspace.md` for full disk paths.

---

## 9. File Map

```
felh-black-market-bazaar/
├── AGENTS.md                          ← You are here
├── CLAUDE.md                          ← Imports AGENTS.md for Claude agents
├── README.md                          ← Project overview
├── context.yaml                       ← CTX Generator config
├── local-workspace.md                 ← Multi-root workspace paths
├── design/                            ← PSD source files for icons
├── xml/                               ← XML fragment source files (SOURCE OF TRUTH)
│   ├── items/                         ← One .xml per item → BMB_Items.xml
│   ├── weapons/                       ← One .xml per weapon → BMB_Weapons.xml
│   ├── armor/                         ← One .xml per armor piece → BMB_Armor.xml
│   ├── clothes/                       ← One .xml per clothing item → BMB_Clothes.xml
│   ├── spells/                        ← One .xml per spell → BMB_Spells.xml
│   ├── abilities/                     ← One .xml per ability → BMB_Abilities.xml
│   │   └── _meta.xml                  ← DataChecksum metadata
│   ├── effects/                       ← One .xml per effect → BMB_Effects.xml
│   ├── units/                         ← One .xml per unit → BMB_Units.xml
│   ├── unit-stats/                    ← One .xml per unit stat → BMB_UnitStats.xml
│   └── core-items-mods/               ← One .xml per base game override → BMB_CoreItemsModifications.xml
├── docs/
│   ├── agents/
│   │   ├── implementation-history/    ← Archived implementation plans & synthesis
│   │   ├── plans/                     ← Agent work plans (dated)
│   │   └── research/                  ← Compatibility research
│   ├── game-data/
│   │   ├── README.md                  ← Base game XML reference
│   │   └── module-context.yaml
│   ├── modding-guide/
│   │   ├── README.md                  ← BMB modding patterns & rules
│   │   └── module-context.yaml
│   └── references/
│       └── items.md                   ← Auto-generated item reference (npm run reference)
├── scripts/
│   ├── build.mjs                      ← Build/deploy script (merges fragments + deploys)
│   ├── split-xml.mjs                  ← One-time migration script (monolithic → fragments)
│   ├── generate-reference.mjs         ← Item reference generator
│   ├── menu.mjs                       ← Interactive terminal menu
│   ├── prepare.mjs                    ← Config-reminder hook
│   └── lib/
│       ├── merge-xml.mjs              ← XML fragment merge module
│       └── output.mjs                 ← Shared console output helpers
└── Mods/
    ├── README.md                      ← Mod file inventory & changelog
    ├── module-context.yaml            ← CTX Generator module config
    └── src/
        ├── BlackMarketBazaar.elemd    ← Mod definition file
        ├── Data/
        │   ├── BMB.str                ← String table
        │   └── GameCore/              ← GENERATED from xml/ (git-ignored)
        │       ├── BMB_Items.xml
        │       ├── BMB_Weapons.xml
        │       ├── BMB_Armor.xml
        │       ├── BMB_Clothes.xml
        │       ├── BMB_Spells.xml
        │       ├── BMB_Abilities.xml
        │       ├── BMB_Effects.xml
        │       ├── BMB_Units.xml
        │       ├── BMB_UnitStats.xml
        │       └── BMB_CoreItemsModifications.xml
        └── Gfx/
            └── Black Market Bazaar Icons/ ← 227 PNG icons + 16 DDS textures
```
