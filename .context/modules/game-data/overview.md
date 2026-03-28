# Game Data Reference - Overview
_SOURCE: Game data folder structure and XML reference_
# Game data folder structure and XML reference
```
// Structure of documents
└── docs/
    └── game-data/
        └── README.md

```
###  Path: `\docs\game-data/README.md`

```md
# Elemental: Reforged — Game Data Reference

> **Location on disk:** `C:\Steam\steamapps\common\Elemental Reforged\data\`

This document provides AI agents and modders with a comprehensive overview of the base game's data folder. All moddable game content originates from the XML files described below.

---

## Top-Level Layout

```
data/
├── Default.ini                  # Default game settings
├── ExtraFactionData.xml         # Supplemental faction definitions
├── LocalizationDefs.xml         # Localization system configuration
├── Animations/                  # Animation pack definitions
├── Core/                        # Core engine type definitions
├── CutScenes/                   # Cutscene pack definitions
├── English/                     # English-specific tile/improvement data
├── GameCore/                    # ★ Primary game data — items, units, spells, etc.
├── Localization/                # Translations (Chinese, French, German, etc.)
└── Maps/                        # Pre-built maps and tactical maps
```

**The `GameCore/` folder is the most important for modding.** It contains all definitions for items, weapons, armor, spells, units, abilities, effects, quests, recipes, and more.

---

## Encoding Standard

All modern Elemental: Reforged game data files use **UTF-8 encoding** (no BOM). Mod XML files must also declare and use UTF-8.

**Required XML declaration:**
```xml
<?xml version="1.0" encoding="utf-8"?>
```

ISO-8859-1 (`encoding="iso-8859-1"`) was used by older Elemental editions and is **no longer supported** by Reforged. Any mod files still using ISO-8859-1 must be re-encoded to UTF-8 before loading with Reforged.

---

## GameCore/ — Detailed File Reference

### Items & Equipment

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreItems.xml` | `<GameItemTypes>` | `<GameItemType>` | Accessories, consumables, misc items |
| `CoreWeapons.xml` | `<GameItemTypes>` | `<GameItemType>` | Weapons (swords, axes, bows, staves) |
| `CoreArmor.xml` | `<GameItemTypes>` | `<GameItemType>` | Armor pieces (helmets, chest, shields) |
| `CoreClothes.xml` | `<GameItemTypes>` | `<GameItemType>` | Clothing items (robes, cloaks, boots) |
| `CoreItemArt.xml` | — | — | Item art/icon definitions |
| `CoreArtifactProps.xml` | — | — | Artifact visual properties |
| `ReforgedItems.xml` | `<GameItemTypes>` | `<GameItemType>` | Items added by Reforged edition |

Every item entry uses `InternalName` as its unique identifier and follows this general structure:

```xml
<GameItemType InternalName="UniqueID">
    <DisplayName>Human-Readable Name</DisplayName>
    <Description>Flavor text</Description>
    <Type>Weapon|Accessory|Armor|...</Type>
    <CanBeEquipped>1</CanBeEquipped>
    <ShopValue>180</ShopValue>
    <GameModifier>...</GameModifier>
    <Likelihood>25</Likelihood>
    <RarityDisplay>Common|Uncommon|Rare|Epic|Legendary</RarityDisplay>
    <Prereq>...</Prereq>
    <ArtDef>ArtDefReference</ArtDef>
    <GameItemTypeArtDef InternalName="...">...</GameItemTypeArtDef>
</GameItemType>
```

#### Schema details (Items)

- `<HideInHiergamenon>1</HideInHiergamenon>` — Add to consumable items to hide them from the Hiergamenon codex. Required on items with `<IsUsable>1</IsUsable>` that lack `<CanBeEquipped>`.
- `<ManaValue></ManaValue>` — Mana cost for craftable items; not applicable to most mod items.
- `<Type>Consumable</Type>` — Marks an item as a single-use battle consumable; not required for standard non-battle items.
- `<WeaponUpgradeType></WeaponUpgradeType>` — Categorises a weapon into an upgrade pool for AI equipment selection and player upgrade UI. Known values: `Sword`, `Axe`, `Mace`, `Bow`, `Staff`, `FireStaff`, `LightningStaff`. **Reforged change:** `Staff_Leht` was moved from `LightningStaff` to `FireStaff` in Reforged — mod overrides that reference the old value must be updated.

