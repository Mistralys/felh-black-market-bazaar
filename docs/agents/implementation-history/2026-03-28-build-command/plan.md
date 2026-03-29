# Plan: Add Build Command for Mod Deployment

## Summary

Add a "build" command that performs a clean copy of the mod's publishable files (`Mods/197542/`) into the user's Elemental Reforged My Documents mod folder. The target path is read from a local JSON config file that is git-ignored (machine-specific). The command deletes the target folder first, then copies fresh to ensure no stale files remain.

## Architectural Context

- **Script runner:** The project uses a Node.js menu system ([scripts/menu.mjs](scripts/menu.mjs)) with `npm run menu` as the entry point. Menu items call shell commands or inline functions.
- **Package config:** [package.json](package.json) defines the project as ESM (`"type": "module"`) with a single `menu` script.
- **Source folder:** [Mods/197542/](Mods/197542/) contains the deployable mod: `Data/` (string table + `GameCore/` with 10 XML files) and `Gfx/Black Market Bazaar Icons/` (~230 PNGs, ~15 DDS textures).
- **Target folder:** `C:\Users\newsl\Documents\My Games\ElementalReforged\Mods\197542\` — but this path is machine-specific and must come from config.
- **Git ignore:** [.gitignore](.gitignore) exists at the project root with a handful of entries.

## Approach / Architecture

1. **Config file** — A new `build.config.json` at the project root stores the deployment target path. It is git-ignored since the path is machine-specific. A `.build.config.example.json` is committed as a template.
2. **Build script** — A new `scripts/build.mjs` Node.js script:
   - Reads `build.config.json` from the project root.
   - Validates the config (target path exists and is a directory).
   - Deletes the target `197542/` subfolder inside the configured mod directory (clean step).
   - Recursively copies `Mods/197542/` to the target location (deploy step).
   - Reports success/failure with file counts.
3. **Menu integration** — Add the build command as a new menu item in `scripts/menu.mjs`.
4. **Package.json** — Add a standalone `build` script for direct invocation via `npm run build`.

## Rationale

- **JSON config** — Natural fit alongside the existing `package.json` ecosystem. Easy to parse with Node.js built-ins.
- **Separate script file** — Keeps the menu script lean and allows `npm run build` as a standalone entry point.
- **Clean copy** — User confirmed: always delete-then-copy to prevent stale artifacts from renamed/deleted files.
- **Node.js `fs` APIs** — Uses `fs.rm` (recursive) and `fs.cp` (recursive) from Node 16+. No external dependencies needed. Avoids platform-specific shell commands.
- **Git-ignored config** — The deploy path is machine-specific and should never be committed. An example file documents the expected shape.

## Detailed Steps

### Step 1: Create config example file

Create `.build.config.example.json` at the project root:

```json
{
  "deployPath": "C:\\Users\\<username>\\Documents\\My Games\\ElementalReforged\\Mods"
}
```

This is committed to the repo as documentation.

### Step 2: Create local config file

Create `build.config.json` at the project root (git-ignored):

```json
{
  "deployPath": "C:\\Users\\newsl\\Documents\\My Games\\ElementalReforged\\Mods"
}
```

### Step 3: Add config to .gitignore

Append `build.config.json` to `.gitignore`.

### Step 4: Create the build script

Create `scripts/build.mjs` with this logic:

1. Read and parse `build.config.json` from the project root (`process.cwd()`).
   - If missing: print an error telling the user to copy the example file, exit with code 1.
   - If `deployPath` is missing or empty: print a validation error, exit with code 1.
2. Validate `deployPath` exists and is a directory.
3. Compute the target: `path.join(deployPath, "197542")`.
4. Compute the source: `path.join(process.cwd(), "Mods", "197542")`.
5. Validate the source exists.
6. **Clean:** If the target exists, delete it recursively with `fs.rm(target, { recursive: true, force: true })`.
7. **Copy:** Use `fs.cp(source, target, { recursive: true })` to copy all files.
8. Print a summary (files copied, target path).

The script should be importable as a function (for menu.mjs) AND runnable directly.

### Step 5: Add to menu

Add a new menu item in `scripts/menu.mjs`:

```js
{
  label: "Build mod (deploy to game folder)",
  action: () => runCommand("node scripts/build.mjs"),
}
```

### Step 6: Add npm script

Add to `package.json`:

```json
"build": "node scripts/build.mjs"
```

## Dependencies

- Node.js 16+ (for `fs.rm` with `recursive` and `fs.cp` with `recursive`; `fs.cp` is stable from Node 16.7+)
- No new npm packages required

## Required Components

- **New:** `.build.config.example.json` — committed config template
- **New:** `build.config.json` — local config (git-ignored)
- **New:** `scripts/build.mjs` — build/deploy script
- **Modified:** `.gitignore` — add `build.config.json`
- **Modified:** `scripts/menu.mjs` — add build menu item
- **Modified:** `package.json` — add `build` script

## Assumptions

- Node.js 16+ is available (required for `fs.cp` recursive copy).
- The `Mods/197542/` folder is the sole deployment artifact — no files outside it need copying.
- The `deployPath` points to the parent `Mods/` directory, not the `197542/` subfolder itself.

## Constraints

- Config file must be git-ignored (machine-specific path).
- Build must always do a clean copy (delete target first).
- No external npm dependencies (use Node.js built-in `fs` and `path`).

## Out of Scope

- Watch mode / auto-deploy on file change.
- Deploying to Steam Workshop.
- Backing up the target folder before overwrite.
- Validating XML content during build.

## Acceptance Criteria

- Running `npm run build` reads `build.config.json`, deletes the target `197542/` folder, and copies `Mods/197542/` to the configured path.
- Running `npm run menu` shows the build option and executes it correctly.
- If `build.config.json` is missing, the script prints a helpful error referencing the example file.
- If `deployPath` is invalid or doesn't exist, the script prints a clear error.
- `build.config.json` is listed in `.gitignore`.
- `.build.config.example.json` is committed with a placeholder path.

## Testing Strategy

- Manual: Run `npm run build` and verify files appear at the target path.
- Manual: Delete `build.config.json` and run `npm run build` — confirm the error message is helpful.
- Manual: Set `deployPath` to a nonexistent path — confirm the error message is clear.
- Manual: Run `npm run menu`, select the build option, verify it works end-to-end.
- Manual: Modify a source XML file, rebuild, confirm the change appears at the target.
- Manual: Delete a source file, rebuild, confirm the stale file is gone from the target (clean copy verification).

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **`fs.cp` not available on older Node** | Document Node 16+ requirement; `fs.cp` is stable since 16.7 |
| **User points `deployPath` at wrong folder** | Validate the path exists and is a directory before deleting anything; name the subfolder explicitly (`197542`) so only the mod folder is touched |
| **Accidental deletion of non-mod files** | The script only deletes the `197542/` subfolder inside `deployPath`, never the parent |
| **Large icon folder makes copy slow** | Acceptable trade-off for clean copy reliability; no incremental sync needed at ~250 files |
