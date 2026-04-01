# Project - Folder Structure
_SOURCE: BMB mod project layout_
# BMB mod project layout
###  
```
└── AGENTS.md
└── CLAUDE.md
└── Mods/
    ├── README.md
    ├── module-context.yaml
    ├── src/
    │   └── BlackMarketBazaar.elemd
    │   └── Data/
    │       ├── BMB.str
    │       ├── GameCore/
    │       │   ├── BMB_Abilities.xml
    │       │   ├── BMB_Armor.xml
    │       │   ├── BMB_Clothes.xml
    │       │   ├── BMB_CoreItemsModifications.xml
    │       │   ├── BMB_Effects.xml
    │       │   ├── BMB_Items.xml
    │       │   ├── BMB_Spells.xml
    │       │   ├── BMB_UnitStats.xml
    │       │   ├── BMB_Units.xml
    │       │   ├── BMB_Weapons.xml
    │       ├── Localization/
    │       │   └── English/
    │       │       ├── BMB_Strings_Abilities.xml
    │       │       ├── BMB_Strings_Armor.xml
    │       │       ├── BMB_Strings_Clothes.xml
    │       │       ├── BMB_Strings_Items.xml
    │       │       ├── BMB_Strings_Spells.xml
    │       │       ├── BMB_Strings_UnitStats.xml
    │       │       ├── BMB_Strings_Units.xml
    │       │       ├── BMB_Strings_Weapons.xml
    │       │   └── French/
    │       │       └── BMB_Strings_Abilities.xml
    │       │       └── BMB_Strings_Armor.xml
    │       │       └── BMB_Strings_Clothes.xml
    │       │       └── BMB_Strings_Items.xml
    │       │       └── BMB_Strings_Spells.xml
    │       │       └── BMB_Strings_UnitStats.xml
    │       │       └── BMB_Strings_Units.xml
    │       │       └── BMB_Strings_Weapons.xml
    │   └── Gfx/
    │       └── Black Market Bazaar Icons/
    │           └── BMB_Ability_BullsEye.png
    │           └── BMB_Ability_Chop.png
    │           └── BMB_Ability_CripplingBlow.png
    │           └── BMB_Ability_DimensionalTranslocation.png
    │           └── BMB_Ability_DismantlingStroke.png
    │           └── BMB_Ability_Erudite.png
    │           └── BMB_Ability_Famous.png
    │           └── BMB_Ability_ForgingExcellence.png
    │           └── BMB_Ability_MindBlast.png
    │           └── BMB_Ability_OvumPhilosophorum.png
    │           └── BMB_Ability_PenitentsRestitution.png
    │           └── BMB_Ability_PowerPunch.png
    │           └── BMB_Ability_PowerSweep.png
    │           └── BMB_Ability_RodentRepellent.png
    │           └── BMB_Ability_Scrambler.png
    │           └── BMB_Ability_SummonLupus.png
    │           └── BMB_Ability_SwampGasExplosion.png
    │           └── BMB_Ability_Thunderstorm.png
    │           └── BMB_Ability_TwinShaft.png
    │           └── BMB_AbyssalGreatsword.png
    │           └── BMB_AcrobatsPantaloons.png
    │           └── BMB_AerialConductor.png
    │           └── BMB_AerialConductor_Texture.dds
    │           └── BMB_AmuletOfContamination.png
    │           └── BMB_AmuletOfTheBlackMinded.png
    │           └── BMB_AngrySpitter.png
    │           └── BMB_ArachnidAmulet.png
    │           └── BMB_ArcaneMonolithScroll.png
    │           └── BMB_ArcaneScalpel.png
    │           └── BMB_ArcherHands.png
    │           └── BMB_ArchmagesEleventhFinger.png
    │           └── BMB_ArtifactHandlers.png
    │           └── BMB_AspenHeart.png
    │           └── BMB_BanditSlayer.png
    │           └── BMB_BattleHeatShield.png
    │           └── BMB_BeltOfWeariness.png
    │           └── BMB_BirdOfCelerity.png
    │           └── BMB_BlackCrowsHighBrow.png
    │           └── BMB_BlackSpikesFists.png
    │           └── BMB_BlackSpikesHoofs.png
    │           └── BMB_BlackSpikesHorns.png
    │           └── BMB_BlackSpikesLoins.png
    │           └── BMB_BlackSpikesRibcage.png
    │           └── BMB_BlackSpikesSpokes.png
    │           └── BMB_BlackSpikesTenderizer.png
    │           └── BMB_BladeOfNegation.png
    │           └── BMB_BlessedVestment.png
    │           └── BMB_BlightStaff.png
    │           └── BMB_BloodCandles.png
    │           └── BMB_BloodDrainer.png
    │           └── BMB_BlueCrystal.png
    │           └── BMB_BlueWine.png
    │           └── BMB_BoorishPacifier.png
    │           └── BMB_BreakneckSlasher.png
    │           └── BMB_BronzeArrows.png
    │           └── BMB_BulwarkOfTheBrute.png
    │           └── BMB_BurningContract.png
    │           └── BMB_CastIronBrassiere.png
    │           └── BMB_CauldronOfPlenty.png
    │           └── BMB_ChilledHarpoon.png
    │           └── BMB_ChokerSpore.png
    │           └── BMB_CivilizedBattleAxe.png
    │           └── BMB_CloakOfEyes.png
    │           └── BMB_Clothes_Hood_Light.png
    │           └── BMB_CobaltVertex.png
    │           └── BMB_Cobalt_Vertex_Texture.dds
    │           └── BMB_ColdheartedKiller.png
    │           └── BMB_CommandersWig.png
    │           └── BMB_CorrosiveDagger.png
    │           └── BMB_CorruptiveChalice.png
    │           └── BMB_CrystallineBoots.png
    │           └── BMB_Custom_F_Accessories_Texture_01.png
    │           └── BMB_CutthroatsSidekicks.png
    │           └── BMB_DaggerOfCorruption.png
    │           └── BMB_Deconstructor.png
    │           └── BMB_DementedSkewer.png
    │           └── BMB_DemonhideBoots.png
    │           └── BMB_DemonhideBoots_Texture.dds
    │           └── BMB_DemonicAnchors.png
    │           └── BMB_DexterousRobe.png
    │           └── BMB_DimensionalDiadem.png
    │           └── BMB_DisciplinaryBullwhip.png
    │           └── BMB_DualCivilizedBattleAxe.png
    │           └── BMB_DualFreezingAxe.png
    │           └── BMB_DualFreezingBattleAxe.png
    │           └── BMB_DualFulminatingAxe.png
    │           └── BMB_DualFulminatingBattleAxe.png
    │           └── BMB_ElementalWand.png
    │           └── BMB_EnchantersRobe.png
    │           └── BMB_EsotericExposer.png
    │           └── BMB_Esoteric_Exposer_Texture.dds
    │           └── BMB_EternalIcicle.png
    │           └── BMB_EtherealPike.png
    │           └── BMB_EvasiveCincture.png
    │           └── BMB_F_Male_Surcoat_Sion_Texture_02.dds
    │           └── BMB_FeatherlightClub.png
    │           └── BMB_FeatherlightClub_Texture.dds
    │           └── BMB_FireAndIce.png
    │           └── BMB_FourLeafClover.png
    │           └── BMB_FragranceOfSophistication.png
    │           └── BMB_FreezeburnWand.png
    │           └── BMB_FreezingAxe.png
    │           └── BMB_FreezingBattleAxe.png
    │           └── BMB_FrenzyCharm.png
    │           └── BMB_FrostbiteFingers.png
    │           └── BMB_FrozenAutumn.png
    │           └── BMB_FulminatingAxe.png
    │           └── BMB_FulminatingBattleAxe.png
    │           └── BMB_GildarTouchGloves.png
    │           └── BMB_GirdleOfTheColossus.png
    │           └── BMB_GoldenPavis.png
    │           └── BMB_HeartbloodRing.png
    │           └── BMB_HeavensDichotomizer.png
    │           └── BMB_HighbornBeheader.png
    │           └── BMB_HornedHelmet.png
    │           └── BMB_Horseshoe.png
    │           └── BMB_IceBomb.png
    │           └── BMB_Icebreaker.png
    │           └── BMB_ImpudentShortbow.png
    │           └── BMB_InfernalCompanion.png
    │           └── BMB_InfiniteDiary.png
    │           └── BMB_InsectoidExoskeleton.png
    │           └── BMB_JadeRing.png
    │           └── BMB_JinxDoll.png
    │           └── BMB_K_Female_Hair_Texture_Blue_Tiara_03.dds
    │           └── BMB_KnockbackHammer.png
    │           └── BMB_LadysBoots.png
    │           └── BMB_LeopardBoots.png
    │           └── BMB_LeopardClaws.png
    │           └── BMB_LeopardCloak.png
    │           └── BMB_LeopardPants.png
    │           └── BMB_LeopardVest.png
    │           └── BMB_LightningDrinker.png
    │           └── BMB_LightningStruckBranch.png
    │           └── BMB_LiquidVigor.png
    │           └── BMB_LittleRevenger.png
    │           └── BMB_LostBarrowhillWine.png
    │           └── BMB_LupusCloak.png
    │           └── BMB_Lupus_Cloak_Texture.dds
    │           └── BMB_MagiSkin.png
    │           └── BMB_MagnifyingStimulant.png
    │           └── BMB_MalachiteCrown.png
    │           └── BMB_ManaclesOfExertion.png
    │           └── BMB_Manashroom.png
    │           └── BMB_ManlyPaws.png
    │           └── BMB_MantleOfTheHedgeWitch.png
    │           └── BMB_MaraudersHood.png
    │           └── BMB_MastersmithsForgingLeathers.png
    │           └── BMB_MastersmithsHammer.png
    │           └── BMB_MiasmaticStake.png
    │           └── BMB_MortarAndPestle.png
    │           └── BMB_MushroomHallucinogenic.png
    │           └── BMB_MyriadCloak.png
    │           └── BMB_Myriad_Cloak_Texture.dds
    │           └── BMB_MysticalSiphon.png
    │           └── BMB_MythicalComposer.png
    │           └── BMB_NajaSkinGreaves.png
    │           └── BMB_NimbleCrusher.png
    │           └── BMB_NoxiousSpear.png
    │           └── BMB_OakenguardShield.png
    │           └── BMB_OiledLeatherArmor.png
    │           └── BMB_Oiled_Leather_Armor_Texture.dds
    │           └── BMB_OphidianLeggings.png
    │           └── BMB_OphidianScaleBoots.png
    │           └── BMB_PearlOfWisdom.png
    │           └── BMB_PestiferousWarhammer.png
    │           └── BMB_PhilosophersStone.png
    │           └── BMB_PoisonGeyser.png
    │           └── BMB_PracticeBuckler.png
    │           └── BMB_PredatorsBite.png
    │           └── BMB_PrestidigitatorsBoots.png
    │           └── BMB_PrestidigitatorsBoots_Texture.dds
    │           └── BMB_PrismaticBelt.png
    │           └── BMB_PrismaticLongbow.png
    │           └── BMB_RallyHorn.png
    │           └── BMB_RebounderShield.png
    │           └── BMB_RegenerativeForearms.png
    │           └── BMB_RejuvenatingFusion.png
    │           └── BMB_RestraintsOfThePenitent.png
    │           └── BMB_RingOfArdentCombustion.png
    │           └── BMB_RingOfGlacialCollision.png
    │           └── BMB_RingOfNoxiousHumors.png
    │           └── BMB_RingOfToxins.png
    │           └── BMB_RingOfVaporizingShock.png
    │           └── BMB_RingofTurgescence.png
    │           └── BMB_RobeOfArdor.png
    │           └── BMB_RobeOfRiches.png
    │           └── BMB_RodentHandbook.png
    │           └── BMB_RubberStone.png
    │           └── BMB_RuthlessPelter.png
    │           └── BMB_RuthlessStompers.png
    │           └── BMB_SackOfProvisions.png
    │           └── BMB_SaintlyCarapace.png
    │           └── BMB_SanguineThinker.png
    │           └── BMB_Sanguine_Thinker_Texture.dds
    │           └── BMB_ScarabOfPreservation.png
    │           └── BMB_ScorchingJavelin.png
    │           └── BMB_ScribesTablet.png
    │           └── BMB_ScrollOfFear.png
    │           └── BMB_SerratedIce.png
    │           └── BMB_ShacklesOfEnslavement.png
    │           └── BMB_ShellOfSluggishness.png
    │           └── BMB_ShepherdsYanker.png
    │           └── BMB_ShiftyDepleter.png
    │           └── BMB_ShrillHarpoon.png
    │           └── BMB_SlimyWaders.png
    │           └── BMB_SmolderingStick.png
    │           └── BMB_SnappingBoots.png
    │           └── BMB_StaffOfShockingJolts.png
    │           └── BMB_StaffOfTheOverachiever.png
    │           └── BMB_Stalactite.png
    │           └── BMB_Stalagmite.png
    │           └── BMB_SteadfastBoots.png
    │           └── BMB_SteelclothCloak.png
    │           └── BMB_SupernaturalDeflector.png
    │           └── BMB_SupremacyStaff.png
    │           └── BMB_SwampGasLighter.png
    │           └── BMB_TempestuousWrath.png
    │           └── BMB_Texture_Crystal.png
    │           └── BMB_Texture_Eyes.png
    │           └── BMB_Texture_Hedgewitch.png
    │           └── BMB_Texture_InsectoidExoskeleton.dds
    │           └── BMB_Texture_Leopard.png
    │           └── BMB_Texture_OphidianScales.dds
    │           └── BMB_Texture_SlimyWaders.dds
    │           └── BMB_Texture_SteelclothCloak.dds
    │           └── BMB_Texture_ViscousMembrane.png
    │           └── BMB_Texture_Wood.png
    │           └── BMB_ThunderAxe.png
    │           └── BMB_ThunderclapAmulet.png
    │           └── BMB_ThunderousStaff.png
    │           └── BMB_TitleOfNobility.png
    │           └── BMB_TokenOfTheCanisDirus.png
    │           └── BMB_TokenStalker.png
    │           └── BMB_TreasureGormandizer.png
    │           └── BMB_TreebaneAxe.png
    │           └── BMB_VampiricGloves.png
    │           └── BMB_ViperheartAmulet.png
    │           └── BMB_ViscousMembrane.png
    │           └── BMB_Wallbreaker.png
    │           └── BMB_WaveCrestingBoots.png
    │           └── BMB_WeepingBattleAxe.png
    │           └── ItemCategoryIcon_LightningStaff.png
    │           └── ItemCategoryIcon_PoisonStaff.png
    │           └── ItemCategoryIcon_Wand.png
└── README.md
└── build.config.json
└── context.yaml
└── docs/
    ├── agents/
    │   ├── implementation-history/
    │   │   ├── 2026-03-28-build-command/
    │   │   │   ├── dependency-analysis.md
    │   │   │   ├── pipeline-configuration.md
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   │   ├── work-packages-draft.md
    │   │   │   ├── work.md
    │   │   │   ├── work/
    │   │   │   │   └── WP-001.md
    │   │   │   │   └── WP-002.md
    │   │   │   │   └── WP-003.md
    │   │   ├── 2026-03-28-reforged-compatibility-rework-1/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   │   ├── work/
    │   │   │   │   └── WP-001.md
    │   │   │   │   └── WP-002.md
    │   │   │   │   └── WP-003.md
    │   │   │   │   └── WP-004.md
    │   │   │   │   └── WP-005.md
    │   │   │   │   └── WP-006.md
    │   │   │   │   └── WP-007.md
    │   │   ├── 2026-03-28-reforged-compatibility/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-29-build-command-polish-rework-1/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-29-build-command-polish/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-29-frenzy-charm/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-29-item-reference-generator/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-31-infernal-companion/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-31-replace-regex-with-parser/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-31-translation-support/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-03-31-xml-fragment-build/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-content-description-audit/
    │   │   │   ├── audit-report.md
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-fix-generate-reference-effects/
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-french-translation/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-lang-config-extraction/
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-reference-generators/
    │   │   │   ├── plan.md
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-rename-flatfiles-to-translatable/
    │   │   │   ├── synthesis.md
    │   │   ├── 2026-04-01-verify-translation-keys/
    │   │   │   ├── synthesis.md
    │   │   ├── README.md
    │   ├── project-manifest/
    │   │   ├── README.md
    │   │   ├── build-pipeline.md
    │   │   ├── constraints.md
    │   │   ├── file-tree.md
    │   │   ├── game-data-reference.md
    │   │   ├── localization.md
    │   │   ├── module-context.yaml
    │   │   ├── tech-stack.md
    │   │   ├── xml-patterns.md
    │   ├── research/
    │   │   └── 2026-03-28-full-xml-compatibility.md
    │   │   └── 2026-03-28-item-xml-compatibility.md
    ├── references/
    │   └── abilities.md
    │   └── effects.md
    │   └── items.md
    │   └── original-felh-readme.txt
    │   └── spells.md
    │   └── unit-stats.md
    │   └── units.md
└── local-workspace.md
└── package-lock.json
└── package.json
└── scripts/
    └── build.mjs
    └── generate-all-references.mjs
    └── generate-reference-abilities.mjs
    └── generate-reference-effects.mjs
    └── generate-reference-spells.mjs
    └── generate-reference-unit-stats.mjs
    └── generate-reference-units.mjs
    └── generate-reference.mjs
    └── lib/
        ├── lang-config.mjs
        ├── merge-translations.mjs
        ├── merge-xml.mjs
        ├── output.mjs
        ├── reference-helpers.mjs
        ├── verify-translation-keys.mjs
        ├── xml-parser.mjs
    └── menu.mjs
    └── migrate-to-dirs.mjs
    └── prepare.mjs
    └── split-xml.mjs
    └── verify-translation-keys.mjs

```
---
**File Statistics**
- **Size**: 18.76 KB
- **Lines**: 388
File: `project-folder-structure.md`
