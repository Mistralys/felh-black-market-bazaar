<?php

declare(strict_types=1);

namespace FELH;

abstract class DataFlavors_GameModifier_BoolVal1 extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Boolean value');
    }
}
