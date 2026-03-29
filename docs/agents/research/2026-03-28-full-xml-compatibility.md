# Research Report

## Problem Statement

The Black Market Bazaar (BMB) mod was originally built for *Fallen Enchantress: Legendary Heroes* approximately 6 years ago. The game has since been modernized as *Elemental: Reforged*. A prior audit ([2026-03-28-item-xml-compatibility.md](2026-03-28-item-xml-compatibility.md)) covered the three **item XML files** exclusively. This report extends the audit to cover **all remaining BMB XML files** against their modern game equivalents.

**Files audited (mod):**
- `BMB_Abilities.xml` — 2 custom ability bonuses (Erudite, Famous)
- `BMB_Armor.xml` — 85 armor items (helmets, forearms, boots, torso, shields)
- `BMB_Clothes.xml` — 19 cosmetic clothing items (hair, hoods, shirts)
- `BMB_Effects.xml` — 32 particle effect definitions
- `BMB_Spells.xml` — 81 spell definitions (combat abilities, item-triggered effects, strategic spells)
- `BMB_Units.xml` — 22 AI-only unit type definitions (pre-built army designs per faction)
- `BMB_UnitStats.xml` — 3 custom unit stat types (BlackSpike, Mastersmith, PenitentsSuffering)
- `BMB_Weapons.xml` — 71 weapon items (axes, swords, staves, bows, wands)
- `BMB_CoreItemsModifications.xml` — 1 core weapon override (Staff_Leht)

**Reference files (modern game):**
- `data\GameCore\CoreAbilities.xml` + `ReforgedAbilities.xml`
- `data\GameCore\CoreArmor.xml`
- `data\GameCore\CoreClothes.xml` + `CoreHairReforged.xml`
- `data\GameCore\CoreEffects.xml`
- `data\GameCore\CoreSpells.xml` + `ReforgedSpells.xml`
- `data\GameCore\CoreUnits.xml` + `ReforgedUnits.xml`
- `data\GameCore\CoreUnitStats.xml`
- `data\GameCore\CoreWeapons.xml`
- `data\GameCore\CoreRaceTypes.xml`
- `data\GameCore\CoreMonsterUnitTypes.xml`

## Problem Decomposition

1. **Encoding** — Are all BMB files still using iso-8859-1 vs the modern UTF-8?
2. **Skeleton model type** — Which file types have had it removed?
3. **Abilities schema** — Are there new required elements?
4. **Weapon schema & Staff_Leht override** — What has changed?
5. **Unit definitions** — Do referenced abilities, races, and equipment still exist?
6. **Spell schema** — Are there new elements the mod should adopt?
7. **Effects schema** — Has the emitter blueprint format changed?
8. **UnitStats schema** — Has the custom stat definition format changed?
9. **Clothes & Hair schema** — Any changes beyond Skeleton removal?

## Context & Constraints

- The mod adds new content alongside game data; it does not replace most core content.
- The previous items report identified encoding, Skeleton removal, and HideInHiergamenon as the key issues for items/accessories.
- This audit confirms which of those findings apply to the other file types and identifies new file-specific issues.

---

## Issue 1: XML Encoding — **CRITICAL** (All Files)

| File | Current Encoding | Modern Standard |
|------|-----------------|-----------------|
| BMB_Abilities.xml | `ISO-8859-1` | `utf-8` |
| BMB_Armor.xml | `iso-8859-1` | `utf-8` |
| BMB_Clothes.xml | `ISO-8859-1` | `utf-8` |
| BMB_CoreItemsModifications.xml | `ISO-8859-1` | `utf-8` |
| BMB_Effects.xml | `ISO-8859-1` | `utf-8` |
| BMB_Items.xml | `iso-8859-1` | `utf-8` |
| BMB_Items_DLC05.xml | `iso-8859-1` | `utf-8` |
| BMB_Spells.xml | `iso-8859-1` | `utf-8` |
| BMB_Units.xml | `ISO-8859-1` | `utf-8` |
| BMB_UnitStats.xml | `ISO-8859-1` | `utf-8` |
| BMB_Weapons.xml | `iso-8859-1` | `utf-8` |

