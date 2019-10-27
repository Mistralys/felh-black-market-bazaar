<?php

namespace FELH;

class Types_GameItemType_WeaponUpgradeType extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'Axe' => t('Axe'),
            'Blade' => t('Blade'),
            'Blunt' => t('Blunt'),
            'Bow' => t('Bow'),
            'Spear' => t('Spear'),
            'Staff' => t('Staff'),
            'PoisonStaff' => t('Poison staff'),
            'FireStaff' => t('Fire staff'),
            'LightningStaff' => t('Lightning staff'),
            'Wand' => t('Wand')
        );
    }
    
    public function getLabel() : string
    {
        return t('Weapon type');
    }
}