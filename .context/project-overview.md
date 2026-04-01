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
    │   └── implementation-history/
    │       ├── README.md
    │   └── project-manifest/
    │       └── README.md
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
  
The Black Market Bazaar (BMB) is a content mod for Elemental: Reforged (originally Fallen Enchantress: Legendary Heroes). It adds 244 new items, 76 item-related spells, and 19 new clothes for custom sovereigns.
  
All mod XML files use the BMB_ prefix for InternalName values to avoid collisions with the base game and other mods.
  
---

## XML Fragment Workflow

The XML files in `Mods/src/Data/GameCore/` are **generated** from individual fragment files in the `/xml` directory. The `/xml` directory is the source of truth — do not edit the monolithic XML files directly.

- **To edit an item**: modify its `fragment.xml` in `xml/<subfolder>/<InternalName>/fragment.xml`.
- **To edit English text**: modify `xml/<subfolder>/<InternalName>/en.xml`.
- **To add an item**: create a new directory `xml/<subfolder>/<InternalName>/` with `fragment.xml` and `en.xml`.
- **To add a translation**: copy `en.xml` to `<lang>.xml` (e.g., `de.xml`) and translate the text.
- **To build**: run `npm run build` — merges fragments and translations into monolithic files, then deploys.

The generated monolithic files (GameCore XML and Localization XML) are listed in `.gitignore` and are not tracked in version control.

---
  
## File Inventory

> **Note:** These files are generated from `/xml` fragments during `npm run build`.
  
| File | Root Element | Content | Source Fragments |
|---|---|---|---|
| BMB_Items.xml | GameItemTypes | Accessories, consumables, and miscellaneous items | `xml/items/` |
| BMB_Weapons.xml | GameItemTypes | Weapon definitions (axes, swords, staves, bows, wands) | `xml/weapons/` |
| BMB_Armor.xml | GameItemTypes | Armor pieces (helmets, shields, body armor) | `xml/armor/` |
| BMB_Clothes.xml | GameItemTypes | Clothing items (robes, cloaks, boots) - includes 19 sovereign-equippable outfits | `xml/clothes/` |
| BMB_Spells.xml | Spells | 76 item-triggered spell definitions | `xml/spells/` |
| BMB_Abilities.xml | AbilityBonuses | Custom hero/unit ability definitions | `xml/abilities/` |
| BMB_Effects.xml | EffectBlueprints | Visual effect definitions for BMB items | `xml/effects/` |
| BMB_Units.xml | UnitTypes | Custom unit definitions (e.g., summoned creatures) | `xml/units/` |
| BMB_UnitStats.xml | PlayerAbilityTypes | Custom unit stat type definitions | `xml/unit-stats/` |
| BMB_CoreItemsModifications.xml | GameItemTypes | Modifications/overrides to base game items | `xml/core-items-mods/` |
  
## Supporting Files
  
| File | Location | Purpose |
|---|---|---|
| BMB.str | Mods/src/Data/ | String table for UI labels (weapon type names, etc.) |
| BMB_Strings_Items.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for items |
| BMB_Strings_Weapons.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for weapons |
| BMB_Strings_Armor.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for armor |
| BMB_Strings_Clothes.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for clothes |
| BMB_Strings_Spells.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for spells |
| BMB_Strings_Abilities.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for abilities |
| BMB_Strings_Units.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for units |
| BMB_Strings_UnitStats.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for unit stats |
| *.png | Mods/src/Gfx/Black Market Bazaar Icons/ | Item icons (227 PNG files) |
| *.dds | Mods/src/Gfx/Black Market Bazaar Icons/ | Texture files for 3D models (16 DDS files) |

> **Note:** Localization XML files are generated from per-entry `en.xml` (and other `<lang>.xml`) files in `xml/<category>/<Name>/` during `npm run build`. They are git-ignored. To add a translation, add `<lang>.xml` files to the entry directories and rebuild.
  
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

