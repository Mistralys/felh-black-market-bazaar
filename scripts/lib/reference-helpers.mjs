/**
 * Shared utilities for Black Market Bazaar reference generators.
 *
 * Provides common functions used by all reference generator scripts:
 *   - ensureFreshBuild()     — runs XML fragment merge + translation merge
 *   - loadLocalizationKeys() — loads English TXT_BMB_* key→text map
 *   - resolveKey()           — resolves a TXT_BMB_* key or returns plain text
 *   - escapeCell()           — escapes pipe/newline for Markdown table cells
 *   - formatInternalName()   — converts BMB_SomeName → "Some Name"
 *   - formatStatName()       — converts UnitStat_Attack_Fire → "Fire Attack"
 *
 * All reference generators import from this module to avoid duplicating
 * the merge/localization boilerplate.
 *
 * @module reference-helpers
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { info, warn } from './output.mjs';
import { mergeXmlFragments } from './merge-xml.mjs';
import { mergeTranslations } from './merge-translations.mjs';
import { parseLocalizationXml } from './xml-parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the project root (two levels up from scripts/lib/). */
export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/** Absolute path to the generated GameCore XML directory. */
export const GAMECORE_DIR = path.join(PROJECT_ROOT, 'Mods', 'src', 'Data', 'GameCore');

/** Absolute path to the English localization directory. */
export const LOCALIZATION_EN_DIR = path.join(
  PROJECT_ROOT, 'Mods', 'src', 'Data', 'Localization', 'English'
);

// ─── Build freshness ──────────────────────────────────────────

/**
 * Ensures the generated XML and localization files are up-to-date by running
 * the XML fragment merge and translation merge steps.
 *
 * Call this once at the start of a standalone generator run. The umbrella
 * script calls it once and then passes the pre-loaded keyMap to each
 * individual generator to avoid redundant work.
 *
 * @returns {Promise<{ mergeResult: object|null, translationResult: object|null }>}
 */
export async function ensureFreshBuild() {
  const mergeResult = await mergeXmlFragments();
  if (mergeResult) {
    info(`Merged ${mergeResult.totalFragments} fragment(s) before generating reference.`);
  }

  const translationResult = await mergeTranslations();
  if (translationResult) {
    info(`Merged ${translationResult.totalStrings} string(s) into localization files.`);
  }

  return { mergeResult, translationResult };
}

// ─── Localization key loading ─────────────────────────────────

/**
 * Loads all English localization XML files from
 * `Mods/src/Data/Localization/English/` and builds a key→text lookup map.
 *
 * The localization XML format:
 *   <GameText>
 *     <Locale ID="en_US">
 *       <Line Key="TXT_BMB_..." Note="...">
 *         <Text>Bird of Celerity</Text>
 *       </Line>
 *     </Locale>
 *   </GameText>
 *
 * @returns {Promise<Map<string, string>>} Map from TXT_BMB_* key to English text.
 */
export async function loadLocalizationKeys() {
  const keyMap = new Map();

  if (!existsSync(LOCALIZATION_EN_DIR)) {
    return keyMap;
  }

  let files;
  try {
    files = await readdir(LOCALIZATION_EN_DIR);
  } catch {
    return keyMap;
  }

  const xmlFiles = files.filter((f) => f.endsWith('.xml'));

  for (const file of xmlFiles) {
    const filePath = path.join(LOCALIZATION_EN_DIR, file);
    try {
      const content = await readFile(filePath, 'utf-8');
      const fileKeys = parseLocalizationXml(content);
      for (const [key, text] of fileKeys) {
        keyMap.set(key, text);
      }
    } catch (err) {
      warn(`Could not load localization file ${file}: ${err.message}`);
    }
  }

  return keyMap;
}

// ─── Key resolution ───────────────────────────────────────────

/**
 * Resolves a value that may be a TXT_BMB_* key or plain text.
 *
 * @param {string | undefined} value - The raw value from the XML.
 * @param {Map<string, string>} keyMap - The localization key lookup map.
 * @returns {string} The resolved text, or the original value if not a key.
 */
export function resolveKey(value, keyMap) {
  if (!value) return value ?? '';
  const str = String(value);
  if (str.startsWith('TXT_BMB_') && keyMap.has(str)) {
    return keyMap.get(str);
  }
  return str;
}

// ─── Markdown helpers ─────────────────────────────────────────

/**
 * Escapes pipe characters and newlines for use in Markdown table cells.
 *
 * @param {string | number | undefined | null} text
 * @returns {string}
 */
