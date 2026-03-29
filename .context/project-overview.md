# Project - Overview
_SOURCE: Project README_
# Project README
```
// Structure of documents
└── Mods/
    ├── README.md
└── README.md
└── docs/
    ├── agents/
    │   ├── implementation-history/
    │   │   └── README.md
    ├── game-data/
    │   ├── README.md
    ├── modding-guide/
    │   └── README.md
└── node_modules/
    └── fast-xml-builder/
        ├── README.md
    └── fast-xml-parser/
        ├── README.md
    └── path-expression-matcher/
        ├── README.md
    └── strnum/
        └── README.md

```
###  Path: `\Mods/README.md`

```md
# Black Market Bazaar - Mod Module 
  
The Black Market Bazaar (BMB) is a content mod for Elemental: Reforged (originally Fallen Enchantress: Legendary Heroes). It adds 243 new items, 76 item-related spells, and 19 new clothes for custom sovereigns. 
  
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
  
## Supporting Files  
  
| File | Location | Purpose |  
|---|---|---|  
| BMB.str | Mods/src/Data/ | String table for UI labels (weapon type names, etc.) |  
| *.png | Mods/src/Gfx/Black Market Bazaar Icons/ | Item icons (227 PNG files) |  
| *.dds | Mods/src/Gfx/Black Market Bazaar Icons/ | Texture files for 3D models (16 DDS files) | 
  
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

Reboot of the "Black Market Bazaar" mod for Fallen Enchantress: Legendary Heroes, modernized and adapted to **Elemental: Reforged**.

---

## Full item reference

See [items.md](docs/references/items.md).

---

## Credits

- Original mod by Hellions1 for Fallen Enchantress: Legendary Heroes.
- Original readme: [original-felh-readme.txt](docs/references/original-felh-readme.txt)

---

## Development Guide

### Prerequisites

- [Node.js](https://nodejs.org/) (for the script runner)
- The game installed (the Mods folder is the deployment target)
- Supported on Windows, macOS, and Linux

### Clone and install

```
git clone <repo-url>
cd felh-black-market-bazaar
npm install
```

---

## Local Build Configuration

This project uses a **local build config** file that is machine-specific and never committed to version control.

### Setup (first time)

1. Copy the example file to create your local config:

   ```
   cp .build.config.example.json build.config.json
   ```

2. Open `build.config.json` and set `deployPath` to the Mods folder on your machine:

   **Windows:**

   ```json
   { "deployPath": "C:\\Users\\alice\\Documents\\My Games\\ElementalReforged\\Mods" }
   ```

   **macOS:**

   ```json
   { "deployPath": "/Users/alice/Library/Application Support/ElementalReforged/Mods" }
   ```

   **Linux:**

   ```json
   { "deployPath": "/home/alice/.local/share/ElementalReforged/Mods" }
   ```

> `build.config.json` is listed in `.gitignore` -- your local path will never be committed.
>
> `.build.config.example.json` is the committed template; do not edit it with real paths.

---

## Build Command

Deploys `Mods/src/` to the game's Mods folder in one step.

### Run directly

```
npm run build
```

Or equivalently:

```
node scripts/build.mjs
```

What it does:

1. Reads `build.config.json` and validates `deployPath` and `modID`.
2. Confirms `Mods/src/` exists in the project.
3. Deletes `<deployPath>/<modID>/` if it already exists (clean slate).
4. Copies `Mods/src/` to `<deployPath>/<modID>/`.
5. Prints a summary: `Build complete. N file(s) deployed to: <path>`.

The operation is idempotent — running it again produces the same result.

### Error cases

| Condition | Message | Exit code |
|---|---|---|
| `build.config.json` missing | `build.config.json not found. Copy .build.config.example.json ...` | 1 |
| `deployPath` absent or empty | `build.config.json is missing a valid deployPath ...` | 1 |
| `deployPath` does not exist | `deployPath does not exist or is not accessible: <path>` | 1 |
| `deployPath` is not a directory | `deployPath is not a directory: <path>` | 1 |
| `modID` absent or empty | `build.config.json is missing a valid modID ...` | 1 |
| Source folder `Mods/src/` missing | `Source folder not found: <path>` | 1 |

### Use from another script

```js
import { build } from './scripts/build.mjs';
await build();
```

The exported `build()` function is async and uses `process.exit(1)` on failure,
making it safe to call directly from menu handlers without an extra child process.

---

## Script Runner

```
npm run menu
```

Launches an interactive terminal menu with shortcut keys for common tasks.
Must be run in an interactive terminal (TTY). Press **q** or **Ctrl+C** to quit.

### Available menu items

| Key | Action |
|---|---|
| `a` | Generate context documentation (`ctx generate`) |
| `b` | Build mod (deploy to game folder) |
| `c` | Generate item reference (`docs/references/`) |
| `q` | Quit |

Keys are assigned alphabetically in declaration order. Adding a new item appends the next letter automatically. The menu supports up to 26 items (a–z).

---

## Repository Layout

| Path | Purpose |
|---|---|
| ``scripts/build.mjs`` | Build/deploy script — copies mod to game folder |
| ``scripts/menu.mjs`` | Interactive terminal menu |
| ``scripts/prepare.mjs`` | Config-reminder hook (runs after `npm install`) |
| ``scripts/lib/output.mjs`` | Shared console output helpers (colours, symbols) |
| ``scripts/`` | Node.js build and tooling scripts |
| ``Mods/`` | Mod source files |
| ``docs/`` | Project documentation |
| ``.build.config.example.json`` | Committed template for local build config |
| ``build.config.json`` | Your local build config (git-ignored) |

```
###  Path: `\docs\agents\implementation-history/README.md`

