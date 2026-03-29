# Plan: Build Command Polish — Known Limitations & OS Independence

## Summary

Address the five known limitations identified in the [2026-03-28-build-command synthesis](../2026-03-28-build-command/synthesis.md) and establish OS independence (Windows, macOS, Unix) as a first-class constraint for all project scripts. The work unifies console output styling, guards against menu key overflow, adds a config-reminder lifecycle hook, documents cross-platform examples in the config template and README, and audits both scripts for platform-specific assumptions.

## Architectural Context

- **Scripts:** Two ESM scripts in `scripts/`:
  - [scripts/build.mjs](../../../../scripts/build.mjs) — mod deployment; uses plain `console.log`/`console.error` strings with no colour or symbols.
  - [scripts/menu.mjs](../../../../scripts/menu.mjs) — interactive terminal menu; uses ANSI escape codes (`\x1B[2J\x1B[H`), Unicode box-drawing (`╔═╗║╚╝`), and symbols (`✔ ✖ ►`).
- **Package config:** [package.json](../../../../package.json) — ESM (`"type": "module"`), two scripts: `menu`, `build`. No npm dependencies.
- **Build config:** [.build.config.example.json](../../../../.build.config.example.json) (committed template, Windows-only example path) and `build.config.json` (git-ignored, local).
- **Project README:** [README.md](../../../../README.md) — documents Getting Started, Local Build Configuration, Build Command, Script Runner, and Repository Layout.
- **AGENTS.md:** [AGENTS.md](../../../../AGENTS.md) — agent operating manual including Project Stats table and key conventions.

Both scripts already use Node.js built-in APIs (`node:fs/promises`, `node:path`, `node:child_process`, `node:readline`) with no platform-specific shell commands. Path handling uses `path.join()`/`path.resolve()` throughout. The primary gaps are cosmetic (output style divergence), defensive (key overflow), DX (config reminder), and documentation (cross-platform examples).

## Approach / Architecture

### 1. Shared Console Output Helpers

Create a small `scripts/lib/output.mjs` utility module exporting styled-output functions that both `build.mjs` and `menu.mjs` can import. Uses Node.js built-in ANSI escape sequences — no external dependencies. This resolves the style inconsistency between the two scripts.

### 2. Menu Key Overflow Guard

Add a runtime guard in `menu.mjs` that caps the `menuItems` array at 26 entries (a–z) and logs a warning if the limit is exceeded. Items beyond 26 are excluded from key assignment but could still be listed as informational.

### 3. Config Reminder via npm `prepare` Hook

Add a `prepare` script in `package.json` that checks for `build.config.json` existence and prints a reminder if missing. The `prepare` hook runs after `npm install` — the right moment for first-time setup nudges. Uses a minimal inline Node.js one-liner or a dedicated script.

### 4. OS-Independence Audit & Documentation

- Audit both scripts for any platform-specific assumptions (none found in current code, but the audit formalizes this).
- Update `.build.config.example.json` to include commented examples for all three target platforms.
- Update `README.md` Local Build Configuration section with macOS and Linux path examples.
- Document the OS-independence constraint in `AGENTS.md` so future agents maintain it.

### 5. TTY Test Automation & Watch Mode (Deferred)

The TTY test automation limitation and watch mode remain deferred — no actionable work in this plan. Documented for traceability only.

## Rationale

| Decision | Why |
|---|---|
| Shared output module in `scripts/lib/` | Single source of truth for styling; both scripts import the same helpers; easy to extend later |
| ANSI sequences via Node built-ins | Zero dependencies; works on Windows Terminal, PowerShell 7+, VS Code terminal, macOS Terminal, iTerm2, and all major Unix terminals |
| `prepare` hook (not `preinstall`) | `prepare` runs after `npm install` and also after `git clone` + `npm install` — ideal for first-time setup reminders; `preinstall` runs before dependencies are installed which is too early |
| Guard rather than alternative key scheme | At 2 menu items, the 26-letter limit is far away; a simple guard + warning is proportionate |
| OS-independence as a documented constraint | Prevents future agents from introducing platform-specific code; the game runs on Windows but the dev tooling should not assume it |

## Detailed Steps

### Step 1: Create shared output module

Create `scripts/lib/output.mjs` with these exports:

