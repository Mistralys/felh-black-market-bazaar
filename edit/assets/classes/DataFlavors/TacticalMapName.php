<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_TacticalMapName extends DataType_StringEnum
{
    public function getLabel() : string
    {
        return t('Tactical map');
    }

    protected function getValues() : array
    {
        return array(
            'T_Ruins_Barren_01' => t('Barren ruins 1')
        );
    }
}