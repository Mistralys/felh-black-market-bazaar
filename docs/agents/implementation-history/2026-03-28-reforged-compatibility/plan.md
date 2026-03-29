# Plan

## Summary

Bring the Black Market Bazaar mod to full compatibility with Elemental: Reforged, and update the project's game-data reference and modding guide to reflect the modern game's XML conventions. This plan consolidates all findings from both research audits (item-XML and full-XML) into a single, sequenced set of changes across three workstreams: **XML fixes**, **design decisions**, and **documentation updates**.

## Architectural Context

### Mod files (source of truth for changes)

All mod XML files live under `Mods/Black Market Bazaar/`:

| File | Content | Lines to touch |
|---|---|---|
| `BMB_Items.xml` | ~85 accessories/consumables | Encoding, 1× Skeleton, soirées fix, HideInHiergamenon |
| `BMB_Items_DLC05.xml` | 4 DLC-style items | Encoding, 3× Skeleton |
| `BMB_Weapons.xml` | 71 weapons | Encoding only |
| `BMB_Armor.xml` | 85 armor items | Encoding, 95× Skeleton |
| `BMB_Clothes.xml` | 19 clothing items | Encoding, 11× Skeleton |
| `BMB_Abilities.xml` | 2 abilities | Encoding, add AbilityBonusType |
| `BMB_Spells.xml` | 81 spells | Encoding only |
| `BMB_Effects.xml` | 32 effects | Encoding only |
| `BMB_Units.xml` | 22 AI units | Encoding, Race_Type_Dead fix, Blood_Undead fix |
| `BMB_UnitStats.xml` | 3 custom stats | Encoding only |
| `BMB_CoreItemsModifications.xml` | 1 override (Staff_Leht) | Encoding, WeaponUpgradeType fix |

### Documentation files (to be updated)

| File | Purpose |
|---|---|
| `docs/game-data/README.md` | Game data reference for agents and modders |
| `docs/modding-guide/README.md` | Modding patterns and conventions |

### Reference game data

Located at `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\`:
- `CoreItems.xml`, `CoreWeapons.xml`, `CoreArmor.xml`, `CoreClothes.xml`
- `CoreAbilities.xml`, `ReforgedAbilities.xml`
- `CoreSpells.xml`, `ReforgedSpells.xml`
- `CoreUnits.xml`, `ReforgedUnits.xml`
- `CoreEffects.xml`, `CoreUnitStats.xml`, `CoreRaceTypes.xml`

## Approach / Architecture

The work is divided into three sequential workstreams:

1. **WS-1 — Batch encoding conversion** (all 11 files, mechanical)
2. **WS-2 — Schema & content fixes** (file-specific, some require design decisions)
3. **WS-3 — Documentation updates** (game-data reference + modding guide)

WS-1 and WS-2 are pure mod-file edits. WS-3 updates the project's knowledge base so future agents and contributors work from correct conventions.

## Rationale

- **Encoding first:** Every file needs it, and doing it as a batch avoids interleaving encoding changes with content changes (which could introduce corruption).
- **Schema fixes second:** Grouped by severity (CRITICAL → HIGH → MEDIUM → LOW) so the most impactful compatibility issues are resolved first.
- **Documentation last:** The docs should reflect the *post-fix* state — describing the modern conventions that the mod now follows.

## Detailed Steps

### WS-1 — Encoding Conversion (CRITICAL)

**Step 1:** Convert all 11 BMB XML files from ISO-8859-1 to UTF-8.
- Change every `encoding="iso-8859-1"` / `encoding="ISO-8859-1"` XML declaration to `encoding="utf-8"`.
- Re-save each file with UTF-8 encoding (without BOM, matching modern game convention).
- **Files:** All 11 XML files listed in the table above.

**Step 2:** Fix the corrupted character in `BMB_Items.xml`.
- In the `CorruptiveChalice` item's `<Description>`, replace the garbled `soir�es` (or `soirées` in iso-8859-1) with the correct UTF-8 string `soirées`.

### WS-2 — Schema & Content Fixes

**Step 3: Remove `Skeleton` from armor art definitions (HIGH)**
- File: `BMB_Armor.xml`
- Delete all 95 `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines.
- Do NOT touch any other `SupportedUnitModelType` entries.

