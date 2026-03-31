## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary
- **Split script** (`scripts/split-xml.mjs`): One-time migration script that reads 10 monolithic XML files from `Mods/src/Data/GameCore/` and generates 404 individual fragment files in `xml/` (10 subfolders). Uses regex-based text extraction to preserve original formatting. Handles the special `<DataChecksum>` element in `BMB_Abilities.xml` by extracting it to `xml/abilities/_meta.xml`.
- **Merge module** (`scripts/lib/merge-xml.mjs`): Exports `mergeXmlFragments()` async function that reads all fragment files from `xml/`, strips the `<Fragment>` wrapper via text-based extraction, and assembles monolithic XML files with proper prolog, comment line, and root elements. Handles per-file configuration (standalone attribute, comment presence, meta files). Uses CRLF line endings to match original files.
- **Build integration** (`scripts/build.mjs`): Added merge step as phase 0 before the existing deploy logic. If `xml/` directory doesn't exist, the merge is silently skipped (backward compatibility).
- **Reference generator** (`scripts/generate-reference.mjs`): Now auto-runs `mergeXmlFragments()` before parsing, ensuring generated XML files are always up-to-date. Added missing file warnings.
- **Git-ignored generated files**: All 10 monolithic XML files in `Mods/src/Data/GameCore/` are now listed in `.gitignore`.
- **Fragment structure**: 404 fragments across 10 subfolders, each a complete XML document with `<?xml version="1.0" encoding="utf-8"?>` prolog and `<Fragment>` wrapper. Fragments are sorted alphabetically during merge for deterministic output.

### Documentation Updates
- `README.md`: Updated Build Command section to document merge phase (step 1), added "XML Fragment Workflow" section explaining the fragment structure and how to add new items, updated Repository Layout table with new files (`xml/`, `scripts/split-xml.mjs`, `scripts/lib/merge-xml.mjs`).
- `Mods/README.md`: Added "XML Fragment Workflow" section explaining that GameCore XML files are generated, updated File Inventory table with "Source Fragments" column linking each file to its `xml/` subfolder, added note that files are generated.
- `AGENTS.md`: Updated File Map to include `xml/` directory tree with all 10 subfolders, updated Manifest Maintenance Rules to reference `xml/<subfolder>/` for content changes, updated Efficiency Rules to warn against editing monolithic files directly, added `merge-xml.mjs` and `split-xml.mjs` to Project Stats table.
- `context.yaml`: Added `xml/` to the `notPath` exclusion list for the tree source (too many files for context generation).
- `Mods/module-context.yaml`: Updated description and all source descriptions to note that XML files are generated from fragments, added comment about build dependency.

### Verification Summary
- Tests run:
  - **Round-trip fidelity test**: Split originals → merge → compare. All 10 files have identical `InternalName` counts. `BMB_Units.xml` is byte-identical. Other files differ only in: (a) alphabetical reordering of entries (by design), (b) minor trailing whitespace cleanup on root element lines, (c) consistent trailing newline.
  - **Fragment count verification**: 404 fragments total — items: 88, weapons: 71, armor: 85, clothes: 19, spells: 81, abilities: 2, effects: 32, units: 22, unit-stats: 3, core-items-mods: 1.
  - **Reference generator test**: `npm run reference` runs successfully with merge integration, parsing 263 items from 4 files (same count as before migration).
  - **Merge module standalone test**: `mergeXmlFragments()` called directly, produces all 10 output files correctly.
- Static analysis run: N/A (no linter configured for this project)
- Result: All verification tests pass.

### Code Insights
- [low] (convention) `Mods/src/Data/GameCore/BMB_CoreItemsModifications.xml`: Original file had trailing tabs after root element tags (`<GameItemTypes>\t` and `</GameItemTypes>\t`). The merge normalizes these away. This is a minor formatting inconsistency in the original that is now cleaned up.
- [low] (convention) `Mods/src/Data/GameCore/BMB_Weapons.xml`: Original had trailing spaces after root opening tag (`<GameItemTypes>    `). Similarly cleaned up by merge.
- [low] (convention) `Mods/src/Data/GameCore/BMB_UnitStats.xml`: Same trailing spaces pattern on root element.
- [low] (debt) `Mods/src/Data/GameCore/BMB_Units.xml`: This is the only file missing the `<!-- Black Market Bazaar by Hellions -->` comment line. The merge preserves this inconsistency (configured as `comment: false` in MERGE_CONFIG) to maintain fidelity, but a future cleanup could add the comment for consistency. **DONE**.
- [low] (improvement) `scripts/split-xml.mjs`: The split script could be enhanced with a `--dry-run` flag to preview what would be created without writing files. Not needed for the one-time migration but useful if the script is reused. **NOT NEEDED**.
- [medium] (improvement) `scripts/lib/merge-xml.mjs`: The merge module reads all fragment files sequentially. For very large fragment sets, parallel reads with `Promise.all()` could improve performance. Current 404-fragment set completes in under 1 second, so this is not urgent. **NOT NEEDED**.

### Additional Comments
- The plan mentioned using `fast-xml-parser` in the split script, but regex-based text extraction proved sufficient and simpler. The `fast-xml-parser` dependency remains in `package.json` for the reference generator.
- Fragment files use LF line endings (written by Node.js `writeFile`), while the merge output uses CRLF (matching the original monolithic files). This is intentional — fragments are developer-authored source files, while the merge output matches the game engine's expected format.
- The alphabetical ordering of fragments in the merged output means the entry order differs from the original hand-authored files. This is acceptable per the plan's assumptions ("the game engine does not depend on element order within a file"). An in-game smoke test is recommended to confirm. **CONFIRMED**.
- The `_compare.mjs` temporary script was created and deleted during verification. It is not part of the deliverables.
