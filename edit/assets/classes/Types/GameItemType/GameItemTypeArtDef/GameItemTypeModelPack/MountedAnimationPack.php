<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_MountedAnimationPack extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Mounted animation pack');
    }
    
    protected function getValues() : array
    {
        return array(
            'MountedSoldierAnimationPack' => t('Soldier mounted on %1$s', t('horse')),
            'MountedSoldierWargAnimationPack' => t('Soldier mounted on %1$s', t('warg')),
            'MountedSoldierSpiderAnimationPack' => t('Soldier mounted on %1$s', t('spider')),
            'MountedSoldierDragonAnimationPack' => t('Soldier mounted on %1$s', t('dragon')),
            'MountedSoldierBroodAnimationPack' => t('Soldier mounted on %1$s', t('brood'))
        );
    }
}