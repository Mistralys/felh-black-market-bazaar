# Localization

This document covers the full localization system — both the base game's format and BMB's per-entry translation workflow.

---

## Overview

The game separates display text from game data. GameCore XML files contain `TXT_*` translation keys; the actual human-readable text lives in localization XML files under `data/Localization/<Language>/`. The game engine resolves keys at runtime by matching them against the active language's localization files.

Mods provide their own localization files in `Data/Localization/<Language>/` within the mod directory. The engine merges mod localization files with the base game's.

---

## Base Game Localization Format

### Localization file structure

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

### Element reference

| Element | Purpose |
|---|---|
| `<GameText>` | Root element |
| `<Locale ID="...">` | Language container; `ID` is the locale code (e.g. `en_US`) |
| `<Line Key="..." Note="...">` | Translation entry; `Key` is the `TXT_*` reference, `Note` is a human-readable comment |
| `<Text>` | The actual display text content |

### The `<Translate>` directive

Each GameCore XML file declares which element fields should be treated as translation keys via a `<Translate>` element near the top of the file.

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

> Unit files (`CoreUnits.xml`) do **not** have a `<Translate>` directive. Unit `DisplayName` and `Backstory` fields use `TXT_*` keys by convention, but the translation lookup appears to be handled differently (possibly hardcoded in the engine).

---

## Localization Folder Structure & Locale IDs

```
data/Localization/
├── English/        ← en_US
├── German/         ← de_DE
├── French/         ← fr_FR
├── Spanish/        ← es_ES
├── Chinese/        ← zh_CN
├── Japanese/       ← ja_JP
├── Korean/         ← ko_KR
└── Russian/        ← ru_RU
```

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

UI scale factors (from `LocalizationDefs.xml`) scale UI containers to accommodate text length differences. These multiply with the user's `g_UIScaleFactor` accessibility setting.

---

## Multi-Line Text in `<Text>` Elements

The base game uses **literal newlines** (CRLF) inside `<Text>` content. There are no escape sequences — no `\n`, `&#10;`, `&#13;`, `[br]`, or other special markup.

### Text formatting patterns

**1. Poetry / verse:**
```xml
<Text>From lava flow and fallen star
    To burning heart of the Quendar
    All light, all fear,
    all pain holds dear
    Is held within the magistar</Text>
```

**2. Paragraph breaks (blank lines):**
```xml
<Text>Thousands of years ago, a prophecy was made...

Your mission: find the lost Temple at Odenvell...</Text>
```

**3. Paragraph breaks (indented):**
```xml
<Text>Most scholars believe that demons were created by the cataclysm...
    But evidence of demons stretches well back before the cataclysm...</Text>
```

### Line ending details

- All base game localization files use **CRLF** (`\r\n`) line endings exclusively.
- Multi-line `<Text>` content uses the same CRLF endings.
- Generated BMB localization files match this convention.

---

## BMB Translation System

### Per-entry directory structure

Each translatable entry lives in its own directory:

```
xml/<category>/<InternalName>/
├── fragment.xml    ← game data with TXT_BMB_* keys
├── en.xml          ← English translation
└── <lang>.xml      ← additional translations (optional)
```

Categories using per-entry directories: `items/`, `weapons/`, `armor/`, `clothes/`, `spells/`, `abilities/`, `units/`, `unit-stats/`.

Categories as flat files (no translatable text): `effects/`, `core-items-mods/`.

### Translation file format

```xml
<?xml version="1.0" encoding="utf-8"?>
<Translation>
    <DisplayName>Bird of Celerity</DisplayName>
    <Description>This beautiful statuette allows its owner to distort the space and time continuum...</Description>
    <Provides index="1">Allows the wielder to cast Mass Haste</Provides>
</Translation>
```

| Element | Usage |
|---|---|
| `<DisplayName>` | Item/unit/ability display name |
| `<Description>` | Flavor text / description |
| `<Provides index="N">` | Nth `<Provides>` text inside `<GameModifier>` blocks |
| `<Backstory>` | Unit backstory text (units only) |
| `<ModifierDisplayName index="N">` | Nth `<GameModifier><DisplayName>` (spells only) |

For abilities, the `<Translation>` uses the `AbilityBonusOption` InternalName as the key base (not the directory name).

### TXT_BMB_* key naming convention

```
TXT_BMB_{CATEGORY}_{INTERNALNAME}_{FIELD}
```