```js
// ANSI colour helpers (no external deps)
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

export function success(msg) { console.log(`${GREEN}✔${RESET} ${msg}`); }
export function error(msg)   { console.error(`${RED}✖${RESET} ${msg}`); }
export function warn(msg)    { console.warn(`${YELLOW}⚠${RESET} ${msg}`); }
export function info(msg)    { console.log(`${CYAN}ℹ${RESET} ${msg}`); }
export function heading(msg) { console.log(`${BOLD}${msg}${RESET}`); }
export function dim(msg)     { console.log(`${DIM}${msg}${RESET}`); }
```

### Step 2: Integrate output helpers into `build.mjs`

Replace plain `console.log`/`console.error` calls in `build.mjs` with the shared helpers:

- Error messages → `error()`
- `"Source :"` / `"Target :"` lines → `info()`
- `"Removing existing target folder..."` / `"Copying files..."` → `dim()` or plain `info()`
- Final `"Build complete."` summary → `success()`

Preserve all existing logic, validation chain, and error-exit behaviour. Only the output formatting changes.

### Step 3: Integrate output helpers into `menu.mjs`

Replace inline ANSI usage in `menu.mjs` with imported helpers where appropriate:

- `runCommand` success/failure messages → `success()` / `error()`
- The box-drawing header and menu rendering can remain as-is (they are presentation-specific to the menu and would not benefit from the generic helpers).

### Step 4: Add menu key overflow guard

In `menu.mjs`, after the key-assignment loop, add:

```js
const MAX_KEYS = 26;
if (menuItems.length > MAX_KEYS) {
  console.warn(`Warning: ${menuItems.length} menu items exceed the ${MAX_KEYS}-key limit (a–z). Items beyond [z] will not have shortcut keys.`);
  menuItems.length = MAX_KEYS; // Truncate to prevent non-letter key chars
}
```

### Step 5: Add config-reminder `prepare` hook

Add to `package.json`:

```json
"prepare": "node -e \"const fs=require('fs');if(!fs.existsSync('build.config.json')){console.log('\\n⚠ build.config.json not found. Copy .build.config.example.json and set your deployPath.\\n')}\""
```

Note: The `prepare` hook must use CommonJS syntax (`require`) since it runs as an inline `-e` script without ESM module resolution. This is a one-liner — no separate script file needed.

Alternatively, if the inline is too unwieldy, create a `scripts/prepare.mjs` script and reference it as `"prepare": "node scripts/prepare.mjs"`.

### Step 6: Update `.build.config.example.json` with multi-platform examples

Replace the current single-line Windows-only example with a documented template:

```json
{
  "deployPath": "<SEE EXAMPLES BELOW — set your local Mods folder path>",
  "_examples": {
    "windows": "C:\\Users\\<username>\\Documents\\My Games\\ElementalReforged\\Mods",
    "macos": "/Users/<username>/Library/Application Support/ElementalReforged/Mods",
    "linux": "/home/<username>/.local/share/ElementalReforged/Mods"
  }
}
```

The `_examples` key is an inert documentation aid — `build.mjs` only reads `deployPath`.

### Step 7: Update README.md with cross-platform path examples

In the **Local Build Configuration** section of `README.md`, expand the setup instructions to show examples for all three platforms:

```markdown
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
```

Also add a note under **Prerequisites** that the scripts support Windows, macOS, and Linux.

### Step 8: Document OS-independence constraint in AGENTS.md

Add to the **Key Conventions** section (§6) of `AGENTS.md`:

```markdown
### Script OS Independence

All scripts in `scripts/` MUST be OS-independent. Targeted platforms: Windows, macOS, and Unix (Linux).

- Use `node:path` (`path.join`, `path.resolve`) for all file paths — never hardcode separators.
- Use `node:fs` / `node:fs/promises` for file operations — never shell-specific commands (`rm`, `del`, `xcopy`, `cp`).
- Use `node:child_process` with `execSync`/`spawn` when invoking external tools — never platform-specific shells.
- ANSI escape sequences are acceptable for terminal styling (supported on all target platforms).
- Config examples must show paths for all three platforms.
```

### Step 9: Update README.md Script Runner and Repository Layout sections

- Add `scripts/lib/output.mjs` to the Repository Layout table.
- Add the `prepare` hook to the available scripts documentation.