```md
# Implementation Archive

This folder contains an archive of implementation plans for the project.

**DEPRECATION WARNING:** These are historical documents, and very likely
do not reflect the current state of the application.

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
###  Path: `\node_modules\fast-xml-builder/README.md`

```md
# fast-xml-builder
Build XML from JSON


XML Builder was the part of [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) for years. But considering that any bug in parser may false-alarm the users who are only using builder, we have decided to split it into a separate package.

## Installation

```bash
npm install fast-xml-builder
```

## Usage

```javascript
import XMLBuilder from 'fast-xml-builder';

const builder = new XMLBuilder();
const xml = builder.build({ name: 'value' });
```

fast-xml-builder fully support the response generated by fast-xml-parser. So you can use the maximum options as you are using for fast-xml-parser like `preserveOrder`, `ignoreAttributes`, `attributeNamePrefix`, `textNodeName`, `cdataTagName`, `cdataPositionChar`, `format`, `indentBy`, `suppressEmptyNode` and many more. Any change in parser will reflect here time to time.


```
###  Path: `\node_modules\fast-xml-parser/README.md`

```md
# [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)

[![NPM total downloads](https://img.shields.io/npm/dt/fast-xml-parser.svg)](https://npm.im/fast-xml-parser)

Validate XML, Parse XML to JS Object, or Build XML from JS Object without C/C++ based libraries and no callback.

<img align="right" src="static/img/fxp_logo.png" width="180px" alt="FXP logo"/>

* Validate XML data syntactically. Use [detailed-xml-validator](https://github.com/NaturalIntelligence/detailed-xml-validator/) to verify business rules.
* Parse XML to JS Objects and vice versa
* Common JS, ESM, and browser compatible
* Faster than any other pure JS implementation.

It can handle big files (tested up to 100mb). XML Entities, HTML entities, and DOCTYPE entites are supported. Unpaired tags (Eg `<br>` in HTML), stop nodes (Eg `<script>` in HTML) are supported. It can also preserve Order of tags in JS object

---
# Your Support, Our Motivation

## Try out our New Thoughts

- WishIn - You need it if negative thoughts take over all the time <br>
<a href="https://play.google.com/store/apps/details?id=com.solothought.wishin"> <img src="https://solothought.com/products/assets/images/wishin/YouTubeThumbnail.png" width="500px"/> </a>
- **Flowgger**: 90% less logs size and 90% less debugging time<br>
<a href="https://github.com/solothought/flowgger"> <img src="static/img/flowgger_h.webp" alt="Flowgger Logging Framework" width="300px"/></a>
- [Text2Chart](https://solothought.com/text2chart/flow): interactive flow chart out of simple text.

## Financial Support

Sponsor this project

<a href="https://github.com/sponsors/NaturalIntelligence"> 
  <img src="https://raw.githubusercontent.com/NaturalIntelligence/ThankYouBackers/main/github_sponsor.png" width="180" />
</a>
<a href="https://opencollective.com/fast-xml-parser/donate" target="_blank">
  <img src="https://opencollective.com/fast-xml-parser/donate/button@2x.png?color=blue" width=180 />
</a>
<a href="https://paypal.me/naturalintelligence"> <img src="static/img/support_paypal.svg" alt="donate button" width="180"/></a>
<br>
<br>
<br>

<!--
### Current Sponsors

Check the complete list at [ThankYouBackers](https://github.com/NaturalIntelligence/ThankYouBackers) for our sponsors and supporters.

Through Github

<a href="https://github.com/skunkteam" target="_blank"><img src="https://avatars.githubusercontent.com/u/46373671?s=60" width="60px"></a>
<a href="https://github.com/getsentry" target="_blank"><img src="https://avatars.githubusercontent.com/u/1396951?s=60" width="60px"></a>

Through OpenCollective

<a href="https://opencollective.com/fast-xml-parser/sponsor/0/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/1/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/2/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/3/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/4/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/5/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/6/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/7/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/8/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/fast-xml-parser/sponsor/9/website" target="_blank"><img src="https://opencollective.com/fast-xml-parser/sponsor/9/avatar.svg"></a>
-->

![fxp_sponsors](https://raw.githubusercontent.com/NaturalIntelligence/ThankYouBackers/main/assets/NI_sponsors.jpg)

> This is a donation. No goods or services are expected in return. Any requests for refunds for those purposes will be rejected.

## Users

<a href="https://github.com/renovatebot/renovate" title="renovate" ><img src="https://avatars1.githubusercontent.com/u/38656520" width="60px" ></a>
<a href="https://vmware.com/" title="vmware" > <img src="https://avatars0.githubusercontent.com/u/473334" width="60px" ></a>
<a href="https://opensource.microsoft.com/" title="microsoft" > <img src="https://avatars0.githubusercontent.com/u/6154722" width="60px" ></a>
<a href="http://ibm.github.io/" title="IBM" > <img src="https://avatars2.githubusercontent.com/u/1459110" width="60px" ></a>
<a href="http://www.smartbear.com" title="SmartBear Software" > <img src="https://avatars2.githubusercontent.com/u/1644671" width="60px" ></a>
<a href="http://nasa.github.io/" title="NASA" > <img src="https://avatars0.githubusercontent.com/u/848102" width="60px" ></a>
<a href="https://github.com/prettier" title="Prettier" > <img src="https://avatars0.githubusercontent.com/u/25822731" width="60px" ></a>
<a href="http://brain.js.org/" title="brain.js" > <img src="https://avatars2.githubusercontent.com/u/23732838" width="60px" ></a>
<a href="https://github.com/aws" title="AWS SDK" > <img src="https://avatars.githubusercontent.com/u/2232217" width="60px" ></a>
<a href="http://www.fda.gov/" title="Food and Drug Administration " > <img src="https://avatars2.githubusercontent.com/u/6471964" width="60px" ></a>
<a href="http://www.magento.com/" title="Magento" > <img src="https://avatars2.githubusercontent.com/u/168457" width="60px" ></a>
<a href="https://github.com/SAP" title="SAP" > <img src="https://user-images.githubusercontent.com/7692328/204835214-d9d25b58-e3df-408d-87a3-c7d36b578ee4.png" width="60px" ></a>
<a href="https://github.com/postmanlabs" title="postman" > <img src="https://user-images.githubusercontent.com/7692328/204835529-e9e290ad-696a-49ad-9d34-08e955704715.png" width="60px" ></a>
<a href="https://github.com/react-native-community" title="React Native Community" > <img src="https://avatars.githubusercontent.com/u/20269980?v=4" width="60px" ></a>
<a href="https://github.com/googleapis" title="Google APIs" > <img src="https://avatars.githubusercontent.com/u/16785467?v=4" width="60px" ></a>
<a href="https://github.com/langchain-ai" title="Langchain AI" > <img src="https://avatars.githubusercontent.com/u/126733545?v=4" width="60px" ></a>
<a href="https://github.com/withastro" title="Astro websie builder" > <img src="https://avatars.githubusercontent.com/u/44914786?v=4" width="60px" ></a>
<a href="https://github.com/baidu" title="Baidu" > <img src="https://avatars.githubusercontent.com/u/13245940?v=4" width="60px" ></a>
[more](./USERs.md)

<small>The list of users are mostly published by Github or communicated directly. Feel free to contact if you find any information wrong.</small>

---

# More about this library

## How to use

To use as package dependency
`$ npm install fast-xml-parser` 
or 
`$ yarn add fast-xml-parser`

To use as system command
`$ npm install fast-xml-parser -g` 

To use it on a **webpage** include it from a [CDN](https://cdnjs.com/libraries/fast-xml-parser)

**Example**

As CLI command
```bash
$ fxparser some.xml
```

In a node js project
```js
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const parser = new XMLParser();
let jObj = parser.parse(XMLdata);

const builder = new XMLBuilder();
const xmlContent = builder.build(jObj);
```

In a HTML page
```html
<script src="path/to/fxp.min.js"></script>
:
<script>
  const parser = new fxparser.XMLParser();
  parser.parse(xmlContent);
</script>
```

Bundle size

| Bundle Name        | Size |
| ------------------ | ---- |
| fxbuilder.min.js   | 6.5K |
| fxparser.min.js    | 20K  |
| fxp.min.js         | 26K  |
| fxvalidator.min.js | 5.7K |

## Documents
<table>
  <tr><td>v3</td><td>v4 and v5</td><td>v6</td></tr>
  <tr>
    <td>
      <a href="./docs/v3/docs.md">documents</a>
    </td>
    <td><ol>
      <li><a href="./docs/v4,v5/1.GettingStarted.md">Getting Started</a></li>
      <li><a href="./docs/v4,v5/2.XMLparseOptions.md">XML Parser</a></li>
      <li><a href="./docs/v4,v5/3.XMLBuilder.md">XML Builder</a></li>
      <li><a href="./docs/v4,v5/4.XMLValidator.md">XML Validator</a></li>
      <li><a href="./docs/v4,v5/5.Entities.md">Entities</a></li>
      <li><a href="./docs/v4,v5/6.HTMLParsing.md">HTML Document Parsing</a></li>
      <li><a href="./docs/v4,v5/7.PITags.md">PI Tag processing</a></li>
      <li><a href="./docs/v4,v5/8.PathExpression.md">Path Expression</a></li>
    </ol></td>
    <td><ol>
      <li></li><a href="./docs/v6/1.GettingStarted.md">Getting Started</a></li>
      <li><a href="./docs/v6/2.Features.md">Features</a></li>
      <li><a href="./docs/v6/3.Options.md">Options</a></li>
      <li><a href="./docs/v6/4.OutputBuilders.md">Output Builders</a></li>
      <li><a href="./docs/v6/5.ValueParsers.md">Value Parsers</a></li>
    </ol></td>
  </tr>
</table>

**note**: 
- Version 6 is released with version 4 for experimental use. Based on its demand, it'll be developed and the features can be different in final release.
- Version 5 has the same functionalities as version 4.

## Performance
<small>negative means error</small>

### XML Parser

<img align="left" src="./docs/imgs/XMLParser_v4.png" width="45%" />
<img src="./docs/imgs/XMLParser_large_v4.png" width="47%" />

* Y-axis: requests per second
* X-axis: File size

### XML Builder

<img src="./docs/imgs/XMLBuilder_v4.png" width="50%" />
* Y-axis: requests per second

<!-- [![](static/img/ni_ads_ads.gif)](https://github.com/NaturalIntelligence/ads/) -->

---

## Usage Trend

[Usage Trend of fast-xml-parser](https://npm-compare.com/fast-xml-parser#timeRange=THREE_YEARS)
  
<a href="https://npm-compare.com/fast-xml-parser#timeRange=THREE_YEARS" target="_blank">
  <img src="https://npm-compare.com/img/npm-trend/THREE_YEARS/fast-xml-parser.png" width="50%" alt="NPM Usage Trend of fast-xml-parser" />
</a>

# Supporters
#### Contributors

This project exists thanks to [all](graphs/contributors) the people who contribute. [[Contribute](docs/CONTRIBUTING.md)].

<a href="graphs/contributors"><img src="https://opencollective.com/fast-xml-parser/contributors.svg?width=890&button=false" /></a>


#### Backers from Open collective

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/fast-xml-parser#backer)]

<a href="https://opencollective.com/fast-xml-parser#backers" target="_blank"><img src="https://opencollective.com/fast-xml-parser/backers.svg?width=890"></a>



# License
* MIT License

![Donate $5](static/img/donation_quote.png)

```
###  Path: `\node_modules\path-expression-matcher/README.md`

```md
# path-expression-matcher

Efficient path tracking and pattern matching for XML, JSON, YAML or any other parsers.

## 🎯 Purpose

`path-expression-matcher` provides two core classes for tracking and matching paths:

- **`Expression`**: Parses and stores pattern expressions (e.g., `"root.users.user[id]"`)
- **`Matcher`**: Tracks current path during parsing and matches against expressions

Compatible with [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) and similar tools.

## 📦 Installation

```bash
npm install path-expression-matcher
```

## 🚀 Quick Start

```javascript
import { Expression, Matcher } from 'path-expression-matcher';

// Create expression (parse once, reuse many times)
const expr = new Expression("root.users.user");

// Create matcher (tracks current path)
const matcher = new Matcher();

matcher.push("root");
matcher.push("users");
matcher.push("user", { id: "123" });

// Match current path against expression
if (matcher.matches(expr)) {
  console.log("Match found!");
  console.log("Current path:", matcher.toString()); // "root.users.user"
}

// Namespace support
const nsExpr = new Expression("soap::Envelope.soap::Body..ns::UserId");
matcher.push("Envelope", null, "soap");
matcher.push("Body", null, "soap");
matcher.push("UserId", null, "ns");
console.log(matcher.toString()); // "soap:Envelope.soap:Body.ns:UserId"
```

## 📖 Pattern Syntax

### Basic Paths

```javascript
"root.users.user"           // Exact path match
"*.users.user"              // Wildcard: any parent
"root.*.user"               // Wildcard: any middle
"root.users.*"              // Wildcard: any child
```

### Deep Wildcard

```javascript
"..user"                    // user anywhere in tree
"root..user"                // user anywhere under root
"..users..user"             // users somewhere, then user below it
```

### Attribute Matching

```javascript
"user[id]"                  // user with "id" attribute
"user[type=admin]"          // user with type="admin" (current node only)
"root[lang]..user"          // user under root that has "lang" attribute
```

### Position Selectors

```javascript
"user:first"                // First user (counter=0)
"user:nth(2)"               // Third user (counter=2, zero-based)
"user:odd"                  // Odd-numbered users (counter=1,3,5...)
"user:even"                 // Even-numbered users (counter=0,2,4...)
"root.users.user:first"     // First user under users
```

**Note:** Position selectors use the **counter** (occurrence count of the tag name), not the position (child index). For example, in `<root><a/><b/><a/></root>`, the second `<a/>` has position=2 but counter=1.

### Namespaces

```javascript
"ns::user"                  // user with namespace "ns"
"soap::Envelope"            // Envelope with namespace "soap"
"ns::user[id]"              // user with namespace "ns" and "id" attribute
"ns::user:first"            // First user with namespace "ns"
"*::user"                   // user with any namespace
"..ns::item"                // item with namespace "ns" anywhere in tree
"soap::Envelope.soap::Body" // Nested namespaced elements
"ns::first"                 // Tag named "first" with namespace "ns" (NO ambiguity!)
```

**Namespace syntax:**
- Use **double colon (::)** for namespace: `ns::tag`
- Use **single colon (:)** for position: `tag:first`
- Combined: `ns::tag:first` (namespace + tag + position)

**Namespace matching rules:**
- Pattern `ns::user` matches only nodes with namespace "ns" and tag "user"
- Pattern `user` (no namespace) matches nodes with tag "user" regardless of namespace
- Pattern `*::user` matches tag "user" with any namespace (wildcard namespace)
- Namespaces are tracked separately for counter/position (e.g., `ns1::item` and `ns2::item` have independent counters)

### Wildcard Differences

**Single wildcard (`*`)** - Matches exactly ONE level:
- `"*.fix1"` matches `root.fix1` (2 levels) ✅
- `"*.fix1"` does NOT match `root.another.fix1` (3 levels) ❌
- Path depth MUST equal pattern depth

**Deep wildcard (`..`)** - Matches ZERO or MORE levels:
- `"..fix1"` matches `root.fix1` ✅
- `"..fix1"` matches `root.another.fix1` ✅
- `"..fix1"` matches `a.b.c.d.fix1` ✅
- Works at any depth

### Combined Patterns

```javascript
"..user[id]:first"              // First user with id, anywhere
"root..user[type=admin]"        // Admin user under root
"ns::user[id]:first"            // First namespaced user with id
"soap::Envelope..ns::UserId"    // UserId with namespace ns under SOAP envelope
```

## 🔧 API Reference

### Expression

#### Constructor

```javascript
new Expression(pattern, options)
```

**Parameters:**
- `pattern` (string): Pattern to parse
- `options.separator` (string): Path separator (default: `'.'`)

**Example:**
```javascript
const expr1 = new Expression("root.users.user");
const expr2 = new Expression("root/users/user", { separator: '/' });
```

#### Methods

- `hasDeepWildcard()` → boolean
- `hasAttributeCondition()` → boolean
- `hasPositionSelector()` → boolean
- `toString()` → string

### Matcher

#### Constructor

```javascript
new Matcher(options)
```

**Parameters:**
- `options.separator` (string): Default path separator (default: `'.'`)

#### Path Tracking Methods

##### `push(tagName, attrValues, namespace)`

Add a tag to the current path. Position and counter are automatically calculated.

**Parameters:**
- `tagName` (string): Tag name
- `attrValues` (object, optional): Attribute key-value pairs (current node only)
- `namespace` (string, optional): Namespace for the tag

**Example:**
```javascript
matcher.push("user", { id: "123", type: "admin" });
matcher.push("item");  // No attributes
matcher.push("Envelope", null, "soap");  // With namespace
matcher.push("Body", { version: "1.1" }, "soap");  // With both
```

**Position vs Counter:**
- **Position**: The child index in the parent (0, 1, 2, 3...)
- **Counter**: How many times this tag name appeared at this level (0, 1, 2...)

Example:
```xml
<root>
  <a/>      <!-- position=0, counter=0 -->
  <b/>      <!-- position=1, counter=0 -->
  <a/>      <!-- position=2, counter=1 -->
</root>
```

##### `pop()`

Remove the last tag from the path.

```javascript
matcher.pop();
```

##### `updateCurrent(attrValues)`

Update current node's attributes (useful when attributes are parsed after push).

```javascript
matcher.push("user");  // Don't know values yet
// ... parse attributes ...
matcher.updateCurrent({ id: "123" });
```

##### `reset()`

Clear the entire path.

```javascript
matcher.reset();
```

#### Query Methods

##### `matches(expression)`

Check if current path matches an Expression.

```javascript
const expr = new Expression("root.users.user");
if (matcher.matches(expr)) {
  // Current path matches
}
```

##### `getCurrentTag()`

Get current tag name.

```javascript
const tag = matcher.getCurrentTag(); // "user"
```

##### `getCurrentNamespace()`

Get current namespace.

```javascript
const ns = matcher.getCurrentNamespace(); // "soap" or undefined
```

##### `getAttrValue(attrName)`

Get attribute value of current node.

```javascript
const id = matcher.getAttrValue("id"); // "123"
```

##### `hasAttr(attrName)`

Check if current node has an attribute.

```javascript
if (matcher.hasAttr("id")) {
  // Current node has "id" attribute
}
```

##### `getPosition()`

Get sibling position of current node (child index in parent).

```javascript
const position = matcher.getPosition(); // 0, 1, 2, ...
```

##### `getCounter()`

Get repeat counter of current node (occurrence count of this tag name).

```javascript
const counter = matcher.getCounter(); // 0, 1, 2, ...
```

##### `getIndex()` (deprecated)

Alias for `getPosition()`. Use `getPosition()` or `getCounter()` instead for clarity.

```javascript
const index = matcher.getIndex(); // Same as getPosition()
```

##### `getDepth()`

Get current path depth.

```javascript
const depth = matcher.getDepth(); // 3 for "root.users.user"
```

##### `toString(separator?, includeNamespace?)`

Get path as string.

**Parameters:**
- `separator` (string, optional): Path separator (uses default if not provided)
- `includeNamespace` (boolean, optional): Whether to include namespaces (default: true)

```javascript
const path = matcher.toString();           // "root.ns:user.item"
const path2 = matcher.toString('/');       // "root/ns:user/item"
const path3 = matcher.toString('.', false); // "root.user.item" (no namespaces)
```

##### `toArray()`

Get path as array.

```javascript
const arr = matcher.toArray(); // ["root", "users", "user"]
```

#### State Management

##### `snapshot()`

Create a snapshot of current state.

```javascript
const snapshot = matcher.snapshot();
```

##### `restore(snapshot)`

Restore from a snapshot.

```javascript
matcher.restore(snapshot);
```

#### Read-Only Access

##### `readOnly()`

Returns a **live, read-only proxy** of the matcher. All query and inspection methods work normally, but any attempt to call a state-mutating method (`push`, `pop`, `reset`, `updateCurrent`, `restore`) or to write/delete a property throws a `TypeError`.

This is the recommended way to share the matcher with external consumers — plugins, callbacks, event handlers — that only need to inspect the current path without being able to corrupt parser state.

```javascript
const ro = matcher.readOnly();
```

**What works on the read-only view:**

```javascript
ro.matches(expr)          // ✓ pattern matching
ro.getCurrentTag()        // ✓ current tag name
ro.getCurrentNamespace()  // ✓ current namespace
ro.getAttrValue("id")     // ✓ attribute value
ro.hasAttr("id")          // ✓ attribute presence check
ro.getPosition()          // ✓ sibling position
ro.getCounter()           // ✓ occurrence counter
ro.getDepth()             // ✓ path depth
ro.toString()             // ✓ path as string
ro.toArray()              // ✓ path as array
ro.snapshot()             // ✓ snapshot (can be used to restore the real matcher)
```

**What throws a `TypeError`:**

```javascript
ro.push("child", {})      // ✗ TypeError: Cannot call 'push' on a read-only Matcher
ro.pop()                  // ✗ TypeError: Cannot call 'pop' on a read-only Matcher
ro.reset()                // ✗ TypeError: Cannot call 'reset' on a read-only Matcher
ro.updateCurrent({})      // ✗ TypeError: Cannot call 'updateCurrent' on a read-only Matcher
ro.restore(snapshot)      // ✗ TypeError: Cannot call 'restore' on a read-only Matcher
ro.separator = '/'        // ✗ TypeError: Cannot set property on a read-only Matcher
```

**Important:** The read-only view is **live** — it always reflects the current state of the underlying matcher. If you need a frozen-in-time copy instead, use `snapshot()`.

```javascript
const matcher = new Matcher();
const ro = matcher.readOnly();

matcher.push("root");
ro.getDepth();    // 1 — immediately reflects the push
matcher.push("users");
ro.getDepth();    // 2 — still live
```

## 💡 Usage Examples

### Example 1: XML Parser with stopNodes

```javascript
import { XMLParser } from 'fast-xml-parser';
import { Expression, Matcher } from 'path-expression-matcher';

class MyParser {
  constructor() {
    this.matcher = new Matcher();
    
    // Pre-compile stop node patterns
    this.stopNodeExpressions = [
      new Expression("html.body.script"),
      new Expression("html.body.style"),
      new Expression("..svg"),
    ];
  }
  
  parseTag(tagName, attrs) {
    this.matcher.push(tagName, attrs);
    
    // Check if this is a stop node
    for (const expr of this.stopNodeExpressions) {
      if (this.matcher.matches(expr)) {
        // Don't parse children, read as raw text
        return this.readRawContent();
      }
    }
    
    // Continue normal parsing
    this.parseChildren();
    
    this.matcher.pop();
  }
}
```

### Example 2: Conditional Processing

```javascript
const matcher = new Matcher();
const userExpr = new Expression("..user[type=admin]");
const firstItemExpr = new Expression("..item:first");

function processTag(tagName, value, attrs) {
  matcher.push(tagName, attrs);
  
  if (matcher.matches(userExpr)) {
    value = enhanceAdminUser(value);
  }
  
  if (matcher.matches(firstItemExpr)) {
    value = markAsFirst(value);
  }
  
  matcher.pop();
  return value;
}
```

### Example 3: Path-based Filtering

```javascript
const patterns = [
  new Expression("data.users.user"),
  new Expression("data.posts.post"),
  new Expression("..comment[approved=true]"),
];

function shouldInclude(matcher) {
  return patterns.some(expr => matcher.matches(expr));
}
```

### Example 4: Custom Separator

```javascript
const matcher = new Matcher({ separator: '/' });
const expr = new Expression("root/config/database", { separator: '/' });

matcher.push("root");
matcher.push("config");
matcher.push("database");

console.log(matcher.toString()); // "root/config/database"
console.log(matcher.matches(expr)); // true
```

### Example 5: Attribute Checking

```javascript
const matcher = new Matcher();
matcher.push("root");
matcher.push("user", { id: "123", type: "admin", status: "active" });

// Check attribute existence (current node only)
console.log(matcher.hasAttr("id"));        // true
console.log(matcher.hasAttr("email"));     // false

// Get attribute value (current node only)
console.log(matcher.getAttrValue("type")); // "admin"

// Match by attribute
const expr1 = new Expression("user[id]");
console.log(matcher.matches(expr1));       // true

const expr2 = new Expression("user[type=admin]");
console.log(matcher.matches(expr2));       // true
```

### Example 6: Position vs Counter

```javascript
const matcher = new Matcher();
matcher.push("root");

// Mixed tags at same level
matcher.push("item");  // position=0, counter=0 (first item)
matcher.pop();

matcher.push("div");   // position=1, counter=0 (first div)
matcher.pop();

matcher.push("item");  // position=2, counter=1 (second item)

console.log(matcher.getPosition()); // 2 (third child overall)
console.log(matcher.getCounter());  // 1 (second "item" specifically)

// :first uses counter, not position
const expr = new Expression("root.item:first");
console.log(matcher.matches(expr)); // false (counter=1, not 0)
```

### Example 8: Passing a Read-Only Matcher to External Consumers

When passing the matcher into callbacks, plugins, or other code you don't control, use `readOnly()` to prevent accidental state corruption.

```javascript
import { Expression, Matcher } from 'path-expression-matcher';

const matcher = new Matcher();

const adminExpr = new Expression("..user[type=admin]");

function parseTag(tagName, attrs, onTag) {
  matcher.push(tagName, attrs);

  // Pass a read-only view — consumer can inspect but not mutate
  onTag(matcher.readOnly());

  matcher.pop();
}

// Safe consumer — can only read
function myPlugin(ro) {
  if (ro.matches(adminExpr)) {
    console.log("Admin at path:", ro.toString());
    console.log("Depth:", ro.getDepth());
    console.log("ID:", ro.getAttrValue("id"));
  }
}

// ro.push(...) or ro.reset() here would throw TypeError,
// so the parser's state is always safe.
parseTag("user", { id: "1", type: "admin" }, myPlugin);
```

**Combining with `snapshot()`:** A snapshot taken via the read-only view can still be used to restore the real matcher.

```javascript
const matcher = new Matcher();
matcher.push("root");
matcher.push("users");

const ro = matcher.readOnly();
const snap = ro.snapshot();       // ✓ snapshot works on read-only view

matcher.push("user");             // continue parsing...
matcher.restore(snap);            // restore to "root.users" using the snapshot
```

```javascript
const matcher = new Matcher();
const soapExpr = new Expression("soap::Envelope.soap::Body..ns::UserId");

// Parse SOAP document
matcher.push("Envelope", { xmlns: "..." }, "soap");
matcher.push("Body", null, "soap");
matcher.push("GetUserRequest", null, "ns");
matcher.push("UserId", null, "ns");

// Match namespaced pattern
if (matcher.matches(soapExpr)) {
  console.log("Found UserId in SOAP body");
  console.log(matcher.toString()); // "soap:Envelope.soap:Body.ns:GetUserRequest.ns:UserId"
}

// Namespace-specific counters
matcher.reset();
matcher.push("root");
matcher.push("item", null, "ns1");  // ns1::item counter=0
matcher.pop();
matcher.push("item", null, "ns2");  // ns2::item counter=0 (different namespace)
matcher.pop();
matcher.push("item", null, "ns1");  // ns1::item counter=1

const firstNs1Item = new Expression("root.ns1::item:first");
console.log(matcher.matches(firstNs1Item)); // false (counter=1)

const secondNs1Item = new Expression("root.ns1::item:nth(1)");
console.log(matcher.matches(secondNs1Item)); // true

// NO AMBIGUITY: Tags named after position keywords
matcher.reset();
matcher.push("root");
matcher.push("first", null, "ns");  // Tag named "first" with namespace

const expr = new Expression("root.ns::first");
console.log(matcher.matches(expr)); // true - matches namespace "ns", tag "first"
```

## 🏗️ Architecture

### Data Storage Strategy

**Ancestor nodes:** Store only tag name, position, and counter (minimal memory)
**Current node:** Store tag name, position, counter, and attribute values

This design minimizes memory usage:
- No attribute names stored (derived from values object when needed)
- Attribute values only for current node, not ancestors
- Attribute checking for ancestors is not supported (acceptable trade-off)
- For 1M nodes with 3 attributes each, saves ~50MB vs storing attribute names

### Matching Strategy

Matching is performed **bottom-to-top** (from current node toward root):
1. Start at current node
2. Match segments from pattern end to start
3. Attribute checking only works for current node (ancestors have no attribute data)
4. Position selectors use **counter** (occurrence count), not position (child index)

### Performance

- **Expression parsing:** One-time cost when Expression is created
- **Expression analysis:** Cached (hasDeepWildcard, hasAttributeCondition, hasPositionSelector)
- **Path tracking:** O(1) for push/pop operations
- **Pattern matching:** O(n*m) where n = path depth, m = pattern segments
- **Memory per ancestor node:** ~40-60 bytes (tag, position, counter only)
- **Memory per current node:** ~80-120 bytes (adds attribute values)

## 🎓 Design Patterns

### Pre-compile Patterns (Recommended)

```javascript
// ✅ GOOD: Parse once, reuse many times
const expr = new Expression("..user[id]");

for (let i = 0; i < 1000; i++) {
  if (matcher.matches(expr)) {
    // ...
  }
}
```

```javascript
// ❌ BAD: Parse on every iteration
for (let i = 0; i < 1000; i++) {
  if (matcher.matches(new Expression("..user[id]"))) {
    // ...
  }
}
```

### Batch Pattern Checking

```javascript
// For multiple patterns, check all at once
const patterns = [
  new Expression("..user"),
  new Expression("..post"),
  new Expression("..comment"),
];

function matchesAny(matcher, patterns) {
  return patterns.some(expr => matcher.matches(expr));
}
```

## 🔗 Integration with fast-xml-parser

**Basic integration:**

```javascript
import { XMLParser } from 'fast-xml-parser';
import { Expression, Matcher } from 'path-expression-matcher';

const parser = new XMLParser({
  // Custom options using path-expression-matcher
  stopNodes: ["script", "style"].map(tag => new Expression(`..${tag}`)),
  
  tagValueProcessor: (tagName, value, jPath, hasAttrs, isLeaf, matcher) => {
    // matcher is available in callbacks
    if (matcher.matches(new Expression("..user[type=admin]"))) {
      return enhanceValue(value);
    }
    return value;
  }
});
```

## 📄 License

MIT

## 🤝 Contributing

Issues and PRs welcome! This package is designed to be used by XML/JSON parsers like fast-xml-parser.
```
###  Path: `\node_modules\strnum/README.md`

```md
# strnum
Parse string into Number based on configuration

## Users

<a href="https://github.com/aws-amplify" target="_blank"><img src="https://avatars.githubusercontent.com/u/41077760?s=100&v=4"></a>
<a href="https://github.com/astrapay" target="_blank"><img src="https://avatars.githubusercontent.com/u/90901882?s=100&v=4"></a>
<a href="https://github.com/process-analytics" target="_blank"><img src="https://avatars.githubusercontent.com/u/60110287?s=100&v=4"></a>
<a href="https://github.com/NaturalIntelligence" target="_blank"><img src="https://avatars.githubusercontent.com/u/16322633?s=100&v=4"></a>
Many React Native projects and plugins

## Usage

```bash
npm install strnum
```
```js
const toNumber = require("strnum");

toNumber(undefined) // undefined
toNumber(null)) //null
toNumber("")) // ""
toNumber("string"); //"string")
toNumber("12,12"); //"12,12")
toNumber("12 12"); //"12 12")
toNumber("12-12"); //"12-12")
toNumber("12.12.12"); //"12.12.12")
toNumber("0x2f"); //47)
toNumber("-0x2f"); //-47)
toNumber("0x2f", { hex :  true}); //47)
toNumber("-0x2f", { hex :  true}); //-47)
toNumber("0x2f", { hex :  false}); //"0x2f")
toNumber("-0x2f", { hex :  false}); //"-0x2f")
toNumber("06"); //6)
toNumber("06", { leadingZeros :  true}); //6)
toNumber("06", { leadingZeros :  false}); //"06")

toNumber("006"); //6)
toNumber("006", { leadingZeros :  true}); //6)
toNumber("006", { leadingZeros :  false}); //"006")
toNumber("0.0"); //0)
toNumber("00.00"); //0)
toNumber("0.06"); //0.06)
toNumber("00.6"); //0.6)
toNumber(".006"); //0.006)
toNumber("6.0"); //6)
toNumber("06.0"); //6)

toNumber("0.0",  { leadingZeros :  false}); //0)
toNumber("00.00",  { leadingZeros :  false}); //"00.00")
toNumber("0.06",  { leadingZeros :  false}); //0.06)
toNumber("00.6",  { leadingZeros :  false}); //"00.6")
toNumber(".006", { leadingZeros :  false}); //0.006)
toNumber("6.0"  ,  { leadingZeros :  false}); //6)
toNumber("06.0"  ,  { leadingZeros :  false}); //"06.0")
toNumber("-06"); //-6)
toNumber("-06", { leadingZeros :  true}); //-6)
toNumber("-06", { leadingZeros :  false}); //"-06")

toNumber("-0.0"); //-0)
toNumber("-00.00"); //-0)
toNumber("-0.06"); //-0.06)
toNumber("-00.6"); //-0.6)
toNumber("-.006"); //-0.006)
toNumber("-6.0"); //-6)
toNumber("-06.0"); //-6)

toNumber("-0.0"   ,  { leadingZeros :  false}); //-0)
toNumber("-00.00",  { leadingZeros :  false}); //"-00.00")
toNumber("-0.06",  { leadingZeros :  false}); //-0.06)
toNumber("-00.6",  { leadingZeros :  false}); //"-00.6")
toNumber("-.006",  {leadingZeros :  false}); //-0.006)
toNumber("-6.0"  ,  { leadingZeros :  false}); //-6)
toNumber("-06.0"  ,  { leadingZeros :  false}); //"-06.0")
toNumber("420926189200190257681175017717")  ; //4.209261892001902e+29)
toNumber("000000000000000000000000017717"  ,  { leadingZeros :  false}); //"000000000000000000000000017717")
toNumber("000000000000000000000000017717"  ,  { leadingZeros :  true}); //17717)
toNumber("01.0e2"  ,  { leadingZeros :  false}); //"01.0e2")
toNumber("-01.0e2"  ,  { leadingZeros :  false}); //"-01.0e2")
toNumber("01.0e2") ; //100)
toNumber("-01.0e2") ; //-100)
toNumber("1.0e2") ; //100)

toNumber("-1.0e2") ; //-100)
toNumber("1.0e-2"); //0.01)

toNumber("+1212121212"); // 1212121212
toNumber("+1212121212", { skipLike: /\+[0-9]{10}/} )); //"+1212121212"
```

Supported Options
```js
hex: true,          //when hexadecimal string should be parsed
leadingZeros: true, //when number with leading zeros like 08 should be parsed. 0.0 is not impacted
eNotation: true,    //when number with eNotation or number parsed in eNotation should be considered
skipLike: /regex/   //when string should not be parsed when it matches the specified regular expression
infinity: "original", // "null", "infinity" (Infinity type), "string" ("Infinity" (the string literal))
```


# Try out our other work

WishIn - You need it if negative thoughts take over all the time <br>
<a href="https://play.google.com/store/apps/details?id=com.solothought.wishin"> <img src="https://solothought.com/products/assets/images/wishin/YouTubeThumbnail.png" width="500px"/> </a>

```
---
**File Statistics**
- **Size**: 79.86 KB
- **Lines**: 2151
File: `project-overview.md`
