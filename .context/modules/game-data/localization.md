# Localization System Reference
_SOURCE: Base game localization system, multi-line text, Translate directives_
# Base game localization system, multi-line text, Translate directives
```
// Structure of documents
└── docs/
    └── game-data/
        └── localization.md

```
###  Path: `\docs\game-data/localization.md`

```md
# Elemental: Reforged — Localization System Reference

> **Base game localization path:** `C:\Steam\steamapps\common\Elemental Reforged\data\Localization\`
> **Configuration file:** `C:\Steam\steamapps\common\Elemental Reforged\data\LocalizationDefs.xml`

This document provides a detailed reference for the base game's XML-based localization system, covering file structure, text formatting conventions, multi-line text handling, and the `<Translate>` directive mechanism.

---

## Overview

The game separates display text from game data. GameCore XML files contain `TXT_*` translation keys; the actual human-readable text lives in localization XML files under `data/Localization/<Language>/`. The game engine resolves keys at runtime by matching them against the active language's localization files.

Mods can provide their own localization files in `Data/Localization/<Language>/` within the mod directory. The engine merges mod localization files with the base game's.

---

## Localization File Format

All localization files follow the same XML structure:

```xml
<?xml version='1.0' encoding='utf-8'?>
<GameText>
  <Locale ID="en_US">
    <Line Key="TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME" Note="DisplayName for AmuletOfFlames">
      <Text>Amulet of Flames</Text>
    </Line>
    <Line Key="TXT_ITEMS_AMULETOFFLAMES_DESCRIPTION" Note="Description for AmuletOfFlames">
      <Text>When it is worn even the wearer's caress burns those he or she touches.</Text>
    </Line>
  </Locale>
</GameText>
```

### Element Reference

| Element | Purpose |
|---|---|
| `<GameText>` | Root element |
| `<Locale ID="...">` | Language container; `ID` is the locale code (e.g. `en_US`) |
| `<Line Key="..." Note="...">` | Single translation entry; `Key` is the `TXT_*` reference, `Note` is a human-readable comment |
| `<Text>` | The actual display text content |

### Encoding

All base game localization files use **UTF-8 encoding** (with BOM in the base game files, though BOM is not required). Line endings are **CRLF** (`\r\n`) throughout.

---

## The `<Translate>` Directive

Each GameCore XML file declares which element fields should be treated as translation keys via a `<Translate>` element near the top of the file. The game engine uses this to know which fields contain `TXT_*` keys that need localization lookup.

### Known `<Translate>` directives by file

| GameCore File | `<Translate>` Value |
|---|---|
| `CoreItems.xml` | `DisplayName,Description` |
| `CoreWeapons.xml` | `DisplayName,Description` |
| `CoreArmor.xml` | `DisplayName,Description` |
| `CoreClothes.xml` | `DisplayName,Description` |
| `CoreSpells.xml` | `DisplayName,Description` |
| `CoreAbilities.xml` | `DisplayName,Description` |
| `CoreEffects.xml` | `DisplayName` |
| `CoreUnitStats.xml` | `DisplayName,DisplayNameShort,Description` |
| `CoreQuests.xml` | `DisplayName,Description` |
| `CoreTechs.xml` | `DisplayName,Description` |
| `CoreRaceConfigs.xml` | `DisplayName, ShortName, Capitol, Description, WorkerName` |
| `CoreGameEvents.xml` | `DisplayName,Description,SuccessText,FailureText` |
| `CoreRandomEvents.xml` | `DisplayName,Description,SuccessText,FailureText` |
| `CoreImprovements.xml` | `DisplayName` |
| `CoreResources.xml` | `DispName,Description` |
| `CoreFlavorText.xml` | `Text` |
| `ReforgedItems.xml` | `DisplayName,Description` |
| `ReforgedSpells.xml` | `DisplayName,Description` |

> **Note:** Unit files (`CoreUnits.xml`) do **not** have a `<Translate>` directive. Unit `DisplayName` and `Backstory` fields use `TXT_*` keys by convention, but the translation lookup appears to be handled differently (possibly hardcoded in the engine).

---

## Translation Key Naming Convention

### Base game pattern

```
TXT_<CATEGORY>_<INTERNALNAME>_<FIELD>
```

Examples:
- `TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME`
- `TXT_ITEMS_AMULETOFFLAMES_DESCRIPTION`
- `TXT_AIUNITS_UNIT_ALTARIAN_AI16_BACKSTORY`

### BMB mod pattern

```
TXT_BMB_<CATEGORY>_<INTERNALNAME>_<FIELD>
```

The `BMB_` prefix prevents key collisions with the base game. See [`docs/modding-guide/README.md`](../modding-guide/README.md) for the full BMB key naming convention.

---

## Multi-Line Text in `<Text>` Elements

### The base game uses literal newlines

The base game embeds actual line breaks (CRLF) directly inside `<Text>` element content. There are **no escape sequences** — no `\n`, `&#10;`, `&#13;`, `[br]`, or any other special markup. The game engine renders the newlines as-is.