**Impact:** Every modern game data file uses UTF-8 encoding. All 11 BMB files use ISO-8859-1. Combined with the previously-identified corrupted `soirées` character in `BMB_Items.xml`, this is a blanket conversion.

**Fix required:** Convert all 11 XML files to UTF-8 encoding.

---

## Issue 2: Skeleton SupportedUnitModelType — **HIGH** (File-Dependent)

The `Skeleton` model type's status varies by file type in the modern game:

| File Type | Skeleton in Modern Game? | Skeleton in BMB Mod | Action |
|-----------|-------------------------|---------------------|--------|
| CoreWeapons.xml | **YES** (20+ refs) | 71 refs | **No change needed** |
| CoreArmor.xml | **NO** (0 as SupportedUnitModelType) | 95 refs | **Remove all** |
| CoreClothes.xml | **NO** (0 refs) | 11 refs | **Remove all** |
| CoreItems.xml | **NO** (0 refs) | 1 ref (prior report) | **Remove** |
| BMB_Items_DLC05.xml | **NO** (items) | 3 refs (prior report) | **Remove** |

**Correction to the prior report:** The prior item audit stated Skeleton was "Completely removed from all item art defs." This is accurate for items, armor, and clothes art definitions — but **Skeleton is still present and actively used in CoreWeapons.xml** (every weapon definition includes it). The BMB weapons file does NOT need Skeleton removed.

**Fix required:**
- `BMB_Armor.xml`: Remove 95 `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines
- `BMB_Clothes.xml`: Remove 11 `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines
- `BMB_Items.xml` + `BMB_Items_DLC05.xml`: Remove 4 lines (per prior report)
- `BMB_Weapons.xml`: **No change needed** — Skeleton is still valid for weapons

---

## Issue 3: BMB_Abilities.xml — Missing `AbilityBonusType` — **MEDIUM**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| `<AbilityBonusType>` | Not present | Required on all abilities (e.g., `Unit_Level`, `Unit_Design`, `Player`, `Champion_Spellbook`, `Champion_Talent`) |
| `<Cost>` | Not present | Present on most level-up/design abilities (value: `1`) |
| `<PerkTreePosX/Y>` | Not present | Present on level-up abilities for perk tree positioning |
| `Icon file format` | `.png` | `.dds` in some new abilities |

**Affected BMB abilities:**
- `BMB_EruditeAbility` / `BMB_Erudite` — grants XP and research bonuses
- `BMB_FamousAbility` / `BMB_Famous` — grants Fame production

The modern game requires `<AbilityBonusType>` to categorize how an ability is acquired. These BMB abilities appear to be item-granted (unlocked via equipment `UnlockCombatAbility` or similar), not level-up or design abilities. Without `<AbilityBonusType>`, the game engine may either ignore the abilities entirely, use a default behavior, or encounter a parsing issue.

**Note:** The BMB abilities file already includes a `<DataChecksum>` block — this is present in the modern game format and is correct.

**Fix recommended:** Add `<AbilityBonusType>` to both abilities. Based on their usage (granted by items, not selectable at level-up), these should likely be:
```xml
<AbilityBonusType>Unit_Design</AbilityBonusType>
```
or alternatively omitted if the engine treats item-granted abilities differently. **Requires testing** to determine whether the engine hard-requires this tag on mod abilities.

---

## Issue 4: BMB_CoreItemsModifications.xml (Staff_Leht) — **CRITICAL**

Detailed comparison of the mod's override vs the modern game's version:

| Attribute | BMB Override | Modern CoreWeapons.xml | Difference |
|-----------|-------------|----------------------|------------|
| `WeaponUpgradeType` | `LightningStaff` | `FireStaff` | **Changed in Reforged** |
| `Skeleton` model type | Present | Present | Same |
| `UnitStat_Attack_Lightning` | 13 | 13 | Same |
| `UnitStat_CombatSpeed` | -6 | -6 | Same |
| `UnlockRangedAction` | `BowAttack_Lightning` | `BowAttack_Lightning` | Same |
| `AdditionalTrainingTurns` | 48 | 48 | Same |
| `ShopValue` | 290 | 290 | Same |
| `TacticalRange` | 20 | 20 | Same |
| Prerequisites | Identical | Identical | Same |
| Art definition | Identical | Identical | Same |

**Critical finding:** The Reforged developers changed `Staff_Leht`'s `WeaponUpgradeType` from `LightningStaff` to `FireStaff`. This is the **only** stat difference between the mod's override and the modern version. The BMB mod's override will revert this intentional Reforged change, potentially causing:
- The weapon to appear under the wrong upgrade category in the unit design screen
- AI unit upgrade logic to select it when looking for `LightningStaff` instead of `FireStaff`
- Inconsistency with how other fire/lightning staves are categorized

**Fix required:** Either:
1. **Update the override** to use `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>` to match Reforged, or
2. **Remove `BMB_CoreItemsModifications.xml` entirely** if the override no longer serves its original purpose (the stats are otherwise identical)

---

## Issue 5: BMB_Units.xml — Missing Race and Ability — **CRITICAL**

### 5a: `Race_Type_Dead` — Removed from Reforged

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| `Race_Type_Dead` | Used by 2 unit types | **Does not exist** — not in CoreRaceTypes.xml or anywhere in game data |

**Affected BMB units:**
- `BMB_Unit_Dead_Mage_Lightning_AI` ("Tempest Howlers") — uses `<RaceType>Race_Type_Dead</RaceType>`
- `BMB_Unit_Dead_Staff_AI` ("Intangible Knockers") — uses `<RaceType>Race_Type_Dead</RaceType>`

Both units also have `<Prereq><Type>Race</Type><Attribute>Race_Type_Dead</Attribute></Prereq>`, meaning they can only be recruited by a faction of that race. Since the race no longer exists, these units are **non-functional**.

The modern game handles undead as a `CreatureType` (e.g., the Banshee monster is `<CreatureType>Undead</CreatureType>`), not as a playable faction race. The 10 playable race types in Reforged are: Altarians, Mancers, Ironeers, Amarians, Tarthans, Krax, Wraiths, Trogs, Urxen, and Quendar.

**Fix required:** These two units need either:
1. **Reassignment** to an appropriate existing race (e.g., `Race_Type_Wraiths` which is visually thematic for undead), OR
2. **Removal** if the mod author determines they are no longer relevant

### 5b: `Blood_Undead` Ability — Missing

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| `Blood_Undead` | Referenced by 2 unit types | **Does not exist** in CoreAbilities.xml or ReforgedAbilities.xml or anywhere in game data |

The `Blood_*` abilities are racial blood abilities granted at unit creation (e.g., `Blood_Altarian`, `Blood_Wraith`). All other Blood abilities referenced by BMB units (`Blood_Altarian`, `Blood_Amarian`, `Blood_Ironeer`, `Blood_Krax`, `Blood_Mancer`, `Blood_Quendar`, `Blood_Tarth`, `Blood_Trog`, `Blood_Urxen`, `Blood_Wraith`) **all exist** in the modern game. Only `Blood_Undead` is missing.

**Fix required:** Replace `Blood_Undead` with the blood ability matching whatever race the units are reassigned to (see 5a above).

---

## Issue 6: BMB_Weapons.xml — **LOW** (Largely Compatible)

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Root element | `<GameItemTypes>` | `<GameItemTypes>` — Same |
| Encoding | `iso-8859-1` | `utf-8` — See Issue 1 |
| `DataChecksum` | Not present | Present |
| `Skeleton` model type | 71 refs | **Still present** in CoreWeapons |
| Localization | Hardcoded English | TXT_ keys |
| Weapon stats structure | Identical | Identical |
| `IronGolem` / `JuggernautMale` model types | Present in some weapons | Present — Same |