> **Deprecation:** `Skeleton` is no longer valid as a `SupportedUnitModelType` for armor, clothes, or items. It remains valid for weapons only.

#### Schema details (Armor)

Armor definitions use the same `<GameItemType InternalName="...">` structure as items. Art definition blocks contain `<SupportedUnitModelType>` entries listing which unit models can display the armor.

> **Deprecation (Reforged):** `Skeleton` has been removed as a valid `SupportedUnitModelType` for armor. Valid types include: `HumanMale`, `HumanFemale`, `ElfMale`, `ElfFemale`, `DwarfMale`, `DwarfFemale`, `HenchmanMale`, `IronGolem`, `JuggernautMale`, and others. Do **not** include `Skeleton` in `<SupportedUnitModelType>` for armor items.

#### Schema details (Clothes)

Clothing definitions use `<GameItemType InternalName="...">` with art definitions containing `<SupportedUnitModelType>` entries.

> **Deprecation (Reforged):** `Skeleton` has been removed as a valid `SupportedUnitModelType` for clothes (same as armor). Do **not** include `Skeleton` in clothing art definitions.

New optional Reforged additions:
- `<RandomPeasantUnitLiklihood></RandomPeasantUnitLiklihood>` — Likelihood weight for random peasant unit appearance.
- `<RandomMerchantUnitLiklihood></RandomMerchantUnitLiklihood>` — Likelihood weight for random merchant unit appearance.
- `<RandomHeroUnitLiklihood></RandomHeroUnitLiklihood>` — Likelihood weight for random hero unit appearance.

> **Note:** Mod clothing items with `<Likelihood>0</Likelihood>` (never randomly assigned) do not need the random likelihood properties.


### Spells & Abilities

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreSpells.xml` | `<Spells>` | `<SpellDef>` | Spell definitions (tactical + strategic) |
| `CoreAbilities.xml` | `<AbilityBonuses>` | `<AbilityBonus>` | Hero/unit ability definitions |
| `CorePlayerAbilities.xml` | — | — | Sovereign-specific abilities |
| `ReforgedAbilities.xml` | `<AbilityBonuses>` | `<AbilityBonus>` | Abilities added by Reforged |
| `ReforgedSpells.xml` | `<Spells>` | `<SpellDef>` | Spells added by Reforged |
| `GodSpells.xml` | `<Spells>` | `<SpellDef>` | God-tier spells |

#### Schema details (Spells)

Base spell structure is `<SpellDef InternalName="...">` with `<DisplayName>`, `<Description>`, `<GameModifier>` children. Key elements:
- `<HideInHiergamenon>1</HideInHiergamenon>` — Hides the spell from the Hiergamenon codex.
- `<IsSpecialAbility>1</IsSpecialAbility>` — Marks the spell as a special combat ability.
- `<ValidTerrainCategory></ValidTerrainCategory>` — Restricts spell use to specific terrain.

New optional Reforged additions:
- `<FormattedDescription></FormattedDescription>` — Rich-text description with dynamic value substitution.
- `<Calculate></Calculate>` — Dynamic damage/effect calculation block (replaces fixed `<Value>` in advanced spells).
- `<Cooldown></Cooldown>` — Turns before the spell can be cast again.
- `<PlayOnCaster>1</PlayOnCaster>` — Forces the spell effect to play on the caster instead of the target.
- `<Radius></Radius>` and `<RadiusType></RadiusType>` — Area-of-effect radius and shape.
- `<SpellTargetTileOccupied>`, `<IgnoreInvalidTargetsInRadius>` — Targeting constraint flags.

#### Schema details (Abilities)

- `<AbilityBonusType></AbilityBonusType>` — Categorises the ability for the engine. Must be the **first child** of `<AbilityBonus>`. Known values: `Unit_Design` (unit-level / item-granted), `Unit_Level` (gained on level-up), `Player` (sovereign), `Champion_Spellbook`, `Champion_Talent`.

### Units & Creatures

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreUnits.xml` | — | `<UnitType>` | Base unit type definitions |
| `CoreUnitStats.xml` | `<PlayerAbilityTypes>` | `<UnitStatType>` | Unit stat type definitions (STR, DEX, etc.) |
| `CoreMonsters.xml` | — | — | Monster definitions |
| `CoreMonsterUnitTypes.xml` | — | — | Monster unit type mappings |
| `CoreMounts.xml` | — | — | Mount definitions |
| `ReforgedUnits.xml` | — | — | Units added by Reforged |
| `ReforgedMonsters.xml` | — | — | Monsters added by Reforged |
| `ReforgedChampions.xml` | — | — | Champion definitions |
| `ReforgedChampions2.xml` | — | — | Additional champion definitions |

