/**
 * Shared XML parser configurations for the Black Market Bazaar build scripts.
 *
 * Provides pre-configured `fast-xml-parser` instances and helper functions for
 * the three XML formats used in this project:
 *
 *   - Translation XML  — per-entry `<Translation>` wrapper files (`en.xml`, etc.)
 *   - Localization XML — generated `<GameText><Locale><Line>` output files
 *   - GameCore XML     — complex item/weapon/armor/etc. data files
 *
 * All parsing functions handle XML entity decoding automatically (no manual
 * `unescapeXml()` needed). The `escapeXml()` export is used by output-assembly
 * code that builds XML strings by hand.
 *
 * @module xml-parser
 */

import { XMLParser } from 'fast-xml-parser';

// ─── Translation XML parser ───────────────────────────────────
//
// Format:
//   <Translation>
//     <DisplayName>...</DisplayName>
//     <Description>...</Description>
//     <Backstory>...</Backstory>
//     <Provides index="N">...</Provides>
//     <ModifierDisplayName index="N">...</ModifierDisplayName>
//   </Translation>
//
// `Provides` and `ModifierDisplayName` are forced into arrays so that a single
// occurrence is still returned as `[{ '#text': '...', '@_index': 'N' }]`.
// `parseTagValue: false` keeps all text content as strings (prevents numeric
// index values from being coerced to numbers).
// `trimValues: true` matches the `.trim()` calls in the old regex extraction.

const translationParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  trimValues: true,
  parseTagValue: false,
  isArray: (name) => name === 'Provides' || name === 'ModifierDisplayName',
});

/**
 * Parses a per-entry translation file (`en.xml`, `de.xml`, etc.) and returns
 * a structured object with the extracted fields.
 *
 * Returns `null` if the XML does not contain a `<Translation>` root element.
 *
 * @param {string} xmlString - Raw XML content of the translation file.
 * @returns {{
 *   displayName: string | null,
 *   description: string | null,
 *   backstory: string | null,
 *   provides: Array<{ index: string, text: string }>,
 *   modifierDisplayNames: Array<{ index: string, text: string }>,
 * } | null}
 */
export function parseTranslationXml(xmlString) {
  const doc = translationParser.parse(xmlString);
  const t = doc?.Translation;
  if (!t) return null;

  /**
   * Extracts text from a parsed element that may be either:
   *   - A plain string (no attributes): `"some text"`
   *   - An object with `#text` (has attributes): `{ '#text': 'some text', '@_index': '1' }`
   * Returns `null` if the element is absent entirely.
   * Returns `""` if the element is present but empty (e.g. `<Description></Description>`).
   *
   * Line endings: `fast-xml-parser` normalises `\r\n` to `\n` inside text
   * content. We restore bare `\n` to `\r\n` to match the output of the old
   * regex-based extraction, which preserved the original CRLF line endings
   * from the source files.
   *
   * @param {unknown} val
   * @returns {string | null}
   */
  function extractText(val) {
    if (val === undefined || val === null) return null;
    let s;
    if (typeof val === 'string') {
      s = val;
    } else if (typeof val === 'object' && '#text' in val) {
      s = String(val['#text']);
    } else {
      // Numeric or other primitive (parseTagValue: false should prevent this, but guard anyway)
      s = String(val);
    }
    // Restore CRLF line endings that the parser normalised to LF.
    // Only replace bare \n (not already preceded by \r).
    return s.replace(/(?<!\r)\n/g, '\r\n');
  }

  // Normalise indexed elements (Provides / ModifierDisplayName) into a
  // consistent `{ index, text }` shape regardless of whether the parser
  // returned a plain string (no attributes) or an object with `#text`.
  function extractIndexed(arr) {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((item) => {
        if (typeof item === 'string') {
          // Shouldn't happen when attributes are present, but handle gracefully
          return { index: '0', text: item };
        }
        const index = String(item['@_index'] ?? '0');
        const text = extractText(item) ?? '';
        return { index, text };
      })
      .filter((item) => item.text !== '');
  }

  return {
    displayName: extractText(t.DisplayName),
    description: extractText(t.Description),
    backstory: extractText(t.Backstory),
    provides: extractIndexed(t.Provides),
    modifierDisplayNames: extractIndexed(t.ModifierDisplayName),
  };
}

// ─── Localization XML parser ──────────────────────────────────
//
// Format:
//   <GameText>
//     <Locale ID="en_US">
//       <Line Key="TXT_BMB_..." Note="...">
//         <Text>...</Text>
//       </Line>
//     </Locale>
//   </GameText>
//
// `Line` is forced into an array so a single entry is still iterable.
// `parseTagValue: false` keeps Text content as strings.

const localizationParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  parseTagValue: false,
  isArray: (name) => name === 'Line',
});

/**
 * Parses a generated localization XML file and returns a `Map<key, text>`.
 *
 * Entity decoding is handled automatically by the parser (e.g. `&amp;` → `&`).
 *
 * @param {string} xmlString - Raw XML content of the localization file.
 * @returns {Map<string, string>} Map from `TXT_BMB_*` key to plain text.
 */
export function parseLocalizationXml(xmlString) {
  const keyMap = new Map();
  const doc = localizationParser.parse(xmlString);
  const lines = doc?.GameText?.Locale?.Line;
  if (!Array.isArray(lines)) return keyMap;

  for (const line of lines) {
    const key = line['@_Key'];
    const text = line.Text;
    if (key && text !== undefined && text !== null) {
      keyMap.set(String(key), String(text));
    }
  }

  return keyMap;
}

// ─── GameCore XML parser ──────────────────────────────────────
//
// Format: complex item/weapon/armor/etc. data files with many repeating
// child elements inside each `<GameItemType>`.
//
// Tags listed in GAMECORE_ARRAY_TAGS can appear more than once inside a
// single `<GameItemType>` and must be treated as arrays.

const GAMECORE_ARRAY_TAGS = new Set([
  // Item / weapon / armor tags (existing)
  'Type', 'GameModifier', 'Prereq', 'GameItemTypeModelPack',
  'SupportedUnitModelType', 'GameItemTypeModel', 'AttackSFX',
  'EquipSFX', 'SFX',
  // Spell tags
  'SpellDef', 'SpellDefEffect', 'HitSoundFX', 'PreventStackingWith',
  'SpellResourceCost',
  // Ability tags
  'AbilityBonus', 'AbilityBonusOption',
  // Unit tags
  'UnitType', 'SelectedAbilityBonusOption', 'Equipment',
  'EquipmentUpgradeDef', 'LevelMilestone',
  // Unit stat tags
  'UnitStatType',
  // Effect tags
  'EffectSequencer', 'EmitterBlueprint', 'SequenceFrame',
  // Shared / misc
  'AIData', 'Calculate',
]);

const gameCoreParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  isArray: (name) => GAMECORE_ARRAY_TAGS.has(name),
});

/**
 * Parses a GameCore XML file (items, weapons, armor, etc.) and returns the
 * parsed document object.
 *
 * @param {string} xmlString - Raw XML content of the GameCore file.
 * @returns {object} Parsed document.
 */
export function parseGameCoreXml(xmlString) {
  return gameCoreParser.parse(xmlString);
}

// ─── Fragment XML parser ──────────────────────────────────────
//
// Used to extract `AbilityBonusOption` `InternalName` attributes from
// ability fragment files. Forces `AbilityBonusOption` into an array so
// that a single option is still iterable.

const fragmentParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  parseTagValue: false,
  isArray: (name) => name === 'AbilityBonusOption',
});

/**
 * Extracts all `AbilityBonusOption` `InternalName` values from a fragment XML
 * string. Returns an empty array if none are found.
 *
 * @param {string} xmlString - Raw XML content of a fragment file.
 * @returns {string[]} Array of `InternalName` attribute values.
 */
export function extractAbilityOptionNames(xmlString) {
  const doc = fragmentParser.parse(xmlString);
  const abilityBonus = doc?.Fragment?.AbilityBonus;
  if (!abilityBonus) return [];

  // AbilityBonus may be a single object or an array
  const bonuses = Array.isArray(abilityBonus) ? abilityBonus : [abilityBonus];
  const names = [];

  for (const bonus of bonuses) {
    const options = bonus.AbilityBonusOption;
    if (!Array.isArray(options)) continue;
    for (const opt of options) {
      const name = opt['@_InternalName'];
      if (name) names.push(String(name));
    }
  }

  return names;
}

// ─── XML output escaping ──────────────────────────────────────

/**
 * Escapes special XML characters in text content for use in hand-assembled
 * XML output strings.
 *
 * This is intentionally kept as a simple string-replace function because the
 * output assembly in `merge-translations.mjs` builds XML by string
 * concatenation rather than using `XMLBuilder`. The five standard XML entities
 * are sufficient for the text content written to localization files.
 *
 * @param {string} text - Raw text.
 * @returns {string} XML-safe text.
 */
export function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
