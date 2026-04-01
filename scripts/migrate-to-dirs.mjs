/**
 * One-time migration script: flat XML fragments → per-entry directories.
 *
 * For each fragment file in xml/<category>/<Name>.xml (excluding effects/,
 * core-items-mods/, and _-prefixed files), this script:
 *
 *   1. Creates xml/<category>/<Name>/
 *   2. Moves the fragment to xml/<category>/<Name>/fragment.xml
 *   3. Extracts all translatable strings from the fragment
 *   4. Generates xml/<category>/<Name>/en.xml with the English translations
 *   5. Replaces the plain text in fragment.xml with TXT_BMB_* keys
 *
 * The script is idempotent: if a directory already exists with fragment.xml,
 * that entry is skipped.
 *
 * Usage:
 *   node scripts/migrate-to-dirs.mjs
 *
 * @module migrate-to-dirs
 */

import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { success, error, warn, info, step } from './lib/output.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const XML_DIR = path.join(PROJECT_ROOT, 'xml');

/** Line ending used in all generated output. */
const EOL = '\r\n';

/**
 * Categories that should be migrated to per-entry directories.
 * Categories NOT in this list stay as flat files.
 */
const TRANSLATABLE_CATEGORIES = [
  { subfolder: 'items',      category: 'ITEMS' },
  { subfolder: 'weapons',    category: 'WEAPONS' },
  { subfolder: 'armor',      category: 'ARMOR' },
  { subfolder: 'clothes',    category: 'CLOTHES' },
  { subfolder: 'spells',     category: 'SPELLS' },
  { subfolder: 'abilities',  category: 'ABILITIES' },
  { subfolder: 'units',      category: 'UNITS' },
  { subfolder: 'unit-stats', category: 'UNITSTATS' },
];

// ─── Key generation ──────────────────────────────────────────

/**
 * Generates a TXT_BMB_* localization key.
 *
 * @param {string} category - Category code (e.g. 'ITEMS', 'WEAPONS').
 * @param {string} internalName - The InternalName attribute value.
 * @param {string} field - Field suffix (e.g. 'DISPLAYNAME', 'PROVIDES_1').
 * @returns {string} The full key string.
 */
function makeKey(category, internalName, field) {
  const nameUpper = internalName.toUpperCase();
  return `TXT_BMB_${category}_${nameUpper}_${field}`;
}

// ─── XML text extraction helpers ─────────────────────────────

/**
 * Extracts the text content of a simple XML element.
 * Handles multi-line content and XML entities.
 *
 * @param {string} xml - The XML text to search.
 * @param {string} tag - The element tag name (without angle brackets).
 * @param {number} [startPos=0] - Position to start searching from.
 * @returns {{ text: string, start: number, end: number } | null}
 *   The extracted text and its position range, or null if not found.
 */
function extractElement(xml, tag, startPos = 0) {
  const openTag = `<${tag}>`;
  const closeTag = `</${tag}>`;
  const start = xml.indexOf(openTag, startPos);
  if (start === -1) return null;
  const contentStart = start + openTag.length;
  const end = xml.indexOf(closeTag, contentStart);
  if (end === -1) return null;
  const text = xml.slice(contentStart, end);
  return { text, start, end: end + closeTag.length };
}

/**
 * Finds the boundaries of a <GameModifier> block at a given position.
 *
 * @param {string} xml - The XML text.
 * @param {number} startPos - Position to start searching from.
 * @returns {{ start: number, end: number, content: string } | null}
 */
function findGameModifierBlock(xml, startPos) {
  const openTag = '<GameModifier>';
  const closeTag = '</GameModifier>';
  const start = xml.indexOf(openTag, startPos);
  if (start === -1) return null;
  const end = xml.indexOf(closeTag, start);
  if (end === -1) return null;
  const content = xml.slice(start + openTag.length, end);
  return { start, end: end + closeTag.length, content };
}

/**
 * Finds the boundaries of an <AbilityBonusOption> block.
 *
 * @param {string} xml - The XML text.
 * @param {number} startPos - Position to start searching from.
 * @returns {{ start: number, end: number, content: string, internalName: string | null, openTagEnd: number } | null}
 */
