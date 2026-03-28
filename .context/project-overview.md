# Project - Overview
_SOURCE: Project README_
# Project README
```
// Structure of documents
└── Mods/
    ├── Black Market Bazaar/
    │   └── README.md
└── README.md
└── docs/
    └── game-data/
        ├── README.md
    └── modding-guide/
        └── README.md

```
###  Path: `\Mods\Black Market Bazaar/README.md`

```md
# Black Market Bazaar - Mod Module 
  
The Black Market Bazaar (BMB) is a content mod for Elemental: Reforged (originally Fallen Enchantress: Legendary Heroes). It adds 242 new items, 76 item-related spells, and 19 new clothes for custom sovereigns. 
  
All mod XML files use the BMB_ prefix for InternalName values to avoid collisions with the base game and other mods. 
  
---  
  
## File Inventory 
  
| File | Root Element | Content | 
|---|---|---| 
| BMB_Items.xml | GameItemTypes | Accessories, consumables, and miscellaneous items | 
| BMB_Weapons.xml | GameItemTypes | Weapon definitions (axes, swords, staves, bows, wands) |  
| BMB_Armor.xml | GameItemTypes | Armor pieces (helmets, shields, body armor) |  
| BMB_Clothes.xml | GameItemTypes | Clothing items (robes, cloaks, boots) - includes 19 sovereign-equippable outfits |  
| BMB_Spells.xml | Spells | 76 item-triggered spell definitions |  
| BMB_Abilities.xml | AbilityBonuses | Custom hero/unit ability definitions |  
| BMB_Effects.xml | - | Visual effect definitions for BMB items |  
| BMB_Units.xml | - | Custom unit definitions (e.g., summoned creatures) |  
| BMB_UnitStats.xml | - | Custom unit stat type definitions |  
| BMB_CoreItemsModifications.xml | GameItemTypes | Modifications/overrides to base game items |  
| BMB_Items_DLC05.xml | GameItemTypes | Items requiring DLC05 (Leader Pack) | 
  
## Supporting Files  
  
| File | Location | Purpose |  
|---|---|---|  
| BMB.str | Mods/Data/ | String table for UI labels (weapon type names, etc.) |  
| *.png | Mods/Gfx/Black Market Bazaar Icons/ | Item icons (~230 PNG files) |  
| *.dds | Mods/Gfx/Black Market Bazaar Icons/ | Texture files for 3D models (~15 DDS files) | 
  
## Naming Conventions  
  
- InternalName: BMB_PascalCaseName for new items (e.g., BMB_AmuletOfContamination)  
- Icon files: BMB_PascalCaseName.png matching the InternalName  
- Texture files: BMB_PascalCaseName_Texture.dds for items with 3D models  
- Ability icons: BMB_Ability_PascalCaseName.png 
  
## Weapon Types Added  
  
The mod adds new weapon upgrade types not in the base game:  
- LightningStaff - Lightning-element staves  
- PoisonStaff - Poison-element staves  
- Wand - Wand-type weapons  
  
These are registered via the BMB.str string table. 
  
## DLC05 Dependency  
  
BMB_Items_DLC05.xml contains items that depend on the Leader Pack DLC. If DLC05 is not installed, these items (4 "Treasure Finder" items) will have no effect. The file can be safely deleted in that case. 
  
## Integration with Base Game  
  
- BMB_CoreItemsModifications.xml modifies existing base game items (e.g., adding new properties to vanilla staves).  
- All new content uses Likelihood values to integrate into the game's random item generation system.  
- Items reference base game prerequisites (Prereq) for tech and ability requirements. 
  
---  
  
## Reforged Compatibility (2026-03-28)  
  
The following changes were applied to make the mod compatible with Elemental: Reforged. 
  
### Consumable Items - Hiergamenon Visibility (BMB_Items.xml)  
 
All 31 qualifying consumable items in BMB_Items.xml have been tagged with HideInHiergamenon=1. 
A qualifying consumable is any item with IsUsable=1 and no CanBeEquipped element.  
 
This tag prevents single-use items from appearing in the in-game Hiergamenon (the codex/encyclopedia).  
Equippable items (accessories, armor, weapons, clothing) are intentionally excluded.  
 
Note: The original estimate was ~20 qualifying consumables. The actual count is 31. 
The 11 additional items are: Egg_BlackWidow, Egg_Naja, LostBarrowhillWine, Manashroom, MortarAndPestle, 
Scroll_ArcaneMonolith, Scroll_Obsession, Scroll_Violence, Scroll_VitalPoints, Token_CanisDirus, Token_Stalker. 
All are correctly classified as single-use non-equippable.  
 
Rule for future maintainers: Any new item in BMB_Items.xml with IsUsable=1 and no CanBeEquipped must also include HideInHiergamenon=1.  
 
### Ability Bonus Types (BMB_Abilities.xml)  
 
**Update (2026-03-28 rework):** The initial compatibility pass added `<AbilityBonusType>Unit_Design</AbilityBonusType>` to both `BMB_EruditeAbility` and `BMB_FamousAbility`. This was identified as incorrect and **the tag has been removed from both abilities**.  
 
**Why it was removed:** In the core game, every ability using `AbilityBonusType=Unit_Design` also carries a `<Cost>` element defining its unit-designer purchase price. Without `<Cost>`, the abilities appeared as free 0-cost options in the unit designer, bypassing the item-selling mechanic. BMB abilities are item-granted only (`HeroOnly=1`, `IsAvailableForUnitDesign=0`) and must not carry `AbilityBonusType`.  
 
The correct pattern — matching the 127-entry item-only model used by the core game — omits `AbilityBonusType` entirely. Items reference abilities via `UnlockUnitAbility`/`StrVal` using the option InternalName (`BMB_Erudite`, `BMB_Famous`), which is unaffected by this change. Each item also carries `IsAvailableForUnitDesign=0` as an independent safeguard against unit-designer appearance.  
 
Rule for future maintainers: Do **not** add `AbilityBonusType` to any item-granted-only ability. Only use `AbilityBonusType` for abilities that legitimately appear in the unit designer or level-up screen, and only when paired with a valid `<Cost>` element. See docs/modding-guide/README.md for full rules.  

### Mage_Lightning_AI Equipment Upgrade Fix (BMB_Units.xml)  

The `EquipmentUpgradeDef` Weapon-slot blocks for all 11 Mage_Lightning_AI unit variants
(Altarian, Amarian, Dead, Ironeer, Krax, Mancer, Quendar, Tarthan, Trog, Urxen, Wraith) have been changed
from `WeaponUpgradeType=LightningStaff` to `WeaponUpgradeType=FireStaff`.

**Why:** No LightningStaff weapon in the mod (or base game) is flagged as a valid AI upgrade target at the
time of this fix. The LightningStaff category was populated only by Staff_Thunderous, which is assigned to
Mage_Lightning_AI units as starting equipment — not as a shop-upgradeable item. The AI weapon-shopping
system silently skips categories with no eligible weapons, leaving these units unable to upgrade their weapon
slot during play. Switching to FireStaff allows the AI to locate Staff_Leht (a FireStaff with
`UnitStat_Attack_Lightning` modifier) as a valid upgrade candidate.

Staff_Thunderous retains `WeaponUpgradeType=LightningStaff` in BMB_Weapons.xml and is still equipped at unit
creation via `<Equipment>` tags; only upgrade shopping is affected by this change.

Rule for future maintainers: When adding a new weapon for Mage_Lightning_AI units to upgrade into, it must use
`WeaponUpgradeType=FireStaff` to be found by the AI upgrade system. The LightningStaff category is not used
for EquipmentUpgradeDef.

### Armor Art Pack Gender Conformance Fix (BMB_Armor.xml)  

Three gender-mismatched `SupportedUnitModelType` entries have been removed from two female armor art packs:

- **Art_NihilistBreastpiece_2**: removed `SlaveMale`
- **Art_LeatherVambraces_Regenerative_2**: removed `DarklingMale` and `SlaveMale`

Both female packs now contain exclusively female model types (11 entries each), matching the pattern used by
other female art packs in the file. The corresponding male packs (`Art_NihilistBreastpiece_1` and
`Art_LeatherVambraces_Regenerative_1`) are unchanged.

These were copy-paste errors introduced when the art packs were originally created. Mismatched entries could
cause male unit geometry to render incorrectly when equipping these armor pieces on female units in Reforged.

Note: The overall diff for BMB_Armor.xml also shows 84 `Skeleton` SupportedUnitModelType removals. These were applied in the original Reforged compatibility pass (2026-03-28), not this rework. See docs/modding-guide/README.md for the Skeleton deprecation policy.

### Unit Backstory Corrections (BMB_Units.xml)  

Two custom Wraith units had backstory text that was copy-pasted from a Calebethon unit and was lore-inaccurate.
Both backstories have been replaced with original, lore-appropriate text:

- **Tempest Howlers** (`BMB_Unit_Dead_Mage_Lightning_AI`): New backstory references Ceresa's binding rites,
  Resoln's oldest temple, rune-carving, and lightning transformation. Captures the painful erasure of self
  central to the Wraith archetype.

- **Intangible Knockers** (`BMB_Unit_Dead_Staff_AI`): New backstory references Resoln's shadow-places, the
  ritual crossing of the threshold between worlds, and the inability to fully return. The closing line directly
  reflects the unit's intangibility ability.

**Wraith unit backstory convention:** Both backstories follow the established second-person narrative voice
and three-paragraph structure used for Wraith units. Each paragraph escalates the transformation narrative,
and the final sentence echoes the unit's display name (e.g. "They call you Tempest Howlers. You do not
disagree."). Future BMB Wraith unit backstories should follow this same pattern. Non-Wraith BMB units use
third-person backstory narration — see other units in BMB_Units.xml for reference.

### In-Game Smoke Test — Pending Manual Verification  
 
Three acceptance criteria from the post-migration smoke test require a live in-game session to verify and are tracked as pending manual testing:  
 
| AC | Check | Automated result |
|---|---|---|
| AC #2 | All non-consumable BMB items visible in Hiergamenon; all 31 consumables hidden | 31 consumables confirmed by HideInHiergamenon tag count; non-consumable browser visibility requires gameplay |
| AC #5 | BMB armor and clothing render correctly when equipped | XML structure valid; render crash test requires equipping items in-game |
| AC #7 | At least one BMB spell casts, one effect activates, and one item buys/sells without crash | BMB_Spells.xml and BMB_Effects.xml are well-formed; functional test requires gameplay session |
 
These are an inherent limitation of automated mod testing — the game engine must be running to exercise rendering, effect activation, and the shop system. All other automated checks (XML validity, tag counts, unit configuration) passed.

```
###  Path: `README.md`

```md
# Black Market Bazaar - Continued

A continuation of Hellion's original mod for the PC game _Fallen Enchantress Legendary Heroes_:

- 242 new items.
- 76 new item related spells.
- Including 19 new clothes to equip your custom sovereigns.

## Continuation features

- Reworked some of the item icons.
- Fixed some typos and grammar issues.

## Disclaimer

I am not the original author of the mod. Since it is abandoned, 
I created this repository on GitHub to be able to work on it, 
and let others participate to further extend it.

The original mod was published on NexusMods by _Hellions1_. 
It can still be downloaded there:

https://www.nexusmods.com/fallenenchantress/mods/1885

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
- **Size**: 25.31 KB
- **Lines**: 781
File: `project-overview.md`
