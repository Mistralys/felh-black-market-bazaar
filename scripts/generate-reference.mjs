/**
 * Item reference generator for the Black Market Bazaar mod.
 *
 * Reads the monolithic XML files from Mods/src/Data/GameCore/ and generates
 * a Markdown reference document at docs/references/items.md.
 *
 * DEPENDENCY: The XML files in Mods/src/Data/GameCore/ are generated from
 * fragments in /xml by the merge step in build.mjs. If the generated files
 * are missing or stale, run `npm run build` first (or invoke mergeXmlFragments
 * directly) to regenerate them before running this script.
 *
 * After migration to per-entry directories, item names and descriptions are
 * stored as TXT_BMB_* keys in the GameCore XML files. This script loads the
 * English localization files from Mods/src/Data/Localization/English/ and
 * resolves those keys to their English text before generating the reference.
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
  formatStatName,
  formatEffects,
} from './lib/reference-helpers.mjs';
import { parseGameCoreXml } from './lib/xml-parser.mjs';

const __filename = fileURLToPath(import.meta.url);
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'docs', 'references', 'items.md');

// ─── XML source files (order determines section order) ──────
const SOURCE_FILES = [
  { file: 'BMB_Weapons.xml', id: 'weapons' },
  { file: 'BMB_Armor.xml', id: 'armor' },
  { file: 'BMB_Items.xml', id: 'items' },
  { file: 'BMB_Clothes.xml', id: 'clothes' },
];

// ─── Parse a single XML file ─────────────────────────────────
async function parseItemFile(filePath, keyMap) {
  const xml = await readFile(filePath, 'utf-8');
  const doc = parseGameCoreXml(xml);
  const rawItems = doc?.GameItemTypes?.GameItemType;
  if (!rawItems) return [];

  const items = Array.isArray(rawItems) ? rawItems : [rawItems];
  return items.map((item) => {
    const types = item.Type ? (Array.isArray(item.Type) ? item.Type : [item.Type]) : [];
    const modifiers = item.GameModifier ?? [];
    const internalName = item['@_InternalName'] ?? '';
    const rawDisplayName = item.DisplayName ?? internalName ?? '(unknown)';
    const rawDescription = item.Description ?? '';
    return {
      internalName,
      displayName: resolveKey(String(rawDisplayName), keyMap),
      description: resolveKey(String(rawDescription), keyMap),
      types,
      subtype: item.Subtype ?? null,
      shopValue: item.ShopValue ?? null,
      rarity: item.RarityDisplay ?? null,
      heroOnly: item.HeroOnly === 1 || item.HeroOnly === '1',
      isUsable: item.IsUsable === 1 || item.IsUsable === '1',
      canBeEquipped: item.CanBeEquipped === 1 || item.CanBeEquipped === '1',
      weaponUpgradeType: item.WeaponUpgradeType ?? null,
      effects: formatEffects(modifiers, keyMap),
    };
  });
}

// ─── Categorisation ──────────────────────────────────────────
// Each category: { key, title, anchor, items[] }
function categorise(allSources) {
  const categories = [];

  // --- Weapons ---
  const weaponSource = allSources.find((s) => s.id === 'weapons');
  if (weaponSource) {
    categories.push({
      key: 'weapons',
      title: 'Weapons',
      anchor: 'weapons',
      items: weaponSource.items.slice(),
    });
  }

  // --- Armor (sub-categorised by slot) ---
  const armorSource = allSources.find((s) => s.id === 'armor');
  if (armorSource) {
    const slotOrder = [
      { types: ['Head'], title: 'Head', anchor: 'armor--head' },
      { types: ['Torso'], title: 'Torso', anchor: 'armor--torso' },
      { types: ['Forearms'], title: 'Forearms', anchor: 'armor--forearms' },
      { types: ['LowerBody', 'Lowerbody'], title: 'Legs', anchor: 'armor--legs' },
      { types: ['Boots'], title: 'Boots', anchor: 'armor--boots' },
      { types: ['Defense'], title: 'Shields & Defense', anchor: 'armor--shields--defense' },
      { types: ['Surcoat'], title: 'Cloaks & Surcoats', anchor: 'armor--cloaks--surcoats' },
    ];

    const placed = new Set();
    for (const slot of slotOrder) {
      const matching = armorSource.items.filter((item) => {
        if (placed.has(item.internalName)) return false;
        // Match on the first Type element (primary slot)
        return item.types.length > 0 && slot.types.includes(item.types[0]);
      });
      matching.forEach((m) => placed.add(m.internalName));
      if (matching.length > 0) {
        categories.push({
          key: `armor-${slot.anchor}`,
          title: slot.title,
          anchor: slot.anchor,
          items: matching,
          isSubsection: true,
          parentTitle: 'Armor',
        });
      }
    }

    // Catch-all for armor items that didn't match any slot
    const uncategorised = armorSource.items.filter((item) => !placed.has(item.internalName));
    if (uncategorised.length > 0) {
      categories.push({
        key: 'armor-other',
        title: 'Other Armor',
        anchor: 'armor--other',
        items: uncategorised,
        isSubsection: true,
        parentTitle: 'Armor',
      });
    }
  }

  // --- Items: split into Accessories and Consumables ---
  const itemSource = allSources.find((s) => s.id === 'items');
  if (itemSource) {
    const accessories = itemSource.items.filter((item) => item.canBeEquipped);
    const consumables = itemSource.items.filter((item) => item.isUsable && !item.canBeEquipped);
    // Anything else (shouldn't happen, but just in case)
    const other = itemSource.items.filter(
      (item) => !item.canBeEquipped && !(item.isUsable && !item.canBeEquipped)
    );

    if (accessories.length > 0) {
      categories.push({
        key: 'accessories',
        title: 'Accessories',
        anchor: 'accessories',
        items: accessories,
      });
    }
    if (consumables.length > 0) {
      categories.push({
        key: 'consumables',
        title: 'Consumables',
        anchor: 'consumables',
        items: consumables,
      });
    }
    if (other.length > 0) {
      categories.push({
        key: 'items-other',
        title: 'Other Items',
        anchor: 'other-items',
        items: other,
      });
    }
  }

  // --- Clothing ---
  const clothesSource = allSources.find((s) => s.id === 'clothes');
  if (clothesSource) {
    categories.push({
      key: 'clothing',
      title: 'Clothing',
      anchor: 'clothing',
      items: clothesSource.items.slice(),
    });
  }

  // Sort items alphabetically within each category
  for (const cat of categories) {
    cat.items.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  return categories;
}

// ─── Markdown helpers ────────────────────────────────────────
function buildItemTable(items) {
  const lines = [];
  lines.push('| Name | Rarity | Value | Effects |');
  lines.push('|---|---|---|---|');
  for (const item of items) {
    const name = escapeCell(item.displayName);
    const rarity = item.rarity && item.rarity !== 'Nil' ? item.rarity : '—';
    const value = item.shopValue != null ? String(item.shopValue) : '—';
    const effects = escapeCell(item.effects);
    lines.push(`| ${name} | ${rarity} | ${value} | ${effects} |`);
  }
  return lines.join('\n');
}

// ─── Markdown generation ─────────────────────────────────────
function generateMarkdown(categories) {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const lines = [];

  // Header
  lines.push('# Black Market Bazaar — Item Reference');
  lines.push('');
  lines.push('> Auto-generated by `npm run reference`. Do not edit manually.');
  lines.push('');
  lines.push(`**${totalItems} items** across ${categories.filter((c) => !c.isSubsection).length} categories.`);
  lines.push('');

  // Table of Contents
  lines.push('## Table of Contents');
  lines.push('');

  let currentParent = null;
  for (const cat of categories) {
    if (cat.isSubsection) {
      if (cat.parentTitle !== currentParent) {
        // Calculate total items for this parent group
        const parentTotal = categories
          .filter((c) => c.parentTitle === cat.parentTitle)
          .reduce((sum, c) => sum + c.items.length, 0);
        lines.push(`- **${cat.parentTitle}** (${parentTotal})`);
        currentParent = cat.parentTitle;
      }
      lines.push(`  - [${cat.title} (${cat.items.length})](#${cat.anchor})`);
    } else {
      currentParent = null;
      lines.push(`- [${cat.title} (${cat.items.length})](#${cat.anchor})`);
    }
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  // Sections
  currentParent = null;
  for (const cat of categories) {
    if (cat.isSubsection) {
      if (cat.parentTitle !== currentParent) {
        lines.push(`## ${cat.parentTitle}`);
        lines.push('');
        currentParent = cat.parentTitle;
      }
      lines.push(`### ${cat.title}`);
    } else {
      currentParent = null;
      lines.push(`## ${cat.title}`);
    }
    lines.push('');
    lines.push(buildItemTable(cat.items));
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Main entry point ────────────────────────────────────────

/**
 * Generates the items reference document.
 *
 * @param {Map<string, string> | null} keyMap - Pre-loaded localization key map.
 *   If null (standalone mode), the function runs merge + loads keys itself.
 *   If provided (umbrella mode), skips the merge/load step.
 * @returns {Promise<{ outputFile: string, totalItems: number }>}
 */
