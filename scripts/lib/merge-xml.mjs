/**
 * XML fragment merge module.
 *
 * Assembles individual XML fragment files from the /xml directory into
 * monolithic XML files in Mods/src/Data/GameCore/. Each fragment is a
 * complete XML document with a <Fragment> wrapper that gets stripped
 * during merge.
 *
 * Supports two directory layouts:
 *   - Flat files:        xml/<category>/<Name>.xml
 *   - Entry directories: xml/<category>/<Name>/fragment.xml
 *
 * Categories with translatable content use entry directories (after running
 * migrate-to-dirs.mjs). Categories without translatable content (effects/,
 * core-items-mods/) remain as flat files.
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
 *
 * The `translatable` flag controls fragment discovery:
 *   - true:  scan for entry directories containing fragment.xml
 *            (categories with translatable content — per-entry dirs with en.xml)
 *   - false: scan for flat *.xml files directly in the subfolder
 *            (categories without translatable content, e.g. effects/, core-items-mods/)
 *
 * Mixed mode: if both flat files and entry directories exist in a subfolder,
 * both are collected (supports partial migration states).
 */
const MERGE_CONFIG = [
  { subfolder: 'items',           outputFile: 'BMB_Items.xml',                    rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'weapons',         outputFile: 'BMB_Weapons.xml',                  rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'armor',           outputFile: 'BMB_Armor.xml',                    rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'clothes',         outputFile: 'BMB_Clothes.xml',                  rootElement: 'GameItemTypes',      comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'spells',          outputFile: 'BMB_Spells.xml',                   rootElement: 'Spells',             comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'abilities',       outputFile: 'BMB_Abilities.xml',                rootElement: 'AbilityBonuses',     comment: true,  standalone: false, metaFile: '_meta.xml', translatable: true  },
  { subfolder: 'effects',         outputFile: 'BMB_Effects.xml',                  rootElement: 'EffectBlueprints',   comment: true,  standalone: false, metaFile: null,        translatable: false },
  { subfolder: 'units',           outputFile: 'BMB_Units.xml',                    rootElement: 'UnitTypes',          comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'unit-stats',      outputFile: 'BMB_UnitStats.xml',                rootElement: 'PlayerAbilityTypes', comment: true,  standalone: false, metaFile: null,        translatable: true  },
  { subfolder: 'core-items-mods', outputFile: 'BMB_CoreItemsModifications.xml',   rootElement: 'GameItemTypes',      comment: false, standalone: true,  metaFile: null,        translatable: false },
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
 * Collects all fragment file paths from a category subfolder.
 *
 * Supports two layouts:
 *   - Flat files:        xml/<category>/<Name>.xml
 *   - Entry directories: xml/<category>/<Name>/fragment.xml
 *
 * In mixed mode (translatable: true), both flat files and entry directories
 * are collected to support partial migration states.
 *
 * @param {string} subDir - Absolute path to the category subfolder.
 * @param {boolean} translatable - If true, prefer entry directories (fragment.xml)
 *   but also collect any remaining flat .xml files (for partial migration).
 *   If false, only collect flat .xml files directly in the subfolder.
 * @returns {Promise<Array<{ path: string, sortKey: string }>>}
 *   Sorted list of fragment file paths with their sort keys.
 */
async function collectFragmentPaths(subDir, translatable) {
  const allEntries = await readdir(subDir, { withFileTypes: true });
  const fragments = [];

  if (!translatable) {
    // Flat-file mode: collect *.xml files directly (excluding _-prefixed)
    for (const entry of allEntries) {
      if (entry.isFile() && entry.name.endsWith('.xml') && !entry.name.startsWith('_')) {
        fragments.push({
          path: path.join(subDir, entry.name),
          sortKey: entry.name,
        });
      }
    }
  } else {
    // Entry-directory mode (translatable): collect <Name>/fragment.xml
    for (const entry of allEntries) {
      if (entry.isDirectory()) {
        const fragPath = path.join(subDir, entry.name, 'fragment.xml');
        if (existsSync(fragPath)) {
          fragments.push({
            path: fragPath,
            sortKey: entry.name,
          });
        }
      }
      // Also collect any remaining flat .xml files (partial migration support)
      if (entry.isFile() && entry.name.endsWith('.xml') && !entry.name.startsWith('_')) {
        fragments.push({
          path: path.join(subDir, entry.name),
          sortKey: entry.name,
        });
      }
    }
  }

  // Sort alphabetically by entry name for deterministic output
  fragments.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  return fragments;
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

  // Check that at least one subfolder has fragments (flat or directory-based)
  let hasAnyFragments = false;
  for (const config of MERGE_CONFIG) {
    const subDir = path.join(XML_DIR, config.subfolder);
    if (existsSync(subDir)) {
      const entries = await readdir(subDir, { withFileTypes: true });
      const hasFlat = entries.some(e => e.isFile() && e.name.endsWith('.xml') && !e.name.startsWith('_'));
      const hasDir = entries.some(e => e.isDirectory());
      if (hasFlat || hasDir) {
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
    const { subfolder, outputFile, rootElement, comment, standalone, metaFile, translatable } = config;
    const subDir = path.join(XML_DIR, subfolder);

    if (!existsSync(subDir)) {
      step(`  ${subfolder}/: directory not found, skipping`);
      perFile.push({ file: outputFile, count: 0 });
      continue;
    }

    // Collect fragment paths (flat files or entry directories)
    const fragmentPaths = await collectFragmentPaths(subDir, translatable);

    // Read and extract fragment contents
    const fragmentContents = [];
    for (const { path: fragPath, sortKey } of fragmentPaths) {
      const text = await readFile(fragPath, 'utf-8');
      try {
        const content = extractFragmentContent(text);
        fragmentContents.push(content);
      } catch (err) {
        error(`  Failed to extract content from ${subfolder}/${sortKey}: ${err.message}`);
      }
    }

    // Read meta file if specified (always a flat file)
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

    step(`  ${subfolder}/: ${fragmentPaths.length} fragment(s) → ${outputFile}`);
    totalFragments += fragmentPaths.length;
    perFile.push({ file: outputFile, count: fragmentPaths.length });
  }

  return { totalFragments, perFile };
}
