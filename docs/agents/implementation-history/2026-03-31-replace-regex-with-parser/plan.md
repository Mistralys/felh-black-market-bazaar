# Plan: Replace Regex XML Parsing with `fast-xml-parser`

## Summary

Replace all regex-based XML parsing across the project's build scripts with proper XML parsing using `fast-xml-parser`, which is already an installed dependency. Currently, four scripts use regex patterns to extract data from XML files — a fragile approach that can break on whitespace variations, attribute ordering, CDATA sections, or multi-line content. The project already uses `fast-xml-parser` in `scripts/generate-reference.mjs` for GameCore XML parsing, but inconsistently falls back to regex for localization XML parsing in the same file and across `merge-translations.mjs`. This plan standardises all XML reading on a single, proven parser.

## Architectural Context

### Current XML Parsing Landscape

The project has **three distinct XML parsing approaches** coexisting:

| Approach | Where Used | Purpose |
|---|---|---|
| `fast-xml-parser` (proper) | `scripts/generate-reference.mjs` lines 49–54 | Parsing GameCore XML (items, weapons, etc.) |
| Regex patterns | `scripts/lib/merge-translations.mjs`, `scripts/generate-reference.mjs` `loadLocalizationKeys()` | Parsing translation files (`en.xml`) and localization output XML |
| `String.indexOf` / line splitting | `scripts/lib/merge-xml.mjs` `extractFragmentContent()`, `scripts/migrate-to-dirs.mjs` | Stripping `<Fragment>` wrappers, extracting elements by position |

### Scripts with Regex-Based XML Parsing (In Scope)

#### 1. `scripts/lib/merge-translations.mjs` — **Primary target**

The translation merge module is the heaviest regex user. It parses per-entry translation files (`en.xml`, `de.xml`, etc.) to extract key→text pairs:

- **`parseTranslationFile()`** (lines 96–162): Six regex patterns extract content from `<Translation>` wrapper elements:
  - `/<Translation>([\s\S]*?)<\/Translation>/` — outer wrapper
  - `/<DisplayName>([\s\S]*?)<\/DisplayName>/` — display name
  - `/<Description>([\s\S]*?)<\/Description>/` — description
  - `/<Backstory>([\s\S]*?)<\/Backstory>/` — backstory
  - `/<Provides\s+index="(\d+)">([\s\S]*?)<\/Provides>/g` — indexed provides
  - `/<ModifierDisplayName\s+index="(\d+)">([\s\S]*?)<\/ModifierDisplayName>/g` — indexed modifier names

- **`parseAbilityTranslationFile()`** (lines 178–197): Regex to extract `AbilityBonusOption` `InternalName` attributes from fragment XML:
  - `/<AbilityBonusOption[^>]*\sInternalName="([^"]+)"/g`

- **`unescapeXml()` / `escapeXml()`** (lines 205–227): Manual XML entity handling via chained `.replace()` calls.

- **`discoverLanguages()`** (line 287): Regex to match language file names (`/^([a-z]{2})\.xml$/`). This is a **filename pattern**, not XML parsing — it stays as-is.

#### 2. `scripts/generate-reference.mjs` — **Secondary target**

- **`loadLocalizationKeys()`** (lines 93–105): Regex to parse the generated localization XML files:
  - `/<Line\s+Key="([^"]+)"[^>]*>\s*<Text>([\s\S]*?)<\/Text>\s*<\/Line>/g`
  - Followed by manual entity unescaping via chained `.replace()` calls.

  This is inconsistent: the same script already uses `fast-xml-parser` for GameCore XML (line 49) but falls back to regex for localization XML.

### Scripts with Text-Based XML Handling (Out of Scope for Parser Replacement)

#### 3. `scripts/lib/merge-xml.mjs` — **Intentionally text-based**

- **`extractFragmentContent()`** (lines 70–95): Uses `String.includes()` and line splitting to find `<Fragment>` / `</Fragment>` boundaries. This is **intentionally text-based** to preserve original formatting exactly (whitespace, indentation, line endings). Replacing this with a parser would alter the output formatting of the merged XML files. **Leave as-is.**

#### 4. `scripts/split-xml.mjs` — **One-time migration script**

- **`extractEntries()`** (line 67): Regex to find `<childTag InternalName="...">` opening tags and extract content blocks.
- This script has already been run and is not part of the regular build pipeline. It is idempotent but rarely (if ever) re-executed. **Leave as-is** — the cost of refactoring exceeds the benefit.

#### 5. `scripts/migrate-to-dirs.mjs` — **One-time migration script**

- Multiple `String.indexOf`-based element extraction functions and a few regex patterns for `InternalName` extraction.
- Like `split-xml.mjs`, this has already been run. **Leave as-is.**

### Existing Parser Configuration

