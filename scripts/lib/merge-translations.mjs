/**
 * Translation merge module.
 *
 * Scans all per-entry directories in xml/<category>/<Name>/ for translation
 * files (en.xml, de.xml, fr.xml, etc.) and assembles them into monolithic
 * localization XML files in Mods/src/Data/Localization/<Language>/.
 *
 * The output format matches the base game's localization XML format:
 *
 *   <?xml version='1.0' encoding='utf-8'?>
 *   <GameText>
 *     <Locale ID="en_US">
 *       <Line Key="TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME" Note="DisplayName for BirdOfCelerity">
 *         <Text>Bird of Celerity</Text>
 *       </Line>
 *     </Locale>
 *   </GameText>
 *
 * This module is imported by build.mjs and runs as Phase 1 of the build
 * pipeline, after the XML fragment merge (Phase 0) and before deploy (Phase 2).
 *
 * @module merge-translations
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { info, step, warn, error } from './output.mjs';
import { parseTranslationXml, extractAbilityOptionNames, escapeXml } from './xml-parser.mjs';
import { LANGUAGE_MAP } from './lang-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const XML_DIR = path.join(PROJECT_ROOT, 'xml');
const LOCALIZATION_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'Localization');

/** Line ending used in all generated output. */
const EOL = '\r\n';

/**
 * Categories that have per-entry directories with translation files.
 * Must match the categories migrated by migrate-to-dirs.mjs.
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

// ─── Translation file parsing ─────────────────────────────────

/**
 * Parses a per-entry translation file (en.xml, de.xml, etc.) and extracts
 * all key→text pairs using the entry's InternalName and category.
 *
 * The translation file format:
 *   <Translation>
 *     <DisplayName>Bird of Celerity</DisplayName>
 *     <Description>...</Description>
 *     <Provides index="1">...</Provides>
 *     <ModifierDisplayName index="1">...</ModifierDisplayName>
 *     <Backstory>...</Backstory>
 *   </Translation>
 *
 * For AbilityBonus entries, the InternalName in the key is the option name
 * (stored in the fragment), not the file name. We derive the key prefix from
 * the fragment.xml InternalName stored in the entry directory.
 *
 * @param {string} xmlContent - The content of the translation file.
 * @param {string} category - Category code (e.g. 'ITEMS').
 * @param {string} internalName - The InternalName of the entry.
 * @returns {Array<{ key: string, note: string, text: string }>}
 */
function parseTranslationFile(xmlContent, category, internalName) {
  const parsed = parseTranslationXml(xmlContent);
  if (!parsed) return [];

  const entries = [];
  const nameUpper = internalName.toUpperCase();
  const keyPrefix = `TXT_BMB_${category}_${nameUpper}`;

  // Use !== null so that empty strings (e.g. <Description></Description>) are
  // included — matching the old regex behaviour which captured empty elements.
  if (parsed.displayName !== null) {
    entries.push({
      key: `${keyPrefix}_DISPLAYNAME`,
      note: `DisplayName for ${internalName}`,
      text: parsed.displayName,
    });
  }

  if (parsed.description !== null) {
    entries.push({
      key: `${keyPrefix}_DESCRIPTION`,
      note: `Description for ${internalName}`,
      text: parsed.description,
    });
  }

  if (parsed.backstory !== null) {
    entries.push({
      key: `${keyPrefix}_BACKSTORY`,
      note: `Backstory for ${internalName}`,
      text: parsed.backstory,
    });
  }

  for (const { index, text } of parsed.provides) {
    entries.push({
      key: `${keyPrefix}_PROVIDES_${index}`,
      note: `Provides ${index} for ${internalName}`,
      text,
    });
  }

  for (const { index, text } of parsed.modifierDisplayNames) {
    entries.push({
      key: `${keyPrefix}_MODIFIER_${index}_DISPLAYNAME`,
      note: `Modifier ${index} DisplayName for ${internalName}`,
      text,
    });
  }

  return entries;
}

/**
 * Parses a per-entry translation file for an AbilityBonus entry.
 * AbilityBonus fragments contain AbilityBonusOption children, each with their
 * own InternalName. The translation file uses the option's InternalName as the
 * key base (not the file/directory name).
 *
 * We detect this by reading the fragment.xml alongside the translation file
 * and extracting the option InternalNames.
 *
 * @param {string} xmlContent - The content of the translation file.
 * @param {string} category - Category code ('ABILITIES').
 * @param {string} fragmentXml - The content of the corresponding fragment.xml.
 * @returns {Array<{ key: string, note: string, text: string }>}
 */
function parseAbilityTranslationFile(xmlContent, category, fragmentXml) {
  // Extract all AbilityBonusOption InternalNames from the fragment using the
  // shared parser (replaces the former regex-based extraction).
  const optionNames = extractAbilityOptionNames(fragmentXml);

  if (optionNames.length === 0) return [];

  // For abilities, we use the first (and usually only) option name as the key base.
  const internalName = optionNames[0];

  return parseTranslationFile(xmlContent, category, internalName);
}

// ─── Localization XML assembly ────────────────────────────────

/**
 * Assembles a monolithic localization XML file from a list of entries.
 *
 * Output format:
 *   <?xml version='1.0' encoding='utf-8'?>
 *   <GameText>
 *     <Locale ID="en_US">
 *       <Line Key="TXT_BMB_..." Note="...">
 *         <Text>...</Text>
 *       </Line>
 *     </Locale>
 *   </GameText>
 *
 * @param {string} localeId - The locale ID (e.g. 'en_US').
 * @param {Array<{ key: string, note: string, text: string }>} entries - All entries.
 * @returns {string} The assembled XML content.
 */