### Prevalence

Multi-line `<Text>` elements are widespread across the base game's English localization:

| Localization File | Multi-line `<Text>` Count |
|---|---|
| `Strings_CoreUnits.xml` | 24 |
| `Strings_Units.xml` | 176 |
| `Strings_Campaign_FE.xml` | 165 |
| `Strings_Reforged.xml` | 111 |
| `Strings_Quests.xml` | 108 |
| `Strings_Core.xml` | 56 |
| `Strings_Tutorials.xml` | 47 |
| `Strings_Campaign_LH.xml` | 34 |
| `Strings_RandomEvents.xml` | 32 |
| `Strings_WoMScenario.xml` | 26 |
| `Strings_DLC.xml` | 19 |
| `Strings_ResearchEconomyTutorial.xml` | 14 |
| `Strings_HistoricalFigures.xml` | 10 |
| `Strings_ItemsTutorial.xml` | 10 |
| `Strings_CityTutorial.xml` | 9 |
| `Strings_Items.xml` | 8 |
| `Strings_Provides.xml` | 8 |
| `Strings_Conversations.xml` | — |
| **Total** | **~856** |

### Text formatting patterns

The base game uses three distinct multi-line patterns:

#### 1. Poetry / verse formatting

Lines separated by newlines with leading whitespace for indentation:

```xml
<Text>From lava flow and fallen star
    To burning heart of the Quendar
    All light, all fear,
    all pain holds dear
    Is held within the magistar</Text>
```

Found in: item descriptions (ring poems), unit lore.

#### 2. Paragraph breaks with blank lines

Paragraphs separated by double newlines (blank line between paragraphs):

```xml
<Text>Thousands of years ago, a prophecy was made. A prophecy that foresaw
the rise of an Empire of Sorcery...

Your mission: find the lost Temple at Odenvell, and the one who lies
sleeping within.</Text>
```

Found in: campaign text, quest descriptions, Reforged content.

#### 3. Paragraph breaks with indentation

New paragraphs start with leading whitespace (typically 4 spaces) after a newline:

```xml
<Text>Most scholars believe that demons were created by the cataclysm...
    But evidence of demons stretches well back before the cataclysm...
    The creatures name is Ascian...</Text>
```

Found in: unit backstories, long prose descriptions.

### Line ending details

- All base game localization files use **CRLF** (`\r\n`) line endings exclusively.
- Multi-line `<Text>` content uses the same CRLF line endings as the rest of the file.
- There are zero instances of LF-only (`\n`) line endings in the base game's English localization files.

### Implications for modding

Since the game engine expects literal newlines in `<Text>` elements and all base game files use CRLF:

1. **Literal newlines in XML text content are the correct approach** — this is exactly how the base game does it.
2. **CRLF line endings should be used** in generated localization files to match the base game convention.
3. **No escape sequences are needed** — the game engine does not interpret `\n`, `&#10;`, or any other escape mechanism for line breaks.

---

## Localization Folder Structure

```
data/Localization/
├── English/        ← Locale ID: en_US
├── German/         ← Locale ID: de_DE
├── French/         ← Locale ID: fr_FR
├── Spanish/        ← Locale ID: es_ES
├── Chinese/        ← Locale ID: zh_CN
├── Japanese/       ← Locale ID: ja_JP
├── Korean/         ← Locale ID: ko_KR
└── Russian/        ← Locale ID: ru_RU
```

### Locale ID Mapping

| Language Folder | Locale ID | Display Name | UI Scale Factor |
|---|---|---|---|
| `English` | `en_US` | English | 1.0 |
| `German` | `de_DE` | Deutsch | 1.2 |
| `French` | `fr_FR` | Français | 1.0 |
| `Spanish` | `es_ES` | Español | 1.2 |
| `Chinese` | `zh_CN` | Chinese | 1.0 |
| `Japanese` | `ja_JP` | Japanese | 1.1 |
| `Korean` | `ko_KR` | Korean | 1.0 |
| `Russian` | `ru_RU` | Русский | 1.3 |

