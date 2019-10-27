<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_MapParticle extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Map particle');
    }
    
    protected function getValues() : array
    {
        return array(
            'T_Heal_Particle' => t('Healing'),
            'S_Paragon_Particle' => t('Paragon'),
            'S_ImbueChampion_Particle' => t('Imbue champion'),
        );
    }
}