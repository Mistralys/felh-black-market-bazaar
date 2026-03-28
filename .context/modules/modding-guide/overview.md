# Modding Guide - Overview
_SOURCE: Modding patterns and conventions reference_
# Modding patterns and conventions reference
```
// Structure of documents
└── docs/
    └── modding-guide/
        └── README.md

```
###  Path: `\docs\modding-guide/README.md`

```md
# Modding Guide -- Black Market Bazaar (Elemental: Reforged)

This guide documents the XML patterns, naming conventions, and Reforged-specific constraints
that must be followed when creating or maintaining content for the Black Market Bazaar mod.
It covers general modding conventions and the breaking changes in Elemental: Reforged that
affect how mod XML files are parsed and loaded.

---

## Table of Contents

1. [File Encoding](#file-encoding)
2. [File Layout and InternalName Convention](#file-layout-and-internalname-convention)
3. [Items XML Schema](#items-xml-schema)
4. [Abilities XML Schema](#abilities-xml-schema)
5. [Spells XML Schema](#spells-xml-schema)
6. [Effects XML Schema](#effects-xml-schema)
7. [Units XML Schema](#units-xml-schema)
8. [Mod File Deployment](#mod-file-deployment)
9. [Pre-Launch Validation Checklist](#pre-launch-validation-checklist)

---

## File Encoding

**Recommendation: use UTF-8 for all mod XML files.**

Elemental: Reforged requires XML files to be encoded in UTF-8. The legacy encoding ISO-8859-1
(Latin-1) is no longer supported and will cause parse errors or silent data loss when the
engine loads the mod.

All BMB XML files already declare UTF-8 in their XML prolog:

```xml
<?xml version="1.0" encoding="utf-8"?>
```

### Checklist

When creating or editing a mod XML file:

- Ensure your text editor saves the file as **UTF-8** (without BOM is preferred).
- Do **not** save as UTF-16, UTF-32, or any single-byte code page (including ISO-8859-1).
- If you copy content from another source, re-check the encoding after pasting.
- Special characters must be stored as UTF-8 byte sequences.

> **ISO-8859-1 is deprecated.** Files encoded in ISO-8859-1 were accepted by the original
> Fallen Enchantress: Legendary Heroes engine but will not load correctly under Elemental:
> Reforged. Resave any legacy files as UTF-8 before releasing a Reforged-compatible build.

---

## File Layout and InternalName Convention

The BMB mod ships as a set of XML files placed in the mod root folder. Each file has a
dedicated content domain:

| File | Root Element | Content |
|---|---|---|
| `BMB_Items.xml` | <GameItemTypes> | Accessories, consumables, and miscellaneous items |
| `BMB_Weapons.xml` | <GameItemTypes> | Weapon definitions (axes, swords, staves, bows, wands) |
| `BMB_Armor.xml` | <GameItemTypes> | Armor pieces (helmets, shields, body armor) |
| `BMB_Clothes.xml` | <GameItemTypes> | Clothing items (robes, cloaks, boots) |
| `BMB_Spells.xml` | <Spells> | 76 item-triggered spell definitions |
| `BMB_Abilities.xml` | <AbilityBonuses> | Custom hero/unit ability definitions |
| `BMB_Effects.xml` | -- | Visual effect definitions for BMB items |
| `BMB_Units.xml` | -- | Custom unit definitions (e.g., summoned creatures) |
| `BMB_UnitStats.xml` | -- | Custom unit stat type definitions |
| `BMB_CoreItemsModifications.xml` | <GameItemTypes> | Modifications/overrides to base game items |
| `BMB_Items_DLC05.xml` | <GameItemTypes> | Items requiring DLC05 (Leader Pack) |

### InternalName prefix

All BMB entities use the `BMB_` prefix for `InternalName` values to avoid collisions:

```xml
<GameItemType InternalName="BMB_AmuletOfContamination">
```

- Items/weapons/armor/clothes: `BMB_PascalCaseName`
- Abilities: `BMB_PascalCaseAbilityName`
- Spells: `BMB_PascalCaseSpellName`
- Units: `BMB_Unit_Description_AI` (AI army) or `BMB_Unit_Description` (summons)

### Art file naming

- Icons (2D): `BMB_PascalCaseName.png` -- must match the item `InternalName`
- Ability icons: `BMB_Ability_PascalCaseName.png`
- 3D textures: `BMB_PascalCaseName_Texture.dds`

---

## Items XML Schema

Items use `<GameItemType InternalName=...>` as the entry element inside a `<GameItemTypes>` root.

### Art definition patterns

**Inline:** the `GameItemTypeArtDef` block is embedded within the item definition.
**External reference:** reference an existing art definition from `CoreItemArt.xml`:

```xml
<ArtDef>ExistingArtDefInternalName</ArtDef>
```

**PNG/DDS auto-resolution:** the engine tries both `.png` and `.dds` extensions automatically.

### SupportedUnitModelType -- Skeleton Deprecation

`SupportedUnitModelType` elements inside a `GameItemTypeModelPack` declare which unit model
rigs the item artwork is compatible with. Elemental: Reforged removed the `Skeleton` model
type from all non-weapon equipment slots.

#### Rule

| Slot / File | `Skeleton` allowed? |
|---|---|
| `BMB_Weapons.xml` (Weapon slot) | **Yes** -- Skeleton units can still equip weapons |
| `BMB_Armor.xml` | **No** -- remove |
| `BMB_Clothes.xml` | **No** -- remove |
| `BMB_Items.xml` (Accessory slot) | **No** -- remove |

Weapons are the **only** slot type that retains `Skeleton` as a valid `SupportedUnitModelType`.

#### Correct example (weapon - Skeleton retained)

```xml
<GameItemTypeModelPack InternalName="Axe_FireAndIce_Trog_Default">
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
    <SupportedUnitModelType>Skeleton</SupportedUnitModelType>
    <SupportedUnitModelType>WraithMale</SupportedUnitModelType>
