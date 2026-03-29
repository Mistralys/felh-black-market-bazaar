# Research Report

## Problem Statement

The Black Market Bazaar (BMB) mod was originally built for *Fallen Enchantress: Legendary Heroes* approximately 6 years ago. The game has since been modernized as *Elemental: Reforged*, which retains a very similar modding data file structure but introduces several changes. This report audits the mod's item XML files against the modern game's `CoreItems.xml` structure to identify all compatibility gaps and required changes.

**Files audited (mod):**
- `BMB_Items.xml` — ~85 custom items (accessories, consumables, scrolls, eggs, tokens, books)
- `BMB_Items_DLC05.xml` — 4 additional items (head/forearm/torso equipment, plus a treasure-finding accessory)
- `BMB_CoreItemsModifications.xml` — 1 core game item override (Staff_Leht weapon)

**Reference file (modern game):**
- `data\GameCore\CoreItems.xml` — ~180+ items
- `data\GameCore\CoreItemArt.xml` — externalized art definitions (DLC items)
- `data\GameCore\ArtGameItem.xml` — externalized art definitions (base items)

## Problem Decomposition

1. **Structural schema changes** — Are there new required or deprecated XML elements?
2. **Encoding & character set** — Has the XML encoding standard changed?
3. **Localization system** — How are display strings handled now?
4. **Unit model types** — Have supported unit model types changed?
5. **New item metadata fields** — Are there new tags the mod should adopt?
6. **Art definition architecture** — Has the inline-vs-external art definition pattern changed?
7. **Texture & icon asset references** — Are file format conventions different?

## Context & Constraints

- The mod is a content mod (items, spells, abilities) — not a total conversion.
- The mod adds new items; it does not replace many core items (only `Staff_Leht` is overridden).
- The modern game's `CoreItems.xml` retains the same root element (`<GameItemTypes>`) and the same fundamental `<GameItemType InternalName="...">` item structure.
- We are focusing exclusively on **items** in this audit — weapons, armor, clothes, spells, and effects are out of scope.

## Prior Art & Known Patterns

### Pattern 1: Original FE:LH Item Schema (used by BMB)
- **Encoding:** `iso-8859-1`
- **Strings:** Hardcoded English text in `<DisplayName>`, `<Description>`, `<Provides>`.
- **Art:** `<GameItemTypeArtDef>` blocks are always inlined within each `<GameItemType>`.
- **Model types:** Includes `Skeleton` as a `<SupportedUnitModelType>`.
- **No DataChecksum block.**
- **No `<HideInHiergamenon>` tag.**
- **No `<ManaValue>` tag.**
- **No `<Type>Consumable</Type>` category.**

### Pattern 2: Modern Elemental: Reforged Item Schema
- **Encoding:** `utf-8`
- **Strings:** Localization keys (e.g., `TXT_ITEMS_AMULETOFFLAMES_DISPLAYNAME`) mapped via `data\Localization\English\Strings_Items.xml`.
- **Art:** Mix of inline `<GameItemTypeArtDef>` and external references (art defs in `CoreItemArt.xml` / `ArtGameItem.xml`).
- **Model types:** `Skeleton` removed from all `<SupportedUnitModelType>` lists. All others (`DarklingMale`, `WraithFemale`, etc.) remain.
- **DataChecksum block** present at top of file: `<DataChecksum NoParse="1"><Ignore>DispName</Ignore><Translate>DisplayName,Description</Translate></DataChecksum>`.
- **`<HideInHiergamenon>1</HideInHiergamenon>`** used on single-use consumable items (books, healing potions).
- **`<ManaValue>`** present on newer craftable items (potions, rings, scrolls added by Reforged).
- **`<Type>Consumable</Type>`** used on some single-use battle items (e.g., `Scroll_Fireball`, `SilverFlute`, `MinorHealingPotion`).
- **`<BoolVal1>`** observed in some `GameModifier` blocks (e.g., `Potion_RefreshMoves`).

## Comparative Evaluation

### Issue 1: XML Encoding — **CRITICAL**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| XML declaration | `encoding="iso-8859-1"` | `encoding='utf-8'` |
| Special characters | At least 1 broken: `soir�es` (should be `soirées`) in CorruptiveChalice | UTF-8 throughout |

**Impact:** If the modern parser expects or prefers UTF-8, iso-8859-1 encoded files with non-ASCII characters will display garbled text. Even if the parser tolerates iso-8859-1, the already-broken `soir�es` string proves there's an existing encoding corruption.

**Fix required:** Convert all three item XML files to UTF-8 encoding and fix the corrupted `soirées` character in `BMB_Items.xml` line 638.

---

### Issue 2: Skeleton SupportedUnitModelType — **HIGH**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| `Skeleton` model type | Referenced in 4 places | Completely removed from all item art defs |

