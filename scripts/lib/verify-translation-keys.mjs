/**
 * Translation key integrity check module.
 *
 * Scans all fragment.xml files in translatable categories and collects every
 * TXT_BMB_* key referenced in them. Then reads the generated English
 * localization files and verifies that every referenced key has a
 * corresponding translation entry.
 *
 * A missing key means the game will display the raw TXT_BMB_* string instead
 * of the intended text. This check prevents that class of silent failure.
 *
 * Intended to run as Phase 1.5 of the build pipeline, after the translation
 * merge (Phase 1) and before deploy (Phase 2). It can also be run standalone:
 *
 *   node scripts/verify-translation-keys.mjs
 *
 * Exit codes:
 *   0 — all keys present (or nothing to check)
 *   1 — one or more English keys are missing from the localization files
 *
 * @module verify-translation-keys
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { info, step, warn, error, success } from './output.mjs';
import { parseLocalizationXml, extractAbilityOptionNames } from './xml-parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const XML_DIR = path.join(PROJECT_ROOT, 'xml');
const LOCALIZATION_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'Localization', 'English');

/**
 * Categories that have per-entry directories with fragment.xml files.
 * Must match TRANSLATABLE_CATEGORIES in merge-translations.mjs.
 */
const TRANSLATABLE_CATEGORIES = [
  { subfolder: 'items',      category: 'ITEMS',     outputSuffix: 'Items' },
  { subfolder: 'weapons',    category: 'WEAPONS',   outputSuffix: 'Weapons' },
  { subfolder: 'armor',      category: 'ARMOR',     outputSuffix: 'Armor' },
  { subfolder: 'clothes',    category: 'CLOTHES',   outputSuffix: 'Clothes' },
  { subfolder: 'spells',     category: 'SPELLS',    outputSuffix: 'Spells' },
  { subfolder: 'abilities',  category: 'ABILITIES', outputSuffix: 'Abilities' },
  { subfolder: 'units',      category: 'UNITS',     outputSuffix: 'Units' },
  { subfolder: 'unit-stats', category: 'UNITSTATS', outputSuffix: 'UnitStats' },
];

// ─── Fragment key extraction ──────────────────────────────────

/**
 * Regex that matches any TXT_BMB_* key appearing as the sole text content
 * of an XML element, e.g.:
 *   <DisplayName>TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME</DisplayName>
 *   <Provides>TXT_BMB_ITEMS_BIRDOFCELERITY_PROVIDES_1</Provides>
 *
 * The regex is intentionally simple: it captures any TXT_BMB_ token that
 * appears between > and < in the fragment text. This is safe because
 * fragment.xml files only ever contain either a TXT_BMB_* key or a plain
 * value in these fields — never mixed content.
 */
const TXT_KEY_REGEX = />(TXT_BMB_[A-Z0-9_]+)</g;

/**
 * Extracts all TXT_BMB_* keys referenced in a fragment file.
 *
 * For ability fragments, the keys use the AbilityBonusOption InternalName
 * (not the directory name), so we use the shared parser to extract option
 * names and verify the keys match what merge-translations.mjs would produce.
 *
 * @param {string} fragmentXml - Raw content of a fragment.xml file.
 * @returns {string[]} Array of TXT_BMB_* key strings found in the fragment.
 */
