<?php

namespace FELH;

class Types_GameItemType_Prereq_Type extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Type');
    }
    
    protected function getValues(): array
    {
        return array(
            'UnitStat' => t('Unit stat'),
            'Tech' => t('Technology'),
            'RestrictedAbilityBonusOption' => t('Restricted ability bonus'),
            'AbilityBonusOption' => t('Ability bonus')
        );
    }
}