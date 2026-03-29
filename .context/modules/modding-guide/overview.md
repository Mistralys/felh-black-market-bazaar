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
# Modding Guide — Elemental: Reforged Compatibility

This guide documents the XML patterns, naming conventions, and Reforged-specific constraints
that must be followed when creating or maintaining content for the Black Market Bazaar mod.
It focuses on the breaking changes introduced in Elemental: Reforged (formerly Fallen Enchantress:
Legendary Heroes) that affect how mod XML files are parsed and loaded.

---

## Table of Contents

1. [File Encoding](#file-encoding)
2. [SupportedUnitModelType - Skeleton Deprecation](#supportedunitmodeltype--skeleton-deprecation)
3. [HideInHiergamenon - Consumable Items](#hideinhiergamenon--consumable-items)
4. [AbilityBonusType](#abilitybonustype)
5. [Unit Race Types](#unit-race-types)

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

- Ensure your text editor saves the file as **UTF-8** (without BOM is preferred; BOM is tolerated
  but can cause issues in some XML parsers).
- Do **not** save as UTF-16, UTF-32, or any single-byte code page (including ISO-8859-1 / Windows-1252).
- If you copy content from another source (e.g., a forum post or older mod), re-check the encoding
  after pasting - editors can silently switch encoding when pasting non-ASCII characters.
- Special characters (accented letters, typographic quotes, em-dashes) must be stored as their
  UTF-8 byte sequences. XML character references (e.g., `&#233;` for e-acute) are also valid.

> **ISO-8859-1 is deprecated.** Files encoded in ISO-8859-1 were accepted by the original
> Fallen Enchantress: Legendary Heroes engine but will not load correctly under Elemental:
> Reforged. Resave any legacy files as UTF-8 before releasing a Reforged-compatible build.

---

## SupportedUnitModelType - Skeleton Deprecation

`SupportedUnitModelType` elements inside a `GameItemTypeModelPack` declare which unit model
rigs the item artwork is compatible with. Elemental: Reforged removed the `Skeleton` model
type from all non-weapon equipment slots. Retaining `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>`
on armor, clothing, or accessory items will produce a load-time warning and may cause the
item to render incorrectly on affected units.

### Rule

| Slot / File | `Skeleton` allowed? |
|---|---|
| `BMB_Weapons.xml` (Weapon slot) | **Yes** - Skeleton units can still equip weapons |
| `BMB_Armor.xml` (Head, Torso, Defense, Forearms, Boots) | **No** - remove |
| `BMB_Clothes.xml` (LowerBody, Surcoat, Cloak, ...) | **No** - remove |
| `BMB_Items.xml` (Accessory slot) | **No** - remove |

Weapons are the **only** slot type that retains `Skeleton` as a valid `SupportedUnitModelType`.

### Correct example (weapon - Skeleton retained)

```xml
<GameItemTypeModelPack InternalName="Axe_FireAndIce_Trog_Default">
    <!-- ... other model pack children ... -->
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
    <SupportedUnitModelType>Skeleton</SupportedUnitModelType>
    <SupportedUnitModelType>WraithMale</SupportedUnitModelType>
    <SupportedUnitModelType>WraithFemale</SupportedUnitModelType>
    <!-- ... -->
</GameItemTypeModelPack>
```

### Incorrect example (armor - Skeleton must be removed)

```xml
<!-- BEFORE (Reforged-incompatible) -->
<GameItemTypeModelPack InternalName="Art_ChainHelmet_BlackCrow_1">
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
    <SupportedUnitModelType>Skeleton</SupportedUnitModelType>  <!-- REMOVE THIS -->
    <SupportedUnitModelType>WraithMale</SupportedUnitModelType>
</GameItemTypeModelPack>

<!-- AFTER (Reforged-compatible) -->
<GameItemTypeModelPack InternalName="Art_ChainHelmet_BlackCrow_1">
    <SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
    <SupportedUnitModelType>WraithMale</SupportedUnitModelType>
</GameItemTypeModelPack>
```

> **Rule for future maintainers:** When adding a new non-weapon item, do not include
> `Skeleton` in any `SupportedUnitModelType` list. For new weapons, `Skeleton` remains valid
> and should be included alongside the other model types.

---

## HideInHiergamenon - Consumable Items

The Hiergamenon is the in-game codex/encyclopedia. In Elemental: Reforged, single-use
consumable items (potions, scrolls, tokens, etc.) must be tagged with `HideInHiergamenon=1`
to prevent them from appearing as permanent catalogue entries. Without this tag, consumables
clutter the Hiergamenon alongside equippable items, degrading the player experience.

### Definition: qualifying consumable

An item qualifies as a consumable (and therefore requires `HideInHiergamenon=1`) if it meets
**both** of the following conditions:

- It has `<IsUsable>1</IsUsable>`
- It does **not** have a `<CanBeEquipped>` element (or has `<CanBeEquipped>0</CanBeEquipped>`)

Equippable items (accessories, armor, weapons, clothing) that also set `IsUsable=1` are
intentionally excluded - they are permanent items that belong in the Hiergamenon.

### Example

```xml
<GameItemType InternalName="BloomingTonic">
    <DisplayName>Blooming Tonic</DisplayName>
    <HideInHiergamenon>1</HideInHiergamenon>
    <ShopValue>450</ShopValue>
    <GameModifier>
        <ModType>Unit</ModType>
        <Attribute>CurHealth</Attribute>
        <Value>50</Value>
        <Provides>Heals 50 Hit Points</Provides>
    </GameModifier>
    <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
    <Likelihood>20</Likelihood>
    <IsUsable>1</IsUsable>
    <!-- No <CanBeEquipped> element - this is a consumable -->
</GameItemType>
```

Note that `HideInHiergamenon=1` is placed near the top of the element, before `ShopValue`,
for readability. Placement within the element does not affect parsing.

### Current scope in BMB

All 31 qualifying consumable items in `BMB_Items.xml` have been tagged with
`HideInHiergamenon=1` as part of the Reforged compatibility update.

> **Rule for future maintainers:** Any new item in `BMB_Items.xml` with `IsUsable=1` and no
> `CanBeEquipped` element must also include `<HideInHiergamenon>1</HideInHiergamenon>`. Add
> this tag immediately after the `<DisplayName>` element.

---

## AbilityBonusType

`AbilityBonusType` is a child element of `AbilityBonus` that categorises the ability for
Elemental: Reforged's ability-management system. It determines where the ability appears
in the game UI (unit designer, level-up screen, etc.).

### When to use AbilityBonusType

`AbilityBonusType` is required **only** when the ability legitimately appears in the unit
designer or level-up screen, and must always be paired with a valid `<Cost>` element.

Known values: `Unit_Design` (unit-level / item-granted), `Unit_Level` (gained on level-up),
`Player` (sovereign), `Champion_Spellbook`, `Champion_Talent`.

### Item-granted abilities — do NOT use AbilityBonusType

BMB abilities are item-granted only (`HeroOnly=1`, `IsAvailableForUnitDesign=0`). These
abilities must **not** include `AbilityBonusType`. In the core game, every ability using
`AbilityBonusType=Unit_Design` also carries a `<Cost>` element defining its unit-designer
purchase price. Without `<Cost>`, the abilities would appear as free 0-cost options in the
unit designer, bypassing the item-selling mechanic.

The correct pattern — matching the 127-entry item-only model used by the core game — omits
`AbilityBonusType` entirely. Items reference abilities via `UnlockUnitAbility`/`StrVal`
using the option InternalName, which is unaffected by the absence of `AbilityBonusType`.

### Example (BMB_EruditeAbility — no AbilityBonusType)

```xml
<AbilityBonus InternalName="BMB_EruditeAbility">
    <AbilityBonusOption InternalName="BMB_Erudite">
        <DisplayName>Erudite</DisplayName>
        <Description>+30% Experience and 10% Research</Description>
        <Icon>BMB_Ability_Erudite.png</Icon>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ExpBonus</StrVal>
            <Value>30</Value>
            <Provides>+30% Experience</Provides>
        </GameModifier>
        <Type>Army</Type>
    </AbilityBonusOption>
</AbilityBonus>
```

> **Rule for future maintainers:** Do **not** add `AbilityBonusType` to any item-granted-only
> ability. Only use `AbilityBonusType` for abilities that legitimately appear in the unit
> designer or level-up screen, and only when paired with a valid `<Cost>` element.

---

## Unit Race Types

Elemental: Reforged renamed several race type and blood type identifiers. Using the old
identifiers causes units to be assigned to an unrecognised race, which breaks race-gated
prerequisites, AI logic, and unit display.

### Replacement table

| Old value (FELH) | New value (Reforged) | Scope |
|---|---|---|
| `Race_Type_Dead` | `Race_Type_Wraiths` | `<RaceType>` and `<Prereq><Attribute>` elements |
| `Blood_Undead` | `Blood_Wraith` | `<SelectedAbilityBonusOption>` elements |

### Rationale

In Elemental: Reforged, the undead/wraith faction was consolidated under the Wraith identity.
The race type `Race_Type_Dead` and the blood option `Blood_Undead` no longer exist as valid
identifiers in the Reforged data tables. Units that reference these old values will either
fail to load or be silently assigned to no race, removing their faction bonuses.

### Before / after example

```xml
<!-- BEFORE (FELH - incompatible with Reforged) -->
<UnitType InternalName="BMB_Unit_Resoln_Mage_AI">
    <RaceType>Race_Type_Dead</RaceType>
    <SelectedAbilityBonusOption>Blood_Undead</SelectedAbilityBonusOption>
    <!-- ... -->
</UnitType>

<!-- AFTER (Reforged-compatible) -->
<UnitType InternalName="BMB_Unit_Resoln_Mage_AI">
    <RaceType>Race_Type_Wraiths</RaceType>
    <SelectedAbilityBonusOption>Blood_Wraith</SelectedAbilityBonusOption>
    <!-- ... -->
</UnitType>
```

> **Rule for future maintainers:** Never use `Race_Type_Dead` or `Blood_Undead` in any BMB
> unit XML. All units intended for the wraith/undead faction must use `Race_Type_Wraiths`
> and `Blood_Wraith` respectively.

```
---
**File Statistics**
- **Size**: 10.76 KB
- **Lines**: 272
File: `modules/modding-guide/overview.md`
