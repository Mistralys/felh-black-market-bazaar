/**
 * Standalone entry point for the translation key integrity check.
 *
 * Verifies that every TXT_BMB_* key referenced in fragment.xml files has a
 * corresponding entry in the generated English localization files.
 *
 * Usage:
 *   node scripts/verify-translation-keys.mjs
 *   npm run verify-keys
 *
 * Exit codes:
 *   0 — all keys present (or nothing to check)
 *   1 — one or more English keys are missing from the localization files
 *
 * NOTE: This check reads the *generated* localization files in
 * Mods/src/Data/Localization/English/. Run `npm run build` (or at minimum
 * the translation merge phase) before running this check standalone, or the
 * localization files will be absent and the check will be skipped.
 *
 * During a normal `npm run build` the check runs automatically as Phase 1.5,
 * after the translation merge has produced fresh localization files.
 */

import { error } from './lib/output.mjs';
import { verifyTranslationKeys } from './lib/verify-translation-keys.mjs';

const result = await verifyTranslationKeys().catch((err) => {
  error('Unexpected error during key integrity check: ' + err.message);
  process.exit(1);
});

if (!result.passed) {
  process.exit(1);
}