**The weapon schema is the most compatible of all file types.** The weapon definitions use the same structure, the same GameModifier patterns, the same art definition format. `Skeleton` is still valid for weapons. The BMB weapons already include `IronGolem` and `JuggernautMale` model types where appropriate.

**Fix required:** Encoding conversion only (Issue 1).

---

## Issue 7: BMB_Armor.xml — **HIGH** (Skeleton Removal Needed)

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Schema structure | Identical | Identical |
| `Skeleton` model type | **95 references** | **Removed** from CoreArmor.xml (0 as SupportedUnitModelType) |
| `IronGolem` model type | Not used | Used in some core armor items |
| `JuggernautMale` model type | Not used | Used in some core armor items |

**Analysis of missing model types:** CoreArmor.xml includes `IronGolem` and `JuggernautMale` as supported model types on certain heavy armor items. BMB's armor items do not include these. However, `IronGolem` and `JuggernautMale` are creature-specific model types (for Iron Golems and Juggernaut units respectively), and typical player-equippable armor doesn't need to support them. The BMB armor items are hero equipment, so this omission is acceptable.

**Fix required:**
1. Remove 95 Skeleton references
2. Encoding conversion (Issue 1)

---

## Issue 8: BMB_Clothes.xml — **MEDIUM** (Skeleton Removal Needed)

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Schema structure | Identical | Identical |
| `Skeleton` model type | **11 references** (in 4 items) | **Removed** from CoreClothes.xml |
| `HenchmanMale` model type | Used in 1 item | **Not present** in CoreClothes.xml |
| `DarklingMale` model type | Not used | **Not present** in CoreClothes.xml |
| New properties | N/A | `RandomPeasantUnitLiklihood`, `RandomMerchantUnitLiklihood`, `RandomHeroUnitLiklihood` |

**Note on `HenchmanMale`:** The mod's `Shirt_K_Male_Arming_Doublet_Leather` includes `HenchmanMale` in its model pack. CoreClothes.xml does not include `HenchmanMale` in any clothing items. This is likely harmless (silently ignored if that model type doesn't use clothes) but should be verified.

**Note on Random Likelihood properties:** Modern CoreClothes items use `RandomPeasantUnitLiklihood`, `RandomMerchantUnitLiklihood`, and `RandomHeroUnitLiklihood` to control how often clothes appear on randomly-generated units. BMB clothes like hairstyles and hoods have `<Likelihood>0</Likelihood>` (never randomly assigned), so these new properties are not needed.

**Fix required:**
1. Remove 11 Skeleton references
2. Encoding conversion (Issue 1)

---

## Issue 9: BMB_Effects.xml — **LOW** (Largely Compatible)

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Root element | `<EffectBlueprints>` | `<EffectBlueprints>` — Same |
| `DataChecksum` | Not present | Present in CoreEffects.xml |
| Emitter blueprint structure | Identical property set | Same, **plus 3 new optional tags** |
| New emitter tags | Not present | `<AnimatedStrip>`, `<AnimatedStripFPS>`, `<AnimatedStripStartRandom>`, `<LocalParticles>` |
| Encoding | `ISO-8859-1` | `utf-8` |

**Analysis:** The modern CoreEffects.xml adds four new optional emitter properties:
- `<AnimatedStrip>false</AnimatedStrip>` — whether the texture strip is animated
- `<AnimatedStripFPS>1</AnimatedStripFPS>` — animation frame rate
- `<AnimatedStripStartRandom>false</AnimatedStripStartRandom>` — random start frame
- `<LocalParticles>false</LocalParticles>` — particle coordinate space

All four default to `false`/`1`, which is the implicit behavior of the old format. The BMB effects file does not need these tags because the defaults match the intended behavior.

