# Black Market Bazaar - Mod Module
  
The Black Market Bazaar (BMB) is a content mod for Elemental: Reforged (originally Fallen Enchantress: Legendary Heroes). It adds 244 new items, 76 item-related spells, and 19 new clothes for custom sovereigns.
  
All mod XML files use the BMB_ prefix for InternalName values to avoid collisions with the base game and other mods.
  
---

## XML Fragment Workflow

The XML files in `Mods/src/Data/GameCore/` are **generated** from individual fragment files in the `/xml` directory. The `/xml` directory is the source of truth — do not edit the monolithic XML files directly.

- **To edit an item**: modify its `fragment.xml` in `xml/<subfolder>/<InternalName>/fragment.xml`.
- **To edit English text**: modify `xml/<subfolder>/<InternalName>/en.xml`.
- **To add an item**: create a new directory `xml/<subfolder>/<InternalName>/` with `fragment.xml` and `en.xml`.
- **To add a translation**: copy `en.xml` to `<lang>.xml` (e.g., `de.xml`) and translate the text.
- **To build**: run `npm run build` — merges fragments and translations into monolithic files, then deploys.

The generated monolithic files (GameCore XML and Localization XML) are listed in `.gitignore` and are not tracked in version control.

---
  
## File Inventory

> **Note:** These files are generated from `/xml` fragments during `npm run build`.
  
| File | Root Element | Content | Source Fragments |
|---|---|---|---|
| BMB_Items.xml | GameItemTypes | Accessories, consumables, and miscellaneous items | `xml/items/` |
| BMB_Weapons.xml | GameItemTypes | Weapon definitions (axes, swords, staves, bows, wands) | `xml/weapons/` |
| BMB_Armor.xml | GameItemTypes | Armor pieces (helmets, shields, body armor) | `xml/armor/` |
| BMB_Clothes.xml | GameItemTypes | Clothing items (robes, cloaks, boots) - includes 19 sovereign-equippable outfits | `xml/clothes/` |
| BMB_Spells.xml | Spells | 76 item-triggered spell definitions | `xml/spells/` |
| BMB_Abilities.xml | AbilityBonuses | Custom hero/unit ability definitions | `xml/abilities/` |
| BMB_Effects.xml | EffectBlueprints | Visual effect definitions for BMB items | `xml/effects/` |
| BMB_Units.xml | UnitTypes | Custom unit definitions (e.g., summoned creatures) | `xml/units/` |
| BMB_UnitStats.xml | PlayerAbilityTypes | Custom unit stat type definitions | `xml/unit-stats/` |
| BMB_CoreItemsModifications.xml | GameItemTypes | Modifications/overrides to base game items | `xml/core-items-mods/` |
  
## Supporting Files
  
| File | Location | Purpose |
|---|---|---|
| BMB.str | Mods/src/Data/ | String table for UI labels (weapon type names, etc.) |
| BMB_Strings_Items.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for items |
| BMB_Strings_Weapons.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for weapons |
| BMB_Strings_Armor.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for armor |
| BMB_Strings_Clothes.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for clothes |
| BMB_Strings_Spells.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for spells |
| BMB_Strings_Abilities.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for abilities |
| BMB_Strings_Units.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for units |
| BMB_Strings_UnitStats.xml | Mods/src/Data/Localization/English/ | **Generated** English localization for unit stats |
| *.png | Mods/src/Gfx/Black Market Bazaar Icons/ | Item icons (227 PNG files) |
| *.dds | Mods/src/Gfx/Black Market Bazaar Icons/ | Texture files for 3D models (16 DDS files) |

> **Note:** Localization XML files are generated from per-entry `en.xml` (and other `<lang>.xml`) files in `xml/<category>/<Name>/` during `npm run build`. They are git-ignored. To add a translation, add `<lang>.xml` files to the entry directories and rebuild.
  
## Naming Conventions  
  