function assembleLocalizationXml(localeId, entries) {
  const lines = [];
  lines.push(`<?xml version='1.0' encoding='utf-8'?>`);
  lines.push(`<GameText>`);
  lines.push(`  <Locale ID="${localeId}">`);

  for (const { key, note, text } of entries) {
    const safeNote = escapeXml(note);
    const safeText = escapeXml(text);
    lines.push(`    <Line Key="${key}" Note="${safeNote}">`);
    lines.push(`      <Text>${safeText}</Text>`);
    lines.push(`    </Line>`);
  }

  lines.push(`  </Locale>`);
  lines.push(`</GameText>`);
  return lines.join(EOL) + EOL;
}

// ─── Main merge logic ─────────────────────────────────────────

/**
 * Discovers all language codes present across all entry directories
 * in a category subfolder.
 *
 * @param {string} subDir - Absolute path to the category subfolder.
 * @returns {Promise<Set<string>>} Set of language codes found (e.g. {'en', 'de'}).
 */
async function discoverLanguages(subDir) {
  const langs = new Set();

  if (!existsSync(subDir)) return langs;

  const entries = await readdir(subDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const entryDir = path.join(subDir, entry.name);
    const files = await readdir(entryDir);
    for (const file of files) {
      const match = file.match(/^([a-z]{2})\.xml$/);
      if (match && LANGUAGE_MAP[match[1]]) {
        langs.add(match[1]);
      }
    }
  }

  return langs;
}

/**
 * Merges all per-entry translation files into monolithic localization XML files.
 *
 * @returns {Promise<{
 *   totalEntries: number,
 *   totalStrings: number,
 *   languages: string[],
 *   filesWritten: number,
 *   perCategory: Array<{ subfolder: string, entries: number, strings: number }>
 * }>}
 */
export async function mergeTranslations() {
  if (!existsSync(XML_DIR)) {
    info('xml/ directory not found — skipping translation merge.');
    return null;
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
    info('No per-entry directories found — skipping translation merge.');
    info('Run `node scripts/migrate-to-dirs.mjs` first to create them.');
    return null;
  }

  info('Merging translations...');

  // Discover all languages across all categories
  const allLanguages = new Set();
  for (const { subfolder } of TRANSLATABLE_CATEGORIES) {
    const subDir = path.join(XML_DIR, subfolder);
    const langs = await discoverLanguages(subDir);
    for (const lang of langs) allLanguages.add(lang);
  }

  if (allLanguages.size === 0) {
    info('No translation files found — skipping translation merge.');
    return null;
  }

  let totalEntries = 0;
  let totalStrings = 0;
  let filesWritten = 0;
  const perCategory = [];

  // For each language, generate one localization file per category
  for (const lang of [...allLanguages].sort()) {
    const langInfo = LANGUAGE_MAP[lang];
    if (!langInfo) {
      warn(`  Unknown language code '${lang}' — skipping.`);
      continue;
    }

    const langDir = path.join(LOCALIZATION_DIR, langInfo.folder);
    await mkdir(langDir, { recursive: true });

    for (const { subfolder, category, outputSuffix } of TRANSLATABLE_CATEGORIES) {
      const subDir = path.join(XML_DIR, subfolder);
      if (!existsSync(subDir)) continue;

      const entryDirs = await readdir(subDir, { withFileTypes: true });
      const sortedDirs = entryDirs
        .filter(e => e.isDirectory())
        .map(e => e.name)
        .sort();

      const allEntries = [];
      let catEntries = 0;
      let catStrings = 0;

      for (const dirName of sortedDirs) {
        const entryDir = path.join(subDir, dirName);
        const translationFile = path.join(entryDir, `${lang}.xml`);
        const fragmentFile = path.join(entryDir, 'fragment.xml');

        if (!existsSync(translationFile)) {
          // Missing translation for this language — warn but continue
          if (lang !== 'en') {
            // Only warn for non-English missing translations
            warn(`  Missing ${lang}.xml for ${subfolder}/${dirName}`);
          }
          continue;
        }

        const xmlContent = await readFile(translationFile, 'utf-8');
        const fragmentXml = existsSync(fragmentFile)
          ? await readFile(fragmentFile, 'utf-8')
          : '';

        let entries;
        if (category === 'ABILITIES' && fragmentXml) {
          entries = parseAbilityTranslationFile(xmlContent, category, fragmentXml);
        } else {
          // For non-ability categories, derive InternalName from the directory name
          // The directory name matches the fragment's InternalName
          entries = parseTranslationFile(xmlContent, category, dirName);
        }

        if (entries.length > 0) {
          allEntries.push(...entries);
          catEntries++;
          catStrings += entries.length;
        }
      }

      if (allEntries.length === 0) continue;

      // Write the monolithic localization file for this language+category
      const outputFile = path.join(langDir, `BMB_Strings_${outputSuffix}.xml`);
      const xml = assembleLocalizationXml(langInfo.locale, allEntries);
      await writeFile(outputFile, xml, 'utf-8');
      filesWritten++;

      step(`  ${langInfo.folder}/${outputSuffix}: ${catEntries} entries, ${catStrings} strings → BMB_Strings_${outputSuffix}.xml`);

      // Only accumulate totals once (for English, to avoid double-counting)
      if (lang === 'en') {
        totalEntries += catEntries;
        totalStrings += catStrings;
        perCategory.push({ subfolder, entries: catEntries, strings: catStrings });
      }
    }
  }

  return {
    totalEntries,
    totalStrings,
    languages: [...allLanguages].sort(),
    filesWritten,
    perCategory,
  };
}