## Dependencies

- Node.js 16+ (unchanged from the build-command project)
- No new npm packages

## Required Components

- **New:** `scripts/lib/output.mjs` — shared console output helpers
- **New (conditional):** `scripts/prepare.mjs` — config reminder hook (only if inline approach is too unwieldy)
- **Modified:** `scripts/build.mjs` — import and use shared output helpers
- **Modified:** `scripts/menu.mjs` — import shared output helpers; add key overflow guard
- **Modified:** `package.json` — add `prepare` script
- **Modified:** `.build.config.example.json` — add multi-platform examples
- **Modified:** `README.md` — cross-platform path examples, prerequisites note, updated Repository Layout
- **Modified:** `AGENTS.md` — OS-independence constraint in Key Conventions

## Assumptions

- The macOS and Linux `deployPath` examples are reasonable guesses for where Elemental: Reforged stores user mods on those platforms. If the game doesn't run natively on macOS/Linux (e.g., only via Proton/Wine), the examples should reflect the Proton prefix paths instead. This should be verified.
- Modern terminals on all three platforms support ANSI escape sequences and the Unicode symbols used (`✔ ✖ ► ⚠ ℹ ╔═╗║╚╝`).
- The `prepare` npm lifecycle hook is appropriate — it runs after `npm install` and on `git clone` + `npm install` workflows.

## Constraints

- Zero external npm dependencies (project constraint carried forward).
- All scripts must run identically on Windows, macOS, and Unix (new constraint).
- No breaking changes to the existing `npm run build` and `npm run menu` interfaces.
- `build.mjs` validation chain and error-exit behaviour must be preserved — only output formatting changes.

## Out of Scope

- TTY test automation (deferred — requires architectural refactor of menu.mjs `main()` loop).
- Watch mode / incremental deploy (deferred — not needed at current file count).
- Steam Workshop deployment integration.
- Verifying actual Elemental: Reforged mod paths on macOS and Linux (documented as an assumption to verify).

## Acceptance Criteria

- `build.mjs` output uses coloured/styled messages matching `menu.mjs` conventions.
- `menu.mjs` success/failure messages in `runCommand()` use the shared output module.
- Both scripts import from the same `scripts/lib/output.mjs` module.
- The menu key-assignment loop handles >26 items gracefully (warning + truncation).
- Running `npm install` on a clean clone (without `build.config.json`) prints a reminder message.
- `.build.config.example.json` includes path examples for Windows, macOS, and Linux.
- `README.md` shows path examples for all three platforms.
- `AGENTS.md` documents the OS-independence constraint.
- All existing functionality (`npm run build`, `npm run menu` with `[a]` and `[b]`) works unchanged.
- No external npm dependencies added.

## Testing Strategy

- **Manual:** Run `npm run build` and verify styled output (colours, symbols) appears correctly.
- **Manual:** Run `npm run menu`, select `[b]`, verify styled build output streams correctly.
- **Manual:** Delete `build.config.json`, run `npm install`, verify the prepare hook prints a reminder.
- **Manual:** Temporarily add 27+ items to the `menuItems` array, run `npm run menu`, verify warning and truncation.
- **Manual (if possible):** Run `npm run build` on macOS or Linux (or WSL) to verify cross-platform behaviour.
- **Static:** Review all scripts for hardcoded path separators (`\\`, `/`) outside of user-facing example strings.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **macOS/Linux mod paths are incorrect** | Marked as an assumption; `_examples` key is inert documentation — incorrect examples don't break anything. Verify when platform access is available. |
| **`prepare` hook runs on every `npm install`** | The check is a single `existsSync` — near-zero cost. Message only prints when config is missing. |
| **Shared output module adds import overhead** | Negligible — it's a handful of string constants and thin wrappers. No runtime cost beyond module load. |
| **Unicode symbols don't render on some terminals** | All target platforms' modern default terminals support these symbols. Legacy `cmd.exe` on Windows is the exception — but `npm run` already requires a modern shell. |
| **ANSI colours in CI/redirected output** | Build script output may be piped to logs. ANSI codes in redirected output are harmless but ugly. A future enhancement could detect `NO_COLOR` / non-TTY and strip codes; deferred as low priority. |
