# Plan

## Summary

Follow-up rework plan addressing all actionable items from the `2026-03-28-reforged-compatibility` synthesis report. This plan covers six workstreams: a critical AI unit weapon-upgrade fix, removal of gender-mismatched model types from armor art packs, in-game smoke testing (including the AbilityBonusType risk), backstory rewrite for reclassified Wraith units, a documentation heading consistency pass, and resolution of the DarklingMale false finding.

## Architectural Context

This plan inherits the post-migration state of the Black Market Bazaar mod from the original `2026-03-28-reforged-compatibility` plan. All 11 mod XML files have been converted to UTF-8 and had schema/content fixes applied. Documentation has been updated.

### Relevant files

| File | Relevance |
|------|-----------|
| `Mods/Black Market Bazaar/BMB_Units.xml` | EquipmentUpgradeDef fix (line 330), backstory text (lines 349–358, 428–437) |
| `Mods/Black Market Bazaar/BMB_Armor.xml` | Gender-mismatched entries: `SlaveMale` in `Art_NihilistBreastpiece_2` (line 1940), `DarklingMale` + `SlaveMale` in `Art_LeatherVambraces_Regenerative_2` (lines 3512–3513) |
| `Mods/Black Market Bazaar/BMB_Items_DLC05.xml` | DarklingMale false finding — already present (line 35) |
| `Mods/Black Market Bazaar/BMB_Abilities.xml` | AbilityBonusType smoke-test verification |
| `docs/game-data/README.md` | Heading inconsistency (lines 74, 147, 175) |
| `c:\Users\newsl\Documents\My Games\ElementalReforged\debug.err` | Smoke test error log |

### Reference game data (read-only)

| File | Purpose |
|------|---------|
| `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\CoreWeapons.xml` | Verify `FireStaff` as valid WeaponUpgradeType for staves |
| `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\CoreUnits.xml` | Verify Wraith unit EquipmentUpgradeDef patterns |

## Approach / Architecture

Six workstreams, ordered by priority:

1. **WS-1 — Critical fix:** Update EquipmentUpgradeDef in `BMB_Units.xml` (1 line change)
2. **WS-2 — Art pack fix:** Remove 3 gender-mismatched model type entries from 2 female armor art packs in `BMB_Armor.xml`
3. **WS-3 — In-game smoke test:** 8-step test checklist from the original plan, plus AbilityBonusType verification
4. **WS-4 — Backstory rewrite:** Rewrite both Wraith unit backstories grounded in Resoln/Ceresa lore
5. **WS-5 — Documentation cleanup:** Rename 3 generic headings in `docs/game-data/README.md`
6. **WS-6 — Synthesis errata:** Close the DarklingMale false finding (no code change needed)

WS-1 and WS-2 are independent code fixes and can be parallelised. WS-3 depends on WS-1 and WS-2 completing first (smoke test covers the corrected state). WS-4 and WS-5 are independent of each other and of WS-1–WS-3. WS-6 is informational only.

## Rationale