Merges XML fragments and deploys `Mods/src/` to the game's Mods folder in one step.

### Run directly

```
npm run build
```

Or equivalently:

```
node scripts/build.mjs
```

What it does:

1. **Merges XML fragments** from `xml/` into monolithic XML files in `Mods/src/Data/GameCore/` (skipped if `xml/` doesn't exist).
2. **Merges translations** from per-entry `en.xml` (and other language files) into `Mods/src/Data/Localization/<Language>/` (skipped if no per-entry directories exist).
3. Reads `build.config.json` and validates `deployPath` and `modID`.
4. Confirms `Mods/src/` exists in the project.
5. Deletes `<deployPath>/<modID>/` if it already exists (clean slate).
6. Copies `Mods/src/` to `<deployPath>/<modID>/`.
7. Prints a summary: `Build complete. N file(s) deployed to: <path>`.

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
| `d` | Migrate fragments to translation directories |
| `e` | Verify translation key integrity (`npm run verify-keys`) |
| `q` | Quit |

Keys are assigned alphabetically in declaration order. Adding a new item appends the next letter automatically. The menu supports up to 26 items (a–z).

---

## XML Fragment Workflow

The mod's XML data is authored as individual fragment files in the `xml/` directory, one per game entity. During build, these fragments are merged into the monolithic XML files that the game engine expects.

### Fragment structure

Each translatable category uses **per-entry directories**:

```
xml/
├── items/
│   ├── AmuletOfContamination/
│   │   ├── fragment.xml    ← game data (with TXT_BMB_* keys)
│   │   └── en.xml          ← English translation
│   └── BirdOfCelerity/
│       ├── fragment.xml
│       └── en.xml
├── weapons/                (same per-entry structure)
├── armor/                  (same per-entry structure)
├── clothes/                (same per-entry structure)
├── spells/                 (same per-entry structure)
├── abilities/              (same per-entry structure)
├── units/                  (same per-entry structure)
├── unit-stats/             (same per-entry structure)
├── effects/                ← flat files (no translatable text)
└── core-items-mods/        ← flat files (base game overrides)
```

Each `fragment.xml` is a complete XML document with a `<Fragment>` wrapper and `TXT_BMB_*` keys for all player-facing text:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Fragment>
    <GameItemType InternalName="BirdOfCelerity">
        <DisplayName>TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BIRDOFCELERITY_DESCRIPTION</Description>
        <!-- ... -->
    </GameItemType>
</Fragment>
```

The co-located `en.xml` holds the English text in a simple `<Translation>` format:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Bird of Celerity</DisplayName>
    <Description>This beautiful statuette allows its owner to distort the space and time continuum...</Description>
    <Provides index="1">Allows the wielder to cast Mass Haste</Provides>
</Translation>
```

The `xml/` directory is the **source of truth**. The monolithic XML files in `Mods/src/Data/GameCore/` and the localization files in `Mods/src/Data/Localization/` are generated and git-ignored.

### Adding a new item

1. Create a new directory `xml/items/BMB_NewItem/`.
2. Add `fragment.xml` using the `<Fragment>` wrapper with `TXT_BMB_*` keys for all player-facing text.
3. Add `en.xml` with the English translations in `<Translation>` format.
4. Run `npm run build` — the merge step assembles all fragments and translations, then deploys.

### Adding a translation

To add a new language translation for an existing entry:

1. Copy `xml/<category>/<Name>/en.xml` to `xml/<category>/<Name>/<lang>.xml` (e.g., `de.xml` for German).
2. Translate the text content of each element.
3. Run `npm run build` — the translation merge step generates `Mods/src/Data/Localization/<Language>/` files automatically.

Supported language codes: `en`, `de`, `fr`, `es`, `zh`, `ja`, `ko`, `ru`, `it`, `pl`, `pt`.

---

## Repository Layout

| Path | Purpose |
|---|---|
| ``xml/`` | XML fragment source files (per-entry directories) — **source of truth** |
| ``scripts/build.mjs`` | Build/deploy script — merges fragments + translations, then copies mod to game folder |
| ``scripts/migrate-to-dirs.mjs`` | One-time migration script (flat files → per-entry directories + English translation extraction) |
| ``scripts/split-xml.mjs`` | One-time migration script (splits monolithic XML into fragments) |
| ``scripts/lib/merge-xml.mjs`` | XML fragment merge module (used by build.mjs) |
| ``scripts/lib/merge-translations.mjs`` | Translation merge module (used by build.mjs) |
| ``scripts/menu.mjs`` | Interactive terminal menu |
| ``scripts/prepare.mjs`` | Config-reminder hook (runs after `npm install`) |
| ``scripts/lib/output.mjs`` | Shared console output helpers (colours, symbols) |
| ``Mods/`` | Mod source files (GameCore XML and Localization files are generated from ``xml/``) |
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
###  Path: `\docs\agents\project-manifest/README.md`

```md
# Black Market Bazaar — Project Manifest

> **Canonical source of truth for AI agents and contributors.**
> Read these documents before working on any part of the codebase.

---

## Section Index

| Section | File | Contents |
|---|---|---|
| **Tech Stack & Patterns** | [`tech-stack.md`](tech-stack.md) | Runtime, game target, frameworks, build tools, package manager, architecture overview |
| **File Tree** | [`file-tree.md`](file-tree.md) | Annotated project directory structure with descriptions of non-obvious folders |
| **Game Data Reference** | [`game-data-reference.md`](game-data-reference.md) | Base game XML schemas, GameCore file inventory, entry element structures, Reforged additions |
| **Localization** | [`localization.md`](localization.md) | Full localization system: base game format, BMB per-entry translation files, TXT_BMB_* key conventions, multi-line text, `.str` files |
| **XML Patterns** | [`xml-patterns.md`](xml-patterns.md) | Modding XML patterns: GameModifier, prerequisites, rarity, art definitions, unit stats reference |
| **Build Pipeline** | [`build-pipeline.md`](build-pipeline.md) | Build script architecture, data flows (fragment → merge → translate → verify → deploy), module API surface |
| **Constraints & Conventions** | [`constraints.md`](constraints.md) | All mandatory rules: naming conventions, encoding, Reforged breaking changes, deprecations, failure protocol |

---

## How to Use This Manifest

1. **New to the project?** Read [`tech-stack.md`](tech-stack.md) and [`file-tree.md`](file-tree.md) first for orientation.
2. **Adding new content?** Read [`constraints.md`](constraints.md) for naming rules and mandatory tags, then [`xml-patterns.md`](xml-patterns.md) for GameModifier and art definition patterns.
3. **Working on localization?** Read [`localization.md`](localization.md) for the full translation workflow.
4. **Modifying build scripts?** Read [`build-pipeline.md`](build-pipeline.md) for the pipeline architecture and module API.
5. **Researching base game schemas?** Read [`game-data-reference.md`](game-data-reference.md) for GameCore file inventory and element schemas.

---

## Consolidation Notes

This manifest consolidates content previously spread across:

- `docs/game-data/README.md` → [`game-data-reference.md`](game-data-reference.md)
- `docs/game-data/localization.md` → [`localization.md`](localization.md)
- `docs/modding-guide/README.md` → [`constraints.md`](constraints.md), [`localization.md`](localization.md), [`xml-patterns.md`](xml-patterns.md)
- `AGENTS.md` (§ Failure Protocol, § Key Conventions) → [`constraints.md`](constraints.md)
- `Mods/README.md` → [`file-tree.md`](file-tree.md), [`tech-stack.md`](tech-stack.md)

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
- **Size**: 59.48 KB
- **Lines**: 1604
File: `project-overview.md`
