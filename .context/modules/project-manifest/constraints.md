# Project Manifest - Constraints & Conventions
_SOURCE: Mandatory naming conventions, encoding rules, Reforged breaking changes, failure protocol_
# Mandatory naming conventions, encoding rules, Reforged breaking changes, failure protocol
```
// Structure of documents
└── docs/
    └── agents/
        └── project-manifest/
            └── constraints.md

```
###  Path: `\docs\agents\project-manifest/constraints.md`

```md
# Constraints & Conventions

All mandatory rules, naming conventions, Reforged breaking changes, and operational constraints consolidated from across the project documentation.

---

## Table of Contents

1. [InternalName Prefix](#internalname-prefix)
2. [File Encoding](#file-encoding)
3. [Art File Naming](#art-file-naming)
4. [Skeleton Deprecation](#skeleton-deprecation)
5. [HideInHiergamenon for Consumables](#hideinhiergamenon-for-consumables)
6. [AbilityBonusType](#abilitybonustype)
7. [Unit Race Types](#unit-race-types)
8. [WeaponUpgradeType — LightningStaff/FireStaff](#weaponupgradetype--lightningstaffirestaff)
9. [Armor Art Pack Gender Conformance](#armor-art-pack-gender-conformance)
10. [Unit Backstory Conventions](#unit-backstory-conventions)
11. [Localization Rules](#localization-rules)
12. [Script OS Independence](#script-os-independence)
13. [Source of Truth — Edit Fragments, Not Generated Files](#source-of-truth--edit-fragments-not-generated-files)
14. [Failure Protocol](#failure-protocol)

---

## InternalName Prefix

All BMB entities use the `BMB_` prefix to avoid collisions with the base game and other mods.

| Entity Type | Pattern | Example |
|---|---|---|
| Items / weapons / armor / clothes | `BMB_PascalCaseName` | `BMB_AmuletOfContamination` |
| Abilities | `BMB_PascalCaseAbilityName` | `BMB_EruditeAbility` |
| Ability options | `BMB_PascalCaseName` | `BMB_Erudite` |
| Spells | `BMB_PascalCaseSpellName` | `BMB_AlchemicalSurprise` |
| Units (AI army) | `BMB_Unit_Description_AI` | `BMB_Unit_Altarian_Mage_Lightning_AI` |
| Units (summons) | `BMB_Unit_Description` | `BMB_Unit_SummonedCreature` |

Before using any new `InternalName`, search ALL BMB XML files to confirm it is not already in use.

---

## File Encoding

All XML files MUST use **UTF-8** (no BOM). Declare in the XML prolog:

```xml
<?xml version="1.0" encoding="utf-8"?>
```

- Do **not** use UTF-16, UTF-32, ISO-8859-1, or Windows-1252.
- ISO-8859-1 was accepted by the original FELH engine but **is not supported** by Elemental: Reforged.
- Special characters (accented letters, typographic quotes, em-dashes) must be stored as UTF-8 byte sequences. XML character references (e.g., `&#233;`) are also valid.
- If pasting content from external sources, verify encoding after paste — editors can silently switch.

---

## Art File Naming

| Type | Pattern | Example |
|---|---|---|
| Item icons | `BMB_PascalCaseName.png` (must match `InternalName`) | `BMB_AmuletOfContamination.png` |
| Ability icons | `BMB_Ability_PascalCaseName.png` | `BMB_Ability_Erudite.png` |
| 3D textures | `BMB_PascalCaseName_Texture.dds` | `BMB_AmuletOfContamination_Texture.dds` |

---

## Skeleton Deprecation

Elemental: Reforged removed the `Skeleton` model type from all non-weapon equipment. Retaining `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` on armor, clothing, or accessory items produces load-time warnings and may cause rendering issues.

| Slot | `Skeleton` allowed? |
|---|---|
| Weapons (`BMB_Weapons.xml`) | **Yes** — Skeleton units can still equip weapons |
| Armor (`BMB_Armor.xml`) | **No** — remove |
| Clothes (`BMB_Clothes.xml`) | **No** — remove |
| Items/Accessories (`BMB_Items.xml`) | **No** — remove |

**Rule:** When adding a new non-weapon item, do NOT include `Skeleton` in any `SupportedUnitModelType` list. For new weapons, `Skeleton` remains valid.