The UI scale factors are defined in [`LocalizationDefs.xml`](file:///C:/Steam/steamapps/common/Elemental%20Reforged/data/LocalizationDefs.xml) and scale UI containers (buttons, panels) to accommodate text length differences between languages. These multiply with the user's `g_UIScaleFactor` accessibility setting.

### English Localization File Inventory

| File | Size | Purpose |
|---|---|---|
| `Strings.xml` | 640 KB | General game strings |
| `Strings_Abilities.xml` | 232 KB | Ability names and descriptions |
| `Strings_AI.xml` | 5 KB | AI-related strings |
| `Strings_AIPlayers.xml` | 8 KB | AI player names |
| `Strings_Armor.xml` | 51 KB | Armor names and descriptions |
| `Strings_Campaign_FE.xml` | 537 KB | Fallen Enchantress campaign text |
| `Strings_Campaign_LH.xml` | 89 KB | Legendary Heroes campaign text |
| `Strings_Campaign_WoM.xml` | 31 KB | War of Magic campaign text |
| `Strings_CityTutorial.xml` | 19 KB | City tutorial text |
| `Strings_Clothes.xml` | 90 KB | Clothing names and descriptions |
| `Strings_Conversations.xml` | 108 KB | NPC conversation text |
| `Strings_Core.xml` | 258 KB | Core game strings |
| `Strings_CoreUnits.xml` | 497 KB | Core unit names, descriptions, backstories |
| `Strings_DLC.xml` | 41 KB | DLC content strings |
| `Strings_Dynasties.xml` | 21 KB | Dynasty-related strings |
| `Strings_Factions.xml` | 8 KB | Faction names |
| `Strings_Goodies.xml` | 132 KB | Goodie hut strings |
| `Strings_HairReforged.xml` | 7 KB | Reforged hair style names |
| `Strings_HistoricalFigures.xml` | 10 KB | Historical figure descriptions |
| `Strings_Improvements.xml` | 100 KB | Improvement names and descriptions |
| `Strings_Items.xml` | 69 KB | Item names and descriptions |
| `Strings_ItemsTutorial.xml` | 22 KB | Items tutorial text |
| `Strings_Misc.xml` | 2 KB | Miscellaneous strings |
| `Strings_NamePools.xml` | 34 KB | Name generation pools |
| `Strings_NewQuests.xml` | 3 KB | New quest strings |
| `Strings_Props.xml` | 11 KB | Prop names |
| `Strings_Provides.xml` | 166 KB | "Provides" tooltip strings |
| `Strings_Quests.xml` | 107 KB | Quest text |
| `Strings_Quests_v2.xml` | 10 KB | Updated quest text |
| `Strings_RandomEvents.xml` | 39 KB | Random event text |
| `Strings_Recipes.xml` | 2 KB | Recipe strings |
| `Strings_Reforged.xml` | 701 KB | Reforged edition strings |
| `Strings_Reforged2.xml` | 1 KB | Additional Reforged strings |
| `Strings_Reforged_Quests.xml` | 177 KB | Reforged quest text |
| `Strings_Reforged_Spells.xml` | 129 KB | Reforged spell strings |
| `Strings_ResearchEconomyTutorial.xml` | 28 KB | Research/economy tutorial |
| `Strings_Resources.xml` | 32 KB | Resource names |
| `Strings_Spells.xml` | 161 KB | Spell names and descriptions |
| `Strings_Techs_Amarian.xml` | 58 KB | Amarian tech tree strings |
| `Strings_TerrainTutorial.xml` | 11 KB | Terrain tutorial text |
| `Strings_TerrainTypes.xml` | 3 KB | Terrain type names |
| `Strings_Treaties.xml` | 4 KB | Treaty strings |
| `Strings_Tutorials.xml` | 54 KB | General tutorial text |
| `Strings_Tutorial_Data.xml` | 6 KB | Tutorial data strings |
| `Strings_Units.xml` | 312 KB | Unit names, descriptions, backstories |
| `Strings_UnitSoundPacks.xml` | 8 KB | Unit sound pack names |
| `Strings_Weapons.xml` | 69 KB | Weapon names and descriptions |
| `Strings_WoMScenario.xml` | 154 KB | War of Magic scenario text |
| `CoreMarriageCandidates_Text.xml` | 116 KB | Marriage candidate descriptions |

**Total:** 52 files, ~5.4 MB of English localization data.

---

## `.str` File Format (Legacy)

The `.str` file format is a separate, older system used for UI table aliases (e.g., weapon upgrade type labels displayed in column headers). It coexists with the XML localization system and serves a different purpose.

BMB uses `BMB.str` for weapon type category names only. See [`Mods/src/Data/BMB.str`](../../Mods/src/Data/BMB.str).

```