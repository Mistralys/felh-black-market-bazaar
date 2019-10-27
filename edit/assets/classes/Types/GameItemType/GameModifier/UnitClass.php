<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_UnitClass extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Value');
    }
    
    protected function getValues() : array
    {
        return array(
            'Stalker' => t('Stalker'),
            'BanditGuard' => t('Bandit guard'),
            'Naja' => t('Naja'),
            'CorpseSpider' => t('Corpse spider'),
            'HoarderSpider' => t('Hoarder spider'),
            'AirElemental' => t('Air elemental'),
            'CrowDemon' => t('Crow demon'),
            'CrowDemon_Ancient' => t('Ancient crow demon'),
            'CrowDemon_Young' => t('Young crow demon'),
            'AlbinoRockSpider' => t('Albino rock spider'),
            'BlackWidow' => t('Black widow'),
            'RavenousHarridan' => t('Ravenous harridan'),
            'RockSpider' => t('Rock spider'),
            'Bear' => t('Bear'),
            'Wolf_Group' => t('Pack of wolves'),
            'GreatWolf' => t('Great wolf'),
            'EbbenWolf' => t('Ebben wolf'),
            'AnnieDog' => t('Annie the dog'),
            'TimberWarg' => t('Timber warg'),
            'ShadowWarg' => t('Shadow warg'),
            'IceWarg' => t('Ice warg')
        );
    }
}