The mod's 32 particle effects reference standard textures from `Gfx\Effect\Shapes\` and `Gfx\Effect\Colors\` — these are core engine assets that remain in Reforged.

**Fix required:** Encoding conversion only (Issue 1).

---

## Issue 10: BMB_Spells.xml — **LOW** (Largely Compatible)

| Aspect | BMB Mod (81 spells) | Modern Game |
|--------|---------------------|-------------|
| Root element | `<Spells>` | `<Spells>` — Same |
| `DataChecksum` | Not present | Present |
| Localization | Hardcoded English | TXT_ keys |
| `HideInHiergamenon` | Used ✓ | Used — Same |
| `IsSpecialAbility` | Used ✓ | Used — Same |
| New spell features | N/A | `<FormattedDescription>`, `<Calculate>` blocks, `<Cooldown>`, `<PlayOnCaster>`, `<SpellTargetTileOccupied>`, `<IgnoreInvalidTargetsInRadius>`, `<Radius>`, `<RadiusType>` |
| `GiveItem` modifiers | Reference core and BMB items | All referenced items verified — exist |
| `<ValidTerrainCategory>` | Used ✓ | Used — Same |

**Analysis:** The modern spell system has added new optional features (calculated damage formulas, formatted descriptions, cooldown timers). These are used by new Reforged spells and upgraded existing spells. The BMB spells use fixed-value GameModifiers (no calculations), which is still fully supported — the `<Calculate>` system is additive, not a replacement.

**Item references verified:** All items referenced via `<ModType>GiveItem</ModType>` in `BMB_AlchemicalSurprise` (the random alchemy spell) resolve to items that exist either in the core game or in BMB's own `BMB_Items.xml`.

**Fix required:** Encoding conversion only (Issue 1).

---

## Issue 11: BMB_UnitStats.xml — **LOW** (Compatible)

| Aspect | BMB Mod (3 stats) | Modern Game |
|--------|-------------------|-------------|
| Root element | `<PlayerAbilityTypes>` | `<PlayerAbilityTypes>` — Same |
| Stat definition structure | `<UnitStatType>` with `DisplayName`, `Description`, `Icon`, `Hidden`, `DefaultValue` | Same, **plus** `<DisplayNameShort>`, `<BaseSovereignAttribute>`, `<UnitStatGrouping>` |
| New required tags? | None observed as required | `UnitStatGrouping` is present on core stats but likely optional |
| InternalName conflicts | None — all 3 BMB stats are unique | No conflicts |

**Analysis:** The modern CoreUnitStats.xml adds `<DisplayNameShort>` (abbreviation), `<BaseSovereignAttribute>` (meta flag), and `<UnitStatGrouping>` (display category: `AbilityStat`, `CalculatedStat`, `CombatStat`, etc.) to stat definitions. The BMB stats are hidden tracking counters (`Hidden=1`) that are not displayed in the UI, so these display-category tags are irrelevant for them.

The BMB custom stats (`UnitStat_BlackSpike`, `UnitStat_Mastersmith`, `UnitStat_PenitentsSuffering`) do not conflict with any core stat names.

**Fix required:** Encoding conversion only (Issue 1).

---

## Issue 12: BMB_Units.xml — Unit Schema Changes — **MEDIUM** (Beyond Race Issue)

| Aspect | BMB Mod (22 units) | Modern Game |
|--------|-------------------|-------------|
| Root element | `<UnitTypes>` | `<UnitTypes>` — Same |
| `DataChecksum` | Not present | Not present (CoreUnits.xml also lacks it) |
| Unit classification | `RaceType`, `CanBeDesigned`, `Gender`, etc. | Same, **plus** `<Class>`, `<Allegiance>`, `<CreatureType>`, `<Unique>`, `<UnitDisplayName>` |
| `Color_*` properties | Used by 2 undead units | Used by all modern champion units (5 color channels with alpha) |
| `LevelMilestone` | Single L1 milestone | Multiple milestones (L1–L12+) with per-level stats |
| `AutoCreateEquipment` | Not used | Used in modern champion definitions |
| Equipment references | 99 refs — all verified or BMB-defined | All resolve correctly |