#### Schema details (Units)

New optional tags available on `<UnitType>` entries in Reforged:
- `<Class></Class>`, `<Allegiance></Allegiance>`, `<CreatureType></CreatureType>`, `<Unique></Unique>` — Champion classification tags (optional for AI army designs).
- `<UnitDisplayName></UnitDisplayName>` — Secondary display name field.
- `<LevelMilestone></LevelMilestone>` — Supports multi-level progressions for champions.

> **Breaking change — Race types:** `Race_Type_Dead` and `Blood_Undead` have been removed. Units using these values must be migrated to valid Reforged race types (see Races & Factions section).

#### Schema details (UnitStats)

Unit stat definitions use `<UnitStatType InternalName="...">` with `<DisplayName>`, `<Description>`, `<Icon>`, `<Hidden>`, `<DefaultValue>`.

New optional Reforged additions:
- `<DisplayNameShort></DisplayNameShort>` — Short abbreviation for the stat (used in compact UI views).
- `<BaseSovereignAttribute></BaseSovereignAttribute>` — Links the stat to a sovereign attribute.
- `<UnitStatGrouping></UnitStatGrouping>` — Display category grouping. Known values: `AbilityStat`, `CalculatedStat`, `CombatStat`, `ResourceStat`, `AttributeStat`.

> **Note:** For hidden tracking stats (`<Hidden>1</Hidden>`), the display tags (`DisplayNameShort`, `UnitStatGrouping`) are not required as they have no UI presence.


