<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_AIData_AIPrefType extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Hero only?');
    }
    
    protected function getValues(): array
    {
        return array(
            'AIPrefType_BLUNT' => t('Blunt'),
            'AIPrefType_CUTTING' => t('Cutting'),
            'AIPrefType_BOW' => t('Bow'),
            'AIPrefType_PIERCING' => t('Piercing'),
        );
    }

}