---

## HideInHiergamenon for Consumables

Single-use consumable items must include `<HideInHiergamenon>1</HideInHiergamenon>` to prevent them from appearing in the Hiergamenon codex.

### Qualifying consumable definition

An item requires `HideInHiergamenon=1` if it meets **both**:

1. It has `<IsUsable>1</IsUsable>`
2. It does **not** have `<CanBeEquipped>` (or has `<CanBeEquipped>0</CanBeEquipped>`)

Equippable items that also set `IsUsable=1` are intentionally excluded — they are permanent items that belong in the Hiergamenon.

**Rule:** Any new item with `IsUsable=1` and no `CanBeEquipped` must include `<HideInHiergamenon>1</HideInHiergamenon>`. Place it near the top of the element, after `<DisplayName>`.

All 31 qualifying BMB consumables have been tagged.

---

## AbilityBonusType

`<AbilityBonusType>` categorises an ability for the engine. Known values: `Unit_Design`, `Unit_Level`, `Player`, `Champion_Spellbook`, `Champion_Talent`.

### BMB rule: Do NOT use AbilityBonusType for item-granted abilities

BMB abilities are item-granted only (`HeroOnly=1`, `IsAvailableForUnitDesign=0`). These must **not** include `AbilityBonusType`.

**Why:** In the core game, every ability using `AbilityBonusType=Unit_Design` also carries a `<Cost>` element. Without `<Cost>`, abilities appear as free 0-cost options in the unit designer, bypassing the item-selling mechanic. The correct pattern — matching the 127-entry item-only model in the base game — omits `AbilityBonusType` entirely.

Items reference abilities via `UnlockUnitAbility`/`StrVal` using the option InternalName, which is unaffected by the absence of `AbilityBonusType`.

**Rule:** Only use `AbilityBonusType` for abilities that legitimately appear in the unit designer or level-up screen, and only when paired with a valid `<Cost>` element.

---

## Unit Race Types

Elemental: Reforged renamed race type and blood type identifiers.

| Old value (FELH) | New value (Reforged) | Scope |
|---|---|---|
| `Race_Type_Dead` | `Race_Type_Wraiths` | `<RaceType>` and `<Prereq><Attribute>` elements |
| `Blood_Undead` | `Blood_Wraith` | `<SelectedAbilityBonusOption>` elements |

**Rule:** Never use `Race_Type_Dead` or `Blood_Undead`. All wraith/undead faction units must use `Race_Type_Wraiths` and `Blood_Wraith`.

**Valid Reforged race types (10):** `Race_Type_Altarians`, `Race_Type_Mancers`, `Race_Type_Ironeers`, `Race_Type_Amarians`, `Race_Type_Tarthans`, `Race_Type_Krax`, `Race_Type_Wraiths`, `Race_Type_Trogs`, `Race_Type_Urxen`, `Race_Type_Quendar`.

---

## WeaponUpgradeType — LightningStaff/FireStaff

The `LightningStaff` category has no eligible AI upgrade targets (only `Staff_Thunderous`, which is starting equipment, not a shop item). AI weapon upgrade shopping silently skips categories with no candidates.

**Rule:** `EquipmentUpgradeDef` Weapon-slot blocks for Mage_Lightning_AI units must use `WeaponUpgradeType=FireStaff` (not `LightningStaff`). This allows the AI to find `Staff_Leht` (a FireStaff with `UnitStat_Attack_Lightning`) as a valid upgrade. `Staff_Thunderous` retains `WeaponUpgradeType=LightningStaff` in `BMB_Weapons.xml`.

**Reforged change:** `Staff_Leht` was moved from `LightningStaff` to `FireStaff` in Reforged.

---

## Armor Art Pack Gender Conformance

Female armor art packs must contain exclusively female model types; male packs must contain exclusively male types. Copy-paste errors introducing cross-gender `SupportedUnitModelType` entries can cause incorrect geometry rendering.

**Known fixes applied:** `Art_NihilistBreastpiece_2` (removed `SlaveMale`), `Art_LeatherVambraces_Regenerative_2` (removed `DarklingMale` and `SlaveMale`).

---

## Unit Backstory Conventions