- InternalName: BMB_PascalCaseName for new items (e.g., BMB_AmuletOfContamination)  
- Icon files: BMB_PascalCaseName.png matching the InternalName  
- Texture files: BMB_PascalCaseName_Texture.dds for items with 3D models  
- Ability icons: BMB_Ability_PascalCaseName.png 
  
## Weapon Types Added  
  
The mod adds new weapon upgrade types not in the base game:  
- LightningStaff - Lightning-element staves  
- PoisonStaff - Poison-element staves  
- Wand - Wand-type weapons  
  
These are registered via the BMB.str string table. 
  
## Integration with Base Game  
  
- BMB_CoreItemsModifications.xml modifies existing base game items (e.g., adding new properties to vanilla staves).  
- All new content uses Likelihood values to integrate into the game's random item generation system.  
- Items reference base game prerequisites (Prereq) for tech and ability requirements. 
  
---  
  
## Reforged Compatibility (2026-03-28)  
  
The following changes were applied to make the mod compatible with Elemental: Reforged. 
  
### Consumable Items - Hiergamenon Visibility (BMB_Items.xml)  
 
All 31 qualifying consumable items in BMB_Items.xml have been tagged with HideInHiergamenon=1. 
A qualifying consumable is any item with IsUsable=1 and no CanBeEquipped element.  
 
This tag prevents single-use items from appearing in the in-game Hiergamenon (the codex/encyclopedia).  
Equippable items (accessories, armor, weapons, clothing) are intentionally excluded.  
 
Note: The original estimate was ~20 qualifying consumables. The actual count is 31. 
The 11 additional items are: Egg_BlackWidow, Egg_Naja, LostBarrowhillWine, Manashroom, MortarAndPestle, 
Scroll_ArcaneMonolith, Scroll_Obsession, Scroll_Violence, Scroll_VitalPoints, Token_CanisDirus, Token_Stalker. 
All are correctly classified as single-use non-equippable.  
 
Rule for future maintainers: Any new item in BMB_Items.xml with IsUsable=1 and no CanBeEquipped must also include HideInHiergamenon=1.  
 
### Ability Bonus Types (BMB_Abilities.xml)  
 
**Update (2026-03-28 rework):** The initial compatibility pass added `<AbilityBonusType>Unit_Design</AbilityBonusType>` to both `BMB_EruditeAbility` and `BMB_FamousAbility`. This was identified as incorrect and **the tag has been removed from both abilities**.  
 
**Why it was removed:** In the core game, every ability using `AbilityBonusType=Unit_Design` also carries a `<Cost>` element defining its unit-designer purchase price. Without `<Cost>`, the abilities appeared as free 0-cost options in the unit designer, bypassing the item-selling mechanic. BMB abilities are item-granted only (`HeroOnly=1`, `IsAvailableForUnitDesign=0`) and must not carry `AbilityBonusType`.  
 
The correct pattern — matching the 127-entry item-only model used by the core game — omits `AbilityBonusType` entirely. Items reference abilities via `UnlockUnitAbility`/`StrVal` using the option InternalName (`BMB_Erudite`, `BMB_Famous`), which is unaffected by this change. Each item also carries `IsAvailableForUnitDesign=0` as an independent safeguard against unit-designer appearance.  
 
Rule for future maintainers: Do **not** add `AbilityBonusType` to any item-granted-only ability. Only use `AbilityBonusType` for abilities that legitimately appear in the unit designer or level-up screen, and only when paired with a valid `<Cost>` element. See docs/modding-guide/README.md for full rules.  

### Mage_Lightning_AI Equipment Upgrade Fix (BMB_Units.xml)  

The `EquipmentUpgradeDef` Weapon-slot blocks for all 11 Mage_Lightning_AI unit variants
(Altarian, Amarian, Dead, Ironeer, Krax, Mancer, Quendar, Tarthan, Trog, Urxen, Wraith) have been changed
from `WeaponUpgradeType=LightningStaff` to `WeaponUpgradeType=FireStaff`.