function findAbilityBonusOptionBlock(xml, startPos) {
  const openTagPrefix = '<AbilityBonusOption';
  const closeTag = '</AbilityBonusOption>';
  const start = xml.indexOf(openTagPrefix, startPos);
  if (start === -1) return null;
  const openTagEnd = xml.indexOf('>', start);
  if (openTagEnd === -1) return null;
  const end = xml.indexOf(closeTag, openTagEnd);
  if (end === -1) return null;
  const content = xml.slice(openTagEnd + 1, end);
  // Extract InternalName from the opening tag
  const openTagText = xml.slice(start, openTagEnd + 1);
  const match = openTagText.match(/InternalName="([^"]+)"/);
  const internalName = match ? match[1] : null;
  return { start, end: end + closeTag.length, content, internalName, openTagEnd };
}

// ─── Translation extraction per fragment type ─────────────────

/**
 * Extracts translatable strings from a GameItemType fragment (items, weapons, armor, clothes).
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code (e.g. 'ITEMS').
 * @param {string} internalName - The InternalName of the entry.
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractGameItemType(xml, category, internalName) {
  const translations = [];
  const allReplacements = [];

  // 1. DisplayName (top-level — before first GameModifier)
  const firstModPos = xml.indexOf('<GameModifier>');
  const topLevelEnd = firstModPos === -1 ? xml.length : firstModPos;
  const displayNameEl = extractElement(xml.slice(0, topLevelEnd), 'DisplayName');
  if (displayNameEl) {
    const key = makeKey(category, internalName, 'DISPLAYNAME');
    translations.push({ key, text: displayNameEl.text.trim() });
    allReplacements.push({
      start: displayNameEl.start + '<DisplayName>'.length,
      end: displayNameEl.end - '</DisplayName>'.length,
      key,
    });
  }

  // 2. Description (top-level)
  const descEl = extractElement(xml.slice(0, topLevelEnd), 'Description');
  if (descEl) {
    const key = makeKey(category, internalName, 'DESCRIPTION');
    translations.push({ key, text: descEl.text.trim() });
    allReplacements.push({
      start: descEl.start + '<Description>'.length,
      end: descEl.end - '</Description>'.length,
      key,
    });
  }

  // 3. <Provides> inside <GameModifier> blocks — indexed
  let modPos = 0;
  let providesIndex = 1;
  while (true) {
    const block = findGameModifierBlock(xml, modPos);
    if (!block) break;
    const providesEl = extractElement(block.content, 'Provides');
    if (providesEl) {
      const blockContentStart = block.start + '<GameModifier>'.length;
      const absStart = blockContentStart + providesEl.start + '<Provides>'.length;
      const absEnd = blockContentStart + providesEl.end - '</Provides>'.length;
      const key = makeKey(category, internalName, `PROVIDES_${providesIndex}`);
      translations.push({ key, text: providesEl.text.trim() });
      allReplacements.push({ start: absStart, end: absEnd, key });
      providesIndex++;
    }
    modPos = block.end;
  }

  // Apply all replacements in reverse order to preserve positions
  allReplacements.sort((a, b) => b.start - a.start);
  let modifiedXml = xml;
  for (const { start, end, key } of allReplacements) {
    modifiedXml = modifiedXml.slice(0, start) + key + modifiedXml.slice(end);
  }

  return { translations, modifiedXml };
}

/**
 * Extracts translatable strings from a SpellDef fragment.
 * Handles top-level DisplayName/Description and <GameModifier><DisplayName>.
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code ('SPELLS').
 * @param {string} internalName - The InternalName of the spell.
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractSpellDef(xml, category, internalName) {
  const translations = [];
  const allReplacements = [];

  // 1. Top-level DisplayName (before first GameModifier)
  const firstModPos = xml.indexOf('<GameModifier>');
  const topLevelEnd = firstModPos === -1 ? xml.length : firstModPos;

  const displayNameEl = extractElement(xml.slice(0, topLevelEnd), 'DisplayName');
  if (displayNameEl) {
    const key = makeKey(category, internalName, 'DISPLAYNAME');
    translations.push({ key, text: displayNameEl.text.trim() });
    allReplacements.push({
      start: displayNameEl.start + '<DisplayName>'.length,
      end: displayNameEl.end - '</DisplayName>'.length,
      key,
    });
  }

  // 2. Top-level Description
  const descEl = extractElement(xml.slice(0, topLevelEnd), 'Description');
  if (descEl) {
    const key = makeKey(category, internalName, 'DESCRIPTION');
    translations.push({ key, text: descEl.text.trim() });
    allReplacements.push({
      start: descEl.start + '<Description>'.length,
      end: descEl.end - '</Description>'.length,
      key,
    });
  }

  // 3. <DisplayName> inside <GameModifier> blocks — indexed as MODIFIER_N_DISPLAYNAME
  let modPos = 0;
  let modIndex = 1;
  while (true) {
    const block = findGameModifierBlock(xml, modPos);
    if (!block) break;
    const modDisplayNameEl = extractElement(block.content, 'DisplayName');
    if (modDisplayNameEl) {
      const blockContentStart = block.start + '<GameModifier>'.length;
      const absStart = blockContentStart + modDisplayNameEl.start + '<DisplayName>'.length;
      const absEnd = blockContentStart + modDisplayNameEl.end - '</DisplayName>'.length;
      const key = makeKey(category, internalName, `MODIFIER_${modIndex}_DISPLAYNAME`);
      translations.push({ key, text: modDisplayNameEl.text.trim() });
      allReplacements.push({ start: absStart, end: absEnd, key });
    }
    modIndex++;
    modPos = block.end;
  }

  // Apply in reverse order
  allReplacements.sort((a, b) => b.start - a.start);
  let modifiedXml = xml;
  for (const { start, end, key } of allReplacements) {
    modifiedXml = modifiedXml.slice(0, start) + key + modifiedXml.slice(end);
  }

  return { translations, modifiedXml };
}

/**
 * Extracts translatable strings from a UnitType fragment.
 * Handles DisplayName and Backstory.
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code ('UNITS').
 * @param {string} internalName - The InternalName of the unit.
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractUnitType(xml, category, internalName) {
  const translations = [];
  const allReplacements = [];

  const displayNameEl = extractElement(xml, 'DisplayName');
  if (displayNameEl) {
    const key = makeKey(category, internalName, 'DISPLAYNAME');
    translations.push({ key, text: displayNameEl.text.trim() });
    allReplacements.push({
      start: displayNameEl.start + '<DisplayName>'.length,
      end: displayNameEl.end - '</DisplayName>'.length,
      key,
    });
  }

  const backstoryEl = extractElement(xml, 'Backstory');
  if (backstoryEl) {
    const key = makeKey(category, internalName, 'BACKSTORY');
    translations.push({ key, text: backstoryEl.text.trim() });
    allReplacements.push({
      start: backstoryEl.start + '<Backstory>'.length,
      end: backstoryEl.end - '</Backstory>'.length,
      key,
    });
  }

  allReplacements.sort((a, b) => b.start - a.start);
  let modifiedXml = xml;
  for (const { start, end, key } of allReplacements) {
    modifiedXml = modifiedXml.slice(0, start) + key + modifiedXml.slice(end);
  }

  return { translations, modifiedXml };
}

/**
 * Extracts translatable strings from a UnitStatType fragment.
 * Handles DisplayName and Description.
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code ('UNITSTATS').
 * @param {string} internalName - The InternalName of the unit stat.
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractUnitStatType(xml, category, internalName) {
  const translations = [];
  const allReplacements = [];

  const displayNameEl = extractElement(xml, 'DisplayName');
  if (displayNameEl) {
    const key = makeKey(category, internalName, 'DISPLAYNAME');
    translations.push({ key, text: displayNameEl.text.trim() });
    allReplacements.push({
      start: displayNameEl.start + '<DisplayName>'.length,
      end: displayNameEl.end - '</DisplayName>'.length,
      key,
    });
  }

  const descEl = extractElement(xml, 'Description');
  if (descEl) {
    const key = makeKey(category, internalName, 'DESCRIPTION');
    translations.push({ key, text: descEl.text.trim() });
    allReplacements.push({
      start: descEl.start + '<Description>'.length,
      end: descEl.end - '</Description>'.length,
      key,
    });
  }

  allReplacements.sort((a, b) => b.start - a.start);
  let modifiedXml = xml;
  for (const { start, end, key } of allReplacements) {
    modifiedXml = modifiedXml.slice(0, start) + key + modifiedXml.slice(end);
  }

  return { translations, modifiedXml };
}

/**
 * Extracts translatable strings from an AbilityBonus fragment.
 * Handles AbilityBonusOption children: DisplayName, Description, and Provides.
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code ('ABILITIES').
 * @param {string} _internalName - The InternalName of the AbilityBonus (unused; option names used instead).
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractAbilityBonus(xml, category, _internalName) {
  const translations = [];
  const allReplacements = [];

  let optPos = 0;
  while (true) {
    const optBlock = findAbilityBonusOptionBlock(xml, optPos);
    if (!optBlock) break;

    const optName = optBlock.internalName;
    if (!optName) {
      optPos = optBlock.end;
      continue;
    }

    // blockContentStart is the position right after the closing '>' of the opening tag
    const blockContentStart = optBlock.openTagEnd + 1;

    // DisplayName inside this option
    const displayNameEl = extractElement(optBlock.content, 'DisplayName');
    if (displayNameEl) {
      const key = makeKey(category, optName, 'DISPLAYNAME');
      translations.push({ key, text: displayNameEl.text.trim() });
      allReplacements.push({
        start: blockContentStart + displayNameEl.start + '<DisplayName>'.length,
        end: blockContentStart + displayNameEl.end - '</DisplayName>'.length,
        key,
      });
    }

    // Description inside this option
    const descEl = extractElement(optBlock.content, 'Description');
    if (descEl) {
      const key = makeKey(category, optName, 'DESCRIPTION');
      translations.push({ key, text: descEl.text.trim() });
      allReplacements.push({
        start: blockContentStart + descEl.start + '<Description>'.length,
        end: blockContentStart + descEl.end - '</Description>'.length,
        key,
      });
    }

    // Provides inside GameModifier blocks within this option
    let modPos = 0;
    let providesIndex = 1;
    while (true) {
      const block = findGameModifierBlock(optBlock.content, modPos);
      if (!block) break;
      const providesEl = extractElement(block.content, 'Provides');
      if (providesEl) {
        const modContentStart = block.start + '<GameModifier>'.length;
        const absStart = blockContentStart + modContentStart + providesEl.start + '<Provides>'.length;
        const absEnd = blockContentStart + modContentStart + providesEl.end - '</Provides>'.length;
        const key = makeKey(category, optName, `PROVIDES_${providesIndex}`);
        translations.push({ key, text: providesEl.text.trim() });
        allReplacements.push({ start: absStart, end: absEnd, key });
        providesIndex++;
      }
      modPos = block.end;
    }

    optPos = optBlock.end;
  }

  allReplacements.sort((a, b) => b.start - a.start);
  let modifiedXml = xml;
  for (const { start, end, key } of allReplacements) {
    modifiedXml = modifiedXml.slice(0, start) + key + modifiedXml.slice(end);
  }

  return { translations, modifiedXml };
}

// ─── Fragment type detection ──────────────────────────────────

/**
 * Determines the root element type of a fragment to select the right extractor.
 *
 * @param {string} xml - The fragment XML text.
 * @returns {string} One of: 'GameItemType', 'SpellDef', 'UnitType', 'UnitStatType', 'AbilityBonus', 'unknown'.
 */
