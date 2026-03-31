/**
 * XML fragment merge module.
 *
 * Assembles individual XML fragment files from the /xml directory into
 * monolithic XML files in Mods/src/Data/GameCore/. Each fragment is a
 * complete XML document with a <Fragment> wrapper that gets stripped
 * during merge.
 *
 * This module is imported by build.mjs and runs as the first phase of
 * the build pipeline, before the deploy step.
 *
 * @module merge-xml
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { info, step, error } from './output.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const XML_DIR = path.join(PROJECT_ROOT, 'xml');
const GAMECORE_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'GameCore');

/** Line ending used in all generated output (matches original files). */
const EOL = '\r\n';

/**
 * Mapping table: each entry connects a subfolder to its output file,
 * root element, optional prolog extras, and optional meta file.
 */
const MERGE_CONFIG = [
  { subfolder: 'items',           outputFile: 'BMB_Items.xml',                    rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null },
  { subfolder: 'weapons',         outputFile: 'BMB_Weapons.xml',                  rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null },
  { subfolder: 'armor',           outputFile: 'BMB_Armor.xml',                    rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null },
  { subfolder: 'clothes',         outputFile: 'BMB_Clothes.xml',                  rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null },
  { subfolder: 'spells',          outputFile: 'BMB_Spells.xml',                   rootElement: 'Spells',             comment: true,  standalone: false, metaFile: null },
  { subfolder: 'abilities',       outputFile: 'BMB_Abilities.xml',                rootElement: 'AbilityBonuses',     comment: true,  standalone: false, metaFile: '_meta.xml' },
  { subfolder: 'effects',         outputFile: 'BMB_Effects.xml',                  rootElement: 'EffectBlueprints',   comment: true,  standalone: false, metaFile: null },
  { subfolder: 'units',           outputFile: 'BMB_Units.xml',                    rootElement: 'UnitTypes',          comment: true,  standalone: false, metaFile: null },
  { subfolder: 'unit-stats',      outputFile: 'BMB_UnitStats.xml',                rootElement: 'PlayerAbilityTypes', comment: true,  standalone: false, metaFile: null },
  { subfolder: 'core-items-mods', outputFile: 'BMB_CoreItemsModifications.xml',   rootElement: 'GameItemTypes',      comment: false, standalone: true,  metaFile: null },
];

/**
 * Extracts the inner content from a fragment file, stripping the XML
 * prolog and <Fragment>/<\/Fragment> wrapper.
 *
 * The extraction is text-based to preserve original formatting exactly.
 *
 * @param {string} text - The full fragment file content.
 * @returns {string} The inner content between <Fragment> and </Fragment>.
 */
function extractFragmentContent(text) {
  // Normalise line endings to \n for processing, then convert back
  const normalised = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalised.split('\n');

  // Find the line containing <Fragment> and </Fragment>
  let startLine = -1;
  let endLine = -1;

  for (let i = 0; i < lines.length; i++) {
    if (startLine === -1 && lines[i].includes('<Fragment>')) {
      startLine = i;
    }
    if (lines[i].includes('</Fragment>')) {
      endLine = i;
    }
  }

  if (startLine === -1 || endLine === -1) {
    throw new Error('Fragment file does not contain <Fragment> wrapper');
  }

  // Take everything between the <Fragment> line and </Fragment> line
  const innerLines = lines.slice(startLine + 1, endLine);
  return innerLines.join(EOL);
}

/**
 * Merges all XML fragments from the /xml directory into monolithic
 * XML files in Mods/src/Data/GameCore/.
 *
 * @returns {Promise<{totalFragments: number, perFile: Array<{file: string, count: number}>}>}
 *   Summary of the merge operation.
 */
export async function mergeXmlFragments() {
  // Check that the xml/ directory exists
  if (!existsSync(XML_DIR)) {
    info('xml/ directory not found — skipping fragment merge.');
    return null;
  }

  // Check that at least one subfolder has fragments
  let hasAnyFragments = false;
  for (const config of MERGE_CONFIG) {
    const subDir = path.join(XML_DIR, config.subfolder);
    if (existsSync(subDir)) {
      const files = await readdir(subDir);
      if (files.some(f => f.endsWith('.xml') && !f.startsWith('_'))) {
        hasAnyFragments = true;
        break;
      }
    }
  }

  if (!hasAnyFragments) {
    info('xml/ directory exists but contains no fragments — skipping merge.');
    return null;
  }

  info('Merging XML fragments...');

  let totalFragments = 0;
  const perFile = [];

  for (const config of MERGE_CONFIG) {
    const { subfolder, outputFile, rootElement, comment, standalone, metaFile } = config;
    const subDir = path.join(XML_DIR, subfolder);

    if (!existsSync(subDir)) {
      step(`  ${subfolder}/: directory not found, skipping`);
      perFile.push({ file: outputFile, count: 0 });
      continue;
    }

    // Read all .xml files, excluding files starting with _
    const allFiles = await readdir(subDir);
    const fragmentFiles = allFiles
      .filter(f => f.endsWith('.xml') && !f.startsWith('_'))
      .sort(); // Alphabetical for deterministic output

    // Read and extract fragment contents
    const fragmentContents = [];
    for (const fragFile of fragmentFiles) {
      const fragPath = path.join(subDir, fragFile);
      const text = await readFile(fragPath, 'utf-8');
      try {
        const content = extractFragmentContent(text);
        fragmentContents.push(content);
      } catch (err) {
        error(`  Failed to extract content from ${subfolder}/${fragFile}: ${err.message}`);
      }
    }

    // Read meta file if specified
    let metaContent = null;
    if (metaFile) {
      const metaPath = path.join(subDir, metaFile);
      if (existsSync(metaPath)) {
        const metaText = await readFile(metaPath, 'utf-8');
        try {
          metaContent = extractFragmentContent(metaText);
        } catch (err) {
          error(`  Failed to extract meta content from ${subfolder}/${metaFile}: ${err.message}`);
        }
      }
    }

    // Assemble the final XML
    const parts = [];

    // XML prolog
    if (standalone) {
      parts.push(`<?xml version="1.0" encoding="utf-8" standalone="yes"?>`);
    } else {
      parts.push(`<?xml version="1.0" encoding="utf-8"?>`);
    }

    // Comment line
    if (comment) {
      parts.push(`<!-- Black Market Bazaar by Hellions -->`);
    }

    // Root opening tag
    parts.push(`<${rootElement}>`);

    // Meta content (e.g., DataChecksum for abilities)
    if (metaContent) {
      parts.push(metaContent);
    }

    // Fragment contents
    for (const content of fragmentContents) {
      parts.push(content);
    }

    // Root closing tag
    parts.push(`</${rootElement}>`);

    const assembled = parts.join(EOL) + EOL;

    // Write to output
    const outputPath = path.join(GAMECORE_DIR, outputFile);
    await writeFile(outputPath, assembled, 'utf-8');

    step(`  ${subfolder}/: ${fragmentFiles.length} fragment(s) → ${outputFile}`);
    totalFragments += fragmentFiles.length;
    perFile.push({ file: outputFile, count: fragmentFiles.length });
  }

  return { totalFragments, perFile };
}
