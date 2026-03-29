## Synthesis

### Completion Status
- Status: COMPLETE
- Completed by: Standalone Developer Agent

### Implementation Summary
- Added TTY-aware colour detection to `scripts/lib/output.mjs`. A single IIFE at module load evaluates `FORCE_COLOR`, `NO_COLOR`, and `process.stdout.isTTY === true` to set a `useColour` boolean. All seven ANSI constants are now conditional on this flag (empty strings when colour is off), so the helper functions require no per-call changes.
- Removed the unused `heading()` export and the `BOLD` constant from `output.mjs`. No import sites existed, so no other files needed updating.
- Renamed `dim()` → `step()` in `output.mjs` to communicate purpose (progress step) rather than visual style. Updated the import line and both call sites in `scripts/build.mjs`.
- Extracted a single persistent `readline.createInterface()` instance in `scripts/menu.mjs`, created once at module load and reused by `waitForEnter()`. Added a `close` event handler for graceful EOF exit. Updated both exit paths (`q` keypress and Ctrl+C in `readKey()`) to call `rl.close()` before `process.exit(0)`.

### Documentation Updates
- No documentation updates were required because these are internal implementation changes to private scripts with no user-facing interface changes. The `README.md` script runner table (`npm run build`, `npm run menu`) and `AGENTS.md` are unaffected — behaviour and invocation are identical.

### Verification Summary
- Tests run: `node --check` on all three modified files (`scripts/lib/output.mjs`, `scripts/build.mjs`, `scripts/menu.mjs`) — no syntax errors.
- Static grep: confirmed `heading` is fully absent from all three files; `dim` appears only as the internal `DIM` ANSI constant (not as a function export or call site); `step` is imported and used at all three expected locations in `build.mjs`; `readline.createInterface` appears exactly once in `menu.mjs`.
- Static analysis: no linter configured for this project (zero npm dev dependencies by design).
- Result: all static checks pass.

### Code Insights
- [low] (improvement) `scripts/menu.mjs`: The `rl.on("close", ...)` handler calls `process.exit(0)` unconditionally. If the readline is ever closed intentionally mid-session for a reason other than EOF (currently not the case), this would exit without warning. The current two explicit `rl.close()` + `process.exit(0)` call sites make this safe today, but a boolean guard (`let isExiting = true` before calling `rl.close()`) would make the intent explicit if the module grows.
- [low] (debt) `scripts/menu.mjs`: The `console.warn(...)` on line 31 (menu items exceeding 26-key limit) bypasses the shared `warn()` helper from `output.mjs`. This means that message would not respect `NO_COLOR` / TTY colour detection. Low priority because the condition is essentially unreachable with the current two-item menu.
- [low] (improvement) `scripts/lib/output.mjs`: `warn()` is exported but has no call sites anywhere in the project. It was already unused before this plan (noted in the plan's usage matrix). It is intentionally retained per the plan's scope, but is a candidate for removal in a future cleanup pass if it remains unused.

### Additional Comments
- The plan explicitly noted that `menu.mjs`'s inline box-drawing and screen-clear sequences (`\x1B[2J\x1B[H`) are terminal control codes, not colour codes, and are out of scope for `NO_COLOR` handling. This was confirmed and no changes were made there.
- The `rl.question()` approach in `waitForEnter()` with a persistent interface works correctly because Node.js readline queues `.question()` calls on a single interface — the second call will not fire until the first resolves. This is safe for the sequential `await waitForEnter()` usage pattern.
