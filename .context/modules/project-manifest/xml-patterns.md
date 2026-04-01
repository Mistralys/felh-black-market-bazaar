# Project Manifest - XML Patterns
_SOURCE: Modding XML patterns: GameModifier, prerequisites, rarity, art definitions, unit stats reference_
# Modding XML patterns: GameModifier, prerequisites, rarity, art definitions, unit stats reference
```
// Structure of documents
└── docs/
    └── agents/
        └── project-manifest/
            └── xml-patterns.md

```
###  Path: `\docs\agents\project-manifest/xml-patterns.md`

```md
# XML Patterns

This document covers the XML patterns used across both the base game and BMB for defining game entities: modifiers, prerequisites, rarity, art definitions, and unit stats.

---

## InternalName Convention

Every entity uses `InternalName` as its unique identifier attribute:

```xml
<GameItemType InternalName="BMB_AmuletOfContamination">
```

BMB entities use the `BMB_` prefix. See [constraints.md](constraints.md#internalname-prefix) for the full naming rules.

---

## GameModifier Structure

`<GameModifier>` is the universal mechanism for applying stat changes:

```xml
<GameModifier>
    <ModType>Unit|Player|GiveItem|...</ModType>
    <Attribute>AdjustUnitStat|UnlockCombatAbility|ProduceResource|...</Attribute>
    <StrVal>UnitStat_Attack_Fire</StrVal>
    <Value>2</Value>
    <Provides>Human-readable description of effect</Provides>
</GameModifier>
```

### Common ModType values

| ModType | Scope |
|---|---|
| `Unit` | Modifies the equipped/affected unit |
| `Player` | Modifies the owning player |
| `GiveItem` | Grants an item to the unit |

### Common Attribute values (for ModType=Unit)

| Attribute | Purpose |
|---|---|
| `AdjustUnitStat` | Change a unit stat (paired with `StrVal` for stat name) |
| `UnlockCombatAbility` | Grant a combat ability |
| `UnlockRangedAction` | Grant a ranged attack |
| `MeleeDefenseAppliesSpell` | Apply spell on melee defense |
| `ProduceResource` | Generate a resource per turn |

---

## Prerequisite System

Items and abilities use `<Prereq>` elements for unlock conditions:

```xml
<Prereq>
    <Type>Tech|AbilityBonusOption|RestrictedAbilityBonusOption</Type>
    <Attribute>TechOrAbilityInternalName</Attribute>
    <Target>Player</Target>
</Prereq>
```

---

## Rarity System

```xml
<Likelihood>25</Likelihood>              <!-- Drop chance weight (0 = never random) -->
<RarityDisplay>Uncommon</RarityDisplay>  <!-- Visual rarity tier -->
```

Values: `Common`, `Uncommon`, `Rare`, `Epic`, `Legendary`

---

## Art Definition Pattern

Art definitions support two patterns:

### 1. Inline (embedded within the item definition)

```xml
<ArtDef>ItemName_ArtDef</ArtDef>
<GameItemTypeArtDef InternalName="ItemName_ArtDef">
    <GameItemTypeModelPack InternalName="ItemName_Default">
        <IconFile>ItemIcon.png</IconFile>
        <TintR>240</TintR>
        <SFX>Equip_Sound_01</SFX>
    </GameItemTypeModelPack>
</GameItemTypeArtDef>
```

### 2. External reference

```xml
<ArtDef>ExistingArtDefInternalName</ArtDef>
```

References a definition in `CoreItemArt.xml` or `ArtGameItem.xml`.

### PNG/DDS auto-resolution

The engine automatically tries both `.png` and `.dds` extensions when loading `<IconFile>` values. Either format works in mod files.

---

## Unit Stats Reference

Key unit stats used in `<StrVal>` for `AdjustUnitStat`:

| Stat | Description |
|---|---|
| `UnitStat_Strength` | Base strength attribute |
| `UnitStat_Dexterity` | Base dexterity attribute |
| `UnitStat_Charisma` | Base charisma attribute |
| `UnitStat_Essence` | Magic essence |
| `UnitStat_Attack_Pierce` | Physical piercing damage |
| `UnitStat_Attack_Fire` | Fire elemental damage |
| `UnitStat_Attack_Cold` | Cold elemental damage |
| `UnitStat_Attack_Lightning` | Lightning elemental damage |
| `UnitStat_Attack_Poison` | Poison damage |
| `UnitStat_MagicPower` | Spell power |
| `UnitStat_CombatSpeed` | Combat initiative/speed |
| `UnitStat_HP` | Hit points |
| `UnitStat_Dodge` | Dodge chance |
| `UnitStat_ExpBonus` | Experience gain multiplier |
| `UnitStat_BackswingChance` | Chance to attack again on miss |

---

## Ability Definition Pattern (BMB)

BMB abilities are item-granted only. They use `<AbilityBonus>` with nested `<AbilityBonusOption>` children:

```xml
<AbilityBonus InternalName="BMB_EruditeAbility">
    <AbilityBonusOption InternalName="BMB_Erudite">
        <DisplayName>TXT_BMB_ABILITIES_BMB_ERUDITE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ABILITIES_BMB_ERUDITE_DESCRIPTION</Description>
        <Icon>BMB_Ability_Erudite.png</Icon>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ExpBonus</StrVal>
            <Value>30</Value>
            <Provides>TXT_BMB_ABILITIES_BMB_ERUDITE_PROVIDES_1</Provides>
        </GameModifier>
        <Type>Army</Type>
    </AbilityBonusOption>
</AbilityBonus>
```

Items reference abilities via `UnlockUnitAbility`/`StrVal`:
```xml
<GameModifier>
    <ModType>Unit</ModType>
    <Attribute>UnlockUnitAbility</Attribute>
    <StrVal>BMB_Erudite</StrVal>
    <Provides>...</Provides>
</GameModifier>
```

> `AbilityBonusType` is intentionally omitted for item-granted abilities. See [constraints.md](constraints.md#abilitybonustype).

---

## Mod File Deployment Locations

When deployed, mod files are placed in the user's "My Documents" game folder:

| Content | Deployment Path |
|---|---|
| XML data files | `My Games/ElementalReforged/Mods/<ModName>/Data/GameCore/` |
| Localization files | `My Games/ElementalReforged/Mods/<ModName>/Data/Localization/<Language>/` |
| Icons & textures | `My Games/ElementalReforged/Mods/<ModName>/Gfx/` |
| String tables | `My Games/ElementalReforged/Mods/<ModName>/Data/` |
| Mod definition | `My Games/ElementalReforged/Mods/<ModName>/` |

```
---
**File Statistics**
- **Size**: 5.92 KB
- **Lines**: 201
File: `modules/project-manifest/xml-patterns.md`
