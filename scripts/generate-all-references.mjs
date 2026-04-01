/**
 * Umbrella reference generator for the Black Market Bazaar mod.
 *
 * Runs the merge steps once, loads localization keys once, then calls
 * each individual reference generator with the pre-loaded keyMap to
 * avoid redundant I/O. Generates all six reference documents:
 *
 *   docs/references/items.md
 *   docs/references/spells.md
 *   docs/references/abilities.md
 *   docs/references/units.md
 *   docs/references/unit-stats.md
 *   docs/references/effects.md
 *
 * npm script: npm run reference:all
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { success, error, info, step } from './lib/output.mjs';
import {
  PROJECT_ROOT,
  ensureFreshBuild,
  loadLocalizationKeys,
} from './lib/reference-helpers.mjs';
import { generateReference } from './generate-reference.mjs';
import { generateSpellsReference } from './generate-reference-spells.mjs';
import { generateAbilitiesReference } from './generate-reference-abilities.mjs';
import { generateUnitsReference } from './generate-reference-units.mjs';
import { generateUnitStatsReference } from './generate-reference-unit-stats.mjs';
import { generateEffectsReference } from './generate-reference-effects.mjs';

const __filename = fileURLToPath(import.meta.url);

// ─── Main entry point ─────────────────────────────────────────

/**
 * Generates all reference documents in one pass.
 *
 * Runs the XML fragment merge and translation merge once, loads the
 * English localization key map once, then passes it to each individual
 * generator to avoid redundant work.
 *
 * @returns {Promise<void>}
 */
export async function generateAllReferences() {
  info('=== Generating all reference documents ===');
  console.log('');

  // Step 1: Ensure generated XML and localization files are fresh
  step('Running merge steps...');
  await ensureFreshBuild();
  console.log('');

  // Step 2: Load localization keys once for all generators
  step('Loading English localization keys...');
  const keyMap = await loadLocalizationKeys();
  if (keyMap.size > 0) {
    step(`  Loaded ${keyMap.size} localization key(s).`);
  } else {
    step('  No localization keys found — TXT_BMB_* keys will appear as-is.');
  }
  console.log('');

  // Step 3: Run each generator with the pre-loaded keyMap
  const results = [];
  const generators = [
    { name: 'Items',      fn: () => generateReference(keyMap) },
    { name: 'Spells',     fn: () => generateSpellsReference(keyMap) },
    { name: 'Abilities',  fn: () => generateAbilitiesReference(keyMap) },
    { name: 'Units',      fn: () => generateUnitsReference(keyMap) },
    { name: 'Unit Stats', fn: () => generateUnitStatsReference(keyMap) },
    { name: 'Effects',    fn: () => generateEffectsReference(keyMap) },
  ];

  for (const gen of generators) {
    info(`Generating ${gen.name} reference...`);
    try {
      const result = await gen.fn();
      results.push({ name: gen.name, success: true, result });
    } catch (err) {
      error(`Failed to generate ${gen.name} reference: ${err.message}`);
      results.push({ name: gen.name, success: false, error: err.message });
    }
    console.log('');
  }

  // Step 4: Summary
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  info('=== Summary ===');
  for (const r of succeeded) {
    const outputFile = r.result?.outputFile
      ? path.relative(PROJECT_ROOT, r.result.outputFile)
      : '(unknown)';
    success(`${r.name}: ${outputFile}`);
  }
  if (failed.length > 0) {
    for (const r of failed) {
      error(`${r.name}: FAILED — ${r.error}`);
    }
  }

  console.log('');
  if (failed.length === 0) {
    success(`All ${succeeded.length} reference document(s) generated successfully.`);
  } else {
    error(`${succeeded.length} succeeded, ${failed.length} failed.`);
    process.exit(1);
  }
}

// ─── Direct invocation guard ──────────────────────────────────
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMain) {
  generateAllReferences().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}
