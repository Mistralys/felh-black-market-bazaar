<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameItemTypeArtDef_GameItemTypeModelPack_OnHitParticleName extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Particle on hit');
    }
    
    protected function getValues() : array
    {
        return array(
            
            'Dagger_Attack' => t('Attack: %1$s', t('Dagger')),
            'Staff_Attack' => t('Attack: %1$s', t('Staff')),
            'Club_Attack' => t('Attack: %1$s', t('Club')),
            
            'Hit_Lightning1' => t('Hit: %1$s', t('Lightning')),
            'Hit_Ice1' => t('Hit: %1$s', t('Ice')),
            'Hit_Fire1' => t('Hit: %1$s', t('Fire')),
            
            'E_Poison_Particle' => t('Poison')
        );
    }
}