</GameItemTypeModelPack>
```

#### Incorrect example (armor - Skeleton must be removed)

```xml
<!-- BEFORE (Reforged-incompatible) -->
<GameItemTypeModelPack InternalName="Art_ChainHelmet_BlackCrow_1">
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
    <SupportedUnitModelType>Skeleton</SupportedUnitModelType>  <!-- REMOVE THIS -->
</GameItemTypeModelPack>

<!-- AFTER (Reforged-compatible) -->
<GameItemTypeModelPack InternalName="Art_ChainHelmet_BlackCrow_1">
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
</GameItemTypeModelPack>
```

> **Rule for future maintainers:** When adding a new non-weapon item, do not include
> `Skeleton` in any `SupportedUnitModelType` list. For new weapons, `Skeleton` is valid.

### HideInHiergamenon -- Consumable Items

The Hiergamenon is the in-game codex/encyclopedia. Consumable items must be tagged with
`HideInHiergamenon=1` to prevent them appearing as permanent catalogue entries.

An item qualifies as a consumable if it meets **both** conditions:

- It has `<IsUsable>1</IsUsable>`
- It does **not** have a `<CanBeEquipped>` element

```xml
<GameItemType InternalName="BloomingTonic">
    <DisplayName>Blooming Tonic</DisplayName>
    <HideInHiergamenon>1</HideInHiergamenon>
    <IsUsable>1</IsUsable>
    <!-- No CanBeEquipped element -- this is a consumable -->
</GameItemType>
```

All 31 qualifying consumable items in `BMB_Items.xml` carry `HideInHiergamenon=1`.

> **Rule for future maintainers:** Any new item with `IsUsable=1` and no `CanBeEquipped`
> must include `<HideInHiergamenon>1</HideInHiergamenon>`. Add after `<DisplayName>`.

### WeaponUpgradeType

`WeaponUpgradeType` categorises a weapon into an upgrade pool for AI equipment selection.

#### Known values

| Value | Description |
|---|---|
| `Sword` | Standard sword-type weapons |
| `Axe` | Axe-type weapons |
| `Mace` | Mace/blunt weapons |
| `Bow` | Ranged bow-type weapons |
| `Staff` | Generic staff weapons |
| `FireStaff` | Fire-element staves |
| `LightningStaff` | Lightning-element staves |
| `Wand` | Wand-type weapons (BMB addition) |
| `PoisonStaff` | Poison-element staves (BMB addition) |

#### Staff_Leht reclassification (Reforged breaking change)

In Elemental: Reforged, `Staff_Leht` was moved from `LightningStaff` to `FireStaff`.
`BMB_CoreItemsModifications.xml` has been updated:

```xml
<!-- BEFORE (FELH) -->
<WeaponUpgradeType>LightningStaff</WeaponUpgradeType>

