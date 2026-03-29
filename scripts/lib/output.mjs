// Shared console output helpers for BMB scripts.
// Uses Node.js built-in ANSI escape sequences — no external dependencies.
// Supported on Windows Terminal, PowerShell 7+, VS Code terminal, macOS Terminal,
// iTerm2, and all major Unix terminals.
//
// Colour detection (evaluated once at module load):
//   - FORCE_COLOR=<non-empty>  → colour always on (overrides everything)
//   - NO_COLOR=<non-empty>     → colour always off (per https://no-color.org/)
//   - non-TTY stdout           → colour off (piped / redirected output)
//   - interactive TTY          → colour on (normal interactive use)
const useColour = (() => {
  if (process.env.FORCE_COLOR !== undefined && process.env.FORCE_COLOR !== '') return true;
  if (process.env.NO_COLOR   !== undefined && process.env.NO_COLOR   !== '') return false;
  return process.stdout.isTTY === true;
})();

const RESET  = useColour ? '\x1b[0m'  : '';
const GREEN  = useColour ? '\x1b[32m' : '';
const RED    = useColour ? '\x1b[31m' : '';
const YELLOW = useColour ? '\x1b[33m' : '';
const CYAN   = useColour ? '\x1b[36m' : '';
const DIM    = useColour ? '\x1b[2m'  : '';

export function success(msg) { console.log(`${GREEN}✔${RESET} ${msg}`); }
export function error(msg)   { console.error(`${RED}✖${RESET} ${msg}`); }
export function warn(msg)    { console.warn(`${YELLOW}⚠${RESET} ${msg}`); }
export function info(msg)    { console.log(`${CYAN}ℹ${RESET} ${msg}`); }
export function step(msg)    { console.log(`${DIM}${msg}${RESET}`); }
