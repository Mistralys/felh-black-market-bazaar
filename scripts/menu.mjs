import { stdin, stdout } from "node:process";
import { execSync } from "node:child_process";
import * as readline from "node:readline";

// ─── Menu items ──────────────────────────────────────────────
// Each entry: { key, label, action }
// Keys are assigned alphabetically in order.
const menuItems = [
  {
    label: "Generate context documentation (ctx generate)",
    action: () => runCommand("ctx generate"),
  },
];

// Assign alphabetical shortcut keys (a, b, c, …)
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].key = String.fromCharCode(97 + i); // 'a' = 97
}

// ─── Helpers ─────────────────────────────────────────────────
function clearScreen() {
  stdout.write("\x1B[2J\x1B[H");
}

function printMenu() {
  clearScreen();
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║       Black Market Bazaar — Script Runner    ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log();

  for (const item of menuItems) {
    console.log(`  [${item.key}]  ${item.label}`);
  }

  console.log();
  console.log("  [q]  Quit");
  console.log();
  process.stdout.write("► Choose an option: ");
}

function runCommand(cmd) {
  console.log();
  console.log(`─── Running: ${cmd} ───`);
  console.log();
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
    console.log();
    console.log("✔ Done.");
  } catch (error) {
    console.error();
    console.error(`✖ Command failed with exit code ${error.status ?? "unknown"}.`);
  }
}

function waitForEnter() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    rl.question("Press Enter to return to menu…", () => {
      rl.close();
      resolve();
    });
  });
}

// ─── Main loop ───────────────────────────────────────────────
async function main() {
  // Enable raw-mode single-keypress reading
  if (!stdin.isTTY) {
    console.error("This script must be run in an interactive terminal.");
    process.exit(1);
  }

  while (true) {
    printMenu();

    const key = await readKey();

    if (key === "q") {
      clearScreen();
      console.log("Goodbye.");
      process.exit(0);
    }

    const item = menuItems.find((m) => m.key === key);
    if (item) {
      item.action();
      await waitForEnter();
    }
    // Unrecognised keys simply redraw the menu
  }
}

function readKey() {
  return new Promise((resolve) => {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.once("data", (data) => {
      stdin.setRawMode(false);
      stdin.pause();
      // Handle Ctrl+C
      if (data === "\u0003") {
        clearScreen();
        console.log("Goodbye.");
        process.exit(0);
      }
      resolve(data.toLowerCase());
    });
  });
}

main();
