<?php

namespace FELH;

class Types_GameItemType_WeaponType extends DataType_StringEnum
{
    protected function getValues() : array
    {
        return array(
            'OneHanded' => t('One-handed'),
            'TwoHanded' => t('Two-handed'),
            'Bow' => t('Bow'),
            'Blunt' => t('Blunt'),
            'Spear' => t('Spear'),
            'Staff' => t('Staff')
        );
    }
    
    public function getLabel() : string
    {
        return t('Weapon style');
    }
}