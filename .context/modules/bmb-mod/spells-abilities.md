# BMB Mod - Spells & Abilities
_SOURCE: Spell definitions (generated from xml/spells/)_
# Spell definitions (generated from xml/spells/)
```
// Structure of documents
└── Mods/
    └── src/
        └── Data/
            └── GameCore/
                └── BMB_Spells.xml

```
###  Path: `\Mods\src\Data\GameCore/BMB_Spells.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Black Market Bazaar by Hellions -->
<Spells>
	<SpellDef InternalName="BMB_AlchemicalSurprise">
        <DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_DESCRIPTION</Description>        
        <IconFG>BMB_MortarAndPestle.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>World</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>Other</SpellClass>
        <SpellSubClass>Other</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>        
		<HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>HealingNectar</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_1_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>HealingNectar</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_2_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>HealingNectar</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_3_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>PoisonVial</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_4_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>PoisonVial</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_5_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_DarkConcoction</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_6_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_DarkConcoction</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_7_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_FireResistance</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_8_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_FireResistance</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_9_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Growth</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_10_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Growth</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_11_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Growth</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_12_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Healing</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_13_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Healing</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_14_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Healing</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_15_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_HealingStrong</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_16_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_HealingStrong</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_17_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_HealingStrong</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_18_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_IroneerAle</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_19_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_IroneerAle</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_20_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_IroneerAle</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_21_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_ParidenWine</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_22_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_ParidenWine</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_23_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_ParidenWine</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_24_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Prismatic</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_25_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Prismatic</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_26_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Prismatic</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_27_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_Restoration</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_28_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
        <GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TrogBlood</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_29_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TrogBlood</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_30_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TrogBlood</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_31_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>BloomingTonic</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_32_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>BloomingTonic</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_33_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>DexterousElixir</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_34_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>DexterousElixir</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_35_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>FragranceOfSophistication</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_36_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>IceBomb</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_37_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>IceBomb</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_38_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>IceBomb</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_39_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Liquid Vigor</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_40_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Liquid Vigor</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_41_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>LostBarrowhillWine</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_42_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>MagnifyingStimulant</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_43_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>PhilosophersStone</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_44_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TempestuousWrath</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_45_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TempestuousWrath</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_46_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>Potion_TempestuousWrath</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_47_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>RejuvenatingFusion</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_48_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>RejuvenatingFusion</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_49_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
		<GameModifier>
			<ModType>GiveItem</ModType>
			<Attribute>RejuvenatingFusion</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_ALCHEMICALSURPRISE_MODIFIER_50_DISPLAYNAME</DisplayName>
			<Value>100</Value>
		</GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>100</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Alchemy_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_Alchemy_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_AmuletOfTheBlackMindedEffect">
        <DisplayName>TXT_BMB_SPELLS_BMB_AMULETOFTHEBLACKMINDEDEFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_AMULETOFTHEBLACKMINDEDEFFECT_DESCRIPTION</Description>
        <Image>T_Graveseal_Painting.png</Image>
        <IconFG>T_Graveseal_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
		<AppliesRandomModifier>1</AppliesRandomModifier>
		<IsCastable>0</IsCastable>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>Graveseal</Attribute>
			<DisplayName>TXT_BMB_SPELLS_BMB_AMULETOFTHEBLACKMINDEDEFFECT_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Graveseal_Particle</Effect>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>20</AIPriority>        
        </AIData>
        <HitSoundFX>Spell_Graveseal_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Graveseal_Particle</EffectName>
            <LocalPosition>0,40,0</LocalPosition>
            <EffectScale>0.7</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ArcaneMonolith">
        <DisplayName>TXT_BMB_SPELLS_BMB_ARCANEMONOLITH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ARCANEMONOLITH_DESCRIPTION</Description>
        <Image>S_ArcaneMonolith_Painting.png</Image>
        <IconFG>S_ArcaneMonolith_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>World</SpellBookSortCategory>
        <SpellBookSortSubCategory>Map</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>Terraform</SpellClass>
        <SpellSubClass>BuildOutpost</SpellSubClass>
        <SpellTargetType>NeutralGround</SpellTargetType>        
		<HideInHiergamenon>1</HideInHiergamenon>	
        <GameModifier>
            <ModType>Map</ModType>
            <Attribute>BuildWildImprovement</Attribute>
            <StrVal>Outpost_ArcaneMonolith</StrVal>
        </GameModifier>
        <ValidTerrainCategory>City</ValidTerrainCategory>
        <ValidTerrainCategory>Forest</ValidTerrainCategory>
        <ValidTerrainCategory>Land</ValidTerrainCategory>
        <AIData AIPersonality="AI_General">
            <AIPriority>100</AIPriority>
        </AIData>
        <HitSoundFX>Spell_ArcaneMonolith_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_AuraofGrace_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_AttackFrenzy">
        <DisplayName>TXT_BMB_SPELLS_BMB_ATTACKFRENZY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ATTACKFRENZY_DESCRIPTION</Description>
        <Image>T_Berzerk_Painting.png</Image>
        <IconFG>S_Sacrifice_Icon.png</IconFG>
        <CanStack>1</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Pierce</StrVal>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_ATTACKFRENZY_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>1</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
    </SpellDef>
	<SpellDef InternalName="BMB_Beguile">
        <DisplayName>TXT_BMB_SPELLS_BMB_BEGUILE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BEGUILE_DESCRIPTION</Description>
        <Image>T_Confusion_Painting.png</Image>
        <IconFG>T_Beguile_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>
        <PreventStackingWith>Confusion</PreventStackingWith>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ClumsyChance</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_BEGUILE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>50</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="TargetUnit">
                <Expression><![CDATA[2 - [Unit_GetWeaponTacticalRange]]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc3" ValueOwner="">
                <Expression><![CDATA[[Calc] * [Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Confusion_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Confusion_Particle</EffectName>
            <LocalPosition>0,35,0</LocalPosition>
            <EffectScale>0.65</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnAllTargets>1</PlayOnAllTargets>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BeltOfWeariness_Effect">
        <DisplayName>TXT_BMB_SPELLS_BMB_BELTOFWEARINESS_EFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BELTOFWEARINESS_EFFECT_DESCRIPTION</Description>
        <IconFG>T_Slow_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_BELTOFWEARINESS_EFFECT_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Value>-1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SetUnitStat</Attribute>
            <StrVal>UnitStat_Stamina_Growth</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_BELTOFWEARINESS_EFFECT_MODIFIER_2_DISPLAYNAME</DisplayName>
			<Effect>BMB_BeltOfWeariness_Particle</Effect>
            <Duration>3</Duration>            
            <Value>0</Value>
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_FreezeGroup</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_BloodCandles">
        <DisplayName>TXT_BMB_SPELLS_BMB_BLOODCANDLES_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BLOODCANDLES_DESCRIPTION</Description>
        <Image>BMB_BloodCandles.png</Image>
        <IconFG>BMB_BloodCandles.png</IconFG>        
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>AllFriendlyUnits</SpellTargetType>
		<IgnoreCastAnim>1</IgnoreCastAnim>
        <HideInHiergamenon>1</HideInHiergamenon>	
		<IsSpecialAbility>1</IsSpecialAbility>		
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HPFromKills</StrVal>
            <Value>2</Value>
            <Provides>+2 Hit Points whenever an enemy is killed</Provides>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>       
        </AIData>        
    </SpellDef>
	<SpellDef InternalName="BMB_BowAttack_ElementalWand">
        <DisplayName>TXT_BMB_SPELLS_BMB_BOWATTACK_ELEMENTALWAND_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BOWATTACK_ELEMENTALWAND_DESCRIPTION</Description>
        <Image>Action_BowArrow.png</Image>
        <IconFG>Action_BowArrow.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsRangedAttack>1</IsRangedAttack>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_FreezingArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_FreezingArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_FreezingCast_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_ElementalWand_Projectile_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.7</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>500</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>BMB_ElementalWand_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BowAttack_EleventhFingerWand">
        <DisplayName>TXT_BMB_SPELLS_BMB_BOWATTACK_ELEVENTHFINGERWAND_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BOWATTACK_ELEVENTHFINGERWAND_DESCRIPTION</Description>
        <Image>Action_BowArrow.png</Image>
        <IconFG>Action_BowArrow.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsRangedAttack>1</IsRangedAttack>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>			
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[10 + [Unit_GetLevel]]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>			
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_FreezingArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_FreezingArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_FreezingCast_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_EleventhFingerWand_Projectile_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.7</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>500</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>BMB_EleventhFingerWand_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BowAttack_FreezeburnWand">
        <DisplayName>TXT_BMB_SPELLS_BMB_BOWATTACK_FREEZEBURNWAND_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BOWATTACK_FREEZEBURNWAND_DESCRIPTION</Description>
        <Image>Action_BowArrow.png</Image>
        <IconFG>Action_BowArrow.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsRangedAttack>1</IsRangedAttack>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_FreezingArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_FreezingArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_FreezingCast_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_FreezeburnWand_Projectile_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.7</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>500</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>BMB_FreezeburnWand_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BowAttack_RuthlessPelter">
        <DisplayName>TXT_BMB_SPELLS_BMB_BOWATTACK_RUTHLESSPELTER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BOWATTACK_RUTHLESSPELTER_DESCRIPTION</Description>
        <Image>Action_BowArrow.png</Image>
        <IconFG>Action_BowArrow.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsRangedAttack>1</IsRangedAttack>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>2</Value>
        </GameModifier>
		 <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_BashChance</StrVal>
            <Value>100</Value>
            <Provides>Bash- Has a chance equal to the damage done of knocking the victim prone</Provides>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Hit_Arrow1</HitSoundFX>
        <HitSoundFX>Hit_Arrow2</HitSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_BasicCast_01</SpellCastSoundFX>
        <SpellCastEffectName>Arrow</SpellCastEffectName>
        <SpellCastEffectScale>0.3</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>700</SpellCastProjectileSpeed>
		 <SpellDefEffect>
            <EffectName>BMB_RuthlessPelter_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BullsEye">
        <DisplayName>TXT_BMB_SPELLS_BMB_BULLSEYE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BULLSEYE_DESCRIPTION</Description>
        <Image>Ability_MasterArcher_Icon.png</Image>
		<IconFG>BMB_Ability_BullsEye.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>       
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
		<Prereq>
            <Type>UnitStat</Type>
            <Attribute>UnitStat_IsBow</Attribute>
            <Value>1</Value>
        </Prereq>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <Multiplier>3</Multiplier>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>ChanceToLoseNextTurn</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_BULLSEYE_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>2</Duration>
            <Effect>E_Daze_Particle</Effect>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        </AIData>
        <CasterAnimationType>29</CasterAnimationType>
        <HitSoundFX>Spell_GamblersStrike_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>Y_GamblersStrike_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_BulwarkOfTheBrute">
        <DisplayName>TXT_BMB_SPELLS_BMB_BULWARKOFTHEBRUTE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_BULWARKOFTHEBRUTE_DESCRIPTION</Description>
        <FormattedDescription>Launch a %d Attack and knock the victim back 1 tile.</FormattedDescription>
        <IconFG>Ability_ShieldBash_Icon.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <Range>1</Range>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>1</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>32</CasterAnimationType>
        <HitSoundFX>Ability_Shield_Bash</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Ability_ShieldBash_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.25</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ChokerSpore">
        <DisplayName>TXT_BMB_SPELLS_BMB_CHOKERSPORE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_CHOKERSPORE_DESCRIPTION</Description>
        <IconFG>BMB_ChokerSpore.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <AllowFriendlyFireInRadius>1</AllowFriendlyFireInRadius>        
        <Radius>1</Radius>
        <HideInHiergamenon>1</HideInHiergamenon>        
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Poison</AttackStat>
            <Duration>-1</Duration>
            <Effect>E_Poison_Particle</Effect>
            <SoundFX>Spell_Poisoned1_01</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>3</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_ResistPoison]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] < 75]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_ToxicArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_ToxicArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_ToxicCast_01</SpellCastSoundFX>
        <SpellCastEffectName>A_ToxicLongbow_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.3</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>700</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>A_ToxicLongbow_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Chop">
        <DisplayName>TXT_BMB_SPELLS_BMB_CHOP_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_CHOP_DESCRIPTION</Description>
        <IconFG>BMB_Ability_Chop.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>27</CasterAnimationType>
        <HitSoundFX>Spell_DoubleStrike_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_DoubleStrike_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_CorrosiveDagger">
        <DisplayName>TXT_BMB_SPELLS_BMB_CORROSIVEDAGGER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_CORROSIVEDAGGER_DESCRIPTION</Description>
        <Image>Ability_SpitAcidII_Icon.png</Image>
        <IconFG>Ability_SpitAcidII_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
		<IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <Duration>15</Duration>
            <Effect>E_Acid_Particle</Effect>
            <PerTurn>1</PerTurn>
            <MinValue>-2</MinValue>
            <MaxValue>-4</MaxValue>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SpitAcidHit_01</HitSoundFX>
        <HitSoundFX>Spell_SpitAcidHit_02</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_CripplingBlow">
        <DisplayName>TXT_BMB_SPELLS_BMB_CRIPPLINGBLOW_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_CRIPPLINGBLOW_DESCRIPTION</Description>
        <FormattedDescription>Launch a %d Attack, but you lose your next action.</FormattedDescription>
        <IconFG>BMB_Ability_CripplingBlow.png</IconFG>
        <CanStack>1</CanStack>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] * [UnitStat_BonusCrushingBlow]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>ChanceToLoseNextTurn</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_CRIPPLINGBLOW_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>2</Duration>
            <Effect>E_Daze_Particle</Effect>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CrushingBlow_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Ability_CrushingBlow</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.6</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_CuttingSurface">
        <DisplayName>TXT_BMB_SPELLS_BMB_CUTTINGSURFACE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_CUTTINGSURFACE_DESCRIPTION</Description>
        <IconFG>Ability_ReapI_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
		<IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
			<Value>-2</Value>            
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Beserk_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Berserk_Particle</EffectName>
            <LocalPosition>0,35,0</LocalPosition>
            <EffectScale>0.7</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_DaggerOfCorruption">
        <DisplayName>TXT_BMB_SPELLS_BMB_DAGGEROFCORRUPTION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_DAGGEROFCORRUPTION_DESCRIPTION</Description>
        <FormattedDescription>Reduces the attack of the enemy army by %d unless they resist.</FormattedDescription>
        <Image>T_Wither_Painting.png</Image>
        <IconFG>T_Wither_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <PreventStackingWith>Wither</PreventStackingWith>
		<PreventStackingWith>Wither_Autocast</PreventStackingWith>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
		<IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Boost</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_BMB_DAGGEROFCORRUPTION_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Wither_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumDeathShards] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 2]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] - 2]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>        
        </AIData>
        <HitSoundFX>Spell_Wither_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Wither_Particle</EffectName>
            <LocalPosition>0,30,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_DeathCircle">
        <DisplayName>TXT_BMB_SPELLS_BMB_DEATHCIRCLE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_DEATHCIRCLE_DESCRIPTION</Description>
        <FormattedDescription>A circle of destructive energies hitting adjacent enemies for %d damage (half if resisted).</FormattedDescription>
        <Image>Tech_Arcane_Weapons.png</Image>
        <IconFG>Ability_Necromancy_Icon.png</IconFG>
		<CanStack>1</CanStack>
		<Cooldown>8</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<IsResistable>1</IsResistable>
        <AllowFriendlyFireInRadius>0</AllowFriendlyFireInRadius>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
        <IsSpecialAbility>1</IsSpecialAbility>
        <Radius>1</Radius>
        <Range>0</Range>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * -2]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2">
                <Expression><![CDATA[[Calc] - 4]]></Expression>
            </Calculate>
			<Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 2]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Shadowbolt_Hit</HitSoundFX>        
        <SpellDefEffect>
            <EffectName>T_Confusion_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnAllTargets>1</PlayOnAllTargets>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_DimensionalTranslocation">
        <DisplayName>TXT_BMB_SPELLS_BMB_DIMENSIONALTRANSLOCATION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_DIMENSIONALTRANSLOCATION_DESCRIPTION</Description>
        <IconFG>BMB_Ability_DimensionalTranslocation.png</IconFG>
        <Cooldown>6</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Other</SpellSubClass>
        <SpellTargetType>EmptyTile</SpellTargetType>
        <SpellTargetTileOccupied>Empty</SpellTargetTileOccupied>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Map</ModType>
            <Attribute>TransportUnit</Attribute>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <ApplyToCaster>1</ApplyToCaster>
            <Duration>1</Duration>
            <UpdateDurationAtTurnStart>1</UpdateDurationAtTurnStart>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_DarkEnchant_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>BMB_DimensionalTranslocation_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
        <SpellDefEffect>
            <EffectName>BMB_DimensionalTranslocation_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnCaster>1</PlayOnCaster>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_DismantlingStroke">
		<DisplayName>TXT_BMB_SPELLS_BMB_DISMANTLINGSTROKE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_DISMANTLINGSTROKE_DESCRIPTION</Description>
        <FormattedDescription>Launch a %d Attack, but you lose your next action.</FormattedDescription>
        <IconFG>BMB_Ability_DismantlingStroke.png</IconFG>
        <CanStack>1</CanStack>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
		<Prereq>
            <Type>UnitStat</Type>
            <Attribute>UnitStat_BlackSpike</Attribute>
            <Value>3</Value>
        </Prereq>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * 4]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] * [UnitStat_BonusCrushingBlow]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>ChanceToLoseNextTurn</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_DISMANTLINGSTROKE_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>2</Duration>
            <Effect>E_Daze_Particle</Effect>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CrushingBlow_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Ability_CrushingBlow</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.6</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_DrainLife">
        <DisplayName>TXT_BMB_SPELLS_BMB_DRAINLIFE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_DRAINLIFE_DESCRIPTION</Description>
        <FormattedDescription>Transfers %d hit points from enemy unit to the caster.  That damage is halved if the enemy resists.</FormattedDescription>
        <Image>T_DrainLife_Painting.png</Image>
        <IconFG>T_DrainLife_Icon.png</IconFG>
		<Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <SpellTypeDrain>1</SpellTypeDrain>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>Lifesteal</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumDeathShards] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 12]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 12]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>Lifesteal</Attribute>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumDeathShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 6]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>
        </AIData>
        <HitSoundFX>Spell_DrainLife_01</HitSoundFX>
        <SpellCastEffectName>T_Erosion_Particle</SpellCastEffectName>
        <SpellCastEffectScale>1</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>700</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>T_DrainLife_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.50</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>0</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ElementalMyriad">
        <DisplayName>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_DESCRIPTION</Description>
        <Image>S_DestinysGift_Painting.png</Image>
        <IconFG>Ability_Zealotry_Icon.png</IconFG>
        <Cooldown>60</Cooldown>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>AllFriendlyUnits</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
		<IsSpecialAbility>1</IsSpecialAbility>
		<SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>18</Amount>
        </SpellResourceCost>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>2</Value>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Fire</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_MODIFIER_3_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_ELEMENTALMYRIAD_MODIFIER_4_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>2</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
       <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_RainofFire_03</HitSoundFX>
        <SpellDefEffect>
            <EffectName>BMB_ElementalMyriad_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ForgingExcellence">
		<DisplayName>TXT_BMB_SPELLS_BMB_FORGINGEXCELLENCE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_FORGINGEXCELLENCE_DESCRIPTION</Description>       
        <IconFG>BMB_Ability_ForgingExcellence.png</IconFG>        
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>AllFriendlyUnits</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>		
		<IsSpecialAbility>1</IsSpecialAbility>
		<Prereq>
            <Type>UnitStat</Type>
            <Attribute>UnitStat_Mastersmith</Attribute>
            <Value>3</Value>
        </Prereq>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Pierce</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_FORGINGEXCELLENCE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>6</Value>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ChanceToCrit</StrVal>
            <Duration>-1</Duration>
            <Value>6</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CritDamageMultiplier</StrVal>
			<Duration>-1</Duration>
            <Value>1</Value>
            <Provides>+100% Critical Damage</Provides>
        </GameModifier>				
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Drop_MetalItem1</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_BurningBlade_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.75</EffectScale>
            <EffectDelay>0.25</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_FreezingBlood">
        <DisplayName>TXT_BMB_SPELLS_BMB_FREEZINGBLOOD_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_FREEZINGBLOOD_DESCRIPTION</Description>
        <Image>T_Blizzard_Painting.png</Image>
        <IconFG>S_FrozenBones_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <Duration>-1</Duration>
            <Effect>A_HailstoneStaff_Impact_Particle</Effect>
            <SoundFX>IceElemental_Death</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>5</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>IceElemental_Death</HitSoundFX>
        <HitSoundFX>IceElemental_Death</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_FreezingJet">
        <DisplayName>TXT_BMB_SPELLS_BMB_FREEZINGJET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_FREEZINGJET_DESCRIPTION</Description>
		<FormattedDescription>Does %d Cold damage to all units in a line 3 tiles long.</FormattedDescription>
        <IconFG>BMB_Stalagmite.png</IconFG>
        <StaminaCost>7</StaminaCost>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
		<CanBeDodged>1</CanBeDodged>	
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>		
        <Radius>3</Radius>
        <RadiusType>LINE_BACKWARD</RadiusType>
        <Range>3</Range>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
			<AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>			
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] + [[UnitOwner_GetNumWaterShards] * 3]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
			<AIMinSpellTargets>2</AIMinSpellTargets>
        </AIData>
        <SpellCastSoundFX>IceElemental_Death</SpellCastSoundFX>		
        <SpellDefEffect>
            <EffectName>A_HailstoneStaff_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
			<PlayOnAllTargets>1</PlayOnAllTargets>	
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_FreezingRay">
        <DisplayName>TXT_BMB_SPELLS_BMB_FREEZINGRAY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_FREEZINGRAY_DESCRIPTION</Description>
		<FormattedDescription>A freezing dart that strikes for %d cold damage.</FormattedDescription>
        <Image>S_Freeze_Painting.png</Image>
        <IconFG>S_Freeze_Icon.png</IconFG>
		<Cooldown>4</Cooldown>
		<SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * 3]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * 2]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] + [Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] + [Unit_GetLevel]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_ResistCold]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] < 75]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_IceArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_IceArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_FreezingCast_01</SpellCastSoundFX>
        <SpellCastEffectName>A_IceStaff_Projectile_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.5</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>600</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>A_HailstoneStaff_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.9</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_GildarTouch">
        <DisplayName>TXT_BMB_SPELLS_BMB_GILDARTOUCH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_GILDARTOUCH_DESCRIPTION</Description>
        <IconFG>Ability_Wealthy_Icon.png</IconFG>
        <Cooldown>0</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>        
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Gold</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_GILDARTOUCH_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Value>1</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <SFX>SackOfGildar_01</SFX>        
    </SpellDef>
	<SpellDef InternalName="BMB_Haste_Mass">
        <DisplayName>TXT_BMB_SPELLS_BMB_HASTE_MASS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_HASTE_MASS_DESCRIPTION</Description>
        <FormattedDescription>Target army is +%d to Initiative.</FormattedDescription>
        <Image>T_Haste_Painting.png</Image>
        <IconFG>T_Celerity_Icon.png</IconFG>
		<CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>AllFriendlyUnits</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
		<PreventStackingWith>Haste</PreventStackingWith>
        <PreventStackingWith>Haste_Adept</PreventStackingWith>
        <SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>30</Amount>
        </SpellResourceCost>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_BMB_HASTE_MASS_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Celerity_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumAirShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Haste_01</HitSoundFX>
        <HitSoundFX>Spell_Haste_02</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_HeartOfTheTarget">
		<DisplayName>TXT_BMB_SPELLS_BMB_HEARTOFTHETARGET_DISPLAYNAME</DisplayName>
		<Description>TXT_BMB_SPELLS_BMB_HEARTOFTHETARGET_DESCRIPTION</Description>
		<Image>Ability_MasterArcher_Icon.png</Image>
		<IconFG>Ability_MasterArcher_Icon.png</IconFG>
		<CanStack>0</CanStack>
		<SpellBookSortCategory>Unit</SpellBookSortCategory>
		<SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
		<SpellType>Tactical</SpellType>
		<SpellClass>Defensive</SpellClass>
		<SpellSubClass>Buff</SpellSubClass>
		<SpellTargetType>Self</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
		<IgnoreCastAnim>1</IgnoreCastAnim>
		<IsCastable>0</IsCastable>
		<IsSpecialAbility>1</IsSpecialAbility>
		<GameModifier>
			<ModType>Unit</ModType>
			<Attribute>AdjustUnitStat</Attribute>
			<StrVal>UnitStat_ArmorPierce</StrVal>
			<Duration>-1</Duration>
			<Calculate InternalName="Calc" ValueOwner="CastingUnit">
				<Expression><![CDATA[[UnitStat_IsBow] * 20]]></Expression>
			</Calculate>
			<Calculate InternalName="Value">
				<Expression><![CDATA[[Calc]]]></Expression>
			</Calculate>
		</GameModifier>		
		<AIData AIPersonality="AI_General">
			<AIPriority>5</AIPriority>
		</AIData>		
	</SpellDef>
	<SpellDef InternalName="BMB_IceBomb">
        <DisplayName>TXT_BMB_SPELLS_BMB_ICEBOMB_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ICEBOMB_DESCRIPTION</Description>
        <IconFG>BMB_IceBomb.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <Value>18</Value>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForSpellResist>1</IsForSpellResist>
            <Value>9</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_ResistCold]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] < 75]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_IceArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_IceArrow_Hit_02</HitSoundFX>
        <SpellCastSoundFX>Spell_BowAttack_FreezingCast_01</SpellCastSoundFX>
        <SpellCastEffectName>A_IceStaff_Projectile_Particle</SpellCastEffectName>
        <SpellCastEffectScale>0.5</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>600</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>A_HailstoneStaff_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.9</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Icebreaker_Effect">
        <DisplayName>TXT_BMB_SPELLS_BMB_ICEBREAKER_EFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_ICEBREAKER_EFFECT_DESCRIPTION</Description>
        <IconFG>Ability_ReapI_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
		<AppliesRandomModifier>1</AppliesRandomModifier>
		<IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <MinValue>-4</MinValue>
            <MaxValue>-10</MaxValue>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>	
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Beserk_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Berserk_Particle</EffectName>
            <LocalPosition>0,35,0</LocalPosition>
            <EffectScale>0.7</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_IceRing">
		<DisplayName>TXT_BMB_SPELLS_BMB_ICERING_DISPLAYNAME</DisplayName>
		<Description>TXT_BMB_SPELLS_BMB_ICERING_DESCRIPTION</Description>
		<Image>S_Freeze_Painting.png</Image>
        <IconFG>S_FrozenBones_Icon.png</IconFG>		
		<Cooldown>6</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<IsResistable>1</IsResistable>
        <AllowFriendlyFireInRadius>0</AllowFriendlyFireInRadius>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
        <IsSpecialAbility>1</IsSpecialAbility>
        <Radius>1</Radius>
        <Range>0</Range>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * 2]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] + [Calc2]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] + [Unit_GetLevel]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_ResistCold]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] < 75]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>IceElemental_Death</HitSoundFX>
        <SpellDefEffect>
            <EffectName>A_HailstoneStaff_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_InsectPlague">
        <DisplayName>TXT_BMB_SPELLS_BMB_INSECTPLAGUE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_INSECTPLAGUE_DESCRIPTION</Description>
        <FormattedDescription>A harassing plague of insects which reduces Accuracy and Dodge by 40% and lowers initiative by 3 for 5 turns unless resisted.</FormattedDescription>        
        <Image>T_Contagion_Painting.png</Image>
		<IconFG>Apiary1.png</IconFG>
		<CastTime>1</CastTime>	
		<Cooldown>6</Cooldown>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>AllEnemyUnits</SpellTargetType>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>
        <PreventStackingWith>BMB_InsectSwarm</PreventStackingWith>		
         <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_INSECTPLAGUE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>5</Duration>
            <Effect>BMB_InsectSwarm_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Accuracy] * -0.40]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Duration>5</Duration>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Dodge] * -0.40]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
			<Duration>5</Duration>
            <Value>-3</Value>
            <Provides>-3 Initiative</Provides>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Click_Bees</HitSoundFX>        
    </SpellDef>
	<SpellDef InternalName="BMB_InsectSwarm">
        <DisplayName>TXT_BMB_SPELLS_BMB_INSECTSWARM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_INSECTSWARM_DESCRIPTION</Description>
        <FormattedDescription>A harassing cloud of insects which reduces Accuracy and Dodge by 40% and lowers initiative by 3 for 5 turns unless resisted.</FormattedDescription>        
        <Image>Beehive1.png</Image>
		<IconFG>Beehive1.png</IconFG>		
		<Cooldown>5</Cooldown>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>
        <PreventStackingWith>BMB_InsectPlague</PreventStackingWith>
         <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_INSECTSWARM_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>5</Duration>
            <Effect>BMB_InsectSwarm_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Accuracy] * -0.40]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Duration>5</Duration>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Dodge] * -0.40]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
			<Duration>5</Duration>
            <Value>-3</Value>
            <Provides>-3 Initiative</Provides>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Click_Bees</HitSoundFX>        
    </SpellDef>
	<SpellDef InternalName="BMB_JinxDoll">
        <DisplayName>TXT_BMB_SPELLS_BMB_JINXDOLL_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_JINXDOLL_DESCRIPTION</Description>
        <Image>T_Curse_Painting.png</Image>
        <IconFG>S_Bloodrage_Icon.png</IconFG>
		<Cooldown>8</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <AppliesRandomModifier>1</AppliesRandomModifier>
        <IsResistable>0</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_JINXDOLL_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>5</Duration>
            <Effect>E_Curse_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Defense_Pierce] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Poison</AttackStat>
			<DisplayName>TXT_BMB_SPELLS_BMB_JINXDOLL_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Poison_Particle</Effect>
            <SoundFX>Spell_Poisoned2_01</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>4</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
			<DisplayName>TXT_BMB_SPELLS_BMB_JINXDOLL_MODIFIER_3_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>A_HailstoneStaff_Impact_Particle</Effect>
            <SoundFX>IceElemental_Death</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>5</Value>
        </GameModifier>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <MinValue>-10</MinValue>
            <MaxValue>-15</MaxValue>
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>FemAdv1_CrazyDeath1</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_DrainLife_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.50</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>0</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_LaceratingSpokes">
        <DisplayName>TXT_BMB_SPELLS_BMB_LACERATINGSPOKES_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_LACERATINGSPOKES_DESCRIPTION</Description>
        <IconFG>Ability_ReapI_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
		<IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <MinValue>-2</MinValue>
            <MaxValue>-5</MaxValue>
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Beserk_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Berserk_Particle</EffectName>
            <LocalPosition>0,35,0</LocalPosition>
            <EffectScale>0.7</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_LeopardRush">
        <DisplayName>TXT_BMB_SPELLS_BMB_LEOPARDRUSH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_LEOPARDRUSH_DESCRIPTION</Description>
        <Image>T_Haste_Painting.png</Image>
        <IconFG>T_Celerity_Icon.png</IconFG>
		<CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>0</IsResistable>
		<IsCastable>0</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LEOPARDRUSH_MODIFIER_1_DISPLAYNAME</DisplayName>
			<Duration>-1</Duration>
            <Value>3</Value>
			<ApplyToCaster>1</ApplyToCaster>
			<Effect>E_Celerity_Particle</Effect>
        </GameModifier>                 
        <AIData AIPersonality="AI_General">
            <AIPriority>15</AIPriority>        
        </AIData>
        <HitSoundFX>Stalker_Attack2</HitSoundFX>        
    </SpellDef>
	<SpellDef InternalName="BMB_LittleRevenger">
        <DisplayName>TXT_BMB_SPELLS_BMB_LITTLEREVENGER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_LITTLEREVENGER_DESCRIPTION</Description>
        <IconFG>Ability_Counterattack_Icon.png</IconFG>        
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>			
        </GameModifier>        
		<GameModifier>
			<ApplyToCaster>1</ApplyToCaster>
			<DisplayName>TXT_BMB_SPELLS_BMB_LITTLEREVENGER_MODIFIER_2_DISPLAYNAME</DisplayName>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>27</CasterAnimationType>
        <HitSoundFX>Spell_DoubleStrike_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_DoubleStrike_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_LostBarrowhillWine">
        <DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_DESCRIPTION</Description>
        <Image>T_Wellspring_Painting.png</Image>
        <IconFG>T_Wellspring_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>	
        <SpellTargetType>Self</SpellTargetType>	
        <AppliesRandomModifier>1</AppliesRandomModifier>
        <HideInHiergamenon>1</HideInHiergamenon>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicResist</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicPower</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_SpellDamage</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_3_DISPLAYNAME</DisplayName>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Sight</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_4_DISPLAYNAME</DisplayName>
            <Value>1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_5_DISPLAYNAME</DisplayName>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Fire</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_6_DISPLAYNAME</DisplayName>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_7_DISPLAYNAME</DisplayName>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_8_DISPLAYNAME</DisplayName>
            <Value>2</Value>
        </GameModifier>		
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Clumsy</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_9_DISPLAYNAME</DisplayName>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Inaccurate</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_10_DISPLAYNAME</DisplayName>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_11_DISPLAYNAME</DisplayName>
            <Value>5</Value>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_12_DISPLAYNAME</DisplayName>
            <Value>5</Value>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_13_DISPLAYNAME</DisplayName>
            <Value>5</Value>            
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>LotsOfNothing</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_LOSTBARROWHILLWINE_MODIFIER_14_DISPLAYNAME</DisplayName>            
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>100</AIPriority>
        </AIData>        
    </SpellDef>
	<SpellDef InternalName="BMB_MendingHands">
        <DisplayName>TXT_BMB_SPELLS_BMB_MENDINGHANDS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_MENDINGHANDS_DESCRIPTION</Description>
        <FormattedDescription>Heals target unit by %d.</FormattedDescription>
        <Image>T_Heal_Painting.png</Image>
        <IconFG>T_Heal_Icon.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Heal</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Heal</SpellSubClass>
        <SpellTargetType>FriendlyUnit</SpellTargetType>
		<Range>1</Range>
		<HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumLifeShards] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] + 12]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc2] * [UnitStat_BonusHealing]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>15</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] < 30]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Heal_01</HitSoundFX>
        <HitSoundFX>Spell_Heal_02</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Heal_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Mindblast">
        <DisplayName>TXT_BMB_SPELLS_BMB_MINDBLAST_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_MINDBLAST_DESCRIPTION</Description>
        <FormattedDescription>Does %d damage to all units in a line 5 tiles long, half if resisted.</FormattedDescription>
        <Image>T_Pandemonium_Painting.png</Image>
        <IconFG>BMB_Ability_MindBlast.png</IconFG>
		<Cooldown>5</Cooldown>	
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
        <Radius>5</Radius>
        <RadiusType>LINE_BACKWARD</RadiusType>
        <Range>5</Range>       
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_MagicPower] + [UnitStat_SpellDamage]]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] / 6]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc2] * -1]]></Expression>
            </Calculate>
           <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_MagicPower] + [UnitStat_SpellDamage]]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] / 12]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc2] * -1]]></Expression>
            </Calculate>
           <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetKnockedProne</Attribute>
            <Duration>1</Duration>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>75</AIPriority>
            <AIMinSpellTargets>2</AIMinSpellTargets>        
        </AIData>
        <HitSoundFX>Spell_ManaBlastImpact_01</HitSoundFX>
        <SpellCastSoundFX>Spell_ManaBlastTravel_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_MindBlast_Projectile</SpellCastEffectName>
        <SpellCastEffectScale>0.7</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>500</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>BMB_MindBlast_Impact</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_OvumPhilosophorum">
        <DisplayName>TXT_BMB_SPELLS_BMB_OVUMPHILOSOPHORUM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_OVUMPHILOSOPHORUM_DESCRIPTION</Description>
        <Image>S_Alchemy_Painting.png</Image>
        <IconFG>BMB_Ability_OvumPhilosophorum.png</IconFG>
        <SpellBookSortCategory>World</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>Other</SpellClass>
        <SpellSubClass>Other</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <CasterMustBeSov>1</CasterMustBeSov>
        <SpellResourceCost>
            <Resource>Metal</Resource>
            <Amount>100</Amount>
        </SpellResourceCost>
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Gold</Attribute>
            <Value>300</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Alchemy_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_Alchemy_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ParalyzingAcid">
        <DisplayName>TXT_BMB_SPELLS_BMB_PARALYZINGACID_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PARALYZINGACID_DESCRIPTION</Description>
        <Image>Ability_Assassin_Icon.png</Image>
        <IconFG>Ability_Assassin_Icon.png</IconFG>
        <Cooldown>5</Cooldown>
		<CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <Duration>-1</Duration>
            <Effect>BMB_ParalyzingAcid_Particle</Effect>
            <PerTurn>1</PerTurn>
            <MinValue>-3</MinValue>
            <MaxValue>-6</MaxValue>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Value>-10</Value>
			<Duration>-1</Duration>			
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>30</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SpitAcidHit_01</HitSoundFX>
        <HitSoundFX>Spell_SpitAcidHit_02</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellCastSoundFX>Spell_SpitAcidCast_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_ParalyzingAcid_Ranged</SpellCastEffectName>
        <SpellCastEffectScale>0.50</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>400</SpellCastProjectileSpeed>
    </SpellDef>
	<SpellDef InternalName="BMB_ParalyzingCold">
        <DisplayName>TXT_BMB_SPELLS_BMB_PARALYZINGCOLD_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PARALYZINGCOLD_DESCRIPTION</Description>
        <Image>T_Blizzard_Painting.png</Image>
        <IconFG>S_FrozenBones_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <Duration>-1</Duration>
            <Effect>A_HailstoneStaff_Impact_Particle</Effect>
            <SoundFX>IceElemental_Death</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>3</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>IceElemental_Death</HitSoundFX>
        <HitSoundFX>IceElemental_Death</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_PenitentsRestitution">
        <DisplayName>TXT_BMB_SPELLS_BMB_PENITENTSRESTITUTION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PENITENTSRESTITUTION_DESCRIPTION</Description>
		<FormattedDescription>Heals all allies %d and caster gains 3 hit points permanently.</FormattedDescription>		
        <Image>T_Wellspring_Painting.png</Image>
        <IconFG>BMB_Ability_PenitentsRestitution.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Heal</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Heal</SpellSubClass>
        <SpellTargetType>AllFriendlyUnits</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>        
        <IsSpecialAbility>1</IsSpecialAbility>
        <Prereq>
            <Type>UnitStat</Type>
            <Attribute>UnitStat_PenitentsSuffering</Attribute>
            <Value>40</Value>
        </Prereq>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumLifeShards] * 10]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] + 150]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc2] * [UnitStat_BonusHealing]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumLifeShards] * 10]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] + 150]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc3" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc2] * [UnitStat_BonusHealing]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc3]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_PENITENTSRESTITUTION_MODIFIER_3_DISPLAYNAME</DisplayName>
			<ApplyToCaster>1</ApplyToCaster>
            <Value>3</Value>            
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_PenitentsSuffering</StrVal>
            <ApplyToCaster>1</ApplyToCaster>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_PenitentsSuffering] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Heal_01</HitSoundFX>
        <HitSoundFX>Spell_Heal_02</HitSoundFX>
        <SpellDefEffect>
            <EffectName>BMB_PenitentsRestitution_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_PenitentsSuffering">
        <DisplayName>TXT_BMB_SPELLS_BMB_PENITENTSSUFFERING_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PENITENTSSUFFERING_DESCRIPTION</Description>
        <Image>T_Reprisal_Painting.png</Image>
        <IconFG>T_Reprisal_Icon.png</IconFG>
        <CanStack>1</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_PenitentsSuffering</StrVal>
            <ApplyToCaster>1</ApplyToCaster>
            <Value>1</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
    </SpellDef>
	<SpellDef InternalName="BMB_PlagueTouch">
        <DisplayName>TXT_BMB_SPELLS_BMB_PLAGUETOUCH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PLAGUETOUCH_DESCRIPTION</Description>
        <Image>T_Infection_Painting.png</Image>
        <IconFG>T_Infection_Icon.png</IconFG>
        <CanStack>0</CanStack>        
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Other</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>        
        <IsCastable>0</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistPoison</StrVal>
            <Duration>-1</Duration>
            <Multiplier>0.5</Multiplier>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Poison</AttackStat>
            <Duration>-1</Duration>
            <Effect>E_Poison_Particle</Effect>
            <SoundFX>Spell_Poisoned2_01</SoundFX>
            <PerTurn>1</PerTurn>
            <Value>4</Value>
        </GameModifier>	
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>InfectNearbyAlliesWith</Attribute>
            <StrVal>SpellSubClass</StrVal>
            <StrVal2>Debuff</StrVal2>
            <DisplayName>TXT_BMB_SPELLS_BMB_PLAGUETOUCH_MODIFIER_3_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Infection_Particle</Effect>
            <PerTurn>1</PerTurn>
            <Radius>-1</Radius>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Infection_01</HitSoundFX>
        <HitSoundFX>Spell_Infection_02</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_PowerPunch">
		<DisplayName>TXT_BMB_SPELLS_BMB_POWERPUNCH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_POWERPUNCH_DESCRIPTION</Description>
        <FormattedDescription>Launch a %d Attack and the victim gets knocked back 2 tiles.</FormattedDescription>
        <IconFG>BMB_Ability_PowerPunch.png</IconFG>
        <CanStack>1</CanStack>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * 1.5]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
				<Expression><![CDATA[[Calc]]]></Expression>
			</Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>2</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CrushingBlow_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Ability_CrushingBlow</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.6</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_PowerSweep">
        <DisplayName>TXT_BMB_SPELLS_BMB_POWERSWEEP_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_POWERSWEEP_DESCRIPTION</Description>
        <IconFG>BMB_Ability_PowerSweep.png</IconFG>
        <StaminaCost>7</StaminaCost>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <AllowFriendlyFireInRadius>0</AllowFriendlyFireInRadius>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <Radius>1</Radius>
        <Range>0</Range>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetKnockedProne</Attribute>
            <Duration>1</Duration>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>500</AIPriority>
        </AIData>
        <CasterAnimationType>28</CasterAnimationType>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Sweep_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1.5</EffectScale>
            <EffectDelay>0.25</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_PrismaticBelt">
        <DisplayName>TXT_BMB_SPELLS_BMB_PRISMATICBELT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_PRISMATICBELT_DESCRIPTION</Description>
        <IconFG>S_Freeze_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
        <IsResistable>0</IsResistable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Cold</AttackStat>
            <MinValue>4</MinValue>
            <MaxValue>8</MaxValue>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Fire</AttackStat>
            <MinValue>4</MinValue>
            <MaxValue>8</MaxValue>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Lightning</AttackStat>
            <MinValue>4</MinValue>
            <MaxValue>8</MaxValue>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Poison</AttackStat>
            <MinValue>4</MinValue>
            <MaxValue>8</MaxValue>
        </GameModifier>       
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>        
        </AIData>
        <HitSoundFX>Spell_IceArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_IceArrow_Hit_02</HitSoundFX>
        <HitSoundFX>Spell_FlamingArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_FlamingArrow_Hit_02</HitSoundFX>
		<HitSoundFX>Spell_LightningArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_LightningArrow_Hit_02</HitSoundFX>
		<HitSoundFX>Spell_ToxicArrow_Hit_01</HitSoundFX>
        <HitSoundFX>Spell_ToxicArrow_Hit_02</HitSoundFX>
        <SpellDefEffect>
            <EffectName>A_ToxicLongbow_Impact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_RebounderEffect">
        <DisplayName>TXT_BMB_SPELLS_BMB_REBOUNDEREFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_REBOUNDEREFFECT_DESCRIPTION</Description>
        <IconFG>Ability_ShieldBash_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
		<IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>1</Value>
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>32</CasterAnimationType>
        <HitSoundFX>Ability_Shield_Bash</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Ability_ShieldBash_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.25</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_RejuvenatingFusion">
        <DisplayName>TXT_BMB_SPELLS_BMB_REJUVENATINGFUSION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_REJUVENATINGFUSION_DESCRIPTION</Description>
        <Image>T_Wellspring_Painting.png</Image>
        <IconFG>T_Wellspring_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>	
        <SpellTargetType>Self</SpellTargetType>	
        <AppliesRandomModifier>1</AppliesRandomModifier>
        <HideInHiergamenon>1</HideInHiergamenon>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_REJUVENATINGFUSION_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Value>1</Value>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_REJUVENATINGFUSION_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Value>2</Value>            
        </GameModifier>	
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_REJUVENATINGFUSION_MODIFIER_3_DISPLAYNAME</DisplayName>
            <Value>3</Value>
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>        
    </SpellDef>
	<SpellDef InternalName="BMB_Riptide">
        <DisplayName>TXT_BMB_SPELLS_BMB_RIPTIDE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_RIPTIDE_DESCRIPTION</Description>
        <FormattedDescription>Summon a wave that does %d damage to 3 adjacent enemies.</FormattedDescription>
        <Image>S_Erosion_Painting.png</Image>
        <IconFG>S_TidalWave_Icon.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <Radius>1</Radius>
        <RadiusType>ADJACENT</RadiusType>
        <Range>1</Range>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 8]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 4]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
            <AIMinSpellTargets>2</AIMinSpellTargets>
        </AIData>
        <HitSoundFX>Spell_Tidal_Wave</HitSoundFX>
        <ModifierDelay>4.5</ModifierDelay>
        <SpellDefEffect>
            <EffectName>S_WaterWave_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_RodentRepellent">
        <DisplayName>TXT_BMB_SPELLS_BMB_RODENTREPELLENT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_RODENTREPELLENT_DESCRIPTION</Description>
        <Image>S_AuraofVitality_Painting.png</Image>
        <IconFG>BMB_Ability_RodentRepellent.png</IconFG>        
        <CanStack>0</CanStack>
        <SpellBookSortCategory>City</SpellBookSortCategory>
        <SpellBookSortSubCategory>CityEnchantment</SpellBookSortSubCategory>
        <SpellType>Strategic</SpellType>
        <SpellClass>ImpResourceBooster</SpellClass>
        <SpellSubClass>Other</SpellSubClass>
        <SpellTargetType>FriendlyCity</SpellTargetType>        
        <SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>25</Amount>
        </SpellResourceCost>
        <GameModifier>
            <ModType>ResourceMultiplier</ModType>
            <Attribute>Food</Attribute>
            <Duration>-1</Duration>
            <PerTurn>1</PerTurn>
            <Calculate InternalName="Calc" ValueOwner="TargetCity">
                <Expression><![CDATA[[TileYieldEssence] * 0.15]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 1]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Unrest</Attribute>
            <Duration>-1</Duration>
            <PerTurn>1</PerTurn>
            <Value>-10</Value>
        </GameModifier>
        <ValidTerrainCategory>City</ValidTerrainCategory>
        <AIData AIPersonality="AI_General">
            <AIPriority>15</AIPriority>
        </AIData>
        <HitSoundFX>Spell_BlessCity_01</HitSoundFX>
        <SpellCastEffectName>Brilliance</SpellCastEffectName>
        <SpellCastEffectScale>.4</SpellCastEffectScale>
        <SpellDefEffect>
            <EffectName>S_Inspiration_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.75</EffectScale>
            <EffectDelay>0.5</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SaintlyAura">
		<DisplayName>TXT_BMB_SPELLS_BMB_SAINTLYAURA_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SAINTLYAURA_DESCRIPTION</Description>
        <Image>S_Regeneration_Painting.png</Image>
        <IconFG>S_Regeneration_Icon.png</IconFG>
		<Cooldown>88</Cooldown>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>FriendlyUnit</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>        
        <IsCastable>1</IsCastable>
        <IsSpecialAbility>1</IsSpecialAbility>
		<AllowFriendlyFireInRadius>0</AllowFriendlyFireInRadius>
        <IgnoreInvalidTargetsInRadius>1</IgnoreInvalidTargetsInRadius>
		<Radius>1</Radius>
        <Range>0</Range>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TacticalHealthRegen</StrVal>
			<Effect>BMB_SaintlyAura</Effect>
            <Duration>-1</Duration>			
            <Value>4</Value>
        </GameModifier>		
		<AIData AIPersonality="AI_General">
			<AIPriority>40</AIPriority>
		</AIData>
		<SpellCastEffectName>BMB_SaintlyAura</SpellCastEffectName>
		<SpellCastEffectScale>1</SpellCastEffectScale>
	</SpellDef>
	<SpellDef InternalName="BMB_Scrambler">
        <DisplayName>TXT_BMB_SPELLS_BMB_SCRAMBLER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SCRAMBLER_DESCRIPTION</Description>                
        <IconFG>BMB_Ability_Scrambler.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyCaster</SpellTargetType>
        <IsResistable>1</IsResistable>
		<HideInHiergamenon>1</HideInHiergamenon>		
		<IsSpecialAbility>1</IsSpecialAbility>	
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>DisruptSpellCharge</Attribute>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>ChanceToLoseNextTurn</Attribute>
            <DisplayName>TXT_BMB_SPELLS_BMB_SCRAMBLER_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>1</Duration>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>15</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Feedback_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_Corruption_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ShacklesOfEnslavement">
        <DisplayName>TXT_BMB_SPELLS_BMB_SHACKLESOFENSLAVEMENT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SHACKLESOFENSLAVEMENT_DESCRIPTION</Description>
        <Image>S_DestinysGift_Painting.png</Image>
        <IconFG>T_SilverTongue_Icon.png</IconFG>        
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Charm</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyTrainedUnit</SpellTargetType>
        <SpellTargetCreatureType>Men</SpellTargetCreatureType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <Range>1</Range>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CharmTarget</Attribute>
            <Value>100</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SilverTongue_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Tame_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_ShatterResistance">
        <DisplayName>TXT_BMB_SPELLS_BMB_SHATTERRESISTANCE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SHATTERRESISTANCE_DESCRIPTION</Description>
        <Image>Tech_Arcane_Weapons.png</Image>
        <IconFG>T_ShadowBolt_Icon.png</IconFG>
		<CanStack>1</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicResist</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_SHATTERRESISTANCE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
			<Value>-8</Value>	
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_SHATTERRESISTANCE_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
			<Value>-4</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Shadowbolt_Hit</HitSoundFX>
		<SpellDefEffect>
            <EffectName>T_Confusion_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnAllTargets>1</PlayOnAllTargets>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_ShieldSlam">
        <DisplayName>TXT_BMB_SPELLS_BMB_SHIELDSLAM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SHIELDSLAM_DESCRIPTION</Description>
        <FormattedDescription>Launch a %d Attack, knocks targets back 1 tile and knocks them prone.</FormattedDescription>
        <IconFG>Ability_ShieldBash_Icon.png</IconFG>
        <StaminaCost>3</StaminaCost>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <Range>1</Range>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Pierce</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetMovesBack</Attribute>
            <Value>1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetKnockedProne</Attribute>
            <Duration>1</Duration>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>32</CasterAnimationType>
        <HitSoundFX>Ability_Shield_Bash</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Ability_ShieldBash_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.25</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Slow_Mass">
        <DisplayName>TXT_BMB_SPELLS_BMB_SLOW_MASS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SLOW_MASS_DESCRIPTION</Description>
        <FormattedDescription>Target enemy army suffers -%d to Initiative unless they resist.</FormattedDescription>
        <Image>T_Slow_Painting.png</Image>
        <IconFG>S_TirelessMarch_Icon.png</IconFG>
        <Cooldown>10</Cooldown>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>AllEnemyUnits</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
		<PreventStackingWith>Slow</PreventStackingWith>
        <PreventStackingWith>Slow_Ability</PreventStackingWith>
        <SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>40</Amount>
        </SpellResourceCost>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_BMB_SLOW_MASS_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Slow_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_FreezeGroup</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="BMB_StaminaDrain">
        <DisplayName>TXT_BMB_SPELLS_BMB_STAMINADRAIN_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_STAMINADRAIN_DESCRIPTION</Description>
        <Image>Ability_Slow.png</Image>
		<IconFG>BMB_ShiftyDepleter.png</IconFG>
        <CanStack>1</CanStack>
        <StaminaCost>3</StaminaCost>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>	
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_STAMINADRAIN_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Stamina] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CrushingBlow_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Ability_CrushingBlow</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.6</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Stoneskin">
        <DisplayName>TXT_BMB_SPELLS_BMB_STONESKIN_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_STONESKIN_DESCRIPTION</Description>
        <FormattedDescription>Target champion's Defense is raised by %d.</FormattedDescription>
        <Image>T_Stoneskin_Painting.png</Image>
        <IconFG>T_Stoneskin_Icon.png</IconFG>        
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>FriendlyChampionOrSov</SpellTargetType>		
        <HideInHiergamenon>1</HideInHiergamenon>
		<IsSpecialAbility>1</IsSpecialAbility>
        <PreventStackingWith>Stoneskin</PreventStackingWith>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumEarthShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 3]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 3]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>
        </AIData>
        <HitSoundFX>Spell_StoneSkin_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_StoneSkin_Particle</EffectName>
            <LocalPosition>0,25,0</LocalPosition>
            <EffectScale>.4</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SummonAerialAlly">
        <DisplayName>TXT_BMB_SPELLS_BMB_SUMMONAERIALALLY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SUMMONAERIALALLY_DESCRIPTION</Description>
        <Image>M_AirElemental_Card.png</Image>
        <IconFG>S_SummonAirElemental_Icon.png</IconFG>
		<CanStack>0</CanStack>
        <Cooldown>8</Cooldown>
        <SpellBookSortCategory>Summon</SpellBookSortCategory>
        <SpellBookSortSubCategory>Summon</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Summon</SpellSubClass>
        <SpellTargetType>EmptyTile</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
        <IsSpecialAbility>1</IsSpecialAbility>
		<SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>20</Amount>
        </SpellResourceCost>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>AirElemental</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>AirElemental</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CrowDemon</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CrowDemon</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CrowDemon_Ancient</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CrowDemon_Ancient</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CrowDemon_Young</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SummonAirElemental_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_SummonAirElemental_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.5</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SummonArachnid">
        <DisplayName>TXT_BMB_SPELLS_BMB_SUMMONARACHNID_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SUMMONARACHNID_DESCRIPTION</Description>
        <Image>M_Spider_GiantBlackWidow.png</Image>
        <IconFG>Ability_Summon_Huge_Spider_Icon.png</IconFG>
		<CanStack>0</CanStack>
        <Cooldown>8</Cooldown>
        <SpellBookSortCategory>Summon</SpellBookSortCategory>
        <SpellBookSortSubCategory>Summon</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Summon</SpellSubClass>
        <SpellTargetType>EmptyTile</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
        <IsSpecialAbility>1</IsSpecialAbility>
		<SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>20</Amount>
        </SpellResourceCost>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>AlbinoRockSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>BlackWidow</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>BlackWidow</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>BlackWidow</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CorpseSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>CorpseSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>HoarderSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>RavenousHarridan</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>RavenousHarridan</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>RockSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>RockSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>RockSpider</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 6]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SummonDeathDemon_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>Y_SummonDeathDemon_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SummonBear">
        <DisplayName>TXT_BMB_SPELLS_BMB_SUMMONBEAR_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SUMMONBEAR_DESCRIPTION</Description>
        <FormattedDescription>Summons a level %d Bear.</FormattedDescription>
        <Image>TuskedBear_Medallion.png</Image>
        <IconFG>T_CallUteran_Icon.png</IconFG>
        <CanStack>0</CanStack>        
        <SpellBookSortCategory>Summon</SpellBookSortCategory>
        <SpellBookSortSubCategory>Summon</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Summon</SpellSubClass>
        <SpellTargetType>EmptyTile</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <StrVal>Bear</StrVal>
            <UnitClass>Bear</UnitClass>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + [Unit_GetLevel]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>70</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CallUteran_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_SummonEarthElemental_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.5</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SummonLupus">
        <DisplayName>TXT_BMB_SPELLS_BMB_SUMMONLUPUS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SUMMONLUPUS_DESCRIPTION</Description>
        <Image>M_Warg_PlainsWarg_Card.png</Image>
        <IconFG>BMB_Ability_SummonLupus.png</IconFG>
		<CanStack>0</CanStack>
        <Cooldown>8</Cooldown>
        <SpellBookSortCategory>Summon</SpellBookSortCategory>
        <SpellBookSortSubCategory>Summon</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Summon</SpellSubClass>
        <SpellTargetType>EmptyTile</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
        <IsSpecialAbility>1</IsSpecialAbility>
		<SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>10</Amount>
        </SpellResourceCost>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>Wolf_Group</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>Wolf_Group</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>GreatWolf</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>EbbenWolf</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>AnnieDog</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>TimberWarg</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>ShadowWarg</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <UnitClass>IceWarg</UnitClass>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitStat_BonusSummonLevel] + 8]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>50</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Howl_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>S_SummonEarthElemental_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.5</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SwampGasExplosion">
        <DisplayName>TXT_BMB_SPELLS_BMB_SWAMPGASEXPLOSION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SWAMPGASEXPLOSION_DESCRIPTION</Description>
        <FormattedDescription>Swamp Gas Explosion does %d damage to units within a 1-tile radius.</FormattedDescription>
        <Image>T_Curse_Painting.png</Image>
        <IconFG>BMB_Ability_SwampGasExplosion.png</IconFG>
		<Cooldown>6</Cooldown>	
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <AllowFriendlyFireInRadius>1</AllowFriendlyFireInRadius>
        <IsResistable>1</IsResistable>
        <Radius>1</Radius>        
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>
		<SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>20</Amount>
        </SpellResourceCost>	
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * -2]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] - 8]]></Expression>
            </Calculate>
			<Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>            
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>			
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Unit_GetLevel] * -1]]></Expression>
            </Calculate>
			<Calculate InternalName="Calc2" ValueOwner="CastingUnit">
                <Expression><![CDATA[[Calc] - 4]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc2]]]></Expression>
            </Calculate>
        </GameModifier>		
        <AIData AIPersonality="AI_General">
            <AIPriority>75</AIPriority>        
        </AIData>
        <HitSoundFX>Spell_FireBallExplode_01</HitSoundFX>
        <SpellCastSoundFX>Spell_FireBall_01</SpellCastSoundFX>
        <SpellCastEffectName>BMB_SwampGas_Particle</SpellCastEffectName>
        <SpellCastEffectScale>1</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>600</SpellCastProjectileSpeed>
        <WorldLightOverrideTime>3</WorldLightOverrideTime>
        <WorldLightOverrideAmbiant>20,20,20</WorldLightOverrideAmbiant>
        <WorldLightOverrideRim0>255,217,66</WorldLightOverrideRim0>
        <WorldLightOverrideRim1>255,115,66</WorldLightOverrideRim1>
        <SpellDefEffect>
            <EffectName>BMB_SwampGasExplosion_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>3</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_SyphonStrength">
        <DisplayName>TXT_BMB_SPELLS_BMB_SYPHONSTRENGTH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_SYPHONSTRENGTH_DESCRIPTION</Description>
        <Image>T_Erosion_Painting.png</Image>
        <IconFG>T_SyphonStrength_Icon.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <SpellTypeDrain>1</SpellTypeDrain>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Boost</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_SYPHONSTRENGTH_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * -0.25]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetTroopCount]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] / [Calc2]]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Boost</StrVal>
            <ApplyToCaster>1</ApplyToCaster>
            <DisplayName>TXT_BMB_SPELLS_BMB_SYPHONSTRENGTH_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_CombinedAttack] * 0.25]]></Expression>
            </Calculate>
            <Calculate InternalName="Calc2" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetTroopCount]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] / [Calc2]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>20</AIPriority>
        </AIData>
        <HitSoundFX>Spell_SyphonStrengthHit_01</HitSoundFX>
        <SpellCastSoundFX>Spell_SyphonStrengthTravel_01</SpellCastSoundFX>
        <SpellCastEffectName>T_Erosion_Particle</SpellCastEffectName>
        <SpellCastEffectScale>1</SpellCastEffectScale>
        <SpellCastProjectile>1</SpellCastProjectile>
        <SpellCastProjectileSpeed>700</SpellCastProjectileSpeed>
        <SpellDefEffect>
            <EffectName>T_ErosionImpact_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.5</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_TempestuousWrath">
        <DisplayName>TXT_BMB_SPELLS_BMB_TEMPESTUOUSWRATH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_TEMPESTUOUSWRATH_DESCRIPTION</Description>
        <IconFG>Ability_ChannelLightning_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
		<HideInHiergamenon>1</HideInHiergamenon>
        <IsSpecialAbility>1</IsSpecialAbility>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
			<DisplayName>TXT_BMB_SPELLS_BMB_TEMPESTUOUSWRATH_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Value>4</Value>
        </GameModifier>        
        <AIData AIPersonality="AI_General">
            <AIPriority>10</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Storm_01</HitSoundFX>
        <MissSoundFX>Spell_Storm_01</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_StaticBlast_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>2</EffectScale>
            <EffectDelay>0.25</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnAllTargets>1</PlayOnAllTargets>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_Thunderstorm">
        <DisplayName>TXT_BMB_SPELLS_BMB_THUNDERSTORM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_THUNDERSTORM_DESCRIPTION</Description>
        <FormattedDescription>Lightning strikes all enemies for %d Lightning damage.</FormattedDescription>
        <Image>T_Storm_Painting.png</Image>
        <IconFG>BMB_Ability_Thunderstorm.png</IconFG>
		<CastTime>1</CastTime>
		<Cooldown>6</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>AllEnemyUnits</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>        
        <SpellResourceCost>
            <Resource>Mana</Resource>
            <Amount>30</Amount>
        </SpellResourceCost>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Lightning</AttackStat>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumAirShards] * 4]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 20]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 20]]></Expression>
            </Calculate>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
            <AttackStat>UnitStat_Attack_Lightning</AttackStat>
            <IsForSpellResist>1</IsForSpellResist>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumAirShards] * 2]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 10]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>60</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Storm_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Storm_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0.25</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
            <PlayOnAllTargets>1</PlayOnAllTargets>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_TwinShaft">
        <DisplayName>TXT_BMB_SPELLS_BMB_TWINSHAFT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_TWINSHAFT_DESCRIPTION</Description>
        <IconFG>BMB_Ability_TwinShaft.png</IconFG>
        <Cooldown>5</Cooldown>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <ApproachTargetTile>1</ApproachTargetTile>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <CasterAnimationType>27</CasterAnimationType>
        <HitSoundFX>Spell_DoubleStrike_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_DoubleStrike_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>1</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
	</SpellDef>
	<SpellDef InternalName="BMB_WallbreakerEffect">
        <DisplayName>TXT_BMB_SPELLS_BMB_WALLBREAKEREFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_WALLBREAKEREFFECT_DESCRIPTION</Description>
        <FormattedDescription>Target's defense is reduced by %d.</FormattedDescription>
        <IconFG>Ability_CrushingBlow_Icon.png</IconFG>
		<CanStack>1</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitDamage</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Damage</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <DisplayName>TXT_BMB_SPELLS_BMB_WALLBREAKEREFFECT_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>            
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[UnitStat_Defense_Pierce] * -.3]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc]]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_CrushingBlow_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
        <SpellDefEffect>
            <EffectName>Y_Ability_CrushingBlow</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>0.6</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>
	<SpellDef InternalName="BMB_WaywardDeathBane_Effect">
        <DisplayName>TXT_BMB_SPELLS_BMB_WAYWARDDEATHBANE_EFFECT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_WAYWARDDEATHBANE_EFFECT_DESCRIPTION</Description>
        <IconFG>Ability_ReapI_Icon.png</IconFG>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>Other</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>Self</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
		<AppliesRandomModifier>1</AppliesRandomModifier>
        <IsCastable>0</IsCastable>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <ApplyToCaster>1</ApplyToCaster>
			<Value>8</Value>            
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>            
            <Value>0</Value>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        </AIData>
        <HitSoundFX>Spell_Beserk_01</HitSoundFX>
        <SpellDefEffect>
            <EffectName>T_Heal_Particle</EffectName>
            <LocalPosition>0,0,0</LocalPosition>
            <EffectScale>.75</EffectScale>
            <EffectDelay>0</EffectDelay>
            <SnapToTerrain>1</SnapToTerrain>
        </SpellDefEffect>
    </SpellDef>	
	<SpellDef InternalName="BMB_Yank">
        <DisplayName>TXT_BMB_SPELLS_BMB_YANK_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_BMB_YANK_DESCRIPTION</Description>
        <Image>Ability_Slow.png</Image>
        <IconFG>W_Staff_Queens_Icon_01.png</IconFG>
        <CanStack>0</CanStack>
        <StaminaCost>3</StaminaCost>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsCastable>0</IsCastable>
        <CanBeDodged>1</CanBeDodged>
        <IsResistable>1</IsResistable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <UseWeaponRange>1</UseWeaponRange>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>DefendableDamage</Attribute>
        </GameModifier>
        <GameModifier>
            <ModType>TacticalUnit</ModType>
            <Attribute>TargetKnockedProne</Attribute>
            <DisplayName>TXT_BMB_SPELLS_BMB_YANK_MODIFIER_2_DISPLAYNAME</DisplayName>
            <Duration>1</Duration>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>5</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Hobble_01</HitSoundFX>
        <MissSoundFX>Miss_Swing1</MissSoundFX>
        <MissSoundFX>Miss_Swing2</MissSoundFX>
    </SpellDef>
	<SpellDef InternalName="Haste">
        <DisplayName>TXT_BMB_SPELLS_HASTE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_HASTE_DESCRIPTION</Description>
        <FormattedDescription>Target unit is +%d to Initiative.</FormattedDescription>
        <Image>T_Haste_Painting.png</Image>
        <IconFG>T_Haste_Icon.png</IconFG>
        <AutoUnlock>1</AutoUnlock>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>FriendlyUnit</SpellTargetType>
        <PreventStackingWith>Haste_Adept</PreventStackingWith>
		<PreventStackingWith>BMB_Haste_Mass</PreventStackingWith>
        <Prereq>
            <Type>AbilityBonusOption</Type>
            <Attribute>Air1</Attribute>
        </Prereq>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_HASTE_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Celerity_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumAirShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>255</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Haste_01</HitSoundFX>
        <HitSoundFX>Spell_Haste_02</HitSoundFX>
    </SpellDef>
    <SpellDef InternalName="Haste_Adept">
        <DisplayName>TXT_BMB_SPELLS_HASTE_ADEPT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_HASTE_ADEPT_DESCRIPTION</Description>
        <FormattedDescription>Target unit is +%d to Initiative.</FormattedDescription>
        <Image>T_Haste_Painting.png</Image>
        <IconFG>T_Haste_Icon.png</IconFG>
        <AutoUnlock>1</AutoUnlock>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitEnchantment</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Defensive</SpellClass>
        <SpellSubClass>Buff</SpellSubClass>
        <SpellTargetType>FriendlyUnit</SpellTargetType>
        <PreventStackingWith>Haste</PreventStackingWith>
		<PreventStackingWith>BMB_Haste_Mass</PreventStackingWith>
        <Prereq>
            <Type>AbilityBonusOption</Type>
            <Attribute>AirAdept1</Attribute>
        </Prereq>       
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_HASTE_ADEPT_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Celerity_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumAirShards]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] + 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_Haste_01</HitSoundFX>
        <HitSoundFX>Spell_Haste_02</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="Slow">
        <DisplayName>TXT_BMB_SPELLS_SLOW_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_SLOW_DESCRIPTION</Description>
        <FormattedDescription>Target enemy unit suffers -%d to Initiative unless they resist.</FormattedDescription>
        <Image>T_Slow_Painting.png</Image>
        <IconFG>T_Slow_Icon.png</IconFG>
        <AutoUnlock>1</AutoUnlock>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IsResistable>1</IsResistable>
        <PreventStackingWith>Slow_Ability</PreventStackingWith>
		<PreventStackingWith>BMB_Slow_Mass</PreventStackingWith>
        <Prereq>
            <Type>AbilityBonusOption</Type>
            <Attribute>Water1</Attribute>
        </Prereq>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_SLOW_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Slow_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_FreezeGroup</HitSoundFX>
    </SpellDef>
    <SpellDef InternalName="Slow_Ability">
        <DisplayName>TXT_BMB_SPELLS_SLOW_ABILITY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_SLOW_ABILITY_DESCRIPTION</Description>
        <FormattedDescription>Target enemy unit suffers -%d to Initiative unless they resist.</FormattedDescription>
        <Image>T_Slow_Painting.png</Image>
        <IconFG>T_Slow_Icon.png</IconFG>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <HideInHiergamenon>1</HideInHiergamenon>
        <IsResistable>1</IsResistable>
        <IsSpecialAbility>1</IsSpecialAbility>
        <PreventStackingWith>Slow</PreventStackingWith>
		<PreventStackingWith>BMB_Slow_Mass</PreventStackingWith>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_SLOW_ABILITY_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Slow_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_FreezeGroup</HitSoundFX>
    </SpellDef>
	<SpellDef InternalName="Slow_Adept">
        <DisplayName>TXT_BMB_SPELLS_SLOW_ADEPT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_SPELLS_SLOW_ADEPT_DESCRIPTION</Description>
        <FormattedDescription>Target enemy unit suffers -%d to Initiative unless they resist.</FormattedDescription>
        <Image>T_Slow_Painting.png</Image>
        <IconFG>T_Slow_Icon.png</IconFG>
        <AutoUnlock>1</AutoUnlock>
        <CanStack>0</CanStack>
        <SpellBookSortCategory>Unit</SpellBookSortCategory>
        <SpellBookSortSubCategory>UnitCurse</SpellBookSortSubCategory>
        <SpellType>Tactical</SpellType>
        <SpellClass>Offensive</SpellClass>
        <SpellSubClass>Debuff</SpellSubClass>
        <SpellTargetType>EnemyUnit</SpellTargetType>
        <IsResistable>1</IsResistable>
        <PreventStackingWith>Slow</PreventStackingWith>
		<PreventStackingWith>BMB_Slow_Mass</PreventStackingWith>
        <Prereq>
            <Type>AbilityBonusOption</Type>
            <Attribute>WaterAdept1</Attribute>
        </Prereq>       
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <IsForFormattedDescription>1</IsForFormattedDescription>
            <DisplayName>TXT_BMB_SPELLS_SLOW_ADEPT_MODIFIER_1_DISPLAYNAME</DisplayName>
            <Duration>-1</Duration>
            <Effect>E_Slow_Particle</Effect>
            <Calculate InternalName="Calc" ValueOwner="CastingUnit">
                <Expression><![CDATA[[UnitOwner_GetNumWaterShards] * -1]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
            <Calculate InternalName="ValueForFormattedDescription">
                <Expression><![CDATA[[Calc] - 5]]></Expression>
            </Calculate>
        </GameModifier>
        <AIData AIPersonality="AI_General">
            <AIPriority>40</AIPriority>
        <ValueCalcWrapper>
            <ValueType>IsTargetWorthy</ValueType>
            <Calculate InternalName="Calc" ValueOwner="TargetUnit">
                <Expression><![CDATA[[Unit_GetHPCurrent]]]></Expression>
            </Calculate>
            <Calculate InternalName="Value">
                <Expression><![CDATA[[Calc] > 10]]></Expression>
            </Calculate>
        </ValueCalcWrapper>
        </AIData>
        <HitSoundFX>Spell_FreezeGroup</HitSoundFX>
    </SpellDef>
</Spells>

```
_SOURCE: Ability definitions (generated from xml/abilities/)_
# Ability definitions (generated from xml/abilities/)
```
// Structure of documents
└── Mods/
    └── src/
        └── Data/
            └── GameCore/
                └── BMB_Abilities.xml

```
###  Path: `\Mods\src\Data\GameCore/BMB_Abilities.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Black Market Bazaar by Hellions -->
<AbilityBonuses>
    <DataChecksum NoParse="1">
        <Ignore>DispName</Ignore>
        <Translate>DisplayName,Description</Translate>
    </DataChecksum>
    <AbilityBonus InternalName="BMB_EruditeAbility">
        <AbilityBonusOption InternalName="BMB_Erudite">
            <DisplayName>TXT_BMB_ABILITIES_BMB_ERUDITE_DISPLAYNAME</DisplayName>
            <Description>TXT_BMB_ABILITIES_BMB_ERUDITE_DESCRIPTION</Description>
            <Icon>BMB_Ability_Erudite.png</Icon> 
			<GameModifier>
                <ModType>Unit</ModType>
                <Attribute>AdjustUnitStat</Attribute>
                <StrVal>UnitStat_ExpBonus</StrVal>
                <Value>30</Value>
                <Provides>TXT_BMB_ABILITIES_BMB_ERUDITE_PROVIDES_1</Provides>
            </GameModifier>
			<GameModifier>
                <ModType>Player</ModType>
                <Attribute>AbilityBonus</Attribute>
                <StrVal>A_Research</StrVal>
                <Value>10</Value>
                <Provides>TXT_BMB_ABILITIES_BMB_ERUDITE_PROVIDES_2</Provides>
            </GameModifier>	
            <Type>Army</Type>            
            <AIData AIPersonality="AI_General">
                <AIPriority>5</AIPriority>
            </AIData>
        </AbilityBonusOption>
    </AbilityBonus>
    <AbilityBonus InternalName="BMB_FamousAbility">        
        <AbilityBonusOption InternalName="BMB_Famous">
            <DisplayName>TXT_BMB_ABILITIES_BMB_FAMOUS_DISPLAYNAME</DisplayName>
            <Description>TXT_BMB_ABILITIES_BMB_FAMOUS_DESCRIPTION</Description>
            <Icon>BMB_Ability_Famous.png</Icon>            
            <GameModifier>
                <ModType>Unit</ModType>
                <Attribute>ProduceResource</Attribute>
                <StrVal>Fame</StrVal>
                <Value>1</Value>
                <Provides>TXT_BMB_ABILITIES_BMB_FAMOUS_PROVIDES_1</Provides>
            </GameModifier>
            <Type>Army</Type>            
            <AIData AIPersonality="AI_General">
                <AIPriority>5</AIPriority>
            </AIData>
        </AbilityBonusOption>
    </AbilityBonus>
</AbilityBonuses>

```
---
**File Statistics**
- **Size**: 207.1 KB
- **Lines**: 4618
File: `modules/bmb-mod/spells-abilities.md`