### Effects & Modifiers

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreEffects.xml` | — | — | Visual/gameplay effect definitions |
| `Effects/` (directory) | — | — | 400+ individual particle effect XML files |

#### Schema details (Effects)

New optional emitter tags available on effect definitions:
- `<AnimatedStrip></AnimatedStrip>` — Reference to an animated sprite strip texture.
- `<AnimatedStripFPS></AnimatedStripFPS>` — Frame rate of the animated strip.
- `<AnimatedStripStartRandom></AnimatedStripStartRandom>` — Randomise the starting frame of the strip.
- `<LocalParticles></LocalParticles>` — Use local-space particle simulation.

These tags enhance visual fidelity but are not required for effects to function.

### World & Environment

| File | Purpose |
|---|---|
| `CoreEnvironments.xml` | Environment/biome definitions |
| `CoreForests.xml` | Forest type definitions |
| `CoreForestProps.xml` | Forest visual properties |
| `CoreMountains.xml` | Mountain type definitions |
| `CoreRivers.xml` | River definitions |
| `CoreResources.xml` | Resource type definitions (iron, crystal, etc.) |
| `CoreWorldResources.xml` | World resource placement |
| `CoreShards.xml` | Elemental shard definitions |
| `TerrainTypes.xml` | Terrain type definitions |

### Technology & Research

| File | Purpose |
|---|---|
| `CoreTechs.xml` | Technology tree definitions |
| `TechTree_Amarian.xml` | Amarian faction tech tree |
| `Techs_Amarian.xml` | Amarian-specific technologies |

### AI

| File | Purpose |
|---|---|
| `AIAbilities.xml` | AI ability usage priorities |
| `AIMilitaryStrategyTypes.xml` | AI military strategies |
| `AIPlayers.xml` | AI player personality definitions |
| `AITraitTypes.xml` | AI trait type definitions |
| `CoreAIDefs.xml` | Core AI behavior definitions |
| `CoreAIUnits.xml` | AI unit training preferences |

### Quests & Events

| File | Purpose |
|---|---|
| `CoreQuests.xml` | Quest definitions |
| `CoreQuestLocations.xml` | Quest location data |
| `CoreRandomEvents.xml` | Random event definitions |
| `CoreGameEvents.xml` | Game event definitions |
| `CoreGoodieHuts.xml` | Goodie hut reward tables |
| `Quests_v2_Reforged.xml` | Reforged quest system definitions |
| `ReforgedQuests_*.xml` | Individual quest location types (Camps, Ruins, Huts, Inn, etc.) |
| `ReforgedGoodieHuts.xml` | Reforged goodie hut rewards |
| `ReforgedQuestLocations.xml` | Reforged quest locations |

### Races & Factions

| File | Purpose |
|---|---|
| `CoreRaceTypes.xml` | Race type definitions |
| `CoreRaceConfigs.xml` | Race configuration data |
| `HistoricalFigures.xml` | Historical/notable figure definitions |
| `CoreMarriageCandidates.xml` | Marriage candidate definitions |
| `CoreNamePools.xml` | Name pool definitions |
| `CoreNameRuleset.xml` | Name generation rulesets |

#### Reforged race types

Reforged defines exactly **10 playable race types**. The following were removed and must not appear in mod files:

| Removed | Reason |
|---|---|
| `Race_Type_Dead` | Removed in Reforged; use `Race_Type_Wraiths` for undead/spectral units |
| `Blood_Undead` | Associated blood type removed; use `Blood_Wraith` |

**Valid Reforged race types:** `Race_Type_Altarians`, `Race_Type_Mancers`, `Race_Type_Ironeers`, `Race_Type_Amarians`, `Race_Type_Tarthans`, `Race_Type_Krax`, `Race_Type_Wraiths`, `Race_Type_Trogs`, `Race_Type_Urxen`, `Race_Type_Quendar`.

### City & Improvements

| File | Purpose |
|---|---|
| `CoreImprovements.xml` | City improvement definitions |
| `CityCitizenTypes.xml` | Citizen type definitions |
| `CityResourceEffectDefs.xml` | Resource effects on cities |
| `CoreRecipes.xml` | Crafting recipe definitions |
| `ReforgedRecipes.xml` | Reforged crafting recipes |

### Visual & Audio

| File | Purpose |
|---|---|
| `CoreUnitProps.xml` | Unit visual property definitions |
| `CoreSkins.xml` | Unit skin definitions |
| `CoreEyes.xml` | Eye style definitions |
| `CoreHairReforged.xml` | Hair style definitions |
| `ArtGameItem.xml` | Art-to-item mappings |
| `ArtImprovements.xml` | Improvement art definitions |
| `CoreLayeredMusic.xml` | Music layer definitions |
| `UnitSoundPacks.xml` | Unit sound pack definitions |

### Miscellaneous

| File | Purpose |
|---|---|
| `CoreDifficultyLevels.xml` | Difficulty level definitions |
| `CoreLetters.xml` | In-game letter/message templates |
| `CoreLogos.xml` | Faction logo definitions |
| `CoreMaps.xml` | Map configuration definitions |
| `ElementalDefs.xml` | Core game constants (starting money, population, etc.) |
| `RoadLevelDefs.xml` | Road level definitions |
| `TaxRateDefs.xml` | Tax rate definitions |
| `Treaties.xml` | Diplomacy treaty definitions |
| `Tutorials.xml` | Tutorial definitions |
| `Wildlands.xml` | Wildlands/neutral territory data |

---

## GameCore/ Subdirectories

| Directory | Contents |
|---|---|
| `Core Stamps/` | Map stamp definitions (terrain patterns, seeds, worlds) — ~160 XML files |
| `Core Tiles/` | Tile designs for buildings, terrain, creatures, resources — ~750+ XML files |
| `Core World/` | World conversation/formation data |
| `Effects/` | Particle effect XML definitions — ~400+ files |
| `Scenarios/` | Campaign scenario definitions and tutorial data |
| `Schemas/` | XSD schema files (e.g., `QuestV2.xsd`) |

---

## Key XML Patterns

### InternalName Convention

Every entity uses `InternalName` as its unique identifier attribute:
```xml
<GameItemType InternalName="AmuletOfFlames">
```

Mods should use a prefix to avoid collisions (e.g., `BMB_` for Black Market Bazaar).

### GameModifier Structure

The `<GameModifier>` element is the universal mechanism for applying stat changes:

```xml
<GameModifier>
    <ModType>Unit|Player|GiveItem|...</ModType>
    <Attribute>AdjustUnitStat|UnlockCombatAbility|ProduceResource|...</Attribute>
    <StrVal>UnitStat_Attack_Fire</StrVal>
    <Value>2</Value>
    <Provides>Human-readable description of effect</Provides>
