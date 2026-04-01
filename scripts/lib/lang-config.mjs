/**
 * Shared language configuration for the Black Market Bazaar build pipeline.
 *
 * Maps two-letter language file suffixes (e.g. `en`, `de`) to the game's
 * expected language folder name and locale ID. This is the single source of
 * truth for language support — import from here rather than duplicating the
 * mapping in individual scripts.
 *
 * To add a new language:
 *   1. Add an entry to LANGUAGE_MAP below.
 *   2. Update the supported language codes table in:
 *      - docs/modding-guide/README.md  (§ Localization → language code table)
 *      - docs/game-data/README.md      (§ Localization → Locale ID mapping)
 *      - README.md                     (§ Adding a translation → supported codes)
 *
 * @module lang-config
 */

/**
 * Language code → game folder name and locale ID mapping.
 *
 * Key   — two-letter file suffix used in per-entry translation files
 *          (e.g. `en` for `en.xml`, `de` for `de.xml`).
 * Value — `folder`: the game's Localization sub-directory name.
 *         `locale`: the locale ID used in `<Locale ID="...">` elements.
 *
 * @type {Record<string, { folder: string, locale: string }>}
 */
export const LANGUAGE_MAP = {
  en: { folder: 'English',    locale: 'en_US' },
  de: { folder: 'German',     locale: 'de_DE' },
  fr: { folder: 'French',     locale: 'fr_FR' },
  es: { folder: 'Spanish',    locale: 'es_ES' },
  zh: { folder: 'Chinese',    locale: 'zh_CN' },
  ja: { folder: 'Japanese',   locale: 'ja_JP' },
  ko: { folder: 'Korean',     locale: 'ko_KR' },
  ru: { folder: 'Russian',    locale: 'ru_RU' },
  it: { folder: 'Italian',    locale: 'it_IT' },
  pl: { folder: 'Polish',     locale: 'pl_PL' },
  pt: { folder: 'Portuguese', locale: 'pt_BR' },
};
