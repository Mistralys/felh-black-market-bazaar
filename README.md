# Black Market Bazaar - Continued

Reboot of the "Black Market Bazaar" mod for Fallen Enchantress: Legendary Heroes, modernized and adapted to **Elemental: Reforged**.

---

## Reference Documents

Auto-generated reference documents for all mod data types:

| Document | Contents |
|---|---|
| [items.md](docs/references/items.md) | Weapons, armor, accessories, consumables, clothing |
| [spells.md](docs/references/spells.md) | Spell definitions (tactical & strategic) |
| [abilities.md](docs/references/abilities.md) | Hero and unit ability bonuses |
| [units.md](docs/references/units.md) | Custom unit types |
| [unit-stats.md](docs/references/unit-stats.md) | Custom unit stat type definitions |
| [effects.md](docs/references/effects.md) | Visual particle effect definitions |

Run `npm run reference:all` to regenerate all documents at once.

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
| `c` | Generate all references (`docs/references/`) |
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
| ``scripts/generate-reference.mjs`` | Items reference generator (`npm run reference`) |
| ``scripts/generate-reference-spells.mjs`` | Spells reference generator (`npm run reference:spells`) |
| ``scripts/generate-reference-abilities.mjs`` | Abilities reference generator (`npm run reference:abilities`) |
| ``scripts/generate-reference-units.mjs`` | Units reference generator (`npm run reference:units`) |
| ``scripts/generate-reference-unit-stats.mjs`` | Unit stats reference generator (`npm run reference:unit-stats`) |
| ``scripts/generate-reference-effects.mjs`` | Effects reference generator (`npm run reference:effects`) |
| ``scripts/generate-all-references.mjs`` | Umbrella script — generates all references at once (`npm run reference:all`) |
| ``scripts/lib/reference-helpers.mjs`` | Shared reference generation utilities (merge, localization, formatting) |
| ``scripts/migrate-to-dirs.mjs`` | One-time migration script (flat files → per-entry directories + English translation extraction) |
| ``scripts/split-xml.mjs`` | One-time migration script (splits monolithic XML into fragments) |
| ``scripts/lib/merge-xml.mjs`` | XML fragment merge module (used by build.mjs) |
| ``scripts/lib/merge-translations.mjs`` | Translation merge module (used by build.mjs) |
| ``scripts/menu.mjs`` | Interactive terminal menu |
| ``scripts/prepare.mjs`` | Config-reminder hook (runs after `npm install`) |
| ``scripts/lib/output.mjs`` | Shared console output helpers (colours, symbols) |
| ``Mods/`` | Mod source files (GameCore XML and Localization files are generated from ``xml/``) |
| ``docs/references/`` | Auto-generated reference documents (items, spells, abilities, units, unit-stats, effects) |
| ``docs/`` | Project documentation |
| ``.build.config.example.json`` | Committed template for local build config |
| ``build.config.json`` | Your local build config (git-ignored) |
