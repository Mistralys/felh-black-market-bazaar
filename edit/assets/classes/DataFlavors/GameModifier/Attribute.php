<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier_Attribute extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Attribute');
    }

    protected function getValues(): array
    {
        return array(
            'AdjustUnitStat' => t('Adjust unit stat'),
            'UnitJoinArmy' => t('Unit joins army'),
            'CreateGoodieHut' => t('Create goodie hut'),
            'Fame' => t('Fame'),
            'GiveExperience' => t('Give experience')
        );
    }
}