</GameModifier>
```

### Common ModType Values

- `Unit` — Modifies the equipped/affected unit
- `Player` — Modifies the owning player
- `GiveItem` — Grants an item to the unit

### Common Attribute Values (for ModType=Unit)

- `AdjustUnitStat` — Change a unit stat (paired with `StrVal` for stat name)
- `UnlockCombatAbility` — Grant a combat ability
- `UnlockRangedAction` — Grant a ranged attack
- `MeleeDefenseAppliesSpell` — Apply spell on melee defense
- `ProduceResource` — Generate a resource per turn

### Localization

Base game XML uses localization keys for display text:
```xml
<DisplayName>TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME</DisplayName>
```

Mods can use plain text directly or add keys to `.str` string table files:
```xml
<DisplayName>Amulet of Contamination</DisplayName>
```

### Prerequisite System

Items and abilities use `<Prereq>` elements for unlock conditions:
```xml
<Prereq>
    <Type>Tech|AbilityBonusOption|RestrictedAbilityBonusOption</Type>
    <Attribute>TechOrAbilityInternalName</Attribute>
    <Target>Player</Target>
</Prereq>
```

### Rarity System

```xml
<Likelihood>25</Likelihood>          <!-- Drop chance weight -->
<RarityDisplay>Uncommon</RarityDisplay>  <!-- Visual rarity tier -->
```

Values: `Common`, `Uncommon`, `Rare`, `Epic`, `Legendary`

### Art Definition Pattern

Art definitions support two patterns:

**1. Inline (embedded within the item definition):**
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

**2. External reference (referencing a definition in `CoreItemArt.xml` or `ArtGameItem.xml`):**
```xml
<ArtDef>ExistingArtDefInternalName</ArtDef>
```

**PNG/DDS auto-resolution:** The engine automatically tries both `.png` and `.dds` extensions when loading `<IconFile>` values. You can use either format in mod files; the engine will find the file regardless of which extension you specify in the XML.


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

## Mod File Locations

When creating a mod, files are deployed to the user's "My Documents" game folder:

| Mod Content | Deployment Path |
|---|---|
| XML data files | `My Games/ElementalReforged/Mods/<ModName>/` |
| Icon/texture files | `My Games/ElementalReforged/Mods/Gfx/` |
| String tables | `My Games/ElementalReforged/Mods/Data/` |

```
---
**File Statistics**
- **Size**: 12.15 KB
- **Lines**: 340
File: `modules/game-data/overview.md`
