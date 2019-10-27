<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_StrVal extends DataType_StringEnum_UnitStats
{
    public function getLabel() : string
    {
        return t('Type');
    }
}