`scripts/generate-reference.mjs` already configures `fast-xml-parser` (lines 42–54):

```javascript
const ARRAY_TAGS = new Set([
  'Type', 'GameModifier', 'Prereq', 'GameItemTypeModelPack',
  'SupportedUnitModelType', 'GameItemTypeModel', 'AttackSFX',
  'EquipSFX', 'SFX',
]);

const parser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  isArray: (name) => ARRAY_TAGS.has(name),
});
```

### Key Dependency

- `fast-xml-parser` `^5.5.9` is already in `package.json` dependencies.

## Approach / Architecture

### Strategy: Shared Parser Module + Per-Script Refactoring

1. **Create a shared XML parser utility module** at `scripts/lib/xml-parser.mjs` that exports pre-configured `fast-xml-parser` instances for the two XML formats used in this project:
   - **Translation XML** (`<Translation>` wrapper with `<DisplayName>`, `<Description>`, etc.)
   - **Localization XML** (`<GameText><Locale><Line Key="..." Note="..."><Text>...</Text></Line></Locale></GameText>`)

2. **Refactor `scripts/lib/merge-translations.mjs`** to use the shared parser for reading translation files instead of regex.

3. **Refactor `scripts/generate-reference.mjs`** to use the shared parser for reading localization XML instead of regex, and move its existing GameCore parser configuration into the shared module.

4. **Remove manual `escapeXml()` / `unescapeXml()` functions** — `fast-xml-parser` handles entity encoding/decoding automatically. Replace with the `XMLBuilder` from `fast-xml-parser` for XML output assembly where applicable.

### What Changes, What Stays

| Component | Action |
|---|---|
| `scripts/lib/xml-parser.mjs` | **NEW** — shared parser configurations |
| `scripts/lib/merge-translations.mjs` | **MODIFY** — replace regex parsing with `fast-xml-parser` |
| `scripts/generate-reference.mjs` | **MODIFY** — replace `loadLocalizationKeys()` regex; move parser config to shared module |
| `scripts/lib/merge-xml.mjs` | **NO CHANGE** — text-based by design |
| `scripts/split-xml.mjs` | **NO CHANGE** — one-time script |
| `scripts/migrate-to-dirs.mjs` | **NO CHANGE** — one-time script |
| `scripts/build.mjs` | **NO CHANGE** — no XML parsing |

## Rationale

1. **`fast-xml-parser` is already a dependency** — no new packages needed. The project already trusts it for GameCore XML parsing.

2. **Regex XML parsing is fragile** — the current regex patterns assume specific whitespace, attribute ordering, and no CDATA. While the project controls the XML format, any future format evolution (e.g., adding attributes to `<DisplayName>`, using CDATA for descriptions with special characters) would silently break regex extraction.

3. **Consistency** — having two XML parsing approaches in the same script (`generate-reference.mjs`) is confusing. Standardising on one approach reduces cognitive load.

4. **Entity handling is error-prone** — the manual `escapeXml()` / `unescapeXml()` functions duplicate what `fast-xml-parser` does automatically. They also don't handle numeric character references (`&#123;`, `&#x7B;`), which a proper parser does.

5. **One-time scripts are excluded** — `split-xml.mjs` and `migrate-to-dirs.mjs` have already served their purpose. Refactoring them adds risk with no practical benefit.

6. **`merge-xml.mjs` stays text-based** — its `extractFragmentContent()` function intentionally preserves original formatting. A parser would normalise whitespace and attribute ordering, changing the output of the merged XML files. This is unacceptable for a build tool that must produce deterministic, format-preserving output.

## Detailed Steps

### Step 1: Create Shared Parser Module (`scripts/lib/xml-parser.mjs`)

Create a new module that exports:

- **`parseTranslationXml(xmlString)`** — parses a `<Translation>` wrapper file and returns a structured object with `displayName`, `description`, `backstory`, `provides[]`, `modifierDisplayNames[]`.
- **`parseLocalizationXml(xmlString)`** — parses a `<GameText><Locale>` localization file and returns a `Map<string, string>` of key→text pairs.
- **`parseGameCoreXml(xmlString)`** — parses a GameCore XML file (items, weapons, etc.) and returns the parsed document. Moves the existing parser configuration from `generate-reference.mjs`.
- **`escapeXml(text)`** — thin wrapper around `fast-xml-parser`'s `XMLBuilder` for XML entity escaping (used by `merge-translations.mjs` for output assembly).

The module should configure `fast-xml-parser` with appropriate options for each format:

