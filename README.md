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
2. Reads `build.config.json` and validates `deployPath` and `modID`.
3. Confirms `Mods/src/` exists in the project.
4. Deletes `<deployPath>/<modID>/` if it already exists (clean slate).
5. Copies `Mods/src/` to `<deployPath>/<modID>/`.
6. Prints a summary: `Build complete. N file(s) deployed to: <path>`.

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

## XML Fragment Workflow

The mod's XML data is authored as individual fragment files in the `xml/` directory, one file per game entity. During build, these fragments are merged into the monolithic XML files that the game engine expects.

### Fragment structure

```
xml/
├── items/                  → BMB_Items.xml
├── weapons/                → BMB_Weapons.xml
├── armor/                  → BMB_Armor.xml
├── clothes/                → BMB_Clothes.xml
├── spells/                 → BMB_Spells.xml
├── abilities/              → BMB_Abilities.xml
├── effects/                → BMB_Effects.xml
├── units/                  → BMB_Units.xml
├── unit-stats/             → BMB_UnitStats.xml
└── core-items-mods/        → BMB_CoreItemsModifications.xml
```

Each fragment is a complete XML document with a `<Fragment>` wrapper:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Fragment>
    <GameItemType InternalName="AmuletOfContamination">
        <!-- ... full entry content ... -->
    </GameItemType>
</Fragment>
```

The `xml/` directory is the **source of truth**. The monolithic XML files in `Mods/src/Data/GameCore/` are generated and git-ignored.

### Adding a new item

1. Create a new `.xml` file in the appropriate `xml/` subfolder (e.g., `xml/items/BMB_NewItem.xml`).
2. Use the `<Fragment>` wrapper format shown above.
3. Run `npm run build` — the merge step assembles all fragments into the monolithic files, then deploys.

---

## Repository Layout

| Path | Purpose |
|---|---|
| ``xml/`` | XML fragment source files (one per game entity) — **source of truth** |
| ``scripts/build.mjs`` | Build/deploy script — merges fragments, then copies mod to game folder |
| ``scripts/split-xml.mjs`` | One-time migration script (splits monolithic XML into fragments) |
| ``scripts/lib/merge-xml.mjs`` | XML fragment merge module (used by build.mjs) |
| ``scripts/menu.mjs`` | Interactive terminal menu |
| ``scripts/prepare.mjs`` | Config-reminder hook (runs after `npm install`) |
| ``scripts/lib/output.mjs`` | Shared console output helpers (colours, symbols) |
| ``scripts/`` | Node.js build and tooling scripts |
| ``Mods/`` | Mod source files (GameCore XML files are generated from ``xml/``) |
| ``docs/`` | Project documentation |
| ``.build.config.example.json`` | Committed template for local build config |
| ``build.config.json`` | Your local build config (git-ignored) |