**Step 4: Remove `Skeleton` from clothes art definitions (HIGH)**
- File: `BMB_Clothes.xml`
- Delete all 11 `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines.

**Step 5: Remove `Skeleton` from item art definitions (HIGH)**
- File: `BMB_Items.xml` — remove 1 Skeleton line (in `Art_DimensionalDiadem_1`).
- File: `BMB_Items_DLC05.xml` — remove 3 Skeleton lines (in `EsotericExposer`, `LeatherVambraces_ArtifactHandlers`, `Robe_Riches`).

**Step 6: Do NOT remove `Skeleton` from weapons (NO-OP)**
- File: `BMB_Weapons.xml` — **leave all 71 Skeleton references intact**.
- Skeleton is still actively used in the modern `CoreWeapons.xml`.

**Step 7: Fix `Staff_Leht` override (CRITICAL)**
- File: `BMB_CoreItemsModifications.xml`
- Change `<WeaponUpgradeType>LightningStaff</WeaponUpgradeType>` to `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>`.
- This aligns with the intentional Reforged change. The rest of the override's stats are identical to the modern game, so no other changes needed.
- **Design decision:** The override could alternatively be removed entirely since the only remaining purpose was this now-stale `WeaponUpgradeType` value. However, keeping the file preserves the mod's ability to re-customize `Staff_Leht` in the future. **Recommend keeping and fixing.**

**Step 8: Fix `Race_Type_Dead` units (CRITICAL)**
- File: `BMB_Units.xml`
- Affected units: `BMB_Unit_Dead_Mage_Lightning_AI` ("Tempest Howlers") and `BMB_Unit_Dead_Staff_AI` ("Intangible Knockers").
- Replace `<RaceType>Race_Type_Dead</RaceType>` → `<RaceType>Race_Type_Wraiths</RaceType>` on both units.
- Replace `<Prereq><Type>Race</Type><Attribute>Race_Type_Dead</Attribute></Prereq>` → `<Prereq><Type>Race</Type><Attribute>Race_Type_Wraiths</Attribute></Prereq>` on both units.
- **Rationale:** Wraiths are the most thematically appropriate existing race for undead-style units.

**Step 9: Fix `Blood_Undead` ability references (CRITICAL)**
- File: `BMB_Units.xml`
- Same two units as Step 8.
- Replace all `Blood_Undead` references with `Blood_Wraith` (matching the new race assignment).

**Step 10: Add `AbilityBonusType` to BMB abilities (MEDIUM)**
- File: `BMB_Abilities.xml`
- Add `<AbilityBonusType>Unit_Design</AbilityBonusType>` to both `BMB_EruditeAbility` and `BMB_FamousAbility`.
- These abilities are granted by items (not selectable at level-up), so `Unit_Design` is the most appropriate classification.
- **Note:** This requires in-game testing to confirm the engine doesn't reject or mishandle the tag on item-granted abilities. If in-game testing reveals the tag actually causes issues, it can be removed.

**Step 11: Add `HideInHiergamenon` to consumable items (LOW-MEDIUM)**
- File: `BMB_Items.xml`
- Add `<HideInHiergamenon>1</HideInHiergamenon>` to all single-use consumable items (those with `<IsUsable>1</IsUsable>` and without `<CanBeEquipped>1</CanBeEquipped>`).
- Affected items (~20): `BookOfArcaneEquations`, `ElementalsFairyTales`, `TomeOfEnlightenment`, `RodentHandbook`, `InfiniteDiary`, `ScribesTablet`, `BloomingTonic`, `DexterousElixir`, `LiquidVigor`, `MagnifyingStimulant`, `RejuvenatingFusion`, `CauldronOfPlenty`, `BlueWine`, `TitleOfNobility`, `Mushroom_Experience`, `Mushroom_Hallucinogenic`, `Letter_Aggrandizement`, `FragranceOfSophistication`, `PhilosophersStone`, `ScatteredCoins`, `SackOfProvisions`.
- Place the tag after `<Description>` or near the other classification tags.

### WS-3 — Documentation Updates

**Step 12: Update `docs/modding-guide/README.md` — Encoding section**
- The modding guide currently recommends `encoding="iso-8859-1"` in its "Encoding & Formatting" section and in all XML code examples.
- Update the encoding guidance to recommend `encoding="utf-8"`.
- Update all XML declaration examples throughout the file to use `encoding="utf-8"`.

**Step 13: Update `docs/modding-guide/README.md` — SupportedUnitModelType guidance**
- Add a new subsection or note under the Items/Art Definition section explaining:
  - `Skeleton` is no longer valid as a `SupportedUnitModelType` for armor, clothes, and items.
  - `Skeleton` is still valid for weapons only.
  - List the current valid model types.

**Step 14: Update `docs/modding-guide/README.md` — New modern conventions**
- Add guidance on `<HideInHiergamenon>1</HideInHiergamenon>` for consumable items.
- Add guidance on `<AbilityBonusType>` as a required/recommended tag for ability definitions (with the known type values: `Unit_Level`, `Unit_Design`, `Player`, `Champion_Spellbook`, `Champion_Talent`).
- Update the Abilities XML example to include `<AbilityBonusType>`.

**Step 15: Update `docs/modding-guide/README.md` — Unit definition guidance**
- Add a note about valid race types (the 10 Reforged races: Altarians, Mancers, Ironeers, Amarians, Tarthans, Krax, Wraiths, Trogs, Urxen, Quendar).
- Note that `Race_Type_Dead` and `Blood_Undead` no longer exist.
- Mention that modern champion units use `<Class>`, `<Allegiance>`, `<CreatureType>`, and `<Unique>` tags, but these are optional for AI army designs.

**Step 16: Update `docs/game-data/README.md` — Encoding standard**
- Add a note that all modern game data files use UTF-8 encoding.

**Step 17: Update `docs/game-data/README.md` — Schema details per file type**
- Add subsections or notes documenting:
  - **Items:** `<HideInHiergamenon>` usage on consumables, `<ManaValue>` for craftable items, `<Type>Consumable</Type>` for battle items.
  - **Abilities:** `<AbilityBonusType>` as a categorization tag with known values.
  - **Units:** New tags (`<Class>`, `<Allegiance>`, `<CreatureType>`, `<Unique>`, `<UnitDisplayName>`), multi-level `<LevelMilestone>` progressions on champions.
  - **Effects:** New optional emitter tags (`<AnimatedStrip>`, `<AnimatedStripFPS>`, `<AnimatedStripStartRandom>`, `<LocalParticles>`).
  - **Spells:** New optional features (`<FormattedDescription>`, `<Calculate>`, `<Cooldown>`, `<PlayOnCaster>`, `<Radius>`, `<RadiusType>`).
  - **UnitStats:** New optional tags (`<DisplayNameShort>`, `<BaseSovereignAttribute>`, `<UnitStatGrouping>` with values: `AbilityStat`, `CalculatedStat`, `CombatStat`, etc.).
  - **Races:** Document the 10 playable race types and note that `Race_Type_Dead` was removed.
  - **Clothes:** New random-assignment properties (`RandomPeasantUnitLiklihood`, `RandomMerchantUnitLiklihood`, `RandomHeroUnitLiklihood`).
  - **Armor/Clothes:** `Skeleton` removed as a valid `SupportedUnitModelType`.

**Step 18: Update `docs/game-data/README.md` — Art definition pattern**
- Document that art definitions can be inline or external (referencing `CoreItemArt.xml` / `ArtGameItem.xml`).
- Note the engine auto-resolves `.png` ↔ `.dds` extensions.

## Dependencies

- Steps 1–2 (encoding) must complete before Steps 3–11 (content edits), to avoid re-encoding already-edited files.
- Steps 3–11 are independent of each other and can be parallelized.
- Steps 12–18 (documentation) are independent of each other but should happen after Steps 1–11 so the docs reflect the final state.

## Required Components

### Existing files to modify
- `Mods/Black Market Bazaar/BMB_Items.xml`
- `Mods/Black Market Bazaar/BMB_Items_DLC05.xml`
- `Mods/Black Market Bazaar/BMB_Weapons.xml`
- `Mods/Black Market Bazaar/BMB_Armor.xml`
- `Mods/Black Market Bazaar/BMB_Clothes.xml`
- `Mods/Black Market Bazaar/BMB_Abilities.xml`
- `Mods/Black Market Bazaar/BMB_Spells.xml`
- `Mods/Black Market Bazaar/BMB_Effects.xml`
- `Mods/Black Market Bazaar/BMB_Units.xml`
- `Mods/Black Market Bazaar/BMB_UnitStats.xml`
- `Mods/Black Market Bazaar/BMB_CoreItemsModifications.xml`
- `docs/game-data/README.md`
- `docs/modding-guide/README.md`

### No new files needed
All changes are modifications to existing files.

### Reference data (read-only)
- `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\` — modern game XMLs for verification.

## Assumptions

- The Wraiths race (`Race_Type_Wraiths`) is the best thematic fit for the former undead units. The mod author may prefer a different race.
- `AbilityBonusType` with value `Unit_Design` is appropriate for item-granted abilities. This is an educated guess requiring in-game verification.
- The `Staff_Leht` override should be kept and fixed rather than removed, preserving the mod's ability to customize it later.
- UTF-8 without BOM is the correct encoding target (matching modern game data files).
- The ~20 consumable items identified for `HideInHiergamenon` are the complete set. The actual count should be verified during implementation by scanning for `<IsUsable>1</IsUsable>` without `<CanBeEquipped>`.

## Constraints

- No Git write operations (add, commit, branch) — the user handles source control.
- The mod must remain backwards-compatible with its existing save games where possible (encoding and schema changes are load-time only, not save-breaking).
- Documentation updates must match the existing style and structure of the README files.

## Out of Scope

- Localization key migration (hardcoded English strings are fine for mods).
- Adding `DataChecksum` blocks to mod files (not required for mods).
- Adding `ManaValue` tags (BMB items are not used in the crafting system).
- Adding `<Type>Consumable</Type>` to any items (no BMB items use `UsableOnlyOnceInBattle`).
- Adding `IronGolem`/`JuggernautMale` model types to BMB armor (these are creature-specific; BMB items are hero equipment).
- Adding new Reforged spell features (`<Calculate>`, `<FormattedDescription>`, etc.) to existing BMB spells.
- Adding `RandomPeasantUnitLiklihood` etc. to BMB clothes (they have `Likelihood=0`).
- Multi-level `LevelMilestone` for BMB AI units (not applicable to AI army designs).
- The `HenchmanMale` model type in `BMB_Clothes.xml` — likely harmless, verify separately.
- In-game testing (documented as acceptance criteria but performed outside this plan).

## Acceptance Criteria

1. All 11 BMB XML files declare `encoding="utf-8"` and are saved in UTF-8 encoding.
2. The `soirées` string in `BMB_Items.xml` renders correctly.
3. Zero `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines remain in `BMB_Armor.xml`, `BMB_Clothes.xml`, `BMB_Items.xml`, and `BMB_Items_DLC05.xml`.
4. All 71 Skeleton references in `BMB_Weapons.xml` are preserved.
5. `BMB_CoreItemsModifications.xml` contains `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>`.
6. No references to `Race_Type_Dead` or `Blood_Undead` remain in `BMB_Units.xml`.
7. Both formerly-dead units reference `Race_Type_Wraiths` and `Blood_Wraith`.
8. Both BMB abilities contain an `<AbilityBonusType>` tag.
9. All consumable items in `BMB_Items.xml` have `<HideInHiergamenon>1</HideInHiergamenon>`.
10. `docs/modding-guide/README.md` recommends UTF-8 encoding in all examples and guidance.
11. `docs/modding-guide/README.md` documents Skeleton model type deprecation for non-weapon items.
12. `docs/modding-guide/README.md` includes `AbilityBonusType` and `HideInHiergamenon` guidance.
13. `docs/game-data/README.md` documents the modern schema additions per file type.
14. The mod loads in Elemental: Reforged without XML parsing errors (verified via `debug.err`).
15. Items appear in shops, spells cast, AI units spawn, effects render correctly.

