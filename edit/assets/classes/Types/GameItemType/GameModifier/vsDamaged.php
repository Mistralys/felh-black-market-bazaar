<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_vsDamaged extends DataType_Bool
{
    public function getLabel() : string
    {
        return t('Versus damaged enemies?');
    }
}