export async function generateReference(keyMap = null) {
  // Standalone mode: run merge + load keys
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

  // Warn if any expected source file is missing
  for (const src of SOURCE_FILES) {
    const filePath = path.join(GAMECORE_DIR, src.file);
    if (!existsSync(filePath)) {
      warn(`Source file missing: ${src.file}. Run 'npm run build' to generate it from xml/ fragments.`);
    }
  }

  info('Parsing XML source files...');

  const allSources = [];
  for (const src of SOURCE_FILES) {
    const filePath = path.join(GAMECORE_DIR, src.file);
    step(`  ${src.file}`);
    const items = await parseItemFile(filePath, keyMap);
    allSources.push({ id: src.id, items });
  }

  const totalParsed = allSources.reduce((sum, s) => sum + s.items.length, 0);
  info(`Parsed ${totalParsed} items from ${SOURCE_FILES.length} files.`);

  step('Categorising items...');
  const categories = categorise(allSources);

  step('Generating Markdown...');
  const markdown = generateMarkdown(categories);

  const outputDir = path.dirname(OUTPUT_FILE);
  await mkdir(outputDir, { recursive: true });
  await writeFile(OUTPUT_FILE, markdown, 'utf-8');

  console.log('');
  success(`Reference written to: ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`);

  return { outputFile: OUTPUT_FILE, totalItems: totalParsed };
}

// ─── Direct invocation guard ─────────────────────────────────
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMain) {
  generateReference().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}