## Testing Strategy

- **Automated verification (pre-launch):** After all edits, run a script to:
  - Confirm all 11 XML files contain `encoding="utf-8"` in their declaration.
  - Confirm zero Skeleton references in armor/clothes/items files.
  - Confirm zero `Race_Type_Dead` or `Blood_Undead` references.
  - Confirm `FireStaff` in `BMB_CoreItemsModifications.xml`.
  - Validate XML well-formedness of all 11 files.
- **In-game smoke test:**
  1. Load the mod in Elemental: Reforged.
  2. Check `debug.err` for XML parse errors.
  3. Open the Hiergamenon — verify BMB items/spells appear (and consumables don't).
  4. Start a game as Wraiths — verify the 2 formerly-dead units appear in AI army design options.
  5. Verify `Staff_Leht` appears under the correct weapon upgrade category.
  6. Equip a BMB armor item and clothing item — verify visuals render (no Skeleton crash).
  7. Use a BMB spell and verify effects play.
  8. Equip an item granting a BMB ability — verify the ability activates.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **AbilityBonusType value is wrong for item-granted abilities** | Test in-game; if abilities don't work, try removing the tag or using a different value. The tag may be optional for mod abilities. |
| **Wraiths race is not thematically appropriate for the undead units** | The mod author can reassign to a different race later. Wraiths is chosen as the closest thematic match among available races. |
| **Removing Staff_Leht's LightningStaff category breaks the BMB .str file** | Check `Mods/Data/BMB.str` for a `[WeaponUpgradeType_LightningStaff]` entry. If it exists and no other BMB weapon uses `LightningStaff`, remove that entry too. |
| **UTF-8 conversion introduces BOM bytes that the game parser can't handle** | Save without BOM. Modern game files do not use BOM. |
| **Some consumable items are misidentified for HideInHiergamenon** | Cross-reference each item's `IsUsable` and `CanBeEquipped` flags during implementation. Only hide items that are truly single-use and non-equippable. |
| **HenchmanMale model type in clothes causes issues** | Low risk — likely silently ignored. Flag for in-game verification during smoke test. |
