# Plan — Frenzy Charm Item

## Summary

Add a new equippable accessory called **Frenzy Charm** (`BMB_FrenzyCharm`) to the Black Market Bazaar mod. The item grants the base game's **Maul** ability to the equipped unit. The Maul ability exists in the base game but is currently only available through unit design (restricted to Juggernaut models) and certain monster units — there is no regular loot item that provides it. The Frenzy Charm makes this combat ability available as rare, hero-only loot.

## Architectural Context

- **Item definitions** live in `Mods/src/Data/GameCore/BMB_Items.xml` under the `<GameItemTypes>` root element.
- **Ability-granting equippable accessories** follow the pattern established by `BirdOfCelerity` (line ~155): `Type=Accessory`, `CanBeEquipped=1`, `HeroOnly=1`, `IsAvailableForUnitDesign=0`, `IsUsable=0`, with a `GameModifier` using `UnlockUnitAbility` and the base game ability option's `InternalName` as `StrVal`.
- The **Maul ability** is defined in the base game's `CoreAbilities.xml` as `AbilityBonus InternalName="MaulAbility"` with option `InternalName="Maul"`. It sets `UnitStat_MaulChance` to 100, giving the unit a 100% chance to trigger the Maul combat effect (applies MaulDebuff to target: −15% accuracy for 1 turn; applies MaulBuff to self: +40 Dodge for 1 turn).
- Items reference base game abilities directly via `UnlockUnitAbility` / `StrVal` — no BMB ability definition is needed (precedent: `BookOfArcaneEquations` references base game `SpellResistance_Level`).
- The icon `BMB_FrenzyCharm.png` already exists at `Mods/src/Gfx/Black Market Bazaar Icons/`.
- File inventory and counts are tracked in `Mods/README.md`.

## Approach / Architecture

Add a single `<GameItemType>` block to `BMB_Items.xml` following the equippable accessory pattern. The item grants the base game's `Maul` ability option via `UnlockUnitAbility`. No new ability, spell, or effect definitions are required — the base game's Maul system (ability + MaulBuff/MaulDebuff spells) handles all combat mechanics.

## Rationale

- **Equippable accessory** (not consumable): The flavor text describes a "charm" that the wearer carries, and the Maul ability is a persistent combat capability — not a one-time stat boost. An equippable slot item fits the design better than a consumable.
- **Direct base game ability reference**: The `Maul` AbilityBonusOption already exists and works correctly. Creating a duplicate BMB ability would be unnecessary complexity.
- **Rare rarity with Likelihood=10**: Matches other rare ability-granting accessories like `BirdOfCelerity`. This ensures the item spawns infrequently enough to feel special.
- **ShopValue ~400**: Comparable to `BirdOfCelerity` (400) and `InfiniteDiary` (450). Maul is a powerful combat ability (guaranteed accuracy debuff + dodge self-buff on every attack), justifying a high price point.
- **HeroOnly=1**: Combat abilities of this power level are hero-only in both the base game and BMB.
- **No level prerequisite**: The base game's comparable ability-granting accessories (`BirdOfCelerity`, `InfiniteDiary`) do not gate behind level requirements. If desired, a `Prereq` with `UnitStat_Level` could be added, but this plan omits it to match existing BMB conventions.

## Detailed Steps

### 1. Add the Frenzy Charm item to `BMB_Items.xml`

Insert the following `<GameItemType>` block into `Mods/src/Data/GameCore/BMB_Items.xml`, placed alphabetically among the existing items (after items starting with "F", near other "F"-prefix items):

```xml
<GameItemType InternalName="BMB_FrenzyCharm">
    <DisplayName>Frenzy Charm</DisplayName>
    <Description>An ancient bone charm etched with forgotten runes. When worn, it frenzies the bearer into a blind, berserker rage — they maul everything in their path.</Description>
    <Type>Accessory</Type>
    <CanBeEquipped>1</CanBeEquipped>
    <ShopValue>400</ShopValue>
    <GameModifier>
        <ModType>Unit</ModType>
        <Attribute>UnlockUnitAbility</Attribute>
        <StrVal>Maul</StrVal>
        <Provides>Grants the Maul ability</Provides>
    </GameModifier>
    <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
    <Likelihood>10</Likelihood>
    <RarityDisplay>Rare</RarityDisplay>
    <HeroOnly>1</HeroOnly>
    <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
    <IsUsable>0</IsUsable>
    <AIData AIPersonality="AI_General">
        <AIPriority>80</AIPriority>
    </AIData>
    <ArtDef>BMB_FrenzyCharm_ArtDef</ArtDef>
    <GameItemTypeArtDef InternalName="BMB_FrenzyCharm_ArtDef">
        <GameItemTypeModelPack InternalName="BMB_FrenzyCharm_Default">
            <IconFile>BMB_FrenzyCharm.png</IconFile>
            <TintR>0</TintR>
            <TintG>0</TintG>
            <TintB>0</TintB>
            <SFX>Equip_MagicRing_01</SFX>
            <SFX>Equip_MagicRing_02</SFX>
            <SFX>Equip_MagicRing_03</SFX>
            <SFX>Equip_MagicRing_04</SFX>
            <GameItemTypeModel>
            </GameItemTypeModel>
        </GameItemTypeModelPack>
    </GameItemTypeArtDef>
</GameItemType>
```

