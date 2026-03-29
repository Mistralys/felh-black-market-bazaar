# Plan: Build Command Polish — Rework 1 (Synthesis Recommendations)

## Summary

Address the three actionable Code Insights from the [2026-03-29-build-command-polish synthesis](../2026-03-29-build-command-polish/plan.md#code-insights): add `NO_COLOR` / non-TTY support to the shared output module, clean up unused/ambiguous exports, and extract a persistent readline instance in `menu.mjs` to prevent listener accumulation.

## Architectural Context

The prior plan created and integrated a shared output module. The current state of each file:

- **[scripts/lib/output.mjs](../../../../scripts/lib/output.mjs)** — Exports six functions: `success`, `error`, `warn`, `info`, `heading`, `dim`. All unconditionally emit ANSI escape codes. No awareness of `NO_COLOR`, `FORCE_COLOR`, or TTY status.
- **[scripts/build.mjs](../../../../scripts/build.mjs)** — Imports `success`, `error`, `info`, `dim` from the shared module. Uses `dim()` for two progress messages ("Removing existing target folder…", "Copying files…"). Does not import `heading`. Does not import `warn`.
- **[scripts/menu.mjs](../../../../scripts/menu.mjs)** — Imports `success`, `error` from the shared module. Contains its own inline ANSI codes for the box-drawing header. `waitForEnter()` (line 66) creates a new `readline.createInterface()` on every invocation inside the `while(true)` main loop (line 98). Each call creates and destroys a readline interface on `stdin`.
- **[package.json](../../../../package.json)** — ESM project (`"type": "module"`), three scripts: `prepare`, `menu`, `build`. No npm dependencies.

### Current usage matrix

| Export | `build.mjs` | `menu.mjs` | Used? |
|--------|:-----------:|:----------:|:-----:|
| `success` | ✔ | ✔ | Yes |
| `error` | ✔ | ✔ | Yes |
| `warn` | — | — | **No** |
| `info` | ✔ | — | Yes |
| `heading` | — | — | **No** |
| `dim` | ✔ | — | Yes |

## Approach / Architecture

### 1. NO_COLOR & TTY-aware output (`output.mjs`)

Add a colour-detection gate at module load time in `output.mjs`. When colour is disabled, all helper functions emit plain text (no ANSI codes). Detection logic:

```
colour disabled if:
  - process.env.NO_COLOR is set and non-empty (per https://no-color.org/)
  - process.stdout is not a TTY (piped/redirected output)

colour forced on if:
  - process.env.FORCE_COLOR is set and non-empty (overrides NO_COLOR and TTY check)
```

This follows the widely-adopted convention used by npm, ripgrep, esbuild, PowerShell, and hundreds of other CLI tools. The `FORCE_COLOR` escape hatch is standard practice (used by Chalk, Jest, etc.) and allows users to restore colour in pipes when desired.

### 2. Clean up unused exports (`output.mjs`)

- **Remove `heading()`** — exported but never imported or used anywhere. Dead code.
- **Rename `dim()` → `step()`** — the function is used semantically for progress/step messages ("Removing existing target folder…", "Copying files…"). The name `step` better communicates intent than `dim` (which describes the visual style, not the purpose). Update the two call sites in `build.mjs`.

### 3. Persistent readline in `menu.mjs`

Extract a single `readline.createInterface()` instance created once at menu startup, reused by `waitForEnter()`, and closed only on exit. This prevents accumulating event listeners on `stdin` across repeated menu interactions.

## Rationale

| Decision | Why |
|----------|-----|
| Gate colour at module load, not per-call | Single check avoids repeated `process.env` lookups; colour state doesn't change mid-execution |
| `NO_COLOR` + TTY check + `FORCE_COLOR` override | Matches the informal standard at no-color.org plus standard `FORCE_COLOR` escape hatch; same logic used by npm itself |
| Remove `heading()` rather than keep for "completeness" | YAGNI — no consumer exists; easy to re-add if needed; reduces API surface |
| Rename `dim` → `step` | Naming communicates *purpose* (progress step) not *style* (dim text); the DIM ANSI attribute is an implementation detail |
| Single persistent readline | Node's `readline.createInterface()` attaches listeners to `stdin`; repeated create/destroy cycles can trigger `MaxListenersExceededWarning` after ~11 invocations in a single session; a persistent instance avoids this entirely |

## Detailed Steps

### Step 1: Add colour detection to `output.mjs`

At the top of `scripts/lib/output.mjs`, add a colour-enabled flag:

```js
const useColour = (() => {
  if (process.env.FORCE_COLOR !== undefined && process.env.FORCE_COLOR !== '') return true;
  if (process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== '') return false;
  return process.stdout.isTTY === true;
})();
```

Then make each ANSI constant conditional:

```js
const RESET  = useColour ? '\x1b[0m'  : '';
const GREEN  = useColour ? '\x1b[32m' : '';
const RED    = useColour ? '\x1b[31m' : '';
const YELLOW = useColour ? '\x1b[33m' : '';
const CYAN   = useColour ? '\x1b[36m' : '';
const BOLD   = useColour ? '\x1b[1m'  : '';
const DIM    = useColour ? '\x1b[2m'  : '';
```

The helper functions remain unchanged — they reference the same constants, which are now empty strings when colour is off. Unicode symbols (`✔`, `✖`, `⚠`, `ℹ`) are kept regardless of colour state — they are not ANSI codes and render fine in all modern terminals.

### Step 2: Remove `heading()` export

Delete the `heading()` function from `output.mjs`. No other files reference it, so no import updates are needed.

### Step 3: Rename `dim()` → `step()` in `output.mjs`

Rename the function:

```js
export function step(msg) { console.log(`${DIM}${msg}${RESET}`); }
```

### Step 4: Update `build.mjs` imports and call sites

Change the import line:

```js
import { success, error, info, step } from './lib/output.mjs';
```

Update the two call sites:

```js
step('Removing existing target folder...');
// ...
step('Copying files...');
```

### Step 5: Extract persistent readline in `menu.mjs`

Create a module-level readline instance after the imports:

```js
import * as readline from "node:readline";

// Persistent readline instance — created once, reused by waitForEnter().
// Avoids MaxListenersExceededWarning from repeated create/destroy cycles.
const rl = readline.createInterface({ input: stdin, output: stdout });
rl.on("close", () => {
  // If the readline closes (e.g., stdin EOF), exit gracefully.
  process.exit(0);
});
```

Simplify `waitForEnter()`:

```js
function waitForEnter() {
  return new Promise((resolve) => {
    rl.question("Press Enter to return to menu…", () => {
      resolve();
    });
  });
}
```

Ensure the exit paths (`q` key, Ctrl+C) call `rl.close()` before `process.exit(0)`.

### Step 6: Verify `menu.mjs` inline ANSI is acceptable

The box-drawing header in `menu.mjs` uses its own inline ANSI codes (screen clear via `\x1B[2J\x1B[H`). These are **not** colour codes — they are cursor/screen control sequences. The `NO_COLOR` standard explicitly states it only applies to colour, not other styling or terminal control. No changes needed here.

However, if the menu is ever invoked in a non-TTY context, the `stdin.isTTY` guard at line 80 already exits with an error, so inline ANSI in menu rendering is safe.

## Dependencies

- Node.js 16+ (unchanged)
- No new npm packages

## Required Components

- **Modified:** `scripts/lib/output.mjs` — add colour detection; remove `heading()`; rename `dim()` → `step()`
- **Modified:** `scripts/build.mjs` — update import: `dim` → `step`; update two call sites
- **Modified:** `scripts/menu.mjs` — extract persistent readline instance; simplify `waitForEnter()`

## Assumptions

- `process.stdout.isTTY` correctly reflects TTY status on all target platforms (Windows, macOS, Linux). This is a well-established Node.js API and is reliable.
- `NO_COLOR` and `FORCE_COLOR` are the only environment variables we need to check. We intentionally do not check `TERM=dumb` or `CI` — keeping the logic minimal and standard.
- The persistent readline instance in `menu.mjs` does not interfere with raw-mode keypress reading in `readKey()`. Verified: `readline.createInterface()` does not set raw mode or consume `stdin` data events when no `.question()` is pending. The `readKey()` function's `stdin.setRawMode(true)` / `stdin.once("data", ...)` pattern operates on the raw stream, which is independent of readline's line-buffered reading.

## Constraints

- Zero external npm dependencies (project constraint).
- No breaking changes to `npm run build` or `npm run menu` interfaces.
- `build.mjs` validation chain and error-exit behaviour must be preserved.
- Unicode symbols (`✔`, `✖`, `⚠`, `ℹ`) are retained even when colour is off — they communicate meaning beyond colour.

## Out of Scope

- Adding `NO_COLOR` awareness to `menu.mjs`'s inline box-drawing/screen-clear sequences (these are terminal control, not colour).
- `FORCE_COLOR` level parsing (e.g., `FORCE_COLOR=2` for 256-colour) — our palette only uses basic 8-colour ANSI.
- TTY test automation for the menu (deferred from the parent plan).
- Watch mode / incremental deploy (deferred from the parent plan).

## Acceptance Criteria

- Running `NO_COLOR=1 node scripts/build.mjs` produces output with no ANSI escape codes (plain text with Unicode symbols only).
- Running `node scripts/build.mjs | cat` (piped, non-TTY) produces plain text output.
- Running `FORCE_COLOR=1 node scripts/build.mjs | cat` produces coloured output even though piped.
- Running `node scripts/build.mjs` in a normal terminal produces coloured output (existing behaviour preserved).
- `heading()` is no longer exported from `output.mjs`.
- `dim()` is no longer exported; `step()` is exported and used in `build.mjs`.
- `menu.mjs` uses a single persistent `readline.createInterface()` — `waitForEnter()` no longer creates/destroys interfaces.
- Pressing menu items repeatedly (>11 times in a single session) does not produce `MaxListenersExceededWarning`.
- All existing functionality (`npm run build`, `npm run menu`) works unchanged.

## Testing Strategy

- **Manual:** Run `node scripts/build.mjs` — verify coloured output with `✔`, `ℹ` symbols.
- **Manual:** Run `NO_COLOR=1 node scripts/build.mjs` — verify no ANSI codes in output (symbols still present).
- **Manual:** Run `node scripts/build.mjs | cat` (or `> output.txt` and inspect) — verify no ANSI codes.
- **Manual:** Run `FORCE_COLOR=1 node scripts/build.mjs | cat` — verify ANSI codes are present.
- **Manual:** Run `npm run menu`, execute build action 12+ times in a row — verify no `MaxListenersExceededWarning`.
- **Static:** Confirm `heading` no longer appears in any `import` statement or is exported from `output.mjs`.
- **Static:** Confirm `dim` no longer appears in any `import` statement and `step` is used instead.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Persistent readline interferes with raw-mode `readKey()`** | `readline.createInterface()` does not consume raw-mode data events. The two mechanisms operate on different abstraction layers (line-buffered vs raw). If an issue is found during testing, the fallback is to pause the readline interface before entering raw mode and resume after. |
| **`NO_COLOR` check breaks colour for users who expect it** | Default behaviour (interactive TTY, no env vars set) is unchanged — colour is on. The env var must be explicitly set. This matches the informal standard that hundreds of tools follow. |
| **Renaming `dim` → `step` is a breaking change for hypothetical consumers** | No external consumers exist. The module is internal to this project. The only call sites are in `build.mjs` (2 occurrences), updated in the same plan. |
| **`process.stdout.isTTY` returns `undefined` in unexpected contexts** | The check uses `=== true` (strict equality), so `undefined` correctly falls through to "no colour". This is defensive by default. |
