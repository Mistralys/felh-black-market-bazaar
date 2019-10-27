<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_Multiplier extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Multiplier');
    }
}