Key design decisions in the XML:
- **`StrVal=Maul`**: References the base game's `AbilityBonusOption InternalName="Maul"` inside `MaulAbility`.
- **`AIPriority=80`**: High priority — Maul is a strong combat ability the AI should value. Matches `BirdOfCelerity` precedent.
- **SFX `Equip_MagicRing_*`**: Appropriate equip sound for a charm/amulet-type item. Same as `BirdOfCelerity`.
- **No `HideInHiergamenon`**: This is an equippable item (`CanBeEquipped=1`), so it belongs in the Hiergamenon.
- **No `AbilityBonusType`**: Per AGENTS.md failure protocol, item-granted abilities must not include `AbilityBonusType`.

### 2. Update `Mods/README.md`

Update the item count in the mod description line (currently "242 new items" — increment to 243).

### 3. Deploy and smoke test

Run `npm run build` to deploy the mod to the game folder. In-game, verify:
- The item appears in the Hiergamenon under accessories.
- The item can be found as loot or purchased from shops.
- When equipped on a hero, the Maul ability icon appears and the combat effect triggers.

## Dependencies

- Base game `CoreAbilities.xml` — contains `MaulAbility` / `Maul` AbilityBonusOption.
- Base game `CoreSpells.xml` — contains `MaulDebuff` spell (auto-triggered by Maul mechanic).
- Base game `ReforgedSpells.xml` — contains `MaulBuff` spell (auto-triggered by Maul mechanic).
- Icon `BMB_FrenzyCharm.png` — already present at `Mods/src/Gfx/Black Market Bazaar Icons/`.

## Required Components

- `Mods/src/Data/GameCore/BMB_Items.xml` — add new `<GameItemType>` block (edit existing file)
- `Mods/README.md` — update item count (edit existing file)

## Assumptions

- The base game's `UnlockUnitAbility` mechanism works for `Maul` when granted via an item, even though the ability definition has `SupportedUnitModelType=JuggernautMale`. The `SupportedUnitModelType` in ability definitions controls unit designer visibility, not runtime ability application. Other abilities with model restrictions (e.g., `CrushingBlow`) are routinely granted to all unit types via items.
- The `MaulDebuff` and `MaulBuff` spells auto-trigger through the `UnitStat_MaulChance` stat without requiring explicit spell references on the item.

## Constraints

- `InternalName` must use `BMB_` prefix per mod conventions.
- No `Skeleton` in `SupportedUnitModelType` for non-weapon items (N/A — this item has no model pack model types).
- No `AbilityBonusType` on item-granted abilities.
- File encoding must be UTF-8 (no BOM).
- Icon filename must match `BMB_PascalCaseName.png` pattern → `BMB_FrenzyCharm.png` ✓.

## Out of Scope

- Creating a new BMB-specific ability definition (unnecessary — base game `Maul` is sufficient).
- Adding Maul-related spells (base game already provides `MaulDebuff` and `MaulBuff`).
- Creating the icon (already exists).
- Level prerequisites or tech prerequisites (not used by comparable BMB accessories).
- Updating `docs/references/items.md` (auto-generated by `npm run reference`).

## Acceptance Criteria

- [ ] `BMB_Items.xml` contains a well-formed `<GameItemType InternalName="BMB_FrenzyCharm">` block.
- [ ] The item is typed as `Accessory` with `CanBeEquipped=1`, `HeroOnly=1`, `RarityDisplay=Rare`, `Likelihood=10`.
- [ ] The item's `GameModifier` uses `UnlockUnitAbility` with `StrVal=Maul`.
- [ ] The `ArtDef` references `BMB_FrenzyCharm.png` and follows BMB naming conventions.
- [ ] No `HideInHiergamenon` tag (equippable item).
- [ ] No `AbilityBonusType` anywhere in the new content.
- [ ] `Mods/README.md` item count is updated to 243.
- [ ] `npm run build` deploys successfully.
- [ ] (Manual) Item appears in-game as loot and grants Maul when equipped.

## Testing Strategy

1. **XML validation**: Verify the modified `BMB_Items.xml` is well-formed XML (no unclosed tags, correct nesting).
2. **Build verification**: Run `npm run build` and confirm no errors.
3. **In-game smoke test** (manual):
   - Start a new game or load a save.
   - Use the console or shop to acquire the Frenzy Charm.
   - Equip it on a hero and verify the Maul ability appears.
   - Enter tactical combat and confirm Maul triggers on attack (accuracy debuff on target, dodge buff on self).

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Maul ability may not apply via `UnlockUnitAbility` due to `SupportedUnitModelType=JuggernautMale` restriction in the ability definition** | This restriction controls unit designer visibility, not runtime granting. Other restricted abilities (e.g., `CrushingBlow`) are granted via items to all unit types without issues. Verify in-game during smoke test. |
| **`UnitStat_MaulChance` may not trigger combat spells when set via item-granted ability** | The MaulDebuff/MaulBuff spell triggering is driven by the stat value, not the ability source. The stat works the same regardless of how it was set. Verify in combat during smoke test. |
| **InternalName collision with future base game content** | `BMB_` prefix provides namespace isolation per mod convention. |