export function escapeCell(text) {
  return String(text ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

// ─── Name formatting ──────────────────────────────────────────

/**
 * Converts a BMB_ or game InternalName into a readable label.
 * Strips the BMB_ prefix and inserts spaces before capital letters.
 *
 * Examples:
 *   "BMB_OvumPhilosophorum" → "Ovum Philosophorum"
 *   "BMB_Haste_Mass"        → "Haste Mass"
 *   "Loremaster1"           → "Loremaster 1"
 *
 * @param {string} raw
 * @returns {string}
 */
export function formatInternalName(raw) {
  return String(raw)
    .replace(/^BMB_/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

// ─── Stat name formatting ─────────────────────────────────────

const STAT_LABELS = {
  UnitStat_Attack_Pierce: 'Attack',
  UnitStat_Attack_Fire: 'Fire Attack',
  UnitStat_Attack_Cold: 'Cold Attack',
  UnitStat_Attack_Lightning: 'Lightning Attack',
  UnitStat_Attack_Poison: 'Poison Attack',
  UnitStat_Attack_Death: 'Death Attack',
  UnitStat_Attack_Spirit: 'Spirit Attack',
  UnitStat_Attack_Boost: 'Attack Bonus',
  UnitStat_Defense_Pierce: 'Defense',
  UnitStat_Defense_Fire: 'Fire Defense',
  UnitStat_Defense_Cold: 'Cold Defense',
  UnitStat_Defense_Lightning: 'Lightning Defense',
  UnitStat_Defense_Poison: 'Poison Defense',
  UnitStat_Defense_Death: 'Death Defense',
  UnitStat_Defense_Spirit: 'Spirit Defense',
  UnitStat_HP: 'Hit Points',
  UnitStat_Mana: 'Mana',
  UnitStat_MagicPower: 'Spell Power',
  UnitStat_CombatSpeed: 'Combat Speed',
  UnitStat_Initiative: 'Initiative',
  UnitStat_Accuracy: 'Accuracy',
  UnitStat_Dodge: 'Dodge',
  UnitStat_Sight: 'Sight',
  UnitStat_Moves: 'Movement',
  UnitStat_Spell_Mastery: 'Spell Mastery',
  UnitStat_SpellResistance: 'Spell Resistance',
  UnitStat_CriticalChance: 'Critical Chance',
  UnitStat_CriticalDamage: 'Critical Damage',
  UnitStat_BackswingChance: 'Backswing Chance',
  UnitStat_BashChance: 'Bash Chance',
  UnitStat_CounterattackChance: 'Counterattack Chance',
  UnitStat_Swashbuckle: 'Swashbuckle',
  UnitStat_Level: 'Level',
};

/**
 * Converts a UnitStat_* internal name to a human-readable label.
 * Falls back to stripping the prefix and inserting spaces before capitals.
 *
 * @param {string} raw - e.g. "UnitStat_Attack_Fire"
 * @returns {string} - e.g. "Fire Attack"
 */
export function formatStatName(raw) {
  if (STAT_LABELS[raw]) return STAT_LABELS[raw];
  return raw
    .replace(/^UnitStat_/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

// ─── Effect formatting ────────────────────────────────────────

/**
 * Formats a list of GameModifier objects into a human-readable string
 * suitable for a Markdown table cell.
 *
 * Handles the most common modifier patterns used in BMB items, spells,
 * and abilities. Unrecognised patterns are silently skipped.
 *
 * @param {Array<object>} modifiers - Array of parsed GameModifier objects.
 * @param {Map<string, string>} keyMap - Localization key lookup map.
 * @returns {string} Formatted effects string, or "—" if none.
 */
export function formatEffects(modifiers, keyMap) {
  if (!modifiers || modifiers.length === 0) return '—';

  const parts = [];
  for (const mod of modifiers) {
    const attr = mod.Attribute;
    const rawProvides = mod.Provides;
    const provides = rawProvides ? resolveKey(String(rawProvides), keyMap) : undefined;

    // Always prefer an explicit Provides label when present
    if (provides) {
      parts.push(provides);
      continue;
    }

    if (attr === 'AdjustUnitStat' && mod.StrVal && mod.Value !== undefined) {
      const sign = mod.Value >= 0 ? '+' : '';
      parts.push(`${sign}${mod.Value} ${formatStatName(mod.StrVal)}`);
    } else if (attr === 'AdjustArmyStat' && mod.StrVal && mod.Value !== undefined) {
      const sign = mod.Value >= 0 ? '+' : '';
      parts.push(`${sign}${mod.Value} ${formatStatName(mod.StrVal)} (army)`);
    } else if (attr === 'UnlockSpell' && mod.StrVal) {
      parts.push(`Unlocks spell: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'UnlockCombatAbility' && mod.StrVal) {
      parts.push(`Unlocks ability: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'UnlockUnitAbility' && mod.StrVal) {
      parts.push(`Unlocks ability: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'BattleAutoCastSpell' && mod.StrVal) {
      parts.push(`Auto-casts: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'MeleeAppliesSpell' && mod.StrVal) {
      parts.push(`Melee applies: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'MeleeDefenseAppliesSpell' && mod.StrVal) {
      parts.push(`On hit applies: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'UseSpell' && mod.StrVal) {
      parts.push(`Uses spell: ${formatInternalName(mod.StrVal)}`);
    } else if (attr === 'SummonUnit' && mod.StrVal) {
      parts.push(`Summons: ${mod.StrVal}`);
    } else if (attr === 'AllUnitsGainLevel' && mod.Value !== undefined) {
      const v = mod.Value;
      parts.push(`All units gain ${v} level${v !== 1 ? 's' : ''}`);
    } else if (attr === 'GiveExperience' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} XP`);
    } else if (attr === 'CurHealth' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} HP (immediate)`);
    } else if (attr === 'TargetUnitLevelUp' && mod.Value !== undefined) {
      parts.push(`Target unit gains ${mod.Value ?? 1} level(s)`);
    } else if (attr === 'Gold' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} Gold`);
    } else if (attr === 'Mana' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} Mana`);
    } else if (attr === 'Research' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} Research`);
    } else if (attr === 'Fame' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} Fame`);
    } else if (attr === 'Population' && mod.Value !== undefined) {
      parts.push(`+${mod.Value} Population`);
    }
    // Modifiers with no recognisable pattern are silently skipped
  }

  return parts.length > 0 ? parts.join('; ') : '—';
}
