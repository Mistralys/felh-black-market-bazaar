<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_vsUnitType extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Versus a specific unit type?');
    }
}