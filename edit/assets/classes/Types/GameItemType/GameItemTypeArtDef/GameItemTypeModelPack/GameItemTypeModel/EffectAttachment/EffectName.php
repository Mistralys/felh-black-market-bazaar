<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_GameItemTypeModel_EffectAttachment_EffectName extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Effect');
    }
    
    protected function getValues(): array
    {
        $names = array(
            'LightningHammer' => t('Lightning hammer'),
            'ToxicLongbow' => t('Toxic longbow'),
            'BurningAxe' => t('Burning axe'),
            'HailstoneStaff' => t('Hailstone staff'),
            'BorealBlade' => t('Boreal blade'),
            'ShadowDagger' => t('Shadow dagger'),
            'EarthElemental' => t('Earth elemental'),
            'WintersSpear' => t('Winter\'s spear'),
            'Banshee' => t('Banshee')
        );
        
        $result = array();
        
        foreach($names as $id => $translation) {
            $result['A_'.$id.'_Particle'] = $translation;
        }
        
        return $result;
    }
}