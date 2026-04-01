import { readFile, rm, cp, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { success, error, info, step } from './lib/output.mjs';
import { mergeXmlFragments } from './lib/merge-xml.mjs';
import { mergeTranslations } from './lib/merge-translations.mjs';
import { verifyTranslationKeys } from './lib/verify-translation-keys.mjs';

// Resolve project root (__dirname equivalent for ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

/** Path to the local (git-ignored) build config file. */
const CONFIG_FILE = path.join(PROJECT_ROOT, 'build.config.json');
/** Committed example config shown in error messages. */
const CONFIG_EXAMPLE_FILE = '.build.config.example.json';
/** Absolute path to the mod source folder (Mods/src/). */
const SOURCE_DIR = path.join(PROJECT_ROOT, 'Mods', 'src');

/**
 * Recursively counts the number of files in a directory tree.
 *
 * @param {string} dir - Absolute path to the directory to count.
 * @returns {Promise<number>} Total number of files (excludes directories).
 */
async function countFiles(dir) {
  let count = 0;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += await countFiles(path.join(dir, entry.name));
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * Deploys the mod to the configured game Mods directory.
 *
 * Reads build.config.json from the project root, validates deployPath and modID,
 * then performs a clean delete-and-copy of Mods/src/ to
 * <deployPath>/<modID>/.
 *
 * Error handling: all validation failures print a human-readable message
 * to stderr and call process.exit(1). The destructive rm step only runs
 * AFTER the source folder is confirmed to exist, preventing a half-deleted
 * state with no source to restore from.
 *
 * Can be invoked directly:
 *   node scripts/build.mjs
 * Or imported and called programmatically:
 *   import { build } from "./build.mjs"; await build();
 *
 * @returns {Promise<void>}
 */
export async function build() {
  // -- 0. Merge XML fragments (if xml/ directory exists)
  const mergeResult = await mergeXmlFragments();
  if (mergeResult) {
    info(`Merged ${mergeResult.totalFragments} fragment(s) into ${mergeResult.perFile.length} XML file(s).`);
    console.log('');
  }

  // -- 1. Merge translations (if per-entry directories exist)
  const translationResult = await mergeTranslations();
  if (translationResult) {
    const langList = translationResult.languages.join(', ');
    info(`Merged ${translationResult.totalStrings} string(s) across ${translationResult.languages.length} language(s) [${langList}] into ${translationResult.filesWritten} localization file(s).`);
    console.log('');
  }

  // -- 1.5. Verify translation key integrity (fail build on missing English keys)
  const verifyResult = await verifyTranslationKeys();
  if (!verifyResult.passed) {
    error('Build aborted: missing translation keys detected (see above).');
    process.exit(1);
  }
  if (verifyResult.totalFragmentKeys > 0) {
    console.log('');
  }

  // -- 2. Config file presence
  if (!existsSync(CONFIG_FILE)) {
    error('build.config.json not found. Copy ' + CONFIG_EXAMPLE_FILE + ' to build.config.json and set your deployPath.');
    process.exit(1);
  }

  // -- 2. Parse config
  let config;
  try {
    const raw = await readFile(CONFIG_FILE, 'utf-8');
    config = JSON.parse(raw);
  } catch (err) {
    error('Failed to parse build.config.json: ' + err.message);
    process.exit(1);
  }

  const { deployPath, modID } = config;

  // -- 3. Validate deployPath (present, non-empty, must be an existing directory)

  if (!deployPath || typeof deployPath !== 'string' || deployPath.trim() === '') {
    error('build.config.json is missing a valid deployPath. See ' + CONFIG_EXAMPLE_FILE + ' for the expected format.');
    process.exit(1);
  }

  const resolvedDeployPath = path.resolve(deployPath.trim());

  let deployStat;
  try {
    deployStat = await stat(resolvedDeployPath);
  } catch {
    error('deployPath does not exist or is not accessible: ' + resolvedDeployPath);
    process.exit(1);
  }

  if (!deployStat.isDirectory()) {
    error('deployPath is not a directory: ' + resolvedDeployPath);
    process.exit(1);
  }

  // -- 4a. Validate modID (present, non-empty string)
  if (!modID || typeof modID !== 'string' || modID.trim() === '') {
    error('build.config.json is missing a valid modID. See ' + CONFIG_EXAMPLE_FILE + ' for the expected format.');
    process.exit(1);
  }

  // -- 4b. Validate source folder exists before any destructive operation
  if (!existsSync(SOURCE_DIR)) {
    error('Source folder not found: ' + SOURCE_DIR);
    process.exit(1);
  }

  const targetDir = path.join(resolvedDeployPath, modID.trim());

  info('Source : ' + SOURCE_DIR);
  info('Target : ' + targetDir);
  console.log('');

  // -- 5. Clean existing target, then copy
  if (existsSync(targetDir)) {
    step('Removing existing target folder...');
    await rm(targetDir, { recursive: true, force: true });
  }

  step('Copying files...');
  await cp(SOURCE_DIR, targetDir, { recursive: true });

  // -- 6. Report
  const fileCount = await countFiles(targetDir);
  console.log('');
  success('Build complete. ' + fileCount + ' file(s) deployed to:');
  console.log('  ' + targetDir);
}

// -- Direct invocation guard
// Runs build() automatically when called as: node scripts/build.mjs
// Has no effect when this file is imported as a module.
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  build().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}
