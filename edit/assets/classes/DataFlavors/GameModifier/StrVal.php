<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier_StrVal extends DataType_String
{
    public function getLabel() : string
    {
        return t('String value');
    }
}