function detectFragmentType(xml) {
  if (xml.includes('<GameItemType ') || xml.includes('<GameItemType>')) return 'GameItemType';
  if (xml.includes('<SpellDef ') || xml.includes('<SpellDef>')) return 'SpellDef';
  if (xml.includes('<UnitType ') || xml.includes('<UnitType>')) return 'UnitType';
  if (xml.includes('<UnitStatType ') || xml.includes('<UnitStatType>')) return 'UnitStatType';
  if (xml.includes('<AbilityBonus ') || xml.includes('<AbilityBonus>')) return 'AbilityBonus';
  return 'unknown';
}

/**
 * Extracts translatable strings from a fragment based on its type.
 *
 * @param {string} xml - The full fragment XML text.
 * @param {string} category - Category code.
 * @param {string} internalName - The InternalName of the entry.
 * @returns {{ translations: Array<{key: string, text: string}>, modifiedXml: string }}
 */
function extractTranslations(xml, category, internalName) {
  const fragmentType = detectFragmentType(xml);

  switch (fragmentType) {
    case 'GameItemType':
      return extractGameItemType(xml, category, internalName);
    case 'SpellDef':
      return extractSpellDef(xml, category, internalName);
    case 'UnitType':
      return extractUnitType(xml, category, internalName);
    case 'UnitStatType':
      return extractUnitStatType(xml, category, internalName);
    case 'AbilityBonus':
      return extractAbilityBonus(xml, category, internalName);
    default:
      warn(`  Unknown fragment type for InternalName="${internalName}" — skipping translation extraction.`);
      return { translations: [], modifiedXml: xml };
  }
}

