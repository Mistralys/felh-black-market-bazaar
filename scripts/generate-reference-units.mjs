/**
 * Units reference generator for the Black Market Bazaar mod.
 *
 * Reads BMB_Units.xml from Mods/src/Data/GameCore/ and generates
 * a Markdown reference document at docs/references/units.md.
 *
 * Units are categorised by race type and sorted alphabetically within each
 * race. TXT_BMB_* localization keys are resolved to English text.
 *
 * Accepts an optional pre-loaded keyMap for use by the umbrella generator
 * (generate-all-references.mjs) to avoid redundant merge/load cycles.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { success, error, warn, info, step } from './lib/output.mjs';
import {
  PROJECT_ROOT,
  GAMECORE_DIR,
  ensureFreshBuild,
  loadLocalizationKeys,
  resolveKey,
  escapeCell,
  formatInternalName,
} from './lib/reference-helpers.mjs';
import { parseGameCoreXml } from './lib/xml-parser.mjs';

const __filename = fileURLToPath(import.meta.url);
const SOURCE_FILE = 'BMB_Units.xml';
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'docs', 'references', 'units.md');

// ─── Race name formatting ─────────────────────────────────────

/**
 * Converts a RaceType internal name to a readable label.
 * e.g. "Race_Type_Amarians" → "Amarian"
 *      "Race_Type_Urxen"    → "Urxen"
 *
 * @param {string} raw
 * @returns {string}
 */
function formatRaceName(raw) {
  if (!raw) return '—';
  return String(raw)
    .replace(/^Race_Type_/, '')
    .replace(/_/g, ' ')
    .trim();
}

// ─── Parse units XML ──────────────────────────────────────────

/**
 * Parses BMB_Units.xml and returns a flat array of unit objects.
 *
 * @param {Map<string, string>} keyMap
 * @returns {Promise<Array<object>>}
 */
async function parseUnitsFile(keyMap) {
  const filePath = path.join(GAMECORE_DIR, SOURCE_FILE);
  if (!existsSync(filePath)) {
    warn(`Source file missing: ${SOURCE_FILE}. Run 'npm run build' to generate it.`);
    return [];
  }

  const xml = await readFile(filePath, 'utf-8');
  const doc = parseGameCoreXml(xml);
  const rawUnits = doc?.UnitTypes?.UnitType;
  if (!rawUnits) return [];

  const units = Array.isArray(rawUnits) ? rawUnits : [rawUnits];

  return units.map((unit) => {
    const internalName = unit['@_InternalName'] ?? '';
    const rawDisplayName = unit.DisplayName ?? internalName;

    // SelectedAbilityBonusOption is forced into an array by the parser
    const rawAbilities = unit.SelectedAbilityBonusOption ?? [];
    const abilities = Array.isArray(rawAbilities) ? rawAbilities : [rawAbilities];

    // Extract weapon type from the first EquipmentUpgradeDef that has a WeaponUpgradeType
    let weaponType = '—';
    const rawUpgrades = unit.EquipmentUpgradeDef ?? [];
    const upgrades = Array.isArray(rawUpgrades) ? rawUpgrades : [rawUpgrades];
    for (const upgrade of upgrades) {
      if (upgrade.WeaponUpgradeType) {
        weaponType = String(upgrade.WeaponUpgradeType);
        break;
      }
    }

    return {
      internalName,
      displayName: resolveKey(String(rawDisplayName), keyMap),
      race: formatRaceName(unit.RaceType ?? ''),
      raceRaw: unit.RaceType ?? '',
      gender: unit.Gender ?? '—',
      isAIOnly: unit.IsAIOnlyUnit === 1 || unit.IsAIOnlyUnit === '1',
      abilities: abilities.map((a) => formatInternalName(String(a))).join(', ') || '—',
      weaponType,
    };
  });
}

// ─── Categorisation ───────────────────────────────────────────

/**
 * Groups units by race. Sorts alphabetically within each race group.
 *
 * @param {Array<object>} units
 * @returns {Array<{ title: string, anchor: string, units: Array<object> }>}
 */
function categoriseUnits(units) {
  const groups = new Map();

  for (const unit of units) {
    const race = unit.race || 'Unknown';
    if (!groups.has(race)) groups.set(race, []);
    groups.get(race).push(unit);
  }

  const sortedRaces = [...groups.keys()].sort();

  return sortedRaces.map((race) => {
    const items = groups.get(race).slice().sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );
    return {
      title: race,
      anchor: race.toLowerCase().replace(/\s+/g, '-'),
      units: items,
    };
  });
}

// ─── Markdown generation ──────────────────────────────────────

function buildUnitTable(units) {
  const lines = [];
  lines.push('| Name | Gender | AI Only | Weapon Type | Abilities |');
  lines.push('|---|---|---|---|---|');
  for (const unit of units) {
    const name = escapeCell(unit.displayName);
    const gender = escapeCell(unit.gender);
    const aiOnly = unit.isAIOnly ? 'Yes' : 'No';
    const weapon = escapeCell(unit.weaponType);
    const abilities = escapeCell(unit.abilities);
    lines.push(`| ${name} | ${gender} | ${aiOnly} | ${weapon} | ${abilities} |`);
  }
  return lines.join('\n');
}

function generateMarkdown(categories, totalUnits) {
  const lines = [];

  lines.push('# Black Market Bazaar — Units Reference');
  lines.push('');
  lines.push('> Auto-generated by `npm run reference:units`. Do not edit manually.');
  lines.push('');
  lines.push(`**${totalUnits} units** across ${categories.length} race(s).`);
  lines.push('');

  // Table of Contents
  lines.push('## Table of Contents');
  lines.push('');
  for (const cat of categories) {
    lines.push(`- [${cat.title} (${cat.units.length})](#${cat.anchor})`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Sections
  for (const cat of categories) {
    lines.push(`## ${cat.title}`);
    lines.push('');
    lines.push(buildUnitTable(cat.units));
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Main entry point ─────────────────────────────────────────

/**
 * Generates the units reference document.
 *
 * @param {Map<string, string> | null} keyMap - Pre-loaded localization key map.
 *   If null (standalone mode), runs merge + loads keys itself.
 *   If provided (umbrella mode), skips the merge/load step.
 * @returns {Promise<{ outputFile: string, totalUnits: number }>}
 */
export async function generateUnitsReference(keyMap = null) {
  if (keyMap === null) {
    await ensureFreshBuild();

    step('Loading English localization keys...');
    keyMap = await loadLocalizationKeys();
    if (keyMap.size > 0) {
      step(`  Loaded ${keyMap.size} localization key(s).`);
    } else {
      step('  No localization keys found — TXT_BMB_* keys will appear as-is.');
    }
  }

  info('Parsing units XML...');
  step(`  ${SOURCE_FILE}`);
  const units = await parseUnitsFile(keyMap);
  info(`Parsed ${units.length} unit(s).`);

  step('Categorising units by race...');
  const categories = categoriseUnits(units);

  step('Generating Markdown...');
  const markdown = generateMarkdown(categories, units.length);

  const outputDir = path.dirname(OUTPUT_FILE);
  await mkdir(outputDir, { recursive: true });
  await writeFile(OUTPUT_FILE, markdown, 'utf-8');

  console.log('');
  success(`Reference written to: ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`);

  return { outputFile: OUTPUT_FILE, totalUnits: units.length };
}

// ─── Direct invocation guard ──────────────────────────────────
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMain) {
  generateUnitsReference().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}