### Wraith units
- Second-person narrative voice ("You", "your")
- Three-paragraph structure with escalating transformation narrative
- Final sentence echoes the unit's display name (e.g., "They call you Tempest Howlers. You do not disagree.")
- Reference Wraith-specific lore: Ceresa, Resoln, binding rites, threshold crossing

### Non-Wraith units
- Third-person backstory narration

---

## Localization Rules

1. Every new item/weapon/armor/clothing/spell/ability/unit/unit-stat entry MUST have both `fragment.xml` (with `TXT_BMB_*` keys) and `en.xml` (with English text) in its entry directory.
2. Building without `en.xml` produces localization files with missing entries — the game displays raw `TXT_BMB_*` key strings.
3. Do not add item names, descriptions, or provides text to `BMB.str` — use the XML localization system.
4. Do not replace engine identifiers with `TXT_BMB_*` keys (see [localization.md](localization.md#what-is-not-localized)).

---

## Script OS Independence

All scripts in `scripts/` must be OS-independent. Targeted platforms: Windows, macOS, Linux.

- Use `node:path` (`path.join`, `path.resolve`) for all file paths — never hardcode separators.
- Use `node:fs` / `node:fs/promises` for file operations — never shell-specific commands (`rm`, `del`, `xcopy`, `cp`).
- Use `node:child_process` with `execSync`/`spawn` for external tools — never platform-specific shells.
- ANSI escape sequences are acceptable (supported on all target platforms).

---

## Source of Truth — Edit Fragments, Not Generated Files

- **Edit content:** `xml/<category>/<InternalName>/fragment.xml` — NOT the monolithic files in `Mods/src/Data/GameCore/`.
- **Edit English text:** `xml/<category>/<InternalName>/en.xml` — NOT the localization files in `Mods/src/Data/Localization/`.
- **Generated files** are git-ignored and overwritten on every build.

---

## Failure Protocol

| Scenario | Action | Priority |
|---|---|---|
| Ambiguous XML schema requirement | Use most restrictive interpretation; check base game `GameCore/` files for precedent | MUST |
| Manifest/code conflict | Trust manifest, flag code for fix | MUST |
| Missing documentation | Flag gap, do not invent facts | MUST |
| Untested code path | Proceed with caution, add note for in-game smoke test | SHOULD |
| `InternalName` collision uncertainty | Search ALL BMB XML files for the name before using it | MUST |
| Unsure about Reforged compatibility | Check game data reference and constraints; do not guess | MUST |
| New consumable item added | Verify `HideInHiergamenon=1` is present if `IsUsable=1` and no `CanBeEquipped` | MUST |
| New non-weapon equipment added | Do NOT include `Skeleton` in `SupportedUnitModelType` | MUST |
| New ability for item-granted use | Do NOT add `AbilityBonusType`; omit it entirely | MUST |
| File encoding unclear | Always use UTF-8 (no BOM); never ISO-8859-1 | MUST |

---

## Reforged Compatibility Changelog

Changes applied to make the mod compatible with Elemental: Reforged (2026-03-28):

- **Consumables:** 31 qualifying consumables tagged with `HideInHiergamenon=1`
- **Skeleton removal:** 84 `Skeleton` `SupportedUnitModelType` entries removed from armor
- **AbilityBonusType:** Removed from `BMB_EruditeAbility` and `BMB_FamousAbility` (incorrect addition)
- **Mage_Lightning_AI equipment:** 11 unit variants changed from `LightningStaff` to `FireStaff`
- **Armor art packs:** Gender-mismatched entries removed from 2 female art packs
- **Unit race types:** `Race_Type_Dead` → `Race_Type_Wraiths`, `Blood_Undead` → `Blood_Wraith`
- **Unit backstories:** Replaced copy-pasted lore on 2 Wraith units (Tempest Howlers, Intangible Knockers)

### Pending manual verification

| Check | Status |
|---|---|
| Non-consumable BMB items visible in Hiergamenon; 31 consumables hidden | Pending in-game test |
| BMB armor and clothing render correctly when equipped | Pending in-game test |
| At least one BMB spell casts, one effect activates, and one item buys/sells | Pending in-game test |

```
---
**File Statistics**
- **Size**: 11.54 KB
- **Lines**: 243
File: `modules/project-manifest/constraints.md`