- **EquipmentUpgradeDef first:** This is the only functional regression remaining — AI units playing as Wraiths will fail to find `Staff_Leht` for their weapon upgrades because the `LightningStaff` category no longer contains it.
- **Art pack fix second:** A full audit of 172 art packs across 4 mod files found 3 gender-mismatched entries in 2 art packs, both in `BMB_Armor.xml`. These are male model types (`SlaveMale`, `DarklingMale`) in otherwise female-only art packs — likely copy-paste errors from male variants. Removing them proactively avoids potential visual glitches where a male unit renders with female-fitted geometry.
- **Smoke test third:** Two original acceptance criteria (AC #14 and #15) are still pending. The test also covers the AbilityBonusType risk and general mod health.
- **Backstory rewrite fourth:** Both Wraith units retain identical undead-themed backstory referencing the old `Race_Type_Dead` identity. Game lore research reveals rich Wraith faction lore (Resoln, Ceresa's dark magic, shadow/death sorcery) that should replace the Calebethon undead narrative. The two units should receive distinct backstories matching their combat roles.
- **Documentation fifth:** Cosmetic heading consistency improvement.
- **DarklingMale errata last:** The synthesis incorrectly reported that `DarklingMale` was missing from `EsotericExposer`. Codebase verification confirms `DarklingMale` is present at `BMB_Items_DLC05.xml` line 35. No action required — this is recorded for traceability.

## Detailed Steps

### WS-1 — EquipmentUpgradeDef Fix (CRITICAL)

**Step 1: Update WeaponUpgradeType in `BMB_Unit_Dead_Mage_Lightning_AI`**
- File: `Mods/Black Market Bazaar/BMB_Units.xml`
- Line 330: Change `<WeaponUpgradeType>LightningStaff</WeaponUpgradeType>` to `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>`
- Context: The original plan's Step 7 moved `Staff_Leht` from `LightningStaff` to `FireStaff` in `BMB_CoreItemsModifications.xml`, but did not update this unit's EquipmentUpgradeDef which filters AI weapon shopping by upgrade type.
- After this fix, the AI will correctly find `Staff_Leht` (and other fire staves) when upgrading this unit's weapon slot.

**Design note:** The unit's `<ComparisonAttribute>UnitStat_Attack_Lightning</ComparisonAttribute>` on line 333 remains correct — this tells the AI to *prefer* weapons that maximise lightning attack damage, which is orthogonal to which *category* of weapons it scans. `Staff_Leht` already has lightning damage stats.

### WS-2 — Art Pack Gender Mismatch Fix (MEDIUM)

A comprehensive audit of all 172 art packs across `BMB_Armor.xml`, `BMB_Clothes.xml`, `BMB_Items.xml`, and `BMB_Items_DLC05.xml` found 3 gender-mismatched entries in 2 female-only art packs, both in `BMB_Armor.xml`.

**Step 2: Remove `SlaveMale` from `Art_NihilistBreastpiece_2`**
- File: `Mods/Black Market Bazaar/BMB_Armor.xml`
- Line 1940: Delete `<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>`
- Context: This art pack contains 11 female model types and 1 male model type (`SlaveMale`). The adjacent male art pack (`Art_NihilistBreastpiece_1`) correctly has all male types. This is a copy-paste error.

**Step 3: Remove `DarklingMale` and `SlaveMale` from `Art_LeatherVambraces_Regenerative_2`**
- File: `Mods/Black Market Bazaar/BMB_Armor.xml`
- Line 3512: Delete `<SupportedUnitModelType>DarklingMale</SupportedUnitModelType>`
- Line 3513: Delete `<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>`
- Context: This art pack contains 11 female model types and 2 male model types. The adjacent male art pack (`Art_LeatherVambraces_Regenerative_1`) correctly has all male types. Same copy-paste pattern.

### WS-3 — In-Game Smoke Test

**Step 4: Load the mod and check `debug.err`**
- Launch Elemental: Reforged with Black Market Bazaar enabled.
- After reaching the main menu, check `c:\Users\newsl\Documents\My Games\ElementalReforged\debug.err` for any XML parsing errors referencing BMB files.
- **Pass criterion:** No BMB-related errors in `debug.err`.

**Step 5: Hiergamenon verification**
- Open the Hiergamenon (in-game codex).
- Verify BMB items, spells, and equipment appear correctly.
- Verify the 31 consumable items (tagged `HideInHiergamenon=1`) do **not** appear in the codex.
- **Pass criterion:** All non-consumable BMB items visible; all consumables hidden.

**Step 6: Wraith unit design verification**
- Start a new game or load a save as a Wraith faction.
- Open the unit designer / army setup.
- Verify "Tempest Howlers" and "Intangible Knockers" appear in the AI-only unit list.
- **Pass criterion:** Both units accessible under Race_Type_Wraiths.

**Step 7: Staff_Leht weapon category verification**
- In the equipment/weapon browser, verify `Staff_Leht` appears under the correct upgrade category (FireStaff, not LightningStaff).
- **Pass criterion:** `Staff_Leht` is browsable in the staff/fire-staff category.

**Step 8: Equip BMB armor and clothing — visual check**
- Equip at least one BMB armor item and one BMB clothing item on a unit.
- Verify the model renders without visual artefacts or crashes.
- **Pass criterion:** Items render correctly; no crash on equip.

**Step 9: AbilityBonusType verification (Synthesis #4 from Next Steps)**
- In-game, verify the two BMB abilities (`BMB_EruditeAbility` / "Erudite" and `BMB_FamousAbility` / "Famous") function correctly when granted by their respective items.
- Check that the `<AbilityBonusType>Unit_Design</AbilityBonusType>` tag does not cause the abilities to appear in the level-up selection screen or produce any errors.
- **Expected outcomes:**
  - If abilities work correctly — no action needed.
  - If `Unit_Design` causes the abilities to incorrectly appear at level-up — remove the `<AbilityBonusType>` tag from both abilities in `BMB_Abilities.xml`.
  - If `Unit_Design` causes errors — remove the tag.

**Step 10: Items, spells, effects functional check**
- Use at least one BMB spell, activate one BMB effect (via item or spell), and buy/sell one BMB item from a shop.
- **Pass criterion:** No crashes; items/spells/effects function as expected.

### WS-4 — Backstory Rewrite

**Step 11: Rewrite `BMB_Unit_Dead_Mage_Lightning_AI` backstory ("Tempest Howlers")**
- File: `Mods/Black Market Bazaar/BMB_Units.xml`, lines 349–358
- Current: Shared copy-pasted undead text about rising from buried Calebethon. Misaligned with the Wraith racial identity after the `Race_Type_Dead` → `Race_Type_Wraiths` migration.
- **Rewrite direction:** These are lightning staff-wielding female Wraith mages (Banshee model). The new backstory should:
  - Reference Resoln (Wraith homeland) or Cyndrum (ancient temple) as their origin
  - Frame them as **Wraith sorcerers transformed by Ceresa's dark magic** — not undead
  - Emphasise their lightning/storm mastery as an expression of channelled elemental power
  - Reference the Wraith lore theme of painful magical transformation (bound in the runes of Resoln, screaming rebirth)
  - Tone: dark, menacing, fatalistic — matching the game's existing Wraith backstory style
- **Lore grounding (from game data):**
  - *"The people of Resoln are called Wraiths by some... monsters by others. They are neither man nor Fallen, but creatures of dark sorcery and magic, transformed by the spell that gave Ceresa power."*
  - Wraith mages *"share the Enchantress's blood, and thus, a bit of her power."*
  - Transformation involves fire shrines, magical binding runes, and agonising rebirth

**Step 12: Rewrite `BMB_Unit_Dead_Staff_AI` backstory ("Intangible Knockers")**
- File: `Mods/Black Market Bazaar/BMB_Units.xml`, lines 428–437
- Same constraints as Step 11, but this is a **distinct** unit type: staff-wielding Wraiths (not lightning-specialised).
- **Rewrite direction:**
  - Differentiate from Tempest Howlers — emphasise shadow/death magic and ethereal combat rather than lightning storms
  - Reference the Wraith lore theme of walking between worlds (*"walks between the world of the living and the realm of spirits"*)
  - Frame them as shadow warriors who phase through defences — matching their name "Intangible Knockers"
  - Tone should be more ghostly/spectral compared to the Tempest Howlers' elemental fury

### WS-5 — Documentation Heading Consistency (LOW PRIORITY)

**Step 13: Rename generic headings in `docs/game-data/README.md`**
- Three `####` headings use the generic label `Schema details (Reforged additions)` while six others use type-specific labels. Rename for consistency:

| Line | Current Heading | New Heading |
|------|-----------------|-------------|
| 74 | `#### Schema details (Reforged additions)` | `#### Schema details (Items)` |
| 147 | `#### Schema details (Reforged additions)` | `#### Schema details (Units)` |
| 175 | `#### Schema details (Reforged additions)` | `#### Schema details (Effects)` |

- These headings sit under the Items & Equipment, Units & Creatures, and Effects & Modifiers sections respectively — the type-specific names match the surrounding context.

### WS-6 — Synthesis Errata (NO CODE CHANGE)

**Step 14: Close DarklingMale false finding**
- Synthesis recommendation #3 stated that `DarklingMale` was missing from `EsotericExposer` in `BMB_Items_DLC05.xml`.
- **Finding:** `DarklingMale` IS present at line 35. This was a false finding in the synthesis.
- **Action:** No code change. Record this errata for traceability.

## Dependencies

- WS-1 (EquipmentUpgradeDef fix) and WS-2 (art pack fix) are independent and can be parallelised.
- WS-3 (smoke test) depends on WS-1 and WS-2 completing first so the test covers all corrected state.
- WS-3 (smoke test) is a prerequisite for closing AC #14 and #15 from the original plan.
- WS-4 (backstory) and WS-5 (heading cleanup) are independent of each other and of WS-1–WS-3.
- WS-6 is informational only — no dependency.

## Required Components

### Existing files to modify
- `Mods/Black Market Bazaar/BMB_Units.xml` — WS-1 (line 330), WS-4 (lines 349–358, 428–437)
- `Mods/Black Market Bazaar/BMB_Armor.xml` — WS-2 (lines 1940, 3512–3513)
- `docs/game-data/README.md` — WS-5 (lines 74, 147, 175)

### Files to read (smoke test)
- `c:\Users\newsl\Documents\My Games\ElementalReforged\debug.err` — WS-3

### Conditionally modified (based on smoke test results)
- `Mods/Black Market Bazaar/BMB_Abilities.xml` — Only if AbilityBonusType causes issues (Step 9)

### No new files needed

## Assumptions

- The `FireStaff` WeaponUpgradeType is the correct replacement for `LightningStaff` in the EquipmentUpgradeDef. This follows the same logic applied to `Staff_Leht` in the original plan's Step 7.
- The 3 gender-mismatched entries are copy-paste errors (male types in female packs) — removal is safe and won't affect any intentional functionality.
- Wraith lore grounding is based on verified in-game strings from `Strings_Core.xml`, `Strings_CoreUnits.xml`, and `Strings_Campaign_LH.xml`.

## Constraints

- No Git write operations (add, commit, branch) — the user handles source control.
- Backstory text must match the game's existing Wraith lore tone and vocabulary (dark, menacing, fatalistic).
- The two unit backstories must be distinct — no shared copy-pasted text.
- Smoke testing requires a working Elemental: Reforged installation and manual gameplay.

## Out of Scope

- Any further XML schema changes beyond the EquipmentUpgradeDef fix.
- Adding new items, spells, or units to the mod.
- Addressing the `HenchmanMale` model type in `BMB_Clothes.xml` (noted as out-of-scope in the original plan).
- Process improvements for documentation pipeline write-back assertions (Synthesis #6 — this is a tooling/workflow concern, not a mod change).

## Acceptance Criteria

| # | Criterion | Source |
|---|-----------|--------|
| 1 | `BMB_Units.xml` line 330 contains `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>` | WS-1 |
| 2 | Zero gender-mismatched `SupportedUnitModelType` entries remain in `BMB_Armor.xml` female art packs | WS-2 |
| 3 | The mod loads in Elemental: Reforged without XML parsing errors in `debug.err` | WS-3 (original AC #14) |
| 4 | BMB items appear in shops, spells cast, AI units spawn, effects render correctly | WS-3 (original AC #15) |
| 5 | Consumable items are hidden from the Hiergamenon | WS-3 |
| 6 | AbilityBonusType=Unit_Design impact documented (keep-or-remove decision recorded) | WS-3 |
| 7 | Both Wraith units have distinct backstory text grounded in Resoln/Ceresa lore, with no references to "undead", "dead citizens", or "Race_Type_Dead" themes | WS-4 |
| 8 | Three generic headings in `docs/game-data/README.md` renamed to type-specific labels | WS-5 |

## Testing Strategy

- **WS-1:** Verify the single-line change with a grep for `LightningStaff` — should return zero matches in weapon EquipmentUpgradeDef blocks (the string may still appear in `BMB_Weapons.xml` upgrade type definitions, which is correct).
- **WS-2:** Verify removal by grepping `BMB_Armor.xml` for `SlaveMale` in female art packs (named `*_2`). Also confirm the male art packs (`*_1`) still have their correct entries.
- **WS-3:** Full 7-step in-game smoke test (Steps 4–10 above). Results should be recorded in the synthesis.
- **WS-4:** Read-back the backstory text to confirm it no longer references "undead", "dead citizens", or Calebethon. Verify the two backstories are distinct.
- **WS-5:** Grep for `Schema details (Reforged additions)` in `docs/game-data/README.md` — should return zero matches.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **`FireStaff` EquipmentUpgradeDef may cause AI to pick non-lightning staves** | The `<ComparisonAttribute>UnitStat_Attack_Lightning</ComparisonAttribute>` still steers the AI toward lightning-damage weapons within the FireStaff pool. `Staff_Leht` has lightning stats and will be preferred. |
| **Removing male entries from female art packs breaks rendering for those models** | These male model types should never be assigned to a female-variant art pack — the male art pack (`*_1`) handles them. The engine selects the matching pack for each unit model type, so removing mismatched entries has no effect on correct rendering. |
| **AbilityBonusType=Unit_Design causes abilities to appear at level-up** | Smoke test Step 9 will confirm; fallback is removing the tag entirely. |
| **Backstory rewrite tone doesn't match game lore** | All lore references are grounded in verified in-game strings. The implementation should closely mirror the tone and vocabulary of existing Wraith unit backstories (e.g., `Unit_Mage_Wraith_Quest`, `BurningWraith_Ancient_Quest`). |
