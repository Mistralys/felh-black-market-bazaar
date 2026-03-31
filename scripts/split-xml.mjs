/**
 * One-time migration script: splits monolithic XML files into per-entity fragments.
 *
 * Reads each monolithic XML file from Mods/src/Data/GameCore/ and writes
 * individual fragment files to xml/<subfolder>/<InternalName>.xml.
 *
 * Each fragment is a complete XML document with a <Fragment> wrapper:
 *   <?xml version="1.0" encoding="utf-8"?>
 *   <Fragment>
 *       <GameItemType InternalName="...">
 *           ...
 *       </GameItemType>
 *   </Fragment>
 *
 * Usage:
 *   node scripts/split-xml.mjs
 *
 * This script is idempotent — running it again overwrites existing fragments.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { success, error, info, step } from './lib/output.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const GAMECORE_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'GameCore');
const XML_DIR = path.join(PROJECT_ROOT, 'xml');

/**
 * Mapping from subfolder name to source file and the XML child element tag name.
 * The childTag is the repeating element inside the root (e.g., GameItemType, SpellDef).
 */
const SPLIT_CONFIG = [
  { subfolder: 'items',           file: 'BMB_Items.xml',                    childTag: 'GameItemType' },
  { subfolder: 'weapons',         file: 'BMB_Weapons.xml',                  childTag: 'GameItemType' },
  { subfolder: 'armor',           file: 'BMB_Armor.xml',                    childTag: 'GameItemType' },
  { subfolder: 'clothes',         file: 'BMB_Clothes.xml',                  childTag: 'GameItemType' },
  { subfolder: 'spells',          file: 'BMB_Spells.xml',                   childTag: 'SpellDef' },
  { subfolder: 'abilities',       file: 'BMB_Abilities.xml',                childTag: 'AbilityBonus' },
  { subfolder: 'effects',         file: 'BMB_Effects.xml',                  childTag: 'EffectSequencer' },
  { subfolder: 'units',           file: 'BMB_Units.xml',                    childTag: 'UnitType' },
  { subfolder: 'unit-stats',      file: 'BMB_UnitStats.xml',                childTag: 'UnitStatType' },
  { subfolder: 'core-items-mods', file: 'BMB_CoreItemsModifications.xml',   childTag: 'GameItemType' },
];

/**
 * Extracts all top-level child elements of a given tag from the XML text.
 *
 * Uses regex to find opening tags with InternalName attributes and their
 * matching closing tags. Preserves all original formatting and content.
 *
 * @param {string} text - The full XML file content.
 * @param {string} childTag - The element tag name to extract (e.g., 'GameItemType').
 * @returns {Array<{internalName: string, content: string}>} Extracted entries.
 */
function extractEntries(text, childTag) {
  const entries = [];

  // Match opening tag with InternalName attribute through to closing tag.
  // The regex uses a non-greedy match but anchors on the specific closing tag.
  // We need to handle nested elements of the same tag name carefully.
  // Strategy: find each opening <childTag InternalName="..."> and then find
  // the matching </childTag> by counting nesting depth.

  const openPattern = new RegExp(`([ \\t]*)<${childTag}\\s+InternalName="([^"]+)"`, 'g');
  let match;

  while ((match = openPattern.exec(text)) !== null) {
    const startIndex = match.index;
    const internalName = match[2];
    const indent = match[1];

    // Find the matching closing tag.
    // These XML files don't have nested elements of the same tag name
    // (e.g., no <GameItemType> inside another <GameItemType>), so we
    // can simply find the next </childTag> closing tag.
    const closeTag = `</${childTag}>`;
    let endIndex = text.indexOf(closeTag, startIndex + match[0].length);

    if (endIndex !== -1) {
      endIndex += closeTag.length;
    }

    if (endIndex === -1) {
      console.warn(`  Warning: Could not find closing </${childTag}> for InternalName="${internalName}"`);
      continue;
    }

    // Extract the raw content including the element tags
    let content = text.substring(startIndex, endIndex);

    // Check if there's trailing whitespace on the same line after the closing tag
    const afterClose = text.substring(endIndex);
    const trailingMatch = afterClose.match(/^([ \t]*)/);
    if (trailingMatch && trailingMatch[1]) {
      content += trailingMatch[1];
    }

    entries.push({ internalName, content });
  }

  return entries;
}

