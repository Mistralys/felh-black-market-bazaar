# Game Data Reference

> **Base game data path:** `<Steam>/Elemental Reforged/data/`

This document covers the base game's data folder structure, GameCore file inventory, and XML schema details relevant to modding.

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

---

## GameCore/ — File Reference

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

#### Item entry structure

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

#### Schema details — Items

| Element | Purpose |
|---|---|
| `<HideInHiergamenon>1</HideInHiergamenon>` | Hide from the in-game codex. Required on consumables (`IsUsable=1` without `CanBeEquipped`). |
| `<ManaValue></ManaValue>` | Mana cost for craftable items (not applicable to most mod items) |
| `<Type>Consumable</Type>` | Marks an item as single-use battle consumable |
| `<WeaponUpgradeType></WeaponUpgradeType>` | Categorises weapon into AI upgrade pool. Values: `Sword`, `Axe`, `Mace`, `Bow`, `Staff`, `FireStaff`, `LightningStaff` |

#### Schema details — Armor

Armor uses `<GameItemType InternalName="...">` with art definition blocks containing `<SupportedUnitModelType>` entries listing compatible unit models.

Valid types: `HumanMale`, `HumanFemale`, `ElfMale`, `ElfFemale`, `DwarfMale`, `DwarfFemale`, `HenchmanMale`, `IronGolem`, `JuggernautMale`, and others.