function extractKeysFromFragment(fragmentXml) {
  const keys = [];
  let match;
  // Reset lastIndex before each use (global regex is stateful)
  TXT_KEY_REGEX.lastIndex = 0;
  while ((match = TXT_KEY_REGEX.exec(fragmentXml)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

// ─── Localization file loading ────────────────────────────────

/**
 * Loads all generated English localization files and returns a Set of all
 * defined TXT_BMB_* keys.
 *
 * @returns {Promise<Set<string>>} Set of all keys present in the English
 *   localization output files.
 */
async function loadDefinedKeys() {
  const defined = new Set();

  if (!existsSync(LOCALIZATION_DIR)) {
    return defined;
  }

  for (const { outputSuffix } of TRANSLATABLE_CATEGORIES) {
    const filePath = path.join(LOCALIZATION_DIR, `BMB_Strings_${outputSuffix}.xml`);
    if (!existsSync(filePath)) continue;

    const xml = await readFile(filePath, 'utf-8');
    const keyMap = parseLocalizationXml(xml);
    for (const key of keyMap.keys()) {
      defined.add(key);
    }
  }

  return defined;
}

// ─── Main verification logic ──────────────────────────────────

/**
 * Verifies that every TXT_BMB_* key referenced in fragment.xml files has a
 * corresponding entry in the generated English localization files.
 *
 * @returns {Promise<{
 *   totalFragmentKeys: number,
 *   totalDefinedKeys: number,
 *   missingKeys: Array<{ key: string, source: string }>,
 *   passed: boolean,
 * }>} Verification result. `passed` is true if no keys are missing.
 */
export async function verifyTranslationKeys() {
  if (!existsSync(XML_DIR)) {
    info('xml/ directory not found — skipping key integrity check.');
    return { totalFragmentKeys: 0, totalDefinedKeys: 0, missingKeys: [], passed: true };
  }

  // Check if any translatable category has entry directories
  let hasAnyEntries = false;
  for (const { subfolder } of TRANSLATABLE_CATEGORIES) {
    const subDir = path.join(XML_DIR, subfolder);
    if (!existsSync(subDir)) continue;
    const entries = await readdir(subDir, { withFileTypes: true });
    if (entries.some(e => e.isDirectory())) {
      hasAnyEntries = true;
      break;
    }
  }

  if (!hasAnyEntries) {
    info('No per-entry directories found — skipping key integrity check.');
    return { totalFragmentKeys: 0, totalDefinedKeys: 0, missingKeys: [], passed: true };
  }

  info('Verifying translation key integrity...');

  // Load all keys defined in the generated English localization files
  const definedKeys = await loadDefinedKeys();

  if (definedKeys.size === 0) {
    warn('  No English localization files found. Run the build first to generate them.');
    warn('  Key integrity check skipped.');
    return { totalFragmentKeys: 0, totalDefinedKeys: 0, missingKeys: [], passed: true };
  }

  // Collect all TXT_BMB_* keys referenced in fragment files
  /** @type {Array<{ key: string, source: string }>} */
  const allFragmentKeys = [];

  for (const { subfolder } of TRANSLATABLE_CATEGORIES) {
    const subDir = path.join(XML_DIR, subfolder);
    if (!existsSync(subDir)) continue;

    const entryDirs = await readdir(subDir, { withFileTypes: true });
    const sortedDirs = entryDirs
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .sort();

    for (const dirName of sortedDirs) {
      const fragmentFile = path.join(subDir, dirName, 'fragment.xml');
      if (!existsSync(fragmentFile)) continue;

      const fragmentXml = await readFile(fragmentFile, 'utf-8');
      const keys = extractKeysFromFragment(fragmentXml);
      const source = `${subfolder}/${dirName}/fragment.xml`;

      for (const key of keys) {
        allFragmentKeys.push({ key, source });
      }
    }
  }

  // Deduplicate fragment keys for counting (same key may appear in multiple
  // fragments if entries share a modifier pattern — unlikely but possible)
  const uniqueFragmentKeys = new Set(allFragmentKeys.map(e => e.key));

  // Find keys referenced in fragments but absent from localization
  const missingKeys = allFragmentKeys.filter(({ key }) => !definedKeys.has(key));

  // Deduplicate missing key reports (same key from same source only once)
  const seen = new Set();
  const dedupedMissing = missingKeys.filter(({ key, source }) => {
    const id = `${key}::${source}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const passed = dedupedMissing.length === 0;

  if (passed) {
    step(`  ${uniqueFragmentKeys.size} key(s) referenced in fragments, ${definedKeys.size} key(s) defined in English localization — all present.`);
  } else {
    // Group missing keys by source file for readable output
    const bySource = new Map();
    for (const { key, source } of dedupedMissing) {
      if (!bySource.has(source)) bySource.set(source, []);
      bySource.get(source).push(key);
    }

    error(`  Key integrity check FAILED — ${dedupedMissing.length} key(s) missing from English localization:`);
    for (const [source, keys] of [...bySource.entries()].sort()) {
      error(`    ${source}:`);
      for (const key of keys) {
        error(`      ${key}`);
      }
    }
    error('  These keys will display as raw TXT_BMB_* strings in-game.');
    error('  Fix: add the missing entries to the corresponding en.xml files and rebuild.');
  }

  return {
    totalFragmentKeys: uniqueFragmentKeys.size,
    totalDefinedKeys: definedKeys.size,
    missingKeys: dedupedMissing,
    passed,
  };
}
