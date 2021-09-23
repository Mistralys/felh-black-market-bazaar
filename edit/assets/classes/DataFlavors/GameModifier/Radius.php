<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier_Radius extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Spawn radius');
    }
}