<!-- AFTER (Reforged-compatible) -->
<WeaponUpgradeType>FireStaff</WeaponUpgradeType>
```

> **Known downstream impact:** `BMB_Unit_Dead_Mage_Lightning_AI` EquipmentUpgradeDef
> (BMB_Units.xml line 328) still filters on `LightningStaff` and will no longer select
> `Staff_Leht`. A follow-up work package will fix this.

> **Rule for future maintainers:** Verify `WeaponUpgradeType` values against Reforged categories,
> not FELH categories -- they can differ for items reclassified between editions.

---

## Abilities XML Schema

Ability entries use `<AbilityBonus InternalName=...>` inside an `<AbilityBonuses>` root.

### AbilityBonusType

`AbilityBonusType` categorises an ability for Reforged's ability-management system. **BMB item-granted abilities do not use this tag** — see below.

#### BMB pattern: item-granted abilities omit AbilityBonusType

All BMB abilities (`BMB_EruditeAbility`, `BMB_FamousAbility`) are item-granted only and must **not** include `AbilityBonusType`.

**Why:** In the core game, every `AbilityBonusType=Unit_Design` ability also carries a `<Cost>` element. Without `<Cost>`, the ability appears as a free 0-cost option in the unit designer. Since BMB abilities are granted by equipping items — not purchased in the unit designer — adding `Unit_Design` without `<Cost>` is incorrect. BMB items carry `IsAvailableForUnitDesign=0` and `HeroOnly=1` as independent safeguards.

#### Correct example (BMB_EruditeAbility — no AbilityBonusType)

```xml
<AbilityBonus InternalName="BMB_EruditeAbility">
    <AbilityBonusOption InternalName="BMB_Erudite">
        <DisplayName>Erudite</DisplayName>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ExpBonus</StrVal>
            <Value>30</Value>
        </GameModifier>
    </AbilityBonusOption>
</AbilityBonus>
```

#### When to use AbilityBonusType

Only use `AbilityBonusType` for abilities that legitimately appear in the **unit designer** or **level-up** screen, and only when paired with a valid `<Cost>` element. If adding it, it must be the **first** child element of `AbilityBonus`.

#### Known values

| Value | Usage |
|---|---|
| `Unit_Design` | Unit-designer abilities — requires `<Cost>` |
| `Unit_Level` | Abilities gained on level-up |
| `Player` | Sovereign-level abilities |
| `Champion_Spellbook` | Champion spellbook abilities |
| `Champion_Talent` | Champion talent abilities |

---

## Spells XML Schema

Spell entries use `<SpellDef InternalName=...>` inside a `<Spells>` root.

```xml
<SpellDef InternalName="BMB_ExampleSpell">
    <DisplayName>Example Spell</DisplayName>
    <HideInHiergamenon>1</HideInHiergamenon>
    <IsSpecialAbility>1</IsSpecialAbility>
    <GameModifier>
        <ModType>Unit</ModType>
        <Attribute>AdjustUnitStat</Attribute>
        <StrVal>UnitStat_CurHealth</StrVal>
        <Value>-20</Value>
    </GameModifier>
</SpellDef>
```

### Key spell elements

- `HideInHiergamenon`: Add to all BMB item-triggered spells to keep the Hiergamenon clean.
- `IsSpecialAbility`: Marks as a combat ability (shown in unit ability list).
- `Cooldown`: Turns before the spell can be recast.
- `Radius` / `RadiusType`: Area-of-effect radius and shape for splash spells.

---

## Effects XML Schema

Visual effect entries in `BMB_Effects.xml` define particle and animation effects attached to
items and abilities.

### Reforged additions

New optional emitter tags available in Elemental: Reforged:

- `AnimatedStrip`: Reference to an animated sprite strip texture.
- `AnimatedStripFPS`: Frame rate of the animated strip playback.
- `AnimatedStripStartRandom`: Randomise the starting frame.
- `LocalParticles`: Use local-space particle simulation.

These tags are optional. Omitting them falls back to engine defaults.

---

## Units XML Schema

Unit entries use `<UnitType InternalName=...>` elements. BMB defines two categories:

- **AI army units** (`BMB_Unit_*_AI`): units that appear in enemy or neutral armies.
- **Summoned creatures**: units created by item-triggered spells.

```xml
<UnitType InternalName="BMB_Unit_Example_AI">
    <DisplayName>Example Unit</DisplayName>
    <RaceType>Race_Type_Wraiths</RaceType>
    <SelectedAbilityBonusOption>Blood_Wraith</SelectedAbilityBonusOption>
