# Project Synthesis Report

**Plan:** `2026-03-28-reforged-compatibility-rework-1`
**Date:** 2026-03-28
**Status:** COMPLETE
**Total Work Packages:** 7 / 7 COMPLETE

---

## Executive Summary

This follow-up plan resolved all actionable items identified in the `2026-03-28-reforged-compatibility` synthesis report. Six workstreams were executed across seven work packages:

1. **Critical AI regression fix** — All 11 Mage_Lightning_AI unit variants had their `WeaponUpgradeType` corrected from `LightningStaff` to `FireStaff`, enabling AI weapon-upgrade shopping to reach `Staff_Leht`.
2. **Armor art pack gender-mismatch removal** — Three male model type entries (`SlaveMale`, `DarklingMale`) were removed from two female-only armor art packs, eliminating visual glitch risk.
3. **In-game smoke test + AbilityBonusType fix** — A full smoke test was performed including a code fix: `AbilityBonusType=Unit_Design` was removed from `BMB_EruditeAbility` and `BMB_FamousAbility` to prevent them from appearing as free 0-cost options in the unit designer. All deferred in-game ACs were subsequently confirmed by live user testing.
4. **Wraith unit backstory rewrites** — Both Tempest Howlers and Intangible Knockers received new, lore-correct backstories rooted in Resoln/Ceresa Wraith faction lore, replacing a Calebethon "undead" text that had been copy-pasted from the wrong faction.
5. **Documentation heading cleanup** — Three generic `Schema details (Reforged additions)` headings in `docs/game-data/README.md` were renamed to section-specific identifiers.
6. **DarklingMale false-positive closure** — Confirmed `DarklingMale` was always present in `BMB_Items_DLC05.xml` line 35; the synthesis errata was closed with no code changes required.

All mod XML files remain well-formed. All acceptance criteria are met. Live in-game testing confirmed mod health post-fix.

---

## Metrics

| Work Package | Stage | Tests Passed | Tests Failed | Duration |
|---|---|---|---|---|
| WP-001 | implementation + qa + code-review + documentation | 6 | 0 | ~11 min |
| WP-002 | implementation + qa + code-review + documentation | 4 | 0 | ~8 min |
| WP-003 | implementation + qa × 2 + code-review × 2 + documentation × 2 | 7 (4 automated + 3 user-confirmed in-game) | 0 | ~65 min total (incl. re-run after user testing) |
| WP-004 | implementation + qa + code-review + documentation | 5 | 0 | ~12 min |
| WP-005 | implementation + qa + code-review + documentation | 5 | 0 | ~9 min |
| WP-006 | documentation | 3 | 0 | ~1 min |
| WP-007 | qa + code-review | 2 | 0 | ~2 min |
| **Total** | | **32** | **0** | |

**XML well-formedness:** All 7 BMB mod XML files validated as well-formed after all changes.

**Files Modified:**

| File | Changed By |
|---|---|
| `Mods/Black Market Bazaar/BMB_Units.xml` | WP-001 (EquipmentUpgradeDef), WP-004 (Tempest Howlers backstory), WP-005 (Intangible Knockers backstory) |
| `Mods/Black Market Bazaar/BMB_Armor.xml` | WP-002 (gender-mismatch removal) |
| `Mods/Black Market Bazaar/BMB_Abilities.xml` | WP-003 (AbilityBonusType removal) |
| `Mods/Black Market Bazaar/README.md` | WP-001, WP-002, WP-003, WP-004, WP-005 documentation |
| `docs/modding-guide/README.md` | WP-003 (AbilityBonusType guidance rewrite) |
| `docs/game-data/README.md` | WP-006 (heading rename) |

---

## Critical Findings

### 1. WP-001 — Scope Wider Than Spec Indicated
The WP description named a single unit (`BMB_Unit_Dead_Mage_Lightning_AI`, line 330), but the `LightningStaff` `EquipmentUpgradeDef` pattern was present in **all 11 race variants** of the Mage_Lightning_AI unit (Altarian, Amarian, Dead, Ironeer, Krax, Mancer, Quendar, Tarthan, Trog, Urxen, Wraith). The acceptance criterion `AC #2` ("zero LightningStaff matches file-wide") correctly captured full scope and all 11 were fixed atomically. **Future WP descriptions for this codebase should note when a pattern is replicated across all race variants.**

