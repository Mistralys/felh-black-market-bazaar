# Plan

## Summary

Perform a comprehensive consistency audit of all Black Market Bazaar mod content descriptions — items, spells, abilities, weapons, armor, clothing, and units — checking for grammatical errors, typos, duplicate DisplayNames, description-vs-modifier mismatches, and vague or unhelpful descriptions. Produce an actionable audit report documenting all findings.

## Architectural Context

The mod's content is organized as per-entry XML directories under [`xml/`](xml/) with co-located translation files:
- [`xml/items/`](xml/items/) — Accessories, consumables, and other items
- [`xml/weapons/`](xml/weapons/) — All weapon types
- [`xml/armor/`](xml/armor/) — Armor pieces (head, torso, forearms, legs, boots, shields, cloaks)
- [`xml/clothes/`](xml/clothes/) — Cosmetic clothing pieces
- [`xml/spells/`](xml/spells/) — Tactical and strategic spells
- [`xml/abilities/`](xml/abilities/) — Ability definitions
- [`xml/units/`](xml/units/) — Unit type definitions
- [`xml/unit-stats/`](xml/unit-stats/) — Custom unit stat types

Each entry has a `fragment.xml` (game data with modifier definitions) and an `en.xml` (English display text: DisplayName, Description, Provides lines). The auto-generated reference docs in [`docs/references/`](docs/references/) provide a resolved view of all content.

## Approach / Architecture

1. **Read all auto-generated reference docs** to get a resolved view of all 263 items, 81 spells, 2 abilities, 22 units, and 3 unit stats.
2. **Cross-reference en.xml descriptions against fragment.xml modifiers** for items where the description claims specific bonuses.
3. **Search for duplicate DisplayNames** across all content categories.
4. **Flag grammatical errors, typos, missing punctuation, and vague descriptions.**
5. **Produce a categorized audit report** with severity levels and exact file paths.

## Rationale

Using the auto-generated reference docs as a starting point is efficient because they resolve all TXT_BMB_* keys into readable text. Individual en.xml and fragment.xml files are then consulted to verify specific issues and provide exact file paths for fixes.

## Detailed Steps

1. Read all reference docs (`items.md`, `spells.md`, `abilities.md`, `units.md`, `effects.md`, `unit-stats.md`)
2. Identify all duplicate DisplayNames across categories
3. Read individual en.xml files for items with suspicious descriptions
4. Cross-reference fragment.xml modifiers against en.xml Provides/Description text
5. Compile findings into categorized audit report
6. Save audit report

## Dependencies

- Auto-generated reference docs must be up-to-date (generated via `npm run reference`)

## Required Components

- All `xml/<category>/<Name>/en.xml` files (English text source of truth)
- All `xml/<category>/<Name>/fragment.xml` files (game data with modifiers)
- `docs/references/*.md` (auto-generated reference docs)

## Assumptions

- The auto-generated reference docs accurately reflect the current state of the en.xml and fragment.xml files
- English is the primary language being audited

## Constraints

- This is a read-only audit — no content files are modified
- Clothing items are cosmetic-only and have no descriptions to audit

## Out of Scope

- Non-English translations
- Game balance assessment (whether stat values are appropriate)
- Visual/icon consistency
- XML schema validation
- Build pipeline issues

## Acceptance Criteria

- All duplicate DisplayNames are identified with file paths
- All typos and grammatical errors are documented with exact locations
- All description-vs-modifier mismatches are flagged
- All vague or unhelpful descriptions are noted
- Audit report is saved to the plan directory

## Testing Strategy

Manual review of the audit report against the source files to confirm accuracy of findings.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Reference docs out of date** | Verified by spot-checking against source en.xml files |
| **Missed issues in large content set** | Systematic category-by-category review with cross-referencing |