> **Deprecation (Reforged):** `Skeleton` removed as valid `SupportedUnitModelType` for armor. See [constraints.md](constraints.md#skeleton-deprecation).

#### Schema details — Clothes

Clothing uses `<GameItemType InternalName="...">` with art definitions containing `<SupportedUnitModelType>` entries.

Reforged additions (optional):
- `<RandomPeasantUnitLiklihood>` — Likelihood weight for random peasant unit appearance
- `<RandomMerchantUnitLiklihood>` — Likelihood weight for random merchant unit appearance
- `<RandomHeroUnitLiklihood>` — Likelihood weight for random hero unit appearance

> Items with `<Likelihood>0</Likelihood>` (never randomly assigned) do not need the random likelihood properties.

### Spells & Abilities

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreSpells.xml` | `<Spells>` | `<SpellDef>` | Spell definitions (tactical + strategic) |
| `CoreAbilities.xml` | `<AbilityBonuses>` | `<AbilityBonus>` | Hero/unit ability definitions |
| `CorePlayerAbilities.xml` | — | — | Sovereign-specific abilities |
| `ReforgedAbilities.xml` | `<AbilityBonuses>` | `<AbilityBonus>` | Reforged abilities |
| `ReforgedSpells.xml` | `<Spells>` | `<SpellDef>` | Reforged spells |
| `GodSpells.xml` | `<Spells>` | `<SpellDef>` | God-tier spells |

#### Schema details — Spells

Base structure: `<SpellDef InternalName="...">` with `<DisplayName>`, `<Description>`, `<GameModifier>`.

| Element | Purpose |
|---|---|
| `<HideInHiergamenon>1</HideInHiergamenon>` | Hides spell from Hiergamenon codex |
| `<IsSpecialAbility>1</IsSpecialAbility>` | Marks as special combat ability |
| `<ValidTerrainCategory>` | Restricts spell use to specific terrain |

Reforged additions (optional):
- `<FormattedDescription>` — Rich-text with dynamic value substitution
- `<Calculate>` — Dynamic damage/effect calculation block
- `<Cooldown>` — Turns before spell can be recast
- `<PlayOnCaster>1</PlayOnCaster>` — Force effect on caster instead of target
- `<Radius>` and `<RadiusType>` — AoE radius and shape
- `<SpellTargetTileOccupied>`, `<IgnoreInvalidTargetsInRadius>` — Targeting flags

#### Schema details — Abilities

- `<AbilityBonusType>` — Categorises ability. Must be **first child** of `<AbilityBonus>`. Values: `Unit_Design`, `Unit_Level`, `Player`, `Champion_Spellbook`, `Champion_Talent`.

> See [constraints.md](constraints.md#abilitybonustype) for BMB-specific rules on when to omit `AbilityBonusType`.

### Units & Creatures

| File | Root Element | Entry Element | Purpose |
|---|---|---|---|
| `CoreUnits.xml` | — | `<UnitType>` | Base unit type definitions |
| `CoreUnitStats.xml` | `<PlayerAbilityTypes>` | `<UnitStatType>` | Unit stat type definitions |
| `CoreMonsters.xml` | — | — | Monster definitions |
| `CoreMonsterUnitTypes.xml` | — | — | Monster unit type mappings |
| `CoreMounts.xml` | — | — | Mount definitions |
| `ReforgedUnits.xml` | — | — | Reforged units |
| `ReforgedMonsters.xml` | — | — | Reforged monsters |
| `ReforgedChampions.xml` | — | — | Champion definitions |
| `ReforgedChampions2.xml` | — | — | Additional champions |

#### Schema details — Units

Translatable elements on `<UnitType>` (used in per-entry `en.xml` / `<lang>.xml` files):
- `<DisplayName>` — Unit name shown in-game
- `<Backstory>` — Lore/flavour text for the unit (note: units use `<Backstory>`, **not** `<Description>`)

Reforged optional tags on `<UnitType>`:
- `<Class>`, `<Allegiance>`, `<CreatureType>`, `<Unique>` — Champion classification
- `<UnitDisplayName>` — Secondary display name
- `<LevelMilestone>` — Multi-level progressions for champions

> **Breaking change:** `Race_Type_Dead` and `Blood_Undead` removed. See [constraints.md](constraints.md#unit-race-types).

#### Schema details — UnitStats

`<UnitStatType InternalName="...">` with `<DisplayName>`, `<Description>`, `<Icon>`, `<Hidden>`, `<DefaultValue>`.

Reforged additions:
- `<DisplayNameShort>` — Short abbreviation for compact UI views
- `<BaseSovereignAttribute>` — Links stat to sovereign attribute
- `<UnitStatGrouping>` — Display category. Values: `AbilityStat`, `CalculatedStat`, `CombatStat`, `ResourceStat`, `AttributeStat`

### Effects & Modifiers

| File | Root Element | Purpose |
|---|---|---|
| `CoreEffects.xml` | — | Visual/gameplay effect definitions |
| `Effects/` (directory) | — | ~400 individual particle effect XML files |

Reforged optional emitter tags:
- `<AnimatedStrip>`, `<AnimatedStripFPS>`, `<AnimatedStripStartRandom>` — Animated sprite strips
- `<LocalParticles>` — Local-space particle simulation

### World & Environment

| File | Purpose |
|---|---|
| `CoreEnvironments.xml` | Environment/biome definitions |
| `CoreForests.xml` / `CoreForestProps.xml` | Forest types and visual properties |
| `CoreMountains.xml` | Mountain type definitions |
| `CoreRivers.xml` | River definitions |
| `CoreResources.xml` / `CoreWorldResources.xml` | Resource types and world placement |
| `CoreShards.xml` | Elemental shard definitions |
| `TerrainTypes.xml` | Terrain type definitions |

### Technology & Research

| File | Purpose |
|---|---|
| `CoreTechs.xml` | Tech tree definitions |
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
| `CoreRandomEvents.xml` / `CoreGameEvents.xml` | Random and game event definitions |
| `CoreGoodieHuts.xml` | Goodie hut reward tables |
| `Quests_v2_Reforged.xml` | Reforged quest system |
| `ReforgedQuests_*.xml` | Quest location types (Camps, Ruins, Huts, Inn, etc.) |
| `ReforgedGoodieHuts.xml` / `ReforgedQuestLocations.xml` | Reforged rewards and locations |

### Races & Factions

| File | Purpose |
|---|---|
| `CoreRaceTypes.xml` | Race type definitions |
| `CoreRaceConfigs.xml` | Race configuration data |
| `HistoricalFigures.xml` | Historical/notable figure definitions |
| `CoreMarriageCandidates.xml` | Marriage candidate definitions |
| `CoreNamePools.xml` / `CoreNameRuleset.xml` | Name generation |

**Valid Reforged race types (10):** `Race_Type_Altarians`, `Race_Type_Mancers`, `Race_Type_Ironeers`, `Race_Type_Amarians`, `Race_Type_Tarthans`, `Race_Type_Krax`, `Race_Type_Wraiths`, `Race_Type_Trogs`, `Race_Type_Urxen`, `Race_Type_Quendar`.

### City & Improvements

| File | Purpose |
|---|---|
| `CoreImprovements.xml` | City improvement definitions |
| `CityCitizenTypes.xml` | Citizen type definitions |
| `CityResourceEffectDefs.xml` | Resource effects on cities |
| `CoreRecipes.xml` / `ReforgedRecipes.xml` | Crafting recipes |

### Visual & Audio

| File | Purpose |
|---|---|
| `CoreUnitProps.xml` | Unit visual properties |
| `CoreSkins.xml` / `CoreEyes.xml` | Skin and eye styles |
| `CoreHairReforged.xml` | Hair styles |
| `ArtGameItem.xml` / `ArtImprovements.xml` | Art mappings |
| `CoreLayeredMusic.xml` / `UnitSoundPacks.xml` | Music and sound |

### Miscellaneous

| File | Purpose |
|---|---|
| `CoreDifficultyLevels.xml` | Difficulty levels |
| `CoreLetters.xml` | In-game messages |
| `CoreLogos.xml` | Faction logos |
| `CoreMaps.xml` | Map configurations |
| `ElementalDefs.xml` | Core constants (starting money, population, etc.) |
| `RoadLevelDefs.xml` / `TaxRateDefs.xml` | Road and tax definitions |
| `Treaties.xml` | Diplomacy treaties |
| `Tutorials.xml` | Tutorial definitions |
| `Wildlands.xml` | Wildlands/neutral territory data |

---

## GameCore/ Subdirectories

| Directory | Contents |
|---|---|
| `Core Stamps/` | Map stamp definitions (~160 XML files) |
| `Core Tiles/` | Tile designs for buildings, terrain, creatures (~750+ XML files) |
| `Core World/` | World conversation/formation data |
| `Effects/` | Particle effect XML definitions (~400+ files) |
| `Scenarios/` | Campaign scenario definitions and tutorial data |
| `Schemas/` | XSD schema files (e.g., `QuestV2.xsd`) |