### 2. WP-003 — Invalid AbilityBonusType Pattern Found and Removed
`BMB_EruditeAbility` and `BMB_FamousAbility` both carried `<AbilityBonusType>Unit_Design</AbilityBonusType>` without a `<Cost>` element. Core game research confirms this is an invalid pattern: every `Unit_Design` ability in `CoreAbilities.xml` requires `<Cost>`, and 0 of 127 item-granted abilities use the `Unit_Design` type. Without `<Cost>`, these abilities would appear as free 0-cost options in the unit designer, undermining the item-selling mechanic. **Removed from both abilities.** The item-granting mechanism (via `UnlockUnitAbility` + option `InternalName`) is unaffected.

---

## Strategic Recommendations

### Gold Nugget 1 — Establish a "race-variant sweep" rule for future fixes
When any XML pattern is changed on a single unit, the mod developer or agent should immediately grep for the same pattern across the entire file. In this codebase, BMB unit definitions replicate across ~11 race variants with identical structure. A single-unit fix that does not sweep the file will leave 10 identical regressions in place. **Recommendation: Add a maintenance rule to BMB_Units.xml module documentation.**

### Gold Nugget 2 — AbilityBonusType requires <Cost> — document as a hard rule
The `Unit_Design` AbilityBonusType is only valid when paired with a `<Cost>` element. Item-granted abilities must omit `AbilityBonusType` entirely (and carry `IsAvailableForUnitDesign=0`). This rule has now been documented in `docs/modding-guide/README.md` and should be treated as a **hard schema constraint** for all future BMB ability authoring.

### Gold Nugget 3 — Staff_Thunderous AI upgrade path is intentionally severed
`Staff_Thunderous` (`BMB_Weapons.xml` ~line 7051) retains `WeaponUpgradeType=LightningStaff`. With all 11 Mage_Lightning_AI `EquipmentUpgradeDef` blocks now using `FireStaff`, the AI will never shop for `Staff_Thunderous` via upgrade mechanics — it is assigned only via starting `<Equipment>` tags. This is intentional: `Staff_Leht` (FireStaff, `UnitStat_Attack_Lightning=13`) is the correct upgrade target. **No action needed, but future maintainers should not expect AI to upgrade into `Staff_Thunderous`.**

### Gold Nugget 4 — Wraith backstory convention formalised
Both new Wraith unit backstories (Tempest Howlers: Ceresa/Resoln/lightning; Intangible Knockers: Resoln/shadow/threshold) follow an established pattern: **second-person voice, three-paragraph structure, final line echoes the unit name**. This convention is now documented in `Mods/Black Market Bazaar/README.md` as the required style for any future BMB Wraith unit. Non-Wraith BMB units use third-person; mixing styles within Wraith units would undermine the atmospheric consistency.

### Gold Nugget 5 — No automated in-game test harness exists
Three acceptance criteria in WP-003 could only be verified via live gameplay (Hiergamenon browser visibility, armor render on equip, functional spell/effect/shop). These required manual user confirmation. **Recommendation: If the modding workflow is expanded, consider a test checklist document that standardises which ACs always require manual game-session sign-off**, reducing the risk of prematurely marking them as passed.

---

## Open Items / Technical Debt

| Item | Priority | Source |
|---|---|---|
| `BMB_Units.xml` dual-EquipmentSlot pattern (Weapon + Defense in one EquipmentUpgradeDef block) is pre-existing but may confuse future maintainers | Low | WP-003 code-review debt |
| `BMB_Armor.xml` and `BMB_Abilities.xml` use inconsistent indentation (pre-existing) | Low | WP-001 / WP-002 implementation comments |
| Consider adding maintainer comment near `BMB_Unit_Dead_Mage_Lightning_AI` entries in `BMB_Units.xml` about the dual-EquipmentSlot pattern | Low | WP-003 code-review |
| WP-003 in-game ACs (AC #2, #5, #7) were validated by user; no automated coverage exists for these scenarios | Low | WP-003 QA |

---

## Next Steps for Planner / Manager

1. **No blocking issues remain.** The Black Market Bazaar mod is in a validated, Reforged-compatible state with all originally-identified regressions resolved and confirmed via live gameplay.
2. **Consider a lightweight "WP scope sweep" pre-flight** for any future fixes in `BMB_Units.xml` — always grep for the target pattern across the full file before scoping a WP as a single-unit fix.
3. **Future Wraith unit additions** should follow the established backstory convention documented in `Mods/Black Market Bazaar/README.md`.
4. **AbilityBonusType guidance** in `docs/modding-guide/README.md` is now accurate and should be referenced for any new ability authoring.
5. **Staff_Thunderous** (`WeaponUpgradeType=LightningStaff`) is intentionally orphaned from AI upgrade shopping. If future design intent changes (e.g., a new unit type should upgrade into thunderous staves), a new `EquipmentUpgradeDef` referencing `LightningStaff` will need to be authored.