```javascript
// Translation XML: <Translation> with simple child elements
// Need: text content, attributes (index="N")
const translationParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  trimValues: true,
  isArray: (name) => ['Provides', 'ModifierDisplayName'].includes(name),
});

// Localization XML: <GameText><Locale><Line Key="..." Note="..."><Text>
const localizationParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'Line',
});

// GameCore XML: complex items with many repeating elements
const GAMECORE_ARRAY_TAGS = new Set([
  'Type', 'GameModifier', 'Prereq', 'GameItemTypeModelPack',
  'SupportedUnitModelType', 'GameItemTypeModel', 'AttackSFX',
  'EquipSFX', 'SFX',
]);
const gameCoreParser = new XMLParser({
  ignoreAttributes: false,
  ignoreDeclaration: true,
  attributeNamePrefix: '@_',
  isArray: (name) => GAMECORE_ARRAY_TAGS.has(name),
});
```

### Step 2: Refactor `scripts/lib/merge-translations.mjs`

Replace `parseTranslationFile()` (lines 96–162):

**Before (regex):**
```javascript
const translationMatch = xmlContent.match(/<Translation>([\s\S]*?)<\/Translation>/);
const displayNameMatch = body.match(/<DisplayName>([\s\S]*?)<\/DisplayName>/);
// ... etc.
```

**After (parser):**
```javascript
import { parseTranslationXml } from './xml-parser.mjs';

function parseTranslationFile(xmlContent, category, internalName) {
  const parsed = parseTranslationXml(xmlContent);
  if (!parsed) return [];

  const entries = [];
  const nameUpper = internalName.toUpperCase();
  const keyPrefix = `TXT_BMB_${category}_${nameUpper}`;

  if (parsed.displayName) {
    entries.push({ key: `${keyPrefix}_DISPLAYNAME`, note: `DisplayName for ${internalName}`, text: parsed.displayName });
  }
  if (parsed.description) {
    entries.push({ key: `${keyPrefix}_DESCRIPTION`, note: `Description for ${internalName}`, text: parsed.description });
  }
  // ... etc. for backstory, provides, modifierDisplayNames
  return entries;
}
```

Replace `parseAbilityTranslationFile()` (lines 178–197):

**Before (regex):**
```javascript
const optionRegex = /<AbilityBonusOption[^>]*\sInternalName="([^"]+)"/g;
```

**After (parser):** Use `parseGameCoreXml()` (or a lightweight fragment parser) to extract `AbilityBonusOption` `InternalName` attributes from the fragment XML.

Remove `unescapeXml()` — `fast-xml-parser` handles entity decoding automatically.

Keep `escapeXml()` for the output assembly in `assembleLocalizationXml()`, but source it from the shared module.

Keep `discoverLanguages()` filename regex (`/^([a-z]{2})\.xml$/`) — this is not XML parsing.

### Step 3: Refactor `scripts/generate-reference.mjs`

Replace `loadLocalizationKeys()` (lines 73–113):

**Before (regex):**
```javascript
const lineRegex = /<Line\s+Key="([^"]+)"[^>]*>\s*<Text>([\s\S]*?)<\/Text>\s*<\/Line>/g;
// ... manual unescapeXml
```

**After (parser):**
```javascript
import { parseLocalizationXml } from './lib/xml-parser.mjs';

async function loadLocalizationKeys() {
  const keyMap = new Map();
  // ... file discovery stays the same ...
  for (const file of xmlFiles) {
    const content = await readFile(filePath, 'utf-8');
    const fileKeys = parseLocalizationXml(content);
    for (const [key, text] of fileKeys) {
      keyMap.set(key, text);
    }
  }
  return keyMap;
}
```

Move the existing GameCore parser configuration (lines 42–54) into the shared module and import it:

```javascript
import { gameCoreParser } from './lib/xml-parser.mjs';
// Remove local parser definition
```

### Step 4: Verify Build Output Parity

Run `npm run build` and `npm run reference` before and after the refactoring. Compare the generated output files to ensure byte-for-byte identical results:

- `Mods/src/Data/Localization/English/BMB_Strings_*.xml`
- `Mods/src/Data/GameCore/BMB_*.xml` (should be unchanged — `merge-xml.mjs` is not modified)
- `docs/references/items.md`

### Step 5: Update Documentation

- Update `AGENTS.md` § Project Stats table if the shared module is noteworthy.
- No changes needed to `Mods/README.md` or modding guide — this is an internal tooling change.

## Dependencies

- `fast-xml-parser` `^5.5.9` — already installed, no version change needed.
- No new dependencies.

## Required Components

### New Files
- `scripts/lib/xml-parser.mjs` — shared XML parser configurations and helper functions

### Modified Files
- `scripts/lib/merge-translations.mjs` — replace regex parsing with `fast-xml-parser`
- `scripts/generate-reference.mjs` — replace `loadLocalizationKeys()` regex; import shared parser