// ─── Translation file format ──────────────────────────────────

/**
 * Escapes special XML characters in text content.
 *
 * @param {string} text - Raw text.
 * @returns {string} XML-safe text.
 */
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates the content of an en.xml translation file from a list of
 * key→text pairs.
 *
 * The format uses a simplified <Translation> wrapper with one element per
 * translatable string. The element name is derived from the key suffix:
 *   - *_DISPLAYNAME            → <DisplayName>
 *   - *_DESCRIPTION            → <Description>
 *   - *_PROVIDES_N             → <Provides index="N">
 *   - *_BACKSTORY              → <Backstory>
 *   - *_MODIFIER_N_DISPLAYNAME → <ModifierDisplayName index="N">
 *
 * @param {Array<{key: string, text: string}>} translations - Key/text pairs.
 * @returns {string} The XML content of the translation file.
 */
function buildTranslationFile(translations) {
  const lines = [];
  lines.push(`<?xml version="1.0" encoding="utf-8"?>`);
  lines.push(`<Translation>`);

  for (const { key, text } of translations) {
    const safeText = escapeXml(text);

    const modifierMatch = key.match(/_MODIFIER_(\d+)_DISPLAYNAME$/);
    if (modifierMatch) {
      lines.push(`    <ModifierDisplayName index="${modifierMatch[1]}">${safeText}</ModifierDisplayName>`);
      continue;
    }

    const providesMatch = key.match(/_PROVIDES_(\d+)$/);
    if (providesMatch) {
      lines.push(`    <Provides index="${providesMatch[1]}">${safeText}</Provides>`);
      continue;
    }

    if (key.endsWith('_DISPLAYNAME')) {
      lines.push(`    <DisplayName>${safeText}</DisplayName>`);
      continue;
    }

    if (key.endsWith('_DESCRIPTION')) {
      lines.push(`    <Description>${safeText}</Description>`);
      continue;
    }

    if (key.endsWith('_BACKSTORY')) {
      lines.push(`    <Backstory>${safeText}</Backstory>`);
      continue;
    }

    // Fallback: should not happen
    lines.push(`    <!-- Unknown key: ${key} -->`);
  }

  lines.push(`</Translation>`);
  return lines.join(EOL) + EOL;
}

