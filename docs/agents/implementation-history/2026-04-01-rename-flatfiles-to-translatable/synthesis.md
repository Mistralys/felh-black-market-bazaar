## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary
- Renamed the `flatFiles` boolean flag in `MERGE_CONFIG` to `translatable` with inverted semantics in [`scripts/lib/merge-xml.mjs`](../../../../scripts/lib/merge-xml.mjs).
- Old semantics: `flatFiles: true` → scan flat `*.xml` files; `flatFiles: false` → scan per-entry directories.
- New semantics: `translatable: true` → per-entry directories with `fragment.xml` / `en.xml` (translatable categories); `translatable: false` → flat `*.xml` files (non-translatable categories such as `effects/` and `core-items-mods/`).
- Updated all references: the `MERGE_CONFIG` table (10 rows), the `collectFragmentPaths()` function signature and body, the JSDoc for both `MERGE_CONFIG` and `collectFragmentPaths()`, and the destructuring inside `mergeXmlFragments()`.
- The flag name now self-documents intent: a developer adding a new translatable category sets `translatable: true`; a developer adding a flat-file-only category sets `translatable: false`. No implicit default to misread.

### Documentation Updates
- No external documentation updates were required. The change is internal to the build script; the flag is not referenced in `docs/`, `README.md`, `AGENTS.md`, or `Mods/README.md`.

### Verification Summary
- Tests run: `node scripts/build.mjs` — full build pipeline (XML fragment merge → translation merge → key integrity check → deploy).
- Static analysis run: none configured for this project (no ESLint/TypeScript setup).
- Result: **PASS** — 404 fragments merged into 10 XML files; 1 290 translation strings verified; 266 files deployed. All fragment counts identical to pre-change baseline.

### Code Insights
- [low] (`improvement`) `scripts/lib/merge-xml.mjs`: No further observations — the rename fully resolves the original debt item. The file is clean and consistent after the change.

### Additional Comments
- This change is a pure rename with no behavioural difference. The generated output files in `Mods/src/Data/GameCore/` are bit-for-bit identical to the pre-change build.
- The `translatable` flag name aligns with the terminology already used in the module-level JSDoc comment ("Categories with translatable content use entry directories").