### Unchanged Files
- `scripts/lib/merge-xml.mjs` — text-based by design (format preservation)
- `scripts/build.mjs` — no XML parsing
- `scripts/split-xml.mjs` — one-time migration script
- `scripts/migrate-to-dirs.mjs` — one-time migration script
- `scripts/lib/output.mjs` — console helpers, no XML
- `scripts/menu.mjs` — interactive menu, no XML
- `scripts/prepare.mjs` — config reminder, no XML

## Assumptions

- The `fast-xml-parser` v5.x API is stable and its entity decoding behaviour matches the manual `unescapeXml()` implementation (handles `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&apos;`).
- Translation XML files (`en.xml`, `de.xml`, etc.) always follow the `<Translation>` wrapper format documented in `docs/modding-guide/README.md`.
- Localization output XML files always follow the `<GameText><Locale><Line>` format.
- The `isArray` configuration for `fast-xml-parser` correctly handles elements that may appear zero or one times (parser returns a single value) vs. elements that may appear multiple times (parser returns an array). The `Provides` and `ModifierDisplayName` elements need `isArray: true` because they can repeat.

## Constraints

- **Output parity is mandatory** — the refactored scripts must produce byte-for-byte identical output files. Any formatting difference in the generated localization XML or reference Markdown is a regression.
- **No new dependencies** — use only `fast-xml-parser` which is already installed.
- **OS independence** — all scripts must remain cross-platform (Windows, macOS, Linux) per `AGENTS.md` § Key Conventions.
- **`merge-xml.mjs` must not be changed** — its text-based approach is intentional for format preservation.

## Out of Scope

- Refactoring one-time migration scripts (`split-xml.mjs`, `migrate-to-dirs.mjs`) — already executed, low value.
- Refactoring `merge-xml.mjs` `extractFragmentContent()` — intentionally text-based.
- Upgrading `fast-xml-parser` version — current version is sufficient.
- Adding XML validation or schema checking — separate concern.
- Changing the translation file format (`<Translation>` wrapper) — this plan only changes how it's read, not its structure.

## Acceptance Criteria

- [ ] All regex-based XML parsing in `scripts/lib/merge-translations.mjs` is replaced with `fast-xml-parser`.
- [ ] All regex-based XML parsing in `scripts/generate-reference.mjs` `loadLocalizationKeys()` is replaced with `fast-xml-parser`.
- [ ] A shared parser module exists at `scripts/lib/xml-parser.mjs` with exported parser configurations.
- [ ] `scripts/generate-reference.mjs` imports its GameCore parser from the shared module instead of defining it locally.
- [ ] Manual `unescapeXml()` functions are removed from refactored files (entity decoding handled by parser).
- [ ] `escapeXml()` is consolidated into the shared module or uses `fast-xml-parser`'s `XMLBuilder`.
- [ ] `npm run build` produces identical output files before and after the change.
- [ ] `npm run reference` produces identical output before and after the change.
- [ ] No new dependencies are added to `package.json`.
- [ ] All scripts remain OS-independent.

## Testing Strategy

1. **Snapshot comparison**: Before starting, run `npm run build` and `npm run reference` to capture baseline output files. After refactoring, run both commands again and diff the output:
   - `Mods/src/Data/Localization/English/BMB_Strings_*.xml`
   - `docs/references/items.md`
   - `Mods/src/Data/GameCore/BMB_*.xml` (should be unchanged)

2. **Edge case verification**: Manually inspect that the parser correctly handles:
   - Multi-line `<Description>` content with XML entities (`&amp;`, `&lt;`, etc.)
   - `<Provides index="N">` elements with varying index values
   - `<ModifierDisplayName index="N">` elements
   - `<AbilityBonusOption>` blocks with nested content
   - Empty translation files (no `<DisplayName>`, etc.)
   - Translation files with only some fields present

3. **Regression guard**: If the project adds automated tests in the future, the shared parser module's functions are pure (input→output) and easily unit-testable.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **`fast-xml-parser` entity decoding differs from manual `unescapeXml()`** | Compare parser output against manual function for all existing translation files before removing the manual function. Pay special attention to `&apos;` handling (some parsers skip it). |
| **`fast-xml-parser` normalises whitespace differently than regex** | Configure `trimValues: true` to match the existing `.trim()` calls in regex extraction. Test with multi-line descriptions. |
| **`isArray` misconfiguration causes single-element arrays or unwrapped arrays** | Explicitly list `Provides`, `ModifierDisplayName`, and `Line` in `isArray` callbacks. Test with entries that have 0, 1, and multiple instances of each. |
| **Parser returns numeric values instead of strings for text content** | Configure `parseTagValue: false` or `tagValueProcessor` to preserve string types. The existing regex always returns strings. |
| **Breaking the build pipeline during refactoring** | Refactor one function at a time, running `npm run build` after each change to verify output parity. |
| **`escapeXml()` removal breaks localization output assembly** | Keep `escapeXml()` in the shared module for output generation. Only remove `unescapeXml()` (input parsing). |
