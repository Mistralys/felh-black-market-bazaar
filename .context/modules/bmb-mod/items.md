# BMB Mod - Items & Accessories
_SOURCE: Item definitions (generated from xml/items/)_
# Item definitions (generated from xml/items/)
```
// Structure of documents
└── Mods/
    └── src/
        └── Data/
            └── GameCore/
                └── BMB_Items.xml

```
###  Path: `\Mods\src\Data\GameCore/BMB_Items.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Black Market Bazaar by Hellions -->
<GameItemTypes>
	<GameItemType InternalName="AmuletOfContamination">
        <DisplayName>TXT_BMB_ITEMS_AMULETOFCONTAMINATION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_AMULETOFCONTAMINATION_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <AdditionalTrainingTurns>16</AdditionalTrainingTurns>
        <ShopValue>180</ShopValue>
        <ProductionRequirement>
            <Type>Resource</Type>
            <Attribute>RefinedCrystal</Attribute>
            <Value>4</Value>
        </ProductionRequirement>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Value>2</Value>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>0</IsUsable>
        <Prereq>
            <Type>Tech</Type>
            <Attribute>Glyph_Stones</Attribute>
        </Prereq>
            <AIData AIPersonality="AI_General">
                <AIPriority>40</AIPriority>
            </AIData>
        <ArtDef>AmuletOfContamination_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="AmuletOfContamination_ArtDef">
            <GameItemTypeModelPack InternalName="AmuletOfContamination_Default">
                <IconFile>BMB_AmuletOfContamination.png</IconFile>                
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="AmuletOfTheBlackMinded">
        <DisplayName>TXT_BMB_ITEMS_AMULETOFTHEBLACKMINDED_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_AMULETOFTHEBLACKMINDED_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>220</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicPower</StrVal>
            <Value>5</Value>
        </GameModifier>	
        <GameModifier>
			<ModType>Unit</ModType>
			<Attribute>MeleeDefenseAppliesSpell</Attribute>
			<StrVal>BMB_AmuletOfTheBlackMindedEffect</StrVal>
			<Provides>TXT_BMB_ITEMS_AMULETOFTHEBLACKMINDED_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>30</AIPriority>
            </AIData>
        <ArtDef>AmuletOfTheBlackMinded_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="AmuletOfTheBlackMinded_ArtDef">
            <GameItemTypeModelPack InternalName="AmuletOfTheBlackMinded_Default">
                <IconFile>BMB_AmuletOfTheBlackMinded.png</IconFile>
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
	<GameItemType InternalName="ArachnidAmulet">
        <DisplayName>TXT_BMB_ITEMS_ARACHNIDAMULET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ARACHNIDAMULET_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>360</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Multiplier>2.00</Multiplier>
            <Provides>TXT_BMB_ITEMS_ARACHNIDAMULET_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_SummonArachnid</StrVal>
            <Provides>TXT_BMB_ITEMS_ARACHNIDAMULET_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>60</AIPriority>
            </AIData>
        <ArtDef>ArachnidAmulet_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ArachnidAmulet_ArtDef">
            <GameItemTypeModelPack InternalName="ArachnidAmulet_Default">
                <IconFile>BMB_ArachnidAmulet.png</IconFile>
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
	<GameItemType InternalName="BeltOfWeariness">
        <DisplayName>TXT_BMB_ITEMS_BELTOFWEARINESS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BELTOFWEARINESS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>240</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>MeleeAppliesSpell</Attribute>
            <StrVal>BMB_BeltOfWeariness_Effect</StrVal>
            <Provides>TXT_BMB_ITEMS_BELTOFWEARINESS_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>25</AIPriority>
            </AIData>
        <ArtDef>BeltOfWeariness_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BeltOfWeariness_ArtDef">
            <GameItemTypeModelPack InternalName="BeltOfWeariness_Default">
                <IconFile>BMB_BeltOfWeariness.png</IconFile>
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
	<GameItemType InternalName="BirdOfCelerity">
        <DisplayName>TXT_BMB_ITEMS_BIRDOFCELERITY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BIRDOFCELERITY_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>400</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_Haste_Mass</StrVal>
            <Provides>TXT_BMB_ITEMS_BIRDOFCELERITY_PROVIDES_1</Provides>
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
        <ArtDef>BirdOfCelerity_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BirdOfCelerity_ArtDef">
            <GameItemTypeModelPack InternalName="BirdOfCelerity_Default">
                <IconFile>BMB_BirdOfCelerity.png</IconFile>
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
	<GameItemType InternalName="BloodCandles">
        <DisplayName>TXT_BMB_ITEMS_BLOODCANDLES_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BLOODCANDLES_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>350</ShopValue>
		<GameModifier>
			<ModType>Unit</ModType>
			<Attribute>BattleAutoCastSpell</Attribute>
			<StrVal>BMB_BloodCandles</StrVal>
			<Value>100</Value>
			<Provides>TXT_BMB_ITEMS_BLOODCANDLES_PROVIDES_1</Provides>
		</GameModifier>					
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>40</AIPriority>
            </AIData>
        <ArtDef>BloodCandles_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BloodCandles_ArtDef">
            <GameItemTypeModelPack InternalName="BloodCandles_Default">
                <IconFile>BMB_BloodCandles.png</IconFile>
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
	<GameItemType InternalName="BloomingTonic">
        <DisplayName>TXT_BMB_ITEMS_BLOOMINGTONIC_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BLOOMINGTONIC_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>450</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>CurHealth</Attribute>
            <Value>50</Value>
            <Provides>TXT_BMB_ITEMS_BLOOMINGTONIC_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>HealRandomInjury</Attribute>
			<Provides>TXT_BMB_ITEMS_BLOOMINGTONIC_PROVIDES_2</Provides>	
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>HealRandomInjury</Attribute>
            <Provides>TXT_BMB_ITEMS_BLOOMINGTONIC_PROVIDES_3</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>BloomingTonic_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BloomingTonic_ArtDef">
            <GameItemTypeModelPack InternalName="BloomingTonic_Default">
                <IconFile>Potion2_Item.png</IconFile>
				<MapParticle>T_Heal_Particle</MapParticle>
                <TintR>14</TintR>
                <TintG>156</TintG>
                <TintB>222</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="BlueCrystal">
        <DisplayName>TXT_BMB_ITEMS_BLUECRYSTAL_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BLUECRYSTAL_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>160</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_FreezingRay</StrVal>
            <Provides>TXT_BMB_ITEMS_BLUECRYSTAL_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>30</AIPriority>
            </AIData>
        <ArtDef>BlueCrystal_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BlueCrystal_ArtDef">
            <GameItemTypeModelPack InternalName="BlueCrystal_Default">
                <IconFile>BMB_BlueCrystal.png</IconFile>
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
	<GameItemType InternalName="BlueWine">
        <DisplayName>TXT_BMB_ITEMS_BLUEWINE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BLUEWINE_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>490</ShopValue>
        <GameModifier>
            <ModType>Player</ModType>
            <Attribute>AllUnitsGainLevel</Attribute>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_BLUEWINE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>BlueWine_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BlueWine_ArtDef">
            <GameItemTypeModelPack InternalName="BlueWine_Default">
                <IconFile>BMB_BlueWine.png</IconFile>
				<MapParticle>S_Paragon_Particle</MapParticle>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="BMB_FrenzyCharm">
        <DisplayName>TXT_BMB_ITEMS_BMB_FRENZYCHARM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BMB_FRENZYCHARM_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>400</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Maul</StrVal>
            <Provides>TXT_BMB_ITEMS_BMB_FRENZYCHARM_PROVIDES_1</Provides>
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
    <GameItemType InternalName="BMB_InfernalCompanion">
        <DisplayName>TXT_BMB_ITEMS_BMB_INFERNALCOMPANION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BMB_INFERNALCOMPANION_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>120</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <StrVal>Shade</StrVal>
            <Value>6</Value>
            <Provides>TXT_BMB_ITEMS_BMB_INFERNALCOMPANION_PROVIDES_1</Provides>
            <UnitClass>ShadowWarg</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <AIData AIPersonality="AI_General">
            <AIPriority>0</AIPriority>
        </AIData>
        <ArtDef>BMB_InfernalCompanion_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BMB_InfernalCompanion_ArtDef">
            <GameItemTypeModelPack InternalName="BMB_InfernalCompanion_Default">
                <IconFile>BMB_InfernalCompanion.png</IconFile>
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
	<GameItemType InternalName="BookOfArcaneEquations">
        <DisplayName>TXT_BMB_ITEMS_BOOKOFARCANEEQUATIONS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BOOKOFARCANEEQUATIONS_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>SpellResistance_Level</StrVal>
            <Provides>TXT_BMB_ITEMS_BOOKOFARCANEEQUATIONS_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>BookOfArcaneEquations_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BookOfArcaneEquations_ArtDef">
            <GameItemTypeModelPack InternalName="BookOfArcaneEquations_Default">
                <IconFile>BookOfCharisma_Item.png</IconFile>
                <TintR>115</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="BrokenMirror">
        <DisplayName>TXT_BMB_ITEMS_BROKENMIRROR_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BROKENMIRROR_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>120</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ArmorPierce</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_BROKENMIRROR_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>60</AIPriority>
            </AIData>
        <ArtDef>BrokenMirror_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BrokenMirror_ArtDef">
            <GameItemTypeModelPack InternalName="BrokenMirror_Default">
                <IconFile>Item_BrokenMirror_Icon.png</IconFile>
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
	<GameItemType InternalName="BronzeArrows">
        <DisplayName>TXT_BMB_ITEMS_BRONZEARROWS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BRONZEARROWS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>90</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
            <Value>6</Value>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>20</AIPriority>
            </AIData>
        <ArtDef>BronzeArrows_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BronzeArrows_ArtDef">
            <GameItemTypeModelPack InternalName="BronzeArrows_Default">
                <IconFile>BMB_BronzeArrows.png</IconFile>
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
	<GameItemType InternalName="BurningContract">
        <DisplayName>TXT_BMB_ITEMS_BURNINGCONTRACT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_BURNINGCONTRACT_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Fire</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_BURNINGCONTRACT_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_ResistFire</StrVal>
            <Value>15</Value>
            <Provides>TXT_BMB_ITEMS_BURNINGCONTRACT_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>BurningContract_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="BurningContract_ArtDef">
            <GameItemTypeModelPack InternalName="BurningContract_Default">
                <IconFile>BMB_BurningContract.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>TurnPageMagical_01</SFX>
                <SFX>TurnPageMagical_02</SFX>
                <SFX>TurnPageMagical_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="CastIronBrassiere">
        <DisplayName>TXT_BMB_ITEMS_CASTIRONBRASSIERE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_CASTIRONBRASSIERE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>250</ShopValue>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina_Starting</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_CASTIRONBRASSIERE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>        
            <AIData AIPersonality="AI_General">
                <AIPriority>45</AIPriority>
            </AIData>
        <ArtDef>CastIronBrassiere_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="CastIronBrassiere_ArtDef">
            <GameItemTypeModelPack InternalName="CastIronBrassiere_Default">
                <SupportedUnitModelType>AmarianFemale</SupportedUnitModelType>
				<SupportedUnitModelType>Banshee</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireFemale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarFemale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanFemale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithFemale</SupportedUnitModelType>
				<IconFile>BMB_CastIronBrassiere.png</IconFile>                
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="CauldronOfPlenty">
        <DisplayName>TXT_BMB_ITEMS_CAULDRONOFPLENTY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_CAULDRONOFPLENTY_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Population</Attribute>
            <Value>15</Value>
			<Provides>TXT_BMB_ITEMS_CAULDRONOFPLENTY_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>CauldronOfPlenty_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="CauldronOfPlenty_ArtDef">
            <GameItemTypeModelPack InternalName="CauldronOfPlenty_Default">
                <IconFile>BMB_CauldronOfPlenty.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Eating</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="ChokerSpore">
        <DisplayName>TXT_BMB_ITEMS_CHOKERSPORE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_CHOKERSPORE_DESCRIPTION</Description>
        <ShopValue>140</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_ChokerSpore</StrVal>
            <Provides>TXT_BMB_ITEMS_CHOKERSPORE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
        <UsableInBattle>1</UsableInBattle>
        <UsableOnlyOnceInBattle>0</UsableOnlyOnceInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>ChokerSpore_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ChokerSpore_ArtDef">
            <GameItemTypeModelPack InternalName="ChokerSpore_Default">
                <IconFile>BMB_ChokerSpore.png</IconFile>
                <SFX>Equip_Poison_01</SFX>                
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="CorruptiveChalice">
        <DisplayName>TXT_BMB_ITEMS_CORRUPTIVECHALICE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_CORRUPTIVECHALICE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_CORRUPTIVECHALICE_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_ResistPoison</StrVal>
            <Value>15</Value>
            <Provides>TXT_BMB_ITEMS_CORRUPTIVECHALICE_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>CorruptiveChalice_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="CorruptiveChalice_ArtDef">
            <GameItemTypeModelPack InternalName="CorruptiveChalice_Default">
                <IconFile>BMB_CorruptiveChalice.png</IconFile>
                <TintR>140</TintR>
                <TintG>156</TintG>
                <TintB>28</TintB>
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="DexterousElixir">
        <DisplayName>TXT_BMB_ITEMS_DEXTEROUSELIXIR_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_DEXTEROUSELIXIR_DESCRIPTION</Description>        
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>225</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
            <Value>6</Value>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>DexterousElixir_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="DexterousElixir_ArtDef">
            <GameItemTypeModelPack InternalName="DexterousElixir_Default">
                <IconFile>Potion3.png</IconFile>
                <TintR>88</TintR>
                <TintG>130</TintG>
                <TintB>170</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="DimensionalDiadem">
        <DisplayName>TXT_BMB_ITEMS_DIMENSIONALDIADEM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_DIMENSIONALDIADEM_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>600</ShopValue>		
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistPierce</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_DIMENSIONALDIADEM_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_DimensionalTranslocation</StrVal>
            <Provides>TXT_BMB_ITEMS_DIMENSIONALDIADEM_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
            <AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>Art_DimensionalDiadem</ArtDef>    
		<GameItemTypeArtDef InternalName="Art_DimensionalDiadem">
			<GameItemTypeModelPack InternalName="Art_DimensionalDiadem_1">				
				<SupportedUnitModelType>AmarianMale</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireMale</SupportedUnitModelType>
				<SupportedUnitModelType>HenchmanMale</SupportedUnitModelType>				
				<SupportedUnitModelType>IroneerMale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerMale</SupportedUnitModelType>
				<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>				
				<SupportedUnitModelType>TarthanMale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithMale</SupportedUnitModelType>
				<IconFile>BMB_DimensionalDiadem.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>gfx/hkb/Armor/K_Male_Circlet_Mesh_01.hkb</ModelFile>
					<Texture_All>K_Male_Circlet_Texture_01.png</Texture_All>
					<Attachment>head_lcf</Attachment>
					<AttachmentType>Skinned</AttachmentType>
					<Color_Metal>108,15,15</Color_Metal>
					<Scale>1.2</Scale>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
			<GameItemTypeModelPack InternalName="Art_DimensionalDiadem_2">
				<SupportedUnitModelType>DarklingMale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenMale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarMale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenMale</SupportedUnitModelType>
				<IconFile>BMB_DimensionalDiadem.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>gfx/hkb/Armor/F_Male_Circlet_Mesh_01.hkb</ModelFile>
					<Texture_All>K_Male_Circlet_Texture_01.png</Texture_All>
					<Attachment>head_lcf</Attachment>
					<AttachmentType>Skinned</AttachmentType>
					<Color_Metal>108,15,15</Color_Metal>
					<Scale>1.2</Scale>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
			<GameItemTypeModelPack InternalName="Art_DimensionalDiadem_3">
				<SupportedUnitModelType>AmarianFemale</SupportedUnitModelType>
				<SupportedUnitModelType>Banshee</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireFemale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarFemale</SupportedUnitModelType>				
				<SupportedUnitModelType>TarthanFemale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithFemale</SupportedUnitModelType>				
				<IconFile>BMB_DimensionalDiadem.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>gfx/hkb/Armor/K_Female_Circlet_Mesh_01.hkb</ModelFile>
					<Texture_All>K_Male_Circlet_Texture_01.png</Texture_All>
					<Attachment>head_lcf</Attachment>
					<AttachmentType>Skinned</AttachmentType>
					<Color_Metal>108,15,15</Color_Metal>
					<Scale>1.2</Scale>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
		</GameItemTypeArtDef>
	</GameItemType>
	<GameItemType InternalName="DisciplinaryBullwhip">
        <DisplayName>TXT_BMB_ITEMS_DISCIPLINARYBULLWHIP_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_DISCIPLINARYBULLWHIP_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>140</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_DISCIPLINARYBULLWHIP_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>DisciplinaryBullwhip_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="DisciplinaryBullwhip_ArtDef">
            <GameItemTypeModelPack InternalName="DisciplinaryBullwhip_Default">
                <IconFile>BMB_DisciplinaryBullwhip.png</IconFile>
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
	<GameItemType InternalName="Egg_BlackWidow">
        <DisplayName>TXT_BMB_ITEMS_EGG_BLACKWIDOW_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_EGG_BLACKWIDOW_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>100</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
			<StrVal>Bitsy Spider</StrVal>
            <Value>4</Value>
            <Provides>TXT_BMB_ITEMS_EGG_BLACKWIDOW_PROVIDES_1</Provides>
            <UnitClass>BlackWidow</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Egg_BlackWidow_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Egg_BlackWidow_ArtDef">
            <GameItemTypeModelPack InternalName="Egg_BlackWidow_Default">
                <IconFile>DragonEgg3.png</IconFile>
                <TintR>41</TintR>
                <TintG>31</TintG>
                <TintB>102</TintB>
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Egg_Naja">
        <DisplayName>TXT_BMB_ITEMS_EGG_NAJA_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_EGG_NAJA_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>90</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
			<StrVal>Lil'King Cobra</StrVal>
            <Value>4</Value>
            <Provides>TXT_BMB_ITEMS_EGG_NAJA_PROVIDES_1</Provides>
            <UnitClass>Naja</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Egg_Naja_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Egg_Naja_ArtDef">
            <GameItemTypeModelPack InternalName="Egg_Naja_Default">
                <IconFile>DragonEgg1.png</IconFile>
                <TintR>140</TintR>
                <TintG>156</TintG>
                <TintB>28</TintB>
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="ElementalsFairyTales">
        <DisplayName>TXT_BMB_ITEMS_ELEMENTALSFAIRYTALES_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ELEMENTALSFAIRYTALES_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Loremaster1</StrVal>
            <Provides>TXT_BMB_ITEMS_ELEMENTALSFAIRYTALES_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>ElementalsFairyTales_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ElementalsFairyTales_ArtDef">
            <GameItemTypeModelPack InternalName="ElementalsFairyTales_Default">
                <IconFile>RegularBook2.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
    <GameItemType InternalName="EsotericExposer">
        <DisplayName>TXT_BMB_ITEMS_ESOTERICEXPOSER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ESOTERICEXPOSER_DESCRIPTION</Description>
        <Type>Head</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>300</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TreasureHunter</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_ESOTERICEXPOSER_PROVIDES_1</Provides>
        </GameModifier>        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
		<IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
		<HeroOnly>1</HeroOnly>		
            <AIData AIPersonality="AI_General">
                <AIPriority>26</AIPriority>
            </AIData>
        <ArtDef>Art_EsotericExposer</ArtDef>
		<GameItemTypeArtDef InternalName="Art_EsotericExposer">
			<GameItemTypeModelPack InternalName="Art_EsotericExposer_1">
				<SupportedUnitModelType>AmarianMale</SupportedUnitModelType>
				<SupportedUnitModelType>DarklingMale</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireMale</SupportedUnitModelType>
				<SupportedUnitModelType>HenchmanMale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerMale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerMale</SupportedUnitModelType>
				<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanMale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithMale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenMale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarMale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenMale</SupportedUnitModelType>
				<SupportedUnitModelType>AmarianFemale</SupportedUnitModelType>
				<SupportedUnitModelType>Banshee</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireFemale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarFemale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanFemale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithFemale</SupportedUnitModelType>
				<IconFile>BMB_EsotericExposer.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>gfx/hkb/Armor/F_Emerald_Skullcap_Mesh_01.hkb</ModelFile>
					<Texture_All>BMB_Esoteric_Exposer_Texture.png</Texture_All>
					<Attachment>head_lcf</Attachment>	
				</GameItemTypeModel>
			</GameItemTypeModelPack>			        
		</GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="EternalIcicle">
        <DisplayName>TXT_BMB_ITEMS_ETERNALICICLE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ETERNALICICLE_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>60</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
            <Value>3</Value>
        </GameModifier>
		 <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_IceRing</StrVal>
            <Provides>TXT_BMB_ITEMS_ETERNALICICLE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>EternalIcicle_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="EternalIcicle_ArtDef">
            <GameItemTypeModelPack InternalName="EternalIcicle_Default">
                <IconFile>BMB_EternalIcicle.png</IconFile>
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
	<GameItemType InternalName="EvasiveCincture">
        <DisplayName>TXT_BMB_ITEMS_EVASIVECINCTURE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_EVASIVECINCTURE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>160</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Value>6</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_DodgeAgainstRanged</StrVal>
            <Value>10</Value>
        </GameModifier>	
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>40</AIPriority>
            </AIData>
        <ArtDef>EvasiveCincture_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="EvasiveCincture_ArtDef">
            <GameItemTypeModelPack InternalName="EvasiveCincture_Default">
                <IconFile>BMB_EvasiveCincture.png</IconFile>
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
	<GameItemType InternalName="FourLeafClover">
        <DisplayName>TXT_BMB_ITEMS_FOURLEAFCLOVER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_FOURLEAFCLOVER_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>50</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Value>6</Value>
            <Provides>TXT_BMB_ITEMS_FOURLEAFCLOVER_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ChanceToCrit</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_FOURLEAFCLOVER_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>35</AIPriority>
            </AIData>
        <ArtDef>FourLeafClover_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="FourLeafClover_ArtDef">
            <GameItemTypeModelPack InternalName="FourLeafClover_Default">
                <IconFile>BMB_FourLeafClover.png</IconFile>
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
	<GameItemType InternalName="FragranceOfSophistication">
        <DisplayName>TXT_BMB_ITEMS_FRAGRANCEOFSOPHISTICATION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_FRAGRANCEOFSOPHISTICATION_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>350</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>TargetUnitLevelUp</Attribute>
            <Provides>TXT_BMB_ITEMS_FRAGRANCEOFSOPHISTICATION_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>FragranceOfSophistication_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="FragranceOfSophistication_ArtDef">
            <GameItemTypeModelPack InternalName="FragranceOfSophistication_Default">
                <IconFile>BMB_FragranceOfSophistication.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="FrozenAutumn">
        <DisplayName>TXT_BMB_ITEMS_FROZENAUTUMN_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_FROZENAUTUMN_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_FROZENAUTUMN_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_ResistCold</StrVal>
            <Value>15</Value>
            <Provides>TXT_BMB_ITEMS_FROZENAUTUMN_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>FrozenAutumn_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="FrozenAutumn_ArtDef">
            <GameItemTypeModelPack InternalName="FrozenAutumn_Default">
                <IconFile>BMB_FrozenAutumn.png</IconFile>
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
	<GameItemType InternalName="GirdleOfTheColossus">
        <DisplayName>TXT_BMB_ITEMS_GIRDLEOFTHECOLOSSUS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_GIRDLEOFTHECOLOSSUS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>90</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina_Starting</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_GIRDLEOFTHECOLOSSUS_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_PowerSweep</StrVal>
            <Provides>TXT_BMB_ITEMS_GIRDLEOFTHECOLOSSUS_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
		<Likelihood>20</Likelihood>	
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>GirdleOfTheColossus_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="GirdleOfTheColossus_ArtDef">
            <GameItemTypeModelPack InternalName="GirdleOfTheColossus_Default">
                <IconFile>BMB_GirdleOfTheColossus.png</IconFile>
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
	<GameItemType InternalName="HeartbloodRing">
        <DisplayName>TXT_BMB_ITEMS_HEARTBLOODRING_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_HEARTBLOODRING_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>300</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>1</Value>
            <PerLevel>1</PerLevel>
            <Provides>TXT_BMB_ITEMS_HEARTBLOODRING_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>HeartbloodRing_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="HeartbloodRing_ArtDef">
            <GameItemTypeModelPack InternalName="HeartbloodRing_Default">
                <IconFile>BMB_HeartbloodRing.png</IconFile>
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
	<GameItemType InternalName="HorseShoe">
        <DisplayName>TXT_BMB_ITEMS_HORSESHOE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_HORSESHOE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>75</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistPierce</StrVal>
            <Value>10</Value>
            <Provides>TXT_BMB_ITEMS_HORSESHOE_PROVIDES_1</Provides>
        </GameModifier>
		 <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_DodgeAgainstRanged</StrVal>
            <Value>10</Value>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>40</AIPriority>
            </AIData>
        <ArtDef>HorseShoe_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="HorseShoe_ArtDef">
            <GameItemTypeModelPack InternalName="HorseShoe_Default">
                <IconFile>BMB_HorseShoe.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Drop_MetalItem1</SFX>                
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="IceBomb">
        <DisplayName>TXT_BMB_ITEMS_ICEBOMB_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ICEBOMB_DESCRIPTION</Description>
        <ShopValue>140</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_IceBomb</StrVal>
            <Provides>TXT_BMB_ITEMS_ICEBOMB_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
        <UsableInBattle>1</UsableInBattle>
        <UsableOnlyOnceInBattle>0</UsableOnlyOnceInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>IceBomb_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="IceBomb_ArtDef">
            <GameItemTypeModelPack InternalName="IceBomb_Default">
                <IconFile>BMB_IceBomb.png</IconFile>
                <SFX>Click_IceElemental_01</SFX>
                <SFX>Click_IceElemental_02</SFX>
                <SFX>Click_IceElemental_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="InfiniteDiary">
        <DisplayName>TXT_BMB_ITEMS_INFINITEDIARY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_INFINITEDIARY_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>450</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>BMB_Erudite</StrVal>
            <Provides>TXT_BMB_ITEMS_INFINITEDIARY_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>InfiniteDiary_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="InfiniteDiary_ArtDef">
            <GameItemTypeModelPack InternalName="InfiniteDiary_Default">
                <IconFile>BMB_InfiniteDiary.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="JadeRing">
        <DisplayName>TXT_BMB_ITEMS_JADERING_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_JADERING_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>75</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>MeleeAppliesSpell</Attribute>
            <StrVal>Poisoned</StrVal>
            <Provides>TXT_BMB_ITEMS_JADERING_PROVIDES_1</Provides>
        </GameModifier>	
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistPoison</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_JADERING_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>21</AIPriority>
            </AIData>
        <ArtDef>JadeRing_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="JadeRing_ArtDef">
            <GameItemTypeModelPack InternalName="JadeRing_Default">
                <IconFile>BMB_JadeRing.png</IconFile>
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
	<GameItemType InternalName="JinxDoll">
        <DisplayName>TXT_BMB_ITEMS_JINXDOLL_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_JINXDOLL_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>90</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_JinxDoll</StrVal>
            <Provides>TXT_BMB_ITEMS_JINXDOLL_PROVIDES_1</Provides>
         </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>21</AIPriority>
            </AIData>
        <ArtDef>JinxDoll_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="JinxDoll_ArtDef">
            <GameItemTypeModelPack InternalName="JinxDoll_Default">
                <IconFile>BMB_JinxDoll.png</IconFile>
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
	<GameItemType InternalName="LeatherVambraces_ArtifactHandlers">
        <DisplayName>TXT_BMB_ITEMS_LEATHERVAMBRACES_ARTIFACTHANDLERS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_LEATHERVAMBRACES_ARTIFACTHANDLERS_DESCRIPTION</Description>
        <Type>Forearms</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>300</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <Value>1</Value>
        </GameModifier>
		 <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TreasureHunter</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_LEATHERVAMBRACES_ARTIFACTHANDLERS_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
		<IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
		<HeroOnly>1</HeroOnly>
            <AIData AIPersonality="AI_General">
                <AIPriority>20</AIPriority>
            </AIData>
        <ArtDef>Art_LeatherVambraces_ArtifactHandlers</ArtDef>
		<GameItemTypeArtDef InternalName="Art_LeatherVambraces_ArtifactHandlers">
			<GameItemTypeModelPack InternalName="Art_LeatherVambraces_ArtifactHandlers_1">
				<SupportedUnitModelType>AmarianMale</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireMale</SupportedUnitModelType>
				<SupportedUnitModelType>HenchmanMale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerMale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerMale</SupportedUnitModelType>
				<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanMale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithMale</SupportedUnitModelType>
				<IconFile>BMB_ArtifactHandlers.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>Gfx\HKB\Clothes\K_Male_Gloves_Mesh_01.hkb</ModelFile>
                    <AttachmentType>Skinned</AttachmentType>
					<Color_Clothing1>210,94,150</Color_Clothing1>
					<Color_Clothing2>166,134,194</Color_Clothing2>
                    <Texture_Clothing1>Gfx\HKB\Clothes\MaleLeatherGloves_Kingdom_Recolorable.png</Texture_Clothing1>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
			<GameItemTypeModelPack InternalName="Art_LeatherVambraces_ArtifactHandlers_2">
				<SupportedUnitModelType>DarklingMale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenMale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarMale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenMale</SupportedUnitModelType>
				<IconFile>BMB_ArtifactHandlers.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
                    <ModelFile>Gfx\HKB\Clothes\F_Male_Gloves_Mesh_01.hkb</ModelFile>
                    <AttachmentType>Skinned</AttachmentType>
                    <Color_Clothing1>210,94,150</Color_Clothing1>
					<Color_Clothing2>166,134,194</Color_Clothing2>
                    <Texture_Clothing1>Gfx\HKB\Clothes\MaleLeatherGloves_Kingdom_Recolorable.png</Texture_Clothing1>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
			<GameItemTypeModelPack InternalName="Art_LeatherVambraces_ArtifactHandlers_3">
				<SupportedUnitModelType>AmarianFemale</SupportedUnitModelType>
				<SupportedUnitModelType>Banshee</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireFemale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarFemale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanFemale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithFemale</SupportedUnitModelType>
				<IconFile>BMB_ArtifactHandlers.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
                    <ModelFile>Gfx\HKB\Clothes\K_Female_Gloves_Mesh_01.hkb</ModelFile>
                    <AttachmentType>Skinned</AttachmentType>
					<Color_Clothing1>210,94,150</Color_Clothing1>
					<Color_Clothing2>166,134,194</Color_Clothing2>
                    <Texture_Clothing1>Gfx\HKB\Clothes\MaleLeatherGloves_Kingdom_Recolorable.png</Texture_Clothing1>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
		</GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Letter_Aggrandizement">
        <DisplayName>TXT_BMB_ITEMS_LETTER_AGGRANDIZEMENT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_LETTER_AGGRANDIZEMENT_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>80</ShopValue>
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Fame</Attribute>
            <Value>10</Value>
			<Provides>TXT_BMB_ITEMS_LETTER_AGGRANDIZEMENT_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Letter_Aggrandizement_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Letter_Aggrandizement_ArtDef">
            <GameItemTypeModelPack InternalName="Letter_Aggrandizement_Default">
                <IconFile>Parchment1.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="LightningStruckBranch">
        <DisplayName>TXT_BMB_ITEMS_LIGHTNINGSTRUCKBRANCH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_LIGHTNINGSTRUCKBRANCH_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_LIGHTNINGSTRUCKBRANCH_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_ResistLightning</StrVal>
            <Value>15</Value>
            <Provides>TXT_BMB_ITEMS_LIGHTNINGSTRUCKBRANCH_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>LightningStruckBranch_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="LightningStruckBranch_ArtDef">
            <GameItemTypeModelPack InternalName="LightningStruckBranch_Default">
                <IconFile>BMB_LightningStruckBranch.png</IconFile>
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
	<GameItemType InternalName="LiquidVigor">
        <DisplayName>TXT_BMB_ITEMS_LIQUIDVIGOR_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_LIQUIDVIGOR_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>225</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina_Starting</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_LIQUIDVIGOR_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>0</AIPriority>
			</AIData>
        <ArtDef>LiquidVigor_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="LiquidVigor_ArtDef">
            <GameItemTypeModelPack InternalName="LiquidVigor_Default">
                <IconFile>BMB_LiquidVigor.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="LostBarrowhillWine">
        <DisplayName>TXT_BMB_ITEMS_LOSTBARROWHILLWINE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_LOSTBARROWHILLWINE_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>150</ShopValue>
		<GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Mana</Attribute>
            <Value>10</Value>
			<Provides>TXT_BMB_ITEMS_LOSTBARROWHILLWINE_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_LostBarrowhillWine</StrVal>            
            <Provides>TXT_BMB_ITEMS_LOSTBARROWHILLWINE_PROVIDES_2</Provides>
        </GameModifier>        
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Gold</Attribute>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_LOSTBARROWHILLWINE_PROVIDES_3</Provides>
        </GameModifier>
		<IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>0</AIPriority>
			</AIData>
        <ArtDef>LostBarrowhillWine_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="LostBarrowhillWine_ArtDef">
            <GameItemTypeModelPack InternalName="LostBarrowhillWine_Default">
                <IconFile>BMB_LostBarrowhillWine.png</IconFile>
				<MapParticle>T_Heal_Particle</MapParticle>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="MagnifyingStimulant">
        <DisplayName>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>500</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Boost</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_2</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Accuracy</StrVal>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_3</Provides>
        </GameModifier>	
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Dodge</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_4</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_5</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ChanceToCrit</StrVal>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_6</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicPower</StrVal>
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_7</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_SpellDamage</StrVal>			
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_8</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicResist</StrVal>			
            <Value>1</Value>
			<Provides>TXT_BMB_ITEMS_MAGNIFYINGSTIMULANT_PROVIDES_9</Provides>
        </GameModifier>
		<IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>100</AIPriority>
			</AIData>
        <ArtDef>MagnifyingStimulant_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MagnifyingStimulant_ArtDef">
            <GameItemTypeModelPack InternalName="MagnifyingStimulant_Default">
                <IconFile>BMB_MagnifyingStimulant.png</IconFile>
				<MapParticle>S_ImbueChampion_Particle</MapParticle>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Manashroom">
        <DisplayName>TXT_BMB_ITEMS_MANASHROOM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MANASHROOM_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>80</ShopValue>
		<GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Mana</Attribute>
            <Value>30</Value>
			<Provides>TXT_BMB_ITEMS_MANASHROOM_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>0</AIPriority>
			</AIData>
        <ArtDef>Manashroom_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Manashroom_ArtDef">
            <GameItemTypeModelPack InternalName="Manashroom_Default">
                <IconFile>BMB_Manashroom.png</IconFile>				
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Eating</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="MastersmithsAnvil">
        <DisplayName>TXT_BMB_ITEMS_MASTERSMITHSANVIL_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MASTERSMITHSANVIL_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>80</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_ChanceToCrit</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_MASTERSMITHSANVIL_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Mastersmith</StrVal>
            <Value>1</Value>            
        </GameModifier>
		<GameModifier>                      
            <Provides>TXT_BMB_ITEMS_MASTERSMITHSANVIL_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>30</AIPriority>
            </AIData>
        <ArtDef>MastersmithsAnvil_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MastersmithsAnvil_ArtDef">
            <GameItemTypeModelPack InternalName="MastersmithsAnvil_Default">
                <IconFile>anvil_item.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Drop_MetalItem1</SFX>                
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="MortarAndPestle">
        <DisplayName>TXT_BMB_ITEMS_MORTARANDPESTLE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MORTARANDPESTLE_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_AlchemicalSurprise</StrVal>
            <Provides>TXT_BMB_ITEMS_MORTARANDPESTLE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
            <AIData AIPersonality="AI_General">
                <AIPriority>100</AIPriority>
            </AIData>
        <ArtDef>MortarAndPestle_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MortarAndPestle_ArtDef">
            <GameItemTypeModelPack InternalName="MortarAndPestle_Default">
                <IconFile>BMB_MortarAndPestle.png</IconFile>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="MurteasGrimoire">
        <DisplayName>TXT_BMB_ITEMS_MURTEASGRIMOIRE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MURTEASGRIMOIRE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>600</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicPower</StrVal>
            <Value>10</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_SpellDamage</StrVal>
            <Value>15</Value>
            <Provides>TXT_BMB_ITEMS_MURTEASGRIMOIRE_PROVIDES_1</Provides>
        </GameModifier>		
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_ElementalMyriad</StrVal>            
            <Provides>TXT_BMB_ITEMS_MURTEASGRIMOIRE_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>10</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>60</AIPriority>
            </AIData>
        <ArtDef>MurteasGrimoire_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MurteasGrimoire_ArtDef">
            <GameItemTypeModelPack InternalName="MurteasGrimoire_Default">
                <IconFile>City_Hud_Book_64.png</IconFile>
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
	<GameItemType InternalName="Mushroom_Experience">
        <DisplayName>TXT_BMB_ITEMS_MUSHROOM_EXPERIENCE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MUSHROOM_EXPERIENCE_DESCRIPTION</Description>
		<HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>60</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>GiveExperience</Attribute>
            <Value>30</Value>
            <Provides>TXT_BMB_ITEMS_MUSHROOM_EXPERIENCE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Mushroom_Experience_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Mushroom_Experience_ArtDef">
            <GameItemTypeModelPack InternalName="Mushroom_Experience_Default">
                <IconFile>BMB_MushroomHallucinogenic.png</IconFile>
                <TintR>0</TintR>
                <TintG>98</TintG>
                <TintB>0</TintB>
                <SFX>Eating</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Mushroom_Hallucinogenic">
        <DisplayName>TXT_BMB_ITEMS_MUSHROOM_HALLUCINOGENIC_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MUSHROOM_HALLUCINOGENIC_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>60</ShopValue>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Hallucinations</StrVal>
			<Provides>TXT_BMB_ITEMS_MUSHROOM_HALLUCINOGENIC_PROVIDES_1</Provides>	
		</GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Mushroom_Hallucinogenic_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Mushroom_Hallucinogenic_ArtDef">
            <GameItemTypeModelPack InternalName="Mushroom_Hallucinogenic_Default">
                <IconFile>BMB_MushroomHallucinogenic.png</IconFile>
                <TintR>0</TintR>
                <TintG>98</TintG>
                <TintB>0</TintB>
                <SFX>Eating</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="MysticalSiphon">
        <DisplayName>TXT_BMB_ITEMS_MYSTICALSIPHON_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MYSTICALSIPHON_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HPFromKills</StrVal>
            <Value>3</Value>
			<Provides>TXT_BMB_ITEMS_MYSTICALSIPHON_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ManaFromKills</StrVal>
			<DisplayName>+3 Mana</DisplayName>
            <Value>3</Value>
			<Provides>TXT_BMB_ITEMS_MYSTICALSIPHON_PROVIDES_2</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_StaminaFromKills</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_MYSTICALSIPHON_PROVIDES_3</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>60</AIPriority>
            </AIData>
        <ArtDef>MysticalSiphon_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MysticalSiphon_ArtDef">
            <GameItemTypeModelPack InternalName="MysticalSiphon_Default">
                <IconFile>BMB_MysticalSiphon.png</IconFile>
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
	<GameItemType InternalName="MythicalComposer">
        <DisplayName>TXT_BMB_ITEMS_MYTHICALCOMPOSER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_MYTHICALCOMPOSER_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>500</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_CombatSpeed</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_MYTHICALCOMPOSER_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Stamina_Starting</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_MYTHICALCOMPOSER_PROVIDES_2</Provides>
        </GameModifier>	
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>MythicalComposer_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="MythicalComposer_ArtDef">
            <GameItemTypeModelPack InternalName="MythicalComposer_Default">
                <IconFile>BMB_MythicalComposer.png</IconFile>
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
	<GameItemType InternalName="PearlOfWisdom">
        <DisplayName>TXT_BMB_ITEMS_PEARLOFWISDOM_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_PEARLOFWISDOM_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>80</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MagicResist</StrVal>
            <Value>3</Value>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TacticalSpellManaCost_Multiplier</StrVal>
            <Value>-0.1</Value>
            <Provides>TXT_BMB_ITEMS_PEARLOFWISDOM_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>10</AIPriority>
            </AIData>
        <ArtDef>PearlOfWisdom_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="PearlOfWisdom_ArtDef">
            <GameItemTypeModelPack InternalName="PearlOfWisdom_Default">
                <IconFile>BMB_PearlOfWisdom.png</IconFile>
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
	<GameItemType InternalName="PhilosophersStone">
        <DisplayName>TXT_BMB_ITEMS_PHILOSOPHERSSTONE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_PHILOSOPHERSSTONE_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>150</ShopValue>
		<GameModifier>
            <ModType>Player</ModType>
            <Attribute>UnlockSpell</Attribute>
            <StrVal>BMB_OvumPhilosophorum</StrVal>
        </GameModifier>		
		<IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>10</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>0</AIPriority>
			</AIData>
        <ArtDef>PhilosophersStone_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="PhilosophersStone_ArtDef">
            <GameItemTypeModelPack InternalName="PhilosophersStone_Default">
                <IconFile>BMB_PhilosophersStone.png</IconFile>
				<MapParticle>S_Paragon_Particle</MapParticle>
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
	<GameItemType InternalName="PocketDagger">
        <DisplayName>TXT_BMB_ITEMS_POCKETDAGGER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_POCKETDAGGER_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>60</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ChanceToCrit</StrVal>
            <Value>4</Value>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>10</AIPriority>
            </AIData>
        <ArtDef>PocketDagger_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="PocketDagger_ArtDef">
            <GameItemTypeModelPack InternalName="PocketDagger_Default">
                <IconFile>lifesap.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>				
                <SFX>Equip_Dagger_01</SFX>
				<SFX>Equip_Dagger_02</SFX>
				<SFX>Equip_Dagger_03</SFX>	
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Potion_TempestuousWrath">
        <DisplayName>TXT_BMB_ITEMS_POTION_TEMPESTUOUSWRATH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_POTION_TEMPESTUOUSWRATH_DESCRIPTION</Description>
        <ShopValue>100</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_TempestuousWrath</StrVal>
            <Provides>TXT_BMB_ITEMS_POTION_TEMPESTUOUSWRATH_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
        <UsableInBattle>1</UsableInBattle>
        <UsableOnlyOnceInBattle>0</UsableOnlyOnceInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Potion_TempestuousWrath_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Potion_TempestuousWrath_ArtDef">
            <GameItemTypeModelPack InternalName="Potion_TempestuousWrath_Default">
                <IconFile>BMB_TempestuousWrath.png</IconFile>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="PrismaticBelt">
        <DisplayName>TXT_BMB_ITEMS_PRISMATICBELT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_PRISMATICBELT_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>380</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>MeleeAppliesSpell</Attribute>
            <StrVal>BMB_PrismaticBelt</StrVal>
            <Provides>TXT_BMB_ITEMS_PRISMATICBELT_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>15</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>PrismaticBelt_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="PrismaticBelt_ArtDef">
            <GameItemTypeModelPack InternalName="PrismaticBelt_Default">
                <IconFile>BMB_PrismaticBelt.png</IconFile>
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
	<GameItemType InternalName="RallyHorn">
        <DisplayName>TXT_BMB_ITEMS_RALLYHORN_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RALLYHORN_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>150</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Pierce</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_RALLYHORN_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>RallyHorn_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RallyHorn_ArtDef">
            <GameItemTypeModelPack InternalName="RallyHorn_Default">
                <IconFile>BMB_RallyHorn.png</IconFile>
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
	<GameItemType InternalName="RejuvenatingFusion">
        <DisplayName>TXT_BMB_ITEMS_REJUVENATINGFUSION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_REJUVENATINGFUSION_DESCRIPTION</Description>
<HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_RejuvenatingFusion</StrVal>            
            <Provides>TXT_BMB_ITEMS_REJUVENATINGFUSION_PROVIDES_1</Provides>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>HealRandomInjury</Attribute>
            <Provides>TXT_BMB_ITEMS_REJUVENATINGFUSION_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>RejuvenatingFusion_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RejuvenatingFusion_ArtDef">
            <GameItemTypeModelPack InternalName="RejuvenatingFusion_Default">
                <IconFile>BMB_RejuvenatingFusion.png</IconFile>
				<MapParticle>T_Heal_Particle</MapParticle>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Potion1_1</SFX>
                <SFX>Potion1_2</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="RingOfArdentCombustion">
        <DisplayName>TXT_BMB_ITEMS_RINGOFARDENTCOMBUSTION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFARDENTCOMBUSTION_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>400</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Fire</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_RINGOFARDENTCOMBUSTION_PROVIDES_1</Provides>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>RingOfArdentCombustion_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfArdentCombustion_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfArdentCombustion_Default">
                <IconFile>BMB_RingOfArdentCombustion.png</IconFile>
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
	<GameItemType InternalName="RingOfGlacialCollision">
        <DisplayName>TXT_BMB_ITEMS_RINGOFGLACIALCOLLISION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFGLACIALCOLLISION_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>400</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_RINGOFGLACIALCOLLISION_PROVIDES_1</Provides>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>RingOfGlacialCollision_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfGlacialCollision_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfGlacialCollision_Default">
                <IconFile>BMB_RingOfGlacialCollision.png</IconFile>
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
	<GameItemType InternalName="RingOfNoxiousHumors">
        <DisplayName>TXT_BMB_ITEMS_RINGOFNOXIOUSHUMORS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFNOXIOUSHUMORS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>400</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_RINGOFNOXIOUSHUMORS_PROVIDES_1</Provides>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>RingOfNoxiousHumors_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfNoxiousHumors_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfNoxiousHumors_Default">
                <IconFile>BMB_RingOfNoxiousHumors.png</IconFile>
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
	<GameItemType InternalName="RingOfToxins">
        <DisplayName>TXT_BMB_ITEMS_RINGOFTOXINS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFTOXINS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <AdditionalTrainingTurns>8</AdditionalTrainingTurns>
        <ShopValue>75</ShopValue>
        <ProductionRequirement>
            <Type>Resource</Type>
            <Attribute>RefinedCrystal</Attribute>
            <Value>2</Value>
        </ProductionRequirement>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Value>1</Value>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <IsUsable>0</IsUsable>
        <Prereq>
            <Type>Tech</Type>
            <Attribute>Charms</Attribute>
        </Prereq>
            <AIData AIPersonality="AI_General">
                <AIPriority>20</AIPriority>
            </AIData>
        <ArtDef>RingOfToxins_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfToxins_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfToxins_Default">
                <IconFile>BMB_RingOfToxins.png</IconFile>
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
	<GameItemType InternalName="RingOfTurgescence">
        <DisplayName>TXT_BMB_ITEMS_RINGOFTURGESCENCE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFTURGESCENCE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>250</ShopValue>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Pierce</StrVal>
            <Value>2</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>5</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Stamina_Starting</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_RINGOFTURGESCENCE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>        
            <AIData AIPersonality="AI_General">
                <AIPriority>45</AIPriority>
            </AIData>
        <ArtDef>RingOfTurgescence_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfTurgescence_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfTurgescence_Default">
                <SupportedUnitModelType>AmarianMale</SupportedUnitModelType>
				<SupportedUnitModelType>DarklingMale</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireMale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenMale</SupportedUnitModelType>
				<SupportedUnitModelType>HenchmanMale</SupportedUnitModelType>				
				<SupportedUnitModelType>IroneerMale</SupportedUnitModelType>				
				<SupportedUnitModelType>KingdomMale</SupportedUnitModelType>				
				<SupportedUnitModelType>MancerMale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarMale</SupportedUnitModelType>				
				<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>				
				<SupportedUnitModelType>TarthanMale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithMale</SupportedUnitModelType>				
				<SupportedUnitModelType>UrxenMale</SupportedUnitModelType>
				<IconFile>BMB_RingOfTurgescence.png</IconFile>                
                <SFX>Equip_MagicRing_01</SFX>
                <SFX>Equip_MagicRing_02</SFX>
                <SFX>Equip_MagicRing_03</SFX>
                <SFX>Equip_MagicRing_04</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="RingOfVaporizingShock">
        <DisplayName>TXT_BMB_ITEMS_RINGOFVAPORIZINGSHOCK_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RINGOFVAPORIZINGSHOCK_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>400</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_RINGOFVAPORIZINGSHOCK_PROVIDES_1</Provides>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>80</AIPriority>
            </AIData>
        <ArtDef>RingOfVaporizingShock_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RingOfVaporizingShock_ArtDef">
            <GameItemTypeModelPack InternalName="RingOfVaporizingShock_Default">
                <IconFile>BMB_RingOfVaporizingShock.png</IconFile>
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
	<GameItemType InternalName="Robe_Riches">
        <DisplayName>TXT_BMB_ITEMS_ROBE_RICHES_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_ROBE_RICHES_DESCRIPTION</Description>
        <Type>Torso</Type>
        <Type>Surcoat</Type>
        <Type>Lowerbody</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>        
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Defense_Pierce</StrVal>
            <Value>6</Value>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TreasureHunter</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_ROBE_RICHES_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
		<IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
		<HeroOnly>1</HeroOnly>        
            <AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>Art_Robe_Riches</ArtDef>		
		<GameItemTypeArtDef InternalName="Art_Robe_Riches">
			<GameItemTypeModelPack InternalName="Art_Robe_Riches_1">
				<SupportedUnitModelType>AmarianMale</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireMale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenMale</SupportedUnitModelType>
				<SupportedUnitModelType>HenchmanMale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerMale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomMale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerMale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarMale</SupportedUnitModelType>
				<SupportedUnitModelType>SlaveMale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanMale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenMale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithMale</SupportedUnitModelType>
				<IconFile>BMB_RobeOfRiches.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>Gfx\HKB\Clothes\K_Male_Robe_Mesh_01.hkb</ModelFile>
					<Texture_All>Gfx\HKB\Clothes\EmpireUnisexRobe.png</Texture_All>
					<AttachmentType>Skinned</AttachmentType>
					<Color_Clothing1>210,94,150</Color_Clothing1>
					<Color_Clothing2>166,134,194</Color_Clothing2>
				</GameItemTypeModel>            
			</GameItemTypeModelPack>			
			<GameItemTypeModelPack InternalName="Art_Robe_Riches_2">
				<SupportedUnitModelType>AmarianFemale</SupportedUnitModelType>
				<SupportedUnitModelType>Banshee</SupportedUnitModelType>
				<SupportedUnitModelType>EmpireFemale</SupportedUnitModelType>
				<SupportedUnitModelType>FallenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>IroneerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>KingdomFemale</SupportedUnitModelType>
				<SupportedUnitModelType>MancerFemale</SupportedUnitModelType>
				<SupportedUnitModelType>QuendarFemale</SupportedUnitModelType>
				<SupportedUnitModelType>TarthanFemale</SupportedUnitModelType>
				<SupportedUnitModelType>UrxenFemale</SupportedUnitModelType>
				<SupportedUnitModelType>WraithFemale</SupportedUnitModelType>
				<IconFile>BMB_RobeOfRiches.png</IconFile>
				<TintR>0</TintR>
				<TintG>0</TintG>
				<TintB>0</TintB>
				<GameItemTypeModel>
					<ModelFile>Gfx\HKB\Clothes\K_Female_Robe_Mesh_01.hkb</ModelFile>
					<Texture_All>Gfx\HKB\Clothes\EmpireUnisexRobe.png</Texture_All>
					<AttachmentType>Skinned</AttachmentType>
					<Color_Clothing1>210,94,150</Color_Clothing1>
					<Color_Clothing2>166,134,194</Color_Clothing2>
				</GameItemTypeModel>
			</GameItemTypeModelPack>
		</GameItemTypeArtDef>
	</GameItemType>
	<GameItemType InternalName="RodentHandbook">
        <DisplayName>TXT_BMB_ITEMS_RODENTHANDBOOK_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RODENTHANDBOOK_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>150</ShopValue>
		<GameModifier>
            <ModType>Player</ModType>
            <Attribute>UnlockSpell</Attribute>
            <StrVal>BMB_RodentRepellent</StrVal>
        </GameModifier>		
		<IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
				<AIPriority>0</AIPriority>
			</AIData>
        <ArtDef>RodentHandbook_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RodentHandbook_ArtDef">
            <GameItemTypeModelPack InternalName="RodentHandbook_Default">
                <IconFile>BMB_RodentHandbook.png</IconFile>				
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="RubberStone">
        <DisplayName>TXT_BMB_ITEMS_RUBBERSTONE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_RUBBERSTONE_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>90</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_MaxCounterAttack</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_RUBBERSTONE_PROVIDES_1</Provides>
        </GameModifier>	        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>35</AIPriority>
            </AIData>
        <ArtDef>RubberStone_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="RubberStone_ArtDef">
            <GameItemTypeModelPack InternalName="RubberStone_Default">
                <IconFile>BMB_RubberStone.png</IconFile>
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
	<GameItemType InternalName="SackOfProvisions">
        <DisplayName>TXT_BMB_ITEMS_SACKOFPROVISIONS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SACKOFPROVISIONS_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>80</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustArmyStat</Attribute>
            <StrVal>UnitStat_HitPoints</StrVal>
            <Value>1</Value>
            <Provides>TXT_BMB_ITEMS_SACKOFPROVISIONS_PROVIDES_1</Provides>
        </GameModifier>        
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>10</AIPriority>
            </AIData>
        <ArtDef>SackOfProvisions_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="SackOfProvisions_ArtDef">
            <GameItemTypeModelPack InternalName="SackOfProvisions_Default">
                <IconFile>BMB_SackOfProvisions.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>Eating</SFX>                
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="ScarabOfPreservation">
        <DisplayName>TXT_BMB_ITEMS_SCARABOFPRESERVATION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCARABOFPRESERVATION_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>250</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistPierce</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_SCARABOFPRESERVATION_PROVIDES_1</Provides>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ChanceToAvoidCrit</StrVal>
            <Value>40</Value>
            <Provides>TXT_BMB_ITEMS_SCARABOFPRESERVATION_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>70</AIPriority>
            </AIData>
        <ArtDef>ScarabOfPreservation_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ScarabOfPreservation_ArtDef">
            <GameItemTypeModelPack InternalName="ScarabOfPreservation_Default">
                <IconFile>BMB_ScarabOfPreservation.png</IconFile>
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
	<GameItemType InternalName="ScatteredCoins">
        <DisplayName>TXT_BMB_ITEMS_SCATTEREDCOINS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCATTEREDCOINS_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>50</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <StrVal>Ruffus</StrVal>
            <Value>3</Value>
            <Provides>TXT_BMB_ITEMS_SCATTEREDCOINS_PROVIDES_1</Provides>
            <UnitClass>BanditGuard</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>ScatteredCoins_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ScatteredCoins_ArtDef">
            <GameItemTypeModelPack InternalName="ScatteredCoins_Default">
                <IconFile>Gold_Small1.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>GoldCoins_1</SFX>
                <SFX>GoldCoins_2</SFX>
                <SFX>GoldCoins_3</SFX>                
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="ScribesTablet">
        <DisplayName>TXT_BMB_ITEMS_SCRIBESTABLET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCRIBESTABLET_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>80</ShopValue>
        <GameModifier>
            <ModType>Resource</ModType>
            <Attribute>Research</Attribute>
            <Value>15</Value>
			<Provides>TXT_BMB_ITEMS_SCRIBESTABLET_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>ScribesTablet_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ScribesTablet_ArtDef">
            <GameItemTypeModelPack InternalName="ScribesTablet_Default">
                <IconFile>BMB_ScribesTablet.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Scroll_ArcaneMonolith">
        <DisplayName>TXT_BMB_ITEMS_SCROLL_ARCANEMONOLITH_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCROLL_ARCANEMONOLITH_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_ArcaneMonolith</StrVal>
            <Provides>TXT_BMB_ITEMS_SCROLL_ARCANEMONOLITH_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>35</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
            <AIData AIPersonality="AI_General">
                <AIPriority>100</AIPriority>
            </AIData>
        <ArtDef>Scroll_ArcaneMonolith_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Scroll_ArcaneMonolith_ArtDef">
            <GameItemTypeModelPack InternalName="Scroll_ArcaneMonolith_Default">
                <IconFile>BMB_ArcaneMonolithScroll.png</IconFile>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Scroll_Fear">
        <DisplayName>TXT_BMB_ITEMS_SCROLL_FEAR_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCROLL_FEAR_DESCRIPTION</Description>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>Fear_Ability</StrVal>
            <Provides>TXT_BMB_ITEMS_SCROLL_FEAR_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
        <UsableInBattle>1</UsableInBattle>
        <UsableOnlyOnceInBattle>0</UsableOnlyOnceInBattle>
            <AIData AIPersonality="AI_General">
                <AIPriority>100</AIPriority>
            </AIData>
        <ArtDef>Scroll_Fear_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Scroll_Fear_ArtDef">
            <GameItemTypeModelPack InternalName="Scroll_Fear_Default">
                <IconFile>BMB_ScrollOfFear.png</IconFile>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Scroll_Obsession">
        <DisplayName>TXT_BMB_ITEMS_SCROLL_OBSESSION_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCROLL_OBSESSION_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Spell_Obsession</StrVal>
            <Provides>TXT_BMB_ITEMS_SCROLL_OBSESSION_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
        <ArtDef>Scroll_Obsession_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Scroll_Obsession_ArtDef">
            <GameItemTypeModelPack InternalName="Scroll_Obsession_Default">
                <IconFile>Parchment1.png</IconFile>
                <TintG>255</TintG>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Scroll_Violence">
        <DisplayName>TXT_BMB_ITEMS_SCROLL_VIOLENCE_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCROLL_VIOLENCE_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Lethal1</StrVal>
            <Provides>TXT_BMB_ITEMS_SCROLL_VIOLENCE_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Scroll_Violence_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Scroll_Violence_ArtDef">
            <GameItemTypeModelPack InternalName="Scroll_Violence_Default">
                <IconFile>Item_BlightScroll_Icon.png</IconFile>
                <TintG>255</TintG>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
    <GameItemType InternalName="Scroll_VitalPoints">
        <DisplayName>TXT_BMB_ITEMS_SCROLL_VITALPOINTS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SCROLL_VITALPOINTS_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>180</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>VitalStrike1</StrVal>
            <Provides>TXT_BMB_ITEMS_SCROLL_VITALPOINTS_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Scroll_VitalPoints_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Scroll_VitalPoints_ArtDef">
            <GameItemTypeModelPack InternalName="Scroll_VitalPoints_Default">
                <IconFile>Scroll1.png</IconFile>
                <TintG>255</TintG>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="ShacklesOfEnslavement">
        <DisplayName>TXT_BMB_ITEMS_SHACKLESOFENSLAVEMENT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SHACKLESOFENSLAVEMENT_DESCRIPTION</Description>
        <ShopValue>220</ShopValue>		
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UseSpell</Attribute>
            <StrVal>BMB_ShacklesOfEnslavement</StrVal>            
            <Provides>TXT_BMB_ITEMS_SHACKLESOFENSLAVEMENT_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
        <UsableInBattle>1</UsableInBattle>
        <UsableOnlyOnceInBattle>0</UsableOnlyOnceInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>ShacklesOfEnslavement_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ShacklesOfEnslavement_ArtDef">
            <GameItemTypeModelPack InternalName="ShacklesOfEnslavement_Default">
                <IconFile>BMB_ShacklesOfEnslavement.png</IconFile>
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
	<GameItemType InternalName="ShellOfSluggishness">
        <DisplayName>TXT_BMB_ITEMS_SHELLOFSLUGGISHNESS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SHELLOFSLUGGISHNESS_DESCRIPTION</Description>
		<Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>400</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_Slow_Mass</StrVal>
            <Provides>TXT_BMB_ITEMS_SHELLOFSLUGGISHNESS_PROVIDES_1</Provides>
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
        <ArtDef>ShellOfSluggishness_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ShellOfSluggishness_ArtDef">
            <GameItemTypeModelPack InternalName="ShellOfSluggishness_Default">
                <IconFile>BMB_ShellOfSluggishness.png</IconFile>
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
	<GameItemType InternalName="SolidMana">
        <DisplayName>TXT_BMB_ITEMS_SOLIDMANA_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_SOLIDMANA_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>150</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ManaFromKills</StrVal>
			<DisplayName>+3 Mana</DisplayName>
            <Value>3</Value>
			<Provides>TXT_BMB_ITEMS_SOLIDMANA_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>25</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>30</AIPriority>
            </AIData>
        <ArtDef>SolidMana_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="SolidMana_ArtDef">
            <GameItemTypeModelPack InternalName="SolidMana_Default">
                <IconFile>Shard_Water.png</IconFile>
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
	<GameItemType InternalName="ThunderclapAmulet">
        <DisplayName>TXT_BMB_ITEMS_THUNDERCLAPAMULET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_THUNDERCLAPAMULET_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>400</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
            <Value>3</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_ResistLightning</StrVal>
            <Value>20</Value>
            <Provides>TXT_BMB_ITEMS_THUNDERCLAPAMULET_PROVIDES_1</Provides>
        </GameModifier>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockCombatAbility</Attribute>
            <StrVal>BMB_Thunderstorm</StrVal>
            <Provides>TXT_BMB_ITEMS_THUNDERCLAPAMULET_PROVIDES_2</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Rare</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
            <AIData AIPersonality="AI_General">
                <AIPriority>5</AIPriority>
            </AIData>
        <ArtDef>ThunderclapAmulet_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ThunderclapAmulet_ArtDef">
            <GameItemTypeModelPack InternalName="ThunderclapAmulet_Default">
                <IconFile>BMB_ThunderclapAmulet.png</IconFile>
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
	<GameItemType InternalName="TitleOfNobility">
        <DisplayName>TXT_BMB_ITEMS_TITLEOFNOBILITY_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TITLEOFNOBILITY_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>450</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>BMB_Famous</StrVal>
            <Provides>TXT_BMB_ITEMS_TITLEOFNOBILITY_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>TitleOfNobility_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="TitleOfNobility_ArtDef">
            <GameItemTypeModelPack InternalName="TitleOfNobility_Default">
                <IconFile>BMB_TitleOfNobility.png</IconFile>
                <TintR>0</TintR>
                <TintG>0</TintG>
                <TintB>0</TintB>
                <SFX>AirShard_SFX_01</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
	<GameItemType InternalName="Token_CanisDirus">
        <DisplayName>TXT_BMB_ITEMS_TOKEN_CANISDIRUS_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TOKEN_CANISDIRUS_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>90</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <StrVal>Hackles</StrVal>
            <Value>2</Value>
            <Provides>TXT_BMB_ITEMS_TOKEN_CANISDIRUS_PROVIDES_1</Provides>
            <UnitClass>TimberWarg</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>40</Likelihood>
        <RarityDisplay>Common</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Token_CanisDirus_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Token_CanisDirus_ArtDef">
            <GameItemTypeModelPack InternalName="Token_CanisDirus_Default">
                <IconFile>BMB_TokenOfTheCanisDirus.png</IconFile>
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
	<GameItemType InternalName="Token_Stalker">
        <DisplayName>TXT_BMB_ITEMS_TOKEN_STALKER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TOKEN_STALKER_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>90</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>SummonUnit</Attribute>
            <StrVal>Tomcat</StrVal>
            <Value>4</Value>
            <Provides>TXT_BMB_ITEMS_TOKEN_STALKER_PROVIDES_1</Provides>
            <UnitClass>Stalker</UnitClass>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>Token_Stalker_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="Token_Stalker_ArtDef">
            <GameItemTypeModelPack InternalName="Token_Stalker_Default">
                <IconFile>BMB_TokenStalker.png</IconFile>
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
	<GameItemType InternalName="TomeOfEnlightenment">
        <DisplayName>TXT_BMB_ITEMS_TOMEOFENLIGHTENMENT_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TOMEOFENLIGHTENMENT_DESCRIPTION</Description>
        <HideInHiergamenon>1</HideInHiergamenon>
        <ShopValue>300</ShopValue>
        <GameModifier>
            <ModType>Unit</ModType>
            <Attribute>UnlockUnitAbility</Attribute>
            <StrVal>Knowledge</StrVal>
            <Provides>TXT_BMB_ITEMS_TOMEOFENLIGHTENMENT_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>1</IsUsable>
        <UsableInBattle>0</UsableInBattle>
			<AIData AIPersonality="AI_General">
                <AIPriority>0</AIPriority>
            </AIData>
        <ArtDef>TomeOfEnlightenment_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="TomeOfEnlightenment_ArtDef">
            <GameItemTypeModelPack InternalName="TomeOfElightenment_Default">
                <IconFile>BookOfGreaterExperience_Item.png</IconFile>
                <TintR>115</TintR>
                <TintG>32</TintG>
                <TintB>16</TintB>
                <SFX>BookOfExperience_01</SFX>
                <SFX>BookOfExperience_02</SFX>
                <SFX>BookOfExperience_03</SFX>
                <GameItemTypeModel>
                </GameItemTypeModel>
            </GameItemTypeModelPack>
        </GameItemTypeArtDef>
    </GameItemType>
    <GameItemType InternalName="TreasureGormandizer">
        <DisplayName>TXT_BMB_ITEMS_TREASUREGORMANDIZER_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TREASUREGORMANDIZER_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>        
        <ShopValue>300</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_TreasureHunter</StrVal>
            <Value>25</Value>
            <Provides>TXT_BMB_ITEMS_TREASUREGORMANDIZER_PROVIDES_1</Provides>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>50</AIPriority>
            </AIData>
        <ArtDef>TreasureGormandizer_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="TreasureGormandizer_ArtDef">
            <GameItemTypeModelPack InternalName="TreasureGormandizer_Default">
                <IconFile>BMB_TreasureGormandizer.png</IconFile>
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
	<GameItemType InternalName="TriadAmulet">
        <DisplayName>TXT_BMB_ITEMS_TRIADAMULET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_TRIADAMULET_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>220</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Cold</StrVal>
            <Value>1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Fire</StrVal>
            <Value>1</Value>
        </GameModifier>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Lightning</StrVal>
            <Value>1</Value>
        </GameModifier>
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>45</AIPriority>
            </AIData>
        <ArtDef>TriadAmulet_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="TriadAmulet_ArtDef">
            <GameItemTypeModelPack InternalName="TriadAmulet_Default">
                <IconFile>AmuletofStrength_Item.png</IconFile>
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
	<GameItemType InternalName="ViperheartAmulet">
        <DisplayName>TXT_BMB_ITEMS_VIPERHEARTAMULET_DISPLAYNAME</DisplayName>
        <Description>TXT_BMB_ITEMS_VIPERHEARTAMULET_DESCRIPTION</Description>
        <Type>Accessory</Type>
        <CanBeEquipped>1</CanBeEquipped>
        <ShopValue>180</ShopValue>
		<GameModifier>
            <ModType>Unit</ModType>
            <Attribute>AdjustUnitStat</Attribute>
            <StrVal>UnitStat_Attack_Poison</StrVal>
            <Value>3</Value>
        </GameModifier>		
        <IsAvailableForSovereignCustomization>0</IsAvailableForSovereignCustomization>
        <Likelihood>20</Likelihood>
        <RarityDisplay>Uncommon</RarityDisplay>
        <HeroOnly>1</HeroOnly>
        <IsAvailableForUnitDesign>0</IsAvailableForUnitDesign>
        <IsUsable>0</IsUsable>
			<AIData AIPersonality="AI_General">
                <AIPriority>40</AIPriority>
            </AIData>
        <ArtDef>ViperheartAmulet_ArtDef</ArtDef>
        <GameItemTypeArtDef InternalName="ViperheartAmulet_ArtDef">
            <GameItemTypeModelPack InternalName="ViperheartAmulet_Default">
                <IconFile>BMB_ViperheartAmulet.png</IconFile>
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
</GameItemTypes>

```
---
**File Statistics**
- **Size**: 165.16 KB
- **Lines**: 3704
File: `modules/bmb-mod/items.md`