/**
 * Extracts the <DataChecksum> element from BMB_Abilities.xml.
 *
 * @param {string} text - The full XML file content.
 * @returns {string|null} The DataChecksum element text, or null if not found.
 */
function extractDataChecksum(text) {
  const startTag = '<DataChecksum';
  const endTag = '</DataChecksum>';

  const startIdx = text.indexOf(startTag);
  if (startIdx === -1) return null;

  const endIdx = text.indexOf(endTag, startIdx);
  if (endIdx === -1) return null;

  return text.substring(startIdx, endIdx + endTag.length);
}

/**
 * Wraps extracted content in a Fragment XML document.
 *
 * @param {string} innerContent - The raw XML element content.
 * @returns {string} Complete fragment XML document.
 */
function wrapInFragment(innerContent) {
  return `<?xml version="1.0" encoding="utf-8"?>\n<Fragment>\n${innerContent}\n</Fragment>\n`;
}

/**
 * Splits a single monolithic XML file into fragment files.
 *
 * @param {object} config - Split configuration entry.
 * @param {string} config.subfolder - Target subfolder under xml/.
 * @param {string} config.file - Source filename in GameCore/.
 * @param {string} config.childTag - XML child element tag name.
 * @returns {Promise<number>} Number of fragments created.
 */
async function splitFile(config) {
  const { subfolder, file, childTag } = config;
  const filePath = path.join(GAMECORE_DIR, file);
  const outputDir = path.join(XML_DIR, subfolder);

  step(`  ${file} → xml/${subfolder}/`);

  let text;
  try {
    text = await readFile(filePath, 'utf-8');
  } catch (err) {
    error(`  Failed to read ${file}: ${err.message}`);
    return 0;
  }

  // Create output directory
  await mkdir(outputDir, { recursive: true });

  // Extract DataChecksum for abilities file
  if (subfolder === 'abilities') {
    const checksum = extractDataChecksum(text);
    if (checksum) {
      const metaPath = path.join(outputDir, '_meta.xml');
      await writeFile(metaPath, wrapInFragment(`    ${checksum}`), 'utf-8');
      step(`    → _meta.xml (DataChecksum)`);
    }
  }

  // Extract entries
  const entries = extractEntries(text, childTag);

  // Check for duplicate InternalNames
  const seen = new Set();
  for (const entry of entries) {
    if (seen.has(entry.internalName)) {
      error(`  Duplicate InternalName in ${file}: "${entry.internalName}"`);
    }
    seen.add(entry.internalName);
  }

  // Write fragment files
  for (const entry of entries) {
    const fragmentPath = path.join(outputDir, `${entry.internalName}.xml`);
    await writeFile(fragmentPath, wrapInFragment(entry.content), 'utf-8');
  }

  return entries.length;
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  info('Splitting monolithic XML files into fragments...');
  console.log('');

  let totalFragments = 0;
  const summary = [];

  for (const config of SPLIT_CONFIG) {
    const count = await splitFile(config);
    totalFragments += count;
    summary.push({ subfolder: config.subfolder, count });
  }

  console.log('');
  info('Summary:');
  for (const { subfolder, count } of summary) {
    step(`  xml/${subfolder}/: ${count} fragment(s)`);
  }

  console.log('');
  success(`Split complete. ${totalFragments} fragment(s) created in xml/.`);
}

main().catch((err) => {
  error('Unexpected error: ' + err.message);
  process.exit(1);
});