// ─── InternalName extraction from fragment ────────────────────

/**
 * Extracts the InternalName from the root content element of a fragment.
 * Handles GameItemType, SpellDef, UnitType, UnitStatType, AbilityBonus.
 *
 * @param {string} xml - The fragment XML text.
 * @returns {string | null} The InternalName value, or null if not found.
 */
function extractFragmentInternalName(xml) {
  // Find the first element after <Fragment> that has InternalName="..."
  const fragmentStart = xml.indexOf('<Fragment>');
  if (fragmentStart === -1) return null;
  const afterFragment = xml.slice(fragmentStart + '<Fragment>'.length);
  // Find the first opening tag with InternalName
  const match = afterFragment.match(/<\w[^>]*\sInternalName="([^"]+)"/);
  return match ? match[1] : null;
}

// ─── Main migration logic ─────────────────────────────────────

/**
 * Migrates a single flat fragment file to a per-entry directory.
 *
 * @param {string} fragFile - Filename (e.g. 'BirdOfCelerity.xml').
 * @param {string} subDir - Absolute path to the category subfolder.
 * @param {string} category - Category code (e.g. 'ITEMS').
 * @returns {Promise<{ skipped: boolean, stringsExtracted: number }>}
 */
async function migrateFragment(fragFile, subDir, category) {
  const entryName = fragFile.replace(/\.xml$/, '');
  const entryDir = path.join(subDir, entryName);
  const fragmentDest = path.join(entryDir, 'fragment.xml');
  const translationDest = path.join(entryDir, 'en.xml');

  // Idempotency: skip if already migrated
  if (existsSync(fragmentDest)) {
    return { skipped: true, stringsExtracted: 0 };
  }

  const fragPath = path.join(subDir, fragFile);
  const xml = await readFile(fragPath, 'utf-8');

  // Extract InternalName from the fragment
  const internalName = extractFragmentInternalName(xml);
  if (!internalName) {
    warn(`  Could not extract InternalName from ${fragFile} — skipping.`);
    return { skipped: true, stringsExtracted: 0 };
  }

  // Extract translations and get modified XML
  const { translations, modifiedXml } = extractTranslations(xml, category, internalName);

  // Create the entry directory
  await mkdir(entryDir, { recursive: true });

  // Write the modified fragment.xml (with TXT_BMB_* keys)
  await writeFile(fragmentDest, modifiedXml, 'utf-8');

  // Write the en.xml translation file
  if (translations.length > 0) {
    const translationContent = buildTranslationFile(translations);
    await writeFile(translationDest, translationContent, 'utf-8');
  } else {
    // Write an empty translation file as a placeholder
    const emptyContent = `<?xml version="1.0" encoding="utf-8"?>${EOL}<Translation>${EOL}</Translation>${EOL}`;
    await writeFile(translationDest, emptyContent, 'utf-8');
  }

  // Remove the original flat file
  const { unlink } = await import('node:fs/promises');
  await unlink(fragPath);

  return { skipped: false, stringsExtracted: translations.length };
}