**Why:** No LightningStaff weapon in the mod (or base game) is flagged as a valid AI upgrade target at the
time of this fix. The LightningStaff category was populated only by Staff_Thunderous, which is assigned to
Mage_Lightning_AI units as starting equipment — not as a shop-upgradeable item. The AI weapon-shopping
system silently skips categories with no eligible weapons, leaving these units unable to upgrade their weapon
slot during play. Switching to FireStaff allows the AI to locate Staff_Leht (a FireStaff with
`UnitStat_Attack_Lightning` modifier) as a valid upgrade candidate.

Staff_Thunderous retains `WeaponUpgradeType=LightningStaff` in BMB_Weapons.xml and is still equipped at unit
creation via `<Equipment>` tags; only upgrade shopping is affected by this change.

Rule for future maintainers: When adding a new weapon for Mage_Lightning_AI units to upgrade into, it must use
`WeaponUpgradeType=FireStaff` to be found by the AI upgrade system. The LightningStaff category is not used
for EquipmentUpgradeDef.

### Armor Art Pack Gender Conformance Fix (BMB_Armor.xml)  

Three gender-mismatched `SupportedUnitModelType` entries have been removed from two female armor art packs:

- **Art_NihilistBreastpiece_2**: removed `SlaveMale`
- **Art_LeatherVambraces_Regenerative_2**: removed `DarklingMale` and `SlaveMale`

Both female packs now contain exclusively female model types (11 entries each), matching the pattern used by
other female art packs in the file. The corresponding male packs (`Art_NihilistBreastpiece_1` and
`Art_LeatherVambraces_Regenerative_1`) are unchanged.

These were copy-paste errors introduced when the art packs were originally created. Mismatched entries could
cause male unit geometry to render incorrectly when equipping these armor pieces on female units in Reforged.

Note: The overall diff for BMB_Armor.xml also shows 84 `Skeleton` SupportedUnitModelType removals. These were applied in the original Reforged compatibility pass (2026-03-28), not this rework. See docs/modding-guide/README.md for the Skeleton deprecation policy.

### Unit Backstory Corrections (BMB_Units.xml)  

Two custom Wraith units had backstory text that was copy-pasted from a Calebethon unit and was lore-inaccurate.
Both backstories have been replaced with original, lore-appropriate text:

- **Tempest Howlers** (`BMB_Unit_Dead_Mage_Lightning_AI`): New backstory references Ceresa's binding rites,
  Resoln's oldest temple, rune-carving, and lightning transformation. Captures the painful erasure of self
  central to the Wraith archetype.

- **Intangible Knockers** (`BMB_Unit_Dead_Staff_AI`): New backstory references Resoln's shadow-places, the
  ritual crossing of the threshold between worlds, and the inability to fully return. The closing line directly
  reflects the unit's intangibility ability.

**Wraith unit backstory convention:** Both backstories follow the established second-person narrative voice
and three-paragraph structure used for Wraith units. Each paragraph escalates the transformation narrative,
and the final sentence echoes the unit's display name (e.g. "They call you Tempest Howlers. You do not
disagree."). Future BMB Wraith unit backstories should follow this same pattern. Non-Wraith BMB units use
third-person backstory narration — see other units in BMB_Units.xml for reference.

### In-Game Smoke Test — Pending Manual Verification  
 
Three acceptance criteria from the post-migration smoke test require a live in-game session to verify and are tracked as pending manual testing:  
 
| AC | Check | Automated result |
|---|---|---|
| AC #2 | All non-consumable BMB items visible in Hiergamenon; all 31 consumables hidden | 31 consumables confirmed by HideInHiergamenon tag count; non-consumable browser visibility requires gameplay |
| AC #5 | BMB armor and clothing render correctly when equipped | XML structure valid; render crash test requires equipping items in-game |
| AC #7 | At least one BMB spell casts, one effect activates, and one item buys/sells without crash | BMB_Spells.xml and BMB_Effects.xml are well-formed; functional test requires gameplay session |
 
These are an inherent limitation of automated mod testing — the game engine must be running to exercise rendering, effect activation, and the shop system. All other automated checks (XML validity, tag counts, unit configuration) passed.
