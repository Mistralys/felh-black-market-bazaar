# Content Description Audit Report

> **Date:** 2026-04-01
> **Scope:** All BMB mod content — items, weapons, armor, spells, abilities, units, unit-stats, clothing
> **Content audited:** 263 items, 81 spells, 2 abilities, 22 units, 3 unit stats, 19 clothing pieces

---

## Table of Contents

- [1. Typos & Spelling Errors](#1-typos--spelling-errors)
- [2. Grammar Issues](#2-grammar-issues)
- [3. Punctuation Issues](#3-punctuation-issues)
- [4. Duplicate DisplayNames](#4-duplicate-displaynames)
- [5. Description vs. Modifier Mismatches](#5-description-vs-modifier-mismatches)
- [6. Naming Inconsistencies](#6-naming-inconsistencies)
- [7. Vague or Unhelpful Descriptions](#7-vague-or-unhelpful-descriptions)
- [8. Thematic / Flavor Text Issues](#8-thematic--flavor-text-issues)
- [9. Summary Statistics](#9-summary-statistics)

---

## 1. Typos & Spelling Errors

### 1.1 — "Smmon" → "Summon" (3 spells)

**Severity: HIGH** — Visible typo in player-facing spell descriptions.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/spells/BMB_SummonAerialAlly/en.xml`](xml/spells/BMB_SummonAerialAlly/en.xml:4) | `Smmon a random level 6 Aerial Ally` | `Summon a random level 6 Aerial Ally` |
| [`xml/spells/BMB_SummonArachnid/en.xml`](xml/spells/BMB_SummonArachnid/en.xml:4) | `Smmon a random level 6 Spider` | `Summon a random level 6 Spider` |
| [`xml/spells/BMB_SummonLupus/en.xml`](xml/spells/BMB_SummonLupus/en.xml:4) | `Smmon a random level 8 Canine Friend` | `Summon a random level 8 Canine Friend` |

### 1.2 — "Etheral" → "Ethereal" (Manashroom)

**Severity: MEDIUM** — Typo in item description.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/items/Manashroom/en.xml`](xml/items/Manashroom/en.xml:4) | `The Etheral Mushroom` | `The Ethereal Mushroom` |

### 1.3 — "Syphon" → "Siphon" (spell name)

**Severity: LOW** — "Syphon" is an archaic/variant spelling of "Siphon". While not strictly wrong, it's inconsistent with the item [`Mystical Siphon`](xml/items/MysticalSiphon/en.xml:3) which uses the modern spelling. Consider standardizing.

| File | Current Text | Suggested Fix |
|------|-------------|---------------|
| [`xml/spells/BMB_SyphonStrength/en.xml`](xml/spells/BMB_SyphonStrength/en.xml:3) | `Syphon Strength` | `Siphon Strength` |

### 1.4 — "and enemy" → "an enemy" (Gildar Touch)

**Severity: HIGH** — Missing letter in spell description.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/spells/BMB_GildarTouch/en.xml`](xml/spells/BMB_GildarTouch/en.xml:4) | `whenever it strikes and enemy` | `whenever it strikes an enemy` |

### 1.5 — "those beatings hammers" → "those beating hammers" (Mastersmith's Anvil)

**Severity: MEDIUM** — Grammar/typo in item description.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/items/MastersmithsAnvil/en.xml`](xml/items/MastersmithsAnvil/en.xml:4) | `awaits those beatings hammers` | `awaits those beating hammers` |

### 1.6 — "a set a horns" → "a set of horns" (Horned Helmet)

**Severity: MEDIUM** — Missing word in armor description.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/armor/LeatherHelmet_Horned/en.xml`](xml/armor/LeatherHelmet_Horned/en.xml:4) | `it only takes a set a horns` | `it only takes a set of horns` |

### 1.7 — "enemies group" → "enemy groups" (Thunderstorm)

**Severity: MEDIUM** — Grammatical error in spell description.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/spells/BMB_Thunderstorm/en.xml`](xml/spells/BMB_Thunderstorm/en.xml:4) | `Lightning strikes all enemies group for 20 Lightning damage` | `Lightning strikes all enemy groups for 20 Lightning damage` |

---

## 2. Grammar Issues

### 2.1 — "to deadly effects" → "to deadly effect" (Scroll of Vital Points)

**Severity: LOW** — The idiom is "to deadly effect" (singular).

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/items/Scroll_VitalPoints/en.xml`](xml/items/Scroll_VitalPoints/en.xml:4) | `where to hit to deadly effects` | `where to hit to deadly effect` |

### 2.2 — "his target" → "their target" (Beguile)

**Severity: LOW** — Gender-neutral language would be more consistent with the rest of the mod's descriptions which generally use "they/their".

| File | Current Text | Suggested Fix |
|------|-------------|---------------|
| [`xml/spells/BMB_Beguile/en.xml`](xml/spells/BMB_Beguile/en.xml:4) | `instead of his target` | `instead of their target` |

### 2.3 — "Launch a normal Attack, knocks" → subject-verb agreement (Shield Slam)

**Severity: LOW** — Mixed imperative/declarative voice. "Launch" is imperative but "knocks" is third-person declarative.

| File | Current Text | Suggested Fix |
|------|-------------|---------------|
| [`xml/spells/BMB_ShieldSlam/en.xml`](xml/spells/BMB_ShieldSlam/en.xml:4) | `Launch a normal Attack, knocks targets back 1 tile and knocks them prone.` | `Launch a normal Attack, knock targets back 1 tile and knock them prone.` |

---

## 3. Punctuation Issues

### 3.1 — Missing trailing period (multiple spells)

**Severity: LOW** — Several spell descriptions lack a trailing period while most others have one. Inconsistent punctuation.

| File | Description (missing period) |
|------|-----|
| [`xml/spells/BMB_ShatterResistance/en.xml`](xml/spells/BMB_ShatterResistance/en.xml:4) | `Target loses 3 Defense and 6 Spell Resistance points per strike` |
| [`xml/spells/BMB_HeartOfTheTarget/en.xml`](xml/spells/BMB_HeartOfTheTarget/en.xml:4) | `Ignores 20% of the victim's defense when using a Bow` |
| [`xml/spells/BMB_Mindblast/en.xml`](xml/spells/BMB_Mindblast/en.xml:4) | `Does damage equal to 1/6 of the caster's added Spell Mastery and Spell Damage. Half if resisted` |
| [`xml/spells/BMB_IceRing/en.xml`](xml/spells/BMB_IceRing/en.xml:4) | `A ring of ice hitting adjacent enemies for double the caster's level + 2 per water shard (half if resisted)` |
| [`xml/spells/BMB_BloodCandles/en.xml`](xml/spells/BMB_BloodCandles/en.xml:4) | `+2 Hit Points to allies whenever an enemy is killed` |
| [`xml/spells/BMB_ForgingExcellence/en.xml`](xml/spells/BMB_ForgingExcellence/en.xml:4) | `Army gains +6 Attack, +6 Critical Chance and +100% Critical Damage` |

### 3.2 — Missing space before parenthetical (Heaven's Dichotomizer)

**Severity: LOW** — Missing space before opening parenthesis.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/weapons/Longsword_HeavensDichotomizer/en.xml`](xml/weapons/Longsword_HeavensDichotomizer/en.xml:6) | `20 Lightning damage(+4 per air shard)` | `20 Lightning damage (+4 per air shard)` |

---

## 4. Duplicate DisplayNames

### 4.1 — "Bow Attack" (3 spells) — CRITICAL

Three distinct wand-specific ranged attack spells share the identical DisplayName "Bow Attack" and identical description "Attack a unit from a distance with a single arrow from your bow." This is misleading because these are **wand** attacks, not bow attacks.

| InternalName | File | Weapon Context |
|---|---|---|
| `BMB_BowAttack_ElementalWand` | [`xml/spells/BMB_BowAttack_ElementalWand/en.xml`](xml/spells/BMB_BowAttack_ElementalWand/en.xml) | Elemental Wand |
| `BMB_BowAttack_EleventhFingerWand` | [`xml/spells/BMB_BowAttack_EleventhFingerWand/en.xml`](xml/spells/BMB_BowAttack_EleventhFingerWand/en.xml) | Archmage's Eleventh Finger |
| `BMB_BowAttack_FreezeburnWand` | [`xml/spells/BMB_BowAttack_FreezeburnWand/en.xml`](xml/spells/BMB_BowAttack_FreezeburnWand/en.xml) | Freezeburn Wand |

**Issues:**
1. The name "Bow Attack" is thematically wrong for wands
2. The description mentions "arrow from your bow" which doesn't apply to wands
3. All three are indistinguishable to the player

**Recommendation:** Rename to something like "Wand Attack" or give each a unique name reflecting the wand's element. Update descriptions to reference magical projectiles instead of arrows.

### 4.2 — "Chop" (2 spells)

Two spells share the DisplayName "Chop" but have different effects:

| InternalName | File | Description |
|---|---|---|
| `BMB_Chop` | [`xml/spells/BMB_Chop/en.xml`](xml/spells/BMB_Chop/en.xml) | "Strike twice." |
| `BMB_LittleRevenger` | [`xml/spells/BMB_LittleRevenger/en.xml`](xml/spells/BMB_LittleRevenger/en.xml) | "Retaliate twice, with a vengeance." |

**Issue:** `BMB_LittleRevenger` is a defensive retaliation spell triggered by `MeleeDefenseAppliesSpell`, not an offensive chop. Naming it "Chop" is misleading.

**Recommendation:** Rename `BMB_LittleRevenger`'s DisplayName to something like "Little Revenger" or "Vengeful Riposte" to distinguish it from the offensive Chop ability.

### 4.3 — "Haste" (2 spells)

| InternalName | File |
|---|---|
| `Haste` | [`xml/spells/Haste/en.xml`](xml/spells/Haste/en.xml) |
| `Haste_Adept` | [`xml/spells/Haste_Adept/en.xml`](xml/spells/Haste_Adept/en.xml) |

Both have identical DisplayName and Description. These may be intentional variants (base vs. adept tier) that the game engine differentiates internally. **Low priority** — verify if the game distinguishes them in the UI.

### 4.4 — "Slow" (3 spells)

| InternalName | File |
|---|---|
| `Slow` | [`xml/spells/Slow/en.xml`](xml/spells/Slow/en.xml) |
| `Slow_Adept` | [`xml/spells/Slow_Adept/en.xml`](xml/spells/Slow_Adept/en.xml) |
| `Slow_Ability` | [`xml/spells/Slow_Ability/en.xml`](xml/spells/Slow_Ability/en.xml) |

All three have identical DisplayName and Description. Same situation as Haste — likely intentional variants. **Low priority.**

### 4.5 — "Magic Mushroom" (2 items)

| InternalName | File | Actual Effect |
|---|---|---|
| `Mushroom_Hallucinogenic` | [`xml/items/Mushroom_Hallucinogenic/en.xml`](xml/items/Mushroom_Hallucinogenic/en.xml) | Unlocks `Hallucinations` ability |
| `Mushroom_Experience` | [`xml/items/Mushroom_Experience/en.xml`](xml/items/Mushroom_Experience/en.xml) | Gives 30 Experience |

Both share the same DisplayName, Description, and Provides text ("Mysterious properties"). The items have completely different effects but are indistinguishable to the player. This appears to be **intentional design** (random mushroom mechanic), but worth noting.

### 4.6 — Clothing Duplicates (multiple)

Several clothing items share DisplayNames across race/gender variants:

| DisplayName | Count | Files |
|---|---|---|
| Chain Arming Doublet | 2 | `Shirt_F_Male_Arming_Doublet_Chain`, `Shirt_K_Male_Arming_Doublet_Chain` |
| Chain Surcoat | 3 | `Surcoat_F_Male_Chain`, `Surcoat_Female_Chain`, `Surcoat_K_Male_Chain` |
| Leather Arming Doublet | 2 | `Shirt_F_Male_Arming_Doublet_Leather`, `Shirt_K_Male_Arming_Doublet_Leather` |
| Scale Arming Doublet | 2 | `Shirt_F_Male_Arming_Doublet_Scale`, `Shirt_K_Male_Arming_Doublet_Scale` |

**Assessment:** These are cosmetic clothing variants for different body types (Fallen Male, Kingdom Male, Female). Sharing DisplayNames is likely **intentional** since the game selects the appropriate variant based on the unit's model. **No action needed.**

---

## 5. Description vs. Modifier Mismatches

### 5.1 — Infinite Diary: "+30 Experience" vs "+30% Experience"

**Severity: MEDIUM** — The Provides text says "+30 Experience" but the actual modifier grants `+30` to `UnitStat_ExpBonus` which is a **percentage** bonus.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/items/InfiniteDiary/en.xml`](xml/items/InfiniteDiary/en.xml:5) | `Grants the unit the Erudite Ability - +30 Experience and +10% Research` | `Grants the unit the Erudite Ability - +30% Experience and +10% Research` |

Cross-reference: The ability itself in [`xml/abilities/BMB_EruditeAbility/en.xml`](xml/abilities/BMB_EruditeAbility/en.xml:4) also says `+30% Experience and 10% Research` (note: missing `+` before `10%`).

### 5.2 — Erudite Ability Description: Missing "+" sign

**Severity: LOW** — Minor formatting inconsistency.

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/abilities/BMB_EruditeAbility/en.xml`](xml/abilities/BMB_EruditeAbility/en.xml:4) | `+30% Experience and 10% Research` | `+30% Experience and +10% Research` |

### 5.3 — Sanguine Thinker: Description doesn't mention bonuses

**Severity: LOW** — The description talks about "carefree attitude" but the item grants `+1 Defense` and `+2 Attack`. The description is purely flavor text with no hint at the mechanical effects. While many items use pure flavor text, this helmet's effects (Attack bonus) don't obviously connect to the "carefree attitude" theme.

| File | Effects | Description Theme |
|------|---------|-------------------|
| [`xml/armor/SanguineThinker/en.xml`](xml/armor/SanguineThinker/en.xml) | +1 Defense, +2 Attack | "carefree attitude in combat" |

---

## 6. Naming Inconsistencies

### 6.1 — "Mastersmith" vs "Master smith" (inconsistent across set)

**Severity: MEDIUM** — The three items in the Mastersmith set use inconsistent naming:

| Item | File | Spelling Used |
|------|------|---------------|
| Mastersmith's Anvil | [`xml/items/MastersmithsAnvil/en.xml`](xml/items/MastersmithsAnvil/en.xml:3) | "Mastersmith's" (one word) |
| Mastersmith's Anvil (Provides) | [`xml/items/MastersmithsAnvil/en.xml`](xml/items/MastersmithsAnvil/en.xml:6) | "Tools of the Mastersmith" (one word) |
| Master smith's Forging Leathers | [`xml/armor/LeatherBreastpiece_Mastersmiths/en.xml`](xml/armor/LeatherBreastpiece_Mastersmiths/en.xml:3) | "Master smith's" (two words) |
| Master smith's Forging Leathers (Provides) | [`xml/armor/LeatherBreastpiece_Mastersmiths/en.xml`](xml/armor/LeatherBreastpiece_Mastersmiths/en.xml:6) | "Tools of the Master smith" (two words) |
| Mastersmith's Hammer | [`xml/weapons/Maul_Mastersmiths/en.xml`](xml/weapons/Maul_Mastersmiths/en.xml:3) | "Mastersmith's" (one word) |
| Mastersmith's Hammer (Provides) | [`xml/weapons/Maul_Mastersmiths/en.xml`](xml/weapons/Maul_Mastersmiths/en.xml:8) | "Tools of the Master smith" (two words) |
| Unit Stat DisplayName | [`xml/unit-stats/UnitStat_Mastersmith/en.xml`](xml/unit-stats/UnitStat_Mastersmith/en.xml:3) | "Tools of the Master smith Set" (two words) |
| Unit Stat Description | [`xml/unit-stats/UnitStat_Mastersmith/en.xml`](xml/unit-stats/UnitStat_Mastersmith/en.xml:4) | "Master smith" (two words) |

**Recommendation:** Standardize to "Mastersmith" (one word) everywhere. This is the more natural compound noun form and is already used in the Anvil's DisplayName and the Hammer's DisplayName.

### 6.2 — "BlackWidow" vs "Black Widow" (Black Widow Egg)

**Severity: LOW** — The Provides text says "Summons a BlackWidow" (no space).

| File | Current Text | Fix |
|------|-------------|-----|
| [`xml/items/Egg_BlackWidow/en.xml`](xml/items/Egg_BlackWidow/en.xml:5) | `Summons a BlackWidow` | `Summons a Black Widow` |

### 6.3 — "Cloak Of Eyes" — Capitalized "Of"

**Severity: LOW** — Most item names use lowercase prepositions ("of", "the") but this one capitalizes "Of".

| File | Current Text | Suggested Fix |
|------|-------------|---------------|
| [`xml/armor/CloakOfEyes/en.xml`](xml/armor/CloakOfEyes/en.xml:3) | `Cloak Of Eyes` | `Cloak of Eyes` |

---

## 7. Vague or Unhelpful Descriptions

### 7.1 — Spell descriptions that repeat the spell name

**Severity: LOW** — Some spell descriptions are tautological, repeating the spell/effect name without adding information.

| File | Description |
|------|-------------|
| [`xml/spells/BMB_LostBarrowhillWine/en.xml`](xml/spells/BMB_LostBarrowhillWine/en.xml:4) | `Lost Barrowhill Wine Effect - Random properties.` |
| [`xml/spells/BMB_RejuvenatingFusion/en.xml`](xml/spells/BMB_RejuvenatingFusion/en.xml:4) | `Rejuvenating Fusion Effect - Healing an injury comes with the added benefit of a random permanent increase in Hit Points.` |

The Lost Barrowhill Wine spell description is particularly unhelpful — "Random properties" tells the player nothing. The item description is excellent, but the spell tooltip (which is what the player sees in combat) is vague.

### 7.2 — Alchemical Surprise: "Random alchemical formula"

**Severity: LOW** — The strategic spell description `Random alchemical formula.` is very terse. While the randomness is the point, a slightly more descriptive text would help the player understand what to expect.

| File | Current Text |
|------|-------------|
| [`xml/spells/BMB_AlchemicalSurprise/en.xml`](xml/spells/BMB_AlchemicalSurprise/en.xml:4) | `Random alchemical formula.` |

---

## 8. Thematic / Flavor Text Issues

### 8.1 — "Bow Attack" description on wand spells

**Severity: HIGH** — Three wand ranged attack spells describe themselves as "Attack a unit from a distance with a single arrow from your bow." Wands don't fire arrows. This is thematically incorrect.

Already documented in [§4.1](#41--bow-attack-3-spells--critical) — the description should reference magical projectiles, not arrows.

### 8.2 — "Chop" name on Little Revenger's defensive spell

**Severity: MEDIUM** — The Little Revenger dagger's defensive retaliation spell is named "Chop" but it's a counter-attack, not a chopping attack. The description "Retaliate twice, with a vengeance" correctly describes the mechanic but the name "Chop" is misleading.

Already documented in [§4.2](#42--chop-2-spells).

### 8.3 — Leopard Rush: "+3 Initiative" seems counterintuitive

**Severity: LOW** — The spell description says "+3 Initiative the first time the unit takes a hit." Gaining initiative after being hit is an unusual mechanic. The description is accurate to the modifier, but a brief thematic explanation (e.g., "The leopard's reflexes kick in") would help players understand the design intent.

---

## 9. Summary Statistics

| Category | Count |
|----------|-------|
| **HIGH severity issues** | 5 |
| **MEDIUM severity issues** | 6 |
| **LOW severity issues** | 13 |
| **Total issues** | 24 |

### High Priority Fixes (5)

1. ✏️ Fix "Smmon" → "Summon" in 3 summon spell descriptions
2. ✏️ Fix "and enemy" → "an enemy" in Gildar Touch description
3. 🏷️ Rename/redescribe 3 "Bow Attack" wand spells to not reference bows/arrows

### Medium Priority Fixes (6)

4. ✏️ Fix "Etheral" → "Ethereal" in Manashroom description
5. ✏️ Fix "those beatings hammers" → "those beating hammers" in Mastersmith's Anvil
6. ✏️ Fix "a set a horns" → "a set of horns" in Horned Helmet
7. ✏️ Fix "enemies group" → "enemy groups" in Thunderstorm
8. 🔢 Fix "+30 Experience" → "+30% Experience" in Infinite Diary Provides text
9. 🏷️ Standardize "Mastersmith" spelling across all 3 set items + unit stat

### Low Priority Fixes (13)

10. ✏️ Fix "to deadly effects" → "to deadly effect" in Scroll of Vital Points
11. ✏️ Fix "his target" → "their target" in Beguile
12. ✏️ Fix subject-verb agreement in Shield Slam
13. ✏️ Add missing trailing periods to 6+ spell descriptions
14. ✏️ Add missing space before parenthetical in Heaven's Dichotomizer Provides
15. ✏️ Add missing "+" before "10%" in Erudite ability description
16. ✏️ Fix "BlackWidow" → "Black Widow" in Black Widow Egg Provides
17. ✏️ Fix "Cloak Of Eyes" → "Cloak of Eyes" capitalization
18. 🏷️ Consider renaming `BMB_LittleRevenger` spell from "Chop" to something unique
19. 🏷️ Consider standardizing "Syphon" → "Siphon" for consistency with Mystical Siphon
20. 📝 Improve Lost Barrowhill Wine spell description beyond "Random properties"
21. 📝 Improve Alchemical Surprise description
22. 📝 Consider adding thematic context to Leopard Rush description
23. 📝 Verify Haste/Slow duplicate DisplayNames are intentional (game engine variants)

### Legend

- ✏️ Text fix (typo, grammar, punctuation)
- 🏷️ Naming change (DisplayName or consistency)
- 🔢 Data accuracy fix (description doesn't match modifier)
- 📝 Content improvement suggestion (optional)
