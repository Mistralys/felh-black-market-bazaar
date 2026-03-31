# Plan: XML Fragment Build System

## Summary

Replace the monolithic XML source files in [`Mods/src/Data/GameCore/`](Mods/src/Data/GameCore/) with a fragment-based authoring workflow. Each game entity (item, spell, effect, unit, etc.) will live in its own XML fragment file under a new `/xml` directory, organised by type in subfolders. A merge step integrated into the existing build pipeline ([`scripts/build.mjs`](scripts/build.mjs)) will assemble these fragments into the final monolithic XML files that the game engine expects, writing them to [`Mods/src/Data/GameCore/`](Mods/src/Data/GameCore/). The generated monolithic files will be git-ignored since `/xml` becomes the source of truth.

## Architectural Context

### Current state

The mod's XML data lives in 10 monolithic files under [`Mods/src/Data/GameCore/`](Mods/src/Data/GameCore/):

| File | Root Element | Child Element | Lines | Entries (approx) |
|---|---|---|---|---|
| [`BMB_Items.xml`](Mods/src/Data/GameCore/BMB_Items.xml) | `<GameItemTypes>` | `<GameItemType>` | 3,682 | ~80 |
| [`BMB_Weapons.xml`](Mods/src/Data/GameCore/BMB_Weapons.xml) | `<GameItemTypes>` | `<GameItemType>` | 8,036 | ~60 |
| [`BMB_Armor.xml`](Mods/src/Data/GameCore/BMB_Armor.xml) | `<GameItemTypes>` | `<GameItemType>` | 8,044 | ~30 |
| [`BMB_Clothes.xml`](Mods/src/Data/GameCore/BMB_Clothes.xml) | `<GameItemTypes>` | `<GameItemType>` | 559 | ~19 |
| [`BMB_Spells.xml`](Mods/src/Data/GameCore/BMB_Spells.xml) | `<Spells>` | `<SpellDef>` | 4,528 | ~76 |
| [`BMB_Abilities.xml`](Mods/src/Data/GameCore/BMB_Abilities.xml) | `<AbilityBonuses>` | `<AbilityBonus>` | 51 | 2 |
| [`BMB_Effects.xml`](Mods/src/Data/GameCore/BMB_Effects.xml) | `<EffectBlueprints>` | `<EffectSequencer>` | 4,135 | ~40 |
| [`BMB_Units.xml`](Mods/src/Data/GameCore/BMB_Units.xml) | `<UnitTypes>` | `<UnitType>` | 1,661 | ~22 |
| [`BMB_UnitStats.xml`](Mods/src/Data/GameCore/BMB_UnitStats.xml) | `<PlayerAbilityTypes>` | `<UnitStatType>` | 25 | 3 |
| [`BMB_CoreItemsModifications.xml`](Mods/src/Data/GameCore/BMB_CoreItemsModifications.xml) | `<GameItemTypes>` | `<GameItemType>` | 114 | ~3 |

### Key patterns

- All files use `<?xml version="1.0" encoding="utf-8"?>` prolog (except `BMB_CoreItemsModifications.xml` which adds `standalone="yes"`).
- All files have a single root element wrapping multiple child entries.
- Each child entry has an `InternalName` attribute that uniquely identifies it.
- [`BMB_Abilities.xml`](Mods/src/Data/GameCore/BMB_Abilities.xml) has a special `<DataChecksum>` element before the ability entries.
- The existing build script ([`scripts/build.mjs`](scripts/build.mjs)) copies `Mods/src/` to the game's deploy folder.
- The project already depends on [`fast-xml-parser`](package.json:14) (v5.5.9).
- All scripts follow OS-independent conventions using `node:path` and `node:fs`.
- The interactive menu ([`scripts/menu.mjs`](scripts/menu.mjs)) calls build via `node scripts/build.mjs`.

## Approach / Architecture

### Fragment file format

Each fragment is a complete XML document with prolog, using a `<Fragment>` root element wrapping the original game element:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Fragment>
    <GameItemType InternalName="AmuletOfContamination">
        <DisplayName>Amulet of Contamination</DisplayName>
        <!-- ... full entry content ... -->
    </GameItemType>
