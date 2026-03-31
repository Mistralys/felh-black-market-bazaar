# Plan

## Summary

Add a new consumable trinket item **"Infernal Companion"** (`BMB_InfernalCompanion`) to the Black Market Bazaar mod. When used, it summons a **Shadow Warg** at **level 6**. The item is **Uncommon** rarity, hero-only, single-use, and integrates into the existing random loot system. The icon `BMB_InfernalCompanion.png` already exists.

## Architectural Context

Summon trinkets in BMB follow a well-established pattern found in [Mods/src/Data/GameCore/BMB_Items.xml](Mods/src/Data/GameCore/BMB_Items.xml). Four existing summon consumables serve as direct templates:

| InternalName | Summons | Level (`Value`) | Rarity | `ShopValue` | `Likelihood` |
|---|---|---|---|---|---|
| `Token_CanisDirus` | Timber Warg | 2 | Common | 90 | 40 |
| `Token_Stalker` | Stalker | 4 | Uncommon | 90 | 20 |
| `Egg_BlackWidow` | Black Widow | 4 | Uncommon | 100 | 20 |
| `Egg_Naja` | Naja | 4 | Uncommon | 90 | 20 |

The base game also has three summon tokens following the same XML pattern (in `CoreItems.xml`): `Token_Wolf` (Ebben Wolf, L2), `Token_BestFriend` (Annie Dog, L8), `Token_Golem` (Sand Golem, L3).

The `ShadowWarg` UnitClass is a base game unit defined in `CoreMonsterUnitTypes.xml` (line ~36480). It is already referenced by a BMB spell in [Mods/src/Data/GameCore/BMB_Spells.xml](Mods/src/Data/GameCore/BMB_Spells.xml) (line ~3812), confirming mod compatibility.

Key conventions enforced by BMB rules:
- Consumable (`IsUsable=1`, no `CanBeEquipped`) → **must** include `<HideInHiergamenon>1</HideInHiergamenon>`
- Item-granted → **must not** include `AbilityBonusType`
- BMB prefix → InternalName `BMB_InfernalCompanion`
- Icon file must match InternalName → `BMB_InfernalCompanion.png` (already exists)

## Approach / Architecture

Add a single `<GameItemType>` entry to `BMB_Items.xml`, modeled directly on `Token_CanisDirus` (the Timber Warg summon). The only structural changes are the InternalName, display text, summon target (`ShadowWarg` instead of `TimberWarg`), level (6 instead of 2), rarity (Uncommon instead of Common), likelihood, shop value, and icon reference.

No new spells, abilities, effects, or units are required — the `ShadowWarg` unit class already exists in the base game and the `SummonUnit` game modifier handles unit creation directly.

## Rationale

- **Basing on `Token_CanisDirus`:** It's the closest match — same creature family (Warg), same mod (BMB), same summon pattern. Differences are minimal.
- **Level 6:** As specified by the user. The `Value` field in the `SummonUnit` modifier directly sets the summoned unit's level.
- **ShopValue 120:** Slightly above the L2/L4 tokens (90 gold) to reflect the stronger level 6 summon, but below the base game's Sand Golem token (240 gold, L3) which is priced for a tankier unit type.
- **Likelihood 20:** Matches all existing Uncommon summon trinkets in BMB.
- **StrVal "Shade":** The summoned unit's instance name. Fits the Shadow Warg's dark/infernal theme.

## Detailed Steps

1. **Add `BMB_InfernalCompanion` item to `BMB_Items.xml`**
   - Insert a new `<GameItemType InternalName="BMB_InfernalCompanion">` block before the closing `</GameItemTypes>` tag (after the last existing item, `TreasureGormandizer`).
   - Use the `Token_CanisDirus` structure as template with these values:

   | Field | Value |
   |---|---|
   | `InternalName` | `BMB_InfernalCompanion` |
   | `DisplayName` | `Infernal Companion` |
   | `Description` | `This dark token pulses with shadow energy. Use it to unleash a ferocious Shadow Warg.` |
   | `HideInHiergamenon` | `1` |
   | `ShopValue` | `120` |
   | `SummonUnit` StrVal | `Shade` |
   | `SummonUnit` Value | `6` |
   | `SummonUnit` UnitClass | `ShadowWarg` |
   | `SummonUnit` Provides | `Summons a Shadow Warg` |
   | `Likelihood` | `20` |
   | `RarityDisplay` | `Uncommon` |
   | `HeroOnly` | `1` |
   | `IsAvailableForUnitDesign` | `0` |
   | `IsUsable` | `1` |
   | `AIPriority` | `0` |
   | `IconFile` | `BMB_InfernalCompanion.png` |
   | Tint (R/G/B) | `0`/`0`/`0` |

2. **Update `Mods/README.md`**
   - Update the item count in the opening paragraph (currently "243 new items" → "244 new items").

## Dependencies

- `ShadowWarg` UnitClass must exist in the base game's `CoreMonsterUnitTypes.xml` — **confirmed** (line ~36480).
- `BMB_InfernalCompanion.png` icon must exist in `Mods/src/Gfx/Black Market Bazaar Icons/` — **confirmed**.

## Required Components

- [Mods/src/Data/GameCore/BMB_Items.xml](Mods/src/Data/GameCore/BMB_Items.xml) — Add new item entry (existing file, edit)
- [Mods/README.md](Mods/README.md) — Update item count (existing file, edit)

## Assumptions

- The `Value` field in the `SummonUnit` modifier directly corresponds to the summoned unit's level (consistent with all existing summon tokens).
- The `StrVal` field is the display name of the summoned unit instance (naming it "Shade").
- ShopValue 120 is a reasonable price for a level 6 Uncommon summon. The user may adjust this.
- The description text is a suggested draft; the user may want to adjust the flavor text.

## Constraints

- Must follow BMB naming convention (`BMB_` prefix).
- Must include `HideInHiergamenon=1` (consumable item rule).
- Must not include `AbilityBonusType` (item-granted rule).
- File encoding must remain UTF-8 (no BOM).

## Out of Scope

- Creating a new unit type (ShadowWarg already exists in base game).
- Adding new spells or abilities.
- New visual effects.
- Changes to the string table (`BMB.str`), since this item uses plain text display names (matching existing BMB consumable pattern).

## Acceptance Criteria

- `BMB_InfernalCompanion` item entry exists in `BMB_Items.xml` with all required fields.
- `HideInHiergamenon=1` is present (consumable rule).
- `SummonUnit` modifier targets `ShadowWarg` at level 6.
- `IconFile` references `BMB_InfernalCompanion.png`.
- `RarityDisplay` is `Uncommon`.
- No `AbilityBonusType` is present.
- No `CanBeEquipped` element is present.
- `Mods/README.md` item count is updated.
- No `InternalName` collision with existing items.
- XML file remains well-formed UTF-8 after edit.

## Testing Strategy

- **Automated:** Validate that `BMB_Items.xml` remains well-formed XML after the edit.
- **Manual (in-game):** Find the Infernal Companion in a shop or via console commands, use it, and verify a level 6 Shadow Warg is summoned and joins the army.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **ShadowWarg UnitClass doesn't load in current Reforged build** | Already referenced by existing BMB spell (`BMB_Spells.xml` line ~3812) and heavily used in base game GoodieHuts — confirmed functional. |
| **ShopValue too high/low for game balance** | Based on existing token pricing patterns; can be adjusted post-testing. |
| **StrVal "Shade" conflicts with another unit name** | StrVal is an instance name, not an InternalName — no collision risk with game entity definitions. |