| Component | Values |
|---|---|
| `{CATEGORY}` | `ITEMS`, `WEAPONS`, `ARMOR`, `CLOTHES`, `SPELLS`, `ABILITIES`, `UNITS`, `UNITSTATS` |
| `{INTERNALNAME}` | The `InternalName` attribute, uppercased |
| `{FIELD}` | `DISPLAYNAME`, `DESCRIPTION`, `PROVIDES_1`, `PROVIDES_2`, `BACKSTORY`, `MODIFIER_1_DISPLAYNAME`, etc. |

Examples:
```
TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME
TXT_BMB_ITEMS_BIRDOFCELERITY_DESCRIPTION
TXT_BMB_ITEMS_BIRDOFCELERITY_PROVIDES_1
TXT_BMB_WEAPONS_AXE_FREEZING_DISPLAYNAME
TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_1_DISPLAYNAME
TXT_BMB_UNITS_BMB_UNIT_ALTARIAN_MAGE_LIGHTNING_AI_BACKSTORY
TXT_BMB_ABILITIES_BMB_ERUDITE_DISPLAYNAME
```

### Supported language codes

| File suffix | Game folder | Locale ID |
|---|---|---|
| `en.xml` | `English` | `en_US` |
| `de.xml` | `German` | `de_DE` |
| `fr.xml` | `French` | `fr_FR` |
| `es.xml` | `Spanish` | `es_ES` |
| `zh.xml` | `Chinese` | `zh_CN` |
| `ja.xml` | `Japanese` | `ja_JP` |
| `ko.xml` | `Korean` | `ko_KR` |
| `ru.xml` | `Russian` | `ru_RU` |
| `it.xml` | `Italian` | `it_IT` |
| `pl.xml` | `Polish` | `pl_PL` |
| `pt.xml` | `Portuguese` | `pt_BR` |

The canonical source for this mapping is `scripts/lib/lang-config.mjs`.

### Adding a new translatable entry

1. Create the entry directory: `xml/<category>/<InternalName>/`
2. Create `fragment.xml` with `TXT_BMB_*` keys for all player-facing text:
   ```xml
   <DisplayName>TXT_BMB_ITEMS_MYNEWITEM_DISPLAYNAME</DisplayName>
   <Description>TXT_BMB_ITEMS_MYNEWITEM_DESCRIPTION</Description>
   ```
3. Create `en.xml` with the English text:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <Translation>
       <DisplayName>My New Item</DisplayName>
       <Description>A wonderful new item.</Description>
   </Translation>
   ```
4. Run `npm run build` — the pipeline generates localization XML files automatically.

### Adding a new language translation

1. Copy `xml/<category>/<InternalName>/en.xml` to `<lang>.xml` (e.g., `de.xml`).
2. Translate the text content (keep XML structure identical).
3. Run `npm run build` — generates `Mods/src/Data/Localization/<Language>/BMB_Strings_<Category>.xml`.

---

## `.str` File Format (Legacy)

The `.str` file format is a separate, older system used exclusively for UI table aliases (weapon upgrade type labels: `LightningStaff`, `PoisonStaff`, `Wand`). It coexists with the XML localization system. BMB uses `BMB.str` for weapon type names only.

Do not add item names, descriptions, or provides text to `BMB.str`.

---

## What Is NOT Localized

The following fields are engine identifiers or asset references and must never be replaced with `TXT_BMB_*` keys:

- `InternalName` attributes
- `StrVal` values (references to game stat/ability InternalNames)
- `AIPrefType`, `AIPriority` (AI configuration)
- `IconFile`, `ModelFile`, `Texture_*` (asset file references)
- `SFX`, `AttackSFX`, `EquipSFX` (sound references)
- `BMB.str` entries (separate system)
- `effects/` fragments (no player-facing text)
- `core-items-mods/` fragments (base game overrides with their own localization)
- `abilities/_meta.xml` (metadata, not a content entry)

---

## Base Game English Localization Inventory

52 files, ~5.4 MB total. Key files:

| File | Size | Purpose |
|---|---|---|
| `Strings_Reforged.xml` | 701 KB | Reforged edition strings |
| `Strings.xml` | 640 KB | General game strings |
| `Strings_Campaign_FE.xml` | 537 KB | Fallen Enchantress campaign |
| `Strings_CoreUnits.xml` | 497 KB | Core unit names/descriptions/backstories |
| `Strings_Units.xml` | 312 KB | Unit strings |
| `Strings_Abilities.xml` | 232 KB | Ability names and descriptions |
| `Strings_Reforged_Quests.xml` | 177 KB | Reforged quest text |
| `Strings_Provides.xml` | 166 KB | Tooltip "Provides" strings |
| `Strings_Spells.xml` | 161 KB | Spell names and descriptions |
| `Strings_Core.xml` | 258 KB | Core game strings |