</UnitType>
```

### Unit Race Types

Elemental: Reforged renamed several race type and blood type identifiers.

#### Replacement table

| Old value (FELH) | New value (Reforged) | Scope |
|---|---|---|
| `Race_Type_Dead` | `Race_Type_Wraiths` | `<RaceType>` and `<Prereq><Attribute>` elements |
| `Blood_Undead` | `Blood_Wraith` | `<SelectedAbilityBonusOption>` elements |

#### Valid Reforged race types (complete list)

`Race_Type_Altarians`, `Race_Type_Mancers`, `Race_Type_Ironeers`, `Race_Type_Amarians`,
`Race_Type_Tarthans`, `Race_Type_Krax`, `Race_Type_Wraiths`, `Race_Type_Trogs`,
`Race_Type_Urxen`, `Race_Type_Quendar`.

#### Rationale

In Elemental: Reforged, the undead/wraith faction was consolidated under the Wraith identity.
`Race_Type_Dead` and `Blood_Undead` no longer exist in the Reforged data tables.

```xml
<!-- BEFORE (FELH - incompatible with Reforged) -->
<UnitType InternalName="BMB_Unit_Resoln_Mage_AI">
    <RaceType>Race_Type_Dead</RaceType>
    <SelectedAbilityBonusOption>Blood_Undead</SelectedAbilityBonusOption>
</UnitType>

<!-- AFTER (Reforged-compatible) -->
<UnitType InternalName="BMB_Unit_Resoln_Mage_AI">
    <RaceType>Race_Type_Wraiths</RaceType>
    <SelectedAbilityBonusOption>Blood_Wraith</SelectedAbilityBonusOption>
</UnitType>
```

> **Rule for future maintainers:** Never use `Race_Type_Dead` or `Blood_Undead` in BMB unit XML.

---

## Mod File Deployment

| Content type | Location |
|---|---|
| XML data files | `Mods/Black Market Bazaar/` |
| Icon/texture files | `Mods/Gfx/Black Market Bazaar Icons/` |
| String table | `Mods/Data/BMB.str` |

The `BMB.str` string table registers custom weapon type names so they display correctly in the UI.

---

## Pre-Launch Validation Checklist

### Automated checks

1. **Encoding:** All 11 XML files declare `encoding=utf-8` on line 1.
2. **No BOM:** No file starts with a UTF-8 BOM (EF BB BF bytes).
3. **Skeleton:** Zero `Skeleton` SupportedUnitModelType entries in BMB_Armor.xml, BMB_Clothes.xml, BMB_Items.xml, BMB_Items_DLC05.xml.
4. **HideInHiergamenon:** Count in BMB_Items.xml equals count of IsUsable=1 items without CanBeEquipped. Currently 31.
5. **AbilityBonusType:** Both BMB_EruditeAbility and BMB_FamousAbility have `AbilityBonusType=Unit_Design` as first child.
6. **Race types:** Zero `Race_Type_Dead` or `Blood_Undead` in all 11 XML files.
7. **Staff_Leht:** BMB_CoreItemsModifications.xml has `WeaponUpgradeType=FireStaff` for Staff_Leht.
8. **XML well-formedness:** All 11 files parse without errors.

### In-game smoke test

1. No load-time errors in the game log for BMB files.
2. Consumables do **not** appear in the Hiergamenon. Equippable items do.
3. BMB consumables are usable in combat and apply effects correctly.
4. Wraith-race units (BMB_Unit_Dead_Mage_Lightning_AI, BMB_Unit_Dead_Staff_AI) appear in Wraith army screen.
5. Staff_Leht appears under **Fire Staff** upgrade category (not Lightning Staff).
6. BMB abilities (BMB_EruditeAbility, BMB_FamousAbility) apply stat modifiers correctly.
7. Items with 3D models render without glitches on Wraith, Kingdom, and Darkling unit models.
8. **AbilityBonusType risk:** If any item-granted ability is broken, try changing AbilityBonusType
   from Unit_Design to Unit_Level and retest. See the AbilityBonusType section for fallback values.
```
---
**File Statistics**
- **Size**: 9.55 KB
- **Lines**: 349
File: `modules/modding-guide/overview.md`