**Affected items:**
- `BMB_Items.xml`: `DimensionalDiadem` (1 reference, Art_DimensionalDiadem_1)
- `BMB_Items_DLC05.xml`: `EsotericExposer` (1 reference), `LeatherVambraces_ArtifactHandlers` (1 reference), `Robe_Riches` (1 reference)

**Impact:** Unknown whether the engine silently ignores unrecognized model types or throws errors. The `Skeleton` unit model type has been systematically removed from the modern game data, suggesting it no longer exists in the model system.

**Fix required:** Remove all `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines from both files.

---

### Issue 3: HideInHiergamenon — **LOW-MEDIUM**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Tag usage | Not used on any items | Used on all single-use consumable items (books, food, etc.) |

**Affected BMB items (consumables that should probably be hidden):**
- Books: `BookOfArcaneEquations`, `ElementalsFairyTales`, `TomeOfEnlightenment`, `RodentHandbook`, `InfiniteDiary`, `ScribesTablet`
- Potions/tonics: `BloomingTonic`, `DexterousElixir`, `LiquidVigor`, `MagnifyingStimulant`, `RejuvenatingFusion`
- Misc consumables: `CauldronOfPlenty`, `BlueWine`, `TitleOfNobility`, `Mushroom_Experience`, `Mushroom_Hallucinogenic`, `Letter_Aggrandizement`, `FragranceOfSophistication`, `PhilosophersStone`, `ScatteredCoins`, `SackOfProvisions`

**Impact:** Without this tag, these items will appear in the Hiergamenon (in-game encyclopedia), cluttering it with one-time-use items that the player can't study or plan around. Purely cosmetic/UX issue.

**Fix recommended:** Add `<HideInHiergamenon>1</HideInHiergamenon>` to all consumable `<IsUsable>1</IsUsable>` items that are used once and disappear.

---

### Issue 4: Localization Keys vs. Hardcoded Strings — **LOW (for mods)**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| DisplayName | Hardcoded English | `TXT_ITEMS_*_DISPLAYNAME` keys |
| Description | Hardcoded English | `TXT_ITEMS_*_DESCRIPTION` keys |
| Provides | Hardcoded English | `TXT_ITEMS_*_PROVIDES_*` keys |

**Impact:** The modern game uses localization keys for multi-language support. However, the game engine has historically supported both hardcoded strings and localization keys simultaneously — mods typically use hardcoded strings because they don't ship localization files. The core game items that existed in FE:LH (and still use TXT_ keys in Reforged) appear to have been migrated during the modernization pass.

**Fix NOT required** — unless the mod author wants to support multiple languages, in which case a `BMB_Strings.xml` localization file would need to be created under `Data/Localization/English/`.

---

### Issue 5: DataChecksum Block — **LOW**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| DataChecksum | Not present | `<DataChecksum NoParse="1"><Ignore>DispName</Ignore><Translate>DisplayName,Description</Translate></DataChecksum>` |

**Impact:** This is a validation/optimization hint for the game's data loader. It tells the parser which fields to translate and which to skip for checksumming. Since the mod uses hardcoded strings (not TXT_ keys), the `<Translate>` directive is irrelevant. Mod files typically do not need this block.

**Fix NOT required.**

---

### Issue 6: ManaValue Tag — **LOW**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| ManaValue | Not used | Present on newer craftable items (potions, rings, scrolls with ManaValue 1-3) |

**Impact:** `<ManaValue>` appears to define a mana cost for crafting items at the Alchemist building (a Reforged addition). BMB items are found in shops or goodie huts, not crafted, so this tag is irrelevant.

**Fix NOT required** — unless the mod wants to integrate with the new crafting system.

---

### Issue 7: Type "Consumable" — **LOW**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Type Consumable | Not used | Applied to some single-use battle items (`Scroll_Fireball`, `SilverFlute`, `MinorHealingPotion`) |

**Impact:** In the modern game, `<Type>Consumable</Type>` is selectively applied — most scrolls and potions do NOT have it. It appears to be used specifically on items that have `<UsableOnlyOnceInBattle>1</UsableOnlyOnceInBattle>`. The BMB mod does not have any items with `UsableOnlyOnceInBattle=1`, so this is not applicable.

**Fix NOT required.**

---

### Issue 8: Art Definition Architecture — **LOW (no change needed)**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Art defs | Inline within `<GameItemType>` | Mix of inline and external (`CoreItemArt.xml`, `ArtGameItem.xml`) |

**Impact:** The modern game supports BOTH inline art definitions (still used for most accessories, potions, etc.) and external references (used for equipment with complex multi-model-pack art). The BMB mod's approach of inlining all art definitions remains fully valid. Items like `BootsOfStealth` in the modern game reference `<ArtDef>Art_LeatherBoots</ArtDef>` without inlining, but this is just a convenience pattern — not a requirement.

**Fix NOT required.**

---

### Issue 9: Texture File Format References — **LOW (pre-existing)**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Icon files | `.png` references, `.png` files ✓ | `.png` references, `.png` files ✓ |
| Texture files | `.png` references in XML, `.dds` files on disk | Mix of `.png` and `.dds` in both XML and disk |

**Impact:** The BMB mod's XML references textures with `.png` extensions (e.g., `BMB_Esoteric_Exposer_Texture.png`) but the actual files are `.dds` (e.g., `BMB_Esoteric_Exposer_Texture.dds`). The game engine auto-resolves the extension. The modern game data shows the same mixed pattern in `ArtGameItem.xml`, so this is expected behavior.

**Fix NOT required** — this is a long-standing engine convention.

---

### Issue 10: BMB_CoreItemsModifications.xml (Staff_Leht Override) — **NEEDS VERIFICATION**

| Aspect | BMB Mod | Modern Game |
|--------|---------|-------------|
| Staff_Leht | Full item override in `BMB_CoreItemsModifications.xml` | May have been rebalanced or restructured in Reforged |

**Impact:** The mod completely overrides the core `Staff_Leht` weapon definition. If Reforged has modified this item (new stats, different prereqs, changed art references), the mod's override will revert those changes. This is a balance/gameplay concern, not a structural XML issue.

**Fix recommended:** Compare the mod's `Staff_Leht` definition against the Reforged version and reconcile any intentional changes the Reforged developers made, while preserving the mod's custom modifications.

---

## Summary Table

| Issue | Severity | Action | Effort |
|-------|----------|--------|--------|
| 1. XML encoding (iso-8859-1 → utf-8) | **CRITICAL** | Convert files + fix `soirées` | Trivial |
| 2. Remove `Skeleton` model type | **HIGH** | Delete 4 lines across 2 files | Trivial |
| 3. Add `HideInHiergamenon` to consumables | **LOW-MEDIUM** | Add tag to ~20 items | Small |
| 4. Localization keys | **LOW** | No action needed | N/A |
| 5. DataChecksum block | **LOW** | No action needed | N/A |
| 6. ManaValue tag | **LOW** | No action needed | N/A |
| 7. Type "Consumable" tag | **LOW** | No action needed | N/A |
| 8. Art definition architecture | **LOW** | No action needed | N/A |
| 9. Texture file references | **LOW** | No action needed | N/A |
| 10. Staff_Leht core override | **MEDIUM** | Verify against Reforged data | Small |

## Recommendation

The BMB mod's item XML files are **largely compatible** with the modern game's structure. The XML schema has not fundamentally changed — the same root elements, item definition structure, modifier system, and art definition format are all preserved.

**Two changes are required:**
1. **Convert encoding to UTF-8** and fix the broken `soirées` character. This is a file-level operation across all three item XMLs.
2. **Remove the `Skeleton` SupportedUnitModelType** from 4 art definition blocks (1 in BMB_Items.xml, 3 in BMB_Items_DLC05.xml).

**One change is recommended:**
3. **Add `<HideInHiergamenon>1</HideInHiergamenon>`** to all single-use consumable items for parity with the modern game's encyclopedia behavior.

**One item needs verification:**
4. **Verify the `Staff_Leht` override** in `BMB_CoreItemsModifications.xml` against the modern game's version to ensure no Reforged rebalancing is inadvertently reverted.

### Proof-of-Concept Outline
1. Re-save all three files as UTF-8 (with BOM or without, matching game convention).
2. Fix `soir�es` → `soirées` in CorruptiveChalice's Description.
3. Search-and-delete all `<SupportedUnitModelType>Skeleton</SupportedUnitModelType>` lines.
4. For each item where `<IsUsable>1</IsUsable>` and no `<CanBeEquipped>`, add `<HideInHiergamenon>1</HideInHiergamenon>` after `<Description>`.
5. Load the mod in-game and verify items appear correctly in shops and goodie huts.

## Open Questions

- **Does the modern game engine tolerate `iso-8859-1` declared files, or does it force UTF-8 parsing?** If the latter, all non-ASCII characters (even in comments) could cause parse failures. Testing with the game's error log would confirm.
- **Does an unrecognized `SupportedUnitModelType` cause a hard error or a silent skip?** If hard error, the Skeleton references become Critical rather than High.
- **Has the Reforged version of `Staff_Leht` been rebalanced?** A diff against the modern core data is needed to determine if the mod's override needs updating.
- **Are there new unit model types added in Reforged** that the mod's DLC05 equipment items should support? The mod's model type lists were comprehensive for FE:LH, but Reforged may have introduced new factions/models.

## References

- Modern game data: `C:\Steam\steamapps\common\Elemental Reforged\data\GameCore\CoreItems.xml`
- Modern art defs: `...\CoreItemArt.xml`, `...\ArtGameItem.xml`
- Modern localization: `...\Localization\English\Strings_Items.xml`
- Mod items: `F:\Webserver\www\htdocs\personal\felh-black-market-bazaar\Mods\Black Market Bazaar\BMB_Items.xml`
- Mod DLC05 items: `...\BMB_Items_DLC05.xml`
- Mod core override: `...\BMB_CoreItemsModifications.xml`