</Fragment>
```

The `<Fragment>` wrapper provides a consistent, predictable root element across all fragment types, simplifying the merge logic.

### Folder structure

```
xml/
├── items/                  → BMB_Items.xml
├── weapons/                → BMB_Weapons.xml
├── armor/                  → BMB_Armor.xml
├── clothes/                → BMB_Clothes.xml
├── spells/                 → BMB_Spells.xml
├── abilities/              → BMB_Abilities.xml
│   └── _meta.xml           → DataChecksum element (special)
├── effects/                → BMB_Effects.xml
├── units/                  → BMB_Units.xml
├── unit-stats/             → BMB_UnitStats.xml
└── core-items-mods/        → BMB_CoreItemsModifications.xml
```

Fragment filenames use the `InternalName` value: e.g., `xml/items/AmuletOfContamination.xml`, `xml/spells/BMB_AlchemicalSurprise.xml`.

### Merge configuration

A mapping table (defined in the merge script as a constant) connects each subfolder to its output file, root element, and any special metadata:

| Subfolder | Output File | Root Element | Prolog extras | Meta file |
|---|---|---|---|---|
| `items` | `BMB_Items.xml` | `GameItemTypes` | — | — |
| `weapons` | `BMB_Weapons.xml` | `GameItemTypes` | — | — |
| `armor` | `BMB_Armor.xml` | `GameItemTypes` | — | — |
| `clothes` | `BMB_Clothes.xml` | `GameItemTypes` | — | — |
| `spells` | `BMB_Spells.xml` | `Spells` | — | — |
| `abilities` | `BMB_Abilities.xml` | `AbilityBonuses` | — | `_meta.xml` (DataChecksum) |
| `effects` | `BMB_Effects.xml` | `EffectBlueprints` | — | — |
| `units` | `BMB_Units.xml` | `UnitTypes` | — | — |
| `unit-stats` | `BMB_UnitStats.xml` | `PlayerAbilityTypes` | — | — |
| `core-items-mods` | `BMB_CoreItemsModifications.xml` | `GameItemTypes` | `standalone="yes"` | — |

### Build pipeline integration

The merge step is added **inside** [`scripts/build.mjs`](scripts/build.mjs) as a new phase that runs before the existing deploy logic. The flow becomes:

1. **Merge XML fragments** → writes assembled files to `Mods/src/Data/GameCore/`
2. **Deploy** → copies `Mods/src/` to game folder (existing logic, unchanged)

The merge function will be implemented in a new module [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs) and imported by [`scripts/build.mjs`](scripts/build.mjs).

### Splitting script (one-time migration)

A one-time migration script [`scripts/split-xml.mjs`](scripts/split-xml.mjs) will read the existing monolithic XML files and generate the initial fragment files. This script is run once during migration and can be kept for reference or removed afterward.

## Rationale

- **Fragment-per-entry** maximises the benefit: each item/spell/effect is independently editable, diffable, and mergeable in version control.
- **`<Fragment>` wrapper** provides a uniform parsing contract — the merge script always reads `<Fragment>` children regardless of the game element type.
- **Complete XML documents** (with prolog) ensure each fragment is independently valid and can be opened/validated by any XML tool.
- **Integrated into build.mjs** keeps the workflow simple — `npm run build` does everything. No separate merge command to remember.
- **Git-ignoring generated files** eliminates redundancy and prevents merge conflicts on the large monolithic files.
- **Text-based concatenation** (reading fragment content as text and inserting into a template) is preferred over XML parsing for the merge step. This preserves the original formatting, indentation, and whitespace of each fragment exactly as authored, avoiding any reformatting that an XML parser/serializer might introduce. The `<Fragment>` wrapper is stripped via simple string operations (find opening/closing tag, extract inner content).
- **`fast-xml-parser`** is used only in the split script (one-time migration) to reliably extract individual entries from the monolithic files. The merge script uses text-based operations for fidelity.

## Detailed Steps

### Step 1: Create the `/xml` directory structure

Create the folder hierarchy:

```
xml/
├── items/
├── weapons/
├── armor/
├── clothes/
├── spells/
├── abilities/
├── effects/
├── units/
├── unit-stats/
└── core-items-mods/
```

### Step 2: Create the one-time split script

**New file:** [`scripts/split-xml.mjs`](scripts/split-xml.mjs)

This script:
1. Reads each monolithic XML file from [`Mods/src/Data/GameCore/`](Mods/src/Data/GameCore/).
2. Parses it to identify individual entries (using text-based extraction — find each top-level child element of the root, extract its raw text including all inner content).
3. Extracts the `InternalName` attribute from each entry.
4. Writes each entry as a fragment file: `xml/<subfolder>/<InternalName>.xml` with `<?xml version="1.0" encoding="utf-8"?>` prolog and `<Fragment>` wrapper.
5. For [`BMB_Abilities.xml`](Mods/src/Data/GameCore/BMB_Abilities.xml), extracts the `<DataChecksum>` element separately into `xml/abilities/_meta.xml` (also wrapped in `<Fragment>`).
6. Reports a summary: number of fragments created per subfolder.

The split script should use **regex-based text extraction** rather than `fast-xml-parser` to preserve original formatting. Pattern: match opening tags with `InternalName` attributes and their corresponding closing tags.

### Step 3: Run the split script to generate initial fragments

Execute `node scripts/split-xml.mjs` to populate the `/xml` directory from the existing monolithic files. Verify the fragment count matches the expected entry counts.

### Step 4: Create the merge module

**New file:** [`scripts/lib/merge-xml.mjs`](scripts/lib/merge-xml.mjs)

This module exports a `mergeXmlFragments()` async function that:

1. Defines the mapping table (subfolder → output file, root element, prolog extras, meta file).
2. For each mapping entry:
   a. Reads all `.xml` files from `xml/<subfolder>/` (excluding files starting with `_`).
   b. Sorts fragment files alphabetically by filename for deterministic output.
   c. For each fragment file, reads the raw text content, strips the XML prolog line and the `<Fragment>`/`</Fragment>` wrapper tags, and extracts the inner content (the game element with its original formatting).
   d. If a `_meta.xml` file exists in the subfolder, reads it and extracts its inner content the same way — this content is placed immediately after the root opening tag, before the regular entries.
   e. Assembles the final XML: prolog + comment + root opening tag + (optional meta content) + all fragment contents + root closing tag.
   f. Writes the assembled file to `Mods/src/Data/GameCore/<output-file>`.
3. Returns a summary object with per-file fragment counts.

The comment line `<!-- Black Market Bazaar by Hellions -->` is preserved in all generated files (matching the existing pattern).

Key implementation details:
- Use `node:fs/promises` for all I/O.
- Use `node:path` for all path construction.
- Fragment inner content extraction: find the line containing `<Fragment>` and the line containing `</Fragment>`, take everything between them.
- Indentation: the extracted inner content retains its original indentation from the fragment file. Fragment authors should use tab indentation at the entry level (matching the existing convention in the monolithic files).

### Step 5: Integrate merge into build.mjs

Modify [`scripts/build.mjs`](scripts/build.mjs):

1. Import `mergeXmlFragments` from `./lib/merge-xml.mjs`.
2. Add a new phase **before** the existing deploy logic (before step 5 "Clean existing target"):
   - Call `mergeXmlFragments()`.
   - Log the merge summary (number of fragments merged per file).
3. The existing deploy logic remains unchanged — it still copies `Mods/src/` to the target.

The merge step should check that the `xml/` directory exists and contains at least one subfolder with fragments. If `xml/` doesn't exist, skip the merge step with an info message (backward compatibility for anyone who hasn't migrated yet).

### Step 6: Update `.gitignore`

Add the generated monolithic XML files to [`.gitignore`](.gitignore):

```
# Generated XML files (source of truth is /xml fragments)
Mods/src/Data/GameCore/BMB_Items.xml
Mods/src/Data/GameCore/BMB_Weapons.xml
Mods/src/Data/GameCore/BMB_Armor.xml
Mods/src/Data/GameCore/BMB_Clothes.xml
Mods/src/Data/GameCore/BMB_Spells.xml
Mods/src/Data/GameCore/BMB_Abilities.xml
Mods/src/Data/GameCore/BMB_Effects.xml
Mods/src/Data/GameCore/BMB_Units.xml
Mods/src/Data/GameCore/BMB_UnitStats.xml
Mods/src/Data/GameCore/BMB_CoreItemsModifications.xml
```

After adding to `.gitignore`, remove the tracked copies from git (without deleting the working tree files) so they stop being tracked.

### Step 7: Update the reference generator

[`scripts/generate-reference.mjs`](scripts/generate-reference.mjs) reads from `Mods/src/Data/GameCore/`. Since the merge step now generates those files, the reference generator needs no code changes — but it now depends on the merge step having run first.

Add a note in the script's header comment documenting this dependency. Optionally, have the reference generator call `mergeXmlFragments()` before parsing, or at minimum check that the generated files exist and warn if they're missing.

### Step 8: Update documentation

Per AGENTS.md manifest maintenance rules, update:

1. **[`Mods/README.md`](Mods/README.md)**: Add a note that the XML files in `Mods/src/Data/GameCore/` are now generated from fragments in `/xml`. Update the file inventory to note they are generated.

2. **[`README.md`](README.md)**:
   - Update the "Build Command" section to document the new merge phase.
   - Update "What it does" list to include the merge step.
   - Add a section about the `/xml` fragment structure.
   - Update the "Repository Layout" table to include the `/xml` directory.

3. **[`AGENTS.md`](AGENTS.md)**:
   - Update the File Map to include the `/xml` directory.
   - Update the Manifest Maintenance Rules table to cover fragment file additions.
   - Update the Efficiency Rules to mention `/xml` as the source of truth for item content.

4. **[`context.yaml`](context.yaml)**: Add the `/xml` directory to the tree source if appropriate.

5. **[`Mods/module-context.yaml`](Mods/module-context.yaml)**: Update if it references the XML files directly.

### Step 9: Verify round-trip fidelity

After the split and merge, verify that the regenerated monolithic XML files are byte-identical (or semantically identical) to the originals. This can be done by:

1. Saving copies of the original monolithic files.
2. Running the split script.
3. Running the merge (via `npm run build` or directly).
4. Diffing the regenerated files against the originals.

Minor whitespace differences (e.g., trailing newlines) are acceptable. Structural differences are not.

## Dependencies

- [`fast-xml-parser`](package.json:14) (already installed, v5.5.9) — used only in the split script
- [`node:fs/promises`](scripts/build.mjs:1) — file I/O (already used throughout)
- [`node:path`](scripts/build.mjs:3) — path construction (already used throughout)
- [`scripts/lib/output.mjs`](scripts/lib/output.mjs) — console output helpers (already exists)

## Required Components

### New files

| File | Purpose |
|---|---|
| `scripts/lib/merge-xml.mjs` | XML fragment merge module (imported by build.mjs) |
| `scripts/split-xml.mjs` | One-time migration script to split monolithic XML into fragments |
| `xml/` (directory tree) | Fragment source files — 10 subfolders, ~335 fragment files total |
| `xml/abilities/_meta.xml` | DataChecksum metadata fragment for BMB_Abilities.xml |

### Modified files

| File | Change |
|---|---|
| [`scripts/build.mjs`](scripts/build.mjs) | Import and call `mergeXmlFragments()` before deploy |
| [`.gitignore`](.gitignore) | Add 10 generated XML file paths |
| [`README.md`](README.md) | Document merge phase, `/xml` structure, updated build flow |
| [`Mods/README.md`](Mods/README.md) | Note that GameCore XML files are generated |
| [`AGENTS.md`](AGENTS.md) | Update File Map, maintenance rules, efficiency rules |
| [`context.yaml`](context.yaml) | Add `/xml` to tree source |

### Optionally modified files

| File | Change |
|---|---|
| [`scripts/generate-reference.mjs`](scripts/generate-reference.mjs) | Add dependency note or auto-merge call |
| [`Mods/module-context.yaml`](Mods/module-context.yaml) | Update if it references XML files |

## Assumptions

- Each XML entry's `InternalName` attribute is unique within its file and is a valid filename (no special characters that would break filesystem paths).
- The existing monolithic XML files are the canonical source until the migration is complete.
- Fragment files will use the same tab-based indentation convention as the existing monolithic files.
- The `<!-- Black Market Bazaar by Hellions -->` comment is desired in all generated output files.
- Alphabetical sorting of fragments produces acceptable output ordering (the game engine does not depend on element order within a file).

## Constraints

- All scripts must be OS-independent (Windows, macOS, Linux) per AGENTS.md rules.
- File encoding must be UTF-8 (no BOM) for all XML files.
- The merge step must not alter the content of individual entries — formatting fidelity is required.
- The build pipeline must remain backward-compatible: if `/xml` doesn't exist, skip the merge step.
- No new npm dependencies may be added (use existing `fast-xml-parser` and Node.js built-ins only).

## Out of Scope

- XML validation/linting of fragment files (could be a future enhancement).
- Automated tests for the merge script (manual round-trip verification is the testing strategy).
- Refactoring the reference generator to read fragments directly (it continues to read the merged output).
- IDE/editor integration (e.g., XML schemas for fragment files).
- Changing the game's mod loading mechanism.

## Acceptance Criteria

1. **Fragment structure exists**: The `/xml` directory contains 10 subfolders with one `.xml` fragment file per game entity, each wrapped in `<Fragment>`.
2. **Merge produces correct output**: Running `npm run build` generates all 10 monolithic XML files in `Mods/src/Data/GameCore/` from the fragments.
3. **Round-trip fidelity**: The generated monolithic files are functionally identical to the original hand-authored files (whitespace-only differences are acceptable).
4. **Build still deploys**: After merge, the existing deploy step copies the generated files to the game folder successfully.
5. **Git-ignored**: The 10 generated XML files are listed in `.gitignore` and no longer tracked.
6. **Reference generator works**: `npm run reference` still produces correct output (reading from the generated monolithic files).
7. **Backward compatibility**: If the `/xml` directory is absent, `npm run build` skips the merge step and deploys whatever is in `Mods/src/` (existing behavior).
8. **Documentation updated**: README.md, Mods/README.md, and AGENTS.md reflect the new workflow.
9. **OS-independent**: The merge and split scripts work on Windows, macOS, and Linux.

## Testing Strategy

1. **Round-trip test** (primary): Save original monolithic files → run split → run merge → diff against originals. Differences should be whitespace-only or absent.
2. **Fragment count verification**: Count fragment files per subfolder and compare against known entry counts from the monolithic files.
3. **Build integration test**: Run `npm run build` end-to-end and verify the deploy target contains the expected files.
4. **Reference generator test**: Run `npm run reference` after a build and verify the output matches the previous reference.
5. **Missing `/xml` test**: Temporarily rename `/xml` and verify `npm run build` still works (skips merge, deploys existing files).
6. **In-game smoke test** (manual): Load the mod in Elemental: Reforged and verify items, spells, and effects work as before.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **Formatting drift**: The merge step subtly alters whitespace or encoding, causing game engine issues | Use text-based concatenation (not XML parse/serialize) to preserve original formatting exactly. Round-trip test catches differences. |
| **InternalName collisions**: Two entries in different files share the same InternalName, causing filename conflicts | The split script checks for duplicates and reports them. InternalNames are already unique per AGENTS.md convention. |
| **Fragment ordering matters**: The game engine depends on element order within a file | Alphabetical sorting is deterministic. If order matters, add an optional numeric prefix convention (e.g., `001_EntryName.xml`). Verify in-game. |
| **Large diff on migration commit**: Removing 10 large tracked files and adding ~335 small files creates a noisy commit | Split the migration into two commits: (1) add `/xml` + scripts + `.gitignore` changes, (2) remove tracked monolithic files from git. |
| **Reference generator breaks**: It runs before merge, finding no files | Add a check in the reference generator that warns if source files are missing, suggesting to run build first. |
| **Special XML constructs**: CDATA sections, XML comments, or unusual formatting in fragments get corrupted during merge | Text-based merge preserves all content verbatim. The `<Fragment>` wrapper stripping is line-based and doesn't parse inner content. |
