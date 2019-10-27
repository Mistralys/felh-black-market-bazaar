<?php

declare(strict_types=1);

namespace FELH;

class Types_GameItemType_GameModifier_BonusValue extends DataType_Integer
{
    public function getLabel() : string
    {
        return t('Bonus value');
    }
}