**Analysis of new Unit tags:**
- `<Class>Adventurer</Class>` — used on modern champions but not on army unit designs
- `<Allegiance>Empire</Allegiance>` — faction alignment, used on champions
- `<CreatureType>Champion</CreatureType>` — unit type classification
- `<Unique>1</Unique>` — marks one-of-a-kind named characters

These tags are relevant for champion/named units. The BMB units are all `IsAIOnlyUnit=1` anonymous army designs (like "Lightning Strikers" or "Hardwood Adepts"), not named champions. The core game's own army-type units (in CoreAIUnits.xml) may or may not use these tags — the BMB pattern of omitting them is the same pattern used by the original game's AI unit designs.

The BMB units only define a single `<LevelMilestone>L1</LevelMilestone>` with no per-level stats. Modern champion units define L1–L12 with explicit per-level stat progressions. For AI army designs, this minimal milestone pattern appears to still be valid — the units gain stats from their equipment and abilities rather than from milestone progressions.

**Fix required (beyond Issue 5):** Encoding conversion only (Issue 1).

---

## Summary Table

| # | Issue | Severity | Files Affected | Action | Effort |
|---|-------|----------|---------------|--------|--------|
| 1 | Encoding iso-8859-1 → utf-8 | **CRITICAL** | All 11 BMB XMLs | Convert to UTF-8, fix `soirées` | Trivial |
| 2 | Remove `Skeleton` from armor | **HIGH** | BMB_Armor.xml (95 lines) | Delete lines | Small |
| 2 | Remove `Skeleton` from clothes | **HIGH** | BMB_Clothes.xml (11 lines) | Delete lines | Trivial |
| 2 | Remove `Skeleton` from items | **HIGH** | BMB_Items.xml (1), BMB_Items_DLC05.xml (3) | Delete lines (prior report) | Trivial |
| 2 | Weapons — Skeleton is FINE | N/A | BMB_Weapons.xml (71 refs) | **No change** | N/A |
| 3 | Missing `AbilityBonusType` | **MEDIUM** | BMB_Abilities.xml (2 abilities) | Add tag; needs testing | Trivial |
| 4 | Staff_Leht `WeaponUpgradeType` changed | **CRITICAL** | BMB_CoreItemsModifications.xml | Change `LightningStaff` → `FireStaff` or remove file | Trivial |
| 5a | `Race_Type_Dead` removed | **CRITICAL** | BMB_Units.xml (2 units) | Reassign race or remove units | Small |
| 5b | `Blood_Undead` removed | **CRITICAL** | BMB_Units.xml (2 units) | Replace with matching blood ability | Trivial |
| 6 | Weapons schema | **LOW** | BMB_Weapons.xml | Encoding only | N/A |
| 7 | Armor schema | **LOW** | BMB_Armor.xml | Skeleton + encoding | N/A |
| 8 | Clothes schema | **LOW** | BMB_Clothes.xml | Skeleton + encoding | N/A |
| 9 | Effects schema | **LOW** | BMB_Effects.xml | Encoding only | N/A |
| 10 | Spells schema | **LOW** | BMB_Spells.xml | Encoding only | N/A |
| 11 | UnitStats schema | **LOW** | BMB_UnitStats.xml | Encoding only | N/A |
| 12 | Units schema | **LOW** | BMB_Units.xml | Encoding + race fix | N/A |

---

## Recommendation

The BMB mod's XML files are **broadly compatible** with the modern game's structure. The fundamental schemas (root elements, GameModifier system, art definition format, spell/ability/unit structure) are all preserved. Four issues require immediate attention:

### Must Fix (Blocking)
1. **Convert all 11 XML files to UTF-8 encoding.** This is a batch operation.
2. **Remove `Skeleton` from armor and clothes** — 106 deletions total across 2 files (plus the 4 item deletions from the prior report).
3. **Fix or remove the Staff_Leht override** — the `WeaponUpgradeType` was intentionally changed from `LightningStaff` to `FireStaff` in Reforged.
4. **Address the two `Race_Type_Dead` units** — either reassign them to `Race_Type_Wraiths` (thematically appropriate for undead banshee-style units), replace `Blood_Undead` with `Blood_Wraith`, and update the race prerequisite — or remove them.

### Should Fix
5. **Add `AbilityBonusType` to BMB abilities** — needs testing to confirm whether the engine requires this tag for mod-defined abilities.
6. **Add `HideInHiergamenon` to consumable items** (from prior report) — UX improvement.

### No Change Needed
- **BMB_Weapons.xml**: Skeleton still valid. Schema fully compatible.
- **BMB_Effects.xml**: New emitter tags are optional with correct defaults.
- **BMB_Spells.xml**: All item references valid. New Calculate system is additive.
- **BMB_UnitStats.xml**: Custom stats don't conflict. New grouping tags optional.
- **Localization**: Hardcoded strings still supported for mods.

### Proof-of-Concept Outline
1. Batch-convert all 11 BMB XML files from ISO-8859-1 to UTF-8.
2. Fix `soirées` character in `BMB_Items.xml`.
3. Remove all `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` from `BMB_Armor.xml`, `BMB_Clothes.xml`, `BMB_Items.xml`, `BMB_Items_DLC05.xml`. Leave `BMB_Weapons.xml` untouched.
4. In `BMB_CoreItemsModifications.xml`, change `<WeaponUpgradeType>LightningStaff</WeaponUpgradeType>` to `<WeaponUpgradeType>FireStaff</WeaponUpgradeType>`.
5. In `BMB_Units.xml`, change `Race_Type_Dead` → `Race_Type_Wraiths` and `Blood_Undead` → `Blood_Wraith` for both affected units. Update the `<Prereq>` attribute accordingly.
6. Load the mod in-game and verify: items in shops, spells casting correctly, AI units spawning, effects rendering.

## Open Questions

- **Does the engine require `AbilityBonusType` on mod-defined abilities?** If yes, the two BMB abilities will fail silently. Testing needed.
- **What was the design intent behind the Staff_Leht override?** If the mod was only overriding it to change the `WeaponUpgradeType` (which Reforged has since changed differently), the file may be removable entirely.
- **Should the undead AI units be reassigned or removed?** If no playable faction in Reforged has an "undead" theme, the race prereqs mean these units can never be recruited by the AI, making them dead content.
- **Are there new unit model types introduced by Reforged** that BMB equipment should support? The core model type set appears unchanged (same 27 types), but the *usage patterns* have shifted (e.g., `Skeleton` dropped from non-weapon items).
- **Has the `HenchmanMale` model type been deprecated from clothes?** It's absent from CoreClothes.xml but still present in CoreWeapons.xml and CoreArmor.xml. The BMB Clothes item using it may need updating.

## References

- Prior item audit: `docs/agents/research/2026-03-28-item-xml-compatibility.md`
- Modern abilities: `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\CoreAbilities.xml`
- Modern armor: `...\CoreArmor.xml`
- Modern clothes: `...\CoreClothes.xml`
- Modern effects: `...\CoreEffects.xml`
- Modern spells: `...\CoreSpells.xml` + `...\ReforgedSpells.xml`
- Modern units: `...\CoreUnits.xml` + `...\ReforgedUnits.xml`
- Modern unit stats: `...\CoreUnitStats.xml`
- Modern weapons: `...\CoreWeapons.xml`
- Modern race types: `...\CoreRaceTypes.xml`
- Modern monster types: `...\CoreMonsterUnitTypes.xml`