/**
 * Main migration entry point.
 * Processes all translatable categories and reports a summary.
 *
 * @returns {Promise<void>}
 */
async function migrate() {
  info('Black Market Bazaar — Fragment Migration to Per-Entry Directories');
  info('===================================================================');
  console.log('');

  if (!existsSync(XML_DIR)) {
    error('xml/ directory not found. Run from the project root.');
    process.exit(1);
  }

  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalStrings = 0;
  const perCategory = [];

  for (const { subfolder, category } of TRANSLATABLE_CATEGORIES) {
    const subDir = path.join(XML_DIR, subfolder);

    if (!existsSync(subDir)) {
      step(`  ${subfolder}/: directory not found, skipping`);
      perCategory.push({ subfolder, migrated: 0, skipped: 0, strings: 0 });
      continue;
    }

    const allEntries = await readdir(subDir, { withFileTypes: true });

    // Only process flat .xml files (not directories, not _-prefixed files)
    const flatFiles = allEntries
      .filter(e => e.isFile() && e.name.endsWith('.xml') && !e.name.startsWith('_'))
      .map(e => e.name)
      .sort();

    // Count already-migrated directories (for reporting)
    const existingDirs = allEntries
      .filter(e => e.isDirectory())
      .length;

    let catMigrated = 0;
    let catSkipped = existingDirs; // Pre-existing dirs count as already done
    let catStrings = 0;

    for (const fragFile of flatFiles) {
      try {
        const result = await migrateFragment(fragFile, subDir, category);
        if (result.skipped) {
          catSkipped++;
        } else {
          catMigrated++;
          catStrings += result.stringsExtracted;
        }
      } catch (err) {
        error(`  Failed to migrate ${subfolder}/${fragFile}: ${err.message}`);
      }
    }

    const statusParts = [];
    if (catMigrated > 0) statusParts.push(`${catMigrated} migrated`);
    if (catSkipped > 0) statusParts.push(`${catSkipped} already done`);
    const status = statusParts.length > 0 ? statusParts.join(', ') : 'nothing to do';

    step(`  ${subfolder}/: ${status} (${catStrings} strings extracted)`);
    perCategory.push({ subfolder, migrated: catMigrated, skipped: catSkipped, strings: catStrings });

    totalMigrated += catMigrated;
    totalSkipped += catSkipped;
    totalStrings += catStrings;
  }

  console.log('');
  info('─── Migration Summary ───────────────────────────────────────');

  for (const cat of perCategory) {
    const parts = [];
    if (cat.migrated > 0) parts.push(`${cat.migrated} migrated`);
    if (cat.skipped > 0) parts.push(`${cat.skipped} already done`);
    const label = parts.length > 0 ? parts.join(', ') : 'nothing to do';
    step(`  ${cat.subfolder}/: ${label} (${cat.strings} strings)`);
  }

  console.log('');
  if (totalMigrated > 0) {
    success(`Migration complete: ${totalMigrated} entries migrated, ${totalStrings} strings extracted.`);
  } else if (totalSkipped > 0) {
    success(`Already up-to-date: ${totalSkipped} entries already in per-entry directory format.`);
  } else {
    info('Nothing to migrate.');
  }

  console.log('');
  info('Next steps:');
  step('  1. Run `npm run build` to merge fragments and generate localization files.');
  step('  2. Verify Mods/src/Data/GameCore/ contains TXT_BMB_* keys.');
  step('  3. Verify Mods/src/Data/Localization/English/ contains localization XML files.');
}

// ─── Direct invocation guard ─────────────────────────────────
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  migrate().catch((err) => {
    error('Unexpected error: ' + err.message);
    process.exit(1);
  });
}